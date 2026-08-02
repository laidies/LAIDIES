#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const portfolioPath = 'operations/product-stewards/control-room/portfolio-work-inventory.json';
const queuePath = 'operations/control-room/owner-review-queue.json';
const runQueuePath = 'operations/product-stewards/run-queue.json';
const registryPath = 'operations/product-stewards/registry.json';
const outputPath = 'operations/control-room/work-index.json';
const portfolio = read(portfolioPath);
const queue = read(queuePath);
const runQueue = read(runQueuePath);
const registry = read(registryPath);

const categories = {
  NEEDS_ALI_NOW: [],
  INTERNAL_REPAIR: [],
  BUILDING: [],
  BLOCKED: [],
  READY_TO_RELEASE: [],
  VERIFIED_PUBLICLY: [],
  BACKLOG: []
};

for (const item of queue.review_now || []) categories.NEEDS_ALI_NOW.push({
  id: item.id, title: item.title, owner: 'Control Room acceptance owner',
  current_truth: item.why_you, next_action: item.ask, source: queuePath
});
for (const item of queue.internal_repair_required || []) categories.INTERNAL_REPAIR.push({
  id: item.id, title: item.title, owner: 'Episode Media Quality',
  current_truth: item.decision, next_action: item.ask, source: queuePath
});
for (const [index, item] of (queue.being_built || []).entries()) categories.BUILDING.push({
  id: `OWNER-QUEUE-BUILD-${index + 1}`, title: item.title, owner: 'Product owner',
  current_truth: item.status, next_action: item.ali_action, source: queuePath
});
for (const [index, item] of (queue.blocked_no_ali_action || []).entries()) categories.BLOCKED.push({
  id: `OWNER-QUEUE-BLOCK-${index + 1}`, title: item.title, owner: item.owner,
  current_truth: item.reason, next_action: 'Responsible owner resolves the named dependency; no Ali action is implied.', source: queuePath
});

const portfolioBucket = status => {
  if (status === 'PUBLICLY VERIFIED') return 'VERIFIED_PUBLICLY';
  if (status === 'BLOCKED' || status === 'HOLD') return 'BLOCKED';
  if (status === 'BUILDING' || status === 'BUILT LOCALLY') return 'BUILDING';
  return 'BACKLOG';
};
for (const item of portfolio.items || []) categories[portfolioBucket(item.status)].push({
  id: item.id,
  title: item.title,
  owner: (item.ownerProductIds || []).join(', ') || 'UNASSIGNED',
  building_or_function: item.buildingOrFunction,
  priority: item.priority,
  status: item.status,
  disposition: item.disposition,
  current_truth: item.currentTruth,
  next_action: item.nextAction,
  done_when: item.doneWhen,
  sources: item.sources || [],
  source: portfolioPath
});
for (const item of [...(runQueue.stale_runtime_records || []), ...(runQueue.stale_portfolio_work || [])]) {
  if (item.status !== 'STALE_RECONCILIATION_REQUIRED') continue;
  categories.BLOCKED.push({
    id: `STALE-RUNTIME-${item.product_id || item.system_id}`,
    title: `Stale runtime record — ${item.product_id || item.system_id}`,
    owner: item.integration_owner || item.owner_task_id || 'Control Room',
    current_truth: `The prior RUNNING claim is quarantined. Last heartbeat: ${item.heartbeat_at || 'missing'}.`,
    next_action: runQueue.runtime_reconciliation?.next_action,
    source: runQueuePath
  });
}

const stewardBase = path.join(root, 'operations/product-stewards');
const ownerEntry = { total: registry.products.length, missing_dossier: 0, missing_state: 0, missing_visual_asset_inventory: 0 };
for (const product of registry.products) {
  const dossier = path.join(stewardBase, product.dossier);
  const state = path.join(stewardBase, product.state);
  if (!fs.existsSync(dossier)) ownerEntry.missing_dossier += 1;
  if (!fs.existsSync(state)) ownerEntry.missing_state += 1;
  if (product.kind === 'building' && !fs.existsSync(path.join(path.dirname(dossier), 'VISUAL-ASSET-INVENTORY.md'))) ownerEntry.missing_visual_asset_inventory += 1;
}
ownerEntry.ready = ownerEntry.total - new Set(registry.products.filter(product => {
  const dossier = path.join(stewardBase, product.dossier);
  const state = path.join(stewardBase, product.state);
  return !fs.existsSync(dossier) || !fs.existsSync(state) || (product.kind === 'building' && !fs.existsSync(path.join(path.dirname(dossier), 'VISUAL-ASSET-INVENTORY.md')));
}).map(product => product.id)).size;

const index = {
  schema: 'laidies.control-room.work-index.v1',
  generated_at: new Date().toISOString(),
  truth_rule: 'This is a generated operational index. NEEDS_ALI_NOW is populated only by the objectively admitted owner-review queue. Local, built, approved, released and publicly verified are distinct states.',
  scope: {
    portfolio_products_and_buildings: true,
    sitewide_systems: true,
    content_and_media: true,
    release_and_publication: true,
    site_and_agent_health: true,
    analytics_visitors_and_signups: true,
    schedule_and_weekly_episode_engine: true,
    social_and_campaigns: true,
    recommendations_and_learning_loop: true,
    blockers_owners_and_exact_next_actions: true
  },
  source_freshness: {
    [portfolioPath]: portfolio.asOf,
    [queuePath]: queue.generated_at,
    [runQueuePath]: runQueue.updated,
    [registryPath]: registry.updated
  },
  runtime_health: {
    owner_entry: ownerEntry,
    stale_runtime_records_quarantined: [...(runQueue.stale_runtime_records || []), ...(runQueue.stale_portfolio_work || [])].filter(item => item.status === 'STALE_RECONCILIATION_REQUIRED').length,
    ordinary_product_steward_check: 'RUN_SEPARATELY',
    strict_owner_entry_gate: ownerEntry.ready === ownerEntry.total ? 'PASS' : 'FAIL_BUILD_REQUIRED'
  },
  control_modules: [
    { name: 'Portfolio work', status: 'LIVE_GENERATED', next_action: 'Regenerate this index whenever canonical portfolio or owner-queue state changes.' },
    { name: 'Owner decisions and reviews', status: 'LIVE_GENERATED', next_action: 'Admit only objective-pass work through the owner-review queue.' },
    { name: 'Agent and champion health', status: 'PARTIAL', next_action: 'Connect actual Codex task liveness and dispatch receipts; stale-file detection alone is not live health.' },
    { name: 'Site health and release verification', status: 'BUILD_REQUIRED', next_action: 'Ingest latest exact public-verification and journey receipts into this index.' },
    { name: 'Visitors and popular journeys', status: 'BUILD_REQUIRED', next_action: 'Connect privacy-safe aggregate analytics; unknown values must remain unknown, not zero.' },
    { name: 'New sign-ups and returning residents', status: 'BUILD_REQUIRED', next_action: 'Connect verified privacy-safe Resident Card aggregates without exposing personal data.' },
    { name: 'Upcoming episode and content schedule', status: 'BUILD_REQUIRED', next_action: 'Generate from accepted release plans and weekly-cycle state, not informal dates.' },
    { name: 'Social content and channel operations', status: 'BUILD_REQUIRED', next_action: 'Reconcile recovery authority, then ingest built/approved/scheduled/published truth and measurement.' },
    { name: 'Recommendations and learning loop', status: 'PARTIAL', next_action: 'Ingest ranked opportunities, measured outcomes and accepted/rejected dispositions with owners.' }
  ],
  counts: Object.fromEntries(Object.entries(categories).map(([key, items]) => [key, items.length])),
  categories
};

fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(index, null, 2)}\n`);
console.log(`${outputPath}: ${Object.values(categories).reduce((sum, items) => sum + items.length, 0)} indexed records`);
