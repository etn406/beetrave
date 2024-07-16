import { Injectable } from '@nestjs/common';
import * as child_process from 'child_process';
import crypto from 'crypto';
import { stat, unlink } from 'fs/promises';
import * as path from 'path';
import { TypedConfigService } from '../typed-config/typed-config.service.js';
import { BeetsImportResult, BeetsImporterTableConfig } from './beets-importer.interfaces.js';

@Injectable()
export class BeetsImporterService {
  constructor(private readonly appConfig: TypedConfigService) { }

  private getTempFilePath(originalPath: string): string {
    const dir = path.dirname(originalPath);
    const ext = path.extname(originalPath);
    const base = path.basename(originalPath, ext);
    const tempName = `${base}_${crypto.randomBytes(8).toString('hex')}${ext}`;
    return path.join(dir, tempName);
  }

  private getSQLiteExportScript({ fromTable, columnsMapping: columns }: BeetsImporterTableConfig, csvFile: string): string {
    const inputColumns: string = Object.keys(columns).map(k => `"${k}"`).join(',');

    return [
      `.headers on`,
      `.mode csv`,
      `.output "${csvFile}"`,
      `SELECT ${inputColumns} FROM ${fromTable};`,
      `.exit`
    ].join('\n');
  }

  private async exportCSV(config: BeetsImporterTableConfig, csvFile: string): Promise<void> {
    const sqliteCommand = this.getSQLiteExportScript(config, csvFile);

    console.log(`Beginning export of ${config.fromTable} to CSV ${csvFile}...`);

    const r = child_process.spawnSync('sqlite3', [this.appConfig.BEETS_LIBRARY_DB], { input: sqliteCommand });

    if (r.status === 1) {
      throw new Error(`❌ Error exporting SQLite to CSV: ${r.stderr.toString()}`);
    } else {
      if (r.stdout.toString().length > 0) {
        console.log(r.stdout.toString());
      }

      console.log(`✅ Exported ${config.fromTable} to CSV ${csvFile} (${await this.getFileSize(csvFile)})`);
    }
  }

  private getPostgreSQLImportScript({ toTable: table, columnsMapping }: BeetsImporterTableConfig, csvFile: string): string {
    const columns: string[] = Object.values(columnsMapping).map(c => `"${c}"`);
    const columnsJoined = columns.join(', ')

    return [
      `\\set ON_ERROR_STOP on`,

      `BEGIN;`,

      `CREATE TEMP TABLE temp (LIKE ${table} INCLUDING ALL);`,
      `\\COPY temp (${columnsJoined}) FROM '${csvFile}' CSV HEADER;`,

      `UPDATE ${table}`,
      `SET `,
      columns.map(c => `  ${c} = temp.${c}`).join(',\n'),
      `FROM temp`,
      `WHERE ${table}.id = temp.id;`,

      `INSERT INTO ${table} (${columnsJoined}, deleted)`,
      `SELECT ${columns.map(c => `temp.${c}`).join(', ')}, false`,
      `FROM temp`,
      `LEFT JOIN ${table} ON ${table}.id = temp.id`,
      `WHERE ${table}.id IS NULL;`,

      `UPDATE ${table}`,
      `SET deleted = true`,
      `WHERE id NOT IN (SELECT id FROM temp);`,

      `COMMIT;`,
    ].join('\n');
  }

  private getPSQLParameters(): [string[], NodeJS.ProcessEnv] {
    return [
      [
        "-U", this.appConfig.POSTGRES_DATABASE_USER,
        "-h", this.appConfig.POSTGRES_DATABASE_HOST,
        "-p", this.appConfig.POSTGRES_DATABASE_PORT.toString(),
        "-d", this.appConfig.POSTGRES_DATABASE_NAME,
      ],
      Object.assign(
        { PGPASSWORD: this.appConfig.POSTGRES_DATABASE_PASSWORD },
        process.env
      )
    ];
  }

  private parseStatsFromStdout(stdout: Buffer): BeetsImportResult {
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

  private async importCSV(config: BeetsImporterTableConfig, csvFile: string): Promise<BeetsImportResult> {
    const pgCommand = this.getPostgreSQLImportScript(config, csvFile);

    console.log(`Beginning import of ${config.toTable} from CSV ${csvFile} (${await this.getFileSize(csvFile)})...`);
    // console.log("PostgreSQL commands:", pgCommand)

    const [psqlParams, env] = this.getPSQLParameters();

    const psql = child_process.spawnSync('psql', psqlParams, { input: pgCommand, env });

    if (psql.status === 1 || psql.stderr.length > 0) {
      throw new Error(`❌ Error importing from CSV:\n${psql.stderr.toString()}`);
    } else {
      const result = this.parseStatsFromStdout(psql.stdout);

      if (result.copied !== -1 && result.updated !== -1 && result.inserted !== -1 && result.deleted !== -1) {
        console.log(
          `There are ${result.copied} entries from ${config.fromTable} imported to ${config.toTable}:\n`,
          `\t- ${result.updated} entries updated,\n`,
          `\t- ${result.inserted} new entries inserted,\n`,
          `\t- ${result.deleted} entries marked as deleted\n`
        );
      } else {
        console.log("Couldn't parse results from stout, so here it is fully instead:\n", psql.stdout.toString());
      }

      console.log(`✅ Imported ${config.toTable} from CSV ${csvFile}`);

      return result;
    }
  }

  private async getFileSize(filePath: string): Promise<string> {
    const { size } = await stat(filePath);
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    let readableSize = size;

    while (readableSize >= 1024 && index < units.length - 1) {
      readableSize /= 1024;
      index++;
    }

    return `${readableSize.toFixed(2)} ${units[index]}`;
  }

  private async deleteFile(filePath: string): Promise<void> {
    try {
      await unlink(filePath);
      console.log(`✅ File ${filePath} deleted successfully.`);
    } catch (error) {
      console.error(`❌ Error deleting file ${filePath}:`, error);
    }
  }

  public async import(config: BeetsImporterTableConfig): Promise<BeetsImportResult> {
    const csvFile = this.getTempFilePath(
      path.join('/backend/', config.toTable + '.csv')
    );

    try {
      await this.exportCSV(config, csvFile);
      const result = await this.importCSV(config, csvFile);
      await this.deleteFile(csvFile);
      return result;

    } catch (e) {
      await this.deleteFile(csvFile);
      throw e;
    }
  }
}