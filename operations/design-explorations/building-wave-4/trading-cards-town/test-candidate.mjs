import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "../../../..");
const candidateDir = import.meta.dirname;
const cataloguePath = path.join(root, "operations/product-stewards/trading-cards/town-character-catalogue-admission-candidate-v1-2026-07-27.json");
const catalogue = JSON.parse(fs.readFileSync(cataloguePath, "utf8"));
const html = fs.readFileSync(path.join(candidateDir, "index.html"), "utf8");
const css = fs.readFileSync(path.join(candidateDir, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(candidateDir, "app.js"), "utf8");

assert.equal(catalogue.records.length, 13, "exact Town record count");
assert.equal(new Set(catalogue.records.map((record) => record.card_key)).size, 13, "unique card keys");
assert.equal(new Set(catalogue.records.map((record) => record.identity_id)).size, 13, "unique identities");

for (const record of catalogue.records) {
  const frontPath = path.join(root, record.front.file);
  assert.ok(fs.existsSync(frontPath), `${record.identity_id} front exists`);
  const actualHash = crypto.createHash("sha256").update(fs.readFileSync(frontPath)).digest("hex");
  assert.equal(actualHash, record.front.sha256, `${record.identity_id} front hash`);
  assert.ok(record.front.alt.length >= 24, `${record.identity_id} front alt`);
  assert.ok(record.back.alt.length >= 24, `${record.identity_id} back alt`);
  assert.ok(record.back.heading.length > 0, `${record.identity_id} heading`);
  assert.ok(record.back.teaching_move.length > 0, `${record.identity_id} teaching move`);
  assert.ok(record.back.boundary.length > 0, `${record.identity_id} boundary`);
  assert.equal(record.pack_eligibility, false, `${record.identity_id} pack held`);
  assert.equal(record.states.release, "held", `${record.identity_id} release held`);
}

assert.match(html, /meta name="robots" content="noindex,nofollow"/, "isolated noindex candidate");
assert.match(html, /Preview only/, "truthful held state");
assert.match(html, /not in a pack/, "pack boundary visible");
assert.match(js, /aria-pressed/, "semantic flip state");
assert.match(js, /Expected exactly 13 Town records/, "fail closed on record mismatch");
assert.match(js, /Nothing was added to a pack or collection/, "failure truth");
assert.match(css, /prefers-reduced-motion: reduce/, "reduced motion");
assert.match(css, /@media \(max-width: 20rem\)/, "320px reflow");
assert.match(css, /focus-visible/, "keyboard focus");
assert.doesNotMatch(html + css + js, /localStorage|sessionStorage|fetch\([^)]*(POST|PUT|PATCH|DELETE)/, "no ownership or write path");

console.log("TOWN TRADING CARD RENDERED CONSUMER PASS records=13 fronts=13 backs=13 flip=keyboard-button 320=reflow reduced-motion=pass pack=held release=held");
