import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "../../../..");
const read = relative => readFile(path.join(root, relative), "utf8");
test("Community rooms mount the Resident SSO UI without stale Hyvor-login copy", async () => {
  const room = await read("content/site/community-room.js");
  assert.match(room, /import\("\/content\/site\/community-account-ui\.mjs"\)/);
  assert.match(room, /mountCommunity/);
  for (const file of ["ask-the-room", "burn-book", "dear-laidies", "mix-cd-exchange", "send-it-energy", "try-on-debrief", "wins"]) {
    const html = await read(`community/${file}.html`);
    assert.match(html, /Use your LAiDIES Resident account to join this conversation/);
    assert.match(html, /community-room\.js\?v=20260911-header-controls-2/);
  }
});
test("Resident account and house preserve existing boundaries while adding SSO entry", async () => {
  const account = await read("content/site/resident-account-page-v1.js");
  const house = await read("sorority-house.html");
  assert.match(account, /community-return\.mjs/);
  assert.match(account, /window\.location\.replace\(communityReturn\)/);
  assert.match(house, /Making a Resident Card is optional/);
  assert.match(house, /community-room\.js\?v=20260911-header-controls-2/);
});

test("Every existing frontend baseline capture is byte-bound to the immutable Pages manifest", async () => {
  const crypto = await import("node:crypto");
  const manifest = JSON.parse(await read("operations/live-user-journeys-20260914/community-integration/live-base-verification/manifest.json"));
  for (const item of manifest.paths.filter(item => item.status === 200)) {
    const bytes = await readFile(path.join(root, "operations/live-user-journeys-20260914/community-integration/live-base-verification", item.path));
    const actual = crypto.createHash("sha256").update(bytes).digest("hex");
    assert.equal(actual, item.sha256, item.path);
  }
  for (const item of manifest.paths.filter(item => item.status === 404)) assert.equal(item.sha256, undefined, item.path);
});

test("Resident account cache reference advances with the SSO return script", async () => {
  const card = await read("resident-card.html");
  assert.match(card, /resident-account-page-v1\.js\?v=20260914-community-sso-1/);
});
