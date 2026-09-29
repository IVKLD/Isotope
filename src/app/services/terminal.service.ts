import { Injectable, signal } from '@angular/core';

export enum TerminalEntryType {
  Text = 'text',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  List = 'list'
}

export interface TerminalEntry {
  command: string;
  output: string | string[];
  type?: TerminalEntryType;
}

const COMMANDS: Record<string, { output: string | string[]; type: TerminalEntryType }> = {
  help: {
    output: [
      'whoami    - Обо мне и текущая специализация',
      'projects  - Список реальных проектов со ссылками на код',
      'stack     - Основные технологии и инструменты',
      'contact   - Telegram, GitHub, Email',
      'clear     - Очистить экран'
    ],
    type: TerminalEntryType.List
  },
  whoami: {
    output: [
      'IgnI — Angular / Frontend Developer',
      'Стек: Angular (v20–22), TypeScript (strict), Signals, RxJS, Nx Monorepo.',
      'Фокус: чистый код компонентов, типизированные формы, реактивный стейт, WebSockets.'
    ],
    type: TerminalEntryType.Text
  },
  projects: {
    output: [
      '1. VortexDL (Angular 22, WebSockets, RxJS, @rx-angular) -> https://github.com/IVKLD/VortexDL',
      '2. ArcaniaCMS (Angular 21, Nx, SSR, Forms + CVA)       -> [Приватный репозиторий]',
      '3. Elux Client (Angular 20, Signals state, Xray)       -> https://github.com/DeLattice/Elux'
    ],
    type: TerminalEntryType.List
  },
  stack: {
    output: [
      'Core:       Angular 20–22, TypeScript Strict, Standalone, Signals',
      'Reactivity: RxJS (operators, streams), WebSockets (NgZone)',
      'UI/Forms:   Reactive Forms (FormArray, CVA), SCSS, Tailwind',
      'Tooling:    Nx Monorepo, Vitest, ESLint, Vite, Git'
    ],
    type: TerminalEntryType.Text
  },
  contact: {
    output: [
      'Telegram: https://t.me/IVKLCD (@IVKLCD)',
      'GitHub:   https://github.com/IVKLD',
      'Email:    igniver696@gmail.com'
    ],
    type: TerminalEntryType.Success
  }
};

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  public readonly isOpen = signal(false);
  public readonly history = signal<TerminalEntry[]>([
    {
      command: 'help',
      output: [
        'Доступные команды: whoami, projects, stack, contact, clear',
        'Введите команду или нажмите на кнопки быстрого доступа внизу.'
      ],
      type: TerminalEntryType.List
    }
  ]);

  public toggle(): void {
    this.isOpen.update(v => !v);
  }

  public open(): void {
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
  }

  public execute(rawCommand: string): void {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      this.history.set([]);
      return;
    }

    const response = COMMANDS[cmd] ?? {
      output: `Команда не найдена: "${rawCommand}". Введите "help" для справки.`,
      type: TerminalEntryType.Error
    };

    this.history.update(prev => [...prev, { command: rawCommand, ...response }]);
  }
}
