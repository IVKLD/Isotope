import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StackModuleRdo } from '@isotope/contracts';
import { SkillsService } from './skills.service';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all architectural tech stack modules' })
  @ApiResponse({
    status: 200,
    description: 'List of stack modules with configuration and code snippets'
  })
  public async getModules(): Promise<readonly StackModuleRdo[]> {
    return this.skillsService.getModules();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get architectural stack module by id' })
  @ApiParam({ name: 'id', example: 'core' })
  @ApiResponse({ status: 200, description: 'Stack module details' })
  @ApiResponse({ status: 404, description: 'Stack module not found' })
  public async getModuleById(@Param('id') id: string): Promise<StackModuleRdo> {
    const mod = await this.skillsService.getModuleById(id);
    if (!mod) {
      throw new NotFoundException(`Stack module with id "${id}" not found`);
    }
    return mod;
  }
}
