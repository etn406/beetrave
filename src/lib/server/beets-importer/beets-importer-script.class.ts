import { env } from '$env/dynamic/private';
import { Script } from '$lib/server/scripts/script.class';
import { ScriptName } from '$lib/types/script';
import * as child_process from 'child_process';
import { accessSync, constants } from 'fs';
import * as path from 'path';
import type { BeetsImporterTableConfig, BeetsImportResult } from '../../types/beets-importer';
import { beetsImporterConfig } from './config';

export class BeetsImportScript extends Script {
  static readonly name = ScriptName.BeetsImport;

  protected constructor(id: number, dryRun: boolean) {
    super(id, dryRun);
  }

  protected getSQLiteExportScript({ fromTable, columnsMapping: columns }: BeetsImporterTableConfig, csvFile: string): string {
    const inputColumns: string = Object.keys(columns).map(k => `"${k}"`).join(',');

    return [
      `.headers on`,
      `.mode csv`,
      `.output "${csvFile}"`,
      `SELECT ${inputColumns} FROM ${fromTable}; `,
      `.exit`,
    ].join('\n');
  }

  protected async exportCSV(config: BeetsImporterTableConfig, csvFile: string): Promise<void> {
    const sqliteCommand = this.getSQLiteExportScript(config, csvFile);

    await this.log(`Beginning export of ${config.fromTable} to CSV ${csvFile}...`);

    const result = child_process.spawnSync(
      'sqlite3',
      [env.BEETS_LIBRARY_DB],
      { input: sqliteCommand },
    );

    if (result.status === 1) {
      const message = `Error exporting SQLite to CSV: ${result.stderr.toString()}`;
      await this.logError(message);
      throw new Error(message);
    }
    else {
      if (result.stdout.toString().length > 0) {
        await this.log(result.stdout.toString());
      }

      await this.log(`Exported ${config.fromTable} to CSV ${csvFile} (${await this.getFileSize(csvFile)})`);
    }
  }

  protected getPostgreSQLImportScript({ toTable: table, columnsMapping }: BeetsImporterTableConfig, csvFile: string): string {
    const columns: string[] = Object.values(columnsMapping).map(c => `"${c}"`);
    const columnsJoined = columns.join(', ');

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

      `COMMIT;`,
    ].join('\n');
  }

  protected getPSQLParameters(): [string[], NodeJS.ProcessEnv] {
    return [
      [
        '-U', env.POSTGRES_DATABASE_USER,
        '-h', env.POSTGRES_DATABASE_HOST,
        '-p', env.POSTGRES_DATABASE_PORT.toString(),
        '-d', env.POSTGRES_DATABASE_NAME,
      ],
      Object.assign(
        { PGPASSWORD: env.POSTGRES_DATABASE_PASSWORD },
        process.env,
      ),
    ];
  }

  protected parseStatsFromStdout(stdout: Buffer): Omit<BeetsImportResult, 'id'> {
    let copied = -1, updated = -1, inserted = -1, deleted = -1;
    const getNumberAfter = (l: string, s: string) => Number.parseInt(l.slice(s.length));

    for (const line of stdout.toString().split('\n')) {
      if (line.startsWith('COPY ')) {
        copied = getNumberAfter(line, 'COPY ');
      }
      else if (line.startsWith('UPDATE ')) {
        if (updated === -1) {
          updated = getNumberAfter(line, 'UPDATE ');
        }
        else {
          deleted = getNumberAfter(line, 'UPDATE ');
        }
      }
      else if (line.startsWith('INSERT ')) {
        inserted = getNumberAfter(line, 'INSERT ');
      }
    }

    return { copied, updated, inserted, deleted };
  }

  protected async importCSV(config: BeetsImporterTableConfig, csvFile: string): Promise<BeetsImportResult> {
    const pgCommand = this.getPostgreSQLImportScript(config, csvFile);

    await this.log(`Beginning import of ${config.toTable} from CSV ${csvFile} (${await this.getFileSize(csvFile)})...`);

    const [psqlParams, env] = this.getPSQLParameters();

    const psql = child_process.spawnSync('psql', psqlParams, { input: pgCommand, env });

    if (psql.status === 1 || psql.stderr.length > 0) {
      const message = `Error importing CSV to PostgreSQL: ${psql.stderr.toString()}`;
      await this.logError(message);
      throw new Error(message);
    }
    else {
      const result = this.parseStatsFromStdout(psql.stdout);

      if (result.copied !== -1 && result.updated !== -1 && result.inserted !== -1 && result.deleted !== -1) {
        await this.log([
          `There are ${result.copied} entries from ${config.fromTable} imported to ${config.toTable}:`,
          `- ${result.updated} entries updated,`,
          `- ${result.inserted} new entries inserted,`,
          `- ${result.deleted} entries marked as deleted`,
        ].join('\n'));
      }
      else {
        await this.log('Couldn\'t parse results from stout, so here it is fully instead:\n' + psql.stdout.toString());
      }

      await this.log(`✅ Imported ${config.toTable} from CSV ${csvFile} `);

      return { id: config.id, ...result };
    }
  }

  protected async importTableFromBeets(tableConfig: BeetsImporterTableConfig): Promise<BeetsImportResult> {
    const csvFile = this.getTempFilePath(
      path.join(env.BEETRAVE_TMP, tableConfig.toTable + '.csv'),
    );

    try {
      await this.exportCSV(tableConfig, csvFile);
      const result = await this.importCSV(tableConfig, csvFile);
      await this.deleteFile(csvFile);

      return result;
    }
    catch (e) {
      await this.deleteFile(csvFile);
      throw e;
    }
  }

  protected async verifyAccessToDbFile(): Promise<void> {
    try {
      accessSync(env.BEETS_LIBRARY_DB, constants.R_OK);
      await this.log(`SQLite database "${env.BEETS_LIBRARY_DB}" is readable.`);
    }
    catch (error) {
      await this.logError(`SQLite database "${env.BEETS_LIBRARY_DB}" is not readable.`, error);
      throw error;
    }
  }

  public static async create(dryRun: boolean): Promise<BeetsImportScript> {
    const id = await super.internalCreate(BeetsImportScript.name);
    return new BeetsImportScript(id, dryRun);
  }

  protected async internalRun(): Promise<boolean> {
    await this.verifyAccessToBinary('sqlite3', '--version');
    await this.verifyAccessToBinary('psql', '--version');
    await this.verifyAccessToDbFile();
    await this.createAndVerifyAccessToTempDir();

    if (this.dryRun) {
      await this.log('Dry-run enabled, no changes will be made.');
      return true;
    }

    try {
      for (const tableConfig of beetsImporterConfig) {
        await this.importTableFromBeets(tableConfig);
      }
    }
    catch (_e) {
      await this.logError('Error importing tables from Beets.');
      return false;
    }

    this.log('All tables imported successfully.');
    return true;
  }
}
