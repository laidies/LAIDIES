#!/usr/bin/env node

const fs = require("node:fs");
const crypto = require("node:crypto");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(process.env.LIBRARY_ROOT || process.cwd());
const captureDir = process.env.LIBRARY_CAPTURE_DIR
  ? path.resolve(process.env.LIBRARY_CAPTURE_DIR)
  : null;
const calibrateProductionControls =
  process.env.LIBRARY_PRODUCTION_CONTROL_CALIBRATION === "undersized";
const calibrateShelfGeometry =
  process.env.LIBRARY_SHELF_GEOMETRY_CALIBRATION === "oversubscribed";
const calibrateShelfContact =
  process.env.LIBRARY_SHELF_CONTACT_CALIBRATION === "floating";
const calibrateShelfFixture =
  process.env.LIBRARY_SHELF_FIXTURE_CALIBRATION === "substituted";
const calibrateNoPagination =
  process.env.LIBRARY_NO_PAGINATION_CALIBRATION === "pager";
const calibrateInlineHandler =
  process.env.LIBRARY_INLINE_HANDLER_CALIBRATION === "inline-submit";
const calibratePuffyFocus =
  process.env.LIBRARY_PUFFY_FOCUS_CALIBRATION === "broken-dialog";
const candidateCaptureDir = captureDir ? path.join(captureDir, "candidate") : null;
const fixtureCaptureDir = captureDir ? path.join(captureDir, "fixtures") : null;
if (candidateCaptureDir) fs.mkdirSync(candidateCaptureDir, { recursive: true });
if (fixtureCaptureDir) fs.mkdirSync(fixtureCaptureDir, { recursive: true });
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
const correctionApiSubmissions = [];
const shelfFixtureContract = [
  {
    asset: "assets/building-interiors/library-shelf/delivery-20260722-transparent-v1/size-variants-v4/library-shelf-unit-2-row-full-width-v1.png",
    sha256: "489f83e0826fa358604d3f8ab4fc2adcd7f9807f5c1526882d76b5fbfdca5f7e",
    rowCounts: [2, 2],
    railContacts: [0.475, 0.795]
  },
  {
    asset: "assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png",
    sha256: "e5c34f940bbe7a2802103d87029220e74b526e82f21f661b0e3baf805423fed8",
    rowCounts: [3, 3],
    railContacts: [0.359, 0.619]
  },
  {
    asset: "assets/building-interiors/library-shelf/delivery-20260722-transparent-v1/size-variants-v4/library-shelf-unit-2-row-full-width-v1.png",
    sha256: "489f83e0826fa358604d3f8ab4fc2adcd7f9807f5c1526882d76b5fbfdca5f7e",
    rowCounts: [2, 2],
    railContacts: [0.475, 0.795]
  }
];
const shelfRoomContract = {
  asset: "assets/building-interiors/delivery-20260722-library-interior-no-desk-v1/library-interior-no-desk-v1.png",
  sha256: "0f760eb17993619982762e160aa119d8f4a363a5015af0bf723ac5ab0cc0ac09"
};
function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}
function relativeLuminance(hex) {
  const channels = hex.match(/[a-f0-9]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}
function contrastRatio(first, second) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
function compositeHex(background, foreground, alpha) {
  const bg = background.match(/[a-f0-9]{2}/gi).map((value) => parseInt(value, 16));
  const fg = foreground.match(/[a-f0-9]{2}/gi).map((value) => parseInt(value, 16));
  return bg.map((value, index) =>
    Math.round(value * (1 - alpha) + fg[index] * alpha).toString(16).padStart(2, "0")
  ).join("");
}

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(
    new URL(request.url, "http://127.0.0.1").pathname
  );
  if (pathname === "/api/library-corrections" && request.method === "POST") {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      correctionApiSubmissions.push(payload);
      response.writeHead(201, { "content-type": "application/json", "cache-control": "no-store" });
      response.end(JSON.stringify({ status: "accepted", correction_id: "lc_browser_fixture", receipt_id: "lr_browser_fixture", state: "submitted", created_at: "2026-08-05T20:00:00.000Z", status_reference: "/api/library-corrections/status?receipt=lr_browser_fixture" }));
    });
    return;
  }
  if (pathname === "/api/library-corrections/status" && request.method === "GET") {
    response.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
    response.end(JSON.stringify({ status: "ok", receipt_id: "lr_browser_fixture", state: "submitted", created_at: "2026-08-05T20:00:00.000Z", updated_at: "2026-08-05T20:00:00.000Z" }));
    return;
  }
  const relative = pathname === "/" ? "library.html" : pathname.replace(/^\/+/, "");
  const requestRoot =
    request.headers["x-library-fixture"] === "1" && fixtureRoot ? fixtureRoot : root;
  let targetRoot = requestRoot;
  let target = path.resolve(requestRoot, relative);
  if (
    requestRoot !== root &&
    !fs.existsSync(target) &&
    relative.startsWith("assets/")
  ) {
    targetRoot = root;
    target = path.resolve(root, relative);
  }
  if (
    !target.startsWith(targetRoot + path.sep) ||
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
  fs.mkdirSync(path.join(fixtureRoot, "content/library-books/corrections"), {
    recursive: true
  });
  fs.mkdirSync(path.join(fixtureRoot, "content/site"), { recursive: true });
  fs.copyFileSync(path.join(root, "library.html"), path.join(fixtureRoot, "library.html"));
  const growthFixtureSource = fs.readFileSync(path.join(root, "library.html"), "utf8").replace(
    "];\nconst ADMITTED_BOOK_RECORDS=",
    `,{name:'THE 101s — MORE',sign:'assets/building-interiors/library-shelf/delivery-20260721-signs-v1/library-shelf-sign-101s-v1.png',cap:'More plain-English foundations added without shrinking the existing shelves.',mcap:'More plain-English foundations.',books:[1,2,3,4,5,6,7].map(number=>({id:'growth-fixture-'+number,t:'Growth Fixture '+number,topics:['basics'],status:'hold',statusLabel:'Fixture only',s:'A visible test book in an expanding 101s collection.',img:B+(number%2?'textbook-concepts-101.png':'textbook-briefing-101.png'),c:'#7038c9'}))}];\nconst ADMITTED_BOOK_RECORDS=`
  );
  fs.writeFileSync(path.join(fixtureRoot, "library-growth.html"), growthFixtureSource);
  /* Vocab 101 is no longer public catalogue inventory. The synthetic reader
     fixture deliberately exposes only the isolated copy so the generic
     admission/reader/Puffy contract can still be exercised without restoring
     the removed title on the real shelves. */
  const fixtureLibraryPath = path.join(fixtureRoot, "library.html");
  fs.writeFileSync(
    fixtureLibraryPath,
    fs.readFileSync(fixtureLibraryPath, "utf8")
      .replace(
        "id:'vocab-101',t:'Vocab 101',listed:false",
        "id:'vocab-101',t:'Vocab 101',listed:true"
      )
      .replace("img:'',c:'#245ed1'", "img:B+'textbook-vocab-101.png',c:'#245ed1'")
  );
  fs.copyFileSync(
    path.join(root, "content/site/site-index.json"),
    path.join(fixtureRoot, "content/site/site-index.json")
  );
  fs.copyFileSync(
    path.join(root, "content/site/resident-card-contract-v1.js"),
    path.join(fixtureRoot, "content/site/resident-card-contract-v1.js")
  );
  fs.copyFileSync(
    path.join(root, "content/site/puffy-bookmarks.js"),
    path.join(fixtureRoot, "content/site/puffy-bookmarks.js")
  );
  fs.copyFileSync(
    path.join(root, "content/library-books/corrections/accepted-correction-propagations.json"),
    path.join(fixtureRoot, "content/library-books/corrections/accepted-correction-propagations.json")
  );
  fs.writeFileSync(
    path.join(fixtureRoot, "content/library-books/rejected-artifacts.json"),
    JSON.stringify({ schema_version: "library-rejected-artifacts.v1", authority: "DIRECT_ALI_REJECTION_DEFAULT_DENY", artifacts: [] })
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
  const conceptsArtifactPath = path.join(
    fixtureRoot,
    "content/library-books/rendered/concepts-101.html"
  );
  fs.copyFileSync(
    path.join(root, "content/library-books/rendered/concepts-101.html"),
    conceptsArtifactPath
  );
  const conceptsArtifactHash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(conceptsArtifactPath))
    .digest("hex");
  const rulebookArtifactPath = path.join(
    fixtureRoot,
    "content/library-books/rendered/verification-rulebook.html"
  );
  fs.copyFileSync(
    path.join(root, "content/library-books/rendered/verification-rulebook.html"),
    rulebookArtifactPath
  );
  fs.copyFileSync(
    path.join(root, "content/library-books/verification-rulebook.json"),
    path.join(fixtureRoot, "content/library-books/verification-rulebook.json")
  );
  const rulebookArtifactHash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(rulebookArtifactPath))
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
  const conceptsAdmissionRecord = {
    book_id: "concepts-101",
    status: "available",
    source_path: "/content/library-books/rendered/concepts-101.html",
    content_version: "concepts-101-2026-08-06.1",
    admission_version: "admission-fixture-v1",
    source_references: ["content/library-books/concepts-101.claims.json"],
    claim_references: ["C101-C001", "C101-C002", "C101-C003", "C101-C004", "C101-C005", "C101-C006"],
    reviewed_at: "2026-08-03T13:29:24-07:00",
    review_owner: "Library exact Concepts reader fixture",
    correction_state: "clear",
    artifact_sha256: conceptsArtifactHash
  };
  const rulebookAdmissionRecord = {
    book_id: "how-to-check",
    status: "available",
    source_path: "/content/library-books/rendered/verification-rulebook.html",
    content_version: "sha256-38cd8c629a661e76e2beb6da2531d32a2c1b949c082e08aca6db225f1ac85dc3",
    admission_version: "admission-fixture-v1",
    source_references: ["content/library-books/verification-rulebook.json"],
    claim_references: Array.from({ length: 14 }, (_, index) => `VR-C${String(index + 1).padStart(3, "0")}`),
    reviewed_at: "2026-08-03T14:21:00-07:00",
    review_owner: "Library exact Verification Rulebook reader fixture",
    correction_state: "clear",
    artifact_sha256: rulebookArtifactHash
  };
  const learningEvidencePath = path.join(fixtureRoot, "content/library-books/learning-admission-fixture.md");
  fs.writeFileSync(learningEvidencePath, "Exact synthetic learning-admission fixture.\n");
  const learningEvidenceSha = crypto.createHash("sha256").update(fs.readFileSync(learningEvidencePath)).digest("hex");
  const learningEvidence = { path: "content/library-books/learning-admission-fixture.md", sha256: learningEvidenceSha };
  const learningCriteria = {
    governing_reader_question: "PASS",
    single_causal_mental_model: "PASS",
    truthful_scannable_architecture: "PASS",
    coherent_scope: "PASS",
    recurring_worked_case: "PASS",
    mapped_analogies_with_limits: "PASS",
    nonduplicative_concept_relationships: "PASS",
    synthesis_and_retention_map: "PASS",
    useful_next_experience: "PASS",
    maintenance_and_currentness_contract: "PASS"
  };
  for (const record of [admissionRecord, conceptsAdmissionRecord, rulebookAdmissionRecord]) {
    record.learning_admission = {
      schema_version: "library-book-learning-admission.v1",
      artifact_sha256: record.artifact_sha256,
      learning_intake: learningEvidence,
      architecture_evidence: learningEvidence,
      instructional_verdict: learningEvidence,
      unfamiliar_reader_verdict: learningEvidence,
      criteria: { ...learningCriteria },
      ali_rejection_state: "clear",
      derivative_use: "allowed"
    };
  }
  fs.writeFileSync(
    path.join(fixtureRoot, "content/library-books/admission-manifest.json"),
    JSON.stringify({ books: [admissionRecord, conceptsAdmissionRecord, rulebookAdmissionRecord] })
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
    "version"
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
    let jeevesApiRequests = 0;
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
      if (/\/api\/miss-jeeves(?:\?|$)/.test(url)) {
        jeevesApiRequests++;
        if (options.jeevesApiResponse) {
          return route.fulfill({
            status: options.jeevesApiStatus || 200,
            contentType: "application/json",
            body: JSON.stringify(options.jeevesApiResponse)
          });
        }
      }
      if (/\/content\/site\/site-index\.json/.test(url)) {
        siteIndexRequests++;
        if (options.slowSiteIndex) await new Promise((resolve) => setTimeout(resolve, 450));
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
    return {
      context,
      page,
      siteIndexRequests: () => siteIndexRequests,
      jeevesApiRequests: () => jeevesApiRequests
    };
  }

  try {
    const baseline = await makePage();
    await baseline.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await baseline.page.waitForSelector(".bk");
    const librarySource = fs.readFileSync(path.join(root, "library.html"), "utf8");
    const inspectedLibrarySource = calibrateInlineHandler
      ? librarySource.replace('<form class="jv-form">', '<form class="jv-form" onsubmit="return false">')
      : librarySource;
    check(
      !/\son(?:click|submit|change|input|keydown)\s*=/i.test(inspectedLibrarySource),
      "Library uses closure-local listeners instead of inline event handlers"
    );
    check(
      !/#4b2148\b/i.test(librarySource) &&
        !/rgba?\(\s*75\s*,\s*33\s*,\s*72(?:\s*[,\)])/i.test(librarySource),
      "retired plum is absent in hex and RGB functional forms"
    );
    const wayfindingPresentation = await baseline.page.locator(".shelf-guide").evaluate((guide) => ({
      background: getComputedStyle(guide).backgroundColor,
      backgroundImage: getComputedStyle(guide).backgroundImage,
      colors: [...guide.querySelectorAll("h2,.eyebrow,.shelf-instruction,.catalogue-control,.catalogue-result")]
        .map((node) => getComputedStyle(node).color)
    }));
    const mobileCaptionPresentation = await baseline.page.locator(".mobile-shelf-caption").evaluateAll((captions) =>
      captions.map((caption) => ({
        background: getComputedStyle(caption).backgroundColor,
        colors: [caption, ...caption.querySelectorAll("b,.reel-cue")].map((node) => getComputedStyle(node).color)
      }))
    );
    check(
      wayfindingPresentation.background === "rgba(0, 0, 0, 0)" &&
        wayfindingPresentation.backgroundImage.includes("linear-gradient") &&
        wayfindingPresentation.colors.every((color) => ["rgb(255, 255, 255)", "rgb(101, 227, 238)", "rgb(220, 231, 255)"].includes(color)) &&
        mobileCaptionPresentation.every((caption) =>
          caption.background === "rgba(0, 0, 0, 0)" &&
          caption.colors.every((color) => color === "rgb(7, 20, 47)" || color === "rgb(113, 52, 117)")
        ),
      "catalogue wayfinding uses the current electric Library field with readable LAiDIES typography"
    );
    check(
      (await baseline.page.locator(".department").count()) === 3 &&
        (await baseline.page.locator(".library-room-unit").count()) === 1 &&
        (await baseline.page.locator(".bk").count()) === 14 &&
        librarySource.includes('library-interior-no-desk-v1.png') &&
        librarySource.includes('library-wall-case-3bay-v1.png'),
      "three collections render as distinct bays in the locked integrated Library room and case"
    );
    await baseline.page.waitForFunction(() =>
      [...document.querySelectorAll('.ledge img')].length === 3 &&
      [...document.querySelectorAll('.ledge img')].every((image) => image.complete && image.naturalWidth > 0)
    );
    check(
      (await baseline.page.locator('.ledge img').count()) === 3 &&
        await baseline.page.locator('.ledge img').evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0 && /library-shelf-sign-/.test(image.src))
        ),
      "each department renders its admitted mounted metal sign asset"
    );
    const catalogueCount = await baseline.page.locator(".bk").count();
    const holdCount = await baseline.page.locator(".bk[data-library-status=hold]").count();
    const previewCount = await baseline.page.locator(".bk[data-library-status=preview]").count();
    const sourceReadyCount = await baseline.page.locator(".bk[data-library-status=available]").count();
    check(
      catalogueCount === 14 && holdCount === 3 && previewCount === 7 && sourceReadyCount === 4,
      "catalogue source truth exposes the four-book opening set, three holds and seven previews"
    );
    check(
      (await baseline.page.locator("button.bk").count()) === 14,
      "every held or preview cover remains inspectable without opening the reader"
    );
    await baseline.page.getByRole("button", { name: "Privacy & safety", exact: true }).click();
    check(
      (await baseline.page.locator("button.bk").count()) === 2 &&
        (await baseline.page.getByRole("button", { name: /^Preview Accounts 101\./ }).count()) === 1 &&
        (await baseline.page.getByRole("button", { name: /^Preview What Not to Paste\./ }).count()) === 1,
      "Browse by Topic narrows the physical shelves to the matching books"
    );
    await baseline.page.getByRole("button", { name: "All", exact: true }).click();
    await baseline.page.locator('.bk[data-book-id="accounts-101"]').click();
    check(
      (await baseline.page.locator("#book-preview-title").innerText()).length > 0 &&
        (await baseline.page.locator("#book-preview-summary").innerText()).length > 0 &&
        (await baseline.page.locator("#book-preview-read").isVisible()) &&
        (await baseline.page.locator("#reader").isHidden()),
      "an admitted cover explains its contents before offering the full reader"
    );
    const mobilePreviewPlacement = await baseline.page.locator('#book-preview').evaluate((preview) => ({
      parent: preview.parentElement?.className || '',
      previous: preview.previousElementSibling?.className || '',
      next: preview.nextElementSibling?.className || ''
    }));
    check(
      mobilePreviewPlacement.parent.includes('unit') &&
        mobilePreviewPlacement.previous.includes('library-room-unit') &&
        mobilePreviewPlacement.next === '',
      `on mobile a selected-book preview opens after the complete integrated case, never beside the next collection heading ${JSON.stringify(mobilePreviewPlacement)}`
    );
    const openingBooks = [
      ["concepts-101", "Concepts 101"],
      ["briefing-101", "Briefing 101"],
      ["setup-101", "Setup 101"],
      ["accounts-101", "Accounts 101"]
    ];
    for (const [id, title] of openingBooks) {
      await baseline.page.locator(`.bk[data-book-id="${id}"]`).click();
      check(
        (await baseline.page.locator("#book-preview-title").innerText()).trim() === title &&
          (await baseline.page.locator("#book-preview-read").isVisible()) &&
          (await baseline.page.locator("#reader").isHidden()),
        `${title} has a specific preview and offers its exact admitted reader`
      );
    }
    check(
      (await baseline.page.getByRole("button", { name: /^Preview Concepts 101\. Ready to read now$/ }).count()) === 1 &&
        (await baseline.page.locator("#reader").isHidden()),
      "newcomer hears truthful opening-book status before choosing a reader"
    );
    check(
      (await baseline.page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )) <= 1,
      "390px newcomer page has no horizontal overflow"
    );
    await baseline.context.close();

    const desktopShelf = await makePage({ viewport: { width: 1440, height: 1000 } });
    await desktopShelf.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await desktopShelf.page.waitForSelector(".department .bk");
    await desktopShelf.page.waitForFunction(() =>
      [...document.querySelectorAll(".department .bk img")].every(
        (image) => image.complete && image.naturalWidth > 0
      )
    );
    if (calibrateShelfGeometry) {
      await desktopShelf.page.evaluate(() => {
        const toolsFirstRow = document.querySelectorAll(".department")[1]?.querySelector(".brow--1");
        const book = toolsFirstRow?.querySelector(".bk");
        if (toolsFirstRow && book) toolsFirstRow.append(book.cloneNode(true));
      });
    }
    if (calibrateShelfContact) {
      await desktopShelf.page.addStyleTag({ content: ".brow--1{bottom:57.5%!important;height:38%!important}" });
    }
    if (calibrateShelfFixture) {
      await desktopShelf.page.evaluate(() => {
        const firstFixture = document.querySelector('.library-room-unit .shelf-unit');
        if (firstFixture) {
          firstFixture.style.backgroundImage = "url('assets/building-interiors/library-shelf/delivery-20260722-3-shelf-upright-v1/library-shelf-unit-3-shelf-upright-v1.png')";
        }
      });
    }
    if (calibrateNoPagination) {
      await desktopShelf.page.addStyleTag({ content: ".shelf-pages{display:block!important}" });
      await desktopShelf.page.evaluate(() => {
        const pager = document.createElement('div');
        pager.id = 'shelf-pages';
        pager.className = 'shelf-pages';
        document.querySelector('.libroom')?.after(pager);
        pager.hidden = false;
        pager.innerHTML = '<button type="button">Next</button>';
      });
    }
    const desktopFirstPage = await desktopShelf.page.evaluate(() =>
      [...document.querySelectorAll(".department")].map((department) => ({
        labels: [...department.querySelectorAll(".bk")].map((book) => book.getAttribute("aria-label")),
        rowCounts: [...department.querySelectorAll(".brow")].map((row) => row.querySelectorAll(".bk").length),
        coverHeights: [...department.querySelectorAll(".bk img")].map((cover) => cover.getBoundingClientRect().height),
        fixtureUrl: getComputedStyle(department.closest('.shelf-unit'), '::after').backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] || "",
        roomUrl: getComputedStyle(department.closest('.library-room-unit')).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] || ""
      }))
    );
    const fixtureBytesMatch = shelfFixtureContract.every(({ asset, sha256: expectedSha }) =>
      fs.existsSync(path.join(root, asset)) && sha256(path.join(root, asset)) === expectedSha
    ) && fs.existsSync(path.join(root, shelfRoomContract.asset)) &&
      sha256(path.join(root, shelfRoomContract.asset)) === shelfRoomContract.sha256;
    check(
      desktopFirstPage.every((department, index) =>
        department.rowCounts.filter(Boolean).join(',') === shelfFixtureContract[index].rowCounts.join(',') &&
        decodeURIComponent(new URL(department.fixtureUrl).pathname).endsWith(`/${shelfFixtureContract[index].asset}`) &&
        decodeURIComponent(new URL(department.roomUrl).pathname).endsWith(`/${shelfRoomContract.asset}`) &&
        department.coverHeights.every((height) => height >= 120)
      ) && fixtureBytesMatch,
      "desktop catalogue is bound to the locked room and integrated case bytes, expected books-per-rail and readable covers"
    );
    const shelfContact = await desktopShelf.page.evaluate(() =>
      [...document.querySelectorAll('.shelf-unit')].flatMap((unit) => {
        const unitBox = unit.getBoundingClientRect();
        return [...unit.querySelectorAll('.department')].flatMap(department =>
          [...department.querySelectorAll('.brow')].flatMap((row, index) => {
            if (!row.querySelector('.bk')) return [];
            const bookBox = row.querySelector('.bk img').getBoundingClientRect();
            return [{ collection: Number(department.dataset.collection), row: index + 1, contact: (bookBox.bottom - unitBox.top) / unitBox.height }];
          })
        );
      })
    );
    check(
      shelfContact.length === shelfFixtureContract.reduce((total, fixture) => total + fixture.railContacts.length, 0) &&
        shelfContact.every(({collection,row,contact}) =>
          Math.abs(contact - shelfFixtureContract[collection].railContacts[row - 1]) <= 0.018
        ),
      `every occupied desktop book row meets the rail measured for its exact fixture instead of floating across it ${JSON.stringify(shelfContact)}`
    );
    const shelfStatusAccessibility = await desktopShelf.page.evaluate(() =>
      [...document.querySelectorAll("button.bk")].every((book) => {
        const status = book.querySelector(".bk-status");
        const accessibleStatus = book.querySelector(".sr-only")?.textContent?.trim();
        return Boolean(
          !status && accessibleStatus &&
            book.getAttribute("aria-label")?.includes(accessibleStatus)
        );
      })
    );
    check(
      shelfStatusAccessibility,
      "every shelf cover exposes availability accessibly without a pasted status slab"
    );
    const toolsBooks = desktopFirstPage[1];
    check(
      toolsBooks.labels.length === 6 && toolsBooks.rowCounts.filter(Boolean).join(',') === '3,3' &&
        ["Who's Who in AI", 'ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Perplexity'].every(title =>
          toolsBooks.labels.some(label => label.includes(title))
        ) &&
        (await desktopShelf.page.locator('.shelf-pages').count()) === 0,
      "all six Tool books are visible together on the physical shelf with no page controls"
    );
    const mobileShelfVisibility = {};
    for (const width of [390, 320]) {
      await desktopShelf.page.setViewportSize({ width, height: 1000 });
      await desktopShelf.page.waitForFunction(() =>
        document.querySelectorAll('.department .bk').length === 14 &&
        [...document.querySelectorAll('.department .brow')].filter(row => row.querySelector('.bk')).length === 7
      );
      mobileShelfVisibility[width] = await desktopShelf.page.evaluate(() => {
      const measure = () => ({
        labels: [...document.querySelectorAll('.department .bk')].map(book => book.getAttribute('aria-label')),
        rows: [...document.querySelectorAll('.department .brow')].filter(row => row.querySelector('.bk')).map(row => {
          const box = row.getBoundingClientRect();
          const books = [...row.querySelectorAll('.bk')].map(book => book.getBoundingClientRect());
          return {
            count: books.length,
            horizontalOverflow: row.scrollWidth > row.clientWidth + 1,
            allInside: books.every(book => book.left >= box.left - 1 && book.right <= box.right + 1),
            minimumCoverHeight: Math.min(...[...row.querySelectorAll('.bk img')].map(image => image.getBoundingClientRect().height))
          };
        })
      });
        return measure();
      });
    }
    await desktopShelf.page.setViewportSize({ width: 1440, height: 1000 });
    check(
      [390,320].every(width =>
        mobileShelfVisibility[width].labels.length === 14 &&
        mobileShelfVisibility[width].rows.length === 7 &&
        mobileShelfVisibility[width].rows.every(row =>
          row.count >= 1 && row.count <= 2 && !row.horizontalOverflow && row.allInside && row.minimumCoverHeight >= 118
        )
      ),
      `all 14 books remain visible on real shelf rows at 390 and 320 without paging or horizontal overflow ${JSON.stringify(mobileShelfVisibility)}`
    );
    await desktopShelf.page.getByRole("button", { name: /^Preview Concepts 101\./ }).click();
    check(
      (await desktopShelf.page.locator('#book-preview-inside').innerText()).includes('Six connected sections') &&
        (await desktopShelf.page.locator('#book-preview-meta').innerText()).includes('connected system model'),
      "selected cover explains concrete coverage and reading depth before opening"
    );
    await desktopShelf.context.close();

    const growthShelf = await makePage({ fixture: true, viewport: { width: 1440, height: 1000 } });
    await growthShelf.page.goto(`${origin}/library-growth.html`, { waitUntil: "domcontentloaded" });
    await growthShelf.page.waitForSelector(".department[data-collection='3'] .bk");
    const growthGeometry = await growthShelf.page.evaluate(() => {
      const units = [...document.querySelectorAll('.shelf-unit')];
      const growthUnits = [...document.querySelectorAll('.department[data-collection="3"]')];
      const firstUnit = growthUnits[0];
      const secondUnit = growthUnits[1];
      const book = firstUnit?.querySelector('.bk');
      const room = document.querySelector('.libroom');
      return {
        units: units.length,
        growthUnits: growthUnits.length,
        departments: document.querySelectorAll('.department').length,
        firstUnitWidth: firstUnit?.getBoundingClientRect().width || 0,
        secondUnitWidth: secondUnit?.getBoundingClientRect().width || 0,
        growthBooks: growthUnits.reduce((count,unit)=>count+unit.querySelectorAll('.bk').length,0),
        bookWidth: book?.getBoundingClientRect().width || 0,
        bookHeight: book?.querySelector('img')?.getBoundingClientRect().height || 0,
        roomHeight: room?.getBoundingClientRect().height || 0,
        documentOverflow: document.documentElement.scrollWidth > innerWidth
      };
    });
    check(
      growthGeometry.units === 2 &&
        growthGeometry.growthUnits === 2 &&
        growthGeometry.departments === 5 &&
        growthGeometry.growthBooks === 7 &&
        Math.abs(growthGeometry.secondUnitWidth - growthGeometry.firstUnitWidth) <= 2 &&
        growthGeometry.bookHeight >= 120 &&
        growthGeometry.roomHeight > 900 &&
        growthGeometry.documentOverflow === false,
      `a seven-book collection gains two real continuation bays without pagination or smaller covers ${JSON.stringify(growthGeometry)}`
    );
    check(
      (await growthShelf.page.locator('.bk').count()) === 21 &&
        (await growthShelf.page.locator('.department[data-collection="3"] .bk').count()) === 7 &&
        (await growthShelf.page.locator('.shelf-pages button').count()) === 0,
      "a generated continuation bay keeps all seven added books visible without a markup edit or page controls"
    );
    if (captureDir) {
      await growthShelf.page.screenshot({
        path: path.join(fixtureCaptureDir, "library-growth-fourth-collection-1440x1000.png"),
        fullPage: true
      });
    }
    await growthShelf.context.close();

    const responsiveShelf = await makePage({ viewport: { width: 1440, height: 1000 } });
    await responsiveShelf.page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    await responsiveShelf.page.waitForSelector(".department .bk");
    const askButtonHeights = [
      (await responsiveShelf.page.locator(".jv-form button[type=submit]").boundingBox()).height
    ];
    check(
      (await responsiveShelf.page.locator(".department .bk").count()) === 14,
      "desktop shelf starts with the complete large-cover inventory"
    );
    await responsiveShelf.page.getByRole("button", { name: /^Preview Concepts 101\./ }).click();
    check(
      (await responsiveShelf.page.locator("#book-preview").count()) === 1 &&
        !(await responsiveShelf.page.locator("#book-preview").getAttribute("class")).includes("is-empty"),
      "desktop selected-book preview opens before a breakpoint change"
    );
    await responsiveShelf.page.setViewportSize({ width: 390, height: 844 });
    await responsiveShelf.page.waitForFunction(() =>
      document.querySelectorAll(".department .bk").length === 14 &&
      [...document.querySelectorAll(".department .brow")].filter(row => row.querySelector('.bk')).length === 7
    );
    askButtonHeights.push(
      (await responsiveShelf.page.locator(".jv-form button[type=submit]").boundingBox()).height
    );
    const resizeRowCounts = await responsiveShelf.page.locator(".department .brow").evaluateAll(rows => rows.map(row => row.querySelectorAll('.bk').length));
    check(
      (await responsiveShelf.page.locator(".department .bk").count()) === 14 &&
        (await responsiveShelf.page.locator(".department .brow").evaluateAll(rows =>
          rows.filter(row => row.querySelector('.bk')).length === 7
        )) &&
        (await responsiveShelf.page.locator(".department .brow").evaluateAll(rows =>
          rows.every(row => row.querySelectorAll('.bk').length <= 2)
        )),
      `desktop to mobile resize preserves all books across seven real shelf rows ${JSON.stringify(resizeRowCounts)}`
    );
    check(
      (await responsiveShelf.page.locator("#book-preview").count()) === 1 &&
        !(await responsiveShelf.page.locator("#book-preview").getAttribute("class")).includes("is-empty") &&
        (await responsiveShelf.page.evaluate(() => document.activeElement?.id)) === "book-preview-title",
      "desktop-to-mobile rerender preserves the selected preview and keyboard place"
    );
    await responsiveShelf.page.setViewportSize({ width: 320, height: 760 });
    askButtonHeights.push(
      (await responsiveShelf.page.locator(".jv-form button[type=submit]").boundingBox()).height
    );
    check(
      askButtonHeights.every((height) => height >= 44),
      "Ask Miss Jeeves primary submit target remains at least 44px at 1440, 390 and 320"
    );
    await responsiveShelf.page.setViewportSize({ width: 1440, height: 1000 });
    await responsiveShelf.page.waitForFunction(() => document.querySelectorAll(".department .bk").length === 14);
    const resizedDesktopRows = await responsiveShelf.page.locator(".department .brow").evaluateAll((rows) =>
      rows.map((row) => row.querySelectorAll(".bk").length)
    );
    check(
      resizedDesktopRows.every((count) => count <= 3),
      "mobile to desktop resize restores complete two-row shelves"
    );
    check(
      (await responsiveShelf.page.locator("#book-preview").count()) === 1 &&
        !(await responsiveShelf.page.locator("#book-preview").getAttribute("class")).includes("is-empty") &&
        (await responsiveShelf.page.evaluate(() => document.activeElement?.id)) === "book-preview-title",
      "mobile-to-desktop rerender preserves the selected preview and keyboard place"
    );
    await responsiveShelf.context.close();

    const heldHash = await makePage();
    await heldHash.page.goto(`${origin}/library.html#vocab-101`, {
      waitUntil: "domcontentloaded"
    });
    await heldHash.page.waitForFunction(() =>
      document.querySelector("#library-status")?.textContent.includes(
        "Vocab 101 is not available yet"
      )
    );
    check(
      (await heldHash.page.locator("#reader").isHidden()) &&
        (await heldHash.page.locator("#library-status").innerText()).includes(
          "Not in the current catalogue"
        ),
      "held direct hash cannot bypass publication status"
    );
    await heldHash.context.close();

    const jeeves = await makePage();
    await jeeves.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    const jeevesErrorsBefore = pageErrors.length;
    const suggestionRoutes = [
      ['how do I write a better prompt?', 'prompt-brief', 'ep-02', '/issues/issue-02.html'],
      ["what's a hallucination?", 'hallucination-basics', 'ep-03', '/issues/issue-03.html'],
      ['who built AI?', 'women-built-ai', 'ep-04', '/issues/issue-04.html'],
      ['what is generative AI?', 'generative-ai-basics', 'concept-generative', '/learn/glossary.html']
    ];
    check(
      JSON.stringify(await jeeves.page.locator('.jv-chip').allTextContents()) ===
        JSON.stringify(suggestionRoutes.map(([question]) => question)),
      'Miss Jeeves shows only the four bounded, source-backed sample questions'
    );
    for (const [question, answerId, sourceId, href] of suggestionRoutes) {
      await jeeves.page.getByRole('button', { name: question, exact: true }).click();
      await jeeves.page.waitForSelector(`.jv-answer[data-answer-id="${answerId}"] a[data-source-id="${sourceId}"]`);
      check(
        (await jeeves.page.locator(`.jv-answer[data-answer-id="${answerId}"]`).count()) === 1 &&
          (await jeeves.page.locator(`.jv-answer a[data-source-id="${sourceId}"][href="${href}"]`).count()) === 1 &&
          jeeves.jeevesApiRequests() === 0,
        `Miss Jeeves suggestion “${question}” resolves deterministically to ${sourceId}`
      );
    }
    check(
      (await jeeves.page.locator(".jv-answer").count()) === 1 &&
        jeeves.page.url() === `${origin}/library.html` &&
        pageErrors.length === jeevesErrorsBefore,
      "Miss Jeeves sample questions answer in place without a ReferenceError"
    );
    if (captureDir) {
      await jeeves.page.setViewportSize({ width: 390, height: 844 });
      await jeeves.page.screenshot({
        path: path.join(candidateCaptureDir, 'miss-jeeves-bounded-answer-390x844.png'),
        fullPage: true
      });
    }
    await jeeves.page.fill("#jv-q", "which AI should I use?");
    await jeeves.page.click('.jv-form button[type="submit"]');
    await jeeves.page.waitForSelector('.jv-answer[data-answer-id="choose-ai-for-the-job"]');
    check(
      /Choose for the job/i.test(await jeeves.page.locator('.jv-answer h3').innerText()) &&
        jeeves.jeevesApiRequests() === 0,
      'a manually typed “which AI” question is corrected to the Episode 04 job-first method'
    );
    await jeeves.page.fill('#jv-q', 'qzxvplmokn');
    await jeeves.page.waitForSelector('.jv-none');
    const jeevesEmptyState = await jeeves.page.locator('.jv-none').evaluate((state) => ({
      color:getComputedStyle(state).color,
      background:getComputedStyle(state).backgroundColor,
      text:state.textContent
    }));
    check(
      jeevesEmptyState.color === 'rgb(7, 20, 47)' &&
        jeevesEmptyState.background === 'rgb(255, 255, 255)' &&
        /nothing filed/i.test(jeevesEmptyState.text),
      'Miss Jeeves zero-result text remains readable on its light result surface'
    );
    if (captureDir) {
      await jeeves.page.screenshot({
        path: path.join(candidateCaptureDir, 'miss-jeeves-zero-result-390x844.png'),
        fullPage: true
      });
    }
    await jeeves.page.fill("#jv-q", "environment energy");
    await jeeves.page.waitForTimeout(50);
    check(
      (await jeeves.page.locator('a[href="/grimoire/chamber-of-receipts.html"]').count()) === 0,
      "lexical index cannot route around current Library admission state"
    );
    await jeeves.page.fill("#jv-q", "how does AI work?");
    await jeeves.page.waitForSelector('.jv-answer[data-answer-id="how-ai-works"]');
    check(
      (await jeeves.page.locator('.jv-answer[data-answer-id="how-ai-works"]').count()) === 1 &&
        jeeves.jeevesApiRequests() === 0,
      'a manually typed broad AI question receives a bounded corrective answer without being advertised'
    );
    await jeeves.context.close();

    const arbitraryJeeves = await makePage({
      jeevesApiResponse: {
        status: 'ok',
        mode: 'retrieval',
        answer: 'Episode 04 is the strongest place to begin with women in AI.',
        results: [{
          id: 'ep-04', title: 'The Founding Mothers', url: '/issues/issue-04.html',
          type: 'episode', section: 'Chick Flicks',
          summary: 'The history of AI through the women who built its major leaps.', topics: ['women in ai']
        }]
      }
    });
    await arbitraryJeeves.page.goto(`${origin}/library.html`, { waitUntil: 'domcontentloaded' });
    await arbitraryJeeves.page.fill('#jv-q', 'Where can I learn about women in AI?');
    await arbitraryJeeves.page.click('.jv-form button[type="submit"]');
    await arbitraryJeeves.page.waitForSelector('.jv-answer a[href="/issues/issue-04.html"]');
    check(
      arbitraryJeeves.jeevesApiRequests() === 1 &&
        arbitraryJeeves.page.url() === `${origin}/library.html` &&
        /Episode 04/.test(await arbitraryJeeves.page.locator('.jv-answer p').innerText()),
      'an ordinary question uses the shared backend and returns one safe exact town destination without navigation'
    );
    await arbitraryJeeves.context.close();

    if (captureDir) {
      const loadingIndex = await makePage({
        slowSiteIndex: true,
        viewport: { width: 390, height: 844 }
      });
      await loadingIndex.page.goto(`${origin}/library.html`, { waitUntil: 'domcontentloaded' });
      await loadingIndex.page.fill('#jv-q', 'qzxvplmokn');
      await loadingIndex.page.waitForSelector('.jv-none');
      await loadingIndex.page.screenshot({
        path: path.join(candidateCaptureDir, 'miss-jeeves-loading-390x844.png'),
        fullPage: true
      });
      await loadingIndex.context.close();
    }

    const productionReader = await makePage({
      viewport: { width: 1440, height: 1000 },
      cardSeed: { version: 1, fields: { displayName: "Production reader check" } }
    });
    await productionReader.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    if (captureDir) {
      for (const viewport of [
        { width: 1440, height: 1000 },
        { width: 390, height: 844 },
        { width: 320, height: 760 }
      ]) {
        const capturePage = await makePage({
          viewport,
          cardSeed: { version: 1, fields: { displayName: "Production capture" } }
        });
        await capturePage.page.goto(`${origin}/library.html`, {
          waitUntil: "domcontentloaded"
        });
        await capturePage.page.waitForFunction(() =>
          [...document.querySelectorAll(".department .bk img")].every(
            (image) => image.complete && image.naturalWidth > 0
          )
        );
        await capturePage.page.screenshot({
          path: path.join(
            candidateCaptureDir,
            `library-production-full-${viewport.width}x${viewport.height}.png`
          ),
          fullPage: true
        });
        await capturePage.context.close();
      }
    }
    await productionReader.page
      .getByRole("button", { name: /^Preview Concepts 101\./ })
      .evaluate((node) => node.click());
    await productionReader.page.waitForSelector(
      "#book-preview:not(.is-empty) #book-preview-read:not([hidden])"
    );
    if (captureDir) {
      await productionReader.page.screenshot({
        path: path.join(candidateCaptureDir, "library-production-selected-preview-1440x1000.png"),
        fullPage: true
      });
      await productionReader.page.setViewportSize({ width: 390, height: 844 });
      await productionReader.page.screenshot({
        path: path.join(candidateCaptureDir, "library-production-selected-preview-390x844.png"),
        fullPage: true
      });
      await productionReader.page.setViewportSize({ width: 1440, height: 1000 });
    }
    await productionReader.page.locator("#book-preview-read").click();
    await productionReader.page.waitForSelector("#rtxt h2", { state: "attached" });
    await productionReader.page.waitForSelector(".book .band .puffy-btn");
    if (calibrateProductionControls) {
      await productionReader.page.addStyleTag({
        content:
          ".book .band .puffy-btn,.book .txt .puffy-btn,#reader-close{" +
          "min-height:1px!important;height:20px!important;font-size:8px!important;padding:0!important}"
      });
    }
    for (const viewport of [
      { width: 1440, height: 1000 },
      { width: 390, height: 844 },
      { width: 320, height: 760 }
    ]) {
      await productionReader.page.setViewportSize(viewport);
      await productionReader.page.evaluate(() => window.scrollTo(0, 0));
      const productionControlState = await productionReader.page.evaluate(() => {
        const measure = (node) => {
          const rect = node.getBoundingClientRect();
          return {
            width: rect.width,
            height: rect.height,
            fontSize: Number.parseFloat(getComputedStyle(node).fontSize)
          };
        };
        return {
          wholeBook: measure(document.querySelector(".book .band .puffy-btn")),
          exactSection: measure(document.querySelector(".book .term .puffy-btn")),
          back: measure(document.getElementById("reader-close")),
          documentFits:
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth + 1,
          readerFits:
            document.getElementById("reader").scrollWidth <=
            document.getElementById("reader").clientWidth + 1
        };
      });
      check(
        [
          productionControlState.wholeBook,
          productionControlState.exactSection,
          productionControlState.back
        ].every(
          (control) =>
            control.width >= 44 && control.height >= 44 && control.fontSize >= 14
        ) &&
          productionControlState.documentFits &&
          productionControlState.readerFits,
        `production Concepts reader has readable 44px Save/Back controls and no overflow at ${viewport.width}px`
      );
      if (captureDir) {
        await productionReader.page.screenshot({
          path: path.join(
            candidateCaptureDir,
            `library-production-reader-${viewport.width}x${viewport.height}.png`
          )
        });
      }
    }
    await productionReader.page.locator(".book .band .puffy-btn").click();
    await productionReader.page.waitForFunction(() =>
      [...document.querySelectorAll(".puffy-option img")].length === 10 &&
      [...document.querySelectorAll(".puffy-option img")].every(
        (image) => image.complete && image.naturalWidth > 0
      )
    );
    if (calibratePuffyFocus) {
      await productionReader.page.evaluate(() => {
        document.querySelector('.puffy-picker').removeAttribute('aria-modal');
      });
    }
    check(
      (await productionReader.page.locator(".puffy-option").count()) === 10,
      "production whole-book Save exposes all 10 active Puffy Stickers"
    );
    check(
      await productionReader.page.locator(".puffy-option img").evaluateAll(
        (images) => images.length === 10 && images.every((image) => image.complete && image.naturalWidth > 0)
      ),
      "production whole-book Save visibly renders all 10 active Puffy Sticker images"
    );
    const puffyDialogState = await productionReader.page.evaluate(() => {
      const picker = document.querySelector('.puffy-picker');
      const rect = picker.getBoundingClientRect();
      const actions = [...picker.querySelectorAll('a[href],button:not([hidden])')]
        .filter((node) => node.getClientRects().length > 0)
        .map((node) => {
          const box = node.getBoundingClientRect();
          return box.top >= rect.top - 1 && box.bottom <= rect.bottom + 1 && box.left >= rect.left - 1 && box.right <= rect.right + 1;
        });
      return {
        modal: picker.getAttribute('aria-modal'),
        fits: picker.scrollHeight <= picker.clientHeight + 1,
        actionsContained: actions.every(Boolean)
      };
    });
    check(
      puffyDialogState.modal === 'true' && puffyDialogState.fits && puffyDialogState.actionsContained,
      `production Puffy picker is modal and fully contained at 320px ${JSON.stringify(puffyDialogState)}`
    );
    const puffyOptions = productionReader.page.locator('.puffy-option');
    const puffyLastControl = productionReader.page.locator('.puffy-picker-foot a');
    await puffyLastControl.focus();
    await productionReader.page.keyboard.press('Tab');
    check(
      await puffyOptions.first().evaluate((node) => document.activeElement === node),
      'production Puffy picker traps forward Tab at its final control'
    );
    await puffyOptions.first().focus();
    await productionReader.page.keyboard.press('Shift+Tab');
    check(
      await puffyLastControl.evaluate((node) => document.activeElement === node),
      'production Puffy picker traps reverse Tab at its first control'
    );
    await productionReader.page.keyboard.press('Escape');
    check(
      (await productionReader.page.locator('.puffy-picker').count()) === 0 &&
      await productionReader.page.locator('.book .band .puffy-btn').evaluate((node) => document.activeElement === node),
      'production Puffy picker Escape closes and returns focus to its invoking Save control'
    );
    await productionReader.page.locator('.book .band .puffy-btn').click();
    await productionReader.page.waitForFunction(() =>
      [...document.querySelectorAll('.puffy-option img')].length === 10 &&
      [...document.querySelectorAll('.puffy-option img')].every((image) => image.complete && image.naturalWidth > 0)
    );
    if (captureDir) {
      await productionReader.page.screenshot({
        path: path.join(candidateCaptureDir, "library-production-whole-book-puffy-320x760.png")
      });
    }
    await productionReader.page.locator(".puffy-option").first().click();
    await productionReader.page.locator(".book .term .puffy-btn").first().click();
    check(
      (await productionReader.page.locator(".puffy-option").count()) === 10,
      "production exact-section Save exposes the same 10 active Puffy Stickers"
    );
    await productionReader.context.close();

    const homepageJeeves = await makePage();
    await homepageJeeves.page.goto(`${origin}/index.html#reference`, {
      waitUntil: "domcontentloaded"
    });
    await homepageJeeves.page.click('#homepage-jeeves-form button[type="submit"]');
    await homepageJeeves.page.waitForTimeout(50);
    check(
      homepageJeeves.page.url() === `${origin}/index.html#reference` &&
        await homepageJeeves.page.locator("#lookup").evaluate((node) => document.activeElement === node),
      "Homepage blank Miss Jeeves submit stays in place and focuses the question input"
    );
    await homepageJeeves.page.fill("#lookup", "   ");
    await homepageJeeves.page.click('#homepage-jeeves-form button[type="submit"]');
    await homepageJeeves.page.waitForTimeout(50);
    check(
      homepageJeeves.page.url() === `${origin}/index.html#reference` &&
        await homepageJeeves.page.locator("#lookup").evaluate((node) => document.activeElement === node),
      "Homepage whitespace-only Miss Jeeves submit stays in place and focuses the question input"
    );
    const transferredQuestion = "How do I know if it's telling the truth?";
    await homepageJeeves.page.fill("#lookup", transferredQuestion);
    await homepageJeeves.page.click('#homepage-jeeves-form button[type="submit"]');
    await homepageJeeves.page.waitForURL(`${origin}/library.html#miss-jeeves`);
    await homepageJeeves.page.waitForSelector(".jv-answer");
    check(
      (await homepageJeeves.page.inputValue("#jv-q")) === transferredQuestion &&
        homepageJeeves.page.url() === `${origin}/library.html#miss-jeeves` &&
        (await homepageJeeves.page.locator(".jv-answer h3").innerText()).includes("hallucination"),
      "Homepage transfers a question client-side, removes it from the URL and runs the direct Miss Jeeves answer"
    );
    await homepageJeeves.context.close();

    const indexFailure = await makePage({ failSiteIndex: true });
    await indexFailure.page.goto(`${origin}/library.html`, {
      waitUntil: "domcontentloaded"
    });
    await indexFailure.page.waitForTimeout(50);
    check(
      (await indexFailure.page.locator('#jv-results').innerText()).trim() === '',
      "Miss Jeeves starts clean when the catalogue index is unavailable instead of showing an unsolicited error"
    );
    await indexFailure.page.fill("#jv-q", "what is a hallucination?");
    await indexFailure.page.click('.jv-form button[type="submit"]');
    check(
      (await indexFailure.page.locator('.jv-answer').count()) === 1 &&
        (await indexFailure.page.locator('.jv-error').count()) === 0,
      "Miss Jeeves core answers still work when the wider catalogue index is unavailable"
    );
    await indexFailure.page.fill("#jv-q", "banana filing system");
    await indexFailure.page.waitForSelector('.jv-error[role="alert"]');
    const failureErrorsBefore = pageErrors.length;
    await indexFailure.page.locator("#jv-q").press("Enter");
    await indexFailure.page.waitForTimeout(50);
    check(
      indexFailure.page.url() === `${origin}/library.html` &&
        pageErrors.length === failureErrorsBefore &&
        (await indexFailure.page.locator('.jv-error[role="alert"]').count()) === 1,
      "Miss Jeeves failure submit stays in place without a ReferenceError"
    );
    if (captureDir) {
      await indexFailure.page.setViewportSize({ width: 390, height: 844 });
      await indexFailure.page.screenshot({
        path: path.join(candidateCaptureDir, 'miss-jeeves-error-390x844.png'),
        fullPage: true
      });
    }
    await indexFailure.page.locator("#jv-service-retry").click();
    await indexFailure.page.waitForTimeout(100);
    check(
      indexFailure.jeevesApiRequests() === 2 &&
        (await indexFailure.page.inputValue("#jv-q")) === "banana filing system" &&
        (await indexFailure.page.locator(".jv-error").count()) === 1,
      "service failure is accessible, preserves the query and retries exactly once"
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

    const reader = await makePage({
      fixture: true,
      viewport: { width: 1200, height: 800 },
      cardSeed: { version: 1, fields: { displayName: "Reader fixture" } }
    });
    await reader.page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    const opener = reader.page.getByRole("button", { name: /^Preview Vocab 101\./ });
    await opener.focus();
    await opener.evaluate((node) => node.click());
    await reader.page.locator("#book-preview-read").click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    check(
      (await reader.page.locator("#rtxt").innerText()).includes("Verified reader fixture") &&
        (await reader.page.locator("#reader-close").evaluate((node) => node === document.activeElement)),
      "admitted exact artifact opens in the reader and focuses Close"
    );
    await reader.page.locator("#reader-report").click();
    await reader.page.locator("#correction-scope").selectOption("section");
    await reader.page.locator("#correction-finding").fill("This exact section needs a source check.");
    await reader.page.locator("#correction-form").evaluate((form) => form.requestSubmit());
    await reader.page.waitForFunction(() => document.getElementById('correction-status')?.dataset.state === 'accepted');
    check(
      correctionApiSubmissions.at(-1)?.book_id === "vocab-101" &&
        correctionApiSubmissions.at(-1)?.section_id === "book-section-deep-link-section" &&
        correctionApiSubmissions.at(-1)?.content_version === "reader-v1" &&
        (await reader.page.locator("#correction-status").innerText()).includes("lr_browser_fixture"),
      "reader correction desk submits the exact book, section and version and shows a safe receipt"
    );
    await reader.page.locator("#correction-check").click();
    await reader.page.waitForFunction(() => document.getElementById('correction-status')?.textContent.includes('Current status: submitted'));
    check(
      (await reader.page.locator("#correction-status").innerText()).includes("Current status: submitted"),
      "reader correction receipt exposes its current resolution state"
    );
    await reader.page.locator("#correction-cancel").click();
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
    await opener.evaluate((node) => node.click());
    await reader.page.locator("#book-preview-read").click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    await reader.page.locator("#reader-close").click();
    check(
      await opener.evaluate((node) => node === document.activeElement),
      "Close control restores the exact opener"
    );
    await opener.evaluate((node) => node.click());
    await reader.page.locator("#book-preview-read").click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    await reader.page.locator("#reader").click({ position: { x: 2, y: 2 } });
    check(
      await opener.evaluate((node) => node === document.activeElement),
      "reader backdrop closes and restores the exact opener"
    );
    await opener.evaluate((node) => node.click());
    await reader.page.locator("#book-preview-read").click();
    await reader.page.waitForSelector("#rtxt h2", { state: "attached" });
    await reader.page.waitForSelector(".book .band .puffy-btn");
    check(
      (await reader.page.locator(".book .band .puffy-btn").innerText()).toLowerCase().includes("save this book") &&
        (await reader.page.locator(".book .term .puffy-btn").first().innerText()).toLowerCase().includes("save this section"),
      "reader distinguishes whole-book and exact-section Puffy actions"
    );
    check(
      (await reader.page.locator(".book .band .puffy-btn").getAttribute("aria-label")).toLowerCase().includes("save this book") &&
        (await reader.page.locator(".book .term .puffy-btn").first().getAttribute("aria-label")).toLowerCase().includes("save this section"),
      "accessible Puffy labels distinguish whole-book and exact-section saves"
    );
    await reader.page.locator(".book .band .puffy-btn").click();
    check(
      (await reader.page.locator(".puffy-option").count()) === 10,
      "whole-book Puffy action offers the Resident Card holder's active 10"
    );
    await reader.page.locator(".book .term .puffy-btn").first().click();
    check(
      (await reader.page.locator(".puffy-option").count()) === 10,
      "exact-section Puffy action offers the same active 10"
    );
    await reader.page.locator(".puffy-option").first().click();
    await reader.page.locator("#reader-close").click();
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
          bodyClass: document.body.className,
          tocVisible: getComputedStyle(document.getElementById("rtoc")).display !== "none",
          hiddenSections: [...document.querySelectorAll("#rtxt > *")].filter((node) => node.hidden).length
        };
      });
    check(
      deepLinkState.ariaHidden === "false" &&
        deepLinkState.headingHidden === false &&
        deepLinkState.headingText === "Deep Link Section" &&
        deepLinkState.tocVisible && deepLinkState.hiddenSections === 0,
      "exact-section deep link opens the admitted version with the whole book and contents available"
    );
    await reader.context.close();

    const conceptsReader = await makePage({
      fixture: true,
      viewport: { width: 1440, height: 1000 },
      cardSeed: { version: 1, fields: { displayName: "Concepts reader fixture" } }
    });
    await conceptsReader.page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    await conceptsReader.page.getByRole("button", { name: /^Preview Concepts 101\./ }).evaluate((node) => node.click());
    await conceptsReader.page.locator("#book-preview-read").click();
    await conceptsReader.page.waitForSelector("#rtxt h2", { state: "attached" });
    const conceptsState = await conceptsReader.page.evaluate(() => {
      const reader = document.getElementById("reader");
      const headings = [...document.querySelectorAll("#rtxt h2,#rtxt h3")];
      const bandRect = document.querySelector(".book .band").getBoundingClientRect();
      const titleRect = document.getElementById("rt").getBoundingClientRect();
      const textRect = document.getElementById("rtxt").getBoundingClientRect();
      const ledeRect = document.querySelector("#rtxt .lede").getBoundingClientRect();
      return {
        text: document.getElementById("rtxt").innerText,
        tocCount: document.querySelectorAll("#rtoc a").length,
        topLevelHeadingCount: headings.filter((heading) => heading.tagName === "H2").length,
        headingCount: headings.length,
        uniqueHeadingIds: new Set(headings.map((heading) => heading.id)).size,
        receiptPuffyCount: document.querySelectorAll("#rtxt .receipts [data-puffy-title], #rtxt .receipts .puffy-save-row").length,
        systemMapIds: headings.filter((heading) => heading.textContent.trim() === "What reaches the model for this task").map((heading) => heading.id),
        titleContained: titleRect.top >= bandRect.top && titleRect.bottom <= bandRect.bottom,
        ledeFillRatio: ledeRect.width / textRect.width,
        visibleDecorativeRules: [...document.querySelectorAll("#rtxt hr")]
          .filter((rule) => getComputedStyle(rule).display !== "none").length,
        fitsViewport: reader.scrollWidth <= reader.clientWidth
      };
    });
    check(
      conceptsState.text.includes("The model is not the whole product.") &&
        conceptsState.text.toLowerCase().includes("tokens and the context window") &&
        conceptsState.tocCount === conceptsState.topLevelHeadingCount &&
        conceptsState.headingCount === conceptsState.uniqueHeadingIds &&
        conceptsState.receiptPuffyCount === 0 &&
        conceptsState.systemMapIds.length === 1 &&
        conceptsState.titleContained &&
        conceptsState.ledeFillRatio >= 0.75 &&
        conceptsState.visibleDecorativeRules === 0 &&
        conceptsState.fitsViewport,
      "exact Concepts 101 artifact renders with complete contents, unclipped title, full reading width, unique anchors, no decorative dot rules and no overflow"
    );
    if (captureDir) {
      await conceptsReader.page.screenshot({
        path: path.join(fixtureCaptureDir, "concepts-101-reader-desktop-1440x1000.png")
      });
    }
    await conceptsReader.page.setViewportSize({ width: 390, height: 844 });
    await conceptsReader.page.evaluate(() => window.scrollTo(0, 0));
    check(
      await conceptsReader.page.evaluate(() => {
        const reader = document.getElementById("reader");
        const body = document.querySelector("#rtxt");
        const mobileToc = document.getElementById("mobile-toc");
        return reader.scrollWidth <= reader.clientWidth &&
          body.getBoundingClientRect().width <= 390 &&
          getComputedStyle(mobileToc).display !== "none" &&
          document.querySelectorAll("#rtoc-mobile a").length === document.querySelectorAll("#rtxt h2").length &&
          !mobileToc.open;
      }),
      "exact Concepts 101 reader reflows without mobile overflow and keeps a compact section finder"
    );
    await conceptsReader.page.locator("#mobile-toc summary").click();
    check(
      await conceptsReader.page.evaluate(() => {
        const mobileToc = document.getElementById("mobile-toc");
        return mobileToc.open && document.querySelectorAll("#rtoc-mobile a").length === document.querySelectorAll("#rtxt h2").length;
      }),
      "mobile reader exposes the full top-level book contents on demand"
    );
    await conceptsReader.page.locator("#mobile-toc summary").click();
    if (captureDir) {
      await conceptsReader.page.screenshot({
        path: path.join(fixtureCaptureDir, "concepts-101-reader-mobile-start-390x844.png")
      });
    }
    await conceptsReader.page.setViewportSize({ width: 1440, height: 1000 });
    const systemMap = conceptsReader.page.getByRole("heading", { name: "What reaches the model for this task", exact: true });
    const systemMapId = await systemMap.getAttribute("id");
    await conceptsReader.page.locator(`#${systemMapId} + .puffy-save-row .puffy-btn`).click();
    await conceptsReader.page.locator(".puffy-option").first().click();
    const exactSectionSave = await conceptsReader.page.evaluate(() => {
      const rows = JSON.parse(localStorage.getItem("laidies_puffies_board") || "[]");
      return rows.find((row) => row.book_id === "concepts-101" && row.title === "What reaches the model for this task");
    });
    check(
      exactSectionSave?.section_id === systemMapId &&
        exactSectionSave?.url.endsWith(`::${encodeURIComponent("@" + systemMapId)}`),
      "system-map section save stores its stable exact anchor"
    );
    await conceptsReader.page.goto(`${origin}${exactSectionSave.url}`, { waitUntil: "domcontentloaded" });
    await conceptsReader.page.reload({ waitUntil: "domcontentloaded" });
    await conceptsReader.page.waitForSelector("#rtxt h2", { state: "attached" });
    const reopenedSection = await conceptsReader.page.evaluate(() => {
      const heading = document.querySelector('#rtxt [aria-current="location"]');
      const visiblePuffyRows = [...document.querySelectorAll("#rtxt .puffy-save-row")]
        .filter((row) => row.getClientRects().length > 0);
      return {
        id: heading?.id || "",
        hidden: heading?.hidden ?? true,
        readerOpen: document.getElementById("reader").classList.contains("on"),
        hash: location.hash,
        ids: [...document.querySelectorAll("#rtxt h2,#rtxt h3")]
          .filter((node) => node.textContent.trim() === "What reaches the model for this task")
          .map((node) => node.id),
        visiblePuffyRows: visiblePuffyRows.length,
        mobileTocDisplay: getComputedStyle(document.getElementById("mobile-toc")).display,
        desktopTocDisplay: getComputedStyle(document.getElementById("rtoc")).display
      };
    });
    check(
      reopenedSection.id === systemMapId && !reopenedSection.hidden && reopenedSection.readerOpen &&
        reopenedSection.visiblePuffyRows > 1 && reopenedSection.mobileTocDisplay === "none" &&
        reopenedSection.desktopTocDisplay !== "none",
      `system-map section route reopens the exact saved section ${JSON.stringify(reopenedSection)}`
    );
    await conceptsReader.page.setViewportSize({ width: 390, height: 844 });
    await conceptsReader.page.waitForFunction((targetId) => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      const rect = target.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }, systemMapId);
    check(
      await conceptsReader.page.evaluate(() =>
        getComputedStyle(document.getElementById("mobile-toc")).display !== "none" &&
        [...document.querySelectorAll("#rtxt > *")].every((node) => !node.hidden)
      ),
      "saved exact section keeps the whole book and mobile contents navigation available"
    );
    if (captureDir) {
      await conceptsReader.page.screenshot({
        path: path.join(fixtureCaptureDir, "concepts-101-reader-mobile-exact-section-390x844.png")
      });
    }
    await conceptsReader.context.close();

    const rulebookReader = await makePage({
      fixture: true,
      viewport: { width: 1440, height: 1000 },
      cardSeed: { version: 1, fields: { displayName: "Rulebook reader fixture" } }
    });
    await rulebookReader.page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    await rulebookReader.page.getByRole("button", { name: /^Preview How to Check AI's Work\./ }).evaluate((node) => node.click());
    await rulebookReader.page.locator("#book-preview-read").click();
    await rulebookReader.page.waitForSelector("#rtxt .vr-chapter", { state: "attached" });
    const rulebookState = await rulebookReader.page.evaluate(() => ({
      chapters: document.querySelectorAll("#rtxt .vr-chapter").length,
      forms: document.querySelectorAll("#rtxt .vr-check").length,
      hasOpeningPromise: Boolean(document.querySelector("#rtxt .vr-hero .vr-promise")),
      duplicateTitle: Boolean(document.querySelector("#rtxt .vr-hero h1")),
      hasPrompt: Boolean(document.querySelector("#rtxt #vr-prompt-text")),
      hasTransfer: Boolean(document.querySelector("#rtxt [data-transfer]")),
      hasSources: Boolean(document.querySelector("#rtxt .vr-sources")),
      administrativePuffy: document.querySelectorAll("#rtxt .vr-metadata .puffy-save-row,#rtxt .vr-sources .puffy-save-row").length,
      overflow: document.getElementById("reader").scrollWidth > document.getElementById("reader").clientWidth
    }));
    check(
      rulebookState.chapters === 7 && rulebookState.forms >= 8 && rulebookState.hasOpeningPromise && !rulebookState.duplicateTitle &&
        rulebookState.hasPrompt && rulebookState.hasTransfer && rulebookState.hasSources &&
        rulebookState.administrativePuffy === 0 && !rulebookState.overflow,
      `integrated Verification Rulebook retains its complete book, method tools and source drawer ${JSON.stringify(rulebookState)}`
    );
    await rulebookReader.page.locator('#rtxt .vr-check[data-check="opening"] input[data-correct="true"]').check();
    await rulebookReader.page.locator('#rtxt .vr-check[data-check="opening"] button[type="submit"]').click();
    check(
      (await rulebookReader.page.locator('#rtxt .vr-check[data-check="opening"] .vr-feedback').innerText())
        .includes("Keyed choices match the model key"),
      "integrated Verification Rulebook check provides its bounded feedback instead of a dead form"
    );
    if (captureDir) {
      await rulebookReader.page.screenshot({
        path: path.join(fixtureCaptureDir, "verification-rulebook-reader-desktop-1440x1000.png")
      });
    }
    await rulebookReader.page.setViewportSize({ width: 390, height: 844 });
    const rulebookMobileState = await rulebookReader.page.evaluate(() => {
        const reader = document.getElementById("reader");
        const forms = [...document.querySelectorAll("#rtxt .vr-check")];
        return {
          readerClientWidth: reader.clientWidth,
          readerScrollWidth: reader.scrollWidth,
          wideForms: forms.map((form, index) => ({ index, clientWidth: form.clientWidth, scrollWidth: form.scrollWidth }))
            .filter((form) => form.scrollWidth > form.clientWidth)
        };
      });
    check(
      rulebookMobileState.readerScrollWidth <= rulebookMobileState.readerClientWidth && !rulebookMobileState.wideForms.length,
      `integrated Verification Rulebook and its method checks reflow without mobile overflow ${JSON.stringify(rulebookMobileState)}`
    );
    if (captureDir) {
      await rulebookReader.page.screenshot({
        path: path.join(fixtureCaptureDir, "verification-rulebook-reader-mobile-390x844.png")
      });
    }
    await rulebookReader.context.close();

    const reduced = await makePage({ fixture: true });
    await reduced.page.emulateMedia({ reducedMotion: "reduce" });
    await reduced.page.goto(`${origin}/library.html`, { waitUntil: "domcontentloaded" });
    check(
      await reduced.page.locator(".bk").first().evaluate(
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
        takeoverResult.status.includes("Vocab 101 is not available yet"),
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
          "older Puffy saves"
        ),
      "returning visitor without a Card gets legacy-save and Card-required copy"
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

    const hostileWrite = await makePage({
      cardSeed: { version: 1, fields: { displayName: "Safety fixture" } }
    });
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

    const persistence = await makePage({
      cardSeed: { version: 1, fields: { displayName: "Puffy fixture" } }
    });
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
        "Vocab 101 is not available yet"
      )
    );
    check(
      (await persistence.page.locator("#reader").isHidden()) &&
        (await persistence.page.locator("#library-status").innerText()).includes(
          "Not in the current catalogue"
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
          "Make your Resident Card"
        ),
      "first-time visitor gets the Resident Card requirement before choosing Puffies"
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
          "older Puffy saves"
        ),
      "cross-tab create refreshes the no-Card legacy-save truth"
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
          "Make your Resident Card"
        ),
      "cross-tab removal restores the first-visit Card requirement"
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
    check(
      (await denied.page.locator(".puffy-card-required").count()) === 1 &&
        (await denied.page.locator(".puffy-card-required").innerText()).includes(
          "Resident Card"
        ) &&
        !(await denied.page.locator("#puffy-denied-section + .puffy-save-row .puffy-btn").getAttribute("class")).includes(
          "is-placed"
        ),
      "storage denial cannot establish a Resident Card and blocks a false Puffy save"
    );
    await denied.context.close();

    check(
      external.every((url) => !/lumin|library-books/.test(url)),
      "test makes no external content or evidence request"
    );
    check(
      publicationRequests.every((url) =>
        /\/content\/library-books\/rendered\/(?:vocab-101|concepts-101|briefing-101|setup-101|accounts-101|verification-rulebook)\.html$/.test(url)
      ),
      "publication requests remain confined to exact admitted production and test-fixture artifacts"
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
