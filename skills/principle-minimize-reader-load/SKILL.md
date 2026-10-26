---
name: principle-minimize-reader-load
description: Reduces the work a reader must do to understand code by cutting layers of indirection and hidden or mutable state. Use when code is hard to trace, when reviewing or shaping a design, or before adding a wrapper, adapter, or new piece of state.
---

# Minimize Reader Load

Maintainable code is code a reader can understand with little effort. Measure
that effort on two separate axes:

1. **Layers to trace:** how many hops of indirection sit between a question
   and its answer.
2. **State to hold:** how much hidden or changing context the reader must
   keep in their head.

**Why:** Code is read far more often than it is written. Line counts,
cyclomatic complexity (a count of branch paths), and "clean architecture" are
stand-ins. Reader load is what matters. The two axes are independent: one
flat file with 50 globals can be as hard to follow as a six-layer adapter
stack, so guard both. Readers have limited working memory, just as an agent
has a limited context window (`principle-guard-the-context-window`).

## How

- **Collapse layers that do not pay for themselves.** Inline wrappers with
  one caller, adapters with no second implementation, and indirection built
  for a future that never arrived.
- **Shrink the scope of state.** Prefer pure functions that return values
  over ones that mutate. Prefer locals to fields, fields to module state, and
  module state to globals. Derive a value instead of keeping two copies in
  sync.
- **State an invariant once, at the boundary.** An invariant is a rule that
  always holds, such as "this id is never empty". Name it where data enters,
  not in every consumer, so the reader learns it once.
- **Before adding a layer or a piece of state,** ask whether it removes at
  least as much reader load somewhere else. If not, do not add it.

**The test:** Can a new reader answer "where does X come from?" and "what can
change X?" in under 30 seconds? If not, cut layers or cut state.
