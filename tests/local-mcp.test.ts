import { expect, test } from "bun:test";
import { readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const skillsDirectory = new URL("../skills/", import.meta.url);

test("the Node stdio entry point exposes bundled skills from outside the repo", async () => {
  const client = new Client({ name: "dakstack-test", version: "1.0.0" });
  const transport = new StdioClientTransport({
    command: "node",
    args: [`${import.meta.dir}/../mcp/dakstack-mcp.js`],
    cwd: tmpdir(),
  });

  try {
    await client.connect(transport);
    expect(client.getServerVersion()?.name).toBe("dakstack");
    const { tools } = await client.listTools();
    expect(tools.map((tool) => tool.name).sort()).toEqual([
      "get_skill",
      "list_skills",
    ]);

    const inventory = await client.callTool({ name: "list_skills" });
    const catalog = JSON.parse(inventory.content[0].text);
    const directories = await readdir(skillsDirectory, { withFileTypes: true });
    expect(catalog.map((skill: { name: string }) => skill.name)).toEqual(
      directories
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort(),
    );
    expect(catalog).toContainEqual(
      expect.objectContaining({
        name: "thermo-nuclear-review",
        manualOnly: true,
      }),
    );

    for (const [name, file] of [
      ["ship-to-pr", "SKILL.md"],
      ["ship-to-pr", "references/workflow.md"],
      ["ship-to-pr", "agents/implementation-agent.md"],
      ["dak-style", "SKILL.md"],
      ["build-with-effect", "SKILL.md"],
      ["verify-effect", "SKILL.md"],
      ["ship-dakstyle", "SKILL.md"],
      ["ship-to-pr-dakstyle", "SKILL.md"],
    ]) {
      const skill = await client.callTool({
        name: "get_skill",
        arguments: {
          name,
          ...(file === "SKILL.md" ? {} : { file }),
        },
      });
      expect(skill.isError).toBeUndefined();
      expect(JSON.parse(skill.content[0].text)).toMatchObject({
        name,
        file,
        files: expect.arrayContaining(
          name === "ship-to-pr"
            ? ["references/workflow.md", "agents/implementation-agent.md"]
            : ["SKILL.md", "agents/openai.yaml"],
        ),
        content: await readFile(
          new URL(`${name}/${file}`, skillsDirectory),
          "utf8",
        ),
      });
    }

    for (const args of [
      { name: "missing" },
      { name: "ship-to-pr", file: "../../package.json" },
      { name: "../..", file: "package.json" },
    ]) {
      const result = await client.callTool({
        name: "get_skill",
        arguments: args,
      });
      expect(result.isError).toBe(true);
    }
  } finally {
    await client.close();
  }
});
