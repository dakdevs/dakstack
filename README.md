<img src="assets/icon.svg" width="64" height="64" alt="">

# dakstack

The agent skills behind how I work, built from about 6,900 of my own prompts
to Claude Code and Codex between May and October 2026. Each skill replaces an
instruction I kept retyping or a correction I kept making. They work in
Claude Code and Codex, and use [T3 Code](https://t3.codes) features when they
are available.

The stack is self-contained: skills only call other skills in this repo.
Many are rewrites of other people's skills; see [CREDITS.md](CREDITS.md).

## Workflows

| Skill         | Say                           | What it does                                                                                                                                                    |
| ------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ship`        | "ship it", "get it merged"    | Takes a change to merged and deployed with nobody watching: proves it, passes the bar, files the PR, babysits it, merges, and confirms the deploy.              |
| `ship-to-pr`  | "ship to PR"                  | Same as `ship`, but stops when the PR is ready for me to merge.                                                                                                 |
| `bar`         | "make sure it passes the bar" | Reviews with one delegate per review skill per model, relays findings between them, fixes through Opus, and re-reviews until all of them approve the same head. |
| `show-me`     | "show me"                     | Captures real screenshots and video at desktop and mobile sizes, and sends them to the PR, my phone, Dia, or a Tailscale URL.                                   |
| `design-loop` | "design it in Paper"          | Studies references, prototypes in Paper, applies my notes literally, and builds only after I approve.                                                           |
| `taste`       | (automatic)                   | My standing code, UI, copy, and operations rules.                                                                                                               |
| `fanout`      | "use Opus delegates"          | One delegate, worktree, and PR per independent unit, stacked when dependent.                                                                                    |
| `status`      | "what's next?"                | Checks git, PRs, deploys, and threads, then answers with the next action.                                                                                       |
| `prod-triage` | "look at the prod errors"     | Ranks Sentry and log errors by severity, then fixes each real one in its own PR.                                                                                |
| `scaffold`    | "set up a new repo"           | Bun, Turborepo, Effect, oxlint, oxfmt, and CI that deploys on merge.                                                                                            |
| `sweep`       | "free up space"               | Audits disk use, proves what is unused, and deletes only that.                                                                                                  |
| `film`        | "make a launch video"         | Plans, generates, edits, and critiques a product film, and sends each cut to my phone.                                                                          |

## Commands

| Skill                                | What it does                                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `pr-this`                            | Creates or updates the PR for the current branch, with a fresh title and body from the full diff on every run.       |
| `babysit-pr`                         | Watches a PR through CI and review bots, fixing real failures and real findings at their cause.                      |
| `thermo-nuclear-review`              | Audits a branch for bugs, broken behavior, security holes, developer-experience regressions, and feature-gate leaks. |
| `thermo-nuclear-code-quality-review` | Reviews a branch against a very strict maintainability bar.                                                          |
| `effect-boundary`                    | Decides where Effect belongs and how to write, test, and review it as functional code with layers and no classes.    |
| `best-practices`                     | Researches current, version-specific docs and the codebase's conventions before writing code.                        |
| `unslop`                             | Removes AI-writing patterns from prose while keeping meaning, evidence, and formats.                                 |

## Principles

`bar` uses these as review lenses, and `ship` and `fanout` hand them to the
agents doing the work.

| Skill                                                | What it does                                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `principle-attack-the-premise`                       | Stops a run of failing fixes by naming and removing the shared assumption behind them.               |
| `principle-avoid-tautological-tests`                 | Requires every test to have an independent source for its expected value and a credible way to fail. |
| `principle-boundary-discipline`                      | Validates at system boundaries, trusts typed data inside, and keeps business logic pure.             |
| `principle-build-the-lever`                          | Builds the smallest tool that does or proves the work, when it beats existing tools.                 |
| `principle-encode-lessons-in-structure`              | Turns recurring corrections into types, lint rules, checks, or scripts.                              |
| `principle-exhaust-the-design-space`                 | Compares two or three prototypes of an unprecedented design before committing.                       |
| `principle-experience-first`                         | Resolves tradeoffs in favor of the user's experience.                                                |
| `principle-fix-root-causes`                          | Fixes each bug where it starts instead of guarding over the symptom.                                 |
| `principle-foundational-thinking`                    | Gets core types and data structures right before writing logic.                                      |
| `principle-guard-the-context-window`                 | Keeps bulky output out of the main thread.                                                           |
| `principle-laziness-protocol`                        | Prefers deletion and the smallest change that solves the problem.                                    |
| `principle-make-operations-idempotent`               | Makes state changes converge no matter how often they run or where they stopped.                     |
| `principle-migrate-callers-then-delete-legacy-apis`  | Moves every caller to the new API and deletes the old one in the same wave.                          |
| `principle-minimize-reader-load`                     | Cuts indirection and hidden state so code is easy to follow.                                         |
| `principle-model-the-domain`                         | Encodes the domain in a fitting structure instead of scattered conditionals.                         |
| `principle-never-block-on-the-human`                 | Keeps reversible work moving and asks only about real ambiguity or risk.                             |
| `principle-outcome-oriented-execution`               | Drives planned rewrites straight to the target, with breakage only inside declared phases.           |
| `principle-preserve-type-flow`                       | Keeps types flowing from their owners and parses untrusted input once.                               |
| `principle-prove-it-works`                           | Verifies work by observing the real artifact, not a proxy.                                           |
| `principle-redesign-from-first-principles`           | Reworks a design around a new requirement when a redesign is asked for.                              |
| `principle-required-changes-only`                    | Limits a change to the lines the goal needs.                                                         |
| `principle-separate-before-serializing-shared-state` | Removes shared mutable state before serializing access to it.                                        |
| `principle-sequence-verifiable-units`                | Splits work into phases that each end with checks green.                                             |
| `principle-subtract-before-you-add`                  | Removes dead weight before building anything new.                                                    |
| `principle-test-behavior-not-implementation`         | Makes tests assert what users can observe.                                                           |
| `principle-type-system-discipline`                   | Uses the type checker to rule out impossible states.                                                 |

## How they connect

```text
design-loop ──> fanout ──> bar ──> ship / ship-to-pr ──> status
                  │         │            │
                taste    principles   pr-this, babysit-pr, show-me
                         thermo-nuclear-*
```

## Install

```bash
bunx skills add dakdevs/dakstack
```

Or copy them in by hand:

```bash
cp -R skills/* ~/.agents/skills/   # Codex and skills.sh
cp -R skills/* ~/.claude/skills/   # Claude Code
```

These replace any installed skills with the same names.

## Requirements

- An authenticated GitHub CLI (`gh`), with the `gh stack` extension for
  stacked PRs.
- `bar` and `fanout` need delegates on other providers' models. T3 Code does
  this with `delegate_task`.
- Executor connectors for `prod-triage` (Sentry, PostHog, Axiom) and `film`
  (Seedance, Suno, ElevenLabs).
- Tailscale for `show-me`, `film`, and `sweep` on remote Macs.

## Develop

```bash
bun test
```

The test checks that every skill has valid frontmatter, stays under 100
lines, has Codex metadata, is listed in this README, and refers only to
skills in this stack.
