import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import Joi from 'joi';
import { Playlist } from './playlist.entity.js';
import { PutPlaylistSchema } from './playlist.interfaces.js';
import { PlaylistService } from './playlist.service.js';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Get(':id')
  async getSyncthingPlaylist(@Param('id') id: number): Promise<Playlist> {
    return this.playlistService.getPlaylist(id);
  }

  @Put(':id')
  async putPlaylist(@Param('id') id: number, @Body() body: unknown): Promise<unknown> {
    const put_playlist = Joi.attempt(body, PutPlaylistSchema);
    return this.playlistService.putPlaylist(id, put_playlist);
  }
}
