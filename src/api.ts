import { Hono } from "hono";

const api = new Hono();

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
