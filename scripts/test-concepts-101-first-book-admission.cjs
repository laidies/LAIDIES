#!/usr/bin/env node

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(process.cwd());
const evidenceRoot = path.join(
  root,
  "operations/product-stewards/library/evidence-concepts-101-first-book-admission-2026-08-03"
);
const candidateRoot = path.join(evidenceRoot, "candidate-root");
const playwrightRoot =
  process.env.PLAYWRIGHT_CORE_PATH ||
  "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core";

const EXPECTED = Object.freeze({
  content: "bb25fae48b640f53112bd9191391e66dbbf5bf4a8603d6c5bd55a8cf85508f4b",
  claims: "d8b5abefa36ce3921f206d9f4311828f01e38a54d6dd5fa2fc2999ae442fe44a",
  puffy: "c66f73109e4c74fd84129d512afc5ddd970f6f4fe6c339bf3ef2e630f6757efe",
  compiler: "40e03401be37261d757a1fed52b624832dafaf922f69028dd17981f2696bfa3e"
});
const CONTENT_VERSION = "concepts-101-2026-08-03.1";
const STICKERS = [
  "usable-25/01-heart-sunglasses.png",
  "usable-25/02-flip-phone-charm.png",
  "usable-25/03-holographic-cd.png",
  "usable-25/04-pink-boombox.png",
  "usable-25/05-pink-digital-camera.png",
  "usable-25/06-retro-computer-heart.png",
  "usable-25-images/52-holographic-butterfly.png",
  "usable-25-images/53-pink-platform-boot.png",
  "usable-25-images/54-translucent-gem-ring.png",
  "usable-25-images/55-purple-pink-sparkle-star.png"
];
const POUCH = STICKERS.map((file, index) => ({
  file,
  purpose: `My purpose ${index + 1}`
}));
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

function hash(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const checks = [];
const failures = [];
function check(value, label) {
  checks.push(label);
  if (!value) failures.push(label);
}
function rejects(fn, fragment, label) {
  try {
    fn();
    check(false, label);
  } catch (error) {
    check(String(error.message).includes(fragment), label);
  }
}
function savedPairIsExact(records, sectionId) {
  return (
    records.length === 2 &&
    records.some(
      (item) =>
        item.section_id === "" &&
        item.content_version === CONTENT_VERSION &&
        item.sticker === STICKERS[2]
    ) &&
    records.some(
      (item) =>
        item.section_id === sectionId &&
        item.content_version === CONTENT_VERSION &&
        item.sticker === STICKERS[5]
    )
  );
}
function accountCopyIsTruthful(source) {
  return (
    source.includes("not synced, owned, rewarded or backed up by the account") &&
    !/Puffy (?:saves|shortcuts) (?:are|will be) (?:synced|backed up)/i.test(source)
  );
}

(async () => {
  const compilerPath = path.join(root, "scripts/compile-library-admission.mjs");
  const {
    assertLibraryAdmissionFreshness,
    compileAdmissionManifest
  } = await import(pathToFileURL(compilerPath));
  const manifestPath = path.join(
    candidateRoot,
    "content/library-books/admission-manifest.json"
  );
  const candidateLibraryPath = path.join(candidateRoot, "library.html");
  const candidateContentPath = path.join(
    candidateRoot,
    "operations/evals/library-rejected-artifacts/concepts-101-3bf3d6bddd659af0.html"
  );
  const productionClaimsPath = path.join(
    root,
    "content/library-books/concepts-101.claims.json"
  );
  const puffyPath = path.join(root, "content/site/puffy-bookmarks.js");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const row = manifest.books[0];

  check(
    manifest.books.length === 1 &&
      row.book_id === "concepts-101" &&
      row.status === "available",
    "candidate manifest admits Concepts 101 and no other book"
  );
  check(
    manifest.authority ===
      "LOCAL_MAKER_CANDIDATE_ONLY_NO_PRODUCTION_OR_RELEASE_AUTHORITY",
    "candidate authority is explicitly local and non-production"
  );
  check(hash(candidateContentPath) === EXPECTED.content, "candidate content exact hash");
  check(hash(productionClaimsPath) === EXPECTED.claims, "claims ledger exact hash");
  check(hash(puffyPath) === EXPECTED.puffy, "Puffy implementation exact hash");
  check(hash(compilerPath) === EXPECTED.compiler, "real compiler exact hash");
  const cardSource =
    fs.readFileSync(path.join(root, "laidies-card.html"), "utf8") +
    fs.readFileSync(puffyPath, "utf8");
  check(accountCopyIsTruthful(cardSource), "account-backed state retains explicit local-only truth");
  check(
    !accountCopyIsTruthful(
      cardSource.replace(
        "not synced, owned, rewarded or backed up by the account",
        "Puffy saves are synced and backed up by the account"
      )
    ),
    "calibration: false account-sync copy is rejected"
  );
  check(
    assertLibraryAdmissionFreshness({ root: candidateRoot }).admitted.join(",") ===
      "concepts-101",
    "candidate Library is freshly compiled from the exact one-book manifest"
  );
  const compiled = compileAdmissionManifest(manifest, { root: candidateRoot });
  check(
    Object.keys(compiled).join(",") === "concepts-101" &&
      compiled["concepts-101"].contentVersion === CONTENT_VERSION,
    "real compiler exposes the exact Concepts source and content version"
  );

  rejects(
    () =>
      compileAdmissionManifest(
        { books: [{ ...row, status: "hold" }] },
        { root: candidateRoot }
      )["concepts-101"].sourcePath,
    "Cannot read",
    "calibration: held record cannot be treated as admitted"
  );
  rejects(
    () =>
      compileAdmissionManifest(
        { books: [{ ...row, artifact_sha256: "0".repeat(64) }] },
        { root: candidateRoot }
      ),
    "hash",
    "calibration: wrong artifact hash fails closed"
  );
  rejects(
    () =>
      compileAdmissionManifest(
        { books: [{ ...row, content_version: "wrong-version" }] },
        { root: candidateRoot }
      ),
    "content version",
    "calibration: wrong content version fails closed"
  );
  rejects(
    () =>
      compileAdmissionManifest(
        {
          books: [
            row,
            {
              ...row,
              book_id: "how-to-check",
              source_path:
                "/content/library-books/rendered/verification-rulebook.html"
            }
          ]
        },
        { root: candidateRoot }
      ),
    "absent",
    "calibration: a second unavailable artifact cannot enter the candidate"
  );

  const candidateLibrary = fs.readFileSync(candidateLibraryPath, "utf8");
  const heldLibrary = candidateLibrary.replace(
    /\/\* LIBRARY_ADMISSION_COMPILED_START \*\/[\s\S]*?(?=\/\* LIBRARY_ADMISSION_COMPILED_END \*\/)/,
    "/* LIBRARY_ADMISSION_COMPILED_START */\n{}\n"
  );
  check(
    heldLibrary !== candidateLibrary &&
      /LIBRARY_ADMISSION_COMPILED_START \*\/\n\{\}/.test(heldLibrary),
    "calibration: held Library successor is materially different"
  );

  if (process.argv.includes("--preflight-only")) {
    if (failures.length) {
      console.error("CONCEPTS 101 FIRST-BOOK ADMISSION PREFLIGHT FAIL");
      failures.forEach((label) => console.error(`- ${label}`));
      process.exit(1);
    }
    console.log(`CONCEPTS 101 FIRST-BOOK ADMISSION PREFLIGHT PASS checks=${checks.length} browser_checks=SKIPPED`);
    return;
  }

  const server = http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    const relative =
      decodeURIComponent(url.pathname).replace(/^\/+/, "") || "library.html";
    const candidateTarget = path.resolve(candidateRoot, relative);
    const repositoryTarget = path.resolve(root, relative);
    let target = fs.existsSync(candidateTarget)
      ? candidateTarget
      : repositoryTarget;
    if (
      (!target.startsWith(candidateRoot + path.sep) &&
        !target.startsWith(root + path.sep)) ||
      !fs.existsSync(target) ||
      fs.statSync(target).isDirectory()
    ) {
      response.writeHead(404).end("not found");
      return;
    }
    response.writeHead(200, {
      "content-type": mime[path.extname(target)] || "application/octet-stream",
      "cache-control": "no-store"
    });
    fs.createReadStream(target).pipe(response);
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true
  });
  const external = [];
  const pageErrors = [];

  async function makePage({
    viewport = { width: 390, height: 844 },
    card = false,
    board,
    pouch,
    verifiedAccount = false,
    denyBoardWrites = false,
    corruptPouch = false
  } = {}) {
    const context = await browser.newContext({ viewport });
    await context.addInitScript(
      ({ card, board, pouch, verifiedAccount, denyBoardWrites, corruptPouch }) => {
        if (card) {
          localStorage.setItem(
            "laidies_resident_card_v1",
            JSON.stringify({ version: 1, fields: { displayName: "Concepts reader" } })
          );
        }
        if (board !== undefined) {
          localStorage.setItem("laidies_puffies_board", JSON.stringify(board));
        }
        if (pouch !== undefined) {
          localStorage.setItem(
            "laidies_puffy_sticker_pouch",
            corruptPouch ? "{not-json" : JSON.stringify(pouch)
          );
        }
        if (verifiedAccount) window.LAIDIES_PUFFY_VERIFIED_ACCOUNT = true;
        if (denyBoardWrites) {
          const nativeSet = Storage.prototype.setItem;
          Storage.prototype.setItem = function (key, value) {
            if (key === "laidies_puffies_board") {
              throw new DOMException("board denied", "SecurityError");
            }
            return nativeSet.call(this, key, value);
          };
        }
      },
      { card, board, pouch, verifiedAccount, denyBoardWrites, corruptPouch }
    );
    const page = await context.newPage();
    page.setDefaultTimeout(8000);
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.route("**/*", async (route) => {
      if (route.request().url().startsWith(origin)) return route.continue();
      external.push(route.request().url());
      return route.abort();
    });
    return { context, page };
  }

  async function openConcepts(page) {
    await page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    const cover = page.locator('button.bk[aria-label="Preview Concepts 101"]');
    await cover.focus();
    await cover.evaluate((node) => node.click());
    await page.waitForSelector("#book-preview-read:not([hidden])");
    const preview = await page.evaluate(() => ({
      title: document.getElementById("book-preview-title").textContent.trim(),
      summary: document.getElementById("book-preview-summary").textContent.trim(),
      status: document.getElementById("book-preview-status").textContent.trim(),
      availability: document.getElementById("book-preview-meta").textContent.trim()
    }));
    check(
      preview.title === "Concepts 101" &&
        preview.summary.length >= 70 &&
        /Ready to read now/i.test(preview.status) &&
        /Availability:\s*Ready to read now/i.test(preview.availability),
      "cover preview explains what the book contains and that it is available before opening"
    );
    await page.locator("#book-preview-read").click();
    await page.waitForSelector("#rtxt h2", { state: "attached" });
    return cover;
  }

  try {
    const noCard = await makePage();
    await openConcepts(noCard.page);
    await noCard.page.locator(".book .band .puffy-btn").click();
    check(
      (await noCard.page.locator('.puffy-card-required[role="dialog"]').count()) === 1 &&
        /Resident Card/i.test(
          await noCard.page.locator(".puffy-card-required").innerText()
        ),
      "first-time reader can read but cannot falsely save without a Resident Card"
    );
    await noCard.context.close();

    const reader = await makePage({
      viewport: { width: 1440, height: 1000 },
      card: true,
      pouch: POUCH
    });
    const opener = await openConcepts(reader.page);
    const fullState = await reader.page.evaluate(() => {
      const dialog = document.getElementById("reader");
      const headings = [...document.querySelectorAll("#rtxt h2,#rtxt h3")];
      return {
        dialogRole: dialog.getAttribute("role"),
        modal: dialog.getAttribute("aria-modal"),
        title: document.getElementById("rt").textContent.trim(),
        h2: document.querySelectorAll("#rtxt h2").length,
        toc: document.querySelectorAll("#rtoc a").length,
        unique: new Set(headings.map((heading) => heading.id)).size === headings.length,
        receiptPuffies: document.querySelectorAll(
          "#rtxt .receipts [data-puffy-title],#rtxt .receipts .puffy-save-row"
        ).length,
        overflow: dialog.scrollWidth - dialog.clientWidth,
        pageFlip: document.querySelectorAll(
          ".page-flip,.page-turn,[aria-label*='next page' i],[aria-label*='previous page' i]"
        ).length
      };
    });
    check(
      fullState.dialogRole === "dialog" &&
        fullState.modal === "true" &&
        fullState.title === "Concepts 101" &&
        fullState.h2 === 6 &&
        fullState.toc === 6 &&
        fullState.unique &&
        fullState.receiptPuffies === 0 &&
        fullState.overflow <= 1 &&
        fullState.pageFlip === 0,
      "desktop reader is one accessible continuous book with six contents routes and no page flip"
    );
    check(
      await reader.page.locator("#reader-close").evaluate(
        (node) => node === document.activeElement
      ),
      "reader gives keyboard focus to its Close control"
    );
    await reader.page.keyboard.press("Escape");
    check(
      await opener.evaluate((node) => node === document.activeElement),
      "Escape closes the reader and restores the exact cover focus"
    );
    await opener.evaluate((node) => node.click());
    await reader.page.locator("#book-preview-read").click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });

    const whole = reader.page.locator(".book .band .puffy-btn");
    const secondTry = reader.page
      .getByRole("heading", { name: "Try this", exact: true })
      .nth(1);
    const secondTryId = await secondTry.getAttribute("id");
    const section = secondTry.locator("xpath=following-sibling::*[1][contains(@class,'puffy-save-row')]//button");
    check(
      /save this book/i.test((await whole.getAttribute("aria-label")) || "") &&
        /save this section/i.test((await section.getAttribute("aria-label")) || ""),
      "whole-book and exact-section controls have distinct accessible names"
    );

    await whole.click();
    check(
      (await reader.page.locator(".puffy-option").count()) === 10 &&
        (await reader.page.locator(".puffy-option").allTextContents()).join("|") ===
          POUCH.map((item) => item.purpose).join("|"),
      "whole-book picker exposes exactly the configured 10 active stickers and purposes"
    );
    await reader.page.locator(".puffy-option").nth(2).click();
    await section.click();
    check(
      (await reader.page.locator(".puffy-option").count()) === 10,
      "exact-section picker exposes the same configured 10 active stickers"
    );
    await reader.page.locator(".puffy-option").nth(5).click();
    const saved = await reader.page.evaluate(() =>
      JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]")
    );
    check(
      savedPairIsExact(saved, secondTryId) &&
        saved.every(
          (item) =>
            item.schema_version === 2 &&
            item.book_id === "concepts-101" &&
            item.content_version === "concepts-101-2026-08-03.1"
        ) &&
        saved.some(
          (item) =>
            item.section_id === "" &&
            item.url === "/library.html#concepts-101" &&
            item.sticker === STICKERS[2]
        ) &&
        saved.some(
          (item) =>
            item.section_id === secondTryId &&
            item.url ===
              `/library.html#concepts-101::${encodeURIComponent("@" + secondTryId)}` &&
            item.sticker === STICKERS[5]
        ),
      "whole-book and exact duplicate-titled section writes round-trip with exact version and chosen sticker"
    );
    check(
      !savedPairIsExact(
        saved.map((item) =>
          item.section_id === secondTryId
            ? { ...item, section_id: "book-section-try-this" }
            : item
        ),
        secondTryId
      ),
      "calibration: a wrong exact-section identity is rejected"
    );
    check(
      !savedPairIsExact(
        saved.map((item) =>
          item.section_id === secondTryId
            ? { ...item, sticker: STICKERS[4] }
            : item
        ),
        secondTryId
      ),
      "calibration: a wrong chosen sticker is rejected"
    );

    await reader.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    await reader.page.waitForSelector(".puffy-item");
    check(
      (await reader.page.locator(".puffy-item").count()) === 2 &&
        (await reader.page.locator(".puffy-item-main").count()) === 2 &&
        (await reader.page.locator(".puffy-peel").count()) === 2 &&
        (await reader.page.locator(".puffy-item-main").first().getAttribute("aria-label")).includes(
          "publication status is checked again"
        ),
      "My Closet shows separate reopen and remove controls for both saved objects"
    );
    const sectionLink = reader.page.locator(
      `.puffy-item-main[data-puffy-section-id="${secondTryId}"]`
    );
    await sectionLink.click();
    await reader.page.waitForSelector(
      `#rtxt #${secondTryId}[aria-current="location"]`
    );
    check(
      (await reader.page.locator("#reader").getAttribute("aria-hidden")) === "false" &&
        (await reader.page.locator("#rtxt .puffy-save-row:visible").count()) === 1,
      "Closet reopens the exact saved section through the current admitted reader"
    );
    await reader.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    await reader.page.waitForSelector(".puffy-item");
    await reader.page.locator(
      `.puffy-item-main[data-puffy-section-id="${secondTryId}"] + .puffy-peel`
    ).click();
    check(
      (await reader.page.locator(".puffy-item").count()) === 1 &&
        (await reader.page.evaluate(() =>
          JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]")
        )).length === 1,
      "Closet removal updates both visible board and verified device storage"
    );

    await reader.page.route(`${origin}/library.html*`, (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html; charset=utf-8",
        body: heldLibrary
      })
    );
    await reader.page.locator(".puffy-item-main").click();
    await reader.page.waitForFunction(() =>
      document
        .getElementById("library-status")
        ?.textContent.includes("Concepts 101 is not available yet")
    );
    check(
      (await reader.page.locator("#reader").getAttribute("aria-hidden")) === "true",
      "stale saved shortcut fails closed when current admission is held"
    );
    await reader.context.close();

    for (const width of [390, 320]) {
      const mobile = await makePage({
        viewport: { width, height: width === 390 ? 844 : 700 },
        card: true,
        pouch: POUCH
      });
      await openConcepts(mobile.page);
      const state = await mobile.page.evaluate(() => {
        const dialog = document.getElementById("reader");
        const toc = document.getElementById("mobile-toc");
        const whole = document.querySelector(".book .band .puffy-btn").getBoundingClientRect();
        return {
          overflow: dialog.scrollWidth - dialog.clientWidth,
          bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          mobileTocVisible: getComputedStyle(toc).display !== "none",
          wholeButtonHeight: whole.height,
          titleVisible: document.getElementById("rt").getBoundingClientRect().height > 0
        };
      });
      check(
        state.overflow <= 1 &&
          state.bodyOverflow <= 1 &&
          state.mobileTocVisible &&
          state.wholeButtonHeight >= 38 &&
          state.titleVisible,
        `${width}px reader reflows without clipping and keeps contents and whole-book save operable`
      );
      await mobile.page.locator("#mobile-toc summary").focus();
      await mobile.page.keyboard.press("Enter");
      check(
        (await mobile.page.locator("#rtoc-mobile a").count()) === 6 &&
          (await mobile.page.locator("#mobile-toc").getAttribute("open")) !== null,
        `${width}px section finder is keyboard-operable and complete`
      );
      await mobile.context.close();
    }

    const zoom = await makePage({
      viewport: { width: 720, height: 500 },
      card: true,
      pouch: POUCH
    });
    await openConcepts(zoom.page);
    const zoomState = await zoom.page.evaluate(() => {
      document.body.style.zoom = "200%";
      const dialog = document.getElementById("reader");
      const close = document.getElementById("reader-close");
      return {
        bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        dialogOverflow: dialog.scrollWidth - dialog.clientWidth,
        closeVisible: close.getBoundingClientRect().width > 0,
        contentVisible: document.getElementById("rtxt").getBoundingClientRect().width > 0
      };
    });
    check(
      zoomState.dialogOverflow <= 1 &&
        zoomState.closeVisible &&
        zoomState.contentVisible,
      "200 percent content zoom preserves the reader, close control and reflow"
    );
    await zoom.context.close();

    const denied = await makePage({
      card: true,
      pouch: POUCH,
      denyBoardWrites: true
    });
    await openConcepts(denied.page);
    await denied.page.locator(".book .band .puffy-btn").click();
    await denied.page.locator(".puffy-option").first().click();
    check(
      (await denied.page.locator('#puffyStorageStatus[role="alert"]').count()) === 1 &&
        !(await denied.page.locator(".book .band .puffy-btn").getAttribute("class")).includes(
          "is-placed"
        ) &&
        (await denied.page.evaluate(
          () => localStorage.getItem("laidies_puffies_board")
        )) === null,
      "storage denial reports failure and cannot show or store a false save"
    );
    await denied.context.close();

    const validRecord = {
      schema_version: 2,
      id: "library-book-concepts-101",
      book_id: "concepts-101",
      section_id: "",
      content_version: CONTENT_VERSION,
      title: "Concepts 101",
      summary: "Saved book · SUNNYVAiLE LIBRAiRY",
      url: "/library.html#concepts-101",
      sticker: STICKERS[0],
      purpose: "",
      placedAt: "2026-08-03T16:30:00.000Z"
    };
    const corrupt = await makePage({
      card: true,
      board: [validRecord, { ...validRecord, id: "bad", url: "javascript:alert(1)" }],
      pouch: POUCH,
      corruptPouch: true
    });
    await corrupt.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
      waitUntil: "domcontentloaded"
    });
    await corrupt.page.waitForSelector("#puffyRecoveryStatus");
    check(
      (await corrupt.page.locator(".puffy-item").count()) === 1 &&
        (await corrupt.page.locator(".puffy-item-main").getAttribute("href")).endsWith(
          "/library.html#concepts-101"
        ) &&
        /damaged|unsafe/i.test(
          await corrupt.page.locator("#puffyRecoveryStatus").innerText()
        ) &&
        (await corrupt.page.locator("#puffyPouch img").count()) === 10,
      "corrupt board and pouch recover visibly while retaining the valid save and 10 safe stickers"
    );
    await corrupt.context.close();

    const stateCases = [
      {
        expected: "first-time",
        options: {},
        copy: "Make your Resident Card"
      },
      {
        expected: "returning-without-card",
        options: { board: [validRecord] },
        copy: "older Puffy saves"
      },
      {
        expected: "device-local-card",
        options: { card: true },
        copy: "does not add Library access, login, backup or sync"
      },
      {
        expected: "verified-account-local-puffy",
        options: { verifiedAccount: true },
        copy: "not synced, owned, rewarded or backed up by the account"
      }
    ];
    for (const testCase of stateCases) {
      const state = await makePage(testCase.options);
      await state.page.goto(`${origin}/laidies-card.html#puffyPouch`, {
        waitUntil: "domcontentloaded"
      });
      check(
        (await state.page.locator("html").getAttribute("data-puffy-visitor-state")) ===
          testCase.expected &&
          (await state.page.locator("#puffyVisitorState").innerText()).includes(
            testCase.copy
          ),
        `${testCase.expected} state is separately labelled with truthful local-only copy`
      );
      await state.context.close();
    }

    check(pageErrors.length === 0, "all tested journeys produce zero page errors");
    check(
      external.every((url) => !/library-books|laidies\.ai/.test(url)),
      "browser test uses no external content or publication endpoint"
    );
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error("CONCEPTS 101 FIRST-BOOK ADMISSION FAIL");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log("CONCEPTS 101 FIRST-BOOK ADMISSION PASS");
  console.log(`checks=${checks.length}`);
  console.log(`external_requests_blocked=${external.length}`);
})().catch((error) => {
  console.error(
    "CONCEPTS 101 FIRST-BOOK ADMISSION FAIL:",
    error.stack || error.message
  );
  process.exitCode = 1;
});
