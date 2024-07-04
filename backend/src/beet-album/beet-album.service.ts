import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BeetItemService } from 'src/beet-item/beet-item.service';
import { BeetAlbumFE } from 'src/frontend-interfaces/beet-album.interface';
import { BeetAlbum } from './entities/beet-album.entity';

@Injectable()
export class BeetAlbumService {
  constructor(
    @InjectModel(BeetAlbum)
    private beetAlbumRepository: typeof BeetAlbum,
    private beetItemService: BeetItemService,
  ) { }

  async findAll(page: number, pageSize: number): Promise<BeetAlbumFE[]> {
    const albums = await this.beetAlbumRepository.findAll({
      offset: page * pageSize,
      limit: pageSize,
      order: [['added', 'DESC']]
    });

    const items = await this.beetItemService.findItemsOfAlbums(albums.map(({ id }) => id));

    return albums.map(album => ({
      ...this.mapForFE(album),
      items: items
        .filter(({ album_id }) => album_id === album.id)
        .map(item => this.beetItemService.mapForFE(item))
    }));
  }

  findOne(id: number) {
    return this.beetAlbumRepository.findOne({ where: { id } })
  }

  mapForFE(album: BeetAlbum): BeetAlbumFE {
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
      items: []
    }
  }
}
