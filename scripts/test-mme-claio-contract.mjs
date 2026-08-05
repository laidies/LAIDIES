#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  extractProjection,
  runBuild,
  validateDeck
} from "./build-mme-claio-deck.mjs";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const page = read("games/madame-claio.html");
const css = read("content/madame-claio-v2.css");
const enhancement = read("content/site/madame-claio-v2.js");
const shared = read("script.js");
const handbook = read("handbook.html");
const redirect = read("games/cocktail-fortune.html");
const bws = read("games/businesswomens-special.html");
const spec = read("operations/product-stewards/mme-claio/OPERATING-SPEC.md");
const deck = JSON.parse(read("content/data/mme-claio-deck.json"));
const deckSchema = JSON.parse(read("content/data/mme-claio-deck.schema.json"));
const meritBadgeSetBody = shared.match(/const MERIT_BADGE_IDS = new Set\(\[([\s\S]*?)\]\);/)?.[1] || "";
const accountBadgeMergeBody = shared.match(/async function mergeSecretBadgesFromAccount\(userId\) \{([\s\S]*?)\n\}/)?.[1] || "";

for (const file of [
  "operations/product-stewards/mme-claio/CHARTER.md",
  "operations/product-stewards/mme-claio/OPERATING-SPEC.md",
  "operations/product-stewards/mme-claio/state.json",
  "operations/product-stewards/mme-claio/backlog.md"
]) {
  check(fs.existsSync(path.join(root, file)), `missing steward record: ${file}`);
}

let cardCount = 0;
try {
  validateDeck(deck, deckSchema, { root });
  cardCount = deck.cards.length;
} catch (error) {
  failures.push(error.message);
}
check(cardCount === 100, `expected unchanged 100-card deck, found ${cardCount}`);
try {
  check(JSON.stringify(extractProjection(page)) === JSON.stringify(deck), "canonical deck JSON and inline projection differ");
  runBuild({ root, checkOnly: true });
} catch (error) {
  failures.push(error.message);
}
check(/id="claioDeckData"/.test(page), "inline canonical deck projection is missing");
check(!/const fortuneCards=\[/.test(page), "hard-coded legacy deck remains in the page controller");
check(!/ART_ALIASES|function cardSlug\(/.test(page), "card art identity is still inferred or aliased at runtime");
check(/fortune\.art_slug/.test(page) && /canonical\.art_slug/.test(page), "explicit art_slug is not used for current and history art");
check(!/full 60-card deck/.test(page), "stale 60-card deck description remains");
check(/let deckAvailable = false/.test(page), "runtime deck does not begin fail closed");
check(/EXPECTED_DECK_SHA256 = '[a-f0-9]{64}'/.test(page), "runtime deck is not checksum bound");
check(/crypto\.subtle\.digest\('SHA-256', bytes\)/.test(page), "runtime deck does not verify exact inline bytes");
check(/actual !== EXPECTED_DECK_SHA256/.test(page), "runtime deck does not reject stale exact bytes");
check(/id="claioFortuneButton" disabled/.test(page) && /id="claioDeckHotspot"[^>]+disabled/.test(page), "draw controls are not disabled before exact deck admission");
check(!/id="fortuneButton"/.test(page), "Mme page still collides with the shared legacy fortune handler");
check(/function nextIndex\(length, prev\)/.test(page), "non-repeat selector is missing");
check(/findIndex\(card => card\.card === callHistory\[callHistory\.length - 1\]\.card\)/.test(page), "returning user does not restore the last-card exclusion");

check(/Every draw is one random authored card/.test(page), "random authored mechanic is not explicit");
check(/It is not tailored to\s+you, does not analyze or answer a question/.test(page), "non-tailored/no-analysis truth is missing");
check(/not a\s+prediction or professional advice/.test(page), "non-predictive/professional boundary is missing");
check(!/id="claioQuestion"/.test(page), "obsolete free-text question remains in the DOM");
check(!/<textarea\b/i.test(page), "Mme CLAi-O still collects arbitrary free text");
check(!/const BOUNDARIES|classifyBoundary|showBoundary/.test(page), "obsolete semantic-router path remains executable");
check(/Need real-world help or current information/.test(page), "permanent high-stakes boundary heading is missing");
for (const phrase of [
  "emergencies", "personal safety or abuse", "health", "legal", "financial",
  "current-fact decisions", "contact local emergency services",
  "qualified professional", "reliable, current primary source"
]) {
  check(page.includes(phrase), `visible boundary is missing: ${phrase}`);
}
check(!/\b(?:988|911|999|112)\b/.test(page), "page assumes a local emergency/hotline number");
const titleBoundaryAt = page.indexOf('class="claio-title-boundary"');
const roomActionAt = page.indexOf('class="claio-deck-hotspot"');
check(titleBoundaryAt >= 0 && titleBoundaryAt < roomActionAt, "complete compact boundary is not visible before the first room action");
check(/id="fortuneRepeatButton"/.test(page), "mobile result lacks an adjacent repeat action");
check(/repeatButton\.addEventListener\("click"/.test(enhancement), "mobile result repeat action is not wired to the governed draw control");
check(/<noscript>[\s\S]*The deck needs JavaScript to shuffle[\s\S]*Nothing was drawn or saved/.test(page), "no-JavaScript recovery truth is missing");

check(/const MAX_READING_COUNT = 10000/.test(page), "count maximum is not explicit");
check(/Number\.isSafeInteger\(value\)/.test(page), "stored count is not safe-integer validated");
check(/\/\^\(0\|\[1-9\]\\d\*\)\$\/.test\(raw\)/.test(page), "decimal/exponential count forms are not rejected");
check(/function canonicalCard\(name\)/.test(page), "history lacks canonical-deck lookup");
check(/canonical\.read/.test(page), "stored history copy is trusted instead of rehydrated");
check(/slice\(-MAX_HISTORY\)/.test(page), "history is not bounded");
check(/function sanitizedBadgeStore\(\)/.test(page), "badge storage lacks a sanitizer");
check(/Object\.getPrototypeOf\(value\) === Object\.prototype/.test(page), "stored objects are not restricted to plain objects");
check(/function parseExactIsoUtcTimestamp\(value\)/.test(page), "badge timestamps lack an exact validator");
check(page.includes("/^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})\\.(\\d{3})Z$/"), "badge timestamps lack an exact-width ISO UTC shape");
check(/year % 4 === 0[\s\S]*year % 100 !== 0[\s\S]*year % 400 === 0/.test(page), "badge timestamps lack Gregorian leap-year arithmetic");
check(/day > monthLengths\[month - 1\]/.test(page), "badge timestamps lack month/day arithmetic");
check(/new Date\(timestamp\)\.toISOString\(\) !== value/.test(page), "badge timestamps lack exact ISO round-trip validation");
check(/timestamp > Date\.now\(\)/.test(page), "future badge timestamps are not rejected at zero tolerance");
check(!/Date\.now\(\) \+ 5 \* 60 \* 1000/.test(page), "obsolete five-minute future tolerance remains");

check(/Browser storage is unavailable/.test(page), "storage-failure truth is missing");
check(/Recent readings on this device/.test(page), "history scope is not visible");
check(/not an account history/.test(page), "history does not deny account scope");
check(/Hotline Regular local keepsake/.test(page), "badge is not framed as a local keepsake");
check(/not an account reward or member benefit/.test(page), "badge does not deny durable reward scope");
check(/id="clearClaioHistory"/.test(page), "local reset control is missing");
check(/delete badges\['hotline-regular'\]/.test(page), "reset does not remove Mme CLAi-O's local keepsake");
check(/const readingPersisted = persistReadingState/.test(page) && /const keepsakePersisted = readingPersisted/.test(page), "keepsake progress is not gated on persisted reading state");
check(/function persistReadingState\(nextCount, nextHistory, includeHotlineKeepsake\)/.test(page), "reading and threshold keepsake are not one transaction");
check(/restoreStoredValue\(STORAGE_KEYS\.badges, previousBadges\)/.test(page), "failed threshold keepsake write cannot roll back badge storage");
check(/hasHotlineKeepsake: Boolean\(sanitizedBadgeStore\(\)\['hotline-regular'\]\)/.test(page), "arrival state cannot distinguish count from saved keepsake");
check(/if \(!clearSucceeded\)[\s\S]*could not be cleared completely/.test(page), "failed local deletion can still announce success");
check(/"hotline-regular": \{[\s\S]*?scope: "device-local"/.test(shared), "shared Hotline Regular catalog does not bind device-local scope");
check(!meritBadgeSetBody.includes('"hotline-regular"'), "shared merit set still classifies Hotline Regular as an account reward");
check(/if \(badge\.scope === "device-local"\) return;/.test(shared), "shared account importer does not exclude device-local keepsakes");
check(/if \(badge\.scope === "device-local"\) return;/.test(accountBadgeMergeBody), "historical account rows can rehydrate a device-local keepsake");
check(/scope: badge\.scope/.test(shared), "shared unlock writer drops the device-local scope");
check(/device-local Hotline Regular keepsake/.test(handbook) && !/Hotline Regular badge/.test(handbook), "Handbook still claims Hotline Regular as a durable badge");

check(/role="status" aria-live="polite" aria-atomic="true"/.test(page), "dynamic state lacks live status semantics");
check(/id="fortuneCard" role="region"[\s\S]*tabindex="-1"/.test(page), "reading result is not programmatically focusable");
check(/cardEl\.focus\(\{ preventScroll: true \}\)/.test(page), "completed reading does not move focus to its result");
check(!/deckHotspot\.blur/.test(enhancement), "deck activation deliberately discards keyboard focus");
check(/\.claio-safety\.claio-safety--static h3[\s\S]*color: #fff !important/.test(css), "safety heading lacks an independently enforceable foreground");
check(/\.claio-safety:focus-visible/.test(css), "safety boundary lacks visible focus styling");
check(/prefers-reduced-motion: reduce/.test(css), "reduced-motion CSS contract is missing");
check(/reduceMotion \? 0 : 1500/.test(page), "reduced-motion runtime still imposes the reveal delay");
check(/\.call-button:focus-visible/.test(css), "visible focus styling is missing");
check(/@media \(max-width: 760px\)/.test(css), "mobile/reflow layout is missing");

check(/location\.replace\('\/games\/madame-claio\.html'\)/.test(redirect), "legacy route lacks canonical replacement");
check(/Cocktail Fortune has retired/.test(redirect), "legacy recovery copy does not say the old product retired");
check(/separate playful reflection room/.test(redirect), "legacy copy conflates cocktail and reflection products");
check(
  /The BRONZE AiGE(?:&rsquo;|'|’)s separate (?:drink-picker )?game,\s+not a Mme CLAi-O reading/.test(bws),
  "Businesswomen's Special does not preserve its separate product frame"
);
check(/spirit-free lane/.test(bws), "Businesswomen's Special boundary omits its spirit-free route");

check(/Safari\/VoiceOver\/native zoom remain explicit human gates/.test(spec), "operating spec overclaims native accessibility evidence");
check(/Deployment and real-origin verification are not\s+authorized/.test(spec), "operating spec overclaims release authority");

if (failures.length) {
  console.error("MME CLAi-O CONTRACT FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MME CLAi-O CONTRACT PASS");
console.log(`deck_cards=${cardCount}`);
console.log("scope=random-truth,no-free-text,storage-sanitization,non-repeat,reset,accessibility,redirect,separate-product-truth");
