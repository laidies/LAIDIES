import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import {
  CONTEXT_NAV_PUBLIC_SRC,
  CONTEXT_NAV_SOURCE_SHA256,
} from "../../../../../scripts/lib/context-navigation-distribution-v1.mjs";

const root = process.cwd();
const output = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-nav-consumers-v1-"));
const build = spawnSync(
  process.execPath,
  ["scripts/build-public-site.mjs", output],
  { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
);
assert.equal(build.status, 0, `curated build failed\n${build.stdout}\n${build.stderr}`);

const mime = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const absolute = path.join(output, relative);
  if (!absolute.startsWith(`${output}${path.sep}`) || !fs.existsSync(absolute)) {
    response.writeHead(404).end("not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(absolute).toLowerCase()) || "application/octet-stream",
  }).end(fs.readFileSync(absolute));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const playwrightRoot = path.join(root, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

const representatives = [
  { route: "/index.html", role: "Town Entry", directHome: true },
  { route: "/visitors-centre.html", role: "Visitor’s Centre" },
  { route: "/learn/quiz.html", role: "ordered experience", ordered: true },
];
const widths = [320, 390, 1440];
let rendered = 0;
let noJs = 0;

try {
  for (const representative of representatives) {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: width < 900 ? 844 : 900 },
      });
      const page = await context.newPage();
      await page.goto(`${origin}${representative.route}`, { waitUntil: "domcontentloaded" });
      assert.equal(
        await page.locator(`script[src="${CONTEXT_NAV_PUBLIC_SRC}"]`).count(),
        1,
        `${representative.role} must load the exact versioned candidate once`
      );
      const control = page.locator(".sv-rail-item--back");
      if (representative.directHome) {
        assert.equal(await control.count(), 0, "direct home must not mount a redundant return");
      } else {
        assert.equal(await control.count(), 1, `${representative.role} must mount once`);
        assert.equal(await control.getAttribute("data-return-kind"), "home-fallback");
        assert.equal(await control.getAttribute("href"), "/");
        if (width < 900) {
          const box = await control.boundingBox();
          assert.ok(box && box.width >= 44 && box.height >= 44, "mobile target must be >=44px");
          assert.equal(await control.locator(".sv-rail-item__label").isVisible(), true);
        }
        await control.focus();
        assert.equal(await control.evaluate((node) => node === document.activeElement), true);
      }
      if (representative.ordered) {
        assert.equal(
          await page.locator("#quizNextQuestion").count(),
          1,
          "ordered Next control must remain in the rendered DOM"
        );
      }
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${representative.role} must not create horizontal overflow at ${width}`
      );
      rendered += 1;
      await context.close();
    }

    const noJsContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 844 },
    });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(`${origin}${representative.route}`, { waitUntil: "domcontentloaded" });
    assert.equal(await noJsPage.locator(".sv-rail-item--back").count(), 0);
    assert.ok(await noJsPage.locator("body").innerText(), `${representative.role} no-JS body`);
    if (representative.ordered) {
      assert.equal(
        await noJsPage.locator("#quizNextQuestion").count(),
        1,
        "ordered Next control must remain in the no-JS DOM"
      );
    }
    noJs += 1;
    await noJsContext.close();
  }

  const internalContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const internalPage = await internalContext.newPage();
  await internalPage.goto(`${origin}/library.html`, {
    referer: `${origin}/visitors-centre.html?desk=front`,
    waitUntil: "domcontentloaded",
  });
  const internalControl = internalPage.locator(".sv-rail-item--back");
  assert.equal(await internalControl.count(), 1);
  assert.equal(await internalControl.getAttribute("data-return-kind"), "previous");
  assert.equal(await internalControl.getAttribute("href"), "/visitors-centre.html?desk=front");
  assert.match(await internalControl.innerText(), /Visitor’s Centre/i);
  await internalContext.close();

  console.log(
    `CONTEXT NAV CONSUMER MATRIX PASS rendered=${rendered} no_js=${noJs}` +
    ` internal=1 candidate_sha256=${CONTEXT_NAV_SOURCE_SHA256}`
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(output, { recursive: true });
}
