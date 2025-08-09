import { Hono } from 'hono';
import { serve } from '@hono/node-server';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { files } from './db/schema/index.js'; // важно: .js при NodeNext
import { env } from './config.js';


const sqlite = new Database(env.DB_FILE_PATH);
const db = drizzle(sqlite);

const app = new Hono();

app.get('/files/:id', (c) => {
  const id = Number(c.req.param('id'));
  if (typeof id !== 'string') return c.json({ error: 'bad id' }, 400);
  db.delete(files).where(eq(files.id, id)).run();
  return c.body(null, 200);
});

const port = 3000;
serve({ fetch: app.fetch, port }, () => console.log(`http://localhost:${port}`));
