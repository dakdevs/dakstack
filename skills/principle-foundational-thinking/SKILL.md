---
name: principle-foundational-thinking
description: Gets core types, data structures, and scaffolding right before writing logic, so later code becomes obvious and options stay open. Use when choosing core types or data shapes, sequencing setup work against feature work, or deciding what state concurrent actors may share.
---

# Foundational Thinking

Structural choices protect option value: the freedom to change course later.
Code-level choices protect simplicity. Over-engineering is often a choice
made too early that closes doors. The right foundational data structure
keeps them open.

## Data structures first

Settle the shape of the data before writing logic. The right shape makes the
code that follows obvious.

- Define the core types early.
- Trace every access pattern: who reads and writes what, and how.
- Choose structures that fit the most common paths.
- Changing a data structure late is a rewrite. Early, it is often a one-line
  diff.

At the code level, remove duplication in structure, not in every line. Types
and data models should converge on one definition. Three similar statements
still beat an abstraction made too early. Prefer explicit code to clever
code. Test behavior and edge cases, not line counts.

## Shared state

Before sharing state between actors (threads, processes, agents, requests),
ask: "What happens if another actor changes this at the same time?" If the
answer is anything but "nothing", isolate the state.

## Scaffold first

Scaffold is anything that helps every later phase: CI, linting, test
infrastructure, shared types. Ask: "Does every later phase benefit from this
existing?" If yes, do it first.

- Order work for option value: setup before features, tests before fixes.
- Keep commits small and single-purpose.
- Remove dead weight before laying foundations
  (`principle-subtract-before-you-add`).

This skill decides the order of work. `principle-experience-first` decides
its target.

**The test:** Could you list the core types and their main access paths
before writing the first function? If not, the logic is coming too early.
