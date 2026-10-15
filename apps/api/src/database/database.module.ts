import { Global, Module } from '@nestjs/common';
import { DatabaseService, DrizzleDb } from './database.service';

export const DRIZZLE = Symbol('DRIZZLE_DB');

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: DRIZZLE,
      inject: [DatabaseService],
      useFactory: (dbService: DatabaseService): DrizzleDb => dbService.db
    }
  ],
  exports: [DatabaseService, DRIZZLE]
})
export class DatabaseModule {}
