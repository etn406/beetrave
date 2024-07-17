import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module.js';
import { TypedConfigService } from '../typed-config/typed-config.service.js';
import { dataSourceOptionsFactory } from './data-source-options-factory.js';

async function getDataSourceOutsideNest(): Promise<DataSource> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(TypedConfigService);
  const dataSource = new DataSource(dataSourceOptionsFactory(config));
  await app.close();
  return dataSource;
}

export default await getDataSourceOutsideNest();
