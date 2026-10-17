import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ReactionType } from '@portfolio/contracts';

export class BlogFilterDto {
  @ApiPropertyOptional({ description: 'Filter by tag/category', example: 'Angular 22' })
  @IsOptional()
  @IsString()
  public tag?: string;

  @ApiPropertyOptional({ description: 'Search query for articles', example: 'Signals' })
  @IsOptional()
  @IsString()
  public search?: string;
}

export class PostReactionDto {
  @ApiProperty({
    description: 'Reaction type to add',
    enum: ['like', 'fire', 'rocket', 'mindblown'],
    example: 'fire'
  })
  @IsIn(['like', 'fire', 'rocket', 'mindblown'])
  public type!: ReactionType;
}
