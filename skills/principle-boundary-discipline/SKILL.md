---
name: principle-boundary-discipline
description: Puts validation, type narrowing, and error handling at system boundaries, trusts typed data inside, and keeps business logic in pure functions behind a thin shell. Use when wiring validation, error handling, config loading, CLI or network input, external API calls, or framework adapters.
---

# Boundary Discipline

Guard the edges. Trust the inside. A **boundary** is where data enters your
system from outside it: CLI args, config files, env vars, network requests,
external API responses, files, queue messages.

Checks scattered through the code are noisy, repeat each other, and make the
code look safer than it is. Check once at the edge. Keep logic out of
framework wiring so you can test it without the framework.

## The rule

- **At a boundary:** parse, return errors, and handle failure defensively.
- **Inside:** pass typed data, propagate errors, and never re-validate.
  Trust the types.

## Validation and errors

- Parse untrusted input once, at the entrypoint, and send typed results
  inward. Never store raw input to parse later at the place it is used.
- Never carry unparsed external input into domain logic, and never label it
  as trusted typed data before it is parsed.
- Parse config when it is loaded, not inside business logic.
- If an upstream parser already guarantees the data at runtime, reuse that
  result. Don't add a second schema or parse. A static type alone is not a
  runtime guarantee (see `principle-preserve-type-flow`).
- Drop nil and shape checks deep in call chains when the boundary already
  checked.

## Code layout

- Business logic lives in pure functions with no framework imports. A
  **pure function** returns a result from its inputs alone and changes
  nothing outside itself.
- The shell (handlers, adapters, CLI entry) is thin and mechanical: read
  input, parse it, call the pure core, write output.
- Parsing: raw bytes in, typed state out.
- Prompt building: structured state in, string out.
- Scoring and assessment: state in, result out.

**The test:**

- Is this data crossing a system boundary right now? If not, the check is
  redundant. Delete it.
- Could this be a pure function the shell just calls? If yes, extract it.
