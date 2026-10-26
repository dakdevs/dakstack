---
name: status
description: Answers "where are we?" questions about the current thread, project threads, PRs, and deploys with a short, verified status and the next action. Use when the user asks "what's next?", "is it all pushed up?", "merged?", "how's it going?", "is it stalled?", "audit all threads", "settle the done ones", or "visualize what is going on".
---

# Status

Check before you answer. Status from memory is often wrong.

## Check

Look up only what the question needs:

- **Code:** `git status`, unpushed commits (`git log @{u}..`), and branch vs
  base.
- **PRs:** `gh pr view` or `gh pr list --author @me`: state, checks, review
  decision, mergeable.
- **Deploys:** the latest production deploy and whether it includes the
  merge.
- **Threads:** in T3, `t3_thread_list` and `t3_thread_read` for each thread
  in the project. A thread is **done** when its PR merged or its goal is met
  with nothing pending. It is **stalled** when nothing has happened for a
  long time, it is waiting on nobody, and its work is unfinished.
- **Background work:** running delegates, tmux sessions, and watchers.

## Answer

- Lead with the direct answer. For a yes/no question, the first word is yes
  or no.
- Then a compact table: item, state, evidence (PR link, SHA, check name), and
  next step.
- When the user asks to visualize, draw it (a small diagram or chart) instead
  of more tables.
- End with the one next action, and anything only the user can do.

## Act only when asked

- "settle the done ones": settle or archive the threads you classified as
  done, and list them.
- "consolidate": write one thread with the status and next steps of all the
  named threads (goal, current state, decisions, open work, links), then
  settle the originals.
- "unstick it": tell the stalled thread what it is waiting on, or cancel and
  relaunch its delegate.

Never say "all good except X". If X is not good, it is not all good.
