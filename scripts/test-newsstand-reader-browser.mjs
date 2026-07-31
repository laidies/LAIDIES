#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(process.env.NEWSSTAND_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const NOW_STALE = "2026-06-01T00:00:00Z";
const CORRECTION_RECORD = "/operations/test-fixtures/newsstand-reader/evidence/correction-label-truth-2026-07-25.json";
const RETRACTION_RECORD = "/operations/test-fixtures/newsstand-reader/evidence/retraction-label-truth-2026-07-25.json";

if (!fs.existsSync(CHROME)) {
  console.log("SKIP NEWSSTAND BROWSER: Google Chrome is unavailable.");
  process.exit(0);
}

function baseData() {
  const context = { window: {} };
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, "content", "newsstand-stories.js"), "utf8"),
    context
  );
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

function fixtureData(name) {
  if (name === "load-failure") return null;
  const data = baseData();
  if (name === "no-data") data.stories = [];
  if (name === "dataset-hold") data.datasetStatus = "hold";
  if (name === "stale") {
    Object.values(data.publications).forEach((publication) => {
      publication.lastCheckedAt = NOW_STALE;
    });
  }
  if (name === "unavailable") data.publications.tribune.status = "unavailable";
  if (name === "mixed") {
    data.publications.tribune.lastCheckedAt = NOW_STALE;
    data.publications.daily.status = "current";
    data.publications.daily.publishedAt = "2026-07-25T17:00:00Z";
  }
  if (name === "corrected") {
    data.stories[1].status = "corrected";
    data.stories[1].correction = {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: CORRECTION_RECORD
    };
  }
  if (name === "retracted") {
    data.stories[1].status = "retracted";
    data.stories[1].retraction = {
      retractedAt: "2026-07-25T18:30:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor",
      record: RETRACTION_RECORD
    };
  }
  return data;
}

function fixtureScript(name) {
  const data = fixtureData(name);
  if (!data) return "/* intentional load-failure fixture: NEWSSTAND_DATA absent */";
  return "window.NEWSSTAND_DATA = " + JSON.stringify(data) +
    ";\nwindow.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n";
}

function mime(file) {
  const ext = path.extname(file);
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".mp3": "audio/mpeg"
  }[ext] || "application/octet-stream";
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  if (requestUrl.pathname === "/content/newsstand-stories.js") {
    let fixture = "base";
    try {
      fixture = new URL(request.headers.referer).searchParams.get("fixture") || "base";
    } catch {}
    const body = fixtureScript(fixture);
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8" });
    response.end(body);
    return;
  }
  const relative = requestUrl.pathname === "/" ? "newsstand.html" : requestUrl.pathname.replace(/^\/+/, "");
  const file = path.resolve(ROOT, relative);
  if (!file.startsWith(ROOT + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime(file) });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const siteOrigin = `http://127.0.0.1:${server.address().port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-chrome-"));
const chrome = childProcess.spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--disable-default-apps",
  "--disable-background-networking",
  "--disable-component-update",
  "--disable-sync",
  "--metrics-recording-only",
  "about:blank"
], { stdio: ["ignore", "ignore", "pipe"] });

let devtoolsResolve;
let devtoolsReject;
const devtoolsPromise = new Promise((resolve, reject) => {
  devtoolsResolve = resolve;
  devtoolsReject = reject;
});
let stderr = "";
chrome.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
  const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
  if (match) devtoolsResolve(match[1]);
});
chrome.once("error", devtoolsReject);
const timeout = setTimeout(() => devtoolsReject(new Error("Chrome DevTools did not start")), 10000);
let devtoolsEndpoint = null;

function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    socket.addEventListener("open", () => resolve(socket), { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
}

function cdp(socket) {
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const handler = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) handler.reject(new Error(message.error.message));
    else handler.resolve(message.result);
  });
  return {
    call(method, params = {}) {
      const callId = ++id;
      return new Promise((resolve, reject) => {
        pending.set(callId, { resolve, reject });
        socket.send(JSON.stringify({ id: callId, method, params }));
      });
    },
    close() { socket.close(); }
  };
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function openPage(pathname, options = {}) {
  const target = await fetch(
    `${new URL(devtoolsEndpoint).origin.replace("ws:", "http:")}/json/new?${encodeURIComponent(siteOrigin + pathname)}`,
    { method: "PUT" }
  ).then((response) => response.json());
  const socket = await connect(target.webSocketDebuggerUrl);
  const client = cdp(socket);
  await client.call("Runtime.enable");
  await client.call("Page.enable");
  await client.call("Emulation.setDeviceMetricsOverride", {
    width: options.width || 1280,
    height: options.height || 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  if (options.reducedMotion) {
    await client.call("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    });
  }
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const ready = await client.call("Runtime.evaluate", {
      expression: "document.readyState === 'complete' && !!document.querySelector('#ns-title')",
      returnByValue: true
    });
    if (ready.result.value) break;
    await sleep(50);
  }
  await sleep(100);
  return client;
}

async function value(client, expression) {
  const result = await client.call("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function act(client, expression) {
  await value(client, expression);
  await sleep(120);
}

async function waitForHistoryRestoration(client, previousId = "") {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const state = await value(client, `(() => { const reader = document.querySelector('#paper-counter'); return { state: reader.getAttribute('data-ns-restoration'), id: reader.getAttribute('data-ns-restoration-id') }; })()`);
    if (state.state === "settled" && state.id && state.id !== previousId) return state.id;
    await sleep(20);
  }
  throw new Error("NewsStand history restoration did not reach its observable settled state");
}

async function pressEnter(client) {
  await client.call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13
  });
  await client.call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13
  });
  await sleep(160);
}

let checks = 0;
function check(actual, expected, label) {
  assert.deepEqual(actual, expected, label);
  checks += 1;
}

try {
  devtoolsEndpoint = await devtoolsPromise;
  clearTimeout(timeout);

  const base = await openPage("/newsstand.html");
  check(await value(base, "document.querySelector('#ns-title').textContent.includes('Tribune')"), true, "base arrival");
  await act(base, "document.querySelector('.ns-publication[data-edition=\"weekly\"]').click()");
  check(await value(base, "document.querySelectorAll('.ns-article').length"), 0, "held Weekly body suppressed");
  check(await value(base, "document.activeElement.id"), "ns-empty", "held Weekly focus");
  await act(base, "document.querySelector('.ns-publication[data-edition=\"tribune\"]').click()");
  check(await value(base, "document.querySelectorAll('.ns-front-story').length"), 1, "Tribune listing");
  check(await value(base, "document.activeElement.id"), "ns-reader-title", "open focus");
  await act(base, "document.querySelector('.ns-front-story').click()");
  check(await value(base, "document.querySelectorAll('.ns-article').length"), 1, "Tribune body");
  await act(base, "document.querySelector('#ns-return').click()");
  check(await value(base, "document.activeElement.dataset.edition"), "tribune", "paper return focus");
  await act(base, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(base, "document.querySelectorAll('.ns-front-story').length"), 1, "approved search result");
  await act(base, "document.querySelector('.ns-front-story').click()");
  await act(base, "document.querySelector('#ns-return').click()");
  check(await value(base, "document.activeElement.id"), "ns-search-button", "search return focus");
  base.close();

  const paperHistory = await openPage("/newsstand.html");
  await act(paperHistory, "document.querySelector('.ns-publication[data-edition=\"tribune\"]').click()");
  await act(paperHistory, "window.scrollTo(0,640)");
  await act(paperHistory, "document.querySelector('.ns-front-story').focus()");
  const paperScroll = await value(paperHistory, "window.scrollY");
  await pressEnter(paperHistory);
  check(await value(paperHistory, "location.hash"), "#label-is-not-a-truth-detector", "paper keyboard story route");
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 1, "paper story open");
  const paperRestorationBefore = await value(paperHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(paperHistory, "history.back()");
  await waitForHistoryRestoration(paperHistory, paperRestorationBefore);
  check(await value(paperHistory, "location.hash"), "", "paper Back clears hash");
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 0, "paper Back clears article");
  check(await value(paperHistory, "document.querySelectorAll('.ns-front-story').length"), 1, "paper Back restores cards");
  check(await value(paperHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", "paper Back result focus");
  check(Math.abs((await value(paperHistory, "window.scrollY")) - paperScroll) <= 200, true, "paper Back restores origin vicinity");
  await act(paperHistory, "history.forward()");
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 1, "paper Forward restores story");
  check(await value(paperHistory, "document.activeElement.id"), "ns-reader-title", "paper Forward heading focus");
  const repeatedPaperRestorationBefore = await value(paperHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(paperHistory, "history.back()");
  await waitForHistoryRestoration(paperHistory, repeatedPaperRestorationBefore);
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 0, "repeated paper Back has no stale body");
  for (const [index, scrollTarget] of [360, 840].entries()) {
    await paperHistory.call("Emulation.setDeviceMetricsOverride", { width: 1280, height: [620, 900][index], deviceScaleFactor: 1, mobile: false });
    await act(paperHistory, `window.scrollTo(0, ${scrollTarget});document.querySelector('.ns-front-story').focus()`);
    const expectedScroll = await value(paperHistory, "window.scrollY");
    await pressEnter(paperHistory);
    const restorationBefore = await value(paperHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
    await act(paperHistory, "history.back()");
    await waitForHistoryRestoration(paperHistory, restorationBefore);
    check(await value(paperHistory, "document.querySelectorAll('.ns-front-story').length"), 1, `paper cycle ${scrollTarget} cards`);
    check(await value(paperHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", `paper cycle ${scrollTarget} focus`);
    check(Math.abs((await value(paperHistory, "window.scrollY")) - expectedScroll) <= 200, true, `paper cycle ${scrollTarget} restored scroll vicinity`);
    check(await value(paperHistory, "Number(document.querySelector('#paper-counter').getAttribute('data-ns-restored-scroll')) === window.scrollY"), true, `paper cycle ${scrollTarget} observable settled scroll`);
  }
  paperHistory.close();

  const searchHistory = await openPage("/newsstand.html");
  await act(searchHistory, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-input').focus()");
  await pressEnter(searchHistory);
  check(await value(searchHistory, "document.querySelectorAll('.ns-front-story').length"), 1, "keyboard search result");
  await act(searchHistory, "window.scrollTo(0,720)");
  await act(searchHistory, "document.querySelector('.ns-front-story').focus()");
  const searchScroll = await value(searchHistory, "window.scrollY");
  await pressEnter(searchHistory);
  check(await value(searchHistory, "document.querySelectorAll('.ns-article').length"), 1, "keyboard result story");
  const searchRestorationBefore = await value(searchHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(searchHistory, "history.back()");
  await waitForHistoryRestoration(searchHistory, searchRestorationBefore);
  check(await value(searchHistory, "document.querySelector('#ns-search-input').value"), "verification", "search Back query");
  check(await value(searchHistory, "document.querySelectorAll('.ns-front-story').length"), 1, "search Back cards");
  check(await value(searchHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", "search Back result focus");
  check(Math.abs((await value(searchHistory, "window.scrollY")) - searchScroll) <= 200, true, "search Back restores origin vicinity");
  await act(searchHistory, "history.forward()");
  check(await value(searchHistory, "document.querySelectorAll('.ns-article').length"), 1, "search Forward story");
  const repeatedSearchRestorationBefore = await value(searchHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(searchHistory, "history.back()");
  await waitForHistoryRestoration(searchHistory, repeatedSearchRestorationBefore);
  check(await value(searchHistory, "document.querySelectorAll('.ns-article').length"), 0, "repeated search Back clears body");
  for (const [index, scrollTarget] of [360, 840].entries()) {
    await searchHistory.call("Emulation.setDeviceMetricsOverride", { width: 1280, height: [620, 900][index], deviceScaleFactor: 1, mobile: false });
    await act(searchHistory, `window.scrollTo(0, ${scrollTarget});document.querySelector('.ns-front-story').focus()`);
    const expectedScroll = await value(searchHistory, "window.scrollY");
    await pressEnter(searchHistory);
    const restorationBefore = await value(searchHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
    await act(searchHistory, "history.back()");
    await waitForHistoryRestoration(searchHistory, restorationBefore);
    check(await value(searchHistory, "document.querySelector('#ns-search-input').value"), "verification", `search cycle ${scrollTarget} query`);
    check(await value(searchHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", `search cycle ${scrollTarget} focus`);
    check(Math.abs((await value(searchHistory, "window.scrollY")) - expectedScroll) <= 200, true, `search cycle ${scrollTarget} restored scroll vicinity`);
    check(await value(searchHistory, "Number(document.querySelector('#paper-counter').getAttribute('data-ns-restored-scroll')) === window.scrollY"), true, `search cycle ${scrollTarget} observable settled scroll`);
  }
  searchHistory.close();

  const directHistory = await openPage("/newsstand.html#label-is-not-a-truth-detector");
  check(await value(directHistory, "document.querySelectorAll('.ns-article').length"), 1, "direct story starts open");
  await act(directHistory, "location.hash=''");
  check(await value(directHistory, "document.querySelector('#paper-counter').hidden"), true, "direct empty hash closes reader");
  check(await value(directHistory, "document.querySelectorAll('.ns-article').length"), 0, "direct empty hash clears body");
  check(await value(directHistory, "document.activeElement.dataset.edition"), "tribune", "direct empty hash focus");
  directHistory.close();

  const held = await openPage("/newsstand.html?fixture=dataset-hold#label-is-not-a-truth-detector");
  check(await value(held, "document.querySelectorAll('.ns-article').length"), 0, "global hold direct hash");
  check(await value(held, "document.querySelector('[data-access-state=\"hold\"]') !== null"), true, "global hold notice");
  await act(held, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(held, "document.querySelectorAll('.ns-front-story').length"), 0, "global hold search");
  check(await value(held, "document.querySelector('#ns-empty').textContent.includes('not publishing stories right now')"), true, "global hold search notice");
  held.close();

  const failed = await openPage("/newsstand.html?fixture=load-failure#label-is-not-a-truth-detector");
  check(await value(failed, "document.querySelectorAll('.ns-article').length"), 0, "load failure direct hash");
  check(await value(failed, "document.querySelector('[data-access-state=\"load-failure\"]') !== null"), true, "load failure notice");
  failed.close();

  const noData = await openPage("/newsstand.html?fixture=no-data#label-is-not-a-truth-detector");
  check(await value(noData, "document.querySelectorAll('.ns-article').length"), 0, "no-data direct hash");
  check(await value(noData, "document.querySelector('[data-access-state=\"no-data\"]') !== null"), true, "no-data notice");
  await act(noData, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(noData, "document.querySelectorAll('.ns-front-story').length"), 0, "no-data search");
  noData.close();

  const stale = await openPage("/newsstand.html?fixture=stale#label-is-not-a-truth-detector");
  check(await value(stale, "document.querySelectorAll('.ns-article').length"), 0, "stale direct hash");
  check(await value(stale, "document.querySelector('[data-access-state=\"stale\"]') !== null"), true, "stale archive warning");
  check(await value(stale, "document.querySelector('#ns-reader-title').textContent.includes('check overdue')"), true, "stale heading");
  await act(stale, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(stale, "document.querySelectorAll('.ns-front-story').length"), 0, "stale search");
  check(await value(stale, "document.querySelector('#ns-empty').textContent.includes('overdue')"), true, "stale search warning");
  stale.close();

  const staleDirect = await openPage("/newsstand.html?fixture=stale#label-is-not-a-truth-detector");
  await act(staleDirect, "location.hash=''");
  check(await value(staleDirect, "document.querySelector('#paper-counter').hidden"), true, "stale empty hash closes reader");
  check(await value(staleDirect, "document.querySelectorAll('.ns-article').length"), 0, "stale empty hash has no body");
  staleDirect.close();

  const unavailable = await openPage("/newsstand.html?fixture=unavailable");
  check(await value(unavailable, "document.querySelector('#ns-title').textContent.includes('unavailable')"), true, "unavailable arrival");
  check(await value(unavailable, "document.querySelector('#ns-title').textContent.includes('overdue')"), false, "unavailable is not stale");
  unavailable.close();

  const mixed = await openPage("/newsstand.html?fixture=mixed#label-is-not-a-truth-detector");
  check(await value(mixed, "document.querySelectorAll('.ns-article').length"), 0, "mixed stale story blocked");
  check(await value(mixed, "document.querySelector('[data-access-state=\"stale\"]') !== null"), true, "mixed stale warning");
  await act(mixed, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(mixed, "document.querySelectorAll('.ns-front-story').length"), 0, "mixed stale story excluded from search");
  mixed.close();

  const corrected = await openPage("/newsstand.html?fixture=corrected#label-is-not-a-truth-detector");
  check(await value(corrected, "document.querySelectorAll('.ns-article').length"), 1, "corrected body visible");
  check(await value(corrected, "document.querySelector('.ns-story-notice--corrected') !== null"), true, "correction notice");
  await act(corrected, "location.hash=''");
  check(await value(corrected, "document.querySelector('#paper-counter').hidden"), true, "corrected empty hash closes reader");
  corrected.close();

  const correctedHistory = await openPage("/newsstand.html?fixture=corrected");
  await act(correctedHistory, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(correctedHistory, "document.querySelector('.ns-front-story__status').textContent.includes('Corrected')"), true, "corrected search card");
  await act(correctedHistory, "document.querySelector('.ns-front-story').focus()");
  await pressEnter(correctedHistory);
  check(await value(correctedHistory, "document.querySelector('.ns-story-notice--corrected') !== null"), true, "corrected keyboard route");
  await act(correctedHistory, "history.back()");
  check(await value(correctedHistory, "document.querySelector('#ns-search-input').value"), "verification", "corrected Back query");
  check(await value(correctedHistory, "document.querySelector('.ns-front-story__status').textContent.includes('Corrected')"), true, "corrected Back card");
  check(await value(correctedHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", "corrected Back focus");
  correctedHistory.close();

  const retracted = await openPage("/newsstand.html?fixture=retracted#label-is-not-a-truth-detector");
  check(await value(retracted, "document.querySelectorAll('.ns-article').length"), 0, "retracted body suppressed");
  check(await value(retracted, "document.querySelector('.ns-story-notice--retracted') !== null"), true, "retraction notice");
  await act(retracted, "location.hash=''");
  check(await value(retracted, "document.querySelector('#paper-counter').hidden"), true, "retracted empty hash closes reader");
  retracted.close();

  const repeated = await openPage("/newsstand.html#label-is-not-a-truth-detector");
  await act(repeated, "location.hash='#chatgpt-health-permission-screen'");
  check(await value(repeated, "document.querySelectorAll('.ns-article').length"), 0, "repeated held route blocks body");
  check(await value(repeated, "document.querySelector('[data-access-state=\"hold\"]') !== null"), true, "repeated held notice");
  await act(repeated, "history.back()");
  check(await value(repeated, "document.querySelectorAll('.ns-article').length"), 1, "repeated Back restores eligible story");
  check(await value(repeated, "document.activeElement.id"), "ns-reader-title", "repeated Back focus");
  await act(repeated, "history.forward()");
  check(await value(repeated, "document.querySelectorAll('.ns-article').length"), 0, "repeated Forward blocks held body");
  repeated.close();

  const mobile = await openPage("/newsstand.html", { width: 390, height: 844, reducedMotion: true });
  check(await value(mobile, "matchMedia('(prefers-reduced-motion: reduce)').matches"), true, "reduced-motion media");
  await act(mobile, "window.__nsScroll=[];Element.prototype.scrollIntoView=function(options){window.__nsScroll.push(options)};document.querySelector('.ns-publication[data-edition=\"tribune\"]').click()");
  check(await value(mobile, "window.__nsScroll[0].behavior"), "auto", "reduced-motion scroll");
  check(await value(mobile, "getComputedStyle(document.querySelector('.ns-paper')).transitionDuration"), "0s", "reduced-motion transition");
  check(await value(mobile, "document.documentElement.scrollWidth <= window.innerWidth"), true, "390 reflow");
  await mobile.call("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  check(await value(mobile, "document.documentElement.scrollWidth <= window.innerWidth"), true, "200 percent page-scale proxy");
  mobile.close();

  console.log(`✓ NEWSSTAND BROWSER: ${checks} rendered checks · three repeated paper/search history cycles at 620/900px · hold/stale/correction/retraction/focus/mobile/motion/zoom`);
} finally {
  clearTimeout(timeout);
  server.close();
  chrome.kill("SIGTERM");
  fs.rmSync(profile, { recursive: true, force: true });
}
