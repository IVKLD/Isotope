import { LucideCpu, LucidePalette, LucideRadio, LucideBoxes } from '@lucide/angular';
import { StackModule } from './skills-matrix.types';

export * from './skills-matrix.types';

export const STACK_MODULES: readonly StackModule[] = [
  {
    id: 'core',
    fileName: 'core.config.ts',
    title: 'Angular & Reactive Core',
    icon: LucideCpu.icon,
    badge: 'Signals & Zoneless',
    description:
      'Архитектура реактивного ядра на Signals, отказ от Zone.js для бескомпромиссной производительности и строгая типизация.',
    highlights: [
      'Гранулярное обновление DOM через Signals и computed() без Zone.js',
      'Нативный Zoneless Change Detection по умолчанию без Zone.js оверхеда',
      'Современный Control Flow (@if, @for, @switch, @let) и @defer',
      'Zero Any, строгие интерфейсы и type narrowing во всех слоях'
    ],
    techStack: [
      'Angular 16–22',
      'Signals & Computed',
      '@rx-angular/state',
      'Zoneless CD',
      'TypeScript Strict',
      'Control Flow (@defer)',
      'Standalone Components'
    ],
    code: `import {
  ApplicationConfig,
  provideZonelessChangeDetection
} from '@angular/core';

export const coreArchitecture = {
  platform: 'Angular 22 (Standalone)',
  reactivity: {
    engine: 'Signals & computed()',
    changeDetection: 'Zoneless (0 overhead)',
    controlFlow: ['@if', '@for', '@switch', '@let']
  },
  typeSafety: {
    mode: 'TypeScript Strict',
    strictNullChecks: true,
    noImplicitAny: true
  },
  strategy: 'provideZonelessChangeDetection()'
} as const;`
  },
  {
    id: 'ui',
    fileName: 'ui-system.config.ts',
    title: 'UI & Дизайн-системы',
    icon: LucidePalette.icon,
    badge: 'Headless & A11y',
    description:
      'Построение доступных компонентных библиотек, дизайн-токенов и интерфейсов на базе Headless-примитивов и Tailwind CSS.',
    highlights: [
      'Headless-архитектура на примитивах spartan/ui и Angular CDK',
      'Полное соответствие стандартам WAI-ARIA 1.2 и клавиатурная навигация',
      'Токенизация дизайн-системы через CSS Custom Properties и HSL',
      'Адаптивная fluid-верстка от мобильных экранов до 4K мониторов'
    ],
    techStack: [
      'spartan/ui (shadcn)',
      'Angular CDK',
      'Tailwind CSS & SCSS',
      'WAI-ARIA 1.2 (A11y)',
      'Дизайн-токены',
      'Taiga UI / Material'
    ],
    code: `export const uiDesignSystem = {
  foundation: 'Headless Architecture',
  primitives: 'Angular CDK (Overlay, Trap)',
  components: 'spartan/ui (shadcn primitives)',
  styling: {
    engine: 'Tailwind CSS & SCSS Modules',
    tokens: [
      'CSS Custom Properties',
      'HSL Semantic Palettes'
    ],
    responsive: 'Fluid Scale (Mobile to 4K)'
  },
  accessibility: {
    standard: 'WAI-ARIA 1.2 Compliant',
    keyboardNav: true,
    focusManagement: 'CDK FocusTrap'
  }
} as const;`
  },
  {
    id: 'stream',
    fileName: 'streams.config.ts',
    title: 'Сеть, Реактивность & Формы',
    icon: LucideRadio.icon,
    badge: 'Real-Time & Forms',
    description:
      'Real-time двусторонний обмен данными, стриминг событий, отказоустойчивые HTTP-пайплайны и типизированные динамические формы.',
    highlights: [
      'Стриминг данных и событий через WebSockets, SSE и Fetch Streams',
      'Управление потоками, backpressure, debounce и стейт через RxJS и @rx-angular',
      'Кастомные контролы форм с интеграцией ControlValueAccessor (CVA)',
      'HttpInterceptorFn: управление очередью 401, refresh tokens и retry-логика'
    ],
    techStack: [
      'WebSockets & SSE',
      'RxJS (Streams)',
      '@rx-angular',
      'Reactive Forms',
      'CVA Custom Controls',
      'HttpInterceptorFn',
      'Fetch Stream / SSE'
    ],
    code: `export const networkAndStreams = {
  realtime: {
    protocols: ['WebSockets', 'SSE'],
    streaming: 'EventSource & Fetch Stream',
    backpressure: 'RxJS buffer & debounce',
    lifecycle: 'takeUntilDestroyed cleanup'
  },
  reactivityBridge: '@rx-angular & Signals',
  forms: {
    engine: 'Reactive Forms & FormArray',
    customControls: 'ControlValueAccessor'
  },
  interceptor: {
    strategy: 'HttpInterceptorFn',
    features: ['Refresh Queue', 'Retry Logic']
  }
} as const;`
  },
  {
    id: 'arch',
    fileName: 'monorepo.config.ts',
    title: 'Архитектура & Tooling',
    icon: LucideBoxes.icon,
    badge: 'Nx & Infrastructure',
    description:
      'Масштабируемая монорепозиторная архитектура, Server-Side Rendering с гидрацией, тестирование и инфраструктура сборки.',
    highlights: [
      'Nx Monorepo: разделение на core, data-access, feature, ui и util библиотеки',
      'Angular SSR & Hydration: серверный рендеринг с технологией Event Replay',
      'Быстрые модульные и интеграционные тесты на Vitest с покрытием',
      'Мгновенная сборка на Vite/esbuild и строгий CI/CD контроль качества'
    ],
    techStack: [
      'Nx Monorepo',
      'Angular SSR & Hydration',
      'Vitest & Unit Testing',
      'Vite / esbuild',
      'ESLint Strict Boundaries',
      'Git & Linux'
    ],
    code: `export const monorepoInfrastructure = {
  monorepo: 'Nx Workspace (Boundaries)',
  layers: [
    'core', 'data-access',
    'feature', 'ui', 'util'
  ],
  rendering: {
    ssr: 'Angular SSR & Node.js Engine',
    hydration: 'Event Replay & Hydration'
  },
  buildEngine: 'Vite / esbuild (Fast HMR)',
  qualityAssurance: {
    testing: 'Vitest & Component Harnesses',
    linting: 'ESLint Boundaries & Rules'
  }
} as const;`
  }
];
