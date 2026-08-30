#!/usr/bin/env node

/*
 * Fail-first visitor regression for KSVL continuity.  It deliberately uses a
 * local static fixture and a controllable Audio implementation: no catalogue
 * request, browser profile, or real sound device is involved.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import {pathToFileURL} from "node:url";

const root = path.resolve(process.env.KSVL_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}
const {chromium} = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const registryPath = path.join(root, "content/music/ksvl-track-registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const mime = new Map([[".js", "text/javascript; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".css", "text/css; charset=utf-8"]]);
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const freshPlayingMixState = () => JSON.stringify({
  v: 1, registryId: registry.registryId, ctx: "mix", mixId: "all", trackId: registry.tracks[0].id,
  currentTime: 60, paused: false, shuffle: false, repeatMode: "all", volume: 0.8, muted: false, savedAt: Date.now()
});

const fixture = (name) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KSVL ${name}</title></head><body><main><button type="button" data-ksvl-start-live>Listen live</button><div id="ksvl-mix-cds"></div><a id="ordinary-route" href="/fixture-b">Continue browsing</a></main><script src="/content/site/ksvl-player.js"></script></body></html>`;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (url.pathname === "/ksvl-popup.html") {
    // Cloudflare's pretty-route redirect keeps the handoff token intact.
    res.writeHead(302, {location: `/ksvl-popup${url.search}`}).end();
    return;
  }
  if (["/fixture-a", "/fixture-b", "/ksvl-popup"].includes(url.pathname)) {
    res.writeHead(200, {"content-type": "text/html; charset=utf-8"}).end(fixture(url.pathname));
    return;
  }
  const resolved = path.resolve(root, url.pathname.replace(/^\/+/, ""));
  if (!resolved.startsWith(`${root}${path.sep}`)) return res.writeHead(403).end("Forbidden");
  fs.readFile(resolved, (error, data) => {
    if (error) return res.writeHead(404).end("Not found");
    res.writeHead(200, {"content-type": mime.get(path.extname(resolved)) || "application/octet-stream"}).end(data);
  });
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

function fakeAudio() {
  window.__KSVL_AUDIOS = [];
  class FakeAudio extends EventTarget {
    constructor(src = "") { super(); this.src = src; this.currentSrc = src; this.paused = true; this.ended = false; this.duration = 240; this.readyState = 1; this.volume = 0.8; this.muted = false; this._currentTime = 0; window.__KSVL_AUDIOS.push(this); }
    get currentTime() { return this._currentTime; }
    set currentTime(value) { this._currentTime = Number(value); this.dispatchEvent(new Event("timeupdate")); }
    play() { this.paused = false; queueMicrotask(() => { this.dispatchEvent(new Event("loadedmetadata")); this.dispatchEvent(new Event("playing")); }); return Promise.resolve(); }
    pause() { this.paused = true; this.dispatchEvent(new Event("pause")); }
    load() {}
  }
  window.Audio = FakeAudio;
  window.__KSVL_ENABLE_TEST_HOOKS = true;
}

const browser = await chromium.launch({executablePath: chrome, headless: true});
async function open(viewport = {width: 1200, height: 900}, storage = null, deniedStorage = null) {
  const context = await browser.newContext({viewport});
  await context.addInitScript(fakeAudio);
  if (deniedStorage) {
    await context.addInitScript((kind) => {
      const denied = kind === "local" ? localStorage : sessionStorage;
      const nativeSet = Storage.prototype.setItem;
      Object.defineProperty(Storage.prototype, "setItem", {
        configurable: true,
        value(key, value) {
          if (this === denied) throw new DOMException(`${kind}Storage write denied`, "SecurityError");
          return nativeSet.call(this, key, value);
        }
      });
    }, deniedStorage);
  }
  if (storage) await context.addInitScript((saved) => localStorage.setItem("laidies_ksvl_player_state_v1", saved), storage);
  const page = await context.newPage();
  page.setDefaultTimeout(2500);
  page.on("pageerror", (error) => failures.push(`browser exception: ${error.message}`));
  await page.goto(`${origin}/fixture-a`, {waitUntil: "domcontentloaded"});
  await page.waitForSelector(".ksvl-mix-rack");
  return {context, page};
}
async function state(page) {
  await page.waitForFunction(() => typeof window.KSVL_getPublicState === "function");
  return page.evaluate(() => window.KSVL_getPublicState());
}
async function startFirstMix(page) {
  await page.locator(".ksvl-cd-play-btn:not([disabled])").first().click();
  await page.waitForFunction(() => {
    const current = window.KSVL_getPublicState?.();
    return current?.trackId && !current.paused && current.duration > 0;
  });
}
async function nextTick() { await new Promise((resolve) => setTimeout(resolve, 80)); }
const storageWarning = "Browser storage is unavailable. Music can play here, but may not follow you to another page or keep your position.";
async function visibleStorageWarning(page) {
  return page.locator(".ksvl-np-storage-limit").evaluateAll((nodes, expected) => nodes.some((node) => !node.hidden && node.textContent === expected), storageWarning);
}

try {
  // A cold visitor must never get audio merely because a valid *playing* state exists.
  {
    const {context, page} = await open(undefined, freshPlayingMixState());
    await page.waitForSelector(".ksvl-now-playing");
    check((await state(page))?.paused === true, "cold entry resumed a saved playing state instead of restoring it paused");
    await context.close();
  }

  // Storage denial must remain visible while normal local listening keeps exactly one audio owner.
  {
    const {context, page} = await open(undefined, null, "local");
    await startFirstMix(page);
    check(await visibleStorageWarning(page), "localStorage denial did not show the persistent continuity warning");
    await page.locator('[aria-label="Pause"]').click();
    check(await visibleStorageWarning(page), "localStorage continuity warning disappeared on Pause");
    await page.locator('[aria-label="Resume"]').click();
    await nextTick();
    check(await visibleStorageWarning(page), "localStorage continuity warning disappeared on Resume");
    check(await page.evaluate(() => (window.__KSVL_AUDIOS || []).filter((audio) => !audio.paused).length === 1),
      "localStorage denial created duplicate live audio owners");
    await context.close();
  }

  // Session denial loses active same-tab continuation honestly: the following page restores paused,
  // retains its limitation notice, and does not start a second audio owner.
  {
    const {context, page} = await open(undefined, null, "session");
    await startFirstMix(page);
    await page.locator("#ordinary-route").click();
    await page.waitForURL(/\/fixture-b$/);
    await page.waitForSelector(".ksvl-now-playing");
    check(await visibleStorageWarning(page), "sessionStorage denial warning was absent after navigation");
    check((await state(page))?.paused === true, "sessionStorage denial started audio on the following page");
    check(await page.evaluate(() => (window.__KSVL_AUDIOS || []).filter((audio) => !audio.paused).length === 0),
      "sessionStorage denial created a live audio owner after navigation");
    await context.close();
  }

  // Normal mix state must survive ordinary same-tab navigation, including its active state.
  {
    const {context, page} = await open();
    await startFirstMix(page);
    await page.evaluate(() => window.KSVL_seekToRatio(0.25));
    const before = await state(page);
    await page.locator("#ordinary-route").click();
    await page.waitForURL(/\/fixture-b$/);
    await page.waitForSelector(".ksvl-now-playing");
    const after = await state(page);
    check(after?.trackId === before?.trackId && after?.currentTime >= 59 && after?.currentTime <= 61,
      `ordinary navigation did not retain the mix track and ~60-second position (before=${JSON.stringify(before)}, after=${JSON.stringify(after)})`);
    check(after?.paused === false, "ordinary navigation paused an actively playing mix");
    await context.close();
  }

  // Album contexts and visitor deck preferences use the same saved-state boundary.
  {
    const {context, page} = await open();
    const artist = await page.evaluate(() => window.KSVL_getAdmittedTracks?.()[0]?.artist);
    await page.evaluate((id) => window.KSVL_startAlbum(id), artist);
    await page.waitForFunction(() => window.KSVL_getPublicState()?.trackId && !window.KSVL_getPublicState()?.paused);
    await page.locator('[aria-label^="Shuffle"]').click();
    await page.locator('[aria-label="Repeat all"]').click();
    await page.locator('[aria-label="Volume"]').evaluate((input) => {
      input.value = "0.35";
      input.dispatchEvent(new Event("input", {bubbles: true}));
    });
    const prefsBefore = await page.evaluate(() => JSON.parse(localStorage.getItem("laidies_ksvl_player_state_v1")));
    const albumBefore = await state(page);
    await page.locator("#ordinary-route").click();
    await page.waitForURL(/\/fixture-b$/);
    await page.waitForSelector(".ksvl-now-playing");
    const prefsAfter = await page.evaluate(() => JSON.parse(localStorage.getItem("laidies_ksvl_player_state_v1")));
    const albumAfter = await state(page);
    check(albumAfter?.trackId === albumBefore?.trackId && albumAfter?.paused === false, "album playback was not retained active across ordinary navigation");
    check(prefsAfter?.ctx === "album" && prefsAfter?.shuffle === true && prefsAfter?.repeatMode === "one" && prefsAfter?.volume === 0.35,
      `album preferences were not retained (before=${JSON.stringify(prefsBefore)}, after=${JSON.stringify(prefsAfter)})`);
    await context.close();
  }

  // A deliberate Stop stays stopped after the visitor continues browsing.
  {
    const {context, page} = await open();
    await startFirstMix(page);
    await page.locator('[aria-label="Stop the music"]').click();
    await page.locator("#ordinary-route").click();
    await page.waitForURL(/\/fixture-b$/);
    await nextTick();
    check((await state(page)) === null, "Stop was resurrected by the following ordinary navigation");
    await context.close();
  }

  // A visitor-selected pause is different from a cold restore and must also survive navigation.
  {
    const {context, page} = await open();
    await startFirstMix(page);
    await page.locator('[aria-label="Pause"]').click();
    await page.locator("#ordinary-route").click();
    await page.waitForURL(/\/fixture-b$/);
    await page.waitForSelector(".ksvl-now-playing");
    check((await state(page))?.paused === true, "explicit pause was not retained across ordinary navigation");
    await context.close();
  }

  // Live and an admitted individual track are visitor listening choices too.
  {
    const {context, page} = await open();
    await page.locator("[data-ksvl-start-live]").click();
    await page.waitForFunction(() => window.KSVL_getPublicState()?.trackId && !window.KSVL_getPublicState()?.paused);
    const live = await state(page);
    await page.locator("#ordinary-route").click();
    await page.waitForURL(/\/fixture-b$/);
    await nextTick();
    const liveAfter = await state(page);
    check(liveAfter?.trackId === live?.trackId && liveAfter?.paused === false, "Live selection was not retained as active playback across navigation");
    await page.goto(`${origin}/fixture-a`, {waitUntil: "domcontentloaded"});
    await page.waitForSelector(".ksvl-mix-rack");
    const trackId = await page.evaluate(() => window.KSVL_getAdmittedTracks?.()[0]?.id);
    await page.evaluate((id) => window.KSVL_playTrackById(id), trackId);
    await page.waitForFunction(() => window.KSVL_getPublicState()?.trackId && !window.KSVL_getPublicState()?.paused);
    const single = await state(page);
    await page.locator("#ordinary-route").click();
    await page.waitForURL(/\/fixture-b$/);
    await nextTick();
    const singleAfter = await state(page);
    check(singleAfter?.trackId === single?.trackId && singleAfter?.paused === false, "admitted single-track selection was not retained as active playback across navigation");
    await context.close();
  }

  // The real public route redirects .html to pretty /ksvl-popup. It must become the sole owner,
  // and the normal bottom bar must remain a remote control rather than a second player.
  {
    const {context, page} = await open();
    await startFirstMix(page);
    const popupPromise = context.waitForEvent("page");
    await page.locator('[aria-label^="Pop out the player"]').click();
    const popup = await popupPromise;
    popup.setDefaultTimeout(2500);
    await popup.waitForURL(/\/ksvl-popup(?:\?|$)/);
    await popup.waitForSelector(".ksvl-now-playing");
    check(await popup.locator('[aria-label^="Pop out the player"]').count() === 0, "pretty /ksvl-popup was not recognised as a popup (it exposes a second Pop out control)");
    await page.goto(`${origin}/fixture-b`, {waitUntil: "domcontentloaded"});
    await page.waitForSelector(".ksvl-now-playing");
    const owners = [page, popup];
    const playingOwners = (await Promise.all(owners.map((candidate) => candidate.evaluate(() =>
      (window.__KSVL_AUDIOS || []).filter((audio) => !audio.paused).length
    )))).reduce((total, count) => total + count, 0);
    check(playingOwners === 1, `popup handoff left ${playingOwners} live FakeAudio objects (expected one owner)`);
    for (const label of ["Pause", "Next track", "Stop the music"]) {
      check(await page.locator(`[aria-label="${label}"]`).count() === 1, `main-window remote bottom bar is missing ${label}`);
    }
    if (await page.locator('[aria-label="Pause"]').count()) {
      await page.locator('[aria-label="Pause"]').click();
      await nextTick();
      check((await state(popup))?.paused === true, "main-window Pause did not control popup playback");
      await page.locator('[aria-label="Resume"]').click();
      await nextTick();
      const popupBeforeNext = await state(popup);
      await page.locator('[aria-label="Next track"]').click();
      await nextTick();
      check((await state(popup))?.trackId !== popupBeforeNext?.trackId, "main-window Next track did not control popup playback");
      await page.locator('[aria-label="Stop the music"]').click();
      await nextTick();
      const stoppedOwners = (await Promise.all(owners.map((candidate) => candidate.evaluate(() =>
        (window.__KSVL_AUDIOS || []).filter((audio) => !audio.paused).length
      )))).reduce((total, count) => total + count, 0);
      check(stoppedOwners === 0, "main-window Stop did not stop popup audio");
    }
    await context.close();
  }

  // A popup blocker must not turn a visitor's already-playing music off.
  {
    const {context, page} = await open();
    await startFirstMix(page);
    await page.evaluate(() => { window.open = () => null; });
    await page.locator('[aria-label^="Pop out the player"]').click();
    await nextTick();
    check((await state(page))?.paused === false, "blocked popup stopped the current audio instead of leaving it playing");
    await context.close();
  }

  // Closing the pop-out returns the saved point to the main window, deliberately paused.
  {
    const {context, page} = await open();
    await startFirstMix(page);
    await page.evaluate(() => window.KSVL_seekToRatio(0.25));
    const popupPromise = context.waitForEvent("page");
    await page.locator('[aria-label^="Pop out the player"]').click();
    const popup = await popupPromise;
    popup.setDefaultTimeout(2500);
    await popup.waitForURL(/\/ksvl-popup(?:\?|$)/);
    await popup.waitForSelector(".ksvl-now-playing");
    await popup.close();
    await page.reload({waitUntil: "domcontentloaded"});
    await page.waitForSelector(".ksvl-now-playing");
    const returned = await state(page);
    check(returned?.paused === true && returned?.currentTime >= 59 && returned?.currentTime <= 61,
      `popup close did not return a paused ~60-second main-window restore (${JSON.stringify(returned)})`);
    await context.close();
  }

  // Small viewports still need every deck control reachable and tappable.
  for (const width of [320, 390]) {
    const {context, page} = await open({width, height: 844});
    await startFirstMix(page);
    const controls = await page.locator('[aria-label="Pause"], [aria-label="Next track"], [aria-label="Stop the music"]').evaluateAll((nodes) => nodes.map((node) => {
      const r = node.getBoundingClientRect();
      return {label: node.getAttribute("aria-label"), visible: !!(r.width && r.height), width: r.width, height: r.height, right: r.right, viewport: innerWidth};
    }));
    for (const control of controls) check(control.visible && control.width >= 44 && control.height >= 44 && control.right <= control.viewport + 1, `${width}px bottom control ${control.label} is not fully usable`);
    await context.close();
  }

  // Saved-state validation is part of continuity: invalid bytes must be removed, not played.
  {
    const {context, page} = await open(undefined, "{definitely-not-json");
    await nextTick();
    check(await page.evaluate(() => localStorage.getItem("laidies_ksvl_player_state_v1") === null), "malformed saved KSVL state was not rejected and cleared");
    check((await state(page))?.trackId == null, "malformed saved KSVL state created playback");
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error(`KSVL continuity browser regression failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("KSVL continuity browser regression passed.");
