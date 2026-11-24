import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import emil from "../emil-skills.json";

const root = join(import.meta.dir, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const skill = (name: string) => `skills/${name}/SKILL.md`;
const gate = skill("break-ui");
const router = skill("emil-design-eng");
const shipping = "skills/ship-to-pr/references/shipping.md";
const targets = (path: string, text = read(path)) =>
  [...text.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)].map(([, link]) =>
    resolve(root, dirname(path), link),
  );

const specialists = [
  "animate",
  "animation-performance",
  "animation-vocabulary",
  "choreograph",
  "find-animation-opportunities",
  "gestures",
  "mobile-native",
  "remove-animations",
  "review-animations",
];

test("the UI router links only to the selected specialists and the gate", () => {
  expect(targets(router).sort()).toEqual(
    [...specialists.map(skill), gate].map((path) => join(root, path)).sort(),
  );
});

test.each([
  shipping,
  "skills/ship-to-pr/agents/implementation-agent.md",
  ...[
    "design-loop",
    "fanout",
    "bar",
    "babysit-pr",
    "scaffold",
    "replicate-issue",
    "pr-this",
    "pr-proof",
    "unslop",
    "animate",
    "animation-performance",
    "choreograph",
    "gestures",
    "mobile-native",
    "remove-animations",
  ].map(skill),
])("%s links implemented UI verification to the same gate", (caller) => {
  expect(targets(caller)).toContain(join(root, gate));
});

test.each([
  "animation-vocabulary",
  "find-animation-opportunities",
  "review-animations",
  "show-me",
  "docs-context",
])("%s does not require the gate for read-only or capture work", (name) => {
  expect(targets(skill(name))).not.toContain(join(root, gate));
});

test("shipping checks implemented UI before proof and requires coverage again at readiness", () => {
  const source = read(shipping);
  const initial = source.slice(
    source.indexOf("**Finish and verify"),
    source.indexOf("**Capture after and publish"),
  );
  expect(targets(shipping, initial)).toContain(join(root, gate));
  expect(initial).toMatch(/every task that creates or changes UI/);
  expect(initial).toContain("local-only");
  expect(source).toMatch(
    /For UI fixes, rerun break UI on\s+affected UI before refreshing proof/,
  );
  expect(source.split("## Current-head readiness gate")[1]).toMatch(
    /require passing break UI coverage for the current head before marking the PR\s+ready/,
  );
});

test("the gate requires observed coverage and does not pass unavailable UI", () => {
  const source = read(gate);
  expect(source).toMatch(/Observe real rendering and interactions/);
  expect(source).toMatch(/rerun affected normal and edge cases/);
  expect(source).toMatch(
    /don't call that surface\s+passed or the affected work verified or review-ready/,
  );
  expect(source).toMatch(/no permission to push, publish,\s+comment, or merge/);
});

test("each selected skill ships its pinned-source mapping and MIT notice", () => {
  expect(emil.repository).toBe("emilkowalski/skills");
  expect(emil.revision).toMatch(/^[a-f0-9]{40}$/);
  const names = [...specialists, "break-ui", "emil-design-eng"];
  expect(
    emil.adapted
      .filter(({ path }) => path.endsWith("/SKILL.md"))
      .map(({ path }) => path)
      .sort(),
  ).toEqual(names.map(skill).sort());
  expect(emil.skills.map(({ path }) => path).sort()).toEqual(
    names.map((name) => `skills/${name}/license.md`).sort(),
  );
  for (const { path, sourcePath } of [...emil.skills, ...emil.adapted]) {
    expect(sourcePath).not.toBeEmpty();
    expect(existsSync(join(root, path))).toBe(true);
  }
});
