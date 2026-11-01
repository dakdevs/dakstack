import { afterEach, expect, test } from "bun:test";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import provenance from "../upstream-skills.json";

const installations: string[] = [];

afterEach(() => {
  for (const installation of installations.splice(0)) {
    rmSync(installation, { recursive: true, force: true });
  }
});

const install = () => {
  const destination = mkdtempSync(join(tmpdir(), "dakstack-install-"));
  installations.push(destination);
  cpSync(join(import.meta.dir, "../skills"), destination, { recursive: true });
  return destination;
};

const brokenLinks = (installation: string) =>
  readdirSync(installation, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => {
      const source = readFileSync(join(installation, file), "utf8")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`[^`\n]*`/g, "");
      return [...source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
        .map((match) => match[1].split("#")[0])
        .filter((target) => target && !/^[a-z]+:/i.test(target))
        .filter((target) => {
          const destination = resolve(installation, dirname(file), target);
          return (
            relative(installation, destination).startsWith("..") ||
            !existsSync(destination)
          );
        })
        .map((target) => `${file}: ${target}`);
    });

test("a skills-only install preserves every bundled Markdown dependency", () => {
  expect(brokenLinks(install())).toEqual([]);
});

test("all hidden upstream leaves can be discovered on disk and read by absolute path", () => {
  const installation = install();
  const hidden = readdirSync(installation)
    .map((name) => join(installation, name, "SKILL.md"))
    .filter((path) =>
      /^disable-model-invocation: true$/m.test(readFileSync(path, "utf8")),
    );
  expect(hidden.map((path) => relative(installation, path)).sort()).toEqual(
    provenance.skills.map((skill) => `${skill.name}/SKILL.md`).sort(),
  );
  for (const path of hidden) {
    expect(readFileSync(path)).toEqual(
      readFileSync(
        join(import.meta.dir, "../skills", relative(installation, path)),
      ),
    );
  }
});

test.each(
  Object.entries({
    ship: ["principle-sequence-verifiable-units"],
    "pr-this": ["principle-sequence-verifiable-units"],
    "babysit-pr": ["principle-fix-root-causes"],
    "prod-triage": [
      "principle-fix-root-causes",
      "principle-laziness-protocol",
      "principle-test-behavior-not-implementation",
    ],
    "replicate-issue": ["principle-fix-root-causes"],
    "principle-avoid-tautological-tests": [
      "principle-test-behavior-not-implementation",
    ],
    "principle-effect-boundary": ["principle-test-behavior-not-implementation"],
  }),
)(
  "standalone %s declares readable file dependencies",
  (caller, dependencies) => {
    const installation = install();
    const source = readFileSync(join(installation, caller, "SKILL.md"), "utf8");
    const targets = [...source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(
      (match) => resolve(installation, caller, match[1]),
    );
    for (const dependency of dependencies) {
      const target = join(installation, dependency, "SKILL.md");
      expect(targets).toContain(target);
      expect(readFileSync(target).length).toBeGreaterThan(0);
    }
  },
);

test("installation validation catches a missing bundled resource", () => {
  const installation = install();
  rmSync(join(installation, "unslop/references/patterns.md"));
  expect(brokenLinks(installation)).toContain(
    "unslop/SKILL.md: references/patterns.md",
  );
});

test.each([
  "ship/SKILL.md",
  "ship-to-pr/SKILL.md",
  "kitchen-mode/SKILL.md",
  "kitchen-mode/agents/kitchen-agent.md",
  "kitchen-mode/agents/review-agent.md",
  "kitchen-mode/agents/reviewer-agent.md",
  "kitchen-mode/agents/finding-validator.md",
  "replicate-issue/SKILL.md",
  "prod-triage/SKILL.md",
  "bar/SKILL.md",
  "best-practices/SKILL.md",
  "pr-proof/SKILL.md",
  "fanout/SKILL.md",
  "design-loop/SKILL.md",
  "scaffold/SKILL.md",
])("%s can load docs context from a skills-only installation", (caller) => {
  const installation = install();
  const source = readFileSync(join(installation, caller), "utf8");
  const targets = [...source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) =>
    resolve(installation, dirname(caller), match[1]),
  );
  const docs = join(installation, "docs-context/SKILL.md");
  expect(targets).toContain(docs);
  expect(readFileSync(docs, "utf8")).toContain("name: docs-context\n");
  rmSync(docs);
  expect(brokenLinks(installation)).toContain(
    `${caller}: ${relative(dirname(join(installation, caller)), docs)}`,
  );
});

test("installation validation rejects a dependency outside the installed stack", () => {
  const installation = install();
  writeFileSync(
    join(installation, "unslop/escape.md"),
    "[host-only dependency](../../README.md)",
  );
  expect(brokenLinks(installation)).toContain(
    "unslop/escape.md: ../../README.md",
  );
});

test("literal Markdown examples do not require files in the installation", () => {
  const installation = install();
  writeFileSync(
    join(installation, "unslop/examples.md"),
    "`[example](missing.md)`\n```md\n[example](also-missing.md)\n```\n",
  );
  expect(brokenLinks(installation)).toEqual([]);
});

test.each([
  "kitchen-agent",
  "review-agent",
  "reviewer-agent",
  "comment-sicko",
  "finding-validator",
])(
  "a skills-only installation includes the %s role and detects its removal",
  (role) => {
    const installation = install();
    const prompt = join(installation, "kitchen-mode/agents", `${role}.md`);
    expect(existsSync(prompt)).toBe(true);
    expect(readFileSync(prompt, "utf8")).toContain(`name: ${role}\n`);
    rmSync(prompt);
    expect(brokenLinks(installation)).toContain(
      `kitchen-mode/SKILL.md: agents/${role}.md`,
    );
  },
);
