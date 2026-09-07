import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs";

const ROOT = "/Users/alisoneakin/Projects/laidies-newsstand-recurring-20260905";
const OUT = path.dirname(fileURLToPath(import.meta.url));
// Set LIVE_ORIGIN only after deployment. Live mode deliberately avoids every
// route override and writes `live-*` artifacts, keeping it distinct from the
// private local preview and the live-CSS interception proof.
const LIVE_ORIGIN = process.env.LIVE_ORIGIN?.trim();
const mode = LIVE_ORIGIN ? "live" : process.argv.includes("--before") ? "before" : process.argv.includes("--intercept") ? "intercept" : "after";
const widths = [320, 390, 600, 768, 900, 1024, 1280];

const typeByExtension = { ".css": "text/css", ".html": "text/html", ".js": "application/javascript", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".mp3": "audio/mpeg" };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  const requested = path.resolve(ROOT, `.${pathname === "/" ? "/newsstand.html" : pathname}`);
  if (!requested.startsWith(`${ROOT}${path.sep}`)) { response.writeHead(403); response.end(); return; }
  try {
    const body = fs.readFileSync(requested);
    response.writeHead(200, { "content-type": typeByExtension[path.extname(requested)] || "application/octet-stream", "cache-control": "no-store" });
    response.end(body);
  } catch {
    response.writeHead(404); response.end("Not found");
  }
});
const localPreview = mode === "before" || mode === "after";
if (localPreview) await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = localPreview ? `http://127.0.0.1:${server.address().port}` : LIVE_ORIGIN || "https://laidies.ai";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { mode, origin, widths: [], console: [], requestFailures: [] };
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    page.on("console", (message) => { if (message.type() === "error") report.console.push({ width, text: message.text() }); });
    page.on("response", (response) => { if (response.status() >= 400) report.responses ??= [], report.responses.push({ width, status: response.status(), url: response.url() }); });
    page.on("requestfailed", (request) => report.requestFailures.push({ width, url: request.url(), error: request.failure()?.errorText || "unknown" }));
    if (mode === "intercept") {
      await page.route("**/content/newsstand-design.css**", (route) => route.fulfill({ contentType: "text/css", body: fs.readFileSync(path.join(ROOT, "content/newsstand-design.css"), "utf8") }));
    }
    await page.goto(`${origin}/newsstand.html`, { waitUntil: "domcontentloaded" });
    await page.locator(".ns-front-secondary article").nth(1).waitFor();
    await page.evaluate(async () => { await document.fonts?.ready; });
    const latestImages = page.locator(".ns-front-secondary .ns-latest-image");
    for (let index = 0; index < await latestImages.count(); index += 1) {
      const image = latestImages.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(async (node) => {
        const imageNode = node;
        if (!imageNode.complete) {
          await Promise.race([
            new Promise((resolve, reject) => { imageNode.addEventListener("load", resolve, { once: true }); imageNode.addEventListener("error", () => reject(new Error("image load failed")), { once: true }); }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("image load timed out")), 8000))
          ]);
        }
        if (!imageNode.naturalWidth) throw new Error("image has no natural width");
        if (typeof imageNode.decode === "function") await imageNode.decode();
      });
    }
    const observed = await page.evaluate(() => {
      const articleMetrics = [...document.querySelectorAll(".ns-front-secondary article")].map((article) => {
        const story = article.querySelector(".ns-front-story");
        const image = article.querySelector(".ns-latest-image");
        const headline = article.querySelector("strong");
        const cta = article.querySelector("em");
        const box = (node) => { const rect = node?.getBoundingClientRect(); return rect ? { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height } : null; };
        const imageStyle = image ? getComputedStyle(image) : null;
        return { story: box(story), image: box(image), imageLoaded: image ? { complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, src: image.currentSrc } : null, headline: box(headline), cta: box(cta), imageStyle: imageStyle ? { objectFit: imageStyle.objectFit, aspectRatio: imageStyle.aspectRatio } : null, headlineText: headline?.textContent.trim() || "", ctaText: cta?.textContent.trim() || "" };
      });
      return { scrollWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth, secondary: (() => { const r = document.querySelector(".ns-front-secondary").getBoundingClientRect(); return { width: r.width, left: r.left, right: r.right }; })(), articles: articleMetrics };
    });
    await page.locator(".ns-front-page-grid__right").screenshot({ path: path.join(OUT, `${mode}-latest-${width}.png`) });
    const errors = [];
    if (observed.scrollWidth > width) errors.push(`horizontal overflow: ${observed.scrollWidth}px > ${width}px`);
    observed.articles.forEach((card, index) => {
      if (!card.image || !card.headline || !card.cta) errors.push(`card ${index + 1} is missing image, headline, or CTA`);
      if (!card.imageLoaded?.complete || !card.imageLoaded?.naturalWidth) errors.push(`card ${index + 1} image did not load`);
      if (card.image && card.image.height / card.image.width > 1.34) errors.push(`card ${index + 1} image is stretched/tall (${card.image.width}×${card.image.height})`);
      if (card.headline && card.headline.width < 140) errors.push(`card ${index + 1} headline column is squeezed (${card.headline.width}px)`);
      if (card.cta && (card.cta.width < 84 || card.cta.height < 44)) errors.push(`card ${index + 1} CTA is too small (${card.cta.width}×${card.cta.height})`);
      if (card.story && [card.image, card.headline, card.cta].some((child) => child && (child.left < card.story.left - .5 || child.right > card.story.right + .5))) errors.push(`card ${index + 1} child overflows story bounds`);
    });
    report.widths.push({ width, pass: errors.length === 0, errors, observed });
    await page.close();
  }
} finally {
  await browser.close();
  if (localPreview) await new Promise((resolve) => server.close(resolve));
}
report.sha256 = Object.fromEntries(fs.readdirSync(OUT).filter((name) => name.startsWith(`${mode}-latest-`) && name.endsWith(".png")).map((name) => [name, crypto.createHash("sha256").update(fs.readFileSync(path.join(OUT, name))).digest("hex")]));
report.layoutPass = report.widths.every((entry) => entry.pass) && report.requestFailures.length === 0;
report.observedLatestImageHealthPass = report.layoutPass && report.console.length === 0;
fs.writeFileSync(path.join(OUT, `${mode}-results.json`), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ mode, layoutPass: report.layoutPass, observedLatestImageHealthPass: report.observedLatestImageHealthPass, widths: report.widths.map(({ width, pass, errors, observed }) => ({ width, pass, errors, secondaryWidth: observed.secondary.width })), console: report.console, requestFailures: report.requestFailures }, null, 2));
