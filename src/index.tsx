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

app.get("/html", (c) => {
  return c.html("<h1>Hello HTML!</h1>");
});

app.get("/jsx", (c) => {
  function View() {
    return <h1>Hello JSX!</h1>;
  }
  return c.html(<View />);
});

export default app;
