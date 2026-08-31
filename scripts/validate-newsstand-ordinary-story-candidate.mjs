import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { inspectProseReviewChain } from "./check-prose-quality-admission.mjs";
import { inspectContentProducerContract } from "./check-content-producer-contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readerContract = createRequire(import.meta.url)("../content/newsstand-reader-contract.js");
const HASH = /^[a-f0-9]{64}$/;
export const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
export const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(",")}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
export const vancouverDay = timestamp => Number.isFinite(Date.parse(timestamp)) ? new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(timestamp)) : "";
export const readCandidateBinding = (root, binding, label) => {
  if (!binding || typeof binding.path !== "string" || !HASH.test(binding.sha256 || "")) throw new Error(`${label} requires exact path and SHA-256`);
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute) || !fs.realpathSync(absolute).startsWith(`${fs.realpathSync(root)}${path.sep}`)) throw new Error(`${label} is missing or outside repository`);
  const raw = fs.readFileSync(absolute, "utf8");
  if (sha256(raw) !== binding.sha256) throw new Error(`${label} SHA-256 mismatch`);
  return raw;
};
const read = readCandidateBinding;
// The complete record, not selected prose fields, is the review boundary. This
// includes summaries, captions, destinations and any reader-template extras.
export const candidateReviewText = story => `${stable(story)}\n`;
export function publishCandidateStory(story, timestamp) {
  return { ...structuredClone(story), status: "published", publishedAt: timestamp,
    sourceApproval: { status: "approved", record: `newsstand:source-approval:${story.id}` } };
}
export function loadOrdinaryStoryCandidate(binding, { root = ROOT, date } = {}) {
  if (!binding?.path?.startsWith("operations/product-stewards/newsstand/candidates/")) throw new Error("ordinary candidate must be private NewsStand candidate input");
  const candidate = JSON.parse(read(root, binding, "ordinary candidate package"));
  const result = validateOrdinaryStoryCandidate(candidate, { root });
  if (binding.storyId !== undefined || binding.unpublishedState !== undefined) {
    if (binding.storyId !== candidate.story.id || stable(binding.unpublishedState) !== stable({ status: candidate.story.status, publishedAt: candidate.story.publishedAt, sourceApproval: candidate.story.sourceApproval })) throw new Error('ordinary envelope pre-publication state differs from exact candidate');
  }
  if (date && candidate.editionDate !== date) throw new Error("ordinary candidate date mismatch");
  return { ...result, candidate };
}
export function validateOrdinaryStoryCandidate(candidate, { root = ROOT } = {}) {
  if (!candidate || candidate.schemaVersion !== "newsstand-ordinary-story-candidate-v1" || candidate.candidateStatus !== "READY_FOR_ISSUE_ADMISSION") throw new Error("ordinary candidate schema/status invalid");
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(candidate.candidateId || "") || !/^\d{4}-\d{2}-\d{2}$/.test(candidate.editionDate || "")) throw new Error("ordinary candidate ID/date invalid");
  const story = candidate.story;
  if (["headline", "the_story", "laidies_read", "what_this_means"].some(key => typeof story?.[key] !== "string" || !story[key].trim())) throw new Error("ordinary candidate requires headline and complete reader copy");
  const publicationBaseRaw = read(root, candidate.publicationBase, "candidate publication base");
  if (!candidate.publicationBase.path.startsWith("operations/product-stewards/newsstand/")) throw new Error("candidate publication base must be frozen private input");
  if (!story || story.edition !== "daily" || story.status !== "hold" || story.publishedAt !== null || String(story.id || "") !== candidate.candidateId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(story.slug || "") || /^front-paige-/.test(story.id) || vancouverDay(story.updatedAt) !== candidate.editionDate || !story.sourceApproval || story.sourceApproval.status !== "independent-review-required") throw new Error("ordinary candidate story must remain held and date-bound");
  if (story.bigPicture !== null || story.correction !== null || story.retraction !== null || ["correctionHistory", "predecessorStoryIds", "successorStoryIds"].some(key => !Array.isArray(story[key]) || story[key].length)) throw new Error("ordinary candidate cannot replace, correct or retract an incumbent");
  const baseContext = { window: {} };
  vm.runInNewContext(publicationBaseRaw, baseContext, { timeout: 1000 });
  const baseData = JSON.parse(JSON.stringify(baseContext.window.NEWSSTAND_DATA));
  const readerErrors = readerContract.validate({ ...baseData, stories: [...baseData.stories, publishCandidateStory(story, story.updatedAt)] });
  if (readerErrors.length) throw new Error(`ordinary candidate fails reader contract: ${readerErrors.join(" | ")}`);
  if (candidate.storySha256 !== sha256(stable(story))) throw new Error("ordinary candidate story hash mismatch");
  const sourceText = read(root, candidate.sourceText, "candidate sourceText");
  const claimMap = JSON.parse(read(root, candidate.claimMap, "candidate claimMap"));
  if (sourceText !== candidateReviewText(story)) throw new Error("candidate sourceText is not the exact complete held story");
  const producer = JSON.parse(read(root, candidate.reviewEvidence?.producer, "candidate producer receipt"));
  const contract = JSON.parse(read(root, candidate.producerContract, "candidate producer contract"));
  const preflight = inspectContentProducerContract(contract, { root });
  if (preflight.errors.length || contract.status !== "READY_TO_DRAFT" || contract.candidateId !== candidate.candidateId || contract.contentClass !== "NEWS" || contract.surface !== "NEWSSTAND_DAILY" || contract.producer !== producer.maker) throw new Error(`candidate producer contract invalid: ${preflight.errors.join(" | ")}`);
  const independent = JSON.parse(read(root, candidate.reviewEvidence?.independent, "candidate independent receipt"));
  const rawReport = JSON.parse(read(root, candidate.reviewEvidence?.independentRawReport, "candidate independent raw report"));
  const chain = inspectProseReviewChain(producer, independent, { root });
  if (chain.errors.length || producer.candidateId !== candidate.candidateId || independent.candidateId !== candidate.candidateId || producer.verdict !== "PASS" || independent.verdict !== "PASS" || independent.contentClass !== "NEWS" || independent.surface !== "NEWSSTAND_DAILY") throw new Error(`candidate prose review chain invalid: ${chain.errors.join(" | ")}`);
  if (stable(independent.artifact.reviewText) !== stable(candidate.sourceText) || !independent.artifact.rendered) throw new Error("candidate prose/rendered artifact binding missing or mismatched");
  if (independent.factualReview.disposition !== "CLAIMS_REVIEWED" || stable(independent.factualReview.claimMap) !== stable(claimMap)) throw new Error("candidate claim map differs from independent factual review");
  if (independent.factualReview.reviewedThrough !== candidate.editionDate || vancouverDay(story.lastCheckedAt) !== candidate.editionDate) throw new Error("candidate requires current dated source verification");
  const reportBinding = independent.reportBinding;
  if (!reportBinding || stable(reportBinding) !== stable(candidate.reviewEvidence.independentRawReport) || rawReport.candidateId !== candidate.candidateId || rawReport.verdict !== "PASS" || rawReport.storySha256 !== candidate.storySha256 || rawReport.reviewerPrincipalId !== independent.reviewer.principalId || !rawReport.findings) throw new Error("candidate independent raw report is not bound to the passing receipt");
  if (!Array.isArray(candidate.sources) || !Array.isArray(story.sources) || !story.sources.length || candidate.sources.length !== story.sources.length) throw new Error("candidate requires one evidence binding per public source");
  if (new Set(candidate.sources.map(source => source.id)).size !== candidate.sources.length || new Set(story.sources.map(source => source.id)).size !== story.sources.length) throw new Error("candidate source IDs must be unique");
  for (const source of story.sources) {
    const bound = candidate.sources.find(item => item.id === source.id && item.url === source.url);
    if (!bound || !/^https:\/\//.test(source.url) || source.accessedAt !== candidate.editionDate || !independent.factualReview.sourceBindings.some(item => stable(item) === stable(bound.evidence))) throw new Error("public source is not bound to independently checked source evidence");
    read(root, bound.evidence, "public source evidence");
  }
  return { story: structuredClone(story), publicationBaseRaw, maker: producer.maker, reviewedAt: independent.reviewedAt };
}
