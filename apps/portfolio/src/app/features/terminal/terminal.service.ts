import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TerminalCommandDto, TerminalCommandRdo } from '@portfolio/contracts';

export type TerminalEntry = {
  readonly command: string;
  readonly lines: readonly string[];
};

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private readonly http = inject(HttpClient);
  private queue: Promise<void> = Promise.resolve();

  public readonly history = signal<readonly TerminalEntry[]>([
    {
      command: 'help',
      lines: [
        'Доступные команды: whoami, stack, skills, uptime, help',
        'Введите команду или используйте быстрые кнопки внизу.'
      ]
    }
  ]);

  public execute(rawCommand: string): void {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      this.history.set([]);
      return;
    }

    const [cmd, ...args] = trimmed.split(/\s+/);
    const body: TerminalCommandDto = { command: cmd, args };

    // Serialize requests so history order always matches submission order.
    this.queue = this.queue.then(async () => {
      const lines = await firstValueFrom(
        this.http.post<TerminalCommandRdo>('/terminal/command', body)
      ).then(
        res => (res.output ? res.output.split('\n') : []),
        () => ['Ошибка связи с сервером терминала.']
      );
      this.history.update(prev => [...prev, { command: rawCommand, lines }]);
    });
  }
}
