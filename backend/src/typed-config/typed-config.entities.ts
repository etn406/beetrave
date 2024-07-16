import Joi from "joi";

export interface AppEnvironment {
  BEETS_LIBRARY_DB: string;
  BEETS_LIBRARY_ROOT: string;
  SYNCTHING_STIGNORE_FILE_NAME: string;
  POSTGRES_DATABASE_HOST: string;
  POSTGRES_DATABASE_PORT: number;
  POSTGRES_DATABASE_USER: string;
  POSTGRES_DATABASE_PASSWORD: string;
  POSTGRES_DATABASE_NAME: string;
  BACKEND_PORT: number;
}

export const configValidationSchema = Joi.object<AppEnvironment>({
  BEETS_LIBRARY_DB: Joi.string().required(),
  BEETS_LIBRARY_ROOT: Joi.string().required(),
  SYNCTHING_STIGNORE_FILE_NAME: Joi.string().default('.stignore'),
  POSTGRES_DATABASE_HOST: Joi.string().hostname().required(),
  POSTGRES_DATABASE_PORT: Joi.number().port().default(5432),
  POSTGRES_DATABASE_USER: Joi.string().required(),
  POSTGRES_DATABASE_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE_NAME: Joi.string().required(),
  BACKEND_PORT: Joi.number().port().default(3001),
});
