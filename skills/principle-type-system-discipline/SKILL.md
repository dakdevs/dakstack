---
name: principle-type-system-discipline
description: Uses the type checker to rule out impossible states, mixed-up primitives, and unhandled variants at compile time. Use when designing types, reviewing a function signature, or writing code in any statically typed language.
---

# Type System Discipline

Treat the type checker as a proof tool. Every impossible state, swapped
primitive, or unhandled case you let through as runtime data becomes a
runtime failure the compiler could have stopped. This applies to any typed
language; for TypeScript specifics, also apply `principle-preserve-type-flow`.

## Rules

- **Make illegal states unrepresentable.** Model variants as a sum type (one
  of several shapes, each with its own fields): discriminated unions in
  TypeScript, enums with payloads in Rust, Swift, and Kotlin, sealed classes
  in Scala, ADTs in Haskell and OCaml. Don't use a bag of optional fields
  where contradictory combinations compile.
  `{ completed: boolean; completedAt?: Date }` allows `completed: true` with
  no date. Derive the flag from one source (`completedAt !== null`), or write
  `{ kind: "open" } | { kind: "done"; at: Date }`. If a bug makes you ask
  "can this combination even happen?", the type is too loose.
- **Brand meaningful primitives.** `UserId` and `OrderId` are both strings
  but must not be swappable. Use newtypes (Rust), opaque types (Swift), value
  classes (Kotlin), phantom types (Haskell), or branded intersections
  (TypeScript). Create the brand once through a parser or constructor that
  checks it, never through a cast, then trust it downstream.
- **External data is untyped until parsed.** RPC payloads, JSON, IPC
  messages, CLI args, config files, env vars, and database rows all need a
  parse function at the entrypoint that returns the typed model. Parse once
  there; never pass raw data inward to parse later. Where to put it:
  `principle-boundary-discipline`.
- **Don't lie to the compiler.** Casts, unsafe coercions, and assertion
  functions that skip the checker are crashes waiting to happen. If the
  compiler can't prove a fact, prove it: validate, narrow, or tighten the
  model. The cast you hide today is next week's postmortem.
- **Let the compiler enforce exhaustive matches.** Adding a variant must
  break compilation wherever it isn't handled. Use your language's idiom: a
  `never` binding in TypeScript, a `match` without a catch-all in Rust,
  `-Wincomplete-patterns` in Haskell, sealed-class `when` in Kotlin.
- **Derive types from the schema that owns the shape.** Protobuf, OpenAPI,
  GraphQL, database migrations, design-token files: derive from them, don't
  hand-write a parallel type. Copies drift
  (`principle-encode-lessons-in-structure`).
- **Prefer compile time to run time.** Each runtime assertion, null check, or
  `instanceof` admits the types aren't doing their job. Move the check into
  the type.

## When the producer emits plain values

Sometimes a trusted producer you can't change within the task's scope emits
plain strings where you want a brand. Only then, ask the owner which way to
go:

- Move the brand into the producer or its schema.
- Add a domain constructor at the real semantic boundary.
- Keep the producer's plain type until its owner approves a stronger one.

Don't quietly widen the task into the producer's code. Prove the brand is
constructed without a cast. Don't ask otherwise: explicit public types,
schema-owned brands, derived types, and parse-once all fit together.

**The test:**

- Could I write a comment explaining when this combination of fields is
  valid? Then the type is too loose. Split it into a sum type.
- Do two arguments share a primitive type but mean different things? Brand
  them.
- Where did this `any`, `as`, or `assertNotNull` come from? Trace it to the
  boundary and parse there instead.
- If a variant is added next month, will the compiler point to every place
  that needs a new case? If not, the match isn't exhaustive.
- Does this type copy a shape another file owns? Derive it.
