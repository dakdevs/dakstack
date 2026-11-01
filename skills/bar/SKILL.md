---
name: bar
description: Coordinates adversarial multi-model PR reviews, peer challenges, independently validated findings, and fresh rounds until every required reviewer approves the same head. Use when the user says "pass the bar", requests collaborative adversarial reviews, asks for a skill/model matrix, or wants review repeated until everyone agrees. Invocation requests PR comments, replies, and validated resolutions.
---

# Bar

The [review coordinator](../kitchen-mode/agents/review-agent.md) runs a
multi-model adversarial panel. The main thread owns product decisions,
independent finding validation, fixes, replies, and resolution. The
coordinator may be the main thread or an explicitly delegated agent.

## Entry gate

Record PR URL, task scope/product decisions, base/head SHAs, checks, `pr-proof`,
and [docs context](../docs-context/SKILL.md). Before reviews, require finished
implementation, committed task work, a pushed head, and inspectable
before/after proof. Missing publication returns to `pr-this`; a review
request alone does not authorize PR creation. Explicit local-only reviews
may report locally, but cannot satisfy this published-PR gate.

## Required panel

Inventory every skill on disk using [kitchen-mode's leaf-loading rule](../kitchen-mode/SKILL.md#principles-to-route),
including hidden imports. Read absolute leaf paths, not the model catalog.
Mark each applicable or excluded with a concrete reason. Review applicable
principles plus `thermo-nuclear-review` and
`thermo-nuclear-code-quality-review`. Inspect workflow skills for relevant
contract failures without executing their operational steps. Include tests,
product/UI behavior, proof freshness, and commit boundaries as applicable.

Use the user's requested lenses, models, and partitioning. Defaults: one
[panel reviewer](../kitchen-mode/agents/reviewer-agent.md) each on Claude Opus
5.5, GPT-6.1 Sol, and Grok 4.7 at medium reasoning, each scanning all applicable
lenses. For an explicitly requested lens-by-model matrix, launch one fresh
job per cell. Always include `no-comments` through a separate Grok 4.7
Comment Sicko job every round. Require multiple distinct model families;
several instances of one model do not satisfy a multi-model review.

Discover providers and check the recorded models. Missing required roles
block approval; report them and ask before substituting. Batch launches
under the harness cap. Follow completion notices, never poll delegates.

## Adversarial rounds

Read [the round protocol](references/adversarial-round.md) before launch.

1. Give each fresh reviewer its absolute role/leaf paths, repo rules, pinned
   diff, product decisions, evidence, and authorized PR-comment actions.
2. **Independent audit.** Reviewers first scan without peer conclusions,
   seeking counterexamples, boundary cases, failure paths, and evidence that
   disproves the change or its proof. They trace candidates and post distinct
   actionable findings on the pinned PR head. Return comment/thread IDs,
   URLs, proof limits, and coverage. Deduplicate against open findings.
3. **Peer challenge.** Share every report, finding, rebuttal, and disagreement
   with every reviewer through fresh challenge jobs. Each tests the strongest
   opposing argument and explicitly agrees or rebuts with evidence. Isolated
   reports without this exchange do not constitute collaboration.
4. The main thread inspects reports and groups overlaps, preserving
   every original thread. For every finding, launch a fresh independent
   [validator](../kitchen-mode/agents/finding-validator.md) through
   `replicate-issue`. The finding's reviewer/author cannot validate it.
5. Verify reproduction, scope, base behavior, and product intent from the
   validator's artifacts. Do not count votes. Ask the user through the main
   thread when intent is underdetermined; leave the affected thread open.
6. The main thread owns confirmed fixes and can assign bounded implementation
   to a kitchen agent. Never weaken an assertion or test to silence a review.
   Verify and commit each complete fix, push, and refresh `pr-proof` and the
   PR body before replying with the fix SHA and resolving the thread.
7. Reply to invalid, pre-existing, and out-of-scope findings with validated
   reasons. Resolve only supported dispositions under repository permissions.
   Leave unreproduced reports and unresolved disagreements open.
8. Share validator artifacts and proposed dispositions with every reviewer.
   Every model must accept or dispute them; never drop an objection silently.
9. **Repeat after every change round.** Any code, test, documentation, metadata,
   rebase, or amendment requires every required reviewer and the comment
   specialist to audit the full current base-to-head diff and challenge peers
   again through fresh jobs. Revalidate all still-open older findings. Do not
   re-review only affected lenses or carry approvals across SHAs.

Continue until everyone agrees on the current base/head. No majority vote,
partial panel, silence, elapsed time, fixed round count, or coordinator
override counts as satisfaction. Missing access/models or uncertain product
intent are explicit blockers; report evidence and resume once resolved.
Never force agreement or loop without new evidence. A reviewer cannot
change product scope to make its preferred design a requirement.

## Finish

Re-fetch the live base/head. Every required model/lens cell and the comment
specialist must explicitly return APPROVE after peer challenge on those same
SHAs, with complete coverage and agreement on all validated dispositions.
CHANGES_REQUIRED or BLOCKED from any cell fails the gate. Changed inputs
restart the round. Agent verdicts are not fabricated GitHub approvals.

Report the per-round verdict ledger, SHAs, coverage/exclusions, findings,
rebuttals, thread dispositions, proof, checks, and missing roles/questions.
The bar passes only with unanimity and no unresolved blocking issue.
Return to the calling ship workflow; a standalone review never grants merge.
