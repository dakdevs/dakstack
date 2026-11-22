---
name: review-animations
description: Review implemented motion against concrete interaction standards. Use when asked to review existing or changed motion, not for unrelated UI.
---

# Review Animations

Read the [standards](references/standards.md). Inspect actual triggers,
properties, durations, exits, reduced-motion behavior and rapid repetition;
run the changed interaction if available. Start with whether the animation
serves a purpose given its frequency. Check interruptibility, origin, press
feedback, focus, asymmetric timing, and evidence of dropped frames. For a
group entrance, use [choreograph](../choreograph/SKILL.md) as a reference.

Report file/line, observed or inferred issue, severity and the smallest
remedy. Prefer removing needless movement to retuning it. Separate missing
runtime evidence from verified findings. This is review-only; don't edit,
publish a review, or rerun an entire review panel.
