#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.KSVL_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const registry = JSON.parse(fs.readFileSync(path.join(root, "content/music/ksvl-track-registry.json"), "utf8"));
const admitted = structuredClone(registry);
const held = structuredClone(registry);
held.tracks.forEach((track) => {
  track.status = "HOLD";
  track.sourceStatus = "QUALITY_REJECTED";
  track.publicNote = "Held test fixture; no public listening promise.";
});

const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><main><div id="ksvl-mix-cds"></div></main><script src="/content/site/ksvl-player.js"></script></body></html>`;
const mime = new Map([[".html","text/html; charset=utf-8"],[".js","text/javascript; charset=utf-8"],[".json","application/json; charset=utf-8"],[".css","text/css; charset=utf-8"]]);
const fixtures = new Map();
let fixtureSequence = 0;
function registerFixture(fixture) {
  const id = `fixture-${++fixtureSequence}`;
  fixtures.set(id, fixture);
  return id;
}
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  if (url.pathname === "/ksvl-test.html") {
    response.writeHead(200, {"content-type":"text/html; charset=utf-8"}).end(html);
    return;
  }
  if (url.pathname === "/content/music/ksvl-track-registry.json") {
    const fixture = fixtures.get(request.headers["x-ksvl-test-fixture"]);
    if (fixture) {
      response.writeHead(200, {"content-type":"application/json; charset=utf-8"}).end(JSON.stringify(fixture));
      return;
    }
  }
  const resolved = path.resolve(root, url.pathname.replace(/^\/+/, ""));
  if (!resolved.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  fs.readFile(resolved, (error, data) => {
    if (error) response.writeHead(404).end("Not found");
    else {
      if (process.env.KSVL_TOUCH_CALIBRATION === "small" && url.pathname === "/content/site/ksvl-player.js") {
        data = Buffer.from(data.toString("utf8").replace(
          "min-width: 44px; min-height: 44px;",
          "min-width: 31px; min-height: 31px;"
        ));
      }
      response.writeHead(200, {"content-type":mime.get(path.extname(resolved)) || "application/octet-stream"}).end(data);
    }
  });
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({executablePath: chrome, headless: true});
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const playbackPromise = /\b(?:play(?:s|ing)?|now listening|on[\s-]?air|broadcast(?:ing)?|weekly jams?|live broadcast)\b|(?:tracks?|songs?|mix(?:es)?|albums?|catalogue|station|audio)\s+(?:is|are|now)?\s*available|available\s+(?:tracks?|songs?|mix(?:es)?|albums?|catalogue|station|audio)\b/i;
const heldContext = /\b(?:unavailable|held|hold|soundcheck|pending|not publicly|not playing|no audio|no tracks?|none can|cannot|can't|won't|does not|do not|never|until .*admitted|without .*admission|review|required|disabled)\b/i;

async function assertZeroAdmissionPromiseSurfaces(page, label) {
  const surfaces = await page.evaluate(() => {
    const visible = (element) => {
      if (element.hidden) return false;
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") return false;
      return element.getClientRects().length > 0;
    };
    const output = [];
    const add = (kind, value) => {
      const normalized = String(value || "").replace(/\s+/g, " ").trim();
      if (normalized) output.push({kind, value: normalized});
    };
    add("title", document.title);
    document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]')
      .forEach((node) => add("metadata", node.content));
    document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
      try {
        const walk = (value) => {
          if (typeof value === "string") add("structured metadata", value);
          else if (Array.isArray(value)) value.forEach(walk);
          else if (value && typeof value === "object") Object.values(value).forEach(walk);
        };
        walk(JSON.parse(node.textContent));
      } catch {
        add("structured metadata", "INVALID STRUCTURED METADATA");
      }
    });
    document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,li,label,summary,figcaption")
      .forEach((node) => { if (visible(node)) add("visible copy", node.innerText); });
    document.querySelectorAll("a,button,input,select,textarea,[role=button],[role=link]")
      .forEach((node) => {
        if (!visible(node)) return;
        const player = node.closest(".ksvl-now-playing");
        const playerHeld = !!player &&
          /\b(?:held|hold|unavailable|rights and provenance)\b/i.test(
            player.querySelector(".ksvl-np-status")?.textContent || ""
          );
        const held = node.disabled || node.getAttribute("aria-disabled") === "true" || playerHeld;
        const prefix = held ? "disabled control: " : "";
        add("CTA accessibility label", prefix + (node.getAttribute("aria-label") || ""));
        add("CTA title", prefix + (node.getAttribute("title") || ""));
        add("CTA visible name", prefix + (node.innerText || node.value || ""));
      });
    return output;
  });
  for (const surface of surfaces) {
    check(
      !playbackPromise.test(surface.value) || heldContext.test(surface.value),
      `${label} ${surface.kind} makes a zero-admission playback promise: ${surface.value}`
    );
  }
}

const audioProxy = () => {
  window.__KSVL_AUDIO_MODE = "ok";
  window.__KSVL_AUDIOS = [];
  class FakeAudio extends EventTarget {
    constructor(src = "") {
      super();
      this.src = src;
      this.currentSrc = src;
      this.preload = "";
      this.paused = true;
      this.ended = false;
      this.duration = 120;
      this._currentTime = 0;
      this.volume = 0.8;
      this.muted = false;
      this.readyState = 1;
      this.pauseCount = 0;
      window.__KSVL_AUDIOS.push(this);
    }
    get currentTime() { return this._currentTime; }
    set currentTime(value) {
      if (window.__KSVL_AUDIO_MODE === "seek-error") throw new Error("seek failed");
      this._currentTime = Number(value);
      this.dispatchEvent(new Event("timeupdate"));
      this.dispatchEvent(new Event("seeked"));
    }
    play() {
      if (window.__KSVL_AUDIO_MODE === "denied") {
        return Promise.reject(new DOMException("blocked", "NotAllowedError"));
      }
      if (window.__KSVL_AUDIO_MODE === "unsupported") {
        return Promise.reject(new DOMException("unsupported", "NotSupportedError"));
      }
      if (window.__KSVL_AUDIO_MODE === "media-error") {
        queueMicrotask(() => this.dispatchEvent(new Event("error")));
        return Promise.resolve();
      }
      this.paused = false;
      queueMicrotask(() => {
        this.dispatchEvent(new Event("loadedmetadata"));
        this.dispatchEvent(new Event("playing"));
      });
      return Promise.resolve();
    }
    pause() {
      this.pauseCount++;
      this.paused = true;
      this.dispatchEvent(new Event("pause"));
    }
    load() {}
  }
  window.Audio = FakeAudio;
};

async function open(fixture, viewport = {width:1280,height:900}, registryOverride = null, savedState = null) {
  const fixtureId = registerFixture(fixture);
  const context = await browser.newContext({
    viewport,
    extraHTTPHeaders: {"x-ksvl-test-fixture": fixtureId}
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`browser exception: ${error.message}`));
  await page.addInitScript(audioProxy);
  if (registryOverride) {
    await page.addInitScript((value) => { window.__KSVL_TEST_REGISTRY = value; }, registryOverride);
  }
  if (savedState) {
    await page.addInitScript((value) => {
      localStorage.setItem("laidies_ksvl_player_state_v1", JSON.stringify(value));
    }, savedState);
  }
  await page.goto(`${origin}/ksvl-test.html`, {waitUntil:"domcontentloaded"});
  await page.waitForSelector(".ksvl-mix-rack");
  return {context, page};
}

async function openRealAudio(fixture) {
  const fixtureId = registerFixture(fixture);
  const context = await browser.newContext({
    viewport:{width:1280,height:900},
    extraHTTPHeaders: {"x-ksvl-test-fixture": fixtureId}
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`real-audio browser exception: ${error.message}`));
  await page.addInitScript(() => {
    window.__KSVL_ENABLE_TEST_HOOKS = true;
  });
  await page.goto(`${origin}/ksvl-test.html`, {waitUntil:"domcontentloaded"});
  await page.waitForSelector(".ksvl-cd-play-btn:not([disabled])");
  return {context, page};
}

async function openPagePath(fixture, pathname) {
  const fixtureId = registerFixture(fixture);
  const context = await browser.newContext({
    viewport:{width:1280,height:900},
    extraHTTPHeaders: {"x-ksvl-test-fixture": fixtureId}
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`page journey browser exception: ${error.message}`));
  await page.addInitScript(audioProxy);
  await page.goto(`${origin}${pathname}`, {waitUntil:"domcontentloaded"});
  return {context, page};
}

async function submitRequestWithServiceResult(serviceResult) {
  const fixtureId = registerFixture(registry);
  const context = await browser.newContext({
    viewport:{width:1280,height:900},
    extraHTTPHeaders: {"x-ksvl-test-fixture": fixtureId}
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`request browser exception: ${error.message}`));
  await page.route("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm", async (route) => {
    await route.fulfill({
      contentType:"text/javascript",
      body:"export function createClient(){ return window.__KSVL_REQUEST_CLIENT; }"
    });
  });
  await page.addInitScript((result) => {
    window.__KSVL_REQUEST_CLIENT = {
      auth:{getSession:async () => ({data:{session:{user:{id:"test-user"}}}})},
      from:() => ({
        insert:() => ({
          select:() => ({
            single:async () => result
          })
        })
      })
    };
  }, serviceResult);
  await page.goto(`${origin}/radio.html`, {waitUntil:"domcontentloaded"});
  await page.evaluate(() => {
    document.querySelector("#ksvl-req-style").value = "y2k-pop-anthem";
    document.querySelector("#ksvl-req-topic").value = "A bounded request test";
    document.querySelector("#ksvl-request-form").requestSubmit();
  });
  await page.waitForFunction(() => document.querySelector("#ksvl-req-status")?.textContent.trim());
  return {context, status:await page.locator("#ksvl-req-status").innerText()};
}

try {
  {
    const {context, page} = await open(held);
    check(await page.locator(".ksvl-cd-play-btn:not([disabled])").count() === 0, "held registry exposed a playable mix");
    const heldStatus = await page.locator(".ksvl-np-status").count()
      ? await page.locator(".ksvl-np-status").innerText()
      : "";
    check(heldStatus.includes("cannot start a track right now"), "held registry did not explain the gate");
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)), "held desktop overflow");
    await context.close();
  }
  {
    const {context, page} = await openPagePath(held, "/radio.html");
    await assertZeroAdmissionPromiseSurfaces(page, "radio default");
    for (const panel of ["hub-mixcds", "hub-bands"]) {
      await page.locator(`[data-panel="${panel}"]`).click();
      await assertZeroAdmissionPromiseSurfaces(page, `radio ${panel}`);
    }
    await context.close();
  }
  {
    const {context, page} = await openPagePath(held, "/games/dj-booth.html");
    await assertZeroAdmissionPromiseSurfaces(page, "DJ Booth");
    await page.locator(".dj-track-card").first().evaluate((card) => card.click());
    await page.waitForTimeout(30);
    check(await page.evaluate(() => window.__KSVL_AUDIOS.length === 0),
      "held DJ Booth created a competing or unadmitted audio owner");
    await context.close();
  }
  {
    const {context, page} = await openPagePath(admitted, "/games/dj-booth.html");
    await page.waitForSelector('.dj-track-card[aria-disabled="false"]');
    await page.locator(".dj-track-card").first().click();
    await page.waitForTimeout(30);
    const firstBoothState = await page.evaluate(() => window.KSVL_getPublicState?.());
    check(firstBoothState?.trackId === "ep-01" && firstBoothState?.paused === false,
      "DJ Booth did not hand the selected admitted track to canonical KSVL");
    check(await page.evaluate(() => window.__KSVL_AUDIOS.filter((audio) => !audio.paused).length === 1),
      "DJ Booth selection did not preserve one-audio ownership");
    await page.evaluate(() => { window.__KSVL_AUDIO_MODE = "media-error"; });
    await page.locator(".dj-track-card").nth(1).click();
    await page.waitForTimeout(30);
    check((await page.locator(".ksvl-np-status").innerText()).includes("could not load"),
      "DJ Booth did not expose canonical KSVL media failure");
    check(await page.evaluate(() => window.__KSVL_AUDIOS.filter((audio) => !audio.paused).length <= 1),
      "DJ Booth retry/failure path left competing audio owners");
    await context.close();
  }
  {
    const {context, page} = await open(held, {width:1280,height:900}, admitted);
    check(await page.locator(".ksvl-cd-play-btn:not([disabled])").count() === 0,
      "production window registry override changed admission");
    await context.close();
  }
  for (const [name, mutate] of [
    ["impossible freshThrough", (value) => { value.freshThrough = "9999-99-99"; }],
    ["malformed updatedAt", (value) => { value.updatedAt = "not-a-date"; }],
    ["future updatedAt", (value) => { value.updatedAt = new Date(Date.now() + 86400000).toISOString().slice(0, 10); }],
    ["stale freshThrough", (value) => { value.freshThrough = new Date(Date.now() - (2 * 86400000)).toISOString().slice(0, 10); }],
    ["missing exact master", (value) => { value.tracks[0].sourceStatus = "EXACT_MASTER_REVIEW_REQUIRED"; }],
    ["source mismatch", (value) => { value.tracks[0].src = "/content/music/not-the-runtime-source.mp3"; }],
    ["wrong registry id", (value) => { value.registryId = "ksvl-public-tracks-wrong"; }],
    ["wrong public rule", (value) => { value.publicRule = "Files are playable."; }]
  ]) {
    const hostile = structuredClone(admitted);
    mutate(hostile);
    const {context, page} = await open(hostile);
    check(await page.getByRole("button", {name:"Listen to Welcome to SUNNYVAiLE"}).count() === 0,
      `${name} fixture did not fail closed`);
    await context.close();
  }
  {
    const {context, page} = await open(admitted);
    const availablePlayButtons = page.locator(".ksvl-cd-play-btn:not([disabled])");
    if (await availablePlayButtons.count() === 0) {
      const rejected = `admitted fixture was rejected: ${await page.locator(".ksvl-np-status").innerText()}`;
      failures.push(rejected);
      console.error(rejected);
      await context.close();
      throw new Error("KSVL admitted fixture rejected");
    }
    await page.evaluate(() => { window.__KSVL_AUDIO_MODE = "denied"; });
    await availablePlayButtons.first().click();
    await page.waitForTimeout(30);
    check((await page.locator(".ksvl-np-status").innerText()).includes("blocked playback"), "autoplay denial not visible");
    check(await page.evaluate(() => document.activeElement?.classList.contains("ksvl-np-retry")), "failure did not focus retry");
    await page.evaluate(() => { window.__KSVL_AUDIO_MODE = "ok"; });
    await page.locator(".ksvl-np-retry").click();
    await page.waitForTimeout(30);
    check((await page.locator(".ksvl-np-status").innerText()).startsWith("Now listening to"), "retry did not reach listening state");

    await page.locator(".ksvl-np-btn--play").click();
    check((await page.locator(".ksvl-np-status").innerText()).includes("paused"), "pause state not announced");
    await page.locator(".ksvl-np-btn--play").click();
    await page.waitForTimeout(20);

    await page.locator(".ksvl-np-volume").evaluate((node) => { node.value = "0.35"; node.dispatchEvent(new Event("input", {bubbles:true})); });
    check(await page.evaluate(() => window.__KSVL_AUDIOS.some((audio) => !audio.paused && audio.volume === 0.35)), "volume did not reach audio");
    await page.getByRole("button", {name:"Mute"}).click();
    check(await page.getByRole("button", {name:"Unmute"}).count() === 1, "mute state did not update");

    await page.locator(".ksvl-np-seek").evaluate((node) => { node.value = "500"; node.dispatchEvent(new Event("change", {bubbles:true})); });
    check(await page.evaluate(() => window.__KSVL_AUDIOS.some((audio) => audio.currentTime === 60)), "seek did not set current time");
    await page.evaluate(() => { window.__KSVL_AUDIO_MODE = "seek-error"; });
    await page.locator(".ksvl-np-seek").evaluate((node) => { node.value = "750"; node.dispatchEvent(new Event("change", {bubbles:true})); });
    check((await page.locator(".ksvl-np-status").innerText()).includes("could not seek"), "seek failure not visible");
    await page.evaluate(() => { window.__KSVL_AUDIO_MODE = "ok"; });

    await page.getByRole("button", {name:"Repeat all"}).click();
    check(await page.getByRole("button", {name:"Repeat one"}).count() === 1, "repeat state did not cycle");
    await page.evaluate(() => window.__KSVL_AUDIOS.findLast((audio) => !audio.paused)?.dispatchEvent(new Event("ended")));
    await page.waitForTimeout(20);
    check(await page.locator(".ksvl-now-playing.is-visible").count() === 1, "repeat/end removed player");

    await page.evaluate(() => window.__KSVL_AUDIOS.findLast((audio) => !audio.paused)?.dispatchEvent(new Event("waiting")));
    check((await page.locator(".ksvl-np-status").innerText()).includes("waiting"), "waiting state missing");
    await page.evaluate(() => window.__KSVL_AUDIOS.findLast((audio) => !audio.paused)?.dispatchEvent(new Event("stalled")));
    check((await page.locator(".ksvl-np-status").innerText()).includes("network stopped"), "stalled state missing");

    await page.evaluate(() => {
      window.__KSVL_AUDIO_MODE = "media-error";
      window.KSVL_playTrack("/content/music/sunnyvaile-town-anthem.mp3", "Welcome to SUNNYVAiLE", "THE LAiDIES");
    });
    await page.waitForTimeout(30);
    check((await page.locator(".ksvl-np-status").innerText()).includes("could not load"), "media error did not fail visibly");
    check(await page.evaluate(() => window.__KSVL_AUDIOS.some((audio) => audio.pauseCount > 0)), "single-audio coordination did not pause prior owner");

    await context.close();

    const restored = await open(admitted, {width:1280,height:900}, null, {
      v:1, registryId:admitted.registryId, ctx:"mix", mixId:"all",
      trackId:"town-anthem", currentTime:22, paused:false, shuffle:false,
      repeatMode:"all", volume:0.8, muted:false, savedAt:Date.now()
    });
    check((await restored.page.locator(".ksvl-np-status").innerText()).includes("will not start automatically"), "return state attempted surprise playback");
    check(await restored.page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches === false), "unexpected default reduced motion");
    await restored.context.close();
  }
  for (const badState of [
    {
      v:1, registryId:admitted.registryId, ctx:"mix", mixId:"all",
      trackId:"town-anthem", currentTime:22, paused:true, shuffle:false,
      repeatMode:"all", volume:0.8, muted:false, savedAt:Date.now() + 60_000
    },
    {
      v:1, registryId:"wrong-revision", ctx:"mix", mixId:"all",
      trackId:"town-anthem", currentTime:22, paused:true, shuffle:false,
      repeatMode:"all", volume:0.8, muted:false, savedAt:Date.now()
    },
    {
      v:1, registryId:admitted.registryId, ctx:"mix", mixId:"all",
      trackId:"not-admitted", currentTime:22, paused:true, shuffle:false,
      repeatMode:"all", volume:0.8, muted:false, savedAt:Date.now()
    },
    {
      v:1, registryId:admitted.registryId, ctx:"mix", mixId:"all",
      trackId:"town-anthem", currentTime:22, paused:true, shuffle:false,
      repeatMode:"all", volume:0.8, muted:false, savedAt:Date.now(), unknown:true
    }
  ]) {
    const {context, page} = await open(admitted, {width:1280,height:900}, null, badState);
    check(await page.evaluate(() => localStorage.getItem("laidies_ksvl_player_state_v1") === null),
      "invalid or future saved state was not removed");
    await context.close();
  }
  for (const width of [320, 390]) {
    const {context, page} = await open(registry, {width,height:860});
    await page.locator(".ksvl-cd-play-btn:not([disabled])").first().click();
    const compactTargets = await page.locator(".ksvl-now-playing.is-visible .ksvl-np-btn:visible").evaluateAll((buttons) =>
      buttons.map((button) => {
        const rect = button.getBoundingClientRect();
        return {label:button.getAttribute("aria-label"), width:rect.width, height:rect.height};
      })
    );
    check(compactTargets.length >= 5 && compactTargets.every((target) => target.width >= 44 && target.height >= 44),
      `${width}px player control below 44px: ${JSON.stringify(compactTargets)}`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)), `${width}px overflow`);
    await context.close();
  }
  {
    const {context, page} = await openPagePath(held, "/index.html");
    await page.locator('a.spot[href="/radio.html"]').evaluate((link) => link.click());
    await page.waitForURL(/\/radio\.html$/);
    check(new URL(page.url()).pathname === "/radio.html", "held homepage KSVL link did not navigate");
    await context.close();
  }
  {
    const missing = await submitRequestWithServiceResult({data:{}, error:null});
    check(missing.status.includes("did not return a request receipt") &&
      missing.status.includes("Nothing is being described as delivered"),
      "missing request receipt was described as received");
    await missing.context.close();
    const received = await submitRequestWithServiceResult({data:{id:"R-123"}, error:null});
    check(received.status.includes("Received for station review · receipt R-123"),
      "validated request receipt was not shown");
    await received.context.close();
  }
  if (process.env.KSVL_SKIP_REAL_AUDIO !== "1") {
    const {context, page} = await openRealAudio(admitted);
    await page.locator(".ksvl-cd-play-btn:not([disabled])").first().click();
    await page.waitForFunction(() => {
      const state = window.KSVL_testSnapshot?.();
      return state && state.readyState >= 1 && Number.isFinite(state.duration) &&
        state.duration > 0 && state.paused === false;
    }, null, {timeout:15000});
    const before = await page.evaluate(() => window.KSVL_testSnapshot());
    await page.waitForFunction((startingTime) => window.KSVL_testSnapshot?.().currentTime > startingTime,
      before.currentTime, {timeout:5000}).catch(() => {});
    const after = await page.evaluate(() => window.KSVL_testSnapshot());
    check(after.currentTime > before.currentTime, "real decoded audio proxy did not advance media time");
    check(after.muted === false && after.volume > 0, "real decoded audio proxy was not in an audible state");
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error(`KSVL BROWSER FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("KSVL BROWSER PASS journeys=held,zero-admission-copy-metadata-cta,production-hook-isolation,hostile-registry,denial,retry,play,pause,seek,seek-failure,repeat,end,mute,volume,waiting,stalled,media-error,single-audio,strict-return-state,mobile,held-link-navigation,receipt-truth decoded-audio=" + (process.env.KSVL_SKIP_REAL_AUDIO === "1" ? "skipped" : "passed"));
