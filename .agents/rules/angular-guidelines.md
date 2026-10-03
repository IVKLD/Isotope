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
