import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/hello/:user", (c) => {
  const user = c.req.param("user");
  const mode = c.req.query("mode");

  let message = `Hello, ${user}!`;
  if (mode === "shout") {
    message = message.toUpperCase();
  }

  return c.json({ message });
});

export default app;
