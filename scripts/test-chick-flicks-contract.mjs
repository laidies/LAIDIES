#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const sourcePage = read("chick-flicks.html");
const page = process.env.CHICK_FLICKS_TRAILER_PROMISE_CALIBRATION === "1"
  ? sourcePage.replace("</main>", '<a href="/watch.html?ep=trailer">False trailer listening promise</a></main>')
  : sourcePage;
const styles = read("content/chick-flicks.css");
const index = JSON.parse(read("content/episode-index.json"));
const checks = [];
const check = (name, fn) => {
  fn();
  checks.push(name);
};

check("trailer entrances expose the readable issue and preserve the listening hold", () => {
  const trailerIssue = read("issues/issue-trailer.html");
  assert.match(page, /Start with the illustrated trailer issue/i);
  assert.match(page, /trailer audio is being checked before public listening/i);
  assert.match(page, /href="\/issues\/issue-trailer\.html"/);
  assert.doesNotMatch(page, /\/watch\.html\?ep=trailer/);
  assert.doesNotMatch(page, /whole town in one watch|full motion film|motion movie/i);
  assert.match(trailerIssue, /id="tour-start"/);
  assert.match(trailerIssue, /href="#tour-start">Start the illustrated tour/i);
  assert.match(trailerIssue, /href="\/visitors-centre\.html">Explore the current town directory/i);
  assert.doesNotMatch(trailerIssue, /\/watch\.html\?ep=trailer|Listen to the illustrated trailer/i);
});

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

check("every published issue destination and every indexed box exists", () => {
  for (const episode of index.episodes) {
    const number = String(episode.number).padStart(2, "0");
    assert.ok(exists(`assets/sunnyvaile-interiors/episode-vhs-boxes/ep-${number}.webp`),
      `missing Episode ${number} box`);
    if (episode.status === "published") {
      assert.ok(episode.issueUrl, `Episode ${number}: published without issueUrl`);
      assert.match(episode.issueUrl, /^\/?issues\/[^/]+\.html$/);
      assert.ok(exists(episode.issueUrl.replace(/^\/+/, "")),
        `Episode ${number}: missing ${episode.issueUrl}`);
    }
  }
});

check("catalogue fails closed on schema, duplicate, URL and destination problems", () => {
  assert.match(page, /Number\.isInteger\(raw\.number\)/);
  assert.match(page, /Episode index contains a duplicate number/);
  assert.match(page, /parsed\.origin !== window\.location\.origin/);
  assert.match(page, /\/\^\\\/issues\\\/\[\^\/\]\+\\\.html\$\//);
  assert.match(page, /fetchWithTimeout\(episode\._safeIssueUrl, \{ method: "HEAD"/);
  assert.match(page, /episode\._available = response\.ok/);
  assert.match(page, /No tape is being presented as released until the manifest and its issue destinations can be checked/);
});

check("released, forthcoming and unavailable use one mechanical state rule", () => {
  assert.match(page, /function releaseState\(episode\)/);
  assert.match(page, /episode\._available/);
  assert.match(page, /episode\.status === "draft"/);
  assert.match(page, /return "unavailable"/);
  assert.match(page, /state === "forthcoming" \? "coming soon"/);
  assert.match(page, /"temporarily unavailable" : "unavailable"/);
  assert.match(page, /list\.filter\(function \(episode\) \{ return releaseState\(episode\) === "released"; \}\)/);
  assert.doesNotMatch(page, /list\.filter\(function \(episode\) \{ return episode\.status === "published"; \}\)\.length/);
});

check("arrival language cannot manufacture current-week freshness", () => {
  assert.match(page, /latest released tape in the manifest/i);
  assert.match(page, /latest verified release gets the front-wall sticker/i);
  assert.doesNotMatch(page, /this Wednesday.?s new release|new releases land .* every Wednesday|Rent the new release/i);
});

check("favourite and last-rental memory are explicitly device-local", () => {
  assert.match(page, /Favourite on this device:/);
  assert.match(page, /No favourite tape saved on this device/);
  assert.match(page, /Remove favourite from this device/);
  assert.match(page, /Last rented on this device:/);
  assert.match(page, /Favourite storage is unavailable/);
  assert.match(page, /could not change your device-only favourite/);
  assert.doesNotMatch(page, /Resident Card favourite|Put it on my member card|On my member card/);
});

check("last-rental return is validated, useful and reversibly device-local", () => {
  assert.match(page, /id="cfReturnVisit"[\s\S]*hidden[\s\S]*aria-labelledby="cf-return-title"/);
  assert.match(page, /id="cfContinueRental"[\s\S]*Continue with this tape/);
  assert.match(page, /id="cfClearRental"[\s\S]*Clear and start over/);
  assert.match(page, /function validatedLastRental\(\)/);
  assert.match(page, /\/\^\\d\{2\}\$\/\.test\(stored\)/);
  assert.match(page, /!episode \|\| !episode\._available/);
  assert.match(page, /removeLocal\("laidies_cf_last_rental"\)/);
  assert.match(page, /selectEpisode\(current\)/);
  assert.match(page, /This browser would not let the store clear the device-only rental/);
  assert.match(styles, /\.cf-return-visit\[hidden\][\s\S]*display: none/);
});

check("tape selection is a focused issue handoff, never completion", () => {
  assert.match(page, /takeHome\.href = episode\._safeIssueUrl/);
  assert.match(page, /rental\.focus\(\{ preventScroll: true \}\)/);
  assert.match(page, /Released tapes open the full episode/);
  assert.doesNotMatch(page, /episode completed|completed episode|reward balance|butterfly clip/i);
});

check("dynamic status, retry, broken-cover and reduced-motion states exist", () => {
  assert.match(page, /id="cfAisleStatus" role="status" aria-live="polite"/);
  assert.match(page, /data-retry-catalogue/);
  assert.match(page, /var FETCH_TIMEOUT_MS/);
  assert.match(page, /new AbortController\(\)/);
  assert.match(page, /controller\.abort\(\)/);
  assert.match(page, /error\.name === "AbortError"/);
  assert.match(page, /focusElement\(retry\)/);
  assert.match(page, /focusElement\(latest \? latestButton : title\)/);
  assert.match(page, /cf-tape__fallback/);
  assert.match(page, /image\.addEventListener\("error"/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(styles, /\.cf-tape\.is-image-missing \.cf-tape__fallback/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.cf-aisles__track button \{[\s\S]*?min-height: 44px/);
});

check("all configured aisles are visible and include a deliberate empty state", () => {
  for (const aisle of ["all", "prompting", "style", "everyday", "ethics", "history", "creative", "unfiled"]) {
    assert.match(page, new RegExp(`data-aisle="${aisle}"`));
  }
  for (const aisle of ["prompting", "style", "everyday", "ethics", "history", "creative"]) {
    assert.match(page, new RegExp(`${aisle}: \\[`));
  }
  assert.match(page, /creative: \[\]/);
  assert.match(page, /if \(activeAisle === "all"\) return episodes\.slice\(\)/);
  assert.match(page, /activeAisle === "unfiled"/);
  assert.match(page, /no tapes filed in this aisle/);
});

check("shared Chick Flicks entries use release-state truth rather than weekly freshness", () => {
  const homepage = read("index.html");
  const directory = read("content/site/sunnyvaile-directory.js");
  const checkin = read("content/site/sv-tour-checkin.js");
  const welcome = read("content/site/sv-welcome-tour.js");
  const trailerIssue = read("issues/issue-trailer.html");
  assert.match(homepage, /Released episodes, then the full eight-stop route/);
  assert.match(homepage, /latest released episode, or start at Episode 1/);
  assert.match(directory, /Latest released tape/);
  assert.match(checkin, /Latest released episode/);
  assert.match(welcome, /Pull a released episode/);
  assert.match(trailerIssue, /Grab a released tape/);
  assert.match(trailerIssue, /Choose a released tape/);
  const oldClaims = [
    "This week's rental",
    "This week's episode",
    "this week’s episode, or start",
    "Pull this week's episode",
    "one tape a week",
    "Grab this week's tape",
    "Grab this week's —"
  ];
  const scopedCopy = [homepage, directory, checkin, welcome, trailerIssue].join("\n");
  for (const claim of oldClaims) assert.ok(!scopedCopy.includes(claim), claim);
});

console.log(`CHICK FLICKS CONTRACT PASS (${checks.length} checks)`);
for (const name of checks) console.log(`- ${name}`);
