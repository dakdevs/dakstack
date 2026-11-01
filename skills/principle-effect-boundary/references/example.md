# Example: a service, a layer, and typed failures

A transport service provided through a layer, with plain tagged failures and
no Effect classes. Confirm API names against the installed version first.

```ts
import { Context, Effect, Layer } from "effect";

type Send = (request: Request) => Promise<Response>;
export const Transport = Context.Service<{ readonly send: Send }>(
  "app/Transport",
);
export const transportLayer = (send: Send = (request) => fetch(request)) =>
  Layer.succeed(Transport, { send });

export const refused = (status: number) =>
  ({ _tag: "Refused", status }) as const;
export const unreachable = (reason: string) =>
  ({ _tag: "Unreachable", reason }) as const;

export const post = Effect.fn("post")(function* (url: string, body: string) {
  const { send } = yield* Transport;
  const response = yield* Effect.tryPromise({
    try: (signal) => send(new Request(url, { method: "POST", body, signal })),
    catch: (cause) =>
      unreachable(cause instanceof Error ? cause.name : "request failed"),
  });
  if (!response.ok) return yield* Effect.fail(refused(response.status));
  return response.status;
});
```
