---
name: verify
description: Run the full validation pipeline — regenerate Convex types, lint, format, and type-check.
---

Run the following commands in sequence, stopping if any fails:

1. `bun run convex:gen` — regenerate Convex API types
2. `bun run lint` — check for linting errors (Prettier + ESLint)
3. `bun run format` — auto-fix formatting
4. `bun run check` — svelte-check + TypeScript validation

Report any errors found and suggest fixes.
