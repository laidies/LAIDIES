import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../../.ds-sync/node_modules/playwright-core/index.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);
const outputRoot = path.join(
  repositoryRoot,
  "operations/design-explorations/library-redesign-20260726/cycle-2/review-evidence",
);
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const targets = {
  homepage: "/index.html",
  current_library: "/library.html",
  candidate_a:
    "/operations/design-explorations/library-redesign-20260726/cycle-2/_rejected/candidate-a-hall-catalogue/index.html",
  candidate_b:
    "/operations/design-explorations/library-redesign-20260726/cycle-2/_rejected/candidate-b-rotunda-loop/index.html",
  candidate_c:
    "/operations/design-explorations/library-redesign-20260726/cycle-2/_rejected/candidate-c-gallery-rooms/index.html",
};

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const requested = decodeURIComponent(url.pathname);
    const resolved = path.resolve(repositoryRoot, `.${requested}`);
    if (!resolved.startsWith(`${repositoryRoot}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const file = await fs.readFile(resolved);
    response.writeHead(200, {
      "content-type":
        mimeTypes.get(path.extname(resolved).toLowerCase()) ??
        "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(file);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

await fs.mkdir(outputRoot, { recursive: true });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});
const report = {
  captured_at: new Date().toISOString(),
  runtime: {
    playwright_core: "1.61.1",
    browser: await browser.version(),
    origin,
    external_network: "aborted",
  },
  captures: [],
};

try {
  for (const [targetName, targetPath] of Object.entries(targets)) {
    for (const [viewportName, viewport] of Object.entries(viewports)) {
      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(String(error)));
      page.on("requestfailed", (request) => {
        failedRequests.push({
          url: request.url(),
          failure: request.failure()?.errorText ?? "unknown",
        });
      });
      await page.route("**/*", async (route) => {
        const requestUrl = new URL(route.request().url());
        if (requestUrl.origin === origin) await route.continue();
        else await route.abort("blockedbyclient");
      });
      const response = await page.goto(`${origin}${targetPath}`, {
        waitUntil: "networkidle",
      });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const screenshot = `${targetName}-${viewportName}-full.png`;
      await page.screenshot({
        path: path.join(outputRoot, screenshot),
        fullPage: true,
        animations: "disabled",
      });
      const viewportScreenshot = `${targetName}-${viewportName}-viewport.png`;
      await page.screenshot({
        path: path.join(outputRoot, viewportScreenshot),
        fullPage: false,
        animations: "disabled",
      });
      const dom = await page.evaluate(() => {
        const visible = (element) => {
          const style = getComputedStyle(element);
          const box = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) !== 0 &&
            box.width > 0 &&
            box.height > 0
          );
        };
        const describe = (element) => ({
          tag: element.tagName.toLowerCase(),
          type: element.getAttribute("type"),
          text: (element.innerText || element.getAttribute("aria-label") || "")
            .replace(/\s+/g, " ")
            .trim(),
          href: element.getAttribute("href"),
          ariaLabel: element.getAttribute("aria-label"),
          role: element.getAttribute("role"),
          disabled: element.matches(":disabled"),
          box: (() => {
            const box = element.getBoundingClientRect();
            return {
              x: Math.round(box.x),
              y: Math.round(box.y),
              width: Math.round(box.width),
              height: Math.round(box.height),
            };
          })(),
        });
        return {
          title: document.title,
          bodyText: document.body.innerText.replace(/\s+/g, " ").trim(),
          controls: [...document.querySelectorAll("a,button,input,select,textarea")]
            .filter(visible)
            .map(describe),
          images: [...document.images]
            .filter(visible)
            .map((image) => ({
              src: image.getAttribute("src"),
              alt: image.getAttribute("alt"),
              naturalWidth: image.naturalWidth,
              naturalHeight: image.naturalHeight,
              complete: image.complete,
              box: describe(image).box,
            })),
          roleImages: [...document.querySelectorAll('[role="img"]')]
            .filter(visible)
            .map(describe),
          headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
            .filter(visible)
            .map(describe),
          horizontalOverflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1,
          documentSize: {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight,
            clientWidth: document.documentElement.clientWidth,
            clientHeight: document.documentElement.clientHeight,
          },
        };
      });
      report.captures.push({
        target: targetName,
        path: targetPath,
        viewport: viewportName,
        dimensions: viewport,
        response_status: response?.status() ?? null,
        response_url: response?.url() ?? null,
        screenshot,
        viewport_screenshot: viewportScreenshot,
        console_errors: consoleErrors,
        page_errors: pageErrors,
        failed_requests: failedRequests,
        dom,
      });
      if (targetName.startsWith("candidate_")) {
        const interaction = {
          target: targetName,
          viewport: viewportName,
          open_book: null,
          preview: null,
          miss_jeeves: null,
        };
        const openBook = page.locator(".book:not(.preview)").first();
        if (await openBook.count()) {
          await openBook.focus();
          const triggerText = (await openBook.innerText()).replace(/\s+/g, " ").trim();
          await openBook.click();
          const dialog = page.locator('.reader[role="dialog"]');
          const openVisible = await dialog.isVisible();
          const activeAfterOpen = await page.evaluate(() => ({
            tag: document.activeElement?.tagName?.toLowerCase() ?? null,
            text:
              document.activeElement?.innerText?.replace(/\s+/g, " ").trim() ??
              null,
          }));
          await page.screenshot({
            path: path.join(
              outputRoot,
              `${targetName}-${viewportName}-open-book.png`,
            ),
            fullPage: false,
            animations: "disabled",
          });
          await page.keyboard.press("Escape");
          const visibleAfterEscape = await dialog.isVisible();
          if (visibleAfterEscape) await page.locator("[data-close]").click();
          interaction.open_book = {
            trigger_text: triggerText,
            dialog_visible: openVisible,
            dialog_text: openVisible
              ? (await dialog.innerText()).replace(/\s+/g, " ").trim()
              : null,
            active_after_open: activeAfterOpen,
            closed_with_escape: !visibleAfterEscape,
            active_after_close: await page.evaluate(() => ({
              tag: document.activeElement?.tagName?.toLowerCase() ?? null,
              text:
                document.activeElement?.innerText
                  ?.replace(/\s+/g, " ")
                  .trim() ?? null,
            })),
          };
        }
        const preview = page.locator(".book.preview").first();
        if (await preview.count()) {
          const previewText = (await preview.innerText())
            .replace(/\s+/g, " ")
            .trim();
          let alertRecord = null;
          page.once("dialog", async (alertDialog) => {
            alertRecord = {
              trigger_text: previewText,
              alert_type: alertDialog.type(),
              alert_message: alertDialog.message(),
            };
            await alertDialog.dismiss();
          });
          await preview.click();
          interaction.preview = alertRecord;
        }
        const jeevesInput = page.locator('input[aria-label="Ask Miss Jeeves"]');
        if (await jeevesInput.count()) {
          await jeevesInput.fill("How do I check it?");
          await jeevesInput.press("Enter");
          const answer = page.locator(".answer");
          interaction.miss_jeeves = {
            answer_visible: await answer.isVisible(),
            answer_text: (await answer.innerText()).replace(/\s+/g, " ").trim(),
            active_after_submit: await page.evaluate(() => ({
              tag: document.activeElement?.tagName?.toLowerCase() ?? null,
              text:
                document.activeElement?.innerText
                  ?.replace(/\s+/g, " ")
                  .trim() ?? null,
            })),
          };
          await page.screenshot({
            path: path.join(
              outputRoot,
              `${targetName}-${viewportName}-jeeves-result.png`,
            ),
            fullPage: false,
            animations: "disabled",
          });
        }
        report.interactions ??= [];
        report.interactions.push(interaction);
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

await fs.writeFile(
  path.join(outputRoot, "capture-report.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(
  JSON.stringify({
    captures: report.captures.length,
    output: path.join(outputRoot, "capture-report.json"),
  }),
);
