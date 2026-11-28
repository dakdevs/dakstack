---
name: dak-style
description: Build and review readable application workflows with validation at boundaries, producer-owned types, private helpers, and module-owned queries. Use when asked to apply Dak Style to a feature, fix, refactor, or review.
---

# Dak Style

Always read and apply [Boundary Discipline](../principle-boundary-discipline/SKILL.md)
and [Preserve Type Flow](../principle-preserve-type-flow/SKILL.md) before planning,
implementing, or reviewing a change.

Read the existing code to understand behavior and constraints. Where the
repository's patterns differ from these rules, use Dak Style for the flow you
touch, including existing code in that flow. Keep the rest of the application
outside the refactor and honor explicit task and repository instructions.

## Validate at the boundary and preserve type flow

- Parse untrusted input once where it enters. Reuse upstream runtime validation
  when it already guarantees the input. Pass typed domain values downstream and
  keep business rules in pure functions where possible.
- Let types flow from their producers through inference or types derived from
  the producer. Fix weak types where they originate and narrow known unions
  with control flow. Keep transport and storage representations inside their
  adapters.
- Never introduce `any`, type assertions such as `as SomeType`, or unchecked
  predicates to bypass type safety. Use `satisfies` to check a contract while
  preserving inference. Use `as const` when literal precision is needed.

## Make workflows read as steps

- Write high-level functions as an ordered sequence of named domain operations.
  A reader should be able to follow the flow without opening the callees.
- Keep meaningful branches, early exits, and simple expressions visible. Extract
  the detail into a named operation when it starts to obscure the steps.
- Preserve performance and correctness. Keep batching, transaction boundaries,
  and existing concurrency intact. Avoid extra database or network calls just
  to make a flow read as steps.

## Keep helpers close to their callers

- Keep one-off helpers private and local to the module. Export only operations
  actually needed by callers outside the module.
- Let similar code remain local while its requirements can evolve independently.
  Move a non-database helper to `lib` or `utils` once real callers need the
  same stable behavior and should inherit the same changes.

## Keep database queries with the use case

- Put each database operation in its own named function in the module that uses
  it. Shape the query for that use case, including the fields, filters, and
  transaction context it needs.
- Share query functions only within their owning module. Modules can share the
  database client, schema, and transaction infrastructure, and can call another
  module's public domain operation. The query function itself stays private.
- When a touched flow uses a centralized query or generic repository, move that
  flow to a module-owned query function. Preserve behavior and leave other callers
  outside the change.

## Enforce specific file contracts with lint

When a set of files needs a stricter, mechanically checkable contract, enforce
it through the project's linter. Name what those files are allowed to do and
where excluded work belongs. Choose whatever suffix fits the role, or match
specific paths when the contract belongs to individual files.

- Scope the rule to the exact file pattern and keep the baseline lint rules.
  Use existing rule overrides where possible. For new syntax checks, use the
  linter's parsed syntax tree and give actionable diagnostics.
- Make violations fail the normal lint command and its CI check. Test through
  the real configuration with allowed and rejected code in matching files and
  the same restricted construct in an unmatched file.
- Use behavioral tests or measurement for guarantees the linter cannot prove.

For example, [dak.build applies an allocation rule to `**/*.hot.ts`](https://github.com/dak-engineering/dak.build/blob/main/docs/hot-paths.md).
It catches iterator loops and other allocation-prone constructs in designated
kernels. Choose the file pattern and rules that express the contract of the
code you are building.

During review, trace types from their producers through each touched flow.
Check the validation boundary, helper exports, database calls, and any scoped
lint contract. Flag departures within the touched flow and verify that the
reshaping preserves behavior and performance.
