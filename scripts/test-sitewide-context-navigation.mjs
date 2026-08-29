#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH ||
  path.join(root, ".ds-sync", "node_modules", "playwright-core");
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const script = fs.readFileSync(path.join(root, "content/site/sv-back-nav.js"));
const shell = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="padding:18px;box-sizing:border-box"><main style="position:relative;min-height:calc(100vh - 36px)"><h1>Fixture</h1><button id="bottom-action" style="position:absolute;right:10px;bottom:12px;width:220px;height:48px">Primary action</button></main><script src="/content/site/sv-back-nav.js"></script></body></html>`;

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  if (pathname === "/content/site/sv-back-nav.js") {
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8" }).end(script);
    return;
  }
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(shell);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });

async function open(pathname, { referer, mobile = false } = {}) {
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 }
  });
  const page = await context.newPage();
  await page.goto(`${origin}${pathname}`, { referer, waitUntil: "domcontentloaded" });
  return { context, page };
}

try {
  const direct = await open("/library.html", { mobile: true });
  const directControl = direct.page.locator(".sv-rail-item--back");
  await directControl.waitFor();
  assert.equal(await directControl.getAttribute("data-return-kind"), "home-fallback");
  assert.equal(await directControl.getAttribute("href"), "/");
  assert.match(await directControl.innerText(), /SUNNYVAiLE home/i);
  const directBox = await directControl.boundingBox();
  assert.ok(directBox && directBox.height >= 44 && directBox.width >= 44,
    "mobile fallback must be at least a 44px touch target");
  assert.equal(await direct.page.locator(".sv-rail-item__label").isVisible(), true,
    "mobile return label must be visible without hover");
  const action = direct.page.locator("#bottom-action");
  const actionBox = await action.boundingBox();
  assert.ok(actionBox, "mobile fixture action must render");
  const centreOwner = await direct.page.evaluate(({ x, y }) => {
    const target = document.elementFromPoint(x, y);
    return target && (target.id || target.className || target.tagName);
  }, {
    x: actionBox.x + actionBox.width / 2,
    y: actionBox.y + actionBox.height / 2
  });
  assert.equal(centreOwner, "bottom-action",
    "mobile return control must not cover a visitor action");
  assert.ok(await direct.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    "mobile rail must not widen a padded host page");
  await direct.context.close();

  const internal = await open("/library.html", {
    referer: `${origin}/visitors-centre.html?desk=front#map`,
    mobile: true
  });
  const internalControl = internal.page.locator(".sv-rail-item--back");
  await internalControl.waitFor();
  assert.equal(await internalControl.getAttribute("data-return-kind"), "previous");
  assert.equal(
    await internalControl.getAttribute("href"),
    "/visitors-centre.html?desk=front"
  );
  assert.match(await internalControl.innerText(), /Back to the Visitor’s Centre/i);
  await internal.context.close();

  const external = await open("/watch.html", {
    referer: "https://www.instagram.com/",
    mobile: true
  });
  const externalControl = external.page.locator(".sv-rail-item--back");
  await externalControl.waitFor();
  assert.equal(await externalControl.getAttribute("data-return-kind"), "home-fallback");
  assert.equal(await externalControl.getAttribute("href"), "/");
  await external.context.close();

  const home = await open("/");
  assert.equal(await home.page.locator(".sv-rail-item--back").count(), 0,
    "direct home arrival must not show a redundant home control");
  await home.context.close();

  console.log("SITEWIDE CONTEXT NAVIGATION PASS scenarios=4 mobile_touch_target=PASS");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
