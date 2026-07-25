#!/usr/bin/env node
/* Local browser test only: all non-local requests are aborted. */
const { chromium } = require("../.ds-sync/node_modules/playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:41817";
const abortExternal = (page) => page.route(/^(?!http:\/\/127\.0\.0\.1:41817).*/, (route) => route.abort());

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport });
    await abortExternal(page);
    await page.goto(`${baseUrl}/postcard.html?from=ali&note=private%20message&pc=library`);
    await page.waitForSelector("#pcGrid button");
    results.push({
      name,
      url: page.url(),
      selected: await page.locator('#pcGrid button[aria-pressed="true"]').getAttribute("data-id"),
      cardCount: await page.locator("#pcGrid button").count(),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    });
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await abortExternal(page);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: () => Promise.reject(Object.assign(new Error("cancelled"), { name: "AbortError" })) });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("denied")) } });
  });
  await page.goto(`${baseUrl}/postcard.html?pc=welcome`);
  await page.waitForSelector("#pcGrid button");
  await page.locator('#pcGrid button[data-id="library"]').focus();
  await page.keyboard.press('Space');
  const selectedStatus = await page.locator("#pcStatus").textContent();
  await page.locator("#pcShare").click();
  await page.waitForTimeout(50);
  const cancelStatus = await page.locator("#pcStatus").textContent();
  await page.locator("#pcCopy").click();
  await page.waitForTimeout(50);
  results.push({
    name: "forced-failure-states",
    selectedStatus,
    cancelStatus,
    copyStatus: await page.locator("#pcStatus").textContent(),
    fallbackVisible: await page.locator("#pcCopyFallback").isVisible(),
    fallbackValue: await page.locator("#pcCopyValue").inputValue(),
    allPickerButtonsExposePressedState: await page.locator("#pcGrid button").evaluateAll((buttons) => buttons.every((button) => button.hasAttribute("aria-pressed")))
  });
  const unavailable = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await abortExternal(unavailable);
  await unavailable.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("denied")) } });
  });
  await unavailable.goto(`${baseUrl}/postcard.html?pc=welcome`);
  await unavailable.locator("#pcShare").click();
  await unavailable.waitForTimeout(50);
  results.push({
    name: "native-share-unavailable",
    status: await unavailable.locator("#pcStatus").textContent(),
    fallbackVisible: await unavailable.locator("#pcCopyFallback").isVisible()
  });
  await unavailable.close();
  const newsletter = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await abortExternal(newsletter);
  await newsletter.addInitScript(() => { window.open = () => null; });
  await newsletter.goto(`${baseUrl}/post-office.html`);
  await newsletter.locator('#po-email').fill('local-test@example.invalid');
  await newsletter.locator('#po-newsletter-form button[type="submit"]').click();
  results.push({
    name: 'blocked-newsletter-popup',
    status: await newsletter.locator('#po-newsletter-status').textContent(),
    fallbackVisible: await newsletter.locator('#po-newsletter-fallback').isVisible(),
    stillOnPostOffice: newsletter.url().endsWith('/post-office.html')
  });
  await newsletter.close();
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch((error) => { console.error(error.stack || error); process.exit(1); });
