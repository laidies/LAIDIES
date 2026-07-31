#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const moduleRoot = process.env.CHICK_FLICKS_PLAYWRIGHT_ROOT;
if (!moduleRoot) {
  throw new Error("CHICK_FLICKS_PLAYWRIGHT_ROOT must contain playwright-core");
}
const requireFromRoot = createRequire(path.join(moduleRoot, "package.json"));
const { chromium } = requireFromRoot("playwright-core");
const base = process.env.CHICK_FLICKS_URL || "http://127.0.0.1:8765";
const executablePath = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
].find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error("No local Chrome/Chromium executable found");

const canonicalIndex = JSON.parse(fs.readFileSync("content/episode-index.json", "utf8"));
const browser = await chromium.launch({ headless: true, executablePath });
const results = [];
const pass = (name) => results.push(name);
const localOnly = async (page) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1" || url.hostname === "localhost") await route.continue();
    else await route.abort();
  });
};
const open = async (page) => {
  await page.goto(`${base}/chick-flicks.html`, { waitUntil: "domcontentloaded" });
};
const waitLoaded = async (page) => {
  await page.waitForFunction(() =>
    /latest released tape|No released tapes are available|catalogue is temporarily unavailable/i
      .test(document.querySelector("#cf-title")?.textContent || ""));
};
const assertNoPageOverflow = async (page, label) => {
  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth
  }));
  assert.ok(width.scroll <= width.client + 1, `${label}: ${JSON.stringify(width)}`);
};
const assertNoErrors = (errors, label) => {
  assert.deepEqual(errors, [], `${label}: ${JSON.stringify(errors)}`);
};

try {
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    await localOnly(page);
    await open(page);
    await waitLoaded(page);
    assert.match(await page.locator("#cf-title").textContent(), /EP 04 is the latest released tape/i);
    assert.match(await page.locator("#cf-state-copy").textContent(), /latest released tape in the manifest/i);
    assert.doesNotMatch(await page.locator(".cf-state").textContent(), /this Wednesday|new this week/i);
    assert.equal(await page.locator("#cfWallBay .cf-tape").count(), 5);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-release-state="released"]').count(), 4);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-release-state="forthcoming"]').count(), 1);
    assert.match(await page.locator("#cfMemberStatus").textContent(), /saved on this device/i);
    assertNoErrors(errors, "new visitor");
    pass("new visitor sees one truthful latest release and released/forthcoming inventory");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await open(page);
    await waitLoaded(page);
    const expected = {
      all: 5,
      prompting: 4,
      style: 2,
      everyday: 3,
      ethics: 1,
      history: 1,
      creative: 0,
      unfiled: 0
    };
    for (const [aisle, count] of Object.entries(expected)) {
      const button = page.locator(`[data-aisle="${aisle}"]`);
      await button.click();
      assert.equal(await page.locator("#cfWallBay .cf-tape").count(), count, aisle);
      if (count) {
        assert.match(await page.locator("#cfAisleStatus").textContent(), /available.*coming soon.*unavailable/i);
      } else {
        assert.match(await page.locator("#cfAisleStatus").textContent(), /no tapes filed in this aisle/i);
        assert.equal(await page.locator("#cfWallEmpty").isVisible(), true);
      }
    }
    pass("every aisle reports its real inventory including deliberate empty Creative");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await open(page);
    await waitLoaded(page);
    await page.locator('#cfWallBay .cf-tape[data-episode="05"]').focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.activeElement?.id === "cfRental");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "cfRental");
    assert.match(await page.locator("#cfRentalEpisode").textContent(), /EP 05 · coming soon/i);
    assert.match(await page.locator("#cf-rental-title").textContent(), /still forthcoming/i);
    assert.equal(await page.locator("#cfTakeHome").isVisible(), false);
    assert.equal(await page.locator("#cfFavourite").isVisible(), false);
    pass("keyboard forthcoming selection focuses an honest non-rentable explanation");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await open(page);
    await waitLoaded(page);
    await page.locator('#cfWallBay .cf-tape[data-episode="01"]').click();
    await page.waitForFunction(() => document.activeElement?.id === "cfRental");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "cfRental");
    const href = await page.locator("#cfTakeHome").getAttribute("href");
    assert.equal(href, "/issues/issue-01.html");
    await Promise.all([
      page.waitForURL(/\/issues\/issue-01\.html$/),
      page.locator("#cfTakeHome").click()
    ]);
    assert.match(await page.title(), /On Wednesdays We Do AI/i);
    assert.equal(await page.evaluate(() => localStorage.getItem("laidies_cf_last_rental")), "01");
    pass("released tape hands off to the exact issue and records only device-local last rental");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await page.addInitScript(() => {
      localStorage.setItem("laidies_cf_last_rental", "02");
      localStorage.setItem("laidies_favorite_episode", "03");
    });
    await open(page);
    await waitLoaded(page);
    assert.match(await page.locator("#cf-state-copy").textContent(), /Last rented on this device: EP 02/i);
    assert.equal(await page.locator("#cfReturnVisit").isVisible(), true);
    assert.match(await page.locator("#cfReturnCopy").textContent(), /EP 02.*last tape taken home on this device/i);
    await page.locator("#cfContinueRental").click();
    await page.waitForFunction(() => document.activeElement?.id === "cfRental");
    assert.match(await page.locator("#cfRentalEpisode").textContent(), /EP 02/i);
    assert.match(await page.locator("#cfMemberStatus").textContent(), /Favourite on this device: EP 03/i);
    await page.locator('#cfWallBay .cf-tape[data-episode="03"]').click();
    assert.match(await page.locator("#cfFavourite").textContent(), /Remove favourite from this device/i);
    await page.locator("#cfFavourite").click();
    assert.equal(await page.evaluate(() => localStorage.getItem("laidies_favorite_episode")), null);
    assert.match(await page.locator("#cfMemberStatus").textContent(), /No favourite tape saved on this device/i);
    pass("valid same-device rental returns to the exact tape and favourite stays separately reversible");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await localOnly(page);
    await page.addInitScript(() => {
      localStorage.setItem("laidies_cf_last_rental", "02");
    });
    await open(page);
    await waitLoaded(page);
    assert.equal(await page.locator("#cfReturnVisit").isVisible(), true);
    await page.locator("#cfClearRental").click();
    await page.waitForFunction(() => document.activeElement?.hasAttribute("data-rent-latest"));
    assert.equal(await page.evaluate(() => localStorage.getItem("laidies_cf_last_rental")), null);
    assert.equal(await page.locator("#cfReturnVisit").isVisible(), false);
    assert.doesNotMatch(await page.locator("#cf-state-copy").textContent(), /Last rented on this device/i);
    await assertNoPageOverflow(page, "390px cleared return");
    pass("clear and start over removes only the last-rental hint and restores latest-tape focus");
    await page.close();
  }

  {
    for (const stored of ["05", "{wrong"]) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await localOnly(page);
      await page.addInitScript((value) => {
        localStorage.setItem("laidies_cf_last_rental", value);
      }, stored);
      await open(page);
      await waitLoaded(page);
      assert.equal(await page.locator("#cfReturnVisit").isVisible(), false, stored);
      assert.equal(await page.evaluate(() => localStorage.getItem("laidies_cf_last_rental")), null, stored);
      assert.doesNotMatch(await page.locator("#cf-state-copy").textContent(), /Last rented on this device/i);
      await assertNoPageOverflow(page, `390px invalid return ${stored}`);
      await page.close();
    }
    pass("forthcoming and corrupt last-rental records are cleared instead of rendered");
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await localOnly(page);
    await page.addInitScript(() => {
      localStorage.setItem("laidies_cf_last_rental", "02");
      const original = Storage.prototype.removeItem;
      Storage.prototype.removeItem = function removeItem(key) {
        if (String(key) === "laidies_cf_last_rental") {
          throw new DOMException("Blocked for deterministic test", "SecurityError");
        }
        return original.call(this, key);
      };
    });
    await open(page);
    await waitLoaded(page);
    await page.locator("#cfClearRental").click();
    await page.waitForFunction(() => document.activeElement?.id === "cfClearRental");
    assert.equal(await page.locator("#cfReturnVisit").isVisible(), true);
    assert.match(await page.locator("#cfReturnCopy").textContent(), /would not let the store clear/i);
    assert.equal(await page.evaluate(() => localStorage.getItem("laidies_cf_last_rental")), "02");
    await assertNoPageOverflow(page, "390px denied clear");
    pass("denied clear remains visible and reports failure without simulating success");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await page.addInitScript(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function setItem(key, value) {
        if (String(key) === "laidies_favorite_episode") {
          throw new DOMException("Blocked for deterministic test", "QuotaExceededError");
        }
        return original.call(this, key, value);
      };
    });
    await open(page);
    await waitLoaded(page);
    await page.locator('#cfWallBay .cf-tape[data-episode="04"]').click();
    await page.locator("#cfFavourite").click();
    assert.equal(await page.evaluate(() => localStorage.getItem("laidies_favorite_episode")), null);
    assert.match(await page.locator("#cfMemberStatus").textContent(), /could not change your device-only favourite/i);
    assert.doesNotMatch(await page.locator("#cfMemberStatus").textContent(), /Resident Card|saved favourite/i);
    pass("blocked favourite storage reports failure without a saved/account claim");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    const stale = structuredClone(canonicalIndex);
    stale.episodes.forEach((episode) => {
      if (episode.status === "published") episode.releaseDate = "2019-01-01";
    });
    await page.route("**/content/episode-index.json*", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(stale) }));
    await open(page);
    await waitLoaded(page);
    const arrival = await page.locator(".cf-state").textContent();
    assert.match(arrival, /latest released/i);
    assert.doesNotMatch(arrival, /this Wednesday|new this week|current release/i);
    pass("old dated manifest stays latest-released without manufacturing current-week freshness");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await localOnly(page);
    await page.route("**/content/episode-index.json*", (route) =>
      route.fulfill({ status: 503, contentType: "application/json", body: "{}" }));
    await open(page);
    await waitLoaded(page);
    assert.match(await page.locator("#cf-title").textContent(), /catalogue is temporarily unavailable/i);
    assert.match(await page.locator("#cf-state-copy").textContent(), /No tape is being presented as released/i);
    assert.equal(await page.locator("[data-rent-latest]").isDisabled(), true);
    assert.equal(await page.locator("[data-retry-catalogue]").isVisible(), true);
    assert.match(await page.locator("#cfMobileShelf").textContent(), /manifest is temporarily behind the counter/i);
    assert.doesNotMatch(await page.locator("body").textContent(), /EP 04 is on the wall|this Wednesday.?s new release/i);
    pass("missing index fails closed on desktop and mobile with a retry action");
    await page.close();
  }

  {
    const badFixtures = [
      { episodes: [] },
      { episodes: [{ number: 1, title: "One" }, { number: 1, title: "Duplicate" }] },
      { episodes: [{ number: "1", title: "Wrong type", status: "published", issueUrl: "issues/issue-01.html" }] }
    ];
    for (const fixture of badFixtures) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await localOnly(page);
      await page.route("**/content/episode-index.json*", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture) }));
      await open(page);
      await waitLoaded(page);
      assert.match(await page.locator("#cf-title").textContent(), /catalogue is temporarily unavailable/i);
      assert.equal(await page.locator("[data-rent-latest]").isDisabled(), true);
      await page.close();
    }
    pass("empty, duplicate and malformed indexes all fail closed");
  }

  {
    const additions = {
      episodes: canonicalIndex.episodes.concat([{
        number: 6,
        title: "A newly indexed release",
        status: "published",
        issueUrl: "issues/issue-04.html"
      }])
    };
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await page.route("**/content/episode-index.json*", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(additions) }));
    await open(page);
    await waitLoaded(page);
    assert.match(await page.locator("#cf-title").textContent(), /EP 06 is the latest released tape/i);
    assert.equal(await page.locator("#cfWallBay .cf-tape").count(), 6);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-episode="06"]').count(), 1);
    await page.locator('[data-aisle="unfiled"]').click();
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-episode="06"]').count(), 1);
    assert.match(await page.locator("#cfAisleStatus").textContent(), /Unfiled · 1 available/i);
    pass("added published episodes remain visible as latest and surface in the unfiled policy");
    await page.close();
  }

  {
    const changed = {
      episodes: canonicalIndex.episodes
        .filter((episode) => episode.number !== 2)
        .map((episode) => episode.number === 5 ? { ...episode, number: 8 } : episode)
    };
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await page.route("**/content/episode-index.json*", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(changed) }));
    await open(page);
    await waitLoaded(page);
    assert.equal(await page.locator("#cfWallBay .cf-tape").count(), 4);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-episode="02"]').count(), 0);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-episode="08"]').count(), 1);
    assert.match(await page.locator("#cf-title").textContent(), /EP 04 is the latest released tape/i);
    await page.locator('[data-aisle="unfiled"]').click();
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-episode="08"]').count(), 1);
    pass("removed and renumbered records change the whole wall without hardcoded omissions");
    await page.close();
  }

  {
    const fixture = {
      episodes: [
        { number: 1, title: "Draft", status: "draft", issueUrl: null },
        { number: 2, title: "Cancelled", status: "cancelled", issueUrl: null },
        { number: 3, title: "Removed", status: "removed", issueUrl: null },
        { number: 4, title: "Held", status: "held", issueUrl: null },
        { number: 5, title: "Unknown", status: "mystery", issueUrl: null },
        { number: 6, title: "Missing status", issueUrl: null }
      ]
    };
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await page.route("**/content/episode-index.json*", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture) }));
    await open(page);
    await waitLoaded(page);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-release-state="forthcoming"]').count(), 1);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-release-state="unavailable"]').count(), 5);
    for (const number of ["02", "03", "04", "05", "06"]) {
      assert.doesNotMatch(
        await page.locator(`#cfWallBay .cf-tape[data-episode="${number}"]`).getAttribute("aria-label"),
        /coming soon/i
      );
    }
    await page.locator('#cfWallBay .cf-tape[data-episode="02"]').click();
    assert.match(await page.locator("#cfRentalEpisode").textContent(), /unavailable/i);
    assert.match(await page.locator("#cfRentalCopy").textContent(), /does not promise a future release/i);
    pass("only draft promises forthcoming; cancelled removed held unknown and missing stay unavailable");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    const fixture = {
      episodes: [
        { number: 1, title: "Good route", status: "published", issueUrl: "issues/issue-01.html" },
        { number: 2, title: "External route", status: "published", issueUrl: "https://example.com/episode" },
        { number: 3, title: "Missing route", status: "published", issueUrl: "issues/does-not-exist.html" },
        { number: 4, title: "Unsafe route", status: "published", issueUrl: "javascript:alert(1)" },
        { number: 5, title: "Future route", status: "draft", issueUrl: null }
      ]
    };
    await page.route("**/content/episode-index.json*", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture) }));
    await open(page);
    await waitLoaded(page);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-release-state="released"]').count(), 1);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-release-state="unavailable"]').count(), 3);
    await page.locator('#cfWallBay .cf-tape[data-episode="03"]').click();
    assert.match(await page.locator("#cfRentalEpisode").textContent(), /temporarily unavailable/i);
    assert.match(await page.locator("#cfRentalCopy").textContent(), /will not offer a broken rental link/i);
    assert.equal(await page.locator("#cfTakeHome").isVisible(), false);
    pass("external, unsafe and missing issue URLs cannot become rentable");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await localOnly(page);
    await page.route("**/assets/sunnyvaile-interiors/episode-vhs-boxes/ep-01.webp*", (route) => route.abort());
    await open(page);
    await waitLoaded(page);
    const tape = page.locator('#cfWallBay .cf-tape[data-episode="01"]');
    await tape.locator("img").waitFor({ state: "hidden" });
    assert.equal(await tape.locator(".cf-tape__fallback").isVisible(), true);
    assert.match(await tape.locator(".cf-tape__fallback").textContent(), /EP 01.*Cover unavailable/i);
    assert.equal(await tape.getAttribute("data-release-state"), "released");
    await tape.click();
    assert.equal(await page.locator("#cfTakeHome").getAttribute("href"), "/issues/issue-01.html");
    pass("broken cover receives a readable fallback without disabling a valid issue");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await localOnly(page);
    let attempts = 0;
    await page.route("**/content/episode-index.json*", async (route) => {
      attempts += 1;
      if (attempts === 1) {
        await route.fulfill({ status: 503, contentType: "application/json", body: "{}" });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(canonicalIndex)
        });
      }
    });
    await open(page);
    await waitLoaded(page);
    assert.equal(await page.locator("[data-retry-catalogue]").isVisible(), true);
    await page.locator("[data-retry-catalogue]").click();
    await page.waitForFunction(() => /EP 04 is the latest released tape/i
      .test(document.querySelector("#cf-title")?.textContent || ""));
    assert.equal(attempts, 2);
    assert.equal(await page.locator("[data-retry-catalogue]").isVisible(), false);
    assert.equal(await page.locator("[data-rent-latest]").isEnabled(), true);
    await page.waitForFunction(() => document.activeElement?.hasAttribute("data-rent-latest"));
    assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute("data-rent-latest")), true);
    pass("manifest retry recovers the complete catalogue without reload");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => { window.__CHICK_FLICKS_FETCH_TIMEOUT_MS = 100; });
    await localOnly(page);
    await page.route("**/content/episode-index.json*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(canonicalIndex)
        });
      } catch {}
    });
    const started = Date.now();
    await open(page);
    await waitLoaded(page);
    assert.ok(Date.now() - started < 1000);
    assert.match(await page.locator("#cf-title").textContent(), /catalogue is temporarily unavailable/i);
    assert.equal(await page.locator("[data-retry-catalogue]").isVisible(), true);
    pass("delayed index request times out into an honest retry state");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => { window.__CHICK_FLICKS_FETCH_TIMEOUT_MS = 120; });
    await localOnly(page);
    const fixture = {
      episodes: [
        { number: 1, title: "Recoverable tape", status: "published", issueUrl: "issues/issue-01.html" }
      ]
    };
    let destinationAttempts = 0;
    await page.route("**/content/episode-index.json*", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture) }));
    await page.route("**/issues/issue-01.html*", async (route) => {
      destinationAttempts += 1;
      if (destinationAttempts < 3) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        try { await route.fulfill({ status: 200, contentType: "text/html", body: "<title>Issue</title>" }); } catch {}
      } else {
        await route.fulfill({ status: 200, contentType: "text/html", body: "<title>Issue</title>" });
      }
    });
    await open(page);
    await waitLoaded(page);
    assert.equal(await page.locator("[data-retry-catalogue]").isVisible(), true);

    await page.locator("[data-retry-catalogue]").click();
    await page.waitForFunction(() => document.activeElement?.id === "cf-title");
    assert.match(await page.locator("#cf-title").textContent(), /Checking the tape manifest/i);
    await page.waitForFunction(() =>
      document.activeElement?.hasAttribute("data-retry-catalogue") &&
      !document.activeElement.hidden);
    assert.match(await page.locator("#cf-title").textContent(), /catalogue is temporarily unavailable/i);

    await page.locator("[data-retry-catalogue]").click();
    await page.waitForFunction(() => /EP 01 is the latest released tape/i
      .test(document.querySelector("#cf-title")?.textContent || ""));
    await page.waitForFunction(() => document.activeElement?.hasAttribute("data-rent-latest"));
    assert.equal(destinationAttempts, 3);
    assert.equal(await page.locator('#cfWallBay .cf-tape[data-episode="01"]').count(), 1);
    pass("destination timeout is bounded and retry focus moves loading to failure to restored latest action");
    await page.close();
  }

  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce"
    });
    await localOnly(page);
    await page.addInitScript(() => {
      window.__cfScrollBehaviors = [];
      const original = Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView = function scrollIntoView(options) {
        window.__cfScrollBehaviors.push(options?.behavior || "auto");
        return original.call(this, { ...options, behavior: "auto" });
      };
    });
    await open(page);
    await waitLoaded(page);
    await page.locator('[data-aisle="history"]').focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("data-aisle")), "history");
    await page.locator('#cfMobileShelf .cf-tape[data-episode="04"]').focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.activeElement?.id === "cfRental");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "cfRental");
    assert.deepEqual(await page.evaluate(() => window.__cfScrollBehaviors), ["auto", "auto"]);
    assert.equal(await page.locator("#cfTakeHome").isVisible(), true);
    pass("keyboard focus and reduced-motion scrolling remain logical on mobile");
    await page.close();
  }

  for (const width of [320, 390, 1280]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce"
    });
    await localOnly(page);
    await open(page);
    await waitLoaded(page);
    await assertNoPageOverflow(page, `${width}px`);
    const aisleTarget = await page.locator('[data-aisle="prompting"]').boundingBox();
    assert.ok(aisleTarget && aisleTarget.height >= 44, `${width}: ${JSON.stringify(aisleTarget)}`);
    const tape = width <= 640 ?
      page.locator('#cfMobileShelf .cf-tape[data-episode="01"]') :
      page.locator('#cfWallBay .cf-tape[data-episode="01"]');
    const tapeTarget = await tape.boundingBox();
    assert.ok(tapeTarget && tapeTarget.width >= 44 && tapeTarget.height >= 44,
      `${width}: ${JSON.stringify(tapeTarget)}`);
    await page.close();
  }
  pass("320, 390 and 1280 layouts reflow with 44px primary catalogue targets");

  {
    const page = await browser.newPage({
      viewport: { width: 640, height: 900 },
      reducedMotion: "reduce"
    });
    await localOnly(page);
    await open(page);
    await waitLoaded(page);
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    await assertNoPageOverflow(page, "200-percent proxy");
    const widths = await page.evaluate(() => {
      const selectors = [".cf-wall", ".cf-state", ".cf-aisles", ".cf-rental", ".cf-counter", ".cf-trailer"];
      return Object.fromEntries(selectors.map((selector) => {
        const element = document.querySelector(selector);
        return [selector, { client: element.clientWidth, scroll: element.scrollWidth }];
      }));
    });
    for (const [selector, value] of Object.entries(widths)) {
      assert.ok(value.scroll <= value.client + 1, `${selector}: ${JSON.stringify(value)}`);
    }
    pass("catalogue layout families remain bounded at the 200-percent proxy");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await localOnly(page);
    await open(page);
    await waitLoaded(page);
    assert.match(await page.locator(".cf-trailer").textContent(), /illustrated, captioned introduction/i);
    assert.equal(
      await page.locator('.cf-trailer__copy a[href="/watch.html?ep=trailer"]').getAttribute("href"),
      "/watch.html?ep=trailer"
    );
    assert.equal(
      await page.locator('.cf-trailer__copy a[href="/issues/issue-trailer.html"]').getAttribute("href"),
      "/issues/issue-trailer.html"
    );
    assert.doesNotMatch(await page.locator(".cf-trailer").textContent(), /whole town in one watch|motion film/i);
    pass("trailer handoff promises only the illustrated captioned listen-along");
    await page.close();
  }

  {
    const expected = new Map([
      ["/index.html", ["Released episodes, then the full eight-stop route", "latest released episode, or start at Episode 1"]],
      ["/content/site/sunnyvaile-directory.js", ["Latest released tape"]],
      ["/content/site/sv-tour-checkin.js", ["Latest released episode"]],
      ["/content/site/sv-welcome-tour.js", ["Pull a released episode"]],
      ["/issues/issue-trailer.html", ["Grab a released tape", "Choose a released tape"]]
    ]);
    const forbidden = [
      "This week's rental",
      "This week's episode",
      "this week’s episode, or start",
      "Pull this week's episode",
      "one tape a week",
      "Grab this week's tape",
      "Grab this week's —"
    ];
    for (const [pathname, phrases] of expected) {
      const response = await browser.newContext().then(async (context) => {
        const result = await context.request.get(`${base}${pathname}`);
        const body = await result.text();
        await context.close();
        return { ok: result.ok(), body };
      });
      assert.equal(response.ok, true, pathname);
      for (const phrase of phrases) assert.ok(response.body.includes(phrase), `${pathname}: ${phrase}`);
      for (const phrase of forbidden) assert.ok(!response.body.includes(phrase), `${pathname}: ${phrase}`);
    }
    pass("exact shared Chick Flicks entries avoid unsupported weekly freshness claims");
  }
} finally {
  await browser.close();
}

console.log(`CHICK FLICKS BROWSER PASS (${results.length} journeys)`);
for (const name of results) console.log(`- ${name}`);
