import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { TypedConfigService } from './typed-config/typed-config.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get(TypedConfigService);
  await app.listen(config.get('BACKEND_PORT'));
}

bootstrap();
