export type CompetitorKey = 'react' | 'vue' | 'svelte';

export type FrameworkPointRdo = {
  title: string;
  points: readonly string[];
  code?: string;
  codeLang?: string;
};

export type ComparisonAspectRdo = {
  title: string;
  competitor: FrameworkPointRdo;
  angular: FrameworkPointRdo;
};

export type AuditCheckRdo = {
  name: string;
  status: 'PASS' | 'WARN' | 'INFO';
  description: string;
};

export type VerdictRdo = {
  command: string;
  title: string;
  summary: string;
  checks: readonly AuditCheckRdo[];
};

export type CompetitorTabMetaRdo = {
  key: CompetitorKey;
  name: string;
  badgeText: string;
  tagline: string;
  accentColor: string;
};

export type CompetitorComparisonRdo = CompetitorTabMetaRdo & {
  id: number;
  description: string;
  verdict: VerdictRdo;
  aspects: readonly ComparisonAspectRdo[];
};
