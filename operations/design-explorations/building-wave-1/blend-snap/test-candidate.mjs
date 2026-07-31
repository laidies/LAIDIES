#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CANDIDATE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(CANDIDATE, "../../../..");
const EVIDENCE = path.join(CANDIDATE, "evidence");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sourceHtml = fs.readFileSync(path.join(CANDIDATE, "index.html"), "utf8");

if (!fs.existsSync(CHROME)) {
  console.log("SKIP BLEND & SNAP CANDIDATE: Google Chrome is unavailable.");
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
    ".webp": "image/webp"
  }[path.extname(file)] || "application/octet-stream";
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://candidate.local");
  let relative;
  if (requestUrl.pathname === "/" || requestUrl.pathname === "/candidate/") {
    relative = path.relative(ROOT, path.join(CANDIDATE, "index.html"));
  } else if (requestUrl.pathname.startsWith("/candidate/")) {
    relative = path.relative(
      ROOT,
      path.join(CANDIDATE, requestUrl.pathname.slice("/candidate/".length))
    );
  } else {
    relative = requestUrl.pathname.replace(/^\/+/, "");
  }
  const file = path.resolve(ROOT, relative);
  if (!file.startsWith(ROOT + path.sep) ||
      !fs.existsSync(file) ||
      fs.statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime(file),
    "cache-control": "no-store"
  });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-bs-candidate-"));
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
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result.value;
}

async function openPage(pathname, options = {}) {
  const endpointOrigin = new URL(endpoint).origin.replace("ws:", "http:");
  const target = await fetch(`${endpointOrigin}/json/new?about:blank`, {
    method: "PUT"
  }).then((response) => response.json());
  const socket = await connect(target.webSocketDebuggerUrl);
  const client = cdp(socket);
  await client.call("Runtime.enable");
  await client.call("Page.enable");
  await client.call("Storage.clearDataForOrigin", {
    origin,
    storageTypes: "all"
  });
  await client.call("Emulation.setDeviceMetricsOverride", {
    width: options.width || 1440,
    height: options.height || 1100,
    deviceScaleFactor: 1,
    mobile: false
  });
  if (options.reducedMotion) {
    await client.call("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    });
  }
  await client.call("Page.navigate", { url: origin + pathname });
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await value(client, "document.readyState === 'complete'")) break;
    await sleep(50);
  }
  await sleep(160);
  return client;
}

async function act(client, expression, wait = 120) {
  await value(client, expression);
  await sleep(wait);
}

async function screenshot(client, filename, fullPage = true) {
  fs.mkdirSync(EVIDENCE, { recursive: true });
  const result = await client.call("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: fullPage
  });
  fs.writeFileSync(path.join(EVIDENCE, filename), Buffer.from(result.data, "base64"));
}

let checks = 0;
function check(actual, expected, label) {
  assert.deepEqual(actual, expected, label);
  checks += 1;
}

try {
  check(/<noscript>[\s\S]*Browse released Episodes[\s\S]*Episode 04 Try-On[\s\S]*Founding Mothers Timeline[\s\S]*Episode 04 Pop Quiz[\s\S]*<\/noscript>/.test(sourceHtml), true, "no-JS fallback preserves the bounded current handoffs");
  check(!/<noscript>[\s\S]*Study Sheet[^<]*<\/a>|<noscript>[\s\S]*Episode 04 Concept Cards[^<]*<\/a>/.test(sourceHtml), true, "no-JS fallback does not link planned or unavailable components");
  endpoint = await endpointPromise;
  clearTimeout(startupTimeout);

  const fresh = await openPage("/candidate/?visitor=first&failure=none");
  check(await value(fresh, "document.body.dataset.visitor"), "first", "first-time state");
  check(await value(fresh, "document.body.dataset.fixture"), "none", "healthy fixture");
  check(await value(fresh, "!document.querySelector('#orderButton').disabled"), true, "healthy order enabled");
  check(await value(fresh, "document.querySelectorAll('#ticketRail .component-ticket').length"), 5, "complete inventory");
  check(await value(fresh, "document.querySelectorAll('#ticketRail a').length"), 3, "available handoffs only");
  check(await value(fresh, "document.querySelector('[data-component=study_sheet]').dataset.status"), "planned", "Study Sheet planned");
  check(await value(fresh, "document.querySelector('[data-component=study_sheet] a') === null"), true, "Study Sheet not linked");
  check(await value(fresh, "document.querySelector('[data-component=trading_cards]').dataset.status"), "unavailable", "Episode 4 Cards unavailable");
  check(await value(fresh, "document.querySelector('[data-component=trading_cards] a') === null"), true, "Cards not linked");
  check(await value(fresh, "document.querySelector('[data-component=try_on] a').getAttribute('href')"), "/try-on.html?issue=4&from=blend-snap", "Try-On exact handoff");
  check(await value(fresh, "document.querySelector('[data-component=quiz] a').getAttribute('href')"), "/learn/quiz.html#quiz-start", "Quiz exact handoff");

  await act(fresh, "document.querySelector('#orderButton').click()");
  check(await value(fresh, "document.querySelector('#receiptDialog').open"), true, "order opens receipt");
  check(await value(fresh, "document.activeElement.id"), "receiptTitle", "receipt focus");
  check(await value(fresh, "document.querySelectorAll('#receiptItems li').length"), 5, "receipt inventory");
  check(await value(fresh, "document.querySelectorAll('#receiptItems a').length"), 3, "receipt suppresses unavailable links");
  check(await value(fresh, "localStorage.getItem('laidies_bs_candidate_last_pack_v1')"), "episode-04", "candidate receipt marker");
  check(await value(fresh, "localStorage.getItem('laidies_bs_last_pack')"), null, "live receipt key untouched");
  await screenshot(fresh, "desktop-1440-receipt.png", false);
  await act(fresh, "document.querySelector('#closeReceipt').click()");
  check(await value(fresh, "document.activeElement.id"), "orderButton", "dialog close restores trigger");

  await act(fresh, "document.querySelector('[data-drink=\"Cortado\"]').click()");
  check(await value(fresh, "localStorage.getItem('laidies_bs_candidate_usual_v1')"), "Cortado", "candidate usual key");
  check(await value(fresh, "localStorage.getItem('laidies_bs_usual')"), null, "live usual key untouched");
  check(await value(fresh, "document.querySelector('#usualCopy').textContent.includes('prototype browser only')"), true, "usual scope disclosed");

  for (const state of ["first", "returning", "local-card", "account-card"]) {
    await act(fresh, `(() => {
      document.querySelector('#visitorState').value=${JSON.stringify(state)};
      document.querySelector('#scenarioForm').requestSubmit();
    })()`);
    check(await value(fresh, "document.body.dataset.visitor"), state, `${state} scenario applied`);
    check(await value(fresh, "document.querySelectorAll('#ticketRail .component-ticket').length"), 5, `${state} retains inventory`);
    check(await value(fresh, "!document.querySelector('#orderButton').disabled"), true, `${state} retains same capability`);
  }
  check(await value(fresh, "document.querySelector('#visitorTruth').textContent.includes('account-neutral')"), true, "verified account neutrality");

  await act(fresh, "document.querySelector('#openStudySample').click()");
  check(await value(fresh, "!document.querySelector('#studySampleBody').hidden"), true, "Study Sheet sample works");
  check(await value(fresh, "document.querySelector('#openStudySample').getAttribute('aria-expanded')"), "true", "Study sample expanded state");
  await act(fresh, `(() => {
    document.querySelector('input[name="study-check"][value="try-on"]').click();
    document.querySelector('#checkStudyAnswer').click();
  })()`);
  check(await value(fresh, "document.querySelector('#studyFeedback').textContent.startsWith('Yes.')"), true, "Study sample feedback");
  check(await value(fresh, "document.querySelector('.study-sample').textContent.includes('not an admitted Study Sheet')"), true, "Study sample admission limit");

  const storageBeforeCards = await value(fresh, "localStorage.length");
  await act(fresh, "document.querySelector('.practice-card').click()");
  check(await value(fresh, "document.querySelector('.practice-card').getAttribute('aria-pressed')"), "true", "card flip works");
  check(await value(fresh, "localStorage.length"), storageBeforeCards, "card sample saves no ownership");
  check(await value(fresh, "document.querySelector('.card-sample').textContent.includes('Nothing is saved, owned, earned')"), true, "card ownership limit");

  await act(fresh, `(() => {
    document.querySelector('#visitorState').value='first';
    document.querySelector('#failureState').value='none';
    document.querySelector('#scenarioForm').requestSubmit();
    scrollTo(0,0);
  })()`, 220);
  await screenshot(fresh, "desktop-1440-full.png");

  for (const fixture of ["offline", "stale", "disagreement"]) {
    const failure = await openPage(`/candidate/?visitor=returning&failure=${fixture}`);
    check(await value(failure, "document.querySelector('#orderButton').disabled"), true, `${fixture} disables order`);
    check(await value(failure, "!document.querySelector('#failureActions').hidden"), true, `${fixture} exposes recovery`);
    check(await value(failure, "document.querySelector('#inventoryStatus').textContent.includes('nothing is presented as ready')"), true, `${fixture} fails closed`);
    check(await value(failure, "document.activeElement.id"), "retryButton", `${fixture} focuses retry`);
    check(await value(failure, "document.querySelectorAll('#ticketRail a').length"), 0, `${fixture} removes current-pack links`);
    check(await value(failure, "document.querySelectorAll('#ticketRail a, #ticketRail button, #ticketRail [tabindex]:not([tabindex=\"-1\"])').length"), 0, `${fixture} removes current-pack keyboard targets`);
    check(await value(failure, "!/Available|ready next door/i.test(document.querySelector('#ticketRail').textContent)"), true, `${fixture} removes current availability claims`);
    check(await value(failure, "!/Available|ready next door/i.test(document.querySelector('#menuMini').textContent)"), true, `${fixture} removes menu availability claims`);
    check(await value(failure, "document.querySelector('.handoff-board').hidden"), true, `${fixture} hides exact component handoffs`);
    check(await value(failure, `(() => {
      const panel=document.querySelector('#episodeRack .inventory-failure');
      const style=getComputedStyle(panel);
      return {color:style.color,background:style.backgroundColor};
    })()`), {color:"rgb(23, 32, 51)",background:"rgb(255, 248, 234)"}, `${fixture} archive failure has explicit dark-on-light contrast`);
  }

  const retry = await openPage("/candidate/?visitor=returning&failure=offline");
  await screenshot(retry, "desktop-1440-offline.png");
  await act(retry, "document.querySelector('#retryButton').click()");
  check(await value(retry, "document.body.dataset.fixture"), "none", "retry returns to healthy fixture");
  check(await value(retry, "!document.querySelector('#orderButton').disabled"), true, "retry restores order");
  check(await value(retry, "document.activeElement.id"), "orderButton", "retry restores useful focus");

  const blocked = await openPage("/candidate/?visitor=local-card&failure=storage-denied");
  check(await value(blocked, "!document.querySelector('#orderButton').disabled"), true, "storage denial does not block order");
  await act(blocked, "document.querySelector('[data-drink=\"Chai latte\"]').click()");
  check(await value(blocked, "document.querySelector('#usualCopy').textContent.includes('Device memory is unavailable')"), true, "storage denial disclosed");
  check(await value(blocked, "localStorage.getItem('laidies_bs_candidate_usual_v1')"), null, "denied usual not falsely saved");
  await act(blocked, "document.querySelector('#orderButton').click()");
  check(await value(blocked, "document.querySelector('#receiptDialog').open"), true, "storage denied receipt works");
  check(await value(blocked, "document.querySelector('#receiptSummary').textContent.includes('Device memory is unavailable')"), true, "storage denied receipt truth");

  const loading = await openPage("/candidate/?visitor=first&failure=loading");
  check(await value(loading, "document.querySelector('#orderButton').disabled"), true, "loading disables order");
  check(await value(loading, "document.querySelector('#inventoryStatus').textContent.includes('Nothing is presented as ready')"), true, "loading truth");
  check(await value(loading, "document.querySelectorAll('#ticketRail a').length"), 0, "loading removes current-pack links");
  check(await value(loading, "!/Available|ready next door/i.test(document.querySelector('#ticketRail').textContent)"), true, "loading removes current availability claims");

  const mobile = await openPage("/candidate/?visitor=returning&failure=none", {
    width: 390,
    height: 844
  });
  const mobileOverflow = await value(mobile, `(() => {
    const offenders=[...document.querySelectorAll('*')].map((element) => {
      const rect=element.getBoundingClientRect();
      return {tag:element.tagName,id:element.id,className:String(element.className||''),left:rect.left,right:rect.right,width:rect.width};
    }).filter((item) => item.left < -0.5 || item.right > 390.5)
      .sort((a,b) => Math.max(b.right-390,-b.left)-Math.max(a.right-390,-a.left));
    return {scrollWidth:document.documentElement.scrollWidth,offenders:offenders.slice(0,5)};
  })()`);
  check(mobileOverflow, { scrollWidth: 390, offenders: [] }, "390px no horizontal overflow");
  check(await value(mobile, "document.querySelectorAll('#ticketRail .component-ticket').length"), 5, "mobile full inventory");
  check(await value(mobile, "getComputedStyle(document.querySelector('#orderButton')).display !== 'none'"), true, "mobile order visible");
  check(await value(mobile, "document.querySelector('#visitorTruth').textContent.includes('device-local continuity only')"), true, "mobile return truth");
  await act(mobile, "scrollTo(0,0)", 180);
  await screenshot(mobile, "mobile-390-full.png");

  for (const width of [390, 320]) {
    const mobileFailure = await openPage("/candidate/?visitor=returning&failure=offline", {
      width,
      height: width === 390 ? 844 : 700
    });
    check(await value(mobileFailure, `document.documentElement.scrollWidth <= ${width}`), true, `${width}px failure no overflow`);
    check(await value(mobileFailure, "document.querySelectorAll('#ticketRail a').length"), 0, `${width}px failure has no pack links`);
    check(await value(mobileFailure, "document.querySelectorAll('#ticketRail a, #ticketRail button, #ticketRail [tabindex]:not([tabindex=\"-1\"])').length"), 0, `${width}px failure has no pack keyboard targets`);
    await screenshot(mobileFailure, `mobile-${width}-offline-full.png`);
  }

  const reduced = await openPage("/candidate/?visitor=first&failure=none", {
    reducedMotion: true
  });
  check(await value(reduced, "matchMedia('(prefers-reduced-motion: reduce)').matches"), true, "reduced motion recognized");
  check(await value(reduced, "getComputedStyle(document.querySelector('.practice-card')).transitionDuration"), "0s", "reduced motion removes transition");

  console.log(
    `✓ BLEND & SNAP ISOLATED CANDIDATE: ${checks} checks · ` +
    "desktop/mobile/four visitor states/inventory/study/cards/failures/focus/storage/handoffs"
  );
} finally {
  clearTimeout(startupTimeout);
  chrome.kill("SIGTERM");
  server.close();
}
