import { importAllTablesFromBeets } from '$lib/server/beets-importer';
import { runScript } from '$lib/server/scripts/run-script';
import { ScriptName } from '$lib/types/script';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params }) => {
  const dryRun = !!params.dryRun;
  
  console.log({ params }, { dryRun });

  runScript(
    ScriptName.BeetsImport, 
    importAllTablesFromBeets(dryRun)
  ).then();

  return new Response('ok')
}