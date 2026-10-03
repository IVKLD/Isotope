# Обзор проектов `~/projects`

Дата статического обзора: **2026-10-01**. Проверены все шесть каталогов, включая вложенные приложения, Cargo-крейты, Git submodules, конфигурации сборки, тестовые файлы и историю Git.

## Каталог проекта

| Каталог | Что это | Текущий ref | Последний видимый коммит | Рабочее дерево |
|---|---|---|---|---|
| `Arcania-workspace` | Arcania frontend + admin + UI kit, ветка dev | `dev` | 2026-04-27 | чистое |
| `AUSWP` | Rust proxy rotator / load balancer | `main` | 2026-07-20 | чистое |
| `Elux` | управление Xray: Rust core, Angular web, Xray Go/C FFI crate | `dev` | 2025-12-04 | есть 10 изменений |
| `Frontend-workspace` | Arcania frontend + admin + UI kit, ветка main | `main` | 2026-03-10 | чистое |
| `VortexDL` | Rust music downloader/library server + Angular web UI | `main` | 2026-09-15, release v0.4.16 | есть 73 изменения |
| `Zonex` | Rust/GTK Wayland archive manager | `main` | 2026-07-26 | есть 43 изменения |

`Arcania-workspace` и `Frontend-workspace` ведут на один origin `ArcaniaCMS/Frontend-workspace`, но представляют разные ветки и отличающиеся структуры приложения. Их описания разделены, а в частоте технологий отдельно отмечена поправка на общий origin. `Elux` содержит два Git submodule: `core` и `web`; также в дереве есть crate `xray` с Rust-to-Go/C bindings.

## Основные выводы

Профиль сочетает web product engineering на Angular/TypeScript с системной разработкой на Rust. Rust и Angular/TypeScript отдельно обнаружены каждый в четырёх из шести каталогов. Две Angular-копии Arcania — один origin; после dedup это четыре Rust codebase и три Angular codebase из пяти root origins.

Самый широкий продуктовый пример — **VortexDL**: полнофункциональный backend/frontend музыкальной библиотеки, загрузка из SoundCloud/YouTube, очередь и live progress, HTTP streaming, ADB-синхронизация, watchdog, redb, metadata и backup providers. Он имеет release `v0.4.16` и большой авторский Git-след.

Самый широкий web-monorepo — **Arcania**: два состояния одного проекта (старый desktop/mobile workspace на `main` и текущая структура frontend/admin/UI-kit на `dev`), Angular SSR, общие библиотеки, административные домены и CI/CD. **Elux** показывает отдельную специализацию на Xray-прокси и стеке Rust/Angular/SQLite/Docker. **AUSWP** и **Zonex** добавляют асинхронную сетевую инженерию и native Linux desktop/FUSE.

## Частота стека

Основная матрица приведена к шести каталогам; дополнительная колонка в CSV/JSON показывает число уникальных root origins из пяти, чтобы не удваивать Arcania. Внутренние submodules Elux учитываются как компоненты одного продукта, а не как отдельный седьмой каталог.

- **4/6 каталогов:** Rust, TypeScript/Angular, Nix/dev environment.
- **3/6:** Tokio, reqwest, Yarn, GitHub Actions (при этом два Angular-workspace — один origin).
- **2/6:** Axum и Nx-практики; Angular Material/CDK обнаружен в 3/6 каталогах (2/5 origins).
- **1/6:** GTK/FUSE, SQLite, redb, Docker, Xray integration, music download pipeline, TUN proxy routing.

Частота отражает только явно найденные исходники, manifests и workflows. Она не измеряет глубину владения или объём написанного кода. Точные технологии и основания перечислены в `stack.csv` и `stack.json`.

## Файлы отчёта

- `projects.md` — шесть карточек проектов и составные компоненты.
- `profile.md` — способности разработчика с привязкой к доказательствам.
- `stack.csv` — таблица технологий, категорий и частоты.
- `stack.json` — та же матрица в структурированном формате. `dependencies.csv` — прямые зависимости и версии из 20 runtime/dev/peer manifests.
- `projects.json` — портфолио-карточки со `shortDesc`, `fullDesc`, `whyCool`, `highlights`, `techStack` и примерами кода.
- `methodology.md` — правила подсчёта, ограничения и статус проверки.

Анализ статический: команды сборки и тесты не запускались. Значения «test configured» означают, что тесты/targets обнаружены в проекте, но не что они прошли в этом обзоре.
