---
name: principle-migrate-callers-then-delete-legacy-apis
description: Replaces an internal API by moving every caller to the new one and deleting the old one in the same wave, instead of keeping a compatibility layer. Use when a new internal API has been chosen while old callers still exist, no external users need backward compatibility, and the codebase can absorb coordinated breaking changes.
---

# Migrate Callers, Then Delete Legacy APIs

Keeping old and new APIs side by side creates two code paths, slows cleanup,
and makes the codebase feel append-only. Once the new API is the decided
design, finish the move.

## Rules

- **Internal callers are not a reason to keep an old path.** Move them.
- **List, migrate, delete.** Find every caller, move each one to the new API,
  and delete the old API in the same wave.
- **Adapters are the exception.** A temporary adapter needs a reason and an
  end date. It is never the default design.
- **Tests follow the new contract.** Update tests to assert the new API's
  behavior. Delete tests that only protect the old implementation's details.
- **Close each phase green.** Callers may break locally while you work, but
  finish the wave compile-complete with its checks passing before moving on
  (`principle-sequence-verifiable-units`).

## When it applies

All must hold:

- No external users depend on backward compatibility.
- The project can absorb a coordinated breaking change.
- The new API is part of a simplification or refactor.

## Hard limit

Never delete an API that an independently deployed consumer still needs, and
never leave a merged or deployed state broken. When consumers deploy
separately, plan the order: ship the new API, move the consumers, then delete
the old API in a later deploy.

**The test:** After the wave, does a search for the old API's name find
nothing, and does every deployed consumer still work?
