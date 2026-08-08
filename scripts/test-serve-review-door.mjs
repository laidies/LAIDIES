#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { requestHasToken, safeRepositoryFile } from "./serve-review-door.mjs";

const root = process.cwd();
const token = "fixture-token";
assert.equal(requestHasToken("/content/candidate/review.html", "", token), false, "raw review path must not authenticate");
assert.equal(requestHasToken(`/__laidies_review/${token}/review.html`, "", token), true, "ticket path must authenticate");
assert.equal(requestHasToken("/assets/item.png", `laidies_review_token=${token}`, token), true, "ticket cookie must authorize candidate assets");
assert.equal(safeRepositoryFile(root, `/__laidies_review/${token}/review.html`, token, "scripts/test-serve-review-door.mjs"), path.join(root, "scripts/test-serve-review-door.mjs"));
assert.equal(safeRepositoryFile(root, `/__laidies_review/${token}/../../../../etc/passwd`, token, "scripts/test-serve-review-door.mjs"), null, "path escape must fail closed");

const blocked = spawnSync(process.execPath, [
  "scripts/serve-review-door.mjs", "--type", "content", "--work-order", "LCWO-001",
  "content/library-books/pilots/ai-fundamentals-101-v2/review.html", "--port", "18991"
], { cwd: root, encoding: "utf8", timeout: 10000 });
assert.equal(blocked.status, 1);
assert.match(blocked.stderr, /REVIEW DOOR SERVER BLOCKED/);
assert.match(blocked.stderr, /work order is not release-ready/);
console.log("REVIEW DOOR SERVER CALIBRATION PASS raw_path=denied token_path=allowed escape=denied known_bad=blocked_before_listen");
