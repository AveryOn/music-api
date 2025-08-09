import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { env } from '../config.js';

const sqlite = new Database(env.DB_FILE_PATH);
const db = drizzle(sqlite);

await migrate(db, { migrationsFolder: './drizzle' });

console.log('✅ Migrations applied');