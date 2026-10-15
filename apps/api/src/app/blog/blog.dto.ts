import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import type { PostReactionRequest, ReactionType } from '@portfolio/contracts';

const VALID_REACTIONS: ReactionType[] = ['like', 'fire', 'rocket', 'mindblown'];

export class PostReactionDto implements PostReactionRequest {
  @ApiProperty({ description: 'Reaction type to add', enum: VALID_REACTIONS, example: 'fire' })
  @IsIn(VALID_REACTIONS)
  public type!: ReactionType;
}
