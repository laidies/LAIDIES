#!/usr/bin/env node
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = process.env.LIBRARY_TEST_ROOT || process.cwd();
const widths = (process.env.LIBRARY_TEST_WIDTHS || '1280,1710,1920,2560,821,820,700,390,320').split(',').map(Number);
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.resolve(root, ".ds-sync/node_modules/playwright-core");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".json":"application/json; charset=utf-8", ".png":"image/png", ".jpg":"image/jpeg", ".svg":"image/svg+xml", ".woff2":"font/woff2" };
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
  const origin = process.env.LIBRARY_TEST_ORIGIN || `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(Number(process.env.LIBRARY_TEST_TIMEOUT_MS || 8000));
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
      await page.waitForFunction(expected => document.getElementById("reader").classList.contains("on") && (document.getElementById("rt").getAttribute("aria-label") || document.getElementById("rt").textContent) === expected && !/Pulling it off the shelf/.test(document.getElementById("rtxt").textContent), title);
      if (process.env.LIBRARY_TEST_INJECT_PAGE_TURN === "1") {
        await page.locator("#rtxt").evaluate(node => {
          const wrapper = document.createElement("section");
          wrapper.className = "reader-spread is-active";
          while (node.firstChild) wrapper.append(node.firstChild);
          node.append(wrapper);
        });
      }
      const reader = await page.locator("#reader").evaluate((node, expected) => ({
        open: node.classList.contains("on"),
        title: document.getElementById("rt").getAttribute("aria-label") || document.getElementById("rt").textContent,
        text: document.getElementById("rtxt").textContent,
        legacyPageTurnCount: document.querySelectorAll("#rtxt .reader-spread").length,
        sectionCount: document.querySelectorAll("#rtxt h2[id],#rtxt h3[id]").length,
        toc: [...document.querySelectorAll("#rtoc a")].map(link => link.textContent.trim()),
        loadFailure: /This book did not load/.test(document.getElementById("rtxt").textContent)
      }), requiredText);
      if (!reader.open || reader.title !== title || reader.loadFailure || !reader.text.toLowerCase().includes(requiredText.toLowerCase()) || reader.toc.length < 4 || reader.sectionCount < 4 || reader.legacyPageTurnCount !== 0) {
        failures.push(`${id}: admitted book did not open as its full structured artifact ${JSON.stringify({ ...reader, text: reader.text.slice(0, 180) })}`);
      }
    }
    for (const width of widths) {
      await page.setViewportSize({ width, height: width > 560 ? 900 : 844 });
      for (const [id, title, , expectedChapterKeys] of books) {
        console.log(`LIBRARY OPENING BOOKS CHECK reader=${id} viewport=${width}`);
        await page.goto(`${origin}/library.html?reader-test=${width}-${id}#${id}`, { waitUntil: "domcontentloaded" });
        try {
          await page.waitForFunction(expected => document.getElementById("reader").classList.contains("on") && (document.getElementById("rt").getAttribute("aria-label") || document.getElementById("rt").textContent) === expected && document.querySelectorAll("#rtoc-mobile > .reader-toc-group").length > 3, title);
        } catch (error) {
          const state = await page.evaluate(() => ({
            hash: location.hash,
            readerOpen: document.getElementById("reader")?.classList.contains("on"),
            title: document.getElementById("rt")?.getAttribute("aria-label") || document.getElementById("rt")?.textContent,
            mobileGroups: document.querySelectorAll("#rtoc-mobile > .reader-toc-group").length,
            loadText: document.getElementById("rtxt")?.innerText.slice(0, 180)
          }));
          failures.push(`${id}@${width}: reader did not reach navigable open state ${JSON.stringify(state)}`);
          continue;
        }
        // Measure the final reader, not fallback fonts or an undecoded frame.
        await page.evaluate(async () => {
          await document.fonts.ready;
          await document.querySelector('#reader .reader-page-art').decode();
          await document.querySelector('.reader-title-art > img,.reader-companion-title > img')?.decode();
        });
        // Calibration deliberately restores the rejected desktop width/margin.
        if (process.env.LIBRARY_TEST_INJECT_GUTTERS === "1" && width > 1487) {
          await page.addStyleTag({ content: '#reader .book--reference-zine{width:1487px!important;max-width:1487px!important}' });
        }
        if (process.env.LIBRARY_TEST_INJECT_ART_OVERLAP === "1" && width > 820) {
          await page.addStyleTag({ content: '#reader .book--reference-zine .txt{padding-left:100px!important}' });
        }
        if (process.env.LIBRARY_TEST_INJECT_LEFT_ACTIONS === "1") {
          await page.addStyleTag({ content: '#reader .reader-save-book{margin-left:0!important} #reader #reader-close{margin-left:auto!important}' });
        }
        if (process.env.LIBRARY_TEST_INJECT_RETYPED_TITLE === "1" && id === 'ai-fundamentals-101') {
          await page.locator('#rt').evaluate(title => { title.textContent = 'AI Fundamentals 101'; });
        }
        if (process.env.LIBRARY_TEST_INJECT_BLANK_COMPACT_FRAME === "1" && width <= 1199) {
          await page.locator('#reader-page-art-mobile').evaluate(source => {
            source.srcset = '/assets/library-reader/ai-fundamentals-frame-mobile-imagegen-v6.png';
          });
          await page.locator('#reader .reader-page-art').evaluate(img => img.decode());
        }
        if (process.env.LIBRARY_TEST_INJECT_LATE_TEXT_OVERLAP === '1') {
          await page.locator('#rtxt').evaluate(text => {
            const paragraph = [...text.querySelectorAll('p')].filter(p => p.innerText.trim() && p.getBoundingClientRect().height > 0).at(-1);
            if (!paragraph) throw Error('Calibration requires a laid-out final paragraph');
            paragraph.style.setProperty('transform', 'translateX(-500px)', 'important');
          });
        }
        const geometry = await page.locator("#reader").evaluate(node => {
          const book = node.querySelector('.book').getBoundingClientRect();
          const text = node.querySelector('#rtxt');
          const img = node.querySelector('.reader-page-art');
          const frame = img.getBoundingClientRect();
          const scale = Math.max(frame.width / img.naturalWidth, frame.height / img.naturalHeight);
          const compact = /(?:fundamentals|working|answers|dictionary)-phone-imagegen-v2/.test(img.currentSrc);
          const artRight = compact ? frame.left + 149 * scale : frame.left + 280 * scale - (img.naturalWidth * scale - frame.width) / 2;
          const textLeft = text.getBoundingClientRect().left + parseFloat(getComputedStyle(text).paddingLeft);
          // Include every laid-out text run, even far below the opening screen.
          // A later negative margin must not evade the container-padding guard.
          const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
          let run, textRunCount = 0, minimumTextLeft = Infinity;
          while ((run = walker.nextNode())) {
            if (!run.textContent.trim()) continue;
            const range = document.createRange();
            range.selectNodeContents(run);
            for (const rect of range.getClientRects()) {
              if (rect.width > 0 && rect.height > 0) {
                textRunCount++;
                minimumTextLeft = Math.min(minimumTextLeft, rect.left);
              }
            }
          }
          const band = node.querySelector('.band').getBoundingClientRect();
          const save = node.querySelector('.reader-save-book').getBoundingClientRect();
          const top = node.querySelector('#reader-top').getBoundingClientRect();
          const back = node.querySelector('#reader-close').getBoundingClientRect();
          const titleParts = [...node.querySelectorAll('.reader-title-art,.reader-companion-title')];
          const actions = [...node.querySelectorAll('.reader-actions > *')].map(x => x.getBoundingClientRect()).filter(x => x.width && x.height);
          const titleClear = titleParts.every(part => {
            const r = part.getBoundingClientRect();
            return r.left >= 0 && r.top >= 0 && r.right <= innerWidth && actions.every(a => r.right <= a.left || r.left >= a.right || r.bottom <= a.top || r.top >= a.bottom);
          });
          const titleImage = titleParts[0]?.querySelector('img');
          const edition = node.querySelector('.book').dataset.readerEdition;
          const companionCorrect = edition === 'fundamentals' || (titleParts.length === 1 && titleImage?.naturalWidth > 0 && titleImage.currentSrc.endsWith(`${edition}-title-imagegen-v1.png`) && img.currentSrc.includes(compact ? `${edition}-phone-imagegen-v2.png` : `${edition}-desktop-imagegen-v1.png`));
          const titleOriginal = !node.querySelector('.book--ai-fundamentals-art') || (titleParts.length === 1 && titleImage?.naturalWidth === 1487 && titleImage?.naturalHeight === 1058 && titleImage.currentSrc.includes('ai-fundamentals-approved-title-source.png') && node.querySelector('#rt').getAttribute('aria-label') === 'AI Fundamentals 101');
          const controls = ['#mobile-toc > summary','.reader-save-book','#reader-top','#reader-close'].map(selector => {
            const rect = node.querySelector(selector).getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && rect.left >= 0 && rect.right <= innerWidth + 1 && rect.top >= 0 && rect.bottom <= band.bottom + 1;
          });
          return {
            fullViewport: Math.abs(book.left) < 1 && Math.abs(book.right - innerWidth) < 1 && Math.abs(book.top) < 1 && Math.abs(book.bottom - innerHeight) < 1,
            bookAtTop: [1,innerWidth/2,innerWidth-1].every(x => node.contains(document.elementFromPoint(x,1))),
            controlsVisible: controls.every(Boolean),
            titleClear, titleOriginal, companionCorrect,
            rightActionGroup: Math.abs(top.left - save.right) <= 10 && Math.abs(back.left - top.right) <= 10,
            compactFrameVisible: innerWidth > 1199 || (compact && getComputedStyle(img).objectPosition === '0% 0%' && Math.abs(frame.height-innerHeight)<1 && Math.abs(frame.width/frame.height-img.naturalWidth/img.naturalHeight)<.002),
            artClearance: textLeft - artRight,
            textRunCount, allTextArtClearance: minimumTextLeft - artRight,
            minimumArtClearance: compact ? 14 : 20,
            protectedFrame: compact || /(?:ai-fundamentals-frame-imagegen-v6|(?:working|answers|dictionary)-desktop-imagegen-v1)/.test(img.currentSrc),
            textBottom: text.getBoundingClientRect().bottom
          };
        });
        if (!geometry.fullViewport || !geometry.bookAtTop || !geometry.controlsVisible || !geometry.titleClear || !geometry.titleOriginal || !geometry.companionCorrect || !geometry.rightActionGroup || !geometry.compactFrameVisible || !geometry.textRunCount || geometry.allTextArtClearance < 0 || geometry.textBottom > (width > 560 ? 900 : 844) + 1 || (geometry.protectedFrame && geometry.artClearance < geometry.minimumArtClearance)) {
          failures.push(`${id}@${width}: full-page/art-safe geometry failed ${JSON.stringify(geometry)}`);
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
          orientationOrder: (document.getElementById("rt").getAttribute("aria-label") || document.getElementById("rt").textContent.trim()) === "AI Fundamentals 101" ? Array.from({ length: 20 }, (_, index) => {
            const chapter = index + 1;
            const heading = node.querySelector(`#rtxt [data-source-block="chapter-${chapter}"]`);
            const block = [];
            for (let sibling = heading?.nextElementSibling; sibling && !sibling.matches('h2[data-source-block]'); sibling = sibling.nextElementSibling) block.push(sibling);
            const firstSection = block.findIndex(element => element.matches('h3') && new RegExp(`^${chapter}\\.1\\s+[—-]`, 'i').test(element.innerText.trim()));
            const objective = block.findIndex(element => element.matches('.callout.callout-objective'));
            const keyTerms = block.findIndex(element => element.matches('h3') && /Key Terms Introduced in This Chapter/i.test(element.innerText));
            const secondSection = block.findIndex(element => element.matches('h3') && new RegExp(`^${chapter}\\.2\\s+[—-]`, 'i').test(element.innerText.trim()));
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
        await page.waitForFunction(() => {
          return !document.getElementById("mobile-toc").open &&
            document.getElementById("reader-current-section").textContent.trim() !== "Start of book" &&
            document.getElementById("rtxt").scrollTop > 0 &&
            document.querySelectorAll("#rtxt .reader-spread").length === 0;
        });
        await page.locator("#reader-top").click();
        await page.waitForFunction(() => document.querySelectorAll("#rtxt .reader-spread").length === 0 && document.getElementById("rtxt").scrollTop < 2);
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
  console.log(`LIBRARY OPENING BOOKS PASS · preview_to_open=${books.length} · full_reader=${books.map(([id]) => id).join(",")} · continuous_scroll=true · persistent_navigation=${books.length}x${widths.length}_viewports · full_viewport_and_art_clearance=true`);
})().catch(error => {
  console.error(`LIBRARY OPENING BOOKS FAIL: ${error.stack || error}`);
  server.close();
  process.exit(1);
});
