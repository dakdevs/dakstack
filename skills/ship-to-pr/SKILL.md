---
name: ship-to-pr
description: Completes a task in working commits, opens its PR with current before/after proof, runs post-PR reviews and independent finding validation, and stops ready for the user to merge. Use when the user says "ship to PR", "$ship-to-pr", "get it ready to merge", "PR it but don't merge", or "I'll merge it". Never writes GitHub PR comments or merges.
---

# Ship to PR

Follow `ship` through implementation, verification, publication, post-PR
review, finding validation, and CI. Replace its merge/deploy step with this
handoff. The order is mandatory: complete working commits and proof, publish
PR, then review. Do not review unfinished local work as the final PR review.
Carry [docs context](../docs-context/SKILL.md) through every stage and fix.

## Commit and evidence contract

Every commit is a logical, working, testable project version. Tests belong
with the behavior they verify. Temporary red states stay uncommitted. Before
opening review, all task implementation is committed and required checks have
run. Every PR includes before and after proof through `pr-proof`. Any later
change requires refreshed after evidence and a current PR body.

Follow [bar](../bar/SKILL.md): one focused review pass with source-comment
inspection included, main-thread validation, verified fixes, and lint
follow-through. Return findings in the originating conversation. Never post,
edit, reply to, or resolve GitHub PR comments or submit GitHub reviews,
including through delegates and nested skills. After fixes, verify affected
paths and interactions; broaden only for a concrete new risk or user request.
Readiness requires passing checks and no unresolved blocking issue, with
reviewed/final SHAs and lint changes/proposals reported honestly.

## No merging

Commit, push, and rebase only this task's branch under the session's rules.
Never merge, enable auto-merge, enter a merge queue, push to the default
branch, use administrator merge, or delegate these actions.

If auto-merge or a merge queue is already armed, disable it before starting
and recheck before pushes. Report that change. If it cannot be disabled,
stop before pushing and report the risk of an automatic merge.

## Handoff gate

Use `ship`'s current-head gate except merge authorization. Fetch the base and
read the live PR: head, base, checks, coverage, thread dispositions, draft
state, mergeability, and automatic merge settings. Verify that all fixes are
pushed and proof matches the final SHA. Mark the PR ready after its review
pass and fix verification. It stays open and unmerged. If someone else merged it, say so.

End as ready to merge, waiting only on a verified human approval requirement,
or blocked with the precise evidence/access/product decision needed.
Pending checks or delegated reviews are ongoing work: follow the harness
watcher/completion protocol rather than pretending the gate passed.

## Report

PR URL, final head, state, before/after proof, checks run, review coverage,
thread outcomes, and remaining questions. State that the PR is open and
unmerged. In T3, unwatch before handoff or a blocking user question.
