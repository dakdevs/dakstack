---
name: replicate-issue
description: Reproduces an issue or review finding, verifies its root cause and product intent, then guides a tested fix and thread disposition. Use when the user reports a bug, asks to replicate an issue, or a PR review returns findings to validate and address.
---

# Replicate issue

Treat the report as a hypothesis. Establish the failure and intended behavior
before changing code. Use safe fixtures and the actual affected surface.

## Validate

1. Record the report, PR/comment/thread link if present, environment, exact
   base, reported head, current head, trigger, and claimed expected result.
2. Apply [docs context](../docs-context/SKILL.md) to the report and relevant
   documentation; validate source applicability and carry its checks forward.
   Read the task and accepted product decisions. Trace relevant contracts,
   designs, callers, and tests. Distinguish a violated decision from a new
   preference. An existing test is evidence, not authority over an explicit
   product decision.
3. Reproduce the trigger with the smallest credible script, test, request,
   browser, or device flow. Capture actual output and evidence paths. Check
   the base for the same defect. Never invent red output or create a broken
   commit to record it. Source proof of a contract violation is valid when
   runtime reproduction is unavailable, but label its limits.
4. Return one disposition: confirmed in scope, invalid with counterevidence,
   pre-existing, out of scope, cannot reproduce with available access, or
   needs product decision. Missing credentials or fixtures prove no verdict.

For PR findings, the main thread launches a fresh
[finding validator](../kitchen-mode/agents/finding-validator.md), independent
of the author and reviewer. The validator reports only. The main thread
inspects its evidence and owns every final disposition.

## Product questions

When intent is unclear, return the exact unresolved expectation, conflicting
evidence, options, recommendation, and affected finding to the main thread.
The main thread asks the user and leaves dependent fixes and resolution open.
Continue unrelated verified work. Never let a reviewer, validator, majority
vote, or implementation convenience invent the product decision.

## Address

For confirmed in-scope issues, read and apply
[fix root causes](../principle-fix-root-causes/SKILL.md). Add a regression check with an independent oracle
(`principle-avoid-tautological-tests`). Observe failure before and success
after the fix where possible, then run repository completion checks. Keep
each fix and its tests in a working commit, and refresh `pr-proof` after
every change. Reproduce again against the pushed head.

When PR comment actions are authorized, reply on each original thread with
the disposition, evidence, and fix SHA where relevant. Resolve a fixed thread
only after verification; resolve a dismissed thread only with a documented
validated reason and repository permission. Leave disagreements, unknowns,
and product questions unresolved. Without that authorization, return draft
replies and unresolved IDs to the main thread.

Never drop an open finding because it predates the latest push. Revalidate
it on the new head. Return all dispositions, exact checks, proof limits,
remaining questions, and the next action.
