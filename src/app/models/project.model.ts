export interface ProjectCodeSnippet {
  filename: string;
  description: string;
  code: string;
}

export interface Project {
  name: string;
  role: string;
  year: string;
  shortDesc: string;
  fullDesc: string;
  githubUrl?: string;
  isPrivate?: boolean;
  highlights: string[];
  techStack: string[];
  codeSnippet?: ProjectCodeSnippet;
}
