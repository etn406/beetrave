import { env } from '$env/dynamic/private';
import { ScriptName } from '$lib/types/script';
import * as child_process from 'child_process';
import crypto from 'crypto';
import { and, eq } from 'drizzle-orm';
import { accessSync, constants, mkdirSync } from 'fs';
import { stat, unlink } from 'fs/promises';
import * as path from 'path';
import { db } from '../db';
import { scriptTable } from '../db/schema';

export abstract class Script {
  public readonly id: number;

  public readonly dryRun: boolean;

  public static readonly name: ScriptName;

  protected constructor(id: number, dryRun: boolean) {
    this.id = id;
    this.dryRun = dryRun;
  }

  protected async log(message: string): Promise<void> {
    let header: string = `[${(new Date()).toISOString()}] [${this}]`;

    if (this.dryRun) {
      header += ` [dry-run]`;
    }

    message = `${header}\n${message}\n`;

    console.info(message);

    // try {
    //   await db.update(scriptTable)
    //     .set({ logs: sql`concat(${scriptTable.logs}, ${message}, ${'\n'})` })
    //     .where(eq(scriptTable.id, this.id));
    // } catch (error) {
    //   console.error(`Error updating logs for script ${this}`, error);
    // }
  }

  protected async logError(message: string, error?: unknown): Promise<void> {
    let header: string = `[${(new Date()).toISOString()}] [${this}] [error]`;

    if (error) {
      if (error instanceof Error) {
        message += `\n${error.message}`;
      }
      else {
        message += `\n${String(error)}`;
      }
    }

    if (this.dryRun) {
      header += ` [dry-run]`;
    }

    message = `${header}\n${message}\n`;

    console.error(message);

    // try {
    //   await db.update(scriptTable)
    //     .set({ logs: sql`concat(${scriptTable.logs}, ${String(message)}, ${'\n'})` })
    //     .where(eq(scriptTable.id, this.id));
    // } catch (error) {
    //   console.error(`Error updating logs for script ${this}`, error);
    // }
  }

  public static async isAlreadyRunning(name: ScriptName): Promise<boolean> {
    const result = await db.select({ count: scriptTable.id })
      .from(scriptTable)
      .where(and(
        eq(scriptTable.name, name),
        eq(scriptTable.done, false),
      ));

    return Array.isArray(result) && result[0]?.count > 0;
  }

  protected static async internalCreate(name: ScriptName): Promise<number> {
    const [{ id }] = await db.insert(scriptTable).values({
      name,
      startTime: new Date(),
      source: 'manual',
      logs: '',
    }).returning({ id: scriptTable.id });

    if (!id) {
      throw new Error(`Could not create script "${name}" in database!`);
    }

    return id;
  }

  /**
       * Get a temporary file path based on an other file path.
       * @example getTempFilePath('/foo/bar.csv') // -> '/foo/bar_8A24EF45.csv'
       */
  protected getTempFilePath(originalPath: string): string {
    const dir = path.dirname(originalPath);
    const ext = path.extname(originalPath);
    const base = path.basename(originalPath, ext);
    const tempName = `${base}_${crypto.randomBytes(8).toString('hex')}${ext} `;
    return path.join(dir, tempName);
  }

  protected async getFileSize(filePath: string): Promise<string> {
    let size: number;

    try {
      size = (await stat(filePath)).size;
    }
    catch (_) {
      await this.logError(`Coundl't read size of ${filePath}`);
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

  protected async deleteFile(path: string): Promise<void> {
    try {
      await unlink(path);
      await this.log(`File ${path} deleted successfully.`);
    }
    catch (error) {
      await this.logError(`Error deleting file ${path}`, error);
      throw error;
    }
  }

  protected async verifyAccessToBinary(binary: string, ...parameters: string[]): Promise<void> {
    console.log('verifyAccessToBinary', binary, parameters);
    try {
      child_process.spawnSync(binary, parameters);
      await this.log(`Binary "${binary}" found and working.`);
    }
    catch (error) {
      await this.logError(`Binary "${binary}" not found or not working.`, error);
      throw error;
    }
  }

  protected async createAndVerifyAccessToTempDir(): Promise<void> {
    try {
      mkdirSync(env.BEETRAVE_TMP, { recursive: true });
      accessSync(env.BEETRAVE_TMP, constants.W_OK);
      await this.log(`Temporary directory "${env.BEETRAVE_TMP}" is accessible.`);
    }
    catch (error) {
      await this.logError(`Temporary directory "${env.BEETRAVE_TMP}" is not accessible.`, error);
      throw error;
    }
  }

  protected abstract internalRun(): Promise<boolean>;

  public async run(): Promise<void> {
    let success: boolean = false;

    try {
      success = await this.internalRun();
    }
    catch (e) {
      console.error(`Uncatched error while running script "${name}" (id: ${this.id})`, e);
      success = false;
    }
    finally {
      await db.update(scriptTable)
        .set({
          success,
          done: true,
          endTime: new Date(),
        })
        .where(eq(scriptTable.id, this.id));
    }
  }

  public finished(): Promise<boolean> {
    return db.select({ done: scriptTable.done })
      .from(scriptTable)
      .where(eq(scriptTable.id, this.id))
      .then(([{ done }]) => done);
  }

  public toString(): string {
    return `${this.constructor.name}#${this.id}`;
  }
}
