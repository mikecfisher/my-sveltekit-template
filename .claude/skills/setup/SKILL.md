---
name: setup
description: Bootstrap a new app from this template. Gathers app name/description, installs deps, sets up Clerk, generates .env, and runs first dev server.
disable-model-invocation: true
---

Run this skill when setting up a new project from the template. Follow each step in order.

## Step 1: Ask for app details

Use AskUserQuestion to ask:

- "What is the name of your app?" (short name, used in package.json and portless URL)
- "Brief description — what does the app do?" (1-2 sentences, used in CLAUDE.md)

## Step 2: Install dependencies

Run `bun install`.

## Step 3: Update project identity

Using the app name and description from Step 1:

1. **`package.json`** — update the `"name"` field to the app name (lowercase, hyphenated)
2. **`CLAUDE.md`** — replace the Project Overview paragraph with the app description. Keep the rest of CLAUDE.md unchanged. The first line should read: `SvelteKit app: <description>. Built with Convex (backend/database), Clerk (auth), Effect v4 (typed functional programming), and Tailwind CSS. Deployed to Vercel.`
3. **`README.md`** — replace the `# my sveltekit template` heading and description with the app name and description

## Step 4: Generate CONVEX_PRIVATE_BRIDGE_KEY

Generate a random 64-character hex string:

```bash
openssl rand -hex 32
```

Save this value — it will be written to `.env` in Step 6.

## Step 5: Clerk setup (guided)

Tell the user:

> To set up authentication, you need to create a free Clerk application:
>
> 1. Go to https://dashboard.clerk.com and sign in (or create an account)
> 2. Click "Create application"
> 3. Give it a name (e.g., the app name from Step 1)
> 4. Choose your sign-in methods (email, Google, GitHub, etc.)
> 5. Once created, go to **API Keys** in the sidebar
>
> I need 3 values from you. You can find them on the API Keys page.

Then use AskUserQuestion to ask for these values one at a time:

- "What is your CLERK_JWT_ISSUER_DOMAIN?" (looks like `https://your-app.clerk.accounts.dev`)
- "What is your PUBLIC*CLERK_PUBLISHABLE_KEY?" (starts with `pk_test*`)
- "What is your CLERK*SECRET_KEY?" (starts with `sk_test*`)

Validate each value has the expected prefix/format before proceeding.

## Step 6: Write .env file

Create a `.env` file at the project root with all values:

```
# CONVEX
CONVEX_PRIVATE_BRIDGE_KEY=<generated in step 4>

# CLERK
CLERK_JWT_ISSUER_DOMAIN=<from step 5>
PUBLIC_CLERK_PUBLISHABLE_KEY=<from step 5>
CLERK_SECRET_KEY=<from step 5>
```

Note: `CONVEX_DEPLOYMENT`, `PUBLIC_CONVEX_URL`, and `PUBLIC_CONVEX_SITE_URL` are NOT needed for local dev — they are set automatically by the Convex Vite plugin when running `bun run dev`.

## Step 7: Prompt user to start dev server

Tell the user:

> Setup complete! Run `bun run dev` to start the dev server.
>
> This will:
>
> - Start a local Convex backend on port 3210
> - Deploy your Convex functions (schema, queries, mutations)
> - Serve your app at `https://<app-name>.localhost` via portless
>
> Make sure you have portless installed (`npm install -g portless`) and have run `portless proxy start --https` once for HTTPS cert setup.

## Step 8: Prompt user to set up design system

Tell the user:

> Once your dev server is running, run `/teach-impeccable` to set up your project's design system. This will establish persistent design guidelines for your app.
