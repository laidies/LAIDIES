#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const expected = {
  maker: ['work truth', 'visitor identity', 'responsive UX', 'building UX', 'brand and voice'],
  independent_judge: ['exact concerns named by the judgment assignment', 'maker/judge separation'],
  product_owner: ['every sitewide concern materially touched', 'operations/DECISIONS.md', 'operations/LESSONS-ACTIVE.md'],
  release_verifier: ['release and public proof', 'rights/provenance'],
  researcher: ['freshness and source intelligence', 'rights/provenance'],
  episode_video_producer: ['one named episode or trailer assignment', 'check:rejected-episode-media', 'Canva creates motion', 'CapCut assembles'],
};

for (const [role, phrases] of Object.entries(expected)) {
  const source = fs.readFileSync(path.join(root, `.codex/agents/${role}.toml`), 'utf8');
  assert.match(source, /CANONICAL-INSTRUCTION-DEPENDENCY-MAP\.md/, `${role} must route through the canonical dependency map`);
  assert.match(source, /whole binding files/i, `${role} must load whole sources, not copied excerpts`);
  for (const phrase of phrases) assert(source.includes(phrase), `${role} is missing routed concern: ${phrase}`);
}

const owner = fs.readFileSync(path.join(root, '.codex/agents/product_owner.toml'), 'utf8');
assert.doesNotMatch(owner, /Read .*painpoints log/i, 'product owner must not universally preload the painpoints archive');

const judge = fs.readFileSync(path.join(root, '.codex/agents/independent_judge.toml'), 'utf8');
assert.match(judge, /NO independent semantic-admission authority/, 'same-family judge must not claim independent semantic admission');
assert.match(judge, /run-independent-content-judge\.mjs/, 'semantic admission must route to the different-family judge');

const episodeProducer = fs.readFileSync(path.join(root, '.codex/agents/episode_video_producer.toml'), 'utf8');
assert.match(episodeProducer, /\$produce-laidies-episode-video/, 'episode producer must invoke its narrow reusable skill');
assert.match(episodeProducer, /retired, rejected, quarantined, unbound, hash-mismatched/, 'episode producer must fail closed on stale media states');

console.log('AGENT ROLE ROUTING TEST PASS roles=6 whole_sources=6 painpoints_universal=0 same_family_semantic_authority=denied different_family_route=required episode_stale_media=denied');
