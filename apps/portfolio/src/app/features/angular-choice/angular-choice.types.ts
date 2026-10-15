export enum CompetitorKey {
  React = 'react',
  Vue = 'vue',
  Svelte = 'svelte'
}

export interface FrameworkPoint {
  readonly title: string;
  readonly points: readonly string[];
  readonly code?: string;
  readonly codeLang?: string;
}

export interface ComparisonAspect {
  readonly title: string;
  readonly competitor: FrameworkPoint;
  readonly angular: FrameworkPoint;
}

export interface AuditCheck {
  readonly name: string;
  readonly status: 'PASS' | 'WARN' | 'INFO';
  readonly description: string;
}

export interface VerdictData {
  readonly command: string;
  readonly title: string;
  readonly summary: string;
  readonly checks: readonly AuditCheck[];
}

export interface CompetitorTabMeta {
  readonly key: CompetitorKey;
  readonly name: string;
  readonly badgeText: string;
  readonly tagline: string;
  readonly accentColor: string;
}

export interface CompetitorComparison extends CompetitorTabMeta {
  readonly description: string;
  readonly verdict: VerdictData;
  readonly aspects: readonly ComparisonAspect[];
}
