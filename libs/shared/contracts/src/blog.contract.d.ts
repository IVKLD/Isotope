export type ReactionType = 'like' | 'fire' | 'rocket' | 'mindblown';

export type BlogCalloutRdo = {
  type: 'warning' | 'danger';
  title: string;
  text: string;
};

export type BlogCodeBlockRdo = {
  title: string;
  code: string;
  language: string;
  footerNote?: string;
  type?: 'bad' | 'good';
};

export type BlogRuleCardRdo = {
  title: string;
  text: string;
};

export type BlogSectionRdo = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  quote?: string;
  list?: readonly string[];
  callout?: BlogCalloutRdo;
  codeBlocks?: readonly BlogCodeBlockRdo[];
  rules?: readonly BlogRuleCardRdo[];
};

export type BlogSummaryRdo = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: readonly string[];
  featured?: boolean;
};

export type BlogFilterDto = {
  tag?: string;
  search?: string;
};

export type BlogPostRdo = BlogSummaryRdo & {
  keyTakeaway: string;
  sections: readonly BlogSectionRdo[];
};

export type PostStatsRdo = {
  slug: string;
  reactions: Record<ReactionType, number>;
};

export type PostReactionDto = {
  type: ReactionType;
};

export type PostReactionRdo = {
  success: boolean;
  slug: string;
  reactions: Record<ReactionType, number>;
};
