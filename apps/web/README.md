# Web — Weather Ranking Frontend

Next.js 15 frontend that displays weather-based activity rankings, powered by the GraphQL API.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI library | React 19 |
| Language | TypeScript 5 |
| Shared types | `@weather-app/types` |

## Project Structure

```
src/
└── app/
    ├── layout.tsx     # Root layout
    └── page.tsx       # Home page
next.config.ts         # Next.js configuration
tsconfig.json          # TypeScript config (extends tsconfig.base.json)
```

## Getting Started

Install dependencies from the **monorepo root**:

```bash
npm install
```

### Run in development

```bash
# from monorepo root
npm run dev

# or from this directory
npm run dev
```

The app will be available at `http://localhost:3001`.

### Build for production

```bash
npm run build
npm run start
```


## Design System

The UI follows the design guidelines documented in [DESIGN.md](DESIGN.md), inspired by Airtable's visual language:

- **Colors:** Deep Navy `#181d26` (text), Airtable Blue `#1b61c9` (CTAs)
- **Typography:** Haas font family with positive letter-spacing
- **Radius:** 12px buttons, 16–24px cards
- **Shadows:** Multi-layer blue-tinted shadow system

## UI Previews

Below are screenshots of the main UI assets:

### Home
![Home](src/assets/home.png)

### Results
![Results](src/assets/results.png)

### Search
![Search](src/assets/search.jpeg)

## Connecting to the API

By default the frontend communicates with the GraphQL API at `http://localhost:3000/graphql`.
Configure this via environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/graphql
```

## Linting

```bash
npm run lint
```
