#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { compileAdmissionManifest } from "./compile-library-admission.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), "utf8");
const sourceText = read("content/library-books/verification-rulebook.json");
const book = JSON.parse(sourceText);
const claims = JSON.parse(read("content/library-books/verification-rulebook.claims.json"));
const evals = JSON.parse(read("content/library-books/verification-rulebook.evals.v1.json"));
const renderedPath = "content/library-books/rendered/verification-rulebook.html";
const html = read(renderedPath);
const library = read("library.html");
const siteIndex = JSON.parse(read("content/site/site-index.json"));
const admissionManifest = JSON.parse(read("content/library-books/admission-manifest.json"));
const failures = [];

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

check(book.status === "HOLD", "canonical status must remain HOLD");
check(book.chapters?.length === 7, "canonical source must contain seven chapters");
check(new Set(book.chapters.map((chapter) => chapter.slug)).size === 7, "chapter slugs must be unique");
check(book.opening?.options?.filter((option) => option.correct).length === 1, "opening interaction needs one deterministic keyed answer");
check(JSON.stringify(book.chapters.map((chapter) => chapter.interaction.type)) === JSON.stringify(["classification", "artifact-match", "repair", "source-compare", "claim-table", "dual-case", "stakes"]), "chapter interaction jobs drifted from the locked packet");
check(book.chapters[0].interaction.items?.length === 8, "chapter 1 must classify eight lines");
check(book.chapters[1].interaction.items?.length === 5, "chapter 2 must match five artifacts");
check(book.chapters[2].interaction.items?.length === 3, "chapter 3 must repair three claims");
check(book.chapters[3].interaction.options?.length === 3 && book.chapters[3].interaction.minimumReasonLength && book.chapters[3].interaction.minimumActionLength, "chapter 4 must compare three sources with reason and action");
check(book.chapters[4].interaction.rows?.length === 3 && book.chapters[4].interaction.minimumReasonLength, "chapter 5 must complete a claim table and reasoning");
check(book.chapters[5].interaction.cases?.length === 2, "chapter 6 must include freshness and provenance cases");
check(book.chapters[6].interaction.items?.length === 3, "chapter 7 must include low, material and high stakes");
check(book.transferChallenge?.minimumClaimLength >= 40 && book.transferChallenge?.minimumActionLength >= 40 && book.transferChallenge?.minimumLimitationLength >= 40, "closing transfer must capture structured claim, evidence-action and limitation reasoning before reveal");
check(book.promptCard?.intro?.includes("not a truth machine"), "prompt must be labelled as risk reduction, not certification");
check(book.promptCard?.warning?.includes("open the source yourself"), "prompt must require external source inspection");
check(/not legal, medical, financial, HR or safety advice/i.test(sourceText), "high-stakes product boundary is missing");
check(/does not prove|does not decide|not a truth verdict/i.test(sourceText), "provenance/truth distinction is missing");
check(/Grounding[\s\S]{0,300}still be weak, stale, out of scope or misread/i.test(sourceText), "grounding/truth distinction is missing");

const claimIds = claims.claims.map((claim) => claim.id);
check(claims.ledgerStatus === "CANDIDATE_UNDER_INDEPENDENT_REVIEW", "claim ledger must not imply approval");
check(claims.generatedFromSha256 === crypto.createHash("sha256").update(sourceText).digest("hex"), "claim ledger is not generated from the current canonical source");
check(JSON.stringify(claims.claims) === JSON.stringify(book.claimRegistry), "derived claim ledger drifted from canonical claim registry");
check(new Set(claimIds).size === claimIds.length, "claim IDs must be unique");
for (const claim of claims.claims) {
  for (const field of ["id", "publicWording", "claimType", "riskTier", "sourceIds", "supportLocation", "publicationVersion", "accessed", "scope", "qualification", "status", "nextReview", "history"]) {
    check(claim[field] !== undefined && claim[field] !== "", `${claim.id || "unknown claim"} missing ${field}`);
  }
}
const ledgerSourceIds = new Set(claims.sources.map((source) => source.id));
for (const claim of claims.claims) {
  for (const sourceId of claim.sourceIds) check(ledgerSourceIds.has(sourceId), `${claim.id} references missing source ${sourceId}`);
}
for (const source of book.sources) check(ledgerSourceIds.has(source.id), `book source ${source.id} is not bound in claim ledger`);
check(!sourceText.includes("SRC-C2PA-2-2") && sourceText.includes("SRC-C2PA-2-4"), "C2PA source must be rebound to current 2.4");
const c2pa = book.claimRegistry.find((claim) => claim.id === "VR-C007");
check(c2pa?.publicationVersion === "C2PA Specifications 2.4" && c2pa.history?.some((item) => item.change.includes("2.2")), "C2PA correction history/version is incomplete");
const c2paSource = book.sources.find((source) => source.id === "SRC-C2PA-2-4");
check(c2paSource?.url === "https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html", "C2PA reader evidence URL must resolve to the full 2.4 specification");
check(c2paSource?.versionIndexUrl === "https://spec.c2pa.org/specifications/specifications/2.4/index.html", "C2PA monitor must retain the separate version index");
const lateral = book.claimRegistry.find((claim) => claim.id === "VR-C006");
check(lateral?.sourceIds?.includes("SRC-COR-LATERAL") && /leaving the webpage/.test(lateral.supportLocation), "lateral-reading claim is not bound to an entailing lesson passage");

check(evals.cases?.length === 18, "evaluation suite must contain exactly 18 cases");
const expectedCounts = { explanation_distinction: 4, application: 6, misconception_resistance: 4, transfer: 4 };
for (const [category, count] of Object.entries(expectedCounts)) {
  check(evals.cases.filter((item) => item.category === category).length === count, `${category} must contain ${count} cases`);
}
check(new Set(evals.cases.map((item) => item.id)).size === 18, "evaluation case IDs must be unique");
check(evals.cases.every((item) => item.mustInclude?.length && item.diagnosticAction && item.failIf?.length), "every evaluation needs reasoning, evidence action and fail conditions");
const canonicalVerdicts = new Set(book.canonicalVerdicts);
for (const item of evals.cases) {
  check(canonicalVerdicts.has(item.evidenceVerdict), `${item.id} uses non-canonical evidence verdict ${item.evidenceVerdict}`);
  check(Boolean(item.qualification), `${item.id} is missing qualification`);
  check(Boolean(item.requiredAction), `${item.id} is missing requiredAction`);
  check(!Object.hasOwn(item, "expectedVerdict"), `${item.id} still conflates expectedVerdict`);
}
const e08 = evals.cases.find((item) => item.id === "VR-E08");
check(e08?.evidenceVerdict === "SUPPORTED" && /(significance|meaningful improvement).*UNRESOLVED/.test(e08.qualification), "E08 must split arithmetic support from unresolved significance");
const e18 = evals.cases.find((item) => item.id === "VR-E18");
check(e18?.evidenceVerdict === "UNRESOLVED" && /Do not act/.test(e18.requiredAction), "E18 must separate evidence verdict from stop/escalate action");
const primaryLimit = evals.cases.find((item) => item.id === "VR-E13");
check(/primary and official/.test(primaryLimit?.prompt || "") && /method, incentive and applicability/.test(primaryLimit?.diagnosticAction || ""), "suite must test primary-source limitations");

const sourceSha = crypto.createHash("sha256").update(sourceText).digest("hex");
const contentVersion = `sha256-${sourceSha}`;
const artifactSha = crypto.createHash("sha256").update(html).digest("hex");
check(html.includes(`content="/content/library-books/verification-rulebook.json"`), "rendered page does not name canonical source");
check(html.includes(`content="${sourceSha}"`), "rendered page hash does not bind canonical source");
check(html.includes(`name="laidies:content-version" content="${contentVersion}"`), "rendered page content version does not bind canonical source hash");
check(claims.contentVersion === contentVersion, "derived claim ledger content version does not bind canonical source hash");
check(html.includes("status HOLD"), "rendered candidate does not visibly retain HOLD");
check(html.includes('meta name="robots" content="noindex,nofollow"'), "held candidate must be noindex");
check((html.match(/<h1\b/g) || []).length === 1, "rendered candidate must have exactly one h1");
const renderedIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check(new Set(renderedIds).size === renderedIds.length, "rendered candidate must not contain duplicate IDs");
for (let number = 1; number <= 7; number += 1) check(html.includes(`Chapter ${number} of 7`), `rendered chapter ${number} is missing`);
for (const required of ["role=\"status\"", "aria-live=\"polite\"", "prefers-reduced-motion", "@media print", "Report a correction", "Source drawer", "What can change"]) {
  check(html.includes(required), `rendered accessibility/metadata marker missing: ${required}`);
}
check(html.includes("[id]{scroll-margin-top:5.5rem}"), "sticky anchor targets need scroll margin");
check(!html.includes("feedback.focus"), "live-region strategy must announce in place without ineffective focus()");
check(!html.includes("Reasoning check passed"), "unassessed prose must never be labelled reasoning passed");
check(!html.includes('data-result="correct"'), "unassessed prose must never receive a correct result state");
check(html.includes("not semantically scored") && html.includes("Self-check recorded"), "rendered self-check truth language is missing");
const policySource = html.match(/function eco01SubmissionState\(\{ fieldsValid, keyedMatch, prose \}\) \{[\s\S]*?\n    \}/)?.[0];
check(Boolean(policySource), "interaction submission policy is missing");
if (policySource) {
  const policy = vm.runInNewContext(`(${policySource})`);
  const nonsenseState = policy({ fieldsValid: true, keyedMatch: true, prose: "purple toaster ".repeat(12) });
  check(nonsenseState === "self-check-ready", `length-valid nonsense must remain self-check-ready, received ${nonsenseState}`);
  check(!["correct", "passed", "keyed-match"].includes(nonsenseState), "length-valid nonsense must never receive a semantic correctness state");
}
for (const claim of book.claimRegistry) {
  const escapedWording = claim.publicWording.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  check(html.includes(`data-claim-id="${claim.id}"`) || html.includes(`id="ledger-${claim.id}"`), `${claim.id} is not rendered`);
  check(html.includes(escapedWording), `${claim.id} exact public wording is not rendered`);
  check(html.includes(`Report a correction for ${claim.id}`), `${claim.id} correction link is not rendered`);
  for (const sourceId of claim.sourceIds) check(html.includes(sourceId), `${claim.id} source ${sourceId} is not rendered`);
  check(html.includes(claim.qualification.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")), `${claim.id} qualification is not rendered`);
}
check(!/<img\b[^>]*alt=["'][^"']*text/i.test(html), "examples must not rely on images of text");

const admissionCandidate = admissionManifest.books?.find((row) => row.book_id === "how-to-check");
check(Boolean(admissionCandidate), "held admission proposal is missing how-to-check");
if (admissionCandidate) {
  check(admissionManifest.authority === "EDITORIAL_PROPOSAL_ONLY_ZERO_BOOKS_ADMITTED", "manifest authority must retain zero-admitted truth");
  check(admissionCandidate.status === "hold", "Verification Rulebook proposal must remain HOLD");
  check(admissionCandidate.correction_state === "blocked-no-triage-ledger", "Verification Rulebook correction gate must remain blocked");
  check(admissionCandidate.source_path === `/${renderedPath}`, "held proposal source_path does not bind the deterministic rendered artifact");
  check(admissionCandidate.content_version === contentVersion, "held proposal content_version does not bind the canonical source hash");
  check(admissionCandidate.artifact_sha256 === artifactSha, "held proposal artifact_sha256 does not bind the rendered bytes");
  check(Object.keys(compileAdmissionManifest(admissionManifest, { root: ROOT })).length === 0, "held proposal must compile to zero admitted books");
}

const shelfMatch = library.match(/\{id:'how-to-check'[\s\S]*?\},\n/);
check(Boolean(shelfMatch), "Library how-to-check record is missing");
if (shelfMatch) {
  check(/soon:'AFTER REVIEW'/.test(shelfMatch[0]), "Library shelf must be non-clickable preview/hold");
  check(!/\bsrc:|\bbody:|\btoc:/.test(shelfMatch[0]), "held shelf record must not expose candidate or teaser as book body");
  check(/independent learning, accuracy, brand and accessibility review/.test(shelfMatch[0]), "shelf preview must name outstanding review");
}
const jeeves = siteIndex.entries?.find((item) => item.id === "ref-verification");
check(Boolean(jeeves), "Miss Jeeves Rulebook record is missing");
if (jeeves) {
  check(jeeves.status === "preview", "Miss Jeeves Rulebook status must be preview");
  check(jeeves.url === "/library.html", "Miss Jeeves must not route around HOLD to candidate HTML");
  check(/not yet an approved or available book/i.test(jeeves.summary), "Miss Jeeves summary must state hold truthfully");
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eco01-invalid-"));
const badRel = path.relative(ROOT, path.join(tempDir, "bad.json"));
const outRel = path.relative(ROOT, path.join(tempDir, "bad.html"));
const ledgerRel = path.relative(ROOT, path.join(tempDir, "bad-ledger.json"));
const bad = { ...book, status: "AVAILABLE", chapters: book.chapters.slice(0, 1) };
fs.writeFileSync(path.join(tempDir, "bad.json"), JSON.stringify(bad));
const rejected = spawnSync(process.execPath, ["scripts/render-eco01-verification-rulebook.mjs"], {
  cwd: ROOT,
  env: { ...process.env, ECO01_SOURCE: badRel, ECO01_OUTPUT: outRel, ECO01_LEDGER_OUTPUT: ledgerRel },
  encoding: "utf8"
});
check(rejected.status !== 0, "renderer must fail closed on an invalid/non-HOLD source");
check(!fs.existsSync(path.join(tempDir, "bad.html")), "failed render must not emit plausible fallback HTML");
check(!fs.existsSync(path.join(tempDir, "bad-ledger.json")), "failed render must not emit a plausible ledger");
const futureIndex = path.join(tempDir, "c2pa-future.html");
fs.writeFileSync(futureIndex, "<title>C2PA Specifications 2.5</title>");
const staleVersion = spawnSync(process.execPath, ["scripts/check-eco01-source-versions.mjs", "--fixture", futureIndex], { cwd: ROOT, encoding: "utf8" });
check(staleVersion.status !== 0, "C2PA version monitor must fail when official index exposes a newer version");
const deterministicOutput = path.join(tempDir, "verification-rulebook.html");
const deterministicLedger = path.join(tempDir, "verification-rulebook.claims.json");
const reproducible = spawnSync(process.execPath, ["scripts/render-eco01-verification-rulebook.mjs"], {
  cwd: ROOT,
  env: {
    ...process.env,
    ECO01_OUTPUT: path.relative(ROOT, deterministicOutput),
    ECO01_LEDGER_OUTPUT: path.relative(ROOT, deterministicLedger)
  },
  encoding: "utf8"
});
check(reproducible.status === 0, `renderer must reproduce the immutable artifact: ${reproducible.stderr || reproducible.stdout}`);
if (reproducible.status === 0) {
  check(fs.readFileSync(deterministicOutput, "utf8") === html, "rendered artifact drifts from its canonical JSON renderer");
  check(fs.readFileSync(deterministicLedger, "utf8") === read("content/library-books/verification-rulebook.claims.json"), "derived claim ledger drifts from canonical JSON renderer");
}

function compileSimulatedPromotion(row, fixtureRoot = ROOT) {
  const canonicalRelative = "content/library-books/verification-rulebook.json";
  const canonicalBytes = fs.readFileSync(path.join(fixtureRoot, canonicalRelative));
  const canonicalSha = crypto.createHash("sha256").update(canonicalBytes).digest("hex");
  const expectedVersion = `sha256-${canonicalSha}`;
  const expectedPath = "/content/library-books/rendered/verification-rulebook.html";
  if (row.source_path !== expectedPath) throw new Error("promotion source path drift");
  if (row.content_version !== expectedVersion) throw new Error("promotion canonical source/version drift");
  const artifact = fs.readFileSync(path.join(fixtureRoot, row.source_path.slice(1)));
  const actualArtifactSha = crypto.createHash("sha256").update(artifact).digest("hex");
  if (row.artifact_sha256 !== actualArtifactSha) throw new Error("promotion rendered artifact/hash drift");
  const artifactText = artifact.toString("utf8");
  if (!artifactText.includes(`name="laidies:canonical-source" content="/${canonicalRelative}"`)) {
    throw new Error("promotion canonical source path metadata drift");
  }
  if (!artifactText.includes(`name="laidies:canonical-source-sha256" content="${canonicalSha}"`)) {
    throw new Error("promotion canonical source hash metadata drift");
  }
  const compiled = compileAdmissionManifest({
    books: [{ ...row, status: "available", correction_state: "clear" }]
  }, { root: fixtureRoot });
  if (!compiled[row.book_id]) throw new Error("simulated promotion did not compile");
  return compiled[row.book_id];
}

function promotionMustReject(row, fixtureRoot, expectedMessage) {
  try {
    compileSimulatedPromotion(row, fixtureRoot);
    check(false, `simulated promotion must reject ${expectedMessage}`);
  } catch (error) {
    check(error.message.includes(expectedMessage), `simulated promotion rejected for the wrong reason: ${error.message}`);
  }
}

if (admissionCandidate) {
  const promoted = compileSimulatedPromotion(admissionCandidate);
  check(promoted.sourcePath === admissionCandidate.source_path, "simulated promotion did not retain the exact held candidate path");
  check(promoted.contentVersion === admissionCandidate.content_version, "simulated promotion did not retain the exact held candidate version");
  check(promoted.artifactSha256 === admissionCandidate.artifact_sha256, "simulated promotion did not retain the exact held candidate bytes");

  const fixtureRoot = path.join(tempDir, "promotion-fixture");
  fs.mkdirSync(path.join(fixtureRoot, "content/library-books/rendered"), { recursive: true });
  fs.copyFileSync(path.join(ROOT, "content/library-books/verification-rulebook.json"), path.join(fixtureRoot, "content/library-books/verification-rulebook.json"));
  fs.copyFileSync(path.join(ROOT, renderedPath), path.join(fixtureRoot, renderedPath));

  fs.appendFileSync(path.join(fixtureRoot, "content/library-books/verification-rulebook.json"), "\n");
  promotionMustReject(admissionCandidate, fixtureRoot, "canonical source/version drift");
  try {
    compileAdmissionManifest({ books: [admissionCandidate] }, { root: fixtureRoot });
    check(false, "held candidate compiler must reject canonical source drift");
  } catch (error) {
    check(error.message.includes("canonical source hash"), `held candidate source drift rejected for the wrong reason: ${error.message}`);
  }
  fs.copyFileSync(path.join(ROOT, "content/library-books/verification-rulebook.json"), path.join(fixtureRoot, "content/library-books/verification-rulebook.json"));

  fs.appendFileSync(path.join(fixtureRoot, renderedPath), "\n");
  promotionMustReject(admissionCandidate, fixtureRoot, "rendered artifact/hash drift");
  try {
    compileAdmissionManifest({ books: [admissionCandidate] }, { root: fixtureRoot });
    check(false, "held candidate compiler must reject rendered byte drift");
  } catch (error) {
    check(error.message.includes("artifact hash"), `held candidate render drift rejected for the wrong reason: ${error.message}`);
  }
  fs.copyFileSync(path.join(ROOT, renderedPath), path.join(fixtureRoot, renderedPath));

  promotionMustReject({ ...admissionCandidate, source_path: "/content/library-books/rendered/missing.html" }, fixtureRoot, "source path drift");
  promotionMustReject({ ...admissionCandidate, content_version: `${contentVersion}-stale` }, fixtureRoot, "canonical source/version drift");
  promotionMustReject({ ...admissionCandidate, artifact_sha256: "0".repeat(64) }, fixtureRoot, "rendered artifact/hash drift");
}
fs.rmSync(tempDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`ECO-01 CONTRACT FAIL (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("ECO-01 CONTRACT PASS");
console.log(`chapters=${book.chapters.length} claims=${claims.claims.length} evals=${evals.cases.length} status=${book.status}`);
console.log(`source_sha256=${sourceSha}`);
