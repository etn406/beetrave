import Joi from "joi";
import { FindOptionsOrder, FindOptionsOrderValue } from "typeorm";

export const FindOptionsOrderValueSchema: Joi.Schema<FindOptionsOrderValue> = Joi.alternatives().try(
  Joi.string().valid("ASC", "DESC", "asc", "desc"),
  Joi.number().valid(1, -1),
  Joi.object({
    direction: Joi.string().valid("asc", "desc", "ASC", "DESC").optional(),
    nulls: Joi.string().valid("first", "last", "FIRST", "LAST").optional(),
  })
);

export function OrderSchemaFactory<E>(...keys: (keyof E)[]): Joi.Schema<FindOptionsOrder<E>> {
  const schema: Record<string, Joi.Schema> & Joi.SchemaLike = {};

  for (const key of keys) {
    schema[key as string] = FindOptionsOrderValueSchema;
  }

  return Joi.object(schema);
}