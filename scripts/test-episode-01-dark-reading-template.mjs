import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const out = path.join(root, "operations/product-stewards/episode-experience/evidence/episode-01-dark-reading-template-2026-08-10");
fs.mkdirSync(out, { recursive: true });

const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.join(root, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };

const server = http.createServer((request, response) => {
  const relative = decodeURIComponent(new URL(request.url, "http://local").pathname).replace(/^\/+/, "") || "index.html";
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  const stat = fs.statSync(file);
  response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Content-Length": stat.size, "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const results = [];
const check = (name, pass, detail) => results.push({ name, result: pass ? "PASS" : "FAIL", detail });
const sha = (file) => createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/episodes/episode-format-navigation-pilot.json"), "utf8"));
for (const [key, file] of Object.entries({
  issue01Sha256: "issues/issue-01.html",
  watchSha256: "watch.html",
  formatNavigationCssSha256: "content/episode-format-navigation.css",
  episodeIndexSha256: "content/episode-index.json",
  approvedTemplateQaSha256: "operations/review-packets/episode-01-approved-template-qa.md",
  screeningRoomAdmissionSha256: "content/episodes/screening-room-admission.json",
  siteIndexSha256: "content/site/site-index.json",
  conceptMapSha256: "operations/product-stewards/learning-content-ecosystem/concept-map.md",
})) check(`manifest binds ${file}`, manifest.boundInputs[key] === sha(file), `${key}: declared=${manifest.boundInputs[key]} observed=${sha(file)}`);
let browser;

try {
  browser = await chromium.launch({ executablePath: chrome, headless: true });
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1000 : 844 } });
    const page = await context.newPage();
    await page.route("https://**/*", (route) => route.abort());
    await page.goto(`${origin}/issues/issue-01.html`, { waitUntil: "domcontentloaded" });
    const state = await page.evaluate(() => {
      const hero = document.querySelector(".tv-hero");
      const title = document.querySelector(".tv-title");
      const main = document.querySelector("main");
      const firstArticleParagraph = main?.querySelector(":scope > p");
      const heroRect = hero?.getBoundingClientRect();
      const titleRect = title?.getBoundingClientRect();
      const mainRect = main?.getBoundingClientRect();
      const paragraphRect = firstArticleParagraph?.getBoundingClientRect();
      const heroStyle = getComputedStyle(hero);
      const read = document.querySelector('.episode-format-nav__choice[aria-current="page"]');
      const listen = document.querySelector('.episode-format-nav__choice[href*="mode=listen"]');
      const watch = document.querySelector('.episode-format-nav__choice[aria-disabled="true"]');
      return {
        bodyClass: document.body.className,
        bodyBackground: getComputedStyle(document.body).backgroundColor,
        heroBackground: heroStyle.backgroundImage,
        heroDisplay: heroStyle.display,
        heroColumns: heroStyle.gridTemplateColumns,
        heroWidth: heroRect?.width,
        titleCenterDelta: Math.abs((titleRect.left + titleRect.width / 2) - innerWidth / 2),
        titleAlign: getComputedStyle(title).textAlign,
        mainWidth: mainRect?.width,
        paragraphWidth: paragraphRect?.width,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        readHref: read?.getAttribute("href"),
        listenHref: listen?.getAttribute("href"),
        watchText: watch?.textContent.trim(),
      };
    });

    check(`${width}px uses the dark reading field`, state.bodyClass === "" && state.bodyBackground === "rgb(22, 15, 29)", JSON.stringify(state));
    check(`${width}px uses the aligned standing-ovation hero`, state.heroBackground.includes("ep01-scene-01-steve-ovation.jpg"), state.heroBackground);
    check(`${width}px has no split-screen hero grid`, state.heroDisplay !== "grid" && state.heroColumns === "none", JSON.stringify(state));
    check(`${width}px centers the live title across the hero`, state.titleAlign === "center" && state.titleCenterDelta <= 2, JSON.stringify(state));
    check(`${width}px has no horizontal overflow`, !state.overflow, JSON.stringify(state));
    check(`${width}px keeps Read on Episode 01`, state.readHref === "/issues/issue-01.html", JSON.stringify(state));
    check(`${width}px keeps Listen on Episode 01`, state.listenHref === "/watch.html?ep=01&mode=listen", JSON.stringify(state));
    check(`${width}px keeps Watch visible and honestly unavailable`, state.watchText === "WatchNot available yet", JSON.stringify(state));
    if (width === 1440) check("desktop keeps the wide editorial shell", state.mainWidth >= 830 && state.paragraphWidth >= 680, JSON.stringify(state));
    await page.screenshot({ path: path.join(out, `episode-01-${width}-top.png`), fullPage: false });

    if (width === 1440) {
      await page.addStyleTag({ content: `.tv-hero{display:grid!important;grid-template-columns:43% 1fr!important}.tv-title{grid-column:2!important;text-align:left!important}` });
      const mutationAccepted = await page.evaluate(() => {
        const hero = document.querySelector(".tv-hero");
        const title = document.querySelector(".tv-title");
        const style = getComputedStyle(hero);
        const rect = title.getBoundingClientRect();
        return style.display !== "grid" && style.gridTemplateColumns === "none" && getComputedStyle(title).textAlign === "center" && Math.abs((rect.left + rect.width / 2) - innerWidth / 2) <= 2;
      });
      check("calibration rejects a deliberately reintroduced split-screen", !mutationAccepted, `mutationAccepted=${mutationAccepted}`);
    }
    await context.close();
  }
} catch (error) {
  results.push({ name: "browser execution", result: "FAIL", detail: error.stack || String(error) });
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const failures = results.filter((result) => result.result === "FAIL");
const report = { status: failures.length ? "HOLD" : "PASS", scope: "Episode 01 local reading-template regression only; no deployment or publication authority.", passCount: results.length - failures.length, failCount: failures.length, results };
fs.writeFileSync(path.join(out, "results.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
