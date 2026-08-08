#!/usr/bin/env node

import fs from 'node:fs';

export function validateGitHubPagesReleaseBoundary(config) {
  const errors = [];
  if (!config || typeof config !== 'object') return ['GitHub Pages configuration is missing'];
  if (config.build_type !== 'workflow') {
    const source = config.source && typeof config.source === 'object'
      ? `${config.source.branch || 'unknown'}:${config.source.path || 'unknown'}`
      : 'unknown';
    errors.push(`GitHub Pages must use workflow-controlled releases; current build_type=${config.build_type || 'unknown'} source=${source}`);
  }
  return errors;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Usage: node scripts/check-github-pages-release-boundary.mjs <pages-config.json>');
    process.exit(2);
  }
  const errors = validateGitHubPagesReleaseBoundary(JSON.parse(fs.readFileSync(inputPath, 'utf8')));
  if (errors.length) {
    console.error(`GITHUB PAGES RELEASE BOUNDARY FAIL\n${errors.join('\n')}`);
    process.exit(1);
  }
  console.log('GITHUB PAGES RELEASE BOUNDARY PASS build_type=workflow');
}
