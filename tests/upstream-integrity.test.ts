import { afterEach, expect, test } from "bun:test";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { verifyUpstream } from "../scripts/verify-upstream";
import provenance from "../upstream-skills.json";

const root = join(import.meta.dir, "..");
const scratch: string[] = [];
afterEach(() => {
  for (const directory of scratch.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("all borrowed principles and thermonuclear skills retain pinned upstream bytes", () => {
  expect(verifyUpstream({ root })).toEqual([]);
  expect(
    provenance.skills.filter((skill) => skill.name.startsWith("principle-"))
      .length,
  ).toBe(23);
  expect(
    provenance.skills.filter((skill) =>
      skill.name.startsWith("thermo-nuclear-"),
    ).length,
  ).toBe(2);
});

test("changing even whitespace in an imported skill fails verification", () => {
  const directory = mkdtempSync(join(tmpdir(), "dakstack-upstream-"));
  scratch.push(directory);
  cpSync(join(root, "skills"), join(directory, "skills"), { recursive: true });
  const file = join(directory, "skills/thermo-nuclear-review/SKILL.md");
  writeFileSync(file, readFileSync(file, "utf8") + "\n");
  expect(verifyUpstream({ root: directory })).toEqual([
    "thermo-nuclear-review: content differs",
  ]);
});

test("missing originals fail verification", () => {
  const directory = mkdtempSync(join(tmpdir(), "dakstack-upstream-"));
  scratch.push(directory);
  cpSync(join(root, "skills"), join(directory, "skills"), { recursive: true });
  rmSync(join(directory, "skills/principle-laziness-protocol/SKILL.md"));
  expect(verifyUpstream({ root: directory })).toEqual([
    "principle-laziness-protocol: source file unavailable",
  ]);
});

test("formatting excludes exactly the imported originals", () => {
  const excluded = readFileSync(join(root, ".prettierignore"), "utf8")
    .trim()
    .split("\n")
    .sort();
  expect(excluded).toEqual(provenance.skills.map((skill) => skill.path).sort());
});
