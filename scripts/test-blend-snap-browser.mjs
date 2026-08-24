#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(
  process.env.BLEND_SNAP_ROOT ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
);
const CHROME = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(CHROME)) {
  console.log("SKIP BLEND & SNAP BROWSER: Google Chrome is unavailable.");
  process.exit(0);
}

function mime(file) {
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".mp3": "audio/mpeg"
  }[path.extname(file)] || "application/octet-stream";
}

function fixtureFromReferer(request) {
  try {
    return new URL(request.headers.referer).searchParams.get("fixture") || "base";
  } catch {
    return "base";
  }
}

const retryAttempts = new Map();

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  const fixture = fixtureFromReferer(request);
  if (requestUrl.pathname === "/content/blend-snap-weekly-packs.json") {
    if (fixture === "retry-recovery") {
      const recoveryKey = `${fixture}:${requestUrl.pathname}`;
      retryAttempts.set(recoveryKey, (retryAttempts.get(recoveryKey) || 0) + 1);
      if (retryAttempts.get(recoveryKey) === 1) {
        response.writeHead(503);
        response.end("Unavailable once");
        return;
      }
    }
    if (fixture === "manifest-failure") {
      response.writeHead(503);
      response.end("Unavailable");
      return;
    }
    if (fixture === "timeout") {
      const delayedResponse = setTimeout(() => {
        if (response.destroyed) return;
        response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
        response.end(fs.readFileSync(
          path.join(ROOT, "content/blend-snap-weekly-packs.json"),
          "utf8"
        ));
      }, 9000);
      request.once("close", () => {
        clearTimeout(delayedResponse);
        if (!response.writableEnded) response.destroy();
      });
      return;
    }
    const manifest = JSON.parse(fs.readFileSync(
      path.join(ROOT, "content/blend-snap-weekly-packs.json"),
      "utf8"
    ));
    if (fixture === "stale") manifest.freshThrough = "2026-07-24";
    if (fixture === "missing-component") manifest.packs.at(-1).components.pop();
    if (fixture === "private-metadata") {
      manifest.evidenceOwner = "must-not-ship";
    }
    if (fixture === "malformed-manifest") {
      response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      response.end("{not json");
      return;
    }
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(manifest));
    return;
  }
  if (requestUrl.pathname === "/content/episode-index.json") {
    if (fixture === "index-failure") {
      response.writeHead(503);
      response.end("Unavailable");
      return;
    }
    const index = JSON.parse(fs.readFileSync(
      path.join(ROOT, "content/episode-index.json"),
      "utf8"
    ));
    if (fixture === "index-mismatch") {
      index.episodes = index.episodes.filter((episode) => episode.number !== 4);
    }
    if (fixture === "malformed-index") {
      response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      response.end("{not json");
      return;
    }
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(index));
    return;
  }
  const relative = requestUrl.pathname === "/"
    ? "blend-snap.html"
    : requestUrl.pathname.replace(/^\/+/, "");
  const file = path.resolve(ROOT, relative);
  if (!file.startsWith(ROOT + path.sep) ||
      !fs.existsSync(file) ||
      fs.statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime(file) });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-blend-snap-chrome-"));
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

let resolveEndpoint;
let rejectEndpoint;
const endpointPromise = new Promise((resolve, reject) => {
  resolveEndpoint = resolve;
  rejectEndpoint = reject;
});
let stderr = "";
chrome.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
  const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
  if (match) resolveEndpoint(match[1]);
});
chrome.once("error", rejectEndpoint);
const startupTimeout = setTimeout(
  () => rejectEndpoint(new Error("Chrome DevTools did not start")),
  10000
);

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

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
let endpoint;

async function value(client, expression) {
  const result = await client.call("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function openPage(pathname, options = {}) {
  const target = await fetch(
    `${new URL(endpoint).origin.replace("ws:", "http:")}/json/new?about:blank`,
    { method: "PUT" }
  ).then((response) => response.json());
  const socket = await connect(target.webSocketDebuggerUrl);
  const client = cdp(socket);
  await client.call("Runtime.enable");
  await client.call("Page.enable");
  await client.call("Storage.clearDataForOrigin", {
    origin,
    storageTypes: "all"
  });
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
  const scripts = [
    "window.__BLEND_SNAP_TODAY='2026-07-25';"
  ];
  if (options.storageBlocked) {
    scripts.push(
      "Storage.prototype.setItem=function(){throw new DOMException('blocked','SecurityError')};"
    );
  }
  if (options.welcomeTourStep) {
    scripts.push(
      `localStorage.setItem('laidies_welcome_tour', JSON.stringify({step:${Number(options.welcomeTourStep)},startedAt:'2026-07-25T00:00:00.000Z'}));`
    );
  }
  await client.call("Page.addScriptToEvaluateOnNewDocument", {
    source: scripts.join("\n")
  });
  await client.call("Page.navigate", { url: origin + pathname });
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const ready = await value(client, "document.readyState === 'complete'");
    if (ready) break;
    await sleep(50);
  }
  await sleep(180);
  return client;
}

async function act(client, expression, wait = 140) {
  await value(client, expression);
  await sleep(wait);
}

async function press(client, key, code, virtualKeyCode) {
  await client.call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key,
    code,
    windowsVirtualKeyCode: virtualKeyCode,
    nativeVirtualKeyCode: virtualKeyCode
  });
  await client.call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key,
    code,
    windowsVirtualKeyCode: virtualKeyCode,
    nativeVirtualKeyCode: virtualKeyCode
  });
  await sleep(160);
}

let checks = 0;
function check(actual, expected, label) {
  assert.deepEqual(actual, expected, label);
  checks += 1;
}

try {
  endpoint = await endpointPromise;
  clearTimeout(startupTimeout);

  const fresh = await openPage("/blend-snap.html");
  check(await value(fresh, "!document.querySelector('#bsOrderMenu').disabled"),
    true, "current order enabled only after validation");
  check(await value(fresh, "document.querySelector('#bsSpecialName').textContent"),
    "Episode 04 Study Pack menu · The Founding Mothers", "current episode identity");
  check(await value(fresh, "document.querySelector('#bsSpecialDesc').textContent.includes('1 of 4 pack pieces is ready')"),
    true, "partial pack count is explicit");
  check(await value(fresh, "document.querySelectorAll('#bsComponents .bs-menu-line').length"),
    4, "all pack component jobs rendered");
  check(await value(fresh, "document.querySelectorAll('#bsComponents a').length"),
    1, "only available pack component routes rendered");
  check(await value(fresh, "document.querySelector('[data-status=\"held\"]').textContent"),
    "Cheat Sheet is being corrected", "multi-page printable is withheld from the one-page Cheat Sheet slot");
  check(await value(fresh, "document.querySelector('[data-status=\"planned\"]').textContent"),
    "Planned — no Study Sheet yet", "Study Sheet truth");
  check(await value(fresh, "document.querySelector('[data-status=\"unavailable\"]').textContent"),
    "Not made for Episode 04", "Episode 4 card truth");
  check(await value(fresh,
    "!/Architecture exists|collection authority repair|Episode index declares/i.test(document.querySelector('#bsComponents').textContent)"
  ), true, "public component rows hide internal evidence language");
  await act(fresh,
    "document.querySelector('.bs-notice--study-pack').scrollIntoView({block:'center',behavior:'instant'})"
  );
  check(await value(fresh, `(() => {
    const note=document.querySelector('.bs-notice--study-pack');
    const rect=note.getBoundingClientRect();
    const top=document.elementFromPoint(rect.left+rect.width/2,rect.top+rect.height/2);
    return !!note && !!top && top.closest('.bs-notice--study-pack')===note &&
      getComputedStyle(note).backgroundColor!=='rgba(0, 0, 0, 0)' &&
      note.textContent.includes('Availability checked before every order') &&
      !/cards included|new every Wednesday/i.test(note.innerText);
  })()`), true, "truthful opaque Study Pack note covers stale corkboard promise");
  check(await value(fresh, `(() => {
    const row=window.SV_BUILDINGS.find((entry)=>entry.id==='blend-snap');
    return row.oneLiner.includes('see what is ready') &&
      row.mechanics.includes('Episode pack menu · availability varies') &&
      !/trading cards|soon/i.test(row.oneLiner+' '+row.mechanics.join(' '));
  })()`), true, "rendered directory uses availability-governed copy");

  await act(fresh,
    "document.querySelector('#bsOrderMenu').focus(); document.querySelector('#bsOrderMenu').focus()"
  );
  check(await value(fresh, "document.activeElement.id"),
    "bsOrderMenu", "order control receives keyboard focus");
  await press(fresh, " ", "Space", 32);
  check(await value(fresh, "document.querySelector('#bsReceipt').classList.contains('is-open')"),
    true, "keyboard order opens receipt");
  check(await value(fresh, "document.activeElement.id"),
    "bsReceiptTitle", "receipt focus");
  check(await value(fresh, "document.querySelectorAll('#bsReceiptComponents li').length"),
    4, "receipt pack component inventory");
  check(await value(fresh, "document.querySelectorAll('#bsReceiptComponents a').length"),
    1, "receipt suppresses unavailable pack routes");
  await act(fresh,
    "document.querySelector('#bsCloseReceipt').focus(); document.querySelector('#bsCloseReceipt').click()"
  );
  check(await value(fresh, "document.activeElement.id"),
    "bsOrderMenu", "close restores trigger focus");
  check(await value(fresh, "document.querySelector('#bsStateCopy').textContent.includes('already opened')"),
    true, "return state says opened on device");

  await act(fresh,
    "document.querySelector('.bs-drink[data-drink=\"Cortado\"]').click()"
  );
  check(await value(fresh, "document.querySelector('#bsMemoryNote').textContent"),
    "Cortado is now your usual on this device.", "usual persistence truth");
  check(await value(fresh, "localStorage.getItem('laidies_bs_last_pack')"),
    "the-founding-mothers", "opened marker is exact current pack");

  await act(fresh,
    "document.querySelector('.bs-regulars').open=true; document.querySelector('[data-pack-episode=\"3\"]').focus()"
  );
  await press(fresh, " ", "Space", 32);
  check(await value(fresh, "document.querySelector('#bsReceiptTitle').textContent.includes('Episode 03')"),
    true, "past pack keyboard menu");
  check(await value(fresh, `(() => {
    const row=[...document.querySelectorAll('#bsReceiptComponents li')].find((item)=>item.querySelector('strong')?.textContent.includes('Cards'));
    return row.querySelector('[data-status="held"]').textContent.includes('Held');
  })()`),
    false, "past card status avoids internal held wording");
  check(await value(fresh, `(() => {
    const row=[...document.querySelectorAll('#bsReceiptComponents li')].find((item)=>item.querySelector('strong')?.textContent.includes('Cards'));
    return row.querySelector('[data-status="held"]').textContent;
  })()`),
    "Cards are not available yet", "past card status is visitor-safe");

  const tour = await openPage("/blend-snap.html", { welcomeTourStep: 4 });
  check(await value(tour, "document.querySelector('.svwt-line').textContent.includes('ready, held, planned or unavailable')"),
    true, "rendered Welcome Tour explains variable pack availability");
  check(await value(tour, "!/fresh pack of trading cards|this week/i.test(document.querySelector('.svwt-line').textContent)"),
    true, "rendered Welcome Tour makes no weekly/card guarantee");

  const formerReviewBypass = await openPage(
    "/blend-snap.html?study-pack-review=ep01"
  );
  await act(formerReviewBypass,
    "document.querySelector('[data-pack-episode=\"1\"]').click()"
  );
  check(await value(formerReviewBypass,
    "document.querySelectorAll('#bsReceiptComponents a').length"
  ), 0, "review query cannot fabricate held Episode 1 component links");
  check(await value(formerReviewBypass,
    "!/127\\.0\\.0\\.1:(4173|4182)/.test(document.querySelector('#bsReceipt').innerHTML)"
  ), true, "review query cannot inject localhost routes");

  for (const episode of ["01", "02", "03", "04"]) {
    const issue = await openPage(`/issues/issue-${episode}.html`);
    check(await value(issue,
      "document.querySelector('.rail-btn.rb2 small').textContent.trim()"
    ), "Availability checked at the café", `Episode ${episode} rail fails closed`);
  }

  const blocked = await openPage("/blend-snap.html", { storageBlocked: true });
  check(await value(blocked, "!document.querySelector('#bsOrderMenu').disabled"),
    true, "storage denial does not block ordering");
  await act(blocked,
    "document.querySelector('.bs-drink[data-drink=\"Chai latte\"]').click()"
  );
  check(await value(blocked, "document.querySelector('#bsMemoryNote').textContent.includes('blocked device memory')"),
    true, "blocked usual is disclosed");
  await act(blocked, "document.querySelector('#bsOrderMenu').click()");
  check(await value(blocked, "document.querySelector('#bsReceipt').classList.contains('is-open')"),
    true, "receipt works with storage blocked");
  check(await value(blocked, "document.querySelector('#bsMemoryNote').textContent.includes('cannot remember pack pickup')"),
    true, "blocked pickup memory is disclosed");

  for (const fixture of [
    "manifest-failure", "index-failure", "stale",
    "missing-component", "index-mismatch", "private-metadata", "timeout",
    "malformed-manifest", "malformed-index"
  ]) {
    const failure = await openPage(`/blend-snap.html?fixture=${fixture}`);
    if (fixture === "timeout") await sleep(8300);
    check(await value(failure, "document.querySelector('#bsOrderMenu').disabled"),
      true, `${fixture} disables ordering`);
    check(await value(failure, "!document.querySelector('#bsPackFallback').hidden"),
      true, `${fixture} exposes truthful fallback`);
    check(await value(failure, "document.querySelector('#bsSpecialDesc').textContent.includes('Nothing is being presented as ready')"),
      true, `${fixture} fails closed`);
    check(await value(failure, "document.querySelectorAll('#bsComponents a').length"),
      0, `${fixture} suppresses component routes`);
    check(await value(failure,
      `(() => {
        const status=document.querySelector('#bsSpecialDesc');
        return status.getAttribute('role')==='status' &&
          status.getAttribute('aria-live')==='polite' &&
          status.getAttribute('aria-atomic')==='true' &&
          status.getAttribute('aria-busy')==='false' &&
          status.textContent.trim().length>0;
      })()`
    ), true, `${fixture} exposes a nonempty atomic live failure`);
    check(await value(failure, "document.activeElement.id"),
      "bsPackRetry", `${fixture} focuses the meaningful retry control`);
    check(await value(failure, "!document.querySelector('#bsPackRetry').hidden"),
      true, `${fixture} exposes retry`);
  }

  const retryFailure = await openPage("/blend-snap.html?fixture=manifest-failure");
  await act(retryFailure, "document.querySelector('#bsPackRetry').click()");
  check(await value(retryFailure, "document.activeElement.id"),
    "bsPackRetry", "failed user retry returns focus to retry");
  check(await value(retryFailure,
    "document.querySelector('#bsSpecialDesc').textContent.includes('Nothing is being presented as ready')"
  ), true, "failed user retry re-announces the visible failure");

  const recoveredRetry = await openPage("/blend-snap.html?fixture=retry-recovery");
  check(await value(recoveredRetry, "document.querySelector('#bsOrderMenu').disabled"),
    true, "first retry-recovery load disables ordering");
  await act(recoveredRetry, "document.querySelector('#bsPackRetry').click()", 220);
  check(await value(recoveredRetry, "!document.querySelector('#bsOrderMenu').disabled"),
    true, "retry validates both sources before restoring the menu");
  check(await value(recoveredRetry, "document.querySelector('#bsReceipt').classList.contains('is-open')"),
    false, "recovery never reopens a cached receipt");

  const corruptStorage = await openPage("/blend-snap.html");
  await act(corruptStorage,
    "localStorage.setItem('laidies_bs_usual','forged drink'); localStorage.setItem('laidies_bs_last_pack','forged-pack'); location.reload()",
    260
  );
  check(await value(corruptStorage, "document.querySelector('#bsStateCopy').textContent.includes('forged')"),
    false, "corrupt usual is not rendered as a returning visitor state");
  check(await value(corruptStorage, "localStorage.getItem('laidies_bs_usual')"),
    null, "corrupt usual is cleared rather than trusted");
  check(await value(corruptStorage, "localStorage.getItem('laidies_bs_last_pack')"),
    null, "corrupt pack marker is cleared rather than trusted");

  const mobile = await openPage("/blend-snap.html", { width: 390, height: 844 });
  check(await value(mobile, "document.documentElement.scrollWidth <= 390"),
    true, "390 px no page overflow");
  check(await value(mobile, "document.querySelectorAll('#bsComponents .bs-menu-line').length"),
    4, "mobile retains exact pack inventory");
  check(await value(mobile, "getComputedStyle(document.querySelector('#bsOrderMobile')).display !== 'none'"),
    true, "mobile order control visible");

  const reduced = await openPage("/blend-snap.html", { reducedMotion: true });
  check(await value(reduced, "matchMedia('(prefers-reduced-motion: reduce)').matches"),
    true, "reduced motion recognized");
  await act(reduced, "document.querySelector('#bsOrderMenu').click()");
  check(await value(reduced, "document.activeElement.id"),
    "bsReceiptTitle", "reduced-motion receipt focus");

  const tryOnBlocked = await openPage(
    "/try-on.html?issue=3&from=blend-snap",
    { storageBlocked: true }
  );
  check(await value(tryOnBlocked, `(() => {
    const links=[document.querySelector('[data-wednesday-return]'),document.querySelector('.tryon-portal-note .button.secondary')];
    return links.every((link)=>link.getAttribute('href')==='/blend-snap.html#the-study-pack') &&
      links.every((link)=>link.textContent.includes('Back to Blend & Snap'));
  })()`), true, "Try-On preserves the exact Blend & Snap handback");
  await act(tryOnBlocked,
    "document.querySelector('#tryonNotes').value='Keep this visible'; document.querySelector('#saveButton').click()"
  );
  check(await value(tryOnBlocked, "document.querySelector('#saveStatus').textContent.includes('Could not save on this device')"),
    true, "Try-On storage failure is truthful");
  check(await value(tryOnBlocked, "document.querySelector('#tryonNotes').value"),
    "Keep this visible", "blocked save leaves user text on page");

  const directTryOn = await openPage("/try-on.html?issue=3");
  check(await value(directTryOn, `(() => {
    const links=[document.querySelector('[data-wednesday-return]'),document.querySelector('.tryon-portal-note .button.secondary')];
    return links.every((link)=>link.getAttribute('href')==='/') &&
      links.every((link)=>link.textContent.includes('Back to SUNNYVAiLE'));
  })()`), true, "direct Try-On keeps the safe town handback");

  const heldEpisodeOneTryOn = await openPage("/try-on.html?issue=1&from=blend-snap");
  check(await value(heldEpisodeOneTryOn, `(() => {
    return location.pathname==='/blend-snap.html' && location.hash==='#the-study-pack';
  })()`), true, "held Episode 01 Try-On redirects to its truthful Blend & Snap status");

  const episodeThreeQuiz = await openPage(
    "/learn/quiz.html?issue=3&from=blend-snap#quiz-start",
    { width: 390, height: 844 }
  );
  check(await value(episodeThreeQuiz,
    "!document.querySelector('.quiz-console').hidden && document.querySelector('#quizIssueLabel').textContent.includes('Episode 03')"
  ), true, "Quiz receiver opens the exact Episode 03 paper");
  check(await value(episodeThreeQuiz, `(() => {
    const link=document.querySelector('[data-quiz-return="blend-snap"]');
    return !!link && link.textContent.includes('Back to Blend & Snap') &&
      new URL(link.href).pathname==='/blend-snap.html' &&
      new URL(link.href).hash==='#the-study-pack';
  })()`), true, "Quiz receiver preserves the Blend & Snap handback");
  check(await value(episodeThreeQuiz, "document.documentElement.scrollWidth <= 390"),
    true, "390 px Quiz receiver has no page overflow");

  console.log(
    `✓ BLEND & SNAP BROWSER: ${checks} rendered checks · ` +
    "new/return/storage/index/stale/missing/mobile/keyboard/focus/motion/cross-entry"
  );
} finally {
  clearTimeout(startupTimeout);
  chrome.kill("SIGTERM");
  server.close();
}
