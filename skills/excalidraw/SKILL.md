---
name: excalidraw
description: "Create, edit, or review Excalidraw drawings, diagrams, and slides. Check for unintended overlaps, small or clipped text, and overall readability before delivery."
---

# Excalidraw

Make the complete drawing easy to understand at its intended viewing size. Treat visual inspection and correction as part of the work.

## Prefer diagrams over prose

- Show relationships through arrows, service boundaries, swimlanes, branching, and spatial alignment. Avoid turning an explanation into a stack of paragraph-filled boxes.
- Keep nodes to short names or actions and connectors to short relationship labels. Put supporting explanation in the accompanying response rather than repeating it inside the drawing.
- For comparisons, align corresponding actors or steps and highlight what changes. For service flows, make the participating services and cross-service calls visible.
- Preserve meaningful distinctions and conditions when shortening text. Split overview and detail views when necessary instead of packing more prose into each node.

For review-only requests, apply the checks below and report defects with their locations and suggested fixes. Change the scene only when editing is part of the request.

## Work in Excalidraw

- Use the available Excalidraw tools. Inspect the existing scene before editing it, and preserve its meaning and relevant content.
- With the Excalidraw+ MCP, read the matching format guide before the first content write: `read_diagram_format`, `read_presentation_format`, or `read_freeform_format`. Follow that guide for element structure, labels, bindings, and frames.
- Use `create_diagram` for supported graph layouts, `create_slide` for new slides, and `edit_scene_content` for custom compositions and adjustments. Keep elements editable unless the user requests otherwise.
- Plan the reading order, grouping, and space for labels and connectors before placing elements. Give dense content more room or separate overview and detail views.

## Prevent incorrect overlaps

- Keep unrelated shapes, text, connector labels, and arrowheads from colliding or covering one another. Check the visible strokes and text, including long labels and rotated elements.
- Route connectors around unrelated nodes and text. Make endpoints clear and keep crossings from implying a connection that does not exist.
- Preserve intentional containment and layering, such as a label inside its shape or nodes inside a group. Intentional overlap must leave the content and relationships readable.
- Leave visible padding inside containers and enough separation between neighboring elements to distinguish them at the intended viewing size.

## Keep all text readable and complete

- Read every label in the rendered drawing. Check for clipped characters, hidden lines, awkward wrapping, and text touching or extending beyond its container.
- Check titles, annotations, connector labels, and text near frame and export boundaries as carefully as node labels.
- No text may be cut off in the final drawing or frame crop. Keep text fully inside its owning frame with visible padding; a full-scene view can hide clipping that appears when a frame is rendered alone.
- Use a consistent text hierarchy and enough contrast against the background. Judge font size in the final viewing context. A font-size value alone does not prove readability.
- Fix text fit by enlarging or rearranging shapes, adding line breaks, or shortening wording while preserving meaning. Do not shrink text until it becomes difficult to read just to fit a box.
- If fitting the whole composition makes text too small, simplify the layout or divide it into readable sections. Keep an overview that explains how those sections relate.

## Check the whole composition

- Make the main subject, groups, and reading order apparent at a glance. Use alignment, spacing, and visual hierarchy consistently.
- Trace every connector from source to destination. Its direction, label, and relationship must be unambiguous.
- Check that grouping and color support the meaning, and that essential distinctions also have labels or other visible cues.
- Review density across the canvas. Resolve crowded areas, disconnected labels, and excessive empty space that makes the drawing unnecessarily large.

## Inspect, fix, and inspect again

1. After substantial changes and before delivery, take screenshots of the actual scene with `take_screenshot` or the Excalidraw UI's screenshot capability. Open and visually inspect the images; tool success, valid scene data, or text bounds alone do not establish visual quality.
2. Screenshot the full composition at the intended viewing size, then each frame separately so its actual crop is tested. Read every label, including its first and last characters and every line. Check titles, annotations, connectors, and frame edges for clipping, collisions, and readability. A close-up cannot establish readability at the final size.
3. Correct every defect found within the task's scope. After moving or resizing elements, inspect their neighbors and connectors, then check the whole composition again.
4. If delivering an export, inspect the exported artifact too. Confirm that its crop, scale, and margins preserve all content and readable text.
5. For creation and editing tasks, finish only after fresh screenshots of the final scene and its frames show no unintended overlap, no unreadably small or cut-off text, and a clear overall composition. If screenshots are unavailable, state that visual verification is incomplete and identify what remains unchecked; do not claim the drawing passed validation.

Return the drawing's link or file with a concise summary of the result and any unresolved limitation.
