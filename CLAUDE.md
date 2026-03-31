# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SvelteKit template with Convex (backend/database), Clerk (auth), Effect v4 (typed functional programming), and Tailwind CSS. Deployed to Vercel.

## Commands

- `bun install` — install dependencies
- `bun run dev` — local dev with local Convex backend (via portless HTTPS)
- `bun run dev:hosted` — dev against hosted Convex (via portless HTTPS)
- `bun run convex:gen` — regenerate Convex API types (run after any convex schema/function changes)
- `bun run lint` — Prettier + oxlint checks
- `bun run format` — Prettier auto-fix
- `bun run check` — svelte-check + TypeScript validation
- `bun run build` — production build

After making changes, run: `bun run convex:gen` (if convex changed), then `bun run lint`, `bun run format`, `bun run check`.

Requires [portless](https://github.com/vercel-labs/portless) installed globally: `npm install -g portless`. Run `portless proxy start --https` once for HTTPS cert setup.

## Code Conventions

- **Package manager**: bun (`bun add` for new packages, never edit package.json manually)
- **Commits**: conventional commits format (feat:, fix:, chore:, etc.)
- **TypeScript**: strict mode, avoid `as any` — infer types from functions
- **Svelte 5**: use runes (`$state()`, `$derived()`, `$effect()`, `$props()`), `onclick`/`onsubmit` (not `on:click`), every component must have `lang="ts"`
- **Styling**: Tailwind CSS first, custom CSS only as fallback
- **Prettier**: tabs, single quotes, no trailing commas, 100 char width

## Convex

- **Client-facing** functions (queries/mutations/actions) go in `src/convex/authed/` using the `authed` helpers
- **Backend-only** functions go in `src/convex/private/` using the `private` helpers (protected by CONVEX_PRIVATE_BRIDGE_KEY)
- Schema lives in `src/convex/schema.ts`
- Generated types are in `src/convex/_generated/` (never edit)

## Backend Architecture

- All backend code uses **Effect v4** with typed error handling
- Services: `ConvexPrivateService` (backend Convex calls), `ClerkService` (server-side auth)
- Errors use `Data.TaggedError` with shape: `{ message, kind, timestamp, traceId, cause }`
- Remote functions live in `src/lib/remote/*.remote.ts` using SvelteKit's `query()` from `$app/server`
- Errors mapped through `effectRunner` in `src/lib/runtime.ts`

## Environment Variables

See `.env.example` for required vars. Key groups: CONVEX (deployment URL, bridge key) and CLERK (JWT issuer, publishable key, secret key).

## Path Alias

`@` resolves to `./src` (configured in vite.config.ts).
