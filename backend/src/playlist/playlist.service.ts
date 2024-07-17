import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity.js';
import { PlaylistType } from './playlist.interfaces.js';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>,
  ) { }

  async getSyncthingPlaylist(): Promise<Playlist> {
    return this.playlistRepository.findOneOrFail({ where: { type: PlaylistType.Syncthing } })
  }
}
