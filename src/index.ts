import { Hono } from 'hono';
import { serve } from '@hono/node-server';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { files } from './db/schema/index.js'; // важно: .js при NodeNext
import { env } from './config.js';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';


const dir = join(process.cwd(), 'data');
mkdirSync(dir, { recursive: true });
console.debug(`Папка создана: ${dir}`);

const sqlite = new Database(env.DB_FILE_PATH);
const db = drizzle(sqlite);

const app = new Hono();

app.get('/files/:id', (c) => {
  const id = Number(c.req.param('id'));
  if (typeof id !== 'string') return c.json({ error: 'bad id' }, 400);
  db.delete(files).where(eq(files.id, id)).run();
  return c.body(null, 200);
});

const PORT = env.PORT;
serve({ fetch: app.fetch, port: PORT }, () => console.log(`http://localhost:${PORT}`));
