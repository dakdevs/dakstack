# Avoid Tautological Tests: Patterns

## Harmful

### The subject on both sides

```ts
const actual = calculateTotal(order);
const expected = calculateTotal(order);
expect(actual).toBe(expected);
```

This checks repeatability, not correctness. Repeated calls can reveal
statefulness, mutation, or identity bugs, but the claimed result still needs a
separate oracle. Use a worked example:

```ts
const order = {
  items: [{ priceCents: 1_000, quantity: 2 }],
  discountCents: 250,
};
expect(calculateTotal(order)).toBe(1_750); // 2 × 1000 − 250, reviewed by hand
```

### Re-implementing the algorithm

```ts
const expected =
  order.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0) -
  order.discountCents;
expect(calculateTotal(order)).toBe(expected);
```

If production copied the same misunderstanding, both sides agree. Use a table
of examples taken from the spec:

```ts
it.each([
  { subtotal: 2_000, discount: 250, expected: 1_750 },
  { subtotal: 500, discount: 800, expected: 0 },
])("never returns a negative total", ({ subtotal, discount, expected }) => {
  expect(applyDiscount(subtotal, discount)).toBe(expected);
});
```

### Asserting the arrangement

```ts
const user = { id: "u1", role: "admin" };
expect(user.role).toBe("admin"); // proves only the line above
```

Run behavior that uses the fixture, with the expected answer taken from the
authorization rule, not from the function or a copy of it:

```ts
expect(canDeleteProject(user)).toBe(true);
```

### Testing a mock against itself

```ts
const gateway = vi.fn().mockResolvedValue({ id: "p1" });
expect(await gateway()).toEqual({ id: "p1" }); // tests the mocking library
```

Drive the unit through its boundary instead:

```ts
const gateway = { charge: vi.fn().mockResolvedValue({ id: "p1" }) };
await checkout({ cart, gateway });
expect(gateway.charge).toHaveBeenCalledWith({
  amountCents: 2_500,
  currency: "USD",
});
```

Valid only if issuing that charge is part of `checkout`'s contract. Never
assert incidental call order or private collaboration.

### A production helper as the oracle

```ts
const expected = serializeOrder(buildOrderFixture());
const actual = exportOrder(buildOrderFixture());
expect(actual).toBe(expected);
```

If `exportOrder` calls `serializeOrder`, this only confirms the code's
structure. Use output defined by the protocol or a separately reviewed fixture.

## Good oracles

**Spec examples.** Concrete input and output you can check without running
the code. Include boundaries, invalid input, and negative cases.

**Invariants.** Properties give oracles without hard-coded output. For a sort:

```ts
const original = [...input];
const result = sortNumbers([...input]);
expect(result).toHaveLength(original.length);
for (const value of new Set(original)) {
  expect(result.filter((x) => x === value)).toHaveLength(
    original.filter((x) => x === value).length,
  );
}
expect(result.every((v, i) => i === 0 || result[i - 1] <= v)).toBe(true);
```

These state "same elements" and "in order" without a second copy of the sort.

**Differential tests.** A simple, slow, separately designed reference checks
an optimized version across many inputs. It counts only if it is easier to
inspect and unlikely to share the bug. A copy, wrapper, or refactor of the
production code is not independent.

**Reviewed snapshots and golden files.** Valid when they capture supported
observable output and reviewers compare changes to an outside contract or
domain knowledge. Regenerating from current output is self-confirming. A
snapshot of private structure may catch bugs but stays brittle. Keep
snapshots small enough to review for meaning.

**Contract interactions.** Asserting an outbound call is right when the call
is the contract: publishing an event, issuing a payment, persisting a record,
calling a protocol boundary. Assert the meaningful payload and how many times
it happened, not every internal call on the way.
