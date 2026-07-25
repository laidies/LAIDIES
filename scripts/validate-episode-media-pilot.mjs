#!/usr/bin/env node
/**
 * Closed-gate validator for the representative episode-media pilot.
 *
 * Usage: node scripts/validate-episode-media-pilot.mjs <manifest.json>
 * This validates a recorded evidence contract; it does not render, decode, or
 * creatively approve media. The recorded automated results must come from
 * those separate tools and checks.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const PASS = 'PASS';
const HASH = /^[a-f0-9]{64}$/i;
const VISUAL_JOBS = new Set([
  'establish', 'explain', 'compare', 'demonstrate', 'reinforce',
  'complicate', 'transition', 'breathing-room',
]);
const AUTOMATED_RESULTS = [
  'sourceAndReferenceHashes', 'cueTiming', 'mediaTechnical', 'fullDecode',
  'captions', 'motionStillControl',
];

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function validateManifest(manifest, manifestPath = process.cwd()) {
  const errors = [];
  const fail = (code, message) => errors.push({ code, message });
  const required = (value, code, message) => {
    if (value === undefined || value === null || value === '') fail(code, message);
    return value;
  };
  const manifestDirectory = dirname(resolve(manifestPath));
  const artifactRootValue = required(manifest?.artifactRoot, 'MISSING_ARTIFACT_ROOT', 'artifactRoot is required and is resolved relative to the manifest.');
  const root = artifactRootValue ? resolve(manifestDirectory, artifactRootValue) : manifestDirectory;
  const assetById = new Map();

  required(manifest?.schemaVersion, 'MISSING_SCHEMA_VERSION', 'schemaVersion is required.');
  required(manifest?.pilotId, 'MISSING_PILOT_ID', 'pilotId is required.');
  required(manifest?.candidate?.assetId, 'MISSING_CANDIDATE_ASSET', 'candidate.assetId is required.');
  const candidateChecksum = required(manifest?.candidate?.checksum, 'MISSING_CANDIDATE_CHECKSUM', 'candidate.checksum is required.');
  if (candidateChecksum && !HASH.test(candidateChecksum)) fail('INVALID_CANDIDATE_CHECKSUM', 'candidate.checksum must be SHA-256.');
  if (!(Number.isFinite(manifest?.candidate?.durationSeconds) && manifest.candidate.durationSeconds > 0)) {
    fail('INVALID_CANDIDATE_DURATION', 'candidate.durationSeconds must be positive.');
  }

  if (!Array.isArray(manifest?.assets) || manifest.assets.length === 0) {
    fail('MISSING_ASSET_REGISTRY', 'assets must contain every candidate, source, reference, narration, caption, and transcript asset.');
  } else {
    for (const asset of manifest.assets) {
      if (!asset?.id || !asset?.path || !asset?.checksum) {
        fail('INCOMPLETE_ASSET_RECORD', 'Every asset requires id, path, and checksum.');
        continue;
      }
      if (assetById.has(asset.id)) fail('DUPLICATE_ASSET_ID', `Asset id ${asset.id} is duplicated.`);
      assetById.set(asset.id, asset);
      if (!HASH.test(asset.checksum)) fail('INVALID_ASSET_CHECKSUM', `Asset ${asset.id} has no SHA-256 checksum.`);
      const file = resolve(root, asset.path);
      if (relative(root, file).startsWith(`..${sep}`) || relative(root, file) === '..') {
        fail('UNSAFE_ASSET_PATH', `Asset ${asset.id} resolves outside the declared artifactRoot.`);
      } else if (!existsSync(file)) {
        fail('MISSING_ASSET_FILE', `Asset ${asset.id} is missing at ${asset.path}.`);
      } else if (HASH.test(asset.checksum) && sha256(file) !== asset.checksum.toLowerCase()) {
        fail('ASSET_CHECKSUM_MISMATCH', `Asset ${asset.id} does not match its recorded checksum.`);
      }
      if (!['approved', 'rejected', 'superseded'].includes(asset.status)) {
        fail('MISSING_ASSET_STATUS', `Asset ${asset.id} must be approved, rejected, or superseded.`);
      }
    }
  }
  const candidate = assetById.get(manifest?.candidate?.assetId);
  if (!candidate) fail('UNKNOWN_CANDIDATE_ASSET', 'candidate.assetId is not in assets.');
  else if (candidate.checksum !== candidateChecksum) fail('CANDIDATE_CHECKSUM_UNBOUND', 'candidate checksum must equal its asset-record checksum.');
  else if (candidate.status !== 'approved') fail('CANDIDATE_NOT_APPROVED', 'candidate asset must be approved.');

  const narration = manifest?.narration;
  required(narration?.assetId, 'MISSING_NARRATION_ASSET', 'narration.assetId is required.');
  required(narration?.checksum, 'MISSING_NARRATION_CHECKSUM', 'narration.checksum is required.');
  required(narration?.asRecordedTranscriptAssetId, 'MISSING_AS_RECORDED_TRANSCRIPT', 'Narration must bind an as-recorded transcript asset.');
  const narrationAsset = assetById.get(narration?.assetId);
  if (!narrationAsset) fail('UNKNOWN_NARRATION_ASSET', 'narration.assetId is not in assets.');
  else if (narrationAsset.checksum !== narration.checksum) fail('NARRATION_CHECKSUM_UNBOUND', 'Narration checksum must equal its asset-record checksum.');
  if (!(Number.isFinite(narration?.durationSeconds) && narration.durationSeconds > 0)) fail('INVALID_NARRATION_DURATION', 'Narration duration must be positive.');
  if (Number.isFinite(manifest?.candidate?.durationSeconds) && Number.isFinite(narration?.durationSeconds) && Math.abs(manifest.candidate.durationSeconds - narration.durationSeconds) > 0.001) {
    fail('FINAL_CLOCK_MISMATCH', 'Candidate and final narration duration must use the same final clock.');
  }

  const captions = manifest?.captions;
  required(captions?.assetId, 'MISSING_CAPTION_ASSET', 'captions.assetId is required.');
  required(captions?.checksum, 'MISSING_CAPTION_CHECKSUM', 'captions.checksum is required.');
  if (captions?.derivesFromAudioChecksum !== narration?.checksum) fail('CAPTIONS_NOT_BOUND_TO_AUDIO', 'Captions must bind to the final narration checksum.');
  const transcript = assetById.get(narration?.asRecordedTranscriptAssetId);
  if (!transcript) fail('UNKNOWN_AS_RECORDED_TRANSCRIPT', 'Narration transcript asset is not in assets.');
  if (captions?.asRecordedTranscriptChecksum !== transcript?.checksum) fail('CAPTIONS_NOT_BOUND_TO_TRANSCRIPT', 'Captions must bind to the as-recorded transcript checksum.');
  if (captions?.presentation !== 'player-below-picture') fail('CAPTION_PRESENTATION_FAIL', 'Captions must be optional player captions below the picture.');
  const captionAsset = assetById.get(captions?.assetId);
  if (!captionAsset) fail('UNKNOWN_CAPTION_ASSET', 'captions.assetId is not in assets.');
  else if (captionAsset.checksum !== captions.checksum) fail('CAPTION_CHECKSUM_UNBOUND', 'Caption checksum must equal its asset-record checksum.');

  if (manifest?.rejectedAssetCheck?.status !== PASS || manifest?.rejectedAssetCheck?.candidateChecksum !== candidateChecksum) {
    fail('REJECTED_ASSET_CHECK_FAIL', 'A PASS rejected-asset check bound to the candidate checksum is required.');
  }

  for (const key of AUTOMATED_RESULTS) {
    if (manifest?.automatedResults?.[key]?.status !== PASS || manifest?.automatedResults?.[key]?.candidateChecksum !== candidateChecksum) {
      fail('AUTOMATED_RESULT_MISSING_OR_FAIL', `${key} requires a PASS result bound to the candidate checksum.`);
    }
  }

  const people = new Map((manifest?.participants || []).filter(Boolean).map((person) => [person.id, person]));
  for (const person of people.values()) {
    const roles = new Set(person.roles || []);
    if (roles.has('maker') && roles.has('judge')) fail('MAKER_JUDGE_ROLE_CONFLICT', `${person.id} cannot be both maker and judge.`);
  }
  const judge = (reviewerId, scope) => {
    const reviewer = people.get(reviewerId);
    if (!reviewer || !(reviewer.roles || []).includes('judge') || (reviewer.roles || []).includes('maker')) {
      fail('MAKER_JUDGE_SEPARATION_FAIL', `${scope} requires an independent judge reviewer.`);
    }
  };

  const cues = manifest?.cues;
  if (!Array.isArray(cues) || cues.length === 0) fail('MISSING_CUES', 'At least one cue is required.');
  let previousEnd = 0;
  for (const [index, cue] of (cues || []).entries()) {
    const label = `cue ${cue?.id || index}`;
    if (!cue?.id || !Number.isFinite(cue.startSeconds) || !Number.isFinite(cue.endSeconds) || cue.endSeconds <= cue.startSeconds) {
      fail('INVALID_CUE_TIMING', `${label} requires increasing startSeconds/endSeconds.`);
    } else {
      if (Math.abs(cue.startSeconds - previousEnd) > 0.001) fail('CUE_COVERAGE_GAP_OR_OVERLAP', `${label} must start exactly at the prior cue end.`);
      previousEnd = cue.endSeconds;
    }
    if (!cue?.transcriptExcerpt || !VISUAL_JOBS.has(cue.visualJob)) fail('MISSING_CUE_NARRATION_OR_VISUAL_JOB', `${label} requires transcriptExcerpt and a valid visualJob.`);
    const source = assetById.get(cue?.sourceAssetId);
    if (!source || source.status !== 'approved') fail('REJECTED_OR_UNKNOWN_SOURCE_ASSET', `${label} source asset must be approved.`);
    for (const kind of ['identity', 'style', 'location']) {
      const ref = assetById.get(cue?.referenceAssetIds?.[kind]);
      if (!ref || ref.status !== 'approved') fail('MISSING_APPROVED_REFERENCE_BINDING', `${label} requires an approved ${kind} reference asset.`);
      if (cue?.referenceHashes?.[kind] !== ref?.checksum) fail('REFERENCE_HASH_UNBOUND', `${label} ${kind} reference hash must match the approved reference asset.`);
    }
    if (cue?.motion?.mode === 'semantic-event') {
      if (!cue.motion.semanticEvent) fail('MISSING_SEMANTIC_MOTION_EVENT', `${label} semantic motion requires a named event.`);
    } else if (cue?.motion?.mode === 'intentional-still') {
      if (!cue.motion.intentionalStillReason) fail('MISSING_INTENTIONAL_STILL_REASON', `${label} intentional still requires a reason.`);
    } else fail('MISSING_MOTION_MODE', `${label} requires semantic-event or intentional-still motion mode.`);
    for (const verdictName of ['imageQuality', 'narrationVisualAlignment', 'motion', 'timing', 'audioCaption', 'continuity']) {
      const verdict = cue?.verdicts?.[verdictName];
      if (verdict?.status !== PASS) fail('CUE_VERDICT_MISSING_OR_FAIL', `${label} ${verdictName} needs PASS.`);
      judge(verdict?.reviewerId, `${label} ${verdictName}`);
    }
  }
  if (Number.isFinite(manifest?.candidate?.durationSeconds) && Math.abs(previousEnd - manifest.candidate.durationSeconds) > 0.001) {
    fail('CUES_DO_NOT_COVER_FINAL_CLOCK', 'Cue windows must cover the final candidate duration exactly.');
  }

  const ali = manifest?.aliVisualRuling;
  if (ali?.status !== PASS || ali?.candidateChecksum !== candidateChecksum || !ali?.reviewerId) {
    fail('ALI_VISUAL_RULING_MISSING_OR_UNBOUND', 'Ali visual ruling must PASS and bind the candidate checksum.');
  }
  if (ali?.reviewerId && people.get(ali.reviewerId)?.id !== 'ali') fail('ALI_VISUAL_RULING_REVIEWER_INVALID', 'Ali visual ruling must name the Ali participant.');

  return { valid: errors.length === 0, errors };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const manifestPath = process.argv[2];
  if (!manifestPath) {
    console.error('Usage: node scripts/validate-episode-media-pilot.mjs <manifest.json>');
    process.exit(2);
  }
  try {
    const result = validateManifest(JSON.parse(readFileSync(manifestPath, 'utf8')), manifestPath);
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    console.error(JSON.stringify({ valid: false, errors: [{ code: 'INVALID_MANIFEST_JSON', message: error.message }] }, null, 2));
    process.exit(1);
  }
}

export { validateManifest };
