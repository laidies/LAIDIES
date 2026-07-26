#!/usr/bin/env node

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(process.env.LIBRARY_ROOT || process.cwd());
const playwrightRoot =
  process.env.PLAYWRIGHT_CORE_PATH ||
  path.resolve(process.cwd(), ".ds-sync/node_modules/playwright-core");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp"
};

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(
    new URL(request.url, "http://127.0.0.1").pathname
  );
  const relative = pathname === "/" ? "library.html" : pathname.replace(/^\/+/, "");
  const target = path.resolve(root, relative);
  if (
    !target.startsWith(root + path.sep) ||
    !fs.existsSync(target) ||
    fs.statSync(target).isDirectory()
  ) {
    response.writeHead(404).end("not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime[path.extname(target)] || "application/octet-stream"
  });
  fs.createReadStream(target).pipe(response);
});

(async () => {
  const { chromium } = await import(
    pathToFileURL(path.join(playwrightRoot, "index.mjs"))
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true
  });
  const failures = [];
  const checks = [];
  const external = [];
  const publicationRequests = [];
  const pageErrors = [];

  function check(value, label) {
    checks.push(label);
    if (!value) failures.push(label);
  }

  async function makePage(options = {}) {
    const context = await browser.newContext({
      viewport: options.viewport || { width: 390, height: 844 }
    });
    if (options.storageDenied) {
      await context.addInitScript(() => {
        Storage.prototype.setItem = function () {
          throw new DOMException("denied", "SecurityError");
        };
      });
    }
    if (Object.prototype.hasOwnProperty.call(options, "boardSeed")) {
      await context.addInitScript((seed) => {
        localStorage.setItem("laidies_puffies_board", JSON.stringify(seed));
      }, options.boardSeed);
    }
    const page = await context.newPage();
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.setDefaultTimeout(7000);
    await page.route("**/*", async (route) => {
      const url = route.request().url();
      if (/attacker\.invalid|\/content\/library-books\/|\/%2f%2f/i.test(url)) {
        publicationRequests.push(url);
      }
      if (options.failVocab && /rendered\/vocab-101\.html/.test(url)) {
        return route.abort();
      }
      if (url.startsWith(origin)) return route.continue();
      external.push(url);
      return route.abort();
    });
    return { context, page };
  }

  try {
    const baseline = await makePage();
    await baseline.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await baseline.page.waitForSelector(".stage-book");
    check(
      (await baseline.page.locator(".stage-book").count()) === 15,
      "complete 15-book catalogue renders"
    );
    check(
      (await baseline.page.locator(".stage-book[data-library-status=hold]").count()) ===
        8 &&
        (await baseline.page
          .locator(".stage-book[data-library-status=preview]")
          .count()) === 7,
      "catalogue exposes eight holds and seven previews"
    );
    check(
      (await baseline.page.locator("button.stage-book").count()) === 0 &&
        (await baseline.page.locator("button.mobile-book").count()) === 0,
      "no held or preview cover is operable"
    );
    check(
      (await baseline.page.locator("#library-status").innerText()).includes(
        "reviewed book by book"
      ) && (await baseline.page.locator("#reader").isHidden()),
      "newcomer sees truthful shelf status and closed reader"
    );
    check(
      (await baseline.page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )) <= 1,
      "390px newcomer page has no horizontal overflow"
    );
    await baseline.context.close();

    const heldHash = await makePage();
    await heldHash.page.goto(`${origin}/library.html#vocab-101`, {
      waitUntil: "domcontentloaded"
    });
    await heldHash.page.waitForFunction(() =>
      document.querySelector("#library-status")?.textContent.includes(
        "Vocab 101 is not published yet"
      )
    );
    check(
      (await heldHash.page.locator("#reader").isHidden()) &&
        (await heldHash.page.locator("#library-status").innerText()).includes(
          "Architecture and owner review"
        ),
      "held direct hash cannot bypass publication status"
    );
    await heldHash.context.close();

    const jeeves = await makePage();
    await jeeves.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await jeeves.page.fill("#jv-q", "which AI should I use?");
    await jeeves.page.waitForSelector(".jv-answer");
    check(
      (await jeeves.page.locator(".jv-answer-links .jv-held").count()) === 2 &&
        (await jeeves.page.locator(".jv-answer-links button").count()) === 0,
      "Miss Jeeves cannot route around two held book destinations"
    );
    await jeeves.page.fill("#jv-q", "why does AI make up facts?");
    check(
      (await jeeves.page.locator(".jv-answer-links .jv-held").count()) === 2 &&
        (await jeeves.page.locator('.jv-answer-links a[href="/issues/issue-03.html"]').count()) ===
          1,
      "Miss Jeeves labels held books while retaining a real alternate route"
    );
    await jeeves.context.close();

    const takeover = await makePage();
    await takeover.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    const requestsBeforeTakeover = publicationRequests.length;
    const takeoverResult = await takeover.page.evaluate(async () => {
      const attempts = [
        "//attacker.invalid/library-leak",
        "https://attacker.invalid/library-leak",
        "\\\\attacker.invalid\\library-leak",
        "/%2F%2Fattacker.invalid/library-leak",
        "/content/library-books/rendered/vocab-101.html\u0000",
        "/content/library-books/rendered/unknown.html"
      ];
      const initiallyPrivate = window.LAIDIES_LIBRARY_CATALOGUE === undefined;
      window.LAIDIES_LIBRARY_CATALOGUE = Object.create(null);
      for (const source of attempts) {
        window.LAIDIES_LIBRARY_CATALOGUE["vocab-101"] = {
          id: "vocab-101",
          t: "Taken over",
          status: "available",
          statusLabel: "Forged",
          src: source
        };
        openBook("vocab-101");
      }
      try {
        eval("ADMITTED_BOOK_SOURCES['vocab-101']='//attacker.invalid/again'");
      } catch (error) {}
      openBook("vocab-101");
      await new Promise((resolve) => setTimeout(resolve, 50));
      return {
        initiallyPrivate,
        readerHidden: document.getElementById("reader").getAttribute("aria-hidden") === "true",
        status: document.getElementById("library-status").textContent
      };
    });
    check(
      takeoverResult.initiallyPrivate &&
        takeoverResult.readerHidden &&
        takeoverResult.status.includes("Vocab 101 is not published yet"),
      "catalogue authority is private and runtime takeover cannot open a held book"
    );
    check(
      publicationRequests.length === requestsBeforeTakeover,
      "protocol-relative, absolute, backslash, encoded-origin, control and unknown sources cause no request"
    );
    await takeover.context.close();

    const sticker = "usable-25/01-heart-sunglasses.png";
    const validA = {
      id: "valid-a",
      title: "Older valid place",
      summary: "Valid sibling A",
      url: "/library.html#vocab-101",
      sticker,
      purpose: "",
      placedAt: "2026-07-24T10:00:00.000Z"
    };
    const validB = {
      id: "valid-b",
      title: "Valid handbook place",
      summary: "Valid sibling B",
      url: "/handbook.html#getting-started",
      sticker,
      purpose: "Find this again",
      placedAt: "2026-07-24T11:00:00.000Z"
    };
    const duplicateNewer = {
      ...validA,
      title: "Newest valid place",
      placedAt: "2026-07-24T12:00:00.000Z"
    };
    const corruptSeed = [
      validA,
      validB,
      duplicateNewer,
      { ...validA, id: "bad-javascript", url: "javascript:alert(1)" },
      null,
      { ...validA, id: "bad-extra", unexpected: true },
      { ...validA, id: "bad-sticker", sticker: "not-a-real-sticker.png" },
      { ...validA, id: "bad-date", placedAt: "2026-02-31" },
      { ...validA, id: "bad-protocol", url: "//attacker.invalid/puffy" },
      { ...validA, id: "bad-absolute", url: "https://attacker.invalid/puffy" },
      { ...validA, id: "bad-backslash", url: "/library.html\\attacker" },
      { ...validA, id: "bad-encoded", url: "/%2F%2Fattacker.invalid/puffy" },
      { ...validA, id: "bad-control", url: "/library.html#bad\u0000route" },
      { ...validA, id: "bad-unknown", url: "/unknown.html#puffy" }
    ];
    const corrupt = await makePage({ boardSeed: corruptSeed });
    await corrupt.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    await corrupt.page.waitForSelector("#puffyRecoveryStatus");
    check(
      (await corrupt.page.locator(".puffy-item").count()) === 2 &&
        (await corrupt.page.locator(".puffy-item-main").count()) === 2 &&
        (await corrupt.page.locator('.puffy-item-main[href^="javascript:"]').count()) === 0,
      "corrupt, executable and unsafe legacy records are quarantined without breaking the board"
    );
    check(
      await corrupt.page.evaluate(() => {
        const items = JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]");
        return items.length === 2 &&
          items.some((item) => item.id === "valid-a" && item.title === "Newest valid place") &&
          items.some((item) => item.id === "valid-b") &&
          items.every((item) =>
            Object.keys(item).sort().join(",") ===
            "id,placedAt,purpose,sticker,summary,title,url"
          );
      }),
      "recovery preserves valid siblings, keeps newest duplicate and rewrites exact canonical fields"
    );
    check(
      (await corrupt.page.locator("#puffyRecoveryStatus").innerText()).includes(
        "damaged or unsafe device-local Puffy saves"
      ) &&
        Number(await corrupt.page.locator("html").getAttribute("data-puffy-recovered")) >= 12,
      "legacy recovery is visible and reports rejected records"
    );
    await corrupt.context.close();

    const hostileWrite = await makePage();
    await hostileWrite.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await hostileWrite.page.evaluate(() => {
      const fixture = document.createElement("section");
      fixture.id = "puffy-hostile-write";
      fixture.setAttribute("data-puffy-id", "hostile-write");
      fixture.setAttribute("data-puffy-title", "Unsafe write fixture");
      fixture.setAttribute("data-puffy-kind", "section");
      fixture.setAttribute("data-puffy-url", "javascript:alert(1)");
      fixture.innerHTML = "<h2>Unsafe write fixture</h2>";
      document.querySelector("main").appendChild(fixture);
      window.svPuffyScan();
    });
    await hostileWrite.page.locator("#puffy-hostile-write + .puffy-save-row .puffy-btn").click();
    await hostileWrite.page.locator(".puffy-option").first().click();
    check(
      await hostileWrite.page.evaluate(() =>
        JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]").length === 0
      ) &&
        (await hostileWrite.page.locator("#puffyRecoveryStatus").count()) === 1 &&
        !(await hostileWrite.page
          .locator("#puffy-hostile-write + .puffy-save-row .puffy-btn")
          .getAttribute("class")).includes("is-placed"),
      "write-time javascript route is rejected with visible recovery and no false save"
    );
    await hostileWrite.context.close();

    const persistence = await makePage();
    await persistence.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await persistence.page.evaluate(() => {
      const fixture = document.createElement("section");
      fixture.id = "puffy-test-section";
      fixture.setAttribute("data-puffy-id", "library-vocab-101-section-hallucination");
      fixture.setAttribute("data-puffy-title", "Hallucination");
      fixture.setAttribute("data-puffy-kind", "entry");
      fixture.setAttribute("data-puffy-summary", "Vocab 101 · SUNNYVAiLE LIBRAiRY");
      fixture.setAttribute(
        "data-puffy-url",
        "/library.html#vocab-101::Hallucination"
      );
      fixture.innerHTML = "<h2>Hallucination</h2>";
      document.querySelector("main").appendChild(fixture);
      window.svPuffyScan();
    });
    await persistence.page.waitForSelector(
      "#puffy-test-section + .puffy-save-row .puffy-btn"
    );
    await persistence.page
      .locator("#puffy-test-section + .puffy-save-row .puffy-btn")
      .click();
    await persistence.page.locator(".puffy-option").first().click();
    check(
      await persistence.page.evaluate(() => {
        const items = JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]");
        return (
          items.length === 1 &&
          items[0].url === "/library.html#vocab-101::Hallucination"
        );
      }),
      "exact-section Puffy save is read-verified in device-local storage"
    );
    await persistence.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    await persistence.page.waitForSelector(".puffy-item");
    check(
      (await persistence.page.locator(".puffy-item-main").getAttribute("href")) ===
        "/library.html#vocab-101::Hallucination" &&
        (await persistence.page.locator(".puffy-item a button").count()) === 0,
      "My Closet exposes a valid sibling link/remove structure"
    );
    await persistence.page.locator(".puffy-peel").click();
    check(
      (await persistence.page.locator(".puffy-empty").count()) === 1 &&
        (await persistence.page.evaluate(
          () => JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]").length
        )) === 0,
      "Puffy removal updates both storage and visible board"
    );
    await persistence.context.close();

    const denied = await makePage({ storageDenied: true });
    await denied.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await denied.page.evaluate(() => {
      const fixture = document.createElement("section");
      fixture.id = "puffy-denied-section";
      fixture.setAttribute("data-puffy-id", "library-denied");
      fixture.setAttribute("data-puffy-title", "Denied save fixture");
      fixture.setAttribute("data-puffy-kind", "section");
      fixture.setAttribute("data-puffy-url", "/library.html#denied");
      fixture.innerHTML = "<h2>Denied save fixture</h2>";
      document.querySelector("main").appendChild(fixture);
      window.svPuffyScan();
    });
    await denied.page.waitForSelector(
      "#puffy-denied-section + .puffy-save-row .puffy-btn"
    );
    await denied.page
      .locator("#puffy-denied-section + .puffy-save-row .puffy-btn")
      .click();
    await denied.page.locator(".puffy-option").first().click();
    check(
      (await denied.page
        .locator("html")
        .getAttribute("data-puffy-storage")) === "failed" &&
        (await denied.page.locator("#puffyStorageStatus").innerText()).includes(
          "Nothing was saved or removed"
        ) &&
        !(await denied.page.locator("#puffy-denied-section + .puffy-save-row .puffy-btn").getAttribute("class")).includes(
          "is-placed"
        ),
      "storage denial reports persistent truth and claims no save"
    );
    await denied.context.close();

    check(
      external.every((url) => !/lumin|library-books/.test(url)),
      "test makes no external content or evidence request"
    );
    check(publicationRequests.length === 0, "hostile catalogue values produce zero publication request attempts");
    check(pageErrors.length === 0, "hostile null and malformed records cause no page error");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error("LIBRAiRY PRODUCT FAIL");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log("LIBRAiRY PRODUCT PASS");
  console.log(`checks=${checks.length}`);
  console.log(`external_requests_blocked=${external.length}`);
})().catch((error) => {
  console.error("LIBRAiRY PRODUCT FAIL:", error.stack || error.message);
  process.exitCode = 1;
});
