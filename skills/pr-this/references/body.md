# PR body

Show only `## Proof` above the fold. Follow it with one collapsed disclosure
labeled `LLM Context`, containing all rationale and implementation context.
Keep proof, check results, limits, and inline visual evidence outside the
collapse so reviewers can inspect them immediately.

Use this layout. Replace placeholders with actual evidence and context; omit
optional context sections when they add nothing. Keep blank lines after the
summary and before the closing tag so GitHub renders Markdown inside it.
Never add the `open` attribute.

```md
## Proof

| State  | Revision            | Scenario and observed result | Evidence |
| ------ | ------------------- | ---------------------------- | -------- |
| Before | Pinned starting SHA | Original behavior            | Link     |
| After  | Current PR head SHA | Current behavior             | Link     |

Checks actually run, their scope, and limits. Inline visual evidence if relevant.

<details>
<summary>LLM Context</summary>

## Why

Problem, checkable evidence, and fix.

## Summary

What this delivers.

## What

- Concrete change.

## Who this helps

Affected audience and experience.

## Notes for reviewers

Tricky areas or decisions worth a second look, if any.

</details>
```

If the repo has a PR template, preserve its headings, order, and checkboxes
inside LLM Context in place of the default context sections below. Extract
proof and check results into the visible Proof section; reference that section
from any template proof section instead of duplicating it. This outer layout
takes precedence over the template's top-level structure.

## Proof

Required for every PR, including documentation, configuration, tests, and
internal work. Use `pr-proof` and keep this record visible before LLM Context:

| State  | Revision            | Scenario and observed result                          | Evidence                                                |
| ------ | ------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| Before | Pinned starting SHA | Original failure, missing capability, or contract gap | Capture, log, reproducer, or source permalink           |
| After  | Current PR head SHA | Same scenario after the completed change              | Fresh capture, actual check output, or source permalink |

Include checks actually run and their scope. Attach visual proof inline;
local-only paths are not accessible to a PR reviewer. For a skill rewrite,
source text proves the instruction changed; packaging tests prove the
resource ships; neither proves a model follows it. Label any behavioral
evaluation separately.

Any change invalidates the after record until it is refreshed. Keep useful
before evidence, replace affected after captures, and update the head and
coverage after fixes, rebases, amendments, or test edits.

## LLM Context

Everything after Proof belongs inside the single collapsed `<details>` block.
The following sections are the default context structure, unless a repository
template supplies one. Keep the Why tight enough to explain the problem and
fix within about 15 seconds after expansion.

## Why

Exactly three labeled blocks, about 8 rendered lines in total. Never merge
them into a paragraph and never drop the labels.

1. **Lede.** One bold sentence naming the product problem solved or prevented.
   Light technical terms are fine; file and function names are not. Cut any
   word that does no work.
2. **Evidence:** two to four one-line bullets. Each cites something checkable:
   a metric, a count, a date range, a ticket, an incident, a deprecation, or
   blocked work. An adjective is not evidence.
3. **Fix:** one sentence naming the mechanism and the result. Say plainly how
   behavior changes for users or callers, or say it does not change. Name a
   real tradeoff in a short clause.

Tone:

- Describe the behavior instead of judging it: "returns 500 on empty input",
  not "is broken".
- Prefer a number to an adjective.
- Use measured frequency words ("regularly", "consistently"), not "always".
- Grant what was reasonable about the old approach in a few words.
- Write "we", not "you". Skip "critical", "blocker", and "must merge" unless
  the evidence earns them.

Before finishing, check three things. Could a reviewer dispute any claim? Cite
it or cut it. Is there an obvious objection ("this can wait", "the workaround
is fine", "too big")? Answer it in a phrase. Would the original author feel
respected reading this?

Weak: "The auth middleware is broken and needs an urgent refactor."

Strong:

> **Users whose session expires see a blank screen instead of the sign-in
> page.**
>
> **Evidence:**
>
> - 14 support tickets in three weeks describe the blank screen.
> - The onboarding rollout is paused until sign-in works end to end.
> - No test covers the expired-session path on dashboard routes.
>
> **Fix:** Send expired sessions through the existing redirect helper and add a
> regression test. Signed-in users see no change.

## Summary

One or two plain sentences on what the PR delivers: what is now faster, safer,
simpler, or possible. No code names. Do not repeat the Why.

## What

One to three single-sentence bullets. When pointing at code says it faster than
prose, link it with a permalink:
`[descriptive text](https://github.com/<owner>/<repo>/blob/<sha>/<path>#L<a>-L<b>)`.

## Who this helps

Name the real audience and what changes for them, without inflating it.
"Users" is almost never specific enough: say which users, in what situation.
Other engineers, on-call staff, a downstream service, or the next person to
edit this code are all valid answers. Describe what the person experiences, not
what the code does. If the benefit is indirect or later ("unblocks X, which
enables Y"), say so. List separate groups separately.

## Diagram

Optional. See [diagrams.md](diagrams.md).

## Notes for reviewers

Optional. Include only for tricky areas, known limits, or decisions worth a
second look.

## Voice

Casual, direct, professional, like explaining it to a senior engineer. No
filler. The Why is tighter still: confident, specific, never accusatory.
