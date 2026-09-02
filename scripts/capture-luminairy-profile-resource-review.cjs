#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const playwrightPath = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightPath) throw new Error("PLAYWRIGHT_CORE_PATH is required");
const { chromium } = require(playwrightPath);

const origin = process.env.LUMINAIRY_ORIGIN || "http://127.0.0.1:4173";
const destination = path.resolve(process.env.LUMINAIRY_REVIEW_DIR || path.join(__dirname, "../operations/product-stewards/luminairy/render-review-2026-09-02"));

(async () => {
  fs.mkdirSync(destination, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  try {
    for (const [name, width, height] of [["desktop", 1440, 1000], ["mobile-390", 390, 844], ["mobile-320", 320, 720]]) {
      const context = await browser.newContext({ viewport: { width, height }, isMobile: width < 500 });
      const page = await context.newPage();
      await page.goto(`${origin}/luminairy.html#mavens`, { waitUntil: "networkidle" });
      await page.locator(".lum-card").first().waitFor();
      await page.locator(".lum-card__portrait img").evaluateAll(async (images) => {
        images.forEach((image) => { image.loading = "eager"; });
        await Promise.all(images.map((image) => image.decode()));
      });
      await page.screenshot({ path: path.join(destination, `${name}-mavens.png`), fullPage: true });
      await page.getByRole("tab", { name: /TRAiLBLAZERS/ }).click();
      await page.locator(".lum-card__portrait img").evaluateAll(async (images) => {
        images.forEach((image) => { image.loading = "eager"; });
        await Promise.all(images.map((image) => image.decode()));
      });
      await page.screenshot({ path: path.join(destination, `${name}-trailblazers.png`), fullPage: true });
      await context.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`Captured exact candidate renders at ${destination}`);
})().catch((error) => { console.error(error.stack || error); process.exit(1); });
