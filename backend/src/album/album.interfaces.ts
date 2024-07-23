import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { FindOptionsOrder } from 'typeorm';
import { OrderSchemaFactory } from '../utils/find-options-order-value-schema.js';
import { RespectJoiSchema } from '../utils/respect-joi-schema.validator.js';
import type { Album } from './album.entity.js';

export class GetAlbumListDto {
  @RespectJoiSchema(OrderSchemaFactory<Album>('added', 'name'))
  @Transform(({ value }) => JSON.parse(value))
  order: FindOptionsOrder<Album> = { added: 'desc' };

  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  page = 0;

  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  count = 10;
}