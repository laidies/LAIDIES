#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.MAIKEOVER_CLOSET_PARITY_ROOT || process.cwd());
const maker = fs.readFileSync(path.join(root, "maikeover.html"), "utf8");
let closet = fs.readFileSync(path.join(root, "laidies-card.html"), "utf8");
const contract = fs.readFileSync(
  path.join(root, "content/site/resident-card-contract-v1.js"),
  "utf8"
);
const sharedView = fs.readFileSync(
  path.join(root, "content", "resident-card-shared-view.css"),
  "utf8"
);
const failures = [];
const calibrating = process.env.MAIKEOVER_CLOSET_PARITY_CALIBRATE === "1";

if (calibrating) {
  // Simulate the former Closet-only Card: carrying no longer renders from the
  // shared envelope. The test must reject this before the normal pass matters.
  closet = closet.replace('id="cardCarry"', 'id="cardCarryLegacy"');
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

const sharedFields = [
  ["displayName", "display_name", "moName"],
  ["movie", "favorite_movie", "cardMovie"],
  ["tvshow", "favorite_tvshow", "cardTv"],
  ["song", "favorite_song", "cardSong"],
  ["saint", "favorite_saint", "cardSaint"],
  ["carry", "card_carry", "cardCarry"],
  ["cardAvatarUrl", "card_avatar_url", "moAvatar"],
  ["cardBg", "card_bg", "moCard"]
];

check(
  maker.includes("LAIDIESResidentCard.buildEnvelope(candidateFields)"),
  "MAiKEOVER does not save through the shared Resident Card envelope"
);
check(
  closet.includes("data-closet-shared-card") &&
    closet.includes("MAiKEOVER owns the Card schema"),
  "Closet does not declare the MAiKEOVER-owned Card surface"
);
check(
  closet.includes("contract.read(localStorage)") &&
    closet.includes("contract.replaceWithSafeImage"),
  "Closet does not read and render the saved Card through the shared contract"
);

for (const [envelopeField, closetField, nodeId] of sharedFields) {
  check(
    maker.includes(`${envelopeField}:`) &&
      closet.includes(`${closetField}: card && card.${envelopeField} || undefined`),
    `shared field ${envelopeField} is not projected from MAiKEOVER into Closet`
  );
  check(
    closet.includes(`id="${nodeId}"`),
    `Closet has no display node for shared field ${envelopeField}`
  );
}

for (const label of ["Era movie ·", "Era TV ·", "Song ·", "Patron Saint ·", "Carrying ·"]) {
  check(closet.includes(label), `Closet Card is missing the MAiKEOVER label ${label}`);
}

const cardStart = closet.indexOf('data-closet-shared-card');
const cardEnd = closet.indexOf('</div>\n\n    <div class="card-actions"', cardStart);
const cardMarkup = cardStart >= 0 && cardEnd > cardStart ? closet.slice(cardStart, cardEnd) : "";
for (const retiredId of [
  "cardActivity", "cardArchetype", "cardEpisode", "cardStorefront",
  "cardCharacter", "cardCocktail", "cardMotto", "cardQuote"
]) {
  check(!cardMarkup.includes(retiredId), `Closet Card still invents legacy-only field ${retiredId}`);
}

check(
  closet.includes("card.style.background = bg") &&
    closet.includes("card.dataset.finish = finish"),
  "Closet does not apply the saved MAiKEOVER background to the shared Card shell"
);
check(
  closet.includes('href="/content/maikeover-v2.css?v=20260902-card-text-fit-1"') &&
    closet.includes('href="/content/resident-card-shared-view.css?v=20260912-closet-parity-1"') &&
    closet.includes('class="resident-card-shared-view"') &&
    closet.includes('class="mo-mirror-mount"'),
  "Closet does not reuse the rendered MAiKEOVER Card shell"
);
check(
  !closet.includes("maikeover-vanity-resident-card-candidate-v5.png"),
  "Closet imports the rejected MAiKEOVER v5 vanity raster"
);
check(
  sharedView.includes("candidate-v6.png") &&
    sharedView.includes("54.6% 45.9% / 266.24% 270.4%") &&
    !sharedView.includes("candidate-v5.png"),
  "shared standalone Card view does not use the approved v6 Card crop"
);
check(
  closet.includes('id="moHandle"') &&
    closet.includes("LAIDIESResidentCard.readHandle(localStorage)"),
  "Closet does not render the same saved draft handle as MAiKEOVER"
);
check(
  contract.includes('var CARD_KEY = "laidies_resident_card_v1"') &&
    contract.includes("cardAvatarUrl") && contract.includes("cardBg"),
  "the versioned Resident Card contract no longer contains the shared visual fields"
);
check(
  closet.includes("function residentNumberText(value)") &&
    closet.includes(": 'No. NEW';"),
  "Closet does not preserve the shared device-only No. NEW rule"
);

async function checkRenderedParity() {
  const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
  const origin = process.env.MAIKEOVER_CLOSET_PARITY_ORIGIN;
  if (!playwrightRoot || !origin) return;
  const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const fixture = {
    version: 1,
    fields: {
      displayName: "Parity Ali", cardBg: "gettingready",
      cardAvatarUrl: "/assets/town-characters/avatars/fairy-godmother-avatar-v1.png",
      movie: "Clueless", tvshow: "Daria",
      song: "On Wednesdays We Do AI — The Regressions", saint: "dolly-parton", carry: "Mood ring"
    }
  };
  await context.addInitScript((card) => {
    localStorage.setItem("laidies_resident_card_v1", JSON.stringify(card));
    localStorage.setItem("laidies_card_username", "parity_ali");
  }, fixture);
  async function readPage(route, selectors) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    await page.goto(`${origin}/${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector("#moName")?.textContent === "Parity Ali");
    const result = await page.evaluate((selected) => {
      const values = Object.fromEntries(Object.entries(selected).map(([name, id]) => [name, document.getElementById(id)?.textContent]));
      const card = document.getElementById("moCard");
      return {
        values,
        avatar: document.querySelector("#moAvatar img")?.getAttribute("src"),
        finish: card?.dataset.finish,
        background: getComputedStyle(card, "::before").backgroundImage,
        ratio: card ? card.getBoundingClientRect().width / card.getBoundingClientRect().height : 0,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        legacy: Boolean(document.querySelector("#cardActivity,#cardArchetype,#cardEpisode,#cardStorefront,#cardCharacter,#cardCocktail,#cardMotto,#cardQuote"))
      };
    }, selectors);
    await page.close();
    return { result, errors };
  }
  try {
    const maker = await readPage("maikeover.html", { displayName: "moName", handle: "moHandle", movie: "moMovie", tvshow: "moTv", song: "moSong", saint: "moSaint", carry: "moCarry", number: "moResidentNo" });
    const closetRender = await readPage("laidies-card.html", { displayName: "moName", handle: "moHandle", movie: "cardMovie", tvshow: "cardTv", song: "cardSong", saint: "cardSaint", carry: "cardCarry", number: "residentNo" });
    check(JSON.stringify(maker.result.values) === JSON.stringify(closetRender.result.values), "rendered MAiKEOVER and Closet fields differ");
    check(maker.result.avatar === closetRender.result.avatar, "rendered MAiKEOVER and Closet portraits differ");
    check(maker.result.finish === closetRender.result.finish && maker.result.background === closetRender.result.background, "rendered MAiKEOVER and Closet Card finishes differ");
    check(Math.abs(maker.result.ratio - closetRender.result.ratio) < 0.001, "Closet does not retain the MAiKEOVER landscape Card shell ratio");
    check(!closetRender.result.legacy && closetRender.result.overflow === 0, "Closet renders a legacy Card field or introduces desktop overflow");
    check(maker.errors.length === 0 && closetRender.errors.length === 0, "rendered parity pages emitted a page error");
  } finally {
    await context.close();
    await browser.close();
  }
}

async function checkAllFinishSurfaceParity() {
  const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
  const origin = process.env.MAIKEOVER_CLOSET_PARITY_ORIGIN;
  if (!playwrightRoot || !origin) return;
  const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
  const finishes = ["classic", "pinklilac", "peach", "mint", "lavender", "holo", "gettingready", "skates", "boombox", "computer"];
  try {
    for (const width of [1280, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const maker = await context.newPage();
      const closetPage = await context.newPage();
      await Promise.all([
        maker.goto(`${origin}/maikeover.html`, { waitUntil: "domcontentloaded" }),
        closetPage.goto(`${origin}/laidies-card.html`, { waitUntil: "domcontentloaded" })
      ]);
      for (const finish of finishes) {
        const card = { version: 1, fields: { displayName: "Parity Ali", cardBg: finish, cardAvatarUrl: "/assets/town-characters/avatars/fairy-godmother-avatar-v1.png", movie: "Clueless", tvshow: "Daria", song: "On Wednesdays We Do AI — The Regressions", saint: "dolly-parton", carry: "Mood ring" } };
        await maker.evaluate((stored) => {
          localStorage.setItem("laidies_resident_card_v1", JSON.stringify(stored));
          localStorage.setItem("laidies_card_username", "parity_ali");
        }, card);
        await Promise.all([maker.reload({ waitUntil: "domcontentloaded" }), closetPage.reload({ waitUntil: "domcontentloaded" })]);
        await Promise.all([
          maker.waitForFunction(() => document.querySelector("#moName")?.textContent === "Parity Ali"),
          closetPage.waitForFunction(() => document.querySelector("#moName")?.textContent === "Parity Ali")
        ]);
        const [makerResult, closetResult] = await Promise.all([maker.evaluate(() => {
          const card = document.getElementById("moCard");
          const before = getComputedStyle(card, "::before");
          const style = getComputedStyle(card);
          return { values:["moName","moHandle","moMovie","moTv","moSong","moSaint","moCarry","moResidentNo"].map((id) => document.getElementById(id)?.textContent), avatar:document.querySelector("#moAvatar img")?.getAttribute("src"), finish:card?.dataset.finish, surface:[style.backgroundImage,style.backgroundColor,style.backgroundSize,style.backgroundPosition,before.backgroundImage,before.backgroundColor,before.backgroundSize,before.backgroundPosition,before.opacity,before.mixBlendMode] };
        }), closetPage.evaluate(() => {
          const card = document.getElementById("moCard");
          const before = getComputedStyle(card, "::before");
          const style = getComputedStyle(card);
          const rows = [...document.querySelectorAll("#cardFacts > div")];
          const cardBox = card.getBoundingClientRect();
          return { values:["moName","moHandle","cardMovie","cardTv","cardSong","cardSaint","cardCarry","residentNo"].map((id) => document.getElementById(id)?.textContent), avatar:document.querySelector("#moAvatar img")?.getAttribute("src"), finish:card?.dataset.finish, surface:[style.backgroundImage,style.backgroundColor,style.backgroundSize,style.backgroundPosition,before.backgroundImage,before.backgroundColor,before.backgroundSize,before.backgroundPosition,before.opacity,before.mixBlendMode], minFont:Math.min(...rows.map((row) => parseFloat(getComputedStyle(row).fontSize))), contained:rows.every((row) => { const box=row.getBoundingClientRect(); return box.left >= cardBox.left && box.right <= cardBox.right && box.top >= cardBox.top && box.bottom <= cardBox.bottom; }), pageOverflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 };
        })]);
        check(makerResult.finish === finish && closetResult.finish === finish, `Card finish diverges for ${finish} at ${width}px`);
        check(JSON.stringify(makerResult.values) === JSON.stringify(closetResult.values), `MAiKEOVER/Closet field parity fails for ${finish} at ${width}px`);
        check(makerResult.avatar === closetResult.avatar, `MAiKEOVER/Closet portrait parity fails for ${finish} at ${width}px`);
        check(JSON.stringify(makerResult.surface) === JSON.stringify(closetResult.surface), `MAiKEOVER/Closet surface or pseudo-layer differs for ${finish} at ${width}px`);
        check(closetResult.minFont >= 12 && closetResult.contained, `Closet Card fields are too small or escape the Card for ${finish} at ${width}px`);
        check(!closetResult.pageOverflow, `Closet overflows the page for ${finish} at ${width}px`);
        if (width === 390 && (finish === "classic" || finish === "boombox")) {
          await maker.locator("#moCard").screenshot({ path: `/private/tmp/maikeover-closet-parity-390-maker-${finish}.png` });
          await closetPage.locator("#moCard").screenshot({ path: `/private/tmp/maikeover-closet-parity-390-closet-${finish}.png` });
        }
      }
      await maker.close();
      await closetPage.close();
      await context.close();
    }
  } finally { await browser.close(); }
}

if (calibrating) {
  if (!failures.some((failure) => failure.includes("carry"))) {
    console.error("MAiKEOVER/CLOSET PARITY CALIBRATION FAIL");
    console.error("- deliberately removed carrying field was not rejected");
    process.exit(1);
  }
  console.log("MAiKEOVER/CLOSET PARITY CALIBRATION PASS");
  console.log("- deliberately removed carrying field was rejected");
  process.exit(0);
}

await checkRenderedParity();
await checkAllFinishSurfaceParity();

if (failures.length) {
  console.error("MAiKEOVER/CLOSET PARITY FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("MAiKEOVER/CLOSET PARITY PASS");
console.log("- one saved envelope drives the same portrait, background, name, era movie, era TV, song, Patron Saint and carrying fields");
console.log("- Closet-only legacy Card fields are absent from the rendered Card");
