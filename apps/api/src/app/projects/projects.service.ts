import { Injectable } from '@nestjs/common';
import type { ProjectsSummaryResponse } from '@portfolio/contracts';

@Injectable()
export class ProjectsService {
  public getProjectsSummary(): ProjectsSummaryResponse {
    return {
      totalProjects: 6,
      featuredProjects: 4,
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
