import fs from 'node:fs';

const checks = [];
const chatScript = fs.readFileSync('community/chat-room-digest.js', 'utf8');
const chatPage = fs.readFileSync('community/chat-room-digest.html', 'utf8');
const cardPage = fs.readFileSync('games/trading-cards.html', 'utf8');

function check(name, condition) {
  checks.push({ name, condition });
  console.log(`${condition ? 'PASS' : 'FAIL'} ${name}`);
}

check('Chat Room Digest does not request the held digest feed', !chatScript.includes('chat-room-digest.json'));
check('Chat Room Digest names the unpublished current state', chatScript.includes('No current digest is published.'));
check('Chat Room Digest page requests the held-feed repair cache identity', chatPage.includes('chat-room-digest.js?v=20260829-held-feed-1'));
check('Trading Cards does not request the held card catalogue', !cardPage.includes('card-packs.json'));
check('Trading Cards names the unpublished preview state', cardPage.includes('No prompt previews are published yet.'));

const failures = checks.filter((entry) => !entry.condition);
console.log(`Held feed boundary: ${checks.length - failures.length}/${checks.length} passed`);
process.exit(failures.length ? 1 : 0);
