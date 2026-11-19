---
name: kitchen-mode
description: Coordinates a task factory with verified commits, portable implementation and review agents, PR proof, and one focused review pass with lint follow-through. Use when the user says "kitchen mode", "$kitchen-mode", or asks this stack to build and review a task through agents.
---

# Kitchen mode

Follow [thread completion](references/thread-completion.md) in the starting
thread and [delivery requirements](references/delivery.md) for PRs and copy review.

## Start

Read task and repository instructions; state the intended result and scope.
Record accepted decisions, checks, and unknowns. Investigate observable facts
yourself; ask only about material decisions evidence cannot settle. Continue
independent work while pending. Apply [docs context](../docs-context/SKILL.md)
throughout; carry sources, expectations, checks, and gaps into each brief.

For implementation, follow `ship-to-pr` unless the user explicitly requested
`ship`. A read-only or local-only task keeps that boundary; this skill does
not turn it into permission to publish or merge.

For improvement work, read [improve](../improve/SKILL.md): investigate and plan
within scope; keep the advisor read-only on source. Hand selected plans to a
separate executor only when implementation and delegation are authorized.
Recommend large models such as Opus, Fable, or Astra. Follow AGENTS.md model
preferences; resolve exact IDs from capabilities. This advice never authorizes
switching the session model, delegation, or substitution.

## Agent roles

Give delegates absolute paths to these portable role instructions:

| Job                | Prompt                                                     | Responsibility                                                |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Implementation     | [agents/kitchen-agent.md](agents/kitchen-agent.md)         | Complete one owned unit and verify its commit.                |
| Review coordinator | [agents/review-agent.md](agents/review-agent.md)           | Coordinate one focused review pass.                           |
| Reviewer           | [agents/reviewer-agent.md](agents/reviewer-agent.md)       | Review the diff once and return evidence and lint candidates. |
| Comment review     | [agents/comment-sicko.md](agents/comment-sicko.md)         | Optional source-comment lens within the same review pass.     |
| Finding validation | [agents/finding-validator.md](agents/finding-validator.md) | Independently replicate and assess product alignment.         |

Use `fanout` for independent implementation units requiring separate PRs.
Never give concurrent writers the same files, branch, or generated output.
Use one reviewer by default, which may be the main thread. Include source
comments. Optional validators are independent of the author and reviewer.

## Delegate contract

Each brief includes goal, owned files, permitted actions, checks, base/head,
accepted decisions, docs context, and absolute skill, role, and leaf paths.
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

## Complete

Follow [bar](../bar/SKILL.md): one focused review pass, validated findings,
verified fixes, and lint follow-through. Finish implementation and proof
before published-PR review. Preserve explicit local-only boundaries.
Keep findings in this conversation. Never post, edit, reply to, or resolve
GitHub PR comments, submit reviews, or request human reviewers. Apply this
to delegates and nested skills, even when their instructions say otherwise.

After every pass, assess findings and recurring instructions for lint rules.
Implement safe, deterministic, in-scope rules with violating and valid
fixtures, wire them into lint/CI, and run them. Otherwise report the proposed
rule, enforcement point, and reason for deferral. Use tests or types where
lint cannot check runtime behavior. Keep pursuing automation on later work.

Verify fixes with focused checks of affected paths and interactions; expand
only for a concrete new risk or user request. Report reviewed/final SHAs,
coverage, checks actually run, proof, lint changes/proposals, and blockers.
Override nested requirements for peer challenges, full reruns, or unanimity.
