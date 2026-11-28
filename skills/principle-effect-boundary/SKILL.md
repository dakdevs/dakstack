---
name: principle-effect-boundary
description: Decides where Effect belongs in a TypeScript codebase and how to write, test, and review it as functional code with services provided through layers and no Effect classes. Use when writing, reviewing, or migrating code that imports the effect package, or when deciding whether async orchestration such as network calls, retries, timeouts, cancellation, scheduled jobs, or release steps should move to Effect.
---

# Effect Boundary

A repo's own Effect boundary document wins over this skill; update it when
a boundary changes. When reviewing, do not edit: report each finding with
file, line, severity, and in scope or not.

## Decide

Use Effect for coarse async orchestration, where it pays for itself with
typed, exhaustive failures instead of `unknown` from `catch`; IO injected
through services and layers, so tests swap `fetch`, storage, or clocks;
structured concurrency, where a failing `Effect.all` branch interrupts its
siblings instead of leaking them; deadlines and cancellation that reach
requests as an `AbortSignal`; and spans and logs around whole operations.

Keep Effect out of hot paths: simulation, physics, rendering, GPU or 3D
code, codecs, socket fan-out, per-request routing, and anything run per
frame, tick, entity, vertex, or byte. Wrapped arithmetic runs hundreds of
times slower than plain code; Effect pays off coordinating chunks of work
that stay as fast as before. Keep that work native inside one coarse Effect
operation, and run the repo's hot-path check if it has one. Before moving an
operation to Effect, benchmark the real operation with and without it.

## How Effect behaves

- An Effect is a lazy blueprint; a `Promise` is eager and caches its first
  result. Wrap promise work in a thunk, never a promise created earlier:
  `Effect.tryPromise((signal) => fetch(url, { signal }))`.
- `Effect.succeed(value)` captures a value once; `Effect.sync(() => value)`
  recomputes each run. Use `sync` for anything time- or state-dependent.
- Failures accumulate in the error type as a union. `Effect.catchTag`
  handles one tag and narrows it; `Effect.catch` handles all. An error type
  of `never` rules out typed failures but still allows defects or interruption.
- `Effect.gen` with `yield*` is sequential composition, like `async`/`await`.
  Build the whole operation as one Effect and run it once, at the edge.

## Write it functionally

- No Effect classes. Define services with the function form of the service
  key, provide them with `Layer.succeed` or `Layer.effect`, and give tests a
  stub layer. Failures are plain readonly `_tag` objects built by small
  functions, carrying what a caller needs (status, counts, step).
- Use `Effect.fn("name")` when a span helps, `Effect.fnUntraced` otherwise.
- Bound requests with `Effect.timeoutOrElse`; `Effect.tryPromise` passes the
  fiber's `AbortSignal`, so interruption aborts the request.
- Run at the edge with `Effect.runPromise` or `Effect.runPromiseExit`; map
  the result to the existing Promise API so callers and their tests stay
  unchanged. Handle defects at that edge, preserving their distinction from
  expected errors.
- Parse untrusted input once at the entrypoint. Keep a Zod schema that owns
  a boundary; do not duplicate it as an Effect `Schema`.
- See [references/example.md](references/example.md) for a service, a layer,
  and typed failures written this way.

## Check the installed version

The installed version is authoritative. Read its version in
`node_modules/effect/package.json`, the Effect team's agent guide at
`node_modules/effect/AGENTS.md`, and the runnable examples in
`node_modules/effect/ai-docs/src/`. Confirm every API name, including the
service-key form in the example, in `node_modules/effect/dist/*.d.ts`. Leave the
examples' explanatory comments out of real code. For prose docs, fetch
`https://effect.website/docs/v4/llms.txt` and the Markdown pages it lists,
or query Context7 library `/effect-ts/effect`.

## Test

Use the repo's test runner; do not add an Effect-specific one. Provide stub
layers, run to a Promise or `Exit`, and assert literal values and typed
failures (read [test behavior](../principle-test-behavior-not-implementation/SKILL.md)): a stub answering
503 makes `post(...).pipe(Effect.flip, Effect.provide(transportLayer(stub)))`
resolve to `{ _tag: "Refused", status: 503 }`. For time, provide the installed
version's test clock and move it with `TestClock.adjust`. For cancellation,
interrupt the operation and assert
that the injected request saw an aborted signal.
