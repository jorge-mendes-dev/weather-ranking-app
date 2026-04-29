# Weather Ranking App

A monorepo application that ranks sport activities (surfing, skiing, hiking, cycling, running) based on current weather conditions.

## Production Deployment

- [Production App](https://weather-ranking.jorgemendes.com.br/)

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

### 2. Installing a library only for the web app

To add a dependency only to the web frontend (not the whole monorepo), run this from the root:

```bash
npm install <package-name> --workspace apps/web
```

This will add the package to `apps/web/package.json` only.

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

You can also run scripts from the root using the workspace flag:

```bash
# Start only the web frontend from root
npm run dev --workspace apps/web

# Start only the API from root
npm run start:dev --workspace apps/api
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

---

## 🤖 AI Usage

AI tools such as GitHub Copilot and ChatGPT were used as development accelerators during this project.

### Where AI helped

- Generating boilerplate (DTOs, resolvers, component scaffolding)
- Suggesting idiomatic patterns for NestJS and React
- Speeding up repetitive implementation tasks

### How it was used

AI was used strictly as an assistant, not as a decision-maker.

All architectural decisions — including:
- GraphQL adoption
- Project structure
- Separation of concerns
- Monorepo design

were defined manually.

### Validation process

- All generated code was reviewed and adjusted
- In several cases, AI suggestions were simplified to better match the project scope
- Known inconsistencies (e.g., tests, validation) are attributed to time constraints rather than blind reliance on AI

### Takeaway

The goal was to use AI to maximize productivity while retaining full ownership over technical decisions.

## ⚖️ Trade-offs & Omissions

Given the 2–3 hour time constraint, the primary focus was:

- Establishing a clear and scalable architecture
- Ensuring a functional end-to-end flow (API → frontend)
- Maintaining clean code organization across a monorepo setup

### Key trade-offs:

- **Testing depth was intentionally limited**
  - Unit tests were partially implemented but not fully stabilized
  - E2E tests were left as structural placeholders to demonstrate intent

- **Error handling is minimal**
  - Basic error handling exists, but lacks production-level robustness

- **No caching layer**
  - External API is called directly to keep the implementation simple

- **Validation inconsistencies**
  - Input validation exists but is not fully standardized (e.g., lat/long handling)

- **Observability was deprioritized**
  - Logging is partially implemented; monitoring and tracing were not included

These trade-offs were made to prioritize architectural clarity over completeness.