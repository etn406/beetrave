import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule { }