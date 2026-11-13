---
name: bar
description: Reviews completed work in one focused pass, validates findings, and converts repeatable checks into lint rules. Use when the user says "pass the bar" or requests a code review. Findings stay in the originating conversation; this skill never writes GitHub PR comments.
---

# Bar

Run one review pass over the completed diff. The main thread owns scope,
product decisions, validation, fixes, and the final report.

## Entry

Record scope, accepted decisions, pinned base/head, checks, and current
`pr-proof`. Follow [docs context](../docs-context/SKILL.md). Shipping workflows
review the completed published PR; explicit local-only and read-only tasks
keep their boundaries. Review alone never authorizes publication or merge.

## One pass

Read [the review-pass protocol](references/review-pass.md). Default to one
reviewer, which may be the main thread. Use applicable principles and both
thermonuclear skills as lenses where required by repository rules. Inspect
correctness, maintainability, tests, product behavior, proof, and source
comments together. Do not launch a separate comment specialist, peer
challenge jobs, or repeated full panels by default.

If the user explicitly requests multiple models or exhaustive review, honor
that scope in a single coordinated pass. Follow applicable model preferences
when selecting delegates; preferences alone do not authorize delegation.
Verify available models before launch and report unavailable requested roles.

Never post, edit, reply to, or resolve GitHub PR comments or submit GitHub
reviews. Skill invocation, shipping, and addressing feedback grant none of
those actions. Return findings and dispositions in the originating conversation.
This prohibition also applies to every delegate and nested skill.

## Address and prevent

Validate candidates using [replicate-issue](../replicate-issue/SKILL.md).
The main thread can validate findings directly; a separate validator is
optional for a difficult disputed finding when delegation is authorized.
Confirm scope and product intent before fixing. Keep uncertain intent explicit.

Fix confirmed issues, add regression coverage, run required checks, and
refresh proof after changes. Check the affected paths and interactions after
fixes; do not restart the full review for every commit, rebase, or docs edit.
Broaden only when a specific new risk warrants it or the user requests it.
Record which SHA the pass covered and how later changes were verified;
never present old approval as review of unseen code.

After every pass, assess each finding and recurring instruction for lint
coverage. Prefer extending an existing rule. Implement safe, deterministic,
in-scope rules with violating and valid fixtures, wire them into lint/CI,
and run them. For checks needing runtime behavior, use tests or types.
For each unautomated candidate, report the proposed rule, enforcement point,
and concrete reason it needs judgment, a product decision, or follow-up scope.
Keep pursuing useful lint candidates in subsequent passes; a prose reminder
alone does not close a mechanically enforceable finding.

## Finish

Report reviewed base/head, coverage, validated findings and dispositions,
checks, current proof, focused fix verification, and lint rules added or
proposed. Use APPROVE, CHANGES_REQUIRED, or BLOCKED with evidence. Passing
means no unresolved blocking issue and required checks pass; it does not
require unanimous model votes. Missing evidence remains a stated limitation.
Return to the caller's merge or handoff boundary.
