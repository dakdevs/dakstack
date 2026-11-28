# Coordinate shipping

Follow [thread completion](thread-completion.md) in the starting
thread and [delivery requirements](delivery.md) for PRs and copy review.

## Start

Read task and repository instructions; state the intended result and scope.
Record accepted decisions, checks, and unknowns. Investigate observable facts
yourself; ask only about material decisions evidence cannot settle. Continue
independent work while pending. Apply [docs context](../../docs-context/SKILL.md)
throughout; carry sources, expectations, checks, and gaps into each brief.

When the codebase uses Effect, or the task introduces it, load
[Build with Effect](../../build-with-effect/SKILL.md) before planning code
changes. Check workspace dependencies and imports to find the affected
Effect packages and their resolved versions. Carry the Effect skill paths,
versions, and verification scope into implementation, review, and fix briefs.
Apply this branch alongside any opted-in style.

When the task opts into [Dak Style](../../dak-style/SKILL.md), read it
before planning changes. Apply it to implementation, the focused review, and
subsequent fixes. Include the style decision and paths to the bundle and its
linked skills in briefs for those roles, including any follow-up work.

For improvement work, read [improve](../../improve/SKILL.md): investigate and plan
within scope; keep the advisor read-only on source. Hand selected plans to a
separate executor only when implementation and delegation are authorized.
Recommend large models such as Opus, Fable, or Astra. Follow AGENTS.md model
preferences; resolve exact IDs from capabilities. This advice never authorizes
switching the session model, delegation, or substitution.

Read the [shipping workflow](shipping.md) before delegating. It defines
implementation, verification, review, and authorization for the selected
stop. Preserve read-only and local-only boundaries; PR stops apply only when
publication is authorized.

## Agent roles

Give delegates absolute paths to these portable role instructions:

| Job                | Prompt                                                              | Responsibility                                                |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| Implementation     | [agents/implementation-agent.md](../agents/implementation-agent.md) | Complete one owned unit and verify its commit.                |
| Review coordinator | [agents/review-agent.md](../agents/review-agent.md)                 | Coordinate one focused review pass.                           |
| Reviewer           | [agents/reviewer-agent.md](../agents/reviewer-agent.md)             | Review the diff once and return evidence and lint candidates. |
| Comment review     | [agents/comment-sicko.md](../agents/comment-sicko.md)               | Optional source-comment lens within the same review pass.     |
| Finding validation | [agents/finding-validator.md](../agents/finding-validator.md)       | Independently replicate and assess product alignment.         |

Use [fanout](../../fanout/SKILL.md) to plan, launch, and collect independent
implementation units requiring separate PRs. Keep PR completion in this
workflow and apply the selected stop to each PR. Never give concurrent
writers the same files, branch, or generated output.
Use one reviewer by default, which may be the main thread. Include source
comments. Optional validators are independent of the author and reviewer.

## Delegate contract

Each brief includes goal, owned files, permitted actions, checks, base/head,
accepted decisions, docs context, and absolute workflow, skill, role, and leaf
paths.
Delegates read these before starting; missing prompts block that role.
Use fresh review jobs only when needed and authorized. Do not present an
old conversation as a fresh independent audit. Children report to the main
thread and never spawn children or own PR watchers without explicit user
permission. Follow the harness completion protocol.

Honor requested models; no separate comment specialist is required. Verify
provider support and recorded models. Report unavailable required models
and ask before substitution. Model preferences never authorize delegation.

## Principles to route

Inventory installed `*/SKILL.md` files on disk, including leaves absent from
the model-visible skill catalog. Resolve applicable leaves to absolute paths
and read their files directly. Exact upstream imports retain the flag
disable-model-invocation: true: Claude cannot auto-invoke or preload them.
Do not use model discovery or the Skill tool as the inventory/loading route.
User invocation remains available. Give delegates absolute leaf paths:

- Scope and size: `principle-required-changes-only`,
  `principle-laziness-protocol`, `principle-subtract-before-you-add`.
- Design: `principle-model-the-domain`, `principle-foundational-thinking`,
  `principle-boundary-discipline`, `principle-type-system-discipline`,
  `principle-preserve-type-flow`, `principle-minimize-reader-load`.
- Delivery: `principle-sequence-verifiable-units`,
  `principle-prove-it-works`, `principle-test-behavior-not-implementation`,
  `principle-avoid-tautological-tests`, `principle-fix-root-causes`.
- Context-specific rules: every other applicable principle, including
  `principle-taste` and `principle-effect-boundary` when relevant.
