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

Управление через [just](https://github.com/casey/just) или `yarn`:

```bash
just dev         # или yarn start (http://localhost:4200)
just build       # или yarn build (продакшен-сборка)
just check       # линтинг + проверка сборки
just lint        # или yarn lint
just format      # форматирование через Prettier
just preview     # предпросмотр сборки из dist/
just audit       # запуск аудита метрик производительности
```

Результат сборки компилируется в `dist/portfolio/browser`.


## Деплой

Сайт сконфигурирован для деплоя на статические хостинги:

- **Vercel**: конфигурация в `vercel.json` (роутинг и путь к `dist/portfolio/browser`).
- **Netlify / Cloudflare Pages**: SPA-редиректы в `public/_redirects`.
- **GitHub Pages**: workflow в `.github/workflows/deploy.yml` (автосборка при пуше в `main`), либо ручная сборка `yarn build:gh`.
