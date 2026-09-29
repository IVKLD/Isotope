# portfolio

Личный сайт-портфолио фронтенд-разработчика (IgnI).

## Стек

- **Angular 22** (Standalone, Signals, signal inputs/queries, `host` metadata)
- **TypeScript 6** (Strict mode)
- **SCSS** (Vanilla, CSS custom properties, responsive layout)
- **@lucide/angular** (SVG directive components)
- **Canvas API** (фоновая particle-сетка вне зоны Angular через `runOutsideAngular`)

## Разработка

Установка зависимостей:

```bash
yarn install
```

Запуск dev-сервера (http://localhost:4200):

```bash
yarn start
```

Сборка продакшена:

```bash
yarn build
```

Результат компилируется в `dist/portfolio/browser`.

Предпросмотр сборки:

```bash
yarn preview
```

## Структура

```text
src/
├── app/
│   ├── components/
│   │   ├── bento-grid/          # Карточки проектов
│   │   ├── canvas-background/   # Фоновый canvas
│   │   ├── footer/              # Контакты и копирование email
│   │   ├── header/              # Плавающий док с навигацией
│   │   ├── hero/                # Главный экран
│   │   ├── icons/               # Кастомные SVG-иконки (GitHub)
│   │   ├── project-modal/       # Модалка с описанием и сниппетами
│   │   ├── skills-matrix/       # Список технологий
│   │   └── terminal-modal/      # GNOME-терминал (⌘K / Ctrl+K)
│   ├── models/
│   │   └── project.model.ts     # Типизация проектов и сниппетов
│   ├── services/
│   │   └── terminal.service.ts  # Состояние и команды CLI-терминала
│   ├── app.component.ts
│   └── app.config.ts
├── styles/                      # Токены и сброс стилей
└── index.html
```

## Деплой

Сайт сконфигурирован для деплоя на статические хостинги:

- **Vercel**: конфигурация в `vercel.json` (роутинг и путь к `dist/portfolio/browser`).
- **Netlify / Cloudflare Pages**: SPA-редиректы в `public/_redirects`.
- **GitHub Pages**: workflow в `.github/workflows/deploy.yml` (автосборка при пуше в `main`), либо ручная сборка `yarn build:gh`.
