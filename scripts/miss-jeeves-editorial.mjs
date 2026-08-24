#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const [, , command, ...args] = process.argv;
const database = 'laidies-library-corrections';
const safeId = /^[a-z0-9][a-z0-9._:-]{0,159}$/i;
const states = new Set(['reviewing', 'planned', 'answered', 'declined']);
const reasonPattern = /^[a-z0-9][a-z0-9_-]{0,79}$/i;

function sqlText(value) { return `'${String(value).replaceAll("'", "''")}'`; }
function run(sql) {
  execFileSync('npx', ['--yes', 'wrangler@4.119.0', 'd1', 'execute', database, '--remote', '--command', sql], { stdio: 'inherit' });
}
function usage() {
  console.error('Usage: node scripts/miss-jeeves-editorial.mjs list | show <receipt> | status <receipt> <reviewing|planned|answered|declined> [reason_code] | purge');
  process.exit(2);
}

if (command === 'list' && args.length === 0) {
  run("SELECT a.topic_id,a.request_count,a.first_seen_at,a.last_seen_at,e.receipt_id,s.state FROM miss_jeeves_topic_request_aggregates a JOIN miss_jeeves_topic_request_events e ON e.request_id=a.latest_request_id JOIN miss_jeeves_topic_request_status_events s ON s.request_id=e.request_id WHERE s.created_at=(SELECT MAX(created_at) FROM miss_jeeves_topic_request_status_events WHERE request_id=e.request_id) ORDER BY a.request_count DESC,a.last_seen_at DESC LIMIT 100");
} else if (command === 'show' && args.length === 1 && safeId.test(args[0])) {
  run(`SELECT e.receipt_id,e.topic_id,e.placement,p.question,p.expires_at,s.state,s.reason_code,s.created_at AS status_at FROM miss_jeeves_topic_request_events e LEFT JOIN miss_jeeves_topic_request_payload_vault p ON p.request_id=e.request_id JOIN miss_jeeves_topic_request_status_events s ON s.request_id=e.request_id WHERE e.receipt_id=${sqlText(args[0])} ORDER BY s.created_at DESC LIMIT 1`);
} else if (command === 'status' && args.length >= 2 && args.length <= 3 && safeId.test(args[0]) && states.has(args[1]) && (!args[2] || reasonPattern.test(args[2]))) {
  const eventId = `mje_${crypto.randomUUID().replaceAll('-', '')}`;
  const now = new Date().toISOString();
  run(`INSERT INTO miss_jeeves_topic_request_status_events (status_event_id,request_id,state,reason_code,created_at) SELECT ${sqlText(eventId)},request_id,${sqlText(args[1])},${args[2] ? sqlText(args[2]) : 'NULL'},${sqlText(now)} FROM miss_jeeves_topic_request_events WHERE receipt_id=${sqlText(args[0])}`);
} else if (command === 'purge' && args.length === 0) {
  run(`DELETE FROM miss_jeeves_topic_request_payload_vault WHERE expires_at < ${sqlText(new Date().toISOString())}`);
} else {
  usage();
}
