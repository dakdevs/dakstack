---
name: no-comments
description: Inspects unnecessary source comments and hidden workarounds within one review pass, then validates cleanup and lint opportunities. Use when the user invokes "$no-comments" or requests source-comment cleanup. Never writes GitHub PR comments.
---

# No comments

Inspect source comments within [bar](../bar/SKILL.md)'s one focused pass.
Use the [comment lens](../ship-to-pr/agents/comment-sicko.md) without
launching a separate specialist by default. Honor explicit local-only scope.

Pin base/head and inspect only the caller's scope. Trace the underlying code
before recommending deletion or a refactor. Preserve legal, contract, and
machine-significant comments and verified external constraints. Markdown
instructions and documentation are not code comments.

Return evidence-backed findings to the main thread. Never post, edit, reply
to, or resolve GitHub PR comments or submit GitHub reviews. The main thread
validates through [replicate-issue](../replicate-issue/SKILL.md), applies
confirmed fixes, runs required checks, and refreshes proof. Verify affected
paths after fixes without restarting a full audit.

For every recurring source-comment or suppression issue, assess whether an
existing lint rule can enforce it. Add safe, deterministic, in-scope rules
with violating and valid fixtures; report judgment-dependent proposals and
reasons for deferral. Report proposed and actual deletions separately,
protected comments, verified refactors, checks, and lint changes/proposals.
