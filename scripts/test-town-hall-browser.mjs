#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.TOWN_HALL_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const evidenceDir = path.resolve(
  process.env.TOWN_HALL_EVIDENCE_DIR ||
  path.join(root, "operations", "product-stewards", "town-hall", "evidence-2026-07-25")
);
fs.mkdirSync(evidenceDir, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"]
]);
const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  const relative = requestUrl.pathname === "/"
    ? "town-hall.html"
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
const checks = [];
const check = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};
const prohibitedServiceAttempts = [];

async function contextFor(
  mode = "anonymous",
  viewport = { width: 1280, height: 900 },
  blockStorage = false,
  options = {}
) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ mode, blockStorage, options }) => {
    window.__TH_FIXTURE__ = { mode, payloads: [], submits: 0 };
    window.__LAIDIES_TOWN_HALL_PREFLIGHT__ =
      "town-hall-private-inbox-repair-1";
    window.__LAIDIES_TOWN_HALL_PREFLIGHT_ADAPTER__ = {
      fixtureId: "town-hall-private-inbox-repair-1",
      getSession: async () => {
        if (window.__TH_FIXTURE__.mode === "auth-failure") {
          const error = new Error("synthetic auth failure");
          error.code = "auth";
          throw error;
        }
        if (window.__TH_FIXTURE__.mode === "signed-in") {
          return { user: { id: "synthetic-user-id", email: "must-not-be-copied@example.test" } };
        }
        return null;
      },
      submit: async (payload) => {
        window.__TH_FIXTURE__.submits += 1;
        window.__TH_FIXTURE__.payloads.push(JSON.parse(JSON.stringify(payload)));
        if (window.__TH_FIXTURE__.mode === "returned-validation") {
          return {
            error: {
              message: "Synthetic validation rejection",
              code: "23514",
              status: 400
            }
          };
        }
        if (window.__TH_FIXTURE__.mode === "returned-network") {
          return { error: { message: "Failed to fetch", code: "", status: 0 } };
        }
        if (window.__TH_FIXTURE__.mode === "thrown-abort") {
          throw new DOMException("Synthetic request abort", "AbortError");
        }
        if (window.__TH_FIXTURE__.mode === "missing-receipt") {
          return {};
        }
        return { accepted: true };
      }
    };
    if (options.oldPublicOverride) {
      delete window.__LAIDIES_TOWN_HALL_PREFLIGHT__;
      delete window.__LAIDIES_TOWN_HALL_PREFLIGHT_ADAPTER__;
      window.LAIDIES_TOWN_HALL_FEEDBACK_ADAPTER = {
        __testOnly: true,
        getSession: async () => null,
        submit: async () => {
          window.__TH_FIXTURE__.submits += 1;
          return { accepted: true };
        }
      };
    }
    if (options.storageSeed !== undefined) {
      localStorage.setItem(
        "laidies_town_hall_feedback_filed",
        options.storageSeed
      );
    }
    if (blockStorage) {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === "laidies_town_hall_feedback_filed") {
          throw new DOMException("Synthetic storage denial", "QuotaExceededError");
        }
        return original.call(this, key, value);
      };
    }
  }, { mode, blockStorage, options });
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith(origin)) return route.continue();
    if (/(supabase|jsdelivr)/i.test(url)) prohibitedServiceAttempts.push(url);
    return route.abort();
  });
  return context;
}

async function openFeedback(page) {
  await page.goto(`${origin}/town-hall.html`, { waitUntil: "domcontentloaded" });
  await page.locator('.th-hub[data-panel="hub-feedback"]').click();
  await page.locator("#town-hall-form").waitFor({ state: "visible" });
}

async function fillCard(page, type = "suggestion", subject = "Synthetic subject", body = "Synthetic private-free fixture note.") {
  const typeInput = page.locator(`input[name="th-type"][value="${type}"]`);
  await typeInput.focus();
  await page.keyboard.press("Space");
  await page.locator("#th-subject").fill(subject);
  await page.locator("#th-body").fill(body);
}

try {
  const roomContext = await contextFor();
  const roomPage = await roomContext.newPage();
  await roomPage.goto(`${origin}/town-hall.html#hub-deb`, { waitUntil: "domcontentloaded" });
  check(await roomPage.locator("#hub-deb").isVisible(), "Mayor hash opens Mayor panel");
  check(await roomPage.locator('.th-hub[data-panel="hub-deb"]').getAttribute("aria-expanded") === "true",
    "Mayor hash synchronizes expanded state");
  await roomPage.locator('.th-hub[data-panel="hub-characters"]').focus();
  await roomPage.keyboard.press("Enter");
  check(await roomPage.locator("#hub-characters").isVisible(), "keyboard opens Noticeboard panel");
  check(!(await roomPage.locator("#hub-deb").isVisible()), "opening one station closes the previous station");
  check((await roomPage.locator("#townRegularTie").innerText()).includes("on this device"),
    "Town Regular handoff discloses device-local scope");
  await roomPage.locator('.th-hub[data-panel="hub-feedback"]').click();
  await roomPage.screenshot({
    path: path.join(evidenceDir, "town-hall-desktop-feedback-synthetic.png"),
    fullPage: true
  });
  check(await roomPage.locator("#th-status").getAttribute("role") === "status",
    "feedback result has programmatic status semantics");
  await roomContext.close();

  const anonymousContext = await contextFor("anonymous");
  const anonymousPage = await anonymousContext.newPage();
  await openFeedback(anonymousPage);
  await fillCard(anonymousPage);
  await anonymousPage.locator("#town-hall-form").evaluate((form) => {
    window.__TH_LIVE_MESSAGES__ = [];
    new MutationObserver(() => window.__TH_LIVE_MESSAGES__.push(
      document.querySelector("#th-status").textContent
    )).observe(document.querySelector("#th-status"), {
      childList: true, characterData: true, subtree: true
    });
  });
  await anonymousPage.locator("#th-submit").click();
  await anonymousPage.waitForFunction(() =>
    document.querySelector("#th-status")?.dataset.state === "success");
  const anonymousPayload = await anonymousPage.evaluate(() => window.__TH_FIXTURE__.payloads[0]);
  check(JSON.stringify(Object.keys(anonymousPayload).sort()) ===
    JSON.stringify(["body", "subject", "submission_type"]),
    "anonymous payload contains only three allowed fields");
  check((await anonymousPage.locator("#th-status").innerText()).includes("delivery only"),
    "success receipt is bounded to delivery");
  check(await anonymousPage.locator("#th-body").inputValue() === "",
    "accepted card clears the body");
  check(!!(await anonymousPage.evaluate(() =>
    localStorage.getItem("laidies_town_hall_feedback_filed"))),
    "accepted card sets device-local cue");
  check((await anonymousPage.locator('.th-hub[data-panel="hub-feedback"] .th-hub__count').innerText())
    .includes("This device records one accepted card"),
    "accepted event refreshes honest station state");
  const liveMessages = await anonymousPage.evaluate(() => window.__TH_LIVE_MESSAGES__);
  check(liveMessages.some((message) => message.includes("Sending your card")),
    "filing progress is exposed through live status");
  check(liveMessages.some((message) => message.includes("Accepted by the Town Hall inbox")),
    "acceptance is exposed through live status");
  await anonymousContext.close();

  const signedContext = await contextFor("signed-in");
  const signedPage = await signedContext.newPage();
  await openFeedback(signedPage);
  await fillCard(signedPage, "complaint");
  await signedPage.locator("#th-submit").click();
  await signedPage.waitForFunction(() =>
    document.querySelector("#th-status")?.dataset.state === "success");
  const signedPayload = await signedPage.evaluate(() => window.__TH_FIXTURE__.payloads[0]);
  check(signedPayload.user_id === "synthetic-user-id", "signed-in payload uses verified session user ID");
  check(!("submitter_email" in signedPayload), "signed-in payload does not collect session email");
  await signedContext.close();

  const storageContext = await contextFor("anonymous", { width: 1280, height: 900 }, true);
  const storagePage = await storageContext.newPage();
  await openFeedback(storagePage);
  await fillCard(storagePage);
  await storagePage.locator("#th-submit").click();
  await storagePage.waitForFunction(() =>
    document.querySelector("#th-status")?.dataset.state === "success");
  check((await storagePage.locator("#th-status").innerText()).includes("Accepted"),
    "blocked local storage does not reverse accepted service receipt");
  await storageContext.close();

  for (const mode of [
    "auth-failure",
    "returned-validation",
    "returned-network",
    "thrown-abort",
    "missing-receipt"
  ]) {
    const failureContext = await contextFor(mode);
    const page = await failureContext.newPage();
    await openFeedback(page);
    await fillCard(page, "compliment", "Keep me", `Preserved ${mode} fixture.`);
    await page.locator("#th-submit").click();
    await page.waitForFunction(() =>
      document.querySelector("#th-status")?.dataset.state === "error");
    check(await page.locator("#th-subject").inputValue() === "Keep me",
      `${mode} preserves subject`);
    check((await page.locator("#th-body").inputValue()).includes(mode),
      `${mode} preserves body`);
    const definiteRejection = mode === "returned-validation";
    const authFailure = mode === "auth-failure";
    check(
      (await page.locator("#th-submit").isDisabled()) ===
        (!definiteRejection && !authFailure),
      `${mode} exposes the correct retry state`
    );
    check(!(await page.evaluate(() =>
      localStorage.getItem("laidies_town_hall_feedback_filed"))),
      `${mode} does not set accepted local cue`);
    if (authFailure) {
      check(await page.evaluate(() => window.__TH_FIXTURE__.submits) === 0,
        "auth failure sends no payload");
    }
    if (!definiteRejection && !authFailure) {
      check((await page.locator("#th-status").innerText()).includes("avoid a duplicate"),
        `${mode} warns against an immediate duplicate`);
    }
    await failureContext.close();
  }

  const mutatedContext = await contextFor("anonymous");
  const mutatedPage = await mutatedContext.newPage();
  await openFeedback(mutatedPage);
  await fillCard(mutatedPage);
  await mutatedPage.locator('input[name="th-type"]:checked').evaluate((input) => {
    input.value = "mutated-type";
  });
  await mutatedPage.locator("#th-submit").click();
  check(await mutatedPage.evaluate(() => window.__TH_FIXTURE__.submits) === 0,
    "mutated submission type is blocked by the controller allowlist");
  await mutatedPage.locator('input[name="th-type"]:checked').evaluate((input) => {
    input.value = "suggestion";
  });
  await mutatedPage.locator("#th-subject").evaluate((input) => {
    input.removeAttribute("maxlength");
    input.value = "x".repeat(101);
  });
  await mutatedPage.locator("#th-submit").click();
  check(await mutatedPage.evaluate(() => window.__TH_FIXTURE__.submits) === 0,
    "mutated 101-character subject is blocked by the controller");
  await mutatedContext.close();

  for (const [label, seed, expected] of [
    ["arbitrary string", "banana", false],
    ["malformed JSON", "{not-json", false],
    ["future receipt", JSON.stringify({
      version: 1,
      outcome: "accepted",
      acceptedAt: "2099-01-01T00:00:00.000Z"
    }), false],
    ["valid receipt", JSON.stringify({
      version: 1,
      outcome: "accepted",
      acceptedAt: new Date().toISOString()
    }), true]
  ]) {
    const receiptContext = await contextFor(
      "anonymous",
      { width: 1280, height: 900 },
      false,
      { storageSeed: seed }
    );
    const receiptPage = await receiptContext.newPage();
    await receiptPage.goto(`${origin}/town-hall.html`, { waitUntil: "domcontentloaded" });
    const recordsAccepted = (await receiptPage.locator(
      '.th-hub[data-panel="hub-feedback"] .th-hub__count'
    ).innerText()).includes("records one accepted card");
    check(recordsAccepted === expected, `${label} has the correct local receipt state`);
    await receiptContext.close();
  }

  const overrideContext = await contextFor(
    "anonymous",
    { width: 1280, height: 900 },
    false,
    { oldPublicOverride: true }
  );
  const overridePage = await overrideContext.newPage();
  await openFeedback(overridePage);
  await fillCard(overridePage);
  check(await overridePage.locator("#th-submit").isDisabled(),
    "public submit control is disabled during the release hold");
  await overridePage.locator("#town-hall-form").evaluate((form) => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  await overridePage.waitForFunction(() =>
    document.querySelector("#th-status")?.dataset.state === "error");
  check(await overridePage.evaluate(() => window.__TH_FIXTURE__.submits) === 0,
    "legacy production-global adapter cannot manufacture acceptance");
  check((await overridePage.locator("#th-status").innerText()).includes("release preflight"),
    "public controller honestly exposes the release hold");
  check(!(await overridePage.evaluate(() =>
    localStorage.getItem("laidies_town_hall_feedback_filed"))),
    "blocked legacy override cannot create a local accepted receipt");
  await overrideContext.close();

  const reducedContext = await contextFor(
    "anonymous",
    { width: 1280, height: 900 },
    false,
    { reducedMotion: true }
  );
  const reducedPage = await reducedContext.newPage();
  await reducedPage.emulateMedia({ reducedMotion: "reduce" });
  await reducedPage.goto(`${origin}/town-hall.html`, { waitUntil: "domcontentloaded" });
  await reducedPage.locator('.th-hub[data-panel="hub-feedback"]').click();
  const reducedStyles = await reducedPage.evaluate(() => {
    const chip = document.querySelector("[data-th-type-chip]");
    const submit = document.querySelector("#th-submit");
    return {
      chipTransition: getComputedStyle(chip).transitionDuration,
      submitTransition: getComputedStyle(submit).transitionDuration,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior
    };
  });
  check(reducedStyles.chipTransition === "0s", "reduced motion removes chip transitions");
  check(reducedStyles.submitTransition === "0s", "reduced motion removes submit transitions");
  check(reducedStyles.scrollBehavior !== "smooth", "reduced motion does not force smooth scrolling");
  await reducedContext.close();

  const contrastContext = await contextFor("anonymous");
  const contrastPage = await contrastContext.newPage();
  await openFeedback(contrastPage);
  await fillCard(contrastPage);
  const contrast = await contrastPage.evaluate(() => {
    function rgba(value) {
      return value.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number);
    }
    function luminance(rgb) {
      const values = rgb.map((value) => {
        const channel = value / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : Math.pow((channel + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
    }
    function ratio(element) {
      const style = getComputedStyle(element);
      const a = luminance(rgba(style.color));
      const b = luminance(rgba(style.backgroundColor));
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    }
    return {
      submit: ratio(document.querySelector("#th-submit")),
      selectedChip: ratio(document.querySelector(
        'input[name="th-type"]:checked + [data-th-type-chip]'
      )),
      selectedChipStyles: (() => {
        const chip = document.querySelector(
          'input[name="th-type"]:checked + [data-th-type-chip]'
        );
        const style = getComputedStyle(chip);
        return `${style.color} on ${style.backgroundColor}; data-selected=${chip.dataset.selected}; style=${chip.getAttribute("style")}`;
      })()
    };
  });
  check(contrast.submit >= 4.5,
    `submit computed contrast is at least 4.5:1 (${contrast.submit.toFixed(2)}:1)`);
  check(contrast.selectedChip >= 4.5,
    `selected chip computed contrast is at least 4.5:1 (${contrast.selectedChip.toFixed(2)}:1; ${contrast.selectedChipStyles})`);
  await contrastContext.close();

  const mobileContext = await contextFor("anonymous", { width: 390, height: 844 });
  const mobilePage = await mobileContext.newPage();
  await openFeedback(mobilePage);
  check(await mobilePage.evaluate(() =>
    document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
    "mobile Town Hall has no core horizontal overflow");
  const stationBoxes = await mobilePage.locator(".th-hub").evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().width));
  check(stationBoxes.every((width) => width >= 320), "mobile stations remain full-width targets");
  await mobilePage.screenshot({
    path: path.join(evidenceDir, "town-hall-mobile-feedback-synthetic.png"),
    fullPage: true
  });
  await mobileContext.close();

  check(prohibitedServiceAttempts.length === 0,
    "synthetic flows never attempted Supabase or jsDelivr");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("TOWN HALL BROWSER FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("TOWN HALL BROWSER PASS");
console.log(`checks=${checks.length}`);
console.log(`external_service_attempts=${prohibitedServiceAttempts.length}`);
console.log(`evidence=${evidenceDir}`);
