export type ProjectCategory = 'prod' | 'geek';
export type ProjectFilterCategory = 'all' | ProjectCategory;

export interface ProjectCategoryTab {
  readonly id: ProjectFilterCategory;
  readonly label: string;
  readonly count: number;
}

export interface ProjectCodeSnippet {
  readonly filename: string;
  readonly description: string;
  readonly whyThisCode?: string;
  readonly code: string;
}

export interface Project {
  readonly name: string;
  readonly category: ProjectCategory;
  readonly role: string;
  readonly year: string;
  readonly shortDesc: string;
  readonly fullDesc: string;
  readonly whyCool?: string;
  readonly githubUrl?: string;
  readonly highlights: readonly string[];
  readonly techStack: readonly string[];
  readonly codeSnippet?: ProjectCodeSnippet;
}
