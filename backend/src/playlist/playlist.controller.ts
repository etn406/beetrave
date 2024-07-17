import { Controller, Get } from '@nestjs/common';
import { Playlist } from './playlist.entity.js';
import { PlaylistService } from './playlist.service.js';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Get('syncthing')
  async getSyncthingPlaylist(): Promise<Playlist> {
    return this.playlistService.getSyncthingPlaylist();
  }
}
