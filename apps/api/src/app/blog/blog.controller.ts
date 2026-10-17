import { Body, Controller, Get, Param, Post, Query, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { BlogFilterDto, PostReactionDto } from './blog.dto';
import {
  PostStatsRdo,
  PostReactionRdo,
  BlogSummaryRdo,
  BlogPostRdo
} from '@portfolio/contracts';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  @ApiOperation({ summary: 'Get published blog post summaries with optional filtering' })
  @ApiResponse({ status: 200, description: 'List of blog post summaries' })
  public async getPosts(@Query() query: BlogFilterDto): Promise<readonly BlogSummaryRdo[]> {
    return this.blogService.getPosts(query);
  }

  @Get('posts/:slug')
  @ApiOperation({ summary: 'Get full blog post by slug' })
  @ApiResponse({ status: 200, description: 'Full blog post details' })
  public async getPost(@Param('slug') slug: string): Promise<BlogPostRdo> {
    const post = await this.blogService.getPostBySlug(slug);
    if (!post) {
      throw new NotFoundException(`Article with slug "${slug}" not found`);
    }
    return post;
  }

  @Get('posts/:slug/stats')
  @ApiOperation({ summary: 'Get reader reaction statistics for an article' })
  @ApiResponse({ status: 200, description: 'Post metrics' })
  public async getStats(@Param('slug') slug: string): Promise<PostStatsRdo> {
    return this.blogService.getStats(slug);
  }

  @Post('posts/:slug/react')
  @ApiOperation({ summary: 'Submit a reader reaction to an article' })
  @ApiResponse({ status: 200, description: 'Updated reaction counters' })
  public async addReaction(
    @Param('slug') slug: string,
    @Body() dto: PostReactionDto
  ): Promise<PostReactionRdo> {
    return this.blogService.addReaction(slug, dto.type);
  }
}
