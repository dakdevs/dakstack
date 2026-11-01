---
name: babysit-pr
description: Watches a pull request through CI and review, fixing real check failures and real review-bot findings at their cause until the PR is ready or blocked. Use when the user asks to monitor, watch, or babysit a PR, or when another workflow such as `ship` needs a PR carried through checks and bot review.
---

# Babysit PR

Review bots (Greptile, Macroscope, CodeRabbit, and others) are useful and often
wrong. Your job is to tell which findings are which, fix the real ones, and
keep the PR moving without growing it.

## Waiting

One watcher per PR, never two. Never write your own polling or `sleep` loop.

**In T3 Code**, deal with the checks and comments already present, then call
`watch_pull_request` and end your turn. T3 wakes you when a check fails, the
required checks pass, someone comments or reviews, or the branch conflicts.

- Only the thread that owns the PR watches it. A delegated child task never
  calls `watch_pull_request`; its parent owns the PR. Never watch PRs you are
  not working on.
- A wake tells you something happened. It does not mean the PR is ready. Check
  the merge state yourself.
- Before you stop, hand off, or ask the user anything, call
  `unwatch_pull_request`. A watched thread stays out of the user's inbox. Merge
  or close ends the watch by itself.
- If the watch cannot read the PR, inspect the API error and rate budget.
  Report the blocker and reset time; never retry in a tight loop.

**Elsewhere**, run `gh pr checks <n> --watch --fail-fast` as a background or
monitored command (in Claude Code, `run_in_background` or the Monitor tool) so
its exit wakes you. It covers checks only. When it exits, read new reviews and
comments with `gh pr view <n> --comments` or the REST API before deciding
anything. Start it again after every push.

When a wake needs no action, end your turn without a message. Never post or
say "still waiting".

## Rate limits

`gh pr view`, `gh pr checks`, and `gh pr create` spend the GraphQL budget,
which every watcher on the account shares. The REST budget is separate. When
GraphQL runs out, read the PR with `gh api repos/<owner>/<repo>/pulls/<n>` and
checks with `gh api repos/<owner>/<repo>/commits/<sha>/check-runs`.

## Triage

Inspect new checks and comments plus every unresolved older thread. A push
does not dispose of a finding. For each one:

1. **Validate independently.** Use `replicate-issue` and a fresh finding
   validator for review findings. Reproduce, inspect the base, and compare
   with accepted product decisions. Return unclear intent to the main thread
   for the user. For red checks, distinguish code defects from verified flakes.
2. **Pre-existing or new.** A problem that already exists on the base branch is
   out of scope. Note it as a follow-up instead of fixing it here.
3. **Fix confirmed issues at the cause** (`principle-fix-root-causes`),
   verify a working commit, push, refresh `pr-proof` and the PR body, and
   obtain unanimous current-head panel approval after full-diff re-review and
   peer challenge. Never weaken tests to turn checks green.
4. **Re-run the bot** on the new head so it can confirm the fix. Most rerun on
   push. If one needs a comment to rerun, that comment needs the user's
   permission like any other.
5. **Reply and resolve within authorization.** Explicit `ship`, `ship-to-pr`,
   `bar`, or `kitchen-mode` invocation requests their review comment cycle.
   Otherwise require the user's explicit comment request. Reply on original
   threads with evidence and fix SHAs; resolve only verified fixes or validated
   dismissals. Keep product questions and disagreements open. Without comment
   authorization, report dispositions and draft replies instead.

Bot specifics:

- If the repo has `.macroscope/check-run-agents/*.md`, read those rules before
  judging a Macroscope finding. Its findings cite them.
- CodeRabbit is advisory. Judge its findings like any other, but never wait for
  it or hold a merge on it.

Keep the PR the size the goal needs. Review loops inflate PRs one cheap fix at
a time. Fix real bugs in the intended case. Decline the rest with a reason and
list them as follow-ups: tests nobody needs, guards for cases that do not
matter, extra compatibility, small performance costs. When two fixes work,
choose the one that deletes or narrows code.

## Base branch and merging

- Watch `main` (or the base) and rebase when it moves under the PR.
  `watch_pull_request` reports conflicts but not BEHIND, so check
  `gh pr view <n> --json mergeStateStatus` yourself before calling the PR
  ready.
- If another PR makes this one obsolete, stop watching, tell the user, and ask
  before closing it unless they already authorized closing.
- The PR is ready when required checks pass on the latest head, the bots have
  reviewed that head, and every finding is fixed or dismissed with a reason.
- Merge only if the user explicitly asked. Otherwise report that it is ready.
- Right before merging, `git fetch` and check the PR again. Never merge when it
  is BEHIND or DIRTY, or when base commits that landed after the last green run
  touch this PR's files. Rebase, push, and wait for green again.
