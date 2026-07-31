import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../../../../../");
const binding = JSON.parse(fs.readFileSync(path.join(here, "binding.json"), "utf8"));
const html = fs.readFileSync(path.join(here, "index.html"), "utf8");
const css = fs.readFileSync(path.join(here, "player.css"), "utf8");
const js = fs.readFileSync(path.join(here, "player.js"), "utf8");

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function result(name, run) {
  try {
    run();
    return { name, result: "PASS" };
  } catch (error) {
    return { name, result: "FAIL", detail: error.message };
  }
}

const mediaPath = path.resolve(here, binding.inputs.media.path);
const vttPath = path.resolve(here, binding.inputs.captions.path);
const vtt = fs.readFileSync(vttPath, "utf8");
const cueCount = (vtt.match(/^\d{2}:\d{2}:\d{2}\.\d{3}\s+-->\s+\d{2}:\d{2}:\d{2}\.\d{3}/gm) || []).length;
const voiceTagCount = (vtt.match(/<v(?:\s+[^>]*)?>/gi) || []).length;
const sanitized = vtt
  .replace(/<v(?:\.[^ >]+)*(?:\s+[^>]*)?>/gi, "")
  .replace(/<\/v>/gi, "")
  .replace(/<[^>]*>/g, "");

const checks = [
  result("binding schema and local-only authority", () => {
    assert.equal(binding.schema, "laidies.emq.representative-player-binding.v1");
    assert.equal(binding.status, "LOCAL_REVIEW_HARNESS_ONLY");
    assert.equal(binding.authority.maker_can_admit_player, false);
    assert.equal(binding.authority.maker_can_admit_trailer, false);
    assert.equal(binding.authority.public_route_changed, false);
  }),
  result("exact frozen MP4 hash", () => assert.equal(sha256(mediaPath), binding.inputs.media.sha256)),
  result("exact frozen external VTT hash", () => assert.equal(sha256(vttPath), binding.inputs.captions.sha256)),
  result("VTT has 207 cues and voice markup is sanitizable", () => {
    assert.equal(cueCount, 207);
    assert.equal(voiceTagCount, 207);
    assert.doesNotMatch(sanitized, /<\s*\/?\s*v(?:\s|>)/i);
  }),
  result("HTML does not eagerly bind media", () => {
    assert.match(html, /<video id="trailer" preload="metadata" playsinline/);
    assert.doesNotMatch(html, /<video[^>]+\ssrc=/);
    assert.match(html, /<noscript>/);
  }),
  result("visible truthful controls and caption rail exist", () => {
    for (const id of ["play-toggle", "seek-back", "seek-forward", "caption-toggle", "caption-status", "caption-rail"]) {
      assert.match(html, new RegExp(`id="${id}"`));
    }
    assert.match(html, /aria-pressed="true"/);
    assert.match(js, /setAttribute\("aria-pressed", String\(state\.captionsOn\)\)/);
  }),
  result("fail-closed preflight hashes both inputs before enable", () => {
    assert.match(js, /crypto\.subtle\.digest\("SHA-256"/);
    assert.match(js, /Promise\.all\(\[\s*fetchExact\(EXPECTED\.media/);
    assert.match(js, /setControlsEnabled\(false\)/);
    assert.match(js, /setControlsEnabled\(true\)/);
  }),
  result("caption rail sanitizer handles WebVTT voice markup", () => {
    assert.match(js, /sanitizeWebVttText/);
    assert.match(js, /replace\(\/<v/);
    assert.match(js, /textContent = active\.length/);
    assert.match(js, /track\.track\.mode = "hidden"/);
  }),
  result("keyboard and focus behavior are present", () => {
    for (const key of ['key === " "', 'key === "k"', 'key === "arrowleft"', 'key === "j"', 'key === "arrowright"', 'key === "l"', 'key === "c"']) {
      assert.ok(js.includes(key), `missing ${key}`);
    }
    assert.match(css, /button:focus-visible/);
  }),
  result("responsive 390/320 and reduced-motion rules exist", () => {
    assert.match(css, /@media \(max-width: 700px\)/);
    assert.match(css, /@media \(max-width: 350px\)/);
    assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
    assert.match(css, /\.locked-state\[hidden\]\s*\{\s*display: none;/);
    assert.match(css, /button\s*\{[^}]*min-height: 3rem;/s);
  }),
  result("no autoplay and recovery paths exist", () => {
    assert.doesNotMatch(html, /\sautoplay(?:\s|>|=)/i);
    assert.match(js, /Retry verification/);
    assert.match(js, /Simulated media failure/);
    assert.match(js, /Simulated caption failure/);
    assert.match(js, /video\.addEventListener\("error"/);
  })
];

const report = {
  schema: "laidies.emq.trailer-v4-representative-player-maker-test.v1",
  executed_at: new Date().toISOString(),
  cwd: process.cwd(),
  harness_directory: here,
  inputs: {
    media: { path: mediaPath, sha256: sha256(mediaPath), bytes: fs.statSync(mediaPath).size },
    captions: { path: vttPath, sha256: sha256(vttPath), bytes: fs.statSync(vttPath).size, cue_count: cueCount, voice_tag_count: voiceTagCount }
  },
  checks,
  summary: {
    pass: checks.filter(check => check.result === "PASS").length,
    fail: checks.filter(check => check.result === "FAIL").length
  },
  limitation: "Deterministic source/hash tests are maker evidence, not independent admission or a human normal-speed full watch."
};

console.log(JSON.stringify(report, null, 2));
if (report.summary.fail) process.exitCode = 1;
