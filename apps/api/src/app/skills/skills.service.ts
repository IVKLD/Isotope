import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { sql, eq } from 'drizzle-orm';
import {
  DRIZZLE,
  DrizzleDb,
  stackModulesTable,
  INITIAL_STACK_MODULES
} from '@api/database';
import { StackModuleRdo } from '@portfolio/contracts';

@Injectable()
export class SkillsService implements OnModuleInit {
  private readonly logger = new Logger(SkillsService.name);

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  public async onModuleInit(): Promise<void> {
    try {
      const [result] = await this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(stackModulesTable);

      if ((result?.count ?? 0) === 0) {
        this.logger.log('Database stack_modules table is empty. Seeding initial stack modules...');
        await this.db.insert(stackModulesTable).values(INITIAL_STACK_MODULES);
        this.logger.log('Initial stack modules successfully seeded into database.');
      }
    } catch (err) {
      this.logger.warn(
        `Could not verify/seed stack modules in DB: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  public async getModules(): Promise<readonly StackModuleRdo[]> {
    const rows = await this.db.select().from(stackModulesTable).orderBy(stackModulesTable.createdAt);

    return rows.map(r => ({
      id: r.id,
      fileName: r.fileName,
      title: r.title,
      icon: r.icon,
      badge: r.badge,
      description: r.description,
      highlights: r.highlights,
      techStack: r.techStack,
      code: r.code
    }));
  }

  public async getModuleById(id: string): Promise<StackModuleRdo | null> {
    const [row] = await this.db
      .select()
      .from(stackModulesTable)
      .where(eq(stackModulesTable.id, id))
      .limit(1);

    if (!row) return null;

    return {
      id: row.id,
      fileName: row.fileName,
      title: row.title,
      icon: row.icon,
      badge: row.badge,
      description: row.description,
      highlights: row.highlights,
      techStack: row.techStack,
      code: row.code
    };
  }
}
