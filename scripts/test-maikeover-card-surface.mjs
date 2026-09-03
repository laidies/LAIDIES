#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}

const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"]
]);
const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  const relative = requestUrl.pathname === "/"
    ? "maikeover.html"
    : requestUrl.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved) ||
      fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(resolved)) || "application/octet-stream"
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

async function blockExternal(context) {
  await context.route("**/*", (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort());
}

try {
  const local = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await blockExternal(local);
  const localPage = await local.newPage();
  await localPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await localPage.locator("#moResidentNo").waitFor({ state: "visible" });
  const localNumber = await localPage.locator("#moResidentNo").innerText();
  check(localNumber === "No. NEW",
    `device-only Card number is ${JSON.stringify(localNumber)}, not "No. NEW"`);
  await local.close();

  const account = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await account.addInitScript(() => {
    window.__LAIDIES_MAIKEOVER_ACCOUNT_PREFLIGHT__ = true;
    window.__LAIDIES_MAIKEOVER_PREFLIGHT_FIXTURE_ID__ = "synthetic-number-4821";
    window.__LAIDIES_MAIKEOVER_PREFLIGHT_CLIENT__ = {
      auth: {
        getSession: async () => ({
          data: { session: { user: { id: "synthetic-resident" } } },
          error: null
        })
      },
      rpc: async (name) => name === "get_my_resident_state_v1"
        ? {
            data: {
              state: "account-backed-resident",
              profile: { resident_number: 4821 },
              card: null
            },
            error: null
          }
        : { data: false, error: null }
    };
  });
  await blockExternal(account);
  const accountPage = await account.newPage();
  const consoleErrors = [];
  accountPage.on("console", (message) => {
    if (message.type() === "error" &&
        !message.text().includes("Failed to load resource: net::ERR_FAILED")) {
      consoleErrors.push(message.text());
    }
  });
  await accountPage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  await accountPage.waitForFunction(() =>
    document.querySelector("#moResidentNo")?.textContent === "No. 4821");
  const cardState = await accountPage.evaluate(() => {
    const header = document.querySelector("#moCard > div:first-child");
    const ai = document.querySelector(".mo-card-ai");
    return {
      number: document.querySelector("#moResidentNo").textContent,
      headerColor: getComputedStyle(header).color,
      headerSize: parseFloat(getComputedStyle(header).fontSize),
      aiSize: parseFloat(getComputedStyle(ai).fontSize),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  check(cardState.number === "No. 4821",
    "account-issued resident number did not replace the new-Card state");
  check(cardState.headerColor === "rgb(17, 24, 59)",
    "Card header is not deep ink");
  check(cardState.aiSize <= cardState.headerSize,
    "SUNNYVAiLE Ai pair is larger than the surrounding header");
  check(cardState.overflow === 0, "desktop Card surface creates horizontal overflow");
  check(consoleErrors.length === 0,
    `Card surface emitted console errors: ${consoleErrors.join(" | ")}`);
  await account.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await blockExternal(mobile);
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" });
  check(await mobilePage.evaluate(() =>
    document.documentElement.scrollWidth === document.documentElement.clientWidth),
  "mobile Card surface creates horizontal overflow");
  await mobile.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("MAiKEOVER CARD SURFACE TEST FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("MAiKEOVER CARD SURFACE TEST PASS");
console.log("states=device-local-new,account-issued-4821; visual=deep-ink-header,equal-Ai-size; responsive=desktop-mobile-no-overflow");
