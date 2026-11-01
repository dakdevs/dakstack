---
name: ship
description: Completes a task in working commits, publishes a PR with before/after proof, runs independent PR reviews and finding validation, then merges and confirms deployment. Use when the user says "ship it", "$ship", "get it merged", "force merge", or "fix the checks and merge". Invocation requests the review comments, replies, and resolutions in this workflow.
---

# Ship

Own the task through a merged PR and an observed working deploy. Run only
when the user requests shipping or merging. Use `ship-to-pr` to stop before
merge. Follow `principle-taste` and the repository's rules.

## Authorization

The workflow covers this task's commits, push, PR publication, review
comments, replies, and resolutions. Merge only under the user's merge grant.
A skill does not expand permission to production data, destructive actions,
other people's branches, or unrelated publication. Honor existing session
and repository rules for rebasing, force pushes, and administrator merges.

## Ordered workflow

1. **Plan and capture before.** Pin base/head, inspect existing user work,
   record product decisions and acceptance criteria, and start `pr-proof`.
   For bugs, use `replicate-issue` before implementation.
2. **Implement in logical commits.** Read and follow
   [sequence verifiable units](../principle-sequence-verifiable-units/SKILL.md). Each commit is one complete,
   working, testable block, including its tests and necessary migrations or
   callers. Run its checks before committing. Temporary breakage stays in
   the working tree, never a commit. Preserve unrelated user changes.
3. **Finish the entire task.** Run required lint, format, typecheck, build,
   unit and E2E checks; add/update tests for changed behavior. Inspect the
   complete diff. Fetch the base, resolve conflicts preserving both sides'
   intent, regenerate lockfiles, and rerun affected verification. Do not
   open the review phase with TODO implementation or uncommitted task work.
4. **Capture after and publish.** Refresh `pr-proof` against the complete
   committed head. Use `pr-this` to push and open/update the PR, including
   comparable before/after proof. Mark implementation complete and ready
   for review. A draft may exist earlier, but reviews cannot start until
   this step is complete.
5. **Review the published PR.** Run `bar`, including `no-comments` on its
   own Grok 4.7 agent. Reviewers intentionally scan applicable skill lenses,
   post actionable findings on the PR, and return thread IDs to the main
   thread. Reviewers challenge one another's reports. No reviewer edits code.
6. **Validate and address.** The main thread launches independent finding
   validators through `replicate-issue`, checks their evidence and product
   alignment, then owns each fix. Ask the user about unresolved intent;
   keep those findings open. Commit each verified fix, push, refresh after
   proof and the PR body, and reply/resolve threads as outcomes are proven.
   After every change round, every required model and the comment specialist
   re-audits the full diff and challenges peers until all explicitly approve
   the same current base/head. No majority vote or stale approval passes.
7. **Carry through CI and feedback.** Use `babysit-pr`. Route new findings
   through the same validation cycle, including older unresolved threads.
   After any change, return through proof and review before the gate.
8. **Merge and confirm deploy.** Re-fetch and verify the gate on the live
   PR immediately before merge. Use the repository merge method under the
   user's grant. Observe the production deploy/build reach ready and check
   the actual changed path. Report an unavailable deployment separately.

## Gate on the current head

- All task work is committed in verified units; the full diff is complete.
- Before evidence is inspectable and after proof covers the current SHA.
- Required checks pass. No silent waivers, fabricated runs, or weaker tests.
- Every required reviewer explicitly approves this base/head after adversarial
  peer challenge. Review coverage is complete, including Grok comment
  review; all findings have validated dispositions and appropriate replies.
- No unresolved blocking finding, product question, or change request.
- The branch is current with its base, mergeable, and authorized to merge.

## Waiting and blockers

Follow harness completion notices and `babysit-pr` watchers. In T3, only
the main owner watches; call `watch_pull_request` and end the turn when
waiting for checks/reviews. On wake, inspect the live PR and resume. Before
handing back or asking a blocking product question, unwatch the PR.

Ask through the available user-question tool when intent, access, or an
unmet gate requires the user. Identify the PR, evidence, blocked decision,
and recommendation. Continue independent work; never infer approval from
silence. Leave the PR open if the gate cannot pass.

## Report

Say whether merged, with PR URL, head/merge SHA, deploy URL or build,
before/after proof, checks actually run, review coverage, dispositions,
and any remaining blocker. Never present a pending gate as completed.
