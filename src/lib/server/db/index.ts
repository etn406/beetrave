import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { z } from 'zod';

const client = postgres({
  host: z.string().parse(env.POSTGRES_DATABASE_HOST),
  port: z.number().parse(Number.parseInt(env.POSTGRES_DATABASE_PORT ?? '')),
  user: z.string().parse(env.POSTGRES_DATABASE_USER),
  password: z.string().parse(env.POSTGRES_DATABASE_PASSWORD),
  database: z.string().parse(env.POSTGRES_DATABASE_NAME),
});

export const db = drizzle(client);
