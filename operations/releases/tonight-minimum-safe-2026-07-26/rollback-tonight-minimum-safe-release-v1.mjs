import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const BASELINE = "c5d72fadc0cc873d1d1bfdabdb79a3aea9c773fb";
const execute = process.argv.includes("--execute");
const manifestPath = path.join(
  root,
  "operations/releases/tonight-minimum-safe-2026-07-26/tonight-minimum-safe-release-v1-files.json"
);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();

execFileSync("git", ["merge-base", "--is-ancestor", BASELINE, head], {
  cwd: root,
  stdio: "ignore",
});
assert.equal(manifest.baseline, BASELINE, "rollback manifest baseline mismatch");
for (const file of manifest.sourceFiles) {
  assert.equal(
    sha(fs.readFileSync(path.join(root, file.path))),
    file.sha256,
    `rollback refuses drifted candidate file: ${file.path}`
  );
}

if (!execute) {
  console.log(`ROLLBACK PREFLIGHT PASS files=${manifest.sourceFiles.length} execute=false`);
  process.exit(0);
}

for (const file of manifest.sourceFiles) {
  const absolute = path.join(root, file.path);
  if (file.priorSha256 === null) {
    fs.rmSync(absolute);
    continue;
  }
  const prior = execFileSync("git", ["show", `${BASELINE}:${file.path}`], { cwd: root });
  assert.equal(sha(prior), file.priorSha256, `${file.path}: baseline bytes drift`);
  fs.writeFileSync(absolute, prior);
}
console.log(`ROLLBACK EXECUTED files=${manifest.sourceFiles.length} baseline=${BASELINE}`);
