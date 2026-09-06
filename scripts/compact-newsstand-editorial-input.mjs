#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PRIVATE_ROOT = path.join(ROOT, 'operations', 'product-stewards');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function asNonEmptyString(value) {
  return typeof value === 'string' && value.trim() ? value : null;
}

function collectUrls(value, urls = new Set()) {
  if (!value || typeof value !== 'object') return urls;
  if (Array.isArray(value)) {
    for (const item of value) collectUrls(item, urls);
    return urls;
  }
  for (const [key, child] of Object.entries(value)) {
    if (['url', 'locator', 'href'].includes(key) && asNonEmptyString(child)) {
      urls.add(child);
    } else if (child && typeof child === 'object') {
      collectUrls(child, urls);
    }
  }
  return urls;
}

function collectPassages(value, inheritedUrls, passages = []) {
  if (typeof value === 'string') {
    if (value) passages.push({ text: value, urls: inheritedUrls });
    return passages;
  }
  if (!value || typeof value !== 'object') return passages;
  if (Array.isArray(value)) {
    for (const item of value) collectPassages(item, inheritedUrls, passages);
    return passages;
  }

  const urls = new Set([...inheritedUrls, ...collectUrls(value)]);
  for (const key of ['source', 'passage', 'additionalPassage']) {
    if (Object.hasOwn(value, key)) collectPassages(value[key], urls, passages);
  }
  for (const key of ['passages', 'additionalPassages']) {
    if (Object.hasOwn(value, key)) collectPassages(value[key], urls, passages);
  }
  return passages;
}

function indexSources(sources) {
  if (!Array.isArray(sources) || !sources.length) {
    throw new Error('Editorial packet must contain supplied sources.');
  }
  return sources.map((source, index) => {
    const id = asNonEmptyString(source?.id);
    if (!id) throw new Error('Source at index ' + index + ' is missing its id.');
    const urls = collectUrls(source);
    const passages = collectPassages(source, urls);
    if (!passages.length) throw new Error('Source ' + id + ' has no supplied passage.');
    return { id, passages };
  });
}

function matchedSourceIds(evidence, sources) {
  const excerpt = asNonEmptyString(evidence?.excerpt);
  const locator = asNonEmptyString(evidence?.locator);
  if (!excerpt || !locator) {
    throw new Error('Each claim sourceEvidence entry needs an exact excerpt and locator.');
  }
  return sources
    .filter((source) => source.passages.some((passage) => passage.text === excerpt && passage.urls.has(locator)))
    .map((source) => source.id);
}

export function compactNewsstandEditorialInput(packet) {
  if (!packet || typeof packet !== 'object' || Array.isArray(packet)) {
    throw new Error('Editorial packet must be an object.');
  }
  if (!Array.isArray(packet.claims) || !packet.claims.length) {
    throw new Error('Editorial packet must contain claims.');
  }

  const sourceIndex = indexSources(packet.sources);
  const result = clone(packet);
  result.claims = packet.claims.map((claim, index) => {
    const claimId = asNonEmptyString(claim?.claimId) || 'claim at index ' + index;
    if (!Object.hasOwn(claim, 'sourceEvidence')) {
      const sourceIds = Array.isArray(claim?.sourceIds) ? claim.sourceIds : [];
      if (!sourceIds.length || sourceIds.some((id) => !sourceIndex.some((source) => source.id === id))) {
        throw new Error('Compacted ' + claimId + ' has invalid sourceIds.');
      }
      return clone(claim);
    }
    if (!Array.isArray(claim.sourceEvidence) || !claim.sourceEvidence.length) {
      throw new Error('Claim ' + claimId + ' has no sourceEvidence to compact.');
    }

    const sourceIds = new Set();
    for (const evidence of claim.sourceEvidence) {
      const matched = matchedSourceIds(evidence, sourceIndex);
      if (!matched.length) {
        throw new Error('Unmatched source evidence for ' + claimId + ' at ' + evidence.locator + '.');
      }
      for (const id of matched) sourceIds.add(id);
    }

    const compacted = clone(claim);
    delete compacted.sourceEvidence;
    compacted.sourceIds = [...sourceIds];
    return compacted;
  });
  return result;
}

function privatePath(value, label) {
  const resolved = path.resolve(ROOT, value);
  const relative = path.relative(PRIVATE_ROOT, resolved);
  if (!relative || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    throw new Error(label + ' must be a private path beneath operations/product-stewards.');
  }
  return resolved;
}

function runCli() {
  const [, , inputArgument, outputArgument] = process.argv;
  if (!inputArgument || !outputArgument) {
    throw new Error('Usage: node scripts/compact-newsstand-editorial-input.mjs <private-input.json> <private-output.json>');
  }
  const input = privatePath(inputArgument, 'Input');
  const output = privatePath(outputArgument, 'Output');
  if (input === output) throw new Error('Input and output paths must be distinct.');
  if (fs.existsSync(output)) throw new Error('Refusing to overwrite existing output: ' + output);
  const packet = JSON.parse(fs.readFileSync(input, 'utf8'));
  const compacted = compactNewsstandEditorialInput(packet);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(compacted, null, 2) + '\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    runCli();
  } catch (error) {
    process.stderr.write(String(error?.message || error) + '\n');
    process.exitCode = 1;
  }
}
