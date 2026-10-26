# Preserve Type Flow: Examples

## Keep the producer's type

```ts
const users = await client.users.list();

const activeNames = users
  .filter((user) => user.status === "active")
  .map((user) => user.name);
```

Wrong: a parallel type plus a cast. It drifts from the client silently.

```ts
type User = { id: string; name: string; status: string };
const users = (await client.users.list()) as User[];
```

When you need a name, derive it:

```ts
type ListedUser = Awaited<ReturnType<typeof client.users.list>>[number];
```

## Check a contract, keep the inferred type

```ts
const handlers = {
  created: handleCreated,
  deleted: handleDeleted,
} satisfies Record<EventName, EventHandler>;
```

`satisfies` confirms compatibility while `handlers` keeps its narrower type.

## `as Type` versus `as const`

```ts
// Wrong: neither checks nor transforms the response.
const user = response as User;

// Right: keep a trusted producer's type...
const user = await client.users.get(id);

// ...or parse unknown external data where it enters.
const user = UserSchema.parse(response);
```

`as const` derives a narrower type from the literal already there:

```ts
const statuses = ["draft", "published"] as const;
// readonly ["draft", "published"]

type Status = (typeof statuses)[number];
// "draft" | "published"

const routes = {
  home: "/",
  settings: "/settings",
} as const satisfies Record<RouteName, `/${string}`>;
```

## Parse once at the entrypoint

```ts
import * as z from "zod";

const CreateUserInputSchema = z.object({
  email: z.email(),
  displayName: z.string().min(1),
});

type CreateUserInput = z.output<typeof CreateUserInputSchema>;

export async function createUserController(request: Request) {
  const raw: unknown = await request.json();
  const input = CreateUserInputSchema.parse(raw);
  return createUser(input);
}

function createUser(input: CreateUserInput) {
  // No shape checks. The entrypoint already established the type.
}
```

## Narrow a union inline

```ts
function messageFor(result: Result) {
  if (result.kind === "failure") {
    return result.error.message;
  }
  return result.value;
}
```

Don't extract a one-use `isFailure(result): result is Failure`. The inline
check gives the compiler real evidence; the helper adds an unchecked claim.
