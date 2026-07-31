#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const siteRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const candidatePath = "operations/design-explorations/visitors-centre-building-championship-20260726/candidate/index.html";
const outDir = path.join(siteRoot, "operations/design-explorations/visitors-centre-building-championship-20260726/candidate/evidence");
const playwrightRoot = path.join(siteRoot, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
fs.mkdirSync(outDir, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"], [".png", "image/png"], [".webp", "image/webp"],
  [".jpg", "image/jpeg"], [".svg", "image/svg+xml"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const rel = url.pathname === "/" ? candidatePath : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(siteRoot, rel);
  if (!resolved.startsWith(`${siteRoot}${path.sep}`) || !fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime.get(path.extname(resolved).toLowerCase()) || "application/octet-stream" });
  fs.createReadStream(resolved).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const url = `${origin}/${candidatePath}`;
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const failures = [];
let checks = 0;
const check = (condition, message) => { checks += 1; if (!condition) failures.push(message); };

async function makeContext(viewport, javaScriptEnabled = true, returning = false) {
  const context = await browser.newContext({ viewport, javaScriptEnabled, reducedMotion: "reduce" });
  if (returning) {
    await context.addInitScript(() => localStorage.setItem("laidies_welcome_tour", JSON.stringify({
      step: 6, startedAt: "2026-07-25T12:00:00.000Z", done: false, skipped: false
    })));
  }
  return context;
}

try {
  const noJs = await makeContext({ width: 390, height: 844 }, false);
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(url, { waitUntil: "domcontentloaded" });
  check(await noJsPage.locator("noscript a").count() === 17, "no-JS fallback does not expose all 17 routes");
  check(await noJsPage.locator("noscript").innerText().then((text) => text.includes("full named directory still works")),
    "no-JS fallback does not explain recovery");
  await noJs.close();

  for (const config of [
    { name: "desktop-1440-newcomer", viewport: { width: 1440, height: 1000 }, returning: false },
    { name: "desktop-1440-returning", viewport: { width: 1440, height: 1000 }, returning: true },
    { name: "mobile-390-newcomer", viewport: { width: 390, height: 844 }, returning: false },
    { name: "mobile-390-returning", viewport: { width: 390, height: 844 }, returning: true },
    { name: "mobile-320-newcomer", viewport: { width: 320, height: 700 }, returning: false }
  ]) {
    const context = await makeContext(config.viewport, true, config.returning);
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    check(await page.locator("#destinationSelect option").count() === 18, `${config.name}: named select does not contain 17 routes`);
    check(await page.locator("#directoryList [data-destination]").count() === 17, `${config.name}: full directory does not contain 17 routes`);
    check(await page.locator(".map-spot").count() === 17, `${config.name}: map does not contain 17 triggers`);
    check(await page.locator(".wall-map").getAttribute("src") === "/assets/final_map/sunnyvaile-town-map-final-v5.webp",
      `${config.name}: exact approved map source is not composited`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${config.name}: horizontal overflow`);
    check(await page.locator("#destinationDetail").isHidden(), `${config.name}: arrival invents a selected destination`);
    if (config.returning) {
      check(await page.locator("#returnNote").isVisible(), `${config.name}: active tour state is not recognized`);
      check((await page.locator("#returnNote").innerText()).includes("stop 6"), `${config.name}: active tour stop is wrong`);
    } else {
      check(await page.locator("#returnNote").isHidden(), `${config.name}: clean arrival invents returning state`);
    }
    await page.locator("#destinationSelect").selectOption("fairy-godmother");
    check(await page.locator("#destinationDetail").isVisible(), `${config.name}: held destination did not reveal`);
    check(await page.locator("#destinationState").getAttribute("data-state") === "held", `${config.name}: held state is wrong`);
    check((await page.locator("#destinationLimit").innerText()).includes("not approved for promotion"),
      `${config.name}: held limitation is missing`);
    check((await page.locator("#destinationEnter").getAttribute("href")) === "/games/fairy-godmother.html",
      `${config.name}: destination route is wrong`);
    check(await page.evaluate(() => document.activeElement?.id === "destinationEnter"),
      `${config.name}: reveal action does not receive focus`);
    await page.screenshot({ path: path.join(outDir, `${config.name}-selected-fairy-full.png`), fullPage: true });
    await page.keyboard.press("Escape");
    check(await page.locator("#destinationDetail").isHidden(), `${config.name}: Escape did not close reveal`);
    check(await page.evaluate(() => document.activeElement?.id === "destinationSelect"),
      `${config.name}: Escape did not restore focus`);
    const transition = await page.locator(".action").first().evaluate((element) => getComputedStyle(element).transitionDuration);
    check(transition.split(",").every((value) => parseFloat(value) === 0), `${config.name}: reduced-motion transition remains ${transition}`);
    await page.screenshot({ path: path.join(outDir, `${config.name}-fold.png`) });
    await page.screenshot({ path: path.join(outDir, `${config.name}-full.png`), fullPage: true });
    await context.close();
  }

  const comparison = await makeContext({ width: 1600, height: 1000 });
  const comparisonPage = await comparison.newPage();
  await comparisonPage.goto(`${origin}/${path.dirname(candidatePath)}/evidence/comparison.html`, { waitUntil: "networkidle" });
  await comparisonPage.screenshot({ path: path.join(outDir, "incumbent-vs-candidate-comparison.png"), fullPage: true });
  await comparison.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const result = {
  testedAt: new Date().toISOString(),
  command: "node operations/design-explorations/visitors-centre-building-championship-20260726/test-candidate.mjs",
  playwrightCore: JSON.parse(fs.readFileSync(path.join(playwrightRoot, "package.json"), "utf8")).version,
  chrome: "150.0.7871.187",
  checks,
  failures,
  limitations: [
    "Headless Google Chrome is not native Safari or VoiceOver.",
    "Screenshots and DOM checks are not human comprehension, owner approval, analytics, or public verification.",
    "The isolated candidate links to current receiving routes but does not prove their downstream completion."
  ]
};
fs.writeFileSync(path.join(outDir, "test-result.json"), `${JSON.stringify(result, null, 2)}\n`);
if (failures.length) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(result, null, 2));
