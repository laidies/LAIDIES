#!/usr/bin/env node
import { projectWorkEvents } from './project-work-events.mjs';
const activeStatuses = new Set(['ADMITTED', 'IN_PROGRESS', 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY', 'WAITING_EXTERNAL']);
const projection = projectWorkEvents(process.env.LAIDIES_WORK_EVENTS_PATH);
const active = projection.items.filter(item => activeStatuses.has(item.status) && item.lane_mode !== 'legacy_migration_snapshot');
const count = predicate => active.filter(predicate).length;
const failures = [];
for (const item of active) if (!item.work_class || !item.lane_mode) failures.push(`${item.work_id} missing work_class or lane_mode`);
const limits = [
  ['building', count(item => item.work_class === 'building'), 1],
  ['content', count(item => item.work_class === 'content'), 1],
  ['read_only_research', count(item => item.lane_mode === 'read_only_research'), 2],
  ['ali_decision', count(item => item.work_class === 'ali_decision'), 1],
  ['all_active', active.length, 2]
];
for (const [name, actual, limit] of limits) if (actual > limit) failures.push(`${name} active=${actual} limit=${limit}`);
if (failures.length) {
  console.error(`WORK WIP LIMIT FAIL\n${failures.map(v => `- ${v}`).join('\n')}`);
  process.exit(1);
}
console.log(`WORK WIP LIMIT PASS active=${active.length} building=${limits[0][1]} content=${limits[1][1]} research=${limits[2][1]} ali_decision=${limits[3][1]}`);
