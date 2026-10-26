---
name: principle-experience-first
description: Resolves product, UX, and scope tradeoffs in favor of the experience of whoever uses the work, choosing fewer polished features over many rough ones. Use when implementation convenience conflicts with user experience, when deciding feature scope, or when weighing how an API, library, or UI will feel to its consumer.
---

# Experience First

The product is the experience. Every technical choice helps it or hurts
it. When what is easy to build conflicts with what delights the user, choose
delight.

- **Say no to a thousand things.** Every feature, control, and option must
  earn its place.
- **Ship less, ship better.** A polished product with three features beats a
  rough one with ten.
- **Prototype before committing.** Design choices are cheaper to test in
  throwaway HTML than in production code.
- **Sweat the details:** transitions, alignment, spacing, feedback, and
  error states.
- **Tighten the core loop.** Every feature serves the central workflow or
  gets out of its way.

## Who the user is

The user is whoever consumes the work. For a UI, that is the end user. For a
library or internal API, it is the colleague who imports it. The engineer who
maintains the code next is a user too. Weigh their experience the same way,
and explain impact from where they sit.

## Foundations serve the experience

Foundations exist for the experience, not the reverse.
`principle-foundational-thinking` decides the order of the work. This skill
decides its target.

**The test:** Describe the change from the user's seat in one sentence. If
the sentence is about what was convenient to build, rethink it.
