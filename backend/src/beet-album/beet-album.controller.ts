import { Controller, Get, Param } from '@nestjs/common';
import { BeetAlbumService } from './beet-album.service';

@Controller('album')
export class BeetAlbumController {
  constructor(private readonly beetAlbumService: BeetAlbumService) { }

  @Get('/list')
  findAll(page = 1, pageSize = 30) {
    return this.beetAlbumService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beetAlbumService.findOne(+id);
  }
}
