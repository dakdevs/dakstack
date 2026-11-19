# Delivery requirements

## PR delivery

Before creating or updating a PR, including each layer of a stack, read the
installed `pr-this/SKILL.md` and any applicable home and repository
`AGENTS.md` instructions. Follow their ticketing requirements when present.
Pass the absolute `pr-this/SKILL.md` path and those requirements to any
delegate assigned PR work. The starting thread owns publication unless it
explicitly assigns it.

## Copy and PR descriptions

Use the copy model and provider configured in the user's home `AGENTS.md`.
If no preference is set, default to Gemini Neon through Cursor. Resolve the
exact model ID from provider capabilities; if it is unavailable, report that
instead of substituting another. Follow the harness's delegation rules.

Have that model write every PR description before creating or updating a PR,
including each layer of a stack. Give it the installed `pr-this` path, the
branch diff, and current proof. At each review stage, have the same model
review and directly edit all copy in scope, including UI text, error
messages, docs, and PR descriptions.

Give the copy editor explicit ownership of the files or draft text and
sequence its edits with other writers. Edits must preserve meaning and
accepted product decisions. Only the starting thread applies edits to
externally published artifacts, and only within the task's authorization.
Keep review findings in the conversation. After edits, verify the affected
copy and refresh proof using the focused checks in
[kitchen-mode](../SKILL.md).
