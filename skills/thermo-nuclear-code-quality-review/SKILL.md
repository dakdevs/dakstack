---
name: thermo-nuclear-code-quality-review
description: Reviews a branch's changes with a very strict maintainability bar, hunting for structural regressions, missed simplifications, spaghetti branching, files pushed past 1,000 lines, leaky boundaries, and needless abstractions. Use when the user asks for a thermo-nuclear or thermonuclear code quality review, a deep code quality audit, or an especially harsh maintainability review.
---

# Thermo-Nuclear Code Quality Review

Audit the quality of the branch's changes. Ask how the same behavior could be
built simpler, smaller, more modular, and easier to read. Be thorough:
measure twice, cut once. Be ambitious. Hunt for "code judo": a restructuring
that keeps behavior identical but uses the existing architecture better, so
whole branches, helpers, modes, or layers vanish.

This is a review. It never authorizes edits; report findings, do not fix
them. Report problems in code the branch adds or changes. When the best
remedy reaches past the task's scope, such as restructuring untouched
modules, report it as an out-of-scope recommendation, not a required edit.

While reviewing, read [references/review-guide.md](references/review-guide.md)
for the questions to ask of each change, what to flag hard, preferred
remedies, and example phrasing.

## Rules

0. **Push for structural simplification.** "A bit cleaner" is not enough.
   Find the reframing that deletes complexity instead of moving it, the
   version that feels inevitable in hindsight.
1. **Guard 1,000 lines.** A diff that takes a file from under 1,000 lines to
   over is a strong smell. Ask whether to decompose first into helpers,
   subcomponents, or modules. Waive it only for a compelling structural
   reason, and only if the file stays clearly organized.
2. **Stop spaghetti growth.** Distrust new ad-hoc conditionals, scattered
   special cases, and one-off branches in unrelated flows. "Weird ifs in
   random places" are a design problem, not a nit. Move the logic into its
   own abstraction, helper, state machine, policy object, or module. Flag
   changes that make nearby code harder to reason about, even if they work.
3. **Clean the design, not just the behavior.** If the same behavior can have
   a meaningfully cleaner structure, ask for it. Never rubber-stamp "it
   works." Prefer removing moving parts over spreading complexity around.
4. **Prefer direct, boring code.** Brittle, ad-hoc, or magic behavior is a
   quality problem. Distrust generic machinery that hides simple data-shape
   assumptions. Flag thin abstractions, identity wrappers, and pass-through
   helpers that add indirection without clarity.
5. **Keep types and boundaries clean.** Question needless optionality,
   `unknown`, `any`, and casts where a clear typed boundary could exist.
   Prefer explicit typed models and shared contracts over loose objects.
   Parse untrusted input once at its entrypoint. If a silent fallback papers
   over an unclear invariant, ask for an explicit boundary.
6. **Keep logic in its canonical layer.** Flag feature logic leaking into
   shared paths and implementation details leaking through APIs. Reuse
   canonical helpers over bespoke near-duplicates. Move code to the package,
   service, or module that owns the concept.
7. **Flag needless sequencing and half-applied updates.** Ask why independent
   work runs serially. Push for an atomic shape when related updates can
   leave state half-applied. Skip micro-optimizations; flag orchestration
   that makes the code brittle.

## Tone

Be direct, serious, and demanding, never rude. Do not soften a major
maintainability problem into a mild suggestion. Say plainly when code makes
the codebase messier or misses a dramatic simplification. Do not settle for
"maybe rename this" when the problem is structural, or for a tidier version
of a messy idea when a much simpler idea is plausible.

## Report

Give file, line, severity, and in scope or not for each finding. Order by:
(1) structural regressions; (2) missed dramatic simplifications; (3) added
spaghetti or branching; (4) boundary, abstraction, or type-contract problems
that hurt reasoning; (5) file size and decomposition; (6) modularity and
abstraction; (7) legibility and maintainability. Prefer a few high-conviction
findings over many cosmetic ones; skip nits while structural problems remain.

## Approval bar

Correct behavior alone does not earn approval. Approve only when the diff has
no clear structural regression; no visible, missed path to a dramatically
simpler implementation; no unjustified file-size explosion; no spaghetti
growth from special-case branching; no hacky or magic abstraction that
obscures reasoning; no needless wrapper, cast, or optionality churn hiding
the design; no clear boundary leak or avoidable duplicate of a canonical
helper; and no missed obvious decomposition that would materially help.

Treat each of these as blocking unless the author clearly justifies it:

- It keeps lots of incidental complexity that a plausible code-judo move
  would delete.
- It takes a file from under 1,000 lines to over 1,000.
- It adds ad-hoc branching that tangles an existing flow.
- It solves a local problem by scattering feature checks through shared code.
- It adds a needless abstraction, wrapper, or cast-heavy contract.
- It duplicates an existing helper, or puts logic in the wrong layer when a
  clear canonical home exists.

When the bar is not met, give explicit, actionable feedback and push for a
cleaner decomposition.
