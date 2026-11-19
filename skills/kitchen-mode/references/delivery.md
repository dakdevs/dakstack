# Delivery requirements

## PRs and Linear tickets

Before creating or updating a PR, including each layer of a stack, resolve the
user's currently installed `create-linear-ticket/SKILL.md` and
`pr-this/SKILL.md` to absolute paths, read both, and pass those paths to any
delegate assigned PR work. The starting thread owns publication unless it
explicitly assigns it.

Use `create-linear-ticket` to reuse a matching ticket or create one. Honor
any requested Linear project and verify the saved ticket before publication.
Use `pr-this` to create or update the PR, and prefix its title with the saved
ticket ID in brackets. Once the PR URL exists, link it to the ticket. Verify
the saved ticket link, project, and title prefix before handing off the PR.
Apply these requirements when a linked workflow treats ticketing as optional.

## Copy review

At each review stage, use Gemini Neon through Cursor to review and directly
edit all copy in scope, including UI text, error messages, docs, and PR
prose. Resolve the exact model ID from Cursor capabilities; if unavailable,
report that before proposing a substitute. Follow the harness's delegation
rules.

Give the copy editor explicit ownership of the files or draft text and
sequence its edits with other writers. Edits must preserve meaning and
accepted product decisions. Only the starting thread applies edits to
externally published artifacts, and only within the task's authorization.
Keep review findings in the conversation. After edits, verify the affected
copy and refresh proof using the focused checks in
[kitchen-mode](../SKILL.md).
