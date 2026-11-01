---
name: bar
description: Reviews a PR or diff with a matrix of reviewer delegates (one per review skill per model), relays findings between them, fixes through an Opus delegate, and re-reviews until every reviewer approves the same head. Use when the user says "pass the bar", "make sure it passes the bar", "review it with $thermo-nuclear-review ...", "1 sub-agent per model per skill", or "repeat until everyone is happy".
---

# Bar

The user does not want a review. They want the code to pass a bar, proven by
independent reviewers who all approve the same commit.

## Defaults

Use what the user names. Fill in only what they leave out.

- **Lenses:** `thermo-nuclear-review`, `thermo-nuclear-code-quality-review`,
  `principle-preserve-type-flow`, `principle-boundary-discipline`,
  `principle-avoid-tautological-tests`, `principle-laziness-protocol`.
  Add `principle-effect-boundary` when the diff touches Effect code,
  `principle-make-operations-idempotent` for syncs, retries, and lifecycle
  steps, and `best-practices` when the user asks "is this best practice?".
- **Reviewer models, all at medium reasoning:** Claude Opus 5.5, GPT-6.1 Sol,
  Grok 4.7. One reviewer per lens per model.
- **Fixer:** an Opus 5.5 execution delegate. Fix in the main thread only when
  the user says "in this thread".

If a named model is unavailable, say which cell of the matrix is missing and
ask before you substitute. Never swap in an "ultrafast" variant.

## Steps

1. **Pin the head.** Record the PR, branch, and exact head SHA. Every reviewer
   reviews that SHA and nothing else.
2. **Run the checks first.** Lint, typecheck, and the tests the repo's CI runs.
   A red check is a finding before any reviewer starts.
3. **Launch the matrix.** Each reviewer is read-only and gets: its one lens's
   full SKILL.md, the repo's AGENTS.md or CLAUDE.md rules, the task's scope,
   the diff, and the check results. It returns findings with file, line,
   severity, and whether the finding is in scope. If its lens does not apply,
   it says so instead of inventing findings. Batch launches under the
   harness's subagent cap and relaunch anything rejected.
4. **Collaborate.** Group duplicate findings. Send each reviewer the findings
   and disagreements that touch its lens, and ask it to confirm, dispute with
   evidence, or refine. Check contested findings against the code yourself.
   Do not count votes.
5. **Validate before fixing.** A finding is real only if you can point at the
   code that proves it. Drop pre-existing issues, out-of-scope redesigns, and
   fixes that would add tautological tests. List dropped findings with a
   one-line reason.
6. **Fix.** Hand the real findings, with evidence, to the fixer. The fixer
   applies `principle-fix-root-causes`. Never weaken a test, assertion,
   timeout, or budget to make a finding go away.
7. **Re-review.** Rerun the checks, then send the new diff to every reviewer
   whose lens the fix touches. Repeat from step 4 until no blocking finding
   remains. If the same finding survives two fix rounds, stop and show the
   user both sides.
8. **Hand off.** If the user asked to merge, continue with `ship`. Otherwise
   stop.

## Report

- The head SHA every reviewer approved.
- The matrix: lens by model, with each cell's final verdict.
- What was fixed, what was dropped and why, and any open disagreement.

Never write "everything passes except X." If X fails, the bar is not passed.
Say that plainly.
