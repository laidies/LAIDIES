#!/usr/bin/env node
const assert = require("node:assert/strict");
const path = require("node:path");

const playwrightPath = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightPath) throw new Error("PLAYWRIGHT_CORE_PATH is required");
const { chromium } = require(playwrightPath);

const origin = process.env.LUMINAIRY_ORIGIN || "http://127.0.0.1:4173";

async function imageFailures(page) {
  return page.locator(".lum-card__portrait img").evaluateAll(async (images) => {
    images.forEach((image) => { image.loading = "eager"; });
    await Promise.all(images.map((image) => image.decode().catch(() => null)));
    return images
      .filter((image) => !image.complete || image.naturalWidth < 100)
      .map((image) => image.getAttribute("src"));
  });
}

async function imageFailuresFor(page, selector) {
  return page.locator(selector).evaluateAll(async (images) => {
    images.forEach((image) => { image.loading = "eager"; });
    await Promise.all(images.map((image) => image.decode().catch(() => null)));
    return images
      .filter((image) => !image.complete || image.naturalWidth < 100)
      .map((image) => image.getAttribute("src"));
  });
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });

    await page.goto(origin + "/luminairy.html#saints", { waitUntil: "networkidle" });
    await page.locator(".lum-card").first().waitFor();
    assert.equal(await page.title(), "The LUMINAiRY · LAiDIES · SUNNYVAiLE");
    assert.equal(await page.locator(".lum-window, .lum-hero__windows").count(), 0, "rejected CSS-drawn stained-glass scenery must not return");
    assert.equal(await page.locator("#lumNaveImage").count(), 1, "the arrival must use the established LUMINAiRY nave artwork");
    assert.equal(await page.locator(".lum-tab__image").count(), 3, "each operative wing door needs its established artwork");
    assert.deepEqual(await imageFailuresFor(page, "#lumNaveImage, .lum-tab__image"), [], "nave and wing-door artwork must decode");
    assert.equal(await page.locator(".lum-card").count(), 13, "Saint wing must render 13 cards");
    assert.equal(await page.locator(".lum-card__song").count(), 12, "all 12 available Saint songs must expose controls");
    const carrieCard = page.locator(".lum-card", { hasText: "Carrie Bradshaw" });
    assert.equal(await carrieCard.locator(".lum-card__song").count(), 0, "deferred Carrie audio must not render a broken play control");
    assert.match(await carrieCard.locator(".lum-card__song-status").textContent(), /song coming later/i, "Carrie needs an honest visible deferred-song status");
    assert.match(await page.locator("#lumPlaylist").textContent(), /play all 12 available songs/i, "playlist count must exclude deferred audio");
    await page.locator("#lumAudio").evaluate((element) => {
      element.play = () => Promise.resolve();
    });
    await page.locator("#lumPlaylist").click();
    const playlistPaths = await page.locator("#lumAudio").evaluate(async (element) => {
      const paths = [];
      for (let index = 0; index < 12; index += 1) {
        paths.push(new URL(element.src).pathname);
        element.dispatchEvent(new Event("ended"));
        await Promise.resolve();
      }
      return paths;
    });
    assert.equal(new Set(playlistPaths).size, 12, "playlist must traverse each available Saint song once");
    assert.equal(playlistPaths.includes("/content/music/saint-carrie-bradshaw-staying-current.mp3"), false, "playlist must never request deferred Carrie audio");
    assert.deepEqual(await imageFailures(page), [], "all Saint images must decode");
    assert.equal(await page.locator("text=Oprah Winfrey").count(), 0);
    assert.equal(await page.locator("text=Jessica Fletcher").count(), 0);
    assert.equal(await page.locator("text=Jennifer Lopez").count(), 0);
    await assert.doesNotReject(() => page.locator(".lum-card", { hasText: "Bette Midler" }).getByText(/images, audio, files, data, code/i).waitFor());
    await assert.doesNotReject(() => page.locator(".lum-card", { hasText: "Cher Horowitz" }).locator(".lum-card__role").getByText(/Trendsetting/i).waitFor());
    await assert.doesNotReject(() => page.locator(".lum-card", { hasText: "Regina George" }).locator(".lum-card__role").getByText(/ANTI-SAINT/i).waitFor());

    const firstSaint = page.locator(".lum-card").first();
    const firstSaintName = (await firstSaint.locator(".lum-card__name").textContent()).trim();
    await firstSaint.locator(".lum-card__pick").click();
    assert.equal((await page.locator('[data-pick-output="saints"]').textContent()).trim(), firstSaintName);
    await page.reload({ waitUntil: "networkidle" });
    await page.locator(".lum-card").first().waitFor();
    assert.equal((await page.locator('[data-pick-output="saints"]').textContent()).trim(), firstSaintName, "local pick must survive reload");
    await page.locator(".lum-card").first().locator(".lum-card__pick").click();
    assert.equal((await page.locator('[data-pick-output="saints"]').textContent()).trim(), "No candle lit");

    await page.getByRole("tab", { name: /MAiVENS/ }).click();
    assert.equal(await page.locator(".lum-card").count(), 23, "Maven wing must render 23 cards");
    assert.deepEqual(await imageFailures(page), [], "all Maven images must decode");
    assert.ok(await page.locator(".lum-card__link").count() >= 23, "every Maven needs a source/work link");
    assert.match(await page.locator("#lumWingKicker").textContent(), /dark sapphire/i);

    await page.locator("#lumSearch").fill("privacy");
    assert.ok(await page.locator(".lum-card").count() >= 2, "search should find more than one privacy-related Maven");
    await page.locator("#lumSearch").fill("");

    const mavenTab = page.getByRole("tab", { name: /MAiVENS/ });
    await mavenTab.focus();
    await mavenTab.press("ArrowRight");
    assert.equal(await page.getByRole("tab", { name: /TRAiLBLAZERS/ }).getAttribute("aria-selected"), "true", "ArrowRight must activate the next tab");
    assert.equal(await page.locator(".lum-card").count(), 7, "Trailblazer wing must render 7 cards");
    assert.deepEqual(await imageFailures(page), [], "all Trailblazer images must decode");
    assert.ok(await page.locator(".lum-card__link").count() >= 7, "every Trailblazer needs a work/source link");
    assert.match(await page.locator("#lumWingKicker").textContent(), /golden amber/i);
    await assert.doesNotReject(() => page.locator(".lum-card", { hasText: "Allie K. Miller" }).getByRole("link", { name: /Official work/ }).waitFor());
    await assert.doesNotReject(() => page.locator(".lum-card", { hasText: "Fidji Simo" }).getByText(/part-time adviser as of July 2026/i).waitFor());

    const badRel = await page.locator('.lum-card__link[target="_blank"]').evaluateAll((links) => links
      .filter((link) => !(link.rel.includes("noopener") && link.rel.includes("noreferrer"))).length);
    assert.equal(badRel, 0, "external links need noopener noreferrer");
    assert.equal(await page.locator(".lum-card__portrait img[alt='']").count(), 0, "profile images need alt text");

    await page.goto(origin + "/luminairy.html#saints", { waitUntil: "networkidle" });
    await page.route("**/content/music/saint-cher-horowitz.mp3", (route) => route.fulfill({ status: 404, body: "missing" }));
    await page.locator(".lum-card").first().locator(".lum-card__song").click();
    await page.locator("#lumAudioStatus.is-error").waitFor();
    assert.match(await page.locator("#lumAudioStatus").textContent(), /could not/i, "audio failure must be visible");
    await page.setViewportSize({ width: 900, height: 800 });
    const compactDesktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(compactDesktopOverflow <= 1, `compact desktop horizontal overflow must be <=1px, got ${compactDesktopOverflow}px`);
    await context.close();

    const blockedContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    await blockedContext.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new DOMException("blocked", "SecurityError"); } });
    });
    const blockedPage = await blockedContext.newPage();
    await blockedPage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await blockedPage.locator(".lum-card").first().waitFor();
    assert.match(await blockedPage.locator("#lumLocalStatus").textContent(), /blocked local storage/i);
    assert.equal(await blockedPage.locator(".lum-card__pick:disabled").count(), 13, "storage failure must disable dishonest save controls");
    await blockedContext.close();

    const claimFailureContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    const claimFailurePage = await claimFailureContext.newPage();
    await claimFailurePage.route("**/content/luminairy-claims.json", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ schemaVersion: 4, product: "luminairy", admissionPolicy: "fail-closed", records: [] })
    }));
    await claimFailurePage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await claimFailurePage.locator("#lumResultStatus.is-error").waitFor();
    assert.equal(await claimFailurePage.locator(".lum-card").count(), 0, "failed editorial admission must render no profiles");
    assert.match(await claimFailurePage.locator("#lumResultStatus").textContent(), /could not load/i);
    await claimFailureContext.close();

    const noWebCryptoContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    await noWebCryptoContext.addInitScript(() => {
      Object.defineProperty(window, "crypto", { value: undefined, configurable: true });
      Object.defineProperty(window, "TextEncoder", { value: undefined, configurable: true });
    });
    const noWebCryptoPage = await noWebCryptoContext.newPage();
    await noWebCryptoPage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await noWebCryptoPage.locator(".lum-card").first().waitFor();
    assert.equal(await noWebCryptoPage.locator(".lum-card").count(), 13, "pure-JS signed admission fallback must work without Web Crypto/TextEncoder");
    assert.equal(await noWebCryptoPage.locator("html").getAttribute("data-luminairy-claims"), "admitted");
    await noWebCryptoContext.close();

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(origin + "/luminairy.html#trailblazers", { waitUntil: "networkidle" });
    await mobilePage.locator(".lum-card").first().waitFor();
    const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 1, `mobile horizontal overflow must be <=1px, got ${overflow}px`);
    assert.equal(await mobilePage.locator(".lum-card").count(), 7);
    assert.equal(await mobilePage.locator(".lum-tabs").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length), 1, "mobile tabs must stack");
    await mobileContext.close();

    const relevantConsoleErrors = consoleErrors.filter((message) => !/favicon|ERR_ABORTED|404/.test(message));
    assert.deepEqual(relevantConsoleErrors, [], "unexpected console errors: " + relevantConsoleErrors.join(" | "));
    console.log("LUMINAiRY browser PASS: 13/23/7 cards, honest 12-song playlist/deferred Carrie state, signed admission with/without Web Crypto, images, links, keyboard tabs, local persistence/failure, audio failure, compact-desktop overflow, and mobile overflow");
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
