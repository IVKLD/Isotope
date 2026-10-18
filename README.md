# isotope

Личный сайт-портфолио фронтенд-разработчика (IgnI).
Монорепозиторий на базе **Nx**: Angular 22 Frontend + NestJS 12 Backend + Drizzle ORM + PostgreSQL.

## Стек технологий

### Frontend

- **Angular 22** (Standalone, Signals, signal inputs/queries, `host` metadata, Zoneless)
- **TypeScript 6** (Strict mode)
- **SCSS** (Vanilla, CSS custom properties, responsive layout)
- **@lucide/angular** (SVG directive components)
- **Canvas API** (фоновая particle-сетка вне зоны Angular через `runOutsideAngular`)

### Backend & Database

- **NestJS 12** (Modular Architecture, Dependency Injection, Validation Pipes)
- **Drizzle ORM** (TypeScript-first, zero-overhead ORM)
- **PostgreSQL 17** (docker-compose для локальной разработки)
- **OpenAPI / Swagger** (`/api/docs` автогенерация документации)

### Shared Contracts & Tooling

- **@isotope/contracts** (`libs/shared/contracts/`): сквозная типизация DTO и моделей между клиентом и сервером
- **Nx Monorepo**: управление задачами, графом зависимостей и кэшированием
- **Just**: единый раннер команд ([Justfile](file:///mnt/projects-and-games/projects/portfolio/Justfile))

---

## Разработка

Установка зависимостей:

```bash
yarn install
```

Управление через [just](https://github.com/casey/just) или `yarn`:

```bash
# Frontend
just dev             # Запуск Angular dev-сервера (http://localhost:4200)
just build           # Сборка Angular фронтенда в dist/apps/frontend/browser

# Backend
just dev-backend     # Запуск NestJS dev-сервера (http://localhost:3000)
just build-backend   # Сборка NestJS бэкенда в dist/apps/backend
just build-all       # Сборка и фронтенда, и бэкенда

# База данных (Docker & Drizzle)
just db-up           # Запуск контейнера PostgreSQL (порт 5432)
just db-down         # Остановка контейнера PostgreSQL
just db-generate     # Генерация Drizzle-миграций
just db-migrate      # Применение миграций к БД
just db-push         # Быстрый пуш схемы в БД (dev)
just db-studio       # Визуальная панель Drizzle Studio

# Качество кода
just check           # Полная проверка (ESLint + build фронтенда + build бэкенда)
just lint            # Проверка ESLint
just lint-fix        # Автофикс ошибок ESLint
just format          # Форматирование через Prettier
just preview         # Предпросмотр продакшен-сборки фронтенда
just audit           # Аудит производительности Lighthouse
```

---

## Архитектура API

- **Документация Swagger**: `http://localhost:3000/api/docs`
- **Обратная связь**: `POST /api/feedback` (валидация, сохранение сообщений в БД)
- **Блог и телеметрия**: `GET /api/blog/posts/:slug/stats`, `POST /api/blog/posts/:slug/view`, `POST /api/blog/posts/:slug/react`
- **Терминал**: `POST /api/terminal/command` (серверный интерпретатор команд `whoami`, `skills`, `uptime`, `version`, etc.)
- **Проекты**: `GET /api/projects/summary` (метрики и статистика репозиториев)

---

## Деплой

- **Frontend**: деплой статических ассетов на Vercel, Netlify или Cloudflare Pages (`dist/apps/frontend/browser`).
- **Backend**: запускается в Node.js контейнере (`node dist/apps/backend/main.js`) с переменными окружения из `.env`.
