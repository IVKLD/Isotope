# Карточки проектов

## 1. Arcania-workspace — актуальная ветка Arcania frontend, 2026

**Категория:** продуктовый frontend и внутренняя admin-платформа. **Git:** `ArcaniaCMS/Frontend-workspace`, ветка `dev`; последний видимый коммит 2026-04-27; рабочее дерево чистое. Git-история каталога: 155 коммитов под `IgnIVertiKalCaD` из 164 перечисленных коммитов авторов.

**Состав.** Nx-монорепозиторий содержит `apps/frontend`, `apps/admin-panel` и `libs/ui-kit`. Текущая ветка сводит клиентские страницы в единое frontend-приложение с frontend routing и server configuration; admin остаётся отдельным приложением. UI kit выделен в Angular library и имеет карточки/детали новостей.

**Функциональные зоны.** Frontend: каталог и покупки, платежный сценарий с последовательностью модальных сцен, новости/блог, landing pages, пользовательские правила и legal pages. Admin: управление каталогом и вложенными карточками, скидками, промокодами, новостями и правилами, аналитика, users, AI helper/prompt management и data wipe.

**Стек.** Angular 21, TypeScript, Nx 22, Yarn workspaces, RxJS, Angular Material/CDK, Angular SSR/Express, ngx-editor, ngx-charts, Three.js/model-viewer, Keen Slider, SCSS, GitHub Actions. Тяжёлые ассеты и performance-audit script показывают работу с фронтенд-оптимизацией; в scripts есть gzip compression, dependency sync и boundary lint.

**Доставка и качество.** Workflows строят затронутые приложения, готовят dev/prod env, публикуют frontend/admin в EU и RU окружения через SSH/SCP и очищают Cloudflare cache. В package scripts настроены Nx build/lint/test и отдельный Lighthouse/performance audit. Настроено — не означает проверено запуском здесь.

**Почему проект показателен.** Это продуктовый монорепозиторий с разделением client/admin/library, предметно богатыми экранами и реальным pipeline развёртывания. Коммитная статистика подтверждает основную роль автора в данном checkout, но не является оценкой качества.

## 2. AUSWP — proxy rotator и load balancer, 2026

**Категория:** системный сетевой utility/prototype. **Git:** `IVKLD/AUSWP`, `main`; последний коммит 2026-07-20; 2 коммита в локальной истории, один Git-автор; рабочее дерево чистое.

**Состав.** Cargo workspace из `auswp-cli` и `auswp-core`. CLI читает конфигурацию, умеет создать шаблон `--init`, запускает daemon и завершает работу по Ctrl-C. Core содержит config, subscription loader, health/speed checker, routing core managers, VLESS parser, SOCKS5 server, balancer/failover и GeoIP helpers.

**Функции, видимые в коде/README.** До запуска выполняются health/latency и speed checks; пул отбирает быстрые узлы. Реализованы SOCKS5 handshake, циклический выбор и healthy pool, sticky host/domain overrides и failover. Поддерживаются URI VLESS и JSON proxy objects, конвертация конфигураций для sing-box/Mihomo, optional TUN mode, subscriptions и базовая GeoIP-aware routing. README заявляет VLESS TCP/WS/gRPC/xhttp.

**Стек.** Rust 2024, Tokio, reqwest/rustls, tokio-socks, serde/JSON, clap, futures, MaxMindDB, Nix Flakes, sing-box и Mihomo.

**Важная оговорка об авторстве.** Один из двух сообщений коммита буквально помечает проект `AI create 100% | DEMONSTATION`. Фиксирую это как историю происхождения репозитория: его нельзя считать сильным независимым доказательством ручного авторства всех реализаций. Технические направления, прототипированные в проекте, остаются видимыми.

## 3. Elux — управление Xray через web UI и API, 2025

**Категория:** сетевой control plane / приложение. **Git:** `DeLattice/Elux`, ветка `dev`; последний видимый commit 2025-12-04; 9 коммитов под `IgnIVertiKalCaD`; рабочая копия содержит 10 изменений. В корне объявлены submodules `core` и `web`.

**Состав.** `core` — Rust-сервис с Axum REST/WebSocket API, config/group/settings handlers, parsing/validation/conversion proxy configs, SQLite repository/transactions, Xray process and configuration services, checker/fetcher, file watching и hot reload. `web` — Angular 20 интерфейс с конфигуратором Xray, страницей групп подписок, dashboard/logs, настройками и обработкой auth/API errors. `xray` — отдельный Rust crate, который собирает Go Xray library как C archive и генерирует Rust bindings через bindgen; в Dockerfile при этом используется отдельная стадия загрузки Xray binary.

**Функции.** В README core описаны запуск/остановка Xray, просмотр/обновление outbounds, группировка конфигураций, горячее применение настроек и REST endpoints. В исходниках есть SQLite pool/transactions и parser для VLESS/VMess/Trojan/SS. UI включает Monaco editor и экраны управления группами.

**Стек.** Rust 2024, Tokio, Axum, reqwest, SQLite/rusqlite+r2d2, serde, notify, Angular 20, TypeScript, Taiga UI, Monaco Editor, RxJS, Yarn, Devbox/Nix, Docker multi-stage, Xray-core, Go, C ABI/bindgen.

**Почему проект показателен.** Здесь соединены Rust backend и Angular dashboard, хранение конфигураций, процессный control plane, browser-based editing и упаковка многослойного контейнера. Git submodule status показывает отслеживаемые dev refs для core/web; изменения checkout учтены отдельно.

## 4. Frontend-workspace — Arcania ветка main с desktop/mobile разделением, 2026

**Категория:** продуктовый frontend и admin tooling. **Git:** тот же origin `ArcaniaCMS/Frontend-workspace`, ветка `main`; последний commit 2026-03-10; рабочее дерево чистое. Это отдельный каталог/check-out и отличающаяся структура того же удалённого репозитория, что `Arcania-workspace`; в частоте технологий не считается отдельным уникальным origin.

**Состав.** Nx/Yarn workspace: Angular `desktop` и `mobile` приложения внутри frontend, `admin-panel` и `@arcania-inc/ui-kit`. По файлам есть отдельные app configs/routes, server routes, mobile-specific компоненты и общий слой компонентной библиотеки.

**Функциональные зоны.** Магазин/каталог и payment flow, landing pages, правила/legal docs, blog/news. Admin имеет менеджеры каталога, скидок, промокодов, новостей, пользователей и аналитики, а также AI helper. UI-kit содержит blog card/detail и content renderer.

**Стек и доставка.** Angular 21, TypeScript, Nx 22, Yarn, RxJS, Material/CDK, Three.js/model-viewer, ngx-charts, ngx-editor, translation, SCSS/HTML. GitHub Actions выполняет affected-project detection, frontend/admin production builds, EU/RU release deployment и Cloudflare purge. История содержит 114 коммитов `IgnIVertiKalCaD` и 12 `IgnI`.

**Почему важно сохранить отдельной карточкой.** Это показывает прежнее/параллельное desktop/mobile устройство того же продукта и архитектурные решения по компонентам. Папка не равна ещё одному независимому клиентскому проекту.

## 5. VortexDL — музыкальный загрузчик и библиотека, 2026

**Категория:** выпущенное приложение с CLI, backend и web UI. **Git:** `IVKLD/VortexDL`, `main`; последний release commit 2026-09-15, версия `0.4.16`; 163 commit автора `IgnIVertiKalCaD` плюс automation/другие alias; working tree содержит 73 изменения.

**Состав backend.** Rust 2024 binary объединяет CLI и Axum server. Модули разнесены на providers/download pipeline, queue/cancellation/event bus, search/stream API, settings, local library/metadata, backup, database, watchdog и ADB device/sync. Два локальных Rust crates: `soundcloud-rs` и `yt-audio-downloader-rs`.

**Функции.** SoundCloud и YouTube search/track/playlist download; параллельная загрузка, queue, progress events, cancellation, streaming previews, proxy fallback racing, download/library APIs, ID3 metadata, format conversion, redb settings/cache, library scanning, WebDAV/URL/local backup, ADB device discovery/scan/two-way library sync, watchdog за файлами. Web UI содержит dashboard statistics/charts, search/filter, music library, player/media session, settings, proxy testing и Android sync; live состояния идут через WebSocket.

**Стек.** Rust, Tokio, Axum, reqwest/rustls/streaming, serde, redb, Symphonia, ID3, SoundCloud/YouTube local crates, ADB protocol, Angular 22, TypeScript 6, RxJS, Angular Material/CDK, Vitest, Yarn, Nix Flakes, Just, GitHub Actions release workflows, NixOS module. README указывает FFmpeg для конвертации; это внешняя runtime/build requirement, не Rust crate.

**Почему проект показателен.** Самый end-to-end пример: один бинарник обслуживает API и embedded web panel, управляет конкурентными загрузками, persistent library и синхронизацией с физическими устройствами. Наличие опубликованной версии подтверждается release commit; рабочие незакоммиченные изменения отмечены отдельно.

## 6. Zonex — native Wayland archive manager, 2026

**Категория:** Linux desktop prototype/product. **Git:** `IVKLD/Zonex`, `main`; последний commit 2026-07-26; 5 коммитов одного Git-автора; working tree содержит крупную незакоммиченную перестройку (43 status entries).

**Состав.** Rust GUI на GTK4/libadwaita. Модули UI/dialogs, ZIP/TAR engines, format detector, archive manager, DnD handlers, FUSE filesystem и temporary cache/recent files. Nix flake собирает desktop package, задаёт GTK/FUSE runtime inputs, desktop entry и NixOS module/overlay.

**Функции.** ZIP и TAR, TAR.GZ и TAR.ZST: detect by content signature/extension, list/create/extract; отдельные пути для ZIP update/delete/password/integrity и libarchive fallback. FUSE предоставляет read-only виртуальную файловую систему архива, чтобы выдавать реальные файловые пути при drag-out. Security tests проверяют ZIP password flow, integrity report и Zip Slip path traversal.

**Стек.** Rust 2021, GTK4, libadwaita, GDK/GLib/GIO, fuser/FUSE3, zip/tar/flate2/zstd/libarchive, tracing, Nix Flakes, Just, rustfmt/Clippy.

**Почему проект показателен.** Показывает native Linux UI плюс работу с архивными форматами и kernel-facing filesystem API. В Cargo lint config warnings и несколько групп Clippy заданы как deny; Justfile содержит build/lint/test targets. Tests перечислены и изучены, но не запускались в этом аудите.
