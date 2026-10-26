---
name: principle-preserve-type-flow
description: Keeps TypeScript types flowing from the code that owns them instead of restating, casting, or re-checking them, and parses untrusted input once where it enters. Use when writing or reviewing TypeScript that adds type annotations, `as` casts, Zod schemas, type guards, assertion helpers, controllers, API boundaries, or a type that copies a shape defined elsewhere.
---

# Preserve Type Flow

Take types from the code that owns them. Parse untrusted input once, where it
enters. Never write a function whose job is to convince the compiler of a type.
Every hand-written type, schema, cast, or guard is a second source of truth
that can drift from the first.

## Terms

- **Type flow:** type information passing from its producer to every consumer
  without being widened, copied, or rebuilt.
- **Producer:** code that already owns a value's static type: a typed
  function, generated client, ORM, framework adapter, or schema parser.
- **Trust boundary:** where runtime data enters from outside the typed
  program: HTTP body, webhook, env var, CLI arg, file, queue message, or an
  untyped third-party response.
- **Parse:** turn `unknown` input into a typed value, or fail. A check that
  returns a boolean and leaves the old weak type is not parsing.

## Steps

1. **Find the producer** of the value and its most precise type.
2. **Use what the compiler knows.** If TypeScript infers it, consume it. Don't
   restate the shape, cast it, wrap it in a checker, or annotate callback
   parameters that already get contextual types.
3. **Derive a name when you need one.** Use `typeof`, `ReturnType`, `Awaited`,
   or indexed access. Prefer a library's exported type over `ReturnType` when
   that type is the real contract. Never hand-copy a shape.
4. **Never write `as Type`.** It checks and changes nothing at runtime. It
   tells the compiler to believe you over its evidence and moves the error
   downstream. This covers `as unknown as Foo` and `<Foo>value`. Fix the
   producer, narrow with control flow, or parse at the boundary instead.
5. **`as const` is allowed.** It works the other way: it stops literals from
   widening and makes objects readonly and arrays readonly tuples, all from
   the value itself. It validates nothing and must never become `as User`.
6. **Check without widening.** To make a literal meet a contract and keep its
   precise type, use `satisfies`. Add `as const` when you need both.
7. **Parse untrusted input once, at the entrypoint.** An annotation does not
   make runtime data safe. When raw data crosses a trust boundary and no
   upstream parser already guarantees it at runtime, accept it as `unknown`,
   parse it there with one Zod schema, and derive types with `z.infer`,
   `z.input`, or `z.output`. Never carry raw input inward to parse later at a
   use site. Use `safeParse` when the entrypoint must turn failure into a
   response, and translate the error at that same entrypoint.
8. **Trust the parsed value downstream.** Services, repositories, and domain
   code never re-check its shape.
9. **Write no type-checking functions.** No `isFoo`, `checkFoo`,
   `validateFoo`, or `assertFoo` meant to persuade TypeScript. Narrow a known
   union inline, usually on a discriminant field.

## Reject

- A Zod schema for data a trusted producer already types, or a framework
  already parses. Reuse its result.
- An interface that mirrors a generated client, schema, ORM model, or
  function result.
- Any `as Type`. Also reject a blanket `as` ban that catches `as const`.
- `isFoo(value): value is Foo` built from property checks. TypeScript trusts
  the predicate without proof, so a wrong one corrupts the false branch too.
- `asserts value is Foo` used to silence doubt.
- Re-validating parsed input anywhere past the entrypoint.
- Boundary validation that returns `boolean` and keeps the weak type.

## Distinctions

- **Annotation is not assertion.** An annotation asks the compiler to check a
  value against a contract. Use it for exported contracts, recursive types,
  overloads, or APIs inference can't express. Skip ones that only repeat
  what is already inferred. Explicit public contracts and inference do not
  conflict; schema-owned types and parse-once satisfy both.
- **Zod is a runtime parser for trust boundaries,** not the default type
  system. Inside typed code, TypeScript is the source of truth.
- **A static type is not a runtime guarantee.** A generated client type
  describes a compile-time contract; it does not validate bytes. Add Zod only
  when this app owns the untrusted boundary and no upstream parser already
  gives the runtime guarantee. If one does, reuse it rather than parse twice.
- **Business rules are not type checks.** `canPublish(article, actor)` returns
  a boolean. It claims `article is PublishableArticle` only when that relation
  is total and truly needed.

Code examples for each rule: [references/examples.md](references/examples.md).

When reviewing, trace every new type, schema, cast, and predicate to its
producer and apply the steps above. Then run the repo's formatter, tests, and
type check.

**The test:** Could TypeScript infer this from an argument, callback, return
value, or generic? Is this named type derived from its owner? Would
`satisfies` keep more than this annotation? Is this `as` a value-derived
`as const` or a claim? Is this a real trust boundary or already-typed data?
Does the parser return a stronger value or only a boolean? After the
boundary, can every shape check go? If any answer points the wrong way, fix
the flow, not the symptom.
