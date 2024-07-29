import { db } from "$lib/server/db";
import { script } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export async function load() {
  return {
    scripts: await db.select()
      .from(script)
      .orderBy(desc(script.startTime))
      .limit(20)
  };
}