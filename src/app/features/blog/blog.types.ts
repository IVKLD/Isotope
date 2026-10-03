export interface BlogCallout {
  readonly type: 'warning' | 'danger';
  readonly title: string;
  readonly text: string;
}

export interface BlogCodeBlock {
  readonly title: string;
  readonly code: string;
  readonly language: string;
  readonly footerNote?: string;
  readonly type?: 'bad' | 'good';
}

export interface BlogRuleCard {
  readonly title: string;
  readonly text: string;
}

export interface BlogSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly quote?: string;
  readonly list?: readonly string[];
  readonly callout?: BlogCallout;
  readonly codeBlocks?: readonly BlogCodeBlock[];
  readonly rules?: readonly BlogRuleCard[];
}

export interface BlogSummary {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly excerpt: string;
  readonly date: string;
  readonly readTime: string;
  readonly tags: readonly string[];
  readonly featured?: boolean;
}

export interface BlogPost extends BlogSummary {
  readonly keyTakeaway: string;
  readonly sections: readonly BlogSection[];
}

export const ALL_BLOG_TAGS = [
  'Все',
  'AI & LLM',
  'Архитектура',
  'Angular 22',
  'Signals',
  'Rust 2024',
  'Code Quality'
] as const;
