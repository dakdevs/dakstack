---
name: principle-attack-the-premise
description: Stops a run of failing fixes by naming the shared assumption behind them, counting which actors hold the problem, and removing the cause instead of compensating for it. Use when two or more fixes built on the same premise have failed the same check.
---

# Attack the Premise

When two or more fixes that rest on one premise fail the same gate, suspect
the premise, not the fixes. A gate is the check they all failed: a test, a
benchmark, a review. Each failure is evidence against the shared premise.

## How

1. **Write the premise down.** It is the one sentence every failed fix took
   for granted.
2. **Take a census before the next fix.** Count the imbalance for each actor
   (each worker, node, client, or component involved). The census tells you
   _who_ holds the imbalance, not how big it is. Write it as a script you can
   rerun (`principle-build-the-lever`).
3. **Read the skew.** If the same few actors hold most of the imbalance on
   every run, something gives them that role. Find what assigns it. That
   assignment is your next "why" (`principle-fix-root-causes`).
4. **Remove the asymmetry; do not compensate for it**
   (`principle-laziness-protocol`). Rotate the role, randomize who gets it,
   or move it, so no actor holds it every run. Compensations leave the
   assignment in place and add work on every run. Examples of compensation:
   a return path, a shared pool, a batched hand-off, a periodic rebalance.

## Stop rules

- Do not start the next fix until the premise is written and the census
  exists.
- If the census is even across actors, the premise is not the cause. Look
  elsewhere, and keep the census as evidence.

This skill questions a fact the current design assumes. Rebuilding a design
around a new requirement is `principle-redesign-from-first-principles`.

**The test:** Can you name the premise in one sentence and show a census
that points at who holds the imbalance? If not, you are not ready for the
next fix.
