import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../games/fairy-godmother.html", import.meta.url), "utf8");
const provider = await readFile(new URL("../worker-fairy-godmother/src/advice-provider.js", import.meta.url), "utf8");

function timeoutValue(source, name) {
  const match = source.match(new RegExp(`const ${name} = (\\d+)`));
  assert.ok(match, `${name} is missing`);
  return Number(match[1]);
}

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
assert.match(page, /id="fairyWaitStatus" role="status" aria-live="polite" aria-atomic="true" hidden/);
assert.match(page, /ADVICE_TIMEOUT_MS = 35000/);
assert.match(page, /ADVICE_PROGRESS_MS = 8000/);
assert.match(page, /ADVICE_LONG_PROGRESS_MS = 18000/);
assert.match(page, /waitStatusTimers\.forEach/);
assert.match(page, /request was stopped and nothing was counted/);
assert.match(page, /async function fetchWorkerResponse\(payload\)/);
assert.match(page, /signal: controller\.signal/);
assert.match(page, /const response = await fetchWorkerResponse\(\{[\s\S]*revision:/);
assert.match(page, /Your existing draft was not changed/);
assert.doesNotMatch(page, /subscriberEmail\s*:/);
const browserTimeout = timeoutValue(page, "ADVICE_TIMEOUT_MS");
const providerTimeout = timeoutValue(provider, "ADVICE_TIMEOUT_MS");
assert.ok(browserTimeout >= providerTimeout + 3000,
  "browser must wait long enough to render the Worker's bounded failure response");

const successBranch = page.indexOf('result.data.type === "case_success"');
const successSpend = page.indexOf("incrementFreeWishesUsed();", successBranch);
const typedOutcome = page.indexOf("showTypedOutcome(result.data);", successBranch);
assert.ok(successBranch > -1 && successSpend > successBranch && typedOutcome > successSpend);

console.log("PASS FAiRY page typed/legacy contract");
