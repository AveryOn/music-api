import { sqliteTable, text,  } from 'drizzle-orm/sqlite-core';

const id = text('id').primaryKey().$defaultFn(() => crypto.randomUUID())

export const files = sqliteTable('files', {
  id,
  key: text('key').notNull().unique(),
  path: text('path').notNull().unique(),
});
