import { Inject, Injectable } from '@nestjs/common';
import { sql, eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb, postStatsTable } from '@api/database';
import type { PostStats, ReactionType, PostReactionResponse } from '@portfolio/contracts';

const COLUMN_MAP = {
  like: postStatsTable.likes,
  fire: postStatsTable.fires,
  rocket: postStatsTable.rockets,
  mindblown: postStatsTable.mindblown
} as const;

@Injectable()
export class BlogService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  public async getStats(slug: string): Promise<PostStats> {
    const [row] = await this.db
      .select()
      .from(postStatsTable)
      .where(eq(postStatsTable.slug, slug))
      .limit(1);

    return {
      slug,
      views: row?.views ?? 0,
      reactions: {
        like: row?.likes ?? 0,
        fire: row?.fires ?? 0,
        rocket: row?.rockets ?? 0,
        mindblown: row?.mindblown ?? 0
      }
    };
  }

  public async incrementViews(slug: string): Promise<{ views: number }> {
    const [result] = await this.db
      .insert(postStatsTable)
      .values({ slug, views: 1 })
      .onConflictDoUpdate({
        target: postStatsTable.slug,
        set: {
          views: sql`${postStatsTable.views} + 1`,
          updatedAt: new Date()
        }
      })
      .returning({ views: postStatsTable.views });

    return { views: result.views };
  }

  public async addReaction(slug: string, type: ReactionType): Promise<PostReactionResponse> {
    const targetColumn = COLUMN_MAP[type];

    const [result] = await this.db
      .insert(postStatsTable)
      .values({
        slug,
        [targetColumn.name]: 1
      })
      .onConflictDoUpdate({
        target: postStatsTable.slug,
        set: {
          [targetColumn.name]: sql`${targetColumn} + 1`,
          updatedAt: new Date()
        }
      })
      .returning();

    return {
      success: true,
      slug,
      reactions: {
        like: result.likes,
        fire: result.fires,
        rocket: result.rockets,
        mindblown: result.mindblown
      }
    };
  }
}
