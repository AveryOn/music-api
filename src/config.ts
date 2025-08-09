import 'dotenv/config';
import { z } from 'zod';

const Env = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DB_FILE_PATH: z.string().min(1, 'DB_FILE_PATH is required'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const parsed = Env.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid ENV variables`);
}

export const env = parsed.data;
