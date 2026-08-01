#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const registryPath = path.join(root, 'operations/product-stewards/registry.json');
const programPath = path.join(root, 'operations/launch/opening-day-whole-town-program-2026-07-31.json');

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const program = JSON.parse(fs.readFileSync(programPath, 'utf8'));
const errors = [];

if (typeof program.class_catalogue_manifest !== 'string' || !fs.existsSync(path.join(root, program.class_catalogue_manifest))) {
  errors.push('Opening-day class catalogue manifest is missing.');
}

if (typeof program.media_gate_manifest !== 'string' || !fs.existsSync(path.join(root, program.media_gate_manifest))) {
  errors.push('Opening-day media gate manifest is missing.');
}

const registered = registry.products
  .filter((product) => product.kind === 'building')
  .sort((a, b) => a.building_number - b.building_number);
const planned = [...program.buildings].sort((a, b) => a.number - b.number);

if (registered.length !== 17) errors.push(`Expected 17 registered buildings; found ${registered.length}.`);
if (planned.length !== registered.length) errors.push(`Program covers ${planned.length}/${registered.length} buildings.`);

for (const product of registered) {
  const item = planned.find((candidate) => candidate.id === product.id);
  if (!item) {
    errors.push(`Missing building: ${product.id}.`);
    continue;
  }
  if (item.number !== product.building_number) errors.push(`${product.id}: number ${item.number} != registry ${product.building_number}.`);
  if (item.name !== product.name) errors.push(`${product.id}: name does not match registry.`);
  if (typeof item.status !== 'string' || item.status.trim().length < 3) errors.push(`${product.id}: missing status.`);
  for (const field of ['opening_day_floor', 'acceptance_proof', 'next_action']) {
    if (typeof item[field] !== 'string' || item[field].trim().length < 12) errors.push(`${product.id}: missing substantive ${field}.`);
  }
}

const plannedIds = new Set();
for (const item of planned) {
  if (plannedIds.has(item.id)) errors.push(`Duplicate building id: ${item.id}.`);
  plannedIds.add(item.id);
}

for (const field of ['episodes', 'classes', 'library_books', 'study_packs', 'news', 'daily', 'music', 'luminairy', 'community', 'games_and_tools']) {
  if (typeof program.launch_catalogue?.[field] !== 'string' || program.launch_catalogue[field].trim().length < 12) {
    errors.push(`Missing substantive launch catalogue floor: ${field}.`);
  }
}

if (!Array.isArray(program.shared_systems) || program.shared_systems.length < 8) errors.push('Expected at least eight shared-system launch contracts.');
for (const system of program.shared_systems ?? []) {
  for (const field of ['id', 'owner_product', 'status', 'opening_day_floor', 'acceptance_proof', 'next_action']) {
    if (typeof system[field] !== 'string' || system[field].trim().length < 3) errors.push(`Shared system ${system.id ?? '<unknown>'}: missing ${field}.`);
  }
}

const openingEpisodes = program.episode_cutline?.opening_day ?? [];
if (openingEpisodes.length !== 5 || !openingEpisodes.some((entry) => entry.startsWith('Episode 04'))) {
  errors.push('Opening episode cutline must contain Trailer plus Episodes 01–04.');
}
if (program.episode_cutline?.first_post_opening_release !== 'Episode 05') errors.push('Episode 05 must remain the first post-opening release.');
if (program.episode_cutline?.scheduled_release_date !== '2026-08-05') errors.push('Episode 05 release date must be 2026-08-05.');

if (errors.length) {
  console.error('OPENING DAY PROGRAM: FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('OPENING DAY PROGRAM: PASS');
console.log(`- ${planned.length}/${registered.length} canonical buildings covered`);
console.log(`- ${program.shared_systems.length} shared-system contracts covered`);
console.log(`- ${Object.keys(program.launch_catalogue).length} catalogue floors covered`);
console.log('- Opening cutline: Trailer + Episodes 01–04');
console.log('- First post-opening release: Episode 05 on 2026-08-05');
