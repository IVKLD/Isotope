import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIZZLE, DrizzleDb, terminalLogsTable } from '@backend/database';
import { TerminalCommandDto } from './terminal.dto';
import { TerminalCommandRdo } from '@isotope/contracts';

const HELP_TEXT = [
  'Available server commands:',
  '  whoami     - Bio and role summary',
  '  skills     - Tech stack matrix',
  '  uptime     - Backend server runtime diagnostics',
  '  version    - Architecture and versions',
  '  date       - Current UTC server timestamp',
  '  echo       - Print back arguments'
].join('\n');

const SKILLS_TEXT = [
  'CORE: Angular 22, TypeScript 6, Signals, Zoneless, RxJS, NgRx SignalStore',
  'BACKEND: NestJS, Node.js, Fastify, Drizzle ORM, PostgreSQL, Redis, REST, WebSockets',
  'SYSTEMS: Rust, Tokio, Axum, Linux, Docker, Git, Nx Monorepo, Justfile'
].join('\n');

const WHOAMI_TEXT = [
  'IgnI — Frontend / Angular Developer (Middle / Middle+)',
  'Specialization: Enterprise Angular, Signals, Architecture, Reactive Systems, SCSS/Design Systems.',
  'Telegram: @IVKLCD | GitHub: https://github.com/IVKLD'
].join('\n');

@Injectable()
export class TerminalService {
  private readonly logger = new Logger(TerminalService.name);
  private readonly startedAt = Date.now();

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  public async executeCommand(dto: TerminalCommandDto): Promise<TerminalCommandRdo> {
    const rawCmd = dto.command.trim().toLowerCase();
    const args = dto.args || [];

    this.db
      .insert(terminalLogsTable)
      .values({ command: rawCmd, args: args.join(' ') })
      .catch(err =>
        this.logger.debug(
          `Could not log terminal command: ${err instanceof Error ? err.message : String(err)}`
        )
      );

    const commandMap: Record<string, () => string> = {
      whoami: () => WHOAMI_TEXT,
      uptime: () => {
        const sec = Math.floor((Date.now() - this.startedAt) / 1000);
        return `Backend Server Uptime: ${Math.floor(sec / 3600)}h ${Math.floor((sec % 3600) / 60)}m ${sec % 60}s (PID: ${process.pid}, Node.js: ${process.version})`;
      },
      version: () =>
        'Isotope Platform v1.0.0 (NestJS 12 + Express + Angular 22 Zoneless + Drizzle ORM)',
      stack: () => SKILLS_TEXT,
      skills: () => SKILLS_TEXT,
      echo: () => args.join(' '),
      date: () => new Date().toISOString(),
      help: () => HELP_TEXT
    };

    const handler = commandMap[rawCmd];
    if (handler) {
      return { output: handler(), exitCode: 0 };
    }

    return {
      output: `zsh: command not found: ${rawCmd}. Type "help" for available commands.`,
      exitCode: 127
    };
  }
}
