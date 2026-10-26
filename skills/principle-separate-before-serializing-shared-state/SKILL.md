---
name: principle-separate-before-serializing-shared-state
description: Removes shared mutable state between concurrent writers first, and serializes access with a structural mechanism only when one shared writer is a real invariant. Use when two or more agents, workers, processes, or goroutines might write the same file, branch, key, or state object.
---

# Separate Before Serializing Shared State

Two concurrent writers on one mutable target cause races. Races show up
rarely, resist reproduction, and cost a lot to debug. Asking writers to
"take turns" does not prevent them. Instructions and conventions are not
concurrency control.

## Steps

1. **Find the shared state.** List every target that more than one actor
   writes: a file two workers both read and write, a branch two agents both
   push to, an API one side defines while another consumes it.
2. **Remove the sharing first.** Ask whether the actors need one canonical
   object, or are each publishing their own facts. Usually it is the second.
   Give each actor a target it alone owns: its own file, key, branch, or
   state directory. Combine them only where they are read or reported.
3. **Serialize only for a real invariant.** If the system truly needs one
   shared write target, enforce order with structure, not prose:
   - a lockfile,
   - sequential phases,
   - a single-writer actor (one owner that applies everyone's changes),
   - an atomic compare-and-swap (a write that succeeds only if the value
     is still what you last read).

Treat "we need a lock" as a smell to check, not the default answer.

## Example

Two workers each write their own `lastX` field into one `state.json`. The
fields differ, but the file is shared, so this is still shared mutation.
Split it into `indexer-state.json` and `metrics-state.json`, and the race is
gone with no lock.

**The test:** Can you name one writer for every mutable target? If not, can
you name the structural mechanism that orders the writes? A comment or
instruction does not count.
