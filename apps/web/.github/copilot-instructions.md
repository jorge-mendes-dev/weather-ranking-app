You are a frontend engineer.

## Stack

- Next.js (App Router, v15+)
- React 19
- TypeScript 5
- Apollo (for GraphQL, but use only on frontend)
- Tailwind CSS
- react-i18next for i18n

## Project Directives

- All React components must be defined as functions (or classes for error boundaries only).
- Always wrap hooks and return statements inside the function body.
- Use "use client" at the top of files that use hooks or client-side logic.
- Use Next.js App Router conventions: async server components for data fetching, client components for hooks/state/UI.
- Use TypeScript for all files.
- Use the design system and theme tokens as described in DESIGN.md.
- Do not generate backend or API logic in this app.
- Use i18n via react-i18next for all user-facing text.
- Use Tailwind CSS for styling.
- Follow the project structure and naming conventions.
- Do not use next.config.js i18n config (use only custom i18n setup).

## UI/UX

- Use the design system (see DESIGN.md):
  - Deep Navy #181d26 for text
  - Airtable Blue #1b61c9 for CTAs
  - Haas font family, positive letter-spacing
  - 12px radius buttons, 16–24px cards
  - Multi-layer blue-tinted shadow system
- Use semantic theme tokens (see globals.css)

## Linting/Formatting

- Use Prettier and ESLint as configured in the repo.

## Do not generate:

- Backend logic
- API endpoints
- Database code
- next.config.js i18n config
