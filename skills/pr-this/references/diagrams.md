# Before and after diagrams

Include diagrams only if they help a reviewer understand the PR faster than the
bullets do. Skip them for config tweaks, renames, and one-line changes. When
you include them, always show two Mermaid diagrams: Before and After.

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

````markdown
### Before

<One sentence saying what the reader is looking at.>

```mermaid
<old structure, no colors>
```

### After

<One sentence saying what changed.>

```mermaid
<new structure, green for added, amber for changed>
```
````

## Syntax check

- Subgraph names are unquoted: `subgraph My Name`.
- Node IDs have no spaces or special characters.
- Arrows are valid: `-->`, `-.->`, `==>`.
- Every `style` line names a node that exists.
- Every subgraph, including nested ones, closes with `end`.
