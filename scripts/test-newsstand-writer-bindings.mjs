import fs from 'node:fs';
import assert from 'node:assert/strict';
import {inspectPreparedDraft} from './prepare-newsstand-draft.mjs';

for (const id of ['microsoft-capacity-20260912', 'nvidia-groq-inquiry-20260912']) {
  const directory = new URL('../operations/product-stewards/newsstand/candidates/' + id + '/', import.meta.url);
  const read = name => JSON.parse(fs.readFileSync(new URL(name, directory)));
  const story = read('story.json'), input = read('writer-input-current.json'), observations = read('producer-observations.json');
  assert.deepEqual(inspectPreparedDraft(story, input, observations).errors, []);
  const oldShape = {...input, bindings: {sourceEvidence: input.bindings[0]}};
  assert.match(inspectPreparedDraft(story, oldShape, observations).errors.join(' '), /bindings must be an array/);
  const malformed = {...input, bindings: [{path: 'source.json', sha256: 'missing'}]};
  assert.match(inspectPreparedDraft(story, malformed, observations).errors.join(' '), /exact path and SHA-256/);
}
console.log('WRITER BINDINGS PASS: two actual inputs accepted; four malformed controls rejected before editorial review.');
