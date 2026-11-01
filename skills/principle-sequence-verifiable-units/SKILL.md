---
name: principle-sequence-verifiable-units
description: Splits multi-step work into phases that each end compile-complete with their checks green before the next begins, and orders delivered commits and PRs so the sequence proves the work to a reviewer. Use when running sweeps, migrations, or batches of similar edits, and when deciding how to stack commits and PRs.
---

# Sequence Verifiable Units

Work in small units that each end in a state you can check. Do not advance
until the current unit is green. The same rule governs how you execute and
how you deliver.

A break caught in the unit that caused it is cheap to find. A break caught
after a batch is buried, and you have already built on top of it.

## Execution

1. **Define the phases before you start.** For each phase, name its boundary
   and the static and runtime checks that must pass there (typecheck, lint,
   the relevant tests, a run of the app).
2. **Allow local breakage inside a phase.** It must be planned, scoped, and
   reversible. You do not need a compiling tree after every single edit.
3. **Finish the phase compile-complete, then run its checks.** Advance only
   when they are green. Never defer all checking to the end of the whole
   job.
4. **Measure against the real baseline.** Start from a clean, current base so
   each check compares against the true starting state. Updating your own
   branch is fine. This gives no authority to rebase someone else's work or
   rewrite shared history.
5. **Run the check even when it is nearly free.** A script that makes the
   edits (`principle-build-the-lever`) makes per-phase checks cheap. Run them
   anyway.

## Delivery

Order commits and PRs so the sequence reads as an argument.

- **Every commit works.** Before creating any task commit, finish its
  logical block, include its tests and required callers, inspect the diff,
  and pass the block's checks. A later commit must never be needed to repair
  an earlier commit. Local breakage remains uncommitted, including red tests
  captured for proof. Do not split by file type when that breaks the project.
- **Keep an evidence trail.** Record each commit's purpose, verification
  commands and results. Recheck rewritten commits after rebases or amendments
  where their contents or dependencies changed. Never rewrite user history
  or mix unrelated user work into a task commit.
- **Every published unit stands on its own.** Each PR must pass its checks
  and be safe to merge and deploy alone. Follow the repo's deploy rules, such
  as separate schema PRs. Never publish a broken intermediate unit.
- **Show red, then green, as evidence.** Capture the failing test's output
  before the fix and the passing output after it, and include both. Do not
  publish a failing commit to prove the point.
- **Use story orders.** Subtraction before the reshape. Baseline capture
  before the treatment. Scaffold before the feature. Group PRs around the
  verified phases.

**The test:** Can you name the check that went green at each phase boundary?
Does every published commit or PR pass on its own? Can a reviewer see the
red output and then the green?

Pairs with `principle-prove-it-works`, which keeps each check real.
