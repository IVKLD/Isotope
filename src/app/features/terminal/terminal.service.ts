import { Injectable, signal } from '@angular/core';
import { TerminalEntry } from '@shared/models';
import { TERMINAL_COMMANDS, TERMINAL_INITIAL_HISTORY } from './terminal.data';

export type { TerminalEntry };

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  public readonly history = signal<TerminalEntry[]>(TERMINAL_INITIAL_HISTORY);

  public execute(rawCommand: string): void {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      this.history.set([]);
      return;
    }

    const lines = TERMINAL_COMMANDS[cmd] ?? [
      `Команда не найдена: "${rawCommand}". Введите "help" для справки.`
    ];

    this.history.update(prev => [...prev, { command: rawCommand, lines }]);
  }
}
