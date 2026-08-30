#!/usr/bin/env node

/*
 * Local-only portrait-booth regression test.  It serves the real page and
 * scripts, substitutes the account runtime in-browser, and fulfils the
 * portrait Worker request without reaching any provider.
 *
 * PLAYWRIGHT_CORE_PATH=/.../playwright-core \
 * node scripts/test-maikeover-portraits-browser.mjs
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.MAIKEOVER_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) throw new Error("Set PLAYWRIGHT_CORE_PATH to playwright-core.");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const avatarApi = "https://laidies-avatar.wednesday-laidies.workers.dev";
const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "authorization, content-type"
};
const mime = new Map([[".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"], [".css", "text/css; charset=utf-8"], [".png", "image/png"], [".jpg", "image/jpeg"], [".webp", "image/webp"], [".svg", "image/svg+xml"], [".json", "application/json"]]);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = (url.pathname === "/" ? "maikeover.html" : url.pathname.replace(/^\/+/, ""));
  const file = path.resolve(root, relative);
  if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404).end("Not found"); return;
  }
  response.writeHead(200, { "content-type": mime.get(path.extname(file)) || "application/octet-stream" });
  fs.createReadStream(file).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const failures = [];
const proof = { origin, viewports: {}, requests: [], calibration: null };
function check(condition, message) { if (!condition) failures.push(message); }
function pngBase64(r, g, b) {
  // A browser-generated raster is created below; this fallback only exists for
  // route fulfilment before a page can yield its fixture bytes.
  return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL9wQAAAABJRU5ErkJggg==";
}
async function hasOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}
async function canvasPng(page, colour) {
  return page.evaluate((fill) => {
    const canvas = document.createElement("canvas"); canvas.width = 40; canvas.height = 40;
    const context = canvas.getContext("2d"); context.fillStyle = fill; context.fillRect(0, 0, 40, 40);
    context.fillStyle = "#ffffff"; context.fillRect(10, 8, 20, 24);
    return canvas.toDataURL("image/png").split(",")[1];
  }, colour);
}
async function makeContext({ signedIn, mode = "success" }) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  let responseMode = mode;
  let calls = 0;
  const payloads = [];
  await context.addInitScript(({ signedIn }) => {
    const session = signedIn ? { access_token: "test-access-token", user: { id: "portrait-test-user", email: "portrait-test@example.invalid" } } : null;
    window.LAIDIESResidentAccountRuntime = Object.freeze({
      get: async () => ({ client: { auth: { getSession: async () => ({ data: { session }, error: null }) } } })
    });
  }, { signedIn });
  await context.route("**/*", async (route) => {
    const request = route.request(); const url = request.url();
    if (url.startsWith(`${origin}/content/site/resident-account-runtime-v1.js`)) {
      const sessionSource = signedIn
        ? '{ access_token: "test-access-token", user: { id: "portrait-test-user", email: "portrait-test@example.invalid" } }'
        : "null";
      return route.fulfill({ contentType: "text/javascript", body: `window.LAIDIESResidentAccountRuntime=Object.freeze({get:async()=>({client:{auth:{getSession:async()=>({data:{session:${sessionSource}},error:null})}}})});` });
    }
    if (url.startsWith(avatarApi)) {
      if (request.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
      calls += 1;
      payloads.push(JSON.parse(request.postData() || "{}"));
      if (responseMode === "failure") return route.fulfill({ status: 503, headers: cors, contentType: "application/json", body: JSON.stringify({ error: "withheld" }) });
      if (responseMode === "malformed") return route.fulfill({ status: 200, headers: cors, contentType: "application/json", body: JSON.stringify({ images: ["this-is-not-a-raster"] }) });
      return route.fulfill({ status: 200, headers: cors, contentType: "application/json", body: JSON.stringify({ images: [pngBase64(), pngBase64(), pngBase64()] }) });
    }
    if (url.startsWith(origin)) return route.continue();
    return route.abort();
  });
  return { context, calls: () => calls, payloads, setMode: (next) => { responseMode = next; } };
}
async function open(context) {
  const page = await context.newPage();
  page.setDefaultTimeout(7000);
  await page.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#moMake").waitFor({ state: "attached" });
  return page;
}
async function waitForStatus(page, text) {
  try {
    await page.waitForFunction((needle) => document.querySelector("#moStatus")?.textContent.includes(needle), text);
  } catch (error) {
    throw new Error(`Expected #moStatus to include ${JSON.stringify(text)}; got ${JSON.stringify(await page.locator("#moStatus").innerText())}: ${error.message}`);
  }
}

const browser = await chromium.launch({ executablePath: chrome, headless: true });
try {
  // The production page bootstraps account runtime through sv-global-header.js
  // and resident-continuation-bootstrap-v1.js. This test supplies the same
  // narrow runtime interface to keep all provider traffic local and mocked.
  const documentText = fs.readFileSync(path.join(root, "maikeover.html"), "utf8");
  check(documentText.includes("sv-global-header.js"), "maikeover.html no longer loads sv-global-header.js, which is the account-runtime bootstrap dependency.");

  const unsigned = await makeContext({ signedIn: false });
  const unsignedPage = await open(unsigned.context);
  await unsignedPage.locator("#moDescribe").fill("a test portrait");
  await unsignedPage.locator("#moMake").click();
  await waitForStatus(unsignedPage, "Sign in first");
  check(unsigned.calls() === 0, `unsigned #moMake made ${unsigned.calls()} portrait API request(s), expected 0`);
  proof.unsignedApiCalls = unsigned.calls();
  await unsigned.context.close();

  const bad = await makeContext({ signedIn: true, mode: "malformed" });
  const badPage = await open(bad.context);
  await badPage.locator("#moDescribe").fill("calibration portrait");
  await badPage.locator("#moMake").click();
  await waitForStatus(badPage, "could not be read");
  check(await badPage.locator("#moCands button").count() === 0, "malformed candidate raster was accepted into #moCands");
  check(bad.calls() === 1, `malformed response was retried (${bad.calls()} calls)`);
  proof.calibration = { calls: bad.calls(), status: await badPage.locator("#moStatus").innerText() };
  await bad.context.close();

  const good = await makeContext({ signedIn: true });
  const page = await open(good.context);
  check(await page.locator("#moEra > button").count() === 6, "#moEra does not expose six era controls");
  check(await page.locator("#moFit > button").count() === 9, "#moFit does not expose nine outfit controls");
  check(await page.locator("#moAcc > button").count() === 11, "#moAcc does not expose eleven accessory controls");
  check(await page.locator("#moBackdrop > button").count() === 8, "#moBackdrop does not expose eight backdrop controls");
  await page.locator("#moEra > button").nth(3).click();
  await page.locator("#moFit > button").nth(4).click();
  for (let index = 0; index < 5; index += 1) await page.locator("#moAcc > button").nth(index).click();
  check(await page.locator('#moAcc > button[aria-pressed="true"]').count() === 4, "#moAcc permits more than four selected accessories");
  await page.locator("#moBackdrop > button").nth(7).click();
  await page.locator("#moDescribe").fill("a confident portrait with silver glasses");
  await page.locator("#moMake").click();
  await waitForStatus(page, "portraits ready");
  check(good.calls() === 1, `one paid scratch request caused ${good.calls()} API calls (automatic retry)`);
  const scratch = good.payloads[0] || {};
  check(typeof scratch.requestId === "string" && scratch.requestId.length > 20, "scratch request has no UUID requestId");
  check(!("image" in scratch) && typeof scratch.itemPrompt === "string", "scratch selection did not produce itemPrompt-only request");
  check(scratch.itemPrompt?.includes("year-2000") && scratch.itemPrompt?.includes("sparkly halter top") && scratch.itemPrompt?.includes("starry-night"), "#moEra/#moFit/#moAcc/#moBackdrop selections did not propagate into itemPrompt");
  check(await page.locator("#moCands button").count() === 3, "successful response does not render three #moCands choices");
  await page.locator('button[aria-label="Choose portrait 2"]').click();
  check(await page.locator("#moAvatar img").count() === 1, "chosen portrait does not preview in #moAvatar");
  await page.locator('[data-mo-tool="finish"]').click();
  await page.locator("#moSave").click();
  await page.waitForFunction(() => document.querySelector("#moSaveMsg")?.textContent.includes("Saved on this device"));
  const saved = await page.evaluate(() => localStorage.getItem("laidies_resident_card_v1"));
  check(!!saved && JSON.parse(saved).fields.cardAvatarUrl?.startsWith("data:image/jpeg;base64,"), "#moSave did not persist selected portrait in card envelope");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#moAvatar img").waitFor({ state: "attached" });
  const closet = await good.context.newPage();
  await closet.goto(`${origin}/laidies-card.html`, { waitUntil: "domcontentloaded" });
  await closet.locator("#cardAvatar").waitFor({ state: "attached" });
  await closet.waitForTimeout(150);
  check(await closet.locator("#cardAvatar img").count() === 1, "saved portrait does not render in /laidies-card.html #cardAvatar");

  // Photo is a separate paid path: no consent must be rejected before fetch.
  await page.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="moPortraitMode"][value="photo"]').check();
  const fixture = Buffer.from(await canvasPng(page, "#d45b98"), "base64");
  await page.locator("#moPhoto").setInputFiles({ name: "synthetic.png", mimeType: "image/png", buffer: fixture });
  const callsBeforeConsent = good.calls();
  await page.locator("#moMake").click();
  await waitForStatus(page, "Confirm permission");
  check(good.calls() === callsBeforeConsent, "#moPhoto without #moPhotoConsent reached the API");
  // The rejected attempt deliberately clears sensitive input, so a consented
  // retry requires the visitor to choose the local file again.
  await page.locator("#moPhoto").setInputFiles({ name: "synthetic.png", mimeType: "image/png", buffer: fixture });
  await page.locator("#moPhotoConsent").check();
  await page.locator("#moMake").click();
  await waitForStatus(page, "portraits ready");
  const photo = good.payloads.at(-1) || {};
  check(good.calls() === callsBeforeConsent + 1, "consented photo request was retried or was not sent exactly once");
  check(photo.consent === true && typeof photo.image === "string" && photo.image.startsWith("data:image/jpeg;base64,") && typeof photo.traits?.extras === "string", "photo request lacks resized JPEG, consent, or traits.extras");

  // A provider failure is allowed to consume one request but may not alter the saved Card.
  const beforeFailure = await page.evaluate(() => localStorage.getItem("laidies_resident_card_v1"));
  good.setMode("failure");
  await page.locator('input[name="moPortraitMode"][value="scratch"]').check();
  await page.locator("#moDescribe").fill("failure preservation portrait");
  await page.locator("#moMake").click();
  await waitForStatus(page, "temporarily unavailable");
  check(await page.evaluate(() => localStorage.getItem("laidies_resident_card_v1")) === beforeFailure, "provider failure changed saved card envelope");
  proof.paidRequests = good.calls();
  await good.context.close();

  for (const width of [1280, 390, 320]) {
    const narrow = await makeContext({ signedIn: true });
    const page = await open(narrow.context);
    await page.setViewportSize({ width, height: 800 });
    proof.viewports[width] = { overflow: await hasOverflow(page) };
    check(!proof.viewports[width].overflow, `horizontal overflow at ${width}px`);
    check(await page.locator('#moPortraitOptions button').evaluateAll(buttons=>buttons.every(button=>button.getBoundingClientRect().height>=44)), `portrait choices below 44px target at ${width}px`);
    if (process.env.PORTRAIT_SCREENSHOTS) {
      await page.locator('#moDescribe').scrollIntoViewIfNeeded();
      await page.screenshot({path:path.join(process.env.PORTRAIT_SCREENSHOTS,`maker-${width}.png`)});
    }
    await narrow.context.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log(JSON.stringify({ test: "maikeover-portraits-browser", proof, failures }, null, 2));
if (failures.length) process.exitCode = 1;
