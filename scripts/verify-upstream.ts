import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import original from "../upstream-skills.json";
import improve from "../improve-skills.json";

export const upstreamFiles = [original, improve].flatMap((source) =>
  source.skills.map((skill) => ({
    ...skill,
    repository: source.repository,
    revision: source.revision,
  })),
);

export const verifyUpstream = ({ root }: { root: string }) =>
  upstreamFiles.flatMap((skill) => {
    try {
      const actual = createHash("sha256")
        .update(readFileSync(join(root, skill.path)))
        .digest("hex");
      return actual === skill.sha256 ? [] : [`${skill.name}: content differs`];
    } catch {
      return [`${skill.name}: source file unavailable`];
    }
  });

if (import.meta.main) {
  const root = join(import.meta.dir, "..");
  const errors = verifyUpstream({ root });
  if (process.argv.includes("--online")) {
    for (const skill of upstreamFiles) {
      const url = `https://raw.githubusercontent.com/${skill.repository}/${skill.revision}/${skill.sourcePath}`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`${skill.name}: HTTP ${response.status}`);
      const original = Buffer.from(await response.arrayBuffer());
      if (!original.equals(readFileSync(join(root, skill.path)))) {
        errors.push(`${skill.name}: differs from pinned remote source`);
      }
    }
  }
  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
  console.log(
    `${upstreamFiles.length} upstream files match pinned sources${process.argv.includes("--online") ? " (remote byte comparison)" : " (SHA-256)"}`,
  );
}
