---
name: principle-make-operations-idempotent
description: Designs state-changing operations to reach the same correct end state no matter how many times they run or where a previous run stopped. Use when designing commands, startup and shutdown steps, syncs, retries, or processing loops that must survive crashes, restarts, and repeats.
---

# Make Operations Idempotent

An operation is **idempotent** when running it twice leaves the same result
as running it once. Build every state-changing operation to converge on the
correct state however many times it runs and wherever it starts from.

Commands, lifecycle steps, and processing loops live where crashes, restarts,
and retries are normal. If leftover partial state changes what the next run
does, every restart turns into a debugging session.

For each operation that changes state, answer two questions: what happens if
this runs twice, and what happens if the last run crashed halfway?

## Patterns

- **Startup converges.** On start, scan for existing state, clean up stale
  artifacts, and adopt sessions that are still alive instead of starting
  duplicates.
- **Clean up by content.** Decide what is a duplicate or stale by comparing
  content, not by creation order.
- **Locks heal themselves.** Write the owner's process ID into the lock. If
  that process is gone, the lock is stale and the next run may take it.
- **Scheduling is repeatable.** Failed work respawns cleanly, and fresh input
  is regenerated after each cycle rather than reused from a broken one.

**The test:**

1. What happens if this runs twice in a row?
2. What happens if the previous run crashed at each possible point?
3. Does running it again always reach the same end state?

If any answer is "it depends on what state was left behind", add a
reconciliation step: look at the actual state first, then do only what is
needed to reach the target.
