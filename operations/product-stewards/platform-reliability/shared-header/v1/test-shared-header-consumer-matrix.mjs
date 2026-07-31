#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const siteRoot = process.cwd();
const sharedRel = "content/site/sv-global-header.js";
const captureEvidence = process.argv.includes("--evidence");
const evidenceDir = path.join(
  siteRoot,
  "operations/product-stewards/platform-reliability/shared-header/v1/evidence-candidate"
);
if (captureEvidence) fs.mkdirSync(evidenceDir, { recursive: true });
const routes = [
  { id: "homepage", path: "/index.html", kind: "homepage" },
  { id: "visitors-centre", path: "/visitors-centre.html", kind: "shared" },
  { id: "sorority-house", path: "/sorority-house.html", kind: "shared" }
];
const viewports = [
  { id: "desktop-1440", width: 1440, height: 1000 },
  { id: "mobile-390", width: 390, height: 844 },
  {
    id: "zoom-200-reflow-320",
    width: 320,
    height: 700,
    note: "320 CSS px is the reflow width of a 640px layout viewport at 200% browser zoom"
  }
];
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const fileHash = (rel) => sha256(fs.readFileSync(path.join(siteRoot, rel)));
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
  [".woff2", "font/woff2"],
  [".mp3", "audio/mpeg"],
  [".mp4", "video/mp4"]
]);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const rel = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\/+/, "");
  const target = path.resolve(siteRoot, rel);
  if (!target.startsWith(`${siteRoot}${path.sep}`) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(target).toLowerCase()) || "application/octet-stream"
  });
  fs.createReadStream(target).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const playwrightRoot = path.join(siteRoot, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true
});

async function open(route, viewport, javaScriptEnabled = true) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    javaScriptEnabled,
    reducedMotion: "reduce"
  });
  await context.route(/^https:/, (requestRoute) => requestRoute.abort());
  const page = await context.newPage();
  await page.goto(`${origin}${route.path}`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  if (javaScriptEnabled && route.kind === "shared") {
    await page.waitForSelector(".svgh-nav");
  } else if (route.kind === "homepage") {
    await page.waitForSelector(".topbar");
  }
  await page.waitForTimeout(200);
  return { context, page };
}

async function geometry(page, route) {
  return page.evaluate((kind) => {
    const header = document.querySelector(kind === "homepage" ? ".topbar" : ".sv-header");
    const nav = document.querySelector(kind === "homepage" ? ".topbar nav" : ".svgh-nav");
    const rect = (node) => {
      if (!node) return null;
      const value = node.getBoundingClientRect();
      return {
        left: Number(value.left.toFixed(2)),
        right: Number(value.right.toFixed(2)),
        width: Number(value.width.toFixed(2)),
        height: Number(value.height.toFixed(2))
      };
    };
    const descendants = header
      ? [...header.querySelectorAll("*")].filter((node) => !node.classList.contains("svgh-skip"))
      : [];
    const layoutNodes = header
      ? [...header.querySelectorAll(
          kind === "homepage" ? ":scope > .logo, :scope > nav, :scope > .menu" : ":scope > .svgh-left, :scope > .svgh-nav"
        )]
      : [];
    const descendantRight = descendants.length
      ? Math.max(...descendants.map((node) => node.getBoundingClientRect().right))
      : rect(header)?.right;
    const descendantLeft = descendants.length
      ? Math.min(...descendants.map((node) => node.getBoundingClientRect().left))
      : rect(header)?.left;
    const minNode = descendants.find((node) => node.getBoundingClientRect().left === descendantLeft);
    const maxNode = descendants.find((node) => node.getBoundingClientRect().right === descendantRight);
    const layoutLeft = layoutNodes.length
      ? Math.min(...layoutNodes.map((node) => node.getBoundingClientRect().left))
      : rect(header)?.left;
    const layoutRight = layoutNodes.length
      ? Math.max(...layoutNodes.map((node) => node.getBoundingClientRect().right))
      : rect(header)?.right;
    return {
      viewportWidth: window.innerWidth,
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      header: rect(header),
      nav: rect(nav),
      headerDescendantLeft: Number(descendantLeft.toFixed(2)),
      headerDescendantRight: Number(descendantRight.toFixed(2)),
      headerDescendantMinNode: minNode ? `${minNode.tagName.toLowerCase()}.${minNode.className}` : null,
      headerDescendantMaxNode: maxNode ? `${maxNode.tagName.toLowerCase()}.${maxNode.className}` : null,
      headerLayoutLeft: Number(layoutLeft.toFixed(2)),
      headerLayoutRight: Number(layoutRight.toFixed(2))
    };
  }, route.kind);
}

async function visualSignature(page, route) {
  return page.evaluate((kind) => {
    const header = document.querySelector(kind === "homepage" ? ".topbar" : ".sv-header");
    const nav = document.querySelector(kind === "homepage" ? ".topbar nav" : ".svgh-nav");
    const join = document.querySelector(kind === "homepage" ? ".topbar .join-btn" : ".svgh-join");
    const account = document.querySelector(kind === "homepage" ? ".topbar .signin-link" : ".svgh-signin");
    const menu = document.querySelector(kind === "homepage" ? ".topbar .menu" : ".svgh-menu-btn");
    const pick = (node, props) => {
      if (!node) return null;
      const style = getComputedStyle(node);
      return Object.fromEntries(props.map((prop) => [prop, style[prop]]));
    };
    const controlProps = [
      "display", "color", "backgroundColor", "borderColor", "borderRadius",
      "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing",
      "paddingLeft", "paddingRight", "paddingTop", "paddingBottom"
    ];
    return {
      header: pick(header, [
        "display", "position", "backgroundColor", "backgroundImage",
        "borderBottomColor", "borderBottomStyle", "borderBottomWidth",
        "fontFamily", "gap", "paddingLeft", "paddingRight"
      ]),
      nav: pick(nav, ["display", "gap", "alignItems", "flexWrap", "justifyContent"]),
      join: pick(join, controlProps),
      account: pick(account, controlProps),
      menu: pick(menu, controlProps)
    };
  }, route.kind);
}

async function sharedInteraction(page) {
  const labels = await page.locator(".svgh-nav").evaluate((node) =>
    [...node.querySelectorAll("a,button")].map((item) => item.textContent.replace(/\s+/g, " ").trim())
  );
  assert.deepEqual(labels, [
    "Latest Episode",
    "Look it up",
    "Explore SUNNYVAiLE",
    "KSVL 99.9",
    "Account status",
    "Join the town",
    "Menu"
  ]);
  const button = page.locator(".svgh-menu-btn");
  await button.focus();
  await page.keyboard.press("Enter");
  assert.equal(await button.getAttribute("aria-expanded"), "true");
  assert.equal(await page.locator("#svghPanel").getAttribute("role"), "menu");
  assert.equal(await page.locator("#svghPanel").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await button.getAttribute("aria-expanded"), "false");
  assert.equal(await page.locator("#svghPanel").isHidden(), true);
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains("svgh-menu-btn")), true);
  assert.equal(await page.locator(".svgh-skip").getAttribute("href"), "#sv-main");
}

async function homepageInteraction(page) {
  const menu = page.locator(".topbar .menu");
  if (await menu.isVisible()) {
    await menu.focus();
    await page.keyboard.press("Enter");
    assert.equal(await menu.getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator("#mobile-nav").isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-expanded"), "false");
    assert.equal(await page.locator("#mobile-nav").isHidden(), true);
    assert.equal(await page.evaluate(() => document.activeElement?.classList.contains("menu")), true);
  }
}

const results = [];
const noJs = [];
try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const { context, page } = await open(route, viewport, true);
      const measured = await geometry(page, route);
      const signature = await visualSignature(page, route);
      if (route.kind === "shared") await sharedInteraction(page);
      else await homepageInteraction(page);
      results.push({
        route: route.id,
        viewport: viewport.id,
        note: viewport.note || null,
        geometry: measured,
        visualSignature: signature,
        headerFits: measured.headerLayoutLeft >= -0.5 &&
          measured.headerLayoutRight <= viewport.width + 0.5
      });
      if (captureEvidence) {
        await page.screenshot({
          path: path.join(evidenceDir, `${route.id}-${viewport.id}.png`),
          fullPage: false
        });
      }
      await context.close();
    }

    const viewport = viewports[2];
    const { context, page } = await open(route, viewport, false);
    const measured = await geometry(page, route);
    const fallback = await page.evaluate((kind) => {
      const header = document.querySelector(kind === "homepage" ? ".topbar" : ".sv-header");
      return {
        text: header?.textContent.replace(/\s+/g, " ").trim() || "",
        linkCount: header?.querySelectorAll("a").length || 0,
        buttonCount: header?.querySelectorAll("button").length || 0
      };
    }, route.kind);
    noJs.push({
      route: route.id,
      geometry: measured,
      fallback,
      headerFits: measured.headerLayoutLeft >= -0.5 &&
        measured.headerLayoutRight <= viewport.width + 0.5
    });
    if (captureEvidence) {
      await page.screenshot({
        path: path.join(evidenceDir, `${route.id}-no-js-320.png`),
        fullPage: false
      });
    }
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const candidate = {
  status: results.every((row) => row.headerFits) && noJs.every((row) => row.headerFits)
    ? "PASS"
    : "HOLD",
  scope: "Homepage, Visitor's Centre and Sorority House shared-header consumer matrix",
  hashes: {
    sharedHeaderSha256: fileHash(sharedRel),
    homepageSha256: fileHash("index.html"),
    visitorsCentreSha256: fileHash("visitors-centre.html"),
    sororityHouseSha256: fileHash("sorority-house.html")
  },
  viewports,
  results,
  noJs,
  checks: {
    routes: routes.length,
    javascriptMatrices: results.length,
    noJsMatrices: noJs.length,
    keyboardMenuFocusEscape: true,
    navigationLabelsUnchanged: true,
    reducedMotion: true,
    zoom200ReflowProxy: true
  }
};

if (captureEvidence) {
  candidate.evidenceFiles = fs.readdirSync(evidenceDir)
    .filter((name) => name.endsWith(".png"))
    .sort()
    .map((name) => ({
      path: `evidence-candidate/${name}`,
      sha256: sha256(fs.readFileSync(path.join(evidenceDir, name)))
    }));
  fs.writeFileSync(
    path.join(evidenceDir, "matrix-result.json"),
    `${JSON.stringify(candidate, null, 2)}\n`
  );
}

console.log(JSON.stringify(candidate, null, 2));

if (process.argv.includes("--gate") && candidate.status !== "PASS") {
  const failed = results.filter((row) => !row.headerFits).map((row) => `${row.route}/${row.viewport}`)
    .concat(noJs.filter((row) => !row.headerFits).map((row) => `${row.route}/no-js`));
  console.error(`SHARED HEADER CONSUMER MATRIX FAIL failed=${failed.join(",")}`);
  process.exitCode = 1;
} else {
  console.log(
    `SHARED HEADER CONSUMER MATRIX ${candidate.status} routes=${routes.length} ` +
    `js=${results.length} no_js=${noJs.length} keyboard=3 zoom200_proxy=3`
  );
}
