import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { loadOrdinaryStoryCandidate, publishCandidateStory, stable } from "../validate-newsstand-ordinary-story-candidate.mjs";
import { verifyProjectionAdmission } from "../publish-daily-edition.mjs";

export const CURRENT_PUBLISHER_TYPE_AUTHORITY = "newsstand source record contract: legacy closed types plus the exact current ordinary-candidate source bindings";
export const CURRENT_PUBLISHER_TYPES = new Set(["vendor", "regulator", "academic", "independent-reporting", "primary-document", "organization", "government", "analysis", "external-evaluator", "reporting", "laidies", "primary-product-documentation", "primary-product-changelog"]);

const sha256 = raw => crypto.createHash("sha256").update(raw).digest("hex");
function walk(directory, include = entry => entry.name === "ordinary-candidate.json") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(path.join(directory, entry.name), include) : include(entry) ? [path.join(directory, entry.name)] : []);
}
export function inspectCurrentStoryAuthority(story, { root, issues }) {
  const result = { errors: [], candidatePath: null, issueDate: null };
  const accepted = new Set(["ACCEPT_LOCAL_CANONICAL_WRITE", "ACCEPT_LOCAL_CANONICAL_SUCCESSOR"]);
  const admitted = (issues?.issues || []).filter(issue => issue?.status === "complete" && accepted.has(issue?.admission?.decision) &&
    (issue.stories || []).some(snapshot => stable(snapshot) === stable(story)) && (issue.storyIds || []).includes(story.id));
  if (admitted.length !== 1) { result.errors.push(`current story requires exactly one accepted admitted issue snapshot with exact public story; found ${admitted.length}`); return result; }
  const issue = admitted[0]; result.issueDate = issue.editionDate;
  const binding = issue.sourceIdentity?.ordinaryCandidate;
  if (!binding) { result.errors.push("accepted issue has no checksum-bound ordinary candidate"); return result; }
  try {
    const loaded = loadOrdinaryStoryCandidate(binding, { root, date: issue.editionDate, admittedHistoricalBase: true });
    const expected = publishCandidateStory(loaded.candidate.story, issue.admission.reviewedAt);
    if (loaded.candidate.candidateId !== story.id || stable(expected) !== stable(story)) result.errors.push("bound ordinary candidate does not project exactly to public story approval/status/content");
    else result.candidatePath = binding.path;
  } catch (error) { result.errors.push(`checksum-bound ordinary candidate is invalid (${error.message})`); }
  const envelopes = walk(path.join(root, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private"), entry => entry.name.endsWith(".json"))
    .map(file => fs.readFileSync(file, "utf8")).filter(raw => sha256(raw) === issue.envelopeSha256);
  const evidenceRoot = path.join(root, "operations/product-stewards/newsstand/evidence");
  const decisions = walk(evidenceRoot, entry => entry.name.endsWith(".json")).flatMap(file => { try { const decision = JSON.parse(fs.readFileSync(file, "utf8")); return decision.envelopeSha256 === issue.envelopeSha256 ? [decision] : []; } catch { return []; } })
    .filter(decision => accepted.has(decision.decision));
  if (envelopes.length !== 1 || decisions.length !== 1) result.errors.push(`accepted issue requires one exact private envelope and one accepted independent decision; found envelopes=${envelopes.length} decisions=${decisions.length}`);
  else { try { verifyProjectionAdmission({ issue, envelopeRaw: envelopes[0], decision: decisions[0], root }); } catch (error) { result.errors.push(`exact admission replay failed (${error.message})`); } }
  return result;
}
