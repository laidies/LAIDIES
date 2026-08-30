#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const credentialsFile = process.env.RESIDENT_TEST_CREDENTIALS_FILE;
const credentials = credentialsFile
  ? JSON.parse(fs.readFileSync(credentialsFile, "utf8"))
  : {};
const switchCredentialsFile =
  process.env.RESIDENT_SWITCH_TEST_CREDENTIALS_FILE;
const switchCredentials = switchCredentialsFile
  ? JSON.parse(fs.readFileSync(switchCredentialsFile, "utf8"))
  : null;
const email = process.env.RESIDENT_TEST_A_EMAIL || credentials.email;
const password = process.env.RESIDENT_TEST_A_PASSWORD || credentials.password;
if (!email || !password) {
  throw new Error("Resident test credentials are required.");
}

const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) throw new Error("PLAYWRIGHT_CORE_PATH is required.");
const { chromium } = await import(
  pathToFileURL(path.join(playwrightRoot, "index.mjs"))
);
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"]
]);

const requestedOrigin = process.env.RESIDENT_TEST_ORIGIN?.trim();
let origin = "";
if (requestedOrigin) {
  const url = new URL(requestedOrigin);
  assert.ok(
    url.protocol === "https:" || url.protocol === "http:",
    "RESIDENT_TEST_ORIGIN must use http or https"
  );
  assert.equal(
    url.pathname, "/",
    "RESIDENT_TEST_ORIGIN must be an origin, not a page path"
  );
  assert.equal(url.search, "", "RESIDENT_TEST_ORIGIN cannot include a query");
  assert.equal(url.hash, "", "RESIDENT_TEST_ORIGIN cannot include a hash");
  assert.equal(url.username, "", "RESIDENT_TEST_ORIGIN cannot include credentials");
  assert.equal(url.password, "", "RESIDENT_TEST_ORIGIN cannot include credentials");
  origin = url.origin;
}

const server = origin ? null : http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/"
    ? "resident-card.html"
    : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) ||
      !fs.existsSync(resolved) ||
      fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(resolved)) ||
      "application/octet-stream"
  });
  fs.createReadStream(resolved).pipe(response);
});

if (server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
}
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const card = {
  version: 1,
  fields: {
    displayName: "Resident browser journey",
    cardBg: "mint",
    cardAvatarUrl: "/assets/brand/laidies-logo-square-pearl-512-v1.png"
  }
};
// These are disposable test-account bytes. Keep the fixture newer than any
// preparatory RPC state written earlier in the same verification run.
const continuationTimestamp = new Date(Date.now() + 24 * 60 * 60 * 1000)
  .toISOString();
const continuation = {
  version: 1,
  last: {
    path: "/watch.html?ep=02",
    label: "Episode 02",
    kind: "episode",
    updated_at: continuationTimestamp
  },
  episodes: {
    "02": {
      value: { position_seconds: 123.4, completed: false },
      updated_at: continuationTimestamp
    }
  },
  activities: {},
  collections: {}
};
const tourFixture = ["newsstand", "chick-flicks"];
const charmFixture = ["w1-butterfly-clip"];
const puffyFixture = [{
  schema_version: 2,
  id: "resident-browser-puffy",
  book_id: "concepts-101",
  section_id: "",
  content_version: "concepts-101-2026-08-03.1",
  title: "Concepts 101",
  summary: "Saved book · SUNNYVAiLE LIBRAiRY",
  url: "/library.html#concepts-101",
  sticker: "usable-25/01-heart-sunglasses.png",
  purpose: "",
  placedAt: new Date().toISOString()
}];

async function signIn(page) {
  return page.evaluate(async ({ accountEmail, accountPassword }) => {
    const runtime = await window.LAIDIESResidentAccountRuntime.get();
    const result = await runtime.client.auth.signInWithPassword({
      email: accountEmail,
      password: accountPassword
    });
    if (result.error) throw result.error;
    return result.data.user.id;
  }, { accountEmail: email, accountPassword: password });
}

try {
  const first = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await first.addInitScript(({ envelope, continuationDocument, tour, charms, puffies }) => {
    const fixtureKey = "laidies_resident_browser_test_fixture_v1";
    if (sessionStorage.getItem(fixtureKey) === "seeded") return;
    localStorage.setItem("laidies_resident_card_v1", JSON.stringify(envelope));
    localStorage.setItem(
      "laidies_continuation_v1",
      JSON.stringify(continuationDocument)
    );
    localStorage.setItem("laidies_screening_progress_v1", JSON.stringify({
      version: 1,
      programme: "02",
      time: 123.4,
      completed: false,
      savedAt: continuationDocument.last.updated_at
    }));
    localStorage.setItem("laidies_tour_2026-W35", JSON.stringify(tour));
    localStorage.setItem("laidies_charms_found", JSON.stringify(charms));
    localStorage.setItem("laidies_puffies_board", JSON.stringify(puffies));
    localStorage.setItem("laidies_maven", "ada-lovelace");
    localStorage.setItem("laidies_builder", "mira-murati");
    localStorage.setItem("laidies_town_regular", "dj-sunnyv");
    localStorage.setItem("laidies_building_visits", JSON.stringify({library:{n:3,first:1700000000000,last:1700001000000}}));
    localStorage.setItem("laidiesQuizProgress", JSON.stringify({ep01:{bestScore:4,latestScore:4,attempts:2,completedAt:new Date().toISOString()}}));
    localStorage.setItem("laidiesQuizBestScores", JSON.stringify({ep01:4}));
    sessionStorage.setItem(fixtureKey, "seeded");
  }, {
    envelope: card,
    continuationDocument: continuation,
    tour: tourFixture,
    charms: charmFixture,
    puffies: puffyFixture
  });
  const firstPage = await first.newPage();
  await firstPage.goto(`${origin}/resident-card.html`, {
    waitUntil: "domcontentloaded"
  });
  const userId = await signIn(firstPage);
  // Repeated runs may reuse only this task's disposable account. Start its
  // continuation afresh so generated fixture timestamps cannot accumulate.
  if (/^memory-a-\d+@example\.com$/.test(email)) {
    await firstPage.evaluate(async (document) => {
      const runtime = await window.LAIDIESResidentAccountRuntime.get();
      const remote = await runtime.client.rpc("get_my_resident_continuation_v1");
      if (remote.error) throw remote.error;
      const put = await runtime.client.rpc("put_my_resident_continuation_v1", {
        p_document:document,p_idempotency_key:crypto.randomUUID(),
        p_expected_revision:remote.data.continuation?.revision || null
      });
      if (put.error) throw put.error;
    }, continuation);
  }
  await firstPage.reload({ waitUntil: "domcontentloaded" });
  await firstPage.locator("#rcAccountClaimButton:visible, #rcAccountRestoreButton:visible").first().waitFor({ state: "visible" });
  const claimButton = firstPage.locator("#rcAccountClaimButton");
  const claimedDuringTest = await claimButton.isVisible();
  if (claimedDuringTest) {
    await claimButton.click();
    await firstPage.waitForFunction(() =>
      !document.getElementById("rcAccountStatus").textContent
        .includes("Keeping this Card")
    );
  } else {
    await firstPage.locator("#rcAccountRestoreButton").waitFor({
      state: "visible"
    });
    await firstPage.locator("#rcAccountRestoreButton").click();
    await firstPage.waitForFunction(() =>
      document.getElementById("rcAccountStatus").textContent.startsWith("Restored.")
    );
  }
  console.log("STEP first-browser-status", await firstPage.locator("#rcAccountStatus").innerText());
  assert.match(
    await firstPage.locator("#rcAccountStatus").innerText(),
    /account-backed Card/
  );
  await firstPage.locator("#rcAccountContinue").waitFor({ state: "visible" });
  assert.equal(
    await firstPage.locator("#rcAccountContinue").getAttribute("href"),
    "/watch.html?ep=02"
  );

  const second = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const secondPage = await second.newPage();
  secondPage.setDefaultTimeout(20000);
  console.log("STEP second-browser-open");
  await secondPage.goto(`${origin}/resident-card.html`, {
    waitUntil: "domcontentloaded"
  });
  assert.equal(await signIn(secondPage), userId);
  console.log("STEP second-browser-signed-in");
  await secondPage.reload({ waitUntil: "domcontentloaded" });
  await secondPage.locator("#rcAccountContinue").waitFor({ state: "visible" });
  console.log("STEP second-browser-continuation-ready");
  assert.equal(
    await secondPage.locator("#rcAccountContinue").getAttribute("href"),
    "/watch.html?ep=02"
  );
  const restoredContinuation = await secondPage.evaluate(() => ({
    document: JSON.parse(localStorage.getItem("laidies_continuation_v1")),
    episode: JSON.parse(localStorage.getItem("laidies_screening_progress_v1"))
  }));
  assert.equal(restoredContinuation.document.last.path, "/watch.html?ep=02");
  assert.equal(restoredContinuation.episode.programme, "02");
  assert.equal(restoredContinuation.episode.time, 123.4);
  const restoredSupportedState = await secondPage.evaluate(() => ({
    tour: JSON.parse(localStorage.getItem("laidies_tour_2026-W35")),
    charms: JSON.parse(localStorage.getItem("laidies_charms_found")),
    puffies: JSON.parse(localStorage.getItem("laidies_puffies_board"))
  }));
  assert.deepEqual(restoredSupportedState.tour, tourFixture);
  assert.deepEqual(restoredSupportedState.charms, charmFixture);
  assert.deepEqual(restoredSupportedState.puffies, puffyFixture);
  await secondPage.locator("#rcAccountRestoreButton").waitFor({
    state: "visible"
  });
  await secondPage.locator("#rcAccountRestoreButton").click();
  await secondPage.waitForFunction(() =>
    document.getElementById("rcAccountStatus").textContent.startsWith("Restored.")
  );
  const restored = await secondPage.evaluate(() =>
    JSON.parse(localStorage.getItem("laidies_resident_card_v1"))
  );
  assert.deepEqual(restored, card);

  await secondPage.goto(`${origin}/laidies-card.html`, {
    waitUntil: "domcontentloaded"
  });
  await secondPage.waitForFunction(() =>
    document.getElementById("closetPersistenceState").textContent
      .includes("Account-backed view")
  );
  assert.match(
    await secondPage.locator("#closetPersistenceState").innerText(),
    /restored the verified private Card/
  );
  assert.equal(await secondPage.locator("#cardName").innerText(), card.fields.displayName);
  await secondPage.waitForFunction(() => document.getElementById("covenMavenPick").textContent.includes("Ada"));
  assert.match(await secondPage.locator("#covenBuilderPick").innerText(), /Mira/i);
  assert.match(await secondPage.locator("#covenTownPick").innerText(), /Sunny/i);
  assert.match(await secondPage.locator("#clipJarLedger").innerText(), /Best quiz score: 4/);
  assert.equal(await secondPage.evaluate(() => JSON.parse(localStorage.getItem("laidies_building_visits")).library.n), 3);
  console.log("STEP new-memory-restore PASS favourites=3 quiz=1 visits=1 visible-closet=1");

  // A new choice on the phone must beat the unchanged stale desktop copy.
  await secondPage.evaluate(async () => {
    localStorage.setItem("laidies_maven", "grace-hopper");
    const runtime = await window.LAIDIESResidentAccountRuntime.get();
    await window.LAIDIESResidentContinuationV1.syncWith(runtime);
  });
  await firstPage.evaluate(async () => {
    await window.LAIDIESResidentContinuationV1.syncWith(await window.LAIDIESResidentAccountRuntime.get());
  });
  assert.equal(await firstPage.evaluate(() => localStorage.getItem("laidies_maven")), "grace-hopper");
  // Deletion is a saved choice, not permission to resurrect an older pick.
  await secondPage.evaluate(async () => {
    localStorage.removeItem("laidies_maven");
    await window.LAIDIESResidentContinuationV1.syncWith(await window.LAIDIESResidentAccountRuntime.get());
  });
  await firstPage.evaluate(async () => {
    await window.LAIDIESResidentContinuationV1.syncWith(await window.LAIDIESResidentAccountRuntime.get());
  });
  assert.equal(await firstPage.evaluate(() => localStorage.getItem("laidies_maven")), null);
  assert.match(await secondPage.locator("#covenMavenPick").innerText(), /pick one/i);
  console.log("STEP newer-choice-and-clear PASS stale-desktop=1 same-tab-refresh=1");
  assert.equal(
    await secondPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    true
  );

  await secondPage.goto(`${origin}/resident-card.html`, {
    waitUntil: "domcontentloaded"
  });
  await secondPage.locator("#rcAccountSignOut").waitFor({ state: "visible" });
  await secondPage.locator("#rcAccountSignOut").click();
  await secondPage.locator("#rcAccountSignedOut").waitFor({ state: "visible" });
  assert.equal(await secondPage.locator("#rcAccountSignedIn").isHidden(), true);
  assert.equal(await secondPage.locator("#rcAccountEmail").isVisible(), true);
  await secondPage.reload({ waitUntil: "domcontentloaded" });
  await secondPage.locator("#rcAccountSignedOut").waitFor({ state: "visible" });
  assert.equal(await secondPage.locator("#rcAccountSignedIn").isHidden(), true);
  assert.equal(await secondPage.locator("#rcAccountEmail").isVisible(), true);
  const signOutShowsForm = true;

  let accountSwitchIsolation = null;
  if (switchCredentials) {
    await secondPage.evaluate(async ({ accountEmail, accountPassword }) => {
      const runtime = await window.LAIDIESResidentAccountRuntime.get();
      const result = await runtime.client.auth.signInWithPassword({
        email: accountEmail,
        password: accountPassword
      });
      if (result.error) throw result.error;
      const existing = await runtime.client.rpc("get_my_resident_continuation_v1");
      if (existing.error) throw existing.error;
      const isolated = window.LAIDIESResidentContinuationV1.emptyDocument();
      isolated.last = {path:"/library.html",label:"Library",kind:"page",updated_at:new Date().toISOString()};
      const put = await runtime.client.rpc("put_my_resident_continuation_v1", {
        p_document:isolated,p_idempotency_key:crypto.randomUUID(),
        p_expected_revision:existing.data.continuation?.revision || null
      });
      if (put.error) throw put.error;
    }, {
      accountEmail: switchCredentials.email,
      accountPassword: switchCredentials.password
    });
    await secondPage.reload({ waitUntil: "domcontentloaded" });
    await secondPage.locator("#rcAccountContinue").waitFor({
      state: "visible"
    });
    assert.equal(
      await secondPage.locator("#rcAccountContinue").getAttribute("href"),
      "/library.html"
    );
    accountSwitchIsolation = await secondPage.evaluate(() => ({
      ownerBound: !!localStorage.getItem("laidies_continuation_owner_v1"),
      episodeProgress:
        localStorage.getItem("laidies_screening_progress_v1"),
      lastPath: JSON.parse(
        localStorage.getItem("laidies_continuation_v1")
      ).last.path,
      tour: localStorage.getItem("laidies_tour_2026-W35"),
      charms: localStorage.getItem("laidies_charms_found"),
      puffies: localStorage.getItem("laidies_puffies_board"),
      memory: ["laidies_maven","laidies_builder","laidies_town_regular","laidies_building_visits","laidiesQuizProgress","laidiesQuizBestScores"].map(key=>localStorage.getItem(key))
    }));
    assert.equal(accountSwitchIsolation.episodeProgress, null);
    assert.equal(accountSwitchIsolation.lastPath, "/library.html");
    assert.equal(accountSwitchIsolation.tour, null);
    assert.equal(accountSwitchIsolation.charms, null);
    assert.equal(accountSwitchIsolation.puffies, null);
    assert.deepEqual(accountSwitchIsolation.memory, [null,null,null,null,null,null]);
  }

  console.log(JSON.stringify({
    result: "PASS",
    firstBrowserClaim: claimedDuringTest ? "claimed" : "restored-existing",
    secondBrowserRestore: true,
    crossBrowserContinuation: true,
    closetMemoryRestored: true,
    newerChoiceAndClear: true,
    restoredEpisodePositionSeconds: restoredContinuation.episode.time,
    restoredTourStops: restoredSupportedState.tour,
    restoredCharmCount: restoredSupportedState.charms.length,
    restoredPuffyCount: restoredSupportedState.puffies.length,
    signOutShowsEmailForm: signOutShowsForm,
    accountSwitchIsolation: accountSwitchIsolation
      ? accountSwitchIsolation.ownerBound &&
        accountSwitchIsolation.episodeProgress === null &&
        accountSwitchIsolation.lastPath === "/library.html" &&
        accountSwitchIsolation.tour === null &&
        accountSwitchIsolation.charms === null &&
        accountSwitchIsolation.puffies === null
      : "not-run",
    closetAccountBacked: true,
    mobileClosetNoHorizontalOverflow: true
  }, null, 2));

  await first.close();
  await second.close();
} finally {
  await browser.close();
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
}
