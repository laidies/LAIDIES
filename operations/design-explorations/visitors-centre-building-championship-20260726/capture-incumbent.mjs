#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const siteRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const outDir = path.join(
  siteRoot,
  "operations/design-explorations/visitors-centre-building-championship-20260726/evidence/incumbent"
);
const playwrightRoot = path.join(siteRoot, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
fs.mkdirSync(outDir, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".jpg", "image/jpeg"],
  [".mp3", "audio/mpeg"],
  [".m4a", "audio/mp4"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"]
]);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const rel = url.pathname === "/" ? "visitors-centre.html" : url.pathname.replace(/^\/+/, "");
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
const browser = await chromium.launch({ executablePath: chromePath, headless: true });

async function capture(name, viewport, returning = false) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  if (returning) {
    await context.addInitScript(() => {
      localStorage.setItem("laidies_welcome_tour", JSON.stringify({
        step: 6,
        startedAt: "2026-07-25T12:00:00.000Z",
        done: false,
        skipped: false
      }));
    });
  }
  const page = await context.newPage();
  await page.goto(`${origin}/visitors-centre.html`, { waitUntil: "networkidle" });
  await page.locator("#vc-directory option").nth(17).waitFor({ state: "attached" });
  await page.screenshot({ path: path.join(outDir, `${name}-fold.png`) });
  await page.screenshot({ path: path.join(outDir, `${name}-full.png`), fullPage: true });
  const facts = await page.evaluate(() => ({
    title: document.title,
    width: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    directoryOptions: document.querySelectorAll("#vc-directory option").length - 1,
    mapSpots: document.querySelectorAll("[data-vc-building]").length,
    tourChip: document.querySelector("#svwtChip")?.innerText || null,
    bodyTextStart: document.body.innerText.slice(0, 700)
  }));
  await context.close();
  return facts;
}

const evidence = {
  capturedAt: new Date().toISOString(),
  source: `${origin}/visitors-centre.html`,
  command: "node operations/design-explorations/visitors-centre-building-championship-20260726/capture-incumbent.mjs",
  playwrightCore: JSON.parse(fs.readFileSync(path.join(playwrightRoot, "package.json"), "utf8")).version,
  browser: await browser.version(),
  chromePath,
  states: {
    desktopNewcomer: await capture("desktop-1440-newcomer", { width: 1440, height: 1000 }),
    desktopReturning: await capture("desktop-1440-returning-active-tour", { width: 1440, height: 1000 }, true),
    mobileNewcomer: await capture("mobile-390-newcomer", { width: 390, height: 844 }),
    mobileReturning: await capture("mobile-390-returning-active-tour", { width: 390, height: 844 }, true)
  },
  limitation:
    "Headless Google Chrome is a visual and DOM approximation only. It is not native Safari, VoiceOver, human comprehension, owner approval, analytics, or public verification."
};

fs.writeFileSync(path.join(outDir, "capture-metadata.json"), `${JSON.stringify(evidence, null, 2)}\n`);
await browser.close();
await new Promise((resolve) => server.close(resolve));
console.log(JSON.stringify(evidence, null, 2));
