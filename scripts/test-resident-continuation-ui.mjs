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
const evidenceRoot = path.join(
  root,
  "operations/product-stewards/resident-card/evidence-2026-07-29"
);
fs.mkdirSync(evidenceRoot, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"],
  [".mp4", "video/mp4"],
  [".vtt", "text/vtt; charset=utf-8"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/"
    ? "index.html"
    : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) ||
      !fs.existsSync(resolved) ||
      fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(resolved)) ||
      "application/octet-stream"
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });

async function assertNoOverflow(page) {
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.scrollWidth <= window.innerWidth
    ),
    true
  );
}

try {
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  await desktop.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
  assert.equal(await desktop.locator(".hero-jumps .button").count(), 5);
  assert.equal(
    await desktop.getByText("Pick up where I left off", { exact: true })
      .getAttribute("href"),
    "/resident-card.html#rcAccountTitle"
  );
  await assertNoOverflow(desktop);
  await desktop.screenshot({
    path: path.join(evidenceRoot, "homepage-continuation-desktop-1440.png"),
    fullPage: false
  });

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await mobile.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
  assert.equal(await mobile.locator(".hero-jumps .button").count(), 5);
  await assertNoOverflow(mobile);
  await mobile.screenshot({
    path: path.join(evidenceRoot, "homepage-continuation-mobile-390.png"),
    fullPage: false
  });

  await mobile.goto(`${origin}/resident-card.html`, {
    waitUntil: "domcontentloaded"
  });
  await mobile.getByRole("heading", {
    name: "Pick up where you left off."
  }).waitFor();
  assert.match(
    await mobile.locator(".rc-local-facts").innerText(),
    /episode position, tour completion/
  );
  await assertNoOverflow(mobile);
  await mobile.screenshot({
    path: path.join(evidenceRoot, "resident-continuation-mobile-390.png"),
    fullPage: true
  });

  await desktop.goto(`${origin}/newsstand.html`, {
    waitUntil: "domcontentloaded"
  });
  const accountLink = desktop.locator('a.sv-signin').first();
  assert.equal(
    await accountLink.getAttribute("href"),
    "/resident-card.html#rcAccountTitle"
  );

  console.log(
    "RESIDENT CONTINUATION UI PASS " +
    "homepage_buttons=5 desktop_overflow=0 mobile_overflow=0 " +
    "account_route=1 resident_copy=1"
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
