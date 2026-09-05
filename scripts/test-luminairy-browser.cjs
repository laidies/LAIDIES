#!/usr/bin/env node
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const playwrightPath = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightPath) throw new Error("PLAYWRIGHT_CORE_PATH is required");
const { chromium } = require(playwrightPath);

const origin = process.env.LUMINAIRY_ORIGIN || "http://127.0.0.1:4173";
const invalidAccountFixture = process.env.LUMINAIRY_ACCOUNT_FIXTURE_INVALID === "1";
const profiles = JSON.parse(fs.readFileSync(path.join(__dirname, "../content/luminairy-profiles.json"), "utf8"));

async function assertExactResources(page, wing) {
  const expected = profiles[wing];
  for (const profile of expected) {
    const card = page.locator(".lum-card", { has: page.locator(".lum-card__name", { hasText: profile.name }) });
    assert.equal(await card.count(), 1, `${profile.id} must render exactly once`);
    await card.locator(".lum-card__cover").click();
    await page.locator("#lumProfileTitle", { hasText: profile.name }).waitFor();
    assert.equal(await page.locator("#lumProfile .lum-profile__resource").count(), profile.links.length, `${profile.id} must render every verified destination on its complete profile`);
    for (const link of profile.links) {
      const anchor = page.locator("#lumProfile").getByRole("link", { name: new RegExp(`^${link.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*↗$`) });
      assert.equal(await anchor.count(), 1, `${profile.id} destination missing: ${link.label}`);
      assert.equal(await anchor.getAttribute("href"), link.url, `${profile.id} destination URL mismatch: ${link.label}`);
    }
    await page.locator(".lum-profile__back").click();
    await page.locator("#lumPanel").waitFor();
  }
}

async function assertCoverContract(page, expectedCount) {
  assert.equal(await page.locator(".lum-card").count(), expectedCount);
  for (const card of await page.locator(".lum-card").all()) {
    assert.equal(await card.locator(".lum-card__cover").count(), 1, "every cover must be one native link");
    assert.equal(await card.locator(".lum-card__portrait img").count(), 1, "every cover needs its approved image");
    assert.equal(await card.locator(".lum-card__role").count(), 1, "every cover needs its canonical role");
    assert.equal(await card.locator(".lum-card__name").count(), 1, "every cover needs its name");
    assert.equal(await card.locator("a, button").count(), 1, "a cover must not contain nested actions");
    assert.equal(await card.locator(".lum-card__about, .lum-card__lesson, .lum-card__freshness, .lum-card__archetype, .lum-card__song, .lum-card__pick, .lum-card__link").count(), 0, "profile material must not leak onto covers");
  }
}

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
    assert.doesNotMatch(await page.locator('meta[name="description"]').getAttribute("content"), /43 illustrated guides/i, "page metadata must not collapse the three wings into an all-guides label");
    assert.equal(await page.locator(".lum-hero__lead").count(), 0, "the three distinct wings must not be collapsed into a false all-guides umbrella");
    assert.equal(await page.locator(".lum-hero__status").count(), 0, "internal archive and production status must not appear in the visitor hero");
    assert.equal(await page.locator(".lum-orientation").count(), 0, "a second defensive orientation band must not return after the hero explains the room");
    const heroIntroduction = (await page.locator(".lum-nave__copy").textContent()).trim();
    assert.match(heroIntroduction, /Lantern Hill.+SUNNYVAiLE/i, "the approved Matron arrival must locate the building in SUNNYVAiLE");
    assert.match(heroIntroduction, /Cross the nave.+Push one door.+Meet the women and characters who lit the way/is, "the arrival must direct visitors into the three wings");
    assert.equal((await page.locator("#archiveTitle").textContent()).trim(), "Meet the three wings.", "archive heading must preserve the distinct wing jobs");
    assert.equal((await page.locator("#localTitle").textContent()).trim(), "Choose who you want in your corner.", "personalization must explain the human payoff rather than only issue an instruction");
    assert.match(await page.locator("#lumLocalBenefit").textContent(), /working habit.+perspective.+person shaping what comes next.+My Closet/is, "the panel must explain why each of the three choices is useful and where it goes");
    assert.match(await page.locator("#lumLocalStatus").textContent(), /(browser right away|My Closet on this device).+Sign in.+private account.+other devices/is, "the persistence copy must distinguish immediate local save from account-backed restoration");
    assert.ok(await page.locator(".lum-archive").evaluate((archive) => archive.compareDocumentPosition(document.querySelector(".lum-local")) & Node.DOCUMENT_POSITION_FOLLOWING), "visitors must meet the complete profile archive before personal-pick controls");
    assert.doesNotMatch(await page.locator("body").textContent(), /No Luminaries|No candle lit/i, "an empty personal selection must never imply that the LUMINAiRY has no profiles");
    assert.equal((await page.locator('[data-pick-output="saints"]').textContent()).trim(), "No personal pick yet");
    assert.match(await page.locator(".lum-tab--saints .lum-tab__copy").textContent(), /13 cards/i, "the Saints door count must use the canonical card noun");
    assert.equal(await page.locator(".lum-panel .lum-search").count(), 1, "the active-wing filter must live inside the wing it filters");
    assert.equal(await page.locator(".lum-archive__head .lum-search").count(), 0, "a wing-scoped filter must not appear above all three wing doors like a global search");
    assert.equal((await page.locator("#lumSearchLabel").textContent()).trim(), "Search PATRON SAiNT cards", "the search label must name its active scope");
    assert.equal(await page.locator(".lum-counts").count(), 0, "the redundant stretched collection-count strip must not return");
    assert.equal(await page.locator(".lum-method").count(), 0, "the redundant legalistic label-explanation panel must not return");
    assert.doesNotMatch(await page.locator("body").textContent(), /correction-route status|admiration is not the evidence|same-browser reminder|not a badge|claim that you mastered/i, "internal correction-route and defensive implementation language must not appear on the visitor page");
    assert.match(await page.locator('link[href*="luminairy-v2.css"]').getAttribute("href"), /card-profile-v1$/, "the card/profile successor must load its matching cache-busted stylesheet");
    assert.match(await page.locator('script[src*="luminairy-claim-gate.js"]').getAttribute("src"), /20260902-r5$/, "the complete profile-resource release must load the matching admission gate");
    assert.match(await page.locator('script[src*="luminairy-app.js"]').getAttribute("src"), /card-profile-v1$/, "the card/profile runtime must load its matching cache-busted script");
    assert.equal(await page.locator(".lum-window, .lum-hero__windows").count(), 0, "rejected CSS-drawn stained-glass scenery must not return");
    assert.equal(await page.locator("#lumNaveImage").count(), 1, "the arrival must use the established LUMINAiRY nave artwork");
    assert.equal(await page.locator(".lum-tab__image").count(), 3, "each operative wing door needs its established artwork");
    assert.match(await page.locator(".lum-tab--saints .lum-tab__image").getAttribute("src"), /luminairy-saints-wing-door-v2-no-heart\.png$/, "the Saints entrance must not restore the rejected literal heart motif");
    assert.deepEqual(await imageFailuresFor(page, "#lumNaveImage, .lum-tab__image"), [], "nave and wing-door artwork must decode");
    const inactiveDoorFilters = await page.locator('.lum-tab[aria-selected="false"] .lum-tab__image').evaluateAll((images) => images.map((image) => getComputedStyle(image).filter));
    assert.ok(inactiveDoorFilters.every((filter) => !/brightness\(0\./.test(filter) && !/saturate\(0\./.test(filter)), `unselected wing art must stay luminous, got ${inactiveDoorFilters.join(" | ")}`);
    const siteSystem = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const hero = getComputedStyle(document.querySelector(".lum-nave__copy"));
      const search = getComputedStyle(document.querySelector("#lumSearch"));
      return {
        displayFont: root.getPropertyValue("--lum-display"),
        heroDisplayFont: root.getPropertyValue("--lum-hero-display"),
        heroRadius: parseFloat(hero.borderRadius),
        searchRadius: parseFloat(search.borderRadius)
      };
    });
    assert.match(siteSystem.displayFont, /Jost/i, "LUMINAiRY structural display type must use the shared Jost system");
    assert.match(siteSystem.heroDisplayFont, /Anton/i, "the approved Matron hero must use the LAiDIES display face");
    assert.equal(siteSystem.heroRadius, 0, "the approved hero copy remains a full-bleed overlay, not a floating panel");
    assert.ok(siteSystem.searchRadius >= 10, `search control needs the shared rounded grammar, got ${siteSystem.searchRadius}px`);
    assert.equal(await page.locator(".lum-card").count(), 13, "Saint wing must render 13 cards");
    await assertCoverContract(page, 13);
    assert.match(await page.locator("#lumResultStatus").textContent(), /13 of 13 cards shown/i, "Saint result count must use the canonical card noun");
    const saintFinalRowOffset = await page.evaluate(() => {
      const gridBox = document.querySelector(".lum-grid").getBoundingClientRect();
      const cardBox = document.querySelector(".lum-card:last-child").getBoundingClientRect();
      return Math.abs((gridBox.left + gridBox.width / 2) - (cardBox.left + cardBox.width / 2));
    });
    assert.ok(saintFinalRowOffset <= 1, `a single final card must be centered instead of leaving a right-side end-cap, got ${saintFinalRowOffset}px`);
    assert.equal(await page.getByRole("link", { name: "Corrections", exact: true }).getAttribute("href"), "/town-hall.html#town-hall-feedback", "the trust route belongs in one quiet footer link");
    assert.equal(await page.locator(".lum-card__song").count(), 0, "Saint songs must not appear on archive covers");
    const carrieCard = page.locator(".lum-card", { hasText: "Carrie Bradshaw" });
    await carrieCard.locator(".lum-card__cover").click();
    assert.equal(await page.locator("#lumProfile .lum-profile__song").count(), 0, "deferred Carrie audio must not render a broken play control");
    assert.match(await page.locator("#lumProfile .lum-profile__song-status").textContent(), /song coming later/i, "Carrie needs an honest visible deferred-song status on her profile");
    await page.locator(".lum-profile__back").click();
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
    await page.locator(".lum-card", { hasText: "Bette Midler" }).locator(".lum-card__cover").click();
    await assert.doesNotReject(() => page.locator("#lumProfile").getByText(/images, audio, files, data, code/i).waitFor());
    await page.locator(".lum-profile__back").click();
    await page.waitForFunction(() => location.hash === "#saints" && !document.getElementById("lumPanel").hidden);
    await assert.doesNotReject(() => page.locator(".lum-card", { hasText: "Cher Horowitz" }).locator(".lum-card__role").getByText(/Trendsetting/i).waitFor());
    await assert.doesNotReject(() => page.locator(".lum-card", { hasText: "Regina George" }).locator(".lum-card__role").getByText(/ANTI-SAINT/i).waitFor());

    const firstSaint = page.locator(".lum-card").first();
    const firstSaintName = (await firstSaint.locator(".lum-card__name").textContent()).trim();
    const firstSaintId = await firstSaint.getAttribute("data-profile-id");
    await firstSaint.locator(".lum-card__cover").focus();
    await firstSaint.locator(".lum-card__cover").press("Enter");
    await page.waitForFunction((id) => location.hash === "#" + id, firstSaintId);
    await page.locator("#lumProfileTitle", { hasText: firstSaintName }).waitFor();
    assert.equal((await page.locator("#lumProfileTitle").textContent()).trim(), firstSaintName, "the whole card must open its complete profile");
    assert.equal(await page.locator("#lumPanel").isVisible(), false, "archive grid must yield to the complete profile");
    await page.waitForFunction(() => document.activeElement?.id === "lumProfileTitle");
    assert.equal(await page.locator("#lumProfileTitle").evaluate((node) => document.activeElement === node), true, "profile heading must receive focus");
    await page.locator(".lum-profile__pick").click();
    await page.waitForFunction(() => document.activeElement?.classList.contains("lum-profile__pick"));
    assert.equal((await page.locator('[data-pick-output="saints"]').textContent()).trim(), firstSaintName);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("laidies_luminaries_v1")).saints.id), firstSaintId, "the pick must enter the versioned Luminaries continuation envelope");
    await page.reload({ waitUntil: "networkidle" });
    await page.locator("#lumProfileTitle").waitFor();
    assert.equal((await page.locator('[data-pick-output="saints"]').textContent()).trim(), firstSaintName, "local pick must survive reload");
    await page.locator(".lum-profile__pick").click();
    await page.waitForFunction(() => document.activeElement?.classList.contains("lum-profile__pick"));
    assert.equal((await page.locator('[data-pick-output="saints"]').textContent()).trim(), "No personal pick yet");
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("laidies_luminaries_v1")).saints.id), "", "clearing a pick must preserve a timestamped tombstone so an old account value cannot reappear");

    await page.locator(".lum-profile__back").click();
    await page.waitForFunction((id) => document.activeElement?.closest(".lum-card")?.dataset.profileId === id, firstSaintId);
    await page.getByRole("tab", { name: /MAiVENS/ }).click();
    assert.equal(await page.locator(".lum-card").count(), 23, "Maven wing must render 23 cards");
    await assertCoverContract(page, 23);
    assert.equal((await page.locator("#lumSearchLabel").textContent()).trim(), "Search MAiVEN profiles", "the filter scope must update with the active wing");
    assert.deepEqual(await imageFailures(page), [], "all Maven images must decode");
    await assertExactResources(page, "mavens");
    assert.match(await page.locator("#lumWingKicker").textContent(), /dark sapphire/i);
    const hannahCard = page.locator(".lum-card", { hasText: "Hannah Fry" });
    await hannahCard.locator(".lum-card__cover").click();
    await page.locator("#lumProfileTitle", { hasText: "Hannah Fry" }).waitFor();
    assert.equal(await page.locator("#lumProfile .lum-profile__resource").count(), 7, "Hannah Fry needs all seven verified read, watch, listen, and follow destinations");
    for (const label of [
      "Read Cambridge profile", "Watch AI Confidential", "Listen to The Rest Is Science",
      "Listen to Google DeepMind: The Podcast", "Watch Hannah Fry on YouTube",
      "Follow Hannah Fry on Instagram", "Follow Hannah Fry on X"
    ]) {
      assert.equal(await page.locator("#lumProfile").getByRole("link", { name: new RegExp(label, "i") }).count(), 1, `Hannah Fry resource missing: ${label}`);
    }
    await page.locator(".lum-profile__back").click();
    await page.locator("#lumPanel").waitFor();

    await page.locator("#lumSearch").fill("privacy");
    assert.ok(await page.locator(".lum-card").count() >= 2, "search should find more than one privacy-related Maven");
    await page.locator("#lumSearch").fill("");

    const mavenTab = page.getByRole("tab", { name: /MAiVENS/ });
    await mavenTab.focus();
    await mavenTab.press("ArrowRight");
    assert.equal(await page.getByRole("tab", { name: /TRAiLBLAZERS/ }).getAttribute("aria-selected"), "true", "ArrowRight must activate the next tab");
    assert.equal(await page.locator("#lumSearch").inputValue(), "", "changing wings must clear a wing-scoped query");
    assert.equal((await page.locator("#lumSearchLabel").textContent()).trim(), "Search TRAiLBLAZER profiles", "keyboard wing changes must update the filter scope");
    assert.equal(await page.locator(".lum-card").count(), 7, "Trailblazer wing must render 7 cards");
    await assertCoverContract(page, 7);
    const trailFinalRowOffset = await page.evaluate(() => {
      const gridBox = document.querySelector(".lum-grid").getBoundingClientRect();
      const cardBox = document.querySelector(".lum-card:last-child").getBoundingClientRect();
      return Math.abs((gridBox.left + gridBox.width / 2) - (cardBox.left + cardBox.width / 2));
    });
    assert.ok(trailFinalRowOffset <= 1, `the final Trailblazer must be centered instead of leaving a right-side end-cap, got ${trailFinalRowOffset}px`);
    assert.equal(await page.locator("#lumPlaylist").isVisible(), false, "Saint playlist control must be absent outside the Saints wing");
    assert.equal(await page.locator("#lumAudioStatus").isVisible(), false, "Saint playback status must clear when leaving the Saints wing");
    assert.deepEqual(await imageFailures(page), [], "all Trailblazer images must decode");
    await assertExactResources(page, "trailblazers");
    assert.match(await page.locator("#lumWingKicker").textContent(), /golden amber/i);
    await page.locator(".lum-card", { hasText: "Allie K. Miller" }).locator(".lum-card__cover").click();
    await page.locator("#lumProfileTitle", { hasText: "Allie K. Miller" }).waitFor();
    await assert.doesNotReject(() => page.locator("#lumProfile").getByRole("link", { name: /Read Allie K. Miller’s work/ }).waitFor());
    await page.locator(".lum-profile__back").click();
    await page.locator("#lumPanel").waitFor();
    await page.locator(".lum-card", { hasText: "Fidji Simo" }).locator(".lum-card__cover").click();
    await page.locator("#lumProfileTitle", { hasText: "Fidji Simo" }).waitFor();
    await assert.doesNotReject(() => page.locator("#lumProfile").getByText(/CEO of Applications at OpenAI/i).waitFor());

    const badRel = await page.locator('.lum-profile__resource[target="_blank"]').evaluateAll((links) => links
      .filter((link) => !(link.rel.includes("noopener") && link.rel.includes("noreferrer"))).length);
    assert.equal(badRel, 0, "external links need noopener noreferrer");
    assert.equal(await page.locator(".lum-card__portrait img[alt='']").count(), 0, "profile images need alt text");

    await page.goto(origin + "/luminairy.html#saints", { waitUntil: "networkidle" });
    await page.route("**/content/music/saint-cher-horowitz.mp3", (route) => route.fulfill({ status: 404, body: "missing" }));
    await page.locator(".lum-card").first().locator(".lum-card__cover").click();
    await page.locator(".lum-profile__song").click();
    await page.locator("#lumAudioStatus.is-error").waitFor();
    assert.match(await page.locator("#lumAudioStatus").textContent(), /could not/i, "audio failure must be visible");
    await page.setViewportSize({ width: 900, height: 800 });
    const compactDesktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(compactDesktopOverflow <= 1, `compact desktop horizontal overflow must be <=1px, got ${compactDesktopOverflow}px`);
    await context.close();

    const missingContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    const missingPage = await missingContext.newPage();
    await missingPage.goto(origin + "/luminairy.html#not-a-real-profile", { waitUntil: "networkidle" });
    await missingPage.locator("#lumProfileTitle").waitFor();
    assert.match(await missingPage.locator("#lumProfileTitle").textContent(), /not in the LUMINAiRY/i, "an invalid direct profile must fail calmly");
    assert.equal(await missingPage.locator(".lum-card:visible").count(), 0, "an invalid profile route must not silently display an unrelated archive");
    assert.equal(await missingPage.locator(".lum-profile__back").getAttribute("href"), "#saints", "an invalid profile needs a useful archive return");
    await missingContext.close();

    const directContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    const directPage = await directContext.newPage();
    await directPage.goto(origin + "/luminairy.html#ada-lovelace", { waitUntil: "networkidle" });
    await directPage.locator("#lumProfileTitle", { hasText: "Ada Lovelace" }).waitFor();
    await directPage.waitForFunction(() => document.activeElement?.id === "lumProfileTitle");
    assert.equal(await directPage.locator("#lumPanel").isVisible(), false, "a direct profile hash must open the complete profile rather than the archive card");
    await directContext.close();

    const blockedContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    await blockedContext.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new DOMException("blocked", "SecurityError"); } });
    });
    const blockedPage = await blockedContext.newPage();
    await blockedPage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await blockedPage.locator(".lum-card").first().waitFor();
    assert.match(await blockedPage.locator("#lumLocalStatus").textContent(), /blocked local storage/i);
    await blockedPage.locator(".lum-card__cover").first().click();
    await blockedPage.locator(".lum-profile__pick").waitFor();
    assert.equal(await blockedPage.locator(".lum-profile__pick:disabled").count(), 1, "storage failure must disable the profile save control");
    await blockedContext.close();

    const transientFailureContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    const transientFailurePage = await transientFailureContext.newPage();
    let profileRequestCount = 0;
    await transientFailurePage.route("**/content/luminairy-profiles.json", (route) => {
      profileRequestCount += 1;
      if (profileRequestCount === 1) return route.fulfill({ status: 503, body: "temporary local-server restart" });
      return route.continue();
    });
    await transientFailurePage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await transientFailurePage.locator(".lum-card").first().waitFor({ timeout: 5000 });
    assert.equal(profileRequestCount, 2, "a transient profile-data failure must retry once automatically");
    assert.equal(await transientFailurePage.locator("#lumResultStatus.is-error").count(), 0, "a successful retry must clear the failure state");
    await transientFailureContext.close();

    const claimFailureContext = await browser.newContext({ viewport: { width: 900, height: 800 } });
    const claimFailurePage = await claimFailureContext.newPage();
    let persistentProfileRequestCount = 0;
    await claimFailurePage.route("**/content/luminairy-profiles.json", (route) => {
      persistentProfileRequestCount += 1;
      return route.continue();
    });
    await claimFailurePage.route("**/content/luminairy-claims.json", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ schemaVersion: 4, product: "luminairy", admissionPolicy: "fail-closed", records: [] })
    }));
    await claimFailurePage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await claimFailurePage.locator("#lumResultStatus.is-error").waitFor();
    assert.equal(await claimFailurePage.locator(".lum-card").count(), 0, "failed editorial admission must render no profiles");
    assert.match(await claimFailurePage.locator("#lumResultStatus").textContent(), /couldn.t open the luminairy/i, "failure copy must be useful visitor language rather than production diagnostics");
    assert.equal(await claimFailurePage.getByRole("button", { name: "Try again" }).count(), 1, "a persistent load failure must offer an in-page retry");
    assert.doesNotMatch(await claimFailurePage.locator("body").textContent(), /no names, roles, or sources are being invented/i, "the visitor failure state must not expose internal fail-closed language");
    assert.equal(persistentProfileRequestCount, 2, "a persistent failure must stop after one automatic retry");
    await claimFailurePage.getByRole("button", { name: "Try again" }).click();
    await claimFailurePage.getByRole("button", { name: "Try again" }).waitFor();
    assert.equal(persistentProfileRequestCount, 4, "manual retry must perform one bounded retry cycle");
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

    const installAccountFixture = async (context, remoteDocument) => {
      await context.addInitScript((documentFixture) => {
        window.__LAIDIES_MAIKEOVER_ACCOUNT_PREFLIGHT__ = true;
        window.__LAIDIES_MAIKEOVER_PREFLIGHT_FIXTURE_ID__ = "synthetic-luminaries-account";
        window.__LUM_ACCOUNT_REMOTE__ = {
          revision: "revision-1",
          document: documentFixture
        };
        window.__LAIDIES_MAIKEOVER_PREFLIGHT_CLIENT__ = {
          auth: {
            getSession: async () => ({
              data: { session: { user: { id: "synthetic-luminaries-owner" } } },
              error: null
            })
          },
          rpc: async (name, args) => {
            if (name === "get_my_resident_continuation_v1") {
              return { data: { continuation: window.__LUM_ACCOUNT_REMOTE__ }, error: null };
            }
            if (name === "put_my_resident_continuation_v1") {
              window.__LUM_ACCOUNT_REMOTE__ = {
                revision: "revision-2",
                document: args.p_document
              };
              return { data: { revision: "revision-2" }, error: null };
            }
            if (name === "get_my_resident_state_v1") {
              return {
                data: { state: "account-backed-resident", card: null },
                error: null
              };
            }
            return { data: null, error: null };
          }
        };
      }, remoteDocument);
    };
    const initialAccountDocument = {
      version: 1,
      last: null,
      episodes: {},
      activities: {},
      collections: {
        luminaries: {
          value: {
            version: 1,
            saints: { id: invalidAccountFixture ? "not-a-real-saint" : "elle-woods", updated_at: "2026-09-01T12:00:00.000Z" }
          },
          updated_at: "2026-09-01T12:00:00.000Z"
        }
      }
    };
    const accountContext = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    await installAccountFixture(accountContext, initialAccountDocument);
    const accountPage = await accountContext.newPage();
    await accountPage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await accountPage.locator("#lumLocalStatus.is-account").waitFor({ timeout: 7000 });
    assert.equal((await accountPage.locator('[data-pick-output="saints"]').textContent()).trim(), "Elle Woods", "an account-backed Luminary pick must restore into the LUMINAiRY");
    await accountPage.getByRole("tab", { name: /MAiVENS/ }).click();
    const accountMaven = accountPage.locator(".lum-card").first();
    const accountMavenName = (await accountMaven.locator(".lum-card__name").textContent()).trim();
    await accountMaven.locator(".lum-card__cover").click();
    await accountPage.locator(".lum-profile__pick").click();
    await accountPage.waitForFunction(() => window.__LUM_ACCOUNT_REMOTE__?.document?.collections?.luminaries?.value?.mavens?.id);
    const accountRemote = await accountPage.evaluate(() => window.__LUM_ACCOUNT_REMOTE__.document);
    assert.equal(accountRemote.collections.luminaries.value.mavens.id, "ada-lovelace", "a signed-in pick must complete a verified account-continuation write");
    await accountContext.close();

    const restoredContext = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    await installAccountFixture(restoredContext, accountRemote);
    const restoredPage = await restoredContext.newPage();
    await restoredPage.goto(origin + "/luminairy.html", { waitUntil: "networkidle" });
    await restoredPage.locator("#lumLocalStatus.is-account").waitFor({ timeout: 7000 });
    assert.equal((await restoredPage.locator('[data-pick-output="saints"]').textContent()).trim(), "Elle Woods", "the Saint must restore in a clean signed-in browser");
    assert.equal((await restoredPage.locator('[data-pick-output="mavens"]').textContent()).trim(), accountMavenName, "the MAiVEN must restore in a clean signed-in browser");
    await restoredPage.goto(origin + "/laidies-card.html#covenSection", { waitUntil: "networkidle" });
    await restoredPage.waitForFunction(() => document.querySelector("#covenMavenPick")?.textContent.trim() === "Ada Lovelace");
    assert.equal((await restoredPage.locator("#covenSaintPick").textContent()).trim(), "Elle Woods", "the restored Saint must appear in Your Luminaries inside My Closet");
    assert.equal((await restoredPage.locator("#covenMavenPick").textContent()).trim(), "Ada Lovelace", "the restored MAiVEN must appear in Your Luminaries inside My Closet");
    await restoredContext.close();

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(origin + "/luminairy.html#trailblazers", { waitUntil: "networkidle" });
    await mobilePage.locator(".lum-card").first().waitFor();
    const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 1, `mobile horizontal overflow must be <=1px, got ${overflow}px`);
    assert.equal(await mobilePage.locator(".lum-card").count(), 7);
    assert.equal(await mobilePage.locator(".lum-tabs").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length), 1, "mobile tabs must stack");
    await mobilePage.locator(".lum-card__cover").first().click();
    assert.ok(await mobilePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth) <= 1, "390px complete profile must not overflow");
    assert.equal(await mobilePage.locator("#lumProfile").isVisible(), true, "390px complete profile must render");
    await mobileContext.close();

    const narrowContext = await browser.newContext({ viewport: { width: 320, height: 720 }, isMobile: true });
    const narrowPage = await narrowContext.newPage();
    await narrowPage.goto(origin + "/luminairy.html#trailblazers", { waitUntil: "networkidle" });
    await narrowPage.locator(".lum-card").first().waitFor();
    const narrowOverflow = await narrowPage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(narrowOverflow <= 1, `320px horizontal overflow must be <=1px, got ${narrowOverflow}px`);
    assert.equal(await narrowPage.locator(".lum-card").count(), 7, "320px view must render all Trailblazers");
    assert.deepEqual(await imageFailures(narrowPage), [], "320px view must decode all Trailblazer images");
    await narrowPage.locator(".lum-card__cover").first().click();
    assert.ok(await narrowPage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth) <= 1, "320px complete profile must not overflow");
    await narrowContext.close();

    const relevantConsoleErrors = consoleErrors.filter((message) => !/favicon|ERR_ABORTED|404/.test(message));
    assert.deepEqual(relevantConsoleErrors, [], "unexpected console errors: " + relevantConsoleErrors.join(" | "));
    console.log("LUMINAiRY browser PASS: 13/23/7 cover-only cards, complete profile routes, exact 30-profile typed destinations, honest 12-song playlist/deferred Carrie state, signed admission with/without Web Crypto, images, external links, keyboard activation/focus return, invalid-route handling, local persistence/failure, account-backed cross-device restore into My Closet, audio failure, compact-desktop overflow, and 390/320 mobile overflow");
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
