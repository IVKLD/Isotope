import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { TerminalCommandRequest } from '@portfolio/contracts';

export class TerminalCommandDto implements TerminalCommandRequest {
  @ApiProperty({ description: 'Command name to execute', example: 'whoami' })
  @IsString()
  @IsNotEmpty()
  public command!: string;

  @ApiPropertyOptional({ description: 'Command arguments', example: ['--verbose'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public args?: string[];
}
