import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigModule } from '../typed-config/typed-config.module.js';
import { PlaylistController } from './playlist.controller.js';
import { Playlist } from './playlist.entity.js';
import { PlaylistService } from './playlist.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), TypedConfigModule],
  providers: [PlaylistService],
  controllers: [PlaylistController]
})
export class PlaylistModule { }
