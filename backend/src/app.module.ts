import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TrackModule,
    SyncthingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 
