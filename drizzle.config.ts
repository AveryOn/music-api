import { defineConfig } from 'drizzle-kit';
import { env } from './src/config.js';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dbCredentials: { url: env.DB_FILE_PATH },
  strict: true,
  verbose: true,
});