#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.MAIKEOVER_ROOT || process.cwd());
const contractRoot = path.resolve(
  process.env.MAIKEOVER_CONTRACT_ROOT || process.cwd()
);
const publicCardContract = JSON.parse(fs.readFileSync(
  path.join(
    contractRoot,
    "operations",
    "product-stewards",
    "maikeover",
    "public-card-field-contract-v1.json"
  ),
  "utf8"
));
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}

const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const evidenceDir = path.resolve(
  process.env.MAIKEOVER_EVIDENCE_DIR ||
  path.join(root, "operations", "product-stewards", "maikeover", "evidence-2026-07-25")
);
fs.mkdirSync(evidenceDir, { recursive: true });

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
  const relative = requestUrl.pathname === "/"
    ? "maikeover.html"
    : requestUrl.pathname.replace(/^\/+/, "");
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
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const prohibitedControlledRequests = [];
async function blockExternal(context, auditControlled = false) {
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith(origin)) {
      return route.continue();
    }
    if (auditControlled && /(supabase|jsdelivr|laidies-avatar|plausible|clarity\.ms|auth|magic.?link)/i.test(url)) {
      prohibitedControlledRequests.push(url);
    }
    return route.abort();
  });
}

async function hasOverflow(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1
  );
}

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
    const foreground = document.querySelector(foregroundSelector);
    const background = document.querySelector(backgroundSelector);
    const fg = parse(getComputedStyle(foreground).color);
    const bg = parse(getComputedStyle(background).backgroundColor);
    if (!fg || !bg) return 0;
    const [lighter, darker] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
    return (lighter + 0.05) / (darker + 0.05);
  }, { foregroundSelector, backgroundSelector });
}

try {
  const local = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await blockExternal(local);
  const page = await local.newPage();
  await page.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#moSave").waitFor({ state: "attached" });

  check(
    (await page.locator("#moPersistenceState").innerText()).includes("Device-local card"),
    "new arrival does not identify device-local persistence"
  );
  await page.locator('[data-mo-tool="finish"]').click();
  await page.waitForFunction(() =>
    document.activeElement?.matches('[data-state="held"]'));
  check(
    await page.locator('[data-state="held"]').isVisible(),
    "account/public-card entry does not fail closed by default"
  );
  check(
    !(await page.locator("#mo-email").isVisible()),
    "held account form still exposes the email input"
  );
  check(await page.evaluate(() => document.activeElement?.matches('[data-state="held"]')),
    "Finish drawer did not move focus to its held-state explanation");
  await page.locator('[data-mo-tool="look"]').click();
  check(await page.evaluate(() => document.activeElement?.getAttribute("data-mo-tool") === "look"),
    "leaving the held drawer did not restore focus to the selected drawer control");
  const drawerOrder = ["look", "backdrop", "soundtrack", "saint", "era", "carrying", "finish"];
  await page.locator('[data-mo-tool="look"]').focus();
  const observedDrawerOrder = ["look"];
  for (let index = 1; index < drawerOrder.length; index += 1) {
    await page.keyboard.press("Tab");
    observedDrawerOrder.push(await page.evaluate(
      () => document.activeElement?.getAttribute("data-mo-tool")
    ));
  }
  check(JSON.stringify(observedDrawerOrder) === JSON.stringify(drawerOrder),
    `seven-drawer Tab order is not logical (${observedDrawerOrder.join(" → ")})`);
  check(await page.locator("#moMake").isDisabled(), "portrait booth is not disabled");
  check(await page.locator("#moPhoto").isDisabled(), "photo upload remains enabled");
  check(await contrastRatio(page, "#moPersistenceState", "#moPersistenceState") >= 4.5,
    "persistence-state computed text contrast is below 4.5:1");
  check(await contrastRatio(page, "#moMake", "#moMake") >= 4.5,
    "disabled Make button computed contrast is below 4.5:1");
  const focusContrast = await page.evaluate(() => {
    const parse = (value) => {
      const match = String(value).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
      return match ? match.slice(1, 4).map(Number) : null;
    };
    const lum = (rgb) => {
      const c = rgb.map((v) => {
        v /= 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const el = document.querySelector('[data-mo-tool="look"]');
    el.focus();
    const outline = parse(getComputedStyle(el).outlineColor);
    const nearby = parse(getComputedStyle(el).backgroundColor);
    const values = [lum(outline), lum(nearby)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  });
  check(focusContrast >= 3, "focus-indicator computed contrast is below 3:1");
  check(!(await hasOverflow(page)), "desktop MAiKEOVER has horizontal overflow");

  await page.locator('[data-mo-tool="finish"]').click();
  await page.locator("#moNameInput").fill("Local LAiDY");
  await page.locator('[data-mo-tool="soundtrack"]').click();
  await page.locator("#moSongSel").selectOption({
    label: "Welcome to SUNNYVAiLE — THE LAiDIES"
  });
  await page.locator('[data-mo-tool="saint"]').click();
  await page.locator("#moSaintSel").selectOption("cher-horowitz");
  await page.locator('[data-mo-tool="era"]').click();
  await page.locator("#moMovieSel").selectOption({ label: "10 Things I Hate About You" });
  await page.locator("#moTvSel").selectOption({ label: "Absolutely Fabulous" });
  await page.locator('[data-mo-tool="carrying"]').click();
  await page.locator("#moCarrySel").selectOption({ label: "Caboodles case" });
  await page.locator('[data-mo-tool="backdrop"]').click();
  const background = page.locator("#moBgChips .mo-bg").nth(2);
  await background.focus();
  await page.keyboard.press("Space");
  check(
    await background.getAttribute("aria-pressed") === "true",
    "card background is not keyboard-selectable"
  );
  await page.locator('[data-mo-tool="finish"]').click();
  await page.evaluate(() => {
    const result = document.querySelector("#moSaveMsg");
    window.__MAIKEOVER_LIVE_MUTATIONS__ = [];
    new MutationObserver(() => {
      window.__MAIKEOVER_LIVE_MUTATIONS__.push(result.textContent);
    }).observe(result, { childList: true, characterData: true, subtree: true });
  });
  await page.locator("#moSave").click();
  check(
    (await page.locator("#moSaveMsg").innerText()).includes("Saved on this device"),
    "successful local save lacks device-local confirmation"
  );
  check(await page.evaluate(() => document.activeElement?.id === "moSaveMsg"),
    "successful save did not focus its announced result");
  const savedRaw = await page.evaluate(
    () => localStorage.getItem("laidies_resident_card_v1")
  );
  const saved = JSON.parse(savedRaw);
  check(saved.version === 1, "local save omitted envelope version");
  check(saved.fields.displayName === "Local LAiDY", "local save omitted display name");
  check(saved.fields.song === "Welcome to SUNNYVAiLE — THE LAiDIES",
    "local save omitted song");
  check(saved.fields.saint === "cher-horowitz", "local save omitted saint");
  check(saved.fields.movie === "10 Things I Hate About You", "local save omitted movie");
  check(saved.fields.tvshow === "Absolutely Fabulous", "local save omitted television");
  check(saved.fields.carry === "Caboodles case", "local save omitted carrying choice");
  check(saved.fields.cardBg === "peach", "local save omitted keyboard background choice");
  await page.locator("#moSave").click();
  check(await page.evaluate(() =>
    localStorage.getItem("laidies_resident_card_v1")) === savedRaw,
  "duplicate save changed the same card envelope");
  check(await page.evaluate(() =>
    window.__MAIKEOVER_LIVE_MUTATIONS__.length === 1 &&
    window.__MAIKEOVER_LIVE_MUTATIONS__[0] ===
      "Saved on this device ★ — reload this browser to find it again."),
  "live region duplicated or split an identical save announcement");

  const sameDeviceTab = await local.newPage();
  await sameDeviceTab.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  check(await sameDeviceTab.locator("#moNameInput").inputValue() === "Local LAiDY",
    "second tab in the same browser context did not restore the envelope");
  await sameDeviceTab.close();

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#moSave").waitFor({ state: "attached" });
  check(await page.locator("#moNameInput").inputValue() === "Local LAiDY",
    "reload did not restore local display name");
  check(await page.locator("#moCarrySel").inputValue() === "Caboodles case",
    "reload did not restore local carrying choice");
  check(await page.locator("#moSaintSel").inputValue() === "cher-horowitz",
    "reload did not restore local saint");
  check(await page.locator("#moMovieSel").inputValue() === "10 Things I Hate About You",
    "reload did not restore local movie");
  check(await page.locator("#moTvSel").inputValue() === "Absolutely Fabulous",
    "reload did not restore local television");
  await page.screenshot({
    path: path.join(evidenceDir, "maikeover-local-return-desktop.png"),
    fullPage: true
  });

  await page.evaluate(() => localStorage.setItem("laidies_card_username", "local_only"));
  await page.goto(`${origin}/laidies-card.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#closetPersistenceState").waitFor();
  await page.waitForFunction(() =>
    document.querySelector("#closetPersistenceState")?.textContent
      .includes("Device-local view"));
  check(
    (await page.locator("#closetPersistenceState").innerText()).includes("Device-local view"),
    "Closet does not distinguish its device-local state"
  );
  check(
    (await page.locator("#cardCarry").innerText()).includes("Caboodles case"),
    "Closet handoff did not render the locally saved carrying choice"
  );
  check(await page.locator("#shareCardBtn").isDisabled(),
    "device-local handle enabled a public Share action");
  const localShareText = await page.locator("#shareCardBtn").innerText();
  check(
    localShareText.toLowerCase().includes("share unavailable"),
    `device-local handle lacks held/local-only Share truth (${localShareText})`
  );
  await page.locator("#editCardBtn").click();
  await page.locator("#editName").fill("Closet Editor");
  await page.locator("#editSong").selectOption("wednesday-in-sunnyvaile");
  await page.locator("#editActivity").selectOption("library");
  await page.locator("#editSaint").selectOption("cher-horowitz");
  await page.locator("#editStorefront").selectOption("library");
  await page.locator("#editCharacter").selectOption("mayor-deb");
  await page.locator("#editCocktail").fill("Main Character Spritz");
  await page.locator("#editQuote").fill("Exact atomic quote");
  await page.locator("#editMotto").fill("Exact atomic motto");
  await page.locator("#saveCardBtn").click();
  const closetSuccessText = await page.locator("#saveCardBtn").innerText();
  check(closetSuccessText.toLowerCase().includes("saved on this device"),
    `Closet local save did not announce success (${closetSuccessText})`);
  check(await page.evaluate(() => {
    const fields = JSON.parse(
      localStorage.getItem("laidies_resident_card_v1")
    ).fields;
    return fields.displayName === "Closet Editor" &&
      fields.song === "wednesday-in-sunnyvaile" &&
      fields.activity === "library" &&
      fields.saint === "cher-horowitz" &&
      fields.storefront === "library" &&
      fields.character === "mayor-deb" &&
      fields.cocktail === "Main Character Spritz" &&
      fields.quote === "Exact atomic quote" &&
      fields.motto === "Exact atomic motto" &&
      fields.movie === "10 Things I Hate About You" &&
      fields.tvshow === "Absolutely Fabulous" &&
      fields.carry === "Caboodles case";
  }), "Closet did not commit all visible edits and preserved MAiKEOVER fields atomically");
  await local.close();

  const secondDevice = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await blockExternal(secondDevice);
  const secondPage = await secondDevice.newPage();
  await secondPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await secondPage.locator("#moSave").waitFor({ state: "attached" });
  check(await secondPage.locator("#moNameInput").inputValue() === "",
    "second browser context incorrectly restored first-device card");
  check(
    (await secondPage.locator("#moPersistenceState").innerText()).includes("Device-local card"),
    "second browser context does not explain local isolation"
  );
  await secondPage.locator('[data-mo-tool="finish"]').click();
  await secondPage.locator("#moSave").click();
  check(await secondPage.evaluate(() => {
    const value = JSON.parse(localStorage.getItem("laidies_resident_card_v1"));
    return value.fields.cardBg === "classic" &&
      ["song", "saint", "movie", "tvshow", "displayName", "carry", "cardAvatarUrl"]
        .every((key) => value.fields[key] === "");
  }), "empty optional fields did not save as one valid envelope");
  await secondDevice.close();

  const blocked = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await blocked.addInitScript(() => {
    for (const method of ["getItem", "setItem", "removeItem"]) {
      Object.defineProperty(Storage.prototype, method, {
        value() { throw new DOMException("blocked", "SecurityError"); }
      });
    }
  });
  await blockExternal(blocked);
  const blockedPage = await blocked.newPage();
  await blockedPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await blockedPage.locator("#moSave").waitFor({ state: "attached" });
  await blockedPage.locator('[data-mo-tool="finish"]').click();
  await blockedPage.locator("#moNameInput").fill("Cannot persist");
  await blockedPage.locator("#moSave").click();
  check(
    (await blockedPage.locator("#moSaveMsg").innerText()).includes("could not save"),
    "storage failure was reported as success"
  );
  check(await blockedPage.evaluate(() => document.activeElement?.id === "moSaveMsg"),
    "storage failure did not focus its announced result");
  check(!(await blockedPage.locator("#moSeeCloset").isVisible()),
    "storage failure exposed a success handoff");
  await blocked.close();

  const midWrite = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await midWrite.addInitScript(() => {
    const oldEnvelope = JSON.stringify({
      version: 1,
      fields: {
        cardBg: "mint",
        song: "Old song",
        saint: "elle-woods",
        movie: "Old movie",
        tvshow: "Old television",
        displayName: "Old name",
        carry: "Old carry",
        cardAvatarUrl: ""
      }
    });
    const legacy = {
      laidies_card_bg: "legacy-bg",
      laidies_song: "legacy-song",
      laidies_saint: "legacy-saint",
      laidies_favorite_movie: "legacy-movie",
      laidies_favorite_tvshow: "legacy-tv",
      laidies_display_name: "legacy-name",
      laidies_carry: "legacy-carry"
    };
    localStorage.setItem("laidies_resident_card_v1", oldEnvelope);
    Object.entries(legacy).forEach(([key, value]) => localStorage.setItem(key, value));
    window.__MAIKEOVER_PRIOR_BYTES__ = {
      envelope: oldEnvelope,
      legacy: JSON.stringify(legacy)
    };
    const originalSet = Storage.prototype.setItem;
    Object.defineProperty(Storage.prototype, "setItem", {
      value(key, value) {
        if (key === "laidies_resident_card_v1" && value !== oldEnvelope) {
          throw new DOMException("quota", "QuotaExceededError");
        }
        return originalSet.call(this, key, value);
      }
    });
  });
  await blockExternal(midWrite);
  const midPage = await midWrite.newPage();
  await midPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await midPage.locator('[data-mo-tool="finish"]').click();
  await midPage.locator("#moNameInput").fill("New name");
  await midPage.locator("#moSave").click();
  const priorPreserved = await midPage.evaluate(() => {
    const legacyKeys = [
      "laidies_card_bg", "laidies_song", "laidies_saint",
      "laidies_favorite_movie", "laidies_favorite_tvshow",
      "laidies_display_name", "laidies_carry"
    ];
    const legacy = {};
    legacyKeys.forEach((key) => { legacy[key] = localStorage.getItem(key); });
    return {
      envelope: localStorage.getItem("laidies_resident_card_v1"),
      legacy: JSON.stringify(legacy),
      prior: window.__MAIKEOVER_PRIOR_BYTES__
    };
  });
  check(priorPreserved.envelope === priorPreserved.prior.envelope,
    "failed authoritative write changed the prior envelope bytes");
  check(priorPreserved.legacy === priorPreserved.prior.legacy,
    "failed authoritative write changed untouched legacy fields");
  check((await midPage.locator("#moSaveMsg").innerText()).includes("could not save"),
    "authoritative envelope failure was not announced");
  await midWrite.close();

  const closetFailure = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await closetFailure.addInitScript(() => {
    const prior = JSON.stringify({
      version: 1,
      fields: {
        cardBg: "mint", song: "the-library", saint: "elle-woods",
        movie: "Clueless", tvshow: "Absolutely Fabulous",
        displayName: "Prior Closet", carry: "Milky pen", cardAvatarUrl: "",
        activity: "mall", episode: "", storefront: "mall",
        character: "dj-sunnyv", cocktail: "Prior cocktail",
        quote: "Prior quote", motto: "Prior motto",
        avatarSlug: "", archetype: ""
      }
    });
    localStorage.setItem("laidies_resident_card_v1", prior);
    window.__CLOSET_PRIOR_BYTES__ = prior;
    const originalSet = Storage.prototype.setItem;
    Object.defineProperty(Storage.prototype, "setItem", {
      value(key, value) {
        if (key === "laidies_resident_card_v1" && value !== prior) {
          throw new DOMException("quota", "QuotaExceededError");
        }
        return originalSet.call(this, key, value);
      }
    });
  });
  await blockExternal(closetFailure);
  const closetFailurePage = await closetFailure.newPage();
  await closetFailurePage.goto(`${origin}/laidies-card.html`, { waitUntil: "domcontentloaded" });
  await closetFailurePage.waitForFunction(() =>
    document.querySelector("#closetPersistenceState")?.textContent
      .includes("Device-local view"));
  await closetFailurePage.locator("#editCardBtn").click();
  await closetFailurePage.locator("#editName").fill("Partial write must not appear");
  await closetFailurePage.locator("#editQuote").fill("New quote must not appear");
  await closetFailurePage.locator("#saveCardBtn").click();
  const closetFailureText = await closetFailurePage.locator("#saveCardBtn").innerText();
  check(closetFailureText.toLowerCase().includes("could not save"),
    `Closet storage failure was reported as success (${closetFailureText})`);
  check(await closetFailurePage.evaluate(() =>
    document.activeElement?.id === "saveCardBtn"),
  "Closet error did not retain focus on the initiating control");
  check(await closetFailurePage.evaluate(() =>
    localStorage.getItem("laidies_resident_card_v1") === window.__CLOSET_PRIOR_BYTES__),
  "Closet failure changed prior authoritative envelope bytes");
  check(!(await closetFailurePage.locator("body").innerText()).includes("Partial write must not appear"),
    "Closet rendered a failed partial edit");
  await closetFailure.close();

  const legacyContext = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await legacyContext.addInitScript(() => {
    localStorage.setItem("laidies_card_bg", "lavender");
    localStorage.setItem("laidies_song", "Welcome to SUNNYVAiLE — THE LAiDIES");
    localStorage.setItem("laidies_saint", "dolly-parton");
    localStorage.setItem("laidies_favorite_movie", "Clueless");
    localStorage.setItem("laidies_favorite_tvshow", "Absolutely Fabulous");
    localStorage.setItem("laidies_display_name", "Legacy LAiDY");
    localStorage.setItem("laidies_carry", "Milky pen");
  });
  await blockExternal(legacyContext);
  const legacyPage = await legacyContext.newPage();
  await legacyPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  check(await legacyPage.locator("#moNameInput").inputValue() === "Legacy LAiDY",
    "valid legacy card was not imported for hydration");
  check(await legacyPage.evaluate(() =>
    localStorage.getItem("laidies_resident_card_v1") === null),
  "legacy hydration silently wrote an authoritative envelope");
  await legacyPage.locator('[data-mo-tool="finish"]').click();
  await legacyPage.locator("#moSave").click();
  check(await legacyPage.evaluate(() => {
    const value = JSON.parse(localStorage.getItem("laidies_resident_card_v1"));
    return value.fields.displayName === "Legacy LAiDY" &&
      value.fields.movie === "Clueless" &&
      value.fields.tvshow === "Absolutely Fabulous";
  }), "explicit save did not migrate the full valid legacy card");
  await legacyContext.close();

  const corruptContext = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await corruptContext.addInitScript(() => {
    localStorage.setItem("laidies_resident_card_v1", "{not-json");
    localStorage.setItem("laidies_display_name", "Safe legacy fallback");
  });
  await blockExternal(corruptContext);
  const corruptPage = await corruptContext.newPage();
  await corruptPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  check(await corruptPage.locator("#moNameInput").inputValue() === "Safe legacy fallback",
    "corrupt envelope did not fail safely to legacy import");
  check(await corruptPage.evaluate(() =>
    localStorage.getItem("laidies_resident_card_v1") === "{not-json"),
  "corrupt envelope was silently overwritten before explicit save");
  await corruptContext.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await blockExternal(mobile);
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await mobilePage.locator("#moSave").waitFor({ state: "attached" });
  check(!(await hasOverflow(mobilePage)), "390px MAiKEOVER has horizontal overflow");
  await mobilePage.screenshot({
    path: path.join(evidenceDir, "maikeover-held-mobile.png"),
    fullPage: true
  });
  await mobile.close();

  const zoom200 = await browser.newContext({ viewport: { width: 640, height: 900 } });
  await blockExternal(zoom200);
  const zoom200Page = await zoom200.newPage();
  await zoom200Page.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await zoom200Page.locator("#moSave").waitFor({ state: "attached" });
  check(!(await hasOverflow(zoom200Page)),
    "200% native-like 640px layout proxy has horizontal overflow");
  await zoom200.close();

  const reflow = await browser.newContext({ viewport: { width: 320, height: 800 } });
  await blockExternal(reflow);
  const reflowPage = await reflow.newPage();
  await reflowPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await reflowPage.locator("#moSave").waitFor({ state: "attached" });
  check(!(await hasOverflow(reflowPage)),
    "400% native-like 320px reflow proxy has horizontal overflow");
  await reflow.close();

  const residentHeld = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await blockExternal(residentHeld);
  const residentHeldPage = await residentHeld.newPage();
  await residentHeldPage.goto(`${origin}/resident-card.html`, {
    waitUntil: "domcontentloaded"
  });
  check((await residentHeldPage.locator('[role="status"]').innerText())
    .includes("not taking email addresses yet"),
  "Resident Card held state does not explain that email intake is closed");
  check(await residentHeldPage.locator('input[type="email"], #memberPassEmail').count() === 0,
    "Resident Card held route still ships an email input");
  check(await residentHeldPage.locator("#saveMemberPassButton").count() === 0,
    "Resident Card held route still ships an email submit control");
  await residentHeldPage.locator('[role="status"] a').focus();
  check(await residentHeldPage.evaluate(() =>
    document.activeElement?.getAttribute("href") === "/maikeover.html"),
  "Resident Card held state lacks a keyboard-focusable recovery route");
  await residentHeld.close();

  const reduced = await browser.newContext({
    viewport: { width: 1000, height: 800 },
    reducedMotion: "reduce"
  });
  await blockExternal(reduced);
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  check(
    await reducedPage.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior === "auto"
    ),
    "reduced-motion preference does not disable smooth scrolling"
  );
  await reduced.close();

  async function openMockPage(pathname, viewerId = "account-b", options = {}) {
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    await context.addInitScript(({
      viewerId: syntheticViewer,
      fixtureId,
      failService,
      approvedPublicFields,
      prohibitedPublicFields
    }) => {
      window.__LAIDIES_MAIKEOVER_ACCOUNT_PREFLIGHT__ = true;
      window.__LAIDIES_MAIKEOVER_PREFLIGHT_FIXTURE_ID__ = fixtureId;
      window.__MAIKEOVER_PREFLIGHT_CALLS__ = [];
      const visibility = sessionStorage.getItem("synthetic-account-a-visibility") || "public";
      const owners = {
        "account-a": {
          id: "account-a",
          card_username: "public_alice",
          display_name: "Public Alice",
          favorite_song: "Welcome to SUNNYVAiLE — THE LAiDIES",
          favorite_saint: "elle-woods",
          member_card_is_public: visibility === "public",
          email: "alice.private@example.test",
          goal: "private-goal-sentinel"
        },
        "account-b": {
          id: "account-b",
          card_username: "private_bob",
          display_name: "Private Bob",
          favorite_song: "Dream Phone — The Bots",
          favorite_saint: "dolly-parton",
          member_card_is_public: false,
          email: "bob.private@example.test",
          goal: "private-b-goal"
        }
      };
      prohibitedPublicFields.forEach((field) => {
        if (field !== "id") {
          owners["account-a"][field] = `private_${field}_sentinel`;
        }
      });
      function publicProjection(owner) {
        if (!owner || owner.member_card_is_public !== true) return null;
        const output = {};
        approvedPublicFields.forEach((field) => {
          if (Object.prototype.hasOwnProperty.call(owner, field)) output[field] = owner[field];
        });
        return output;
      }
      function builder(table) {
        let field = "";
        let value = "";
        let selected = "";
        let pendingWrite = null;
        return {
          select(fields = "") {
            selected = fields;
            window.__MAIKEOVER_PREFLIGHT_CALLS__.push({
              op: "select", table, fields, viewer: syntheticViewer
            });
            return this;
          },
          eq(nextField, nextValue) { field = nextField; value = nextValue; return this; },
          order() { return this; },
          limit() {
            if (table === "member_reward_events" && value !== syntheticViewer) {
              return Promise.resolve({ data: null, error: { code: "RLS_DENIED" } });
            }
            return Promise.resolve({ data: [], error: null });
          },
          upsert(payload) {
            pendingWrite = payload;
            window.__MAIKEOVER_PREFLIGHT_CALLS__.push({
              op: "upsert", table, id: payload && payload.id, viewer: syntheticViewer
            });
            return this;
          },
          single() {
            if (table !== "member_profiles" || !pendingWrite ||
                pendingWrite.id !== syntheticViewer) {
              return Promise.resolve({ data: null, error: { code: "RLS_DENIED" } });
            }
            owners[syntheticViewer] = Object.assign(
              {}, owners[syntheticViewer], pendingWrite
            );
            return Promise.resolve({ data: owners[syntheticViewer], error: null });
          },
          maybeSingle() {
            if (failService) return Promise.reject(new Error("synthetic-service-failure"));
            if (table === "public_resident_cards" && field === "card_username") {
              const owner = Object.values(owners).find(
                (candidate) => candidate.card_username === value
              );
              return Promise.resolve({ data: publicProjection(owner), error: null });
            }
            if (table === "member_profiles" && field === "id") {
              if (value !== syntheticViewer) {
                return Promise.resolve({ data: null, error: { code: "RLS_DENIED" } });
              }
              return Promise.resolve({ data: owners[value] || null, error: null });
            }
            return Promise.resolve({ data: null, error: null });
          }
        };
      }
      window.__LAIDIES_MAIKEOVER_PREFLIGHT_CLIENT__ = {
        auth: {
          getSession: async () => ({
            data: {
              session: syntheticViewer
                ? { user: { id: syntheticViewer } }
                : null
            }
          })
        },
        from(table) { return builder(table); },
        rpc(name, args) {
          window.__MAIKEOVER_PREFLIGHT_CALLS__.push({
            op: "rpc", name, args, viewer: syntheticViewer
          });
          return Promise.resolve({ data: false, error: null });
        }
      };
      window.__fixtureSetAccountAVisibility = (next) => {
        sessionStorage.setItem(
          "synthetic-account-a-visibility",
          next ? "public" : "private"
        );
      };
    }, {
      viewerId,
      fixtureId: `synthetic-ab-${viewerId || "anon"}`,
      failService: !!options.failService,
      approvedPublicFields: publicCardContract.fields,
      prohibitedPublicFields: publicCardContract.prohibited
    });
    await blockExternal(context, true);
    const mockPage = await context.newPage();
    const consoleMessages = [];
    mockPage.on("console", (message) => consoleMessages.push(message.text()));
    await mockPage.goto(`${origin}${pathname}`, { waitUntil: "domcontentloaded" });
    await mockPage.waitForTimeout(1500);
    return { context, mockPage, consoleMessages };
  }

  const publicAccount = await openMockPage(
    "/laidies-card.html?u=public_alice",
    "account-b"
  );
  check(
    await publicAccount.mockPage.locator("#publicModeBanner").isVisible(),
    `Account B did not see Account A's opted-in public view (${publicAccount.consoleMessages.join(" | ")})`
  );
  const publicCardName = await publicAccount.mockPage.locator("#cardName").count()
    ? await publicAccount.mockPage.locator("#cardName").innerText()
    : "";
  check(publicCardName === "Public Alice",
    "mock public account did not render restricted card fixture");
  check(
    !(await publicAccount.mockPage.locator("body").innerText()).includes("alice.private@example.test"),
    "mock public card leaked a private sentinel"
  );
  const publicCalls = await publicAccount.mockPage.evaluate(
    () => window.__MAIKEOVER_PREFLIGHT_CALLS__
  );
  check(publicCalls.every((call) => call.table === "public_resident_cards"),
    "public Card queried a raw/private table");
  check(!publicCalls.some((call) => call.table === "member_reward_events"),
    "public Card queried raw member_reward_events");
  const publicSelect = publicCalls.find(
    (call) => call.table === "public_resident_cards" && call.op === "select"
  );
  const implementationPublicFields = publicSelect
    ? publicSelect.fields.split(",")
    : [];
  check(
    JSON.stringify(implementationPublicFields) ===
      JSON.stringify(publicCardContract.fields),
    "public Card selection differs from independent Identity/Privacy contract"
  );
  const publicResponseKeys = await publicAccount.mockPage.evaluate(() =>
    Object.keys(window.__laidiesLastProfile || {})
  );
  check(
    publicResponseKeys.every((field) => publicCardContract.fields.includes(field)),
    "public response contains a field outside the Identity/Privacy contract"
  );
  const publicSurface = JSON.stringify({
    body: await publicAccount.mockPage.locator("body").innerText(),
    url: publicAccount.mockPage.url(),
    console: publicAccount.consoleMessages
  }).toLowerCase();
  check(
    !publicSurface.includes("account-a") &&
      publicCardContract.prohibited
        .filter((field) => field !== "id")
        .every((field) =>
          !publicSurface.includes(`private_${field}_sentinel`)
        ),
    "public DOM/URL/console contains a prohibited field sentinel"
  );
  const deniedWrite = await publicAccount.mockPage.evaluate(async () => {
    const result = await window.__LAIDIES_MAIKEOVER_PREFLIGHT_CLIENT__
      .from("member_profiles")
      .upsert({ id: "account-a", display_name: "B changed A" })
      .select()
      .single();
    return result.error && result.error.code;
  });
  check(deniedWrite === "RLS_DENIED",
    "Account B fixture did not deny writing Account A");

  await publicAccount.mockPage.evaluate(
    () => window.__fixtureSetAccountAVisibility(false)
  );
  await publicAccount.mockPage.reload({ waitUntil: "domcontentloaded" });
  await publicAccount.mockPage.waitForTimeout(500);
  check(await publicAccount.mockPage.getByText("No forwarding address").isVisible(),
    "visibility-off did not revoke Account A public view");
  check(!(await publicAccount.mockPage.locator("body").innerText()).includes("Public Alice"),
    "visibility-off left stale public Account A content");
  await publicAccount.context.close();

  const privateAccount = await openMockPage(
    "/laidies-card.html?u=private_bob",
    "account-b"
  );
  check(
    await privateAccount.mockPage.getByText("No forwarding address").isVisible(),
    `Account B private lookup did not fail closed (${privateAccount.consoleMessages.join(" | ")})`
  );
  check(
    !(await privateAccount.mockPage.locator("body").innerText()).includes("Public Alice"),
    "private-account fixture leaked another account's public card"
  );
  await privateAccount.context.close();

  const nonexistentAccount = await openMockPage(
    "/laidies-card.html?u=does_not_exist",
    "account-b"
  );
  check(await nonexistentAccount.mockPage.getByText("No forwarding address").isVisible(),
    "nonexistent handle differs from private-account result");
  await nonexistentAccount.context.close();

  const reservedAccount = await openMockPage(
    "/laidies-card.html?u=admin",
    "account-b"
  );
  check(await reservedAccount.mockPage.getByText("No forwarding address").isVisible(),
    "reserved handle differs from private/nonexistent result");
  await reservedAccount.context.close();

  const accountBOwner = await openMockPage("/laidies-card.html", "account-b");
  check((await accountBOwner.mockPage.locator("#cardName").innerText()) === "Private Bob",
    "Account B owner view did not load Account B");
  check(await accountBOwner.mockPage.locator("#shareCardBtn").isDisabled(),
    "private Account B owner view enabled Share");
  const ownerCalls = await accountBOwner.mockPage.evaluate(
    () => window.__MAIKEOVER_PREFLIGHT_CALLS__
  );
  check(!ownerCalls.some((call) =>
    call.table === "member_profiles" && call.id === "account-a"),
  "Account B owner UI attempted an Account A write");
  await accountBOwner.context.close();

  const serviceFailure = await openMockPage(
    "/laidies-card.html?u=public_alice",
    "account-b",
    { failService: true }
  );
  check(await serviceFailure.mockPage.getByText("No forwarding address").isVisible(),
    "synthetic service failure produced success-shaped public UI");
  await serviceFailure.context.close();

  const injectedMaikeover = await openMockPage("/maikeover.html", "account-b");
  await injectedMaikeover.mockPage.locator('[data-mo-tool="finish"]').click();
  await injectedMaikeover.mockPage.locator('[data-state="claimed"]').waitFor({
    state: "visible"
  });
  check(
    (await injectedMaikeover.mockPage.locator(".mo-your-handle").innerText()) ===
      "private_bob",
    "MAiKEOVER did not consume the injected deterministic client"
  );
  await injectedMaikeover.context.close();

  check(prohibitedControlledRequests.length === 0,
    `controlled mock attempted prohibited network: ${prohibitedControlledRequests.join(", ")}`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("MAiKEOVER BROWSER PREFLIGHT FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MAiKEOVER BROWSER PREFLIGHT PASS");
console.log("proof=local atomic-card UI/storage/error/privacy/deterministic Account-A-B mock only");
console.log("not_proof=production auth,email,public-card,RLS,avatar,reward,cross-device");
console.log(`evidence=${path.relative(root, evidenceDir)}`);
