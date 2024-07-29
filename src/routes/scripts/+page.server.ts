import { BeetsImportScript } from "$lib/server/beets-importer/beets-importer-script.class";
import { db } from "$lib/server/db";
import { scriptTable } from "$lib/server/db/schema";
import { Script } from "$lib/server/scripts/script.class";
import { fail } from "@sveltejs/kit";
import { desc } from "drizzle-orm";
import type { Actions } from "./$types";

export async function load() {
  return {
    scripts: await db.select()
      .from(scriptTable)
      .orderBy(desc(scriptTable.startTime))
      .limit(20)
  };
}

export const actions: Actions = {
  'run-beets-import': async ({ request }) => {
    const data = await request.formData();
    const dryRun = !!data.get('dryRun');

    const running = await Script.isAlreadyRunning(BeetsImportScript.name);

    if (running) {
      console.error('Tried to re-create an already running beets-import script!');
      return fail(409, { message: 'Script is already running!' });
    }

    const script = await BeetsImportScript.create(dryRun);

    console.info(`Created script ${script}!`);

    setTimeout(() => {
      // Start asynchroneously the script
      script.run().then(() => {
        console.log(`Async script ${script} finished!`);
      }, (error) => {
        console.error(`Async script ${script} failed!`, error);
      })
    }, 100);


    // const timeoutAlertMinutes = 10;

    // setTimeout(() => {
    //   if (!script.finished()) {
    //     console.error(`Script ${script} is still running after ${timeoutAlertMinutes} minutes!`);
    //   }
    // }, timeoutAlertMinutes * 60 * 1000);

    console.info({ success: true, message: `Script successfully created`, script });

    return { success: true, message: `Script successfully created`, id: script.id }
  }
}