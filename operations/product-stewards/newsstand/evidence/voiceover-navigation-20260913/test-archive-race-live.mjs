#!/usr/bin/env node
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = '/Users/alisoneakin/Projects/laidies-newsstand-overheard-20260907';
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || "/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core";
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp" };
const archive = JSON.parse(fs.readFileSync(path.join(root, "content/newsstand-archive-index.json"), "utf8"));
const raceQuery = "incompatible deadlines";
const expectedRaceResults = archive.items.filter(item => [item.headline, item.summary, item.edition, item.desk, item.editionDate, ...(item.themes || []), ...(item.concepts || []), item.status].join(" ").toLowerCase().includes(raceQuery)).length;
assert.ok(expectedRaceResults > 0, "fixture query must be present in the published index");

const held = [];
let released = false;
const server = http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://local").pathname);
  if (pathname === "/content/newsstand-archive-index.json" && !released) await new Promise(resolve => held.push(resolve));
  const file = path.resolve(root, "." + (pathname === "/" ? "/newsstand.html" : pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: chrome });

async function pageReady() {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.route("**/content/newsstand-archive-index.json", async route => { if (!released) await new Promise(resolve => held.push(resolve)); await route.continue(); });
  await page.goto("https://laidies.ai/newsstand", { waitUntil: "commit" });
  await page.waitForFunction(() => Boolean(window.NEWSSTAND_DATA && document.querySelector("#ns-search-button")));
  return page;
}
async function search(page, query) {
  await page.evaluate(value => {
    document.querySelector("#ns-search-input").value = value;
    document.querySelector("#ns-search-button").click();
  }, query);
  await page.waitForTimeout(40);
}

try {
  const searchPage = await pageReady();
  await search(searchPage, raceQuery);
  assert.match(await searchPage.locator("#ns-search-hint").textContent(), /^0 back issues found\./, "before the delayed index arrives, the historical service item is not in the fallback list");
  await searchPage.waitForTimeout(80);
  await searchPage.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo({top:0,behavior:"instant"}); document.querySelector("#ns-search-input").focus({ preventScroll: true }); });
  await searchPage.waitForTimeout(80);
  const preRelease = await searchPage.evaluate(() => ({ active: document.activeElement.id, scrollY: window.scrollY, hash: location.hash }));

  const filterPage = await pageReady();
  await filterPage.evaluate(() => {
    const theme = document.querySelector("#ns-archive-theme");
    theme.add(new Option("consumer products", "consumer products"));
    theme.value = "consumer products";
  });

  const storyPage = await pageReady();
  await storyPage.evaluate(() => { location.hash = "chatgpt-pets-20260913"; });
  await storyPage.locator("#ns-story-title").waitFor();
  const storyBefore = await storyPage.locator("#ns-story-title").textContent();

  released = true;
  held.splice(0).forEach(resolve => resolve());
  await searchPage.waitForFunction(expected => document.querySelector("#ns-search-hint").textContent === `${expected} back issues found.`, expectedRaceResults);
  const postRelease = await searchPage.evaluate(() => ({ active: document.activeElement.id, scrollY: window.scrollY, hash: location.hash, results: document.querySelectorAll("#ns-rack .ns-front-story").length }));
  assert.equal(postRelease.results, expectedRaceResults, "active search refreshes with every matching indexed result");
  assert.deepEqual({ active: postRelease.active, scrollY: postRelease.scrollY, hash: postRelease.hash }, preRelease, "archive refresh preserves focus, scroll position and history state");
  await filterPage.waitForFunction(() => document.querySelector("#ns-archive-theme").options.length > 1);
  assert.equal(await filterPage.locator("#ns-archive-theme").inputValue(), "consumer products", "selected theme survives archive filter population");
  await storyPage.waitForTimeout(80);
  assert.equal(await storyPage.locator("#ns-story-title").textContent(), storyBefore, "late archive response does not replace an open story");
  assert.equal(await storyPage.evaluate(() => location.hash), "#chatgpt-pets-20260913", "late archive response does not alter the story route");
  await Promise.all([searchPage.close(), filterPage.close(), storyPage.close()]);
} finally {
  released = true;
  held.splice(0).forEach(resolve => resolve());
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
console.log(`NEWSSTAND ARCHIVE INDEX RACE PASS delayed_query=${JSON.stringify(raceQuery)} results=${expectedRaceResults} filters=preserved focus_scroll_history=preserved story=unchanged`);
