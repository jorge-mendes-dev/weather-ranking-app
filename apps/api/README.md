# API — Weather Ranking Backend

GraphQL API built with **NestJS 11** and **Apollo Server v4** that provides weather data and sport activity rankings.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11 |
| API protocol | GraphQL (code-first) |
| GraphQL server | Apollo Server v4 via `@nestjs/apollo` |
| Language | TypeScript 5 |
| Runtime | Node.js |
| Shared types | `@weather-app/types` |

## Project Structure

```
src/
├── app.module.ts      # Root module — GraphQL registered here
├── app.controller.ts
├── app.service.ts
└── main.ts
test/
├── app.e2e-spec.ts
└── jest-e2e.json
```

## Getting Started

Install dependencies from the **monorepo root**:

```bash
npm install
```

### Run in development (watch mode)

```bash
# from monorepo root
npm run dev

# or from this directory
npm run start:dev
```

The GraphQL playground is available at `http://localhost:3000/graphql`.

### Build for production

```bash
npm run build
npm run start:prod
```

## GraphQL Schema

The schema is auto-generated (code-first) from TypeScript decorators. After starting the server,
the generated `schema.gql` file will appear in the project root.

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage report
npm run test:cov
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |

## Linting & Formatting

```bash
npm run lint
npm run format
```
