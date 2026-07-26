#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const page = read("visitors-centre.html");
const directory = read("content/site/sunnyvaile-directory.js");
const tour = read("content/site/sv-welcome-tour.js");
const spec = read("operations/product-stewards/visitors-centre/OPERATING-SPEC.md");
const directorySandbox = {
  window: {},
  document: {
    readyState: "complete",
    getElementById: () => null,
    addEventListener: () => {}
  },
  setTimeout: () => 0,
  clearTimeout: () => {}
};
vm.runInNewContext(directory, directorySandbox);
const canonical = directorySandbox.window.SV_BUILDINGS;
const staticLinks = [...page.matchAll(
  /<a href="([^"]+)" data-vc-id="([^"]+)" data-vc-state="([^"]+)" data-vc-summary="([^"]+)" data-vc-limitation="([^"]+)">([^<]+)<\/a>/g
)].map((match) => ({
  href: match[1],
  id: match[2],
  state: match[3],
  summary: match[4],
  limitation: match[5],
  name: match[6]
}));
const decodeHtml = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", "\"")
  .replaceAll("&#39;", "'");

check(/This is the town front desk/.test(page), "ten-second front-desk comprehension copy is missing");
check(/choose one\s+by name below/.test(page), "named directory is not presented as map parity");
check(/id="vc-building-card"[^>]*aria-atomic="true"[^>]*hidden/.test(page), "destination reveal is not initially closed and atomic");
check(/card\.hidden = false[\s\S]*enter\.focus\(\{ preventScroll: true \}\)/.test(page), "valid selection does not expose and focus the destination action");
check(/card\.hidden = true/.test(page), "closed destination result remains actionable");
check(/Escape[\s\S]*closeCard\(true, true\)/.test(page), "Escape does not close and restore focus");
check(/All 17 named routes/.test(page), "static directory parity introduction is missing");
check(staticLinks.length === 17, `static/no-JS directory has ${staticLinks.length} destinations instead of 17`);
check(Array.isArray(canonical) && canonical.length === 17, "shared directory does not expose 17 destinations");
for (const building of canonical) {
  const fallback = staticLinks.find((item) => item.id === building.id);
  check(!!fallback, `static/no-JS directory omits ${building.id}`);
  check(fallback?.href === building.href, `static/shared route mismatch for ${building.id}`);
  check(decodeHtml(fallback?.name || "") === building.name, `static/shared name mismatch for ${building.id}`);
  check(["held", "limited"].includes(fallback?.state), `missing fail-closed state for ${building.id}`);
  check((fallback?.summary || "").length >= 20, `missing current summary for ${building.id}`);
  check((fallback?.limitation || "").length >= 35, `missing current limitation for ${building.id}`);
}
check(/The wall map did not load\. The named directory below still works\./.test(page), "map failure does not preserve named route truth");
check(/destinationContracts\[building\.id\]/.test(page), "reveal is not bound to the current destination contract");
check(/contractMatchesRoute/.test(page), "reveal does not fail closed on route drift");
check(!/line\.textContent = building\.oneLiner/.test(page), "reveal still renders decorative oneLiner");
check(!/\(building\.mechanics \|\| \[\]\)/.test(page), "reveal still renders decorative mechanics");
check(/Held from promotion/.test(page), "held destination status is not visible");
check(/Open page — check status/.test(page), "held destination action lacks status-qualified navigation");
check(/This selection is navigation, not completion or product readiness/.test(page), "missing-contract fallback overclaims navigation");
check(!/meaningful_action_completed|destination_completed/.test(page), "destination selection emits a completion-shaped event");
for (const [id, phrase] of [
  ["ksvl-radio", "does not prove a track played"],
  ["fairy-godmother", "not approved for promotion"],
  ["sunnyvaile-high", "not a durable learning record"],
  ["maikeover", "account, cross-device, avatar, public-card, and reward promises are not confirmed"],
  ["town-hall", "not proof of reading, review, reply, resolution"],
  ["dream-phone", "Product direction and evidence-game promotion remain under review"]
]) {
  const destination = staticLinks.find((item) => item.id === id);
  check(destination?.limitation.includes(phrase), `${id} limitation contract is incomplete`);
}
check(/href="\/watch\.html\?ep=trailer">Listen to the illustrated trailer/.test(page), "trailer handoff is not the illustrated trailer");
check(!/sv-trailer-player\.js/.test(page), "Visitor Centre still loads the audio-only trailer player");
check(!/Play the town anthem|sunnyvaile-town-anthem/.test(page), "held KSVL anthem remains promoted");
check(/Neither is\s+required to use the directory/.test(page), "tour/trailer remains framed as required");
check(/Sending is not confirmed here/.test(page), "text/email handoff truth is missing");
check(/Delivery is not confirmed here/.test(page), "share handoff truth is missing");
check(/delivery is not confirmed/.test(page), "copy failure truth is missing");
check(/prefers-reduced-motion: reduce/.test(page), "reduced-motion treatment is missing");

const buildingCount = (directory.match(/\{ num:\s*\d+/g) || []).length;
check(buildingCount === 17, `expected 17 canonical destinations, found ${buildingCount}`);
check(/Public listening is held/.test(tour), "tour still overpromises KSVL playback");
check(/device-local Resident Card preview/.test(tour), "tour still overpromises MAiKEOVER identity/rewards");
check(!/it all starts counting|music follows you everywhere|permanent Report Card/.test(tour), "tour retains a stale account/reward/playback promise");
check(/This browser cannot save tour progress/.test(tour), "tour has no storage-failure recovery");
check(/return true;[\s\S]*return false;/.test(tour), "tour storage write does not report success/failure");
check(/visual\/experience ruling/i.test(spec), "operating spec omits owner visual hold");
check(/real mobile Safari/i.test(spec), "operating spec omits native browser hold");

if (failures.length) {
  console.error("VISITORS CENTRE CONTRACT FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("VISITORS CENTRE CONTRACT PASS");
console.log(`canonical_destinations=${buildingCount}`);
console.log("scope=comprehension,static-directory-parity,current-destination-limitations,focus-recovery,trailer-tour-postcard-truth");
