---
name: dak-module-queries
description: Keep named database operations private to the module that owns the use case.
---

# Module-owned database queries

- Put each database operation in its own named function in the module that uses
  it. Shape the query for that use case, including the fields, filters, and
  transaction context it needs.
- Share query functions only within their owning module. Modules can share the
  database client, schema, and transaction infrastructure, and can call another
  module's public domain operation. The query function itself stays private.
- When a touched flow uses a centralized query or generic repository, move that
  flow to a module-owned query function. Preserve behavior and leave other callers
  outside the change.
