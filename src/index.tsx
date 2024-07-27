import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { validator } from "hono/validator";
import api from "./api";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get(
  "/hello/:user",
  validator("param", (value, c) => {
    const { user } = value;
    if (!user) {
      return c.text("No user", 400);
    }
    if (!user.match(/^[a-zA-Z]+$/)) {
      return c.text("Wrong user format", 400);
    }
    return { user };
  }),
  validator("query", (value, c) => {
    const { mode } = value;
    if (mode && mode !== "shout") {
      return c.text("Wrong mode", 400);
    }
    return { mode };
  }),
  (c) => {
    const user = c.req.valid("param").user;
    const mode = c.req.valid("query").mode;

    let message = `Hello, ${user}!`;
    if (mode === "shout") {
      message = message.toUpperCase();
    }

    return c.json({ message });
  }
);

app.post("/hello", async (c) => {
  const body = await c.req.parseBody();
  const { first, last } = body;

  return c.json({ message: `Hello, ${first} ${last}!` });
});

app.put("/hello", async (c) => {
  const body = await c.req.json();
  const { first, last } = body;

  return c.json({ message: `Hello, ${first} ${last}!` });
});

app.get("/html", (c) => {
  return c.html("<h1>Hello HTML!</h1>");
});

app.get("/jsx", (c) => {
  function View() {
    return <h1>Hello JSX!</h1>;
  }
  return c.html(<View />);
});

app.get("/admin", basicAuth({ username: "admin", password: "admin" }), (c) => {
  return new Response("Hello Admin!");
});

app.get("*", serveStatic({ root: "./static" }));

app.route("/api", api);

export default app;
