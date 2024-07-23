import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetAlbumListDto } from './album.interfaces.js';
import { AlbumService } from './album.service.js';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Get('/list')
  list(@Query() params: GetAlbumListDto) {
    return this.albumService.findAll(
      params.page,
      params.count,
      params.order,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }
}
