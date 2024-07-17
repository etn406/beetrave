import Joi from "joi";
import { FindOptionsOrderValue } from "typeorm";

export function getFindOptionsOrderValueSchema(): Joi.Schema<FindOptionsOrderValue> {
  return Joi.any().valid(
    Joi.string().valid('asc', 'desc'),
    Joi.object({
      direction: Joi.string().optional().valid('asc', 'desc'),
      nulls: Joi.string().optional().valid('asc', 'desc'),
    })
  );
}
