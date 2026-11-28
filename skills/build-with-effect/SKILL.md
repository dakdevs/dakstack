---
name: build-with-effect
description: Build and review function-based Effect TypeScript in repositories that use Effect. Select version-matched APIs, compose named operations with typed failures and explicit layers, and verify the resulting behavior.
---

# Build with Effect

Use this workflow when the relevant codebase uses Effect or the task introduces
it. In a monorepo, inspect the workspace manifests, lockfile, and imports to find
where Effect is used and which version each affected package resolves.

Read [Effect Boundary](../principle-effect-boundary/SKILL.md),
[Boundary Discipline](../principle-boundary-discipline/SKILL.md), and
[Preserve Type Flow](../principle-preserve-type-flow/SKILL.md).
Follow [Verify Effect](../verify-effect/SKILL.md) for tests and review.

## Resolve the installed API

- Follow the [official Effect skill](https://github.com/Effect-TS/skills/tree/main/skills/effect-ts)
  guidance to read the installed package's `AGENTS.md` in full when present.
  Read its relevant examples and confirm APIs in the installed types or source.
- Use [official Effect docs](https://effect.website/docs/), version-matched
  Context7 docs, or the source for the resolved release if local guidance is
  missing. Verify the API against the installed release before writing code.
  Keep dependency and major-version upgrades within the requested scope.
- Use [Effect Institute](https://www.effect.institute/) for conceptual lessons
  and [Effect Solutions](https://github.com/kitlangton/effect-solutions) for
  worked examples. Adapt examples to the installed API and the function-based
  requirements here.

## Build the touched flow with functions

- Define Effect operations as functions returning Effects. Use named
  `Effect.fn` for operations that benefit from tracing. Use the installed
  version's untraced form or a regular function returning an Effect for
  small helpers. Use `Effect.gen` and `yield*` for readable sequences with
  meaningful decisions visible.
- Define application services with function-style keys and plain objects.
  Use `Context.GenericTag<Shape>(key)` in v3 or
  `Context.Service<Shape>(key)` in v4 releases that expose that form. Check
  the installed API on prereleases. Use stable namespaced keys, small service
  contracts, and explicit layers. Use `Layer.succeed` for an existing value,
  the version's effectful or scoped layer constructor for acquisition, and
  compose the layer graph at the application boundary.
- Use functions and plain data for application-owned Effect definitions,
  including services, errors, and schemas. Use tagged error values with
  literal discriminants for expected failures. Keep defects and interruption
  distinct from domain failures. Convert class-based definitions you change
  to the functional form, preserving callers and runtime behavior.
- Keep IO lazy, pass cancellation through bridge APIs, and put cleanup in
  the scope that owns the resource. Bound concurrency and give retries an
  explicit policy. Retry side effects only when repeating them is safe.
- Compose the use case as one Effect and run it at the framework boundary.
  Reuse an application-owned runtime for long-lived layers and dispose it
  with its owner. Keep pure calculations and performance-critical kernels
  native. Preserve existing public contracts and parse untrusted input once
  at its boundary.

See the [functional service example](../principle-effect-boundary/references/example.md).
When working under a shipping skill, use its selected delivery stop.
