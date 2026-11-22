---
name: pr-proof
description: Captures comparable before and after evidence for every PR and refreshes after proof whenever the change moves. Use when creating or updating a PR, implementing a task, or addressing review feedback that changes the delivered result.
---

# PR proof

Every PR carries checkable before and after evidence. A description of what
should happen is not proof. Record what you observed and where it came from.
Include [docs context](../docs-context/SKILL.md) for consequential decisions:
applicable sources, derived expectations, observed checks, and unresolved gaps.

## Before implementation

Pin the starting revision and capture the original behavior or constraint
before editing. Record the reproduction, input, environment, and observed
output. For a new feature, show the missing capability or existing workflow.
For docs and skill changes, cite the previous text and demonstrate the
contract gap; source comparisons prove text, not successful agent behavior.

If work already exists, reproduce the before state from the pinned base in
an isolated checkout or artifact. Preserve the user's working tree. Label
historical or unavailable evidence honestly; never manufacture a failure.

## After implementation and every subsequent change

Run the same scenario against the current result. Capture output and artifact
paths, environment, checked SHA, and the required lint, format, typecheck,
unit, E2E, build, or runtime results that actually ran. For visual changes,
use `show-me` for comparable before/after captures with matching viewport,
state, and data. Inspect every artifact yourself. For tasks that create or
change UI, include current [break UI](../break-ui/SKILL.md) results,
coverage and blockers. Proof capture does not replace functional checks.

Any change, including review fixes, test edits, conflict resolution, rebase,
or amended commits, invalidates the after record until refreshed. Rerun the
affected scenarios and checks, replace affected artifacts, and verify that
retained evidence still applies. Update the PR's after revision and coverage
on every push. Keep the original before revision unless the comparison
itself changes; record a new base and recapture where necessary.

## PR record

Include before revision/scenario/result/artifact and after
revision/scenario/result/artifact in the body, mapped into the repository's
template. Attach screenshots and video inline. Link durable logs, tests, or
source permalinks for nonvisual proof. Local paths alone are not reviewable
evidence for a remote PR reader. Use `pr-this` to publish the refreshed body.

Record limitations beside the claim: source inspection, static design,
mocked tests, installation checks, live runtime, hosted deployment, and
device observations establish different facts. Missing required proof is a
blocked readiness gate; explain the missing access or product decision.

**Check:** Does the after record describe and cover the current PR head,
including its last fix? Can a reviewer inspect both sides of the comparison?
