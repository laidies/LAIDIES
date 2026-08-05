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
const targets = [
  "/assets/bws-fortune-teller/frame-1-closed.webp",
  "/assets/games/girl-talk/truth-card-face.webp",
  "/assets/games/girl-talk/dare-card-face.webp",
  "/assets/mavens/y2k-stained-glass-v3-finished/ada-lovelace-y2k-stained-glass.png",
  "/assets/postcards/from-sunnyvaile/pc-chick-flicks.webp",
  "/assets/postcards/from-sunnyvaile/pc-dial-up.webp",
  "/assets/postcards/from-sunnyvaile/pc-puffy-binder.webp",
  "/assets/town-characters/scenes/mme-claio-scene.webp"
  ,"/assets/sunnyvaile-buildings/web/02-sunnyvaile-newsstand.jpg",
  "/assets/town-characters/scenes/dj-sunnyv-scene.webp"
  ,"/assets/sunnyvaile-streets/lantern-hill-evening.webp",
  "/assets/sunnyvaile-streets/civic-square-midday.webp",
  "/assets/sunnyvaile-streets/schoolhouse-road-morning.webp"
];
const held = [
  ["dial-up", "Dial-up postcard visual held"],
  ["ada", "Ada Lovelace portrait visual held"],
  ["chick-flicks", "Chick Flicks postcard visual held"],
  ["mme-claio", "Mme CLAi-O visual held"],
  ["bws", "Businesswomen’s Special visual held"],
  ["dream-phone", "Dream Phone booth visual held"],
  ["girl-talk-truth", "Girl Talk Truth visual held"],
  ["girl-talk-dare", "Girl Talk Dare visual held"],
  ["puffy-binder", "Puffy binder postcard visual held"],
  ["newsstand", "NewsStand visual held"],
  ["dj-sunnyv", "DJ SunnyV studio visual held"],
  ["luminairy-spot", "LUMINAiRY visual held"],
  ["civic-square", "Civic Square visual held"],
  ["schoolhouse-road", "Schoolhouse Road visual held"],
  ["lantern-hill", "Lantern Hill visual held"]
];
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
check(targets.every((asset) => !source.includes(asset)), "one of the eight target source paths remains in index.html");
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
    await page.waitForSelector("[data-home-held='dial-up']");
    check(await page.locator("[data-asset-status='held'][data-home-held]").count() === 15,
      `${width}px does not render exactly fifteen held panels`);
    for (const [id, label] of held) {
      const panel = page.locator(`[data-home-held="${id}"]`);
      check(await panel.count() === 1 && (await panel.textContent()).includes(label),
        `${width}px held panel is missing or unclear: ${id}`);
      check(await panel.locator("img").count() === 0, `${width}px held panel still contains an image: ${id}`);
    }
    check(await page.locator('img[src="/assets/library/jeeves-scene.webp"]').count() === 1,
      `${width}px Jeeves image/search surface was changed`);
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
    check(!requests.some((url) => targets.some((asset) => url.includes(asset))),
      `${width}px page requested a removed target asset`);
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
console.log("HOMEPAGE HELD ASSETS BROWSER PASS panels=15 viewports=1440,390,320 checks=source-absence,jeeves-preservation,held-labels,actions,keyboard-filter,no-overflow,no-image-request");
