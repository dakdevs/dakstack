---
name: principle-fix-root-causes
description: Traces each bug symptom back to its root cause and fixes it there instead of guarding over the symptom. Use when debugging a failure, crash, flaky behavior, or anything that breaks after a restart.
---

# Fix Root Causes

Don't patch symptoms. Trace each problem to the cause and fix it there.

Symptom fixes pile up. Each workaround makes the system harder to reason
about, and the real bug stays. A root-cause fix costs more up front and less
in total debugging time.

## Steps

1. **Reproduce first.** If you can't reproduce it, you can't prove your fix.
2. **Ask "why?" until you reach the cause,** not just the line that threw.
3. **Instrument instead of guessing.** Add logging and read the actual error.
4. **Resist guards.** A nil check that silences a crash is a symptom fix.
5. **Look for the pattern, not just this instance.** Search the codebase for
   the same mistake. Fix the instances inside the task's scope. Report the
   others as a recommendation instead of fixing them, unless the user asked
   for that cleanup (`principle-required-changes-only`).

## Restart bugs: suspect state before code

Code doesn't change between runs. State does. When something fails after a
restart, suspect stale persistent state first: config files, caches, lock
files, serialized state. If clearing a state file brings the behavior back,
the fix is to validate that state, not to tell users to delete it.

**The test:** Can you name why the bug happened, show it failing before your
fix and passing after, and explain why the fix removes the cause rather than
hiding it? If not, keep digging.
