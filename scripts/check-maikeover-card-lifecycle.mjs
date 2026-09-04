#!/usr/bin/env node

import fs from "node:fs";

const maker = fs.readFileSync("maikeover.html", "utf8");
let closet = fs.readFileSync("laidies-card.html", "utf8");
const contract = fs.readFileSync("content/site/resident-card-contract-v1.js", "utf8");
const failures = [];

const calibrating = process.env.MAIKEOVER_CARD_LIFECYCLE_CALIBRATE === "1";
if (calibrating) {
  closet = closet.replaceAll("No. NEW", "No. 0000");
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

const liveControls = [
  "moSongSel",
  "moSaintSel",
  "moMovieSel",
  "moTvSel",
  "moCarrySel",
  "moNameInput"
];

for (const id of liveControls) {
  check(
    new RegExp(`\\$\\('${id}'\\)\\.addEventListener\\('(?:change|input)', renderPreview\\)`).test(maker),
    `${id} does not update the live Card through renderPreview`
  );
}

check(/state\.bg\s*=\s*key;[\s\S]{0,420}renderPreview\(\)/.test(maker),
  "background choice does not update the live Card");
check(/LAIDIESResidentCard\.buildEnvelope\(candidateFields\)/.test(maker),
  "MAiKEOVER save does not use the shared versioned envelope");
check(/localStorage\.setItem\(CARD_STORAGE_KEY, serialized\)/.test(maker),
  "MAiKEOVER does not save the shared Card envelope");
check(/if \(stored\) \$\('moSeeCloset'\)\.style\.display='inline'/.test(maker),
  "a restored Card does not retain its Closet doorway");

const mappedFields = [
  ["displayName", "display_name"],
  ["song", "favorite_song"],
  ["saint", "favorite_saint"],
  ["movie", "favorite_movie"],
  ["tvshow", "favorite_tvshow"],
  ["carry", "card_carry"],
  ["cardBg", "card_bg"],
  ["cardAvatarUrl", "card_avatar_url"]
];

for (const [envelopeField, closetField] of mappedFields) {
  check(
    closet.includes(`${closetField}: card && card.${envelopeField} || undefined`),
    `Closet does not map shared field ${envelopeField} to ${closetField}`
  );
}

check(/function residentNumberText\(value\)/.test(closet),
  "Closet has no shared truthful number formatter");
check(/Number\.isInteger\(number\) && number > 0/.test(closet),
  "Closet does not require a positive server number");
check(/: 'No\. NEW';/.test(closet),
  "Closet does not preserve the device-only NEW state");
check(!closet.includes("No. 0000"),
  "Closet still displays a fake zero resident number");
check(/var CARD_KEY = "laidies_resident_card_v1"/.test(contract),
  "shared Card contract storage identity changed");

if (calibrating) {
  if (!failures.includes("Closet still displays a fake zero resident number")) {
    console.error("MAiKEOVER CARD LIFECYCLE CHECK CALIBRATION FAIL");
    console.error("- deliberately bad Closet number was not rejected");
    process.exit(1);
  }
  console.log("MAiKEOVER CARD LIFECYCLE CHECK CALIBRATION PASS");
  console.log("deliberately bad Closet number was rejected");
  process.exit(0);
}

if (failures.length) {
  console.error("MAiKEOVER CARD LIFECYCLE CHECK FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("MAiKEOVER CARD LIFECYCLE CHECK PASS");
console.log("live choices -> shared save -> Closet render -> MAiKEOVER restore -> replacement save; device-only number=NEW");
