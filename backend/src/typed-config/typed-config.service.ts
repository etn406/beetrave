import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnvironment } from './typed-config.entities.js';

@Injectable()
export class TypedConfigService {
  constructor(private readonly configService: ConfigService) { }

  get<K extends keyof AppEnvironment>(key: K): AppEnvironment[K] {
    return this.configService.get(key) as AppEnvironment[K];
  }
}
