import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnvironment } from './typed-config.entities.js';

@Injectable()
export class TypedConfigService implements AppEnvironment {
  readonly BEETS_LIBRARY_DB: string;
  readonly BEETS_LIBRARY_ROOT: string;
  readonly SYNCTHING_STIGNORE_FILE_NAME: string;
  readonly POSTGRES_DATABASE_HOST: string;
  readonly POSTGRES_DATABASE_PORT: number;
  readonly POSTGRES_DATABASE_USER: string;
  readonly POSTGRES_DATABASE_PASSWORD: string;
  readonly POSTGRES_DATABASE_NAME: string;
  readonly BACKEND_PORT: number;

  constructor(private readonly configService: ConfigService) {
    this.BEETS_LIBRARY_DB = this.configService.get('BEETS_LIBRARY_DB') ?? '';
    this.BEETS_LIBRARY_ROOT = this.configService.get('BEETS_LIBRARY_ROOT') ?? '';
    this.SYNCTHING_STIGNORE_FILE_NAME = this.configService.get('SYNCTHING_STIGNORE_FILE_NAME') ?? '';
    this.POSTGRES_DATABASE_HOST = this.configService.get('POSTGRES_DATABASE_HOST') ?? '';
    this.POSTGRES_DATABASE_PORT = this.configService.get('POSTGRES_DATABASE_PORT') ?? 0;
    this.POSTGRES_DATABASE_USER = this.configService.get('POSTGRES_DATABASE_USER') ?? '';
    this.POSTGRES_DATABASE_PASSWORD = this.configService.get('POSTGRES_DATABASE_PASSWORD') ?? '';
    this.POSTGRES_DATABASE_NAME = this.configService.get('POSTGRES_DATABASE_NAME') ?? '';
    this.BACKEND_PORT = this.configService.get('BACKEND_PORT') ?? 0;
  }

  get<K extends keyof AppEnvironment>(key: K): AppEnvironment[K] {
    return this.configService.get(key) as AppEnvironment[K];
  }
}
