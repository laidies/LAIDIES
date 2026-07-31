#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packetsPath = path.join(
  root,
  'operations/product-stewards/control-room/decision-packets.json',
);
const blockersPath = path.join(root, 'content/learning-blocker-resolution-queue.json');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const failures = [];

const packetsDocument = readJson(packetsPath);
const blockersDocument = readJson(blockersPath);
const packets = Array.isArray(packetsDocument.packets) ? packetsDocument.packets : [];
const blockers = Array.isArray(blockersDocument.tasks) ? blockersDocument.tasks : [];
const delivery = packetsDocument.delivery ?? {};

for (const field of [
  'sourceOfTruth',
  'interruptRule',
  'notificationContents',
  'resolutionPath',
  'reminderRule',
  'staleRule',
  'maximumReadyAtOnce',
]) {
  if (delivery[field] === undefined || delivery[field] === null) {
    failures.push(`decision-packets.json delivery.${field} is required`);
  }
}

if (!Array.isArray(delivery.notificationContents) || delivery.notificationContents.length < 4) {
  failures.push('delivery.notificationContents must contain at least four concrete items');
}

if (!Number.isInteger(delivery.maximumReadyAtOnce) || delivery.maximumReadyAtOnce < 1) {
  failures.push('delivery.maximumReadyAtOnce must be a positive integer');
}

const readyPackets = packets.filter((packet) => packet.status === 'READY');
if (readyPackets.length > delivery.maximumReadyAtOnce) {
  failures.push(
    `${readyPackets.length} READY packets exceeds maximumReadyAtOnce=${delivery.maximumReadyAtOnce}`,
  );
}

const packetIds = new Set(packets.map((packet) => packet.id));
for (const blocker of blockers) {
  if (typeof blocker.requiresAli !== 'boolean') {
    failures.push(`${blocker.id ?? 'unknown blocker'} requiresAli must be true or false`);
    continue;
  }

  if (blocker.requiresAli) {
    if (typeof blocker.aliDecisionId !== 'string' || blocker.aliDecisionId.length === 0) {
      failures.push(`${blocker.id} requires Ali but has no aliDecisionId`);
    } else if (!packetIds.has(blocker.aliDecisionId)) {
      failures.push(`${blocker.id} references missing decision packet ${blocker.aliDecisionId}`);
    } else {
      const packet = packets.find((item) => item.id === blocker.aliDecisionId);
      if (packet.status !== 'READY') {
        failures.push(`${blocker.id} routes Ali to ${packet.id}, but that packet is ${packet.status}`);
      }
    }
  } else if (blocker.aliDecisionId !== null) {
    failures.push(`${blocker.id} does not require Ali, so aliDecisionId must be null`);
  }
}

if (failures.length > 0) {
  console.error('Ali decision routing: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Ali decision routing: PASS (${blockers.length} blockers, ${packets.length} packets, ${readyPackets.length} READY)`,
);
