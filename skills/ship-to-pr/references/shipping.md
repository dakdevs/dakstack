# Shipping workflow

## Choose a stop

Preserve read-only and local-only scope: do not edit on read-only tasks, and
do not push or publish either. Without permission to publish a PR, finish
the authorized local work and checks. A user request to deliver this task's
PR can grant publication; delegation or a nested skill cannot.

When PR publication is authorized, default to the ready-PR stop unless the
user requests a merge or the entry point selects the merge stop. Preserve
any explicit no-merge boundary. A stop does not expand permissions to
production data, destructive actions, other people's branches, or unrelated
publication. Follow session and repository rules for commits, rebases,
force pushes, and administrator merges.

On either PR path, check for armed auto-merge or a merge queue. If armed,
disable it before starting and recheck before every push. Report that
change. If it cannot be disabled, stop before pushing and report the
automatic merge risk.

## Shared workflow

Keep findings in this conversation. Never post, edit, reply to, or resolve
GitHub PR comments, submit reviews, or request human reviewers. Apply this
to delegates and nested skills, even when their instructions say otherwise.

1. **Plan and capture before.** Pin base/head, inspect existing user work,
   record product decisions and acceptance criteria, and start
   [pr-proof](../../pr-proof/SKILL.md). For bugs, use
   [replicate-issue](../../replicate-issue/SKILL.md) before implementation.
   Apply `principle-taste` and carry docs context through fixes. For UI work,
   use [Emil design engineering](../../emil-design-eng/SKILL.md) to route
   the relevant specialists.
2. **Implement in logical commits.** Follow
   [sequence verifiable units](../../principle-sequence-verifiable-units/SKILL.md).
   Each commit is one complete, working, testable unit with its tests and
   necessary migrations or callers. Run its checks before committing.
   Keep temporary breakage uncommitted and preserve unrelated changes.
3. **Finish and verify the task.** Run required lint, format, typecheck,
   build, unit and E2E checks, and inspect the full diff. For PR delivery,
   fetch the base, resolve conflicts preserving both sides' intent,
   regenerate lockfiles as needed, and rerun affected checks. Do not start
   final review with unfinished or uncommitted PR work.
   For every task that creates or changes UI, including local-only work,
   run [break UI](../../break-ui/SKILL.md) against the implemented UI before
   calling it verified or capturing final proof. Preserve coverage and blockers.
4. **Capture after and publish.** Only for an authorized PR, refresh
   before/after proof for the finished, committed head and push and
   open/update the PR using the [delivery requirements](delivery.md).
   A draft may exist earlier, but published-PR review starts only after
   implementation, verification, proof, and publication are complete.
5. **Review once.** Use [bar](../../bar/SKILL.md) for one focused pass covering
   correctness, maintainability, tests, proof, and source comments together.
   Honor explicitly scoped local review without presenting it as final PR
   review. No separate comment specialist, peer challenges, full reruns, or
   unanimity by default; this overrides nested requirements.
6. **Validate, fix, and automate.** The main thread uses replicate-issue to
   validate findings, confirm product intent, and own fixes. Use a separate
   validator only when useful and authorized. Verify affected paths and
   interactions and run required checks. For UI fixes, rerun break UI on
   affected UI before refreshing proof. After every pass, assess findings
   and recurring instructions for lint rules. Implement safe, deterministic,
   in-scope rules with violating and valid fixtures, wire them into lint/CI,
   and run them. Otherwise report the proposed rule, enforcement point, and
   reason for deferral. Use tests or types for runtime constraints.
7. **Carry through CI and feedback.** For published PRs, use
   [babysit-pr](../../babysit-pr/SKILL.md) under the selected stop and thread
   completion rules. Validate new findings and push verified fixes.
   Refresh after proof and update the PR body after every change. Broaden
   review only for a concrete new risk or user request.

For read-only or local-only delivery, report the verified in-scope result
without applying the PR gate or either PR stop.

## Current-head readiness gate

Fetch the base and inspect the live PR: head, base, draft state, mergeability,
checks, review coverage, finding dispositions, and automatic merge settings.
Verify the branch is current with its base and mergeable, the full diff is
complete, all verified work is committed and pushed, and inspectable before
and after proof covers the final head. Required checks must pass without
silent waivers, fabricated runs, or weaker tests. Finish one review pass,
validate findings, and verify fixes. Record reviewed and final SHAs without
claiming the pass covered later unseen changes. No unresolved blocking
finding, product question, or change request may remain. For UI changes,
require passing break UI coverage for the current head before marking the PR
ready. Rerun affected cases if a later change or base update changed the UI.

## Ready-PR stop

Never merge, enable auto-merge, or enter a merge queue, including through
delegates. Push only this task's branch, never the default branch, and
never use an administrator merge.

Hand back an open, unmerged PR when ready, or name the verified human
approval requirement or precise blocker. If someone else merged it, say so.
Pending checks or required reviews are ongoing work, not a ready handoff.

## Merge stop

Merge only with the user's explicit grant for this PR. Selecting this stop,
silence, or a green PR is not approval. Re-fetch and verify the live PR and
readiness gate immediately before merging, including required approvals.
Use the repository's merge method within that grant; do not arm auto-merge
or a queue unless the grant explicitly covers it. Leave the PR open if
authorization is missing or a gate cannot pass. If intent, access, or an
unmet gate needs the user, ask with the PR, evidence, blocked decision, and
recommendation; continue independent work.

Verify the PR actually merged; an armed queue or auto-merge is not a merge.
When deployment applies, observe the production deploy/build reach ready
and verify the actual changed path. Report an unavailable deployment
separately from a verified merge.
