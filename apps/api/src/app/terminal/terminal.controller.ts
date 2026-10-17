import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TerminalService } from './terminal.service';
import { TerminalCommandDto } from './terminal.dto';
import { TerminalCommandRdo } from '@portfolio/contracts';

@ApiTags('Terminal')
@Controller('terminal')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post('command')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Execute an interactive terminal command' })
  @ApiResponse({ status: 200, description: 'Command execution result' })
  public async execute(@Body() dto: TerminalCommandDto): Promise<TerminalCommandRdo> {
    return this.terminalService.executeCommand(dto);
  }
}
