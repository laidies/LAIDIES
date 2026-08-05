#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();
const servedRoot = path.resolve(process.env.MME_CLAIO_ROOT || repoRoot);
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}

const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"]
]);

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  const urlPath = decodeURIComponent(requestUrl.pathname);
  const relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const resolved = path.resolve(servedRoot, relative);
  if (!resolved.startsWith(`${servedRoot}${path.sep}`) && resolved !== path.join(servedRoot, "index.html")) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  fs.readFile(resolved, (error, data) => {
    if (error) {
      response.writeHead(404).end("Not found");
      return;
    }
    let body = data;
    if (relative === "games/madame-claio.html") {
      const fixture = requestUrl.searchParams.get("deck_fixture");
      if (fixture === "stale") {
        body = data.toString("utf8").replace(
          "A shiny opportunity still needs a friction check.",
          "A semantically valid stale projection remains accepted."
        );
      } else if (fixture === "malformed") {
        body = data.toString("utf8").replace(
          /(<script type="application\/json" id="claioDeckData">)[^<]*/,
          "$1{"
        );
      }
    }
    response.writeHead(200, { "content-type": mime.get(path.extname(resolved)) || "application/octet-stream" });
    response.end(body);
  });
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const hasOverflow = (page) => page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
);
const parseRgba = (value) => {
  const parts = String(value).match(/[\d.]+/g)?.map(Number) || [];
  return { r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0, a: parts[3] ?? 1 };
};
const over = (front, back) => ({
  r: front.r * front.a + back.r * (1 - front.a),
  g: front.g * front.a + back.g * (1 - front.a),
  b: front.b * front.a + back.b * (1 - front.a),
  a: 1
});
const luminance = (color) => {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
};
const contrast = (foreground, background, base) => {
  const opaqueBackground = over(background, base);
  const opaqueForeground = over(foreground, opaqueBackground);
  const values = [luminance(opaqueForeground), luminance(opaqueBackground)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

async function openPage({
  viewport = { width: 1000, height: 850 },
  seed = {},
  disableStorage = false,
  failRemove = false,
  failSetKey = null,
  clockNow = null,
  deckFixture = null
} = {}) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  await context.addInitScript(({ stored, denied, removeDenied, deniedSetKey, fixedNow }) => {
    if (Number.isFinite(fixedNow)) {
      Date.now = () => fixedNow;
    }
    if (denied) {
      for (const method of ["getItem", "setItem", "removeItem"]) {
        Object.defineProperty(Storage.prototype, method, {
          configurable: true,
          value() { throw new Error("storage disabled"); }
        });
      }
    } else {
      for (const [key, value] of Object.entries(stored)) {
        localStorage.setItem(key, value);
      }
      if (removeDenied) {
        Object.defineProperty(Storage.prototype, "removeItem", {
          configurable: true,
          value() { throw new Error("remove disabled"); }
        });
      }
      if (deniedSetKey) {
        const originalSetItem = Storage.prototype.setItem;
        Object.defineProperty(Storage.prototype, "setItem", {
          configurable: true,
          value(key, value) {
            if (key === deniedSetKey) throw new Error("selected write disabled");
            return originalSetItem.call(this, key, value);
          }
        });
      }
    }
    let index = 0;
    const values = [0, 0, 0.5, 0.25, 0.75, 0.1, 0.9];
    Math.random = () => values[Math.min(index++, values.length - 1)];
  }, { stored: seed, denied: disableStorage, removeDenied: failRemove, deniedSetKey: failSetKey, fixedNow: clockNow });
  const page = await context.newPage();
  page.on("pageerror", (error) => {
    const detail = error.stack || error.message;
    if (/scripts\.clarity\.ms/.test(detail) && /storage disabled/.test(detail)) return;
    failures.push(`browser exception: ${detail}`);
  });
  const fixtureQuery = deckFixture ? `?deck_fixture=${encodeURIComponent(deckFixture)}` : "";
  await page.goto(`${origin}/games/madame-claio.html${fixtureQuery}`, { waitUntil: "domcontentloaded" });
  await page.locator("#claioFortuneButton").waitFor({ state: "attached" });
  if (!deckFixture) {
    await page.waitForFunction(() => {
      const button = document.querySelector("#claioFortuneButton");
      const hotspot = document.querySelector("#claioDeckHotspot");
      return button && hotspot && !button.disabled && !hotspot.disabled &&
        button.textContent.trim() === "Cut the deck";
    });
  }
  return { context, page };
}

async function draw(page, expectedCount) {
  const main = page.locator("#claioFortuneButton");
  const control = await main.isVisible() ? main : page.locator("#claioDeckHotspot");
  await control.click();
  await page.waitForFunction(
    (count) => window.getClaioLocalState?.().count === count &&
      document.querySelector("#fortuneCard")?.classList.contains("is-visible"),
    expectedCount
  );
}

try {
  for (const deckFixture of ["malformed", "stale"]) {
    const held = await openPage({ deckFixture });
    await held.page.waitForFunction(() =>
      document.querySelector("#claioFortuneButton")?.disabled &&
      document.querySelector("#claioDeckHotspot")?.disabled
    );
    await held.page.evaluate(() => {
      document.querySelector("#claioFortuneButton")?.click();
      document.querySelector("#claioDeckHotspot")?.click();
    });
    check(!(await held.page.locator("#fortuneCard").evaluate(element => element.classList.contains("is-visible"))),
      `${deckFixture} runtime deck exposed a reading`);
    check(await held.page.evaluate(() => localStorage.getItem("claio-call-count") === null),
      `${deckFixture} runtime deck wrote a call count`);
    check(await held.page.evaluate(() => localStorage.getItem("claio-call-history") === null),
      `${deckFixture} runtime deck wrote reading history`);
    check((await held.page.locator("#claioLiveStatus").innerText()).includes("deck is unavailable"),
      `${deckFixture} runtime deck did not disclose unavailability`);
    await held.context.close();
  }

  const validBadgeDate = "2024-02-29T12:00:00.000Z";
  const unrelatedBadge = {
    id: "other-keepsake",
    title: "Other keepsake",
    sticker: "OTHER",
    source: "Another activity",
    unlockedAt: validBadgeDate
  };
  const returning = await openPage({
    viewport: { width: 1280, height: 900 },
    seed: { laidiesSecretBadges: JSON.stringify({ "other-keepsake": unrelatedBadge }) }
  });
  const { page } = returning;
  check(await page.locator(".claio-boundary").isVisible(), "new visitor cannot see random/non-tailored truth");
  const boundaryText = await page.locator(".claio-boundary").innerText();
  check(boundaryText.includes("random authored card"), "new visitor misses random-card truth");
  check(boundaryText.includes("not tailored"), "new visitor misses non-tailored truth");
  check(boundaryText.includes("does not analyze or answer a question"), "new visitor may infer prompt analysis");
  check(boundaryText.includes("not a prediction or professional advice"), "new visitor misses authority limits");
  check(await page.locator("#claioQuestion, .claio-arrival textarea").count() === 0, "free-text prompt remains available");
  check(await page.locator("#claioSafety").isVisible(), "high-stakes boundary is not permanently visible");
  const safetyText = (await page.locator("#claioSafety").innerText()).toLowerCase();
  for (const phrase of ["emergencies", "personal safety", "health", "legal", "financial", "current-fact", "local emergency services", "qualified professional", "primary source"]) {
    check(safetyText.includes(phrase), `visible high-stakes boundary misses ${phrase}`);
  }
  check((await page.locator("#claioStorageStatus").innerText()).includes("this browser on this device"), "new visitor misses local persistence truth");
  check(!(await hasOverflow(page)), "desktop page has horizontal overflow");

  const safetyColors = await page.evaluate(() => {
    const panel = document.querySelector("#claioSafety");
    return {
      heading: getComputedStyle(document.querySelector("#claioSafetyHeading")).color,
      paragraph: getComputedStyle(document.querySelector("#claioSafetyMessage")).color,
      background: getComputedStyle(panel).backgroundColor,
      base: getComputedStyle(document.body).backgroundColor
    };
  });
  for (const [label, foreground] of [["heading", safetyColors.heading], ["paragraph", safetyColors.paragraph]]) {
    check(
      contrast(parseRgba(foreground), parseRgba(safetyColors.background), parseRgba(safetyColors.base)) >= 4.5,
      `safety ${label} contrast is below 4.5:1`
    );
  }
  await page.locator("#claioSafety").focus();
  check(await page.evaluate(() => document.activeElement?.id === "claioSafety"), "safety boundary cannot receive programmatic focus");
  check(await page.locator("#claioSafety").evaluate((element) => getComputedStyle(element).outlineStyle !== "none"), "safety focus indicator is not visible");

  await page.locator("#claioFortuneButton").focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => window.getClaioLocalState?.().count === 1);
  await page.locator("#fortuneCard.is-visible").waitFor();
  const firstCard = await page.locator("#fortuneCardName").innerText();
  check(await page.evaluate(() => document.activeElement?.id === "fortuneCard"), "completed reading did not focus the result");
  check((await page.locator("#claioLiveStatus").innerText()).includes(`Reading complete: ${firstCard}`), "completed reading was not announced");
  check(await page.evaluate(() => localStorage.getItem("claio-call-count") === "1"), "successful reading did not persist count");
  const firstStored = JSON.parse(await page.evaluate(() => localStorage.getItem("claio-call-history")));
  check(firstStored.length === 1 && firstStored[0].card === firstCard, "successful reading did not persist canonical history");

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#claioArrivalStatus")?.textContent.includes("On this device"));
  const returningStatus = await page.locator("#claioArrivalStatus").innerText();
  check(returningStatus.toLowerCase().includes(firstCard.toLowerCase()), "returning arrival does not restore the authoritative last card");
  await draw(page, 2);
  const secondCard = await page.locator("#fortuneCardName").innerText();
  check(secondCard !== firstCard, "returning draw immediately repeated the stored last card");

  for (let count = 3; count <= 5; count += 1) await draw(page, count);
  check(await page.locator("#badgeReveal").isVisible(), "five readings did not reveal the local keepsake");
  const storedBadges = JSON.parse(await page.evaluate(() => localStorage.getItem("laidiesSecretBadges")));
  check(storedBadges?.["hotline-regular"]?.scope === "device-local", "stored keepsake lacks device-local scope");
  check(storedBadges?.["other-keepsake"]?.id === "other-keepsake", "valid unrelated badge was not preserved");
  check((await page.locator("#badgeReveal").innerText()).includes("not an account reward"), "keepsake copy implies durable reward scope");

  await page.locator("#clearClaioHistory").click();
  check(await page.evaluate(() => document.activeElement?.id === "claioFortuneButton"), "reset did not return focus to the draw control");
  check((await page.locator("#claioLiveStatus").innerText()).includes("were cleared from this browser"), "reset was not announced");
  check(await page.evaluate(() => localStorage.getItem("claio-call-count") === null), "reset left local call count");
  check(await page.evaluate(() => localStorage.getItem("claio-call-history") === null), "reset left local history");
  const resetBadges = JSON.parse(await page.evaluate(() => localStorage.getItem("laidiesSecretBadges")));
  check(!resetBadges["hotline-regular"], "reset left Mme CLAi-O keepsake");
  check(resetBadges["other-keepsake"]?.id === "other-keepsake", "reset removed an unrelated valid badge");
  await returning.context.close();

  const denied = await openPage({ disableStorage: true });
  check((await denied.page.locator("#claioStorageStatus").innerText()).includes("storage is unavailable"), "storage failure is not disclosed");
  await denied.page.locator("#claioFortuneButton").click();
  await denied.page.locator("#fortuneCard.is-visible").waitFor();
  check(await denied.page.evaluate(() => document.activeElement?.id === "fortuneCard"), "storage denial broke reading completion");
  for (let attempt = 1; attempt < 5; attempt += 1) {
    const previousCard = await denied.page.locator("#fortuneCardName").innerText();
    await denied.page.evaluate(() => document.querySelector("#claioFortuneButton")?.click());
    await denied.page.waitForFunction((prior) =>
      document.querySelector("#fortuneCardName")?.textContent !== prior &&
      document.querySelector("#fortuneCard")?.classList.contains("is-visible") &&
      document.querySelector("#claioFortuneButton")?.textContent.trim() === "PULL ANOTHER",
      previousCard
    );
  }
  const deniedState = await denied.page.evaluate(() => window.getClaioLocalState());
  check(deniedState.count === 0 && deniedState.history.length === 0, "storage denial falsely advanced saved progress");
  check(!(await denied.page.locator("#badgeReveal").isVisible()), "storage denial falsely unlocked Hotline Regular");
  check(!(await denied.page.locator("#claioArrivalStatus").innerText()).includes("Hotline Regular"), "storage denial falsely claimed Hotline Regular status");
  check((await denied.page.locator("#claioLiveStatus").innerText()).includes("were not saved"), "storage denial did not announce unsaved result");
  await denied.context.close();

  const partialKeepsakeWrite = await openPage({
    failSetKey: "laidiesSecretBadges",
    seed: {
      "claio-call-count": "4",
      "claio-call-history": JSON.stringify([{ card: "The Jelly Sandal", read: "canonicalized after load" }])
    }
  });
  await partialKeepsakeWrite.page.locator("#claioFortuneButton").click();
  await partialKeepsakeWrite.page.locator("#fortuneCard.is-visible").waitFor();
  const partialState = await partialKeepsakeWrite.page.evaluate(() => window.getClaioLocalState());
  check(partialState.count === 4, "failed keepsake write advanced saved reading count");
  check(await partialKeepsakeWrite.page.evaluate(() => localStorage.getItem("claio-call-count") === "4"), "failed keepsake write did not roll back raw count");
  check(await partialKeepsakeWrite.page.evaluate(() => JSON.parse(localStorage.getItem("claio-call-history") || "[]").length === 1), "failed keepsake write did not roll back raw history");
  check(!(await partialKeepsakeWrite.page.locator("#badgeReveal").isVisible()), "failed keepsake write exposed the keepsake");
  check(!(await partialKeepsakeWrite.page.locator("#claioArrivalStatus").innerText()).includes("Hotline Regular"), "failed keepsake write falsely greeted Hotline Regular");
  check((await partialKeepsakeWrite.page.locator("#claioLiveStatus").innerText()).includes("were not saved"), "failed keepsake write did not disclose rollback");
  await partialKeepsakeWrite.context.close();

  const failedClear = await openPage({
    failRemove: true,
    seed: {
      "claio-call-count": "1",
      "claio-call-history": JSON.stringify([{ card: "The Jelly Sandal", read: "forged copy" }]),
      laidiesSecretBadges: JSON.stringify({
        "hotline-regular": {
          id: "hotline-regular",
          title: "Hotline Regular local keepsake",
          sticker: "Mme CLAi-O",
          source: "Madame CLAi-O",
          unlockedAt: "2024-02-29T12:00:00.000Z",
          scope: "device-local"
        }
      })
    }
  });
  await failedClear.page.locator("#clearClaioHistory").click();
  check((await failedClear.page.locator("#claioLiveStatus").innerText()).includes("could not be cleared completely"), "failed deletion falsely announced success");
  check(await failedClear.page.evaluate(() => localStorage.getItem("claio-call-count") === "1"), "failed deletion did not preserve the prior count");
  check(await failedClear.page.evaluate(() => JSON.parse(localStorage.getItem("claio-call-history") || "[]").length === 1), "failed deletion did not preserve prior history");
  await failedClear.page.reload({ waitUntil: "domcontentloaded" });
  await failedClear.page.locator("#claioArrivalStatus").waitFor({ state: "visible" });
  const restoredArrival = `${await failedClear.page.locator("#claioArrivalStatus").innerText()} ${await failedClear.page.locator("#claioArrivalNote").innerText()}`;
  check(restoredArrival.toLowerCase().includes("the jelly sandal"), "failed deletion lost the returning-state truth after reload");
  await failedClear.context.close();

  const noJsContext = await browser.newContext({ viewport: { width: 390, height: 820 }, javaScriptEnabled: false });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${origin}/games/madame-claio.html`, { waitUntil: "domcontentloaded" });
  check(await noJsPage.locator(".claio-no-js").isVisible(), "no-JavaScript visitor receives no recovery explanation");
  check(!(await noJsPage.locator("#claioFortuneButton").isVisible()), "no-JavaScript visitor sees a dead labelled draw control");
  check(!(await noJsPage.locator("#claioDeckHotspot").isVisible()), "no-JavaScript visitor sees a dead room hotspot");
  await noJsContext.close();

  for (const raw of ["-7", "999999999999999999", "1.5", "1e3", "Infinity"]) {
    const corrupt = await openPage({ seed: { "claio-call-count": raw } });
    const state = await corrupt.page.evaluate(() => window.getClaioLocalState());
    check(state.count === 0, `invalid count was trusted: ${raw}`);
    check(await corrupt.page.evaluate(() => localStorage.getItem("claio-call-count") === null), `invalid count was not discarded: ${raw}`);
    await draw(corrupt.page, 1);
    check(await corrupt.page.evaluate(() => localStorage.getItem("claio-call-count") === "1"), `invalid count did not restart safely: ${raw}`);
    await corrupt.context.close();
  }

  const validHistoryEntry = {
    card: "The Jelly Sandal",
    read: "forged stored display copy"
  };
  const oversizedHistory = Array.from({ length: 12 }, () => validHistoryEntry);
  oversizedHistory.push({ card: "Unknown Future Card", read: "invented" }, "bad");
  const corruptHistory = await openPage({
    seed: { "claio-call-history": JSON.stringify(oversizedHistory) }
  });
  const historyState = await corruptHistory.page.evaluate(() => window.getClaioLocalState());
  check(historyState.history.length === 10, "oversized history was not clamped to ten");
  check(historyState.history.every((item) => item.card === "The Jelly Sandal"), "unknown/corrupt history card was not discarded");
  check(historyState.history.every((item) => item.read !== "forged stored display copy"), "stored display copy was trusted");
  check(!(await corruptHistory.page.locator("#claioArrivalStatus").innerText()).includes("Unknown Future Card"), "unknown current card reached arrival copy");
  await corruptHistory.context.close();

  const fixedNow = Date.parse("2026-07-25T12:00:00.000Z");
  const exactCurrent = new Date(fixedNow).toISOString();
  const exactFutureMillisecond = new Date(fixedNow + 1).toISOString();
  const exactFutureMinute = new Date(fixedNow + 60_000).toISOString();
  const badge = (id, unlockedAt, extra = {}) => ({
    id,
    title: id,
    sticker: id,
    source: "Synthetic timestamp contract fixture",
    unlockedAt,
    ...extra
  });
  const badgeSanitizer = await openPage({
    clockNow: fixedNow,
    seed: {
      laidiesSecretBadges: JSON.stringify({
        "other-keepsake": unrelatedBadge,
        "exact-current": badge("exact-current", exactCurrent),
        "valid-leap": badge("valid-leap", "2024-02-29T23:59:59.999Z"),
        "future-1ms": badge("future-1ms", exactFutureMillisecond),
        "future-60s": badge("future-60s", exactFutureMinute),
        "impossible-february": badge("impossible-february", "2026-02-31T12:00:00.000Z"),
        "non-leap-day": badge("non-leap-day", "2025-02-29T12:00:00.000Z"),
        "short-month": badge("short-month", "2026-04-31T12:00:00.000Z"),
        "short-width": badge("short-width", "2026-7-25T12:00:00.000Z"),
        "missing-milliseconds": badge("missing-milliseconds", "2026-07-25T12:00:00Z"),
        "offset-timezone": badge("offset-timezone", "2026-07-25T12:00:00.000+00:00"),
        "space-separated": badge("space-separated", "2026-07-25 12:00:00.000Z"),
        "date-only": badge("date-only", "2026-07-25"),
        "malformed": badge("malformed", "not-a-date"),
        "hotline-regular": badge("hotline-regular", exactFutureMillisecond, { scope: "device-local" })
      })
    }
  });
  const cleanBadges = JSON.parse(await badgeSanitizer.page.evaluate(() => localStorage.getItem("laidiesSecretBadges")));
  check(cleanBadges["other-keepsake"]?.id === "other-keepsake", "badge sanitizer removed valid unrelated member");
  check(cleanBadges["exact-current"]?.unlockedAt === exactCurrent, "exact current timestamp was not preserved");
  check(cleanBadges["valid-leap"]?.unlockedAt === "2024-02-29T23:59:59.999Z", "valid leap timestamp was not preserved");
  for (const invalidId of [
    "future-1ms", "future-60s", "impossible-february", "non-leap-day",
    "short-month", "short-width", "missing-milliseconds", "offset-timezone",
    "space-separated", "date-only", "malformed", "hotline-regular"
  ]) {
    check(!cleanBadges[invalidId], `invalid badge timestamp was trusted: ${invalidId}`);
  }
  await badgeSanitizer.page.locator("#clearClaioHistory").evaluate((button) => button.click());
  const resetAfterSanitation = JSON.parse(
    await badgeSanitizer.page.evaluate(() => localStorage.getItem("laidiesSecretBadges"))
  );
  check(resetAfterSanitation["other-keepsake"]?.id === "other-keepsake", "scoped reset after sanitation removed valid sibling");
  check(resetAfterSanitation["valid-leap"]?.id === "valid-leap", "scoped reset after sanitation removed valid leap sibling");
  check(!resetAfterSanitation["hotline-regular"], "scoped reset after sanitation restored invalid Hotline Regular");
  await badgeSanitizer.context.close();

  for (const width of [320, 390]) {
    const mobile = await openPage({ viewport: { width, height: 820 } });
    check(!(await hasOverflow(mobile.page)), `${width}px page has horizontal overflow`);
    check(await mobile.page.locator(".claio-title-boundary").isVisible(), `${width}px visitor can act before seeing the compact boundary`);
    check(!(await mobile.page.locator("#claioFortuneButton").isVisible()), `${width}px page exposes duplicate labelled draw controls`);
    for (const [selector, label] of [
      ["#claioDeckHotspot", "draw control"],
      [".game-page-header.claio-return a", "return link"],
      [".claio-resident-note a", "Resident Card link"]
    ]) {
      const target = await mobile.page.locator(selector).boundingBox();
      check(target && target.height >= 44 && target.width >= 44, `${width}px ${label} is smaller than 44px`);
    }
    const focusOutline = await mobile.page.locator("#claioDeckHotspot").evaluate((element) => {
      element.focus();
      return getComputedStyle(element).outlineStyle;
    });
    check(focusOutline !== "none", `${width}px draw control lacks visible focus`);
    await draw(mobile.page, 1);
    check(!(await hasOverflow(mobile.page)), `${width}px revealed reading has horizontal overflow`);
    check(await mobile.page.locator("#fortuneRepeatButton").isVisible(), `${width}px result lacks an adjacent repeat action`);
    const hotspotLabel = await mobile.page.locator("#claioDeckHotspot").evaluate((element) => ({
      visible: element.textContent.trim(),
      accessible: element.getAttribute("aria-label") || ""
    }));
    check(hotspotLabel.accessible.toLowerCase().includes(hotspotLabel.visible.toLowerCase()), `${width}px deck control fails label-in-name after a draw`);
    await mobile.context.close();
  }

  const undersizedTargetFixture = await openPage({ viewport: { width: 390, height: 820 } });
  await undersizedTargetFixture.page.addStyleTag({
    content: "#claioDeckHotspot{min-height:0!important;height:20px!important;padding:0!important}"
  });
  const undersizedTarget = await undersizedTargetFixture.page.locator("#claioDeckHotspot").boundingBox();
  check(
    undersizedTarget && undersizedTarget.height < 44,
    "44px target-size gate calibration did not detect the deliberately undersized fixture"
  );
  await undersizedTargetFixture.context.close();

  const redirectPage = await browser.newPage();
  await redirectPage.goto(`${origin}/games/cocktail-fortune.html`, { waitUntil: "domcontentloaded" });
  await redirectPage.waitForURL(/\/games\/madame-claio\.html$/);
  check(new URL(redirectPage.url()).pathname === "/games/madame-claio.html", "legacy route did not recover to canonical Mme CLAi-O");
  await redirectPage.goto(`${origin}/games/businesswomens-special.html`, { waitUntil: "domcontentloaded" });
  const bwsLede = await redirectPage.locator(".sv-lede").innerText();
  const bwsBoundary = await redirectPage.locator(".sv-lede + p").innerText();
  check(bwsBoundary.includes("separate game"), "Businesswomen's Special lacks separate framing");
  check(bwsLede.includes("spirit-free lane"), "Businesswomen's Special lacks spirit-free route");
  await redirectPage.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("MME CLAi-O BROWSER FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MME CLAi-O BROWSER PASS");
console.log("journeys=random-truth,no-free-text,keyboard,focus,live-result,non-repeat,badge-local,scoped-reset,storage-denial-threshold,failed-delete,no-js,count-extremes,canonical-history,unknown-card,strict-iso-utc-badge-time,reduced-motion,320-390-reflow,contrast,redirect,bws-boundary");
console.log(`served_root=${servedRoot}`);
