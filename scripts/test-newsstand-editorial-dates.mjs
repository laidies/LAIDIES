#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const files = ["newsstand.html", "content/site/newsstand-catchup-v1.js"];
const values = ["2026-09-06T01:00:00Z", "2027-01-01T06:30:00Z", "2027-01-01", "2028-02-29", "2026-02-30", "not-a-date"];

function formatterSource(file) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const start = source.indexOf("function formatDate(");
  const end = source.indexOf("function ", start + "function formatDate(".length);
  const compactEnd = source.indexOf("function ", end + "function ".length);
  assert.ok(start >= 0 && end > start && compactEnd > end, `${file} must contain adjacent date formatters`);
  return source.slice(start, compactEnd);
}

function dateKeySource(file, startName, nextName) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const start = source.indexOf(`function ${startName}(`);
  const end = source.indexOf(`function ${nextName}(`, start);
  assert.ok(start >= 0 && end > start, `${file} must contain ${startName}`);
  return source.slice(start, end);
}

function runDateKey(source, name, timezone) {
  const program = `
    const source = Buffer.from(process.env.NEWSSTAND_DATE_KEY, "base64").toString("utf8");
    const key = Function(source + "; return ${name};")();
    const values = JSON.parse(process.env.NEWSSTAND_DATE_VALUES);
    console.log(JSON.stringify(values.map(value => key(value))));
  `;
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", program], {
    encoding: "utf8",
    env: { ...process.env, TZ: timezone, NEWSSTAND_DATE_KEY: Buffer.from(source).toString("base64"), NEWSSTAND_DATE_VALUES: JSON.stringify(values) },
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

function runFormatter(source, timezone) {
  const program = `
    const source = Buffer.from(process.env.NEWSSTAND_FORMATTERS, "base64").toString("utf8");
    const pair = Function(source + "; return { formatDate: formatDate, formatCompactDate: formatCompactDate };")();
    const values = JSON.parse(process.env.NEWSSTAND_DATE_VALUES);
    console.log(JSON.stringify(values.map(value => [pair.formatDate(value), pair.formatCompactDate(value)])));
  `;
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", program], {
    encoding: "utf8",
    env: {
      ...process.env,
      TZ: timezone,
      NEWSSTAND_FORMATTERS: Buffer.from(source).toString("base64"),
      NEWSSTAND_DATE_VALUES: JSON.stringify(values),
    },
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

// Exact incumbent logic retained solely to prove this test rejects the original UTC rollover.
function incumbentFormatDate(value) {
  const source = String(value || "");
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(source);
  const parsed = dateOnly ? new Date(source + "T00:00:00Z") : new Date(source);
  return Number.isFinite(parsed.getTime()) ? parsed.toLocaleDateString("en-CA", {
    year: "numeric", month: "long", day: "numeric", timeZone: dateOnly ? "UTC" : undefined,
  }) : value;
}

const incumbent = spawnSync(process.execPath, ["--input-type=module", "-e", `console.log((${incumbentFormatDate.toString()})("2026-09-06T01:00:00Z"))`], {
  encoding: "utf8", env: { ...process.env, TZ: "UTC" },
});
assert.equal(incumbent.status, 0, incumbent.stderr);
assert.equal(incumbent.stdout.trim(), "September 6, 2026", "calibration: the previous local-time formatter exposed the wrong editorial day in UTC");

const incumbentDateOnly = value => String(value || "").slice(0, 10);
assert.equal(incumbentDateOnly("2026-09-06T01:00:00Z"), "2026-09-06", "calibration: the prior catch-up key grouped the UTC date rather than the editorial day");
assert.equal(new Date("2026-02-30T00:00:00Z").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }), "March 2, 2026", "calibration: JavaScript normalizes an impossible literal unless the helper rejects it");

for (const file of files) {
  const source = formatterSource(file);
  const results = ["UTC", "America/Vancouver", "Asia/Tokyo"].map(timezone => runFormatter(source, timezone));
  assert.deepEqual(results[0], results[1], `${file} must not vary by reader timezone`);
  assert.deepEqual(results[0], results[2], `${file} must not vary by reader timezone`);
  assert.deepEqual(results[0], [
    ["September 5, 2026", "Sep 5 ’26"],
    ["December 31, 2026", "Dec 31 ’26"],
    ["January 1, 2027", "Jan 1 ’27"],
    ["February 29, 2028", "Feb 29 ’28"],
    ["2026-02-30", "2026-02-30"],
    ["not-a-date", "not-a-date"],
  ], `${file} must use Vancouver dates for instants while retaining literal date-only values`);
}

const catchupDateKey = dateKeySource("content/site/newsstand-catchup-v1.js", "dateOnly", "editorialToday");
const archiveDateKey = dateKeySource("newsstand.html", "editorialDateKey", "publisherFor");
for (const [label, source, name] of [
  ["catch-up", catchupDateKey, "dateOnly"],
  ["archive fallback", archiveDateKey, "editorialDateKey"],
]) {
  const results = ["UTC", "America/Vancouver", "Asia/Tokyo"].map(timezone => runDateKey(source, name, timezone));
  assert.deepEqual(results[0], results[1], `${label} date key must not vary by reader timezone`);
  assert.deepEqual(results[0], results[2], `${label} date key must not vary by reader timezone`);
  assert.deepEqual(results[0], ["2026-09-05", "2026-12-31", "2027-01-01", "2028-02-29", "", "not-a-date"], `${label} key must preserve valid literal dates, reject impossible calendar dates, and convert valid instants to Vancouver`);
}

const page = fs.readFileSync(path.join(root, "newsstand.html"), "utf8");
assert.match(page, /timeZone: "America\/Vancouver", year: "numeric", month: "2-digit", day: "2-digit"/);
assert.match(page, /var editorialDate = \[editorialParts\.year, editorialParts\.month, editorialParts\.day\]\.join\("-"\);/);
assert.match(page, /Date\.UTC\(Number\(editorialParts\.year\), Number\(editorialParts\.month\) - 1, Number\(editorialParts\.day\)\)/);
assert.match(page, /dateNode\.dateTime = editorialDate/);
assert.match(page, /editionDate: editorialDateKey\(story\.publishedAt\),/);

console.log("NEWSSTAND EDITORIAL DATE CALIBRATION: PASS · incumbent UTC formatter and catch-up-key failures reproduced; rendered and internal editorial dates are Vancouver-stable across UTC, Vancouver, and Tokyo; literal YYYY-MM-DD values remain literal and impossible calendar dates reject");
