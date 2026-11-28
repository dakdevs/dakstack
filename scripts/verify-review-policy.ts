import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const workflows = [
  "bar",
  "no-comments",
  "ship",
  "ship-dakstyle",
  "ship-to-pr",
  "ship-to-pr-dakstyle",
  "babysit-pr",
  "replicate-issue",
];

// Catch retired directives; prose still needs human review for equivalent wording.
const retiredDirectives = [
  /invocation requests (?:the )?(?:review|pr) comments/i,
  /(?:reviewers |they |have it )?(?:post distinct (?:actionable|evidence-backed) findings|post actionable findings on the pr|post findings(?: on the published pr)?)/i,
  /report and comment only/i,
  /ship(?:-to-pr)?`? invocation requests their review comment cycle/i,
  /(?:every required reviewer|every required model|every model|the entire (?:multi-model )?panel|all required reviewers) (?:and the comment specialist )?(?:re-reviews?|re-audits?|must explicitly agree|must explicitly approve)/i,
  /(?:repeat|re-run|re-review) (?:the )?full (?:panel|comment audit|diff).*?every (?:change )?round/i,
  /(?:unanimous current-head panel approval|post-challenge approve|until everyone agrees on the current base\/head)/i,
  /always include.*?separate grok.*?every round/i,
];

export const reviewPolicyViolations = (source: string) => {
  const normalized = source.replace(/\s+/g, " ");
  return retiredDirectives
    .filter((pattern) => pattern.test(normalized))
    .map(
      (pattern) =>
        `retired review directive: ${normalized.match(pattern)?.[0]}`,
    );
};

export const verifyReviewPolicy = ({ root }: { root: string }) =>
  workflows.flatMap((workflow) => {
    const directory = join(root, "skills", workflow);
    return readdirSync(directory, { recursive: true })
      .map(String)
      .filter((file) => file.endsWith(".md") || file.endsWith(".yaml"))
      .flatMap((file) => {
        const path = join(directory, file);
        return reviewPolicyViolations(readFileSync(path, "utf8")).map(
          (error) => `${relative(root, path)}: ${error}`,
        );
      });
  });

if (import.meta.main) {
  const errors = verifyReviewPolicy({
    root: process.argv[2] ?? join(import.meta.dir, ".."),
  });
  for (const error of errors) console.error(error);
  if (errors.length > 0) process.exitCode = 1;
}
