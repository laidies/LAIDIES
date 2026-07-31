const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const root = process.cwd();
const evidenceDir = __dirname;
const mime = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg"
};

function staticServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    const requested = url.pathname === "/" ? "/index.html" : url.pathname;
    const resolved = path.resolve(root, "." + decodeURIComponent(requested));
    if (!resolved.startsWith(root + path.sep)) {
      response.writeHead(403).end("forbidden");
      return;
    }
    fs.readFile(resolved, (error, body) => {
      if (error) {
        response.writeHead(error.code === "ENOENT" ? 404 : 500).end("not found");
        return;
      }
      response.writeHead(200, {
        "content-type": mime[path.extname(resolved)] || "application/octet-stream",
        "cache-control": "no-store"
      });
      response.end(body);
    });
  });
}

async function waitForMode(page, selector) {
  await page.waitForFunction((target) => {
    const node = document.querySelector(target);
    return node && ["fresh", "fail-closed"].includes(node.dataset.mode);
  }, selector);
}

async function openPage(browser, base, pathname, viewport, setup) {
  const context = await browser.newContext({ viewport });
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
  if (setup) await setup(context);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push("pageerror: " + error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !/ERR_FAILED|Failed to load resource/.test(message.text())) {
      errors.push("console: " + message.text());
    }
  });
  await page.goto(base + pathname, { waitUntil: "domcontentloaded" });
  return { context, page, errors };
}

(async () => {
  const server = staticServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({ headless: true });
  const results = { generatedAt: new Date().toISOString(), browser: "Chromium (Playwright)", cases: {} };

  try {
    const desktop = await openPage(browser, base, "/?entry_state=first", { width: 1440, height: 1100 });
    await waitForMode(desktop.page, "#entry-readiness-status");
    assert.equal(await desktop.page.locator(".hero-jumps.entry-three a").count(), 3);
    assert.equal(await desktop.page.locator("#entry-current-grid article").count(), 0);
    assert.equal(await desktop.page.locator("#entry-readiness-grid article").count(), 6);
    assert.equal(await desktop.page.locator("#entry-readiness-grid article[data-state=held]").count(), 6);
    assert.equal(await desktop.page.locator("#entry-readiness-grid h3", { hasText: "The Chick Flicks" }).count(), 1);
    assert.equal(await desktop.page.locator("#entry-readiness-grid h3", { hasText: /Episode/i }).count(), 0);
    assert.match(await desktop.page.locator("#entry-current-status").innerText(), /No owner-admitted current promotions/);
    assert.match(await desktop.page.locator("#entry-visitor-eyebrow").innerText(), /First visit/i);
    assert.match(await desktop.page.locator(".entry-episode-action").innerText(), /Episode 04 · published June 24/);
    assert.equal(await desktop.page.locator("body").innerText().then((text) => /new episode every Wednesday|latest released episode|this week'?s AI news/i.test(text)), false);
    await desktop.page.keyboard.press("Tab");
    assert.equal(await desktop.page.evaluate(() => document.activeElement === document.querySelector(".skip-link")), true);
    await desktop.page.keyboard.press("Enter");
    assert.equal(await desktop.page.evaluate(() => document.activeElement === document.querySelector("main")), true);
    assert.equal(await desktop.page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    await desktop.page.screenshot({ path: path.join(evidenceDir, "homepage-live-first-desktop-1440.png"), fullPage: true });
    const performance = await desktop.page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      return {
        domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
        loadEventMs: Math.round(navigation.loadEventEnd),
        decodedBodyBytes: Math.round(performance.getEntriesByType("resource").reduce((sum, entry) => sum + (entry.decodedBodySize || 0), 0))
      };
    });
    assert.ok(performance.domContentLoadedMs < 2500, JSON.stringify(performance));
    assert.ok(performance.decodedBodyBytes < 5 * 1024 * 1024, JSON.stringify(performance));
    assert.deepEqual(desktop.errors, []);
    results.cases.desktopFirstFresh = { status: "PASS", performance };
    await desktop.context.close();

    const returning = await openPage(browser, base, "/?entry_state=returning", { width: 390, height: 844 });
    await waitForMode(returning.page, "#entry-readiness-status");
    assert.match(await returning.page.locator("#entry-visitor-eyebrow").innerText(), /Returning/i);
    assert.match(await returning.page.locator("#entry-visitor-copy").innerText(), /does not prove identity/);
    await returning.page.locator(".menu").click();
    assert.equal(await returning.page.locator(".menu").getAttribute("aria-expanded"), "true");
    await returning.page.keyboard.press("Escape");
    assert.equal(await returning.page.locator(".menu").getAttribute("aria-expanded"), "false");
    assert.equal(await returning.page.evaluate(() => document.activeElement === document.querySelector(".menu")), true);
    assert.equal(await returning.page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    await returning.page.screenshot({ path: path.join(evidenceDir, "homepage-live-returning-mobile-390.png"), fullPage: true });
    assert.deepEqual(returning.errors, []);
    results.cases.mobileReturning = { status: "PASS" };
    await returning.context.close();

    for (const state of ["local-card", "verified-held"]) {
      const scene = await openPage(browser, base, `/?entry_state=${state}`, { width: 390, height: 844 });
      await waitForMode(scene.page, "#entry-readiness-status");
      const copy = await scene.page.locator("#entry-visitor-copy").innerText();
      assert.match(copy, state === "local-card" ? /device-local/ : /No identity or benefit is inferred/);
      assert.deepEqual(scene.errors, []);
      results.cases[state] = { status: "PASS" };
      await scene.context.close();
    }

    const expectedErrors = {
      missing: "ENVELOPE_SHAPE_INVALID",
      stale: "PROJECTION_STALE",
      conflict: "IDEMPOTENCY_CONFLICT",
      tamper: "PAYLOAD_HASH_MISMATCH"
    };
    for (const [mode, expected] of Object.entries(expectedErrors)) {
      const scene = await openPage(browser, base, `/?entry_projection=${mode}&entry_state=first`, { width: 390, height: 844 });
      await waitForMode(scene.page, "#entry-readiness-status");
      assert.equal(await scene.page.locator("#entry-readiness-status").getAttribute("data-mode"), "fail-closed");
      assert.equal(await scene.page.locator("#entry-readiness-status").getAttribute("data-error-code"), expected);
      assert.equal(await scene.page.locator("#entry-readiness-grid article[data-state=unavailable]").count(), 6);
      assert.equal(await scene.page.locator("#entry-current-grid article").count(), 0);
      assert.match(await scene.page.locator(".entry-episode-action").innerText(), /Episode 04 · published June 24/);
      assert.deepEqual(scene.errors, []);
      if (mode === "tamper") {
        await scene.page.screenshot({ path: path.join(evidenceDir, "homepage-live-tamper-mobile-390.png"), fullPage: true });
      }
      results.cases["homepage-" + mode] = { status: "PASS", errorCode: expected };
      await scene.context.close();
    }

    const start = await openPage(browser, base, "/start-here.html", { width: 1440, height: 900 });
    await waitForMode(start.page, "#start-status");
    assert.equal(await start.page.locator("#start-status").getAttribute("data-mode"), "fresh");
    assert.equal(await start.page.locator("#start-destination h2").innerText(), "The Welcome Wagon Visitor's Centre");
    assert.equal(await start.page.locator('#start-destination a[href="/visitors-centre.html"]').count(), 1);
    assert.equal(start.page.url(), base + "/start-here.html");
    await start.page.screenshot({ path: path.join(evidenceDir, "start-here-live-desktop-1440.png"), fullPage: true });
    assert.deepEqual(start.errors, []);
    results.cases.startHereFresh = { status: "PASS" };
    await start.context.close();

    for (const [mode, expected] of Object.entries(expectedErrors)) {
      const scene = await openPage(browser, base, `/start-here.html?entry_projection=${mode}`, { width: 390, height: 844 });
      await waitForMode(scene.page, "#start-status");
      assert.equal(await scene.page.locator("#start-status").getAttribute("data-mode"), "fail-closed");
      assert.equal(await scene.page.locator("#start-status").getAttribute("data-error-code"), expected);
      assert.equal(await scene.page.locator('#start-destination a[href="/visitors-centre.html"]').count(), 1);
      assert.deepEqual(scene.errors, []);
      results.cases["start-" + mode] = { status: "PASS", errorCode: expected };
      await scene.context.close();
    }

    const narrow = await openPage(browser, base, "/?entry_state=first", { width: 320, height: 760 });
    await waitForMode(narrow.page, "#entry-readiness-status");
    assert.equal(await narrow.page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    assert.deepEqual(narrow.errors, []);
    results.cases.mobile320 = { status: "PASS" };
    await narrow.context.close();

    const zoomed = await openPage(browser, base, "/?entry_state=first", { width: 640, height: 900 });
    await waitForMode(zoomed.page, "#entry-readiness-status");
    assert.equal(await zoomed.page.locator(".hero-jumps.entry-three a").count(), 3);
    assert.equal(await zoomed.page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    assert.deepEqual(zoomed.errors, []);
    results.cases.zoom200LayoutSimulation = { status: "PASS", limitation: "640 CSS-pixel viewport simulates a 1280px viewport at 200%; not native Safari/VoiceOver evidence." };
    await zoomed.context.close();

    results.summary = "PASS";
    fs.writeFileSync(path.join(evidenceDir, "live-route-matrix.json"), JSON.stringify(results, null, 2) + "\n");
    process.stdout.write(JSON.stringify(results, null, 2) + "\n");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
