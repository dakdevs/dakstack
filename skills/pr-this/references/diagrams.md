# Before and after diagrams

Use diagrams rarely, only for a substantial change in high-level architecture
when they make the changed flow easier to understand. Show matching Before and
After diagrams in `## Proof` alongside the required outcome artifacts. Render
Mermaid diagrams to images before embedding them.

## Pick a type

Use the same type for both diagrams.

- `flowchart`: control flow, request paths, pipelines, decisions.
- `sequenceDiagram`: who calls whom, and in what order.
- `classDiagram`: types, structs, module boundaries.
- `graph`: dependencies or data flow between modules.

## Content

- Show only the slice the PR touches plus the context needed to read it.
- Label each edge with what moves along it: a data type, an event, an HTTP
  method.
- Use real names from the code so nodes map to the diff.
- Keep each diagram to about 12 nodes or fewer.
- Give a node the same ID in both diagrams so reviewers can see what moved.
- Each diagram must make sense on its own.

## Color

Leave Before uncolored. In After, color only what changed, with medium fills
and white text so both GitHub themes stay readable:

```
style Node fill:#2ea043,stroke:#3fb950,color:#fff  %% added
style Node fill:#d29922,stroke:#e3b341,color:#fff  %% changed
style Node fill:#388bfd,stroke:#58a6ff,color:#fff  %% context, use rarely
```

End After with a legend:

```
subgraph Legend
  direction LR
  added[Added]
  changed[Changed]
  style added fill:#2ea043,stroke:#3fb950,color:#fff
  style changed fill:#d29922,stroke:#e3b341,color:#fff
end
```

## Layout

Keep only short `Before` and `After` labels with the diagrams in `## Proof`.
Put architectural explanation inside `LLM Context`.

```md
![Before](https://example.com/before.png)

![After](https://example.com/after.png)
```

## Syntax check

- Subgraph names are unquoted: `subgraph My Name`.
- Node IDs have no spaces or special characters.
- Arrows are valid: `-->`, `-.->`, `==>`.
- Every `style` line names a node that exists.
- Every subgraph, including nested ones, closes with `end`.
