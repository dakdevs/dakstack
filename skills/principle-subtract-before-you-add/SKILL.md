---
name: principle-subtract-before-you-add
description: Orders work so dead weight, redundant validators, and empty references are removed before anything new is built, and keeps additions to what observed usage and the spec require. Use when sequencing an addition, refactor, or rewrite, or when tempted to add guards, parsers, or features the spec does not ask for.
---

# Subtract Before You Add

Adding to a complex system compounds its complexity. Removing first shrinks
the surface, exposes the essential structure, and often makes the next design
obvious. Default to subtraction.

## Scope

Remove only inside the scope you were given. Deleting code the task does not
touch needs an explicit cleanup request (`principle-required-changes-only`).
List anything else you would cut as a recommendation.

## Rules

- **Remove, then build.** Do the deletions first, so the addition lands on a
  smaller base and comes out smaller and less brittle.
- **Cut before you polish.** Reach the minimum first. Spend effort on
  quality only after that.
- **Design for observed usage.** Handle the cases that actually occur, not
  speculative edge cases.
- **No speculative guards.** Add no validator, parser, or guard beyond what
  the spec demands.
- **Watch for features that drag guards behind them.** Out-of-spec features
  such as persistence, retry on startup, and schema migration each need
  their own guards to defend their inputs. Skip the feature and you skip
  the guards.
- **Trim prompts too.** Remove redundant instructions and oversized
  templates.
- **Delete empty references.** If a reference adds nothing new, delete it.
  Do not leave a stub that points elsewhere.

**The test:** Did the diff remove something before it added something? For
each new guard or feature, can you point to the spec line or the observed
usage that requires it?
