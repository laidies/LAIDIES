const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const base = process.env.CANDIDATE_URL || "http://127.0.0.1:4173";
const output = path.resolve(
  __dirname,
  "../../../product-stewards/town-entry-homepage/evidence/platform-projection-integration-2026-07-26",
);

const scenes = [
  ["homepage-first-desktop-1440.png", { width: 1440, height: 1024 }, "/"],
  ["homepage-returning-mobile-390.png", { width: 390, height: 844 }, "/?visitor=returning"],
  ["homepage-local-card-mobile-390.png", { width: 390, height: 844 }, "/?visitor=local-card"],
  ["homepage-failure-mobile-390.png", { width: 390, height: 844 }, "/?projection=missing"],
  ["start-here-desktop-1440.png", { width: 1440, height: 1024 }, "/start-here.html"],
  ["start-here-failure-mobile-390.png", { width: 390, height: 844 }, "/start-here.html?projection=missing"],
];

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const matrix = [];
  for (const [file, viewport, route] of scenes) {
    const page = await browser.newPage({ viewport });
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    const target = path.join(output, file);
    await page.screenshot({ path: target, fullPage: true });
    matrix.push({
      file,
      viewport,
      route,
      title: await page.title(),
      heading: await page.getByRole("heading", { level: 1 }).innerText(),
      documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
      viewportWidth: await page.evaluate(() => document.documentElement.clientWidth),
    });
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(output, "render-matrix.json"), `${JSON.stringify(matrix, null, 2)}\n`);
  console.log(JSON.stringify({ output, scenes: matrix.length }, null, 2));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
