import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { sql, eq, and, or, ilike, SQL } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb, postsTable, INITIAL_BLOG_POSTS } from '@api/database';
import {
  PostStatsRdo,
  ReactionType,
  PostReactionRdo,
  BlogSummaryRdo,
  BlogPostRdo,
  BlogFilterDto
} from '@portfolio/contracts';

const COLUMN_MAP = {
  like: postsTable.likes,
  fire: postsTable.fires,
  rocket: postsTable.rockets,
  mindblown: postsTable.mindblown
} as const;

@Injectable()
export class BlogService implements OnModuleInit {
  private readonly logger = new Logger(BlogService.name);

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  public async onModuleInit(): Promise<void> {
    try {
      const [result] = await this.db.select({ count: sql<number>`count(*)::int` }).from(postsTable);

      if ((result?.count ?? 0) === 0) {
        this.logger.log('Database posts table is empty. Seeding initial blog articles...');
        await this.db.insert(postsTable).values(INITIAL_BLOG_POSTS);
        this.logger.log('Initial blog articles successfully seeded into database.');
      }
    } catch (err) {
      this.logger.warn(
        `Could not verify/seed blog posts in DB: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  public async getPosts(filter?: BlogFilterDto): Promise<readonly BlogSummaryRdo[]> {
    const conditions: SQL[] = [];

    if (filter?.tag && filter.tag !== 'Все') {
      conditions.push(sql`${postsTable.tags} @> ${JSON.stringify([filter.tag])}::jsonb`);
    }

    if (filter?.search && filter.search.trim()) {
      const term = `%${filter.search.trim()}%`;
      const searchCondition = or(
        ilike(postsTable.title, term),
        ilike(postsTable.subtitle, term),
        ilike(postsTable.excerpt, term),
        sql`${postsTable.tags}::text ilike ${term}`
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const query = this.db
      .select({
        id: postsTable.id,
        slug: postsTable.slug,
        title: postsTable.title,
        subtitle: postsTable.subtitle,
        excerpt: postsTable.excerpt,
        date: postsTable.date,
        readTime: postsTable.readTime,
        tags: postsTable.tags,
        featured: postsTable.featured
      })
      .from(postsTable);

    if (conditions.length > 0) {
      return query.where(and(...conditions));
    }

    return query;
  }

  public async getPostBySlug(slug: string): Promise<BlogPostRdo | null> {
    const [row] = await this.db.select().from(postsTable).where(eq(postsTable.slug, slug)).limit(1);

    if (!row) return null;

    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle,
      excerpt: row.excerpt,
      date: row.date,
      readTime: row.readTime,
      tags: row.tags,
      featured: row.featured,
      keyTakeaway: row.keyTakeaway,
      sections: row.sections
    };
  }

  public async getStats(slug: string): Promise<PostStatsRdo> {
    const [row] = await this.db
      .select({
        likes: postsTable.likes,
        fires: postsTable.fires,
        rockets: postsTable.rockets,
        mindblown: postsTable.mindblown
      })
      .from(postsTable)
      .where(eq(postsTable.slug, slug))
      .limit(1);

    return {
      slug,
      reactions: {
        like: row?.likes ?? 0,
        fire: row?.fires ?? 0,
        rocket: row?.rockets ?? 0,
        mindblown: row?.mindblown ?? 0
      }
    };
  }

  public async addReaction(slug: string, type: ReactionType): Promise<PostReactionRdo> {
    const targetColumn = COLUMN_MAP[type];
    if (!targetColumn) {
      throw new Error(`Unsupported reaction type: ${type}`);
    }

    const [result] = await this.db
      .update(postsTable)
      .set({
        [targetColumn.name]: sql`${targetColumn} + 1`,
        updatedAt: new Date()
      })
      .where(eq(postsTable.slug, slug))
      .returning();

    return {
      success: true,
      slug,
      reactions: {
        like: result?.likes ?? 0,
        fire: result?.fires ?? 0,
        rocket: result?.rockets ?? 0,
        mindblown: result?.mindblown ?? 0
      }
    };
  }
}
