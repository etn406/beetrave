import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BeetsImporterModule } from './beets-importer/beets-importer.module.js';
import { dataSourceOptionsFactory } from './database/database.providers.js';
import { ItemModule } from './item/item.module.js';
import { PlaylistModule } from './playlist/playlist.module.js';
import { SyncthingModule } from './syncthing/syncthing.module.js';
import { configValidationSchema } from './typed-config/typed-config.entities.js';
import { TypedConfigModule } from './typed-config/typed-config.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dataSourceOptionsFactory,
    }),
    AlbumModule,
    ItemModule,
    SyncthingModule,
    PlaylistModule,
    TypedConfigModule,
    BeetsImporterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 
