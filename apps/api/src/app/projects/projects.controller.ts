import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import type { ProjectsSummaryResponse } from '@portfolio/contracts';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get projects statistics and repository metrics' })
  @ApiResponse({ status: 200, description: 'Projects summary' })
  public getSummary(): ProjectsSummaryResponse {
    return this.projectsService.getProjectsSummary();
  }
}
