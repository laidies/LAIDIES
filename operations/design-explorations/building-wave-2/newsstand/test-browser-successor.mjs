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

if (!fs.existsSync(CHROME)) {
  console.log("SKIP NEWSSTAND BROWSER SUCCESSOR: Google Chrome is unavailable.");
  process.exit(0);
}

const mime = (file) => ({
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg"
}[path.extname(file)] || "application/octet-stream");

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://candidate.local");
  let relative;
  if (requestUrl.pathname === "/" || requestUrl.pathname === "/candidate/") {
    relative = path.relative(ROOT, path.join(CANDIDATE, "index.html"));
  } else if (requestUrl.pathname.startsWith("/candidate/")) {
    relative = path.relative(ROOT, path.join(
      CANDIDATE,
      requestUrl.pathname.slice("/candidate/".length)
    ));
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
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-successor-"));
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let endpoint;

async function value(client, expression) {
  const result = await client.call("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ||
      result.exceptionDetails.text);
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
  await client.call("Network.enable");
  if (options.blockImage) {
    await client.call("Network.setBlockedURLs", {
      urls: ["*newsstand-paige-rack-comic-candidate-v1.png*"]
    });
  }
  if (options.disableJS) {
    await client.call("Emulation.setScriptExecutionDisabled", { value: true });
  }
  await client.call("Emulation.setDeviceMetricsOverride", {
    width: options.width || 1440,
    height: options.height || 900,
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
  await sleep(180);
  return client;
}

async function key(client, keyValue, code = keyValue) {
  const virtualKey = keyValue === "Tab" ? 9 : keyValue === " " ? 32 : 13;
  const keyDown = {
    type: keyValue === "Enter" ? "rawKeyDown" : "keyDown",
    key: keyValue,
    code,
    windowsVirtualKeyCode: virtualKey
  };
  if (keyValue === "Enter") keyDown.text = "\r";
  await client.call("Input.dispatchKeyEvent", keyDown);
  await client.call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: keyValue,
    code,
    windowsVirtualKeyCode: virtualKey
  });
  await sleep(80);
}

async function shiftTab(client) {
  await client.call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Tab",
    code: "Tab",
    modifiers: 8,
    windowsVirtualKeyCode: 9
  });
  await client.call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    modifiers: 8,
    windowsVirtualKeyCode: 9
  });
  await sleep(80);
}

async function screenshot(client, name) {
  fs.mkdirSync(EVIDENCE, { recursive: true });
  const result = await client.call("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true
  });
  fs.writeFileSync(path.join(EVIDENCE, name), Buffer.from(result.data, "base64"));
}

let checks = 0;
function check(actual, expected, label) {
  assert.deepEqual(actual, expected, label);
  checks += 1;
}

const paperLabels = `Array.from(document.querySelectorAll('[data-paper-state]'),
  (node) => node.textContent.trim())`;

try {
  endpoint = await endpointPromise;
  clearTimeout(startupTimeout);

  const baseline = await openPage("/candidate/?fixture=baseline");
  check(await value(baseline, paperLabels),
    ["quiet", "quiet", "hold", "current"],
    "baseline paper labels");
  check(await value(baseline, "document.documentElement.scrollWidth <= 1440"),
    true, "1440 baseline containment");

  for (let index = 0; index < 6; index += 1) await key(baseline, "Tab");
  check(await value(baseline, "document.activeElement.dataset.edition"),
    "tribune", "real Tab order reaches Tribune");
  await key(baseline, " ", "Space");
  check(await value(baseline, "document.activeElement.id"),
    "reader-title", "keyboard Enter opens paper and focuses reader title");
  await shiftTab(baseline);
  check(await value(baseline, "document.activeElement.id"),
    "put-back", "reader keyboard order reaches put-back");
  await key(baseline, " ", "Space");
  check(await value(baseline, "document.activeElement.dataset.edition"),
    "tribune", "keyboard put-back restores exact invoker");

  const hold = await openPage("/candidate/?fixture=hold", {
    width: 390,
    height: 844
  });
  check(await value(hold, paperLabels),
    ["desk hold", "desk hold", "desk hold", "desk hold"],
    "desk-wide hold owns every visible paper label");
  check(await value(hold, "document.documentElement.scrollWidth <= 390"),
    true, "390 hold containment");
  await value(hold, "document.querySelector('[data-edition=tribune]').focus()");
  await key(hold, " ", "Space");
  check(await value(hold, "document.activeElement.id"),
    "reader-title", "held paper keyboard activation focuses notice title");
  check(await value(hold, "document.querySelector('#reader-content').textContent.includes('editorial hold')"),
    true, "held paper shows global hold result");
  await screenshot(hold, "successor-mobile-390-global-hold.png");

  const malformed = await openPage(
    "/candidate/?fixture=malformed#label-is-not-a-truth-detector",
    { width: 320, height: 700 }
  );
  check(await value(malformed, paperLabels),
    ["desk unavailable", "desk unavailable", "desk unavailable", "desk unavailable"],
    "malformed desk owns every visible paper label");
  check(await value(malformed, "document.activeElement.id"),
    "reader-title", "malformed direct hash focuses reader title");
  check(await value(malformed, "document.querySelector('#reader-content').textContent.includes('did not load')"),
    true, "malformed direct hash fails closed");
  check(await value(malformed, "document.documentElement.scrollWidth <= 320"),
    true, "320 malformed containment");

  const retracted = await openPage(
    "/candidate/?fixture=retracted#label-is-not-a-truth-detector",
    { width: 320, height: 700 }
  );
  check(await value(retracted, "document.activeElement.id"),
    "reader-title", "retracted direct hash focuses reader title");
  check(await value(retracted, "document.querySelector('#reader-title').textContent"),
    "Retracted.", "retracted direct hash title");
  check(await value(retracted, "document.querySelector('#reader-content').textContent.includes('preserved withdrawal notice')"),
    true, "retracted direct hash notice");

  const missing = await openPage("/candidate/?fixture=baseline#does-not-exist");
  check(await value(missing, "document.activeElement.id"),
    "reader-title", "unknown direct hash focuses reader title");
  check(await value(missing, "document.querySelector('#reader-title').textContent"),
    "Story unavailable.", "unknown direct hash title");

  for (const width of [1440, 390]) {
    const fallback = await openPage("/candidate/?fixture=baseline", {
      width,
      height: width === 1440 ? 900 : 844,
      blockImage: true
    });
    check(await value(fallback, "document.querySelector('.room').dataset.artState"),
      "failed", `${width} blocked art activates room fallback`);
    check(await value(fallback, "!document.querySelector('#room-fallback').hidden"),
      true, `${width} room fallback visible`);
    check(await value(fallback, "document.querySelector('.room__paige').hidden"),
      true, `${width} failed image hidden`);
    check(await value(fallback, `document.documentElement.scrollWidth <= ${width}`),
      true, `${width} fallback containment`);
    await screenshot(fallback, `successor-${width}-room-art-fallback.png`);
  }

  const noJS = await openPage("/candidate/", {
    width: 320,
    height: 700,
    disableJS: true
  });
  check(await value(noJS, "document.querySelectorAll('.paper:disabled').length"),
    4, "no-JS has four disabled paper objects");
  check(await value(noJS, "document.querySelectorAll('[data-js-enable]:not([disabled])').length"),
    0, "no-JS leaves no dead enabled candidate control");
  check(await value(noJS, "getComputedStyle(document.querySelector('noscript .no-js')).display !== 'none'"),
    true, "no-JS boundary is visible");
  check(await value(noJS, "document.documentElement.scrollWidth <= 320"),
    true, "320 no-JS containment");
  await key(noJS, "Tab");
  check(await value(noJS, "document.activeElement.className"),
    "skip", "no-JS keyboard skips disabled controls");
  await screenshot(noJS, "successor-mobile-320-no-js.png");

  const reduced = await openPage("/candidate/?fixture=baseline", {
    reducedMotion: true
  });
  check(await value(reduced, "matchMedia('(prefers-reduced-motion: reduce)').matches"),
    true, "reduced motion is recognized");
  check(await value(reduced, "getComputedStyle(document.querySelector('.paper')).transitionDuration"),
    "0s", "reduced motion removes paper transition");

  console.log(
    `NEWSSTAND WAVE 2 SUCCESSOR BROWSER PASS checks=${checks} ` +
    "widths=1440,390,320 keyboard=real fixtures=baseline,hold,malformed,retracted,missing,image-404,no-js,reduced-motion"
  );
} finally {
  clearTimeout(startupTimeout);
  chrome.kill("SIGTERM");
  server.close();
}
