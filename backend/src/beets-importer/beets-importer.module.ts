import { Module } from '@nestjs/common';
import { TypedConfigModule } from '../typed-config/typed-config.module.js';
import { BeetsImporterService } from './beets-importer.service.js';

@Module({
  imports: [TypedConfigModule],
  providers: [BeetsImporterService],
  exports: [BeetsImporterService],
})
export class BeetsImporterModule { }
