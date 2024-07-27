import { expect, test } from "bun:test";
import app from "./index";

test("/", async () => {
  let res = await app.request("/");
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello Hono!");
});

test("/hello", async () => {
  let res = await app.request("/hello/john");
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "Hello, john!" });

  res = await app.request("/hello/john?mode=shout");
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "HELLO, JOHN!" });

  const formData = new FormData();
  formData.append("first", "John");
  formData.append("last", "Doe");
  res = await app.request("/hello", {
    method: "POST",
    body: formData,
  });
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "Hello, John Doe!" });

  res = await app.request("/hello", {
    method: "PUT",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ first: "John", last: "Doe" }),
  });
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "Hello, John Doe!" });
});

test("/html", async () => {
  let res = await app.request("/html");
  expect(res.status).toBe(200);
  expect(res.headers.get("content-type")).toContain("text/html; charset=UTF-8");
  expect(await res.text()).toBe("<h1>Hello HTML!</h1>");
});

test("/jsx", async () => {
  let res = await app.request("/jsx");
  expect(res.status).toBe(200);
  expect(res.headers.get("content-type")).toContain("text/html; charset=UTF-8");
  expect(await res.text()).toBe("<h1>Hello JSX!</h1>");
});

test("/admin", async () => {
  let res = await app.request("/admin");
  expect(res.status).toBe(401);
  expect(await res.text()).toBe("Unauthorized");

  res = await app.request("/admin", {
    headers: {
      authorization: `Basic ${btoa("admin:admin")}`,
    },
  });
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hello Admin!");
});

test("/robots.txt", async () => {
  let res = await app.request("/robots.txt");
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("User-agent: *\nDisallow: /\n");
});
