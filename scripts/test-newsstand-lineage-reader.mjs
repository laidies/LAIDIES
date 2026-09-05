#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const localPlaywright = path.join(root, ".ds-sync", "node_modules", "playwright-core");
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || (fs.existsSync(path.join(localPlaywright, "index.mjs")) ? localPlaywright : "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const parse = raw => { const context = { window: {} }; Function("window", raw)(context.window); return context.window.NEWSSTAND_DATA; };
const data = parse(fs.readFileSync(path.join(root, "content/newsstand-stories.js"), "utf8"));
const source = structuredClone(data.stories.find(story => story.status === "published" && story.edition === "daily"));
const old = { ...structuredClone(source), id: "lineage-old", slug: "lineage-old", headline: "Earlier synthetic report", the_story: "OLD BODY MUST REMAIN PRIVATE WHEN HELD.", predecessorStoryIds: [], successorStoryIds: ["lineage-new", "lineage-held"] };
const latest = { ...structuredClone(source), id: "lineage-new", slug: "lineage-new", headline: "Later synthetic report", the_story: "LATEST SYNTHETIC BODY", predecessorStoryIds: [old.id], successorStoryIds: [] };
const held = { ...structuredClone(source), id: "lineage-held", slug: "lineage-held", headline: "Held synthetic report", the_story: "HELD SUCCESSOR BODY MUST NEVER APPEAR.", status: "hold", sourceApproval: { status: "independent-review-required", record: "newsstand:source-approval:lineage-held" }, predecessorStoryIds: [old.id], successorStoryIds: [] };
data.stories = [...data.stories, old, latest, held];
const fixture = `window.NEWSSTAND_DATA = ${JSON.stringify(data)};`;
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp3": "audio/mpeg" };
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  if (url.pathname === "/content/newsstand-stories.js") { response.writeHead(200, { "content-type": "text/javascript" }); response.end(fixture); return; }
  const relative = url.pathname === "/" ? "newsstand.html" : url.pathname.replace(/^\/+/, "");
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.writeHead(404).end(); return; }
  response.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" }); fs.createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
try {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(`${origin}/newsstand.html#lineage-old`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => !!window.NewsstandContract && !!window.NEWSSTAND_DATA);
    await page.waitForTimeout(300);
    const published = await page.evaluate(() => {
      const article = document.querySelector(".ns-article");
      const lineage = article?.querySelector(".ns-story-lineage");
      const sources = article?.querySelector(".ns-article__sources");
      return { title: document.querySelector("#ns-story-title")?.textContent, hasLink: lineage?.querySelector('a[href="#lineage-new"]')?.textContent, bottom: !!lineage && !!sources && (sources.compareDocumentPosition(lineage) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0, hiddenSuccessor: !article?.textContent.includes("Held synthetic report") };
    });
    assert.deepEqual(published, { title: "Earlier synthetic report", hasLink: "Later synthetic report", bottom: true, hiddenSuccessor: true }, `${viewport.width}: published predecessor exposes only its eligible newer story at the bottom`);
    await page.goto(`${origin}/newsstand.html#lineage-new`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    assert.equal(await page.locator('.ns-story-lineage a[href="#lineage-old"]').textContent(), "Earlier synthetic report", `${viewport.width}: successor links back to earlier reporting`);
    old.status = "hold"; old.sourceApproval = { status: "independent-review-required", record: "newsstand:source-approval:lineage-old" };
    const heldFixture = `window.NEWSSTAND_DATA = ${JSON.stringify(data)};`;
    const heldContext = await browser.newContext({ viewport });
    await heldContext.route("**/content/newsstand-stories.js?*", route => route.fulfill({ contentType: "text/javascript", body: heldFixture }));
    const heldPage = await heldContext.newPage();
    await heldPage.goto(`${origin}/newsstand.html#lineage-old`, { waitUntil: "networkidle" });
    await heldPage.waitForTimeout(300);
    assert.equal(await heldPage.evaluate(() => window.NEWSSTAND_DATA.stories.find(story => story.id === "lineage-old").status), "hold", `${viewport.width}: held fixture replaces the canonical data source`);
    const heldView = await heldPage.evaluate(() => document.body.textContent);
    assert.ok(heldView.includes("Later synthetic report"), `${viewport.width}: held predecessor retains eligible forward navigation`);
    assert.equal(heldView.includes("OLD BODY MUST REMAIN PRIVATE WHEN HELD."), false, `${viewport.width}: held predecessor body remains absent`);
    assert.equal(heldView.includes("HELD SUCCESSOR BODY MUST NEVER APPEAR."), false, `${viewport.width}: held successor body remains absent`);
    assert.ok(heldView.includes("Currently withheld"), `${viewport.width}: previously published report does not claim never published`);
    await heldPage.goto(`${origin}/newsstand.html#lineage-new`, { waitUntil: "networkidle" });
    assert.equal(await heldPage.locator('.ns-story-lineage a[href="#lineage-old"]').textContent(), "Related report (currently withheld)");
    await heldPage.locator('.ns-story-lineage a[href="#lineage-old"]').click();
    await heldPage.waitForTimeout(150);
    assert.equal(await heldPage.locator('.ns-story-notice--hold strong').textContent(), "Currently withheld");
    const globallyHeldContext = await browser.newContext({ viewport });
    const globallyHeldData = { ...data, datasetStatus: "hold" };
    await globallyHeldContext.route("**/content/newsstand-stories.js?*", route => route.fulfill({ contentType: "text/javascript", body: "window.NEWSSTAND_DATA = " + JSON.stringify(globallyHeldData) + ";" }));
    const globallyHeldPage = await globallyHeldContext.newPage();
    await globallyHeldPage.goto(`${origin}/newsstand.html#lineage-old`, { waitUntil: "networkidle" });
    assert.equal(await globallyHeldPage.locator('.ns-story-lineage').count(), 0, `${viewport.width}: global publication hold prevents lineage exposure`);
    await globallyHeldContext.close();
    await heldContext.close();
    await context.close();
  }
  console.log("NEWSSTAND LINEAGE READER PASS desktop1280=1 mobile390=1 bottom_links=1 held_forward_link=1 held_bodies_hidden=1");
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
