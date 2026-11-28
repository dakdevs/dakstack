---
name: dak-function-inputs
description: Define inline, module-local function inputs and project only the fields a function needs.
---

# Function input types

Define each function's parameter types inline in the module that owns the
function. Describe only the fields the function uses. Do not import types
for parameter annotations or export types for other modules to reuse.

At each module boundary, build the argument from the typed values the caller
already has. Pass only the fields the function needs. TypeScript checks that
those values satisfy the local shape. The new object is what drops unused
fields at runtime.

```ts
// receipt.ts
export function formatReceipt(input: { orderId: string; totalCents: number }) {
  return `Order ${input.orderId}: $${(input.totalCents / 100).toFixed(2)}`;
}

// checkout.ts
const receipt = formatReceipt({
  orderId: order.id,
  totalCents: order.totalCents,
});
```

When reviewing a call across modules, follow the argument from its producer
to the fields the function reads. Keep the producer's type information on
those values.
