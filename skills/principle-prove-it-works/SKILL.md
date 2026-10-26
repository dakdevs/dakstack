---
name: principle-prove-it-works
description: Verifies finished work by observing the real artifact - running the feature, reading the actual value, inspecting the diff - instead of trusting a proxy, a self-report, or "it compiles". Use when a task is done and before you call it done, when checking a delegate's work, or when a check fails and you need to know whether to trust it.
---

# Prove It Works

Finishing a task is not the same as knowing it works. Before you say done,
ask: "How do I prove this actually works?" Then look at the real thing.

**Why:** Work you have not checked has unknown correctness. Indirect checks,
such as file timestamps, how fresh an output looks, a delegate's summary, or
an old screenshot, feel cheaper than looking directly. A wrong guess costs far
more than a direct look.

## Look at the real thing, not a proxy

A proxy is anything that stands in for the thing you care about.

- Check whether a process is alive by asking the process, not by reading
  state derived from it.
- Read the actual value, not a cached or computed copy of it.
- When a check fails, suspect how you looked before you suspect the system.

## Code and features

1. Build it. This is required, but it proves little.
2. Run it and drive the real feature path.
3. Follow the whole chain: does data get from input to output?
4. For integrations, test the full communication path end to end.

## Delegated work

Trust artifacts, not reports. A delegate reports what it meant to do, which
is not always what happened. Read the git diff, the file contents, or the
runtime behavior yourself.

## Script the check when you can

The strongest proof is a deterministic script that reruns the same
comparison. A one-time glance is weaker. For example, a script that compares
old and new compiled output catches what your eye misses.

- Write the script, run it, and keep its output so a reviewer can rerun it
  instead of taking your word.
- Keep the artifact visible to the user. Most work needs only that.
- Keep it in the repo only for large or complex work whose trail must be
  auditable later, such as a big port or migration, and only when you are
  allowed to write it there. Committing needs its own permission.

**The test:** Can you point to something you observed in this session, not
something you inferred, that shows the feature working? If not, you have not
proved it.
