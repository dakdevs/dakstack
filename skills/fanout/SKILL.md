---
name: fanout
description: Splits work across delegates - one Opus 5.5 delegate or T3 thread per independent item, each in its own worktree and PR, stacked when dependent - while the main thread only coordinates. Use when the user says "use Opus delegates", "orchestrate this", "one conversation per X", "use sub-agents in parallel", or "spin up another agent for a separate PR".
---

# Fanout

The main thread coordinates. Delegates do the work.

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
  checks, the repo's rules, and `taste`.
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
- If Opus hits its quota, hand off to a new thread on GPT-6.1 Sol medium. Give it a
  handoff note: goal, state, decisions, open work, links. Have that thread delegate to Opus again when quota returns, and
  settle the old thread.

## Finish

Inspect each delegate's diff and evidence yourself; a summary is not proof.
Run `bar` on each PR when the user asked for review, then `ship` the ones the
user asked to merge. Settle or archive finished threads. Report every PR, its
state, and anything still blocked.
