import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { upstreamFiles } from "./scripts/verify-upstream";

const root = import.meta.dir;
const skillsDir = join(root, "skills");
const readme = readFileSync(join(root, "README.md"), "utf8");
const names = readdirSync(skillsDir);

const notSkills = new Set(["dak-engineering", "the-web-team", "yt-dlp"]);

const uiReferenceLiterals = new Set(
  [
    "animation: data-animate clip-path transform-origin ease-out ease-in ease-in-out data-mounted",
    "catalog: line-height needs-review customer-feedback-from-enterprise-onboarding tabular-nums aspect-ratio",
    "mobile: theme-color ease-out pan-y touch-action apple-mobile-web-app-status-bar-style black-translucent overscroll-behavior pan-x prefers-color-scheme",
  ].flatMap((entry) => {
    const [group, terms] = entry.split(": ");
    return terms.split(" ").map((term) => `${group}:${term}`);
  }),
);
const uiReferenceGroups: Record<string, string> = {
  "animate/references/recipes.md": "animation",
  "choreograph/references/recipes.md": "animation",
  "review-animations/references/standards.md": "animation",
  "break-ui/references/catalog.md": "catalog",
  "mobile-native/references/mobile-web.md": "mobile",
};

const skillReferences = (text: string, path?: string) =>
  [
    ...text.matchAll(
      /\$([a-z][a-z0-9-]*)|`\$?([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`/g,
    ),
  ]
    .filter(
      ([match, explicit, literal]) =>
        explicit ||
        match.startsWith("`$") ||
        !path ||
        !uiReferenceLiterals.has(`${uiReferenceGroups[path]}:${literal}`),
    )
    .map((match) => match[1] ?? match[2])
    .filter((reference) => !notSkills.has(reference));

test("the stack has skills", () => {
  expect(names.length).toBeGreaterThan(0);
});

describe.each(names)("%s", (name) => {
  const source = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8");
  const frontmatter = Bun.YAML.parse(
    source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "",
  );
  const upstream = upstreamFiles.some((skill) => skill.name === name);

  test("uses a portable kebab-case directory name", () => {
    expect(name).toMatch(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/);
  });

  test("has frontmatter whose name matches its directory", () => {
    expect(frontmatter).toMatchObject({ name });
  });

  test("has a nonempty description within the 1024-character limit", () => {
    const description = frontmatter?.description ?? "";
    expect(description).toEqual(expect.stringMatching(/\S/));
    expect(description.length).toBeLessThanOrEqual(1024);
  });

  test.skipIf(upstream)("stays under 100 lines", () => {
    expect(source.split("\n").length).toBeLessThanOrEqual(100);
  });

  test("has usable Codex metadata", () => {
    const metadata = Bun.YAML.parse(
      readFileSync(join(skillsDir, name, "agents", "openai.yaml"), "utf8"),
    );
    expect(metadata).toMatchObject({
      interface: {
        display_name: expect.stringMatching(/\S/),
        short_description: expect.stringMatching(/\S/),
        default_prompt: expect.stringMatching(/\S/),
      },
    });
  });

  test("is listed in the README", () => {
    expect(readme).toMatch(new RegExp(`^\\| \`${name}\` +\\|`, "m"));
  });

  test("refers only to skills in this stack", () => {
    const files = readdirSync(join(skillsDir, name), { recursive: true })
      .map(String)
      .filter((file) => /\.(md|yaml)$/.test(file))
      .filter(
        (file) =>
          !upstreamFiles.some(
            (entry) => entry.path === `skills/${name}/${file}`,
          ),
      );
    const outside = files.flatMap((file) =>
      skillReferences(
        readFileSync(join(skillsDir, name, file), "utf8"),
        `${name}/${file}`,
      )
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

test("CSS literals do not hide an explicit or unknown skill invocation", () => {
  expect(
    skillReferences(
      "Use `ease-out`, not $ease-out or `not-installed`.",
      "animate/references/recipes.md",
    ),
  ).toEqual(["ease-out", "not-installed"]);
});
