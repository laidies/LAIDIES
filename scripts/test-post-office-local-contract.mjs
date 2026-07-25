#!/usr/bin/env node
/**
 * Post Office local-only contract checks.
 * They intentionally make no network, provider, clipboard or native-share call.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const postcard = read("postcard.html");
const postOffice = read("post-office.html");
const rack = read("content/site/post-office.js");

// A shared URL is a public identifier, never a container for a private note or handle.
assert.match(postcard, /function postcardURL\(\)[\s\S]*?\?pc=/);
assert.doesNotMatch(postcard, /function postcardURL\([\s\S]*?(?:[?&]from=|[?&]note=)/);
assert.match(postcard, /params\.has\('from'\).*params\.has\('note'\)/);
assert.match(postcard, /history\.replaceState\(null, '', location\.pathname \+ safeQuery \+ location\.hash\)/);
assert.match(postcard, /notes and writer handles[\s\S]*never a URL or analytics/i);

// The share/copy UI must leave an accessible, honest recovery path.
assert.match(postcard, /Share sheet closed without sending/);
assert.match(postcard, /Automatic copying was not allowed/);
assert.match(postcard, /Opening your text app\. This page cannot confirm a send/);
assert.match(postcard, /Opening your email app\. This page cannot confirm a send/);
assert.match(postcard, /id="pcCopyFallback" hidden/);
assert.match(postcard, /id="pcStatus" role="status"/);
assert.match(postcard, /setAttribute\('aria-pressed', isPicked \? 'true' : 'false'\)/);
assert.match(postcard, /does not confirm that a message was sent, opened or joined/);

// No custom analytics call receives postcard payloads in these surfaces.
assert.doesNotMatch(postcard, /plausible\([^)]*(?:note|handle|postcardURL|messageText)/i);
assert.doesNotMatch(postOffice, /plausible\([^)]*(?:email|token|share)/i);

// Newsletter UI names the provider and says a popup is not proof of subscription.
assert.match(postOffice, /Your email goes to Buttondown/);
assert.match(postOffice, /not a subscription receipt/);
assert.match(postOffice, /href="\/privacy\.html"/);
assert.match(postOffice, /aria-describedby="po-newsletter-notice"/);
assert.match(postOffice, /id="po-newsletter-status" role="status" aria-live="polite" hidden/);
assert.match(postOffice, /Your browser blocked the Buttondown window, so no signup request was sent here/);
assert.match(postOffice, /opening it does not create an account/);

// The Post Office rack can only hand an admitted postcard identifier to the composer.
const postcardIds = [...postcard.matchAll(/\{ id: '([^']+)'/g)].map((match) => match[1]);
const rackIds = [...rack.matchAll(/\{ id: "([^"]+)"/g)].map((match) => match[1]);
for (const id of rackIds) assert.ok(postcardIds.includes(id), `rack card ${id} exists in postcard composer`);
for (const file of [...rack.matchAll(/file: "([^"]+)"/g)].map((match) => match[1])) {
  assert.ok(existsSync(resolve(root, "assets/postcards/from-sunnyvaile", file)), `rack asset exists: ${file}`);
}
assert.match(rack, /writeLink\.href = "\/postcard\.html\?pc=" \+ encodeURIComponent\(card\.id\)/);

// Every inline script remains syntactically parseable without executing a service call.
for (const match of postcard.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) new vm.Script(match[1]);
for (const match of postOffice.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) new vm.Script(match[1]);

console.log("PASS: Post Office local contract (privacy, truthful failures, source binding)");
