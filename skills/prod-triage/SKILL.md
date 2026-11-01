---
name: prod-triage
description: Triages production errors from Sentry, Vercel logs, PostHog, or Axiom - ranks them by severity, revalidates each, then fixes each real issue at its root cause in its own PR. Use when the user shares a Sentry link or production error, says "look at the production logs", "triage the issues from the past N hours", "it's broken in prod", or asks for a Seer or autofix PR to be checked.
---

# Prod Triage

Apply [docs context](../docs-context/SKILL.md) to the deployed environment,
relevant contracts and runbooks, gathering, ranking, reproduction, and fixes.

## Gather

Check Executor for a connector first (Sentry, PostHog, Axiom, Vercel). Fall
back to the service's CLI. Pull the requested window (default: the last 24
hours) for the production environment.

## Rank

Group events by root cause, not by message text. For each group, give:

| Severity | Issue | Users or events | First seen | Likely cause |
| -------- | ----- | --------------- | ---------- | ------------ |

Severity order: data loss or wrong charges, then broken sign-in, checkout, or
other core flows, then degraded features, then noise. Put the table in front
of the user before fixing, unless they said "fix them".

## Fix

For each issue the user wants fixed:

1. **Revalidate.** Confirm it still happens on the current production commit
   and is not already fixed or caused by a bot or attack. If an automated
   fix PR (for example, Sentry Seer) exists, judge whether it is the right
   fix and whether it is needed at all.
2. **Reproduce locally** with `replicate-issue`. Build a fast loop that shows the failure (a
   failing test, a script, or a request), then narrow it until one cause
   remains. Use sandbox keys and test data.
   Never use production data, assets, or accounts to test.
3. **Fix the cause.** Read [fix root causes](../principle-fix-root-causes/SKILL.md)
   and [laziness protocol](../principle-laziness-protocol/SKILL.md) directly.
   Add a test that fails without the fix; read
   [test behavior](../principle-test-behavior-not-implementation/SKILL.md).
4. **One issue, one PR.** Run independent fixes in parallel with `fanout`.
5. **Ship** each with `ship` when the user asked to merge. After deploy,
   check that the error stops.

For an active attack (for example, a DDoS), contain it first (rate limits,
firewall rules) and tell the user what you changed. Then repair the
data it damaged, and confirm that affected records are correct.

## Report

The ranked table, then for each fixed issue: the PR, the proof, and whether
the error stopped in production.
