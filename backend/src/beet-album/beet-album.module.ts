import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BeetItemModule } from 'src/beet-item/beet-item.module';
import { BeetAlbumController } from './beet-album.controller';
import { BeetAlbumService } from './beet-album.service';
import { BeetAlbum } from './entities/beet-album.entity';

@Module({
  imports: [SequelizeModule.forFeature([BeetAlbum]), BeetItemModule],
  controllers: [BeetAlbumController],
  providers: [BeetAlbumService],
})
export class BeetAlbumModule { }