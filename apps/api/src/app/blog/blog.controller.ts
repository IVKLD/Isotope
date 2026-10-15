import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { PostReactionDto } from './blog.dto';
import type { PostStats, PostReactionResponse } from '@portfolio/contracts';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts/:slug/stats')
  @ApiOperation({ summary: 'Get view count and reaction statistics for an article' })
  @ApiResponse({ status: 200, description: 'Post metrics' })
  public async getStats(@Param('slug') slug: string): Promise<PostStats> {
    return this.blogService.getStats(slug);
  }

  @Post('posts/:slug/view')
  @ApiOperation({ summary: 'Increment page view count for an article' })
  @ApiResponse({ status: 200, description: 'Updated view counter' })
  public async incrementView(@Param('slug') slug: string): Promise<{ views: number }> {
    return this.blogService.incrementViews(slug);
  }

  @Post('posts/:slug/react')
  @ApiOperation({ summary: 'Submit a reader reaction to an article' })
  @ApiResponse({ status: 200, description: 'Updated reaction counters' })
  public async addReaction(
    @Param('slug') slug: string,
    @Body() dto: PostReactionDto
  ): Promise<PostReactionResponse> {
    return this.blogService.addReaction(slug, dto.type);
  }
}
