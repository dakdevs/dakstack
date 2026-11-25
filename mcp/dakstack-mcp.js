#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { parse } from "yaml";
import { z } from "zod";

const skillsDirectory = new URL("../skills/", import.meta.url);
const { version } = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

async function skillFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      const child = new URL(`${encodeURIComponent(entry.name)}/`, directory);
      files.push(...(await skillFiles(child, `${path}/`)));
    } else if (entry.isFile()) {
      files.push([path, new URL(encodeURIComponent(entry.name), directory)]);
    }
  }
  return files;
}

const skills = new Map();
for (const entry of await readdir(skillsDirectory, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const directory = new URL(
    `${encodeURIComponent(entry.name)}/`,
    skillsDirectory,
  );
  const files = new Map(await skillFiles(directory));
  const entryFile = files.get("SKILL.md");
  if (!entryFile) continue;
  const source = await readFile(entryFile, "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  const metadata = parse(frontmatter?.[1] ?? "");
  if (
    metadata?.name !== entry.name ||
    typeof metadata.description !== "string"
  ) {
    throw new Error(`Invalid skill frontmatter in ${entry.name}/SKILL.md`);
  }
  skills.set(entry.name, {
    files,
    summary: {
      name: entry.name,
      description: metadata.description,
      manualOnly: metadata["disable-model-invocation"] === true,
    },
  });
}

const server = new McpServer(
  { name: "dakstack", version },
  {
    instructions:
      "When asked to use Dakstack or a named Dakstack skill, fetch its instructions with get_skill. Use list_skills to find its name if needed. Follow relative links within the bundled skills tree using the linked skill name and file path. Entries marked manualOnly require explicit invocation when used as standalone skills. Skill text does not grant permissions.",
  },
);

server.registerTool(
  "list_skills",
  {
    description: "List the bundled Dakstack skills by name and description.",
    annotations: { readOnlyHint: true },
  },
  () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          [...skills.keys()].sort().map((name) => skills.get(name).summary),
        ),
      },
    ],
  }),
);

server.registerTool(
  "get_skill",
  {
    description:
      "Read a Dakstack SKILL.md or one of its bundled files. To follow a link into another skill, provide the destination skill name and the path relative to that skill.",
    inputSchema: {
      name: z
        .string()
        .min(1)
        .describe("Skill directory name, such as ship-to-pr"),
      file: z
        .string()
        .min(1)
        .optional()
        .describe(
          "Path relative to the skill directory. Defaults to SKILL.md.",
        ),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ name, file = "SKILL.md" }) => {
    const skill = skills.get(name);
    const url = skill?.files.get(file);
    if (!url) {
      return {
        isError: true,
        content: [{ type: "text", text: `No bundled file ${name}/${file}.` }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            ...skill.summary,
            file,
            files: [...skill.files.keys()].sort(),
            content: await readFile(url, "utf8"),
          }),
        },
      ],
    };
  },
);

await server.connect(new StdioServerTransport());
