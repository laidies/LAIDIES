import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../content/site/newsstand-catchup-v1.js', import.meta.url), 'utf8');
const start = source.indexOf('  function refreshDailyBackIssueAction()');
const end = source.indexOf('  function maybeOpenSharedDailyRequest()', start);
assert.ok(start >= 0 && end > start);
const code = source.slice(start, end);
for (const state of ['archive', 'stale', 'quiet']) {
  for (const admitted of [true, false]) {
    const action = { textContent: 'Initial label' };
    const context = {
      latestStoredDailyIssue: () => ({}),
      data: { publications: { daily: { issue: { frontPaigeStoryId: 'feature' } } } },
      sourceStories: [{ id: 'feature' }],
      document: { querySelector: () => action },
      contract: { effectivePublicationState: () => state, accessDecision: () => ({ canExpose: admitted }) }
    };
    vm.runInNewContext(code + '\nrefreshDailyBackIssueAction();', context);
    assert.equal(action.textContent, admitted ? 'Read the full article →' : 'Browse the archive below');
  }
}
console.log('PASS: persistent admitted feature keeps direct reading action in archive/stale/quiet issues; unadmitted feature does not.');
