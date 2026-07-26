#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const page = read("games/madame-claio.html");
const css = read("content/madame-claio-v2.css");
const enhancement = read("content/site/madame-claio-v2.js");
const redirect = read("games/cocktail-fortune.html");
const bws = read("games/businesswomens-special.html");
const spec = read("operations/product-stewards/mme-claio/OPERATING-SPEC.md");

for (const file of [
  "operations/product-stewards/mme-claio/CHARTER.md",
  "operations/product-stewards/mme-claio/OPERATING-SPEC.md",
  "operations/product-stewards/mme-claio/state.json",
  "operations/product-stewards/mme-claio/backlog.md"
]) {
  check(fs.existsSync(path.join(root, file)), `missing steward record: ${file}`);
}

const deckStart = page.indexOf("const fortuneCards=[");
const deckEnd = page.indexOf("];", deckStart);
check(deckStart >= 0 && deckEnd > deckStart, "fortune deck cannot be located");
const deckSource = page.slice(deckStart, deckEnd);
const cardCount = (deckSource.match(/\{card:/g) || []).length;
check(cardCount === 100, `expected unchanged 100-card deck, found ${cardCount}`);
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
check(/separate drink-picker game, not a Mme CLAi-O reading/.test(bws), "Businesswomen's Special does not preserve its separate product frame");
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
