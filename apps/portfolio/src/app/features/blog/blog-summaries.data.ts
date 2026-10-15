import { BlogSummary } from './blog.types';

export const BLOG_SUMMARIES: readonly BlogSummary[] = [
  {
    slug: 'harm-of-ai-in-projects',
    title: 'Иллюзия скорости: почему слепая генерация кода через ИИ разрушает проекты',
    subtitle:
      'Инженерный разбор скрытых рисков LLM: когнитивная атрофия, архитектурный хаос, «AI-slop», малозаметные утечки памяти и почему «вайб-кодинг» оборачивается ночным дебагом в продакшене.',
    excerpt:
      'Разбираем, почему печать синтаксиса никогда не была узким горлышком разработки, как человеческий мозг попадает в ловушку «правдоподобного кода» (Plausible Slop), чем опасны галлюцинации библиотек (slopsquatting) и почему синьоры рождаются в борьбе с компилятором, а не в промптинге.',
    date: '2 октября 2026',
    readTime: '9 мин',
    tags: ['Архитектура', 'AI & LLM', 'Code Quality', 'Техдолг', 'TypeScript'],
    featured: true
  },
  {
    slug: 'zoneless-angular-signals-production',
    title: 'Zoneless Angular в продакшене: опыт полного отказа от zone.js и переход на Signals',
    subtitle:
      'Как перестать патчить микротаски браузера, снизить TTI и выстроить предсказуемый реактивный граф без магии.',
    excerpt:
      'Практический разбор архитектуры Zoneless-приложения на Angular 22: замена тяжелого рантайма zone.js на мелкозернистую реактивность сигналов, правильное использование resource / linkedSignal и ликвидация лишних циклов Change Detection.',
    date: '28 сентября 2026',
    readTime: '7 мин',
    tags: ['Angular 22', 'Zoneless', 'Signals', 'Performance']
  },
  {
    slug: 'nx-monorepo-domain-boundaries',
    title: 'Архитектура фронтенд-монорепозитория на Nx: строгие границы и изоляция библиотек',
    subtitle:
      'Как не превратить корпоративный монорепозиторий в спагетти с помощью ESLint module-boundaries и Feature-Sliced подхода.',
    excerpt:
      'Опыт проектирования масштабируемого Nx-монорепозитория: деление на UI-kit, features и core-домены, предотвращение циклических импортов и оптимизация времени сборки через кэширование артефактов.',
    date: '19 сентября 2026',
    readTime: '6 мин',
    tags: ['Nx Monorepo', 'Архитектура', 'CI/CD', 'Масштабируемость']
  },
  {
    slug: 'rust-and-angular-desktop-integration',
    title: 'Rust 2024 + Angular в десктопных приложениях: архитектура VortexDL',
    subtitle:
      'Связка веб-интерфейса на Signals с высокопроизводительным системным бэкендом на Rust и встраиваемой базой данных redb.',
    excerpt:
      'Как подружить реактивный фронтенд с асинхронным системным ядром на Tokio: протоколы IPC, нулевое копирование буферов, работа с ADB в реальном времени и управление жизненным циклом фоновых воркеров.',
    date: '10 сентября 2026',
    readTime: '8 мин',
    tags: ['Rust 2024', 'Angular', 'Systems', 'VortexDL']
  },
  {
    slug: 'cva-reusable-form-controls',
    title: 'ControlValueAccessor без боли: проектирование переиспользуемых элементов форм',
    subtitle:
      'Анатомия надежных кастомных инпутов с валидацией, поддержкой WAI-ARIA и бесшовной интеграцией в Reactive Forms.',
    excerpt:
      'Разбираем частые ошибки при реализации CVA: рассинхронизация writeValue, потеря событий onTouched, поломка disabled-состояний и интеграция со строгой типизацией Typed Forms.',
    date: '2 сентября 2026',
    readTime: '5 мин',
    tags: ['Angular Forms', 'CVA', 'WAI-ARIA', 'UI Kit']
  }
];
