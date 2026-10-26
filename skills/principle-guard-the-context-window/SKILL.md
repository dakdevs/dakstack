---
name: principle-guard-the-context-window
description: Protects the agent's context window by keeping bulky output out of the main thread and reading only what the task needs. Use when context is filling up, when a command or file would produce large output, when you catch yourself rereading the same material, or when planning work to fan out.
---

# Guard the Context Window

The context window is the fixed amount of text you can hold in one session.
You cannot get space back once it is spent. Let in only tokens that earn
their place.

**Why:** When context overflows, reasoning gets worse, summaries lose detail,
and work stalls. Unlike time or compute, spent context cannot be recovered
inside the session.

## How

- **Send big payloads elsewhere.** Hand verbose command output, screenshots,
  and large documents to subagents. Bring back a summary, not the raw data.
- **Skip what you will not use.** Read only what is relevant to the current
  step. If a file is not needed now, do not open it.
- **Keep always-used material inline.** A template or reference used on
  every run belongs in the skill file itself, not in a separate file that
  costs a read each time.
- **Size each phase and cap its scope.** Limit how many files a phase
  touches, set a turn budget, and count what each mechanism costs in context
  (a subagent's summary, a tool's output) before you choose it.

**The test:** Before each read or command, can you say what you will use from
its output? If not, narrow it or hand it off.
