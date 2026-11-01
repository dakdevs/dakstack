---
name: principle-avoid-tautological-tests
description: Rejects tests that pass by construction and requires every test to have an independent source for its expected value and a credible way to fail. Use when writing or reviewing automated tests, regression tests, expected values, fixtures, mocks, snapshots, property tests, or tests added for coverage.
---

# Avoid Tautological Tests

Every test needs an independent oracle and a credible way to fail. A test true
by construction does harm: it reports confidence it never earned.

## Terms

- **Oracle:** where the expected result comes from.
- **Independent oracle:** an expected result worked out without the code under
  test: a spec, worked example, invariant, protocol, approved artifact, or
  outside reference.
- **Tautological test:** its assertion restates something the test itself
  made true: the actual result, the fixture, or the mock's setup.
- **Oracle-coupled test:** its expected side runs or copies the production
  logic closely enough to share its bugs. Not strictly a tautology, but just
  as falsely reassuring.
- **Common-mode failure:** code and oracle make the same mistake, so the test
  stays green. A warning sign, not the definition of tautology.
- **Defect-sensitive:** fails when a plausible bug is put into the behavior
  it claims to protect.
- **Observable behavior:** output, state change, emitted event, persisted
  effect, or required interaction visible at the supported boundary.

Independence is about how a value was derived, not which file it lives in.
Code and test should share the spec. They must not share executable logic, an
unchecked observation, or a circular derivation. Logic copied into a test file
is still not independent. A short calculation in a test is fine when it
directly states a separately established rule.

## Steps

1. **State the behavior** you protect, as observable effects, not steps.
2. **Name a plausible bug** the test should catch.
3. **Name the oracle** for every expected value.
4. **Trace both sides.** Sharing the spec is good. Sharing the subject's
   execution, a production helper, copied logic, input mutated after the run,
   the mock's response path, or unreviewed generated output is not.
5. **Pick discriminating inputs** that separate right from the plausible bug,
   especially boundaries and negative cases.
6. **Prefer literals.** A small table of input and expected output often
   states the rule more plainly than recomputing it.
7. **Prove it can fail.** For a regression, capture the test failing on the
   buggy code, then the passing run after the fix. Otherwise mutate or
   perturb the code briefly when practical.
8. **Delete useless assertions:** ones that check setup, the test framework,
   or a value the test assigned without running owned behavior.

**Fast check:** If the code were wrong in the most likely way, could the
expected side be wrong the same way? If yes, redesign the oracle before adding
assertions.

## What to do

| Situation                                          | Action                                                       |
| -------------------------------------------------- | ------------------------------------------------------------ |
| Expected value calls the function under test       | Replace with an independent value                            |
| Test re-implements the production algorithm        | Use worked examples, invariants, or an independent reference |
| Assertion only repeats fixture or mock setup       | Delete it, or run owned behavior between arrange and assert  |
| Expected output built with a production helper     | Build it without that helper                                 |
| "Regression" test passes on the buggy version      | It does not guard that bug; strengthen it before claiming so |
| The interaction is the contract                    | Assert the meaningful command, destination, and count        |
| Snapshot of reviewed observable output             | Keep it if every change gets a real semantic review          |
| Property test of independent invariants            | Keep it; invariants are valid oracles                        |
| Simple independent reference checks optimized code | Fine, if the two cannot fail the same way                    |
| Test only runs code for coverage                   | Add a behavioral oracle or delete it                         |

## Distinctions

- **Simple is not tautological.** A literal can discriminate sharply.
- **Implementation-coupled is not tautological.** A private-state check may
  catch bugs but is brittle; usually swap it for an observable one
  (read [test behavior](../principle-test-behavior-not-implementation/SKILL.md) directly).
- **Weak is not always tautological.** A smoke test, assertion-free test, or
  happy-path-only test can be inadequate without being self-confirming.
- **Computed expectations, mocks, snapshots, and references are not banned.**
  Each is valid when its oracle is independently justified. Asserting a mock's
  configured return is tautological; asserting a required outbound call can be
  valuable. A snapshot is an oracle only when someone compares it to an outside
  contract; approving current output blindly makes it self-confirming. A
  second function is not independent unless it was reasoned separately.
- **Testing language or framework guarantees is usually low value,** unless an
  integration or regression shows the guarantee is uncertain in context.

Code for harmful and good patterns: [references/patterns.md](references/patterns.md).

When reviewing, map each assertion to its behavior and oracle, apply the
steps above, add missing state-transition cases, then run the focused test
and the relevant suite.

**The test:** What bug does this catch? Where did the expected value come
from? Would one bug hit both sides? Does it observe owned behavior or replay
setup? With a mock, is it the app's contract or the mock's configuration?
Would a behavior-preserving refactor keep it meaningful? Can a small mutation
survive while it stays green?
