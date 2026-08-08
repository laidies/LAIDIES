#!/usr/bin/env node

import assert from 'node:assert/strict';
import { validateGitHubPagesReleaseBoundary } from './check-github-pages-release-boundary.mjs';

assert.deepEqual(validateGitHubPagesReleaseBoundary({ build_type: 'workflow' }), []);

const unsafe = validateGitHubPagesReleaseBoundary({
  build_type: 'legacy',
  source: { branch: 'main', path: '/' },
});
assert.equal(unsafe.length, 1);
assert.match(unsafe[0], /current build_type=legacy source=main:\//);

assert.equal(validateGitHubPagesReleaseBoundary(null).length, 1);

console.log('GITHUB PAGES RELEASE BOUNDARY CALIBRATION PASS workflow=allowed legacy_main=blocked missing=blocked');
