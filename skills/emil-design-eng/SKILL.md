---
name: emil-design-eng
description: Apply shared interaction defaults and route focused UI and motion work. Use when implementing UI or choosing a specialist for UI interactions, motion or polish.
---

# Emil Design Engineering

Use this as a lightweight implementation rubric. Preserve accepted product
decisions, design tokens, accessibility and accessible existing primitives.
Specialist skills are conditional; don't run them all for a UI change.

- Start with purpose and frequency. Motion should explain a change, preserve
  spatial context or give feedback. Keep frequent and keyboard-driven actions
  immediate. Choose the simplest transition that does the job.
- Make press feedback immediate and hover conditional on input capability.
  Preserve keyboard focus, support reduced motion and don't make motion a
  prerequisite for learning state or operating controls.
- Keep motion short and interruptible; let entries settle quickly and exits
  finish without delaying the next action. Animate around the trigger when it
  communicates origin. Prefer transform/opacity where they meet the design;
  measure before optimizing.

| Task                                           | Load                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| Name an effect; no code requested              | [animation vocabulary](../animation-vocabulary/SKILL.md)                 |
| Suggest where motion might help; read-only     | [find animation opportunities](../find-animation-opportunities/SKILL.md) |
| Critique existing motion                       | [review animations](../review-animations/SKILL.md)                       |
| Fix measured stutter or dropped frames         | [animation performance](../animation-performance/SKILL.md)               |
| Build one intentional effect                   | [animate](../animate/SKILL.md)                                           |
| Coordinate several moving elements             | [choreograph](../choreograph/SKILL.md)                                   |
| Remove or reduce needless motion               | [remove animations](../remove-animations/SKILL.md)                       |
| Build drag, swipe, sheet or hold               | [gestures](../gestures/SKILL.md)                                         |
| Fix mobile web interaction or browser behavior | [mobile native](../mobile-native/SKILL.md)                               |

A new responsive page without motion needs none of the motion skills.
After any authorized UI implementation, run [break UI](../break-ui/SKILL.md)
before calling the result verified. The router doesn't authorize edits,
delegation, package installation, publication, or merge.
