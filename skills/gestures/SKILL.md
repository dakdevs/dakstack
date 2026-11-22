---
name: gestures
description: Build direct manipulation that follows input and can be interrupted. Use for implementing or fixing drag, swipe, hold and sheet interactions.
---

# Gestures

Start with the project's accessible primitive. Separate tracking from
release: follow input one-to-one during tracking, then choose a settle or
dismiss target from displacement and release velocity. Resume from the
current rendered position when re-grabbed. Handle cancellation and
competing scroll axes; don't disable normal scrolling globally. Preserve
keyboard alternatives, focus management and reduced-motion behavior.

Observe touch and pointer behavior, slow and fast releases, interrupted
transitions, and relevant cancellation and scrolling. Run
[break UI](../break-ui/SKILL.md) on changed interactions; report if a
required touch device is unavailable.
