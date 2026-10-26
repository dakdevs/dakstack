---
name: taste
description: Holds the user's standing code, UI, copy, and operations preferences, collected from their repeated corrections to agents. Use when writing or reviewing TypeScript, React, Effect, UI, marketing or client copy, or when running bulk or destructive operations, so the user does not have to correct the same thing again.
---

# Taste

Each rule here is something the user corrected an agent on more than once.
Repo instructions override these rules. When a repo has no rule, follow these.

## Code

- TypeScript only. No file extensions in import paths. Path alias `~/*`, not
  `@/*`.
- Import exactly what you need from React, with `type` imports for types.
  Never `import * as React from "react"`.
- Bun, never npm. Lint with oxlint using `dakdevs/oxlint-plugin/config`, with
  warnings as errors. Format with oxfmt, not Prettier or ESLint, in new repos.
- Effect: functional style with proper dependency injection, so tests are
  simple and isolated. No Effect classes.
- Use shadcn components over native elements (for example, `select`).
- Drizzle for databases. Better Auth for auth.
- Nothing hardcoded, no mock or demo data left in shipped code, and no
  in-memory caches on serverless.
- Feature-flag risky features, with targeting for specific users.
- Keep server paths that older app versions still call.
- Install first-party agent skills for the libraries a repo uses (for example
  Drizzle and Turborepo) into the repo.

## UI

- Flat. No shadows. No borders for structure; use background contrast and
  rounded corners.
- Body text 16px minimum. Type sizes consistent across screens.
- No modals for ordinary tasks; one page, one job. No actions hidden in "..."
  menus.
- Use the site's own icon set. Never text arrows like `↗`.
- Status uses colored chips, with a spinner while in progress. Tables must
  not shift layout while data streams in.
- Mobile works as well as desktop: sticky actions on desktop become a
  floating pill at the bottom on mobile.
- The bar is Apple quality. No overlapping text, no inconsistent padding, no
  jank.

## Copy

- Informative and calm. Not punchy, not salesy, not obviously AI-written. Run
  `unslop`.
- Never invent copy, claims, or numbers. Do not promise "free" anything
  unless the user said so.
- Do not name vendors or dependencies (for example, Resend) in product UI.
- Client-facing documents explain what and why, not implementation.
- No AI or co-author attribution in commits or PRs.

## Operations

- Prefer a CLI or API (`gh`, `vercel`, `wrangler`, Executor) over driving a
  browser.
- Run heavy test suites in CI or on KirM1, not on the user's laptop.
- Before a bulk or destructive action, report the count, respect any budget
  cap, exclude protected items, and queue it for a go-ahead.
- Never use production data or assets for testing.
- When an agent asks the user to do something it can do itself, do it.
