import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import Joi from 'joi';

export function RespectJoiSchema(schema: Joi.Schema, validationOptions?: ValidationOptions) {
  return function (obj: object, propertyName: string) {
    registerDecorator({
      name: 'joiSchema',
      target: obj.constructor,
      propertyName,
      constraints: [schema],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const joiSchema = args.constraints[0];
          const result = joiSchema.validate(value).error;

          if (result.error) {
            console.error(`Validation error: ${result.error}`);
            return false;
          } else {
            return true;
          }
        },
      },
    });
  };
}