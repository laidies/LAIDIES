import fs from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const url = "http://127.0.0.1:8788/operations/design-explorations/sitewide-style-championship-20260726/cycle-8j/homepage-continuous-capture-successor/ali-decision-package/index.html";
const configs = [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }];
const browser = await chromium.launch({ headless: true, executablePath: "/Users/alisoneakin/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
const results = [];
try {
  for (const config of configs) {
    const context = await browser.newContext({ viewport: { width: config.width, height: config.height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    const fact = await page.evaluate(() => ({
      viewport: [innerWidth, innerHeight],
      widths: [document.documentElement.clientWidth, document.documentElement.scrollWidth, document.body.clientWidth, document.body.scrollWidth],
      images: [...document.images].map(i => ({ src: i.getAttribute("src"), complete: i.complete, naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight, hidden: getComputedStyle(i).display === "none" || getComputedStyle(i).visibility === "hidden" }))
    }));
    const valid = fact.viewport[0] === config.width && fact.viewport[1] === config.height && fact.widths[0] === fact.widths[1] && fact.widths[2] === fact.widths[3] && fact.images.every(i => i.complete && i.naturalWidth > 0 && !i.hidden);
    if (!valid) throw new Error(`package validation failed at ${config.name}: ${JSON.stringify(fact)}`);
    results.push({ ...config, ...fact, pass: true });
    await context.close();
  }
} finally { await browser.close(); }
await fs.writeFile("PACKAGE-VALIDATION.json", `${JSON.stringify({ status: "PASS", validatedAt: new Date().toISOString(), results }, null, 2)}\n`);
console.log(JSON.stringify({ status: "PASS", results }, null, 2));
