default:
    @just --list

# Start frontend development server
dev:
    yarn start

# Start NestJS backend development server
dev-api:
    yarn start:api

# Start both backend and frontend development servers concurrently
dev-all:
    @echo "Starting Backend (:3000) and Frontend (:4200)..."
    @trap 'kill 0' SIGINT SIGTERM EXIT; yarn start:api & yarn start

# Build production frontend bundle
build:
    yarn build

# Build production NestJS backend bundle
build-api:
    yarn build:api

# Build both frontend and backend
build-all:
    yarn build
    yarn build:api

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
    yarn build:api

# Start local PostgreSQL database container
db-up:
    docker compose up -d

# Stop local PostgreSQL database container
db-down:
    docker compose down

# Generate Drizzle database migrations
db-generate:
    yarn db:generate

# Apply Drizzle database migrations
db-migrate:
    yarn db:migrate

# Push schema directly to database (rapid prototyping)
db-push:
    yarn db:push

# Open Drizzle Studio visual database inspector
db-studio:
    yarn db:studio

# Run performance and audit metrics
audit:
    yarn audit:metrics:all

# Run desktop performance audit
audit-desktop:
    yarn audit:metrics:desktop

# Clean build and cache artifacts
clean:
    rm -rf dist .angular
