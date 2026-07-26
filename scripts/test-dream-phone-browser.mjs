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
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const evidenceDir = path.join(root, "operations", "product-stewards", "dream-phone", "evidence-2026-07-25");
fs.mkdirSync(evidenceDir, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"]
]);

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  const relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) && resolved !== path.join(root, "index.html")) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  fs.readFile(resolved, (error, data) => {
    if (error) {
      response.writeHead(404).end("Not found");
      return;
    }
    response.writeHead(200, { "content-type": mime.get(path.extname(resolved)) || "application/octet-stream" });
    response.end(data);
  });
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
const canonicalLedger = JSON.parse(fs.readFileSync(path.join(root, "games", "data", "dream-phone-claim-ledger.json"), "utf8"));
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

async function hasOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await desktop.newPage();
  await page.goto(`${origin}/games/dream-phone.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#dpJustCall").waitFor({ state: "visible" });
  check(await page.evaluate(() => document.activeElement?.id === "dpJustCallTitle"), "entering Just Call did not focus its heading");
  check(await page.locator("#dpJustCallBoundary").isVisible(), "new user cannot see Just Call boundary");
  check((await page.locator("#dpJustCallBoundary").innerText()).includes("Experimental · scripted"), "new user misses experiment label");
  check(!(await hasOverflow(page)), "desktop booth has horizontal overflow");
  await page.locator("#dpJustCall [data-dp-back]").click();
  await page.waitForTimeout(100);
  check(await page.evaluate(() => document.activeElement?.id === "dpDoorCall"), "Back did not restore focus to the Just Call door");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(100);
  check(await page.evaluate(() => document.activeElement?.id === "dpJustCallTitle"), "keyboard re-entry did not focus the Just Call heading");

  const caller = page.locator("[data-dream-pick]").first();
  await caller.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1900);
  check(!(await page.locator("#dreamPhoneOutput").innerText()).startsWith("Three ways to dial"), "keyboard caller activation produced no answer");
  check(await page.evaluate(() => localStorage.getItem("laidiesSecretBadges") === null), "Just Call wrote a reward badge");

  await page.locator("#dpHistBtn").click();
  await page.locator("#dpHistClose").click();
  check(await page.evaluate(() => document.activeElement?.id === "dpHistBtn"), "history close did not restore focus");
  await page.locator("#dpHistBtn").click();
  await page.keyboard.press("Escape");
  check(await page.evaluate(() => document.activeElement?.id === "dpHistBtn"), "Escape did not restore history-button focus");
  await page.screenshot({ path: path.join(evidenceDir, "dream-phone-just-call-desktop.png"), fullPage: true });

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#dpJustCall").waitFor({ state: "visible" });
  await page.locator("#dpHistBtn").click();
  check((await page.locator("#dpHistoryList").innerText()).includes("No calls yet"), "return/reload did not reset session-only history");
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${origin}/games/dream-phone.html`, { waitUntil: "domcontentloaded" });
  await mobilePage.locator("#dpJustCall").waitFor({ state: "visible" });
  check(!(await hasOverflow(mobilePage)), "mobile booth has horizontal overflow");
  await mobilePage.screenshot({ path: path.join(evidenceDir, "dream-phone-just-call-mobile.png"), fullPage: true });
  await mobile.close();

  const zoom = await browser.newContext({ viewport: { width: 640, height: 900 } });
  const zoomPage = await zoom.newPage();
  await zoomPage.goto(`${origin}/games/dream-phone.html`, { waitUntil: "domcontentloaded" });
  await zoomPage.locator("#dpJustCall").waitFor({ state: "visible" });
  await zoomPage.evaluate(() => { document.documentElement.style.fontSize = "36px"; });
  check(!(await hasOverflow(zoomPage)), "200%-text booth approximation has horizontal overflow");
  await zoom.close();

  const reduced = await browser.newContext({ viewport: { width: 1000, height: 800 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${origin}/games/dream-phone-game.html`, { waitUntil: "networkidle" });
  check((await reducedPage.locator(".note").count()) === 0, "unexpected note before call");
  check(await reducedPage.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === "auto"), "game ignores reduced-motion scroll setting");
  await reduced.close();

  const storage = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  await storage.addInitScript(() => {
    for (const method of ["getItem", "setItem", "removeItem"]) {
      Object.defineProperty(Storage.prototype, method, { value() { throw new Error("storage disabled"); } });
    }
  });
  const storagePage = await storage.newPage();
  await storagePage.goto(`${origin}/games/dream-phone.html`, { waitUntil: "domcontentloaded" });
  await storagePage.locator("#dpJustCall").waitFor({ state: "visible" });
  await storagePage.locator("#dpDialField").fill("203");
  await storagePage.locator("#dpDialForm").press("Enter");
  await storagePage.waitForTimeout(1900);
  check(!(await storagePage.locator("#dreamPhoneOutput").innerText()).startsWith("Three ways to dial"), "storage failure broke Just Call");
  await storage.close();

  const goodGame = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const gamePage = await goodGame.newPage();
  await gamePage.goto(`${origin}/games/dream-phone-game.html`, { waitUntil: "networkidle" });
  check(JSON.stringify(await gamePage.evaluate(() => [...window.DREAM_PHONE_ROUNDS].sort())) === JSON.stringify(["sky-dancers"]), "runtime admitted deck differs from ledger");
  check((await gamePage.locator("#roundLabel").innerText()).includes("of 1"), "game does not disclose one-round admitted deck");
  check(!(await hasOverflow(gamePage)), "desktop game has horizontal overflow");
  await gamePage.locator(".contact").first().focus();
  await gamePage.keyboard.press("Enter");
  await gamePage.waitForTimeout(700);
  check(await gamePage.locator(".note").isVisible(), "keyboard call did not reveal a clue");
  await gamePage.locator(".btn-asif").click();
  check(await gamePage.evaluate(() => document.activeElement?.id === "reveal"), "verdict did not move focus to the announced result");
  check(await gamePage.locator("#reveal").getAttribute("role") === "status", "result lacks screen-reader status semantics");
  check((await gamePage.locator("#reveal").innerText()).includes("Source:"), "result lacks claim-level source");
  check((await gamePage.locator("#reveal").innerText()).includes("Limit:"), "result lacks claim-level limitation");
  check(await gamePage.locator("#next").isDisabled(), "result can be skipped without transfer reflection");
  await gamePage.locator('input[name="clause"]').first().check();
  await gamePage.locator('input[name="decisive"][value="official"]').check();
  await gamePage.locator("#changeEvidence").fill("A corrected dated primary record.");
  check(!(await gamePage.locator("#next").isDisabled()), "completed transfer reflection did not enable Next");
  await gamePage.locator("#next").click();
  check(await gamePage.evaluate(() => document.activeElement?.id === "finalCard"), "final transition did not focus the final result");
  check((await gamePage.locator("#final").innerText()).includes("not mastery"), "final result still implies mastery");
  await gamePage.screenshot({ path: path.join(evidenceDir, "dream-phone-game-admitted-deck.png"), fullPage: true });
  await goodGame.close();

  async function expectClosed(name, mutate, status = 200, currentDate = "2026-07-25") {
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    await context.addInitScript((value) => { window.__DREAM_PHONE_TODAY = value; }, currentDate);
    const badPage = await context.newPage();
    await badPage.route("**/games/data/dream-phone-claim-ledger.json", (route) => {
      if (status !== 200) return route.fulfill({ status, body: "Not found" });
      const candidate = structuredClone(canonicalLedger);
      const body = mutate ? mutate(candidate) : candidate;
      return route.fulfill({ status: 200, contentType: "application/json", body: typeof body === "string" ? body : JSON.stringify(body) });
    });
    await badPage.goto(`${origin}/games/dream-phone-game.html`, { waitUntil: "networkidle" });
    check((await badPage.locator("#roundLabel").innerText()) === "Deck unavailable", `${name} did not fail closed`);
    check(await badPage.locator(".btn-real").isDisabled(), `${name} left verdict enabled`);
    await context.close();
  }

  await expectClosed("missing ledger", null, 404);
  await expectClosed("malformed ledger", () => "{\"schemaVersion\":99}");
  await expectClosed("stale policy ledger", (ledger) => { ledger.policy.nextReviewBy = "2026-07-24"; return ledger; });
  await expectClosed("stale admitted round", (ledger) => { ledger.rounds.find((item) => item.id === "sky-dancers").reviewBy = "2026-07-24"; return ledger; });
  await expectClosed("correction-required ledger", (ledger) => { ledger.correctionStatus = "CORRECTION_REVIEW_REQUIRED"; return ledger; });
  await expectClosed("changed source URL", (ledger) => { ledger.rounds.find((item) => item.id === "sky-dancers").source.url = "https://example.invalid/changed"; return ledger; });
  await expectClosed("changed claim text", (ledger) => { ledger.rounds.find((item) => item.id === "sky-dancers").claims[0].text = "Changed claim"; return ledger; });
  await expectClosed("duplicate round ID", (ledger) => { ledger.rounds.push(structuredClone(ledger.rounds[0])); return ledger; });
  await expectClosed("unknown admitted round", (ledger) => { const round = structuredClone(ledger.rounds[0]); round.id = "unknown-round"; ledger.rounds.push(round); return ledger; });
  await expectClosed("held-only ledger", (ledger) => { ledger.rounds.forEach((item) => { item.status = "HOLD"; item.reason ||= "Test hold"; }); return ledger; });
  for (const impossible of [
    "2026-02-29", "2026-02-30", "2026-02-31", "2026-00-10",
    "2026-13-10", "2026-01-00", "2026-01-32", "2026-04-31"
  ]) {
    await expectClosed(`impossible ledger checkedAt ${impossible}`, (ledger) => { ledger.checkedAt = impossible; return ledger; });
  }
  await expectClosed("impossible policy nextReviewBy", (ledger) => { ledger.policy.nextReviewBy = "2026-11-31"; return ledger; });
  await expectClosed("impossible admitted reviewBy", (ledger) => { ledger.rounds.find((item) => item.id === "sky-dancers").reviewBy = "2027-02-29"; return ledger; });
  await expectClosed("impossible source checkedAt", (ledger) => { ledger.rounds.find((item) => item.id === "sky-dancers").source.checkedAt = "2026-06-31"; return ledger; });
  await expectClosed("impossible correction date", (ledger) => { ledger.rounds.find((item) => item.id === "mortal-kombat").correctionDate = "2026-02-30"; return ledger; });
  await expectClosed("future ledger checkedAt", (ledger) => { ledger.checkedAt = "2026-07-26"; return ledger; });
  await expectClosed("future admitted-source checkedAt", (ledger) => { ledger.rounds.find((item) => item.id === "sky-dancers").source.checkedAt = "2026-07-26"; return ledger; });
  await expectClosed("future held-source checkedAt", (ledger) => { ledger.rounds.find((item) => item.id === "mortal-kombat").source.checkedAt = "2026-07-26"; return ledger; });
  await expectClosed("future round correction date", (ledger) => { ledger.rounds.find((item) => item.id === "mortal-kombat").correctionDate = "2026-07-26"; return ledger; });
  await expectClosed("future claim correction date", (ledger) => { ledger.rounds.find((item) => item.id === "mortal-kombat").claims[0].correctionDate = "2026-07-26"; return ledger; });

  const leapContext = await browser.newContext({
    viewport: { width: 1000, height: 800 },
    timezoneId: "Pacific/Kiritimati"
  });
  await leapContext.addInitScript(() => { window.__DREAM_PHONE_TODAY = "2024-02-29"; });
  const leapPage = await leapContext.newPage();
  await leapPage.route("**/games/data/dream-phone-claim-ledger.json", (route) => {
    const ledger = structuredClone(canonicalLedger);
    ledger.checkedAt = "2024-02-29";
    ledger.policy.nextReviewBy = "2024-02-29";
    for (const item of ledger.rounds) {
      if (item.reviewBy) item.reviewBy = "2024-02-29";
      if (item.source?.checkedAt) item.source.checkedAt = "2024-02-29";
      if (item.correctionDate) item.correctionDate = "2024-02-29";
      if (Array.isArray(item.claims)) {
        for (const claim of item.claims) if (claim.correctionDate) claim.correctionDate = "2024-02-29";
      }
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(ledger) });
  });
  await leapPage.goto(`${origin}/games/dream-phone-game.html`, { waitUntil: "networkidle" });
  check(JSON.stringify(await leapPage.evaluate(() => window.DREAM_PHONE_ROUNDS)) === JSON.stringify(["sky-dancers"]), "valid UTC leap-day evidence failed in an extreme browser timezone");
  check(!(await leapPage.locator(".btn-real").isDisabled()), "valid UTC leap-day evidence left verdict disabled");
  await leapContext.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("DREAM PHONE BROWSER FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("DREAM PHONE BROWSER PASS");
console.log("journeys=new,returning,keyboard-focus,result-announcement,transfer-reflection,reduced-motion,zoom-mobile-desktop,storage-failure,adversarial-evidence,strict-calendar,future-date,utc-leap-day");
console.log(`evidence=${path.relative(root, evidenceDir)}`);
