const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const base = process.env.CANDIDATE_URL || "http://127.0.0.1:4173";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  async function run(name, viewport, path, check) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    await check(page);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    assert.equal(dimensions.document, dimensions.viewport, `${name}: horizontal overflow`);
    assert.deepEqual(errors, [], `${name}: console/page errors`);
    results.push({ name, viewport, path, status: "PASS" });
    await page.close();
  }

  await run("first-time desktop", { width: 1440, height: 1024 }, "/", async (page) => {
    await page.getByRole("heading", { level: 1 }).waitFor();
    assert.match(await page.locator(".visitor-banner").innerText(), /Welcome to LAiDIES/);
    assert.equal(await page.locator(".primary-actions a").count(), 3);
    assert.match(await page.locator(".news-status").innerText(), /No admitted breaking story|No alarm/i);
    assert.match(await page.locator(".news-status").innerText(), /release held/i);
    assert.equal(await page.locator(".readiness-card").count(), 6);
    assert.match(await page.locator(".projection-receipt").first().innerText(), /Platform projection.+fresh until.+SHA-256/);
    assert.match(await page.locator(".projection-meta").first().innerText(), /Owner:/);
    assert.match(await page.locator(".projection-ceiling").innerText(), /synthetic contract fixture/i);
    const projection = await page.evaluate(() =>
      fetch("/data/readiness-current-projection-v1.json").then((response) => response.json())
    );
    assert.equal(projection.envelope.payload.destinations.length, 17);
    assert.equal(projection.envelope.payload.currentContent.length, 3);
  });

  await run("returning no Card mobile", { width: 390, height: 844 }, "/?visitor=returning", async (page) => {
    const returningText = await page.locator(".visitor-banner").innerText();
    assert.match(returningText, /Welcome back/);
    assert.match(returningText, /no Resident Card/i);
    assert.doesNotMatch(returningText, /still the latest/i);
    await page.getByRole("button", { name: "Menu" }).click();
    assert.equal(await page.getByRole("navigation", { name: "Mobile primary" }).isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("button", { name: "Menu" }).isVisible(), true);
  });

  await run("device-local Card mobile", { width: 390, height: 844 }, "/?visitor=local-card", async (page) => {
    const text = await page.locator(".visitor-banner").innerText();
    assert.match(text, /local Card/i);
    assert.match(text, /does not claim sign-in/i);
    assert.equal(await page.getByRole("link", { name: "Open the local Closet" }).getAttribute("href"), "/laidies-card.html");
  });

  await run("verified account held", { width: 1440, height: 1024 }, "/?visitor=verified-held", async (page) => {
    assert.match(await page.locator(".visitor-banner").innerText(), /not available yet/i);
    assert.match(await page.locator(".visitor-banner").innerText(), /browser token is not enough/i);
  });

  await run("missing projection failure", { width: 390, height: 844 }, "/?projection=missing", async (page) => {
    const notices = await page.getByRole("status").allInnerTexts();
    assert.equal(notices.length, 2);
    assert.match(notices.join(" "), /previously published|none is certified/i);
    const episodeEntry = await page.locator(".primary-actions a").nth(1).innerText();
    assert.match(episodeEntry, /Episode 04.+published June 24/i);
    assert.doesNotMatch(episodeEntry, /latest/i);
    assert.equal(await page.locator(".readiness-card").count(), 6);
    assert.equal(await page.locator(".readiness-card.held").count(), 0);
    assert.equal(await page.locator(".readiness-card.unavailable").count(), 6);
    assert.equal(await page.locator(".readiness-card").filter({ hasText: "Latest published" }).count(), 0);
    assert.equal(await page.locator("[data-error-code='PROJECTION_MISSING']").count(), 2);
  });

  await run("Start Here desktop", { width: 1440, height: 1024 }, "/start-here.html", async (page) => {
    assert.match(await page.getByRole("heading", { level: 1 }).innerText(), /Start with a person/);
    assert.equal(await page.getByRole("link", { name: "Enter the Visitor’s Centre" }).getAttribute("href"), "/visitors-centre.html");
    assert.match(await page.locator(".orientation-proof").innerText(), /arrival does not claim/i);
  });

  await run("Start Here failure mobile", { width: 390, height: 844 }, "/start-here.html?projection=missing", async (page) => {
    assert.match(await page.getByRole("status").innerText(), /cannot certify any receiving product/i);
    assert.equal(await page.getByRole("link", { name: "Enter the Visitor’s Centre" }).isVisible(), true);
    assert.equal(await page.locator("[data-error-code='PROJECTION_MISSING']").count(), 1);
  });

  await run("minimum-width reflow", { width: 320, height: 800 }, "/", async (page) => {
    assert.equal(await page.locator(".primary-actions a").count(), 3);
    assert.equal(await page.locator(".readiness-card").count(), 6);
    assert.equal(await page.getByRole("button", { name: "Menu" }).isVisible(), true);
  });

  for (const [mode, errorCode] of [
    ["stale", "PROJECTION_STALE"],
    ["conflict", "IDEMPOTENCY_CONFLICT"],
    ["tampered", "PAYLOAD_HASH_MISMATCH"],
  ]) {
    await run(`${mode} projection fails closed`, { width: 390, height: 844 }, `/?projection=${mode}`, async (page) => {
      assert.equal(await page.locator(`[data-error-code='${errorCode}']`).count(), 2);
      assert.equal(await page.locator(".readiness-card.unavailable").count(), 6);
      assert.equal(await page.locator(".news-status a").count(), 0);
      assert.doesNotMatch(await page.locator(".primary-actions a").nth(1).innerText(), /latest/i);
    });
  }

  console.log(JSON.stringify({ status: "PASS", assertions: results.length, results }, null, 2));
  await browser.close();
})().catch(async (error) => {
  console.error(error);
  process.exitCode = 1;
});
