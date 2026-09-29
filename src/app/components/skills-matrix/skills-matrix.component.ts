import { Component } from '@angular/core';

export interface SkillGroup {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-skills-matrix',
  templateUrl: './skills-matrix.component.html',
  styleUrl: './skills-matrix.component.scss'
})
export class SkillsMatrixComponent {
  protected readonly skillGroups: readonly SkillGroup[] = [
    {
      category: 'Angular & Core',
      items: [
        'Angular (v20–v22)',
        'Standalone Components',
        'Angular Signals (signal, computed, effect)',
        'Modern Control Flow (@if, @for)',
        'ChangeDetectionStrategy.OnPush',
        'TypeScript (Strict Mode)'
      ]
    },
    {
      category: 'Асинхронность & Сеть',
      items: [
        'RxJS (operators, streams, interop)',
        'WebSockets (streaming & reconnect)',
        'Functional HttpInterceptorFn',
        'Token Refresh Queue (401)',
        'REST API & DTO/RDO typing'
      ]
    },
    {
      category: 'Формы & UI Архитектура',
      items: [
        'Reactive Forms (FormGroup, FormArray)',
        'ControlValueAccessor (CVA)',
        'Кастомные валидаторы (кросс-проверки)',
        'ngTemplateContextGuard для шаблонов',
        'Nx Monorepo (libs & apps)'
      ]
    },
    {
      category: 'Инструменты & Окружение',
      items: [
        'Nx CLI',
        'ESLint (@angular-eslint, boundaries)',
        'Vite / esbuild',
        'Vitest',
        'Git, GitHub Actions',
        'Linux / Bash'
      ]
    }
  ];
}
