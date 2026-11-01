---
name: bar
description: Reviews a finished published PR against applicable skills, posts findings, independently validates reproduction and product intent, and rechecks fixes on the current head. Use when the user says "pass the bar", "make sure it passes the bar", requests a skill/model review matrix, or asks to repeat reviews until ready. Invocation requests PR review comments, replies, and validated resolutions.
---

# Bar

Review completed work on an existing PR. The main thread owns product
intent, triage, fixes, replies, and resolution. Reviewers only investigate
and comment. Findings are hypotheses until independently validated.

## Entry gate

Record PR URL, task scope and product decisions, base and head SHAs, checks,
and current `pr-proof`. Require finished implementation, committed task
work, a pushed head, and inspectable before/after evidence before launching
reviews. Missing publication returns to the caller's `pr-this` step; a
review request alone does not authorize creating a PR. Explicit local-only
reviews may report locally, but cannot satisfy this published-PR gate.

## Coverage and models

Inventory every installed skill. Mark each as applicable with its concrete
failure lens or not applicable with a reason. Review all applicable
principles plus `thermo-nuclear-review` and
`thermo-nuclear-code-quality-review`. Inspect workflow skills for relevant
contract failures without executing their operational steps. Include tests,
product/UI behavior, proof freshness, and commit boundaries as applicable.

Use the user's requested lenses, models, and partitioning. Defaults: one
[review agent](../kitchen-mode/agents/review-agent.md) each on Claude Opus
5.5, GPT-6.1 Sol, and Grok 4.7 at medium reasoning, each scanning all applicable
lenses. For an explicitly requested lens-by-model matrix, launch one fresh
job per cell. Always include `no-comments` through a separate Grok 4.7
Comment Sicko job; do not bury it in a general review or launch it twice.

Discover providers and check the recorded models. Missing required roles
block approval; report them and ask before substituting. Batch launches
under the harness cap. Follow completion notices, never poll delegates.

## Review and return

1. Give each fresh reviewer its absolute role/leaf paths, repo rules, pinned
   diff, product decisions, evidence, and authorized PR-comment actions.
2. Reviewers scan each assigned lens, trace candidates, and post distinct
   actionable findings on the pinned PR head. Return comment/thread IDs,
   URLs, proof limits, and coverage. Deduplicate against open findings.
3. The main thread inspects the reports and groups overlaps, preserving
   every original thread. For every finding, launch a fresh independent
   [validator](../kitchen-mode/agents/finding-validator.md) through
   `replicate-issue`. The finding's reviewer/author cannot validate it.
4. Verify reproduction, scope, base behavior, and product intent from the
   validator's artifacts. Do not count votes. Ask the user through the main
   thread when intent is underdetermined; leave the affected thread open.
5. The main thread owns confirmed fixes and can assign bounded implementation
   to a kitchen agent. Never weaken an assertion or test to silence a review.
   Verify and commit each complete fix, push, and refresh `pr-proof` and the
   PR body before replying with the fix SHA and resolving the thread.
6. Reply to invalid, pre-existing, and out-of-scope findings with validated
   reasons. Resolve only supported dispositions under repository permissions.
   Leave unreproduced reports and unresolved disagreements open.
7. For a changed head, start fresh review/re-check jobs for affected lenses,
   including new interactions. Every required reviewer must explicitly
   confirm coverage and verdict on the final SHA; never relabel an old
   approval. Revalidate all still-open findings, regardless of comment date.

If the same finding survives two fixes, stop that fix loop and bring the
conflicting evidence to the user. Continue independent work. A reviewer
cannot change product scope to make its preferred design a requirement.

## Finish

Report final head, skill/model coverage and exclusions, findings with thread
links and dispositions, proof and checks, and missing roles/questions. The
bar passes only with current-head coverage and no unresolved blocking issue.
Return to the calling ship workflow; a standalone review never grants merge.
