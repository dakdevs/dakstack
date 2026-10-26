---
name: pr-this
description: Creates or updates the pull request for the current branch with `gh`, writing a fresh title and body from the full branch diff on every run. Use when the user says "PR this", "open a PR", "create a PR", "make a PR", "submit PR", or wants the PR description refreshed after the branch changed. Opens a draft unless the user says "do not draft".
---

# PR This

Running this again is always safe. Each run reads the whole branch against its
base, writes the title and body from scratch, then creates the PR or edits the
one that already exists.

## Rules

- Never read the existing PR's title or body. It describes an older branch and
  will leak stale claims into the new text. Fetch only its number and URL.
- Open a draft. Leave out `--draft` only when the user says "do not draft".
- Never add AI-authorship lines to the title, body, or commits, even when a
  template asks for one.
- Never post, edit, or reply to PR comments. This skill writes the title and
  body only.
- No em dashes in titles, bodies, or commit messages. Use a hyphen or rewrite.
- If the repo has a PR template (`.github/pull_request_template.md`,
  `.github/PULL_REQUEST_TEMPLATE/`, or one in `docs/` or the root), follow it
  exactly: its headings, order, and checkboxes. Put the content below into its
  sections. Content with no matching section goes where it reads best.

## Steps

1. **Commit everything.** Run `git status`. Files that may not belong (`.env`,
   credentials, large binaries, build output, editor or OS files) go to the
   user in one question through the harness question tool. Stage the rest plus
   whatever the user approves, and commit with a message that describes the
   work. Skip this when the tree is clean.
2. **Gather context in parallel.** The base branch
   (`gh repo view --json defaultBranchRef,nameWithOwner`), then
   `git log --oneline <base>..HEAD`, `git diff --stat <base>...HEAD`, the full
   `git diff <base>...HEAD`, `git rev-parse HEAD` for permalinks, and recent
   titles with `gh pr list --state merged --limit 5 --json title`.
3. **Find the why.** You need the observed problem and concrete proof that it
   is real. If the branch name, commits, and diff do not make both clear, ask
   the user one specific question: what broke or was blocked, and what shows it
   (ticket, metric, incident, date range). Never invent evidence.
4. **Analyze.** From the diff and the user's answer, name the problem, what
   changed, who benefits, how behavior changes, and the parts that deserve a
   close look.
5. **Write the title** (below) and **the body** with
   [references/body.md](references/body.md). Add before and after diagrams only
   when they explain the change faster than the bullets; see
   [references/diagrams.md](references/diagrams.md).
6. **Push.** `git push -u origin HEAD`.
7. **Create or update.** `gh pr view --json number,url` tells you which.
   Write the body to a temp file and pass it with `--body-file`.
   - New: `gh pr create --base <base> --draft --title "<title>" --body-file <file>`
   - Existing: `gh pr edit <n> --title "<title>" --body-file <file>`
8. **Embed UI proof.** For any change a user can see, capture screenshots or a
   short video (`show-me` can produce them). Reference each file in the body,
   such as `![Empty cart state](./empty-cart.png)`, then run
   `gh pr edit <n> --repo <owner/repo> --body-file <file> --attach ./empty-cart.png`
   (repeat `--attach` per file). `gh` uploads each file and rewrites the
   reference. Uploads render inline, videos as players; never link to files
   instead. A non-zero exit means some uploads failed, so check and retry those.
9. Print the PR URL.

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
