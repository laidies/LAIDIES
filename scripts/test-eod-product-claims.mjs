#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const girlTalk = read("games/girl-talk.html");
assert.match(girlTalk, /Open an optional post prompt/);
assert.match(girlTalk, /Mark my local sticker/);
assert.doesNotMatch(girlTalk, /id="gtDidItLink"/);
assert.match(girlTalk, /does not submit, verify, or reward a post/);

const sharedSite = read("script.js");
assert.doesNotMatch(sharedSite, /girl-talk-sticker:/);
assert.doesNotMatch(sharedSite, /dare-penalty:/);
assert.match(sharedSite, /device-local honour-system game/);

const fairy = read("games/fairy-godmother.html");
assert.match(fairy, /MAX_PROMPT_CHARS = 8000/);
assert.match(fairy, /ADVICE_TIMEOUT_MS = 35000/);
assert.match(fairy, /ADVICE_PROGRESS_MS = 8000/);
assert.match(fairy, /ADVICE_LONG_PROGRESS_MS = 18000/);
assert.match(fairy, /a careful answer can take up to half a minute/);
assert.match(fairy, /err\.name === "AbortError"/);
assert.match(fairy, /isOutOfScopePrompt/);
assert.match(fairy, /needsVerifiedInformation/);
assert.match(fairy, /hasExpectedGlowUp/);
assert.match(fairy, /This is a one-response local preview/);
assert.doesNotMatch(fairy, /draftHeader\.parentNode\.insertBefore\(revisionRow/);

const fairyRail = read("content/site/fairy-godmother-v2.js");
assert.match(fairyRail, /Local preview complete/);
assert.doesNotMatch(fairyRail, /subscriber allowance is checked/);

const dreamPhone = read("games/dream-phone.html");
assert.match(dreamPhone, /prewritten reframe/);
assert.match(dreamPhone, /experimental/);

const factGame = read("games/dream-phone-game.html");
assert.match(factGame, /not an authoritative fact-checking service/);
assert.match(factGame, /Background link \(check it yourself\)/);

const parkedGame = read("games/dream-phone-game.js");
assert.match(parkedGame, /Do not call the shared local-first badge writer/);

const postcard = read("postcard.html");
assert.match(postcard, /does not confirm that a message was sent, opened or joined/);
assert.doesNotMatch(postcard, /laidies_invited_by/);
assert.doesNotMatch(postcard, /BEST FRIENDS necklace/);

const homepage = read("index.html");
assert.match(homepage, /one-response local preview|Work-drafting preview/);
assert.match(homepage, /private honour-system/);
assert.doesNotMatch(homepage, /bank a Caught Up sticker/);

console.log("PASS EOD product-claim guardrails");
