const OBSERVATION_FIELDS = new Set(['checkedAt', 'accessedAt', 'retrievedAt', 'capturedAt']);
const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

// Planned follow-ups are not observations. Only accessedAt may be a date-only
// public label; compare that label with the review's calendar date.
export function assertNewsstandEvidenceTime({ story, producer, independent, evidence = [] }, now) {
  function instant(value, label) {
    if (typeof value !== 'string' || !INSTANT.test(value) || !Number.isFinite(Date.parse(value))) throw new Error(`${label} is invalid or later than the evidence clock/review`);
    const calendar = value.slice(0, 10);
    const day = Date.parse(calendar + 'T00:00:00Z');
    if (!Number.isFinite(day) || new Date(day).toISOString().slice(0, 10) !== calendar || Number(value.slice(11, 13)) > 23 || Number(value.slice(14, 16)) > 59 || Number(value.slice(17, 19)) > 59) throw new Error(`${label} is invalid or later than the evidence clock/review`);
    return Date.parse(value);
  }
  const ceiling = instant(now, 'evidence clock');
  function check(value, label, limit = ceiling) {
    const time = instant(value, label);
    if (time > limit) throw new Error(`${label} is invalid or later than the evidence clock/review`);
    return time;
  }
  const reviewTime = check(independent?.reviewedAt, 'independent.reviewedAt');
  const producerTime = check(producer?.reviewedAt, 'producer.reviewedAt', reviewTime);
  for (const field of ['updatedAt', 'lastCheckedAt']) check(story?.[field], `story.${field}`, producerTime);
  function visit(value, label) {
    if (!value || typeof value !== 'object') return;
    for (const [key, child] of Object.entries(value)) {
      if (OBSERVATION_FIELDS.has(key)) {
        if (key === 'accessedAt' && typeof child === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(child)) {
          const parsed = Date.parse(child + 'T00:00:00Z');
          if (!Number.isFinite(parsed) || new Date(parsed).toISOString().slice(0, 10) !== child || child > independent.reviewedAt.slice(0, 10)) throw new Error(`${label}.${key} is invalid or later than the evidence clock/review`);
        } else check(child, `${label}.${key}`, reviewTime);
      } else if (child && typeof child === 'object') visit(child, `${label}.${key}`);
    }
  }
  evidence.forEach((value, index) => visit(value, `sourceEvidence[${index}]`));
}
