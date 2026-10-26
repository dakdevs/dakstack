---
name: best-practices
description: Researches current, version-specific documentation and the codebase's own conventions before writing code, then picks an approach, states it with sources, and carries it out. Use when the user says "best practice", "do it right", "research first", "what's the proper way", or "is this best practice?", or when a task involves an unfamiliar library, a migration, a complex integration, or any change that is costly to get wrong.
---

# Best Practices

What you remember about a library may be a year or more out of date. APIs
change, options get renamed, and defaults move. Check the current truth before
you write code, then act on it.

## 1. Name what you are dealing with

- List the libraries, frameworks, and services involved.
- Read their installed versions from the manifest and lockfile
  (`package.json`, `bun.lock`, `Cargo.toml`, `go.mod`, and so on). Research
  those versions, not the newest.
- Name the kind of task: new feature, migration, config, integration, refactor.

## 2. Read the current docs

- Prefer Context7 for version-matched library docs. Otherwise fetch the
  official documentation site. Treat blog posts and answers on forums as
  leads to verify, not as sources.
- Find the recommended approach for this use case, the API reference for the
  exact calls you will make, any migration guide between versions, and the
  config reference if config is involved.
- Never take an API signature, option name, or method from memory.

## 3. Read the codebase

- Search for existing uses of the same library or pattern and follow them.
- Find related tests, configs, and similar problems already solved.
- Note what would need to change alongside your edit.

## 4. Look for pitfalls

Search for what commonly goes wrong with this task: breaking changes between
versions, misconfiguration, deprecations, performance traps, and security
issues.

For tasks spanning several technologies, research them in parallel with
subagents (one per technology, one for the codebase) and combine the results.

## 5. Resolve conflicts

When sources disagree:

- Official docs decide API usage, config format, and signatures.
- The codebase decides style, structure, and architecture.
- Well-supported community practice decides performance, security, and edge
  cases the docs do not cover.
- If a real conflict remains and the choice matters, ask the user.

## 6. Choose and proceed

Pick the approach and state it briefly: the technologies and versions, the
recommended approach, the codebase conventions you will follow, the pitfalls
you will avoid, the files you will change, how you will verify it, and links to
your sources. Then do the work. Do not wait for approval of routine research or
plans.

Ask the user first only when:

- the goal is ambiguous in a way that changes the result,
- the change is risky or hard to reverse, or
- sources contradict each other and nothing above settles it.

Keep the change to what the task needs (`principle-required-changes-only`).
Research may surface other problems; report them as recommendations instead of
fixing them unasked.

## 7. Check the result

After implementing, confirm that the code matches the current docs, follows the
conventions you found, and avoids the pitfalls you listed. Verify it the way
you said you would, and report what you checked.

## Stop and research if you think

- "I know how this API works" without having read the current docs.
- "This is too small to look up" or "it's a one-liner".
- "I'll try it and see" or "I'll check the docs afterward".

Checking after writing invites confirmation bias. If the docs hold nothing
new, the research is quick. Do it anyway.
