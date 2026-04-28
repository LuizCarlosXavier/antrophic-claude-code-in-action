# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build the application**: `npm run build`
- **Run the application**: `npm start`
- **Lint the codebase**: `npm run lint`
- **Run tests**: `npm test`
- **Run a single test**: `npx vitest src/components/.../*Test.tsx` (replace `...` with the appropriate path)
- **Set up project dependencies, Prisma client, and migrate the database**: `npm run setup`

## Project Architecture Overview

The repository follows a Next.js 15 (App Router) structure:

- **src/app** – Contains page-level components and route handlers.
  - `[projectId]/page.tsx` – Dynamic route example.
- **src/components** – Reusable UI components organized by feature (e.g., `ui` for buttons, dialogs, inputs).
  - UI components often use Radix UI primitives and Tailwind CSS.
- **src/lib** – Utility functions and services.
  - **file-system.ts** – Operations for managing file system interactions.
  - **prisma.ts** – Prisma client wrapper for database access.
  - **auth.ts** – Authentication helpers.
  - **transform/** – JSX/TypeScript transformers.
- **src/actions** – Server‑side action functions used by API routes.
  - `create-project.ts`, `get-projects.ts`, `get-project.ts` – Example actions.
- **src/hooks** – Custom React hooks (`use-auth.ts`).
- **src/contexts** – React contexts for state management (`file-system-context.tsx`, `chat-context.tsx`).
- **prisma/migrations** – Database migration scripts.
- **tests** – Test files colocated with components (`*Test.tsx`) and utilities.

Key external libraries:
- **@ai-sdk/anthropic** – Anthropic Claude API integration.
- **@radix-ui/** – Unstyled UI primitives.
- **tailwindcss**, **class-variance-authority**, **clsx** – Styling utilities.
- **prisma** – ORM for SQLite database.
- **Next.js**, **React 19**, **TypeScript** – Core framework and language.

## Typical Workflow

1. Run `npm run setup` to install dependencies and generate Prisma client.
2. Use `npm run dev` to start the dev server at `http://localhost:3000`.
3. Make UI or logic changes in `src/components` or `src/app`.
4. Run `npm test` to execute all Vitest tests.
5. Run `npm run lint` to check code style.

## Notes

- The project can run without an Anthropic API key; in that mode it falls back to static code generation.
- No files are written to disk automatically; generated components exist only in memory unless explicitly exported.
- Persistent storage for registered users is handled via Prisma and SQLite.
- Use comments sparingly. Only comment important things.
- The database schema is defined in the @prisma/schema.prisma file. Reference anytime you need to understand the structure of database.
