---
name: principle-encode-lessons-in-structure
description: Turns recurring corrections into mechanisms such as types, lint rules, metadata flags, runtime checks, or scripts, instead of adding more written instructions. Use when you catch yourself writing the same instruction a second time, see the same correction recur, or handle an error, human correction, or surprising outcome.
---

# Encode Lessons in Structure

Written instructions fail quietly. The reader has to notice them, remember
them, and comply. A mechanism enforces the rule without anyone's
cooperation. Treat every error, correction, and surprise as a signal: capture
it, route it, and close the loop.

## When you write the same instruction twice

1. Ask whether it can be a lint rule, a metadata flag, a runtime check, or a
   script.
2. If yes, build it and delete the instruction.
3. If no, because it truly needs judgment, make the instruction more
   prominent and add an example of the failure it prevents.

## Pick the strongest rung

When several mechanisms would work, use the strongest one available, in
this order:

1. An unrepresentable state: the bad case cannot compile.
2. A lint rule or banned API that fails CI.
3. A canonical helper everyone calls.
4. A runtime check.

Agents copy whatever the surrounding code already does, so a weak guard
becomes the template for the next change.

**Do not paper over symptoms.** If a structural fix exists, use only that.
The instruction is the symptom.

## The feedback loop

- **Capture every correction.** When the user steps in or a test fails,
  decide whether it is a one-off or a pattern.
- **Route it to the right layer.** A one-off goes in a note. A recurring fix
  becomes a skill or a lint rule. A systemic issue becomes a principle.
- **Close the loop.** Apply the fix now if it is in scope. Otherwise create a
  concrete todo or recommendation. Changing shared instructions or config
  needs the user's permission.

## Failure shapes

- **Acknowledged, not recorded.** "I'll keep that in mind" does not persist.
- **Recorded, not routed.** A note saying a lint rule should exist is wasted
  until someone builds the rule.
- **Fixed, not generalized.** One instance fixed while the pattern that
  produced it stays.

**The test:** Would the same mistake fail a build or check tomorrow, or does
preventing it still depend on someone reading a sentence?
