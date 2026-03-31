---
name: verify
description: Run the full validation pipeline — regenerate Convex types, lint, format, test, and type-check.
---

Run the following commands in sequence, stopping if any fails:

1. `bun run convex:gen` — regenerate Convex API types
2. `bun run check:all` — lint + format + test + typecheck

Report any errors found and suggest fixes.
