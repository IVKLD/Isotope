import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import {
  ProjectCategoryTabRdo,
  ProjectRdo,
  ProjectsSummaryRdo
} from '@portfolio/contracts';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all portfolio projects' })
  @ApiResponse({ status: 200, description: 'List of portfolio projects' })
  public async getProjects(): Promise<readonly ProjectRdo[]> {
    return this.projectsService.getProjects();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get project categories with project counts' })
  @ApiResponse({ status: 200, description: 'Project category tabs' })
  public async getCategories(): Promise<readonly ProjectCategoryTabRdo[]> {
    return this.projectsService.getCategories();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get projects statistics and repository metrics' })
  @ApiResponse({ status: 200, description: 'Projects summary' })
  public async getSummary(): Promise<ProjectsSummaryRdo> {
    return this.projectsService.getProjectsSummary();
  }
}
