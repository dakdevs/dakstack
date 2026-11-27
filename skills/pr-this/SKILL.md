---
name: pr-this
description: Creates or updates the pull request for the current branch with `gh`, writing a fresh title and body from the full branch diff on every run. Use when the user says "PR this", "open a PR", "create a PR", "make a PR", "submit PR", or wants the PR description refreshed after the branch changed. Opens a draft unless the user says "do not draft".
---

# PR This

Running this again is always safe. Each run reads the whole branch against its
base, writes the title and body from scratch, then creates the PR or edits the
one that already exists.

## Rules

- Derive the title and claims from the full current diff. Read old proof only
  to recover valid baseline evidence and uploaded asset URLs; revalidate it
  before reuse. Never carry forward stale after claims.
- Open a draft. Leave out `--draft` only when the user says "do not draft".
- Never add AI-authorship lines to the title, body, or commits, even when a
  template asks for one.
- Never post, edit, or reply to PR comments. This skill writes the title and
  body only.
- Read the full branch diff to write the body, but never paste a diff into it.
  No raw, simplified, or pseudocode diffs, `diff` fences, or old and new code
  excerpts, even inside LLM Context.
- No em dashes in titles, bodies, or commit messages. Use a hyphen or rewrite.
- Show only `## Proof` above the fold: proof artifacts, short labels, and
  optional descriptive links. Put everything else in one closed `<details>`
  block with `<summary>LLM Context</summary>`; never add `open`. Follow
  [references/body.md](references/body.md).
- If the repo has a PR template (`.github/pull_request_template.md`,
  `.github/PULL_REQUEST_TEMPLATE/`, `docs/`, or root), preserve its headings,
  order, and checkboxes inside LLM Context. Keep artifacts in `## Proof` and
  checks in LLM Context; point any template proof section to `## Proof`. The
  proof-first layout takes precedence.

## Steps

1. **Verify task commits.** Inspect `git status` and ownership. Commit only
   complete, checked task units with their tests, following
   [sequence verifiable units](../principle-sequence-verifiable-units/SKILL.md), read directly from its file. Never sweep user work, secrets,
   generated bulk, or unrelated files into a catch-all commit. Ask only when
   ownership is ambiguous and necessary; preserve everything else.
   Never commit a red test or broken intermediate state: working commits
   override the leaf's failing-test-first delivery order. Capture red proof uncommitted.
2. **Gather context in parallel.** The base branch
   (`gh repo view --json defaultBranchRef,nameWithOwner`), then
   `git log --oneline <base>..HEAD`, `git diff --stat <base>...HEAD`, the full
   `git diff <base>...HEAD`, `git rev-parse HEAD` for permalinks, and recent
   titles with `gh pr list --state merged --limit 5 --json title`.
3. **Find the why.** You need the observed problem and concrete proof that it
   is real. If the branch name, commits, and diff do not make both clear, ask
   the user one specific question: what broke or was blocked, and what shows it
   (ticket, metric, incident, date range). Never invent evidence.
4. **Analyze.** From the diff and the user's answer, gather why, what changed,
   how it works, and only decisions or errors needed to continue the work.
5. **Verify and refresh `pr-proof`.** For UI changes, run
   [break UI](../break-ui/SKILL.md) if coverage is missing; never mark blocked
   UI review-ready. Include before and current after proof, and record
   revisions, scenarios, checks, and limits in LLM Context. Write the title and
   body with [references/body.md](references/body.md). When the PR changes a
   flow, boundary, state or data model, or architecture, add Excalidraw
   diagrams with [references/diagrams.md](references/diagrams.md).
6. **Push.** `git push -u origin HEAD`; link an existing PR with the harness.
7. **Create or update.** `gh pr view --json number,url` tells you which.
   Write the body to a temp file and pass it with `--body-file`.
   - New: `gh pr create --base <base> --draft --title "<title>" --body-file <file>`
   - Existing: `gh pr edit <n> --title "<title>" --body-file <file>`
     Link a new or taken-over PR with the harness as the next call.
8. **Embed proof.** Use the artifacts selected by
   [PR proof](../pr-proof/SKILL.md). Optimize and upload visual attachments per
   repo or workspace instructions, embed them inline in `## Proof`, and verify
   the published body renders media inline and opens evidence links.
9. Print the PR URL and verified head. Every later change requires
   refreshed after proof and a rewritten current body before handoff.

## Title

Name the product problem the PR fixes or prevents, not the code it touches.
Many people read only the title, so it must say what is better after merge, in
terms a user or operator would recognize.

- Start with an outcome verb: Fix, Prevent, Stop, Restore, Unblock, Speed up,
  Remove, Allow, Enable. Avoid leading with Refactor, Rewrite, Migrate, Update,
  Introduce, or "Add support for".
- Describe the symptom a person sees, not a file or module.
- Match the repo's conventions. With conventional commits: `fix:` for an
  existing problem, `perf:` for speed or cost, `feat:` for a new capability,
  `chore:` or `refactor:` only when nothing user-visible changes, and then still
  name the future problem it prevents.
- Under 70 characters, plain English, no codenames or paths.
- Purely internal work with no product effect now or soon (test tooling, docs)
  may use a descriptive title with `test:`, `docs:`, or `chore:`.

| Change-focused                        | Outcome-focused                                   |
| ------------------------------------- | ------------------------------------------------- |
| Add retry logic to Stripe sync worker | Stop nightly Stripe syncs stalling on rate limits |
| Migrate auth check to shared helper   | Fix blank screen after a session expires          |
| Remove deprecated cookie parser       | Prevent breakage when Node drops the old parser   |
