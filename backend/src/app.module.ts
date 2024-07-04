import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeetAlbumModule } from './beet-album/beet-album.module';
import { BeetItemModule } from './beet-item/beet-item.module';
import { beetsDatabaseConfig } from './beets-database.config';
import { SyncthingModule } from './syncthing/syncthing.module';

@Module({
  imports: [BeetItemModule, SequelizeModule.forRoot(beetsDatabaseConfig), BeetAlbumModule, SyncthingModule,],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
