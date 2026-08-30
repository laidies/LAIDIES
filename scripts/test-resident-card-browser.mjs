#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.RESIDENT_CARD_ROOT || process.cwd());
const ownsEvidenceDir = !process.env.RESIDENT_CARD_EVIDENCE_DIR;
const evidenceDir = path.resolve(
  process.env.RESIDENT_CARD_EVIDENCE_DIR ||
  fs.mkdtempSync(path.join(os.tmpdir(), "laidies-resident-card-browser-"))
);
fs.mkdirSync(evidenceDir, { recursive: true });
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH ||
  path.join(root, ".ds-sync", "node_modules", "playwright-core");
const { chromium } = await import(
  pathToFileURL(path.join(playwrightRoot, "index.mjs"))
);
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"]
]);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/"
    ? "resident-card.html"
    : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) ||
      !fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(resolved)) || "application/octet-stream"
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const checks = [];
const failures = [];
const externalAttempts = [];
const pageErrors = [];

function check(value, label) {
  checks.push(label);
  if (!value) failures.push(label);
}

async function openFixture(options = {}, routePath = "/resident-card.html") {
  const context = await browser.newContext({
    viewport: options.viewport || { width: 1280, height: 900 }
  });
  await context.addInitScript((fixture) => {
    if (fixture.storageBlocked) {
      Storage.prototype.getItem = function () {
        throw new DOMException("Synthetic storage denial", "SecurityError");
      };
      return;
    }
    if (fixture.card !== undefined) {
      localStorage.setItem(
        "laidies_resident_card_v1",
        typeof fixture.card === "string" ? fixture.card : JSON.stringify(fixture.card)
      );
    }
    if (fixture.handle !== undefined) {
      localStorage.setItem("laidies_card_username", fixture.handle);
    }
    if (fixture.legacy) {
      Object.keys(fixture.legacy).forEach((key) => {
        localStorage.setItem(key, fixture.legacy[key]);
      });
    }
    localStorage.setItem("laidies_fairy_plays", "sentinel-plays");
    localStorage.setItem("laidies_gt_local_state_v1", "sentinel-community");
  }, options);
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith(origin)) return route.continue();
    externalAttempts.push(url);
    return route.abort();
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  await page.goto(`${origin}${routePath}`, { waitUntil: "domcontentloaded" });
  if (routePath === "/resident-card.html") {
    await page.waitForFunction(() =>
      document.getElementById("rcLocalKicker").textContent !== "Checking this device…"
    );
  } else {
    await page.waitForTimeout(250);
  }
  return { context, page };
}

try {
  {
    const { context, page } = await openFixture();
    check(await page.locator("#rcLocalKicker").textContent() === "No local card found", "newcomer gets an explicit empty state");
    check(await page.locator("#rcPrimaryAction").textContent() === "Make a local card", "newcomer gets the correct next action");
    check(await page.locator("#rcClosetAction").isHidden(), "empty state does not offer a card-backed Closet shortcut");
    check(await page.locator('input[type="email"]').count() === 1, "route contains exactly one sign-in-link email input");
    check(await page.locator("#rcAccountSignedOut").isHidden(), "unavailable account runtime keeps the request form hidden");
    await context.close();
  }

  {
    const { context, page } = await openFixture({
      card: {
        version: 1,
        fields: {
          displayName: "Ali",
          cardBg: "pinklilac",
          cardAvatarUrl: "/assets/town-characters/avatars/fairy-godmother-avatar-v1.png"
        }
      },
      handle: "local_ali"
    });
    check(await page.locator("#rcLocalKicker").textContent() === "Saved in this browser", "returning visitor gets a saved state");
    check((await page.locator("#rcLocalTitle").textContent()) === "Ali’s local card", "valid display name crosses the shared projection");
    check((await page.locator("#rcLocalDetail").textContent()).includes("@local_ali"), "valid local handle is labelled as a draft");
    check(await page.locator("#rcClosetAction").isVisible(), "valid card exposes the device-local Closet shortcut");
    await page.screenshot({
      path: path.join(evidenceDir, "resident-card-returning-1280.png"),
      fullPage: true
    });
    await context.close();
  }

  {
    const { context, page } = await openFixture({
      card: { version: 1, fields: { displayName: "Ali" } },
      handle: "<script>claim</script>"
    });
    check(!(await page.locator("#rcLocalDetail").textContent()).includes("@"), "invalid local handle is ignored");
    await context.close();
  }

  for (const card of [
    "{not-json",
    { version: 2, fields: { displayName: "Ali" } },
    { version: 1, fields: {} },
    { version: 1, fields: { displayName: "x".repeat(81) } },
    { version: 1, fields: { displayName: "<img src=x onerror=alert(1)> Ali" } },
    { version: 1, fields: { displayName: "Ali", unknownPrivateField: "hidden" } }
  ]) {
    const { context, page } = await openFixture({ card });
    check(await page.locator("#rcLocalKicker").textContent() === "Recovery needed", "malformed or unsupported envelope fails to recovery");
    check(await page.locator("#rcClosetAction").isHidden(), "invalid envelope cannot activate the Closet shortcut");
    await context.close();
  }

  {
    const { context, page } = await openFixture({
      legacy: { laidies_display_name: "Legacy Ali" }
    });
    check(await page.locator("#rcLocalKicker").textContent() === "Older local card details found", "legacy per-field state receives explicit review");
    check((await page.locator("#rcLocalDetail").textContent()).includes("Nothing was deleted or upgraded"), "legacy review is non-destructive");
    check(await page.locator("#rcClosetAction").isHidden(), "legacy fields cannot activate current-Card continuation");
    await context.close();
  }

  {
    const validCard = {
      version: 1,
      fields: {
        displayName: "Safe Ali",
        cardBg: "classic",
        cardAvatarUrl: "/assets/town-characters/avatars/fairy-godmother-avatar-v1.png"
      }
    };
    const { context, page } = await openFixture({ card: validCard }, "/laidies-card.html");
    await page.waitForFunction(() =>
      document.getElementById("cardName").textContent === "Safe Ali"
    );
    check(await page.locator("#cardName").textContent() === "Safe Ali", "Closet consumes the same valid projection");
    check(await page.locator("#cardAvatar img").count() === 1, "canonical packaged avatar renders in the Closet");
    check(
      await page.locator("#cardAvatar img").getAttribute("src") ===
        "/assets/town-characters/avatars/fairy-godmother-avatar-v1.png",
      "Closet avatar keeps the exact canonical path"
    );
    check(await page.locator("#cardAvatar img[onerror]").count() === 0, "DOM-created avatar has no executable attribute");
    await context.close();
  }

  {
    const { context, page } = await openFixture({
      viewport: { width: 390, height: 844 },
      card: { version: 1, fields: { displayName: "Mobile Ali" } }
    }, "/laidies-card.html");
    await page.waitForFunction(() =>
      document.getElementById("cardName").textContent === "Mobile Ali"
    );
    const frontFlip = page.locator(".card-face--front .card-flip-toggle");
    const frontBox = await frontFlip.boundingBox();
    check(frontBox?.width >= 44 && frontBox?.height >= 44, "mobile Card front flip meets the 44px target floor");
    await frontFlip.click();
    const backFlip = page.locator(".card-face--back .card-flip-toggle");
    const backBox = await backFlip.boundingBox();
    check(backBox?.width >= 44 && backBox?.height >= 44, "mobile Card back flip meets the 44px target floor");
    await backFlip.click();
    check(await page.locator(".card-face--front").isVisible(), "mobile Card can flip front, back, and front again");
    check(
      !(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      "mobile Card flip repair adds no horizontal overflow"
    );
    await context.close();
  }

  const judgeExploit = {
    version: 1,
    fields: {
      displayName: "Judge",
      cardAvatarUrl: "/assets/nope.png\" onerror=\"window.__residentJudgeXss=1\" x=\""
    }
  };
  const hostileCards = [
    judgeExploit,
    { version: 1, fields: { displayName: "JS", cardAvatarUrl: "javascript:window.__residentJudgeXss=1" } },
    { version: 1, fields: { displayName: "Data", cardAvatarUrl: "data:image/svg+xml,<svg onload=alert(1)>" } },
    { version: 1, fields: { displayName: "Traversal", cardAvatarUrl: "/assets/../nope.png" } },
    { version: 1, fields: { displayName: "Double", cardAvatarUrl: "/assets//nope.png" } },
    { version: 1, fields: { displayName: "Query", cardAvatarUrl: "/assets/nope.png?x=1" } },
    { version: 1, fields: { displayName: "Bidi\u202eName" } },
    { version: 1, fields: { displayName: "Control", quote: "hello\u0000world" } },
    { version: 1, fields: { displayName: "Unknown", privateReward: "granted" } },
    { version: 1, fields: { displayName: "Slug", avatarSlug: "safe\" onerror=\"window.__residentJudgeXss=1" } },
    { version: 1, fields: null },
    { version: 1, fields: [] },
    { version: 1, fields: { displayName: "Extra" }, extra: true },
    '{"version":1,"fields":{"displayName":"Proto","__proto__":{"polluted":"yes"}}}'
  ];

  for (const card of hostileCards) {
    const { context, page } = await openFixture({ card }, "/laidies-card.html");
    check(await page.evaluate(() => (window.__residentJudgeXss || 0) === 0), "hostile Card cannot execute in Closet");
    check(await page.locator("#cardAvatar [onerror]").count() === 0, "hostile Card cannot create event-handler attributes");
    check(await page.locator("#cardAvatar img").count() === 0, "non-canonical hostile avatar cannot render");
    check(await page.evaluate(() => ({}).polluted === undefined), "prototype-shaped Card cannot pollute objects");
    check(await page.evaluate(() => localStorage.getItem("laidies_fairy_plays") === "sentinel-plays"), "hostile Card cannot change reward state");
    check(await page.evaluate(() => localStorage.getItem("laidies_gt_local_state_v1") === "sentinel-community"), "hostile Card cannot change community state");
    await context.close();
  }

  {
    const { context, page } = await openFixture({
      legacy: {
        laidies_display_name: "Legacy Judge",
        laidies_card_avatar_url: "/assets/nope.png\" onerror=\"window.__residentJudgeXss=1\" x=\""
      }
    }, "/laidies-card.html");
    check(await page.evaluate(() => (window.__residentJudgeXss || 0) === 0), "legacy per-field exploit cannot execute in Closet");
    check(await page.locator("#cardAvatar img").count() === 0, "legacy per-field avatar is not a supported Card");
    check(await page.locator("#cardName").textContent() !== "Legacy Judge", "legacy per-field identity is not rendered as current Card");
    await context.close();
  }

  {
    const { context, page } = await openFixture({
      card: judgeExploit,
      handle: "local_ali"
    }, "/sorority-house.html");
    check(await page.evaluate(() => (window.__residentJudgeXss || 0) === 0), "judge exploit cannot execute in Sorority House");
    check((await page.locator("#shArrivalBody").textContent()).includes("Every room is still open"), "local identity cannot alter community access");
    await context.close();
  }

  {
    const { context, page } = await openFixture({ storageBlocked: true });
    check(await page.locator("#rcLocalKicker").textContent() === "Storage unavailable", "storage denial has an honest non-destructive state");
    check((await page.locator("#rcLocalDetail").textContent()).includes("Nothing was changed"), "storage denial explains non-mutation");
    await context.close();
  }

  for (const width of [320, 390, 1280]) {
    const { context, page } = await openFixture({ viewport: { width, height: 900 } });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    check(!overflow, `${width}px viewport has no horizontal overflow`);
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => {
      const node = document.activeElement;
      return Boolean(node && (node.matches("a,button") || node.closest("a,button")));
    });
    check(focused, `${width}px viewport exposes keyboard focus`);
    if (width === 320) {
      await page.screenshot({
        path: path.join(evidenceDir, "resident-card-newcomer-320.png"),
        fullPage: true
      });
    }
    await context.close();
  }

  const accountBackendAttempts = externalAttempts.filter((url) => {
    try {
      return new URL(url).hostname.endsWith(".supabase.co") ||
        /auth\/v1|member_profiles/i.test(url);
    } catch (_) {
      return /auth\/v1|member_profiles/i.test(url);
    }
  });
  check(
    accountBackendAttempts.length > 0 &&
      accountBackendAttempts.every((url) => {
        try {
          return new URL(url).pathname === "/auth/v1/health";
        } catch (_) {
          return false;
        }
      }),
    "unavailable route limits account backend attempts to the bounded Auth health probe"
  );
  check(pageErrors.length === 0, "hostile whole-journey fixtures produce no page errors");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  if (ownsEvidenceDir) fs.rmSync(evidenceDir, { recursive: true, force: true });
}

for (const label of checks) {
  console.log(`${failures.includes(label) ? "FAIL" : "PASS"} ${label}`);
}
console.log(`Resident Card browser: ${checks.length - failures.length}/${checks.length} passed`);
process.exit(failures.length ? 1 : 0);
