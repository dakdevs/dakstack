---
name: principle-outcome-oriented-execution
description: Drives planned rewrites and migrations straight toward the target architecture, accepting declared local breakage inside phases instead of writing throwaway compatibility code to keep every step smooth. Use when executing a planned rewrite or migration that has explicit phase boundaries.
---

# Outcome-Oriented Execution

Aim at the verifiable end state, not at keeping every step stable. Code
written only to keep an intermediate step working tends to outlive the
migration and become debt. Converge on the target and prove correctness at
declared boundaries.

## Rules

- **End state first.** The integrity of the finished architecture matters
  more than stability while you get there.
- **Breakage is allowed only inside a phase.** It must be planned, scoped,
  and reversible.
- **Define phases up front.** Before you start, write each phase boundary,
  where breakage is acceptable, and which static and runtime checks must pass
  at the boundary.
- **Close each phase green.** Finish the phase compile-complete with its
  checks passing before you start the next
  (`principle-sequence-verifiable-units`).
- **Watch what you touch.** While migrating, keep fast, high-signal checks
  running on the areas you are changing.
- **Verify the whole at the end.** Run full static and runtime verification
  before calling the plan done.

## Hard limit: published boundaries

Breakage never crosses a commit, PR, or deploy boundary. Every committed,
merged, or deployed state must work. Temporary breakage stays in the working
tree until the phase is complete and verified. Do not delete an API that an independently deployed consumer still
needs. Follow the repo's PR and deploy rules. If they conflict with the
plan, change the plan.

## When it applies

Only for planned rewrites and migrations with explicit phase boundaries. For
ordinary changes, keep every step working.

**The test:** Can you point to the declared phase where each breakage lives,
and the green check that closed it? Is any compatibility shim in the diff
that the end state does not need?
