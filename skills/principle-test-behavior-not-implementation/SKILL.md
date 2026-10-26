---
name: principle-test-behavior-not-implementation
description: Makes each test assert what the code's users can observe, so it fails when that behavior breaks and keeps passing when only the internals change. Use when writing, changing, or deciding whether to keep a test.
---

# Test Behavior, Not Implementation

A test claims something about what the code does for its users: a caller, an
end user, or another service.

- **Behavior** is what those users can observe through the interface they
  use: return values, errors, state they can read back, and effects outside
  the code, such as a request sent, a row written, or a message emitted.
- **Implementation** is what they can't see: private helpers, internal call
  order, intermediate data, and which internal piece did the work.

## Two imagined edits

Judge every test against both.

1. **Break the behavior.** Make the code return a wrong value, skip an
   effect, or do it twice. If the test still passes, it proves nothing.
   Usual causes: an assertion looser than the contract, an expected value
   computed by the code under test, a restated constant or prompt string
   whose consuming code never runs, or an assertion on data the test built
   itself.
2. **Change the internals.** Keep every observable result and restructure
   the code underneath. If the test now fails, it is pinned to the
   implementation. It breaks on every refactor and still catches no bug.

Keep tests that catch edit 1 and survive edit 2. Rewrite or delete the rest.

## Writing one that does both

- Drive the code through its users' interface with a concrete input.
- Take the expected value from the requirement, not from a run of the code
  (`principle-avoid-tautological-tests`).
- Assert exactly what the contract promises. No less, no more.

## The contract decides

The contract, not the shape of the assertion, decides what counts.

- If the promise is "an empty cart never charges", asserting the payment
  client got no call is behavior. Pair it with a case where the charge does
  happen, to show the test can see a call.
- The payload a mocked external service receives is behavior; that service
  observes it. A call to an internal helper is implementation; no user sees it.
- An empty list is the exact answer when nothing matches. It is a hollow
  check when the test only needs some result.
- An exact error message pins wording no caller reads. The error type
  callers branch on is the contract.
- A test may pin an invariant instead of a call, such as a key that must
  exist in two tables, or a compile-time type check. The invariant is the
  behavior.

**The test:** Would this fail if the behavior broke? Would it still pass if
only the internals changed? Both answers must be yes.
