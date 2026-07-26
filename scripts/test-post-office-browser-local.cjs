#!/usr/bin/env node
/* Deterministic local browser suite. No external request is allowed to complete. */
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("../.ds-sync/node_modules/playwright");

const root = path.resolve(process.env.POST_OFFICE_ROOT || process.cwd());
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"]
]);
const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  const relative = pathname === "/" ? "post-office.html" : pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(root + path.sep) || !fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime.get(path.extname(resolved)) || "application/octet-stream" });
  fs.createReadStream(resolved).pipe(response);
});

(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  let checks = 0;
  let externalAttempts = 0;
  let externalCompleted = 0;
  const externalAttemptUrls = [];
  const check = (condition, message) => {
    checks += 1;
    if (!condition) failures.push(message);
  };
  async function guardedPage(options = {}) {
    const page = await browser.newPage({ viewport: options.viewport || { width: 1280, height: 900 } });
    await page.route("**/*", async (route) => {
      const url = route.request().url();
      if (!url.startsWith(origin)) {
        externalAttempts += 1;
        externalAttemptUrls.push(url);
        return route.abort();
      }
      return route.continue();
    });
    page.on("response", (response) => {
      if (!response.url().startsWith(origin)) externalCompleted += 1;
    });
    return page;
  }

  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 320, height: 760 }]]) {
    const page = await guardedPage({ viewport });
    await page.goto(`${origin}/postcard.html?from=ali&note=private%20message&pc=library`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#pcGrid button");
    check(!page.url().includes("from=") && !page.url().includes("note="), `${name} legacy private query is scrubbed`);
    check((await page.locator('#pcGrid button[aria-pressed="true"]').getAttribute("data-id")) === "library", `${name} canonical postcard id survives scrub`);
    check((await page.locator("#pcGrid button").count()) >= 12, `${name} postcard catalogue renders`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)), `${name} postcard has no horizontal overflow`);
    await page.close();
  }

  const failurePage = await guardedPage({ viewport: { width: 320, height: 760 } });
  await failurePage.addInitScript(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: () => Promise.reject(Object.assign(new Error("cancelled"), { name: "AbortError" }))
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("denied")) }
    });
  });
  await failurePage.goto(`${origin}/postcard.html?pc=welcome`, { waitUntil: "domcontentloaded" });
  await failurePage.locator('#pcGrid button[data-id="library"]').focus();
  await failurePage.keyboard.press("Space");
  check((await failurePage.locator("#pcStatus").innerText()).includes("selected"), "keyboard selection announces the postcard");
  await failurePage.locator("#pcShare").click();
  await failurePage.waitForFunction(() => document.querySelector("#pcStatus")?.textContent.includes("without sending"));
  check(!/sent|delivered|opened|joined/i.test((await failurePage.locator("#pcStatus").innerText()).replace("without sending", "")), "cancelled native share does not claim delivery");
  await failurePage.locator("#pcCopy").click();
  await failurePage.waitForFunction(() => !document.querySelector("#pcCopyFallback")?.hidden);
  const fallbackValue = await failurePage.locator("#pcCopyValue").inputValue();
  check(fallbackValue === `${origin}/postcard.html?pc=library`, "clipboard denial exposes only a canonical public card URL");
  check(!/from=|note=|@/.test(fallbackValue), "clipboard fallback contains no note, handle or identity");
  await failurePage.close();

  const copyPage = await guardedPage();
  await copyPage.addInitScript(() => {
    window.__copied = "";
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (value) => { window.__copied = value; } }
    });
  });
  await copyPage.goto(`${origin}/postcard.html?pc=park`, { waitUntil: "domcontentloaded" });
  await copyPage.locator("#pcCopy").click();
  await copyPage.waitForFunction(() => document.querySelector("#pcStatus")?.textContent.includes("Link copied"));
  check((await copyPage.evaluate(() => window.__copied)) === `${origin}/postcard.html?pc=park`, "successful copy receipt binds to exact canonical URL");
  await copyPage.close();

  const signedPage = await guardedPage({ viewport: { width: 390, height: 900 } });
  await signedPage.addInitScript(() => {
    window.__shared = null;
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (data) => { window.__shared = data; }
    });
  });
  await signedPage.goto(`${origin}/postcard.html?pc=park`, { waitUntil: "domcontentloaded" });
  check(await signedPage.locator("#pcPrevSignature").isHidden(), "empty Signed field stays out of the local preview");
  await signedPage.locator("#pcNote").fill("Meet me by the fountain.");
  await signedPage.locator("#pcHandle").fill("@@Élodie✨");
  check((await signedPage.locator("#pcPrevSignature").innerText()) === "— @Élodie✨", "leading-at Unicode handle appears in the local preview");
  await signedPage.locator("#pcShare").click();
  await signedPage.waitForFunction(() => window.__shared);
  const firstShared = await signedPage.evaluate(() => window.__shared);
  check(firstShared.text.includes("— @Élodie✨"), "Signed handle appears in native share text");
  check(!firstShared.text.split("Make your card here: ")[1].includes("%40") && !firstShared.text.split("Make your card here: ")[1].includes("Élodie"), "Signed handle stays out of the public postcard URL");
  await signedPage.evaluate(() => {
    const input = document.querySelector("#pcHandle");
    input.value = "abcdefghijklmnopqrstuvwxYZ";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    window.__shared = null;
  });
  check((await signedPage.locator("#pcPrevSignature").innerText()) === "— @abcdefghijklmnopqrstuvwx", "Signed handle is bounded to 24 characters");
  await signedPage.locator("#pcShare").click();
  await signedPage.waitForFunction(() => window.__shared);
  check((await signedPage.evaluate(() => window.__shared.text)).includes("— @abcdefghijklmnopqrstuvwx"), "bounded Signed handle remains in share text");
  check((await signedPage.evaluate(() => localStorage.getItem("laidies_card_username"))) === null, "postcard composer does not store the Signed handle");
  await signedPage.close();

  const blockedNewsletter = await guardedPage();
  await blockedNewsletter.addInitScript(() => { window.open = () => null; });
  await blockedNewsletter.goto(`${origin}/post-office.html`, { waitUntil: "domcontentloaded" });
  await blockedNewsletter.locator("#po-email").fill("local-test@example.invalid");
  await blockedNewsletter.locator('#po-newsletter-form button[type="submit"]').click();
  check((await blockedNewsletter.locator("#po-newsletter-status").innerText()).includes("no signup request was sent here"), "blocked popup denies newsletter attempt");
  check(await blockedNewsletter.locator("#po-newsletter-fallback").isVisible(), "blocked popup exposes direct provider recovery");
  check(blockedNewsletter.url() === `${origin}/post-office.html`, "blocked popup preserves Post Office");
  check(await blockedNewsletter.locator("#signin").isVisible(), "held sign-in destination exists");
  check((await blockedNewsletter.locator("#signin").innerText()).includes("no account has been created"), "held sign-in destination denies account success");
  check((await blockedNewsletter.locator("#signin input[type=email]").count()) === 0, "held sign-in destination collects no email");
  check(!(await blockedNewsletter.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)), "desktop Post Office has no horizontal overflow");
  await blockedNewsletter.close();

  const invalidNewsletter = await guardedPage();
  await invalidNewsletter.goto(`${origin}/post-office.html`, { waitUntil: "domcontentloaded" });
  await invalidNewsletter.locator("#po-email").fill("not-an-email");
  await invalidNewsletter.locator('#po-newsletter-form button[type="submit"]').click();
  check(!(await invalidNewsletter.locator("#po-email").evaluate((input) => input.checkValidity())), "invalid newsletter email remains browser-invalid");
  check(await invalidNewsletter.locator("#po-newsletter-status").isHidden(), "invalid newsletter email manufactures no request status");
  await invalidNewsletter.close();

  const archivePage = await guardedPage();
  await archivePage.route(`${origin}/content/episode-index.json`, (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ episodes: [{
      number: 7,
      status: "published",
      title: "<img src=x onerror=alert(1)>",
      oneLineDescription: "<script>window.__archiveInjected=true</script>",
      heroImage: "/assets/postcards/from-sunnyvaile/pc-welcome.png",
      issueUrl: "/issues/issue-07.html"
    }] })
  }));
  await archivePage.goto(`${origin}/post-office.html`, { waitUntil: "domcontentloaded" });
  await archivePage.waitForFunction(() => document.querySelectorAll("#poArchive article").length === 1);
  check((await archivePage.locator("#poArchive").innerText()).includes("<img src=x"), "archive renders admitted title as text");
  check((await archivePage.locator("#poArchive [onerror], #poArchive script").count()) === 0, "archive data cannot inject executable markup");
  check(!(await archivePage.evaluate(() => window.__archiveInjected)), "archive description does not execute");
  check((await archivePage.locator(".po-delivery__stamp").textContent()).includes("Published"), "archive distinguishes site publication from email delivery");
  await archivePage.close();

  const hostileArchiveCases = [
    { name: "protocol-relative image", heroImage: "//attacker.invalid/track.png", issueUrl: "/issues/issue-01.html" },
    { name: "protocol-relative issue", heroImage: "/assets/ugh-as-if.png", issueUrl: "//attacker.invalid/click" },
    { name: "absolute external image", heroImage: "https://attacker.invalid/track.png", issueUrl: "/issues/issue-01.html" },
    { name: "encoded origin", heroImage: "/%2f%2fattacker.invalid/track.png", issueUrl: "/issues/issue-01.html" },
    { name: "backslash origin", heroImage: "/\\attacker.invalid/track.png", issueUrl: "/issues/issue-01.html" },
    { name: "control character", heroImage: "/assets/\u0001track.png", issueUrl: "/issues/issue-01.html" },
    { name: "traversal", heroImage: "/assets/../track.png", issueUrl: "/issues/issue-01.html" },
    { name: "unexpected issue route", heroImage: "/assets/ugh-as-if.png", issueUrl: "/episodes.html" }
  ];
  for (const hostile of hostileArchiveCases) {
    const hostilePage = await guardedPage({ viewport: { width: 390, height: 900 } });
    const attackerAttemptsBefore = externalAttemptUrls.filter((url) => url.includes("attacker.invalid")).length;
    await hostilePage.route(`${origin}/content/episode-index.json`, (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ episodes: [{
        number: 1,
        status: "published",
        title: "Hostile",
        oneLineDescription: "Must fail closed",
        heroImage: hostile.heroImage,
        issueUrl: hostile.issueUrl
      }] })
    }));
    await hostilePage.goto(`${origin}/post-office.html`, { waitUntil: "domcontentloaded" });
    await hostilePage.waitForFunction(() => document.querySelector(".po-archive-error"));
    check((await hostilePage.locator("#poArchive a, #poArchive img").count()) === 0, `${hostile.name} creates no archive link or image`);
    check(
      externalAttemptUrls.filter((url) => url.includes("attacker.invalid")).length === attackerAttemptsBefore,
      `${hostile.name} creates zero attacker-origin attempts`
    );
    check((await hostilePage.locator(".po-archive-error").innerText()).includes("could not be verified"), `${hostile.name} shows fail-closed archive UI`);
    await hostilePage.close();
  }

  const archiveRow = (number, issueUrl, overrides = {}) => ({
    number,
    status: "published",
    title: `Episode ${number}`,
    oneLineDescription: "Collection-level archive validation fixture.",
    heroImage: "/assets/postcards/from-sunnyvaile/pc-welcome.png",
    issueUrl,
    ...overrides
  });
  const hostileArchiveCollectionCases = [
    {
      name: "duplicate episode number",
      episodes: [archiveRow(1, "/issues/issue-01.html"), archiveRow(1, "/issues/issue-02.html")]
    },
    {
      name: "duplicate canonical issue URL",
      episodes: [archiveRow(1, "/issues/issue-01.html"), archiveRow(2, "/issues/issue-01.html")]
    },
    {
      name: "slash-normalized duplicate issue URL",
      episodes: [archiveRow(1, "/issues/issue-01.html"), archiveRow(2, "issues/issue-01.html")]
    },
    {
      name: "number normalization ambiguity",
      episodes: [archiveRow(1, "/issues/issue-01.html"), archiveRow("01", "/issues/issue-02.html")]
    },
    {
      name: "case-variant noncanonical issue URL",
      episodes: [archiveRow(1, "/issues/issue-01.html"), archiveRow(2, "/issues/ISSUE-02.html")]
    },
    {
      name: "mixed valid and attacker-invalid rows",
      episodes: [
        archiveRow(1, "/issues/issue-01.html"),
        archiveRow(2, "//attacker.invalid/click", { heroImage: "//attacker.invalid/track.png" })
      ]
    }
  ];
  for (const hostile of hostileArchiveCollectionCases) {
    const hostilePage = await guardedPage({ viewport: { width: 390, height: 900 } });
    const attackerAttemptsBefore = externalAttemptUrls.filter((url) => url.includes("attacker.invalid")).length;
    let archiveRequests = 0;
    await hostilePage.route(`${origin}/content/episode-index.json`, (route) => {
      archiveRequests += 1;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ episodes: hostile.episodes })
      });
    });
    await hostilePage.goto(`${origin}/post-office.html`, { waitUntil: "domcontentloaded" });
    await hostilePage.waitForFunction(() => document.querySelector(".po-archive-error"));
    check((await hostilePage.locator("#poArchive article").count()) === 0, `${hostile.name} creates zero partial or repeated cards`);
    check((await hostilePage.locator("#poArchive a, #poArchive img").count()) === 0, `${hostile.name} creates no archive link or image`);
    check(
      externalAttemptUrls.filter((url) => url.includes("attacker.invalid")).length === attackerAttemptsBefore,
      `${hostile.name} creates zero attacker-origin attempts`
    );
    check(await hostilePage.locator(".po-archive-retry").isVisible(), `${hostile.name} exposes a visible archive retry`);
    if (hostile.name === "duplicate episode number") {
      check((await hostilePage.evaluate(() => document.activeElement?.classList.contains("po-archive-retry"))) === false,
        "initial archive failure does not steal focus");
      for (let retryAttempt = 1; retryAttempt <= 2; retryAttempt += 1) {
        const beforeRetry = archiveRequests;
        await hostilePage.locator(".po-archive-retry").focus();
        await hostilePage.keyboard.press("Enter");
        await hostilePage.waitForFunction(() =>
          document.querySelector(".po-archive-retry:not([disabled])") &&
          document.activeElement === document.querySelector(".po-archive-retry")
        );
        check(archiveRequests > beforeRetry, `duplicate retry ${retryAttempt} performs another archive check`);
        check((await hostilePage.locator("#poArchive article").count()) === 0,
          `duplicate retry ${retryAttempt} remains whole-archive fail-closed`);
        check((await hostilePage.locator("#poArchive a, #poArchive img").count()) === 0,
          `duplicate retry ${retryAttempt} creates no archive link or image`);
        check(await hostilePage.locator(".po-archive-retry").isVisible(),
          `duplicate retry ${retryAttempt} remains visible`);
        check(await hostilePage.evaluate(() =>
          document.activeElement === document.querySelector(".po-archive-retry")),
          `duplicate retry ${retryAttempt} restores focus to the replacement control`);
        check(
          externalAttemptUrls.filter((url) => url.includes("attacker.invalid")).length === attackerAttemptsBefore,
          `duplicate retry ${retryAttempt} creates zero attacker-origin attempts`
        );
      }
    }
    await hostilePage.close();
  }

  const malformedArchive = await guardedPage({ viewport: { width: 320, height: 760 } });
  await malformedArchive.route(`${origin}/content/episode-index.json`, (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ episodes: [{ number: 1, status: "published", title: "Bad", oneLineDescription: "Bad", heroImage: "javascript:bad", issueUrl: "javascript:bad" }] })
  }));
  await malformedArchive.emulateMedia({ reducedMotion: "reduce" });
  await malformedArchive.goto(`${origin}/post-office.html#signin`, { waitUntil: "domcontentloaded" });
  await malformedArchive.waitForFunction(() => document.querySelector(".po-archive-error"));
  check((await malformedArchive.locator(".po-archive-error").innerText()).includes("could not be verified"), "malformed archive fails closed");
  check((await malformedArchive.locator(".po-archive-error").innerText()).includes("No newsletter delivery is implied"), "archive failure denies delivery");
  check(await malformedArchive.locator("#signin").isVisible(), "320px hash route reaches held sign-in section");
  check(!(await malformedArchive.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)), "320px Post Office has no horizontal overflow");
  const targets = await malformedArchive.locator("a.svb-action, button.svb-action").evaluateAll((nodes) => nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }));
  check(targets.every((target) => target.width >= 44 && target.height >= 44), "Post Office action targets are at least 44px");
  await malformedArchive.close();

  check(externalCompleted === 0, "no external request completed");
  check(externalAttemptUrls.filter((url) => url.includes("attacker.invalid")).length === 0, "hostile archive fixtures make zero external-origin attempts");
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  if (failures.length) {
    console.error("POST OFFICE BROWSER FAIL");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log("POST OFFICE BROWSER PASS");
  console.log(`checks=${checks}`);
  console.log(`external_attempts_blocked=${externalAttempts}`);
  console.log(`external_requests_completed=${externalCompleted}`);
})().catch(async (error) => {
  console.error(error.stack || error);
  try { server.close(); } catch (_) {}
  process.exit(1);
});
