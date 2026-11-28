---
name: dak-file-scoped-lint
description: Enforce narrow file contracts through the project's lint command and CI.
---

# File-scoped lint

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
