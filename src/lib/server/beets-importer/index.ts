import { env } from '$env/dynamic/private';
import type { ScriptLog } from '$lib/types/script';
import * as child_process from 'child_process';
import crypto from 'crypto';
import { accessSync, constants, mkdirSync } from 'fs';
import { stat, unlink } from 'fs/promises';
import * as path from 'path';
import type { BeetsImporterTableConfig, BeetsImportResult } from '../../types/beets-importer';
import { beetsImporterConfig } from './config';

function* log(message: string): Generator<string> {
  console.info(message);
  yield message;
}

function* logError(message: string): Generator<string> {
  console.error(message);
  yield `[error] ${message}`;
}

/**
 * Get a temporary file path based on an other file path.
 * @example getTempFilePath('/foo/bar.csv') // -> '/foo/bar_8A24EF45.csv'
 */
function getTempFilePath(originalPath: string): string {
  const dir = path.dirname(originalPath);
  const ext = path.extname(originalPath);
  const base = path.basename(originalPath, ext);
  const tempName = `${base}_${crypto.randomBytes(8).toString('hex')}${ext} `;
  return path.join(dir, tempName);
}

function getSQLiteExportScript({ fromTable, columnsMapping: columns }: BeetsImporterTableConfig, csvFile: string): string {
  const inputColumns: string = Object.keys(columns).map(k => `"${k}"`).join(',');

  return [
    `.headers on`,
    `.mode csv`,
    `.output "${csvFile}"`,
    `SELECT ${inputColumns} FROM ${fromTable}; `,
    `.exit`,
  ].join('\n');
}

async function* exportCSV(config: BeetsImporterTableConfig, csvFile: string, dryRun: boolean): AsyncGenerator<string> {
  const sqliteCommand = getSQLiteExportScript(config, csvFile);

  const dryRunArg = (dryRun ? ['--dryrun'] : []);

  if (dryRun) {
    yield* log('(DRY RUN)')
  }

  yield* log(`Beginning export of ${config.fromTable} to CSV ${csvFile}...`);

  const result = child_process.spawnSync(
    'sqlite3',
    [...dryRunArg, env.BEETS_LIBRARY_DB],
    { input: sqliteCommand }
  );

  if (result.status === 1) {
    throw new Error(`Error exporting SQLite to CSV: ${result.stderr.toString()}`);
  } else {
    if (result.stdout.toString().length > 0) {
      yield* log(result.stdout.toString());
    }

    yield* log(`✅ Exported ${config.fromTable} to CSV ${csvFile} (${yield* await getFileSize(csvFile)})`);
  }
}

function getPostgreSQLImportScript({ toTable: table, columnsMapping }: BeetsImporterTableConfig, csvFile: string): string {
  const columns: string[] = Object.values(columnsMapping).map(c => `"${c}"`);
  const columnsJoined = columns.join(', ')

  return [
    `\\set ON_ERROR_STOP on`,

    `BEGIN; `,

    `CREATE TEMP TABLE temp(LIKE ${table} INCLUDING ALL); `,
    `\\COPY temp(${columnsJoined}) FROM '${csvFile}' CSV HEADER; `,

    `UPDATE ${table} `,
    `SET `,
    columns.map(c => `  ${c} = temp.${c} `).join(',\n'),
    `FROM temp`,
    `WHERE ${table}.id = temp.id; `,

    `INSERT INTO ${table} (${columnsJoined}, deleted)`,
    `SELECT ${columns.map(c => `temp.${c}`).join(', ')}, false`,
    `FROM temp`,
    `LEFT JOIN ${table} ON ${table}.id = temp.id`,
    `WHERE ${table}.id IS NULL; `,

    `UPDATE ${table} `,
    `SET deleted = true`,
    `WHERE id NOT IN(SELECT id FROM temp); `,

    `COMMIT; `,
  ].join('\n');
}

function getPSQLParameters(): [string[], NodeJS.ProcessEnv] {
  return [
    [
      "-U", env.POSTGRES_DATABASE_USER,
      "-h", env.POSTGRES_DATABASE_HOST,
      "-p", env.POSTGRES_DATABASE_PORT.toString(),
      "-d", env.POSTGRES_DATABASE_NAME,
    ],
    Object.assign(
      { PGPASSWORD: env.POSTGRES_DATABASE_PASSWORD },
      process.env
    ),
  ];
}

function parseStatsFromStdout(stdout: Buffer): Omit<BeetsImportResult, 'id'> {
  let copied = -1, updated = -1, inserted = -1, deleted = -1;
  const getNumberAfter = (l: string, s: string) => Number.parseInt(l.slice(s.length));

  for (const line of stdout.toString().split('\n')) {
    if (line.startsWith('COPY ')) {
      copied = getNumberAfter(line, 'COPY ');
    } else if (line.startsWith('UPDATE ')) {
      if (updated === -1) {
        updated = getNumberAfter(line, 'UPDATE ');
      } else {
        deleted = getNumberAfter(line, 'UPDATE ');
      }
    } else if (line.startsWith('INSERT ')) {
      inserted = getNumberAfter(line, 'INSERT ');
    }
  }

  return { copied, updated, inserted, deleted };
}

async function* importCSV(config: BeetsImporterTableConfig, csvFile: string): AsyncGenerator<string, BeetsImportResult> {
  const pgCommand = getPostgreSQLImportScript(config, csvFile);

  yield* log(`Beginning import of ${config.toTable} from CSV ${csvFile} (${yield* await getFileSize(csvFile)})...`);
  // console.log("PostgreSQL commands:", pgCommand)

  const [psqlParams, env] = getPSQLParameters();

  const psql = child_process.spawnSync('psql', psqlParams, { input: pgCommand, env });

  if (psql.status === 1 || psql.stderr.length > 0) {
    throw new Error(`Error importing from CSV: \n${psql.stderr.toString()} `);

  } else {
    const result = parseStatsFromStdout(psql.stdout);

    if (result.copied !== -1 && result.updated !== -1 && result.inserted !== -1 && result.deleted !== -1) {
      yield* log([
        `There are ${result.copied} entries from ${config.fromTable} imported to ${config.toTable}:`,
        `- ${result.updated} entries updated,`,
        `- ${result.inserted} new entries inserted,`,
        `- ${result.deleted} entries marked as deleted`,
      ].join('\n'));
    } else {
      yield* log("Couldn't parse results from stout, so here it is fully instead:\n" + psql.stdout.toString());
    }

    yield* log(`✅ Imported ${config.toTable} from CSV ${csvFile} `);

    return { id: config.id, ...result };
  }
}

async function* getFileSize(filePath: string): AsyncGenerator<string, string> {
  let size: number;
  try {
    size = (await stat(filePath)).size;

  } catch (_) {
    yield* logError(`Coundl't read size of ${filePath}`)
    size = 0;
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let readableSize = size;

  while (readableSize >= 1024 && index < units.length - 1) {
    readableSize /= 1024;
    index++;
  }

  return `${readableSize.toFixed(2)} ${units[index]} `;
}

async function* deleteFile(filePath: string): AsyncGenerator<string> {
  try {
    await unlink(filePath);
    yield* log(`✅ File ${filePath} deleted successfully.`);
  } catch (error) {
    yield* log(`Error deleting file ${filePath}: ${error}`);
  }
}

async function* importTableFromBeets(config: BeetsImporterTableConfig, dryRun: boolean): AsyncGenerator<string, BeetsImportResult> {
  const csvFile = getTempFilePath(
    path.join(env.BEETRAVE_TMP, config.toTable + '.csv')
  );

  accessSync(env.BEETS_LIBRARY_DB, constants.R_OK);

  mkdirSync(env.BEETRAVE_TMP, { recursive: true });
  accessSync(env.BEETRAVE_TMP, constants.W_OK);

  try {
    yield* await exportCSV(config, csvFile, dryRun);
    const result = yield* await importCSV(config, csvFile);
    yield* await deleteFile(csvFile);

    return result;

  } catch (e) {
    console.error()
    yield* await deleteFile(csvFile);
    throw e;
  }
}

export async function* importAllTablesFromBeets(dryRun: boolean): AsyncGenerator<ScriptLog, boolean> {
  try {
    for (const config of beetsImporterConfig) {
      yield* await importTableFromBeets(config, dryRun);
    }
  } catch (e) {
    yield* logError(String(e))
    return false;
  }

  yield 'Import terminé!';
  return true;
}