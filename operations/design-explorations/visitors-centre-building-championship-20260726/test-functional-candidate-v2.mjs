#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const siteRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const rel = "operations/design-explorations/visitors-centre-building-championship-20260726/functional-candidate-v2/index.html";
const evidenceDir = path.join(siteRoot, path.dirname(rel), "evidence");
const playwrightRoot = path.join(siteRoot, ".ds-sync/node_modules/playwright-core");
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
fs.mkdirSync(evidenceDir, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"], [".webp", "image/webp"], [".svg", "image/svg+xml"]
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const targetRel = url.pathname === "/" ? rel : url.pathname.replace(/^\/+/, "");
  const target = path.resolve(siteRoot, targetRel);
  if (!target.startsWith(`${siteRoot}${path.sep}`) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {"content-type": mime.get(path.extname(target).toLowerCase()) || "application/octet-stream"});
  fs.createReadStream(target).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const baseUrl = `${origin}/${rel}`;
const browser = await chromium.launch({executablePath: chromePath, headless: true});
const failures = [];
let checks = 0;
const check = (condition, message) => { checks += 1; if (!condition) failures.push(message); };

async function context(viewport, javaScriptEnabled = true) {
  return browser.newContext({viewport, javaScriptEnabled, reducedMotion: "reduce"});
}

try {
  const provenanceContext = await context({width: 1200, height: 900});
  const provenancePage = await provenanceContext.newPage();
  await provenancePage.goto(baseUrl, {waitUntil: "networkidle"});
  const candidateContracts = await provenancePage.evaluate(() => window.VC_FUNCTIONAL_DESTINATIONS);
  const sourcePage = await provenanceContext.newPage();
  await sourcePage.goto(`${origin}/visitors-centre.html`, {waitUntil: "networkidle"});
  const sourceContracts = await sourcePage.locator("[data-vc-id]").evaluateAll((links) => links.map((link) => ({
    id: link.getAttribute("data-vc-id"),
    name: link.textContent.trim(),
    href: link.getAttribute("href"),
    state: link.getAttribute("data-vc-state"),
    summary: link.getAttribute("data-vc-summary"),
    limit: link.getAttribute("data-vc-limitation")
  })));
  const sharedDirectory = await sourcePage.evaluate(() => (window.SV_BUILDINGS || []).map((item) => ({
    id: item.id, name: item.name, href: item.href
  })));
  check(candidateContracts.length === 17, "candidate provenance inventory is not 17");
  check(sourceContracts.length === 17, "production Centre contract inventory is not 17");
  check(sharedDirectory.length === 17, "shared directory inventory is not 17");
  for (let index = 0; index < 17; index += 1) {
    const candidate = candidateContracts[index];
    const source = sourceContracts[index];
    const shared = sharedDirectory[index];
    check(candidate.id === source.id && candidate.id === shared.id, `provenance ${index + 1}: id mismatch`);
    check(candidate.name === source.name && candidate.name === shared.name, `provenance ${candidate.id}: name mismatch`);
    check(candidate.href === source.href && candidate.href === shared.href, `provenance ${candidate.id}: route mismatch`);
    check(candidate.state === source.state, `provenance ${candidate.id}: state mismatch`);
    check(candidate.summary === source.summary, `provenance ${candidate.id}: summary mismatch`);
    check(candidate.limit === source.limit, `provenance ${candidate.id}: limitation mismatch`);
  }
  await provenanceContext.close();

  for (const viewport of [{width: 1440, height: 1000}, {width: 390, height: 844}, {width: 320, height: 700}]) {
    const noJsContext = await context(viewport, false);
    const page = await noJsContext.newPage();
    await page.goto(baseUrl, {waitUntil: "domcontentloaded"});
    check(await page.locator("[data-static-id]").count() === 17, `${viewport.width}: no-JS directory is not complete`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${viewport.width}: no-JS horizontal overflow`);
    await noJsContext.close();
  }

  const stateExpectations = {
    "first-time": ["First-time visitor", "does not inspect or create identity"],
    "returning-no-card": ["Returning visitor · no Resident Card", "does not prove a Card"],
    "card-local": ["Resident Card · device-local scope", "does not mean signed in"],
    "card-account": ["verified-account scope unavailable", "No name, ownership"]
  };
  const viewports = [
    {name: "desktop-1440", value: {width: 1440, height: 1000}},
    {name: "mobile-390", value: {width: 390, height: 844}},
    {name: "mobile-320", value: {width: 320, height: 700}}
  ];

  for (const [visitor, expected] of Object.entries(stateExpectations)) {
    for (const viewport of viewports) {
      const ctx = await context(viewport.value);
      const page = await ctx.newPage();
      await page.goto(`${baseUrl}?visitor=${visitor}`, {waitUntil: "networkidle"});
      const label = `${viewport.name}-${visitor}`;
      check((await page.locator("#visitorStateTitle").innerText()).includes(expected[0]), `${label}: state title`);
      check((await page.locator("#visitorState").innerText()).includes(expected[1]), `${label}: state boundary`);
      check(await page.locator("#visitorState").getAttribute("data-synthetic") === "true", `${label}: fixture not disclosed`);
      check(await page.locator("#destinationSelect option").count() === 18, `${label}: select lacks 17 destinations`);
      check(await page.locator("[data-static-id]").count() === 17, `${label}: fallback lacks 17 destinations`);
      check(await page.locator(".map-spot").count() === 17, `${label}: map lacks 17 destinations`);
      check(await page.locator("#townMap").getAttribute("src") === "/assets/final_map/sunnyvaile-town-map-final-v5.webp",
        `${label}: wrong map source`);
      check(await page.locator("#destinationDetail").isHidden(), `${label}: invented initial selection`);
      check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
        `${label}: horizontal overflow`);
      check((await page.locator(".boundary").innerText()).includes("navigation only"), `${label}: completion boundary missing`);
      check((await page.locator(".handoffs").innerText()).includes("does not claim playback"), `${label}: trailer boundary missing`);
      check((await page.locator(".handoffs").innerText()).includes("does not claim preparation"), `${label}: postcard boundary missing`);

      await page.locator("#destinationSelect").selectOption("fairy-godmother");
      check(await page.locator("#destinationDetail").isVisible(), `${label}: held reveal missing`);
      check(await page.locator("#destinationState").getAttribute("data-state") === "held", `${label}: held state absent`);
      check((await page.locator("#destinationLimit").innerText()).includes("not approved for promotion"), `${label}: limitation absent`);
      check(await page.locator("#destinationEnter").getAttribute("href") === "/games/fairy-godmother.html", `${label}: route mismatch`);
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
      check(transition.split(",").every((value) => parseFloat(value) === 0), `${label}: reduced-motion transition remains`);
      await page.screenshot({path: path.join(evidenceDir, `${label}-full.png`), fullPage: true});
      await ctx.close();
    }
  }

  for (const failure of ["map", "directory", "storage", "missing-contract"]) {
    const ctx = await context({width: 390, height: 844});
    const page = await ctx.newPage();
    await page.goto(`${baseUrl}?failure=${failure}`, {waitUntil: "networkidle"});
    if (failure === "map") {
      check(await page.locator("#mapSurface").isHidden(), "map failure does not hide broken surface");
      check((await page.locator("#mapStatus").innerText()).includes("17 destinations"), "map recovery copy missing");
      check(await page.locator("#destinationSelect").isEnabled(), "map failure disables named route");
    }
    if (failure === "directory") {
      check(await page.locator("#destinationSelect").isDisabled(), "directory failure leaves enhanced select enabled");
      check(await page.locator("#staticDirectory").isVisible(), "directory failure hides static fallback");
      check(await page.locator("#staticDirectory [data-static-id]").count() === 17, "directory failure fallback incomplete");
    }
    if (failure === "storage") {
      check((await page.locator("#tourBoundary").innerText()).includes("cannot be saved"), "storage boundary missing");
      check(await page.locator("#tourHandoff").getAttribute("aria-disabled") === "true", "storage failure tour not disabled");
      check(await page.locator("#destinationSelect").isEnabled(), "storage failure blocks directory");
    }
    if (failure === "missing-contract") {
      await page.locator("#destinationSelect").selectOption("fairy-godmother");
      check((await page.locator("#destinationState").innerText()).toLowerCase().includes("details unavailable"), "missing contract not held");
      check((await page.locator("#destinationLimit").innerText()).includes("navigation, not readiness"), "missing contract boundary absent");
      check(await page.locator("#destinationEnter").getAttribute("href") === "/games/fairy-godmother.html", "missing contract route lost");
    }
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${failure}: horizontal overflow`);
    await page.screenshot({path: path.join(evidenceDir, `failure-${failure}-mobile-390.png`), fullPage: true});
    await ctx.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const indexPath = path.join(siteRoot, rel);
const result = {
  testedAt: new Date().toISOString(),
  command: "node operations/design-explorations/visitors-centre-building-championship-20260726/test-functional-candidate-v2.mjs",
  candidate: rel,
  candidateSha256: (await import("node:crypto")).createHash("sha256").update(fs.readFileSync(indexPath)).digest("hex"),
  playwrightCore: JSON.parse(fs.readFileSync(path.join(playwrightRoot, "package.json"), "utf8")).version,
  checks,
  failures,
  observedScope: [
    "first-time, returning-without-Card, device-local Card and unavailable account-backed Card fixtures",
    "desktop 1440, mobile 390 and mobile 320",
    "17 map/select/static routes, held destination reveal, focus and Escape return",
    "no-JS, map, enhanced-directory, storage and missing-contract recovery",
    "truthful tour, trailer, postcard and downstream-completion boundaries",
    "exact ID, name, route, state, summary and limitation parity with current Centre contracts plus shared directory ID/name/route parity"
  ],
  limitations: [
    "Synthetic fixture states do not prove real identity, Card, account or cross-device state.",
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
