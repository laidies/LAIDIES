#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandServiceExemplar } from "./check-newsstand-service-exemplar.mjs";
import { inspectNewsstandProducerProof } from "./check-newsstand-producer-proof.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/candidates");
const HASH = /^[a-f0-9]{64}$/;
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = value => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const fail = message => { throw new Error(`COMPLETE_DAILY_REVIEW_COMPOSER_REJECT: ${message}`); };

function read(relative, label) {
  const absolute = path.resolve(ROOT, relative || "");
  if (!relative || !absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`${label} is unavailable: ${relative || ""}`);
  const raw = fs.readFileSync(absolute, "utf8");
  return { path: path.relative(ROOT, absolute), raw, sha256: sha256(raw) };
}

function binding(relative, label) {
  const absolute = path.resolve(ROOT, relative || "");
  if (!relative || !absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`${label} is unavailable: ${relative || ""}`);
  return { path: path.relative(ROOT, absolute), sha256: sha256(fs.readFileSync(absolute)) };
}

function json(relative, label) {
  const file = read(relative, label);
  try { return { ...file, value: JSON.parse(file.raw) }; }
  catch { fail(`${label} is not valid JSON`); }
}

export function composeCompleteDailyReviewPackage(inputs) {
  const storyFile = json(inputs.story, "story candidate");
  const proofFile = json(inputs.proof, "producer proof");
  const proofReviewFile = json(inputs.proofReview, "producer proof review");
  const serviceReviewFile = json(inputs.serviceReview, "service exemplar review");
  const semanticReviewFile = read(inputs.semanticReview, "independent semantic review");
  const visualReviewFile = read(inputs.visualReview, "independent visual review");
  const screenshots = inputs.screenshots.map((item, index) => binding(item.path, `review screenshot ${index + 1}`));
  const columnsFile = json("content/daily-edition-columns.json", "Daily column authority");
  const serviceFiles = inputs.services.map((item, index) => json(item, `service candidate ${index + 1}`));

  const proofCheck = inspectNewsstandProducerProof(proofFile.value);
  if (proofCheck.errors.length) fail(`producer proof failed: ${proofCheck.errors.join(" | ")}`);
  if (proofReviewFile.value?.review?.verdict !== "PASS" || proofReviewFile.value?.review?.draftPermission !== "FULL_DRAFT_ALLOWED" || proofReviewFile.value?.proof?.sha256 !== proofFile.sha256) {
    fail("producer proof review does not PASS the exact proof");
  }
  if (storyFile.value?.candidateStatus !== "HELD_NOT_PUBLISHED" || storyFile.value?.story?.status !== "hold" || storyFile.value?.story?.publishedAt !== null) {
    fail("story candidate is not a held private candidate");
  }
  if (storyFile.value?.sourceText?.sha256 !== sha256(fs.readFileSync(path.join(ROOT, storyFile.value.sourceText.path)))) {
    fail("story candidate does not bind the exact prose");
  }

  const laneIds = [];
  for (const service of serviceFiles) {
    const result = inspectNewsstandServiceExemplar(service.value);
    if (result.errors.length) fail(`${service.path} failed: ${result.errors.join(" | ")}`);
    laneIds.push(service.value.laneId);
  }
  if (new Set(laneIds).size !== 4 || !["paige_tip", "career_work_life", "promptoscope", "mme_claio"].every(lane => laneIds.includes(lane))) {
    fail("exactly one candidate for each required service lane is required");
  }
  if (serviceReviewFile.value?.review?.verdict !== "PASS" || serviceReviewFile.value.review.outcomes?.some(item => item.verdict !== "PASS" || item.defects?.length)) {
    fail("service review does not PASS every lane");
  }
  const reviewedServices = new Map((serviceReviewFile.value.candidates || []).map(item => [item.path, item.sha256]));
  for (const service of serviceFiles) if (reviewedServices.get(service.path) !== service.sha256) fail(`${service.path} is not the exact independently reviewed candidate`);

  const exactProsePath = storyFile.value?.sourceText?.path;
  const exactProseSha = storyFile.value?.sourceText?.sha256;
  if (!semanticReviewFile.raw.includes("Verdict: `PASS_ARTIFACT_LEVEL`") ||
      !semanticReviewFile.raw.includes(`- Artifact: \`${exactProsePath}\``) ||
      !semanticReviewFile.raw.includes(`- SHA-256: \`${exactProseSha}\``) ||
      !semanticReviewFile.raw.includes("does not substitute for observed unfamiliar-human explain-back and unseen transfer evidence")) {
    fail("semantic review does not bind and PASS the exact prose with the human-evidence boundary intact");
  }
  if (!visualReviewFile.raw.includes("Status: `ADMIT_PRIVATE_DIRECTION_REVIEW`") ||
      !visualReviewFile.raw.includes("does not admit the story as a positive exemplar, canonical content, deployment or public release")) {
    fail("visual review does not admit only the private direction");
  }
  if (screenshots.length !== 9 || new Set(screenshots.map(item => item.path)).size !== 9) fail("nine distinct complete-page, Daily and article review screenshots are required");
  for (const screenshot of screenshots) {
    const basename = path.basename(screenshot.path);
    if (!visualReviewFile.raw.includes(`\`${basename}\` — SHA-256 \`${screenshot.sha256}\``)) {
      fail(`visual review does not bind ${screenshot.path}`);
    }
  }

  const editionDate = "2026-08-12";
  if (storyFile.value.story.updatedAt.slice(0, 10) !== editionDate || serviceFiles.some(file => file.value.editionDate !== editionDate)) fail("all Daily contents must use the exact edition date");
  const publicTypes = { paige_tip: "paige_tip", career_work_life: "career_life", promptoscope: "promptoscope", mme_claio: "mme_claio" };
  const orderedTypes = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
  const desks = orderedTypes.map(type => {
    const service = serviceFiles.find(file => publicTypes[file.value.laneId] === type);
    if (!service) return { type, state: "empty", recordId: null, emptyState: columnsFile.value.emptyStates[type] };
    return {
      type,
      state: "ready",
      recordId: service.value.storage.recordId,
      headline: service.value.headline,
      summary: service.value.body,
      destination: service.value.destination?.startsWith("/newsstand.html#daily-") ? null : service.value.destination || null,
      sourceCandidate: { path: service.path, sha256: service.sha256 }
    };
  });
  const reviewPackage = {
    schemaVersion: "laidies-newsstand-complete-daily-review-package.v1",
    editionDate,
    editorialTimeZone: "America/Vancouver",
    status: "PRIVATE_COMPLETE_DAILY_REVIEW_CANDIDATE",
    defaultExperience: "THE_DAILY",
    publicEligibility: "INELIGIBLE_PENDING_ALI_APPROVAL",
    story: { path: storyFile.path, sha256: storyFile.sha256, record: storyFile.value.story },
    desks,
    evidence: {
      producerProof: { path: proofFile.path, sha256: proofFile.sha256 },
      producerProofReview: { path: proofReviewFile.path, sha256: proofReviewFile.sha256 },
      serviceReview: { path: serviceReviewFile.path, sha256: serviceReviewFile.sha256 },
      semanticReview: { path: semanticReviewFile.path, sha256: semanticReviewFile.sha256 },
      visualReview: { path: visualReviewFile.path, sha256: visualReviewFile.sha256 },
      screenshots: inputs.screenshots.map((item, index) => ({
        ...screenshots[index],
        mode: item.mode,
        viewport: item.viewport
      }))
    },
    remainingGates: [
      "ALI_EXACT_PACKAGE_APPROVAL",
      "OBSERVED_UNFAMILIAR_HUMAN_EXPLAIN_BACK",
      "OBSERVED_UNFAMILIAR_HUMAN_UNSEEN_TRANSFER",
      "INDEPENDENT_RELEASE_ADMISSION",
      "DEPLOYMENT_AND_EXACT_PUBLIC_VERIFICATION"
    ],
    releaseAuthority: { canonicalWrite: false, deploy: false, public: false }
  };
  const canonical = `${canonicalJson(reviewPackage)}\n`;
  return { reviewPackage, canonical, sha256: sha256(canonical) };
}

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? null : process.argv[index + 1];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const output = path.resolve(ROOT, valueAfter("--output") || "");
  if (!output.startsWith(`${CANDIDATE_ROOT}${path.sep}`)) fail("--output must stay inside the NewsStand candidate directory");
  const result = composeCompleteDailyReviewPackage({
    story: valueAfter("--story"), proof: valueAfter("--proof"), proofReview: valueAfter("--proof-review"), serviceReview: valueAfter("--service-review"),
    semanticReview: valueAfter("--semantic-review"), visualReview: valueAfter("--visual-review"),
    services: [valueAfter("--paige"), valueAfter("--career"), valueAfter("--promptoscope"), valueAfter("--mme")],
    screenshots: [
      { mode: "COMPLETE_PAGE", viewport: 1440, path: valueAfter("--page-1440") },
      { mode: "COMPLETE_PAGE", viewport: 390, path: valueAfter("--page-390") },
      { mode: "COMPLETE_PAGE", viewport: 320, path: valueAfter("--page-320") },
      { mode: "DAILY_FRONT", viewport: 1440, path: valueAfter("--front-1440") },
      { mode: "DAILY_FRONT", viewport: 390, path: valueAfter("--front-390") },
      { mode: "DAILY_FRONT", viewport: 320, path: valueAfter("--front-320") },
      { mode: "FULL_ARTICLE", viewport: 1440, path: valueAfter("--article-1440") },
      { mode: "FULL_ARTICLE", viewport: 390, path: valueAfter("--article-390") },
      { mode: "FULL_ARTICLE", viewport: 320, path: valueAfter("--article-320") }
    ]
  });
  fs.writeFileSync(output, result.canonical);
  console.log(`COMPLETE DAILY REVIEW PACKAGE PASS edition=2026-08-12 story=1 ready_desks=4 sha256=${result.sha256} public_authority=none`);
}
