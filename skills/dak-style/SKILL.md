---
name: dak-style
description: Apply the full Dak Style skill set when building or reviewing an application flow. Loads package priorities, boundary validation and type flow, local function inputs, stepwise workflows, private helpers, module-owned queries, and scoped lint.
---

# Dak Style

Read the existing code to understand behavior and constraints. Apply these
skills to the flow you touch, including existing code in that flow. Honor
explicit task and repository instructions and keep the refactor within scope.

Read each skill before planning and apply its rules wherever relevant through
implementation, review, and fixes. Each skill can also be invoked on its own.

- [Package priorities](../dak-package-priorities/SKILL.md)
- [Boundary validation and type flow](../dak-type-flow/SKILL.md)
- [Function input types](../dak-function-inputs/SKILL.md)
- [Stepwise workflows](../dak-stepwise-workflows/SKILL.md)
- [Local helpers](../dak-local-helpers/SKILL.md)
- [Module-owned database queries](../dak-module-queries/SKILL.md)
- [File-scoped lint](../dak-file-scoped-lint/SKILL.md)

When the codebase uses Effect or the task introduces it, also apply
[Build with Effect](../build-with-effect/SKILL.md) if the workflow has not
already loaded it.
