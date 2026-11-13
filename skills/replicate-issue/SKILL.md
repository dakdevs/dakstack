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

The main thread can validate PR findings directly. A separate
[finding validator](../kitchen-mode/agents/finding-validator.md) is optional
for difficult disputes when delegation is authorized; it is independent of
the author and reviewer and reports only. The main thread owns dispositions.

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

Never post, edit, reply to, or resolve GitHub PR comments or submit GitHub
reviews. Return dispositions, evidence, fix SHAs, and existing thread IDs to
the originating conversation. Apply this prohibition to delegates and nested
skills. Keep disagreements, unknowns, and product questions explicit.
Assess recurring failures for deterministic lint rules under
[bar](../bar/SKILL.md); implement safe in-scope checks or report a concrete
proposal and reason for deferral. Verify affected paths without restarting
a full review by default.

Never drop an open finding because it predates the latest push. Revalidate
it on the new head. Return all dispositions, exact checks, proof limits,
remaining questions, and the next action.
