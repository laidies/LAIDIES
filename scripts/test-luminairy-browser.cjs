#!/usr/bin/env node

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(process.env.LUMINAIRY_ROOT || process.cwd());
const playwrightRoot =
  process.env.PLAYWRIGHT_CORE_PATH ||
  path.resolve(process.cwd(), ".ds-sync/node_modules/playwright-core");
const registrySource = JSON.parse(
  fs.readFileSync(path.join(root, "content/luminairy-claims.json"), "utf8")
);
const receiptManifestSource = JSON.parse(
  fs.readFileSync(
    path.join(root, "content/luminairy-editorial-receipts.json"),
    "utf8"
  )
);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg"
};

function normalizeText(value) {
  return String(value || "").normalize("NFKC").replace(/\s+/g, " ").trim();
}

function sha256(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function admissionPayload(record) {
  const evidence = record.evidence || {};
  return JSON.stringify({
    product: record.product,
    claimId: record.claimId,
    personId: record.personId,
    wing: record.wing,
    claimKind: record.claimKind,
    status: record.status,
    scope: normalizeText(record.scope),
    selector: record.selector,
    contentSelector: record.contentSelector,
    claimText: normalizeText(record.claimText),
    claimTextSha256: record.claimTextSha256,
    sourceUrl: evidence.sourceUrl,
    sourceType: evidence.sourceType,
    sourceTitle: normalizeText(evidence.sourceTitle),
    sourcePublisher: normalizeText(evidence.sourcePublisher),
    evidenceExcerpt: normalizeText(evidence.evidenceExcerpt),
    evidenceExcerptSha256: evidence.evidenceExcerptSha256,
    supportsClaimId: evidence.supportsClaimId,
    supportsClaimTextSha256: evidence.supportsClaimTextSha256,
    verifiedOn: record.verifiedOn,
    recheckOn: record.recheckOn,
    correctionOwner: record.correctionOwner
  });
}

function validAdmissionFixture() {
  const registry = structuredClone(registrySource);
  const manifest = structuredClone(receiptManifestSource);
  const index = registry.records.findIndex(
    (record) => record.personId === "hannah-fry"
  );
  const claimText =
    "Hannah Fry joined Cambridge as Professor of the Public Understanding of Mathematics.";
  const evidenceExcerpt = claimText;
  const record = {
    ...registry.records[index],
    product: "luminairy",
    personId: "hannah-fry",
    wing: "mavens",
    claimKind: "historical-appointment",
    status: "admitted",
    scope: "past-tense-appointment-announcement-only",
    contentSelector: ".stop-desc",
    claimText,
    claimTextSha256: sha256(claimText),
    verifiedOn: "2026-07-25",
    recheckOn: "2027-07-25",
    evidence: {
      sourceUrl:
        "https://www.cam.ac.uk/research/news/hannah-fry-joins-cambridge-as-professor-of-the-public-understanding-of-mathematics",
      sourceType: "official",
      sourceTitle:
        "Hannah Fry joins Cambridge as Professor of the Public Understanding of Mathematics",
      sourcePublisher: "University of Cambridge",
      evidenceExcerpt,
      evidenceExcerptSha256: sha256(evidenceExcerpt),
      supportsClaimId: "maven-hannah-fry-profile",
      supportsClaimTextSha256: sha256(claimText)
    }
  };
  record.admissionBindingSha256 = sha256(admissionPayload(record));
  registry.records[index] = record;
  manifest.receipts = [
    {
      schemaVersion: 1,
      receiptId: "synthetic-hannah-appointment-r2",
      keyId: "luminairy-editorial-offline-r2-20260726",
      product: "luminairy",
      claimId: "maven-hannah-fry-profile",
      personId: "hannah-fry",
      wing: "mavens",
      claimKind: "historical-appointment",
      status: "admitted",
      scope: "past-tense-appointment-announcement-only",
      selector: '[data-maven-slug="hannah-fry"]',
      contentSelector: ".stop-desc",
      claimTextSha256:
        "2d4ec43b71c68247e8b7ddd6efec65cabfc0ff8a4cb9651e01073425564a2a5a",
      sourceUrl:
        "https://www.cam.ac.uk/research/news/hannah-fry-joins-cambridge-as-professor-of-the-public-understanding-of-mathematics",
      sourceType: "official",
      sourceTitle:
        "Hannah Fry joins Cambridge as Professor of the Public Understanding of Mathematics",
      sourcePublisher: "University of Cambridge",
      evidenceExcerptSha256:
        "2d4ec43b71c68247e8b7ddd6efec65cabfc0ff8a4cb9651e01073425564a2a5a",
      supportsClaimId: "maven-hannah-fry-profile",
      supportsClaimTextSha256:
        "2d4ec43b71c68247e8b7ddd6efec65cabfc0ff8a4cb9651e01073425564a2a5a",
      verifiedOn: "2026-07-25",
      recheckOn: "2027-07-25",
      correctionOwner: "saints-mavens-trailblazers-editorial",
      admissionBindingSha256:
        "7870538836d54a8dcf81f6ca6c049226b0f275d4ccec387b0f351a3c875feb40",
      supportDecision: "exact-atomic-claim-supported-for-test-only",
      reviewerRole: "synthetic-independent-accuracy-review-fixture",
      reviewedOn: "2026-07-26",
      signature:
        "bgUqXZSR6qTQBxbobVko75999wOKUcVwpPatb483jHhumBM11BAtGxjLzHOt6RXuj0xX2ircyOa/OgpoR/ustQ=="
    }
  ];
  return { registry, manifest };
}

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(
    new URL(request.url, "http://127.0.0.1").pathname
  );
  const relative =
    pathname === "/" ? "luminairy.html" : pathname.replace(/^\/+/, "");
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
  const externalAttempts = [];
  const runtimeErrors = [];

  function check(value, label) {
    checks.push(label);
    if (!value) failures.push(label);
  }

  async function pageFor(options = {}) {
    const context = await browser.newContext({
      viewport: options.viewport || { width: 1280, height: 900 },
      reducedMotion: options.reducedMotion || "no-preference",
      javaScriptEnabled: options.javaScriptEnabled !== false
    });
    if (options.init) await context.addInitScript(options.init);
    const page = await context.newPage();
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.setDefaultTimeout(5000);
    await page.route("**/*", async (route) => {
      const url = route.request().url();
      const pathname = new URL(url).pathname;
      if (
        pathname === "/content/site/luminairy-claim-gate.js" &&
        options.gate === "abort"
      ) {
        return route.abort();
      }
      if (
        pathname === "/content/luminairy-claims.json" &&
        options.registry === "abort"
      ) {
        return route.abort();
      }
      if (
        pathname === "/content/luminairy-claims.json" &&
        options.registry
      ) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(options.registry)
        });
      }
      if (
        pathname === "/content/luminairy-editorial-receipts.json" &&
        options.manifest === "abort"
      ) {
        return route.abort();
      }
      if (
        pathname === "/content/luminairy-editorial-receipts.json" &&
        options.manifest
      ) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(options.manifest)
        });
      }
      if (url.startsWith(origin)) return route.continue();
      externalAttempts.push(url);
      return route.abort();
    });
    return { context, page };
  }

  async function waitClaims(page, state = "loaded") {
    try {
      await page.waitForFunction(
        (expected) =>
          document.documentElement.dataset.luminairyClaims === expected,
        state
      );
    } catch (error) {
      const actual = await page.evaluate(
        () => document.documentElement.dataset.luminairyClaims || "unset"
      );
      throw new Error(
        `claim gate expected ${state}, observed ${actual}; runtime errors: ${
          runtimeErrors.join(" | ") || "none"
        }; ${error.message}`
      );
    }
  }

  async function waitModalFocusReady(page) {
    await page.waitForFunction(
      () =>
        document.querySelector("#mavenModal")?.dataset.focusState === "ready" &&
        document.activeElement?.matches(
          "#mavenModal button[data-mvbio-close]"
        )
    );
  }

  try {
    const baseline = await pageFor({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce"
    });
    await baseline.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(baseline.page);
    check(
      (await baseline.page.locator("[data-editorial-status=held]").count()) ===
        46,
      "all 46 legacy records remain held"
    );
    check(
      (await baseline.page.locator(".foundress-card").count()) === 4,
      "all four Foundress cards are covered"
    );
    await baseline.page
      .locator('.wing-door[aria-controls="wing-mavens"]')
      .click();
    await baseline.page
      .locator('[data-maven-chamber-button="foundresses"]')
      .click();
    for (const slug of [
      "ada-lovelace",
      "grace-hopper",
      "hedy-lamarr",
      "karen-sparck-jones"
    ]) {
      const card = baseline.page.locator(
        `[data-foundress-slug="${slug}"]`
      );
      check(
        (await card.locator(".foundress-name").isVisible()) &&
          (await card.locator("img").isVisible()) &&
          (await card.locator(".lum-claim-hold").isVisible()),
        `${slug} exposes identity, art and explicit hold`
      );
      check(
        (await card.locator(
          ".foundress-years:visible, .foundress-title:visible, .foundress-desc:visible"
        ).count()) === 0,
        `${slug} exposes no held date, title or biography`
      );
      await card.click();
      check(
        await baseline.page.locator("#mavenModal").isHidden(),
        `${slug} held card cannot open a modal`
      );
    }
    check(
      !(await baseline.page
        .locator('meta[name="description"]')
        .getAttribute("content")).match(
        /leading in AI|pioneers who got here first/i
      ),
      "metadata makes no unsupported current or priority claim"
    );
    check(
      !(await baseline.page.locator(".wing-doors").innerText()).match(
        /leading in AI right now|shipping frontier/i
      ),
      "wing doors make no unsupported current claim"
    );
    check(
      (await baseline.page
        .locator('.wing-door[aria-controls="wing-mavens"]')
        .getAttribute("aria-expanded")) === "true" &&
        (await baseline.page.locator("#wing-mavens").isVisible()),
      "native MAiVENS door opens and exposes state"
    );
    await baseline.page
      .locator('.wing-door[aria-controls="wing-builders"]')
      .click();
    check(
      (await baseline.page.locator("#wing-builders").isVisible()) &&
        (await baseline.page.locator("#wing-mavens").isHidden()),
      "one-wing-at-a-time behavior remains"
    );
    check(
      (await baseline.page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      )) <= 1,
      "baseline has no 390px horizontal overflow"
    );
    check(
      await baseline.page.evaluate(
        () => {
          const duration = getComputedStyle(
            document.querySelector(".wing-door")
          ).transitionDuration;
          return duration.endsWith("ms")
            ? parseFloat(duration) <= 0.01
            : parseFloat(duration) <= 0.00001;
        }
      ),
      "reduced motion remains bounded"
    );
    await baseline.context.close();

    const heldDeepLink = await pageFor();
    await heldDeepLink.page.goto(
      `${origin}/luminairy.html?meet=ada-lovelace#mavens`,
      { waitUntil: "domcontentloaded" }
    );
    await waitClaims(heldDeepLink.page);
    await heldDeepLink.page.waitForTimeout(30);
    check(
      await heldDeepLink.page.locator("#mavenModal").isHidden(),
      "held Foundress deep link cannot open a modal"
    );
    await heldDeepLink.context.close();

    for (const [label, mutate] of [
      [
        "fully rehashed unrelated evidence",
        (record, receipt) => {
          const unrelated = "An unrelated claim with unrelated evidence.";
          record.claimText = unrelated;
          record.claimTextSha256 = sha256(unrelated);
          record.evidence.sourceUrl = "https://example.invalid/unrelated";
          record.evidence.sourceTitle = "Unrelated evidence";
          record.evidence.sourcePublisher = "Unrelated publisher";
          record.evidence.evidenceExcerpt = unrelated;
          record.evidence.evidenceExcerptSha256 = sha256(unrelated);
          record.evidence.supportsClaimTextSha256 = record.claimTextSha256;
          Object.assign(receipt, {
            claimTextSha256: record.claimTextSha256,
            sourceUrl: record.evidence.sourceUrl,
            sourceTitle: record.evidence.sourceTitle,
            sourcePublisher: record.evidence.sourcePublisher,
            evidenceExcerptSha256: record.evidence.evidenceExcerptSha256,
            supportsClaimTextSha256: record.claimTextSha256
          });
        }
      ],
      [
        "person identity mutation",
        (record, receipt) =>
          Object.assign(record, { personId: "not-hannah-fry" }) &&
          Object.assign(receipt, { personId: record.personId })
      ],
      [
        "wing identity mutation",
        (record, receipt) =>
          Object.assign(record, { wing: "trailblazers" }) &&
          Object.assign(receipt, { wing: record.wing })
      ],
      [
        "claim-kind identity mutation",
        (record, receipt) =>
          Object.assign(record, { claimKind: "current-leadership" }) &&
          Object.assign(receipt, { claimKind: record.claimKind })
      ],
      [
        "status identity mutation",
        (record, receipt) =>
          Object.assign(record, { status: "corrected" }) &&
          Object.assign(receipt, { status: record.status })
      ],
      [
        "scope identity mutation",
        (record, receipt) =>
          Object.assign(record, { scope: "general-biography" }) &&
          Object.assign(receipt, { scope: record.scope })
      ]
    ]) {
      const hostileFixture = validAdmissionFixture();
      const hostileRecord = hostileFixture.registry.records.find(
        (record) => record.claimId === "maven-hannah-fry-profile"
      );
      const hostileReceipt = hostileFixture.manifest.receipts[0];
      mutate(hostileRecord, hostileReceipt);
      hostileRecord.admissionBindingSha256 = sha256(
        admissionPayload(hostileRecord)
      );
      hostileReceipt.admissionBindingSha256 =
        hostileRecord.admissionBindingSha256;
      const hostile = await pageFor({
        registry: hostileFixture.registry,
        manifest: hostileFixture.manifest
      });
      await hostile.page.goto(`${origin}/luminairy.html`, {
        waitUntil: "domcontentloaded"
      });
      await waitClaims(hostile.page, "failed");
      check(
        (await hostile.page.locator("[data-editorial-status=held]").count()) ===
          46 &&
          (await hostile.page.locator(".maven-meet:not(:disabled)").count()) ===
            0,
        `${label} cannot admit or enable a profile`
      );
      await hostile.context.close();
    }

    const validFixture = validAdmissionFixture();
    const validRegistry = validFixture.registry;
    const admitted = await pageFor({
      registry: validRegistry,
      manifest: validFixture.manifest,
      viewport: { width: 320, height: 740 }
    });
    await admitted.page.goto(`${origin}/luminairy.html#mavens`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(admitted.page);
    const hannah = admitted.page.locator('[data-maven-slug="hannah-fry"]');
    const opener = hannah.locator(".maven-meet");
    check(
      (await hannah.getAttribute("data-editorial-status")) === "admitted" &&
        (await hannah.locator(".stop-desc").isVisible()) &&
        !(await opener.isDisabled()),
      "valid hypothetical atomic admission renders and enables its opener"
    );
    check(
      (await admitted.page.locator("[data-editorial-status=held]").count()) ===
        45,
      "valid admission leaves every unrelated legacy record held"
    );
    await opener.click();
    await admitted.page.locator("#mavenModal").waitFor({ state: "visible" });
    await waitModalFocusReady(admitted.page);
    check(
      await admitted.page.evaluate(
        () => document.activeElement?.matches("[data-mvbio-close]")
      ),
      "modal moves focus to its native close control"
    );
    check(
      (await admitted.page.locator("#mvbioDid").innerText()) ===
        "Hannah Fry joined Cambridge as Professor of the Public Understanding of Mathematics." &&
        (await admitted.page.locator("#mvbioSource").getAttribute("href")) ===
          validRegistry.records.find(
            (record) => record.personId === "hannah-fry"
          ).evidence.sourceUrl,
      "modal renders only the exact admitted claim and evidence source"
    );
    await admitted.page.keyboard.press("Shift+Tab");
    check(
      await admitted.page.evaluate(
        () => document.activeElement?.id === "mvbioSource"
      ),
      "modal wraps backward focus"
    );
    await admitted.page.keyboard.press("Tab");
    check(
      await admitted.page.evaluate(
        () => document.activeElement?.matches("[data-mvbio-close]")
      ),
      "modal wraps forward focus"
    );
    await admitted.page.keyboard.press("Escape");
    check(
      (await admitted.page.locator("#mavenModal").isHidden()) &&
        (await opener.evaluate((node) => document.activeElement === node)),
      "Escape closes and returns focus to the exact opener"
    );
    await opener.click();
    await waitModalFocusReady(admitted.page);
    await admitted.page.locator(".mvbio-backdrop").click({
      position: { x: 4, y: 4 }
    });
    check(
      (await admitted.page.locator("#mavenModal").isHidden()) &&
        (await opener.evaluate((node) => document.activeElement === node)),
      "backdrop closes and returns focus"
    );
    await opener.click();
    await waitModalFocusReady(admitted.page);
    await admitted.page.locator(".mvbio-x").click();
    check(
      (await admitted.page.locator("#mavenModal").isHidden()) &&
        (await opener.evaluate((node) => document.activeElement === node)),
      "close button closes and returns focus"
    );
    check(
      (await admitted.page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      )) <= 1,
      "admitted modal journey has no 320px horizontal overflow"
    );
    await admitted.context.close();

    const admittedDeepLink = await pageFor({
      registry: validRegistry,
      manifest: validFixture.manifest
    });
    await admittedDeepLink.page.goto(
      `${origin}/luminairy.html?meet=hannah-fry#mavens`,
      { waitUntil: "domcontentloaded" }
    );
    await waitClaims(admittedDeepLink.page);
    await admittedDeepLink.page.locator("#mavenModal").waitFor({
      state: "visible"
    });
    await waitModalFocusReady(admittedDeepLink.page);
    check(
      await admittedDeepLink.page.evaluate(
        () => document.activeElement?.matches("[data-mvbio-close]")
      ),
      "valid admitted deep link opens operably with focus inside"
    );
    await admittedDeepLink.context.close();

    const admittedDesktop = await pageFor({
      registry: validRegistry,
      manifest: validFixture.manifest,
      viewport: { width: 1280, height: 900 }
    });
    await admittedDesktop.page.goto(`${origin}/luminairy.html#mavens`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(admittedDesktop.page);
    const desktopOpener = admittedDesktop.page.locator(
      '[data-maven-slug="hannah-fry"] .maven-meet'
    );
    await desktopOpener.click();
    await waitModalFocusReady(admittedDesktop.page);
    check(
      await admittedDesktop.page.evaluate(
        () => document.activeElement?.matches("button[data-mvbio-close]")
      ),
      "desktop modal forces focus inside"
    );
    await admittedDesktop.page.keyboard.press("Shift+Tab");
    check(
      await admittedDesktop.page.evaluate(
        () => document.activeElement?.id === "mvbioSource"
      ),
      "desktop modal wraps backward to its final focusable control"
    );
    await admittedDesktop.page.keyboard.press("Tab");
    check(
      await admittedDesktop.page.evaluate(
        () => document.activeElement?.matches("button[data-mvbio-close]")
      ),
      "desktop modal wraps forward to its first focusable control"
    );
    await admittedDesktop.page.keyboard.press("Escape");
    check(
      (await admittedDesktop.page.locator("#mavenModal").isHidden()) &&
        (await desktopOpener.evaluate(
          (node) => document.activeElement === node
        )),
      "desktop Escape closes and returns exact opener focus"
    );
    await desktopOpener.click();
    await waitModalFocusReady(admittedDesktop.page);
    await admittedDesktop.page.locator(".mvbio-x").click();
    check(
      (await admittedDesktop.page.locator("#mavenModal").isHidden()) &&
        (await desktopOpener.evaluate(
          (node) => document.activeElement === node
        )),
      "desktop close button returns focus to the exact opener"
    );
    await admittedDesktop.context.close();

    const normalStorage = await pageFor();
    await normalStorage.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(normalStorage.page);
    await normalStorage.page
      .locator('.wing-door[aria-controls="wing-saints"]')
      .click();
    const normalPicker = normalStorage.page
      .locator('[data-saint-slug="cher-horowitz"] .coven-pick');
    await normalPicker.click();
    check(
      (await normalStorage.page.evaluate(() =>
        localStorage.getItem("laidies_saint")
      )) === "cher-horowitz",
      "normal local selection is read-verified"
    );
    await normalPicker.click();
    check(
      (await normalStorage.page.evaluate(() =>
        localStorage.getItem("laidies_saint")
      )) === null,
      "normal local clear is read-verified"
    );
    await normalStorage.context.close();

    const deniedSet = await pageFor({
      init: () => {
        const original = Storage.prototype.setItem;
        Storage.prototype.setItem = function (key, value) {
          if (key === "laidies_saint") {
            throw new DOMException("Synthetic denial", "QuotaExceededError");
          }
          return original.call(this, key, value);
        };
      }
    });
    await deniedSet.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(deniedSet.page);
    await deniedSet.page
      .locator('.wing-door[aria-controls="wing-saints"]')
      .click();
    await deniedSet.page
      .locator('[data-saint-slug="cher-horowitz"] .coven-pick')
      .click();
    check(
      (await deniedSet.page.locator("#lumStorageStatus").isVisible()) &&
        (await deniedSet.page.locator("#lumStorageStatus").innerText()).includes(
          "was not changed"
        ) &&
        (await deniedSet.page.locator(".coven-pick:not(:disabled)").count()) ===
          0 &&
        (await deniedSet.page.evaluate(() =>
          localStorage.getItem("laidies_saint")
        )) === null,
      "denied write persists live failure, disables controls and claims no selection"
    );
    await deniedSet.context.close();

    const deniedClear = await pageFor({
      init: () => {
        localStorage.setItem("laidies_saint", "cher-horowitz");
        const original = Storage.prototype.removeItem;
        Storage.prototype.removeItem = function (key) {
          if (key === "laidies_saint") {
            throw new DOMException("Synthetic denial", "SecurityError");
          }
          return original.call(this, key);
        };
      }
    });
    await deniedClear.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(deniedClear.page);
    await deniedClear.page
      .locator('.wing-door[aria-controls="wing-saints"]')
      .click();
    await deniedClear.page
      .locator('[data-saint-slug="cher-horowitz"] .coven-pick')
      .click();
    check(
      (await deniedClear.page.locator("#lumStorageStatus").isVisible()) &&
        (await deniedClear.page.evaluate(() =>
          localStorage.getItem("laidies_saint")
        )) === "cher-horowitz" &&
        (await deniedClear.page.locator(".coven-pick:not(:disabled)").count()) ===
          0,
      "denied clear preserves prior selection and disables false recovery"
    );
    await deniedClear.context.close();

    const deniedRead = await pageFor({
      init: () => {
        const original = Storage.prototype.getItem;
        Storage.prototype.getItem = function (key) {
          if (/^laidies_(saint|maven|builder|mavens_collected)$/.test(key)) {
            throw new DOMException("Synthetic denial", "SecurityError");
          }
          return original.call(this, key);
        };
      }
    });
    await deniedRead.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(deniedRead.page);
    check(
      (await deniedRead.page.locator("#lumStorageStatus").isVisible()) &&
        (await deniedRead.page.locator(".coven-pick:not(:disabled)").count()) ===
          0,
      "storage loss is persistent-live and disables selection/clear controls"
    );
    await deniedRead.context.close();

    const noJavaScript = await pageFor({ javaScriptEnabled: false });
    await noJavaScript.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    check(
      (await noJavaScript.page.locator("#lumStaticHoldTitle").isVisible()) &&
        (await noJavaScript.page
          .locator('[data-lum-claim-block]:visible')
          .count()) === 0 &&
        (await noJavaScript.page.locator(".stop-desc:visible").count()) === 0 &&
        (await noJavaScript.page
          .locator(
            ".foundress-years:visible, .foundress-title:visible, .foundress-desc:visible"
          )
          .count()) === 0 &&
        (await noJavaScript.page.locator("#mavenModal").isHidden()) &&
        (await noJavaScript.page.locator(".maven-meet:not(:disabled)").count()) ===
          0,
      "disabled JavaScript exposes only the native hold, never profile/context claims"
    );
    check(
      (await noJavaScript.page.locator(".lum-static-hold a").count()) >= 2,
      "disabled JavaScript retains native home and correction navigation"
    );
    await noJavaScript.context.close();

    const missingGate = await pageFor({ gate: "abort" });
    await missingGate.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await missingGate.page.waitForTimeout(100);
    check(
      (await missingGate.page
        .locator('[data-lum-claim-block]:visible')
        .count()) === 0 &&
        (await missingGate.page.locator(".stop-desc:visible").count()) === 0 &&
        (await missingGate.page
          .locator(
            ".foundress-years:visible, .foundress-title:visible, .foundress-desc:visible"
          )
          .count()) === 0 &&
        (await missingGate.page.locator("#mavenModal").isHidden()) &&
        (await missingGate.page.locator(".maven-meet:not(:disabled)").count()) ===
          0,
      "missing claim gate fails closed from static HTML/CSS without unsafe flash"
    );
    await missingGate.context.close();

    const outage = await pageFor({ registry: "abort" });
    await outage.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(outage.page, "failed");
    check(
      (await outage.page.locator("[data-editorial-status=held]").count()) ===
        46 &&
        (await outage.page.locator("#mavenModal").isHidden()),
      "registry outage fails every claim and modal closed"
    );
    await outage.context.close();

    const receiptOutage = await pageFor({ manifest: "abort" });
    await receiptOutage.page.goto(`${origin}/luminairy.html`, {
      waitUntil: "domcontentloaded"
    });
    await waitClaims(receiptOutage.page, "failed");
    check(
      (await receiptOutage.page.locator("[data-editorial-status=held]").count()) ===
        46 &&
        (await receiptOutage.page.locator("#mavenModal").isHidden()),
      "trusted receipt outage fails every claim and modal closed"
    );
    await receiptOutage.context.close();

    check(
      externalAttempts.every(
        (url) =>
          !/luminairy-claims\.json/.test(url) &&
          !/luminairy-editorial-receipts\.json/.test(url) &&
          !url.startsWith("https://example.invalid")
      ),
      "fixtures make no external evidence request"
    );
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error("LUMINAiRY BROWSER FAIL");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log("LUMINAiRY BROWSER PASS");
  console.log(`checks=${checks.length}`);
  console.log(`external_requests_blocked=${externalAttempts.length}`);
})().catch((error) => {
  console.error("LUMINAiRY BROWSER FAIL:", error.stack || error.message);
  process.exitCode = 1;
});
