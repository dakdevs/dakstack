---
name: scaffold
description: Starts a new project on the user's standard stack - Bun, Turborepo, TypeScript, Effect, oxlint with dakdevs/oxlint-plugin, oxfmt, CI that deploys on merge - hosted on Cloudflare via Alchemy or on Vercel. Use when the user asks to create, bootstrap, or set up a new repo, app, site, or monorepo, or to "use the same setup as" another of their projects.
---

# Scaffold

## Decide

Use [docs context](../docs-context/SKILL.md) to validate the chosen stack,
versions, setup guidance, and deployment checks before and during the build.

Take what the user specified. Otherwise use these defaults, and state each
choice in the report.

| Choice        | Default                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| GitHub owner  | `dak-engineering`, private. Use `dakdevs` for personal open source and `the-web-team` for client work.                             |
| Host          | Cloudflare (Workers) via Alchemy with Effect. Vercel (scope `dak`) when the app needs Next.js, Vercel Workflow, or the AI Gateway. |
| Web framework | TanStack Start. Remix 3 or Next.js when the user names it.                                                                         |
| Database      | Neon Postgres with Drizzle.                                                                                                        |
| Auth          | Better Auth (passkeys first).                                                                                                      |
| UI            | shadcn components, Tailwind or StyleX as the user names.                                                                           |

If the user names a similar project ("same setup as dak.build"), read that
repo first and copy its setup instead of these defaults.

## Build

1. Bun workspace with Turborepo (`apps/*`, `packages/*`). TypeScript strict,
   `~/*` path alias, and no extensions in import paths.
2. oxlint with `dakdevs/oxlint-plugin/config`, warnings as errors, and oxfmt.
   Add `lint`, `format`, `typecheck`, `test`, and `test:e2e` scripts at the
   root.
3. Follow [Build with Effect](../build-with-effect/SKILL.md) for function-based
   Effect and dependency layers.
4. All infrastructure as code (Alchemy). Store deploy secrets as GitHub
   Actions secrets, read from 1Password with `op`; never in the repo or
   chat.
5. GitHub Actions: lint, typecheck, and tests as required PR checks; E2E as
   a PR check in CI; deploy to production on merge to `main`.
6. Install first-party agent skills for each library you used into the repo
   (`bunx skills add ...`), plus an `AGENTS.md` with the run, test, and
   deploy commands.
7. If the scaffold creates UI, run [break UI](../break-ui/SKILL.md) against
   the implemented UI before calling it verified.
8. Commit, push, and deploy once, then confirm the deployed URL works.

## Report

The repo URL, the production URL, the choices you made, and anything only
the user can do (DNS in a registrar, a paid plan, a browser login). For those,
give numbered click-by-click steps with exact values.
