#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../../../..');
const relative = name => path.relative(root, path.join(here, name));
const bind = name => {
  const bytes = fs.readFileSync(path.join(here, name));
  return { path: relative(name), sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
};
const seed = JSON.parse(fs.readFileSync(path.join(here, 'candidate-package-seed.json')));
const candidate = {
  ...seed,
  schemaVersion: 'newsstand-ordinary-story-candidate-v1',
  candidateStatus: 'READY_FOR_ISSUE_ADMISSION',
  reviewEvidence: {
    ...seed.reviewEvidence,
    independent: bind('independent-publication-review.json'),
    independentRawReport: bind('independent-publication-raw-report.json')
  }
};
fs.writeFileSync(path.join(here, 'candidate-package.json'), `${JSON.stringify(candidate, null, 2)}\n`);
console.log(JSON.stringify({ candidateId: candidate.candidateId, storySha256: candidate.storySha256, candidatePackage: bind('candidate-package.json') }));
