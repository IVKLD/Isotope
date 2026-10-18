import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import {
  DRIZZLE,
  DrizzleDb,
  projectsTable,
  INITIAL_PROJECTS
} from '@backend/database';
import {
  ProjectCategoryTabRdo,
  ProjectRdo,
  ProjectsSummaryRdo
} from '@isotope/contracts';

@Injectable()
export class ProjectsService implements OnModuleInit {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  public async onModuleInit(): Promise<void> {
    try {
      const [result] = await this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(projectsTable);

      if ((result?.count ?? 0) === 0) {
        this.logger.log('Database projects table is empty. Seeding initial projects...');
        await this.db.insert(projectsTable).values(INITIAL_PROJECTS);
        this.logger.log('Initial projects successfully seeded into database.');
      }
    } catch (err) {
      this.logger.warn(
        `Could not verify/seed projects in DB: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  public async getProjects(): Promise<readonly ProjectRdo[]> {
    const rows = await this.db
      .select()
      .from(projectsTable)
      .orderBy(projectsTable.sortOrder);

    return rows.map(r => ({
      name: r.name,
      category: r.category,
      role: r.role,
      year: r.year,
      shortDesc: r.shortDesc,
      fullDesc: r.fullDesc,
      whyCool: r.whyCool ?? undefined,
      githubUrl: r.githubUrl ?? undefined,
      highlights: r.highlights,
      techStack: r.techStack,
      codeSnippet: r.codeSnippet ?? undefined
    }));
  }

  public async getCategories(): Promise<readonly ProjectCategoryTabRdo[]> {
    const projects = await this.getProjects();

    return [
      { id: 'all', label: 'Все', count: projects.length },
      {
        id: 'prod',
        label: 'Продуктовые',
        count: projects.filter(p => p.category === 'prod').length
      },
      {
        id: 'geek',
        label: 'Гиковские',
        count: projects.filter(p => p.category === 'geek').length
      }
    ];
  }

  public async getProjectsSummary(): Promise<ProjectsSummaryRdo> {
    const projects = await this.getProjects();

    return {
      totalProjects: projects.length,
      featuredProjects: projects.filter(p => p.category === 'prod').length,
      stats: {
        'vortex-dl': {
          id: 'vortex-dl',
          githubRepo: 'IVKLD/VortexDL',
          stars: 12,
          forks: 3,
          lastUpdated: new Date().toISOString()
        },
        'open-pencil': {
          id: 'open-pencil',
          githubRepo: 'IVKLD/open-pencil',
          stars: 8,
          forks: 1,
          lastUpdated: new Date().toISOString()
        },
        portfolio: {
          id: 'portfolio',
          githubRepo: 'IVKLD/portfolio',
          stars: 5,
          forks: 0,
          lastUpdated: new Date().toISOString()
        }
      }
    };
  }
}
