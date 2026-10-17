import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  varchar,
  jsonb
} from 'drizzle-orm/pg-core';
import {
  BlogSectionRdo,
  VerdictRdo,
  ComparisonAspectRdo,
  CompetitorKey,
  ProjectCategory,
  ProjectCodeSnippetRdo
} from '@portfolio/contracts';

export const feedbackTable = pgTable('feedback', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  contact: text('contact').notNull(),
  message: text('message').notNull(),
  source: varchar('source', { length: 32 }).default('web-form').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const postsTable = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  excerpt: text('excerpt').notNull(),
  date: varchar('date', { length: 64 }).notNull(),
  readTime: varchar('read_time', { length: 32 }).notNull(),
  tags: jsonb('tags').$type<readonly string[]>().notNull(),
  featured: boolean('featured').default(false).notNull(),
  keyTakeaway: text('key_takeaway').notNull(),
  sections: jsonb('sections').$type<readonly BlogSectionRdo[]>().notNull(),
  likes: integer('likes').default(0).notNull(),
  fires: integer('fires').default(0).notNull(),
  rockets: integer('rockets').default(0).notNull(),
  mindblown: integer('mindblown').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const terminalLogsTable = pgTable('terminal_logs', {
  id: serial('id').primaryKey(),
  command: text('command').notNull(),
  args: text('args'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const comparisonsTable = pgTable('competitor_comparisons', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 32 }).$type<CompetitorKey>().unique().notNull(),
  name: varchar('name', { length: 64 }).notNull(),
  badgeText: varchar('badge_text', { length: 128 }).notNull(),
  tagline: text('tagline').notNull(),
  accentColor: varchar('accent_color', { length: 32 }).notNull(),
  description: text('description').notNull(),
  verdict: jsonb('verdict').$type<VerdictRdo>().notNull(),
  aspects: jsonb('aspects').$type<readonly ComparisonAspectRdo[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const stackModulesTable = pgTable('stack_modules', {
  id: varchar('id', { length: 64 }).primaryKey(),
  fileName: varchar('file_name', { length: 128 }).notNull(),
  title: text('title').notNull(),
  icon: varchar('icon', { length: 64 }).notNull(),
  badge: varchar('badge', { length: 128 }).notNull(),
  description: text('description').notNull(),
  highlights: jsonb('highlights').$type<readonly string[]>().notNull(),
  techStack: jsonb('tech_stack').$type<readonly string[]>().notNull(),
  code: text('code').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  category: varchar('category', { length: 32 }).$type<ProjectCategory>().notNull(),
  role: text('role').notNull(),
  year: varchar('year', { length: 64 }).notNull(),
  shortDesc: text('short_desc').notNull(),
  fullDesc: text('full_desc').notNull(),
  whyCool: text('why_cool'),
  githubUrl: text('github_url'),
  highlights: jsonb('highlights').$type<readonly string[]>().notNull(),
  techStack: jsonb('tech_stack').$type<readonly string[]>().notNull(),
  codeSnippet: jsonb('code_snippet').$type<ProjectCodeSnippetRdo>(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

