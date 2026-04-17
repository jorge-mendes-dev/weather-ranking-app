# Weather Ranking App

A monorepo application that ranks sport activities (surfing, skiing, hiking, cycling, running) based on current weather conditions.

## Apps & Packages

| Workspace | Path | Description |
|---|---|---|
| `api` | `apps/api` | NestJS + GraphQL backend |
| `web` | `apps/web` | Next.js 15 frontend |
| `@weather-app/types` | `packages/types` | Shared TypeScript types |

## Tech Stack

- **Backend:** NestJS 11, Apollo Server v4, GraphQL (code-first)
- **Frontend:** Next.js 15, React 19
- **Language:** TypeScript 5
- **Monorepo tooling:** npm Workspaces + Turborepo
- **Shared types:** `@weather-app/types`

## Prerequisites

- Node.js ≥ 20
- npm ≥ 10

## Getting Started

### 1. Install all dependencies

```bash
npm install
```

### 2. Run all apps in development mode

```bash
npm run dev
```

This starts both `api` (port `3000`) and `web` (port `3001`) in watch mode via Turborepo.

### 3. Run a single app

```bash
# Backend only
cd apps/api && npm run start:dev

# Frontend only
cd apps/web && npm run dev
```

## Monorepo Structure

```
weather-ranking-app/
├── apps/
│   ├── api/            # NestJS GraphQL API  →  http://localhost:3000/graphql
│   └── web/            # Next.js frontend    →  http://localhost:3001
├── packages/
│   └── types/          # Shared TypeScript types (@weather-app/types)
├── turbo.json          # Turborepo task pipeline
├── tsconfig.base.json  # Shared TS compiler options
└── package.json        # Root workspaces config
```

## Scripts (run from root)

| Command | Description |
|---|---|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all apps and packages |
| `npm run lint` | Lint all workspaces |
| `npm run test` | Run all tests |

## Shared Types

The `@weather-app/types` package (`packages/types`) contains shared interfaces used by both `api` and `web`:

- `SportActivity` — union of supported activity names
- `WeatherCondition` — temperature, wind, precipitation, UV index
- `ActivityRanking` — activity + score + conditions

## Further Reading

- [Backend README](apps/api/README.md)
- [Frontend README](apps/web/README.md)
