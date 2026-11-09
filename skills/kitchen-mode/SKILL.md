---
name: kitchen-mode
description: Coordinates a task factory with verified commits, portable implementation and review agents, PR proof, and independently validated findings. Use when the user says "kitchen mode", "$kitchen-mode", or asks this stack to build and review a task through agents.
---

# Kitchen mode

The main thread owns the goal, product decisions, work plan, PR, and findings.
Delegates carry out bounded jobs without hidden agent registration.

## Start

Read the task and repository instructions. State the intended result and
smallest scope. Record accepted product decisions, acceptance checks, and
which facts remain unknown. Investigate observable facts yourself. Ask the
user only about a material product decision that evidence cannot settle.
Continue independent work while that question is pending.
Apply [docs context](../docs-context/SKILL.md) throughout the task. Carry
applicable sources, expectations, verification, and gaps into every brief.

For implementation, follow `ship-to-pr` unless the user explicitly requested
`ship`. A read-only or local-only task keeps that boundary; this skill does
not turn it into permission to publish or merge.

For improvement work, read [improve](../improve/SKILL.md): investigate and plan
within scope; keep the advisor read-only on source. Hand selected plans to a
separate executor only when implementation and delegation are authorized.
Recommend that the user bias their model setting toward large models such as
Opus, Fable, or Astra. Follow applicable AGENTS.md model preferences; resolve
latest versions and exact IDs from capabilities. Do not switch the session
model or infer permission to delegate or substitute from this recommendation.

## Agent roles

Give the delegate the selected prompt’s absolute path; these are portable role instructions:

| Job                | Prompt                                                     | Responsibility                                              |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Implementation     | [agents/kitchen-agent.md](agents/kitchen-agent.md)         | Complete one owned unit and verify its commit.              |
| Review coordinator | [agents/review-agent.md](agents/review-agent.md)           | Spawn and coordinate an adversarial multi-model panel.      |
| Panel reviewer     | [agents/reviewer-agent.md](agents/reviewer-agent.md)       | Independently audit, challenge peers, and return a verdict. |
| Comment review     | [agents/comment-sicko.md](agents/comment-sicko.md)         | Inspect comments and hidden workarounds on Grok 4.7.        |
| Finding validation | [agents/finding-validator.md](agents/finding-validator.md) | Independently replicate and assess product alignment.       |

Use `fanout` for independent implementation units requiring separate PRs.
Never give concurrent writers the same files, branch, or generated output.
A validator cannot be the reviewer or author of the finding it validates.

## Delegate contract

Each brief includes goal, owned files, permitted actions, acceptance checks,
base/head SHAs, product decisions, absolute path to this skill, selected role
prompt, docs context, and applicable leaf skills. The delegate reads this
entire skill before starting, then each applicable leaf. A missing prompt is a blocker,
not permission to substitute an unbriefed general agent.
Spawn a fresh delegate for each new audit, peer challenge, or review head. Do not resume an old
review conversation as a fresh independent review. Children report to the
main thread; they never spawn children or own PR watchers unless explicitly
assigned delegation by the user. A delegated review coordinator's brief must
explicitly authorize panel spawning; otherwise the main thread launches its
panel jobs. Follow the harness's completion protocol.

Use the user's model choices. The dedicated comment reviewer always uses
Grok 4.7. Check available providers and recorded model before relying on a
result. If a required model is unavailable, report the missing role and ask
before substitution; never silently use a different model or fast variant.

## Principles to route

Inventory installed `*/SKILL.md` files on disk, including leaves absent from
the model-visible skill catalog. Resolve applicable leaves to absolute paths
and read their files directly. Exact upstream imports retain the flag
disable-model-invocation: true: Claude cannot auto-invoke or preload them.
Do not use model discovery or the Skill tool as the inventory/loading route.
User invocation remains available. Give delegates absolute leaf paths.
Read relevant leaves:

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

## Complete

Finish and verify all implementation commits, refresh `pr-proof`, and open
the PR before running `bar` or `no-comments`. The main thread sends returned
findings through `replicate-issue`, decides their disposition, and owns fixes,
replies, and resolution. Report PR/head, checks actually run, current proof,
unanimous review coverage, and unresolved product questions. Every required
model and the comment specialist re-review the full diff after every change
round and must explicitly agree on the same final base/head after challenging
their peers. Never call an incomplete
review matrix, unreplicated concern, or stale artifact approval.
