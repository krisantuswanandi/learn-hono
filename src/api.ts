import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

const api = new Hono();

api.use(basicAuth({ username: "api", password: "api" }));

api.get("/", (c) => {
  return c.text("Hello API!");
});

api.get("/a", (c) => {
  return c.text("Hello API A!");
});

api.get("/b", (c) => {
  return c.text("Hello API B!");
});

export default api;
