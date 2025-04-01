import { Hono } from "hono";
import { cors } from "hono/cors";
import bcrypt from "bcrypt";
import { User } from "./types";

interface Bindings {
  users: KVNamespace;
}
const app = new Hono<{ Bindings: Bindings }>();
app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["*"],
    allowMethods: ["*"],
    credentials: true,
  })
);

// auth
app.post("/auth/login", async (c) => {
  const body = await c.req.json();
  if (!body?.email || !body?.password) return c.json({ ok: false }, 400);
  const usersIds = await c.env.users.list();
  const users: User[] = [];
  for (let user of usersIds.keys.map((k) => k.name)) {
    users.push(JSON.parse((await c.env.users.get(user)) || ""));
  }
  const user: User | undefined = users.find(
    (user: User) => user.email === body.email
  );
  if (!user) return c.json({ ok: false }, 400);
  if (await bcrypt.compare(body.password, user.hashed_password))
    return c.json({ access_token: user.token });
  return c.json({ ok: false }, 401);
});
app.post("/auth/signup", async (c) => {
  const body = await c.req.json();
  if (!body?.email || !body?.password || !body?.firstName || !body?.lastName) {
    return c.json({ ok: false }, 400);
  }

  if (!(await c.env.users.get(body.email))) return c.json({ ok: false }, 400);

  const user = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    hashed_password: await bcrypt.hash(body.password, 16),
    token: nanoid(160),
  };
  await c.env.users.put(body.email, JSON.stringify(user));

  return c.json({ ok: true }, 200);
});

app.get("/", (c) => {
  return c.text("🫠 Why you here? stop lurking in the api!");
});

export default app;
