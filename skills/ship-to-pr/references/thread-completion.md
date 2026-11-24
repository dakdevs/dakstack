# Thread ownership and completion

## Start in the owning thread

Record the starting thread and requested stopping point before delegating.
That same thread owns integration, PR checks, review findings, and the final
report. Delegates return results to it; do not transfer completion to a child
or create a replacement top-level thread. Separate conversations require an
explicit user request and do not replace the starting thread's final report.

Use the selected shipping stop and its authorization limits. For
read-only or local-only work, report the authorized result without a PR.

## Continue until the stopping point

Pending checks, required reviews, and needed delegate results are ongoing
work. Follow the harness's completion protocol in the starting thread; a
waiting turn is not task completion. In T3, only that thread owns PR watchers:
watch and end the turn while waiting, then resume there on notification.
Do not poll, create another waiting thread, or ask the user to continue work
that is already authorized.

At the ready-PR gate, finish the workflow and hand the PR back for merging.
Do not wait for the user to merge or request permission to merge as a
routine completion step. When merging was requested, continue through the
authorized merge and verification instead of stopping at readiness.

## Finish in the starting thread

Before the final report:

- Verify the requested stopping point against the current PR head and evidence.
- Collect all required delegate results. Cancel superseded or unnecessary
  task-owned delegates; do not leave background work able to mutate the result.
- Remove task-owned PR watchers and scheduled follow-ups. Never cancel
  unrelated work or clear a real unresolved question merely to appear done.
- Report the PR link, final head, verified checks/reviews, and whether the PR
  is ready and open or merged, including the merge SHA and deploy URL or
  build when applicable. Include before/after proof, lint changes or
  proposals, finding dispositions, and any remaining blocker.

Return the final response in the starting thread and let the harness settle
it normally. Do not force settled state, archive the conversation, leave a
watcher armed for an already completed task, or promise another completion
message from a child thread.

If a required gate cannot pass without user input or access, report the exact
blocker in the starting thread and remove its PR watcher before handing back.
State that the task is blocked; do not claim readiness or completion.
