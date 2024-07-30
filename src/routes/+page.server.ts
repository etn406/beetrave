import { db } from '$lib/server/db';
import { albumTable } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export async function load() {
  return {
    albums: await db.select().from(albumTable).orderBy(desc(albumTable.added)).limit(10),
  };
}
