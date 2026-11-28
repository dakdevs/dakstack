---
name: verify-effect
description: Test or review Effect TypeScript for functional composition, typed failures, layer wiring, cancellation, resource lifetime, and business behavior.
---

# Verify Effect

Read [Effect Boundary](../principle-effect-boundary/SKILL.md) and
[Test Behavior](../principle-test-behavior-not-implementation/SKILL.md).
Verify against the affected workspace's installed Effect version and test runner.

- Trace the changed flow from its public entry point to the Effect runner.
  Check application-owned definitions for function style, then follow the
  service keys, layer graph, and resource owners. Typecheck the real entry
  point against its live layer as well as the tests.
- Test the same public operation with test layers in place of external IO.
  Assert outcomes and expected tagged failures. Cover the adapter's actual
  mapping when external contracts, cancellation, or cleanup change.
- For changed scheduling and retry behavior, drive the installed version's
  test clock. For changed cancellation and scoped resources, interrupt the
  work and observe that cancellation propagates and finalizers run. For
  changed performance-sensitive work, run applicable hot-path checks and
  measure the real workload.
- Run the repository's required checks and report observed results and limits.
  In shipping review, include these checks in the existing focused pass and
  recheck affected paths after fixes.
