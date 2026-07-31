#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  receiveProjection,
  visitorCentreSemanticReceiver
} from "../../product-stewards/platform-reliability/readiness-projection/v1/readiness-projection-v1.mjs";
import {
  makeValidEnvelope
} from "../../product-stewards/platform-reliability/readiness-projection/v1/fixtures-v1.mjs";

const siteRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const explorationRoot = path.dirname(fileURLToPath(import.meta.url));
const rel = "operations/design-explorations/visitors-centre-building-championship-20260726/functional-candidate-v3-readiness-projection/index.html";
const candidateDir = path.join(siteRoot, path.dirname(rel));
const evidenceDir = path.join(candidateDir, "evidence");
const fixturePath = path.join(candidateDir, "readiness-semantic-fixture-v1.json");
const adapterPath = path.join(candidateDir, "receiver-integration-v1.js");
const playwrightRoot = path.join(siteRoot, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const failures = [];
let checks = 0;
const check = (condition, message) => { checks += 1; if (!condition) failures.push(message); };

fs.mkdirSync(evidenceDir, { recursive: true });

const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const envelope = await makeValidEnvelope();
const expectedFresh = visitorCentreSemanticReceiver(
  receiveProjection(envelope, { now: new Date("2026-07-26T18:16:00Z") })
);
const expectedFailClosed = visitorCentreSemanticReceiver(
  receiveProjection(null, { now: new Date("2026-07-26T18:16:00Z") })
);
check(JSON.stringify(fixture.fresh) === JSON.stringify(expectedFresh), "generated fresh semantics differ from real receiver");
check(JSON.stringify(fixture.failClosed) === JSON.stringify(expectedFailClosed), "generated fail-closed semantics differ from real receiver");
check(fixture.provenance.admittedBaseSha256 === "d138d2a18e685f3f2923f00d966e2969dce14f2e2b1fb48bb38b0547266e9573",
  "admitted v2 base hash receipt changed");

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const targetRel = url.pathname === "/" ? rel : url.pathname.replace(/^\/+/, "");
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
const baseUrl = `${origin}/${rel}`;
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const makeContext = (viewport, javaScriptEnabled = true) =>
  browser.newContext({ viewport, javaScriptEnabled, reducedMotion: "reduce" });

try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 700 }]) {
    const ctx = await makeContext(viewport, false);
    const page = await ctx.newPage();
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    check(await page.locator("[data-static-id]").count() === 17, `${viewport.width}: no-JS route count`);
    check(await page.locator("#arrival-title").count() === 1, `${viewport.width}: no-JS orientation`);
    check(await page.locator("#front-counter").count() === 1, `${viewport.width}: no-JS destination selection`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${viewport.width}: no-JS horizontal overflow`);
    await ctx.close();
  }

  const stateExpectations = {
    "first-time": ["First-time visitor", "does not inspect or create identity"],
    "returning-no-card": ["Returning visitor · no Resident Card", "does not prove a Card"],
    "card-local": ["Resident Card · device-local scope", "does not mean signed in"],
    "card-account": ["verified-account scope unavailable", "No name, ownership"]
  };
  const viewports = [
    { name: "desktop-1440", value: { width: 1440, height: 1000 } },
    { name: "mobile-390", value: { width: 390, height: 844 } },
    { name: "mobile-320", value: { width: 320, height: 700 } }
  ];

  for (const [visitor, expected] of Object.entries(stateExpectations)) {
    for (const viewport of viewports) {
      const ctx = await makeContext(viewport.value);
      const page = await ctx.newPage();
      await page.goto(`${baseUrl}?visitor=${visitor}`, { waitUntil: "networkidle" });
      await page.waitForFunction(() => document.documentElement.dataset.receiverReady === "true");
      const label = `${viewport.name}-${visitor}`;
      const semantics = await page.evaluate(() => window.VC_READINESS_SEMANTICS);
      check(semantics.mode === "fresh", `${label}: receiver mode`);
      check(semantics.destinations.length === 17, `${label}: receiver route count`);
      check(semantics.destinations.every((item) => item.completionClaim === false), `${label}: completion claim`);
      check(await page.locator("#projectionStatus").getAttribute("data-provenance") === "SYNTHETIC_PLATFORM_CONTRACT_FIXTURE",
        `${label}: provenance label`);
      check((await page.locator("#projectionStatus").innerText()).includes("Destination pages retain readiness and completion authority"),
        `${label}: receiver authority boundary`);
      check((await page.locator("#visitorStateTitle").innerText()).includes(expected[0]), `${label}: state title`);
      check((await page.locator("#visitorState").innerText()).includes(expected[1]), `${label}: state scope`);
      check(await page.locator("#visitorState").getAttribute("data-synthetic") === "true", `${label}: visitor fixture label`);
      check(await page.locator("#destinationSelect option").count() === 18, `${label}: select route count`);
      check(await page.locator(".map-spot").count() === 17, `${label}: map route count`);
      check(await page.locator("[data-static-id]").count() === 17, `${label}: static route count`);
      check(await page.locator("#destinationDetail").isHidden(), `${label}: no invented selection`);
      check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
        `${label}: horizontal overflow`);
      check((await page.locator(".boundary").innerText()).includes("navigation only"), `${label}: navigation boundary`);

      await page.locator("#destinationSelect").selectOption("fairy-godmother");
      const semanticExpected = expectedFresh.destinations.find((item) => item.destinationId === "fairy-godmother");
      check(await page.locator("#destinationDetail").isVisible(), `${label}: reveal`);
      check(await page.locator("#destinationDetail").getAttribute("data-completion-claim") === "false",
        `${label}: DOM completion boundary`);
      check((await page.locator("#destinationState").textContent()).trim() === semanticExpected.label, `${label}: semantic label`);
      check(await page.locator("#destinationSummary").innerText() === semanticExpected.summary, `${label}: semantic summary`);
      check(await page.locator("#destinationLimit").innerText() === semanticExpected.limitation, `${label}: semantic limitation`);
      check(await page.locator("#destinationEnter").innerText() === semanticExpected.actionLabel, `${label}: semantic action`);
      check(await page.locator("#destinationEnter").getAttribute("href") === semanticExpected.route, `${label}: semantic route`);
      check(await page.evaluate(() => document.activeElement?.id === "destinationEnter"), `${label}: reveal focus`);
      await page.keyboard.press("Escape");
      check(await page.locator("#destinationDetail").isHidden(), `${label}: Escape close`);
      check(await page.evaluate(() => document.activeElement?.id === "destinationSelect"), `${label}: Escape focus return`);

      const minMapTarget = await page.locator(".map-spot").first().evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return Math.min(rect.width, rect.height);
      });
      check(minMapTarget >= 44, `${label}: map target below 44px`);
      const transition = await page.locator(".primary-link").evaluate((node) => getComputedStyle(node).transitionDuration);
      check(transition.split(",").every((value) => parseFloat(value) === 0), `${label}: reduced motion`);
      await page.screenshot({ path: path.join(evidenceDir, `${label}-full.png`), fullPage: true });
      await ctx.close();
    }
  }

  const failCtx = await makeContext({ width: 390, height: 844 });
  const failPage = await failCtx.newPage();
  await failPage.goto(`${baseUrl}?failure=projection`, { waitUntil: "networkidle" });
  await failPage.waitForFunction(() => document.documentElement.dataset.receiverReady === "true");
  const failed = await failPage.evaluate(() => window.VC_READINESS_SEMANTICS);
  check(failed.mode === "fail-closed", "projection failure mode");
  check(failed.destinations.length === 17, "projection failure route count");
  for (const destination of failed.destinations) {
    check(destination.state === "unavailable", `${destination.destinationId}: fail-closed state`);
    check(destination.summary === "Open the named route only to check its current page.",
      `${destination.destinationId}: fail-closed generic summary`);
    check(destination.completionClaim === false, `${destination.destinationId}: fail-closed completion claim`);
  }
  await failPage.locator("#destinationSelect").selectOption("fairy-godmother");
  check((await failPage.locator("#destinationState").textContent()).toLowerCase().includes("unavailable"),
    "projection failure visible state");
  check((await failPage.locator("#destinationLimit").innerText()).includes("navigation, not completion"),
    "projection failure visible completion boundary");
  check(await failPage.locator("#destinationEnter").getAttribute("href") === "/games/fairy-godmother.html",
    "projection failure canonical route");
  await failPage.screenshot({ path: path.join(evidenceDir, "failure-projection-mobile-390.png"), fullPage: true });
  await failCtx.close();

  for (const failure of ["map", "directory", "storage"]) {
    const ctx = await makeContext({ width: 390, height: 844 });
    const page = await ctx.newPage();
    await page.goto(`${baseUrl}?failure=${failure}`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.documentElement.dataset.receiverReady === "true");
    if (failure === "map") {
      check(await page.locator("#mapSurface").isHidden(), "map failure surface");
      check(await page.locator("#destinationSelect").isEnabled(), "map failure select");
    } else if (failure === "directory") {
      check(await page.locator("#destinationSelect").isDisabled(), "directory failure select");
      check(await page.locator("#staticDirectory [data-static-id]").count() === 17, "directory failure fallback");
    } else {
      check((await page.locator("#tourBoundary").innerText()).includes("cannot be saved"), "storage boundary");
      check(await page.locator("#destinationSelect").isEnabled(), "storage failure select");
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const result = {
  testedAt: new Date().toISOString(),
  command: "node operations/design-explorations/visitors-centre-building-championship-20260726/test-functional-candidate-v3.mjs",
  candidate: rel,
  hashes: {
    candidateSha256: sha256(fs.readFileSync(path.join(siteRoot, rel))),
    adapterSha256: sha256(fs.readFileSync(adapterPath)),
    fixtureSha256: sha256(fs.readFileSync(fixturePath)),
    admittedBaseSha256: fixture.provenance.admittedBaseSha256
  },
  playwrightCore: JSON.parse(fs.readFileSync(path.join(playwrightRoot, "package.json"), "utf8")).version,
  checks,
  failures,
  observedScope: [
    "real visitorCentreSemanticReceiver output parity for fresh and fail-closed receipts",
    "exact admitted v2 base hash",
    "17 semantic routes with completionClaim=false",
    "first-time, returning-without-Card, device-local Card and unavailable account-backed Card fixtures",
    "desktop 1440, mobile 390 and mobile 320",
    "five-part arrival grammar, map/select/static directory, focus and Escape return",
    "no-JS, projection, map, enhanced-directory and storage recovery",
    "navigation-only and receiving-product authority boundaries"
  ],
  limitations: [
    "Platform data is an explicitly synthetic local contract fixture, not owner readiness or public truth.",
    "Headless Chrome does not prove native Safari, VoiceOver, human comprehension or owner visual approval.",
    "This isolated candidate is not integrated, deployed or publicly verified."
  ]
};
fs.writeFileSync(path.join(evidenceDir, "test-result.json"), `${JSON.stringify(result, null, 2)}\n`);
if (failures.length) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(result, null, 2));
