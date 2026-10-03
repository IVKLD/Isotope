# Профиль разработчика

## Главный профиль

**Full-stack разработчик с двумя устойчивыми направлениями: Angular/TypeScript продуктовые приложения и Rust системные/backend-приложения.** Это видно не по одному демо: в каталогах есть большой Arcania workspace, Angular-части Elux и VortexDL, а Rust используется в AUSWP, Elux, VortexDL и Zonex.

Самые весомые свидетельства — VortexDL (выпускаемый end-to-end продукт с большим авторским Git-следом) и Arcania (большой monorepo, admin-интерфейс и deploy workflow). Специализированную системную глубину дополняют Zonex с GTK/FUSE и Elux/AUSWP с proxy/control-plane задачами.

## Компетенции и опора на исходники

| Компетенция | Уровень свидетельства | Что найдено |
|---|---|---|
| Angular/TypeScript приложения | Сильное | Arcania frontend/admin/library; Elux Angular UI; VortexDL Angular 22 panel. Feature modules, services/state, DTO/RDO, forms, routes, charts, editor, SSR/config |
| Большой frontend workspace | Сильное | Nx/Yarn, shared UI kit, отдельные приложения, affected builds, dependency-boundary lint, production packaging |
| Rust async backend | Сильное | Tokio/Axum/reqwest в AUSWP, Elux, VortexDL; многомодульные backend codebases |
| Сетевые API и протоколы | Сильное | REST, WebSocket, live events/streaming; SOCKS5, VLESS, Xray, sing-box/Mihomo; proxy fallback |
| End-to-end продуктовая разработка | Сильное | VortexDL объединяет CLI, очередь, backend API, UI, локальное хранилище, медиаплеер и ADB sync; есть релиз v0.4.16 |
| Linux/native и системные интеграции | Сильное в профильной нише | GTK4/libadwaita, Wayland, read-only FUSE; в других проектах TUN, FUSE3, ADB/Android и process control |
| Работа с данными и storage | Хорошее | SQLite transactions/repos в Elux; redb и metadata/library в VortexDL; сериализуемые конфиги и subscriptions в AUSWP |
| Медиа и файлы | Хорошее | ZIP/TAR engines и integrity/security tests; sound download/stream/transcode/ID3; local library/backup |
| DevOps/package delivery | Хорошее | GitHub Actions, dev/prod build/deploy, Docker multi-stage, Nix Flakes/NixOS modules, Devbox, release workflow |
| Тесты и качество | Умеренное/хорошее | Karma/Jasmine и Vitest конфигурации; Zonex unit/integration/security test files, Clippy/rustfmt. Фактические успешные прогоны в этом обзоре не проверялись |
| Go/C interoperability | Специализированное | Elux xray-sys собирает Go в static C archive, Rust build script связывает библиотеку и генерирует bindings через bindgen |

## Частота главных навыков

Подсчёт по шести каталогам: Rust и Angular/TypeScript обнаружены каждый в 4/6; Nix-based environment тоже в 4/6; Yarn в 4/6; Tokio/reqwest — в 3/6. Arcania-workspace и Frontend-workspace — разные checkout одного origin, поэтому при исключении дубликата уникальных root origins остаётся пять: Rust/Nix — 4/5, Angular/TypeScript — 3/5.

Эта частота говорит о повторном выборе стека, но не заменяет оценку глубины реализации. Более широкая матрица в `stack.csv`/`stack.json`.

## История участия и оговорки

- В Arcania workspace Git показывает 155 из 164 коммитов с автором IgnIVertiKalCaD на ветке `dev`; на `main` — 114 из 126. Это один GitHub origin в двух checkout, числа не складываются как независимые проекты.
- В VortexDL Git показывает 163 авторских коммита плюс автоматизацию и алиасы автора; на текущем `main` есть release commit v0.4.16.
- В Elux root checkout имеет 9 коммитов автора; core submodule — 8, web — 21 коммитов автора в локально доступной истории. В рабочих копиях есть изменения.
- В AUSWP Git-сообщение явно помечает проект как `AI create 100% | DEMONSTATION`. Поэтому репозиторий учитывается в стеке/прототипах, но с сильной оговоркой при выводе о самостоятельной реализации.
- В Zonex доступная история короткая (5 коммитов), а текущая рабочая копия заметно расходится с последним коммитом. Текущий код описывает незакоммиченный snapshot.

Git author attribution показывает историю репозитория, но не доказывает персональную реализацию каждой строки и не говорит о командной роли в организации.

## Краткая оценка

Профиль особенно хорошо подходит для задач, где нужны интерфейс, API и системная интеграция в одном приложении: desktop/admin панели, локальные media tools, сетевые utilities, packaging для Linux. По репозиториям заметны самостоятельное разбиение крупных доменов на модули и способность соединять несколько языков/рантаймов, например Rust+Angular или Rust+Go FFI.

Этот вывод основан на доступном коде, manifests, README, release/config files и Git. Сборки, тесты, нагрузочная работа и эксплуатация продуктов в рамках обзора не запускались.
