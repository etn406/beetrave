import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity.js';
import { PlaylistType, PutPlaylist } from './playlist.interfaces.js';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>,
  ) { }

  async getSyncthingPlaylist(): Promise<Playlist> {
    return this.playlistRepository.findOneOrFail({
      where: { type: PlaylistType.Syncthing }, select: {
        id: true,
        name: true,
        items: {
          id: true,
        },
      },
    });
  }

  async getPlaylist(playlist_id: number): Promise<Playlist> {
    return this.playlistRepository.findOneOrFail({
      where: { id: playlist_id }, select: {
        id: true,
        name: true,
        items: {
          id: true,
        },
      },
    });
  }

  async putPlaylist(id: number, data: PutPlaylist): Promise<void> {
    const result = await this.playlistRepository.update({ id }, data);

    if (!result.affected) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
