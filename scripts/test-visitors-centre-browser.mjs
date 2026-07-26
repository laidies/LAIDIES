#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.VISITORS_CENTRE_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) throw new Error("Set PLAYWRIGHT_CORE_PATH to the playwright-core package directory");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const directorySource = fs.readFileSync(path.join(root, "content/site/sunnyvaile-directory.js"), "utf8");
const evidenceDir = path.resolve(
  process.env.VISITORS_CENTRE_EVIDENCE_DIR ||
  path.join(root, "operations", "product-stewards", "visitors-centre", "evidence-repair-1-2026-07-26")
);
fs.mkdirSync(evidenceDir, { recursive: true });
const mime = new Map([[".html","text/html; charset=utf-8"],[".js","text/javascript; charset=utf-8"],[".css","text/css; charset=utf-8"],[".png","image/png"],[".webp","image/webp"],[".mp3","audio/mpeg"]]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const rel = url.pathname === "/" ? "visitors-centre.html" : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, rel);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {"content-type": mime.get(path.extname(resolved)) || "application/octet-stream"});
  fs.createReadStream(resolved).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
let checkCount = 0;
const check = (condition, message) => {
  checkCount += 1;
  if (!condition) failures.push(message);
};

async function context(options = {}) {
  const ctx = await browser.newContext({
    viewport: options.viewport || { width: 1280, height: 900 },
    reducedMotion: options.reducedMotion,
    javaScriptEnabled: options.javaScriptEnabled !== false
  });
  if (options.noStorage) {
    await ctx.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new DOMException("blocked", "SecurityError"); } });
    });
  }
  if (options.missingContractId) {
    await ctx.addInitScript((id) => {
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(`#vc-directory-fallback [data-vc-id="${id}"]`)?.closest("li")?.remove();
      }, { capture: true });
    }, options.missingContractId);
  }
  await ctx.route("**/*", (route) => {
    const url = route.request().url();
    if (!url.startsWith(origin)) return route.abort();
    if (url.includes("/content/site/sunnyvaile-directory.js")) {
      if (options.noDirectory) return route.abort();
      if (options.staleDirectory) {
        return route.fulfill({
          status: 200,
          contentType: "text/javascript; charset=utf-8",
          body: directorySource
            .replace("DJ SunnyV spins PATRON SAiNT sets + town anthem.", "STALE DECORATIVE PROMISE SENTINEL")
            .replace("SAiNT themes on rotation", "STALE MECHANIC SENTINEL")
        });
      }
    }
    if (options.noMap && url.includes("/assets/final_map/")) return route.abort();
    return route.continue();
  });
  return ctx;
}

const expectedRoutes = [
  ["/visitors-centre.html", "visitors-centre"],
  ["/newsstand.html", "newsstand"],
  ["/chick-flicks.html", "chick-flicks"],
  ["/blend-snap.html", "blend-snap"],
  ["/games/madame-claio.html", "mme-claio"],
  ["/maikeover.html", "maikeover"],
  ["/bronze-aige.html", "bronze-aige"],
  ["/games/dream-phone.html", "dream-phone"],
  ["/mall.html", "mall"],
  ["/radio.html", "ksvl-radio"],
  ["/post-office.html", "post-office"],
  ["/town-hall.html", "town-hall"],
  ["/library.html", "library"],
  ["/sunnyvaile-high.html", "sunnyvaile-high"],
  ["/games/fairy-godmother.html", "fairy-godmother"],
  ["/sorority-house.html", "sorority-house"],
  ["/luminairy.html", "sanctuary"]
];

async function contrastRatio(page, foregroundSelector, backgroundSelector) {
  return page.evaluate(({ foregroundSelector, backgroundSelector }) => {
    const parse = (value) => {
      const match = String(value).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
      return match ? match.slice(1, 4).map(Number) : null;
    };
    const luminance = (rgb) => {
      const channels = rgb.map((value) => {
        const normalized = value / 255;
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const foreground = parse(getComputedStyle(document.querySelector(foregroundSelector)).color);
    const background = parse(getComputedStyle(document.querySelector(backgroundSelector)).backgroundColor);
    if (!foreground || !background) return 0;
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  }, { foregroundSelector, backgroundSelector });
}

try {
  const noJs = await context({ javaScriptEnabled: false });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  check(await noJsPage.locator("#vc-directory-fallback").isVisible(), "no-JS page hides the static directory");
  check(await noJsPage.locator("#vc-directory-fallback [data-vc-id]").count() === 17,
    "no-JS static DOM does not expose all 17 named destinations");
  const noJsRoutes = await noJsPage.locator("#vc-directory-fallback [data-vc-id]").evaluateAll((links) =>
    links.map((link) => [link.getAttribute("href"), link.getAttribute("data-vc-id")]));
  check(JSON.stringify(noJsRoutes) === JSON.stringify(expectedRoutes), "no-JS routes diverge from canonical order/parity");
  check(await noJsPage.locator(".vc-destination-picker").isHidden(),
    "no-JS exposes an empty interactive selector instead of the static directory");
  await noJs.close();

  const clean = await context();
  const page = await clean.newPage();
  await page.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#vc-directory option").nth(17).waitFor({ state: "attached" });
  check(await page.locator("#vc-building-card").isHidden(), "clean arrival exposes an unchosen destination CTA");
  check((await page.locator(".vc-welcome-copy").innerText()).includes("town front desk"), "clean arrival does not explain the room");
  check(await page.locator("#vc-directory option").count() === 18, "named directory does not contain all 17 destinations");
  for (const [href, id] of expectedRoutes) {
    await page.locator("#vc-directory").selectOption(id);
    check((await page.locator("#vc-card-enter").getAttribute("href")) === href,
      `interactive reveal route diverges for ${id}`);
  }
  await page.locator("#vc-directory").selectOption("library");
  check((await page.locator("#vc-card-title").innerText()).includes("LIBRAiRY"), "directory selection revealed the wrong destination");
  check((await page.locator("#vc-card-enter").getAttribute("href")) === "/library.html", "directory selection bound the wrong route");
  check(await page.evaluate(() => document.activeElement?.id === "vc-card-enter"), "selection did not move focus to the revealed action");
  await page.keyboard.press("Escape");
  check(await page.locator("#vc-building-card").isHidden(), "Escape did not close the reveal");
  check(await page.evaluate(() => document.activeElement?.id === "vc-directory"), "Escape did not restore focus to the directory");
  const mapSpot = page.locator('[data-vc-building="newsstand"]');
  await mapSpot.click();
  check((await page.locator("#vc-card-enter").getAttribute("href")) === "/newsstand.html", "map and directory routes diverge");
  await page.locator("#vc-card-close").click();
  check(await page.evaluate(() => document.activeElement?.getAttribute("data-vc-building") === "newsstand"), "Back did not restore focus to the map trigger");
  check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)), "desktop has horizontal overflow");
  await clean.close();

  const missingDirectory = await context({ noDirectory: true });
  const directoryPage = await missingDirectory.newPage();
  await directoryPage.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  check(await directoryPage.locator("#vc-directory-fallback").isVisible(), "failed shared directory does not expose recovery");
  check(await directoryPage.locator("#vc-directory-fallback [data-vc-id]").count() === 17,
    "failed shared directory does not expose all 17 named destinations");
  const failedRoutes = await directoryPage.locator("#vc-directory-fallback [data-vc-id]").evaluateAll((links) =>
    links.map((link) => [link.getAttribute("href"), link.getAttribute("data-vc-id")]));
  check(JSON.stringify(failedRoutes) === JSON.stringify(expectedRoutes),
    "shared-directory failure routes diverge from canonical parity");
  await directoryPage.screenshot({
    path: path.join(evidenceDir, "shared-directory-failure-all-17.png"),
    fullPage: true
  });
  await missingDirectory.close();

  const stale = await context({ staleDirectory: true });
  const stalePage = await stale.newPage();
  await stalePage.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  await stalePage.locator("#vc-directory option").nth(17).waitFor({ state: "attached" });
  for (const [id, state, phrase] of [
    ["ksvl-radio", "limited", "does not prove a track played"],
    ["fairy-godmother", "held", "not approved for promotion"],
    ["sunnyvaile-high", "held", "not a durable learning record"],
    ["maikeover", "held", "cross-device"],
    ["town-hall", "held", "not proof of reading"],
    ["dream-phone", "held", "remain under review"],
    ["post-office", "limited", "does not confirm delivery"]
  ]) {
    await stalePage.locator("#vc-directory").selectOption(id);
    check(await stalePage.locator("#vc-card-state").getAttribute("data-state") === state,
      `${id} reveal has the wrong current state`);
    check((await stalePage.locator("#vc-card-list").innerText()).includes(phrase),
      `${id} reveal omits its current limitation`);
  }
  const staleText = await stalePage.locator("#vc-building-card").innerText();
  check(!staleText.includes("STALE DECORATIVE PROMISE SENTINEL"),
    "reveal rendered stale shared oneLiner");
  check(!staleText.includes("STALE MECHANIC SENTINEL"),
    "reveal rendered stale shared mechanics");
  await stalePage.locator("#vc-directory").selectOption("fairy-godmother");
  check((await stalePage.locator("#vc-card-enter").innerText()).includes("check status"),
    "held destination navigation is not distinct from readiness/completion");
  await stale.close();

  const missingContract = await context({ missingContractId: "ksvl-radio" });
  const missingContractPage = await missingContract.newPage();
  await missingContractPage.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  await missingContractPage.locator("#vc-directory option").nth(17).waitFor({ state: "attached" });
  await missingContractPage.locator("#vc-directory").selectOption("ksvl-radio");
  check(await missingContractPage.locator("#vc-card-state").getAttribute("data-state") === "held",
    "missing destination contract does not fail held");
  check((await missingContractPage.locator("#vc-card-line").innerText()).includes("details are unavailable"),
    "missing destination contract invents a current summary");
  check((await missingContractPage.locator("#vc-card-list").innerText()).includes("navigation, not completion"),
    "missing destination contract does not bound navigation");
  await missingContract.close();

  const missingMap = await context({ noMap: true });
  const mapPage = await missingMap.newPage();
  await mapPage.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  await mapPage.locator("#vc-directory option").nth(17).waitFor({ state: "attached" });
  await mapPage.locator("#vc-map-status").waitFor({ state: "visible" });
  check((await mapPage.locator("#vc-map-status").innerText()).includes("named directory below still works"), "map failure is not announced");
  await mapPage.locator("#vc-directory").selectOption("chick-flicks");
  check((await mapPage.locator("#vc-card-enter").getAttribute("href")) === "/chick-flicks.html", "named directory failed when map image failed");
  await missingMap.close();

  const noStorage = await context({ noStorage: true });
  const storagePage = await noStorage.newPage();
  await storagePage.goto(`${origin}/visitors-centre.html?welcome-tour=start`, { waitUntil: "domcontentloaded" });
  await storagePage.locator("#svwtChip").waitFor();
  check((await storagePage.locator("#svwtChip").innerText()).includes("cannot save tour progress"), "storage failure does not produce honest tour recovery");
  check(await storagePage.evaluate(() => document.activeElement?.textContent.includes("Keep using")), "tour storage recovery is not focused");
  await noStorage.close();

  const mobile = await context({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  await mobilePage.locator("#vc-directory option").nth(17).waitFor({ state: "attached" });
  check(!(await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)), "390px layout has horizontal overflow");
  const transition = await mobilePage.locator(".vc-action").first().evaluate((el) => getComputedStyle(el).transitionDuration);
  check(transition.split(",").every((value) => parseFloat(value) === 0), `reduced motion still has transition duration ${transition}`);
  await mobilePage.locator("#vc-directory").selectOption("fairy-godmother");
  check(await mobilePage.locator("#vc-building-card").isVisible(), "mobile destination reveal is not visible");
  await mobile.close();

  const narrow = await context({ viewport: { width: 320, height: 700 }, reducedMotion: "reduce" });
  const narrowPage = await narrow.newPage();
  await narrowPage.goto(`${origin}/visitors-centre.html`, { waitUntil: "domcontentloaded" });
  await narrowPage.locator("#vc-directory option").nth(17).waitFor({ state: "attached" });
  check(!(await narrowPage.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
    "320px layout has horizontal overflow");
  await narrowPage.locator("#vc-directory").selectOption("fairy-godmother");
  check(await narrowPage.locator("#vc-building-card").isVisible(), "320px held reveal is not visible");
  check(await contrastRatio(narrowPage, "#vc-card-state", "#vc-building-card") >= 4.5,
    "320px held status contrast is below 4.5:1");
  check(await contrastRatio(narrowPage, "#vc-card-line", "#vc-building-card") >= 4.5,
    "320px reveal summary contrast is below 4.5:1");
  check(await narrowPage.locator("#vc-building-card").getAttribute("aria-live") === "polite",
    "destination status is not in a polite live region");
  await narrowPage.screenshot({
    path: path.join(evidenceDir, "320px-fairy-held-status.png"),
    fullPage: true
  });
  await narrow.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("VISITORS CENTRE BROWSER FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("VISITORS CENTRE BROWSER PASS");
console.log(`checks=${checkCount}`);
console.log("journeys=no-js-static-parity,clean,all-routes,directory,map,escape-focus,directory-failure,stale-data-limitations,map-failure,storage-failure,390px,320px,contrast,status,reduced-motion");
console.log(`evidence=${evidenceDir}`);
