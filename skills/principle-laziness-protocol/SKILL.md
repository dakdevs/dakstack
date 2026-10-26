---
name: principle-laziness-protocol
description: Biases work toward deletion and the smallest change that solves the problem, and limits scope to what was asked. Use when refactoring, judging diff size, or tempted to add an abstraction, a layer, or a new value threaded through many types and pipelines.
---

# Laziness Protocol

Code is cheap for you to write, so over-building is easy. Borrow a human
maintainer's tiredness. Get the most result from the least code.

## Rules

- **Delete first.** When asked to refactor or improve, look for what to
  remove before what to add.
- **Keep it flat.** Avoid deep abstraction. If answering one question means
  tracing more than 3 files or layers, flatten it.
- **Decide once.** Don't make the same choice in several places. Put it in
  one source of truth and pass the result down as a simple flag.
- **Shrink the diff.** Make the smallest change that solves the problem.
  Fewer lines beat elegant boilerplate.
- **Question the threading.** If the task means passing a new value through
  types, schemas, pipelines, or other layers, stop and find a more direct
  path.

## Scope

- Make the minimal required change by default.
- Broaden only when the user explicitly asks for a redesign or cleanup, and
  only within the scope they named.
- A request to review is not a request to change code.
- Broad design thinking may shape the minimal fix or become a separate
  recommendation. It never licenses unrelated refactors, removals, or fixes
  to sibling code (`principle-required-changes-only`).

**The test:** Would a human developer find this exhausting to maintain? If
yes, it is the wrong solution. Be lazy. Stay simple.
