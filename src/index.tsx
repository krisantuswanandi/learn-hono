import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import api from "./api";

const app = new Hono();
app.use(logger());

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
