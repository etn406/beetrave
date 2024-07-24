import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',

	dbCredentials: {
		host: z.string().parse(process.env.POSTGRES_DATABASE_HOST),
		port: z.number().parse(process.env.POSTGRES_DATABASE_PORT),
		user: z.string().parse(process.env.POSTGRES_DATABASE_USER),
		password: z.string().parse(process.env.POSTGRES_DATABASE_PASSWORD),
		database: z.string().parse(process.env.POSTGRES_DATABASE_NAME),
	},

	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
