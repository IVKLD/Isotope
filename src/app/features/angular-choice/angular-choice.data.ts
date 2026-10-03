import { CompetitorComparison, CompetitorKey, CompetitorTabMeta } from './angular-choice.types';

export const REACT_COMPARISON: CompetitorComparison = {
  key: CompetitorKey.React,
  name: 'React',
  badgeText: 'Свобода vs Хаос',
  tagline: 'Библиотека интерфейсов без встроенного фундамента',
  accentColor: '#61dafb',
  description:
    'В 2026 году даже с появлением React 19 и React Compiler экосистема React остаётся набором не связанных между собой библиотек: ' +
    'роутер, стейт-менеджер, формы, клиент запросов и SSR собираются вручную под каждый проект. ' +
    'Angular поставляет монолитную согласованную платформу: Signals, Zoneless, иерархический DI, типизированный роутинг, HttpClient и формы ' +
    'интегрированы из коробки, концентрируя усилия на бизнес-логике, а не на обслуживании сторонних зависимостей.',
  verdict: {
    command: 'platform --audit react-ecosystem --year 2026',
    title:
      'Целостная платформа с нативным Zoneless вместо хрупкого клея из 10+ сторонних библиотек',
    summary:
      'В 2026 году React Compiler частично автоматизировал мемоизацию, но не решил фундаментальные проблемы: реконсиляцию Virtual DOM, ' +
      'каскадные рендеры поддеревьев, отсутствие Dependency Injection и постоянный дрейф сторонних пакетов. ' +
      'Angular предоставляет сбалансированную экосистему, где Signals, Zoneless, @defer и Event Replay работают синхронно под контролем Google.',
    checks: [
      {
        name: 'Reactivity',
        status: 'PASS',
        description:
          'Signal Graph: точечные обновления DOM без Virtual DOM и без Zone.js (нативный Zoneless)'
      },
      {
        name: 'Architecture',
        status: 'PASS',
        description: 'Иерархический DI с InjectionToken вместо Context API и глобальных синглтонов'
      },
      {
        name: 'Data & Defer',
        status: 'PASS',
        description:
          'Декларативный синтаксис @defer и Event Replay вместо RSC-водопадов и Hydration Mismatch'
      },
      {
        name: 'Evolution',
        status: 'PASS',
        description:
          'Официальные AST Codemods (ng update) вместо сотен часов ручных переписываний ломающихся библиотек'
      }
    ]
  },
  aspects: [
    {
      title: 'Реактивность & Рантайм',
      competitor: {
        title: 'Virtual DOM и ре-рендер функций в React 19',
        points: [
          'Virtual DOM оверхед: повторный прогон функции компонента сверху вниз и diff деревьев при каждом изменении стейта',
          'Stale closures: риск рассинхронизации замыканий и зависимостей в хуках даже при наличии React Compiler',
          'INP просадки: блокировка главного потока браузера при реконсиляции динамических списков'
        ],
        code: `function Counter({ id }: { id: string }) {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
    analytics.track(id, count); // Stale closure без Ref!
  }, [id, count]);
  return <button onClick={handleClick}>{count}</button>;
}`
      },
      angular: {
        title: 'Signal Graph & Нативный Zoneless',
        points: [
          'Signal Graph: прямое точечное обновление узлов DOM без обхода дерева компонентов и без Virtual DOM',
          'Нативный Zoneless: нулевой оверхед (без monkey-patching браузерных API через Zone.js)',
          'Предсказуемый рантайм: чистая синхронная реактивность без хуков, зависимостей и каскадных ре-рендеров'
        ],
        code: `@Component({
  template: \`<button (click)="inc()">{{ count() }}</button>\`
})
export class Counter {
  readonly id = input.required<string>();
  readonly count = signal(0);

  inc() {
    this.count.update(c => c + 1);
    analytics.track(this.id(), this.count());
  }
}`
      }
    },
    {
      title: 'Отложенная загрузка и код-сплиттинг',
      competitor: {
        title: 'Ручной React.lazy и водопады Suspense',
        points: [
          'Ручной бойлерплейт: связка React.lazy, обёрток Suspense и сторонних IntersectionObserver библиотек',
          'Каскадные водопады (Waterfalls): последовательная загрузка вложенных чанков и сдвиги макета (CLS)',
          'Неуправляемые плейсхолдеры: мерцание интерфейса при загрузке без декларативной оркестрации'
        ],
        code: `const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Analytics() {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}`
      },
      angular: {
        title: 'Декларативный синтаксис @defer',
        points: [
          'Декларативный @defer: компилятор автоматически выносит зависимости в чанки без ручного кода',
          'Встроенные триггеры: on viewport, prefetch on idle, hydrate on interaction из коробки',
          'Оркестрация состояний: нативные блоки @placeholder, @loading и @error без сторонних библиотек'
        ],
        code: `@defer (on viewport; prefetch on idle) {
  <heavy-chart />
} @placeholder (minimum 300ms) {
  <chart-skeleton />
} @loading {
  <loading-spinner />
}`
      }
    },
    {
      title: 'SSR, гидратация и Core Web Vitals',
      competitor: {
        title: 'Hydration Mismatch и RSC-фрагментация',
        points: [
          'RSC-фрагментация: раскол кодовой базы директивами "use client" / "use server" и путаница с пропсами',
          'Блокировка ввода: потеря пользовательских кликов и событий до завершения полной гидратации бандла',
          'Hydration Mismatch: частые ошибки рассинхронизации DOM сервера и клиента, требующие ре-рендера'
        ],
        code: `export default function UserCard({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchUser(id, { signal: ctrl.signal }).then(setUser);
    return () => ctrl.abort(); // Обязательный ручной cleanup
  }, [id]);

  return <div>{user?.name}</div>;
}`
      },
      angular: {
        title: 'Non-destructive Hydration & Event Replay',
        points: [
          'Non-destructive Hydration: серверный HTML сохраняется без перерисовки и мерцания в браузере',
          'Event Replay: события до завершения гидратации буферизируются и воспроизводятся без потерь ввода',
          'Инкрементальная гидратация: компоненты гидрируются только при взаимодействии через @defer'
        ],
        code: `@Component({
  template: \`<div>{{ user.value()?.name }}</div>\`
})
export class UserCard {
  readonly id = input.required<string>();
  readonly user = resource({
    params: () => this.id(),
    loader: ({ params, abortSignal }) => fetchUser(params, { signal: abortSignal })
  });
}`
      }
    },
    {
      title: 'Архитектурный каркас и типобезопасность',
      competitor: {
        title: 'Фрагментированный зоопарк зависимостей',
        points: [
          'Зоопарк библиотек: сборка архитектуры из 10+ сторонних пакетов (роутер, стейт, формы, кверис)',
          'Архитектурный хаос: отсутствие единых стандартов, Context API провоцирует неконтролируемые рендеры',
          'Хрупкие обновления: при обновлении одного пакета ломаются соседние интеграции и типы'
        ],
        code: `// Ручная связка внешних библиотек и потеря типов в контроллере
const { control } = useForm<UserProfile>({
  resolver: zodResolver(userSchema)
});

return (
  <Controller
    name="address.city"
    control={control}
    render={({ field, fieldState }) => (
      <CustomInput {...field} error={fieldState.error?.message} />
    )}
  />
);`
      },
      angular: {
        title: 'Встроенная платформа & Иерархический DI',
        points: [
          'Единая платформа: роутинг, HttpClient, DI и формы поставляются и поддерживаются вендором',
          'Иерархический DI: строгий контроль скоупов сервисов от корня приложения до конкретного элемента',
          'Типобезопасные Reactive Forms: FormGroup и FormArray со строгой типизацией контролов'
        ],
        code: `// Строго типизированный FormBuilder платформы + единый CVA
readonly form = inject(FormBuilder).nonNullable.group({
  address: this.fb.group({
    city: this.fb.control('', [Validators.required])
  })
});
// Подключение кастомного контрола единообразно:
// <custom-input formControlName="city" />`
      }
    },
    {
      title: 'Долговечность и автоматические миграции',
      competitor: {
        title: 'Сотни часов ручного рефакторинга',
        points: [
          'Ручной рефакторинг: поломки мажорных версий (React 18 → 19, Next/Remix) требуют сотен часов правок',
          'Зависимость от мейнтейнеров: месяцы ожидания адаптации сторонних библиотек под новые версии React',
          'Устаревание кода: кодовая база 3-летней давности часто требует полной переписки с нуля'
        ],
        code: `# Ручной аудит несовместимых пакетов и ломающихся хуков
npm install react@19 react-dom@19
# npm ERR! ERESOLVE could not resolve dependency:
# peer react@"^18.0.0" from react-hook-form, @tanstack/react-query...
# Десятки часов ручной адаптации кодовой базы`
      },
      angular: {
        title: 'Автоматический ng update (AST Codemods)',
        points: [
          'Официальный ng update: автоматические AST-миграции кодовой базы запускаются одной консольной командой',
          'Гарантированный LTS: предсказуемый 6-месячный релизный цикл с поддержкой обратной совместимости',
          'Эволюция без переписывания: плавный переход на Standalone, Signals и Control Flow без остановки фич'
        ],
        code: `# Официальный AST Codemod запускается одной командой
ng update @angular/core @angular/cli

# ✔ Автоматическая миграция Control Flow (@if, @for)
# ✔ Автоматический перевод Inputs/Outputs на Signals
# ✔ Автоматическое обновление зависимостей и TypeScript`
      }
    }
  ]
};

export const VUE_COMPARISON: CompetitorComparison = {
  key: CompetitorKey.Vue,
  name: 'Vue',
  badgeText: 'Простота vs Enterprise',
  tagline: 'Быстрый старт с компромиссной enterprise-инфраструктурой',
  accentColor: '#41b883',
  description:
    'Vue 3.5 удобен для средних SPA и быстрого прототипирования, но в enterprise-масштабе сталкивается с нехваткой строгой встроенной платформы. ' +
    'Angular изначально спроектирован на TypeScript: строгий template type-checking компилятора ngc, многоуровневый DI и границы библиотек ' +
    'гарантируют стабильный рефакторинг в enterprise-монорепозиториях любого масштаба.',
  verdict: {
    command: 'platform --audit vue-architecture --year 2026',
    title: 'Строгий TypeScript-first компилятор и промышленный DI вместо легковесных компромиссов',
    summary:
      'Эксперименты с Vapor Mode приближают Vue к графовой реактивности, но не закрывают enterprise-потребности: ' +
      'компиляцию шаблонов через Volar/vue-tsc вместо нативного TypeScript AST, отсутствие древовидного DI и фрагментированные библиотеки форм. ' +
      'Angular даёт целостную промышленную среду для распределённых команд без риска архитектурных коллизий.',
    checks: [
      {
        name: 'Type Safety',
        status: 'PASS',
        description:
          'Строгий Template Type Checking в ngc: типы сигналов, событий и пайпов проверяются на уровне TS AST'
      },
      {
        name: 'Form Engine',
        status: 'PASS',
        description:
          'Reactive Forms, FormArray и единый контракт ControlValueAccessor (CVA) из коробки'
      },
      {
        name: 'DI Hierarchy',
        status: 'PASS',
        description:
          'Многоуровневый DI с InjectionToken и изоляцией скоупов вместо плоского provide/inject'
      },
      {
        name: 'Enterprise Kits',
        status: 'PASS',
        description: 'Google CDK (Overlay, VirtualScroll, FocusTrap, A11y) + Spartan UI и Taiga UI'
      }
    ]
  },
  aspects: [
    {
      title: 'Строгость типизации шаблонов',
      competitor: {
        title: 'Зависимость от Volar, vue-tsc и макросов',
        points: [
          'Внешний tooling: типизация `.vue` SFC опирается на связку Volar и vue-tsc вне ядра компилятора',
          'Синтаксические макросы: defineProps и defineEmits усложняют использование сложных TS-дженериков',
          'Утечки в рантайм: часть несоответствий типов в шаблонах не отлавливается на этапе CI-сборки'
        ],
        code: `<!-- Vue 3: defineProps/defineEmits макросы, Volar вне TS-компилятора -->
<script setup lang="ts">
const props = defineProps<{ items: Array<{ id: string; price: number }> }>();
const emit = defineEmits<{ select: [id: string] }>();
</script>
<template>
  <div v-for="item in items" :key="item.id" @click="emit('select', item.id)">
    {{ item.price.toFixed(2) }}
  </div>
</template>`
      },
      angular: {
        title: 'Строгий Template Type Checking в ngc',
        points: [
          'Строгий ngc: шаблоны компилируются в полноценный TypeScript AST с максимальной строгостью',
          'Проверка сигналов и пайпов: 100% типобезопасность выражений, параметров событий и директив',
          'Надёжный рефакторинг: переименование свойств в компоненте мгновенно подсвечивается в шаблонах'
        ],
        code: `// Angular: Чистый TypeScript AST, проверка 100% сигналов и событий в ngc
@Component({
  template: \`
    @for (item of items(); track item.id) {
      <div (click)="select.emit(item.id)">
        {{ item.price | currency }}
      </div>
    }
  \`
})
export class ItemList {
  readonly items = input.required<readonly ProductItem[]>();
  readonly select = output<string>();
}`
      }
    },
    {
      title: 'Формы и валидация enterprise-уровня',
      competitor: {
        title: 'Сторонние библиотеки (VeeValidate, FormKit)',
        points: [
          'Ограниченность v-model: удобен для простых инпутов, но бессилен на сложных динамических матрицах',
          'Сторонняя зависимость: необходимость подключения сторонних библиотек с регулярной сменой API',
          'Отсутствие единого CVA: каждый UI-кит изобретает собственный протокол связывания контролов'
        ],
        code: `<!-- Vue 3: Каждый UI-кит изобретает свой контракт v-model -->
<script setup>
// Нет единого платформенного стандарта связки формы с кастомным контролом
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>`
      },
      angular: {
        title: 'Reactive Forms, FormArray и единый CVA',
        points: [
          'Индустриальный CVA: единый контракт ControlValueAccessor для всех кастомных контролов экосистемы',
          'Типизированные Reactive Forms: декларативное дерево валидаторов, FormArray и кросс-проверки',
          'Нулевые внешние зависимости: вся логика валидации и нормализации поставляется платформой'
        ],
        code: `// Angular: Единый контракт ControlValueAccessor (CVA) для всей платформы
@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInput),
    multi: true
  }]
})
export class CustomInput implements ControlValueAccessor {
  writeValue(val: string) { /* sync */ }
  registerOnChange(fn: (v: string) => void) { /* notify */ }
}`
      }
    },
    {
      title: 'Масштабирование в монорепозиториях',
      competitor: {
        title: 'Слабый Provide/Inject без иерархических скоупов',
        points: [
          'Слабый provide/inject: нет строгой изоляции инжекторов, фабричных провайдеров и скоупов',
          'Риск коллизий: строковые и символьные ключи инъекций легко ломаются в крупных командах',
          'Сложности микрофронтендов: изоляция модулей требует ручных костылей в рантайме'
        ],
        code: `// Vue 3: provide/inject не имеет древовидных скоупов и токенов
import { inject } from 'vue';
export function useBilling() {
  // Строковый ключ: риск runtime undefined и коллизий в монорепе!
  const billing = inject<BillingService>('BILLING_SERVICE');
  return billing;
}`
      },
      angular: {
        title: 'Иерархический DI и строгие Nx Boundaries',
        points: [
          'Многоуровневый DI: древовидные инжекторы с изоляцией контекстов сервисов для микрофронтендов',
          'InjectionToken: типобезопасные токены внедрения зависимостей с tree-shaking из коробки',
          'Строгие Nx Boundaries: жесткие архитектурные границы библиотек исключают протекание логики'
        ],
        code: `// Angular: Типобезопасный иерархический DI с InjectionToken
export const BILLING_CONFIG = new InjectionToken<BillingConfig>('BILLING_CONFIG');

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly config = inject(BILLING_CONFIG);
  private readonly http = inject(HttpClient);
}`
      }
    },
    {
      title: 'UI-инфраструктура и доступность (A11y)',
      competitor: {
        title: 'Фрагментированные UI-библиотеки',
        points: [
          'Фрагментированные киты: множество любительских UI-библиотек без единого стандарта A11y',
          'Отсутствие гарантий: плагины забрасываются авторами при выходе новых версий фреймворка',
          'Слабый WAI-ARIA: клавиатурную навигацию и фокус-менеджмент часто приходится писать с нуля'
        ],
        code: `<!-- Vue 3: Ручная реализация оверлеев, FocusTrap и WAI-ARIA -->
<template>
  <div role="dialog" aria-modal="true" @keydown.esc="close">
    <!-- Ручной расчет z-index, фокус-ловушки и клика снаружи -->
    <slot />
  </div>
</template>`
      },
      angular: {
        title: 'Google CDK & Проверенные Enterprise-киты',
        points: [
          'Headless Google CDK: виртуальный скролл, FocusTrap, оверлеи и полная поддержка WAI-ARIA 1.2',
          'Промышленные киты: Spartan UI (shadcn), Taiga UI, Material — поддержка крупными корпорациями',
          'Корпоративная надёжность: компоненты протестированы на доступность и готовы к аудитам'
        ],
        code: `// Angular: Google CDK (Overlay, FocusTrap, VirtualScroll, LiveAnnouncer)
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly overlay = inject(Overlay);
  private readonly trap = inject(FocusTrapFactory);
  open<T>(comp: ComponentType<T>) {
    const ref = this.overlay.create({ hasBackdrop: true, disposeOnNavigation: true });
    return ref.attach(new ComponentPortal(comp));
  }
}`
      }
    }
  ]
};

export const SVELTE_COMPARISON: CompetitorComparison = {
  key: CompetitorKey.Svelte,
  name: 'Svelte',
  badgeText: 'Компилятор vs Платформа',
  tagline: 'Экспериментальный компилятор с постоянной сменой концепций',
  accentColor: '#ff3e00',
  description:
    'Svelte привлекателен компактностью, но на длинной корпоративной дистанции несёт риски: радикальный слом концепций в Svelte 5 (переход на Runes) ' +
    'и небольшая экосистема создают проблемы в продакшне. Angular поддерживается Google, обладает 10+ годами непрерывной эволюции, ' +
    'официальными автомиграциями через ng update и проверенной базой Enterprise-решений.',
  verdict: {
    command: 'platform --audit svelte-lifecycle --year 2026',
    title: 'Зрелая платформа с 10-летним LTS и гарантированной эволюцией вместо ломки парадигм',
    summary:
      'Svelte 5 с концепцией Runes ($state, $derived) сделал шаг в сторону сигналов, но сломал накопленную экосистему библиотек и синтаксис Svelte 3/4. ' +
      'В условиях крупного бизнеса переписывание кодовой базы обходится слишком дорого. ' +
      'Angular эволюционирует непрерывно: новые фичи (Signals, Zoneless, Control Flow) внедряются без слома старых приложений.',
    checks: [
      {
        name: 'LTS Stability',
        status: 'PASS',
        description:
          '10+ лет непрерывной эволюции платформы без обнуления кодовой базы (в отличие от Svelte 4 -> 5 Runes)'
      },
      {
        name: 'Testability',
        status: 'PASS',
        description:
          'Чистые Vitest и Jest unit-тесты сервисов без необходимости препроцессоров и компиляции Svelte-файлов'
      },
      {
        name: 'Enterprise Kits',
        status: 'PASS',
        description:
          'Готовые проверенные решения для виртуализированных таблиц, деревьев и диалогов (Google CDK, AG Grid, PrimeNG)'
      },
      {
        name: 'Talent Market',
        status: 'PASS',
        description:
          'Мировой индустриальный стандарт, развитый рынок сеньор-разработчиков и единый архитектурный стиль'
      }
    ]
  },
  aspects: [
    {
      title: 'Стабильность парадигм и API',
      competitor: {
        title: 'Сломы парадигмы (Svelte 4 -> 5 Runes)',
        points: [
          'Сломы концепций: переход со Svelte 4 на 5 (Runes) сломал старые гайды, библиотеки и синтаксис',
          'Ручной переезд: команды вынуждены переписывать кодовые базы под новый реактивный синтаксис',
          'Нестабильность экосистемы: сторонние пакеты отстают от смены парадигм компилятора'
        ],
        code: `<!-- Svelte 5: Слом синтаксиса Svelte 3/4 рунами компилятора -->
<script lang="ts">
  let { initial = 0 } = $props();
  let count = $state(initial);
  let double = $derived(count * 2);
  $effect(() => console.log('Count:', count));
</script>
<button onclick={() => count++}>{double}</button>`
      },
      angular: {
        title: '10+ лет непрерывной эволюции платформы',
        points: [
          '10+ лет эволюции: LTS-поддержка и предсказуемое развитие без выбрасывания кодовой базы',
          'Автомиграция: код пятилетней давности обновляется на современный стек командами ng update',
          'Стабильный бизнес: нулевые риски переписывания проекта с нуля из-за смены взглядов автора'
        ],
        code: `// Angular: Стандартный TypeScript без компиляторных рун
@Component({
  template: \`<button (click)="count.update(c => c + 1)">{{ double() }}</button>\`
})
export class Counter {
  readonly initial = input<number>(0);
  readonly count = signal(this.initial());
  readonly double = computed(() => this.count() * 2);
}`
      }
    },
    {
      title: 'Корпоративный tooling и тестирование',
      competitor: {
        title: 'Сложности изоляции вне компилятора',
        points: [
          'Компиляторная магия: сложность изолированного unit-тестирования логики без препроцессора',
          'Слабые моки: ограниченные возможности декларативной подмены зависимостей в тестах',
          'Фрагментация раннеров: интеграция с тестовыми раннерами ломается при апдейтах компилятора'
        ],
        code: `// Svelte: Зависимость тестов от svelte/compiler и сборщика Vite
// Невозможно протестировать изолированный сервис без компиляции компонентов
import { render } from '@testing-library/svelte';
import SvelteComponent from './Component.svelte';`
      },
      angular: {
        title: 'First-class Vitest, Jest и встроенный TestBed',
        points: [
          'Встроенный TestBed: декларативная подмена сервисов через DI и лёгкое изолированное тестирование',
          'Тесты без DOM: тестирование сигналов и чистых сервисов как обычных TypeScript-классов',
          'Официальный tooling: гарантированная поддержка Vitest, Jest, Cypress и Playwright от Google'
        ],
        code: `// Angular: Чистый Vitest юнит-тест сервисов без DOM и без компилятора
it('should compute derived total via signals', () => {
  TestBed.configureTestingModule({ providers: [CartService] });
  const cart = TestBed.inject(CartService);
  cart.addItem({ price: 250 });
  expect(cart.total()).toBe(250);
});`
      }
    },
    {
      title: 'Экосистема сложных Enterprise-виджетов',
      competitor: {
        title: 'Острый дефицит сложных UI-контролов',
        points: [
          'Дефицит компонентов: отсутствие зрелых headless-библиотек для сложных таблиц, графиков и деревьев',
          'Изобретение велосипедов: разработчикам приходится писать виртуализацию и оверлеи с нуля',
          'Высокий Bus Factor: подавляющее большинство библиотек поддерживается энтузиастами-одиночками'
        ],
        code: `<!-- Svelte: Отсутствие официального headless CDK -->
<!-- Приходится писать виртуализацию и оверлеи вручную -->
<div bind:this={viewport} onscroll={onScroll}>
  <!-- Ручной расчет сдвигов и высот строк для 100 000 элементов -->
</div>`
      },
      angular: {
        title: 'Богатейший стек готовых Enterprise-компонентов',
        points: [
          'Полный стек готовых решений: Google CDK, Taiga UI, Material и PrimeNG закрывают любые задачи',
          'Виртуализация и оверлеи: готовые headless-модули с гарантированной производительностью на 60 FPS',
          'Корпоративный стандарт: решения проверены в боевых банковских и аналитических системах'
        ],
        code: `<!-- Angular: Google CDK Virtual Scroll для 100 000+ строк на 60 FPS -->
<cdk-virtual-scroll-viewport itemSize="48" class="viewport">
  <div *cdkVirtualFor="let item of items()">
    {{ item.title }} — {{ item.status }}
  </div>
</cdk-virtual-scroll-viewport>`
      }
    },
    {
      title: 'Кадровый рынок и ликвидность стека',
      competitor: {
        title: 'Узкая ниша специалистов',
        points: [
          'Узкий рынок труда: острый дефицит сеньор-разработчиков и архитекторов на Svelte',
          'Высокий Bus Factor: зависимость бизнеса от одного-двух ключевых энтузиастов команды',
          'Разнобой практик: отсутствие общепринятых корпоративных архитектурных стандартов'
        ],
        code: `# Svelte: Узкий рынок труда, дефицит архитекторов
# Каждая команда изобретает собственные архитектурные правила
# Риск заморозки проекта при уходе ключевого лида`
      },
      angular: {
        title: 'Мировой корпоративный стандарт',
        points: [
          'Мировой стандарт: миллионы квалифицированных enterprise-инженеров по всему миру',
          'Единый стиль кода: одинаковая структура проектов в любой компании благодаря Angular CLI',
          'Мгновенный онбординг: новый разработчик включается в разработку с первого дня без сюрпризов'
        ],
        code: `# Angular: Мировой индустриальный стандарт
# Десятки тысяч сеньор-инженеров, готовые архитектурные паттерны
# Гарантированный онбординг за 1 день благодаря единому CLI`
      }
    }
  ]
};

export const COMPETITORS: Record<CompetitorKey, CompetitorComparison> = {
  [CompetitorKey.React]: REACT_COMPARISON,
  [CompetitorKey.Vue]: VUE_COMPARISON,
  [CompetitorKey.Svelte]: SVELTE_COMPARISON
};

export const COMPETITOR_TABS: readonly CompetitorTabMeta[] = [
  REACT_COMPARISON,
  VUE_COMPARISON,
  SVELTE_COMPARISON
];
