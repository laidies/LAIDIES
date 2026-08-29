#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const source = fs.readFileSync(path.join(root, "index.html"), "utf8");
const restored = [
  ["/assets/media/opening-day-covers-v1/trailer/trailer-site.jpg", "The SUNNYVAiLE season trailer cover"],
  ["/assets/media/opening-day-covers-v1/04/04-site.jpg", "Episode 04: The Founding Mothers"],
  ["/assets/town-characters/avatars/mme-claio-avatar-v1.png", "Mme CLAi-O"],
  ["/assets/sunnyvaile-buildings/y2k-v3/05-bronze-aige.webp", "BRONZE AiGE on MAiN Street"],
  ["/assets/sunnyvaile-buildings/y2k-v3/17-dream-phone-booth.webp", "The Dream Phone booth on MAiN Street"],
  ["/assets/sunnyvaile-buildings/web/10-delta-lai-nu-sorority-house.jpg", "Delta LAi Nu on Wisteria Lane"],
  ["/assets/sunnyvaile-buildings/web/02-sunnyvaile-newsstand.jpg", "The SUNNYVAiLE NewsStand"],
  ["/assets/building-interiors/ksvl-booth.jpg", "Inside the KSVL 99.9 radio booth"],
  ["/assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png", "The Founding Mothers — Episode Four: It Was Women All Along"],
  ["/assets/sunnyvaile-streets/civic-square-midday.webp", "Civic Square at midday"],
  ["/assets/sunnyvaile-streets/schoolhouse-road-morning.webp", "Schoolhouse Road in the morning"],
  ["/assets/sunnyvaile-streets/lantern-hill-evening.webp", "Lantern Hill at evening"],
  ["/assets/closet/closet-interior-hero-v2-90s-vibrant.png", "The SUNNYVAiLE Closet"]
];
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
check(restored.every(([asset]) => source.includes(asset)), "a verified restored source path is missing from index.html");
check(source.includes('/assets/library/jeeves-scene.webp'), "Jeeves reference image was incorrectly removed");
check(source.includes('id="lookup"') && source.includes('Search the LIBRAiRY'), "Miss Jeeves search surface changed");

const mime = new Map([[".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".css", "text/css; charset=utf-8"], [".webp", "image/webp"], [".png", "image/png"], [".jpg", "image/jpeg"], [".svg", "image/svg+xml"], [".mp3", "audio/mpeg"]]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const resolved = path.resolve(root, requested.replace(/^\/+/, ""));
  if (!resolved.startsWith(`${root}${path.sep}`)) return response.writeHead(403).end("Forbidden");
  fs.readFile(resolved, (error, data) => {
    if (error) response.writeHead(404).end("Not found");
    else response.writeHead(200, {"content-type": mime.get(path.extname(resolved)) || "application/octet-stream"}).end(data);
  });
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({executablePath: chrome, headless: true});

try {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({viewport:{width, height:900}});
    const page = await context.newPage();
    const requests = [];
    page.on("request", (request) => requests.push(request.url()));
    page.on("pageerror", (error) => failures.push(`${width}px page error: ${error.message}`));
    await page.goto(`${origin}/index.html`, {waitUntil:"domcontentloaded"});
    await page.waitForSelector('img[src="/assets/media/opening-day-covers-v1/trailer/trailer-site.jpg"]', {state:"attached"});
    check(await page.locator("[data-asset-status='held'][data-home-held]").count() === 0,
      `${width}px still renders a held image panel`);
    check(await page.locator('img[src="/assets/library/jeeves-scene.webp"]').count() === 1,
      `${width}px Jeeves image/search surface was changed`);
    for (const [src, alt] of restored) {
      const image = page.locator(`img[src="${src}"][alt="${alt}"]`);
      check(await image.count() >= 1, `${width}px restored image is missing: ${src}`);
      await image.evaluateAll((nodes) => nodes.forEach((node) => { node.loading = "eager"; }));
      await page.waitForFunction((selector) => {
        const nodes = [...document.querySelectorAll(selector)];
        return nodes.length > 0 && nodes.every((node) => node.complete && node.naturalWidth > 0 && node.naturalHeight > 0);
      }, `img[src="${src}"]`);
      check(await image.evaluateAll((nodes) => nodes.every((node) => node.complete && node.naturalWidth > 0 && node.naturalHeight > 0)),
        `${width}px restored image did not decode: ${src}`);
    }
    check(await page.locator("#lookup").count() === 1 && await page.getByRole("button", {name:"Search the LIBRAiRY"}).count() === 1,
      `${width}px Miss Jeeves lookup controls are missing`);
    check(await page.locator("#new-here").count() === 1 &&
      await page.locator('#new-here a[href="/issues/issue-04.html"]').count() >= 1 &&
      await page.locator('#new-here a[href="/watch.html?ep=04"]').count() === 1,
      `${width}px Chick Flicks episode actions changed`);
    check(await page.getByRole("button", {name:"Consult Mme CLAi-O"}).count() === 1 &&
      await page.getByRole("button", {name:"Pick a drink"}).count() === 1 &&
      await page.getByRole("button", {name:"Visit Delta LAi Nu"}).count() === 1,
      `${width}px activity action text changed`);
    const fun = page.getByRole("button", {name:"Make me laugh"});
    await fun.focus();
    await page.keyboard.press("Enter");
    check(await fun.evaluate((button) => button.classList.contains("active")), `${width}px keyboard did not activate the fun filter`);
    check(await page.locator('.activity-grid article[data-tags="fun decide quick"]').evaluate((card) => !card.hidden) &&
      await page.locator('.activity-grid article[data-tags="fun quick"]').evaluate((card) => !card.hidden) &&
      await page.locator('.activity-grid article[data-tags="fun"]').evaluate((card) => !card.hidden),
      `${width}px held activity cards lost their fun filter membership`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${width}px homepage overflows`);
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error(`HOMEPAGE HELD ASSETS BROWSER FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("HOMEPAGE IMAGE RESTORATION BROWSER PASS held=0 restored=13 viewports=1440,390,320 checks=source-scope,image-decode,jeeves-preservation,actions,keyboard-filter,no-overflow");
