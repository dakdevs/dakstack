import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import provenance from "./upstream-skills.json";

const root = import.meta.dir;
const skillsDir = join(root, "skills");
const readme = readFileSync(join(root, "README.md"), "utf8");
const names = readdirSync(skillsDir);

const parseFrontmatter = (source: string) => {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return undefined;
  const fields = new Map(
    match[1].split("\n").map((line) => {
      const separator = line.indexOf(":");
      return [
        line.slice(0, separator).trim(),
        line.slice(separator + 1).trim(),
      ];
    }),
  );
  return { fields };
};

const notSkills = new Set(["dak-engineering", "the-web-team", "yt-dlp"]);

const skillReferences = (text: string) =>
  [
    ...text.matchAll(
      /\$([a-z][a-z0-9-]*)|`\$?([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`/g,
    ),
  ]
    .map((match) => match[1] ?? match[2])
    .filter((reference) => !notSkills.has(reference));

test("the stack has skills", () => {
  expect(names.length).toBeGreaterThan(0);
});

describe.each(names)("%s", (name) => {
  const source = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8");
  const frontmatter = parseFrontmatter(source);
  const upstream = provenance.skills.some((skill) => skill.name === name);

  test("uses a portable kebab-case directory name", () => {
    expect(name).toMatch(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/);
  });

  test("has frontmatter whose name matches its directory", () => {
    expect(frontmatter?.fields.get("name")).toBe(name);
  });

  test("has a description that says when to use it and fits the 1024-character limit", () => {
    const description = frontmatter?.fields.get("description") ?? "";
    if (!upstream) expect(description).toContain("Use when");
    expect(description.length).toBeGreaterThan(0);
    expect(description.length).toBeLessThanOrEqual(1024);
  });

  test("stays under 100 lines", () => {
    if (!upstream) expect(source.split("\n").length).toBeLessThanOrEqual(100);
  });

  test("has Codex metadata", () => {
    expect(existsSync(join(skillsDir, name, "agents", "openai.yaml"))).toBe(
      true,
    );
  });

  test("is listed in the README", () => {
    expect(readme).toMatch(new RegExp(`^\\| \`${name}\` +\\|`, "m"));
  });

  test("refers only to skills in this stack", () => {
    const files = readdirSync(join(skillsDir, name), { recursive: true })
      .map(String)
      .filter((file) => /\.(md|yaml)$/.test(file))
      .filter((file) => !(upstream && file === "SKILL.md"));
    const outside = files.flatMap((file) =>
      skillReferences(readFileSync(join(skillsDir, name, file), "utf8"))
        .filter((reference) => !names.includes(reference))
        .map((reference) => `${file}: ${reference}`),
    );
    expect(outside).toEqual([]);
  });
});

test("the README refers only to skills in this stack", () => {
  expect(
    skillReferences(readme).filter((reference) => !names.includes(reference)),
  ).toEqual([]);
});

test("reference scanning flags a skill outside the stack", () => {
  expect(
    skillReferences(
      "Use `fix-merge-conflicts`, then $diagnose and `ship-to-pr`.",
    ),
  ).toEqual(["fix-merge-conflicts", "diagnose", "ship-to-pr"]);
});
