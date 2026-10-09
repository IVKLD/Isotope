default:
    @just --list

# Start development server
dev:
    yarn start

# Build production bundle
build:
    yarn build

# Build for GitHub Pages
build-gh:
    yarn build:gh

# Preview production build locally
preview:
    yarn preview

# Run ESLint check
lint:
    yarn lint

# Automatically fix ESLint errors
lint-fix:
    yarn lint:fix

# Format files using Prettier
format:
    yarn format

# Validate project health (lint + build)
check:
    yarn lint
    yarn build

# Run performance and audit metrics
audit:
    yarn audit:metrics:all

# Run desktop performance audit
audit-desktop:
    yarn audit:metrics:desktop

# Clean build and cache artifacts
clean:
    rm -rf dist .angular
