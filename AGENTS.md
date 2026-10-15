# Repository Rules & Constraints

## Folder Structure

- Feature subcomponents live directly inside the feature directory (`src/app/features/<feature>/<subcomponent>/`).
- **NEVER** create an intermediate `components/` directory inside a feature module.

## Template & Styling Philosophy

- Leverage Angular's scoped `ViewEncapsulation` directly.
- **Zero wrapper soup**: Never wrap elements in useless `<div>`s when semantic tags or `:host` can be used.
- **Zero class spam**: Don't invent classes for every single element (`.idx`, `.badge`, `.summary`, `.report`, etc.). Target semantic tags (`<header>`, `<small>`, `<strong>`, `<p>`, `<footer>`, `<code>`, `<kbd>`, `<nav>`, `<article>`, `<button>`).
- Use `::after`/`::before` for dots, badges, or accent marks instead of dummy `<span>` elements.

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

- **Solve problems with the absolute minimum amount of code required.**
- **NEVER** write speculative wrappers, unnecessary conditional guards (e.g. ad-hoc `window.location.hostname` checks, redundant defensive null-checks when types/framework guarantee state), dummy fallback branches, or verbose workarounds.
- Prefer declarative, idiomatic framework/library primitives over ad-hoc procedural hacks.
- If an environment or tooling issue occurs (e.g. test runner, audit script, proxy), fix it at the configuration or tooling level rather than polluting application production runtime code.

## Tooling & Package Management

- **ALWAYS** use `yarn` and `just` for package management, running scripts, builds, lints, and audits.
- **NEVER** use `npm`, `npx`, `pnpm`, or `bun`.
- Prefer `just` recipes from `Justfile` (`just check`, `just build`, `just lint`, `just audit`, `just preview`).
