#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.BRONZE_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}
const { chromium } = await import(
  pathToFileURL(path.join(playwrightRoot, "index.mjs"))
);
const chrome =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const evidenceDir = path.resolve(
  process.env.BRONZE_EVIDENCE_DIR ||
    path.join(
      root,
      "operations",
      "product-stewards",
      "bronze-aige",
      "evidence-2026-07-25"
    )
);
fs.mkdirSync(evidenceDir, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative =
    url.pathname === "/"
      ? "bronze-aige.html"
      : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (
    !resolved.startsWith(`${root}${path.sep}`) ||
    !fs.existsSync(resolved) ||
    fs.statSync(resolved).isDirectory()
  ) {
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
const checks = [];
const blockedExternal = [];
const check = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};

async function contextFor(options = {}) {
  const context = await browser.newContext({
    viewport: options.viewport || { width: 1280, height: 900 },
    acceptDownloads: true
  });
  await context.addInitScript((options) => {
    window.__BRONZE_TEST__ = {
      clipboardText: "",
      scrolls: [],
      audioInstances: [],
      globalAudioCalls: 0,
      catalogueAccesses: 0,
      catalogueDeleteResult: null
    };
    if (options.preloadCatalogue) {
      const injectedItem = Object.freeze({
        id: "spiritFree-01",
        name: "INJECTED RYAN BOTTLE",
        vibe: "INJECTED SERVICE",
        order: "GET THE BOTTLE",
        note: "INJECTED"
      });
      const injectedMood = Object.freeze({
        id: "mood-1",
        label: "INJECTED MOOD",
        description: "INJECTED",
        drinks: Object.freeze({ cocktail: [0], spiritFree: [0] })
      });
      const injected = Object.freeze({
        hasLane: () => true,
        getMenu: () => [injectedItem],
        getFlaps: () => [injectedMood],
        getItem: () => injectedItem,
        getMood: () => injectedMood
      });
      const descriptor = {
        configurable: false,
        enumerable: false
      };
      if (options.preloadCatalogue === "getter") {
        descriptor.get = () => {
          window.__BRONZE_TEST__.catalogueAccesses += 1;
          return injected;
        };
      } else if (options.preloadCatalogue === "throw") {
        descriptor.get = () => {
          window.__BRONZE_TEST__.catalogueAccesses += 1;
          throw new Error("Synthetic hostile catalogue getter");
        };
      } else if (options.preloadCatalogue === "proxy") {
        descriptor.value = new Proxy(injected, {
          get(target, property, receiver) {
            window.__BRONZE_TEST__.catalogueAccesses += 1;
            return Reflect.get(target, property, receiver);
          }
        });
        descriptor.writable = false;
      } else {
        descriptor.value = injected;
        descriptor.writable = false;
      }
      Object.defineProperty(window, "LAIDIES_BWS_CATALOGUE", descriptor);
      if (options.preloadCatalogue === "delete") {
        window.__BRONZE_TEST__.catalogueDeleteResult =
          Reflect.deleteProperty(window, "LAIDIES_BWS_CATALOGUE");
      }
    }
    const originalScroll = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (scrollOptions) {
      window.__BRONZE_TEST__.scrolls.push(scrollOptions || {});
      return originalScroll.call(this, scrollOptions);
    };
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value) => {
          if (options.clipboard === "reject") {
            throw new DOMException("Synthetic clipboard denial", "NotAllowedError");
          }
          window.__BRONZE_TEST__.clipboardText = value;
        }
      }
    });
    if (options.clipboard === "reject") {
      document.execCommand = () => false;
    }
    if (options.preexistingGlobalAudio) {
      window.playLaidiesTheme = () => {
        window.__BRONZE_TEST__.globalAudioCalls += 1;
      };
    }
    if (options.icsFailure === "create") {
      URL.createObjectURL = () => {
        throw new Error("Synthetic object URL failure");
      };
    }
    if (options.icsFailure === "download") {
      HTMLAnchorElement.prototype.click = function () {
        throw new Error("Synthetic download failure");
      };
    }
    if (options.icsFailure === "revoke") {
      URL.revokeObjectURL = () => {
        throw new Error("Synthetic revoke failure");
      };
    }
    if (options.storageSeed) {
      Object.entries(options.storageSeed).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    }
    if (options.blockStorage) {
      const originalSet = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (
          key === "laidies_bws_drink" ||
          key === "laidies_bronze_coasters"
        ) {
          throw new DOMException("Synthetic storage denial", "QuotaExceededError");
        }
        return originalSet.call(this, key, value);
      };
    }
    class FakeAudio extends EventTarget {
      constructor(src) {
        super();
        this.src = src;
        this.preload = "";
        this.paused = true;
        this.duration = 120;
        this.currentTime = 0;
        this.volume = 1;
        this.muted = false;
        window.__BRONZE_TEST__.audioInstances.push(this);
      }
      play() {
        if (options.audio === "reject") {
          this.paused = true;
          return Promise.reject(new DOMException("Synthetic block", "NotAllowedError"));
        }
        this.paused = false;
        this.dispatchEvent(new Event("play"));
        if (options.audio !== "no-playing") {
          this.dispatchEvent(new Event("playing"));
        }
        return Promise.resolve();
      }
      pause() {
        this.paused = true;
        this.dispatchEvent(new Event("pause"));
      }
      load() {}
    }
    window.Audio = FakeAudio;
  }, options);
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (!url.startsWith(origin)) {
      blockedExternal.push(url);
      return route.abort();
    }
    const parsed = new URL(url);
    if (
      options.catalogueModule === "missing" &&
      parsed.pathname === "/content/site/bws-data.js"
    ) {
      return route.abort();
    }
    const mode = options.episode || "actual";
    if (parsed.pathname === "/content/episode-index.json") {
      if (mode === "index-fail") {
        return route.fulfill({ status: 503, body: "unavailable" });
      }
      if (mode === "no-published") {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            episodes: [{ number: 9, status: "draft", title: "Draft only" }]
          })
        });
      }
      if (mode === "fresh") {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            episodes: [
              {
                number: 4,
                status: "published",
                title: "Synthetic Fresh Episode",
                releaseDate: new Date().toISOString().slice(0, 10)
              }
            ]
          })
        });
      }
    }
    if (parsed.pathname.startsWith("/content/episodes/issue-")) {
      if (mode === "issue-fail") {
        return route.fulfill({ status: 503, body: "unavailable" });
      }
      if (mode === "fresh" && parsed.pathname.endsWith("issue-04.json")) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            number: 4,
            status: "published",
            releaseDate: new Date().toISOString().slice(0, 10),
            communityPrompt: "Synthetic current conversation prompt?"
          })
        });
      }
    }
    return route.continue();
  });
  return context;
}

async function openRoom(page, hash = "") {
  await page.goto(`${origin}/bronze-aige.html${hash}`, {
    waitUntil: "domcontentloaded"
  });
  await page.waitForFunction(() => document.querySelector(".bronze-v2-panels"));
}

async function openStation(page, id) {
  await page.locator(`[data-bronze-panel="${id}"]`).click();
  await page.locator(`#${id}`).waitFor({ state: "visible" });
}

function ratioScript(selector) {
  return (selector) => {
    const element = document.querySelector(selector);
    const channels = (value) =>
      value.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number);
    const luminance = (rgb) => {
      const values = rgb.map((value) => {
        const channel = value / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : Math.pow((channel + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
    };
    const style = getComputedStyle(element);
    const a = luminance(channels(style.color));
    const b = luminance(channels(style.backgroundColor));
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
}

try {
  const roomContext = await contextFor();
  const roomPage = await roomContext.newPage();
  await openRoom(roomPage);
  check(
    (await roomPage.locator(".bronze-room__subline").innerText()).includes(
      "nothing here books"
    ),
    "new visitor sees the service boundary"
  );
  check(
    (await roomPage.locator("[data-bronze-panel]").count()) === 6,
    "room exposes six named stations"
  );
  await openStation(roomPage, "bronze-fortune");
  check(
    (await roomPage.locator("#bronze-fortune").evaluate(
      (element) => document.activeElement === element
    )),
    "opened panel receives focus"
  );
  await roomPage.keyboard.press("Escape");
  check(
    await roomPage.locator("#bronze-fortune").isHidden(),
    "Escape closes the active panel"
  );
  check(
    await roomPage.locator('[data-bronze-panel="bronze-fortune"]').evaluate(
      (element) => document.activeElement === element
    ),
    "Escape returns focus to the initiating station"
  );
  const roomHashPage = await roomContext.newPage();
  await roomHashPage.goto(`${origin}/bronze-aige.html#bronze-menu`, {
    waitUntil: "domcontentloaded"
  });
  await roomHashPage.waitForFunction(
    () => !document.querySelector("#bronze-menu")?.hidden
  );
  check(
    await roomHashPage
      .locator('[data-bronze-panel="bronze-menu"]')
      .getAttribute("aria-expanded") === "true",
    "direct station hash synchronizes expanded state"
  );
  await roomHashPage.screenshot({
    path: path.join(evidenceDir, "bronze-room-desktop.png"),
    fullPage: true
  });
  await roomContext.close();

  const fortuneContext = await contextFor({ reducedMotion: true });
  const fortunePage = await fortuneContext.newPage();
  await fortunePage.emulateMedia({ reducedMotion: "reduce" });
  await openRoom(fortunePage);
  await openStation(fortunePage, "bronze-fortune");
  await fortunePage.locator("#bronzeFortuneLane").selectOption("spiritFree");
  await fortunePage.locator("#bronzeFortuneDeal").click();
  await fortunePage.waitForFunction(
    () =>
      document.querySelector("#bronzeFortuneStatus")?.textContent.includes(
        "Spirit-free suggestion dealt"
      )
  );
  const embeddedReceipt = await fortunePage.evaluate(() =>
    JSON.parse(localStorage.getItem("laidies_bws_drink"))
  );
  check(
    embeddedReceipt.version === 2 &&
      embeddedReceipt.scope === "device-local" &&
      embeddedReceipt.lane === "spiritFree" &&
      /^spiritFree-\d{2}$/.test(embeddedReceipt.itemId) &&
      /^mood-\d$/.test(embeddedReceipt.moodId) &&
      !("name" in embeddedReceipt) &&
      !("mood" in embeddedReceipt),
    "embedded spirit-free draw writes only a typed device-local receipt"
  );
  check(
    (await fortunePage.locator("#bronzeFortuneStatus").innerText()).includes(
      "remembered on this device only"
    ),
    "embedded draw announces local-only scope"
  );
  await fortuneContext.close();

  const injectedCatalogueContext = await contextFor({ reducedMotion: true });
  const injectedCataloguePage = await injectedCatalogueContext.newPage();
  await injectedCataloguePage.emulateMedia({ reducedMotion: "reduce" });
  await openRoom(injectedCataloguePage);
  await injectedCataloguePage.evaluate(() => {
    window.cocktailMenus = {
      cocktail: [{ name: "INJECTED RESERVATION", vibe: "book now", order: "call", note: "service" }],
      spiritFree: [{ name: "INJECTED RESERVATION", vibe: "book now", order: "call", note: "service" }]
    };
    window.cocktailFortuneFlaps = [{
      label: "INJECTED MOOD",
      description: "injected",
      drinks: { cocktail: [0], spiritFree: [0] }
    }];
    try {
      window.LAIDIES_BWS_CATALOGUE = {
        getMenu: () => window.cocktailMenus.cocktail,
        getFlaps: () => window.cocktailFortuneFlaps
      };
    } catch (_) {}
    Math.random = () => 0;
  });
  await openStation(injectedCataloguePage, "bronze-fortune");
  await injectedCataloguePage.locator("#bronzeFortuneDeal").click();
  await injectedCataloguePage.waitForFunction(
    () => document.querySelector("#bronzeFortuneStatus")?.textContent.includes("suggestion dealt")
  );
  const injectionResult = await injectedCataloguePage.evaluate(() => ({
    text: document.querySelector("#bronzeFortuneResult")?.textContent || "",
    receipt: JSON.parse(localStorage.getItem("laidies_bws_drink") || "null")
  }));
  check(
    !injectionResult.text.includes("INJECTED") &&
      injectionResult.receipt &&
      !JSON.stringify(injectionResult.receipt).includes("INJECTED"),
    "embedded fortune ignores post-load ambient catalogue injection"
  );
  await injectedCatalogueContext.close();

  for (const preloadCatalogue of ["getter", "value", "proxy", "delete", "throw"]) {
    const context = await contextFor({
      reducedMotion: true,
      preloadCatalogue
    });
    const embeddedPage = await context.newPage();
    const embeddedErrors = [];
    embeddedPage.on("pageerror", (error) => embeddedErrors.push(error.message));
    await embeddedPage.emulateMedia({ reducedMotion: "reduce" });
    await openRoom(embeddedPage);
    await embeddedPage.evaluate(() => { Math.random = () => 0; });
    await openStation(embeddedPage, "bronze-fortune");
    await embeddedPage.locator("#bronzeFortuneLane").selectOption("spiritFree");
    await embeddedPage.locator("#bronzeFortuneDeal").click();
    await embeddedPage.waitForFunction(
      () => document.querySelector("#bronzeFortuneStatus")?.textContent.includes("suggestion dealt")
    );
    const embedded = await embeddedPage.evaluate(() => ({
      text: document.querySelector("#bronzeFortuneResult")?.textContent || "",
      receipt: localStorage.getItem("laidies_bws_drink") || "",
      accesses: window.__BRONZE_TEST__.catalogueAccesses,
      deleteResult: window.__BRONZE_TEST__.catalogueDeleteResult
    }));
    check(
      !embedded.text.includes("INJECTED RYAN BOTTLE") &&
        !embedded.receipt.includes("INJECTED") &&
        embedded.receipt.includes('"scope":"device-local"'),
      `embedded ${preloadCatalogue} preload renders and saves canonical data only`
    );
    check(
      embedded.accesses === 0 && embeddedErrors.length === 0,
      `embedded ${preloadCatalogue} preload is never read and causes no page error`
    );
    if (preloadCatalogue === "delete") {
      check(embedded.deleteResult === false, "embedded delete fixture preserves the hostile nonconfigurable property");
    }

    const standalonePage = await context.newPage();
    const standaloneErrors = [];
    standalonePage.on("pageerror", (error) => standaloneErrors.push(error.message));
    await standalonePage.emulateMedia({ reducedMotion: "reduce" });
    await standalonePage.goto(`${origin}/games/businesswomens-special.html`, {
      waitUntil: "domcontentloaded"
    });
    await standalonePage.locator('[data-lane="spiritFree"]').click();
    await standalonePage.evaluate(() => { Math.random = () => 0; });
    await standalonePage.locator('[data-flap="0"]').click();
    await standalonePage.waitForFunction(
      () => document.querySelector("#bwsSaveStatus")?.textContent.includes("suggestion dealt")
    );
    const standalone = await standalonePage.evaluate(() => ({
      text: document.querySelector("#bwsResult")?.textContent || "",
      receipt: localStorage.getItem("laidies_bws_drink") || "",
      accesses: window.__BRONZE_TEST__.catalogueAccesses,
      deleteResult: window.__BRONZE_TEST__.catalogueDeleteResult
    }));
    check(
      !standalone.text.includes("INJECTED RYAN BOTTLE") &&
        !standalone.receipt.includes("INJECTED") &&
        standalone.receipt.includes('"scope":"device-local"'),
      `standalone ${preloadCatalogue} preload renders and saves canonical data only`
    );
    check(
      standalone.accesses === 0 && standaloneErrors.length === 0,
      `standalone ${preloadCatalogue} preload is never read and causes no page error`
    );
    if (preloadCatalogue === "delete") {
      check(standalone.deleteResult === false, "standalone delete fixture preserves the hostile nonconfigurable property");
    }
    await context.close();
  }

  const missingCatalogueContext = await contextFor({ catalogueModule: "missing" });
  const missingEmbeddedPage = await missingCatalogueContext.newPage();
  await missingEmbeddedPage.goto(`${origin}/bronze-aige.html`, {
    waitUntil: "domcontentloaded"
  });
  await missingEmbeddedPage.waitForFunction(
    () => document.querySelector("#bronzeCatalogueBoundaryStatus")?.textContent.includes("could not be verified")
  );
  check(
    await missingEmbeddedPage.locator("#bronzeCatalogueBoundaryStatus").isVisible() &&
      !(await missingEmbeddedPage.evaluate(() => localStorage.getItem("laidies_bws_drink"))),
    "missing embedded private module fails visibly closed without a receipt"
  );
  const missingStandalonePage = await missingCatalogueContext.newPage();
  await missingStandalonePage.goto(`${origin}/games/businesswomens-special.html`, {
    waitUntil: "domcontentloaded"
  });
  await missingStandalonePage.waitForFunction(
    () => document.querySelector("#bwsSaveStatus")?.textContent.includes("could not be verified")
  );
  check(
    await missingStandalonePage.locator(".bws-lane").evaluateAll(
      (buttons) => buttons.every((button) => button.disabled)
    ) &&
      await missingStandalonePage.locator(".bws-mood").evaluateAll(
        (buttons) => buttons.every((button) => button.disabled)
      ) &&
      !(await missingStandalonePage.evaluate(() => localStorage.getItem("laidies_bws_drink"))),
    "missing standalone private module keeps controls disabled and saves nothing"
  );
  await missingCatalogueContext.close();

  const deniedFortuneContext = await contextFor({
    reducedMotion: true,
    blockStorage: true
  });
  const deniedFortunePage = await deniedFortuneContext.newPage();
  await deniedFortunePage.emulateMedia({ reducedMotion: "reduce" });
  await openRoom(deniedFortunePage);
  await openStation(deniedFortunePage, "bronze-fortune");
  await deniedFortunePage.locator("#bronzeFortuneLane").selectOption("cocktail");
  await deniedFortunePage.locator("#bronzeFortuneDeal").click();
  await deniedFortunePage.waitForFunction(
    () =>
      document.querySelector("#bronzeFortuneStatus")?.textContent.includes(
        "could not save"
      )
  );
  check(
    !(await deniedFortunePage.evaluate(() =>
      localStorage.getItem("laidies_bws_drink")
    )),
    "storage-denied embedded draw creates no saved receipt"
  );
  await deniedFortuneContext.close();

  for (const [mode, expectedState] of [
    ["actual", "latest-published"],
    ["fresh", "current"],
    ["index-fail", "evergreen"],
    ["no-published", "evergreen"],
    ["issue-fail", "evergreen"]
  ]) {
    const context = await contextFor({ episode: mode });
    const page = await context.newPage();
    await openRoom(page);
    await page.waitForFunction(
      () =>
        ["current", "latest-published", "evergreen"].includes(
          document.querySelector("#bzWedTag")?.dataset.state
        )
    );
    check(
      (await page.locator("#bzWedTag").getAttribute("data-state")) ===
        expectedState,
      `${mode} episode fixture exposes ${expectedState}`
    );
    if (expectedState === "evergreen") {
      check(
        (await page.locator("#bzWedTag").innerText()).includes("evergreen"),
        `${mode} episode fixture never claims currentness`
      );
    }
    await context.close();
  }

  const inviteContext = await contextFor({ clipboard: "success" });
  const invitePage = await inviteContext.newPage();
  await openRoom(invitePage);
  await openStation(invitePage, "bronze-invite");
  await invitePage.locator("#bzCopyBtn").click();
  await invitePage.waitForFunction(
    () => document.querySelector("#bzInviteStatus")?.textContent.includes("Nothing was sent")
  );
  check(
    (await invitePage.evaluate(() => window.__BRONZE_TEST__.clipboardText)).includes(
      "cocktail or spirit-free"
    ),
    "copied invite contains spirit-free parity"
  );
  const downloadPromise = invitePage.waitForEvent("download");
  await invitePage.locator("#bzIcsBtn").click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  let ics = "";
  for await (const chunk of stream) ics += chunk.toString();
  check(download.suggestedFilename() === "laidies-happy-hour.ics", "calendar has the expected local filename");
  check(
    /BEGIN:VCALENDAR[\s\S]+DTSTART:\d{8}T\d{6}[\s\S]+DURATION:PT90M[\s\S]+LOCATION:Your chosen place/.test(
      ics
    ),
    "calendar file contains a valid local floating event contract"
  );
  check(
    (await invitePage.locator("#bzInviteStatus").innerText()).includes(
      "Nothing was added, sent, booked, or reserved"
    ),
    "calendar result states exactly what did not happen"
  );
  await inviteContext.close();

  for (const failure of ["create", "download", "revoke"]) {
    const context = await contextFor({ icsFailure: failure });
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await openRoom(page);
    await openStation(page, "bronze-invite");
    await page.locator("#bzIcsBtn").click();
    await page.waitForFunction(
      () => document.querySelector("#bzInviteStatus")?.textContent.includes("not confirmed")
    );
    const status = await page.locator("#bzInviteStatus").innerText();
    check(
      status.includes("Nothing was added, sent, booked, or reserved") &&
        !status.includes("downloaded"),
      `${failure} calendar failure persists without a success claim`
    );
    check(pageErrors.length === 0, `${failure} calendar failure is contained`);
    await context.close();
  }

  const copyFailureContext = await contextFor({ clipboard: "reject" });
  const copyFailurePage = await copyFailureContext.newPage();
  await openRoom(copyFailurePage);
  await openStation(copyFailurePage, "bronze-invite");
  await copyFailurePage.locator("#bzCopyBtn").click();
  await copyFailurePage.waitForFunction(
    () =>
      document.querySelector("#bzInviteStatus")?.textContent.includes(
        "not confirmed"
      )
  );
  check(
    (await copyFailurePage.locator("#bzInviteStatus").innerText()).includes(
      "copy it manually"
    ),
    "clipboard failure gives an honest manual recovery"
  );
  await copyFailureContext.close();

  const coasterContext = await contextFor();
  const coasterPage = await coasterContext.newPage();
  await openRoom(coasterPage);
  await openStation(coasterPage, "bronze-coaster");
  await coasterPage.locator("#bzStampBtn").click();
  await coasterPage.waitForFunction(
    () => document.querySelector("#bzStampMsg")?.textContent.includes("this device only")
  );
  const coasterReceipt = await coasterPage.evaluate(() =>
    JSON.parse(localStorage.getItem("laidies_bronze_coasters"))
  );
  check(
    coasterReceipt.version === 2 &&
      coasterReceipt.scope === "device-local" &&
      coasterReceipt.items.length === 1,
    "coaster stores one typed device-local weekly receipt"
  );
  await coasterContext.close();

  const deniedCoasterContext = await contextFor({ blockStorage: true });
  const deniedCoasterPage = await deniedCoasterContext.newPage();
  await openRoom(deniedCoasterPage);
  await openStation(deniedCoasterPage, "bronze-coaster");
  await deniedCoasterPage.locator("#bzStampBtn").click();
  check(
    (await deniedCoasterPage.locator("#bzStampMsg").innerText()).includes(
      "Nothing was marked"
    ),
    "coaster storage denial does not manufacture success"
  );
  await deniedCoasterContext.close();

  const futureStamp = new Date(Date.now() + 4 * 60000).toISOString();
  const corruptDrinkBytes = JSON.stringify({
    version: 2,
    scope: "device-local",
    lane: "cocktail",
    itemId: "cocktail-01",
    moodId: "mood-1",
    savedAt: futureStamp
  });
  const corruptCoasterBytes = JSON.stringify({
    version: 2,
    scope: "device-local",
    items: [
      { week: "2099-W01", stampedAt: new Date().toISOString() },
      { week: "2099-W01", stampedAt: new Date().toISOString() }
    ]
  });
  const corruptContext = await contextFor({
    storageSeed: {
      laidies_bws_drink: corruptDrinkBytes,
      laidies_bronze_coasters: corruptCoasterBytes,
      laidies_unrelated_sibling: "preserve-me"
    }
  });
  const corruptPage = await corruptContext.newPage();
  await openRoom(corruptPage);
  check(
    !(await corruptPage.locator("#bronzeRoomState").innerText()).includes("suggestion:"),
    "zero-tolerance future drink receipt is ignored"
  );
  const preserved = await corruptPage.evaluate(() => ({
    drink: localStorage.getItem("laidies_bws_drink"),
    coasters: localStorage.getItem("laidies_bronze_coasters"),
    sibling: localStorage.getItem("laidies_unrelated_sibling")
  }));
  check(
    preserved.drink === corruptDrinkBytes &&
      preserved.coasters === corruptCoasterBytes &&
      preserved.sibling === "preserve-me",
    "corrupt receipts and sibling storage are preserved byte-for-byte on read"
  );
  await corruptContext.close();

  const audioContext = await contextFor({ preexistingGlobalAudio: true });
  const audioPage = await audioContext.newPage();
  await openRoom(audioPage);
  await openStation(audioPage, "bronze-stage");
  const audioButton = audioPage.locator('#bzBandBox button[data-src]');
  await audioButton.click();
  await audioPage.waitForFunction(
    () => document.querySelector('#bzBandBox button[data-src]')?.getAttribute('aria-pressed') === 'true'
  );
  check(
    (await audioButton.getAttribute("aria-pressed")) === "true",
    "recorded audio exposes playing toggle state"
  );
  check(
    (await audioPage.evaluate(() => window.__BRONZE_TEST__.audioInstances.length)) === 1,
    "one stage interaction creates one page-level audio owner"
  );
  check(
    (await audioPage.evaluate(() => window.__BRONZE_TEST__.globalAudioCalls)) === 0,
    "pre-existing global audio bypass is never invoked"
  );
  await audioButton.click();
  check(
    (await audioPage.locator("#bzStatus").innerText()).includes("paused"),
    "same audio control pauses and announces"
  );
  await audioContext.close();

  const audioFailureContext = await contextFor({ audio: "reject" });
  const audioFailurePage = await audioFailureContext.newPage();
  await openRoom(audioFailurePage);
  await openStation(audioFailurePage, "bronze-stage");
  const failedAudioButton = audioFailurePage.locator('#bzBandBox button[data-src]');
  await failedAudioButton.click();
  await audioFailurePage.waitForFunction(
    () =>
      document.querySelector("#bzStatus")?.textContent.includes(
        "blocked or failed"
      )
  );
  check(
    (await failedAudioButton.getAttribute("aria-pressed")) === "false" &&
      !(await failedAudioButton.getAttribute("class") || "").includes("is-playing"),
    "audio failure cannot leave a false playing state"
  );
  await audioFailureContext.close();

  const pendingAudioContext = await contextFor({ audio: "no-playing" });
  const pendingAudioPage = await pendingAudioContext.newPage();
  await openRoom(pendingAudioPage);
  await openStation(pendingAudioPage, "bronze-stage");
  const pendingAudioButton = pendingAudioPage.locator('#bzBandBox button[data-src]');
  await pendingAudioButton.click();
  check(
    (await pendingAudioButton.getAttribute("aria-pressed")) === "false" &&
      (await pendingAudioPage.locator("#bzStatus").innerText()).includes("starting"),
    "play promise alone cannot manufacture a playing state before the media event"
  );
  await pendingAudioPage.evaluate(() => {
    window.__BRONZE_TEST__.audioInstances[0].dispatchEvent(new Event("error"));
  });
  check(
    (await pendingAudioButton.getAttribute("aria-pressed")) === "false" &&
      (await pendingAudioPage.locator("#bzStatus").innerText()).includes("could not start"),
    "pending audio error clears ownership and remains honest"
  );
  await pendingAudioContext.close();

  const tabsContext = await contextFor();
  const tabsPage = await tabsContext.newPage();
  await openRoom(tabsPage);
  const desktopTargetHeights = await tabsPage
    .locator("[data-bronze-panel]")
    .evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height));
  check(
    desktopTargetHeights.every((height) => height >= 44),
    "all six desktop stations meet the 44px target floor"
  );
  await openStation(tabsPage, "bronze-answers");
  const firstTab = tabsPage.locator('.bronze-answer-tabs [role="tab"]').first();
  await firstTab.focus();
  await tabsPage.keyboard.press("ArrowRight");
  check(
    await tabsPage.locator('.bronze-answer-tabs [role="tab"]').nth(1).evaluate(
      (element) =>
        document.activeElement === element &&
        element.getAttribute("aria-selected") === "true"
    ),
    "answer tabs support arrow-key focus and activation"
  );
  await tabsContext.close();

  const reducedContext = await contextFor({ viewport: { width: 390, height: 844 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.emulateMedia({ reducedMotion: "reduce" });
  await openRoom(reducedPage);
  await openStation(reducedPage, "bronze-fortune");
  const reduced = await reducedPage.evaluate(() => ({
    stationTransition: getComputedStyle(
      document.querySelector(".bronze-object > span")
    ).transitionDuration,
    dealTransition: getComputedStyle(
      document.querySelector("#bronzeFortuneDeal")
    ).transitionDuration,
    scrollBehavior:
      window.__BRONZE_TEST__.scrolls.at(-1)?.behavior || "missing",
    overflow:
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1
  }));
  check(
    reduced.stationTransition === "0s" && reduced.dealTransition === "0s",
    "reduced motion removes station and fortune transitions"
  );
  check(reduced.scrollBehavior === "auto", "reduced motion uses auto panel scrolling");
  check(!reduced.overflow, "390px room has no core horizontal overflow");
  await reducedPage.screenshot({
    path: path.join(evidenceDir, "bronze-room-mobile-390.png"),
    fullPage: true
  });
  await reducedContext.close();

  const widthContext = await contextFor({ viewport: { width: 320, height: 900 } });
  const widthPage = await widthContext.newPage();
  await openRoom(widthPage);
  check(
    await widthPage.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1
    ),
    "320px room reflows without core horizontal overflow"
  );
  const targetHeights = await widthPage
    .locator("[data-bronze-panel]")
    .evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height));
  check(
    targetHeights.every((height) => height >= 44),
    "all six mobile stations meet the 44px target floor"
  );
  await openStation(widthPage, "bronze-fortune");
  await widthPage.locator("#bronzeFortuneLane").selectOption("spiritFree");
  const contrasts = {
    deal: await widthPage.evaluate(
      ratioScript("#bronzeFortuneDeal"),
      "#bronzeFortuneDeal"
    ),
    selectedTab: 0
  };
  await openStation(widthPage, "bronze-answers");
  contrasts.selectedTab = await widthPage.evaluate(
    ratioScript('.bronze-answer-tabs [aria-selected="true"]'),
    '.bronze-answer-tabs [aria-selected="true"]'
  );
  check(
    contrasts.deal >= 4.5,
    `fortune action contrast is at least 4.5:1 (${contrasts.deal.toFixed(2)}:1)`
  );
  check(
    contrasts.selectedTab >= 4.5,
    `selected answer-tab contrast is at least 4.5:1 (${contrasts.selectedTab.toFixed(2)}:1)`
  );
  await widthContext.close();

  const bwsContext = await contextFor({ reducedMotion: true });
  const bwsPage = await bwsContext.newPage();
  await bwsPage.emulateMedia({ reducedMotion: "reduce" });
  await bwsPage.goto(`${origin}/games/businesswomens-special.html`, {
    waitUntil: "domcontentloaded"
  });
  await bwsPage.locator('[data-lane="spiritFree"]').click();
  check(
    (await bwsPage.locator('[data-lane="spiritFree"]').getAttribute(
      "aria-pressed"
    )) === "true",
    "standalone spirit-free lane exposes selected state"
  );
  await bwsPage.locator('[data-flap="0"]').click();
  await bwsPage.waitForFunction(
    () => document.querySelector("#bwsSaveStatus")?.textContent.includes("Spirit-free suggestion dealt")
  );
  const standaloneReceipt = await bwsPage.evaluate(() =>
    JSON.parse(localStorage.getItem("laidies_bws_drink"))
  );
  check(
    standaloneReceipt.version === 2 &&
      standaloneReceipt.scope === "device-local" &&
      standaloneReceipt.lane === "spiritFree" &&
      /^spiritFree-\d{2}$/.test(standaloneReceipt.itemId),
    "standalone game writes the same typed spirit-free receipt"
  );
  check(
    await bwsPage.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1
    ),
    "standalone game has no core overflow at its rendered width"
  );
  check(
    !(await bwsPage.locator("main").innerText()).includes("this week's episode") &&
      (await bwsPage.locator("main").innerText()).includes("latest published episode"),
    "standalone episode wording is evergreen rather than unconditionally current"
  );
  await bwsContext.close();

  const injectedBwsContext = await contextFor({ reducedMotion: true });
  const injectedBwsPage = await injectedBwsContext.newPage();
  await injectedBwsPage.emulateMedia({ reducedMotion: "reduce" });
  await injectedBwsPage.goto(`${origin}/games/businesswomens-special.html`, {
    waitUntil: "domcontentloaded"
  });
  await injectedBwsPage.evaluate(() => {
    window.cocktailMenus = {
      cocktail: [{ name: "INJECTED SERVICE", vibe: "reserve", order: "call", note: "now" }]
    };
    window.cocktailFortuneFlaps = [{
      label: "INJECTED",
      description: "service",
      drinks: { cocktail: [0], spiritFree: [0] }
    }];
    Math.random = () => 0;
  });
  await injectedBwsPage.locator('[data-flap="0"]').click();
  await injectedBwsPage.waitForFunction(
    () => document.querySelector("#bwsSaveStatus")?.textContent.includes("suggestion dealt")
  );
  check(
    !(await injectedBwsPage.locator("#bwsResult").innerText()).includes("INJECTED") &&
      !(await injectedBwsPage.evaluate(() =>
        localStorage.getItem("laidies_bws_drink") || ""
      )).includes("INJECTED"),
    "standalone fortune ignores mutable global catalogue injection"
  );
  await injectedBwsContext.close();

  const bws320Context = await contextFor({ viewport: { width: 320, height: 900 } });
  const bws320Page = await bws320Context.newPage();
  await bws320Page.goto(`${origin}/games/businesswomens-special.html`, {
    waitUntil: "domcontentloaded"
  });
  const standaloneReflow = await bws320Page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    headerScrollWidth: document.querySelector("header")?.scrollWidth,
    mainScrollWidth: document.querySelector("main")?.scrollWidth,
    bodyWidth: Math.round(document.body.getBoundingClientRect().width),
    headerWidth: Math.round(document.querySelector("header")?.getBoundingClientRect().width || 0),
    mainWidth: Math.round(document.querySelector("main")?.getBoundingClientRect().width || 0),
    offenders: Array.from(document.querySelectorAll("body *"))
      .map((element) => {
        const box = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          id: element.id,
          className:
            typeof element.className === "string" ? element.className : "",
          left: Math.round(box.left),
          right: Math.round(box.right),
          width: Math.round(box.width),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth
        };
      })
      .filter(
        (item) =>
          item.right > document.documentElement.clientWidth + 1 ||
          item.left < -1 ||
          item.width > document.documentElement.clientWidth + 1 ||
          item.scrollWidth > item.clientWidth + 1
      )
      .slice(0, 8)
  }));
  check(
    standaloneReflow.scrollWidth <= standaloneReflow.clientWidth + 1,
    `standalone game reflows at 320px (${JSON.stringify(standaloneReflow)})`
  );
  const moodColumns = await bws320Page.locator("#bwsMoods").evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns.split(" ").length
  );
  check(moodColumns === 2, "standalone moods reflow to two columns at 320px");
  await bws320Context.close();

  const redirectContext = await contextFor();
  const redirectPage = await redirectContext.newPage();
  await redirectPage.goto(`${origin}/games/cocktail-fortune.html`, {
    waitUntil: "domcontentloaded"
  });
  await redirectPage.waitForURL(/madame-claio\.html/, { timeout: 5000 });
  check(
    redirectPage.url().includes("/games/madame-claio.html"),
    "Cocktail Fortune remains a distinct Mme CLAi-O handoff"
  );
  await redirectContext.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("BRONZE AIGE BROWSER FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("BRONZE AIGE BROWSER PASS");
console.log(`checks=${checks.length}`);
console.log(`external_requests_completed=0`);
console.log(`third_party_requests_blocked=${blockedExternal.length}`);
console.log(`evidence=${evidenceDir}`);
