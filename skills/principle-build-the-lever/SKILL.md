---
name: principle-build-the-lever
description: Builds the smallest tool - a codemod, script, generator, rerunnable check, or shared delegate skill - that does or proves the work, when that tool makes the work more repeatable or more verifiable than existing tools and tests. Use when facing non-trivial edits, migrations, analyses, or checks, or before fanning repetitive work out to subagents.
---

# Build the Lever

A lever is a small tool that does the work or proves it: a codemod, a
script, a generator, a query, a rerunnable check, or a skill your subagents
follow. Build one when it helps. Do not build one by reflex.

**Why:** A lever pays off in two ways. Throughput: it applies the change the
same way every time and reruns for free. Confidence: a reviewer can read one
artifact and rerun it. Hand edits can only be rechecked by redoing them. A
deterministic script turns "trust me" into "run this".

## When to build one

Build a new lever only when it makes the work more repeatable, or verifies it
more strongly than the tools and tests that already exist. Otherwise use the
existing ones. Being non-trivial does not, by itself, demand a new file. The
bar is benefit, not repetition: a one-off still earns a lever when the lever
is what makes the work checkable.

## How

- Do the first unit by hand to learn the recipe. Then build the tool and
  prove it by rerunning it on that unit and diffing against your hand result.
- Make it safe to rerun. A reviewer will rerun it.
- Pick the fitting shape: a codemod or script for edits, a generator for
  repetitive files, a dump into SQLite and a query for analysis, a rerunnable
  check for verification.
- Build the smallest lever that does or proves the job, never a framework
  (`principle-laziness-protocol`). Prove its result before relying on it.
- Prefer a deterministic lever to fan-out. If one pass can process every
  unit, run it yourself instead of sending delegates to hand-apply it.
- When you do fan out, write the lever as a skill every delegate reads: the
  recipe, the verification contract, and the do-not-touch fences in one
  place. Each delegate then inherits the same hardened version instead of a
  re-explained prompt that drifts. Keep that skill outside the delegates'
  write scope so none can quietly change the contract.

## Keeping it

- Keep a lever beyond scratch only when something durable will use it again,
  such as a later run, CI, or a reviewer, and you are allowed to write it
  there.
- Committing or publishing it needs its own permission.

Making a recurring instruction into a lasting guardrail is
`principle-encode-lessons-in-structure`. Scripting the final check is covered
in `principle-prove-it-works`.

**The test:** If you claim this principle, can you name the lever, what it
made repeatable or provable that existing tools could not, and the run that
proved it? If not, either use the existing tools or build the lever.
