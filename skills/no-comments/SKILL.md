---
name: no-comments
description: Runs a dedicated Grok 4.7 comment reviewer on a finished PR and routes findings through independent validation before cleanup. Use when the user invokes "$no-comments", requests comment cleanup, or a shipping workflow reaches its post-PR review stage.
---

# No comments

Use [Comment Sicko](../kitchen-mode/agents/comment-sicko.md) as its own Grok
4.7 agent. It investigates unnecessary comments and the workarounds they
conceal. It reports findings; the main thread owns changes.

## Scope and timing

Use the caller's files within the completed PR diff. Pin base/head and wait
until implementation, tests, commits, proof, and PR publication are complete.
This is a post-PR review, never a pre-commit editing agent. If the user
explicitly requests local-only cleanup, honor that scope and report that
the PR review gate has not run.

## Run

1. Discover provider support and launch the bundled prompt on Grok 4.7 with
   scope, SHAs, decisions, checks, and comment authorization. If unavailable,
   report the blocked role; do not substitute a model without approval.
2. Have it post distinct evidence-backed findings using
   [the reviewer contract](../kitchen-mode/agents/reviewer-agent.md), then return
   comment/thread links to the main thread. When part of `bar`, use its one
   dedicated comment reviewer rather than launching a duplicate.
3. Validate every finding with `replicate-issue` through a fresh independent
   validator. Reject unsupported deletions, scope escapes, and changes that
   remove legal, contract, or machine-significant comments.
4. Apply confirmed in-scope fixes at their cause. Keep constraints visible
   until a type, test, runtime check, or lint can enforce them. Ask the user
   through the main thread when encoding requires a new product decision.
5. Verify and commit each complete fix, push, refresh `pr-proof`, reply with
   evidence, and resolve only validated outcomes. In `bar`, join peer challenge
   and re-run the full comment audit on every new review round; all required
   reviewers must agree on the same current base/head. Standalone cleanup
   also requires a fresh review of the new head after fixes.

Report proposed versus actual deletions, protected comments, validated
refactors, thread dispositions, checks, and unresolved constraints. A clean
comment pass cannot stand in for correctness or maintainability review.
