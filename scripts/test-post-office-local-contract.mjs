#!/usr/bin/env node
/**
 * Post Office local-only contract checks.
 * They intentionally make no network, provider, clipboard or native-share call.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";

const root = resolve(process.env.POST_OFFICE_ROOT || process.cwd());
const read = (path) => readFileSync(resolve(root, path), "utf8");
const postcard = read("postcard.html");
const postOffice = read("post-office.html");
const rack = read("content/site/post-office.js");
const welcomeTour = read("content/site/sv-welcome-tour.js");
const directory = read("content/site/sunnyvaile-directory.js");
const globalHeader = read("content/site/sv-global-header.js");
const homepage = read("index.html");
const previewHomepage = existsSync(resolve(root, "preview-homepage.html")) ? read("preview-homepage.html") : "";
const chickFlicks = read("chick-flicks.html");

// A shared URL is a public identifier, never a container for a private note or handle.
assert.match(postcard, /function postcardURL\(\)[\s\S]*?\?pc=/);
assert.match(postcard, /var picked = null;\s*loadCatalogue\(\)/);
assert.match(postcard, /function renderCompose\(\)[\s\S]*?picked = byId\[params\.get\('pc'\)\] \? params\.get\('pc'\) : POSTCARDS\[0\]\.id/);
assert.match(postcard, /POSTCARDS = catalogue\.cards;[\s\S]*?renderCompose\(\)/);
assert.doesNotMatch(postcard, /function postcardURL\([\s\S]*?(?:[?&]from=|[?&]note=)/);
assert.match(postcard, /params\.has\('from'\).*params\.has\('note'\)/);
assert.match(postcard, /history\.replaceState\(null, '', location\.pathname \+ safeQuery \+ location\.hash\)/);
assert.match(postcard, /notes and writer handles[\s\S]*never a URL or analytics/i);
assert.match(postcard, /id="pcPrevSignature" hidden/);
assert.match(postcard, /signature\.textContent = signed \? '— @' \+ signed/);
assert.match(postcard, /var signed = handle\(\);[\s\S]*var personal = n \+ \(signed/);
assert.doesNotMatch(postcard, /laidies_card_username|localStorage\.setItem/);

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
assert.match(postOffice, /cannot promise that an email will arrive/);
assert.match(postOffice, /href="\/privacy\.html"/);
assert.match(postOffice, /aria-describedby="po-newsletter-notice"/);
assert.match(postOffice, /id="po-newsletter-status" role="status" aria-live="polite" hidden/);
assert.match(postOffice, /Your browser blocked the Buttondown window, so no signup request was sent here/);
assert.match(postOffice, /id="signin" aria-labelledby="po-signin-title"/);
assert.match(postOffice, /Sign-in requests start at the Resident Card desk/i);
assert.match(postOffice, /The Post Office does not collect account email/i);
assert.match(postOffice, /one place to request a private sign-in link/i);
assert.match(postOffice, /does not prove that a message arrived, that an account was created, or that any state moved between devices/i);
assert.match(postOffice, /Nothing has been submitted at this counter/i);
assert.equal((postOffice.match(/href="\/resident-card\.html#rcAccountTitle"/g) || []).length, 1);
assert.equal((postOffice.match(/type="email"/g) || []).length, 1);
assert.match(postOffice, /<form id="po-newsletter-form" action="https:\/\/buttondown\.com\/api\/emails\/embed-subscribe\/laidies"[\s\S]*?<input id="po-email" type="email" name="email"/);
assert.doesNotMatch(postOffice, /Resident Card page reports the same held account state/i);
assert.doesNotMatch(postOffice, /account guest book is not taking email addresses/i);
assert.doesNotMatch(postOffice, /No magic-link request starts at this counter/i);
assert.doesNotMatch(postOffice, /Your email is your PO box|One delivery\. Every Wednesday|Rent your SUNNYVAiLE PO box/);
assert.doesNotMatch(welcomeTour, /email becomes your PO box|no spam, ever|one delivery every Wednesday/i);
assert.match(welcomeTour, /Get the Wednesday Postcard, sign in or make a SUNNYVAiLE postcard/i);
assert.doesNotMatch(directory, /Wednesday Drop signup \+ sign-in station|Sign in via magic link|Send-a-note gifts/);
assert.match(directory, /The Wednesday newsletter, town mail and postcards[\s\S]*Get the Wednesday Postcard[\s\S]*Sign in[\s\S]*Make a town postcard/);
assert.doesNotMatch(globalHeader, />Account status<\/a>/);
assert.match(globalHeader, />Sign in<\/a>/i);
assert.doesNotMatch(homepage, /Wednesday delivery and mail|Sign in to go to where you are in the season/i);
assert.match(homepage, />Sign in<\/a>/i);
assert.match(homepage, /The Wednesday newsletter, town mail and postcards/);
if (previewHomepage) {
  assert.doesNotMatch(previewHomepage, /sends you a note|Sign for the Wednesday delivery|Open your PO box/i);
  assert.match(previewHomepage, />Sign in<\/a>/i);
  assert.match(previewHomepage, /Buttondown owns subscription and delivery; this page cannot confirm either result/);
}
assert.doesNotMatch(chickFlicks, /Get Wednesday delivery|Open a box at the Post Office/i);
assert.match(chickFlicks, /Request the Wednesday newsletter/);

// The Post Office rack can only hand an admitted postcard identifier to the composer.
const postcardIds = [...postcard.matchAll(/\{ id: '([^']+)'/g)].map((match) => match[1]);
const rackIds = [...rack.matchAll(/\{ id: "([^"]+)"/g)].map((match) => match[1]);
for (const id of rackIds) assert.ok(postcardIds.includes(id), `rack card ${id} exists in postcard composer`);
for (const file of [...rack.matchAll(/file: "([^"]+)"/g)].map((match) => match[1])) {
  assert.ok(existsSync(resolve(root, "assets/postcards/from-sunnyvaile", file)), `rack asset exists: ${file}`);
}
assert.match(rack, /writeLink\.href = "\/postcard\.html\?pc=" \+ encodeURIComponent\(card\.id\)/);
assert.match(rack, /archive\.replaceChildren\(\)/);
assert.match(rack, /document\.createElement\("article"\)/);
assert.match(rack, /titleLink\.textContent = episode\.title/);
assert.match(rack, /description\.textContent = episode\.oneLineDescription/);
assert.match(rack, /Published · Episode/);
assert.doesNotMatch(rack, /Delivered · Episode/);
assert.match(rack, /published-episode drawer could not be verified/i);
assert.match(rack, /function admittedArchivePath\(value, kind\)/);
assert.match(rack, /value\.slice\(0, 2\) === "\/\/"/);
assert.match(rack, /kind === "image"[\s\S]*\^\\\/assets\\\//);
assert.match(rack, /kind === "issue"[\s\S]*\^\\\/issues\\\/issue-/);
assert.match(rack, /var admittedEpisodes = episodes\.map/);
assert.match(rack, /archive\.replaceChildren\(\);\s*admittedEpisodes\.forEach/);
assert.match(rack, /var admittedNumbers = Object\.create\(null\)/);
assert.match(rack, /var admittedIssueUrls = Object\.create\(null\)/);
assert.match(rack, /hasOwnProperty\.call\(admittedNumbers, episode\.number\)/);
assert.match(rack, /hasOwnProperty\.call\(admittedIssueUrls, url\)/);
assert.match(rack, /archive collection is duplicate or ambiguous/);
assert.match(rack, /Retry the archive check/);
assert.match(rack, /function archiveFailure\(focusRecovery\)/);
assert.match(rack, /function loadArchive\(focusRecovery\)/);
assert.match(rack, /retry\.addEventListener\("click", function \(\) \{\s*retry\.disabled = true;\s*loadArchive\(true\)/);
assert.match(rack, /archive\.replaceChildren\(message, retry\);\s*if \(focusRecovery\) retry\.focus\(\)/);
assert.match(rack, /archiveFailure\(focusRecovery === true\)/);
assert.match(rack, /if \(archive\) loadArchive\(false\)/);
assert.doesNotMatch(rack, /\^\\\/\[A-Za-z0-9_.\/\?=&%-\]\+\$/);

// Every inline script remains syntactically parseable without executing a service call.
for (const match of postcard.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) new vm.Script(match[1]);
for (const match of postOffice.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) new vm.Script(match[1]);

console.log("PASS: Post Office local contract (privacy, truthful failures, source binding)");
