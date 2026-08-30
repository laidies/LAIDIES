#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.MALL_ROOT || process.cwd());
const contractRoot = path.resolve(process.env.MALL_CONTRACT_ROOT || process.cwd());
const register = JSON.parse(fs.readFileSync(path.join(
  contractRoot,
  "operations/product-stewards/mall/route-readiness-register.json"
), "utf8"));
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH.");
  process.exit(2);
}
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = new Map([
  [".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"], [".json", "application/json; charset=utf-8"],
  [".png", "image/png"], [".jpg", "image/jpeg"], [".webp", "image/webp"],
  [".svg", "image/svg+xml"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\/+/, "");
  let resolved = path.resolve(root, relative);
  if (!path.extname(resolved) && fs.existsSync(`${resolved}.html`)) resolved += ".html";
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
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const blockExternal = async (context) => {
  await context.route("**/*", (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort()
  );
};
const overflow = (page) => page.evaluate(() =>
  document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
);

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript(() => {
    localStorage.setItem("laidies_resident_card_v1", JSON.stringify({
      version: 1,
      fields: { displayName: "Mall fixture resident" }
    }));
  });
  await blockExternal(context);
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  await page.goto(`${origin}/mall.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#mallSearch").waitFor();
  check(await page.locator(".mall-board li[data-search]:visible").count() === 10,
    "initial directory does not show all ten departments");
  check(await page.locator("#mallCorridor .shop").count() === 11,
    "corridor does not contain ten departments plus Unit 11");
  for (const held of register.destinations.filter((item) =>
    /^HOLD PROMOTION\b/.test(item.claimVerdict)
  )) {
    check(await page.locator(`a[href="${held.route}"]`).count() === 0,
      `${held.id} HOLD PROMOTION remains enterable from the Mall`);
    check(await page.locator(
      `[data-mall-destination="${held.id}"][data-claim-verdict="hold-promotion"]`
    ).count() === 2, `${held.id} register hold is not rendered in directory and corridor`);
  }
  check(!(await overflow(page)), "1280px Mall has horizontal page overflow");

  await page.locator("#mallSearch").fill("Dunkaroos");
  await page.locator("#mallSearchButton").click();
  check(await page.locator(".mall-board li[data-search]:visible").count() === 1,
    "Dunkaroos search is not deterministic");
  check(await page.locator(".mall-board li[data-search]:visible a")
    .getAttribute("href") === "/mall/food-court.html",
  "Dunkaroos does not route to Food Court");
  check(await page.evaluate(() => document.activeElement?.id === "mallSearchStatus"),
    "successful search does not focus its announced result");

  await page.locator("#mallSearch").fill('<img src=x onerror="window.__MALL_INJECTED__=1">');
  await page.keyboard.press("Enter");
  check(await page.locator("#mallNoResults").isVisible(), "no-result state is hidden");
  check(await page.evaluate(() => document.activeElement?.id === "mallNoResults"),
    "no-result search does not focus the recovery state");
  check(!(await page.evaluate(() => Boolean(window.__MALL_INJECTED__))),
    "search query executed as markup");
  check((await page.locator("#mallNoResults").innerText())
    .includes("does not guarantee review, publication, a new shop, or a reward"),
  "Unit 11 no-result recovery overpromises outcome");

  await page.locator("#mallSearchReset").click();
  check(await page.locator(".mall-board li[data-search]:visible").count() === 10,
    "Show all does not reset the directory");
  check(await page.evaluate(() => document.activeElement?.id === "mallSearchStatus"),
    "directory reset does not focus its announced result");

  await page.locator('[data-mall-walk="next"]').focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);
  check((await page.locator("#mallCorridorStatus").innerText()).includes("Storefront 2"),
    "keyboard corridor movement is not announced");
  check(await page.evaluate(() =>
    document.activeElement?.getAttribute("data-mall-walk") === "next"),
  "corridor movement loses the initiating focus");

  console.log("MALL BROWSER STEP shell/search/corridor");
  for (const destination of register.destinations.filter((item) =>
    item.unit && item.unit !== "11"
  )) {
    const routePage = await context.newPage();
    await routePage.goto(`${origin}${destination.route}`, { waitUntil: "domcontentloaded" });
    check(await routePage.locator("h1").count() === 1,
      `${destination.id} rendered route lacks h1`);
    check(await routePage.locator('a[href="/mall.html"]').count() >= 1,
      `${destination.id} rendered route lacks Mall return`);
    await routePage.close();
    console.log(`MALL BROWSER STEP route ${destination.id}`);
  }

  await page.goto(`${origin}/shop`, { waitUntil: "domcontentloaded" });
  console.log(`MALL BROWSER STEP gift-shop-arrival ${page.url()} ${await page.title()}`);
  await page.locator(".shop-product").waitFor({ state: "attached" });
  await page.waitForTimeout(600);
  check(pageErrors.length === 0,
    `Gift Shop raised browser errors (${pageErrors.join(" | ")})`);
  check(await page.locator(".shop-buy").count() === 0,
    "Gift Shop renders a checkout action while commerce is held");
  check((await page.locator(".shop-state").innerText())
    .includes("BROWSE-ONLY CONCEPT COUNTER"),
  "Gift Shop does not expose its held state");
  check((await page.locator(".shop-product").innerText()).toLowerCase()
    .includes("concept price label · checkout not connected"),
  "Gift Shop product detail does not qualify price/checkout");
  check((await page.locator(".shop-product").innerText()).toLowerCase()
    .includes("save this interest on this device"),
  "Gift Shop describes device-local interest as stock/reservation");
  const renderedGiftLabels = await page.locator("#shopStockList small").allInnerTexts();
  for (const unsupported of ["BESTSELLER", "RESTOCK", "MADE TO ORDER"]) {
    check(!renderedGiftLabels.some((label) => label.toUpperCase().includes(unsupported)),
      `Gift Shop renders unsupported commerce label ${unsupported}`);
  }
  check(await page.locator("#shopProduct").count() === 1,
    "Gift Shop redraw replaced the stable product-region ID");
  check((await page.locator("#shopProduct").getAttribute("data-puffy-id")) ===
    "gift-shop-product-0",
  "Gift Shop redraw omitted the separate item persistence key");
  await page.locator('[data-department="digital"]').last().click();
  await page.waitForTimeout(500);
  check(await page.evaluate(() =>
    document.activeElement?.classList.contains("shop-product__name")),
  "Gift Shop department change does not focus the new detail heading");
  await page.locator('[data-department="all"]').last().click();
  await page.locator(".shop-hold").click();
  await page.locator(".puffy-picker .puffy-option").first().click();
  await page.waitForFunction(() =>
    document.querySelector("#shopInterestStatus")?.dataset.state === "success");
  check((await page.locator("#shopInterestStatus").innerText()).includes("saved privately"),
    "successful device save is not truthfully announced");
  check((await page.locator(".shop-hold").getAttribute("aria-pressed")) === "true",
    "successful device save is not reflected in the interest control state");
  await page.locator(".shop-hold").click();
  await page.locator(".puffy-picker-peel").click();
  await page.waitForFunction(() =>
    document.querySelector("#shopInterestStatus")?.innerText.includes("removed"));
  check((await page.locator("#shopHeldCount").innerText()) === "0",
    "device-local interest reset did not update the count");
  console.log("MALL BROWSER STEP gift-shop");

  await page.goto(`${origin}/handbook`, { waitUntil: "domcontentloaded" });
  await page.locator("#buildings + .puffy-save-row .puffy-btn").click();
  check(await page.locator(".puffy-picker .puffy-option").count() === 10,
    "Handbook valid Resident Card does not open the ten-sticker Puffy picker");
  check((await page.locator(".puffy-picker-head").innerText()).includes("Choose from your 10"),
    "Handbook valid Resident Card is misclassified as Card-less");
  console.log("MALL BROWSER STEP handbook-puffy");

  await page.goto(`${origin}/community/burn-book.html`, { waitUntil: "domcontentloaded" });
  check((await page.locator(".thread-hero").innerText()).includes("not a submission queue"),
    "Unit 11 rendered handoff is not truthful");
  check(await page.locator('.thread-hero a[href="/mall.html"]').isVisible(),
    "Unit 11 rendered handoff lacks Mall fallback");
  console.log("MALL BROWSER STEP unit-11");
  await context.close();

  const deniedStorage = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await deniedStorage.addInitScript(() => {
    const originalGet = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === "laidies_puffies_board") {
        return JSON.stringify([{
          id: "gift-shop-product-0",
          title: "Synthetic existing interest",
          sticker: "usable-25/01-heart-sunglasses.png"
        }]);
      }
      return originalGet.call(this, key);
    };
    Storage.prototype.setItem = function () {
      throw new DOMException("Synthetic storage denial", "QuotaExceededError");
    };
    Storage.prototype.removeItem = function () {
      throw new DOMException("Synthetic storage denial", "QuotaExceededError");
    };
  });
  await blockExternal(deniedStorage);
  const deniedPage = await deniedStorage.newPage();
  await deniedPage.goto(`${origin}/shop.html`, { waitUntil: "domcontentloaded" });
  await deniedPage.locator("#shopInterestStatus").waitFor({ state: "visible" });
  check((await deniedPage.locator("#shopInterestStatus").innerText())
    .includes("Nothing changed"),
  "storage denial does not expose a persistent failure");
  check(await deniedPage.locator(".shop-hold").isDisabled(),
    "storage-denied interest control remains available");
  check(!(await deniedPage.locator(".shop-hold").innerText()).includes("Interest saved"),
    "storage denial renders a false interest-saved state");
  check(await deniedPage.locator(".puffy-btn").count() === 0,
    "storage denial leaves a second save control available");
  await deniedStorage.close();
  console.log("MALL BROWSER STEP denied-storage");

  for (const [width, label] of [[640, "200%"], [320, "400%"]]) {
    const reflow = await browser.newContext({ viewport: { width, height: 900 } });
    await blockExternal(reflow);
    const reflowPage = await reflow.newPage();
    await reflowPage.goto(`${origin}/mall.html`, { waitUntil: "domcontentloaded" });
    await reflowPage.locator("#mallSearch").waitFor();
    const reflowOverflow = await overflow(reflowPage);
    const overflowers = reflowOverflow ? await reflowPage.evaluate(() =>
      Array.from(document.querySelectorAll("body *"))
        .filter((element) => element.getBoundingClientRect().right >
          document.documentElement.clientWidth + 1)
        .slice(0, 8)
        .map((element) => `${element.tagName}.${element.className}`)
    ) : [];
    check(!reflowOverflow,
      `${label} Mall proxy has horizontal page overflow (${overflowers.join(", ")})`);
    await reflow.close();
    console.log(`MALL BROWSER STEP ${label}`);
  }

  const reduced = await browser.newContext({
    viewport: { width: 1000, height: 800 },
    reducedMotion: "reduce"
  });
  await blockExternal(reduced);
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${origin}/mall.html`, { waitUntil: "domcontentloaded" });
  check(await reducedPage.evaluate(() =>
    getComputedStyle(document.querySelector("#mallCorridor")).scrollBehavior === "auto"),
  "reduced motion does not disable smooth corridor scrolling");
  await reducedPage.locator('[data-mall-walk="next"]').click();
  await reducedPage.waitForTimeout(30);
  check((await reducedPage.locator("#mallCorridorStatus").innerText())
    .includes("Storefront 2"),
  "reduced-motion corridor result is not announced");
  await reduced.close();
  console.log("MALL BROWSER STEP reduced-motion");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("MALL BROWSER FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("MALL BROWSER PASS");
console.log("proof=local discovery/routes/claims/keyboard/focus/reflow/reduced-motion only");
console.log("not_proof=editorial-rights,Hyvor moderation,commerce,fulfilment,deployment,public");
