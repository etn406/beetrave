import { db } from "$lib/server/db";
import { script } from "$lib/server/db/schema";
import type { ScriptLog, ScriptName } from "$lib/types/script";
import { eq, sql } from "drizzle-orm";

export async function runScript(name: ScriptName, generator: AsyncGenerator<ScriptLog, boolean>) {
  const [{ id }] = await db.insert(script).values({
    name,
    startTime: new Date(),
    source: 'manual',
    logs: '',
  }).returning({ id: script.id });
  
  if (!id) { throw new Error(`Could not create script "${name}" in database!`); }
  
  try {
    let result: IteratorResult<ScriptLog, boolean>;
  
    while (!(result = await generator.next()).done) {
      const message = result.value;
  
      const now = (new Date()).toISOString()
      const newLine = `[${now}]\t${message}\n`;
  
      await db.update(script)
        .set({ logs: sql`concat(${script.logs}, ${newLine})` })
        .where(eq(script.id, id));
  
    }
  
    await db.update(script)
      .set({
        success: result.value,
        done: true,
        endTime: new Date(),
      })
      .where(eq(script.id, id));
  } catch (e) {
    console.log(`Uncatched error while running script "${name}" (id: ${id})`);
    throw e;
  }
}
  