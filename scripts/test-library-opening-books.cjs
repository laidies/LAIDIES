#!/usr/bin/env node
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.resolve(root, ".ds-sync/node_modules/playwright-core");
const mime = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".json":"application/json; charset=utf-8", ".png":"image/png", ".jpg":"image/jpeg" };
const books = [
  ["concepts-101", "Concepts 101", "Follow one request through the system."],
  ["briefing-101", "Briefing 101", "Brief in five parts"],
  ["setup-101", "Setup 101", "Put the right context in the right place."],
  ["accounts-101", "Accounts 101", "Know the account before you paste."]
];

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  const relative = pathname === "/" ? "library.html" : pathname.replace(/^\/+/, "");
  const target = path.resolve(root, relative);
  if (!target.startsWith(root + path.sep) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    response.writeHead(404).end("not found");
    return;
  }
  response.writeHead(200, { "content-type": mime[path.extname(target)] || "application/octet-stream", "cache-control":"no-store" });
  fs.createReadStream(target).pipe(response);
});

(async () => {
  const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const failures = [];
  try {
    for (const [id, title, requiredText] of books) {
      await page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
      await page.locator(`.bk[data-book-id="${id}"]`).click();
      const preview = await page.locator("#book-preview").evaluate(node => ({
        bookId: node.dataset.bookId,
        title: document.getElementById("book-preview-title").textContent,
        summary: document.getElementById("book-preview-summary").textContent,
        inside: document.getElementById("book-preview-inside").textContent,
        openHidden: document.getElementById("book-preview-read").hidden,
        status: document.getElementById("book-preview-status").textContent
      }));
      if (preview.bookId !== id || preview.title !== title || preview.openHidden || !/Ready to read now/.test(preview.status) || !preview.summary || !/Inside this book:/.test(preview.inside)) {
        failures.push(`${id}: preview is not a complete ready-to-open decision ${JSON.stringify(preview)}`);
        continue;
      }
      await page.locator("#book-preview-read").click();
      await page.waitForFunction(expected => document.getElementById("reader").classList.contains("on") && document.getElementById("rt").textContent === expected && !/Pulling it off the shelf/.test(document.getElementById("rtxt").textContent), title);
      const reader = await page.locator("#reader").evaluate((node, expected) => ({
        open: node.classList.contains("on"),
        title: document.getElementById("rt").textContent,
        text: document.getElementById("rtxt").innerText,
        toc: [...document.querySelectorAll("#rtoc a")].map(link => link.textContent.trim()),
        loadFailure: /This book did not load/.test(document.getElementById("rtxt").textContent)
      }), requiredText);
      if (!reader.open || reader.title !== title || reader.loadFailure || !reader.text.toLowerCase().includes(requiredText.toLowerCase()) || reader.toc.length < 4) {
        failures.push(`${id}: admitted book did not open as its full structured artifact ${JSON.stringify({ ...reader, text: reader.text.slice(0, 180) })}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  if (failures.length) {
    console.error(`LIBRARY OPENING BOOKS FAIL\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`LIBRARY OPENING BOOKS PASS · preview_to_open=${books.length} · full_reader=${books.map(([id]) => id).join(",")}`);
})().catch(error => {
  console.error(`LIBRARY OPENING BOOKS FAIL: ${error.stack || error}`);
  server.close();
  process.exit(1);
});
