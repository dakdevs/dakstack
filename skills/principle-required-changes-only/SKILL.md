---
name: principle-required-changes-only
description: Limits a code change to the lines needed to reach the stated goal, with no unrelated refactors, cleanup, reformatting, or speculative work. Use when making any code change, by default, or trimming a diff before review; broaden only when the user explicitly asks for redesign or cleanup.
---

# Required Changes Only

Make the smallest change that reaches the stated goal and meets its
acceptance criteria. This is the default for every task.

## Every line needs a reason

Each line you change, add, or remove must do at least one of these:

- Implement the requested behavior directly.
- Keep the code compiling, type-checking, or running after that change.
- Add or update the checks needed to prove the requested behavior.
- Be the smallest enabling change without which the goal is impossible.

If a line does none of these, leave it alone.

## How

1. State the exact behavior that must change.
2. Find the narrowest path to it.
3. Edit only that path and what depends on it.
4. Read the final diff one hunk at a time.
5. Remove anything you added that the goal does not need.

**Per-hunk test:** If reverting this hunk would not block the goal, break
the build, or invalidate a required check, the hunk does not belong.

## Out of scope unless the goal needs it

- Refactoring, renaming, reorganizing, or extracting code.
- Reformatting untouched code or matching nearby style.
- Optimizing for future requirements.
- Abstractions, helpers, config, validation, or error handling for
  hypothetical cases.
- Upgrading dependencies or rewriting adjacent code.
- Fixing unrelated bugs, warnings, comments, or tests, including other
  instances of the same pattern elsewhere.
- Growing the task because a broader design looks cleaner.

Leave existing flaws outside the change in place. A cleaner diff is not a
reason for a bigger one.

## When the user asks for more

Widen the change only when the user explicitly asks for redesign or cleanup,
and only within the scope they named. A request to review never authorizes
changing code. Broad design thinking and a look at sibling cases may shape
the minimal fix or become separate recommendations. They do not license
unrelated refactors, removals, or sibling fixes. Repository scope rules
still apply.

## Enabling work

When the goal truly needs a refactor or supporting change, make the smallest
one. Keep it in the same diff and say why the goal was impossible without
it.

While trimming, never alter or remove changes the user made. Remove only
unrelated changes you introduced during this task.

**The test:** Could you defend every hunk with one of the four reasons
above? If not, revert it.
