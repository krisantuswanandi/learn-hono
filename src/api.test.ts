import { expect, test } from "bun:test";
import app from "./index";

test("/", async () => {
  let res = await app.request("/api");
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello API!");
});

test("/a", async () => {
  let res = await app.request("/api/a");
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello API A!");
});

test("/b", async () => {
  let res = await app.request("/api/b");
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello API B!");
});
