import fs from 'node:fs';
import { spawnSync, spawn } from 'node:child_process';

const dir = 'operations/product-stewards/newsstand/candidates/california-ai-oversight-order-20260920/';
if (process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_BASE_URL) throw Error('New API transport is outside the existing authorized subscription route.');
const auth = spawnSync('claude', ['auth', 'status'], { encoding: 'utf8' });
const status = JSON.parse(auth.stdout);
if (auth.status !== 0 || status.authMethod !== 'claude.ai' || status.subscriptionType !== 'max') throw Error('Existing Claude Max subscription not verified.');
const args = ['operations/product-stewards/newsstand/review-runtime/run-pilot.mjs', 'article', 'claude', '--candidate-dir', dir, '--calibration', 'operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/', '--output', dir + 'editorial-review-v1/'];
const startedAt = new Date().toISOString();
fs.writeFileSync(dir + 'editorial-subscription-route.json', JSON.stringify({ checkedAt: startedAt, authMethod: status.authMethod, subscriptionType: status.subscriptionType, newApiCost: false, apiKeyPresent: false, scope: 'Actual qualified cross-family Claude editorial review on existing Max subscription; no publication or queue authority.' }, null, 2) + '\n');
const child = spawn('node', args, { stdio: ['ignore', 'pipe', 'pipe'] });
let stdout = '', stderr = '';
child.stdout.on('data', value => { stdout += value; process.stdout.write(value); });
child.stderr.on('data', value => { stderr += value; process.stderr.write(value); });
child.on('close', code => {
  fs.writeFileSync(dir + 'editorial-execution.json', JSON.stringify({ startedAt, completedAt: new Date().toISOString(), exitCode: code, command: ['node', ...args], stdout, stderr }, null, 2) + '\n');
  process.exitCode = code;
});
