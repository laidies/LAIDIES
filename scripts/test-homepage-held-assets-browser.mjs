#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) {
  console.error("Set PLAYWRIGHT_CORE_PATH to a playwright-core package directory.");
  process.exit(2);
}
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const source = fs.readFileSync(path.join(root, "index.html"), "utf8");
const homepageScriptSource = fs.readFileSync(path.join(root, "content/site/homepage.js"), "utf8");
const falsePublicPromises = [
  "The complete weekly experience",
  "a new episode and its learning activities arrive every Wednesday",
  "Blend & Snap · Try-On, guide and cards",
  "One signup. Your Card and the Postcard.",
  "Send me the Wednesday Postcard</strong> is already selected",
];
const requiredTruth = [
  "The weekly route &middot; Getting polished",
  "only components marked available",
  "Held pieces stay out of the route.",
  "Making a Resident Card does not subscribe you.",
];
const truthSource = process.env.CALIBRATE_HOMEPAGE_TRUTH_FAILURE === "1"
  ? `${source}\n${falsePublicPromises[0]}`
  : source;
const libraryNavigationSource = process.env.CALIBRATE_HOMEPAGE_LIBRARY_NAV_FAILURE === "1"
  ? source.replaceAll('data-library-entry="primary" href="/library.html"', 'data-library-entry="primary" href="#reference"')
  : source;
const accountEntrySource = process.env.CALIBRATE_HOMEPAGE_ACCOUNT_PROMISE_FAILURE === "1"
  ? source.replace(
    '<a class="button b-pink" href="/resident-card.html#rcAccountTitle">Sign in</a>',
    '<a class="button b-pink" href="/resident-card.html#rcAccountTitle">Pick up where I left off</a>'
  )
  : source;
const visitorOrientationSource = process.env.CALIBRATE_HOMEPAGE_TRAILER_PROMISE_FAILURE === "1"
  ? source.replace(
    "Visit the Visitor’s Centre &rarr;",
    "Listen to the trailer at the Visitor’s Centre &rarr;"
  )
  : source;
const postcardReceiverSource = process.env.CALIBRATE_HOMEPAGE_POSTCARD_RECEIVER_FAILURE === "1"
  ? source.replace(
    "Request the Wednesday Postcard</a>",
    "Choose the Postcard</a>"
  )
  : source;
const receiverIndexSource = process.env.CALIBRATE_HOMEPAGE_BWS_RECEIVER_FAILURE === "1"
  ? source.replace("location.href='/games/businesswomens-special.html'", "location.href='/bronze-aige.html'")
  : process.env.CALIBRATE_HOMEPAGE_ACTIVITY_RECEIVER_FAILURE === "1"
    ? source.replace("location.href='/games/dream-phone.html'", "location.href='#activities'")
  : source;
const servedIndexSource = process.env.CALIBRATE_HOMEPAGE_MAP_GEOMETRY_FAILURE === "1"
  ? receiverIndexSource
    .replace(".map-wrap{position:relative;aspect-ratio:1400/637}\n.map-wrap>img{width:100%;height:100%;object-fit:contain;display:block}", ".map-wrap{position:relative}")
    .replace(".map-spot{position:absolute;min-width:44px;min-height:44px", ".map-spot{position:absolute")
  : receiverIndexSource;
const servedHomepageScript = process.env.CALIBRATE_HOMEPAGE_MAP_FOCUS_FAILURE === "1"
  ? homepageScriptSource.replace("        a.focus();", "        /* deliberate calibration: focus is not moved */")
  : homepageScriptSource;
const targets = [
  "/assets/bws-fortune-teller/frame-1-closed.webp",
  "/assets/games/girl-talk/truth-card-face.webp",
  "/assets/games/girl-talk/dare-card-face.webp",
  "/assets/mavens/y2k-stained-glass-v3-finished/ada-lovelace-y2k-stained-glass.png",
  "/assets/postcards/from-sunnyvaile/pc-chick-flicks.webp",
  "/assets/postcards/from-sunnyvaile/pc-dial-up.webp",
  "/assets/postcards/from-sunnyvaile/pc-puffy-binder.webp",
  "/assets/town-characters/scenes/mme-claio-scene.webp",
  "/assets/library/jeeves-scene.webp"
  ,"/assets/sunnyvaile-buildings/web/02-sunnyvaile-newsstand.jpg",
  "/assets/town-characters/scenes/dj-sunnyv-scene.webp"
];
const recoveredHomepage = [
  ["dream-phone", "/assets/sunnyvaile-buildings/y2k-v3/17-dream-phone-booth.webp"],
  ["luminairy-spot", "/assets/sunnyvaile-streets/lantern-hill-evening.webp"],
  ["civic-square", "/assets/sunnyvaile-streets/civic-square-midday.webp"],
  ["schoolhouse-road", "/assets/sunnyvaile-streets/schoolhouse-road-morning.webp"],
  ["lantern-hill", "/assets/sunnyvaile-streets/lantern-hill-evening.webp"]
];
const recoveredRoutes = [
  ["/luminairy.html", "/assets/building-interiors/luminairy-nave.jpg", ".luminairy-nave-held"],
  ["/radio.html", "/assets/building-interiors/ksvl-booth.jpg", ".ksvl-studio-held"],
  ["/maikeover.html", "/assets/building-interiors/maikeover-salon.jpg", ".mo-room-held"]
];
const held = [
  ["dial-up", "Dial-up postcard visual held"],
  ["ada", "Ada Lovelace portrait visual held"],
  ["chick-flicks", "Chick Flicks postcard visual held"],
  ["mme-claio", "Mme CLAi-O visual held"],
  ["bws", "Businesswomen’s Special visual held"],
  ["girl-talk-truth", "Girl Talk Truth visual held"],
  ["girl-talk-dare", "Girl Talk Dare visual held"],
  ["puffy-binder", "Puffy binder postcard visual held"],
  ["newsstand", "NewsStand visual held"],
];
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
if (process.env.CALIBRATE_VISUAL_FAILURE === "1") {
  failures.push("calibration: deliberate visual-coverage failure");
}
const visualSource = process.env.CALIBRATE_REJECTED_JEEVES_FAILURE === "1"
  ? `${source}\n<img src="/assets/library/jeeves-scene.webp" alt="calibration">`
  : source;
check(targets.every((asset) => !visualSource.includes(asset)), "a rejected or still-held source path remains in index.html");
check(recoveredHomepage.every(([, asset]) => source.includes(asset)), "a required recovered Homepage source path is missing");
check(source.includes('id="lookup"') && source.includes('Search the LIBRAiRY'), "Miss Jeeves search surface changed");
check((libraryNavigationSource.match(/data-library-entry="primary" href="\/library\.html">LIBRAiRY<\/a>/g) || []).length === 2 &&
  libraryNavigationSource.includes('data-library-entry="reference" href="/library.html">Visit the LIBRAiRY') &&
  libraryNavigationSource.includes('data-library-entry="directory" href="/library.html">The LIBRAiRY</a>'),
  "Homepage has no clearly labelled direct LIBRAiRY route in primary, mobile, reference and town-directory navigation");
check(falsePublicPromises.every((claim) => !truthSource.includes(claim)), "Homepage still promises held weekly or subscription behavior");
check(requiredTruth.every((claim) => source.includes(claim)), "Homepage no longer states the exact weekly and subscription truth");
check(accountEntrySource.includes('<a class="button b-pink" href="/resident-card.html#rcAccountTitle">Sign in</a>') &&
  !accountEntrySource.includes('<a class="button b-pink" href="/resident-card.html#rcAccountTitle">Pick up where I left off</a>'),
  "Homepage promises account-backed continuation before the visitor has signed in");
check(visitorOrientationSource.includes('<a class="text-link" href="/visitors-centre.html">Visit the Visitor’s Centre &rarr;</a>') &&
  visitorOrientationSource.includes('<a class="inline-link" href="/visitors-centre.html">the Visitor’s Centre</a>') &&
  visitorOrientationSource.includes('<li><a href="/visitors-centre.html">The Visitor’s Centre</a></li>') &&
  visitorOrientationSource.includes("New to LAiDIES? Start at the Visitor’s Centre to get oriented.") &&
  !/trailer/i.test(visitorOrientationSource),
  "Homepage promises the held trailer instead of routing to the Visitor’s Centre orientation");
check(postcardReceiverSource.includes('<a class="button b-lilac" href="/post-office.html#rent">Request the Wednesday Postcard</a>') &&
  !postcardReceiverSource.includes('href="/post-office.html#rent">Choose the Postcard</a>'),
  "Homepage claims postcard selection where the receiver only opens the Wednesday Postcard request counter");

const mime = new Map([[".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".css", "text/css; charset=utf-8"], [".webp", "image/webp"], [".png", "image/png"], [".jpg", "image/jpeg"], [".svg", "image/svg+xml"], [".mp3", "audio/mpeg"]]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const resolved = path.resolve(root, requested.replace(/^\/+/, ""));
  if (!resolved.startsWith(`${root}${path.sep}`)) return response.writeHead(403).end("Forbidden");
  if (requested === "/index.html") {
    return response.writeHead(200, {"content-type":"text/html; charset=utf-8"}).end(servedIndexSource);
  }
  if (requested === "/content/site/homepage.js") {
    return response.writeHead(200, {"content-type":"text/javascript; charset=utf-8"}).end(servedHomepageScript);
  }
  fs.readFile(resolved, (error, data) => {
    if (error) response.writeHead(404).end("Not found");
    else response.writeHead(200, {"content-type": mime.get(path.extname(resolved)) || "application/octet-stream"}).end(data);
  });
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({executablePath: chrome, headless: true});

try {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({viewport:{width, height:900}});
    const page = await context.newPage();
    const requests = [];
    page.on("request", (request) => requests.push(request.url()));
    page.on("pageerror", (error) => failures.push(`${width}px page error: ${error.message}`));
    await page.goto(`${origin}/index.html`, {waitUntil:"domcontentloaded"});
    await page.waitForSelector("[data-home-held='dial-up']");
    check(await page.locator("[data-asset-status='held'][data-home-held]").count() === 9,
      `${width}px does not render exactly nine held panels`);
    for (const [id, label] of held) {
      const panel = page.locator(`[data-home-held="${id}"]`);
      check(await panel.count() === 1 && (await panel.textContent()).includes(label),
        `${width}px held panel is missing or unclear: ${id}`);
      check(await panel.locator("img").count() === 0, `${width}px held panel still contains an image: ${id}`);
    }
    for (const [id, asset] of recoveredHomepage) {
      check(await page.locator(`[data-home-held="${id}"]`).count() === 0,
        `${width}px recovered image still has a held panel: ${id}`);
      const image = page.locator(`img[src="${asset}"]`).first();
      check(await image.count() === 1, `${width}px recovered image is missing: ${id}`);
      if (await image.count()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((node) => node.decode ? node.decode().catch(() => {}) : Promise.resolve());
        check(await image.evaluate((node) => node.complete && node.naturalWidth > 0 && node.naturalHeight > 0),
          `${width}px recovered image did not decode: ${id}`);
      }
    }
    check(await page.locator('img[src="/assets/library/jeeves-scene.webp"]').count() === 0,
      `${width}px rejected Miss Jeeves image returned`);
    check(await page.locator("#lookup").count() === 1 && await page.getByRole("button", {name:"Search the LIBRAiRY"}).count() === 1,
      `${width}px Miss Jeeves lookup controls are missing`);
    check(await page.locator('header nav a[data-library-entry="primary"][href="/library.html"]').filter({hasText:"LIBRAiRY"}).count() === 1 &&
      await page.locator('#mobile-nav a[data-library-entry="primary"][href="/library.html"]').filter({hasText:"LIBRAiRY"}).count() === 1 &&
      await page.locator('#reference a[data-library-entry="reference"][href="/library.html"]').filter({hasText:"Visit the LIBRAiRY"}).count() === 1 &&
      await page.locator('.town-index a[data-library-entry="directory"][href="/library.html"]').filter({hasText:"The LIBRAiRY"}).count() === 1,
      `${width}px Homepage does not expose every clearly labelled direct LIBRAiRY route`);
    if (width <= 820) {
      const menu = page.getByRole("button", {name:"Menu"});
      await menu.click();
      check(await page.locator('#mobile-nav a[data-library-entry="primary"][href="/library.html"]').isVisible(),
        `${width}px mobile Menu does not reveal the direct LIBRAiRY route`);
      await page.keyboard.press("Escape");
    }
    check(await page.locator("#new-here").count() === 1 &&
      await page.locator('#new-here a[href="/issues/issue-04.html"]').count() >= 1 &&
      await page.locator('#new-here a[href="/watch.html?ep=04"]').count() === 1,
      `${width}px Chick Flicks episode actions changed`);
    check(await page.locator('.hero a.b-pink[href="/resident-card.html#rcAccountTitle"]').filter({hasText:"Sign in"}).count() === 1,
      `${width}px Homepage account entry overpromises continuation before sign-in`);
    const businesswomensAction = page.getByRole("button", {name:"Visit the Businesswomen’s Special"});
    const fairyAction = page.getByRole("button", {name:"Ask the FAiRY Godmother"});
    const claioAction = page.getByRole("button", {name:"Consult Mme CLAi-O"});
    const dreamAction = page.getByRole("button", {name:"Answer Dream Phone"});
    const deltaAction = page.getByRole("button", {name:"Visit Delta LAi Nu"});
    check(await fairyAction.getAttribute("onclick") === "location.href='/games/fairy-godmother.html'" &&
      await claioAction.getAttribute("onclick") === "location.href='/games/madame-claio.html'" &&
      await businesswomensAction.count() === 1 &&
      await businesswomensAction.getAttribute("onclick") === "location.href='/games/businesswomens-special.html'" &&
      await dreamAction.getAttribute("onclick") === "location.href='/games/dream-phone.html'" &&
      await deltaAction.getAttribute("onclick") === "location.href='/sorority-house.html'",
      `${width}px activity action receiver changed`);
    const fun = page.getByRole("button", {name:"Make me laugh"});
    await fun.focus();
    await page.keyboard.press("Enter");
    check(await fun.evaluate((button) => button.classList.contains("active")), `${width}px keyboard did not activate the fun filter`);
    check(await page.locator('.activity-grid article[data-tags="fun decide quick"]').evaluate((card) => !card.hidden) &&
      await page.locator('.activity-grid article[data-tags="fun quick"]').evaluate((card) => !card.hidden) &&
      await page.locator('.activity-grid article[data-tags="fun"]').evaluate((card) => !card.hidden),
      `${width}px held activity cards lost their fun filter membership`);
    const libraryMapSpot = page.locator('.map-spot[data-name="The LIBRAiRY"]');
    await libraryMapSpot.scrollIntoViewIfNeeded();
    check(await libraryMapSpot.evaluate((spot) => {
      const rect = spot.getBoundingClientRect();
      return rect.width >= 44 && rect.height >= 44;
    }), `${width}px map destination is not a real 44px click target`);
    await libraryMapSpot.focus();
    await page.keyboard.press("Enter");
    const mapPopup = page.getByRole("dialog");
    check(await mapPopup.isVisible() && await libraryMapSpot.getAttribute("aria-expanded") === "true",
      `${width}px map popup did not open with an expanded trigger`);
    check(await page.evaluate(() => document.activeElement && document.activeElement.getAttribute("href") === "/library.html"),
      `${width}px map popup did not move focus to its destination link`);
    await page.keyboard.press("Escape");
    check(await mapPopup.isHidden() && await libraryMapSpot.getAttribute("aria-expanded") === "false" &&
      await libraryMapSpot.evaluate((spot) => document.activeElement === spot),
      `${width}px map popup did not close and restore focus on Escape`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)),
      `${width}px homepage overflows`);
    check(!requests.some((url) => targets.some((asset) => url.includes(asset))),
      `${width}px page requested a removed target asset`);
    await context.close();
  }
  for (const width of [1440, 390, 320]) {
    for (const [route, asset, formerHeldSelector] of recoveredRoutes) {
      const context = await browser.newContext({viewport:{width, height:900}});
      const page = await context.newPage();
      page.on("pageerror", (error) => failures.push(`${route} ${width}px page error: ${error.message}`));
      await page.goto(`${origin}${route}`, {waitUntil:"domcontentloaded"});
      check(await page.locator(formerHeldSelector).count() === 0,
        `${route} ${width}px still renders its former held panel`);
      const image = page.locator(`img[src*="${asset.replace(/^\//, "")}"]`).first();
      check(await image.count() === 1, `${route} ${width}px recovered image is missing`);
      if (await image.count()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((node) => node.decode ? node.decode().catch(() => {}) : Promise.resolve());
        check(await image.evaluate((node) => node.complete && node.naturalWidth > 0 && node.naturalHeight > 0),
          `${route} ${width}px recovered image did not decode`);
        check(await image.evaluate((node) => {
          const rect = node.getBoundingClientRect();
          return rect.width >= Math.min(300, window.innerWidth * 0.7) && rect.height >= 180;
        }), `${route} ${width}px recovered image is not materially visible`);
      }
      if (route === "/radio.html") {
        for (const selector of [".ksvl-studio__copy h1", ".ksvl-studio__motto", ".ksvl-studio .ksvl-hero-tunein"]) {
          check(await page.locator(selector).first().evaluate((node) => {
            const rect = node.getBoundingClientRect();
            return rect.left >= 0 && rect.right <= window.innerWidth && node.scrollWidth <= node.clientWidth + 1;
          }), `${route} ${width}px clips ${selector}`);
        }
      }
      if (route === "/luminairy.html") {
        check(await page.locator(".lum-state h2").evaluate((node) => node.scrollWidth <= node.clientWidth + 1),
          `${route} ${width}px clips the votive-state heading`);
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error(`HOMEPAGE HELD ASSETS BROWSER FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("PUBLIC HOMEPAGE TRUTH AND VISUAL ASSET BROWSER PASS homepage-held=9 homepage-recovered=5 route-recovered=3 viewports=1440,390,320 checks=weekly-truth,subscription-truth,library-navigation,activity-receivers,map-focus-return,rejected-source-absence,recovered-image-decode,material-visibility,jeeves-search-preservation,held-labels,actions,keyboard-filter,no-overflow,no-rejected-image-request");
