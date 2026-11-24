import { expect, test } from "bun:test";
import { reviewPolicyViolations } from "../scripts/verify-review-policy";

// These instructions previously authorized the behavior the user prohibited.
test.each([
  "Invocation requests review comments, replies, and resolutions; never merging.",
  "Invocation requests PR comments, replies, and validated resolutions.",
  "Reviewers post findings on the published PR.",
  "They trace candidates and post distinct actionable findings on the pinned PR head.",
  "Have it post distinct evidence-backed findings using the reviewer contract.",
  "Report and comment only; never delete comments or edit application code yourself.",
  "`ship-to-pr` invocation requests their review comment cycle.",
  "After every change round, the entire multi-model panel re-reviews the full diff.",
  "Every required model and the comment specialist re-review the full diff.",
  "Obtain unanimous current-head panel approval after full-diff re-review.",
  "Repeat the full comment audit and challenge after every change round.",
  "Always include no-comments through a separate Grok 4.7 job every round.",
])("rejects retired directive: %s", (source) => {
  expect(reviewPolicyViolations(source).length).toBeGreaterThan(0);
  expect(
    reviewPolicyViolations(source.replaceAll(" ", "\n")).length,
  ).toBeGreaterThan(0);
});

test.each([
  "Never post, edit, reply to, or resolve GitHub PR comments or submit GitHub reviews.",
  "Read existing PR comments as evidence and report findings to the main thread.",
  "Preserve machine-significant source comments and justified suppressions.",
  "Use one review pass, then focused verification after fixes.",
  "Honor an explicitly requested multi-model review in one coordinated pass.",
  "Do not require peer challenges, repeated full panels, or unanimous votes.",
  "Implement deterministic lint rules with violating and valid fixtures.",
])("allows supported workflow: %s", (source) => {
  expect(reviewPolicyViolations(source)).toEqual([]);
});
