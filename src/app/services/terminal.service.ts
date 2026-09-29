import { Injectable, inject, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TerminalModalComponent } from '@components/terminal-modal/terminal-modal.component';

export interface TerminalEntry {
  command: string;
  lines: string[];
}

const COMMANDS: Record<string, string[]> = {
  help: [
    'whoami    - Обо мне и текущая специализация',
    'projects  - Список реальных проектов со ссылками на код',
    'stack     - Основные технологии и инструменты',
    'contact   - Telegram, GitHub, Email',
    'clear     - Очистить экран'
  ],
  whoami: [
    'IgnI — Angular / Frontend Developer',
    'Стек: Angular (v16–22), TypeScript (strict), Signals, RxJS, Nx Monorepo.',
    'Фокус: чистый код компонентов, типизированные формы, реактивный стейт, WebSockets.'
  ],
  projects: [
    '1. VortexDL (Angular 22, WebSockets, RxJS, @rx-angular) -> https://github.com/IVKLD/VortexDL',
    '2. ArcaniaCMS (Angular 21, Nx, SSR, Forms + CVA)       -> [Приватный репозиторий]',
    '3. Elux Client (Angular 20, Signals state, Xray)       -> https://github.com/DeLattice/Elux'
  ],
  stack: [
    'Core:       Angular 16–22, TypeScript Strict, Standalone, Signals',
    'Reactivity: RxJS (operators, streams), WebSockets (NgZone)',
    'UI/Forms:   Reactive Forms (FormArray, CVA), SCSS, Tailwind',
    'Tooling:    Nx Monorepo, Vitest, ESLint, Vite, Git'
  ],
  contact: [
    'Telegram: https://t.me/IVKLCD (@IVKLCD)',
    'GitHub:   https://github.com/IVKLD',
    'Email:    igniver696@gmail.com'
  ]
};

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private readonly dialog = inject(Dialog);

  public readonly history = signal<TerminalEntry[]>([
    {
      command: 'help',
      lines: [
        'Доступные команды: whoami, projects, stack, contact, clear',
        'Введите команду или нажмите на кнопки быстрого доступа внизу.'
      ]
    }
  ]);

  public open(): void {
    if (this.dialog.openDialogs.length > 0) return;

    this.dialog.open(TerminalModalComponent, {
      maxWidth: '680px',
      width: 'min(680px, calc(100vw - 2rem))'
    });
  }

  public execute(rawCommand: string): void {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      this.history.set([]);
      return;
    }

    const lines = COMMANDS[cmd] ?? [
      `Команда не найдена: "${rawCommand}". Введите "help" для справки.`
    ];

    this.history.update(prev => [...prev, { command: rawCommand, lines }]);
  }
}
