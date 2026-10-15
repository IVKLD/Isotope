import { pgTable, serial, text, timestamp, integer, boolean, varchar } from 'drizzle-orm/pg-core';

export const feedbackTable = pgTable('feedback', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  contact: text('contact').notNull(),
  message: text('message').notNull(),
  source: varchar('source', { length: 32 }).default('web-form').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const postStatsTable = pgTable('post_stats', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  views: integer('views').default(0).notNull(),
  likes: integer('likes').default(0).notNull(),
  fires: integer('fires').default(0).notNull(),
  rockets: integer('rockets').default(0).notNull(),
  mindblown: integer('mindblown').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const terminalLogsTable = pgTable('terminal_logs', {
  id: serial('id').primaryKey(),
  command: text('command').notNull(),
  args: text('args'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
