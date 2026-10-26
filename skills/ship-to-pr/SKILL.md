---
name: ship-to-pr
description: Does everything ship does - finish, prove, pass the bar, file, babysit - but stops with the PR ready for the user to merge. Never merges. Use when the user says "ship to PR", "$ship-to-pr", "get it ready to merge", "PR it but don't merge", or "I'll merge it".
---

# Ship to PR

Follow `ship` exactly, with its proof, `bar`, filing, and babysitting steps,
and its testing permission. Change only what this skill changes: you never
merge.

## No merging

You may commit, push, rebase, resolve conflicts, and push this task's branch
with `--force-with-lease`. You may not merge, enable auto-merge, add the PR
to a merge queue, push to the default branch, use `--admin`, or ask a
delegate to do any of these.

If the PR already has auto-merge on, or sits in a merge queue, turn that off
before you start and check again before each push. Say that you did. If you
cannot stop an automatic merge, report that before doing anything else.

## Stop at the gate

Use `ship`'s merge gate as the readiness check, then hand off instead of
merging. Proof and `bar` must cover the final diff. Recheck behavior after
any meaningful conflict fix.

Before the handoff, fetch the base branch and read the live PR: head, base,
checks, reviews, mergeability. It must be open, not a draft, and not set to
merge on its own. If someone else merged it, say so.

End in one of three states:

- **Ready to merge.** The gate passes. The PR stays open and unmerged.
- **Waiting on approval.** Only a human approval remains, and you checked
  that this is the real blocker.
- **Blocked.** Say what blocks it, what you tried, and what is needed. Ask
  the way `ship` says to.

## Report

PR link, final head SHA, which state it is in, the proof, the `bar` result,
and remaining risks. Say plainly that the PR is open and unmerged. In T3
Code, call `unwatch_pull_request` before the handoff or a question.
