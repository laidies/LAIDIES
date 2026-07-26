#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const booth = read("games/dream-phone.html");
const game = read("games/dream-phone-game.html");
const homepage = read("index.html");
const siteIndex = JSON.parse(read("content/site/site-index.json"));
const funPack = read("games/fun-pack.html");
const welcomeTour = read("content/site/sv-welcome-tour.js");
const directory = read("content/site/sunnyvaile-directory.js");
const contentRegistry = JSON.parse(read("content/site/content-registry.json"));
const ledger = JSON.parse(read("games/data/dream-phone-claim-ledger.json"));
const state = JSON.parse(read("operations/product-stewards/dream-phone/state.json"));
const dateSectionStart = game.indexOf("const ISO_DATE=");
const dateSectionEnd = game.indexOf("function today()", dateSectionStart);
check(dateSectionStart >= 0 && dateSectionEnd > dateSectionStart, "runtime date contract is missing");
const dateContractSource = game.slice(dateSectionStart, dateSectionEnd);
const dateContract = new Function(`${dateContractSource}; return { dateValue, checkedDate, optionalCheckedDate };`)();

for (const file of [
  "operations/product-stewards/dream-phone/CHARTER.md",
  "operations/product-stewards/dream-phone/OPERATING-SPEC.md",
  "operations/product-stewards/dream-phone/state.json",
  "operations/product-stewards/dream-phone/backlog.md"
]) {
  check(fs.existsSync(path.join(root, file)), `missing steward record: ${file}`);
}

check(
  state.launchStatus === "PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL",
  "state must preserve exact launch boundary"
);
check(state.ownerDecision?.status === "UNRESOLVED", "owner product-model decision must remain unresolved");
check(state.currentCycle?.releaseAuthority === "NONE", "bounded candidate must not claim release authority");

check(/Experimental · scripted\./.test(booth), "Just Call must show its experiment status");
check(/does not know your situation/.test(booth), "Just Call must disclose lack of user context");
check(/does not provide personalized or professional advice/.test(booth), "Just Call must bound advice");
check(/last only in this page session/.test(booth), "Just Call must state session-only history/discoveries");
check(/not saved to an account or another device/.test(booth), "Just Call must deny account/cross-device persistence");
check(/id="dpJustCallTitle" tabindex="-1"/.test(booth), "Just Call destination must be programmatically focusable");
check(/target\.focus\(\)/.test(booth), "track changes must move focus");
check(!/<script[^>]+dream-phone-game\.js/.test(booth), "parked patron-saint engine must not load on booth");
check(!/window\.dreamPhoneEgg/.test(booth), "booth must not invoke parked reward engine");

check(/Experimental · scripted/.test(funPack), "Fun Pack entry must label the experiment");
check(/not personalized or professional advice/.test(funPack), "Fun Pack entry must preserve advice boundary");
check(/experimental Dream Phone/.test(welcomeTour), "welcome tour must label Dream Phone experimental");
check(/Experimental scripted phone booth/.test(directory), "town directory must label Dream Phone experimental");
const registryDreamPhone = contentRegistry.features.find((item) => item.name === "Dream Phone");
check(registryDreamPhone?.url === "games/dream-phone.html", "content registry must use canonical Dream Phone route");
check(
  !registryDreamPhone?.keywords.some((keyword) => /career advice|work advice|ai career/i.test(keyword)),
  "content registry must not classify Just Call as career/work advice"
);

check(ledger.schemaVersion === 1, "claim ledger schema version must be 1");
check(ledger.policy?.failClosedOnMissingOrMalformedLedger === true, "claim ledger must require fail-closed loading");
check(/fetch\("\.\/data\/dream-phone-claim-ledger\.json"/.test(game), "game must load the canonical claim ledger");
check(/Evidence record unavailable/.test(game), "game must expose an honest unavailable state");
check(!/tell us what needs correction/i.test(game), "game must not claim an unwired correction path");
check(!/every fact|all facts (?:are|is) real/i.test(game), "game must not make an unbounded all-facts claim");
check(/role="status" aria-live="polite" aria-atomic="true" tabindex="-1"/.test(game), "result must be announced and focusable");
check(/What new evidence would change your read/.test(game), "result must ask what evidence would change the read");
check(/Which clause most needed checking/.test(game), "result must require clause-level reflection");
check(/This is not mastery/.test(game), "final must not imply mastery");
check(!/That(?:'|’|&rsquo;)s the whole skill/i.test(game), "mastery overclaim must not return");
check(/item\.reviewBy<current/.test(game), "runtime must reject stale admitted-round review dates");
check(/ledger\.policy\.nextReviewBy<current/.test(game), "runtime must reject a stale ledger");
check(/checkedDate\(ledger\.checkedAt,current\)/.test(game), "runtime must reject future ledger checks");
check(/checkedDate\(item\.source\.checkedAt,current\)/.test(game), "runtime must reject future source checks");
check(/optionalCheckedDate\(item,"correctionDate",current\)/.test(game), "runtime must validate dated corrections");
check(/optionalCheckedDate\(item\.source,"checkedAt",current\)/.test(game), "runtime must reject future checkedAt on held-source records too");
check(!/Date\.parse/.test(game), "runtime must not use normalizing Date.parse for evidence admission");
check(/runtime\.evidence\.sourceUrls\[0\]===ledger\.source\.url/.test(game), "runtime must require exact ledger/source URL parity");
check(/claim\.text===ledger\.claims\[index\]\.text/.test(game), "runtime must require exact claim-text parity");

const siteDreamPhone = siteIndex.entries.find((item) => item.id === "act-dream-phone-game");
check(siteDreamPhone?.status === "preview", "site index must not call the experimental deck live");
check(/experimental scripted beta deck/i.test(siteDreamPhone?.summary || ""), "site index must disclose scripted beta status");
check(!/AI tells you|spotting a hallucination/i.test(siteDreamPhone?.summary || ""), "site index must not claim AI hallucination detection");
check(!/Calls, advice and Easter eggs/.test(homepage), "homepage must not call Dream Phone advice");
check(/Experimental scripted reflection/.test(homepage), "homepage card must disclose experiment");
check(/no personalized advice or saved rewards/.test(homepage), "homepage map and directory must preserve product limits");

const admitted = ledger.rounds.filter((round) => round.status === "ADMITTED");
const held = ledger.rounds.filter((round) => round.status === "HOLD");
check(admitted.length === 1, `expected one evidence-admitted beta round, found ${admitted.length}`);
check(held.length === 12, `expected twelve held rounds, found ${held.length}`);
check(admitted[0]?.id === "sky-dancers", "only Sky Dancers may be admitted");
const mortalKombat = ledger.rounds.find((item) => item.id === "mortal-kombat");
check(mortalKombat?.status === "HOLD", "Mortal Kombat chronology correction must remain on HOLD");
check(/four months.*five months after that/i.test(mortalKombat?.reason || ""), "Mortal Kombat HOLD must preserve the corrected two-interval chronology");
check(/four months after the first hearing and officially formed ESRB five months after that/.test(game), "runtime source must preserve corrected ESRB chronology");
check(!/officially formed ESRB one month later|formed five months after (?:that )?first hearing/.test(game), "admitted ESRB chronology error must not return");
check(dateContract.checkedDate(mortalKombat?.correctionDate, ledger.checkedAt) === mortalKombat?.correctionDate, "Mortal Kombat correction date must be valid and not future-dated");
check(mortalKombat?.claims.every((claim) => dateContract.checkedDate(claim.correctionDate, ledger.checkedAt) === claim.correctionDate), "corrected Mortal Kombat claims need valid correction dates");

for (const valid of ["2000-02-29", "2024-02-29", "2026-02-28", "2400-02-29", "2026-04-30", "2026-12-31"]) {
  check(dateContract.dateValue(valid) === valid, `strict calendar rejected valid date ${valid}`);
}
for (const invalid of [
  "2026-02-29", "2026-02-30", "2026-02-31", "2100-02-29",
  "2026-00-10", "2026-13-10", "2026-01-00", "2026-01-32",
  "2026-04-31", "2026-11-31", "0000-01-01", "2026-7-25", "2026-07-025"
]) {
  check(dateContract.dateValue(invalid) === null, `strict calendar admitted impossible date ${invalid}`);
}
check(dateContract.checkedDate("2026-07-25", "2026-07-25") === "2026-07-25", "UTC check date must allow same-day evidence");
check(dateContract.checkedDate("2026-07-26", "2026-07-25") === null, "UTC check date must reject future evidence");
check(dateContract.checkedDate("2024-02-29", "2024-02-29") === "2024-02-29", "valid leap-day evidence must remain admissible");

for (const round of admitted) {
  check(round.source?.primaryOrOfficial === true, `${round.id} lacks primary/official source admission`);
  check(Boolean(round.source?.checkedAt), `${round.id} lacks source checked date`);
  check(Boolean(round.reviewBy), `${round.id} lacks next review date`);
  check(Array.isArray(round.claims) && round.claims.length > 0, `${round.id} lacks claim-level records`);
  check(round.claims.every((claim) => claim.status === "ADMITTED"), `${round.id} contains an unadmitted claim`);
  check(game.includes(`id:"${round.id}"`), `${round.id} is absent from runtime source`);
  check(game.includes(round.source.url), `${round.id} runtime source URL differs from ledger`);
}

for (const round of held) {
  check(Boolean(round.reason), `${round.id} HOLD lacks a reason`);
}

if (failures.length) {
  console.error("DREAM PHONE CONTRACT FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("DREAM PHONE CONTRACT PASS");
console.log(`admitted_rounds=${admitted.map((round) => round.id).join(",")}`);
console.log(`held_rounds=${held.length}`);
console.log("status=PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL");
