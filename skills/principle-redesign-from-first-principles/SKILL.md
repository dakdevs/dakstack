---
name: principle-redesign-from-first-principles
description: Integrates a new requirement by reworking the design as if that requirement had been a founding assumption, instead of bolting it on, when the user has asked for a redesign. Use when the user explicitly requests a redesign, rework, or cleanup to absorb a new requirement into an existing design; otherwise use it only to inform the minimal change and separate recommendations.
---

# Redesign From First Principles

A bolted-on requirement leaves the design shaped for a world that no longer
exists. A redesign makes the result look like what you would have built had
you known the requirement on day one. That keeps future options open.

## When you may redesign

Redesign only when the user explicitly asks for a redesign or cleanup, and
only inside that scope. A request to review never authorizes implementation.

Otherwise, make the minimal change the task requires
(`principle-required-changes-only`). You may still do the redesign thinking
below. Use it to choose a better minimal fix, or list the larger redesign as
a separate recommendation. Do not let it widen the diff.

## Steps

1. **Read every affected file.** Understand the current design as a whole
   before you change any part of it.
2. **Ask the day-one question.** "If we were writing this from scratch with
   this requirement, what would we build?" Answer it concretely: names,
   types, boundaries, data flow.
3. **Propagate everywhere.** Carry the change through every reference:
   types, docs, examples, and rationale sections. A stale explanation of the
   old design is a bug.
4. **Think whole, deliver in steps.** Design the end state in one pass, then
   land it incrementally (`principle-sequence-verifiable-units`).

**The test:** Could a newcomer reading the result tell which requirement came
last? If yes, it was bolted on. If the user did not ask for a redesign, does
the diff contain only required changes?
