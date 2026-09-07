import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { chromium } from "/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs";

const ROOT = "/Users/alisoneakin/Projects/laidies-newsstand-recurring-20260905";
const OUT = path.join(ROOT, "operations/product-stewards/newsstand/candidates/nvidia-reader-context-20260907/browser-review");
const ID = "nvidia-hugging-face-acquisition-sec-8k-2026-09-06";
// Set LIVE_ORIGIN only after deployment. Live mode deliberately installs no routes
// and writes separate live-* artifacts so it cannot be confused with the private preview.
const LIVE_ORIGIN = process.env.LIVE_ORIGIN?.trim();
const LIVE_MODE = Boolean(LIVE_ORIGIN);
const ORIGIN = LIVE_ORIGIN || process.env.NEWSSTAND_TEST_ORIGIN || "http://127.0.0.1:8765";
const artifact = name => path.join(OUT, `${LIVE_MODE ? "live-" : ""}${name}`);
fs.mkdirSync(OUT, { recursive: true });

let snapshotCount = 0;
let renderedStory;
let storiesBody;
let issueBody;
if (!LIVE_MODE) {
  const canonicalRaw = fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(canonicalRaw, sandbox, { filename: "newsstand-stories.js" });
  const data = structuredClone(sandbox.window.NEWSSTAND_DATA);
  const privateStory = JSON.parse(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/candidates/nvidia-reader-context-20260907/story.json"), "utf8"));
  const canonical = data.stories.find((story) => story.id === ID);
  assert.ok(canonical, "canonical NVIDIA story missing");
  // Preserve the published identity fields required by the reader contract while substituting only private candidate content.
  renderedStory = { ...canonical, ...privateStory, status: canonical.status, publishedAt: canonical.publishedAt, updatedAt: canonical.updatedAt, lastCheckedAt: canonical.lastCheckedAt, sourceApproval: canonical.sourceApproval };
  data.stories[data.stories.findIndex((story) => story.id === ID)] = renderedStory;
  storiesBody = `window.NEWSSTAND_DATA = ${JSON.stringify(data)}; window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;`;
  const issueStore = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8"));
  for (const issue of issueStore.issues || []) {
    for (let i = 0; i < (issue.stories || []).length; i += 1) {
      if (issue.stories[i].id === ID) { issue.stories[i] = structuredClone(renderedStory); snapshotCount += 1; }
    }
  }
  assert.ok(snapshotCount > 0, "NVIDIA story missing from daily snapshot store");
  issueBody = JSON.stringify(issueStore);
}

function rgb(value) {
  const match = String(value).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return match ? match.slice(1, 4).map(Number) : null;
}
function luminance([r, g, b]) {
  return [r, g, b].map((channel) => {
    const x = channel / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, x, index) => sum + x * [0.2126, 0.7152, 0.0722][index], 0);
}
function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = { mode: LIVE_MODE ? "live-unintercepted" : "private-intercepted", origin: ORIGIN, storyId: ID, snapshotOverrides: snapshotCount, widths: [], console: [], requestFailures: [] };
try {
  for (const width of [1280, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) results.console.push({ width, type: message.type(), text: message.text() });
    });
    page.on("requestfailed", (request) => results.requestFailures.push({ width, url: request.url(), failure: request.failure()?.errorText || "unknown" }));
    if (!LIVE_MODE) {
      await page.route("**/content/newsstand-stories.js**", (route) => route.fulfill({ contentType: "application/javascript", body: storiesBody }));
      await page.route("**/content/newsstand-daily-issues.json**", (route) => route.fulfill({ contentType: "application/json", body: issueBody }));
    }
    // Start on the rack and use the visitor-facing control. A hash navigation can
    // create the article DOM without proving that its sections are visibly opened.
    await page.goto(`${ORIGIN}/newsstand.html`, { waitUntil: "networkidle" });
    const storyLink = page.locator(`a[href="#${ID}"]`).filter({ hasText: "Read" }).first();
    await storyLink.click();
    await page.locator("#ns-story-title").waitFor();
    await page.locator("body.ns-story-open").waitFor();
    await page.locator(".ns-article__hero img").evaluate((image) => image.complete && image.naturalWidth > 0);
    const whatSection = page.locator(".ns-article__section").filter({ hasText: "What This Means For You" });
    const callout = page.locator(".ns-article__cocktail");
    const reveal = async (locator) => {
      await locator.scrollIntoViewIfNeeded();
      await locator.evaluate((node) => {
        const reader = document.querySelector(".ns-reader--story");
        const rail = document.querySelector(".ns-reader--story .ns-reader__rail");
        if (!reader || !rail) return;
        reader.scrollTop += node.getBoundingClientRect().top - rail.getBoundingClientRect().bottom - 12;
      });
    };
    await reveal(whatSection);
    const whatVisible = await whatSection.evaluate((node) => {
      const box = node.getBoundingClientRect();
      const rail = document.querySelector(".ns-reader--story .ns-reader__rail")?.getBoundingClientRect();
      return box.top >= (rail?.bottom || 0) && box.top < innerHeight && box.bottom > 0;
    });
    await page.screenshot({ path: artifact(`reader-visible-what-this-means-${width}.png`) });
    await reveal(callout);
    const calloutVisible = await callout.evaluate((node) => {
      const box = node.getBoundingClientRect();
      const rail = document.querySelector(".ns-reader--story .ns-reader__rail")?.getBoundingClientRect();
      return box.top >= (rail?.bottom || 0) && box.top < innerHeight && box.bottom > 0;
    });
    await page.screenshot({ path: artifact(`reader-visible-cocktail-${width}.png`) });
    const observed = await page.evaluate(({ id, expectedHero }) => {
      const story = window.NEWSSTAND_DATA.stories.find((item) => item.id === id);
      const article = document.querySelector(".ns-article");
      const hero = document.querySelector(".ns-article__hero img");
      const callout = document.querySelector(".ns-article__cocktail");
      const similar = [...document.querySelectorAll(".ns-similar-stories a")].map((a) => a.textContent.trim());
      const book = [...document.querySelectorAll(".ns-article__book-links a")].map((a) => a.textContent.trim());
      const heroBox = hero.getBoundingClientRect();
      const calloutBox = callout?.getBoundingClientRect();
      const calloutStyle = callout ? getComputedStyle(callout) : null;
      return {
        runtimeHero: story?.heroVisual?.src,
        expandedViaRackControl: document.body.classList.contains("ns-story-open") && !document.querySelector("#ns-reader")?.hidden,
        candidateTextPresent: article?.innerText.includes("A maker can also download a model and run it independently") || false,
        candidateText: article?.querySelectorAll(".ns-article__section")[2]?.innerText || "",
        hero: { width: heroBox.width, height: heroBox.height, complete: hero.complete, naturalWidth: hero.naturalWidth, naturalHeight: hero.naturalHeight, alt: hero.alt, src: hero.getAttribute("src") },
        scroll: { document: document.documentElement.scrollWidth, viewport: window.innerWidth },
        callout: callout ? { text: callout.innerText, width: calloutBox.width, left: calloutBox.left, right: calloutBox.right, foreground: calloutStyle.color, background: calloutStyle.backgroundColor } : null,
        bookLinks: book,
        similarStories: similar,
        expectedHero,
        visibleAfterScroll: { whatThisMeans: window.__browserReviewWhatVisible, cocktail: window.__browserReviewCalloutVisible }
      };
    }, { id: ID, expectedHero: renderedStory?.heroVisual?.src || "/assets/newsstand/design-20260907/hugging-face-emoji.png" });
    observed.visibleAfterScroll = { whatThisMeans: whatVisible, cocktail: calloutVisible };
    const errors = [];
    if (observed.runtimeHero !== observed.expectedHero) errors.push("runtime did not use the Hugging Face emoji heroVisual");
    if (!observed.expandedViaRackControl) errors.push("rack control did not open the full article reader");
    if (!observed.candidateTextPresent) errors.push("runtime did not show private What This Means text");
    if (!observed.visibleAfterScroll.whatThisMeans) errors.push("What This Means section did not become visible after scrollIntoView");
    if (!observed.visibleAfterScroll.cocktail) errors.push("Cocktail Party Explanation did not become visible after scrollIntoView");
    if (!observed.hero.complete || observed.hero.naturalWidth <= 0) errors.push("hero image did not load");
    if (observed.hero.width > 480.01) errors.push(`hero width ${observed.hero.width}px exceeds 480px requirement`);
    if (observed.scroll.document > observed.scroll.viewport) errors.push(`horizontal overflow: ${observed.scroll.document}px document > ${observed.scroll.viewport}px viewport`);
    if (!observed.callout || !observed.callout.text.trim()) errors.push("Cocktail Party Explanation is missing or empty");
    if (observed.callout && (observed.callout.left < -0.5 || observed.callout.right > width + 0.5)) errors.push("callout is clipped horizontally");
    if (observed.callout) {
      const fg = rgb(observed.callout.foreground), bg = rgb(observed.callout.background);
      if (!fg || !bg || contrast(fg, bg) < 4.5) errors.push("callout contrast is below 4.5:1");
    }
    if (observed.bookLinks.length !== 3) errors.push(`book links expected 3, observed ${observed.bookLinks.length}`);
    if (!observed.similarStories.length) errors.push("See similar stories is missing or empty");
    await page.locator(".ns-article").screenshot({ path: artifact(`reader-${width}.png`) });
    await whatSection.screenshot({ path: artifact(`reader-what-this-means-${width}.png`) });
    await callout.screenshot({ path: artifact(`reader-cocktail-${width}.png`) });
    results.widths.push({ width, pass: errors.length === 0, errors, observed });
    await page.close();
  }
} finally {
  await browser.close();
}
results.sha256 = Object.fromEntries(fs.readdirSync(OUT).filter((name) => name.endsWith(".png") && (LIVE_MODE ? name.startsWith("live-") : name.startsWith("reader-"))).map((name) => [name, crypto.createHash("sha256").update(fs.readFileSync(path.join(OUT, name))).digest("hex")]));
results.overallPass = results.widths.every((entry) => entry.pass) && results.console.length === 0 && results.requestFailures.length === 0;
fs.writeFileSync(artifact("results.json"), `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify({ overallPass: results.overallPass, widths: results.widths.map(({ width, pass, errors }) => ({ width, pass, errors })), console: results.console, requestFailures: results.requestFailures }, null, 2));
