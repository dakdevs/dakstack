---
name: dak-local-helpers
description: Keep one-off helpers private and share stable behavior when callers need it.
---

# Local helpers

- Keep one-off helpers private and local to the module. Export only operations
  actually needed by callers outside the module.
- Let similar code remain local while its requirements can evolve independently.
  Move a non-database helper to `lib` or `utils` once real callers need the
  same stable behavior and should inherit the same changes.
