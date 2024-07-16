import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypedConfigService } from './typed-config.service.js';

@Module({
  imports: [ConfigModule],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class TypedConfigModule { }
