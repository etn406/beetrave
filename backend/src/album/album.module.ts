import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '../item/item.module.js';
import { TypedConfigModule } from '../typed-config/typed-config.module.js';
import { AlbumController } from './album.controller.js';
import { Album } from './album.entity.js';
import { AlbumService } from './album.service.js';

@Module({
  imports: [ItemModule, TypeOrmModule.forFeature([Album]), TypedConfigModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule { }