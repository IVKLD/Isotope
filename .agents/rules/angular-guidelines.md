# Project Architectural and Code Style Rules

## 1. Feature Component Hierarchy & Folder Structure

- **NO intermediate `components/` folders** inside feature directories.
- Feature-local subcomponents MUST be placed directly in the feature directory:
  - ✅ `src/app/features/<feature>/<subcomponent>/` (e.g. `features/angular-choice/competitor-tabs/`, `features/bento-grid/project-card/`)
  - ❌ `src/app/features/<feature>/components/<subcomponent>/`

## 2. HTML Semantics & ViewEncapsulation (No Wrapper Soup, No Class Spam)

- Angular components use `ViewEncapsulation.Emulated` by default — styles are already strictly scoped to the component host.
- **DO NOT create redundant wrapper `<div>`s** or class name soup (`.badge`, `.count`, `.summary`, `.idx`, `.report`, etc.).
- Style semantic HTML elements directly:
  - Use `:host` directly as the container layout instead of wrapping everything in `<div class="...">`.
  - Use semantic tags: `<header>`, `<footer>`, `<nav>`, `<article>`, `<section>`, `<button>`, `<small>`, `<strong>`, `<code>`, `<kbd>`, `<p>`, `<ul>`, `<li>`.
  - Use pseudo-elements (`::before`, `::after`) and structural pseudo-classes (`:first-of-type`, `:last-child`) instead of marker spans.
- **Idiomatic Control Flow**: Use `@if (expr; as value)` for guarding and binding nullable signals or objects to avoid duplicate evaluations and redundant non-null assertions (`!`). Avoid creating synthetic `@let` wrapper variables.
- **Signals-First Reactive State & Signal Forms (Use `[formField]="field"`): Always use Writable Signals (`signal<T>()`) as the direct source of truth for component state. Form and search inputs MUST bind directly to signals via Angular Signal Forms (`form()` with `[formField]`). NEVER do ceremonial manual splitting `[value]="signal()" (input)="signal.set(ref.value)"` with `#ref` template reference variables. NEVER introduce intermediate `Subject` pipelines or proxy methods (`onSearch(val) { this.sub$.next(val) }`) to shuttle UI events. If asynchronous orchestration (`debounceTime`, `switchMap`) is required, derive the stream declaratively using `toObservable(this.signal).pipe(...)`.

## 3. Strict SCSS Modularity (< 100 Lines per File)

- **NO SCSS file may exceed 100 lines**.
- If component styles approach or exceed 100 lines, immediately break them down into modular SCSS partials (e.g. `_accordion-item.scss`, `_tab-card.scss`) or decompose into smaller subcomponents.
- Keep SCSS concise, clean, and DRY using mixins and CSS custom properties.

## 4. Technical Accuracy

- Keep framework architecture comparisons accurate for the current era (React 19 Compiler, RSC, VDOM; Vue 3.5 Vapor mode & Volar typing; Svelte 5 Runes paradigm shift vs Angular Signals, Zoneless, hierarchical DI, and Google LTS).

## 5. Zoneless Change Detection

- The app uses `provideZonelessChangeDetection()` globally in `app.config.ts`.
- **NEVER** write redundant `changeDetection: ChangeDetectionStrategy.OnPush` boilerplate.

## 6. Global Resets & Button Styles

- `src/styles/_reset.scss` globally sets `cursor: pointer`, `border: none`, `background-color: transparent`, and `user-select: none` on `button`.
- **NEVER** duplicate these reset styles in component-level SCSS.

## 7. Minimal & Direct Code (Zero Bloat, Zero Speculative Code)

- **Write the absolute minimum code to solve the problem.** No speculative wrappers, dummy guards, or boilerplate.
- **NO synthetic intermediate variables**: NEVER invent `@let foo = bar(); @if (foo)` or temporary wrapper variables in templates. Access signals and properties directly.
- **NO TypeScript `as` type assertions**: NEVER use `as Type` casting in TypeScript code. Rely on proper schema types, contracts, and runtime guards (`instanceof Error`, `typeof`). (Does not apply to template `@if (expr; as val)`).
- **Explicit `null` for absent/falsey state**: NEVER use `undefined` to indicate the absence of a value or falsey state. Use explicit `null` and prevent `undefined` leakage.
- **Zero Deprecated Code**: NEVER use deprecated APIs, functions, methods, components, directives, or icon exports marked with `@deprecated` (e.g. `ts(6385)`, such as `LucideLoader2` which was replaced by `LucideLoaderCircle`). Always use canonical, modern non-deprecated replacements.
- Never pollute application runtime code with environment hacks (e.g. ad-hoc `window.location.hostname` checks); solve tooling/test environment issues at the tooling configuration level.
