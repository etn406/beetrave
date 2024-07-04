import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvVars } from './env-vars';

async function bootstrap() {
  checkEnvVars();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3001);
}

bootstrap();
