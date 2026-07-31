import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../../..");
const candidate = resolve(import.meta.dirname);
const [html, css, js, dataText] = await Promise.all([
  readFile(resolve(candidate, "index.html"), "utf8"),
  readFile(resolve(candidate, "town-hall-candidate.css"), "utf8"),
  readFile(resolve(candidate, "town-hall-candidate.js"), "utf8"),
  readFile(resolve(candidate, "town-hall-data.json"), "utf8")
]);
const data = JSON.parse(dataText);

assert.equal(data.version, 1);
assert.equal(data.regulars.length, 4);
assert.deepEqual(
  data.regulars.map((item) => item.id).sort(),
  ["dj-sunnyv", "fairy-godmother", "mayor-deb", "mme-claio"]
);
for (const regular of data.regulars) {
  assert.match(regular.image, /^\/assets\//);
  assert.ok(regular.href.startsWith("/") || regular.href === "#deb");
  await readFile(resolve(root, regular.image.slice(1)));
}

for (const asset of [
  "/assets/building-interiors/town-hall-civic-chamber.jpg",
  "/assets/building-interiors/town-hall-deb-desk.jpg",
  "/assets/printables/deb-nope-poster-mayor-sunnyvaile-since-1999-web.jpg",
  "/content/music/saint-deb.mp3",
  "/content/music/debs-tomorrow-problem.mp3"
]) {
  assert.ok(html.includes(asset), `missing bound asset ${asset}`);
  await readFile(resolve(root, asset.slice(1)));
}

assert.equal((html.match(/data-station=/g) || []).length, 3);
assert.equal((html.match(/data-panel=/g) || []).length, 3);
assert.equal((html.match(/data-station="[^"]+" data-js-control disabled/g) || []).length, 3);
assert.equal((html.match(/data-js-field disabled/g) || []).length, 5);
assert.match(html, /Ring Deb\. Meet the Regulars\. Prepare a private comment card\./);
assert.match(html, /The authoritative inbox and staff lifecycle are not released/);
assert.match(html, /not an emergency service or guaranteed-response channel/i);
assert.match(html, /Saving is not filing, acceptance, reading or staff status/);
assert.match(html, /server validation[\s\S]*idempotent receipt[\s\S]*staff owner[\s\S]*retention and deletion/);

for (const forbidden of [
  /actually gets read/i,
  /guaranteed reply/i,
  /account history/i,
  /submitted successfully/i,
  /reward/i
]) {
  assert.doesNotMatch(html, forbidden);
}

for (const fixture of [
  "storageDenied",
  "mediaFail",
  "malformedRoster",
  'stateFixture === "corrupt"',
  'stateFixture === "stale"'
]) {
  assert.ok(js.includes(fixture), `missing fixture ${fixture}`);
}
assert.match(js, /DRAFT_TTL_MS = 7 \* 24 \* 60 \* 60 \* 1000/);
assert.match(js, /ALLOWED_TYPES = new Set\(\["compliment", "complaint", "suggestion"\]\)/);
assert.match(js, /aria-pressed/);
assert.match(js, /prefers-reduced-motion/);
assert.match(css, /@media \(max-width: 520px\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(css, /\.regulars-grid \{ display: grid/);
assert.match(css, /\.candidate-bar a \{[\s\S]*min-height: 44px/);

console.log("TOWN HALL WAVE 3 CANDIDATE PASS stations=3 regulars=4 audio=2 draft=device-only inbox=held responsive=520,900");
