#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.cwd());
const evidenceRoot = path.join(
  root,
  "operations/product-stewards/library/evidence-concepts-101-first-book-admission-2026-08-03"
);
const candidateRoot = path.join(evidenceRoot, "candidate-root");
const candidateLibraryPath = path.join(candidateRoot, "library.html");
const playwrightRoot =
  process.env.PLAYWRIGHT_CORE_PATH ||
  "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core";
const calibrationMode = process.env.CONCEPTS_TOC_CALIBRATION === "remove-listeners";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

const checks = [];
const failures = [];
function check(value, label, detail = "") {
  checks.push(label);
  if (!value) failures.push(detail ? `${label}: ${detail}` : label);
}

const candidateSource = fs.readFileSync(candidateLibraryPath, "utf8");
check(
  !/onclick="[^"]*motionBehavior\(\)/.test(candidateSource),
  "candidate has no inline TOC handler that reaches into closure scope"
);
check(
  /function bindBookTocListeners\(toc\)/.test(candidateSource) &&
    /bindBookTocListeners\(toc\)/.test(candidateSource) &&
    /bindBookTocListeners\(mobile\)/.test(candidateSource),
  "desktop and mobile contents are bound through the shared listener"
);

let servedLibrary = candidateSource;
if (calibrationMode) {
  servedLibrary = servedLibrary
    .replace(" bindBookTocListeners(toc);", " /* calibration: desktop listener removed */")
    .replace(" if(mobile)bindBookTocListeners(mobile);", " /* calibration: mobile listener removed */");
  check(servedLibrary !== candidateSource, "calibration mutant removed the TOC listener bindings");
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "library.html";
  if (relative === "library.html") {
    response.writeHead(200, {
      "content-type": mime[".html"],
      "cache-control": "no-store"
    });
    response.end(servedLibrary);
    return;
  }
  const candidateTarget = path.resolve(candidateRoot, relative);
  const repositoryTarget = path.resolve(root, relative);
  const target = fs.existsSync(candidateTarget) ? candidateTarget : repositoryTarget;
  if (
    (!target.startsWith(candidateRoot + path.sep) && !target.startsWith(root + path.sep)) ||
    !fs.existsSync(target) ||
    fs.statSync(target).isDirectory()
  ) {
    response.writeHead(404).end("not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime[path.extname(target)] || "application/octet-stream",
    "cache-control": "no-store"
  });
  fs.createReadStream(target).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true
});

async function openConcepts(page) {
  await page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
  await page.locator('button.bk[aria-label="Preview Concepts 101"]').click();
  await page.locator("#book-preview-read").click();
  await page.waitForSelector("#rtxt h2", { state: "attached" });
  await page.waitForFunction(() => document.querySelectorAll("#rtoc a").length === 6);
}

async function exerciseEverySection(width, activation) {
  const height = width === 1440 ? 1000 : width === 390 ? 844 : 700;
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce"
  });
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.route("**/*", (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort()
  );
  await openConcepts(page);

  const selector = width === 1440 ? "#rtoc a" : "#rtoc-mobile a";
  const destinations = await page.locator(selector).evaluateAll((links) =>
    links.map((link) => link.getAttribute("href").slice(1))
  );
  check(destinations.length === 6, `${width}px ${activation}: all six contents destinations exist`);

  for (let index = 0; index < destinations.length; index += 1) {
    const sectionId = destinations[index];
    if (width !== 1440) {
      await page.locator("#mobile-toc").evaluate((details) => {
        details.open = true;
      });
    }
    const link = page.locator(`${selector}[href="#${sectionId}"]`);
    const before = await page.evaluate(({ sectionId, first }) => {
      const reader = document.getElementById("rtxt");
      reader.scrollTop = first ? reader.scrollHeight : 0;
      document.getElementById(sectionId).blur();
      return reader.scrollTop;
    }, { sectionId, first: index === 0 });

    if (activation === "mouse") {
      await link.click();
    } else {
      await link.focus();
      await page.keyboard.press("Enter");
    }
    await page.waitForTimeout(25);

    const result = await page.evaluate(({ sectionId, mobile }) => {
      const reader = document.getElementById("rtxt");
      const target = document.getElementById(sectionId);
      const rect = target.getBoundingClientRect();
      const readerRect = reader.getBoundingClientRect();
      return {
        scrollTop: reader.scrollTop,
        targetVisible: rect.top >= readerRect.top - 2 && rect.top < readerRect.bottom - 2,
        targetFocused: document.activeElement === target,
        currentDesktop: document.querySelector(`#rtoc a[href="#${sectionId}"]`)?.getAttribute("aria-current"),
        currentMobile: document.querySelector(`#rtoc-mobile a[href="#${sectionId}"]`)?.getAttribute("aria-current"),
        mobileClosed: !mobile || !document.getElementById("mobile-toc").open
      };
    }, { sectionId, mobile: width !== 1440 });

    check(
      Math.abs(result.scrollTop - before) > 5 &&
        result.targetVisible &&
        result.targetFocused &&
        result.currentDesktop === "location" &&
        result.currentMobile === "location" &&
        result.mobileClosed,
      `${width}px ${activation}: activates ${sectionId}`,
      JSON.stringify({ before, ...result, pageErrors })
    );
  }
  check(pageErrors.length === 0, `${width}px ${activation}: zero page errors`, pageErrors.join(" | "));
  await context.close();
}

try {
  for (const width of [1440, 390, 320]) {
    await exerciseEverySection(width, "mouse");
    await exerciseEverySection(width, "keyboard");
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("CONCEPTS 101 TOC ACTIVATION FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("CONCEPTS 101 TOC ACTIVATION PASS");
console.log(`checks=${checks.length}`);
console.log("widths=1440,390,320 activations=mouse,keyboard sections=6");
