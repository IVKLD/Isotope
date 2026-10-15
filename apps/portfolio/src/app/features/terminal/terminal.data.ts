import { TerminalEntry } from '@shared/models';

export type { TerminalEntry };

export const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    'whoami    - Профиль и специализация разработчика',
    'projects  - Реальные проекты и ссылки на репозитории',
    'stack     - Технологический стек (Angular, Rust, Systems)',
    'blog      - Инженерный блог: статьи об архитектуре и разработке',
    'contact   - Telegram, GitHub, Email',
    'clear     - Очистить консоль'
  ],
  blog: [
    '=== ИНЖЕНЕРНЫЙ БЛОГ & СТАТЬИ ===',
    '1. «Иллюзия скорости: почему слепая генерация кода через ИИ разрушает проекты» (/blog/harm-of-ai-in-projects)',
    '2. «Zoneless Angular в продакшене: отказ от zone.js и переход на Signals» (/blog/zoneless-angular-signals-production)',
    '3. «Архитектура монорепозитория на Nx: строгие границы и изоляция библиотек» (/blog/nx-monorepo-domain-boundaries)',
    '4. «Rust 2024 + Angular в десктопных приложениях: архитектура VortexDL» (/blog/rust-and-angular-desktop-integration)',
    '5. «ControlValueAccessor без боли: проектирование переиспользуемых форм» (/blog/cva-reusable-form-controls)',
    '',
    'Каталог статей: /blog'
  ],
  whoami: [
    'IgnI — Frontend / Angular Developer (Middle / Middle+)',
    'Стек: Angular (v16–22), TypeScript Strict, Signals, RxJS, @rx-angular, Nx 22 Monorepo.',
    'UI: spartan/ui, Taiga UI, Angular Material/CDK, Tailwind CSS, SCSS, WAI-ARIA 1.2.',
    'Фокус: реактивный стейт (Signals), формы (CVA), real-time (WebSockets / SSE), Zoneless.',
    'Интересы / pet-проекты: системная разработка на Rust 2024 (Tokio, FUSE, Linux).'
  ],
  projects: [
    '=== ПРОДУКТОВЫЕ И WEB ПРОЕКТЫ ===',
    '1. Arcania (Nx 22 Monorepo, Angular 21, Admin Panel, UI Kit Library, SSR, CI/CD) -> https://github.com/ArcaniaCMS/Frontend-workspace',
    '2. VortexDL (Angular 22 + Rust 2024, Signals, redb, ADB sync, release v0.4.16)   -> https://github.com/IVKLD/VortexDL',
    '3. Elux (Angular 20 Taiga UI + Rust Axum, Monaco Editor, SQLite, Xray-core)     -> https://github.com/DeLattice/Elux',
    '',
    '=== PET-ПРОЕКТЫ И СИСТЕМНЫЕ УТИЛИТЫ ===',
    '4. Zonex (Rust GTK4/libadwaita Wayland Archive Manager, read-only FUSE mount)    -> https://github.com/IVKLD/Zonex',
    '5. AUSWP (Rust Async Proxy Rotator, SOCKS5 Balancer, VLESS, TUN Routing, GeoIP)  -> https://github.com/IVKLD/AUSWP'
  ],
  stack: [
    'Angular:     Angular 16–22, Signals, Zoneless CD, Control Flow, RxJS, @rx-angular',
    'UI Kits:     spartan/ui, Taiga UI, Angular Material/CDK, Tailwind CSS, SCSS, WAI-ARIA 1.2',
    'Forms:       Reactive Forms, FormArray, ControlValueAccessor (CVA)',
    'Monorepo:    Nx 22 Workspace, Yarn Workspaces, Angular SSR, Vitest, CI/CD',
    'Real-time:   WebSockets, Server-Sent Events (SSE), HttpInterceptorFn',
    'Pet/Systems: Rust 2024, Tokio, Axum, SQLite, FUSE3, GTK4, Linux, Nix Flakes'
  ],
  contact: [
    'Telegram: https://t.me/IVKLCD (@IVKLCD)',
    'GitHub:   https://github.com/IVKLD',
    'Email:    igniver696@gmail.com'
  ]
};

export const TERMINAL_INITIAL_HISTORY: TerminalEntry[] = [
  {
    command: 'help',
    lines: [
      'Доступные команды: whoami, projects, stack, contact, clear',
      'Введите команду или используйте быстрые кнопки внизу.'
    ]
  }
];
