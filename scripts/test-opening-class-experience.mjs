#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const moduleRoot = process.env.HIGH_PLAYWRIGHT_ROOT;
if (!moduleRoot) throw new Error("HIGH_PLAYWRIGHT_ROOT must point to a package root containing playwright-core");
const requireFromRoot = createRequire(path.join(moduleRoot, "package.json"));
const { chromium } = requireFromRoot("playwright-core");
const base = process.env.HIGH_URL || "http://127.0.0.1:8765";
const executablePath = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
].find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error("No local Chrome/Chromium executable found");

const ledger = JSON.parse(fs.readFileSync("content/site/high-learning-ledger.json", "utf8"));
const assessment = ledger.records.find((record) => record.recordId === "quiz-basics-tool-vs-model");
assert.ok(assessment, "ODC-101 assessment record is missing");

const browser = await chromium.launch({ headless: true, executablePath });
const results = [];

async function localOnly(page) {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1" || url.hostname === "localhost") await route.continue();
    else await route.abort();
  });
}

async function assertNoOverflow(page, label) {
  const metric = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  assert.ok(metric.document <= metric.viewport + 1, `${label} document overflow: ${JSON.stringify(metric)}`);
  assert.ok(metric.body <= metric.viewport + 1, `${label} body overflow: ${JSON.stringify(metric)}`);
}

try {
  for (const width of [390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await localOnly(page);
    await page.goto(`${base}/learn/class.html?c=basics-what-youre-looking-at`, { waitUntil: "networkidle" });
    await page.locator("#class-lab:not([hidden])").waitFor();
    await page.locator("#class-check:not([hidden])").waitFor();
    await page.locator("#take-home:not([hidden])").waitFor();
    await assertNoOverflow(page, `${width}px initial`);

    await page.fill("#task-map-task", "Compare two supplier quotes and flag what I should verify.");
    await page.fill("#task-map-context", "The two quotes, delivery deadline and approved budget.");
    await page.selectOption("#task-map-capability", { label: "A file or document" });
    await page.fill("#task-map-check", "Prices, exclusions, delivery claims and the final choice.");
    await page.fill("#task-map-private", "Unnecessary personal information and unrelated contracts.");
    await page.fill("#task-map-explain", "The app supplies instructions, context and tools around the model, while I still verify the result.");
    await page.click("#task-map-form button[type=submit]");
    assert.equal(await page.locator("#task-map-result").isVisible(), true);

    for (const question of assessment.questions) {
      await page.locator(`input[name="${question.id}"][value="${question.answer.replaceAll('"', '\\"')}"]`).check();
    }
    await page.click("#class-check-form button[type=submit]");
    assert.match(await page.locator("#class-check-result").textContent(), /5 of 5/);
    assert.match(await page.locator("#class-completion-status").textContent(), /Class complete/);

    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("laidies_class_progress_v1") || "{}"));
    const record = saved["basics-what-youre-looking-at|odc-101-v1"];
    assert.equal(record.mapBuilt, true);
    assert.equal(record.quizPassed, true);
    assert.equal(record.score, 5);
    assert.match(record.completedAt, /^\d{4}-\d{2}-\d{2}T/);

    await page.reload({ waitUntil: "networkidle" });
    assert.match(await page.locator("#class-completion-status").textContent(), /Class complete/);
    await assertNoOverflow(page, `${width}px completed`);
    results.push(`${width}px task map, assessment, completion restore and reflow`);
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`OPENING CLASS EXPERIENCE: PASS (${results.length} journeys)`);
results.forEach((result) => console.log(`- ${result}`));
