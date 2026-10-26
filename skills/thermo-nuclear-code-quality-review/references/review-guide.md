# Review guide

Read this while reviewing. It holds the questions, flags, remedies, and
phrasing for `thermo-nuclear-code-quality-review`.

## Ask of every meaningful change

- Is there a code-judo move that makes this dramatically simpler?
- Could a reframing need fewer concepts, branches, or helper layers?
- Does the local architecture get better or worse?
- Did branching appear where a better abstraction belongs?
- Did a cohesive module become more coupled, more stateful, or harder to scan?
- Does this logic live in the right file and layer?
- Did a file or component grow past a healthy size?
- Do repeated conditionals point to a missing model or helper?
- Is the code direct, or does it lean on special cases and incidental control
  flow?
- Does each abstraction earn its keep, or is it just a wrapper?
- Did casts, optionality, or ad-hoc object shapes blur the real invariant?
- Did details leak across a boundary instead of staying in the canonical layer?
- Is the orchestration more serial or less atomic than it needs to be?

## Flag hard

- A complicated implementation where a cleaner framing would delete whole
  kinds of complexity.
- Refactors that move code but do not cut the concepts a reader must hold.
- A file pushed past 1,000 lines by the diff, especially when new code could
  be split out.
- New conditionals bolted onto unrelated paths.
- One-off booleans, nullable modes, or flags that complicate existing flow.
- Feature-specific logic in general-purpose modules.
- Generic magic that hides simple structure.
- Thin wrappers or identity abstractions that add indirection only.
- Needless casts, `any`, `unknown`, or optional params that muddy a contract.
- Copy-pasted logic instead of an extracted helper.
- Narrow edge-case handling dropped into the middle of a busy function.
- Refactors that pass tests but leave code less modular or readable.
- "Temporary" branches likely to become permanent debt.
- Bespoke helpers where a canonical utility already exists.
- Logic in the wrong layer or package when a more central home exists.
- Serial async flow where independent work would be simpler in parallel.
- Partial-update logic that is less atomic than it needs to be.

## Preferred remedies

Reach for remedies like these:

- Delete a layer of indirection instead of polishing it.
- Reshape the state model so conditionals disappear rather than gather in
  one place.
- Move the ownership boundary so the feature becomes a natural extension of
  an existing abstraction.
- Turn special cases into a simpler default flow with fewer exceptions.
- Extract a helper or pure function.
- Split a large file into focused modules.
- Put feature-specific logic behind its own abstraction.
- Replace condition chains with a typed model or explicit dispatcher.
- Separate orchestration from business logic.
- Collapse duplicate branches into one clearer flow.
- Delete wrappers that do not clarify the API.
- Reuse the canonical helper instead of adding a near-duplicate.
- Make type boundaries explicit so control flow gets simpler.
- Move logic to the package, module, or layer that owns the concept.
- Run independent work in parallel when that also simplifies orchestration.
- Make related updates atomic when partial state would be hard to reason about.

A remedy that reaches beyond the task's scope is a recommendation, marked out
of scope, not a required edit.

## Example phrasing

- `this pushes the file past 1k lines. can we decompose this first?`
- `another special case in an already busy flow. can it live behind its own abstraction?`
- `this works, but it makes the surrounding code more spaghetti. keep the behavior, restructure the implementation.`
- `this looks like feature logic leaking into a shared path. can we isolate it?`
- `this abstraction doesn't seem to earn its keep. can we keep the direct flow?`
- `why does this need a cast or an optional? can the boundary be explicit instead?`
- `this looks like a bespoke version of a helper we already have. can we reuse the canonical one?`
- `there's a code-judo move here. can we reframe it so these branches disappear?`
- `this refactor moves complexity around without deleting it. can the model itself get simpler?`
