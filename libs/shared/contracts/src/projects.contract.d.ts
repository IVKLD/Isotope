export type ProjectCategory = 'prod' | 'geek';
export type ProjectFilterCategory = 'all' | ProjectCategory;

export type ProjectCategoryTabRdo = {
  id: ProjectFilterCategory;
  label: string;
  count: number;
};

export type ProjectCodeSnippetRdo = {
  filename: string;
  description: string;
  whyThisCode?: string;
  code: string;
};

export type ProjectRdo = {
  name: string;
  category: ProjectCategory;
  role: string;
  year: string;
  shortDesc: string;
  fullDesc: string;
  whyCool?: string;
  githubUrl?: string;
  highlights: readonly string[];
  techStack: readonly string[];
  codeSnippet?: ProjectCodeSnippetRdo;
};

export type ProjectStatsRdo = {
  id: string;
  githubRepo?: string;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
};

export type ProjectsSummaryRdo = {
  totalProjects: number;
  featuredProjects: number;
  stats: Record<string, ProjectStatsRdo>;
};
