---
name: animate
description: Build or tune one purposeful interaction animation. Use for authorized implementation of a specific UI animation.
---

# Animate

Start with purpose and frequency; omit animation that doesn't help. Pick the
lightest mechanism that keeps the interaction interruptible. Prefer an
existing accessible component for drawers, toasts, menus and popovers.
Reuse timing tokens and use a short, quick-settling entry and a responsive
exit. Prefer transform/opacity where appropriate, avoid motion from zero
scale, and preserve focus and immediate press feedback. Handle reversal,
hover capability and reduced motion. Read applicable
[recipes](references/recipes.md); use [choreograph](../choreograph/SKILL.md)
when several elements form a single transition.

Observe the actual result under repeated input and state changes. Run
[break UI](../break-ui/SKILL.md) before calling the UI change verified.
