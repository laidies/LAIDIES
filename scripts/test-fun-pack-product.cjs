#!/usr/bin/env node

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const crypto = require("node:crypto");
const { pathToFileURL } = require("node:url");

const root = path.resolve(process.env.FUN_PACK_ROOT || process.cwd());
const playwrightRoot =
  process.env.PLAYWRIGHT_CORE_PATH ||
  path.resolve(process.cwd(), ".ds-sync/node_modules/playwright-core");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = {
  ".css": "text/css", ".html": "text/html", ".js": "text/javascript",
  ".json": "application/json", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp"
};
let checks = 0;
let blockedExternal = 0;
const check = (condition, message) => {
  checks += 1;
  if (!condition) throw new Error(message);
};
const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalJson(value[key])}`
    ).join(",")}}`;
  }
  return JSON.stringify(value);
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((request, response) => {
      const url = new URL(request.url, "http://127.0.0.1");
      let requested;
      try {
        requested = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
      } catch {
        response.writeHead(400, { "content-type": "text/plain" });
        response.end("Bad path");
        return;
      }
      const absolute = path.resolve(root, requested);
      if (!absolute.startsWith(root + path.sep) ||
          !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
        response.writeHead(404, { "content-type": "text/plain" });
        response.end("Not found");
        return;
      }
      response.writeHead(200, {
        "content-type": mime[path.extname(absolute).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store"
      });
      fs.createReadStream(absolute).pipe(response);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  const playwright = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")).href);
  const browser = await playwright.chromium.launch({ executablePath: chromePath, headless: true });
  const server = await serve();
  const origin = `http://127.0.0.1:${server.address().port}`;
  const canonicalRegistry = JSON.parse(
    fs.readFileSync(path.join(root, "games/data/fun-pack-registry.json"), "utf8")
  );
  const canonicalAuthority = JSON.parse(
    fs.readFileSync(path.join(root, "games/data/fun-pack-admissions.json"), "utf8")
  );

  async function newPage(options = {}) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) {
        blockedExternal += 1;
        await route.abort();
        return;
      }
      await route.continue();
    });
    const page = await context.newPage();
    if (Object.hasOwn(options, "registry")) {
      await page.route("**/games/data/fun-pack-registry.json", (route) =>
        route.fulfill({
          status: options.registryStatus || 200,
          contentType: "application/json",
          body: typeof options.registry === "string" ? options.registry : JSON.stringify(options.registry)
        })
      );
    }
    if (Object.hasOwn(options, "authority")) {
      await page.route("**/games/data/fun-pack-admissions.json", (route) =>
        route.fulfill({
          status: options.authorityStatus || 200,
          contentType: "application/json",
          body: typeof options.authority === "string" ? options.authority : JSON.stringify(options.authority)
        })
      );
    }
    if (options.pageBody) {
      await page.route("**/games/fun-pack.html", (route) =>
        route.fulfill({ status: 200, contentType: "text/html", body: options.pageBody })
      );
    }
    return { context, page };
  }

  async function expectUnavailable(options, label) {
    const { context, page } = await newPage(options);
    await page.goto(`${origin}/games/fun-pack.html`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector("#packStatus")?.textContent.includes("unavailable"));
    check(await page.locator("#activityGrid a.activity-card").count() === 0,
      `${label}: must render no activity card`);
    check(await page.locator('#activityGrid [role="alert"]').count() === 1,
      `${label}: must render one programmatic alert`);
    await context.close();
  }

  function forgedReceipt() {
    return {
      schemaVersion: 1,
      receiptId: "forged-dream-phone-issue04",
      keyId: canonicalAuthority.keyId,
      issuedBy: "dream-phone-champion",
      ownerDisposition: "ADMITTED",
      childId: "dream-phone",
      childRoute: "/games/dream-phone.html",
      episodeId: "issue04",
      episodeNumber: 4,
      episodeRelationship: "VERIFIED issue04",
      returnContract: {
        status: "VERIFIED",
        source: "fun-pack",
        exactReturnRoute: "/games/fun-pack.html?issue=4"
      },
      activity: {
        title: "Forged Dream Phone",
        description: "A coherent shelf forgery must never render.",
        episodeJob: "Unapproved",
        time: "~3 min",
        cta: "Open",
        image: "/assets/dream-phone-cordless-crop.png",
        imageAlt: "Pink cordless phone",
        route: "/games/dream-phone.html?from=fun-pack&issue=4&return=%2Fgames%2Ffun-pack.html%3Fissue%3D4"
      },
      issuedOn: "2026-07-26",
      recheckOn: "2026-08-25",
      signature: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
    };
  }

  try {
    {
      const { context, page } = await newPage();
      await page.goto(`${origin}/games/fun-pack.html`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => window.LAIDIES_FUN_PACK_REGISTRY);
      check(await page.locator(".ep-btn").count() === 4,
        "default shelf must show four published episode contexts");
      check(await page.locator('.ep-btn[aria-pressed="true"]').getAttribute("data-ep") === "issue04",
        "default must select current Episode 04");
      check((await page.locator("#packStatus").innerText()).toLowerCase() ===
        "4 published episodes · 0 admitted extras", "production admission count must remain zero");
      check(await page.locator("#activityGrid a.activity-card").count() === 0,
        "production authority must render no activity links");
      check(await page.evaluate(() =>
        window.LAIDIES_FUN_PACK_AUTHORITY?.receiptCount === 0 &&
        Object.isFrozen(window.LAIDIES_FUN_PACK_REGISTRY) &&
        Object.isFrozen(window.LAIDIES_FUN_PACK_REGISTRY.episodes[0]) &&
        window.LAIDIES_FUN_PACK_REGISTRY.children.every((child) =>
          !("admission" in child) && !("ownerDisposition" in child) && !("route" in child)
        )), "candidate registry must contain no admission, owner disposition or route authority");
      await page.evaluate(() => {
        window.LAIDIES_FUN_PACK_REGISTRY.episodes[3].admittedActivities = [{
          childId: "dream-phone",
          route: "/games/dream-phone.html"
        }];
        document.querySelector('[data-ep="issue03"]').click();
        document.querySelector('[data-ep="issue04"]').click();
      });
      check(await page.locator("#activityGrid a.activity-card").count() === 0,
        "post-validation mutation of the exposed candidate snapshot must not create admission");
      await page.setViewportSize({ width: 320, height: 800 });
      const reflow = await page.evaluate(() => ({
        fits: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));
      check(reflow.fits, `320px shelf must not overflow (${JSON.stringify(reflow)})`);
      await context.close();
    }

    {
      const { context, page } = await newPage();
      await page.goto(`${origin}/games/fun-pack.html?issue=2&reward=1000#invented`, {
        waitUntil: "domcontentloaded"
      });
      await page.waitForFunction(() => window.LAIDIES_FUN_PACK_REGISTRY);
      check(await page.locator('.ep-btn[aria-pressed="true"]').getAttribute("data-ep") === "issue02",
        "valid archive issue must select Episode 02");
      check(await page.locator(".fun-pack-state-actions a").first().getAttribute("href") ===
        "/issues/issue-02.html", "episode return must be canonical");
      await page.locator('[data-ep="issue01"]').click();
      const changed = new URL(page.url());
      check(changed.search === "?issue=1" && changed.hash === "",
        "episode switch must drop unapproved query and fragment state");
      check(await page.locator(".fun-pack-state-actions a").nth(1).getAttribute("href") ===
        "/this-week.html?issue=1&bag=open&group=fun", "Bag return must follow the selected episode");
      await context.close();
    }

    {
      const { context, page } = await newPage();
      await page.goto(`${origin}/games/fun-pack.html?from=this-week&issue=4&bag=open&group=fun`, {
        waitUntil: "domcontentloaded"
      });
      await page.waitForFunction(() => window.LAIDIES_FUN_PACK_REGISTRY);
      await page.locator('[data-ep="issue03"]').click();
      check(await page.locator("[data-wednesday-return]").getAttribute("href") ===
        "/this-week.html?issue=3&bag=open&group=fun", "fixed Bag return must follow episode selection");
      check(new URL(page.url()).search === "?from=this-week&issue=3&bag=open&group=fun",
        "Bag-origin episode switch must preserve only the approved exact query");
      await context.close();
    }

    await expectUnavailable({ registry: { schemaVersion: 2 } }, "malformed registry");
    await expectUnavailable({ authority: {}, authorityStatus: 503 }, "missing authority");

    {
      const malformed = structuredClone(canonicalAuthority);
      malformed.unexpected = true;
      await expectUnavailable({ authority: malformed }, "authority extra field");
    }
    {
      const replacedKey = structuredClone(canonicalAuthority);
      replacedKey.publicKeySpkiBase64 =
        "MCowBQYDK2VwAyEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
      await expectUnavailable({ authority: replacedKey }, "replacement public key");
    }
    {
      const forged = structuredClone(canonicalRegistry);
      forged.children[2].ownerDisposition = "ADMITTED";
      forged.children[2].admission = "ADMITTED";
      forged.children[2].route = "/games/dream-phone.html";
      forged.children[2].episodeRelationship = "VERIFIED issue04";
      forged.episodes[3].activities = [{ childId: "dream-phone" }];
      await expectUnavailable({ registry: forged }, "coherent shelf-owned authority forgery");
    }
    {
      const forged = structuredClone(canonicalAuthority);
      forged.receipts.push(forgedReceipt());
      await expectUnavailable({ authority: forged }, "unsigned coherent admission receipt");
    }

    {
      const ephemeral = crypto.generateKeyPairSync("ed25519");
      const testPublicKey = ephemeral.publicKey.export({
        type: "spki",
        format: "der"
      }).toString("base64");
      const signedAuthority = structuredClone(canonicalAuthority);
      signedAuthority.publicKeySpkiBase64 = testPublicKey;
      const receipt = forgedReceipt();
      const payload = Object.fromEntries(
        Object.entries(receipt).filter(([key]) => key !== "signature")
      );
      receipt.signature = crypto.sign(
        null,
        Buffer.from(canonicalJson(payload)),
        ephemeral.privateKey
      ).toString("base64");
      signedAuthority.receipts.push(receipt);
      const productionPage = fs.readFileSync(path.join(root, "games/fun-pack.html"), "utf8");
      const testPage = productionPage.replace(
        canonicalAuthority.publicKeySpkiBase64,
        testPublicKey
      );
      check(testPage !== productionPage, "test-only public-key substitution must be bounded and explicit");
      const { context, page } = await newPage({
        authority: signedAuthority,
        pageBody: testPage
      });
      await page.goto(`${origin}/games/fun-pack.html`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() =>
        document.querySelectorAll("#activityGrid a.activity-card").length === 1 ||
        document.querySelector("#packStatus")?.textContent.includes("unavailable")
      );
      if (await page.locator("#activityGrid a.activity-card").count() !== 1) {
        const diagnosis = await page.evaluate(async ({ authority, registry }) => {
          try {
            await window.LAIDIES_FUN_PACK.validateAdmissions(authority, registry);
            return "verifier accepted but renderer did not";
          } catch (error) {
            return error.message;
          }
        }, { authority: signedAuthority, registry: canonicalRegistry });
        throw new Error(`ephemeral signed receipt failed: ${diagnosis}`);
      }
      const card = page.locator("#activityGrid a.activity-card");
      check(await card.count() === 1,
        "ephemerally signed exact receipt must exercise the positive verifier path");
      check(await card.getAttribute("href") === receipt.activity.route,
        "verified receipt must render only its signed canonical route");
      await context.close();
    }

    const receiptMutations = [
      ["arbitrary local child route", (receipt) => {
        receipt.childRoute = "/games/admin.html";
        receipt.activity.route = "/games/admin.html?from=fun-pack&issue=4&return=%2Fgames%2Ffun-pack.html%3Fissue%3D4";
      }],
      ["image traversal", (receipt) => { receipt.activity.image = "/assets/../privacy.html"; }],
      ["encoded image traversal", (receipt) => { receipt.activity.image = "/assets/%2e%2e/privacy.html"; }],
      ["image backslash", (receipt) => { receipt.activity.image = "/assets/..\\privacy.html"; }],
      ["image control", (receipt) => { receipt.activity.image = "/assets/a\u0000.png"; }],
      ["image query", (receipt) => { receipt.activity.image += "?reward=1"; }],
      ["activity extra query", (receipt) => { receipt.activity.route += "&reward=1000"; }],
      ["return fragment", (receipt) => { receipt.returnContract.exactReturnRoute += "#reward"; }],
      ["wrong episode relationship", (receipt) => { receipt.episodeRelationship = "VERIFIED issue03"; }],
      ["wrong owner disposition", (receipt) => { receipt.ownerDisposition = "HOLD"; }],
      ["receipt extra field", (receipt) => { receipt.reward = 1000; }],
      ["activity extra field", (receipt) => { receipt.activity.reward = 1000; }],
      ["future receipt", (receipt) => { receipt.issuedOn = "2099-01-01"; receipt.recheckOn = "2099-02-01"; }],
      ["expired receipt", (receipt) => { receipt.issuedOn = "2026-01-01"; receipt.recheckOn = "2026-01-02"; }]
    ];
    for (const [name, mutate] of receiptMutations) {
      const hostile = structuredClone(canonicalAuthority);
      const receipt = forgedReceipt();
      mutate(receipt);
      hostile.receipts.push(receipt);
      await expectUnavailable({ authority: hostile }, name);
    }
    {
      const duplicate = structuredClone(canonicalAuthority);
      duplicate.receipts.push(forgedReceipt(), forgedReceipt());
      await expectUnavailable({ authority: duplicate }, "duplicate receipt IDs and relationships");
    }

    {
      const { context, page } = await newPage({ authority: {}, authorityStatus: 503 });
      await page.goto(`${origin}/games/fun-pack.html`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.querySelector("[data-fun-pack-retry]"));
      await page.locator("[data-fun-pack-retry]").click();
      await page.waitForFunction(() =>
        document.activeElement?.hasAttribute("data-fun-pack-retry")
      );
      check(await page.evaluate(() => document.activeElement?.hasAttribute("data-fun-pack-retry")),
        "Retry replacement must retain focus on the stable Retry action");
      await context.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log(`FUN PACK PRODUCT PASS checks=${checks} external_requests_blocked=${blockedExternal}`);
}

main().catch((error) => {
  console.error(`FUN PACK PRODUCT FAIL: ${error.stack || error.message}`);
  process.exit(1);
});
