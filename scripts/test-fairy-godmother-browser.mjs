#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.FAIRY_GODMOTHER_ROOT || process.cwd());
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
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"]
]);

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  const relative = pathname === "/" ? "games/fairy-godmother.html" : pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if ((!resolved.startsWith(`${root}${path.sep}`) && resolved !== root) ||
      !fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
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
const checks = [];
const prohibitedRequests = [];
const check = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};

const fixtureSuccess = {
  type: "case_success",
  caseId: "fixture-case-001",
  answer: {
    read: "You need a clear request with a reason and a date.",
    deliverable: "Hi Jordan — could I have until Thursday to finish the review?",
    reasoning: "It names the request and gives the recipient a usable date.",
    assumptions: ["Thursday is still useful."],
    unknowns: ["Whether another deadline depends on this work."],
    nextMove: "Check the date, then send it."
  },
  allowance: {
    charged: true,
    amount: 1,
    balance: 2,
    receiptId: "fixture-receipt-001"
  }
};

const fixtureStates = {
  success: { status: 200, body: fixtureSuccess },
  clarify: {
    status: 422,
    body: {
      type: "needs_information",
      message: "I need one more detail before I can help.",
      question: "Who is the message for?",
      usefulNow: "Name the audience and the deadline.",
      allowance: { charged: false }
    }
  },
  current: {
    status: 409,
    body: {
      type: "needs_verified_information",
      message: "This needs current information that the desk cannot verify yet.",
      sourcePlan: { criteria: ["Use the official policy page.", "Check its update date."] },
      allowance: { charged: false }
    }
  },
  boundary: {
    status: 422,
    body: {
      type: "boundary_response",
      message: "This preview cannot provide medical advice.",
      usefulNow: "Contact an appropriate qualified service.",
      allowance: { charged: false }
    }
  },
  outage: {
    status: 503,
    body: {
      type: "service_error",
      message: "The advice desk is unavailable. Nothing was counted.",
      allowance: { charged: false }
    }
  }
};

async function openFixture({
  state = "success",
  viewport = { width: 1280, height: 900 },
  seed = {},
  storageDenied = false
} = {}) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  await context.addInitScript(({ seed, storageDenied }) => {
    window.LAIDIES_FAIRY_WORKER_URL = "https://fixture.invalid/fairy";
    window.__FAIRY_REQUESTS__ = [];
    for (const [key, value] of Object.entries(seed)) localStorage.setItem(key, value);
    if (storageDenied) {
      for (const method of ["getItem", "setItem", "removeItem"]) {
        Object.defineProperty(Storage.prototype, method, {
          configurable: true,
          value() { throw new DOMException("Synthetic storage denial", "SecurityError"); }
        });
      }
    }
  }, { seed, storageDenied });
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (url === "https://fixture.invalid/fairy") {
      const payload = JSON.parse(route.request().postData() || "{}");
      await route.request().frame().evaluate((value) => window.__FAIRY_REQUESTS__.push(value), payload);
      const fixture = fixtureStates[state];
      return route.fulfill({
        status: fixture.status,
        contentType: "application/json",
        body: JSON.stringify(fixture.body)
      });
    }
    if (url.startsWith(origin)) return route.continue();
    prohibitedRequests.push(url);
    return route.abort();
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(`browser exception: ${error.message}`));
  await page.goto(`${origin}/games/fairy-godmother.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#wandButton").waitFor({ state: "visible" });
  return { context, page };
}

async function submit(page, prompt = "Help me ask my manager for another day to finish this review.") {
  await page.locator("#fairyQuestion").fill(prompt);
  await page.locator("#wandButton").focus();
  await page.keyboard.press("Enter");
  await page.locator("#adviceScroll.is-visible").waitFor();
  await page.waitForFunction(() => document.activeElement?.id === "adviceScroll");
}

try {
  const desktop = await openFixture();
  check(await desktop.page.locator(".fg-exterior img").isVisible(),
    "visitor sees the cottage before the tool");
  check(await desktop.page.locator(".fg-room-image").isVisible(),
    "visitor sees the parlour as the interface");
  check(await desktop.page.locator(".fairy-disclosure").isVisible(),
    "sensitive-data/currentness warning is visible before submission");
  check(await desktop.page.locator("#fgArrivalNote").innerText() ===
    "One local preview response; no account or reward is created.",
    "arrival state honestly bounds local preview and reward scope");
  check(await desktop.page.locator("#fairyMode").getAttribute("aria-label") !== null ||
    await desktop.page.locator("label[for='fairyMode']").count() === 1,
    "energy selector has an accessible name");
  check(!(await desktop.page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
  "desktop page has no horizontal overflow");
  await submit(desktop.page);
  for (const heading of [
    "FAiRY’s read",
    "Your usable answer",
    "Why this fits",
    "Assumptions to check",
    "What is still unknown",
    "Your next move"
  ]) {
    check(await desktop.page.getByText(heading, { exact: true }).count() === 1,
      `typed success renders ${heading}`);
  }
  check(await desktop.page.locator("#wisdomCount").innerText() === "1",
    "successful typed result increments visible preview count");
  check(await desktop.page.evaluate(() =>
    localStorage.getItem("laidies_free_wishes_used")) === "1",
  "successful typed result records the local preview");
  const request = await desktop.page.evaluate(() => window.__FAIRY_REQUESTS__[0]);
  check(JSON.stringify(Object.keys(request).sort()) === JSON.stringify(["energy", "prompt"]),
    "request contains only prompt and presentation energy");
  check(!JSON.stringify(request).includes("@"),
    "request does not silently append subscriber identity");
  check(await desktop.page.evaluate(() => document.activeElement?.id) === "adviceScroll",
    "completed result receives focus");
  await desktop.context.close();

  for (const state of ["clarify", "current", "boundary", "outage"]) {
    const fixture = await openFixture({ state });
    await submit(fixture.page);
    check(await fixture.page.locator("#wisdomCount").innerText() === "0",
      `${state} no-charge state does not increment visible preview count`);
    check(await fixture.page.evaluate(() =>
      localStorage.getItem("laidies_free_wishes_used")) === null,
    `${state} no-charge state does not consume local preview`);
    check((await fixture.page.locator("#scrollBody").innerText()).length > 20,
      `${state} state renders a useful explanation`);
    check(await fixture.page.evaluate(() => document.activeElement?.id) === "adviceScroll",
      `${state} state receives focus`);
    await fixture.context.close();
  }

  const returning = await openFixture({
    seed: { laidies_free_wishes_used: "1" },
    viewport: { width: 390, height: 844 }
  });
  const returningStatus = await returning.page.locator("#fgArrivalStatus").innerText();
  check(returningStatus.toLowerCase().includes("complete"),
    `returning local-preview state is visible (observed: ${returningStatus})`);
  check(!(await returning.page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
  "390px page has no horizontal overflow");
  await submit(returning.page);
  check((await returning.page.locator("#scrollBody").innerText()).includes("one-response local preview"),
    "second local request fails honestly without service call");
  check(await returning.page.evaluate(() => window.__FAIRY_REQUESTS__.length) === 0,
    "second local request does not call the service");
  await returning.context.close();

  const storageDenied = await openFixture({ storageDenied: true });
  check((await storageDenied.page.locator("#fgArrivalNote").innerText()).includes("no account or reward"),
    "storage denial preserves bounded arrival truth");
  await submit(storageDenied.page);
  check(await storageDenied.page.locator("#wisdomCount").innerText() === "1",
    "storage denial does not erase a successful in-session response");
  await storageDenied.context.close();

  const pageSource = fs.readFileSync(path.join(root, "games", "fairy-godmother.html"), "utf8");
  check(!/subscriberEmail\s*:/.test(pageSource),
    "page never submits subscriber email to the advice service");
  check(!/localStorage\.setItem\([^)]*(?:play|balance|reward)/i.test(pageSource),
    "page does not mint a local FAiRY Play, balance, or reward");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error(`FAIL FAiRY browser contract (${failures.length}/${checks.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`PASS FAiRY browser contract (${checks.length}/${checks.length})`);
console.log(`Blocked external requests: ${prohibitedRequests.length}`);
