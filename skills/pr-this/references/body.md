# PR body

Write `## Why` first. Every other section exists to support it. Readers are
engineers: a reviewer should know what is wrong and why this fixes it within
about 15 seconds.

If the repo has a PR template, its structure wins. Map these sections onto it.

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
