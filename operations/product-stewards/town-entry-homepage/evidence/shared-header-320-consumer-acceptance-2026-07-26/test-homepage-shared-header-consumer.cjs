const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const root = process.cwd();
const evidenceDir = __dirname;
const expected = {
  sharedHeader: "807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa",
  homepage: "c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772",
  startHere: "a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0",
  receipt: "299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049"
};
const files = {
  sharedHeader: "content/site/sv-global-header.js",
  homepage: "index.html",
  startHere: "start-here.html",
  receipt: "operations/product-stewards/platform-reliability/shared-header/v1/shared-header-320-repair-candidate-v1-2026-07-26.json"
};
const mime = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg"
};
const viewports = [
  { id: "desktop-1440", width: 1440, height: 900 },
  { id: "mobile-390", width: 390, height: 844 },
  { id: "reflow-320", width: 320, height: 760 }
];

function sha(relative) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
}

function server() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    const relative = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.replace(/^\/+/, ""));
    const absolute = path.resolve(root, relative);
    if (!absolute.startsWith(root + path.sep)) {
      response.writeHead(403).end("forbidden");
      return;
    }
    fs.readFile(absolute, (error, body) => {
      if (error) {
        response.writeHead(error.code === "ENOENT" ? 404 : 500).end("not found");
        return;
      }
      response.writeHead(200, {
        "content-type": mime[path.extname(absolute)] || "application/octet-stream",
        "cache-control": "no-store"
      });
      response.end(body);
    });
  });
}

async function open(browser, base, pathname, viewport, javaScriptEnabled) {
  const context = await browser.newContext({ viewport, javaScriptEnabled, reducedMotion: "reduce" });
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  const localRequests = [];
  page.on("request", (request) => {
    if (request.url().startsWith(base)) localRequests.push(new URL(request.url()).pathname);
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !/ERR_FAILED|Failed to load resource/.test(message.text())) {
      errors.push(message.text());
    }
  });
  await page.goto(base + pathname, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(javaScriptEnabled ? 350 : 50);
  return { context, page, errors, localRequests };
}

async function homepageState(page) {
  return page.evaluate(() => {
    const header = document.querySelector(".topbar");
    const menu = header.querySelector(".menu");
    const logo = header.querySelector(".logo");
    const headerRect = header.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const style = getComputedStyle(header);
    const visibleLayoutRight = Math.max(logoRect.right, menuRect.right);
    const links = (selector) => [...document.querySelectorAll(selector)].map((node) => ({
      text: node.textContent.replace(/\s+/g, " ").trim(),
      href: node.getAttribute("href")
    }));
    return {
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      header: {
        left: Number(headerRect.left.toFixed(2)),
        right: Number(headerRect.right.toFixed(2)),
        height: Number(headerRect.height.toFixed(2)),
        visibleLayoutRight: Number(visibleLayoutRight.toFixed(2)),
        backgroundImage: style.backgroundImage,
        fontFamily: style.fontFamily,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight
      },
      primaryLinks: links(".topbar nav a"),
      mobileLinks: links("#mobile-nav a"),
      heroLinks: links(".hero-jumps.entry-three a"),
      sharedMounted: document.querySelectorAll("[data-svgh-mounted='1']").length,
      sharedNavs: document.querySelectorAll(".svgh-nav").length,
      sharedSkips: document.querySelectorAll(".svgh-skip").length,
      sharedStyleInjected: [...document.querySelectorAll("style")].some((node) =>
        node.textContent.includes(".svgh-nav .svgh-join")
      ),
      menuVisible: getComputedStyle(menu).display !== "none"
    };
  });
}

(async () => {
  for (const [key, relative] of Object.entries(files)) {
    assert.equal(sha(relative), expected[key], `${relative} hash changed`);
  }

  const staticServer = server();
  await new Promise((resolve) => staticServer.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${staticServer.address().port}`;
  const browser = await chromium.launch({ headless: true });
  const result = {
    candidateId: "SVGH-320-2026-07-26-v1",
    generatedAt: new Date().toISOString(),
    status: "PASS",
    hashes: expected,
    cases: {}
  };
  const primaryExpected = [
    ["Current status", "#current"],
    ["Start learning", "/start-here.html"],
    ["Look it up", "#reference"],
    ["Activities", "#activities"],
    ["Explore SUNNYVAiLE", "#town"],
    ["KSVL 99.9", "/radio.html"],
    ["Account status", "/post-office.html#signin"],
    ["Join the town", "/maikeover.html"]
  ].map(([text, href]) => ({ text, href }));
  const mobileExpected = primaryExpected.map((item) =>
    item.href === "/radio.html" ? { text: "Visit KSVL 99.9", href: item.href } : item
  );
  const heroExpected = [
    { text: "Start at the Welcome Wagon", href: "/start-here.html" },
    { text: "Read Episode 04 · published June 24", href: "/issues/issue-04.html" },
    { text: "Look up one answer", href: "#reference" }
  ];

  try {
    for (const viewport of viewports) {
      const scene = await open(browser, base, "/?entry_state=first", viewport, true);
      const state = await homepageState(scene.page);
      assert.equal(state.documentWidth, state.clientWidth, `${viewport.id} document overflow`);
      assert.equal(state.header.left, 0);
      assert.equal(state.header.right, viewport.width);
      assert.ok(state.header.visibleLayoutRight <= viewport.width, `${viewport.id} header overflow`);
      assert.deepEqual(state.primaryLinks, primaryExpected);
      assert.deepEqual(state.mobileLinks, mobileExpected);
      assert.deepEqual(state.heroLinks, heroExpected);
      assert.equal(state.sharedMounted, 0, "shared header unexpectedly mounted on Homepage");
      assert.equal(state.sharedNavs, 0, "shared nav unexpectedly appeared on Homepage");
      assert.equal(state.sharedSkips, 0, "shared skip unexpectedly appeared on Homepage");
      assert.equal(state.sharedStyleInjected, false, "shared style unexpectedly injected on Homepage");
      assert.match(state.header.backgroundImage, /linear-gradient/);
      assert.match(state.header.fontFamily, /Jost/);
      if (viewport.width === 1440) {
        assert.equal(state.header.height, 76);
        assert.equal(state.header.paddingLeft, "72px");
        assert.equal(state.header.paddingRight, "72px");
        assert.equal(state.menuVisible, false);
      } else {
        assert.equal(state.header.height, 54);
        assert.equal(state.header.paddingLeft, "18px");
        assert.equal(state.header.paddingRight, "18px");
        assert.equal(state.menuVisible, true);
        const menu = scene.page.locator(".topbar .menu");
        await menu.focus();
        await scene.page.keyboard.press("Enter");
        assert.equal(await menu.getAttribute("aria-expanded"), "true");
        assert.equal(await scene.page.locator("#mobile-nav").isVisible(), true);
        await scene.page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
        assert.equal(await scene.page.locator("#mobile-nav").isHidden(), true);
        assert.equal(await scene.page.evaluate(() => document.activeElement === document.querySelector(".topbar .menu")), true);
      }
      assert.ok(scene.localRequests.includes("/content/site/sv-global-header.js"));
      assert.deepEqual(scene.errors, []);
      await scene.page.screenshot({
        path: path.join(evidenceDir, `homepage-${viewport.id}.png`),
        fullPage: false
      });
      result.cases[`homepage-${viewport.id}`] = { status: "PASS", state };
      await scene.context.close();
    }

    const homepageNoJs = await open(browser, base, "/", viewports[2], false);
    const noJsState = await homepageState(homepageNoJs.page);
    assert.equal(noJsState.documentWidth, noJsState.clientWidth);
    assert.deepEqual(noJsState.primaryLinks, primaryExpected);
    assert.deepEqual(noJsState.mobileLinks, mobileExpected);
    assert.deepEqual(noJsState.heroLinks, heroExpected);
    assert.equal(noJsState.sharedMounted, 0);
    assert.equal(await homepageNoJs.page.locator('.hero-jumps.entry-three a[href="/start-here.html"]').count(), 1);
    assert.equal(await homepageNoJs.page.locator('.hero-jumps.entry-three a[href="/issues/issue-04.html"]').count(), 1);
    assert.equal(await homepageNoJs.page.locator('.hero-jumps.entry-three a[href="#reference"]').count(), 1);
    assert.deepEqual(homepageNoJs.errors, []);
    await homepageNoJs.page.screenshot({
      path: path.join(evidenceDir, "homepage-no-js-320.png"),
      fullPage: false
    });
    result.cases["homepage-no-js-320"] = {
      status: "PASS",
      limitation: "Mobile header Menu is inert without JavaScript; the three ordinary hero routes remain usable.",
      state: noJsState
    };
    await homepageNoJs.context.close();

    for (const viewport of viewports) {
      const scene = await open(browser, base, "/start-here.html", viewport, true);
      const state = await scene.page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        links: [...document.querySelectorAll("header a")].map((node) => ({
          text: node.textContent.replace(/\s+/g, " ").trim(),
          href: node.getAttribute("href")
        })),
        sharedMounted: document.querySelectorAll("[data-svgh-mounted='1']").length,
        sharedNavs: document.querySelectorAll(".svgh-nav").length
      }));
      assert.equal(state.documentWidth, state.clientWidth);
      assert.deepEqual(state.links, [
        { text: "LAiDIES", href: "/" },
        { text: "Back to the Homepage", href: "/" }
      ]);
      assert.equal(state.sharedMounted, 0);
      assert.equal(state.sharedNavs, 0);
      assert.equal(scene.localRequests.includes("/content/site/sv-global-header.js"), false);
      assert.equal(scene.page.url(), `${base}/start-here.html`);
      assert.deepEqual(scene.errors, []);
      result.cases[`start-here-${viewport.id}`] = { status: "PASS", state };
      await scene.context.close();
    }

    const startNoJs = await open(browser, base, "/start-here.html", viewports[2], false);
    assert.equal(await startNoJs.page.locator('noscript a[href="/visitors-centre.html"]').count(), 1);
    assert.equal(await startNoJs.page.locator('header a[href="/"]').count(), 2);
    assert.equal(await startNoJs.page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    assert.deepEqual(startNoJs.errors, []);
    result.cases["start-here-no-js-320"] = { status: "PASS" };
    await startNoJs.context.close();

    fs.writeFileSync(path.join(evidenceDir, "independent-matrix.json"), JSON.stringify(result, null, 2) + "\n");
    process.stdout.write(JSON.stringify({
      status: result.status,
      candidateId: result.candidateId,
      hashes: result.hashes,
      cases: Object.keys(result.cases).length
    }, null, 2) + "\n");
  } finally {
    await browser.close();
    await new Promise((resolve) => staticServer.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
