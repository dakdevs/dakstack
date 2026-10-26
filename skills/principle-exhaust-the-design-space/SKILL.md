---
name: principle-exhaust-the-design-space
description: Builds two or three competing prototypes or sketches of an unprecedented interaction or architecture and compares them side by side before committing to one. Use when a novel UI interaction, architectural choice, or product decision has no precedent in the codebase and the right answer is not obvious.
---

# Exhaust the Design Space

Building the wrong thing costs more than exploring three options. When there
is no precedent to copy, make the alternatives concrete before you commit.

## The rule

If the right answer is not obvious, build two or three competing prototypes
or sketches. Put them side by side and compare. Then commit to one.

Make them real enough to judge. For UI, that means something you can click
or watch. For architecture, it means enough code or a sketch that shows how
each option handles the hard case.

## When it applies

- A new UI interaction with no prior art in the codebase.
- An architectural choice with more than one viable approach.
- A product decision where the experience depends on feel, not logic.

## When it does not

- Mechanical work that follows an established pattern.
- Bug fixes or refactors with a clear target state.
- Changes where the constraints leave only one viable approach.

**The test:** Before you commit, can you show the options you rejected and
say why the chosen one beat them? If you only ever built one, you did not
explore.
