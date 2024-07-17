import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigModule } from '../typed-config/typed-config.module.js';
import { ItemController } from './item.controller.js';
import { Item } from './item.entity.js';
import { ItemService } from './item.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), TypedConfigModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule { }
