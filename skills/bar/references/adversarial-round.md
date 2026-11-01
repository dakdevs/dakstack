# Adversarial round protocol

The coordinator owns the panel ledger; the main thread owns the PR and fixes.
A delegated coordinator needs explicit reviewer-spawning permission in its
brief. Where nesting is unavailable, the main thread launches the required
jobs on its behalf. Never collapse the panel to one model.

## Brief and ledger

Each job gets PR URL, pinned base/head, round and phase, absolute role/leaf
paths, repo rules, scope, accepted decisions, observed checks and proof,
required model/lens coverage, and allowed PR comment actions. Reviewers are
read-only for repo files. Give every report a unique owner/path.

Record model, lens, task ID, reviewed base/head, independent verdict,
challenge verdict, finding/thread IDs, rebuttals, evidence, and blockers.
Use APPROVE, CHANGES_REQUIRED, or BLOCKED. A required cell without a returned
verdict is pending, not satisfied. Include the comment specialist.

## Independence, then collaboration

1. Start fresh independent audit jobs without peer conclusions. Read both
   thermonuclear leaves and relevant principles; inspect the full diff and
   consumers. Attempt to falsify behavior and proof, including accepted
   decisions' unintended consequences. Do not invent defects.
2. Collect all reports. Preserve unique evidence when deduplicating. Coordinate
   PR posting so one canonical finding is not posted repeatedly; retain
   existing thread links and distinct supporting evidence.
3. Start fresh challenge jobs for all required reviewers with every report,
   finding, and disagreement. Each model must confront the strongest opposing
   argument, inspect the path, and support agreement or rebuttal. A clear
   panel must still challenge peers' coverage and approval rationale.
4. Return hypotheses to the main thread. Independent validators reproduce
   findings and compare product intent. Share validation artifacts and final
   proposed dispositions with every reviewer in fresh jobs if they arrived
   after its challenge. No reviewer validates its own finding.
5. Require every reviewer to accept or dispute final dispositions. Never drop
   objections silently, reinterpret refusal as approval, average severity,
   or let two models outvote a third. A product preference needs the user.

## Change and repeat

The main thread implements validated in-scope fixes, checks and commits,
pushes, refreshes proof, and replies to original threads. Then start a new
independent audit and peer challenge for the entire panel on the full new
base-to-head diff. Recheck dismissals and fixes for new interactions. Re-run
the dedicated Grok comment review even for apparently unrelated changes.
All old verdicts are historical.

Repeat while changes or objections remain. A fixed round count never grants
readiness. If progress needs unavailable evidence, access, or a product
decision, report that blocker with conflicting evidence. Do not force
consensus, loop without new evidence, or mark the PR ready. Resume once the
blocker is resolved.

Before completion, fetch the live PR/base. Require post-challenge APPROVE
from every required cell on those same SHAs, agreement on all validated
dispositions, passing required checks, and current after proof. Publish a
concise ledger and thread outcomes under the caller's comment/body grant.
Do not submit a GitHub approval as the author or confuse an agent verdict
with a repository-required human review.
