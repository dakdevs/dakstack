---
name: dak-package-priorities
description: Choose Dak Style defaults for dates and times and for animation packages.
---

# Package priorities

Choose in this order for the code you are building.

| Use case        | First choice                 | When to use the alternative                                                                                                                                                                                                |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dates and times | Native JavaScript `Temporal` | Use [date-fns](https://date-fns.org/) if any supported runtime that executes the code lacks the native Temporal APIs it needs. Check the actual deployment and browser targets.                                            |
| Animation       | Motion (`motion`)            | Use Anime.js (`animejs`) for work that benefits from its specialized controls, such as SVG morphing, motion paths, or intricately timed sequences. Use Motion by default for gestures, layout, and enter/exit transitions. |
