---
name: ship
description: Takes a change from its current state to merged and deployed without the user watching - finish it, prove it, pass the bar, file the PR, babysit CI and review bots, merge, and confirm the deploy. Use when the user says "ship it", "$ship", "get it merged", "$pr-this and get it merged", "force merge", or "fix the checks and merge".
---

# Ship

The user is not watching this thread. Nobody reads your updates until long
after you stop, and nobody will prompt you again. You own the work from where
it is now to a merged PR and a working deploy.

Run this workflow only when the user asked to ship or merge. For a PR that
stops before the merge, use `ship-to-pr`.

## What the user grants

- Merge the PR once the merge gate passes.
- Rebase the PR's own branch and push it with `--force-with-lease`.
- Use whatever test method gives direct proof (browser, simulator, running
  the app, screenshots), even where a repo file says to ask first. Repo rules
  about which commands or fixtures to use still apply.
- Admin merge (`gh pr merge --admin`) only when the user said "force" or
  "admin" for this task.

Nothing else. Production data, deleting things, closing PRs, and other
people's branches still need the user.

## Steps

1. **Finish the change.** Do the smallest change that meets the goal. Work
   on a branch, never the default branch. Follow `taste`.
2. **Prove it.** Collect proof you observed yourself for every change in the
   diff (see Proof).
3. **Pass the bar.** Run `bar` on the diff and fix what it finds.
4. **Rebase** onto the latest base branch. When conflicts appear, keep the
   intent of both sides, regenerate lockfiles with the package manager
   rather than hand-merging them, and leave no conflict markers. Rerun the
   checks and re-prove any behavior the conflict touched.
5. **File the PR** with `pr-this`. Add one line saying how you proved the
   change, and embed screenshots or video for UI changes with `show-me`.
6. **Babysit** with `babysit-pr`. Fix real CI failures and real bot findings
   at the cause, prove each fix, and push.
7. **Merge** once the merge gate passes, with the repo's merge method. If
   the user said "just merge it", merge now; do not enable auto-merge.
8. **Confirm the deploy.** Watch the production deploy (Vercel, Cloudflare,
   GitHub Actions, or TestFlight) reach ready and check that it serves the
   change.

Stay active from step 1 to step 8. While waiting on checks or bots, use the
watcher from `babysit-pr` so a change wakes you. Ending your turn while
something is pending stops the work.

## Proof

Proof is evidence you saw in this session: command output, a reproduction,
a screenshot. Prefer, in order:

- The original failure reproduced, then passing after the fix.
- The checks CI runs: lint, typecheck, tests.
- A focused test that fails without the change
  (`principle-avoid-tautological-tests`).
- For UI or runtime behavior, the running app. Green mocked tests do not
  prove the experience works.

If you cannot prove a change, you are not confident. Ask.

## Merge gate

All true on the latest head:

- Proof covers every change in the diff, and `bar` passed.
- Required checks are green. A check is skipped only if the user said so.
- Review bots finished, and each finding is fixed or dismissed with a reason.
- No human review requests changes.
- The branch is current with its base and mergeable.

## Asking the user

A question in plain text goes unseen. Use the harness's question tool
(`AskUserQuestion` in Claude Code, `request_user_input` in Codex) and put
the PR link, the blocker, and options with your recommendation in it. Ask
only when you cannot prove the change, cannot pass the gate yourself, need
something outside the grant, the goal is ambiguous in a way that changes the
result, or another PR makes this one obsolete. If no answer comes, leave the
PR open and unmerged and lead your final message with the question.

## Report

PR link, merge commit, deploy URL or build number, the proof, and every
decision you made for the user. Answer "merged?" with yes or no first. In T3
Code, call `unwatch_pull_request` before stopping early.
