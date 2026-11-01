import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import provenance from "../upstream-skills.json";

export const verifyUpstream = ({ root }: { root: string }) =>
  provenance.skills.flatMap((skill) => {
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
    for (const skill of provenance.skills) {
      const url = `https://raw.githubusercontent.com/${provenance.repository}/${provenance.revision}/${skill.sourcePath}`;
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
    `${provenance.skills.length} upstream skills match ${provenance.repository}@${provenance.revision}${process.argv.includes("--online") ? " (remote byte comparison)" : " (SHA-256)"}`,
  );
}
