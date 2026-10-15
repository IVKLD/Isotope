export interface ProjectStats {
  id: string;
  githubRepo?: string;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
}

export interface ProjectsSummaryResponse {
  totalProjects: number;
  featuredProjects: number;
  stats: Record<string, ProjectStats>;
}
