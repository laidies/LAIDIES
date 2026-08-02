#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const moduleRoot = process.env.HIGH_PLAYWRIGHT_ROOT || path.join(root, ".ds-sync");
const requireFromRoot = createRequire(path.join(moduleRoot, "package.json"));
const { chromium } = requireFromRoot("playwright-core");
const base = process.env.HIGH_URL || "http://127.0.0.1:4190";
const executablePath = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
].find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error("No local Chrome/Chromium executable found");

const ledger = JSON.parse(fs.readFileSync("content/site/high-learning-ledger.json", "utf8"));
const assessment = ledger.records.find((record) => record.recordId === "quiz-what-the-viral-reel-left-out");
assert.ok(assessment, "ODC-LAB-01 assessment record is missing");

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
    await page.goto(`${base}/learn/class.html?c=what-the-viral-reel-left-out`, { waitUntil: "networkidle" });
    await page.locator("#class-lab:not([hidden])").waitFor();
    await page.locator("#missing-middle-form:not([hidden])").waitFor();
    await page.locator("#class-check:not([hidden])").waitFor();
    await page.locator("#take-home:not([hidden])").waitFor();
    assert.equal(await page.locator("#task-map-form").isHidden(), true);
    assert.equal(await page.locator("#class-lab.class-lab--missing-middle").count(), 1);
    await assertNoOverflow(page, `${width}px initial`);

    await page.selectOption("#missing-middle-mode", "low-risk");
    await page.click("#missing-middle-load");
    assert.match(await page.inputValue("#missing-middle-claim"), /meeting notes/);
    await page.selectOption("#missing-middle-mode", "guided");
    await page.click("#missing-middle-load");
    assert.match(await page.inputValue("#missing-middle-claim"), /reusable AI skill/);

    await page.click("#missing-middle-form button[type=submit]");
    assert.equal(await page.locator("#missing-middle-result").isVisible(), true);
    assert.equal(await page.locator("#missing-middle-output dt").count(), 15);

    const downloadPromise = page.waitForEvent("download");
    await page.click("#missing-middle-download");
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), "laidies-missing-middle-workflow-card.html");

    for (const question of assessment.questions) {
      await page.locator(`input[name="${question.id}"][value="${question.answer.replaceAll('"', '\\"')}"]`).check();
    }
    await page.click("#class-check-form button[type=submit]");
    assert.match(await page.locator("#class-check-result").textContent(), /5 of 5/);
    assert.match(await page.locator("#class-completion-status").textContent(), /Class complete/);

    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("laidies_class_progress_v1") || "{}"));
    const record = saved["what-the-viral-reel-left-out|odc-lab-01-v1"];
    assert.equal(record.mapBuilt, true);
    assert.equal(record.quizPassed, true);
    assert.equal(record.score, 5);
    assert.match(record.completedAt, /^\d{4}-\d{2}-\d{2}T/);

    await page.reload({ waitUntil: "networkidle" });
    assert.match(await page.locator("#class-completion-status").textContent(), /Class complete/);
    await assertNoOverflow(page, `${width}px completed`);
    results.push(`${width}px presets, card, download, assessment, completion restore and reflow`);
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`ODC-LAB-01 CLASS EXPERIENCE: PASS (${results.length} journeys)`);
results.forEach((result) => console.log(`- ${result}`));
