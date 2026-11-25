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
- Embed screenshots and videos inline with short `Before` and `After` labels.
- When the visible outcome is genuinely identical or there is no visible
  outcome, use one clear, minimal fenced pseudocode `diff`.
- Rarely, add matching `Before` and `After` diagrams for a substantial
  high-level architecture change alongside the outcome proof. Follow
  [diagrams.md](diagrams.md).
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

## Example

For a change whose visible outcome stays the same:

````md
## Proof

```diff
- On duplicate event: enqueue another receipt
+ On duplicate event: reuse the existing receipt
```

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
- `bun test tests/receipts.test.ts` passed; live queue worker not exercised

</details>
````
