import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './apps/api/src/database/schema.ts',
  out: './apps/api/src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://portfolio:portfolio_dev_pwd@localhost:5432/portfolio_db'
  },
  verbose: true,
  strict: true
});
