import { expect, test } from "bun:test";
import app from "./index";

test("/", async () => {
  let res = await app.request("/api");
  expect(res.status).toBe(401);
  expect(await res.text()).toBe("Unauthorized");

  res = await app.request("/api", {
    headers: {
      authorization: `Basic ${btoa("api:api")}`,
    },
  });
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello API!");
});

test("/a", async () => {
  let res = await app.request("/api/a", {
    headers: {
      authorization: `Basic ${btoa("api:api")}`,
    },
  });
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello API A!");
});

test("/b", async () => {
  let res = await app.request("/api/b", {
    headers: {
      authorization: `Basic ${btoa("api:api")}`,
    },
  });
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello API B!");
});
