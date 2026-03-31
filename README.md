# my sveltekit template

Basically a little sveltekit demo built out with my current opinions

- sveltekit
- tailwind
- convex
- effect v4
- clerk auth

See .env.example for the environment variables you need to set up.

## Setup

1. `bun install`
2. `npm install -g portless` — HTTPS dev server (global, one-time)
3. `portless proxy start --https` — generate local HTTPS certs (one-time, prompts for sudo)
4. Copy `.env.example` to `.env` and fill in your values
5. `bun run dev`
