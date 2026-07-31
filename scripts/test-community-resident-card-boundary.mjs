#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.COMMUNITY_ROOT || process.cwd());
const pagePath = path.join(root, "community.html");
const source = fs.readFileSync(pagePath, "utf8");
const checks = [];
const failures = [];

function check(value, label) {
  checks.push(label);
  if (!value) failures.push(label);
}

check(!source.includes("laidies-my-card"), "legacy laidies-my-card key absent");
check(!source.includes("loadMemberCards"), "legacy member-card loader absent");
check(!source.includes("cardData['my-card']"), "dynamic my-card record absent");
check(!/data-card=["']my-card["']/.test(source), "dynamic my-card element absent");
check(!/Sign in with a Resident Card|progress across devices|One email, no password/i.test(source),
  "community page makes no account or cross-device Card promise");
check(source.includes("Your Resident Card stays on this browser."),
  "device-local boundary is visible");
check(source.includes("It is not a community sign-in and does not unlock or publish anything."),
  "community authority boundary is visible");

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"]
]);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/" ? "community.html" : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved) ||
      fs.statSync(resolved).isDirectory()) {
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
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH ||
  path.join(root, ".ds-sync", "node_modules", "playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: chrome, headless: true });

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    localStorage.setItem("laidies-my-card", JSON.stringify({
      name: '<img src=x onerror="globalThis.__communityXss=1">',
      photo: '" onerror="globalThis.__communityPhotoXss=1',
      role: "<svg onload=globalThis.__communityRoleXss=1>",
      journey: "Injected",
      tools: "<script>globalThis.__communityToolsXss=1</script>",
      helpWith: "<img src=x onerror=globalThis.__communityHelpXss=1>"
    }));
  });
  await context.route("**/*", async (route) => {
    if (route.request().url().startsWith(origin)) return route.continue();
    return route.abort();
  });

  const page = await context.newPage();
  await page.goto(`${origin}/community.html`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#cardGrid .thumb-card");

  check(await page.locator("#cardGrid .thumb-card").count() === 7,
    "hostile legacy storage cannot add a card");
  check(await page.locator('[data-card="my-card"]').count() === 0,
    "no dynamic my-card is rendered");
  check(await page.locator("#cardGrid img[src='x']").count() === 0,
    "hostile image markup is absent");
  check(await page.evaluate(() =>
    !globalThis.__communityXss &&
    !globalThis.__communityPhotoXss &&
    !globalThis.__communityRoleXss &&
    !globalThis.__communityToolsXss &&
    !globalThis.__communityHelpXss
  ), "hostile legacy values do not execute");

  const first = page.locator("#cardGrid .thumb-card").first();
  await first.focus();
  await first.press("Enter");
  check(await page.locator("#cardOverlay").getAttribute("aria-hidden") === "false",
    "stock card still opens by keyboard");
  check((await page.locator("#overlayBody h3").innerText()).toUpperCase() === "ALI",
    "stock overlay content remains intact");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  check(await page.locator("#cardOverlay").getAttribute("aria-hidden") === "true",
    "stock overlay closes with Escape");
  check(await first.evaluate((element) => element === document.activeElement),
    "stock card receives focus on close");

  const memberFilter = page.locator('.filter-bar button[data-filter="member"]');
  await memberFilter.click();
  check(await page.locator('#cardGrid .thumb-card[data-type="member"]:not([hidden])').count() === 4,
    "member filter remains bounded to four static records");
  check(await page.locator('#cardGrid .thumb-card[data-type="stock"]:not([hidden])').count() === 0,
    "member filter hides stock records");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error(`COMMUNITY RESIDENT CARD BOUNDARY HOLD checks=${checks.length} failures=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`COMMUNITY RESIDENT CARD BOUNDARY PASS checks=${checks.length} legacy=absent hostile=contained stock=preserved`);
}
