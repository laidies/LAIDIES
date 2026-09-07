const encoder = new TextEncoder();

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

export async function hashAnswerBankValue(value) {
  const bytes = await crypto.subtle.digest('SHA-256', encoder.encode(stable(value)));
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export function normalizeSourceText(value) {
  return String(value || '').normalize('NFKC').replace(/\r\n?/g, '\n').replace(/[ \t]+\n/g, '\n').trim();
}

export async function sourceDigestFor(sources) { return hashAnswerBankValue(sources); }

export function normalizeAnswerQuestion(value) {
  return String(value || '').normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-CA');
}

function validIso(value) { return typeof value === 'string' && Number.isFinite(Date.parse(value)); }
function parseJson(value) { try { return JSON.parse(value); } catch { return null; } }
const HARD_GATES = ['direct_complete_answer', 'claim_source_fidelity', 'freshness_and_unknowns', 'beginner_comprehension', 'useful_mechanism_or_decision_logic', 'laidies_relationship_integrity', 'privacy_and_safety', 'no_known_slop'];
function reviewedShape(record) {
  const aliases = [...new Set([record.canonicalQuestion, ...(record.aliases || [])].map(normalizeAnswerQuestion))].filter(Boolean).sort();
  return {
    answerKey: record.answerKey,
    canonicalQuestion: record.canonicalQuestion,
    answer: record.answer,
    sources: record.sources,
    aliases,
    relatedLaidiesConcepts: record.relatedLaidiesConcepts || [],
    modelVersion: record.modelVersion,
    sourcePolicyVersion: record.sourcePolicyVersion,
    checkedAt: record.checkedAt,
    expiresAt: record.expiresAt,
    recheckTriggers: record.recheckTriggers || [],
    visibility: record.visibility,
    approvedForExample: record.approvedForExample === true
  };
}

async function fingerprints(record) {
  const shape = reviewedShape(record);
  const sourceDigest = await sourceDigestFor(shape.sources);
  const aliasesDigest = await hashAnswerBankValue(shape.aliases);
  const answerFingerprint = await hashAnswerBankValue(shape);
  const reviewFingerprint = await hashAnswerBankValue({
    answerFingerprint, sourceDigest, aliasesDigest, question: shape.canonicalQuestion,
    reviewerId: record.review?.reviewerId, roleDistinct: record.review?.roleDistinct,
    total: record.review?.total, minimumDimension: record.review?.minimumDimension, reviewedAt: record.review?.reviewedAt,
    hardGates: [...(record.review?.hardGates || [])].sort()
  });
  return { shape, sourceDigest, aliasesDigest, answerFingerprint, reviewFingerprint };
}

function importFailure(record, now = new Date().toISOString()) {
  if (!record || typeof record !== 'object') return 'invalid_record';
  if (!/^[a-z0-9][a-z0-9._:-]{1,95}$/i.test(record.answerKey || '')) return 'invalid_answer_key';
  if (!record.canonicalQuestion || !record.answer || !Array.isArray(record.sources) || !record.sources.length) return 'incomplete_record';
  if (record.sources.some(source => !source || typeof source.url !== 'string' || !/^https:\/\//.test(source.url) || !/^[a-f0-9]{64}$/.test(source.contentDigest || ''))) return 'invalid_source_digest';
  if (record.visibility !== 'internal_reusable') return 'visibility_not_reusable';
  if (typeof record.modelVersion !== 'string' || !record.modelVersion || typeof record.sourcePolicyVersion !== 'string' || !record.sourcePolicyVersion) return 'missing_version';
  if (!validIso(record.checkedAt) || !validIso(record.expiresAt) || Date.parse(record.checkedAt) > Date.parse(now) || Date.parse(record.expiresAt) <= Date.parse(record.checkedAt)) return 'invalid_freshness';
  if (!record.review || typeof record.review.reviewerId !== 'string' || !record.review.reviewerId || record.review.roleDistinct !== true) return 'reviewer_not_distinct';
  if (!validIso(record.review.reviewedAt) || Date.parse(record.review.reviewedAt) > Date.parse(now)) return 'invalid_review_time';
  if (!Array.isArray(record.review.hardGates) || HARD_GATES.some(gate => !record.review.hardGates.includes(gate))) return 'hard_gates_incomplete';
  if (!Number.isInteger(record.review.total) || record.review.total < 17 || record.review.total > 20 || !Number.isInteger(record.review.minimumDimension) || record.review.minimumDimension < 3 || record.review.minimumDimension > 4) return 'review_below_threshold';
  if (!Array.isArray(record.aliases) || !record.aliases.length) return 'aliases_required';
  if ([...new Set([record.canonicalQuestion, ...record.aliases].map(normalizeAnswerQuestion))].some(alias => alias.length < 3 || alias.length > 240)) return 'invalid_alias';
  return null;
}

// Call after the role-distinct reviewer has assessed the exact proposed bytes; persist all fields with that review receipt.
export async function createAnswerReviewBinding(record) {
  const hashes = await fingerprints(record);
  return { answerFingerprint: hashes.answerFingerprint, sourceDigest: hashes.sourceDigest, reviewFingerprint: hashes.reviewFingerprint };
}

// Integration API: call only from an authorised editorial import path. It never accepts visitor text.
export async function importReviewedAnswer(db, record, { now = new Date().toISOString(), id = crypto.randomUUID() } = {}) {
  const failure = importFailure(record, now);
  if (failure) return { status: 'rejected', reason: failure };
  const hashes = await fingerprints(record);
  if (!/^[a-f0-9]{64}$/.test(record.answerFingerprint || '') || record.answerFingerprint !== hashes.answerFingerprint) return { status: 'rejected', reason: 'answer_fingerprint_mismatch' };
  if (!/^[a-f0-9]{64}$/.test(record.sourceDigest || '') || record.sourceDigest !== hashes.sourceDigest) return { status: 'rejected', reason: 'source_digest_mismatch' };
  if (!/^[a-f0-9]{64}$/.test(record.reviewFingerprint || '') || record.reviewFingerprint !== hashes.reviewFingerprint) return { status: 'rejected', reason: 'review_fingerprint_mismatch' };
  const version = Number(record.version || 1);
  if (!Number.isInteger(version) || version < 1) return { status: 'rejected', reason: 'invalid_version' };
  const versionId = `mjab_${id.replaceAll('-', '')}`;
  const review = record.review;
  const aliases = hashes.shape.aliases;
  try {
    const statements = [
      db.prepare('INSERT INTO miss_jeeves_answer_bank_versions (answer_version_id, answer_key, version, canonical_question, answer_text, sources_json, related_laidies_json, model_version, source_policy_version, checked_at, expires_at, recheck_triggers_json, visibility, approved_for_example, supersedes_version_id, answer_fingerprint, source_digest, aliases_digest, review_fingerprint, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17,?18,?19,?20)').bind(versionId, record.answerKey, version, record.canonicalQuestion, record.answer, JSON.stringify(record.sources), JSON.stringify(record.relatedLaidiesConcepts || []), record.modelVersion || '', record.sourcePolicyVersion, record.checkedAt, record.expiresAt, JSON.stringify(record.recheckTriggers || []), 'internal_reusable', record.approvedForExample === true ? 1 : 0, record.supersedesVersionId || null, hashes.answerFingerprint, hashes.sourceDigest, hashes.aliasesDigest, hashes.reviewFingerprint, now),
      db.prepare('INSERT INTO miss_jeeves_answer_bank_reviews (answer_version_id, reviewer_id, role_distinct, total_score, minimum_dimension, hard_gates_json, review_fingerprint, reviewed_at) VALUES (?1,?2,1,?3,?4,?5,?6,?7)').bind(versionId, review.reviewerId, review.total, review.minimumDimension, JSON.stringify([...review.hardGates].sort()), hashes.reviewFingerprint, review.reviewedAt || now),
      ...aliases.map(alias => db.prepare('INSERT INTO miss_jeeves_answer_bank_aliases (answer_version_id, alias_normalized) VALUES (?1,?2)').bind(versionId, alias))
    ];
    if (typeof db.batch === 'function') await db.batch(statements); else for (const statement of statements) await statement.run();
  } catch { return { status: 'rejected', reason: 'storage_failed' }; }
  return { status: 'imported', answerVersionId: versionId, answerKey: record.answerKey, answerFingerprint: hashes.answerFingerprint, aliases };
}

// Integration API return shape: {status:'hit', answer, sources, checkedAt, expiresAt, ...}; every other status must fall through to the existing research path.
export async function lookupReviewedAnswer(db, question, { now = new Date().toISOString(), sourcePolicyVersion, checkSources = async () => ({ current: false }) } = {}) {
  const normalized = normalizeAnswerQuestion(question);
  if (!normalized || normalized.length > 240) return { status: 'miss', reason: 'invalid_question' };
  let rows;
  try {
    const query = `SELECT v.*, r.reviewer_id, r.role_distinct, r.total_score, r.minimum_dimension, r.hard_gates_json, r.reviewed_at, r.review_fingerprint AS stored_review_fingerprint,
      (SELECT group_concat(all_aliases.alias_normalized, char(31)) FROM miss_jeeves_answer_bank_aliases all_aliases WHERE all_aliases.answer_version_id=v.answer_version_id) AS all_aliases
      FROM miss_jeeves_answer_bank_aliases a JOIN miss_jeeves_answer_bank_versions v ON v.answer_version_id=a.answer_version_id
      JOIN miss_jeeves_answer_bank_reviews r ON r.answer_version_id=v.answer_version_id
      WHERE a.alias_normalized=?1 AND v.visibility='internal_reusable'
      AND NOT EXISTS (SELECT 1 FROM miss_jeeves_answer_bank_versions newer WHERE newer.answer_key=v.answer_key AND newer.version>v.version)`;
    rows = await db.prepare(query).bind(normalized).all();
    rows = rows?.results || rows || [];
  } catch { return { status: 'miss', reason: 'storage_unavailable' }; }
  const versions = new Map();
  for (const row of rows) versions.set(row.answer_version_id, { ...row, aliases: String(row.all_aliases || '').split(String.fromCharCode(31)).filter(Boolean).sort() });
  if (versions.size !== 1) return { status: 'miss', reason: versions.size ? 'ambiguous_alias' : 'no_alias' };
  const row = [...versions.values()][0];
  const record = {
    answerKey: row.answer_key, canonicalQuestion: row.canonical_question, answer: row.answer_text,
    sources: parseJson(row.sources_json), aliases: row.aliases, relatedLaidiesConcepts: parseJson(row.related_laidies_json),
    modelVersion: row.model_version, sourcePolicyVersion: row.source_policy_version, checkedAt: row.checked_at,
    expiresAt: row.expires_at, recheckTriggers: parseJson(row.recheck_triggers_json), visibility: row.visibility,
    approvedForExample: Number(row.approved_for_example) === 1,
    review: { reviewerId: row.reviewer_id, roleDistinct: Number(row.role_distinct) === 1, total: Number(row.total_score), minimumDimension: Number(row.minimum_dimension), reviewedAt: row.reviewed_at, hardGates: parseJson(row.hard_gates_json) }
  };
  if (importFailure(record, now)) return { status: 'miss', reason: 'review_or_record_invalid' };
  const hashes = await fingerprints(record);
  if (hashes.answerFingerprint !== row.answer_fingerprint || hashes.sourceDigest !== row.source_digest || hashes.aliasesDigest !== row.aliases_digest || hashes.reviewFingerprint !== row.review_fingerprint || row.review_fingerprint !== row.stored_review_fingerprint) return { status: 'miss', reason: 'binding_mismatch' };
  if (Date.parse(row.expires_at) <= Date.parse(now)) return { status: 'miss', reason: 'stale' };
  if (!sourcePolicyVersion || sourcePolicyVersion !== row.source_policy_version) return { status: 'miss', reason: 'source_policy_mismatch' };
  let sourceCheck; try { sourceCheck = await checkSources({ sources: record.sources, sourceDigest: row.source_digest, checkedAt: row.checked_at, recheckTriggers: record.recheckTriggers }); } catch { return { status: 'miss', reason: 'source_check_failed' }; }
  if (!sourceCheck?.current || sourceCheck.sourceDigest !== row.source_digest) return { status: 'miss', reason: 'source_mismatch' };
  return { status: 'hit', answerKey: row.answer_key, answerVersionId: row.answer_version_id, answer: row.answer_text, sources: record.sources, relatedLaidiesConcepts: record.relatedLaidiesConcepts, checkedAt: row.checked_at, expiresAt: row.expires_at, approvedForExample: record.approvedForExample, canonicalQuestion: row.canonical_question };
}

export async function approvedExamples(db, { limit = 4, now = new Date().toISOString(), sourcePolicyVersion, checkSources = async () => ({ current: false }) } = {}) {
  const rows = await db.prepare("SELECT canonical_question FROM miss_jeeves_answer_bank_versions WHERE visibility='internal_reusable' AND approved_for_example=1 ORDER BY checked_at DESC LIMIT ?1").bind(Math.min(Math.max(Number(limit) || 0, 0), 8)).all();
  const examples = [];
  for (const row of (rows?.results || rows || [])) {
    const hit = await lookupReviewedAnswer(db, row.canonical_question, { now, sourcePolicyVersion, checkSources });
    if (hit.status === 'hit') examples.push({ answerKey: hit.answerKey, question: hit.canonicalQuestion });
  }
  return examples;
}
