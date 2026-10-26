---
name: thermo-nuclear-review
description: Audits a branch's changes for bugs, broken existing behavior, security holes, developer-experience regressions, and feature-gate leaks, tracing each finding end to end before reporting it. Use when the user asks for a thermo nuclear, thermonuclear, or deep review, or a security and correctness audit of a branch or PR diff.
---

# Thermo Nuclear Review

Audit the checked-out branch as a security expert. Nothing may slip through:
be thorough, rigorous, and skeptical, and follow every change to its effects.

This is a review. It never authorizes edits. Report findings; do not fix them.

## Scope

- Report only problems in code the branch adds or changes. Start from the diff.
- Do not report flaws in code the branch leaves untouched, even real ones.

## What to hunt

**Broken behavior.** Modules and packages depend on each other in ways the
diff does not show. A small change in one place often breaks something far
away. Trace every caller, consumer, and side effect of each change.

**Security.** Find every vulnerability the changed code introduces. Raw
untrusted input must be parsed once at its entrypoint, with typed results
passed downstream.

**Developer experience.** Catch any change to how developers run or build the
code locally, such as:

- where or how secrets are read;
- renamed or newly required environment variables;
- remapped ports or changed networking;
- a new script that must be run for something to keep working.

A new, optional way to run or build does not count. A new package-manager
dependency does not count, unless it forces a step outside the normal
workflow, like installing software by hand from a website or app store.

**Feature leaks.** Features may sit behind feature flags or internal-only
checks. Nothing gated may leak past its gate. These leaks are subtle; check
every path that can reach gated code.

## Intended breakage

If a risky change is the point of the branch (it removes a flag, drops a
safeguard, or breaks a behavior on purpose) and its scope is tight, do not
report it. Report it anyway when:

- the author likely has not seen the full consequences;
- the author seems to underweight the harm (say, a PR titled "Delete the
  database");
- the change might be malicious.

## Severity

Never inflate severity. Calling minor issues high trains people to ignore
you. Trace each issue end to end until you are fully confident before you
report it at any level.

## Finish your research

Never hand over a half-checked finding. Do not write "the client does X,
which is fine if the backend handles it" when you can read the backend.
Read it and settle the question.

## Outside reviews

Finish your own audit first, so you review with fresh eyes. Then, if you
have medium or high findings and the branch has a PR, read its discussion
with `gh` or `glab` for comments from review bots or people.

- Check each of their findings yourself. Add the valid ones you missed.
- Where they overlap with yours, take any detail that strengthens your report.
- Mark every finding you took from the discussion and say who raised it.

## Report

For each finding give file, line, severity, whether it is in scope, the
failure scenario, and the evidence you traced. Order by severity. If you
found nothing at medium or above, say so plainly.
