---
name: animation-performance
description: Diagnose and verify the cause of dropped frames. Use for observed jank, dropped frames or animation performance work.
---

# Animation Performance

Reproduce the specific stutter and record the environment, input and load.
Profile that interval in browser tooling; identify whether style, layout,
paint, or main-thread contention owns the expensive frames. Compare the
same interaction before and after at the relevant display refresh rate.
Don't promise compositor acceleration from source inspection alone.

Prefer compositor-friendly properties for predetermined motion, and CSS or
WAAPI when they meet the interaction. For dynamic motion, isolate frame
updates from framework state; avoid alternating layout reads and writes.
Don't blanket-promote elements or add a dependency without measurements.
Record what improved, what was measured, and what remains unknown. For
authorized UI fixes, run [break UI](../break-ui/SKILL.md) on the result.
