#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.SORORITY_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) throw new Error("Set PLAYWRIGHT_CORE_PATH.");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/" ? "sorority-house.html" : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved) ||
      fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime.get(path.extname(resolved)) || "application/octet-stream" });
  fs.createReadStream(resolved).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const origin = `http://127.0.0.1:${port}`;
const unsupportedOrigin = `http://sorority.production.test:${port}`;
const browser = await chromium.launch({
  executablePath: chrome,
  headless: true,
  args: ["--host-resolver-rules=MAP sorority.production.test 127.0.0.1"]
});
const failures = [];
const checks = [];
const externalAttempts = [];
function check(value, label) {
  checks.push(label);
  if (!value) failures.push(label);
}

async function contextFor(options = {}) {
  const context = await browser.newContext({
    viewport: options.viewport || { width: 1280, height: 900 }
  });
  await context.addInitScript((settings) => {
    if (settings.providerState) {
      window.__LAIDIES_COMMUNITY_PREFLIGHT__ = "sorority-community-p0-1";
      window.__LAIDIES_COMMUNITY_PREFLIGHT_STATE__ = settings.providerState;
    }
    if (settings.localCard) {
      localStorage.setItem("laidies_card_username", "local-only-ali");
    }
    if (settings.blockGirlTalkStorage) {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === "laidies_gt_local_state_v1") {
          throw new DOMException("Synthetic denial", "QuotaExceededError");
        }
        return original.call(this, key, value);
      };
    }
    if (settings.initialGirlTalkState !== undefined) {
      localStorage.setItem(
        "laidies_gt_local_state_v1",
        JSON.stringify(settings.initialGirlTalkState)
      );
    }
    if (settings.forceTruth) {
      Math.random = () => 0;
    }
    const fixtureCard = settings.fixtureCard || "";
    if (/^[TD]\d+$/.test(fixtureCard || "")) {
      const isTruth = fixtureCard.startsWith("T");
      const index = Number(fixtureCard.slice(1)) - 1;
      const length = isTruth ? 25 : 28;
      const values = [isTruth ? 0 : 0.9, (index + 0.01) / length];
      Math.random = () => values.length ? values.shift() : 0;
    }
  }, options);
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith(origin) || url.startsWith(unsupportedOrigin)) return route.continue();
    if (/hyvor|talk\.hyvor/i.test(url)) externalAttempts.push(url);
    return route.abort();
  });
  return context;
}

try {
  const firstContext = await contextFor();
  const page = await firstContext.newPage();
  await page.goto(`${origin}/sorority-house.html`, { waitUntil: "domcontentloaded" });
  check((await page.locator("#shArrivalTitle").innerText()).includes("Come in"),
    "newcomer is welcomed without resident fiction");
  check((await page.locator("#shArrivalBody").innerText()).includes("Hyvor"),
    "newcomer sees external provider boundary");
  check(await page.locator(".sh-wing-key").count() === 4, "four wings are discoverable");
  let roomCount = 0;
  for (const wing of ["common", "advice", "creative", "yours"]) {
    await page.locator(`.sh-wing-key[data-wing="${wing}"]`).focus();
    await page.keyboard.press("Enter");
    roomCount += await page.locator(".sh-room-choice").count();
  }
  check(roomCount === 11, "all eleven destinations are keyboard discoverable");
  const destinations = [
    ["common", "ask-the-room", "Ask the Room"],
    ["common", "wins", "Wins of the Week"],
    ["common", "chat-room-digest", "Chat Room Digest"],
    ["advice", "dear-laidies", "Dear LAiDIES"],
    ["advice", "try-on-debrief", "The Try-On Debrief"],
    ["advice", "send-it-energy", "Send It Energy"],
    ["creative", "mix-cd-exchange", "Mix CD Exchange"],
    ["creative", "burn-book", "The Burn Book"],
    ["creative", "comment-card", "Comment Card"],
    ["yours", "closet", "Your Closet"],
    ["yours", "dare-reports", "Dare Reports"]
  ];
  let activeWing = "";
  for (const [wing, room, title] of destinations) {
    if (wing !== activeWing) {
      await page.locator(`.sh-wing-key[data-wing="${wing}"]`).click();
      activeWing = wing;
    } else {
      await page.locator(`.sh-room-choice[data-room="${room}"]`).click();
    }
    check(page.url().endsWith(`#room-${room}`) &&
      await page.locator("#shConversationTitle").innerText() === title,
      `${title} writes its exact room hash`);
  }
  for (let index = destinations.length - 2; index >= 0; index -= 1) {
    await page.goBack();
    const [, room, title] = destinations[index];
    check(page.url().endsWith(`#room-${room}`) &&
      await page.locator("#shConversationTitle").innerText() === title,
      `Back restores ${title}`);
  }
  for (let index = 1; index < destinations.length; index += 1) {
    await page.goForward();
    const [, room, title] = destinations[index];
    check(page.url().endsWith(`#room-${room}`) &&
      await page.locator("#shConversationTitle").innerText() === title,
      `Forward restores ${title}`);
  }
  await page.locator('.sh-wing-key[data-wing="common"]').click();
  check(await page.locator('[data-community-state="local-preview"]').count() === 1,
    "localhost renders explicit local preview");
  check((await page.locator("[data-community-state]").innerText()).includes("no discussion was loaded"),
    "local preview makes no provider success claim");
  check(await page.locator("#shFallbackLink").isVisible(), "selected room keeps a direct return/handoff");
  for (const [href, label] of [
    ["https://talk.hyvor.com/privacy", "Hyvor Talk privacy"],
    ["https://talk.hyvor.com/terms", "Hyvor Talk terms"],
    ["https://talk.hyvor.com/docs/moderation", "Hyvor moderation and reporting guide"]
  ]) {
    const link = page.locator(`[data-community-state] a[href="${href}"]`);
    check(await link.isVisible() && await link.innerText() === label,
      `house provider boundary exposes ${label}`);
  }
  await firstContext.close();

  const cardContext = await contextFor({ localCard: true });
  const cardPage = await cardContext.newPage();
  await cardPage.goto(`${origin}/sorority-house.html`, { waitUntil: "domcontentloaded" });
  check((await cardPage.locator("#shArrivalBody").innerText()).includes("not a Hyvor sign-in"),
    "local Resident Card is not treated as community identity");
  check((await cardPage.locator("#shDoorState").innerText()).includes("Hyvor controls"),
    "returning local card keeps provider boundary");
  await cardContext.close();

  for (const state of ["unavailable", "signed-out", "held"]) {
    const stateContext = await contextFor({ providerState: state });
    const statePage = await stateContext.newPage();
    await statePage.goto(`${origin}/sorority-house.html`, { waitUntil: "domcontentloaded" });
    check(await statePage.locator(`[data-community-state="${state}"]`).count() === 1,
      `${state} provider state renders`);
    const text = await statePage.locator("[data-community-state]").innerText();
    check(!/submitted successfully|published successfully|moderated successfully/i.test(text),
      `${state} state makes no external success claim`);
    check(text.includes("not guaranteed") || text.includes("Nothing was submitted") ||
      text.includes("not published"), `${state} exposes bounded outcome truth`);
    await stateContext.close();
  }

  const unsupportedContext = await contextFor();
  const unsupportedPage = await unsupportedContext.newPage();
  await unsupportedPage.goto(`${unsupportedOrigin}/sorority-house.html`, { waitUntil: "domcontentloaded" });
  check(await unsupportedPage.locator('[data-community-state="unsupported-host"]').count() === 1,
    "unsupported host fails held");
  check((await unsupportedPage.locator("[data-community-state]").innerText()).includes("provider was not contacted"),
    "unsupported host explains provider denial");
  await unsupportedContext.close();

  const directContext = await contextFor({ providerState: "signed-out" });
  const directPage = await directContext.newPage();
  for (const room of [
    "ask-the-room", "wins", "dear-laidies", "try-on-debrief",
    "send-it-energy", "mix-cd-exchange", "burn-book"
  ]) {
    await directPage.goto(`${origin}/community/${room}.html`, { waitUntil: "domcontentloaded" });
    check(await directPage.locator('[data-community-state="signed-out"]').count() === 1,
      `${room} uses the shared signed-out boundary`);
    check((await directPage.locator("[data-community-state]").innerText()).includes("confidential work"),
      `${room} exposes safe-sharing warning`);
    check(await directPage.locator(
      '[data-community-state] a[href="https://talk.hyvor.com/privacy"]'
    ).isVisible(), `${room} exposes Hyvor privacy`);
    check(await directPage.locator(
      '[data-community-state] a[href="https://talk.hyvor.com/terms"]'
    ).isVisible(), `${room} exposes Hyvor terms`);
    check(await directPage.locator(
      '[data-community-state] a[href="https://talk.hyvor.com/docs/moderation"]'
    ).isVisible(), `${room} exposes Hyvor moderation/reporting`);
  }
  await directPage.goto(
    `${origin}/community/ask-the-room.html?from=this-week&issue=4&group=connect`,
    { waitUntil: "domcontentloaded" }
  );
  const weeklyReturn = directPage.locator("[data-wednesday-return]");
  check(await weeklyReturn.isVisible() &&
      (await weeklyReturn.getAttribute("href")) ===
        "../this-week.html?issue=4&bag=open&group=connect",
    "direct room preserves the weekly Bag return");
  const providerContrast = await directPage.evaluate(() => {
    const element = document.querySelector("[data-community-state]");
    function rgb(value) { return value.match(/\d+/g).slice(0, 3).map(Number); }
    function lum(values) {
      const c = values.map((v) => {
        const n = v / 255;
        return n <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
      });
      return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
    }
    const style = getComputedStyle(element);
    const a = lum(rgb(style.color));
    const b = lum(rgb(style.backgroundColor));
    return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  });
  check(providerContrast >= 4.5, `provider state contrast passes (${providerContrast.toFixed(2)}:1)`);
  await directContext.close();

  const girlContext = await contextFor({ forceTruth: true });
  const girlPage = await girlContext.newPage();
  await girlPage.goto(`${origin}/games/girl-talk.html`, { waitUntil: "domcontentloaded" });
  check(await girlPage.locator("#gtDrawButton").isVisible(), "Girl Talk works without a Resident Card gate");
  check((await girlPage.locator(".gt-howto").innerText()).includes("sanitized pattern written from scratch"),
    "Girl Talk explains optional safe sharing");
  await girlPage.locator("#gtDrawButton").focus();
  await girlPage.keyboard.press("Enter");
  await girlPage.locator('[data-action="honest"]').waitFor();
  await girlPage.waitForFunction(() => document.activeElement?.id === "gtCardPrompt");
  check(await girlPage.evaluate(() => document.activeElement?.id === "gtCardPrompt"),
    "draw moves focus to the new card prompt");
  await girlPage.keyboard.press("Tab");
  check(await girlPage.locator('[data-action="honest"]').evaluate((node) => node === document.activeElement),
    "keyboard reaches the first card action");
  await girlPage.keyboard.press("Enter");
  await girlPage.waitForFunction(() =>
    document.activeElement?.getAttribute("data-action") === "draw");
  check(await girlPage.locator('[data-action="draw"]').evaluate((node) => node === document.activeElement),
    "completion moves focus to draw again after the live result");
  const girlResult = await girlPage.locator("#gtResult").innerText();
  check(girlResult.toLowerCase().includes("local sticker marked"),
    `truth reflection marks only a local sticker (${girlResult.slice(0, 80)})`);
  const localState = await girlPage.evaluate(() =>
    JSON.parse(localStorage.getItem("laidies_gt_local_state_v1")));
  check(localState.version === 1 && localState.stickers.length === 1,
    "Girl Talk verifies one versioned local envelope");
  check(Object.keys(localState).sort().join("|") === "dares|penalties|stickers|version",
    "Girl Talk persists the exact v1 shape");
  await girlPage.keyboard.press("Enter");
  await girlPage.locator('[data-action="honest"]').waitFor();
  await girlPage.waitForFunction(() => document.activeElement?.id === "gtCardPrompt");
  check(await girlPage.evaluate(() => document.activeElement?.id === "gtCardPrompt"),
    "draw again restores deliberate card focus");
  check(!(await girlPage.evaluate(() =>
    localStorage.getItem("laidies_gt_stickers_earned"))),
    "Girl Talk emits no legacy reward-shaped sticker key");
  await girlContext.close();

  const invalidRecords = [
    {
      label: "unknown and extra fields",
      value: { version: 1, stickers: ["NOT_A_CARD"], dares: [], penalties: [],
        names: { NOT_A_CARD: "forged" }, extra: "accepted" }
    },
    {
      label: "duplicate progress",
      value: { version: 1, stickers: ["T1", "T1"], dares: [], penalties: [] }
    },
    {
      label: "incoherent dare",
      value: { version: 1, stickers: [], dares: ["D1"], penalties: [] }
    },
    {
      label: "unknown penalty",
      value: { version: 1, stickers: [], dares: [], penalties: ["FORGED"] }
    },
    {
      label: "unbounded penalty array",
      value: { version: 1, stickers: [], dares: [],
        penalties: Array.from({ length: 101 }, () => "BEIGE") }
    }
  ];
  for (const fixture of invalidRecords) {
    const invalidContext = await contextFor({ initialGirlTalkState: fixture.value });
    const invalidPage = await invalidContext.newPage();
    await invalidPage.goto(`${origin}/games/girl-talk.html`, { waitUntil: "domcontentloaded" });
    check((await invalidPage.locator("#gtStickerCount").innerText()) === "0" &&
      (await invalidPage.locator("#gtDareCount").innerText()) === "0" &&
      (await invalidPage.locator("#gtPenaltyCount").innerText()) === "0",
      `${fixture.label} never counts`);
    check((await invalidPage.locator("#gtResult").innerText()).includes("malformed local record"),
      `${fixture.label} renders recovery copy`);
    check(await invalidPage.evaluate(() =>
      localStorage.getItem("laidies_gt_local_state_v1") === null),
      `${fixture.label} is dropped`);
    await invalidContext.close();
  }

  const canonicalContext = await contextFor({
    initialGirlTalkState: {
      version: 1,
      stickers: ["T2", "T1", "D2", "D1"],
      dares: ["D2", "D1"],
      penalties: ["BEIGE", "BEIGE"]
    }
  });
  const canonicalPage = await canonicalContext.newPage();
  await canonicalPage.goto(`${origin}/games/girl-talk.html`, { waitUntil: "domcontentloaded" });
  const canonicalState = await canonicalPage.evaluate(() =>
    JSON.parse(localStorage.getItem("laidies_gt_local_state_v1")));
  check(canonicalState.stickers.join(",") === "T1,T2,D1,D2" &&
    canonicalState.dares.join(",") === "D1,D2" &&
    canonicalState.penalties.join(",") === "BEIGE,BEIGE",
    "valid v1 state is canonicalized and penalty duplicates remain intentional");
  await canonicalContext.close();

  const unsafeRendered = /\b(post proof|post it|post before|share the|share what|drop it|real emails|email in your inbox|email you received|dm one|then send it)\b/i;
  // Render every card formerly called out for real-email, private-message,
  // post/share or cross-product routing. The source lint above the browser
  // suite covers all 53 catalogue entries deterministically.
  for (const cardId of ["T10", "T13", "T17", "D2", "D12", "D16", "D21", "D23"]) {
    const catalogueContext = await contextFor({ fixtureCard: cardId });
    const cataloguePage = await catalogueContext.newPage();
    await cataloguePage.goto(
      `${origin}/games/girl-talk.html`,
      { waitUntil: "domcontentloaded" }
    );
    await cataloguePage.evaluate((fixtureCard) => {
      const isTruth = fixtureCard.startsWith("T");
      const index = Number(fixtureCard.slice(1)) - 1;
      const length = isTruth ? 25 : 28;
      const values = [isTruth ? 0 : 0.9, (index + 0.01) / length];
      Math.random = () => values.length ? values.shift() : 0;
    }, cardId);
    await cataloguePage.locator("#gtDrawButton").click();
    await cataloguePage.locator('[data-action="honest"], [data-action="complete-dare"]').first().waitFor();
    const rendered = [
      await cataloguePage.locator("#gtCardPrompt").innerText(),
      await cataloguePage.locator("#gtCardRoom").innerText()
    ].join(" ");
    check(!unsafeRendered.test(rendered), `${cardId} has no unsafe rendered directive`);
    if (cardId.startsWith("D")) {
      check(rendered.includes("Optional room for a sanitized pattern") &&
        rendered.includes("Keep the full situation private"),
        `${cardId} renders the optional private sharing boundary (${rendered.slice(0, 180)})`);
    }
    await catalogueContext.close();
  }

  const deniedContext = await contextFor({ forceTruth: true, blockGirlTalkStorage: true });
  const deniedPage = await deniedContext.newPage();
  await deniedPage.goto(`${origin}/games/girl-talk.html`, { waitUntil: "domcontentloaded" });
  await deniedPage.locator("#gtDrawButton").click();
  await deniedPage.locator('[data-action="honest"]').click();
  check((await deniedPage.locator("#gtResult").innerText()).includes("could not mark"),
    "blocked storage withholds local sticker success");
  check(!(await deniedPage.evaluate(() =>
    localStorage.getItem("laidies_gt_local_state_v1"))),
    "blocked storage creates no local completion envelope");
  await deniedContext.close();

  const mobileContext = await contextFor({ viewport: { width: 320, height: 700 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${origin}/sorority-house.html`, { waitUntil: "domcontentloaded" });
  check(await mobilePage.evaluate(() =>
    document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
    "Sorority House has no 320px horizontal overflow");
  await mobilePage.goto(`${origin}/games/girl-talk.html`, { waitUntil: "domcontentloaded" });
  check(await mobilePage.evaluate(() =>
    document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
    "Girl Talk has no 320px horizontal overflow");
  await mobileContext.close();

  for (const [zoom, width] of [[2, 640], [4, 320]]) {
    const zoomContext = await contextFor({ viewport: { width, height: 900 } });
    const zoomPage = await zoomContext.newPage();
    await zoomPage.goto(`${origin}/sorority-house.html`, { waitUntil: "domcontentloaded" });
    check(await zoomPage.evaluate(() =>
      document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
      `Sorority House passes ${zoom * 100}% reflow proxy`);
    await zoomContext.close();
  }

  const reducedContext = await contextFor();
  const reducedPage = await reducedContext.newPage();
  await reducedPage.emulateMedia({ reducedMotion: "reduce" });
  await reducedPage.goto(`${origin}/sorority-house.html`, { waitUntil: "domcontentloaded" });
  check(await reducedPage.evaluate(() =>
    getComputedStyle(document.querySelector(".sh-wing-key")).transitionDuration === "0s"),
    "reduced motion removes house transitions");
  await reducedContext.close();

  check(externalAttempts.length === 0, "all synthetic/local journeys make zero Hyvor requests");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error("SORORITY HOUSE BROWSER FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("SORORITY HOUSE BROWSER PASS");
console.log(`checks=${checks.length}`);
console.log(`external_provider_attempts=${externalAttempts.length}`);
