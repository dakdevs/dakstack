---
name: principle-model-the-domain
description: Encodes the real domain in a fitting structure - a state machine, typed model, lookup table, discriminated union, or reducer - instead of conditionals scattered across files. Use when writing stateful logic, or when code branches heavily or repeats the same shape assumption in several places.
---

# Model the Domain

Put the rules of the domain into a data structure instead of spreading them
across if/else chains.

**Why:** Scattered booleans, repeated assumptions about a data shape, and
branching spread across files are accidental complexity. A structure that
matches the domain makes invalid states impossible to represent and deletes
branches. Picking it while you write is cheap. Recovering it later looks like
a refactor, and refactors get put off.

## Structures to reach for

- A state machine instead of scattered booleans, phase flags, or lifecycle
  checks.
- A typed object or model instead of loose parameters or the same shape
  assumed in many places.
- A map, registry, lookup table, or discriminated union (a type whose
  variants carry a tag field) instead of branches spread across files.
- A reducer or command/event model instead of ad hoc state mutation.
- A module built around one body of domain knowledge, not around a sequence
  such as load, validate, transform, save. Execution order is not ownership.
- A small module boundary that gathers repeated behavior, ownership, or
  invariants (rules that must always hold).
- A queue, cache, index, graph, tree, or normalized collection when the way
  data is read calls for one.
- Anything else that fits. When nothing obvious does, write down what the
  code must never allow and how the data is read, then find the structure
  that encodes exactly that.

## Do not force it

Keep boring code when the current shape is clear, local, and unlikely to
grow. Distrust an abstraction that adds indirection without removing
branches, duplicated rules, invalid states, or lifecycle risk.

## Signs you skipped this

- A new feature adds one more branch to an existing if/else chain.
- A second boolean must stay in sync with the first.
- Modules are named after phases (temporal decomposition), and each one
  repeats the same domain rules.

**The test:** Can the code represent a state the domain forbids? If yes, and
a structure would rule it out with less branching, use the structure.
