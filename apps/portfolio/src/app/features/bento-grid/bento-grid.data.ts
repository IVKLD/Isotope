import { Project, ProjectCategoryTab } from '@shared/models';

export const PROJECTS_DATA: readonly Project[] = [
  {
    name: 'VortexDL',
    category: 'prod',
    role: 'Fullstack & Systems Developer (Author)',
    year: '2024–2026',
    shortDesc:
      'Медиаплеер и загрузчик музыки без облачных стримингов: Rust 2024 бэкенд + встроенный Angular 22 клиент.',
    fullDesc:
      'Автономное десктопное приложение для управления музыкальной коллекцией. Поддерживает поиск и скачивание треков из SoundCloud и YouTube, параллельный конвейер загрузок с отменой и очередью, встроенное хранилище redb, нарезку/конвертацию FFmpeg, декодирование Symphonia, парсинг ID3-тегов, синхронизацию с Hi-Fi плеерами по ADB и экспорт бэкапов через WebDAV.',
    whyCool:
      'Единый Rust-бинарник обслуживает REST/WebSocket API и раздает встроенную панель на Angular 22. Реализована директива drag-to-select для пакетного выделения треков, виртуальный скроллинг (@angular/cdk), нечеткий поиск Fuse.js, управление через MediaSession API ОС и потоковый live progress по WebSockets.',
    githubUrl: 'https://github.com/IVKLD/VortexDL',
    highlights: [
      'Параллельный bounded-конвейер загрузок с отменой, очередью и live progress по WebSockets',
      'Встроенный в бинарник веб-клиент на Angular 22 с кастомным drag-to-select и виртуализацией CDK',
      'Автоматическое обнаружение Android/Hi-Fi устройств и двусторонняя синхронизация по протоколу ADB',
      'Локальное хранение метаданных в redb, парсинг ID3-тегов и экспорт бэкапов в WebDAV'
    ],
    techStack: [
      'Rust 2024',
      'Angular 22',
      'Axum',
      'Signals',
      'RxJS',
      'redb',
      'Symphonia',
      'ID3',
      'ADB Protocol',
      '@angular/cdk',
      'WebDAV',
      'Nix Flakes'
    ],
    codeSnippet: {
      filename: 'src/downloader/engine.rs',
      description: 'Оркестрация параллельного конвейера с токеном отмены и WebSocket-прогрессом',
      code: `pub async fn download_playlist(
  &self,
  tracks: Vec<TrackMeta>,
  max_concurrent: usize,
  cancel_token: CancellationToken,
) -> Result<DownloadSummary> {
  let progress = Arc::new(AtomicUsize::new(0));
  let total = tracks.len();

  let results: Vec<Result<SavedTrack, DownloadError>> = stream::iter(tracks)
    .map(|track| {
      let client = self.client.clone();
      let token = cancel_token.child_token();
      let progress = Arc::clone(&progress);

      async move {
        tokio::select! {
          _ = token.cancelled() => Err(DownloadError::Cancelled),
          res = client.fetch_and_transcode(track) => {
            let done = progress.fetch_add(1, Ordering::Relaxed) + 1;
            client.ws_broadcast(ProgressEvent::Step { done, total }).await;
            res
          }
        }
      }
    })
    .buffer_unordered(max_concurrent)
    .collect()
    .await;

  DownloadSummary::from_results(results)
}`
    }
  },
  {
    name: 'Arcania',
    category: 'prod',
    role: 'Lead Frontend Developer & Architect',
    year: '2026',
    shortDesc:
      'Enterprise монорепозиторий контентно-коммерческой платформы: клиентский портал, админ-панель и общая UI-библиотека.',
    fullDesc:
      'Масштабный Nx 22 монорепозиторий, объединяющий клиентское приложение (apps/frontend), внутреннюю панель управления (apps/admin-panel) и переиспользуемую UI-библиотеку (libs/ui-kit). Включает каталог товаров с вложенными карточками, многошаговый checkout и платежные сценарии, новости/блог, SSR-рендеринг, 3D-просмотр ассетов (Three.js), дашборды с ngx-charts и rich-text редактор.',
    whyCool:
      'Строгие архитектурные границы библиотек в Nx монорепозитории. CI/CD на GitHub Actions автоматически вычисляет затронутые проекты (nx affected) и выполняет селективный production-деплой с прогревом кэша Cloudflare и performance-аудитом.',
    githubUrl: 'https://github.com/ArcaniaCMS/Frontend-workspace',
    highlights: [
      'Nx 22 монорепозиторий: client portal, admin panel и изолированная UI-библиотека (@arcania-inc/ui-kit)',
      'Сложные каталожные структуры, многошаговый payment flow и интерактивный 3D-просмотр Three.js',
      'Angular SSR с серверной предзагрузкой и оптимизацией Core Web Vitals',
      'CI/CD pipeline: определение affected-модулей, production сборка и прогрев Cloudflare кэша'
    ],
    techStack: [
      'Angular 21',
      'TypeScript',
      'Nx 22',
      'Yarn Workspaces',
      'Angular SSR',
      'RxJS',
      'Angular Material/CDK',
      'Three.js',
      'ngx-charts',
      'SCSS',
      'GitHub Actions'
    ],
    codeSnippet: {
      filename: 'libs/catalog/src/lib/services/product-catalog.service.ts',
      description: 'Zoneless реактивный стор каталога на Signals, resource() и авто-кэшировании',
      code: `@Injectable({ providedIn: 'root' })
export class ProductCatalogStore {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(TransferStateCache);

  readonly filter = signal<CatalogFilter>({ category: 'all', sort: 'popular', page: 1 });
  readonly search = signal<string>('');

  private readonly requestParams = computed(() => ({
    ...this.filter(),
    q: this.search().trim().toLowerCase()
  }));

  readonly productsResource = resource({
    params: () => this.requestParams(),
    loader: ({ params, abortSignal }) => {
      const cached = this.cache.get<ProductPage>(params);
      if (cached) return Promise.resolve(cached);

      return firstValueFrom(
        this.http.get<ProductPage>('/api/v2/catalog/items', {
          params,
          signal: abortSignal
        }).pipe(
          tap(data => this.cache.set(params, data)),
          retry({ count: 2, delay: 500 })
        )
      );
    }
  });

  readonly items = computed(() => this.productsResource.value()?.items ?? []);
  readonly isLoading = this.productsResource.isLoading;
}`
    }
  },
  {
    name: 'Elux',
    category: 'prod',
    role: 'Fullstack / Systems & Angular Developer',
    year: '2024–2025',
    shortDesc:
      'Control plane и веб-интерфейс управления конфигурациями и процессами Xray-core на базе Rust Axum и Angular.',
    fullDesc:
      'Панель управления и мониторинга прокси-маршрутизации. Rust core на Axum управляет жизненным циклом процесса Xray, предоставляет REST/WebSocket API, парсит конфигурации (VLESS, VMess, Trojan, Shadowsocks) и хранит данные в транзакционной SQLite. Angular 20 фронтенд на Taiga UI включает встроенный Monaco Editor для правки конфигов, группировку подписок и дашборд логов. Модуль xray-sys компилирует исходники Go Xray в статический C-архив и подключает через Rust FFI bindgen.',
    whyCool:
      'Прямая интеграция Rust backend с C/Go ABI Xray ядра через FFI bindgen, транзакционный SQLite-слой, реактивный Angular-дашборд с OnPush и многослойная сборка в легковесный Docker-контейнер.',
    githubUrl: 'https://github.com/DeLattice/Elux',
    highlights: [
      'Rust Axum REST/WebSocket control plane с управлением процессами ядра Xray и hot-reload',
      'Парсер и конвертер протоколов Shadowsocks, Trojan, VLESS и VMess',
      'Angular 20 фронтенд на Taiga UI с Monaco Code Editor и дашбордом метрик',
      'Rust-to-Go/C ABI FFI связка через build.rs и bindgen; мультистейдж Docker-пакет'
    ],
    techStack: [
      'Rust 2024',
      'Angular 20',
      'Axum',
      'Tokio',
      'SQLite (rusqlite/r2d2)',
      'Taiga UI',
      'Monaco Editor',
      'Go / C ABI',
      'bindgen',
      'Docker',
      'Devbox/Nix'
    ],
    codeSnippet: {
      filename: 'core/src/xray/process_supervisor.rs',
      description:
        'Асинхронный супервизор процесса Xray-core с пайплайном логов и graceful restart',
      code: `pub struct ProcessSupervisor {
  child: Arc<Mutex<Option<Child>>>,
  log_tx: broadcast::Sender<LogEntry>,
  status: Arc<AtomicBool>,
}

impl ProcessSupervisor {
  pub async fn spawn_xray(&self, config_path: &Path) -> Result<()> {
    let mut command = Command::new("xray");
    command
      .arg("run")
      .arg("-config")
      .arg(config_path)
      .stdout(Stdio::piped())
      .stderr(Stdio::piped())
      .kill_on_drop(true);

    let mut child = command.spawn().context("Failed to spawn Xray daemon")?;
    let stdout = child.stdout.take().expect("Stdout pipe unavailable");
    self.status.store(true, Ordering::SeqCst);

    let log_tx = self.log_tx.clone();
    tokio::spawn(async move {
      let mut reader = BufReader::new(stdout).lines();
      while let Ok(Some(line)) = reader.next_line().await {
        if let Ok(entry) = LogEntry::parse(&line) {
          let _ = log_tx.send(entry);
        }
      }
    });

    *self.child.lock().await = Some(child);
    Ok(())
  }
}`
    }
  },
  {
    name: 'Zonex',
    category: 'geek',
    role: 'Linux Desktop / Systems Developer (Author)',
    year: '2026',
    shortDesc:
      'Нативный GTK4/libadwaita менеджер архивов под Wayland с виртуальной файловой системой FUSE и drag-and-drop.',
    fullDesc:
      'Системное настольное Linux-приложение на Rust. Движки ZipEngine и TarEngine поддерживают форматы ZIP, TAR, TAR.GZ и TAR.ZST с автоопределением по сигнатурам (magic bytes). Включает виртуальную read-only FUSE файловую систему, которая строит виртуальное дерево архива, позволяя перетаскивать файлы (drag-out) в сторонние программы напрямую из точки монтирования без предварительного копирования во временную папку. Security-модули тестируют защиту от уязвимостей Zip Slip (path traversal) и валидацию паролей.',
    whyCool:
      'Прямая интеграция с подсистемой FUSE ядра Linux: файлы из архива монтируются как виртуальные узлы файловой системы, исключая избыточный I/O оверхед при drag-and-drop. Строгий Clippy deny-режим в CI/CD.',
    githubUrl: 'https://github.com/IVKLD/Zonex',
    highlights: [
      'Виртуальная файловая система FUSE (fuser/FUSE3) для мгновенного drag-and-drop без временной распаковки',
      'Движки архивации ZIP, TAR, GZip, Zstandard с определением по magic bytes',
      'Интерфейс на GTK4 / libadwaita с поддержкой Wayland и системных диалогов GNOME',
      'Встроенные security-тесты на защиту от атак Zip Slip и проверку целостности данных'
    ],
    techStack: [
      'Rust 2021',
      'GTK4',
      'libadwaita',
      'Wayland',
      'FUSE3 (fuser)',
      'ZIP / TAR',
      'zstd / gzip',
      'libarchive',
      'Nix Flakes',
      'Just',
      'Clippy'
    ],
    codeSnippet: {
      filename: 'src/fuse/archive_fs.rs',
      description:
        'Реализация виртуальной read-only FUSE-файловой системы без предварительной распаковки',
      code: `impl Filesystem for ArchiveFuseFs {
  fn lookup(&mut self, _req: &Request, parent: u64, name: &OsStr, reply: ReplyEntry) {
    let Some(parent_node) = self.inodes.get(&parent) else {
      reply.error(ENOENT);
      return;
    };

    let name_str = name.to_string_lossy();
    match parent_node.children.get(name_str.as_ref()) {
      Some(&child_ino) => {
        let attr = self.get_attr(child_ino).expect("Corrupt inode graph");
        reply.entry(&TTL, &attr, 0);
      }
      None => reply.error(ENOENT),
    }
  }

  fn read(
    &mut self,
    _req: &Request,
    ino: u64,
    _fh: u64,
    offset: i64,
    size: u32,
    _flags: i32,
    _lock_owner: Option<u64>,
    reply: ReplyData,
  ) {
    let Some(entry) = self.file_entries.get(&ino) else {
      reply.error(ENOENT);
      return;
    };

    match entry.read_slice(offset as u64, size as usize) {
      Ok(data) => reply.data(&data),
      Err(_) => reply.error(EIO),
    }
  }
}`
    }
  },
  {
    name: 'AUSWP',
    category: 'geek',
    role: 'Rust Systems / Network Developer',
    year: '2026',
    shortDesc:
      'Асинхронный ротатор прокси и SOCKS5 балансировщик на Rust с preflight-чеками, VLESS и TUN-маршрутизацией.',
    fullDesc:
      'Высокопроизводительный асинхронный балансировщик пула прокси на Rust (Cargo workspace: auswp-cli и auswp-core). До старта сервиса проводит параллельный health/latency check и замер скорости кандидатов, отбирая быстрые узлы. Реализован собственный SOCKS5 сервер с round-robin балансировкой, sticky-привязкой удачных прокси к доменам, поддержкой VLESS (TCP, WebSocket, gRPC, xhttp), интеграцией с sing-box / Mihomo и автоматической очисткой TUN-маршрутов ядра Linux.',
    whyCool:
      'Многопоточный асинхронный балансировщик с неблокирующим round-robin распределением через AtomicUsize, failover-ротацией соединений и прямым управлением правилами маршрутизации ядра Linux.',
    githubUrl: 'https://github.com/IVKLD/AUSWP',
    highlights: [
      'Preflight health-check и замер пропускной способности пула перед активацией прокси',
      'Неблокирующий SOCKS5 сервер с атомарной round-robin балансировкой и failover',
      'Поддержка VLESS URI / JSON форматов и конвертация под ядра sing-box / Mihomo',
      'Опциональный режим TUN-маршрутизации и GeoIP-привязка'
    ],
    techStack: [
      'Rust 2024',
      'Tokio',
      'reqwest / rustls',
      'tokio-socks',
      'SOCKS5',
      'VLESS',
      'sing-box',
      'Mihomo',
      'TUN',
      'MaxMindDB',
      'Nix Flakes'
    ],
    codeSnippet: {
      filename: 'auswp-core/src/protocols/socks5/server.rs',
      description: 'SOCKS5 handshake, асинхронная балансировка и zero-copy туннелирование',
      code: `pub async fn handle_socks5_client(
  mut client: TcpStream,
  balancer: Arc<ProxyBalancer>,
) -> Result<()> {
  let mut auth_buf = [0u8; 2];
  client.read_exact(&mut auth_buf).await?;
  let mut methods = vec![0u8; auth_buf[1] as usize];
  client.read_exact(&mut methods).await?;
  client.write_all(&[0x05, 0x00]).await?;

  let request = Socks5Request::read_from(&mut client).await?;
  let upstream_port = balancer
    .get_next_healthy_node(&request.target_host)
    .await
    .ok_or_else(|| anyhow!("All outbound proxies exhausted"))?;

  let mut outbound = TcpStream::connect(("127.0.0.1", upstream_port)).await?;
  client.write_all(&request.success_reply()).await?;

  let (mut cr, mut cw) = client.split();
  let (mut or, mut ow) = outbound.split();
  let _ = tokio::select! {
    res = tokio::io::copy(&mut cr, &mut ow) => res,
    res = tokio::io::copy(&mut or, &mut cw) => res,
  };

  Ok(())
}`
    }
  }
];

export const PROJECT_CATEGORIES: readonly ProjectCategoryTab[] = [
  { id: 'all', label: 'Все', count: PROJECTS_DATA.length },
  {
    id: 'prod',
    label: 'Продуктовые',
    count: PROJECTS_DATA.filter(p => p.category === 'prod').length
  },
  {
    id: 'geek',
    label: 'Гиковские',
    count: PROJECTS_DATA.filter(p => p.category === 'geek').length
  }
];
