# Copilot Instructions — Weather Ranking App

## Project Overview

This is an **npm workspaces monorepo** that ranks sport activities (surfing, skiing, hiking, cycling, running) by weather suitability. It uses **Turborepo** for task orchestration.

```
weather-ranking-app/
├── apps/
│   ├── api/      # NestJS 11 + GraphQL (Apollo Server v4) backend
│   └── web/      # Next.js 15 + React 19 frontend (App Router)
├── packages/
│   └── types/    # Shared TypeScript types (@weather-app/types)
├── turbo.json
└── tsconfig.base.json
```

---

## Stack & Key Versions

| Layer             | Technology                                          | Version |
| ----------------- | --------------------------------------------------- | ------- |
| Backend framework | NestJS                                              | 11      |
| GraphQL server    | Apollo Server (via `@nestjs/apollo`)                | v4      |
| GraphQL style     | **Code-first** (decorators → auto-generated schema) | —       |
| Frontend          | Next.js                                             | 15      |
| UI library        | React                                               | 19      |
| Language          | TypeScript                                          | 5       |
| Monorepo tool     | Turborepo                                           | 2       |
| Package manager   | npm workspaces                                      | —       |

---

## Coding Conventions

### General

- All code is **TypeScript** — no plain `.js` files in `src/`.
- Use **strict null checks** (`strictNullChecks: true`).
- Do not use `any` unless absolutely unavoidable; prefer `unknown` + type narrowing.
- Prefer `const` over `let`; never use `var`.
- No magic numbers — extract to named constants.

### Naming

- **Files:** `kebab-case` (e.g. `weather.service.ts`, `activity-ranking.resolver.ts`).
- **Classes / Interfaces:** `PascalCase`.
- **Variables / functions:** `camelCase`.
- **GraphQL types / enums:** `PascalCase`.
- **Environment variables:** `SCREAMING_SNAKE_CASE`.

### Imports

- Always import from `@weather-app/types` for shared domain types — never redefine them locally.
- In `api`, use NestJS module path aliases configured in `tsconfig.json`.
- In `web`, use the `@/*` alias for `src/*` imports.
- Never import from `apollo-server-express` — this project uses Apollo Server v4 via `@nestjs/apollo`.

---

## Backend (`apps/api`)

- **Module pattern:** One NestJS feature module per domain (e.g. `WeatherModule`, `RankingModule`).
- **GraphQL:** Code-first only. Use `@ObjectType()`, `@Field()`, `@Resolver()`, `@Query()`, `@Mutation()` decorators.
- **Schema file:** `autoSchemaFile: true` generates the schema in memory. Do not commit a hand-written `.graphql` file.
- **Services:** Business logic lives in services (`@Injectable()`), never in resolvers or controllers.
- **Validation:** Use `class-validator` + `ValidationPipe` for DTO validation.
- **No `apollo-server-express`:** It was removed — use only `@nestjs/apollo` + `@nestjs/graphql`.
- **Module system:** `"module": "commonjs"` — do not switch to `nodenext`/`esnext` in `apps/api/tsconfig.json`.
- **Tests:** Unit tests alongside source files (`*.spec.ts`). E2E tests in `test/`.

### Suggested feature module structure

```
src/
└── weather/
    ├── weather.module.ts
    ├── weather.resolver.ts
    ├── weather.service.ts
    ├── dto/
    │   └── weather-input.dto.ts
    └── models/
        └── weather.model.ts
```

---

## Frontend (`apps/web`)

- Uses the **App Router** (`src/app/`). Do not use the Pages Router.
- Prefer **React Server Components (RSC)** by default. Only add `"use client"` when interactivity or browser APIs are required.
- Data fetching happens in Server Components via `async/await` — do not use `getServerSideProps` or `getStaticProps`.
- Use **Next.js `fetch`** (with built-in caching/revalidation) or a GraphQL client (e.g. `graphql-request`) for API calls.
- Import shared types from `@weather-app/types` — path alias is already configured in `tsconfig.json` and `next.config.ts`.
- Do not add `apollo-server-express` or any server-side Apollo dependency here.

### Environment variables

- Prefix all public env vars with `NEXT_PUBLIC_`.
- API URL: `NEXT_PUBLIC_API_URL=http://localhost:3000/graphql`.

---

## Shared Types (`packages/types`)

- Package name: `@weather-app/types`.
- Source of truth for all shared domain types: `SportActivity`, `WeatherCondition`, `ActivityRanking`.
- Add new shared types here when both `api` and `web` need them.
- No runtime dependencies — types only.
- Do not add GraphQL-specific decorators here; those belong in `apps/api`.

---

## Monorepo & Tooling

- **Install:** Always run `npm install` from the **root** — never `npm install` inside individual workspaces unless adding a workspace-specific dep.
- **Adding a dep to a workspace:**
  ```bash
  npm install <pkg> --workspace=apps/api
  ```
- **Turbo tasks** are defined in `turbo.json`. The pipeline order is: `packages/types` → `apps/api` and `apps/web` (via `dependsOn: ["^build"]`).
- **Shared TS config:** All `tsconfig.json` files extend `tsconfig.base.json` at the root.
- Do not add a `.git` folder inside any workspace — the root `.git` tracks everything.

---

## Security

- Never commit `.env` files or secrets — they are in `.gitignore`.
- Sanitize and validate all user inputs in API resolvers/DTOs using `class-validator`.
- Use `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })` globally in `main.ts`.
- Do not expose stack traces or internal error details in GraphQL responses in production.
