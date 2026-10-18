import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export type DrizzleDb = PostgresJsDatabase<typeof schema>;

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  public readonly client: postgres.Sql;
  public readonly db: DrizzleDb;

  constructor(config: ConfigService) {
    const connectionString =
      config.get<string>('DATABASE_URL') ||
      'postgresql://portfolio:portfolio_dev_pwd@localhost:5432/portfolio_db';

    const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

    this.client = postgres(connectionString, {
      max: isLocal ? 10 : 3,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl: isLocal ? false : 'require',
      onnotice: () => undefined
    });

    this.db = drizzle(this.client, { schema });
  }

  public async onModuleDestroy(): Promise<void> {
    await this.client.end({ timeout: 2 });
  }
}
