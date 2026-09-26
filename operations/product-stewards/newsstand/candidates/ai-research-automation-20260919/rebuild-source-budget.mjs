import fs from 'node:fs';

const dir = 'operations/product-stewards/newsstand/candidates/ai-research-automation-20260919/';
const story = JSON.parse(fs.readFileSync(dir + 'story.json', 'utf8'));
const claimMap = JSON.parse(fs.readFileSync(dir + 'claim-map.json', 'utf8'));
const strip = value => value.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
const words = value => strip(value).split(/\s+/).filter(Boolean).length;
const visible = {
  headline: story.headline,
  'heroVisual.alt': story.heroVisual.alt,
  the_story: strip(story.the_story),
  laidies_read: strip(story.laidies_read),
  what_this_means: strip(story.what_this_means),
  cocktail_party: story.cocktail_party,
  class_notes: strip(story.class_notes),
  'sources[0].label': story.sources[0].label,
  'sources[1].label': story.sources[1].label
};
const allocations = [];
function add(allocationId, publisher, field, exactDerivedText, container = visible[field]) {
  if (!container.includes(exactDerivedText)) throw new Error(`${allocationId}: derived text is not an exact substring of ${field}`);
  allocations.push({ allocationId, publisher, field, exactDerivedText, words: words(exactDerivedText) });
}

add('shared-headline-anthropic', 'Anthropic', 'headline', visible.headline);
add('shared-headline-openai', 'OpenAI', 'headline', visible.headline);
add('shared-opening-anthropic', 'Anthropic', 'the_story', 'Two companies report different internal snapshots.');
add('shared-opening-openai', 'OpenAI', 'the_story', 'Two companies report different internal snapshots.');
add('anthropic-index', 'Anthropic', 'the_story', 'Anthropic says that in its August 2026 internal index, Claude led 26% of AI research work, performed at least collaboratively in more than 90%, and was fully autonomous in none.');
add('openai-agent-runtime', 'OpenAI', 'the_story', 'OpenAI reports a different measure: by mid-August, its agents’ total runtime across the research organization was equivalent to 3.1 standard eight-hour agent workdays for each human workday.');
add('anthropic-supervision', 'Anthropic', 'laidies_read', 'In Anthropic’s scale, “led” means completing most of a defined task from a high-level prompt while a human supervises. Fully autonomous work removes the human; Anthropic says no measured subset reached it.');
add('openai-human-role-and-intervention', 'OpenAI', 'laidies_read', 'OpenAI says people still set priorities, judge results and decide whether to scale, pause or deploy. In the six months it studied, more than half of successful four-to-eight-hour tasks needed at least one intervention.');
add('shared-preliminary-anthropic', 'Anthropic', 'laidies_read', 'Both reports are preliminary internal measurements.');
add('shared-preliminary-openai', 'OpenAI', 'laidies_read', 'Both reports are preliminary internal measurements.');
add('anthropic-method-limits', 'Anthropic', 'laidies_read', 'Anthropic used a Claude judge, found borderline disagreement and says cross-company comparison lacks a common method.');
add('openai-method-limits', 'OpenAI', 'laidies_read', 'OpenAI says coverage is incomplete; agent runtime, code and experiment counts do not directly measure overall research progress.');
add('anthropic-autonomy-takeaway', 'Anthropic', 'what_this_means', 'This does not establish recursive self-improvement—a model independently building its successor without a human in the loop. Bounded investigations can run for hours, which may speed up a lab without transferring authority over the next model, evidence or deployment.');
add('shared-cocktail-anthropic', 'Anthropic', 'cocktail_party', visible.cocktail_party);
add('shared-cocktail-openai', 'OpenAI', 'cocktail_party', visible.cocktail_party);
add('anthropic-source-label', 'Anthropic', 'sources[0].label', visible['sources[0].label']);
add('openai-source-label', 'OpenAI', 'sources[1].label', visible['sources[1].label']);

const anthropicLimits = claimMap.claims.filter(x => x.sourceIds.includes('anthropic-measuring-pace-20260919')).map(x => x.limit).join(' ');
const openaiLimits = claimMap.claims.filter(x => x.sourceIds.includes('openai-research-acceleration-20260906')).map(x => x.limit).join(' ');
add('anthropic-claim-limitations', 'Anthropic', 'claim-map.limit', anthropicLimits, anthropicLimits);
add('openai-claim-limitations', 'OpenAI', 'claim-map.limit', openaiLimits, openaiLimits);

const totals = Object.fromEntries(['Anthropic', 'OpenAI'].map(publisher => [publisher, allocations.filter(x => x.publisher === publisher).reduce((sum, x) => sum + x.words, 0)]));
const accountedFields = [
  { field: 'headline', classification: 'SOURCE_DERIVED_SHARED', allocationIds: ['shared-headline-anthropic', 'shared-headline-openai'] },
  { field: 'heroVisual.alt', classification: 'ARTIFACT_DESCRIPTION', note: 'Describes the inspected purpose-built illustration; no provider fact.' },
  { field: 'the_story', classification: 'MIXED', allocationIds: ['shared-opening-anthropic', 'shared-opening-openai', 'anthropic-index', 'openai-agent-runtime'], synthesis: ['These figures describe work inside the companies that made the systems. They are not a change to an everyday ChatGPT or Claude account.'] },
  { field: 'laidies_read', classification: 'MIXED', allocationIds: ['anthropic-supervision', 'openai-human-role-and-intervention', 'shared-preliminary-anthropic', 'shared-preliminary-openai', 'anthropic-method-limits', 'openai-method-limits'], synthesis: ['The crucial distinction is between doing a research task and deciding what research should happen.'] },
  { field: 'what_this_means', classification: 'MIXED', allocationIds: ['anthropic-autonomy-takeaway'], synthesis: ['When you see the next dramatic percentage, ask three questions: Which work was counted? What did the human still decide? Was the measure independently checked? Those questions separate a real change in research practice from a claim that the machines are running the laboratory.'] },
  { field: 'cocktail_party', classification: 'SOURCE_DERIVED_SHARED', allocationIds: ['shared-cocktail-anthropic', 'shared-cocktail-openai'] },
  { field: 'class_notes', classification: 'EDITORIAL_AUTHORITY', note: 'Current LAiDIES Library destination and learning payoff; not evidence for provider measurements.' },
  { field: 'sources[0].label', classification: 'SOURCE_DERIVED', allocationIds: ['anthropic-source-label'] },
  { field: 'sources[1].label', classification: 'SOURCE_DERIVED', allocationIds: ['openai-source-label'] },
  { field: 'claim-map.limit', classification: 'SOURCE_DERIVED', allocationIds: ['anthropic-claim-limitations', 'openai-claim-limitations'] }
];
const budget = {
  schemaVersion: 'newsstand-source-budget-v2',
  candidateId: story.id,
  method: 'Conservative whitespace count of every visitor-facing source-derived fragment and every claim limitation. Shared wording is charged in full to each provider. Editorial synthesis, learning authority and artifact description are explicitly accounted rather than silently exempted.',
  limits: { Anthropic: 200, OpenAI: 200 },
  allocations,
  totals,
  quoteDerivedWords: { Anthropic: 1, OpenAI: 0, note: 'Only the quoted label “led” is reproduced as direct provider wording; the article paraphrases all other evidence.' },
  accountedFields,
  allVisitorFieldsAccountedFor: Object.keys(visible).every(field => accountedFields.some(x => x.field === field)),
  allClaimLimitationsAccountedFor: accountedFields.some(x => x.field === 'claim-map.limit'),
  withinLimits: totals.Anthropic < 200 && totals.OpenAI < 200,
  unmappedSourceDerivedClaims: []
};
const check = {
  schemaVersion: 'newsstand-source-budget-check-v2',
  candidateId: story.id,
  limits: budget.limits,
  totals,
  exactFragmentSubstringChecks: allocations.map(x => ({ allocationId: x.allocationId, status: 'PASS', words: x.words })),
  visitorFields: Object.keys(visible),
  allVisitorFieldsAccountedFor: budget.allVisitorFieldsAccountedFor,
  allClaimLimitationsAccountedFor: budget.allClaimLimitationsAccountedFor,
  quoteBudget: { limitPerSource: 25, ...budget.quoteDerivedWords, status: budget.quoteDerivedWords.Anthropic <= 25 && budget.quoteDerivedWords.OpenAI <= 25 ? 'PASS' : 'FAIL' },
  status: budget.withinLimits && budget.allVisitorFieldsAccountedFor && budget.allClaimLimitationsAccountedFor ? 'PASS' : 'FAIL'
};
fs.writeFileSync(dir + 'source-budget-final.json', JSON.stringify(budget, null, 2) + '\n');
fs.writeFileSync(dir + 'source-budget-check.json', JSON.stringify(check, null, 2) + '\n');
if (check.status !== 'PASS') throw new Error(JSON.stringify(check, null, 2));
console.log(JSON.stringify({ status: check.status, totals, fields: check.visitorFields.length, allocations: allocations.length }, null, 2));
