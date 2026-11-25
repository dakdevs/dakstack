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
  const installation = install();
  expect(brokenLinks(installation)).toEqual([]);
  expect(existsSync(join(installation, "kitchen-mode", "SKILL.md"))).toBe(
    false,
  );
});

test("all hidden upstream leaves can be discovered on disk and read by absolute path", () => {
  const installation = install();
  const hidden = readdirSync(installation)
    .map((name) => join(installation, name, "SKILL.md"))
    .filter((path) => {
      const source = readFileSync(path, "utf8");
      const frontmatter = Bun.YAML.parse(
        source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "",
      );
      return frontmatter?.["disable-model-invocation"] === true;
    });
  expect(hidden.map((path) => relative(installation, path)).sort()).toEqual(
    provenance.skills.map((skill) => `${skill.name}/SKILL.md`).sort(),
  );
});

test.each(
  Object.entries({
    "ship-to-pr/references/shipping.md": [
      "principle-sequence-verifiable-units",
    ],
    "pr-this/SKILL.md": ["principle-sequence-verifiable-units"],
    "babysit-pr/SKILL.md": ["principle-fix-root-causes"],
    "prod-triage/SKILL.md": [
      "principle-fix-root-causes",
      "principle-laziness-protocol",
      "principle-test-behavior-not-implementation",
    ],
    "replicate-issue/SKILL.md": ["principle-fix-root-causes"],
    "principle-avoid-tautological-tests/SKILL.md": [
      "principle-test-behavior-not-implementation",
    ],
    "principle-effect-boundary/SKILL.md": [
      "principle-test-behavior-not-implementation",
    ],
  }),
)(
  "standalone %s declares readable file dependencies",
  (caller, dependencies) => {
    const installation = install();
    const source = readFileSync(join(installation, caller), "utf8");
    const targets = [...source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(
      (match) => resolve(installation, dirname(caller), match[1]),
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
  "ship-to-pr/references/workflow.md",
  "ship-to-pr/agents/implementation-agent.md",
  "ship-to-pr/agents/review-agent.md",
  "ship-to-pr/agents/reviewer-agent.md",
  "ship-to-pr/agents/finding-validator.md",
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
  const frontmatter = Bun.YAML.parse(
    readFileSync(docs, "utf8").match(
      /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
    )?.[1] ?? "",
  );
  expect(frontmatter).toMatchObject({ name: "docs-context" });
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
  "implementation-agent",
  "review-agent",
  "reviewer-agent",
  "comment-sicko",
  "finding-validator",
])(
  "a skills-only installation includes the %s role and detects its removal",
  (role) => {
    const installation = install();
    const prompt = join(installation, "ship-to-pr/agents", `${role}.md`);
    expect(existsSync(prompt)).toBe(true);
    const frontmatter = Bun.YAML.parse(
      readFileSync(prompt, "utf8").match(
        /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
      )?.[1] ?? "",
    );
    expect(frontmatter).toMatchObject({ name: role });
    rmSync(prompt);
    expect(brokenLinks(installation)).toContain(
      `ship-to-pr/references/workflow.md: ../agents/${role}.md`,
    );
  },
);

test("shipping improvement planning has a portable advisor and detects a missing template", () => {
  const installation = install();
  const workflow = readFileSync(
    join(installation, "ship-to-pr/references/workflow.md"),
    "utf8",
  );
  const links = [...workflow.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) =>
    resolve(installation, "ship-to-pr/references", match[1]),
  );
  expect(links).toContain(join(installation, "improve/SKILL.md"));
  expect(brokenLinks(installation)).toEqual([]);
  rmSync(join(installation, "improve/references/plan-template.md"));
  expect(brokenLinks(installation)).toContain(
    "improve/SKILL.md: references/plan-template.md",
  );
});

test.each([
  {
    scenario: "comment posting",
    path: "skills/ship-to-pr/agents/reviewer-agent.md",
    directive: "Reviewers post findings on the published PR.",
    diagnostic: "post findings",
  },
  {
    scenario: "panel loops",
    path: "skills/ship-to-pr/SKILL.md",
    directive:
      "After every change round, the entire multi-model panel re-reviews the full diff.",
    diagnostic: "the entire multi-model panel re-reviews",
  },
])("policy CLI rejects $scenario independently", (fixture) => {
  const installation = install();
  const workspace = mkdtempSync(join(tmpdir(), "dakstack-review-policy-"));
  installations.push(workspace);
  cpSync(installation, join(workspace, "skills"), { recursive: true });
  const checker = join(import.meta.dir, "../scripts/verify-review-policy.ts");
  const run = () => Bun.spawnSync([process.execPath, checker, workspace]);
  expect(run().exitCode).toBe(0);

  const file = join(workspace, fixture.path);
  writeFileSync(file, `${readFileSync(file, "utf8")}\n${fixture.directive}\n`);
  const result = run();
  expect(result.exitCode).toBe(1);
  expect(result.stderr.toString()).toContain(fixture.path);
  expect(result.stderr.toString()).toContain(fixture.diagnostic);
});

test("shipping thread completion is readable in a skills-only install and detects its removal", () => {
  const installation = install();
  const workflow = readFileSync(
    join(installation, "ship-to-pr/references/workflow.md"),
    "utf8",
  );
  const completion = join(
    installation,
    "ship-to-pr/references/thread-completion.md",
  );
  const links = [...workflow.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) =>
    resolve(installation, "ship-to-pr/references", match[1]),
  );
  expect(links).toContain(completion);
  expect(readFileSync(completion, "utf8").trim().length).toBeGreaterThan(0);
  expect(brokenLinks(installation)).toEqual([]);
  rmSync(completion);
  expect(brokenLinks(installation)).toContain(
    "ship-to-pr/references/workflow.md: thread-completion.md",
  );
});

test.each([
  ["ship", /select the merge stop/i],
  ["ship-to-pr", /select the ready-PR stop/i],
])("%s loads the shared workflow and selects its own stop", (name, stop) => {
  const installation = install();
  const entry = readFileSync(join(installation, name, "SKILL.md"), "utf8");
  const manifest = Bun.YAML.parse(
    readFileSync(join(installation, name, "agents/openai.yaml"), "utf8"),
  );
  expect(entry).toMatch(stop);
  const targets = [...entry.matchAll(/\]\(([^)]+)\)/g)].map(([, path]) =>
    resolve(installation, name, path),
  );
  expect(targets).toContain(
    join(installation, "ship-to-pr/references/workflow.md"),
  );
  expect(entry).not.toMatch(/\.\.\/ship(?:-to-pr)?\/SKILL\.md/);
  expect(manifest?.interface.default_prompt).toContain(`$${name} `);
});

test("the shared workflow owns authorization, readiness, and the two PR stops", () => {
  const installation = install();
  const workflow = readFileSync(
    join(installation, "ship-to-pr/references/workflow.md"),
    "utf8",
  );
  const shipping = join(installation, "ship-to-pr/references/shipping.md");
  const source = readFileSync(shipping, "utf8").replace(/\s+/g, " ");
  const completion = readFileSync(
    join(installation, "ship-to-pr/references/thread-completion.md"),
    "utf8",
  );
  expect(workflow).toContain("](shipping.md)");
  for (const file of [workflow, source, completion]) {
    expect(file).not.toMatch(/\bship-to-pr\b|\x60ship\x60/);
  }
  expect(source).toMatch(
    /publication is authorized.{0,80}default to the ready-PR stop/,
  );
  expect(source).toMatch(
    /read-only and local-only.{0,110}do not push or publish/,
  );
  expect(source).toMatch(
    /disable.{0,80}before starting.{0,80}recheck before every push/,
  );
  expect(source).toMatch(/cannot be disabled, stop before pushing/);
  expect(source).toMatch(
    /never merge, enable auto-merge, or enter a merge queue/i,
  );
  expect(source).toMatch(/only with the user's explicit grant for this PR/);
  expect(source).toMatch(/immediately before merging/);
  expect(source).toMatch(/verify the actual changed path/);
  expect(source).toMatch(
    /Capture after and publish.*Review once.*Validate, fix, and automate.*Carry through CI and feedback.*Current-head readiness gate/,
  );
  expect(source).toMatch(
    /Never post, edit, reply to, or resolve GitHub PR comments, submit reviews, or request human reviewers/,
  );
  expect(source).toMatch(
    /Refresh after proof and update the PR body after every change/,
  );
  rmSync(shipping);
  expect(brokenLinks(installation)).toContain(
    "ship-to-pr/references/workflow.md: shipping.md",
  );
});

test("installed PR example keeps proof visible and all context collapsed", () => {
  const installation = install();
  const body = readFileSync(
    join(installation, "pr-this/references/body.md"),
    "utf8",
  );
  const example = body.match(/^````md\n([\s\S]*?)\n````$/m)?.[1];
  expect(example).toBeDefined();
  if (!example) throw new Error("PR body guidance needs a complete example");

  const disclosures = [
    ...example.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/gi),
  ];
  expect(disclosures).toHaveLength(1);
  expect(example.match(/<details\b/gi)).toHaveLength(1);
  const [disclosure] = disclosures;
  if (!disclosure) throw new Error("PR example needs a context disclosure");
  expect(disclosure[1]).not.toMatch(/(?:^|\s)open(?:\s|=|$)/i);
  const summary = disclosure[2].match(
    /^\s*<summary\b[^>]*>\s*([\s\S]*?)\s*<\/summary>([\s\S]*)$/i,
  );
  expect(summary?.[1].trim()).toBe("LLM Context");
  const visible = example.slice(0, disclosure.index);
  expect(visible.trimStart()).toMatch(/^## Proof\s*\n/);
  expect(visible.match(/^## .+$/gm)?.map((heading) => heading.trim())).toEqual([
    "## Proof",
  ]);
  expect(visible).toMatch(/^```diff\n- .+\n\+ .+\n```$/m);
  const visibleProse = visible
    .replace(/^## Proof$/m, "")
    .replace(/^```diff\n[\s\S]*?^```$/m, "")
    .replace(/^\[[^\]]+\]\(https:\/\/[^)]+\)$/gm, "")
    .trim();
  expect(visibleProse).toBe("");
  for (const heading of ["Why", "What changed", "How it works"]) {
    expect(
      summary?.[2].match(/^## .+$/gm)?.map((line) => line.trim()),
    ).toContain(`## ${heading}`);
  }
  expect(example.slice(disclosure.index + disclosure[0].length).trim()).toBe(
    "",
  );
});
