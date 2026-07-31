import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../games/fairy-godmother.html", import.meta.url), "utf8");

assert.match(page, /window\.LAIDIES_FAIRY_WORKER_URL/);
assert.match(page, /result\.data\.type === "case_success"/);
assert.match(page, /data\.type === "revision_success"/);
assert.match(page, /data\.answer && data\.answer\.deliverable/);
assert.match(page, /USING_LEGACY_ENDPOINT && data && data\.response/);
assert.match(page, /function showTypedOutcome\(data\)/);
assert.match(page, /data\.sourcePlan && Array\.isArray\(data\.sourcePlan\.criteria\)/);
assert.match(page, /return \{ contract: "legacy", markdown: markdown \}/);
assert.match(page, /USING_LEGACY_ENDPOINT && energyKey === "fairy"/);
assert.match(page, /\? "auto"\s*:\s*energyKey/);
assert.match(page, /textContent = String\(value\)/);
assert.match(page, /id="adviceScroll" role="region"/);
assert.match(page, /aria-live="polite" aria-labelledby="scrollHeader" tabindex="-1"/);
assert.match(page, /scrollEl\.focus\(\{ preventScroll: true \}\)/);
assert.match(page, /prefers-reduced-motion: reduce/);
assert.doesNotMatch(page, /subscriberEmail\s*:/);

const successBranch = page.indexOf('result.data.type === "case_success"');
const successSpend = page.indexOf("incrementFreeWishesUsed();", successBranch);
const typedOutcome = page.indexOf("showTypedOutcome(result.data);", successBranch);
assert.ok(successBranch > -1 && successSpend > successBranch && typedOutcome > successSpend);

console.log("PASS FAiRY page typed/legacy contract");
