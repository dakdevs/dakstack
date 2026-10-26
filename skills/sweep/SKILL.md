---
name: sweep
description: Frees disk space on the user's Macs (this Mac, KirMax, or KirM1) by auditing large items, proving each is unused, deleting only what is safe, and rescanning. Use when the user says "free up space", "disk is full", "search for space", "do another audit", "clean up worktrees", or asks for a recurring cleanup automation.
---

# Sweep

## Audit

1. Report free space first (`df -h /`).
2. Find the largest items with `du -sh` or `dust` over the usual suspects:
   `~/.t3/worktrees`, `~/Library/Developer` (Xcode DerivedData, simulators,
   archives), `~/Library/Caches`, `node_modules`, `target/`, `.turbo`,
   `.next`, Docker, Homebrew, and package manager caches.
3. For each item over 1 GB, record: path, size, what it is, and whether it is
   in use.

**In use** means any of these:

- A T3 thread or worktree that is not archived.
- A running process holds files in it (`lsof +D` on the path).
- A git worktree with uncommitted or unpushed work.
- The user's media: video iterations, finals, and source footage.

## Delete

- Delete caches and build output that tools regenerate (DerivedData,
  `.turbo`, `target/`, package caches) once nothing running uses them.
- Remove an unused T3 worktree with `git worktree remove`, never `rm -rf`, and
  only after checking it has no unpushed commits.
- Ask before deleting anything you cannot regenerate, or anything you cannot
  identify. Show its size and what you know about it.
- Never touch a remote Mac's files without the user naming that Mac. On KirM1
  connect with
  `ssh -o BatchMode=yes dak@kirm1-ssh.tail02146b.ts.net`.

## Report

Free space before and after, a table of what was deleted with sizes, and what
was kept with the reason. If the user asks for a recurring sweep, set it up
as a scheduled task (`schedule_task` in T3 Code) and limit it to the regenerable categories above.
