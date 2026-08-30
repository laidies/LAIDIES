#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) throw new Error("PLAYWRIGHT_CORE_PATH is required.");
const { chromium } = await import(
  pathToFileURL(path.join(playwrightRoot, "index.mjs"))
);
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const providerOrigin = "https://swqnkxzebxdbgyrzpdne.supabase.co";
const syntheticSupabaseModule = `
  export function createClient() {
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithOtp: async () => ({ data: null, error: null }),
        exchangeCodeForSession: async () => ({ data: null, error: null }),
        signOut: async () => ({ error: null })
      },
      rpc: async () => ({ data: null, error: null })
    };
  }
`;
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"]
]);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/"
    ? "resident-card.html"
    : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) ||
      !fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(resolved)) || "application/octet-stream"
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const results = [];

try {
  for (const viewport of [
    { label: "mobile", width: 390, height: 844 },
    { label: "desktop", width: 1280, height: 900 }
  ]) {
    const context = await browser.newContext({ viewport });
    const providerRequests = [];
    await context.addInitScript(() => {
      localStorage.setItem("laidies_card_username", "local_draft");
    });
    await context.route("https://cdn.jsdelivr.net/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/javascript; charset=utf-8",
        body: syntheticSupabaseModule
      })
    );
    await context.route(`${providerOrigin}/**`, (route) => {
      providerRequests.push(route.request().url());
      return route.abort("namenotresolved");
    });
    const page = await context.newPage();
    await page.goto(`${origin}/resident-card.html`, {
      waitUntil: "domcontentloaded"
    });
    await page.waitForFunction(() =>
      document.getElementById("rcAccountStatus")?.textContent.includes(
        "account service is not available"
      ), null, { timeout: 8_000 }
    );

    assert.deepEqual(
      providerRequests.map((url) => new URL(url).pathname),
      ["/auth/v1/health"],
      `${viewport.label}: runtime must make one bounded Auth health request`
    );
    assert.equal(
      await page.locator("#rcAccountSignedOut").isHidden(),
      true,
      `${viewport.label}: unavailable provider must hide the email request form`
    );
    assert.equal(
      await page.locator("#rcAccountSignedIn").isHidden(),
      true,
      `${viewport.label}: unavailable provider must not expose a signed-in state`
    );
    assert.equal(
      await page.evaluate(() => localStorage.getItem("laidies_card_username")),
      "local_draft",
      `${viewport.label}: provider failure must preserve device-local Card state`
    );
    assert.equal(
      await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      ),
      false,
      `${viewport.label}: unavailable state must not add horizontal overflow`
    );
    results.push(`${viewport.label}=pass`);
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log(`RESIDENT PROVIDER UNAVAILABLE BROWSER PASS ${results.join(" ")}`);
