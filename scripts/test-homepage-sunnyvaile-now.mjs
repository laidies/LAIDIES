#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) throw new Error("PLAYWRIGHT_CORE_PATH is required.");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const evidence = path.join(root, "operations/product-stewards/town-entry-homepage/evidence-sunnyvaile-now-20260904");
fs.mkdirSync(evidence, { recursive: true });

const mime = new Map([[".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"], [".css", "text/css; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".png", "image/png"], [".jpg", "image/jpeg"], [".webp", "image/webp"], [".svg", "image/svg+xml"], [".mp4", "video/mp4"], [".mp3", "audio/mpeg"]]);
const feed = {
  schemaVersion: "newsstand-public-feed-v1",
  generatedAt: "2026-09-04T16:04:05Z",
  expiresAt: "2099-09-05T16:04:05Z",
  state: "current",
  current: [
    { id: "openai-gpt-6-astra-launch-2026-09-04", edition: "daily", headline: "GPT-6 Astra can do more on your computer. That makes its permissions matter more.", summary: "Start with one work task you already understand well and check its access before using sensitive records.", publishedAt: "2026-09-04T16:04:05Z", url: "/newsstand.html#openai-gpt-6-astra-launch-2026-09-04", status: "published", current: true },
    { id: "weekly-accountable-systems-2026-08-24", edition: "weekly", headline: "The AI stories worth carrying into this week.", summary: "Read this week in order, then choose one repeatable workflow to practise.", publishedAt: "2026-08-26T16:00:00Z", url: "/newsstand.html#weekly-accountable-systems-2026-08-24", status: "published", current: true },
    { id: "big-picture-data-centre-deal-2026-08-24", edition: "big-picture", headline: "Why data centres became a public villain—and what a better bargain would look like", summary: "The useful question is what bargain the public is being asked to make.", publishedAt: "2026-08-24T17:00:00Z", url: "/newsstand.html#big-picture-data-centre-deal-2026-08-24", status: "published", current: true },
    { id: "front-paige-accountable-systems-2026-08-24", edition: "daily", headline: "Women helped build AI. Will they shape its future at work?", summary: "Pick one recurring piece of real work and use AI on it within your company rules.", publishedAt: "2026-08-24T17:00:00Z", url: "/newsstand.html#front-paige-accountable-systems-2026-08-24", status: "published", current: true }
  ],
  archive: []
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  if (url.pathname === "/content/newsstand-public-feed.json") {
    response.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(feed));
    return;
  }
  const relative = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\/+/, "");
  const target = path.resolve(root, relative);
  if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    response.writeHead(404).end("Not found"); return;
  }
  response.writeHead(200, { "content-type": mime.get(path.extname(target)) || "application/octet-stream" });
  fs.createReadStream(target).pipe(response);
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });

try {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 900 : 844 } });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.addInitScript(() => sessionStorage.setItem("laidies_home_ident_seen", "1"));
    await page.route("https://laidies.ai/content/newsstand-public-feed.json", route => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(feed) }));
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.querySelector("#sunny-now").offsetTop + 120));
    await page.waitForTimeout(150);
    assert.equal(errors.length, 0, `${width}px has page errors: ${errors.join(" | ")}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}px horizontal overflow`);
    assert.equal(await page.locator("[data-now-kicker]").innerText(), "FRESH FROM THE NEWSSTAND");
    assert.match(await page.locator("[data-now-title]").innerText(), /GPT-6 Astra/);
    assert.equal(await page.locator("[data-now-secondary]:visible").count(), 2);
    assert.equal(await page.locator("[data-now-useful]:visible").count(), 1);
    assert.equal(await page.locator(".sunny-now-radio").getAttribute("href"), "/radio.html");
    assert.equal(await page.locator("[data-sunny-switchboard]").isVisible(), false, "switchboard must not cover the NewsStand preview");
    await page.locator("#sunny-now").screenshot({ path: path.join(evidence, `sunnyvaile-now-${width}.png`) });
    await page.evaluate(() => window.scrollTo(0, document.querySelector("#today").offsetTop + 120));
    await page.waitForTimeout(150);
    await page.evaluate(() => window.svShowResume("Episode 03 · The Burn Book Problem", "/watch.html?ep=03"));
    assert.equal(await page.locator(".fc-resume").isVisible(), true);
    assert.equal(await page.locator("[data-switchboard-resume]").getAttribute("href"), "/watch.html?ep=03");
    const expectedQuickLinks = width <= 650 ? 4 : 5;
    assert.equal(await page.locator("[data-sunny-switchboard] a:visible").count(), expectedQuickLinks);
    await page.close();
  }
  const source = fs.readFileSync(path.join(root, "content/site/homepage.js"), "utf8");
  assert.match(source, /result\.state !== 'account-backed'/);
  assert.match(source, /LAIDIESResidentContinuationV1\.syncWith/);
  console.log("HOMEPAGE SUNNYVAILE NOW PASS desktop=1440 mobile=390,320 overflow=0 current_feed=1 archive_guard=1 account_resume_binding=1 quick_routes=5");
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
