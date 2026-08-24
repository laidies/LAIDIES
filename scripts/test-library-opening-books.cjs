#!/usr/bin/env node
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.resolve(root, ".ds-sync/node_modules/playwright-core");
const mime = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".json":"application/json; charset=utf-8", ".png":"image/png", ".jpg":"image/jpeg" };
const books = [
  ["ai-fundamentals-101", "AI Fundamentals 101", "What \"AI\" Actually Means", 20],
  ["working-with-ai-101", "Working with AI 101", "From Knowing to Doing", 13],
  ["straight-answers", "Straight Answers About AI", "Jobs & Work", 0],
  ["ai-dictionary", "The AI Dictionary", "Read the full explanation", 0]
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
  page.setDefaultTimeout(8000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const failures = [];
  try {
    for (const [id, title, requiredText] of books) {
      console.log(`LIBRARY OPENING BOOKS CHECK preview=${id}`);
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
    for (const width of [1280, 390, 320]) {
      await page.setViewportSize({ width, height: width > 560 ? 900 : 844 });
      for (const [id, title, , expectedChapterKeys] of books) {
        console.log(`LIBRARY OPENING BOOKS CHECK reader=${id} viewport=${width}`);
        await page.goto(`${origin}/library.html?reader-test=${width}-${id}#${id}`, { waitUntil: "domcontentloaded" });
        try {
          await page.waitForFunction(expected => document.getElementById("reader").classList.contains("on") && document.getElementById("rt").textContent === expected && document.querySelectorAll("#rtoc-mobile > .reader-toc-group").length > 3, title);
        } catch (error) {
          const state = await page.evaluate(() => ({
            hash: location.hash,
            readerOpen: document.getElementById("reader")?.classList.contains("on"),
            title: document.getElementById("rt")?.textContent,
            mobileGroups: document.querySelectorAll("#rtoc-mobile > .reader-toc-group").length,
            loadText: document.getElementById("rtxt")?.innerText.slice(0, 180)
          }));
          failures.push(`${id}@${width}: reader did not reach navigable open state ${JSON.stringify(state)}`);
          continue;
        }
        const navigation = await page.locator("#reader").evaluate(node => ({
          pageWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          textWidth: node.querySelector("#rtxt").scrollWidth,
          textClientWidth: node.querySelector("#rtxt").clientWidth,
          groups: node.querySelectorAll('#rtoc-mobile > .reader-toc-group').length,
          sections: node.querySelectorAll('#rtoc-mobile .reader-toc-children a').length,
          chapterKeys: [...node.querySelectorAll('#rtoc-mobile .toc-key')].map(key => key.textContent.trim()),
          duplicateContents: [...node.querySelectorAll('#rtxt h2')].some(heading => heading.textContent.trim() === 'Contents'),
          titleInToc: [...node.querySelectorAll('#rtoc-mobile .toc-title')].some(label => label.textContent.trim() === document.getElementById('rt').textContent.trim()),
          topVisible: node.querySelector("#reader-top").getBoundingClientRect().height >= 44,
          orientationOrder: document.getElementById("rt").textContent.trim() === "AI Fundamentals 101" ? Array.from({ length: 20 }, (_, index) => {
            const chapter = index + 1;
            const html = node.querySelector("#rtxt").innerHTML;
            const start = html.indexOf(`data-source-block="chapter-${chapter}"`);
            const next = chapter < 20 ? html.indexOf(`data-source-block="chapter-${chapter + 1}"`, start) : html.length;
            const block = html.slice(start, next);
            const firstSection = block.search(new RegExp(`<h3[^>]*>${chapter}\\.1\\s+[—-]`, "i"));
            const objective = block.indexOf('class="callout callout-objective"');
            const keyTerms = block.indexOf("Key Terms Introduced in This Chapter");
            const secondSection = block.search(new RegExp(`<h3[^>]*>${chapter}\\.2\\s+[—-]`, "i"));
            return firstSection >= 0 && firstSection < objective && objective < keyTerms && keyTerms < secondSection;
          }) : []
        }));
        if (navigation.pageWidth !== navigation.viewportWidth || navigation.textWidth !== navigation.textClientWidth || navigation.groups < 4 || !navigation.sections || navigation.duplicateContents || navigation.titleInToc || navigation.chapterKeys.length !== expectedChapterKeys || navigation.chapterKeys.some(key => !/^\d{2}$/.test(key)) || !navigation.topVisible || (id === "ai-fundamentals-101" && (navigation.orientationOrder.length !== 20 || navigation.orientationOrder.includes(false)))) {
          failures.push(`${id}@${width}: persistent chapter-and-section navigation is incomplete or overflows ${JSON.stringify(navigation)}`);
          continue;
        }
        await page.locator("#mobile-toc > summary").click();
        const lastGroup = page.locator("#rtoc-mobile > .reader-toc-group").last();
        if (await lastGroup.evaluate(node => node.tagName === 'DETAILS' && !node.open)) await lastGroup.locator(':scope > summary').click();
        const lastLink = lastGroup.locator("a").last();
        await lastLink.click();
        await page.waitForFunction(() => !document.getElementById("mobile-toc").open && document.getElementById("reader-current-section").textContent.trim() !== "Start of book" && document.getElementById("rtxt").scrollTop > 20);
        await page.locator("#reader-top").click();
        await page.waitForFunction(() => document.getElementById("rtxt").scrollTop < 2);
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
  console.log(`LIBRARY OPENING BOOKS PASS · preview_to_open=${books.length} · full_reader=${books.map(([id]) => id).join(",")} · persistent_navigation=4x3_viewports`);
})().catch(error => {
  console.error(`LIBRARY OPENING BOOKS FAIL: ${error.stack || error}`);
  server.close();
  process.exit(1);
});
