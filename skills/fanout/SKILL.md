---
name: fanout
description: Splits work across delegates - one Opus 5.5 delegate or T3 thread per independent item, each in its own worktree and PR, stacked when dependent - while the main thread only coordinates. Use when the user says "use Opus delegates", "orchestrate this", "one conversation per X", "use sub-agents in parallel", or "spin up another agent for a separate PR".
---

# Fanout

The main thread coordinates. Delegates do the work.
Use [docs context](../docs-context/SKILL.md) to ground each unit and give
delegates its relevant sources, expectations, and unresolved questions.

## Plan the split

1. List the independent units of work. A unit is something that can land as
   its own PR and be verified on its own.
2. Mark dependencies. A unit that needs another unit's code goes in a stacked
   PR on top of it (`gh stack`), not a parallel one.
3. Name the files each unit owns. Two delegates never write the same file. If
   a unit needs a shared file, give that file to one owner and make the
   others wait for it.

## Launch

- **Execution delegates:** Claude Opus 5.5 at medium reasoning unless the user
  names another model. Each gets its unit, its owned files, its acceptance
  checks, the repo's rules, `principle-taste`, and the absolute
  [kitchen implementation prompt](../kitchen-mode/agents/kitchen-agent.md).
  Require logical working commits with tests and before/after proof.
- **One unit, one checkout.** Use `delegate_task` with
  `isolation: "worktree"`, or a new T3 thread with a worktree when the user
  asks for separate conversations. Link each thread's PR to it.
- **Cheap work goes to cheap models.** Use a small model (for example GPT-6
  Luna) for classification or mechanical conversion, and have it escalate to
  Opus when it hits something new.
- **Verify the model.** Check each delegate's recorded model before trusting
  its work. If a delegate runs on the wrong model or an "ultrafast" variant,
  cancel it and relaunch on the right one.

## Run

- Do not poll. Follow each delegate's completion notice.
- If the user asked for status updates ("every 10 min"), schedule a recurring
  task (`schedule_task` in T3 Code) and send a short visual: a table of unit, owner, state, and PR.
- A delegate that stalls gets cancelled and relaunched once, with the reason.
- Never interrupt a thread the user did not mention.
- If a required model hits quota, report the blocked unit and ask before
  substitution. Create another top-level thread only when the user asks.

## Finish

If another workflow owns PR completion, return the units and their evidence
to it instead of running these delivery steps.

Inspect each delegate's diff and evidence yourself; a summary is not proof.
Complete each unit, publish its PR with `pr-proof`, then run `bar` when the
user requested review. Main-thread triage uses `replicate-issue`; reviewers
never apply their own findings. For PRs the user explicitly authorized
merging, apply only [Kitchen Mode's merge stop](../kitchen-mode/references/shipping.md#merge-stop)
and its authorization and readiness gates to the existing work. Do not
restart the workflow. Settle or archive finished threads. Report every PR,
its state, and anything still blocked.
