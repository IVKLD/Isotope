import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from '@api/database';
import { HealthRdo } from '@portfolio/contracts';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly startedAt = Date.now();

  constructor(private readonly dbService: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: 'Backend system and database health status' })
  @ApiResponse({ status: 200, description: 'Health check result' })
  public async check(): Promise<HealthRdo> {
    const isDbConnected = await this.dbService.checkHealth();

    return {
      status: isDbConnected ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startedAt) / 1000),
      environment: process.env['NODE_ENV'] || 'development',
      database: isDbConnected ? 'connected' : 'disconnected',
      version: '1.0.0'
    };
  }
}
