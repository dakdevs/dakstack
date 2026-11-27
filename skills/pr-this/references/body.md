# PR body

Show only `## Proof` above the fold. Put everything else inside one closed
`<details>` block labeled `LLM Context`.

## Proof

- Choose artifacts with [PR proof](../../pr-proof/SKILL.md) for the pinned base
  and current head.
- Above `<details>`, include only the proof artifacts, short labels like
  `Before` and `After`, and optional descriptive human links that help a
  reviewer inspect or verify the proof. Do not put summaries, check tables,
  SHAs, or narrative prose above the fold.
- Put visual proof (screenshots or videos) in a two-column `Before | After`
  table, one row per matching scenario or viewport, with each artifact embedded
  inline in its cell. Never fabricate a baseline; if no real baseline exists,
  label the `Before` cell honestly (for example, `Not present before` or
  `Unavailable`) and record the limit in `LLM Context`. Verify every artifact
  renders inline in the published PR.
- When the visible outcome is genuinely identical or there is no visible
  outcome, show real evidence captured at base and head: short `Before` and
  `After` excerpts of actual command output, logs, or responses, or links to
  tests, CI runs, and logs at the pinned SHAs.
- When the PR changes a flow, boundary, state or data model, or architecture,
  add matching `Before | After` Excalidraw diagrams alongside the outcome
  evidence. Follow [diagrams.md](diagrams.md).
- Never put a diff anywhere in the body, above or below the fold: no raw,
  simplified, or pseudocode diffs, `diff` code fences, or old and new code
  excerpts. Reviewers read code in the PR's changed files; read the branch
  diff only to write the body.
- Keep optional links brief and plain, such as "Replay the duplicate event" or
  "See the retry contract".

## LLM Context

Include everything a reviewer or the next agent needs to understand, verify, or
continue the work, and nothing more:

- `## Why`, `## What changed`, and `## How it works`.
- Verified context: checked base and head SHAs, scenarios, checks actually run,
  and evidence limits.
- Important decisions or errors only when they affect how someone should
  understand or continue the work.

If the repo supplies a PR template, preserve its headings, order, and
checkboxes inside `LLM Context`. Point any template proof section to `## Proof`
instead of duplicating it. Never add the `open` attribute, and keep blank lines
after `</summary>` and before `</details>` so GitHub renders the Markdown
inside.

## Examples

For visual proof, put screenshots or videos in a `Before | After` table above
`LLM Context`, one row per matching scenario or viewport:

```md
## Proof

| Before                                             | After                                            |
| -------------------------------------------------- | ------------------------------------------------ |
| ![Before, desktop](https://example.com/before.png) | ![After, desktop](https://example.com/after.png) |
```

For a change whose visible outcome stays the same, pair a diagram of the
changed flow with links to real evidence:

```md
## Proof

| Before                                                                       | After                                                                      |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Before: a retry enqueues a second receipt](https://example.com/before.png) | ![After: a retry reuses the stored receipt](https://example.com/after.png) |

[Replay a duplicate event](https://github.com/example/repo/blob/7f3c91a/tests/receipts.test.ts)

<details>
<summary>LLM Context</summary>

## Why

Retries could enqueue a second receipt for the same event.

## What changed

Reuse the receipt already stored for the event ID.

## How it works

The enqueue operation checks the unique event ID in the same transaction. The
duplicate-event regression test verifies that a retry keeps one receipt.

## Verification

- Base `4b8e210` to head `7f3c91a`
- `bun test tests/receipts.test.ts` passed: one receipt per replayed event
  at head, two at base
- Live queue worker not exercised

</details>
```
