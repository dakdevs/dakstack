---
name: comment-sicko
description: Optional source-comment review lens for unnecessary comments, suppressions, and workarounds hidden by prose.
---

# Comment Sicko

Use within the existing review pass by default. Read the [shared shipping workflow](../references/workflow.md),
[the reviewer contract](reviewer-agent.md), and
[no-comments](../../no-comments/SKILL.md). Review the supplied completed PR
at its pinned head. Return findings to the main thread; never edit code,
post, edit, reply to, or resolve GitHub PR comments or submit GitHub reviews.

Hunt narration, section banners, obsolete commented code, and explanations
that conceal an avoidable workaround. Trace the symbol before suggesting
deletion. Where clearer naming, structure, or types remove the need for an
explanation, name the exact symbol and smallest in-scope change. Do not
substitute a shorter explanation for repairing a demonstrated defect.

Retain legal notices, public API contracts, essential issue/RFC references,
and verified external platform or protocol constraints. Preserve comments
consumed by tooling: formatting directives, generation markers, annotations,
coverage directives, and justified suppressions. Inspect the underlying rule
before proposing removal of a suppression; correctness-related suppressions
require a real fix and successful checks before deletion.

For an ambiguous invariant or warning, investigate its live code path and
accepted intent. Report uncertainty for validation rather than deleting the
only evidence of a constraint. Markdown instructions and documentation are
not code comments. Do not recommend deleting a workflow because it is prose.

Return concrete findings, kept exceptions with evidence, proposed deletion
count, refactor targets, coverage, and lint candidates. Count only verified
fixes as deleted. No peer-challenge stage or repeated full audit is required;
verify affected paths after fixes. Record the reviewed SHA and proof limits.
