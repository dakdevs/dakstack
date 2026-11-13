---
name: ship
description: Completes a task in working commits, publishes a PR with before/after proof, runs independent PR reviews and finding validation, then merges and confirms deployment. Use when the user says "ship it", "$ship", "get it merged", "force merge", or "fix the checks and merge". Findings stay in the originating conversation; never writes GitHub PR comments.
---

# Ship

Own the task through a merged PR and an observed working deploy. Run only
when the user requests shipping or merging. Use `ship-to-pr` to stop before
merge. Follow `principle-taste` and the repository's rules.

## Authorization

The workflow covers this task's commits, push, PR publication, and review.
Never post, edit, reply to, or resolve GitHub PR comments or submit GitHub
reviews, including through delegates or nested skills. Merge only under the user's merge grant.
A skill does not expand permission to production data, destructive actions,
other people's branches, or unrelated publication. Honor existing session
and repository rules for rebasing, force pushes, and administrator merges.

## Ordered workflow

1. **Plan and capture before.** Pin base/head, inspect existing user work,
   record product decisions and acceptance criteria, and start `pr-proof`.
   Run [docs context](../docs-context/SKILL.md) throughout investigation,
   implementation, review, and fixes; carry its sources and checks forward.
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
5. **Review once.** Run [bar](../bar/SKILL.md) in one focused pass covering
   correctness, maintainability, tests, proof, and source comments together.
   Return findings to the originating conversation. No separate comment
   specialist, peer challenges, or repeated full panels by default.
6. **Validate, fix, and automate.** The main thread validates findings through
   `replicate-issue`, confirms product intent, and owns fixes. Use a separate
   validator only when useful and authorized. Verify affected paths and
   interactions, run required checks, push working commits, and refresh proof.
   Follow bar's lint follow-through: implement safe, deterministic, in-scope
   rules with violating and valid fixtures, wired into lint/CI; report proposed
   rules and reasons for deferral. Use tests or types for runtime constraints.
7. **Carry through CI and feedback.** Use `babysit-pr`. Validate new findings
   and verify fixes with focused checks. Broaden review only for a concrete
   new risk or user request; do not restart full review after every change.
8. **Merge and confirm deploy.** Re-fetch and verify the gate on the live
   PR immediately before merge. Use the repository merge method under the
   user's grant. Observe the production deploy/build reach ready and check
   the actual changed path. Report an unavailable deployment separately.

## Gate on the current head

- All task work is committed in verified units; the full diff is complete.
- Before evidence is inspectable and after proof covers the current SHA.
- Required checks pass. No silent waivers, fabricated runs, or weaker tests.
- One review pass is complete; findings have validated dispositions. Record
  reviewed and final SHAs, focused fix verification, and lint changes/proposals.
  Do not claim the original pass reviewed later unseen changes.
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
