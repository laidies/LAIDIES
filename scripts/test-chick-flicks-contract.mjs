#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const bytes = (file) => fs.readFileSync(path.join(root, file));
const exists = (file) => fs.existsSync(path.join(root, file));
const sha256 = (file) => crypto.createHash("sha256").update(bytes(file)).digest("hex");
const page = read("chick-flicks.html");
const styles = read("content/chick-flicks.css");
const index = JSON.parse(read("content/episode-index.json"));
const checks = [];
const check = (name, fn) => { fn(); checks.push(name); };

const vhs = {
  "01": "63985d88a0de8377121dde1d5acf5fa471c6c13aec3b31352dbf37a9861cc722",
  "02": "e9e731701793ffcbf0e844866feef0f5cb694010cd83b108cf5a559fd4783922",
  "03": "b049fe5fa913eae7e8fb8f66f8f7bc7cce04b281139c04f464a81e109536cdde",
  "04": "85faeed60e3a1f9f9232b32360c08e5b6be370ff4d97eff7bcb6ae84934886c8"
};
const store = "assets/sunnyvaile-interiors/chick-flicks-store/chick-flicks-store-shelves-v1.png";

check("episode index has unique positive numbered records with titles", () => {
  assert.ok(Array.isArray(index.episodes) && index.episodes.length > 0);
  const seen = new Set();
  for (const episode of index.episodes) {
    assert.ok(Number.isInteger(episode.number) && episode.number > 0);
    assert.ok(episode.title?.trim());
    assert.ok(!seen.has(episode.number), `duplicate episode ${episode.number}`);
    seen.add(episode.number);
  }
});

check("all published issue destinations exist", () => {
  for (const episode of index.episodes.filter((entry) => entry.status === "published")) {
    assert.match(episode.issueUrl, /^\/?issues\/[^/]+\.html$/);
    assert.ok(exists(episode.issueUrl.replace(/^\/+/, "")), `missing ${episode.issueUrl}`);
  }
});

check("the discarded masthead cannot return and the exact store image is present", () => {
  assert.doesNotMatch(page, /sunnyvaile-masthead-chick-flicks\.png/);
  assert.match(page, /class="cf-masthead"/);
  assert.match(page, new RegExp(`src="/${store.replaceAll("/", "\\/")}"`));
  assert.ok(exists(store));
  assert.equal(sha256(store), "1d510f6dc48511cd8393854999d002d88a999e61b0c33bf0672e6208c0989305");
  assert.ok(page.indexOf('class="cf-masthead"') < page.indexOf('class="cf-store"'));
});

check("four exact transparent VHS cases are operable on the physical shelf", () => {
  assert.equal((page.match(/class="cf-tape(?:\s[^"]*)?"/g) || []).length, 4);
  for (const [number, hash] of Object.entries(vhs)) {
    const file = `assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-${number}.png`;
    assert.ok(exists(file), `missing ${file}`);
    assert.equal(sha256(file), hash, `${file} changed`);
    const png = bytes(file);
    assert.equal(png.readUInt32BE(16), 1024, `${file} width`);
    assert.equal(png.readUInt32BE(20), 1536, `${file} height`);
    assert.equal(png[25], 6, `${file} must remain RGBA`);
    assert.match(page, new RegExp(`href="#episode-${number}"[\\s\\S]{0,240}ep-${number}\\.png`));
  }
});

check("four released rental records expose direct format routes", () => {
  assert.equal((page.match(/<article class="cf-rental(?:\s[^"]*)?"/g) || []).length, 4);
  for (const number of Object.keys(vhs)) {
    assert.equal((page.match(new RegExp(`href="/issues/issue-${number}\\.html"`, "g")) || []).length, 1);
    assert.equal((page.match(new RegExp(`href="/watch\\.html\\?ep=${number}&amp;mode=listen"`, "g")) || []).length, 1);
    assert.equal((page.match(new RegExp(`href="/watch\\.html\\?ep=${number}&amp;mode=watch"`, "g")) || []).length, 1);
  }
});

check("start and latest routes remain immediately available", () => {
  assert.match(page, /class="cf-routebar"/);
  assert.match(page, /href="#episode-01"[\s\S]{0,180}<b>Start here<\/b>/);
  assert.match(page, /href="#episode-04"[\s\S]{0,200}<b>Latest release<\/b>/);
});

check("Episode 05 is forthcoming without a fabricated tape or action", () => {
  assert.match(page, /Episode 05 will join the shelf when it is ready to read and listen to\./);
  assert.doesNotMatch(page, /issue-05|ep=05|episode-vhs-boxes-v2\/ep-05/);
});

check("the trailer is accurate and exposes one route", () => {
  assert.match(page, /illustrated, captioned introduction explains the town and how each episode works/i);
  assert.equal((page.match(/href="\/watch\.html\?ep=trailer"/g) || []).length, 1);
  assert.match(page, /assets\/media\/opening-day-covers-v1\/trailer\/trailer-site\.jpg/);
});

check("responsive and keyboard-visible rules preserve the interaction", () => {
  assert.match(styles, /\.cf-tape:focus-visible/);
  assert.match(styles, /\.cf-button:focus-visible/);
  assert.match(styles, /@media\(max-width:920px\)/);
  assert.match(styles, /@media\(max-width:700px\)/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(styles, /\.cf-store__cases[^{]*\{[^}]*grid-template-columns:repeat\(4/);
});

check("shared Chick Flicks entries use release-state truth rather than weekly freshness", () => {
  const scoped = [
    read("index.html"),
    read("content/site/sunnyvaile-directory.js"),
    read("content/site/sv-tour-checkin.js"),
    read("content/site/sv-welcome-tour.js"),
    read("issues/issue-trailer.html")
  ].join("\n");
  for (const claim of ["This week's rental", "Pull this week's episode", "one tape a week", "Grab this week's tape"]) {
    assert.ok(!scoped.includes(claim), claim);
  }
});

console.log(`CHICK FLICKS CONTRACT PASS (${checks.length} checks)`);
for (const name of checks) console.log(`- ${name}`);
