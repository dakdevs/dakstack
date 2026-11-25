---
name: pr-proof
description: Captures comparable before and after evidence for the outcome of every PR and refreshes it when the PR changes. Use when implementing, reviewing, creating, or updating a PR.
---

# PR proof

Show reviewers what changed. Pick the proof artifact from the outcome they can
observe.

## Choose the artifact

- **Visible UI state changes.** Run the affected app and capture comparable
  before and after screenshots.
- **UI workflow changes.** Record before and after videos of the workflow,
  showing the interaction and its result.
- **Backend change affects the UI.** Reproduce it through the full stack in the
  affected UI, then use the same screenshot or video rule above.
- **Visible outcome is genuinely identical, or there is no visible outcome.**
  Write a clear, minimal fenced `diff` in pseudocode using `-` and `+` lines
  for old and new behavior. Back it up with logs, tests, or source links.
- **Substantial high-level architecture change.** Rarely, add matching before
  and after diagrams when they make the new flow easier to understand,
  alongside the outcome proof above. See
  [diagrams](../pr-this/references/diagrams.md).

Missing required proof blocks readiness. If you cannot run or capture a
required outcome, report the missing environment, access, or product decision.

## Capture and verify

1. **Capture before.** Pin the base revision and capture the original outcome
   before editing, or reproduce it from that base in an isolated checkout
   without disturbing the user's working tree. Record the scenario, inputs, and
   environment. Use [docs context](../docs-context/SKILL.md) to confirm what
   should happen. Never fabricate a baseline or failure; label unavailable or
   historical evidence honestly.
2. **Capture after.** Reproduce the same scenario at the finished head. Use
   [show-me](../show-me/SKILL.md) for UI captures with matching viewport, data,
   and starting state. For UI changes, run [break UI](../break-ui/SKILL.md) and
   record coverage and blockers; proof capture does not replace functional
   checks.
3. **Inspect and verify.** Review every artifact yourself. Record the checked
   base and head SHAs, the checks actually run, and what the evidence proves
   versus its limits. A pseudocode diff explains behavior; supporting logs,
   tests, or runtime checks establish verification.
4. **Refresh on every change.** Any later edit, fix, test update, rebase,
   conflict resolution, or amended commit invalidates the after proof. Rerun
   affected scenarios and checks at the new head, replace stale artifacts,
   verify retained evidence still applies, and update the PR body on every
   push. Keep the before capture while its base and scenario still apply;
   recapture if the base or comparison changes.

## Put proof in the PR

Follow [the PR body format](../pr-this/references/body.md). Put visual proof in
a `Before | After` table of screenshots or videos, one row per matching
scenario or viewport, without fabricating a baseline. Link supporting evidence
at URLs reviewers can open, and put verification and implementation context
inside collapsed `LLM Context`.
