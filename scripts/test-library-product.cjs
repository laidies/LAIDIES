#!/usr/bin/env node

const fs = require("node:fs");
const crypto = require("node:crypto");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(process.env.LIBRARY_ROOT || process.cwd());
let fixtureRoot = null;
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
  const requestRoot =
    request.headers["x-library-fixture"] === "1" && fixtureRoot ? fixtureRoot : root;
  const target = path.resolve(requestRoot, relative);
  if (
    !target.startsWith(requestRoot + path.sep) ||
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
  const { compileAdmissionManifest, compileLibraryAdmission } = await import(
    pathToFileURL(path.join(root, "scripts/compile-library-admission.mjs"))
  );
  fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-library-reader-"));
  fs.mkdirSync(path.join(fixtureRoot, "content/library-books/rendered"), {
    recursive: true
  });
  fs.mkdirSync(path.join(fixtureRoot, "content/site"), { recursive: true });
  fs.copyFileSync(path.join(root, "library.html"), path.join(fixtureRoot, "library.html"));
  /* Vocab 101 is no longer public catalogue inventory. The synthetic reader
     fixture deliberately exposes only the isolated copy so the generic
     admission/reader/Puffy contract can still be exercised without restoring
     the removed title on the real shelves. */
  const fixtureLibraryPath = path.join(fixtureRoot, "library.html");
  fs.writeFileSync(
    fixtureLibraryPath,
    fs.readFileSync(fixtureLibraryPath, "utf8").replace(
      "id:'vocab-101',t:'Vocab 101',listed:false",
      "id:'vocab-101',t:'Vocab 101',listed:true"
    )
  );
  fs.copyFileSync(
    path.join(root, "content/site/site-index.json"),
    path.join(fixtureRoot, "content/site/site-index.json")
  );
  const admittedArtifact =
    '<!doctype html><html><head><meta name="laidies:content-version" content="reader-v1"></head><body><main class="gr-page"><h1>Vocab 101</h1><h2>Deep Link Section</h2><p>Verified reader fixture.</p><section class="term"><h3>Fixture term</h3><p>A second focusable contents destination.</p></section></main></body></html>';
  const artifactPath = path.join(
    fixtureRoot,
    "content/library-books/rendered/vocab-101.html"
  );
  fs.writeFileSync(artifactPath, admittedArtifact);
  const artifactHash = crypto
    .createHash("sha256")
    .update(admittedArtifact)
    .digest("hex");
  const admissionRecord = {
    book_id: "vocab-101",
    status: "available",
    source_path: "/content/library-books/rendered/vocab-101.html",
    content_version: "reader-v1",
    admission_version: "admission-v1",
    source_references: ["source-review-1"],
    claim_references: ["claim-review-1"],
    reviewed_at: "2026-07-26T12:00:00.000Z",
    review_owner: "Library editorial fixture",
    correction_state: "clear",
    artifact_sha256: artifactHash
  };
  fs.writeFileSync(
    path.join(fixtureRoot, "content/library-books/admission-manifest.json"),
    JSON.stringify({ books: [admissionRecord] })
  );
  compileLibraryAdmission({ root: fixtureRoot });

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
  const admissionChecks = [];

  function check(value, label) {
    checks.push(label);
    if (!value) failures.push(label);
  }

  function admissionRejects(record, message) {
    try {
      compileAdmissionManifest({ books: [record] }, { root: fixtureRoot });
      admissionChecks.push(false);
    } catch (error) {
      admissionChecks.push(error.message.includes(message));
    }
  }

  check(
    Object.keys(
      compileAdmissionManifest(
        { books: [{ ...admissionRecord, status: "hold" }] },
        { root: fixtureRoot }
      )
    ).length === 0,
    "held manifest record cannot admit a rendered book"
  );
  check(
    Object.keys(
      compileAdmissionManifest(
        { books: [{ ...admissionRecord, correction_state: "open" }] },
        { root: fixtureRoot }
      )
    ).length === 0,
    "open correction state demotes an otherwise admitted book"
  );
  admissionRejects(
    { ...admissionRecord, source_path: "/content/library-books/rendered/missing.html" },
    "absent"
  );
  admissionRejects(
    { ...admissionRecord, source_path: "//attacker.invalid/vocab-101.html" },
    "source_path"
  );
  admissionRejects(
    { ...admissionRecord, artifact_sha256: "0".repeat(64) },
    "hash"
  );
  admissionRejects(
    { ...admissionRecord, content_version: "reader-v2" },
    "content version"
  );
  check(
    admissionChecks.length === 4 && admissionChecks.every(Boolean),
    "manifest rejects absent, wrong-path, wrong-hash and wrong-version admission"
  );
  try {
    compileAdmissionManifest(
      {
        books: [
          { ...admissionRecord, status: "hold" },
          { ...admissionRecord, status: "hold" }
        ]
      },
      { root: fixtureRoot }
    );
    check(false, "manifest rejects duplicate held identities");
  } catch (error) {
    check(
      error.message.includes("duplicate"),
      "manifest rejects duplicate held identities"
    );
  }

  async function makePage(options = {}) {
    const context = await browser.newContext({
      viewport: options.viewport || { width: 390, height: 844 },
      extraHTTPHeaders: options.fixture ? { "x-library-fixture": "1" } : {}
    });
    let siteIndexRequests = 0;
    if (options.storageDenied) {
      await context.addInitScript(() => {
        Storage.prototype.setItem = function () {
          throw new DOMException("denied", "SecurityError");
        };
      });
    }
    if (Object.prototype.hasOwnProperty.call(options, "boardSeed")) {
      await context.addInitScript(({ seed, cleanupDenied }) => {
        localStorage.setItem("laidies_puffies_board", JSON.stringify(seed));
        if (cleanupDenied) {
          const nativeSetItem = Storage.prototype.setItem;
          Storage.prototype.setItem = function (key, value) {
            if (key === "laidies_puffies_board") {
              throw new DOMException("cleanup denied", "SecurityError");
            }
            return nativeSetItem.call(this, key, value);
          };
        }
      }, { seed: options.boardSeed, cleanupDenied: Boolean(options.cleanupDenied) });
    }
    if (options.cardSeed) {
      await context.addInitScript((seed) => {
        localStorage.setItem("laidies_resident_card_v1", JSON.stringify(seed));
      }, options.cardSeed);
    }
    if (options.verifiedAccount) {
      await context.addInitScript(() => {
        window.LAIDIES_PUFFY_VERIFIED_ACCOUNT = true;
      });
    }
    const page = await context.newPage();
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.setDefaultTimeout(7000);
    await page.route("**/*", async (route) => {
      const url = route.request().url();
      if (/\/content\/site\/site-index\.json/.test(url)) {
        siteIndexRequests++;
        if (options.failSiteIndex) return route.abort();
        if (options.malformedSiteIndex) {
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ _meta: { version: "2026-07-09" }, entries: {} })
          });
        }
        if (options.staleSiteIndex) {
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ _meta: { version: "2020-01-01" }, entries: [] })
          });
        }
      }
      if (
        options.redirectArtifact &&
        /\/content\/library-books\/rendered\/vocab-101\.html/.test(url)
      ) {
        return route.fulfill({
          status: 302,
          headers: { location: "/content/library-books/rendered/redirected.html" },
          body: ""
        });
      }
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
    return { context, page, siteIndexRequests: () => siteIndexRequests };
  }

  try {
    const baseline = await makePage();
    await baseline.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await baseline.page.waitForSelector(".stage-book");
    check(
      (await baseline.page.locator(".stage-book").count()) === 14,
      "current 14-book catalogue renders without removed Vocab 101"
    );
    check(
      (await baseline.page.locator(".stage-book[data-library-status=hold]").count()) ===
        7 &&
        (await baseline.page
          .locator(".stage-book[data-library-status=preview]")
          .count()) === 7,
      "catalogue exposes seven holds and seven previews"
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
          "Removed from the catalogue"
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
    await jeeves.page.waitForFunction(
      () => document.querySelectorAll(".jv-answer-links .jv-held").length === 2
    );
    check(
      (await jeeves.page.locator(".jv-answer-links .jv-held").count()) === 2 &&
        (await jeeves.page.locator(".jv-answer-links button").count()) === 0,
      "Miss Jeeves cannot route around two held book destinations"
    );
    await jeeves.page.fill("#jv-q", "why does AI make up facts?");
    await jeeves.page.waitForFunction(
      () =>
        document.querySelectorAll(".jv-answer-links .jv-held").length === 1 &&
        document.querySelectorAll(
          '.jv-answer-links a[href="/issues/issue-03.html"]'
        ).length === 1
    );
    check(
      (await jeeves.page.locator(".jv-answer-links .jv-held").count()) === 1 &&
        (await jeeves.page.locator('.jv-answer-links a[href="/issues/issue-03.html"]').count()) ===
          1,
      "Miss Jeeves omits removed Vocab and retains the held verification route plus real alternate"
    );
    await jeeves.page.fill("#jv-q", "environment energy");
    await jeeves.page.waitForTimeout(50);
    check(
      (await jeeves.page.locator('a[href="/grimoire/chamber-of-receipts.html"]').count()) === 0,
      "lexical index cannot route around current Library admission state"
    );
    await jeeves.context.close();

    const indexFailure = await makePage({ failSiteIndex: true });
    await indexFailure.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await indexFailure.page.fill("#jv-q", "banana filing system");
    await indexFailure.page.waitForSelector('.jv-error[role="alert"]');
    await indexFailure.page.evaluate(() => {
      document.getElementById("jv-retry").click();
      document.getElementById("jv-retry").click();
    });
    await indexFailure.page.waitForTimeout(100);
    check(
      indexFailure.siteIndexRequests() === 2 &&
        (await indexFailure.page.inputValue("#jv-q")) === "banana filing system" &&
        (await indexFailure.page.locator(".jv-error").count()) === 1,
      "index failure is accessible, preserves the query and retries without duplicate requests"
    );
    await indexFailure.context.close();

    for (const option of ["malformedSiteIndex", "staleSiteIndex"]) {
      const invalidIndex = await makePage({ [option]: true });
      await invalidIndex.page.goto(`${origin}/library.html`, {
        waitUntil: "domcontentloaded"
      });
      await invalidIndex.page.fill("#jv-q", "banana filing system");
      await invalidIndex.page.waitForSelector('.jv-error[role="alert"]');
      check(
        (await invalidIndex.page.locator("#jv-retry").count()) === 1,
        `${option === "malformedSiteIndex" ? "malformed" : "stale"} index fails closed with retry`
      );
      await invalidIndex.context.close();
    }

    const reader = await makePage({ fixture: true, viewport: { width: 900, height: 800 } });
    await reader.page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    const opener = reader.page.locator('button.stage-book[aria-label="Open Vocab 101"]');
    await opener.focus();
    await opener.click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    check(
      (await reader.page.locator("#rtxt").innerText()).includes("Verified reader fixture") &&
        (await reader.page.locator("#reader-close").evaluate((node) => node === document.activeElement)),
      "admitted exact artifact opens in the reader and focuses Close"
    );
    await reader.page.keyboard.press("Shift+Tab");
    check(
      await reader.page.evaluate(() =>
        document.getElementById("reader").contains(document.activeElement) &&
        document.activeElement !== document.getElementById("reader-close")
      ),
      "reader traps reverse Tab at the last dialog control"
    );
    await reader.page.keyboard.press("Escape");
    check(
      await opener.evaluate((node) => node === document.activeElement),
      "Escape closes reader and restores the exact opener"
    );
    await opener.click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    await reader.page.locator("#reader-close").click();
    check(
      await opener.evaluate((node) => node === document.activeElement),
      "Close control restores the exact opener"
    );
    await opener.click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    await reader.page.locator("#reader").click({ position: { x: 2, y: 2 } });
    check(
      await opener.evaluate((node) => node === document.activeElement),
      "reader backdrop closes and restores the exact opener"
    );
    await reader.page.goto(
      `${origin}/library.html?deep-link-fixture=1#vocab-101::${encodeURIComponent("Deep Link Section")}`,
      { waitUntil: "domcontentloaded" }
    );
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    const deepLinkState = await reader.page.evaluate(() => {
        const heading = document.querySelector("#rtxt h2");
        return {
          ariaHidden: document.getElementById("reader").getAttribute("aria-hidden"),
          headingHidden: heading?.hidden,
          headingText: heading?.textContent.trim(),
          bodyClass: document.body.className
        };
      });
    check(
      deepLinkState.ariaHidden === "false" &&
        deepLinkState.headingHidden === false &&
        deepLinkState.headingText === "Deep Link Section",
      "exact-section deep link opens the currently admitted version"
    );
    await reader.context.close();

    const reduced = await makePage({ fixture: true });
    await reduced.page.emulateMedia({ reducedMotion: "reduce" });
    await reduced.page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    check(
      await reduced.page.locator(".stage-book").first().evaluate(
        (node) => parseFloat(getComputedStyle(node).transitionDuration) <= 0.00001
      ),
      "reader page honors reduced-motion preference"
    );
    await reduced.context.close();

    const redirected = await makePage({ fixture: true, redirectArtifact: true });
    await redirected.page.goto(`${origin}/library.html#vocab-101`, {
      waitUntil: "domcontentloaded"
    });
    await redirected.page.waitForSelector("#reader-retry");
    check(
      (await redirected.page.locator('.reader-error[role="alert"]').count()) === 1,
      "reader rejects redirected admitted source"
    );
    await redirected.context.close();

    fs.writeFileSync(artifactPath, admittedArtifact.replace("Verified", "Changed"));
    const mismatch = await makePage({ fixture: true });
    await mismatch.page.goto(`${origin}/library.html#vocab-101`, {
      waitUntil: "domcontentloaded"
    });
    await mismatch.page.waitForSelector("#reader-retry");
    check(
      (await mismatch.page.locator('.reader-error[role="alert"]').count()) === 1 &&
        !(await mismatch.page.locator("#rtxt").innerText()).includes("Changed reader fixture"),
      "reader rejects an artifact whose bytes no longer match the admitted hash"
    );
    await mismatch.context.close();
    fs.writeFileSync(artifactPath, admittedArtifact);

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
          items.find((item) => item.id === "valid-a").schema_version === 2 &&
          items.find((item) => item.id === "valid-a").book_id === "vocab-101" &&
          items.find((item) => item.id === "valid-a").section_id === "" &&
          items.find((item) => item.id === "valid-a").content_version === "legacy-unversioned" &&
          items.every((item) =>
            Object.keys(item).sort().join(",") ===
            "book_id,content_version,id,placedAt,purpose,schema_version,section_id,sticker,summary,title,url"
          );
      }),
      "legacy migration preserves valid siblings, keeps newest duplicate and writes the exact v2 identity fields"
    );
    check(
      (await corrupt.page.locator("#puffyRecoveryStatus").innerText()).includes(
        "damaged or unsafe device-local Puffy saves"
      ) &&
        Number(await corrupt.page.locator("html").getAttribute("data-puffy-recovered")) >= 12,
      "legacy recovery is visible and reports rejected records"
    );
    check(
      (await corrupt.page.locator("html").getAttribute("data-puffy-visitor-state")) ===
        "returning-without-card" &&
        (await corrupt.page.locator("#puffyVisitorState").innerText()).includes(
          "Welcome back on this device"
        ),
      "returning visitor without a Card gets same-device continuation copy"
    );
    await corrupt.context.close();

    const deniedCleanup = await makePage({
      boardSeed: corruptSeed,
      cleanupDenied: true
    });
    await deniedCleanup.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    await deniedCleanup.page.waitForSelector("#puffyRecoveryStatus");
    check(
      (await deniedCleanup.page.locator(".puffy-item").count()) === 2 &&
        Number(await deniedCleanup.page.locator("html").getAttribute("data-puffy-recovered")) >= 12,
      "storage-denied cleanup still ignores unsafe records and preserves valid siblings for this visit"
    );
    check(
      (await deniedCleanup.page.locator("html").getAttribute("data-puffy-recovery-storage")) ===
        "incomplete" &&
        (await deniedCleanup.page.locator("#puffyRecoveryStatus").innerText()).includes(
          "ignored"
        ) &&
        (await deniedCleanup.page.locator("#puffyRecoveryStatus").innerText()).includes(
          "did not let the Library remove"
        ) &&
        !(await deniedCleanup.page.locator("#puffyRecoveryStatus").innerText()).includes(
          "We removed"
        ) &&
        (await deniedCleanup.page.locator("#puffyStorageStatus").innerText()).includes(
          "Nothing was saved or removed"
        ),
      "storage-denied cleanup reports ignored-for-visit truth without falsely claiming removal"
    );
    check(
      await deniedCleanup.page.evaluate(() => {
        const items = JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]");
        return items.length === 14 && items.some((item) => item?.id === "bad-javascript");
      }),
      "storage-denied cleanup leaves original device bytes unchanged"
    );
    await deniedCleanup.context.close();

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
      fixture.setAttribute("data-puffy-book-id", "vocab-101");
      fixture.setAttribute("data-puffy-section-id", "section-3");
      fixture.setAttribute("data-puffy-content-version", "vocab-101.2026-07-26");
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
          items[0].url === "/library.html#vocab-101::Hallucination" &&
          items[0].schema_version === 2 &&
          items[0].book_id === "vocab-101" &&
          items[0].section_id === "section-3" &&
          items[0].content_version === "vocab-101.2026-07-26"
        );
      }),
      "exact-section Puffy save writes read-verified v2 content identity"
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
    check(
      (await persistence.page.locator(".puffy-item-main").getAttribute("aria-label")).includes(
        "publication status is checked again"
      ),
      "Closet reopen copy delegates current admission authority back to the Library"
    );
    await persistence.page.locator(".puffy-item-main").click();
    await persistence.page.waitForFunction(() =>
      document.querySelector("#library-status")?.textContent.includes(
        "Vocab 101 is not published yet"
      )
    );
    check(
      (await persistence.page.locator("#reader").isHidden()) &&
        (await persistence.page.locator("#library-status").innerText()).includes(
          "Removed from the catalogue"
        ),
      "Closet reopen routes back through the current Library admission check"
    );
    await persistence.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    await persistence.page.waitForSelector(".puffy-item");
    await persistence.page.locator(".puffy-peel").click();
    check(
      (await persistence.page.locator(".puffy-empty").count()) === 1 &&
        (await persistence.page.evaluate(
          () => JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]").length
        )) === 0,
      "Puffy removal updates both storage and visible board"
    );
    await persistence.context.close();

    const visitorFirst = await makePage();
    await visitorFirst.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    check(
      (await visitorFirst.page.locator("html").getAttribute("data-puffy-visitor-state")) ===
        "first-time" &&
        (await visitorFirst.page.locator("#puffyVisitorState").innerText()).includes(
          "Resident Card or account is not required"
        ),
      "first-time visitor gets optional device-local Puffy copy"
    );
    await visitorFirst.context.close();

    const visitorCard = await makePage({
      cardSeed: { version: 1, fields: { displayName: "Local LAiDY" } }
    });
    await visitorCard.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    check(
      (await visitorCard.page.locator("html").getAttribute("data-puffy-visitor-state")) ===
        "device-local-card" &&
        (await visitorCard.page.locator("#puffyVisitorState").innerText()).includes(
          "does not add Library access, login, backup or sync"
        ),
      "device-local Card gets separate copy with no identity or sync semantics"
    );
    await visitorCard.context.close();

    const visitorAccount = await makePage({ verifiedAccount: true });
    await visitorAccount.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    check(
      (await visitorAccount.page.locator("html").getAttribute("data-puffy-visitor-state")) ===
        "verified-account-local-puffy" &&
        (await visitorAccount.page.locator("#puffyVisitorState").innerText()).includes(
          "not synced, owned, rewarded or backed up by the account"
        ),
      "verified-account presence remains separate from local Puffy authority"
    );
    await visitorAccount.context.close();

    const crossTabContext = await browser.newContext();
    const crossTabA = await crossTabContext.newPage();
    const crossTabB = await crossTabContext.newPage();
    await Promise.all([
      crossTabA.goto(`${origin}/laidies-card.html#puffyPouch`, { waitUntil: "domcontentloaded" }),
      crossTabB.goto(`${origin}/laidies-card.html#puffyPouch`, { waitUntil: "domcontentloaded" })
    ]);
    const crossTabRecord = {
      schema_version: 2,
      id: "cross-tab-section",
      book_id: "vocab-101",
      section_id: "section-3",
      content_version: "vocab-101.2026-07-26",
      title: "Cross-tab original",
      summary: "Device-local tab fixture",
      url: "/library.html#vocab-101::Hallucination",
      sticker,
      purpose: "",
      placedAt: "2026-07-24T13:00:00.000Z"
    };
    await crossTabA.evaluate((record) => {
      localStorage.setItem("laidies_puffies_board", JSON.stringify([record]));
    }, crossTabRecord);
    await crossTabB.waitForSelector(".puffy-item");
    check(
      (await crossTabB.locator(".puffy-item").count()) === 1,
      "cross-tab create repaints the Closet consumer"
    );
    check(
      (await crossTabB.locator("html").getAttribute("data-puffy-visitor-state")) ===
        "returning-without-card" &&
        (await crossTabB.locator("#puffyVisitorState").innerText()).includes(
          "came from this browser"
        ),
      "cross-tab create refreshes same-device visitor-state truth"
    );
    await crossTabA.evaluate((record) => {
      localStorage.setItem(
        "laidies_puffies_board",
        JSON.stringify([{ ...record, title: "Cross-tab newest", placedAt: "2026-07-24T14:00:00.000Z" }])
      );
    }, crossTabRecord);
    await crossTabB.waitForFunction(() =>
      document.querySelector(".puffy-item b")?.textContent === "Cross-tab newest"
    );
    check(
      (await crossTabB.locator(".puffy-item b").innerText()) === "Cross-tab newest",
      "cross-tab update repaints the newest valid record"
    );
    await crossTabA.evaluate(() => {
      localStorage.setItem("laidies_puffies_board", "[]");
    });
    await crossTabB.waitForSelector(".puffy-empty");
    check(
      (await crossTabB.locator(".puffy-item").count()) === 0,
      "cross-tab remove repaints an empty board"
    );
    check(
      (await crossTabB.locator("html").getAttribute("data-puffy-visitor-state")) ===
        "first-time" &&
        (await crossTabB.locator("#puffyVisitorState").innerText()).includes(
          "only in this browser"
        ),
      "cross-tab removal restores first-visit visitor-state truth"
    );
    await crossTabContext.close();

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
    check(
      publicationRequests.every((url) =>
        /\/content\/library-books\/rendered\/vocab-101\.html$/.test(url)
      ),
      "hostile catalogue values produce zero publication request attempts"
    );
    check(pageErrors.length === 0, "hostile null and malformed records cause no page error");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
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
