---
name: dak-stepwise-workflows
description: Write high-level workflows as readable sequences of named domain operations.
---

# Stepwise workflows

- Write high-level functions as an ordered sequence of named domain operations.
  A reader should be able to follow the flow without opening the callees.
- Keep meaningful branches, early exits, and simple expressions visible. Extract
  the detail into a named operation when it starts to obscure the steps.
- Preserve performance and correctness. Keep batching, transaction boundaries,
  and existing concurrency intact. Avoid extra database or network calls just
  to make a flow read as steps.
