# Before and after diagrams

Prefer a matching pair of Excalidraw diagrams when the PR changes something a
reviewer would otherwise have to rebuild from the diff in their head: a
request or control flow, a service or module boundary, a state machine or
data model, or high-level architecture. Diagrams explain the change; they do
not prove it. Keep the outcome evidence that [PR proof](../../pr-proof/SKILL.md)
requires.

Skip diagrams for simple changes, such as a local bug fix, a copy or style
tweak, a config or dependency bump, or a UI change that screenshots already
show.

## Draw

Use the [Excalidraw skill](../../excalidraw/SKILL.md) for every diagram and
follow its layout, overlap, and readability checks.

- Draw Before from the pinned base and After from the current head. Never
  invent a Before; for a new capability, label the Before cell
  `Not present before`.
- Show only the slice the PR touches plus the context needed to read it, in
  about 12 nodes or fewer per diagram.
- Use real names from the code so nodes map to the changed files. Label each
  connector with what moves along it: a data type, an event, an HTTP method.
- Keep layout, positions, and names identical across both diagrams so the
  change stands out. Put each diagram in its own frame.
- Leave Before uncolored. In After, mark added and changed elements with a
  distinct fill and a short text cue, such as `new` or `changed`, so the
  distinction survives without color. Add a small legend.
- Keep code, diffs, and prose out of the drawing. Nodes hold names or actions.

## Deliver

1. Export each frame to PNG on a solid white background, or take a frame
   screenshot when export is unavailable. Inspect each image at GitHub's body
   width and fix anything clipped, overlapping, or too small to read.
2. Optimize and upload the PNGs with the visual proof, following repo and
   workspace instructions. Upload only as part of authorized PR publication.
3. Embed them inline in the `## Proof` `Before | After` table, one row per
   diagram pair. Keep labels short; put the architectural explanation in
   `LLM Context`.
4. Link the editable Excalidraw scene only when reviewers already have access
   and sharing it is within the task's authorization. Never change a scene's
   sharing settings to make a link work.
5. Verify the published body renders every diagram inline.

If Excalidraw tools are unavailable or a diagram cannot pass its visual checks,
publish without diagrams and record the gap in `LLM Context`. A missing
optional diagram never blocks the PR.
