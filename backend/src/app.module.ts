import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album/album.entity';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BEETS_LIBRARY_DB } from './env-vars';
import { SyncthingModule } from './syncthing/syncthing.module';
import { Track } from './track/track.entity';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: BEETS_LIBRARY_DB,
      entities: [Track, Album],
    }),
    AlbumModule,
    TrackModule,
    SyncthingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 
