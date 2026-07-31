#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  receiveProjection,
  visitorCentreSemanticReceiver
} from "../platform-reliability/readiness-projection/v1/readiness-projection-v1.mjs";

const siteRoot = process.cwd();
const routeRel = "visitors-centre.html";
const projectionRel = "content/site/readiness/v1/entry-readiness-projection.v1.json";
const evidenceDir = path.join(siteRoot, "operations/product-stewards/visitors-centre/evidence/live-route-readiness-v1");
const playwrightRoot = path.join(siteRoot, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const failures = [];
let checks = 0;
const check = (condition, message) => { checks += 1; if (!condition) failures.push(message); };

fs.mkdirSync(evidenceDir, { recursive: true });
const projectionEnvelope = JSON.parse(fs.readFileSync(path.join(siteRoot, projectionRel), "utf8"));
const expectedReceipt = receiveProjection(projectionEnvelope, {
  now: new Date("2026-07-26T18:40:00Z"),
  expectedPayloadSha256: projectionEnvelope.integrity.payloadSha256
});
const expectedReceiver = visitorCentreSemanticReceiver(expectedReceipt);

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const targetRel = url.pathname === "/" ? routeRel : url.pathname.replace(/^\/+/, "");
  const target = path.resolve(siteRoot, targetRel);
  if (!target.startsWith(`${siteRoot}${path.sep}`) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime.get(path.extname(target).toLowerCase()) || "application/octet-stream" });
  fs.createReadStream(target).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const routeUrl = `${origin}/${routeRel}`;
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const makeContext = async (viewport, javaScriptEnabled = true) => {
  const context = await browser.newContext({ viewport, javaScriptEnabled, reducedMotion: "reduce" });
  await context.route(/^https:/, (route) => route.abort());
  return context;
};

async function waitForReceiver(page) {
  await page.waitForFunction(() => document.documentElement.dataset.vcReceiverReady === "true");
  await page.evaluate(() => new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.waitForTimeout(100);
}

async function installStorage(page, entries) {
  await page.addInitScript((values) => {
    for (const [key, value] of Object.entries(values)) localStorage.setItem(key, value);
  }, entries);
}

try {
  check(expectedReceiver.mode === "fresh", "Node receiver did not accept current shared projection");
  check(expectedReceiver.destinations.length === 17, "Node receiver route count");
  check(expectedReceiver.destinations.every((item) => item.completionClaim === false), "Node receiver completion claim");
  check(expectedReceiver.destinations.every((item) => item.state === "held"), "all-null owner intake is not held");

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 700 }]) {
    const ctx = await makeContext(viewport, false);
    const page = await ctx.newPage();
    await page.goto(routeUrl, { waitUntil: "domcontentloaded" });
    check(await page.locator("[data-vc-id]").count() === 17, `${viewport.width}: no-JS route count`);
    check(await page.locator("[data-vc-state]").count() === 0, `${viewport.width}: no-JS embedded state`);
    check(await page.locator("[data-vc-summary]").count() === 0, `${viewport.width}: no-JS embedded summary`);
    check(await page.locator("[data-vc-limitation]").count() === 0, `${viewport.width}: no-JS embedded limitation`);
    check(await page.locator("#vc-title").count() === 1, `${viewport.width}: no-JS arrival`);
    check(await page.locator(".vc-handoff-boundary").count() === 1, `${viewport.width}: no-JS completion boundary`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${viewport.width}: no-JS horizontal overflow`);
    await ctx.close();
  }

  const visitorStates = {
    "first-time": {},
    "returning-no-card": { laidies_welcome_seen: "true" },
    "card-local": { laidies_card_username: "@fixture-only" },
    "card-account": { laidies_account_fixture: "unverified" }
  };
  const viewports = [
    { name: "desktop-1440", value: { width: 1440, height: 1000 } },
    { name: "mobile-390", value: { width: 390, height: 844 } },
    { name: "mobile-320", value: { width: 320, height: 700 } }
  ];

  for (const [visitor, storage] of Object.entries(visitorStates)) {
    for (const viewport of viewports) {
      const ctx = await makeContext(viewport.value);
      const page = await ctx.newPage();
      await installStorage(page, storage);
      await page.goto(routeUrl, { waitUntil: "domcontentloaded" });
      await waitForReceiver(page);
      const label = `${viewport.name}-${visitor}`;
      const semantics = await page.evaluate(() => window.VC_READINESS_SEMANTICS);
      check(semantics.mode === "fresh", `${label}: receiver mode`);
      check(semantics.destinations.length === 17, `${label}: semantic count`);
      check(semantics.destinations.every((item) => item.completionClaim === false), `${label}: completion claims`);
      check(semantics.destinations.every((item) => item.state === "held"), `${label}: current owner-intake state`);
      check(await page.locator("#vc-projection-status").getAttribute("data-mode") === "fresh", `${label}: visible receiver mode`);
      check((await page.locator("#vc-projection-status").innerText()).includes("Destination pages retain readiness and completion authority"),
        `${label}: receiver authority boundary`);
      check(await page.locator("#vc-visitor-state").getAttribute("data-card-scope") === "unavailable", `${label}: Card scope`);
      check((await page.locator("#vc-visitor-state").innerText()).includes("No Resident Card, account, name, ownership"),
        `${label}: Card non-inference`);
      check(await page.locator("#vc-directory option").count() === 18, `${label}: select count`);
      check(await page.locator("[data-vc-id]").count() === 17, `${label}: static route count`);
      check(await page.locator(".vc-map-spot").count() === 17, `${label}: map count`);
      check(await page.locator("#vc-building-card").isHidden(), `${label}: invented selection`);
      check((await page.locator(".vc-handoff-boundary").innerText()).includes("navigation only"), `${label}: completion boundary`);
      check((await page.locator(".vc-orientation").innerText()).includes("does not claim that playback"), `${label}: trailer boundary`);
      check((await page.locator(".vc-orientation").innerText()).includes("Preparation, sharing, sending, delivery"), `${label}: postcard boundary`);
      check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
        `${label}: horizontal overflow`);

      await page.locator("#vc-directory").selectOption("fairy-godmother");
      const expected = expectedReceiver.destinations.find((item) => item.destinationId === "fairy-godmother");
      check(await page.locator("#vc-building-card").isVisible(), `${label}: reveal`);
      check(await page.locator("#vc-building-card").getAttribute("data-completion-claim") === "false",
        `${label}: DOM completion claim`);
      check((await page.locator("#vc-card-state").textContent()).trim() === expected.label, `${label}: label`);
      check((await page.locator("#vc-card-line").textContent()).trim() === expected.summary, `${label}: summary`);
      check((await page.locator("#vc-card-list li").textContent()).trim() === expected.limitation, `${label}: limitation`);
      check((await page.locator("#vc-card-enter").textContent()).trim() === expected.actionLabel, `${label}: action`);
      check(await page.locator("#vc-card-enter").getAttribute("href") === expected.route, `${label}: route`);
      check(await page.evaluate(() => document.activeElement?.id === "vc-card-enter"), `${label}: reveal focus`);
      await page.keyboard.press("Escape");
      check(await page.locator("#vc-building-card").isHidden(), `${label}: Escape close`);
      check(await page.evaluate(() => document.activeElement?.id === "vc-directory"), `${label}: Escape focus return`);

      const transition = await page.locator(".vc-action").first().evaluate((node) => getComputedStyle(node).transitionDuration);
      check(transition.split(",").every((value) => parseFloat(value) === 0), `${label}: reduced motion`);
      await page.screenshot({ path: path.join(evidenceDir, `${label}.png`), fullPage: true });
      await ctx.close();
    }
  }

  const parityCtx = await makeContext({ width: 1440, height: 1000 });
  const parityPage = await parityCtx.newPage();
  await parityPage.goto(routeUrl, { waitUntil: "domcontentloaded" });
  await waitForReceiver(parityPage);
  for (const expected of expectedReceiver.destinations) {
    await parityPage.locator("#vc-directory").selectOption(expected.destinationId);
    check((await parityPage.locator("#vc-card-title").textContent()).trim() === expected.name,
      `${expected.destinationId}: name`);
    check((await parityPage.locator("#vc-card-state").textContent()).trim() === expected.label,
      `${expected.destinationId}: label`);
    check((await parityPage.locator("#vc-card-line").textContent()).trim() === expected.summary,
      `${expected.destinationId}: summary`);
    check((await parityPage.locator("#vc-card-list li").textContent()).trim() === expected.limitation,
      `${expected.destinationId}: limitation`);
    check((await parityPage.locator("#vc-card-enter").textContent()).trim() === expected.actionLabel,
      `${expected.destinationId}: action`);
    check(await parityPage.locator("#vc-card-enter").getAttribute("href") === expected.route,
      `${expected.destinationId}: route`);
    check(await parityPage.locator("#vc-building-card").getAttribute("data-completion-claim") === "false",
      `${expected.destinationId}: completion`);
    check(await parityPage.evaluate(() => document.activeElement?.id === "vc-card-enter"),
      `${expected.destinationId}: focus`);
    await parityPage.locator("#vc-card-close").click();
  }
  const minMapTarget = await parityPage.locator(".vc-map-spot").first().evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return Math.min(rect.width, rect.height);
  });
  check(minMapTarget >= 44, "desktop map target below 44px");
  check(await parityPage.locator("#vc-projection-status").getAttribute("role") === "status", "projection live-region role");
  check(await parityPage.locator("#vc-building-card").getAttribute("aria-atomic") === "true", "reveal atomicity");
  const headingOrder = await parityPage.locator("main h1, main h2").evaluateAll((nodes) =>
    nodes.map((node) => node.tagName.toLowerCase()));
  check(headingOrder[0] === "h1", "heading order does not start at h1");
  await parityPage.addStyleTag({ content: "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }" });
  check(!(await parityPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
    "text-spacing override causes horizontal overflow");
  await parityCtx.close();

  const negativeCases = ["missing", "corrupt", "incomplete", "checksum", "runtime", "directory"];
  for (const failure of negativeCases) {
    const ctx = await makeContext({ width: 390, height: 844 });
    const page = await ctx.newPage();
    if (failure === "missing") {
      await page.route(`**/${projectionRel}`, (route) => route.fulfill({ status: 404, body: "missing" }));
    } else if (failure === "corrupt") {
      await page.route(`**/${projectionRel}`, (route) => route.fulfill({
        status: 200, contentType: "application/json", body: "{not-json"
      }));
    } else if (failure === "incomplete") {
      const incomplete = structuredClone(projectionEnvelope);
      incomplete.payload.destinations.pop();
      await page.route(`**/${projectionRel}`, (route) => route.fulfill({
        status: 200, contentType: "application/json", body: JSON.stringify(incomplete)
      }));
    } else if (failure === "checksum") {
      const changed = structuredClone(projectionEnvelope);
      changed.payload.destinations[0].label = "Changed but structurally valid";
      changed.integrity.payloadSha256 = crypto.createHash("sha256")
        .update(JSON.stringify(changed.payload)).digest("hex");
      await page.route(`**/${projectionRel}`, (route) => route.fulfill({
        status: 200, contentType: "application/json", body: JSON.stringify(changed)
      }));
    } else if (failure === "runtime") {
      await page.route("**/readiness-runtime-v1.js*", (route) => route.abort());
    } else if (failure === "directory") {
      await page.route("**/sunnyvaile-directory.js*", (route) => route.abort());
    }
    await page.goto(routeUrl, { waitUntil: "domcontentloaded" });
    await waitForReceiver(page);
    const semantics = await page.evaluate(() => window.VC_READINESS_SEMANTICS);
    if (failure === "directory") {
      check(await page.locator("#vc-directory").isDisabled(), `${failure}: enhanced directory remains enabled`);
      check(await page.locator("[data-vc-id]").count() === 17, `${failure}: static route count`);
      check(await page.locator("#vc-directory-fallback").isVisible(), `${failure}: fallback visibility`);
    } else {
      check(semantics.mode === "fail-closed", `${failure}: receiver mode`);
      check(semantics.destinations.length === 17, `${failure}: route count`);
      for (const destination of semantics.destinations) {
        check(destination.state === "unavailable", `${failure}/${destination.destinationId}: state`);
        check(destination.summary === "Open the named route only to check its current page.",
          `${failure}/${destination.destinationId}: generic summary`);
        check(destination.completionClaim === false, `${failure}/${destination.destinationId}: completion`);
      }
      await page.locator("#vc-directory").selectOption("fairy-godmother");
      check((await page.locator("#vc-card-state").textContent()).toLowerCase().includes("unavailable"),
        `${failure}: visible unavailable state`);
      check((await page.locator("#vc-card-list").innerText()).includes("navigation, not completion"),
        `${failure}: visible completion boundary`);
      check(await page.locator("#vc-card-enter").getAttribute("href") === "/games/fairy-godmother.html",
        `${failure}: canonical route`);
    }
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${failure}: horizontal overflow`);
    await page.screenshot({ path: path.join(evidenceDir, `failure-${failure}.png`), fullPage: true });
    await ctx.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const result = {
  testedAt: new Date().toISOString(),
  command: "node operations/product-stewards/visitors-centre/test-live-route-readiness-v1.mjs",
  route: routeRel,
  hashes: {
    routeSha256: sha256(fs.readFileSync(path.join(siteRoot, routeRel))),
    projectionArtifactSha256: sha256(fs.readFileSync(path.join(siteRoot, projectionRel))),
    projectionPayloadSha256: projectionEnvelope.integrity.payloadSha256,
    browserRuntimeSha256: sha256(fs.readFileSync(path.join(siteRoot, "content/site/readiness/v1/readiness-runtime-v1.js"))),
    canonicalDestinationsSha256: sha256(fs.readFileSync(path.join(siteRoot, "content/site/readiness/v1/canonical-destinations.v1.json")))
  },
  playwrightCore: JSON.parse(fs.readFileSync(path.join(playwrightRoot, "package.json"), "utf8")).version,
  checks,
  failures,
  observedScope: [
    "checksum-bound current shared receiver and all-null owner intake",
    "17 route semantics with completionClaim=false and no embedded destination prose",
    "four first/returning/Card storage conditions with one explicit non-inference state",
    "desktop 1440, mobile 390 and mobile 320",
    "no-JS, runtime, projection missing/corrupt/incomplete/checksum and directory failures",
    "focus/Escape, 44px desktop map targets, reduced motion, text spacing and responsive overflow",
    "optional tour/trailer/postcard handoffs and navigation-only boundary"
  ],
  limitations: [
    "Current shared owner intake contains no admitted owner receipts, so all 17 destinations are held pending receipts.",
    "Headless Chrome does not prove native Safari, VoiceOver, human comprehension or public-origin behavior.",
    "The edited live route is local only; no deployment or publication occurred."
  ]
};
const resultPath = path.join(evidenceDir, "test-result.json");
fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
if (failures.length) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(result, null, 2));
