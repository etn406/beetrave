import { Controller, Get, Param } from '@nestjs/common';
import { AlbumService } from './album.service.js';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Get('/list')
  findAll(page = 1, pageSize = 30) {
    return this.albumService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }
}
