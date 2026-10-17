import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { sql, eq } from 'drizzle-orm';
import {
  DRIZZLE,
  DrizzleDb,
  comparisonsTable,
  INITIAL_COMPETITOR_COMPARISONS
} from '@api/database';
import { CompetitorComparisonRdo, CompetitorKey } from '@portfolio/contracts';

@Injectable()
export class ComparisonsService implements OnModuleInit {
  private readonly logger = new Logger(ComparisonsService.name);

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  public async onModuleInit(): Promise<void> {
    try {
      const [result] = await this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(comparisonsTable);

      if ((result?.count ?? 0) === 0) {
        this.logger.log('Database comparisons table is empty. Seeding initial competitor comparisons...');
        await this.db.insert(comparisonsTable).values(INITIAL_COMPETITOR_COMPARISONS);
        this.logger.log('Initial competitor comparisons successfully seeded into database.');
      }
    } catch (err) {
      this.logger.warn(
        `Could not verify/seed competitor comparisons in DB: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  public async getComparisons(): Promise<readonly CompetitorComparisonRdo[]> {
    const rows = await this.db.select().from(comparisonsTable).orderBy(comparisonsTable.id);

    return rows.map(r => ({
      id: r.id,
      key: r.key,
      name: r.name,
      badgeText: r.badgeText,
      tagline: r.tagline,
      accentColor: r.accentColor,
      description: r.description,
      verdict: r.verdict,
      aspects: r.aspects
    }));
  }

  public async getByKey(key: CompetitorKey): Promise<CompetitorComparisonRdo | null> {
    const [row] = await this.db
      .select()
      .from(comparisonsTable)
      .where(eq(comparisonsTable.key, key))
      .limit(1);

    if (!row) return null;

    return {
      id: row.id,
      key: row.key,
      name: row.name,
      badgeText: row.badgeText,
      tagline: row.tagline,
      accentColor: row.accentColor,
      description: row.description,
      verdict: row.verdict,
      aspects: row.aspects
    };
  }
}
