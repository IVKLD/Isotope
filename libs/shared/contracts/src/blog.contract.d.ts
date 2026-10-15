export type ReactionType = 'like' | 'fire' | 'rocket' | 'mindblown';

export interface PostStats {
  slug: string;
  views: number;
  reactions: Record<ReactionType, number>;
}

export interface PostReactionRequest {
  type: ReactionType;
}

export interface PostReactionResponse {
  success: boolean;
  slug: string;
  reactions: Record<ReactionType, number>;
}
