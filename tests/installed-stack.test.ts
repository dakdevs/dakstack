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

test("installation validation catches a missing bundled resource", () => {
  const installation = install();
  rmSync(join(installation, "unslop/references/patterns.md"));
  expect(brokenLinks(installation)).toContain(
    "unslop/SKILL.md: references/patterns.md",
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
