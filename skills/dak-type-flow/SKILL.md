---
name: dak-type-flow
description: Apply Dak Style boundary validation and preserve producer-owned types without unsafe assertions.
---

# Boundary validation and type flow

Read and apply [Boundary Discipline](../principle-boundary-discipline/SKILL.md)
and [Preserve Type Flow](../principle-preserve-type-flow/SKILL.md) when
planning, implementing, or reviewing a change.

- Parse untrusted input once where it enters. Reuse upstream runtime validation
  when it already guarantees the input. Pass typed domain values downstream and
  keep business rules in pure functions where possible.
- Let values retain their producer-inferred types through assignments, calls,
  and returns. Derive local types where inference needs a name. Fix weak types
  where they originate and narrow known unions with control flow. Keep
  transport and storage representations inside their adapters.
- Never introduce `any`, type assertions such as `as SomeType`, or unchecked
  predicates to bypass type safety. Use `satisfies` to check a contract while
  preserving inference. Use `as const` when literal precision is needed.
- Define local parameter shapes using [Function input types](../dak-function-inputs/SKILL.md).
  Use the compiler to check the values at the call site.
