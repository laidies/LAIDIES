// Ali's August 31 correction applies to new publication, not historical replay.
// Mechanical prevention only: exact-content editorial review must still judge
// whether the situation, practical advice and script belong in The Corner Office.
export function careerLaneErrors(record, publicationDate) {
  if (record?.type !== 'career_life' || publicationDate < '2026-08-31') return [];
  const errors = [];
  if (record.sourceId === 'WORK-LIFE-AI-MIRROR-22' ||
      /CAREER-DELEGATION$/.test(record.id || '') ||
      /delegate the outcome, not every keystroke/i.test(record.headline || '')) {
    errors.push('Corner Office rejects the legacy AI-mirror delegation item, including carried or redated copies');
  }
  if (!Array.isArray(record.body) || !record.body.length || record.body.some(p => typeof p !== 'string' || !p.trim())) {
    errors.push('Corner Office requires a complete workplace-advice body, not an orphan summary or Episode link');
  }
  return errors;
}
