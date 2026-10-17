# Repository Rules & Constraints

## Folder Structure

- Feature subcomponents live directly inside the feature directory (`src/app/features/<feature>/<subcomponent>/`).
- **NEVER** create an intermediate `components/` directory inside a feature module.

## Template & Styling Philosophy

- Leverage Angular's scoped `ViewEncapsulation` directly.
- **Zero wrapper soup**: Never wrap elements in useless `<div>`s when semantic tags or `:host` can be used.
- **Zero class spam**: Don't invent classes for every single element (`.idx`, `.badge`, `.summary`, `.report`, etc.). Target semantic tags (`<header>`, `<small>`, `<strong>`, `<p>`, `<footer>`, `<code>`, `<kbd>`, `<nav>`, `<article>`, `<button>`).
- Use `::after`/`::before` for dots, badges, or accent marks instead of dummy `<span>` elements.

- **Idiomatic Angular Control Flow**: Prefer `@if (expr; as value)` for guarding and binding nullable signals or expressions. This evaluates once, provides compiler-verified non-null narrowing, and eliminates non-null `!` assertions. Never create synthetic `@let foo = expr; @if (foo)` ceremony when `@if (expr; as foo)` accomplishes this natively.
- **Signals-First Reactive State & Signal Forms (Use `[formField]="field"`): ALWAYS use Writable Signals (`signal<T>()`) as the direct source of truth for component UI state. Form and search inputs MUST bind directly to signals via Angular Signal Forms (`form()` with `[formField]`). NEVER do ceremonial manual splitting `[value]="signal()" (input)="signal.set(ref.value)"` with template reference variables (`#ref`). NEVER introduce imperative `Subject` instances or proxy methods (`onSearch(val) { this.sub$.next(val) }`) just to shuttle template events. If asynchronous operators (`debounceTime`, `switchMap`) are needed, derive RxJS streams declaratively from the signal (`toObservable(this.signal).pipe(...)`). Components and templates must be driven purely by Signals.

## SCSS Limits

- **Every SCSS file must strictly be under 100 lines**.
- If a style file is near or over 100 lines, split it into modular SCSS partials (`_partial.scss`) or decompose into smaller components.

## Global Styles & Resets

- `_reset.scss` already sets `cursor: pointer`, `border: none`, `background-color: transparent`, and `user-select: none` on all `button`s.
- **NEVER** re-declare these redundant properties in component SCSS files.

## Change Detection

- The app uses `provideZonelessChangeDetection()` globally.
- **NEVER** write redundant `changeDetection: ChangeDetectionStrategy.OnPush` boilerplate.

## Minimal & Direct Code (Zero Bloat, Zero Speculative Code)

- **Write the absolute minimum amount of code required. Zero bloat, zero boilerplate, zero speculative code.**
- **NO synthetic intermediate variables**: NEVER create redundant alias variables (e.g. `@let foo = bar(); @if (foo)` in templates or redundant single-use variable wrappers) just to wrap conditions. Use direct signal calls or idiomatic template alias `@if (signal(); as alias)`.
- **NO TypeScript `as` type assertions**: NEVER use `as Type` casting in code (`as Error`, `as SomeDto`, `as any`, etc.). Use honest domain contracts, Drizzle schema `.$type<T>()`, and standard runtime guards (`instanceof Error`, `typeof`). (This constraint targets TypeScript type casting, not Angular template `@if (...; as ...)` aliases).
- **Explicit `null` for absent/falsey state**: NEVER use `undefined` to represent the absence of a value or falsey state. Use explicit `null` and do not allow `undefined` to leak into state.
- **NEVER re-export or alias existing types in intermediate files** (e.g. `export type Foo = FooRdo;` in feature `*.types.ts`). Import canonical contract types directly at the consumption site. If a file contains only redundant type aliases or boilerplate, **DELETE IT**.
- **NEVER** write speculative wrappers, unnecessary conditional guards (e.g. ad-hoc `window.location.hostname` checks, redundant defensive null-checks when types/framework guarantee state), dummy fallback branches, or verbose workarounds.
- **Zero Deprecated Code**: NEVER use deprecated APIs, functions, methods, components, directives, or icon exports marked with `@deprecated` (e.g. `ts(6385)`, such as `LucideLoader2` which was replaced by `LucideLoaderCircle`). Always use canonical, modern non-deprecated replacements.
- Prefer declarative, idiomatic framework/library primitives over ad-hoc procedural hacks.
- If an environment or tooling issue occurs (e.g. test runner, audit script, proxy), fix it at the configuration or tooling level rather than polluting application production runtime code.

## API Contracts, Types & DTOs (Zero Boilerplate & Zero Code for Code's Sake)

- **API Naming Conventions**: Always use **DTO** for request payloads and **RDO** for response data objects across both frontend and backend.
- **Direct `type` in Contracts**: Declare contracts directly using `export type FooDto = { ... }` or `export type BarRdo = { ... }`.
- **Zero Dummy Compatibility Aliases**: NEVER write redundant alias baggage (e.g. `export type OldRequest = NewDto;`). Update call sites directly at the source.
- **Zero Ceremonial Typing & Dummy `implements`**: NEVER import a contract type just to alias it with an `I`-prefix (e.g. `import type { FooDto as IFooDto }`) and attach `implements IFooDto` to a backend DTO class. A NestJS DTO class is already self-sufficient with its validation decorators.

## Tooling & Package Management

- **ALWAYS** use `yarn` and `just` for package management, running scripts, builds, lints, and audits.
- **NEVER** use `npm`, `npx`, `pnpm`, or `bun`.
- Prefer `just` recipes from `Justfile` (`just check`, `just build`, `just lint`, `just audit`, `just preview`).
