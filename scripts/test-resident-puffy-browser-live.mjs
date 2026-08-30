#!/usr/bin/env node

import path from "node:path";
import { pathToFileURL } from "node:url";

const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH.");
  process.exit(2);
}
const immutableOrigin = process.env.IMMUTABLE_ORIGIN;
if (!immutableOrigin) {
  console.error("Set IMMUTABLE_ORIGIN.");
  process.exit(2);
}
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const origins = ["https://laidies.ai", immutableOrigin.replace(/\/$/, "")];
const viewports = [
  { label: "phone", width: 390, height: 844 },
  { label: "laptop", width: 1280, height: 900 }
];
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

async function inspect(origin, viewport) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(() => {
    localStorage.setItem("laidies_resident_card_v1", JSON.stringify({
      version: 1,
      fields: { displayName: "Live verification resident" }
    }));
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));

  await page.goto(`${origin}/shop.html`, { waitUntil: "domcontentloaded" });
  await page.locator(".shop-hold").waitFor();
  await page.locator(".shop-hold").click();
  await page.locator(".puffy-picker .puffy-option").first().waitFor();
  check(await page.locator(".puffy-picker .puffy-option").count() === 10,
    `${origin} ${viewport.label} Gift Shop did not open ten-sticker picker`);
  check((await page.locator(".puffy-picker-head").innerText()).includes("Choose from your 10"),
    `${origin} ${viewport.label} Gift Shop misclassified valid Card`);
  await page.locator(".puffy-picker .puffy-option").first().click();
  await page.waitForTimeout(500);
  const saveState = await page.evaluate(() => ({
    path: location.pathname,
    statusState: document.querySelector("#shopInterestStatus")?.dataset.state || "",
    statusText: document.querySelector("#shopInterestStatus")?.textContent || "",
    board: localStorage.getItem("laidies_puffies_board") || ""
  }));
  check(saveState.statusState === "success" && saveState.statusText.includes("saved privately"),
    `${origin} ${viewport.label} Gift Shop did not save privately ` +
    `(path=${saveState.path} state=${saveState.statusState} board=${Boolean(saveState.board)})`);
  check(!(await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
  `${origin} ${viewport.label} Gift Shop overflowed horizontally`);

  await page.goto(`${origin}/handbook.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#buildings + .puffy-save-row .puffy-btn").click();
  await page.locator(".puffy-picker .puffy-option").first().waitFor();
  check(await page.locator(".puffy-picker .puffy-option").count() === 10,
    `${origin} ${viewport.label} Handbook did not open ten-sticker picker`);
  check((await page.locator(".puffy-picker-head").innerText()).includes("Choose from your 10"),
    `${origin} ${viewport.label} Handbook misclassified valid Card`);
  check(!(await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
  `${origin} ${viewport.label} Handbook overflowed horizontally`);
  check(await page.evaluate(() => Array.from(document.images)
    .filter((image) => image.getBoundingClientRect().width > 0 && image.complete && !image.naturalWidth)
    .length) === 0,
  `${origin} ${viewport.label} Handbook has a broken visible image`);
  check(errors.length === 0,
    `${origin} ${viewport.label} raised page errors: ${errors.join(" | ")}`);
  console.log(`PASS ${origin} ${viewport.label} Gift Shop + Handbook Card/Closet journey`);
  await context.close();
}

try {
  for (const origin of origins) {
    for (const viewport of viewports) await inspect(origin, viewport);
  }
} finally {
  await browser.close();
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  process.exit(1);
}
console.log(`RESIDENT PUFFY LIVE PASS (${origins.length * viewports.length} journeys)`);
