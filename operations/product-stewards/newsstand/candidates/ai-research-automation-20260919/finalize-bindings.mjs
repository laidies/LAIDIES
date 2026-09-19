import fs from 'node:fs';
import crypto from 'node:crypto';

const dir = 'operations/product-stewards/newsstand/candidates/ai-research-automation-20260919/';
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const read = name => fs.readFileSync(dir + name);
const json = name => JSON.parse(read(name));
const write = (name, value) => fs.writeFileSync(dir + name, JSON.stringify(value, null, 2) + '\n');
const bind = name => ({ path: dir + name, sha256: sha(read(name)) });

const storyBinding = bind('story.json');
const evidenceBinding = bind('source-evidence.json');
const budgetBinding = bind('source-budget-final.json');
const budget = json('source-budget-final.json');

const claims = json('claim-map.json');
claims.claims.find(x => x.claimId === 'anthropic-index').claim = 'As of August 2026, Anthropic says Claude led 26% of measured AI research work, performed at least collaboratively in more than 90%, and was fully autonomous in none.';
claims.claims.find(x => x.claimId === 'anthropic-level').claim = 'Anthropic says “led” means completing most of a defined task from a high-level prompt while a human supervises; fully autonomous work removes the human.';
write('claim-map.json', claims);

const contract = json('producer-contract.json');
for (const truth of contract.canonicalTruth) truth.source = evidenceBinding;
contract.sourceBudget = budgetBinding;
contract.knownFailurePreflight.candidateRepairPreflight.autonomy = 'The article defines recursive self-improvement in plain language and distinguishes it from supervised bounded work; Anthropic says no measured subset was fully autonomous.';
contract.knownFailurePreflight.candidateRepairPreflight.budget = `All visible source-derived wording and claim limitations are charged conservatively: ${budget.totals.Anthropic}/200 Anthropic and ${budget.totals.OpenAI}/200 OpenAI. One quoted provider label word remains below the 25-word quotation limit.`;
contract.draftArchitecture.requiredTerms = [{ term: 'recursive self-improvement', meaning: 'a model independently building its successor without a human in the loop; not established by these reports' }];
contract.draftArchitecture.presentationPlan = 'Purpose-built editorial art shows a pinned human goal, bounded computer work, active human evaluation and human selection of the final result.';
contract.representativeProofPlan.plannedProof = 'Bind Anthropic’s supervised-work definition and OpenAI’s human-decision statement beside the percentages; state the internal-method limitations and consumer boundary.';
write('producer-contract.json', contract);

const visualContract = json('art/producer-contract-v2.json');
visualContract.storyBinding = storyBinding;
visualContract.status = 'RENDERED_AND_MAKER_INSPECTED_PENDING_INDEPENDENT_REBIND';
write('art/producer-contract-v2.json', visualContract);

const maker = json('art/maker-inspection-v2.json');
maker.story = storyBinding;
maker.producerContract = bind('art/producer-contract-v2.json');
maker.limitations = [
  'The screens and paper charts are conceptual research props, not an Anthropic or OpenAI interface.',
  'The image is an editorial composition, not a literal photograph of either lab.',
  'The independent visual PASS must bind this final story and these final maker and producer-contract hashes before semantic provider dispatch.'
];
write('art/maker-inspection-v2.json', maker);

const verification = json('source-substring-verification.json');
const passages = json('source-passages.json');
verification.exactSourceWords = passages.exactSourceWords;
write('source-substring-verification.json', verification);

console.log(JSON.stringify({
  story: storyBinding,
  sourceEvidence: evidenceBinding,
  sourceBudget: budgetBinding,
  visualContract: bind('art/producer-contract-v2.json'),
  makerInspection: bind('art/maker-inspection-v2.json'),
  image: { path: 'proposed/assets/newsstand/ai-research-automation-20260919.png', sha256: sha(fs.readFileSync('proposed/assets/newsstand/ai-research-automation-20260919.png')) }
}, null, 2));
