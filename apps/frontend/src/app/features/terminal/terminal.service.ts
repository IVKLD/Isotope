import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '@features/blog/blog.service';
import { ProjectsService } from '@features/projects/projects.service';
import {
  TerminalCommandContext,
  TerminalVirtualLine
} from './terminal.model';
import { dispatchTerminalCommand } from './terminal-commands';
import { getTerminalCompletions } from './terminal-completion';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private readonly router = inject(Router);
  private readonly projectsService = inject(ProjectsService);
  private readonly blogService = inject(BlogService);
  private readonly sessionStart = Date.now();

  public readonly projects = toSignal(this.projectsService.getProjects(), {
    initialValue: null
  });
  public readonly posts = toSignal(this.blogService.getPosts(), {
    initialValue: null
  });

  public readonly cwd = signal('/home/igni');
  public readonly commandHistory = signal<readonly string[]>([]);
  public readonly lines = signal<readonly TerminalVirtualLine[]>([]);
  private lineIdSeq = 1;

  public exit(): void {
    this.router.navigate(['/']);
  }

  public formatPath(path: string): string {
    if (path === '/home/igni') return '~';
    if (path.startsWith('/home/igni/')) return `~/${path.slice(11)}`;
    return path;
  }

  public clear(): void {
    this.lines.set([]);
  }

  public pushAbortedLine(command: string): void {
    this.lines.update(prev => [
      ...prev,
      { id: this.lineIdSeq++, kind: 'prompt-top', cwd: this.cwd() },
      { id: this.lineIdSeq++, kind: 'prompt-cmd', command: `${command}^C` }
    ]);
  }

  public pushCandidates(command: string, candidates: readonly string[]): void {
    this.lines.update(prev => [
      ...prev,
      { id: this.lineIdSeq++, kind: 'prompt-top', cwd: this.cwd() },
      { id: this.lineIdSeq++, kind: 'prompt-cmd', command },
      { id: this.lineIdSeq++, kind: 'output', spans: [{ text: candidates.join('   ') }] }
    ]);
  }

  public execute(raw: string): void {
    const trimmed = raw.trim();
    if (!trimmed) {
      this.lines.update(prev => [
        ...prev,
        { id: this.lineIdSeq++, kind: 'prompt-top', cwd: this.cwd() },
        { id: this.lineIdSeq++, kind: 'prompt-cmd', command: '' }
      ]);
      return;
    }

    this.commandHistory.update(h => [...h, trimmed]);
    const [cmd, ...args] = trimmed.split(/\s+/);
    const lowCmd = cmd.toLowerCase();

    if (lowCmd === 'clear') {
      this.clear();
      return;
    }

    if (lowCmd === 'exit' || lowCmd === 'quit' || lowCmd === ':q') {
      this.exit();
      return;
    }

    const outputLines = dispatchTerminalCommand(lowCmd, args, this.buildContext());
    const newItems: TerminalVirtualLine[] = [
      { id: this.lineIdSeq++, kind: 'prompt-top', cwd: this.cwd() },
      { id: this.lineIdSeq++, kind: 'prompt-cmd', command: raw },
      ...outputLines.map((line): TerminalVirtualLine => ({
        id: this.lineIdSeq++,
        kind: 'output',
        spans: typeof line === 'string' ? [{ text: line }] : line
      }))
    ];

    this.lines.update(prev => [...prev, ...newItems]);
  }

  public getCompletions(rawInput: string): { newLine: string; candidates: readonly string[] } {
    return getTerminalCompletions(rawInput, this.buildContext());
  }

  private buildContext(): TerminalCommandContext {
    return {
      cwd: this.cwd(),
      setCwd: dir => this.cwd.set(dir),
      sessionStart: this.sessionStart,
      commandHistory: this.commandHistory(),
      projects: this.projects(),
      posts: this.posts(),
      navigateTo: url => this.router.navigate([url])
    };
  }
}
