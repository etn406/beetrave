import { DataSourceOptions } from 'typeorm/browser';
import { Album } from '../album/album.entity.js';
import { Item } from '../item/item.entity.js';
import { Playlist } from '../playlist/playlist.entity.js';
import { TypedConfigService } from '../typed-config/typed-config.service.js';

export function dataSourceOptionsFactory(config: TypedConfigService): DataSourceOptions {
  const options: DataSourceOptions = {
    type: 'postgres',
    host: config.get('POSTGRES_DATABASE_HOST'),
    port: config.get('POSTGRES_DATABASE_PORT'),
    username: config.get('POSTGRES_DATABASE_USER'),
    password: config.get('POSTGRES_DATABASE_PASSWORD'),
    database: config.get('POSTGRES_DATABASE_NAME'),
    entities: [Album, Item, Playlist],
    migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: false,
  };

  return options;
}