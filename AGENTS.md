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
