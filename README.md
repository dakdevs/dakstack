<img src="assets/icon.svg" width="64" height="64" alt="">

# dakstack

The agent skills behind how I work, built from about 6,900 of my own prompts
to Claude Code and Codex between May and October 2026. Each skill replaces an
instruction I kept retyping or a correction I kept making. They work in
Claude Code and Codex, and use [T3 Code](https://t3.codes) features when they
are available.

Original workflows call skills in this repository. Borrowed principles and
both thermonuclear reviews retain exact upstream text, including any external
references. See [CREDITS.md](CREDITS.md) and
[the provenance manifest](upstream-skills.json).
The upstream `improve` advisor and references are pinned in
[improve-skills.json](improve-skills.json). The source and installed MIT
notices for the adapted UI and motion skills are tracked in
[emil-skills.json](emil-skills.json). The shipping workflow uses the advisor
to plan improvements. The advisor leaves source files unchanged.

## Workflows

| Skill         | Say                           | What it does                                                                                                                                       |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ship`        | "ship it", "get it merged"    | Coordinates implementation, verification, and review, then merges only with my explicit grant for that PR and verifies deployment when applicable. |
| `ship-to-pr`  | "ship to PR"                  | Coordinates implementation, verification, and review, then hands back the open PR without merging, enabling auto-merge, or entering a merge queue. |
| `bar`         | "make sure it passes the bar" | Runs one focused review pass, validates findings, and turns repeatable checks into lint rules.                                                     |
| `show-me`     | "show me"                     | Captures real screenshots and video at desktop and mobile sizes, and sends them to the PR, my phone, Dia, or a Tailscale URL.                      |
| `design-loop` | "design it in Paper"          | Studies references, prototypes in Paper, applies my notes literally, and builds only after I approve.                                              |
| `fanout`      | "use Opus delegates"          | One delegate, worktree, and PR per independent unit, stacked when dependent.                                                                       |
| `status`      | "what's next?"                | Checks git, PRs, deploys, and threads, then answers with the next action.                                                                          |
| `prod-triage` | "look at the prod errors"     | Ranks Sentry and log errors by severity, then fixes each real one in its own PR.                                                                   |
| `scaffold`    | "set up a new repo"           | Bun, Turborepo, Effect, oxlint, oxfmt, and CI that deploys on merge.                                                                               |
| `sweep`       | "free up space"               | Audits disk use, proves what is unused, and deletes only that.                                                                                     |
| `film`        | "make a launch video"         | Plans, generates, edits, and critiques a product film, and sends each cut to my phone.                                                             |

## Commands

| Skill                                | What it does                                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `improve`                            | Audits codebases and writes self-contained improvement plans for other agents to execute.                            |
| `pr-this`                            | Creates or updates the PR for the current branch, with a fresh title and body from the full diff on every run.       |
| `babysit-pr`                         | Watches a PR through CI and review bots, fixing real failures and real findings at their cause.                      |
| `thermo-nuclear-review`              | Audits a branch for bugs, broken behavior, security holes, developer-experience regressions, and feature-gate leaks. |
| `thermo-nuclear-code-quality-review` | Reviews a branch against a very strict maintainability bar.                                                          |
| `best-practices`                     | Researches current, version-specific docs and the codebase's conventions before writing code.                        |
| `docs-context`                       | Grounds investigation, implementation, review, and validation in applicable docs and observed evidence.              |
| `unslop`                             | Removes AI-writing patterns from prose while keeping meaning, evidence, and formats.                                 |
| `no-comments`                        | Inspects source comments and hidden workarounds within the same review pass.                                         |
| `replicate-issue`                    | Reproduces bugs and findings, checks product intent, and guides verified fixes and thread dispositions.              |
| `excalidraw`                         | Creates, edits, or reviews Excalidraw drawings, diagrams, and slides, checking overlaps, clipping, and readability.  |
| `pr-proof`                           | Captures before/after evidence for every PR and refreshes the after record whenever work changes.                    |

## UI and motion

| Skill                          | What it does                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| `break-ui`                     | Verifies implemented UI with realistic edge data, actual rendering and interactions. |
| `emil-design-eng`              | Applies shared UI rules and routes specialists by task.                              |
| `review-animations`            | Reviews the purpose, feel and behavior of existing motion.                           |
| `animation-vocabulary`         | Names an effect from a description.                                                  |
| `find-animation-opportunities` | Suggests purposeful motion without editing the UI.                                   |
| `animation-performance`        | Diagnoses jank and measures the affected motion.                                     |
| `choreograph`                  | Coordinates several elements that move together.                                     |
| `remove-animations`            | Removes or reduces motion that does not earn its place.                              |
| `gestures`                     | Builds interruptible drag, swipe, hold and sheet interactions.                       |
| `animate`                      | Builds one purposeful interaction animation.                                         |
| `mobile-native`                | Checks and fixes native-feeling interactions on the mobile web.                      |

Any task that creates or changes UI runs [break UI](skills/break-ui/SKILL.md)
on the implementation before it is verified or review-ready, including
local-only, new, responsive and mobile UI. Record actual coverage, fix
in-scope findings and rerun affected cases. Missing required surfaces or
devices are blockers, not passes. Non-UI work, read-only review and proof-only
capture do not trigger the gate. Use [Emil design engineering](skills/emil-design-eng/SKILL.md)
to choose only relevant specialists; a responsive change with no motion does
not need an animation review. Routing grants no publication or merge rights.

## Principles

`bar` uses these as review lenses. The shipping workflow and `fanout` pass
them to implementation agents.

| Skill                                                | What it does                                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `principle-attack-the-premise`                       | Stops a run of failing fixes by naming and removing the shared assumption behind them.               |
| `principle-avoid-tautological-tests`                 | Requires every test to have an independent source for its expected value and a credible way to fail. |
| `principle-boundary-discipline`                      | Validates at system boundaries, trusts typed data inside, and keeps business logic pure.             |
| `principle-build-the-lever`                          | Builds the smallest tool that does or proves the work, when it beats existing tools.                 |
| `principle-encode-lessons-in-structure`              | Turns recurring corrections into types, lint rules, checks, or scripts.                              |
| `principle-effect-boundary`                          | Decides where Effect belongs and keeps its use functional, injectable, and tested.                   |
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
| `principle-taste`                                    | Applies standing code, UI, copy, and operations preferences.                                         |
| `principle-type-system-discipline`                   | Uses the type checker to rule out impossible states.                                                 |

## How they connect

```text
ship / ship-to-pr → shared shipping workflow
  → situation + relevant docs → before proof → working commits + tests
  → required checks + break UI for UI changes → after proof → published PR
  → one focused review pass → main-thread validation → fixes + lint rules
  → focused fix verification → refreshed proof + CI → selected PR stop
```

Use `ship-to-pr` to prepare an open PR or `ship` to finish through merge and
deployment when explicitly authorized. Both respect read-only and local-only
scope. PR publication requires authorization.

Reviews begin after the entire implementation is finished and published.
Each commit is a complete, working version with its tests. Every PR includes
inspectable before and after proof. Capture comparable screenshots for changed
visible UI states and before and after videos for changed workflows. Reproduce
backend changes that affect the UI through the full stack under the same
visual rule. When the visible outcome is genuinely identical or nonvisual,
capture real output, logs, or test results at base and head. Add before and
after Excalidraw diagrams when a PR changes a flow, boundary, state or data
model, or architecture. PR bodies never include raw, simplified, or
pseudocode diffs. Keep the visible PR body to proof artifacts, short labels,
and optional descriptive links, with everything else
inside one closed LLM Context section. Refresh the after proof whenever the
head changes. The main thread owns fixes and finding dispositions. Unclear
product intent returns to the user before a dependent fix or resolution.

`docs-context` runs throughout this flow. Understand the observed incident or
desired capability, read the relevant product/architecture/runbook docs and
version-matched official references, then verify that they apply to the
actual environment. Carry sources and checkable expectations into delegate
briefs, PR proof, reviews, and finding validation. Revisit them as evidence,
scope, versions, or implementations change, and update affected project docs.
Reviewers verify the sources independently; documentation alone does not
establish working behavior. Missing docs and conflicts are recorded with
their limits, and unresolved product decisions return to the main thread.

Review defaults to one focused pass, combining correctness, maintainability,
tests, proof, and source-comment inspection. The main thread may review and
validate directly. Extra models or exhaustive coverage require an explicit
request; model preferences alone do not require a panel. After fixes, verify
affected paths and interactions, broadening only for a concrete new risk.
Report reviewed/final SHAs honestly and preserve unresolved blockers.

Never post, edit, reply to, or resolve GitHub PR comments or submit GitHub
reviews. This applies to all delegates and nested skills. Findings and
validated dispositions stay in the originating conversation; shipping or
skill invocation never grants comment permission. PR publication and body
updates remain part of authorized shipping.

After every pass, assess findings and recurring instructions for deterministic
lint rules. Extend existing rules first; implement safe in-scope checks with
violating and valid fixtures and wire them into lint/CI. Use tests or types
for runtime constraints. Report proposed rules, enforcement points, and
specific reasons for deferral when judgment or additional scope is needed.

## Install or update

### Local MCP from GitHub

Configure your MCP client to launch this command over **stdio** (Node.js 22+
and npm required):

```bash
npx -y git+https://github.com/dakdevs/dakstack.git
```

In Capy, add a **STDIO** server with command `npx` and arguments `-y` and
`git+https://github.com/dakdevs/dakstack.git`. The command runs on the thread's
machine. Agents can ask to use Dakstack by name and load its instructions and
supporting files using `list_skills` and `get_skill`. For example, ask the agent
to load `ship-to-pr` and read its `references/workflow.md`. MCP tool access is
independent of the client's native skill picker.

The command above uses GitHub's default branch. To use a specific release,
append `#<commit-sha>` or `#<tag>` to the URL in your client configuration.
After changing the revision, restart the MCP process or start a new session.
For a machine-wide install, run the install command below and configure your
client to launch the resulting executable. Rerun the install to update it.

```bash
npm install -g git+https://github.com/dakdevs/dakstack.git
dakstack-mcp
```

### Native skills

Copy this prompt into an agent with filesystem and network access:

```text
Install or update dakstack from https://github.com/dakdevs/dakstack using the
latest merged main revision. Discover every installed provider and its actual
global skill paths, including Codex, Claude Code, Cursor, Grok, and providers
used by T3 Code. Read their applicable instructions before changing anything.

Fetch a clean copy of that revision and verify its pinned upstream manifests.
Install every directory under skills/, including all references, agent prompts,
and metadata, into ~/.agents/skills as the canonical shared copy. Update
existing dakstack skills; preserve unrelated skills, provider configuration,
credentials, and personal AGENTS.md model preferences. Back up differing
installed dakstack files before replacement so local customizations remain
recoverable. Do not delete unrelated or renamed skills without checking ownership.

Point each provider's supported discovery path at the shared skills. Reuse
existing links; where a provider needs its own skill directory, link individual
dakstack skills without replacing that directory or its unrelated contents.
Discover support instead of guessing paths or claiming an unavailable provider
is configured. T3 uses its underlying providers' discovery paths.

Verify every installed dakstack file against the fetched revision, check links
and bundled dependencies for every provider, and check provider discovery where
available. Report the installed revision, providers verified, backups, and any
unsupported or unverified providers. Explain which sessions need restarting to
refresh their skill catalog. Do not merge or publish anything for this install.
```

For a skills.sh install, use `bunx skills add dakdevs/dakstack`. Check the
installer's current provider options when targeting multiple providers; the
prompt above also covers existing shared installations and local customizations.
Provider support and paths vary. Restart existing agent sessions after updating.
When upgrading from a version with the old Kitchen Mode command, install and
verify `ship` and `ship-to-pr` first, then back up and remove the old skill
directory and its discovery links.

## Requirements

- An authenticated GitHub CLI (`gh`), with the `gh stack` extension for
  stacked PRs.
- `fanout` and explicitly requested cross-provider reviews need compatible
  delegates. T3 Code supports these through `delegate_task`.
- Executor connectors for `prod-triage` (Sentry, PostHog, Axiom) and `film`
  (Seedance, Suno, ElevenLabs).
- Tailscale for `show-me`, `film`, and `sweep` on remote Macs.

## Develop

```bash
bun install
bun run lint
bun run prettier
bun test
bun run test:e2e
```

The tests check frontmatter, metadata, README registration, and local skill
references. Authored skills stay under 100 lines. Exact upstream imports
retain their original descriptions, length, and references; SHA-256 checks
protect their contents from edits, including formatting. The installation E2E copies only the distributed
skills into a temporary directory and checks their Markdown dependencies.
It proves packaging, not agent behavior or hosted execution.

## Naming audit

All 45 existing skills were classified by their job. Durable decision rules
use the `principle-` prefix; commands that produce an artifact or run a
workflow keep an action name. The 26 existing principles keep their names.
The standing preferences formerly called taste become `principle-taste`,
and the Effect architecture rules become `principle-effect-boundary`.

The remaining 17 commands keep their names: `ship`, `ship-to-pr`, `bar`,
`pr-this`, `babysit-pr`, `thermo-nuclear-review`,
`thermo-nuclear-code-quality-review`, `best-practices`, `unslop`,
`show-me`, `design-loop`, `fanout`, `status`, `prod-triage`, `scaffold`,
`sweep`, and `film`. Their output is a review, research, edited prose,
evidence, design, delivery, status, investigation, project, cleanup, or film.
New commands follow the same distinction.

Remove the old taste and effect-boundary skill directories after installing
this version; installers may leave renamed directories behind. Update any
personal instructions or shortcuts that invoke those old names.

## Portable agents

Both shipping commands load the [shared shipping workflow](skills/ship-to-pr/references/workflow.md)
for role links and the delegation contract. The prompts live under
`skills/ship-to-pr/agents/`. Installing skills copies the prompts as
well. They are portable briefs, not automatic native agent registrations;
the orchestrator supplies their absolute paths and verifies the model used.

The main thread owns product intent, validation, fixes, and finding dispositions.
The coordinator may use an authorized reviewer or perform the pass itself.
Reviewers return evidence and lint candidates without editing GitHub comments
or spawning children. Independent validators are optional for difficult
disputes. All five role prompts travel with a skills-only install.

## Exact upstream sources

The 23 borrowed principles and both thermonuclear reviews are copied verbatim
from the pinned revision in upstream-skills.json. Do not rewrite, reflow, or
append stack policy inside those SKILL.md files. Prettier excludes exactly
those originals; lint verifies their hashes. Confirm the remote source too:

```bash
bun run verify:upstream --online
```

Keep stack-specific orchestration, authorization, commit rules, and evidence
requirements in the shipping workflows and agent contracts. User instructions
remain authoritative when an upstream principle suggests a different delivery
sequence. The five locally authored principle skills retain their local text.

The exact imports retain disable-model-invocation: true. In Claude Code,
their descriptions are absent from automatic model discovery, and the model
cannot auto-invoke or preload them. Users can still invoke them manually.
Coordinators inventory installed `*/SKILL.md` files on disk, resolve relevant
leaves to absolute paths, and read those files directly before passing the
paths to delegates. The model's skill list and Skill tool are not the loading
route for these imports. See [Claude's invocation controls](https://code.claude.com/docs/en/skills).
