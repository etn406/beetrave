import { NestFactory } from "@nestjs/core";
import { DataSource } from "typeorm";
import { AppModule } from "../app.module.js";
import { dataSourceOptionsFactory } from "../database/database.providers.js";
import { TypedConfigService } from "../typed-config/typed-config.service.js";

export async function getDataSourceOutsideNest(): Promise<DataSource> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(TypedConfigService);
  const dataSource = new DataSource(dataSourceOptionsFactory(config));
  await app.close();
  return dataSource;
}
