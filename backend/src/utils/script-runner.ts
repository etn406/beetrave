import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module.js";
import { importerConfig } from "../beets-importer/beets-importer.config.js";
import { BeetsImporterService } from "../beets-importer/beets-importer.service.js";

enum Script {
  ImportBeets = 'import-beets',
}

export async function runScript(scriptName: string, _args: unknown[]): Promise<void> {
  const script = Object.values(Script).find(s => s === scriptName);

  if (!script) {
    console.error(
      `The script "${script}" doesn't exist!\nAvailable scripts:\n`
      + Object.values(Script).map(v => `- ${v}`).join('\n')
    );
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  app.init();

  if (script === Script.ImportBeets) {
    const importer = app.get(BeetsImporterService);
    await importer.import(importerConfig.albums);
    await importer.import(importerConfig.items);
  }

  await app.close();
}

const [, , scriptName, ...args] = process.argv;
runScript(scriptName, args);
