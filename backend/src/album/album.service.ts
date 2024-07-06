import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumFE } from 'src/frontend-interfaces/album.interface';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    private trackService: TrackService,
  ) { }

  async findAll(page: number, pageSize: number): Promise<AlbumFE[]> {
    const albums = await this.albumRepository.find({
      skip: page * pageSize,
      take: pageSize,
      order: {
        added: 'DESC'
      }
    });

    const items = await this.trackService.findItemsOfAlbums(albums.map(({ id }) => id));

    return albums.map(album => ({
      ...this.mapForFE(album),
      items: items
        .filter(({ album_id }) => album_id === album.id)
        .map(item => this.trackService.mapForFE(item))
    }));
  }

  findOne(id: number) {
    return this.albumRepository.findOne({ where: { id } })
  }

  mapForFE(album: Album): AlbumFE {
    return {
      id: album.id,
      added: album.added,
      albumartist: album.albumartist,
      album: album.album,
      genre: album.genre,
      year: album.year,
      disctotal: album.disctotal,
      albumdisambig: album.albumdisambig,
      original_year: album.original_year,
      style: album.style,
      tracks: []
    }
  }
}
