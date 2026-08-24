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

const sourcePage = read("visitors-centre.html");
const page = process.env.VISITORS_CENTRE_INTERNAL_PROOF_CALIBRATION === "1"
  ? sourcePage.replace("</head>", '<link rel="stylesheet" href="/operations/design-explorations/current/visitors-centre/proof.css"></head>')
  : process.env.VISITORS_CENTRE_TRAILER_TRUTH_CALIBRATION === "1"
    ? sourcePage.replace("Trailer playback is temporarily unavailable.", "This ticket opens the player.")
    : sourcePage;
const tour = read("content/site/sv-welcome-tour.js");
const directory = read("content/site/sunnyvaile-directory.js");
const projection = JSON.parse(read("content/site/readiness/v1/entry-readiness-projection.v1.json"));
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
  /<a href="([^"]+)" data-vc-id="([^"]+)">([^<]+)<\/a>/g
)].map((match) => ({
  href: match[1],
  id: match[2],
  name: match[3]
}));
const decodeHtml = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", "\"")
  .replaceAll("&#39;", "'");

check(/This is the town front desk/.test(page), "front-desk comprehension copy is missing");
check(/choose one\s+by name below/.test(page), "named directory is not presented as map parity");
check(/id="vc-building-card"[^>]*aria-atomic="true"[^>]*hidden/.test(page), "destination reveal is not initially closed and atomic");
check(/card\.hidden = false[\s\S]*enter\.focus\(\{ preventScroll: true \}\)/.test(page), "valid selection does not expose and focus the destination action");
check(/Escape[\s\S]*closeCard\(true, true\)/.test(page), "Escape does not close and restore focus");
check(/All 17 named routes/.test(page), "static directory parity introduction is missing");
check(staticLinks.length === 17, `static/no-JS directory has ${staticLinks.length} destinations instead of 17`);
check(Array.isArray(canonical) && canonical.length === 17, "shared geometry directory does not expose 17 destinations");
for (const building of canonical) {
  const fallback = staticLinks.find((item) => item.id === building.id);
  check(!!fallback, `static/no-JS directory omits ${building.id}`);
  check(fallback?.href === building.href, `static/shared route mismatch for ${building.id}`);
  check(decodeHtml(fallback?.name || "") === building.name, `static/shared name mismatch for ${building.id}`);
}

check(!/data-vc-summary=|data-vc-limitation=/.test(page),
  "manual destination summary or limitation prose remains embedded in the route");
for (const stalePhrase of [
  "Motion films remain held",
  "Product direction and evidence-game promotion remain under review",
  "not approved for promotion",
  "not a durable learning record",
  "does not prove a track played"
]) {
  check(!page.includes(stalePhrase), `inherited status prose remains: ${stalePhrase}`);
}
check(/readiness\/v1\/readiness-runtime-v1\.js/.test(page), "shared browser receiver runtime is not loaded");
check(/entry-readiness-projection\.v1\.json/.test(page), "shared checksum-bound projection is not fetched");
check(page.includes(projection.integrity.payloadSha256), "route is not bound to the current shared projection payload hash");
check(/expectedPayloadSha256/.test(page), "release-binding option is not passed to the receiver");
check(/visitorCentreSemanticReceiver/.test(page), "Visitor semantic receiver is not consumed");
check(/completionClaim === false/.test(page), "receiver shape does not enforce completionClaim=false");
check(/localFailClosed/.test(page), "route lacks browser/runtime fail-closed recovery");
check(/Open the named route only to check its current page\./.test(page), "generic no-JS/status fallback is missing");
check(/Route arrival is navigation, not completion\./.test(page), "generic fail-closed completion boundary is missing");
check(/Destination pages retain readiness and completion authority/.test(page), "receiving-owner authority boundary is missing");
check(/The wall map did not load\. The named directory below still works\./.test(page), "map failure does not preserve named route truth");
check(/No Resident Card, account, name, ownership, sign-in, sync or cross-device state is inspected or inferred here/.test(page),
  "Card/account non-inference boundary is missing");
check(!/laidies_card_username|localStorage/.test(page), "Visitor route still reads identity/Card-like local state");
check(!/operations\/design-explorations\/|visitors-centre-proof/.test(page),
  "internal Visitor proof runtime leaks into the public page");
check(/Request tour start/.test(page), "optional tour handoff is missing");
check(/href="\/watch\.html\?ep=trailer"[\s\S]*?The trailer is being rebuilt before it returns to the public Screening Room\.[\s\S]*?Check trailer status[\s\S]*?Trailer playback is temporarily unavailable\./.test(page),
  "trailer ticket does not match the receiving Screening Room's held truth");
check(!/Open the illustrated trailer|Open the receiving video player/.test(page),
  "Visitor route still promises an available illustrated trailer");
check(/href="\/post-office\.html#rack"[\s\S]*?Check the postcard rack/.test(page),
  "postcard handoff does not expose the Post Office rack's current truth");
check(!/class="vc-ticket vc-ticket--postcard" href="\/postcard\.html"/.test(page),
  "Visitor route bypasses the held Post Office rack and opens the composer directly");
check(/A selection or route opening proves navigation only/.test(page), "navigation-only boundary is missing");
check(!/vcPostcardForm|vcPostcardHandle|vcPostcardShare/.test(page), "postcard product remains copied into the Visitor route");
check(!/id="from-the-founder"|class="vc-first-route"|<details class="vc-story"/.test(page),
  "non-admitted post-arrival stack remains");
check(!/meaningful_action_completed|destination_completed/.test(page), "destination selection emits a completion-shaped event");
check(/prefers-reduced-motion: reduce/.test(page), "reduced-motion treatment is missing");
check(!/#3a1838|#4b2148|#c9a227|var\(--gold|svwt-dot/.test(tour),
  "retired plum/gold or circular-dot Welcome Tour styling remains");
check(/Pause tour/.test(tour) && /Resume tour/.test(tour) && /End tour/.test(tour),
  "Welcome Tour does not expose explicit pause, resume and end controls");
check(/state\.paused = true[\s\S]*writeState\(state\)/.test(tour)
  && /if \(state\.paused\) renderPausedOffer\(state\)/.test(tour),
  "Welcome Tour pause state is not persisted and restored");
check(/svwt-progress-segment/.test(tour), "Welcome Tour lacks the rectangular progress treatment");

check(projection.payload.destinations.length === 17, "shared projection does not contain 17 destinations");
check(projection.payload.currentContent.length === 3, "shared projection does not contain three current-content slots");
check(projection.payload.destinations.every((item) => item.state === "held"),
  "current all-null owner intake is not truthfully held");
check(projection.payload.destinations.every((item) => item.artifact.kind === "none"),
  "current all-null owner intake invents admitted artifacts");

if (failures.length) {
  console.error("VISITORS CENTRE CONTRACT FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("VISITORS CENTRE CONTRACT PASS");
console.log(`canonical_destinations=${canonical.length}`);
console.log(`projection_id=${projection.payload.projectionId}`);
console.log(`projection_payload_sha256=${projection.integrity.payloadSha256}`);
console.log("scope=arrival-grammar,receiver-binding,no-js-parity,identity-non-inference,focus-recovery,handoff-truth");
