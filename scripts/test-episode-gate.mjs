#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-episode-gate-"));
const write = (relative, content, mode = 0o644) => {
  const target = path.join(fixture, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  fs.chmodSync(target, mode);
};
const copy = (relative) => {
  const target = path.join(fixture, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, relative), target);
  fs.chmodSync(target, fs.statSync(path.join(root, relative)).mode);
};
const run = (...args) => spawnSync("bash", [path.join(fixture, "operations/engine/gate.sh"), "2", ...args], { encoding: "utf8" });
const runRaw = (...args) => spawnSync("bash", [path.join(fixture, "operations/engine/gate.sh"), ...args], { encoding: "utf8" });
const stub = "#!/usr/bin/env bash\nexit 0\n";
const plain = (value) => value.replace(/\x1b\[[0-9;]*m/g, "");

try {
  copy("operations/engine/gate.sh");
  write("operations/check-episode.sh", "#!/usr/bin/env bash\necho '════ result: 0 fail · 0 warn ════'\nexit 0\n", 0o755);
  for (const name of ["check-inputs.sh", "check-must-match.sh", "check-prose-voice.sh"]) write(`operations/engine/checks/${name}`, stub, 0o755);
  for (const name of ["check-episode-cues.js", "check-local-links.js", "check-inline-js.js", "check-town.js"]) write(`scripts/${name}`, "process.exit(0);\n");

  for (const scope of [[], ["--scope", "episode"], ["--scope", "site"], ["--scope", "all"]]) {
    const result = run(...scope);
    assert.equal(result.status, 0, `valid scope ${scope.join(" ") || "default"} must pass: ${result.stderr}${result.stdout}`);
    assert.match(result.stdout, /VERDICT: PASS/);
  }
  for (const args of [["--scope", "typo"], ["--scope"], ["--unknown"]]) {
    const result = run(...args);
    assert.equal(result.status, 2, `invalid arguments ${args.join(" ")} must reject`);
    assert.match(result.stderr, /gate usage error/);
    assert.doesNotMatch(result.stdout, /VERDICT: PASS/);
  }
  assert.equal(runRaw("02", "--scope", "episode").status, 0, "zero-padded episode numbers remain supported");
  for (const args of [[], ["zero"], ["0"], ["2junk"], ["12x"]]) {
    const result = runRaw(...args);
    assert.notEqual(result.status, 0, `invalid episode argument ${args.join(" ") || "missing"} must reject`);
    assert.doesNotMatch(result.stdout, /VERDICT: PASS/);
  }

  fs.rmSync(path.join(fixture, "operations/engine/checks/check-inputs.sh"));
  let result = run("--scope", "episode");
  assert.equal(result.status, 1, "a missing required checker must fail the gate");
  assert.match(plain(result.stdout), /FAIL\s+inputs/);
  write("operations/engine/checks/check-inputs.sh", stub, 0o755);

  write("operations/check-episode.sh", "#!/usr/bin/env bash\necho '════ result: 0 fail · 0 warn ════'\nexit 1\n", 0o755);
  result = run("--scope", "episode");
  assert.equal(result.status, 1, "a structural checker nonzero exit must override a misleading zero-fail summary");
  assert.match(plain(result.stdout), /FAIL\s+structure/);
  assert.match(result.stdout, /exited 1; reject its summary/);

  const inputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-episode-inputs-"));
  try {
    const inputCheck = path.join(root, "operations/engine/checks/check-inputs.sh");
    fs.mkdirSync(path.join(inputRoot, "content/episodes"), { recursive: true });
    fs.mkdirSync(path.join(inputRoot, "operations/audio"), { recursive: true });
    fs.writeFileSync(path.join(inputRoot, "content/episodes/episode-02.canon.md"), `${"canon ".repeat(200)}\n`);
    fs.writeFileSync(path.join(inputRoot, "operations/audio/episode-02-elevenlabs-v3-tagged.txt"), `${"narration ".repeat(300)}\n`);
    const validInputs = spawnSync("bash", [inputCheck, "2"], { env: { ...process.env, ENGINE_ROOT: inputRoot }, encoding: "utf8" });
    assert.equal(validInputs.status, 0, "inputs meeting the length thresholds must pass this mechanical check");
    fs.writeFileSync(path.join(inputRoot, "content/episodes/episode-02.canon.md"), "stub\n");
    const stubInput = spawnSync("bash", [inputCheck, "2"], { env: { ...process.env, ENGINE_ROOT: inputRoot }, encoding: "utf8" });
    assert.equal(stubInput.status, 1, "a stub canonical input must fail");
    fs.rmSync(path.join(inputRoot, "content/episodes/episode-02.canon.md"));
    const missingInputs = spawnSync("bash", [inputCheck, "2"], { env: { ...process.env, ENGINE_ROOT: inputRoot }, encoding: "utf8" });
    assert.equal(missingInputs.status, 1, "missing canonical inputs must fail");
    assert.match(missingInputs.stdout, /MISSING/);
  } finally { fs.rmSync(inputRoot, { recursive: true, force: true }); }

  const proseRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-episode-prose-"));
  try {
    const mustMatch = path.join(root, "operations/engine/checks/check-must-match.sh");
    const proseVoice = path.join(root, "operations/engine/checks/check-prose-voice.sh");
    fs.mkdirSync(path.join(proseRoot, "content/episodes"), { recursive: true });
    fs.mkdirSync(path.join(proseRoot, "operations/audio"), { recursive: true });
    fs.mkdirSync(path.join(proseRoot, "content/issues"), { recursive: true });
    fs.writeFileSync(path.join(proseRoot, "content/episodes/episode-02.canon.md"), "## MUST-MATCH\n- Exact line\n");
    fs.writeFileSync(path.join(proseRoot, "operations/audio/episode-02-elevenlabs-v3-tagged.txt"), "Clean reader-facing prose.\n");
    fs.writeFileSync(path.join(proseRoot, "content/issues/issue-02.md"), "Clean article prose.\n");
    assert.equal(spawnSync("bash", [mustMatch, "2"], { env: { ...process.env, ENGINE_ROOT: proseRoot }, encoding: "utf8" }).status, 0, "a nonempty MUST-MATCH block must pass");
    assert.equal(spawnSync("bash", [proseVoice, "2"], { env: { ...process.env, ENGINE_ROOT: proseRoot }, encoding: "utf8" }).status, 0, "clean reader-facing prose must pass");
    fs.writeFileSync(path.join(proseRoot, "content/episodes/episode-02.canon.md"), "# No required strings\n");
    assert.equal(spawnSync("bash", [mustMatch, "2"], { env: { ...process.env, ENGINE_ROOT: proseRoot }, encoding: "utf8" }).status, 1, "a missing MUST-MATCH block must fail");
    fs.writeFileSync(path.join(proseRoot, "content/episodes/episode-02.canon.md"), "## MUST-MATCH\n\n");
    assert.equal(spawnSync("bash", [mustMatch, "2"], { env: { ...process.env, ENGINE_ROOT: proseRoot }, encoding: "utf8" }).status, 1, "an empty MUST-MATCH block must fail");
    fs.writeFileSync(path.join(proseRoot, "content/issues/issue-02.md"), "| Comparison | Result |\n| --- | --- |\n");
    assert.equal(spawnSync("bash", [proseVoice, "2"], { env: { ...process.env, ENGINE_ROOT: proseRoot }, encoding: "utf8" }).status, 1, "a forbidden prose table must fail");
  } finally { fs.rmSync(proseRoot, { recursive: true, force: true }); }

  const siteRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-site-checks-"));
  try {
    for (const name of ["check-local-links.js", "check-inline-js.js"]) {
      const target = path.join(siteRoot, "scripts", name);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(root, "scripts", name), target);
    }
    const localLinks = path.join(siteRoot, "scripts/check-local-links.js");
    const inlineJs = path.join(siteRoot, "scripts/check-inline-js.js");
    fs.writeFileSync(path.join(siteRoot, "index.html"), '<a href="present.html">Present</a><script>const valid = true;</script>\n');
    fs.writeFileSync(path.join(siteRoot, "present.html"), "<p>Present</p>\n");
    assert.equal(spawnSync("node", [localLinks], { encoding: "utf8" }).status, 0, "an existing local target must pass");
    assert.equal(spawnSync("node", [inlineJs], { encoding: "utf8" }).status, 0, "valid inline JavaScript must pass");
    fs.writeFileSync(path.join(siteRoot, "index.html"), '<a href="missing.html">Missing</a><script>const =;</script>\n');
    assert.equal(spawnSync("node", [localLinks], { encoding: "utf8" }).status, 1, "a missing local target must fail");
    assert.equal(spawnSync("node", [inlineJs], { encoding: "utf8" }).status, 1, "invalid inline JavaScript must fail");
    fs.rmSync(path.join(siteRoot, "index.html"));
    fs.rmSync(path.join(siteRoot, "present.html"));
    assert.equal(spawnSync("node", [localLinks], { encoding: "utf8" }).status, 1, "zero live pages must fail local-link validation");
    assert.equal(spawnSync("node", [inlineJs], { encoding: "utf8" }).status, 1, "zero live pages must fail inline-JS validation");
  } finally { fs.rmSync(siteRoot, { recursive: true, force: true }); }

  const cueRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-episode-cues-"));
  try {
    fs.mkdirSync(path.join(cueRoot, "content/episodes"), { recursive: true });
    fs.mkdirSync(path.join(cueRoot, "assets"), { recursive: true });
    fs.writeFileSync(path.join(cueRoot, "assets/title.png"), "title frame\n");
    fs.writeFileSync(path.join(cueRoot, "content/episodes/episode-trailer-cues.json"), '{"title":{"cues":[{"t":0,"src":"/assets/title.png"}]}}\n');
    const cue = path.join(root, "scripts/check-episode-cues.js");
    const explicitRoot = spawnSync("node", [cue, cueRoot], { encoding: "utf8" });
    assert.equal(explicitRoot.status, 0, `an explicit artifact root without --episode must be used: ${explicitRoot.stderr}`);
    assert.match(explicitRoot.stdout, /1 cue sheets have valid order/);
    const missingSelected = spawnSync("node", [cue, cueRoot, "--episode", "99"], { encoding: "utf8" });
    assert.equal(missingSelected.status, 1, "a selected missing cue sheet must fail");
    assert.match(missingSelected.stderr, /no cue sheet found for episode 99/);
    fs.writeFileSync(path.join(cueRoot, "content/episodes/episode-trailer-cues.json"), '{"cues":[]}\n');
    assert.equal(spawnSync("node", [cue, cueRoot], { encoding: "utf8" }).status, 1, "a present cue sheet with zero cues must fail");
    fs.writeFileSync(path.join(cueRoot, "content/episodes/episode-trailer-cues.json"), '{"cues":[{"t":1,"src":"/assets/title.png"},{"t":0,"src":"/assets/missing.png"}]}\n');
    const badCues = spawnSync("node", [cue, cueRoot], { encoding: "utf8" });
    assert.equal(badCues.status, 1, "out-of-order and missing cue targets must fail");
    assert.match(badCues.stderr, /earlier than the prior cue/);
    assert.match(badCues.stderr, /missing assets\/missing\.png/);
  } finally { fs.rmSync(cueRoot, { recursive: true, force: true }); }

  console.log("EPISODE GATE TEST PASS scopes=4 invalid_scope_or_option=3 invalid_episode=5 zero_padded_episode=1 missing_checker=1 structural_exit=1 inputs=3 must_match=3 prose_voice=2 site_checks=6 cue_checks=4");
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
