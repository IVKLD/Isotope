import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CompetitorComparisonRdo, CompetitorKey } from '@isotope/contracts';
import { ComparisonsService } from './comparisons.service';

@ApiTags('Comparisons')
@Controller('comparisons')
export class ComparisonsController {
  constructor(private readonly comparisonsService: ComparisonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all competitor framework comparisons (React, Vue, Svelte)' })
  @ApiResponse({
    status: 200,
    description: 'List of competitor comparisons with full architectural breakdown'
  })
  public async getComparisons(): Promise<readonly CompetitorComparisonRdo[]> {
    return this.comparisonsService.getComparisons();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get architectural comparison by competitor key' })
  @ApiParam({ name: 'key', enum: ['react', 'vue', 'svelte'] })
  @ApiResponse({ status: 200, description: 'Framework comparison details' })
  @ApiResponse({ status: 404, description: 'Comparison not found' })
  public async getByKey(@Param('key') key: CompetitorKey): Promise<CompetitorComparisonRdo> {
    const comparison = await this.comparisonsService.getByKey(key);
    if (!comparison) {
      throw new NotFoundException(`Comparison for framework "${key}" not found`);
    }
    return comparison;
  }
}
