# Review-pass protocol

1. Pin the completed diff, scope, accepted decisions, evidence, and required
   checks. Read applicable sources and inspect callers and consumers.
2. Perform one focused review covering correctness, maintainability, tests,
   product behavior, proof, and source comments. Seek concrete failure paths.
   Use one reviewer by default; combine explicitly requested reviewers' reports
   once. Do not require peer challenges or consensus rounds.
3. Return findings to the originating conversation with file/line, trigger,
   expected and actual behavior, severity, smallest remedy, and proof limits.
   Never post, edit, reply to, or resolve GitHub PR comments or submit GitHub
   reviews, including through delegates or nested skills.
4. The main thread validates candidates, groups duplicates, confirms product
   intent, and fixes confirmed in-scope issues. Use a separate validator only
   when useful and authorized. Preserve unresolved evidence and questions.
5. Verify fixes and affected interactions with focused checks, rerun required
   repository gates, and refresh proof. Record the original reviewed SHA and
   verification on the final SHA. Expand coverage for a concrete new risk;
   do not automatically restart a full panel after changes.
6. Assess every finding and recurring instruction for automation. Add safe,
   deterministic, in-scope lint rules to the existing lint/CI entry point,
   with violating and valid fixtures. Prefer tests or types for runtime or
   domain constraints. Report proposed rules and reasons for deferral when
   judgment or additional scope is required.
7. Return verdict, reviewed and final SHAs, coverage, dispositions, checks,
   proof, lint changes/proposals, and blockers to the main thread. An agent
   verdict never substitutes for a repository-required human approval.
