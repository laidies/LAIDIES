#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const siteRoot = process.cwd();
const routeRel = "visitors-centre.html";
const sharedRel = "content/site/sv-global-header.js";
const routeBytes = fs.readFileSync(path.join(siteRoot, routeRel));
const routeHtml = routeBytes.toString("utf8");
const sharedBytes = fs.readFileSync(path.join(siteRoot, sharedRel));
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const routeLocalHeaderRule = /@media \(max-width: 340px\) \{\s*\.sv-header \{ gap: 6px !important; padding-left: 8px !important; padding-right: 8px !important; \}\s*\.svgh-nav \{ gap: 4px !important; \}\s*\.svgh-nav \.svgh-join,\s*\.svgh-nav \.svgh-signin,\s*\.svgh-nav \.svgh-menu-btn \{\s*padding: 5px 7px !important;\s*font-size: 10px !important;\s*\}\s*\}/;
const matches = routeHtml.match(new RegExp(routeLocalHeaderRule.source, "g")) || [];
assert.equal(matches.length, 1, "expected exactly one Visitor route-local shared-header containment rule");
const rawSharedHtml = routeHtml.replace(routeLocalHeaderRule, "");
assert.notEqual(rawSharedHtml, routeHtml);

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  if (url.pathname === "/platform-test/raw-shared-header.html") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(rawSharedHtml);
    return;
  }
  const targetRel = url.pathname === "/" ? routeRel : url.pathname.replace(/^\/+/, "");
  const target = path.resolve(siteRoot, targetRel);
  if (!target.startsWith(`${siteRoot}${path.sep}`) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime.get(path.extname(target).toLowerCase()) || "application/octet-stream" });
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

async function measure(route) {
  const context = await browser.newContext({
    viewport: { width: 320, height: 700 },
    reducedMotion: "reduce"
  });
  await context.route(/^https:/, (requestRoute) => requestRoute.abort());
  const page = await context.newPage();
  await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".svgh-nav");
  await page.evaluate(() => new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  ));
  const result = await page.evaluate(() => {
    const nav = document.querySelector(".svgh-nav").getBoundingClientRect();
    const header = document.querySelector(".sv-header, .site-header").getBoundingClientRect();
    return {
      viewportWidth: window.innerWidth,
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      navLeft: Number(nav.left.toFixed(2)),
      navRight: Number(nav.right.toFixed(2)),
      navWidth: Number(nav.width.toFixed(2)),
      headerLeft: Number(header.left.toFixed(2)),
      headerRight: Number(header.right.toFixed(2)),
      headerWidth: Number(header.width.toFixed(2))
    };
  });
  await context.close();
  return result;
}

let rawShared;
let visitorContained;
try {
  rawShared = await measure("/platform-test/raw-shared-header.html");
  visitorContained = await measure(`/${routeRel}`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const tolerance = 0.5;
const rawFits = rawShared.documentScrollWidth <= 320 + tolerance && rawShared.navRight <= 320 + tolerance;
const visitorFits = visitorContained.documentScrollWidth <= 320 + tolerance &&
  visitorContained.navRight <= 320 + tolerance;
assert.equal(visitorFits, true, `Visitor containment regressed: ${JSON.stringify(visitorContained)}`);

const result = {
  status: rawFits ? "PASS" : "HOLD",
  scope: "provider-neutral shared-header 320px regression characterization",
  viewport: { width: 320, height: 700 },
  rawShared,
  visitorContained,
  hashes: {
    sharedHeaderSha256: sha256(sharedBytes),
    visitorRouteSha256: sha256(routeBytes)
  },
  testRuntimeMutation: false,
  interpretation: rawFits
    ? "The shared header itself fits at 320px; downstream routes should remove local containment only under their own locks."
    : "The raw shared header exceeds 320px while the Visitor route-local containment passes. Shared Header owner repair and a separate integration lock remain required."
};

console.log(JSON.stringify(result, null, 2));

if (process.argv.includes("--gate") && !rawFits) {
  console.error(
    `SHARED HEADER 320 GATE FAIL navRight=${rawShared.navRight} ` +
    `scrollWidth=${rawShared.documentScrollWidth} viewport=320`
  );
  process.exitCode = 1;
} else {
  console.log(
    `SHARED HEADER 320 CHARACTERIZATION PASS shared_status=${result.status} ` +
    `raw_nav_right=${rawShared.navRight} visitor_nav_right=${visitorContained.navRight}`
  );
}
