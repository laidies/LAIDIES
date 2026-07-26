#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.BRONZE_ROOT || process.cwd());
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const html = read("bronze-aige.html");
const controller = read("content/site/bronze-aige-v2.js");
const css = read("content/bronze-aige-v2.css");
const bws = read("games/businesswomens-special.html");
const catalogue = read("content/site/bws-data.js");
const legacySite = read("script.js");
const redirect = read("games/cocktail-fortune.html");
const failures = [];
let checks = 0;

function requireMatch(source, pattern, label) {
  checks += 1;
  if (!pattern.test(source)) failures.push(`missing ${label}`);
}
function forbid(source, pattern, label) {
  checks += 1;
  if (pattern.test(source)) failures.push(`forbidden ${label}`);
}

requireMatch(html, /alcohol-optional online social ritual for adults/i, "adult alcohol-optional metadata");
requireMatch(html, /nothing here books, sends, serves, verifies attendance, or requires alcohol/i, "ten-second service boundary");
requireMatch(html, /does not sell or serve alcohol, book a bar, verify age, or give health advice/i, "plain alcohol/service boundary");
requireMatch(html, /not drinking is the lowest-risk option/i, "lowest-risk option");
requireMatch(html, /equally complete spirit-free/i, "embedded spirit-free parity");
requireMatch(html, /not a real order, service promise, availability check, or health recommendation/i, "fortune boundary");
requireMatch(html, /Nothing is ordered, served, consumed, booked, or added to an account/i, "full-table boundary");
requireMatch(html, /downloads a local calendar file/i, "calendar download truth");
requireMatch(html, /does not add, send, book, or reserve anything/i, "calendar non-action boundary");
requireMatch(html, /id="bzInviteStatus" role="status" aria-live="polite" aria-atomic="true"/, "invite status semantics");
requireMatch(html, /id="bzStampMsg" role="status" aria-live="polite" aria-atomic="true"/, "coaster status semantics");
requireMatch(html, /cannot verify a visit, gathering, drink, identity, learning, account, badge, or reward/i, "coaster local truth");
requireMatch(html, /not a live performance or real venue/i, "recorded-stage boundary");
requireMatch(html, /id="bzStatus" role="status" aria-live="polite" aria-atomic="true"/, "audio status semantics");
requireMatch(html, /not an order, consumption record, account field, cross-device history, Resident Card item, badge, or reward/i, "Resident Card separation");
requireMatch(html, /version:\s*2[\s\S]{0,100}scope:\s*'device-local'[\s\S]{0,180}items:\s*list/, "versioned coaster receipt");
requireMatch(html, /document\.execCommand\('copy'\)/, "clipboard fallback");
requireMatch(html, /if \(document\.execCommand\('copy'\)\) done\(\)/, "verified clipboard fallback");
requireMatch(html, /Calendar file downloaded\. Nothing was added, sent, booked, or reserved/i, "calendar result truth");
requireMatch(html, /try\s*\{[\s\S]{0,500}URL\.createObjectURL[\s\S]{0,500}a\.click\(\)[\s\S]{0,300}URL\.revokeObjectURL[\s\S]{0,500}catch\s*\(/, "calendar creation/download/revoke exception boundary");
requireMatch(html, /calendar file was not confirmed[\s\S]{0,160}Nothing was added, sent, booked, or reserved/i, "persistent calendar failure truth");
requireMatch(html, /Playback was blocked or failed\. Nothing is playing/i, "audio blocked state");
requireMatch(html, /recorded track could not load or play\. Nothing is playing/i, "audio error state");
requireMatch(html, /aria-pressed="false"[\s\S]{0,220}data-src="\/content\/music\/game-businesswomens-special\.mp3"/, "stage audio toggle state");

requireMatch(controller, /labelPanel\(invitePanel\)/, "panel accessible naming");
requireMatch(controller, /panel\.setAttribute\("tabindex", "-1"\)/, "panel focus target");
requireMatch(controller, /event\.key !== "Escape"/, "Escape close");
requireMatch(controller, /closeAll\(true\)/, "initiator focus return");
requireMatch(controller, /behavior: reduceMotion \? "auto" : "smooth"/, "reduced-motion panel scroll");
requireMatch(controller, /setAttribute\("role", "tabpanel"\)/, "answer tabpanel semantics");
requireMatch(controller, /ArrowRight[\s\S]{0,240}ArrowLeft[\s\S]{0,180}Home[\s\S]{0,120}End/, "answer tabs keyboard contract");
requireMatch(controller, /version !== 2[\s\S]{0,100}scope !== "device-local"/, "typed local receipt validation");
requireMatch(controller, /canonicalPastIso/, "canonical non-future receipt validation");
requireMatch(controller, /stamp <= nowMs/, "zero-tolerance future receipt rejection");
requireMatch(controller, /isoWeekIdFromStamp\(item\.stampedAt\) !== item\.week/, "semantic coaster week binding");
requireMatch(controller, /seen\[item\.week\]/, "duplicate coaster rejection");
requireMatch(controller, /catalogue\.getItem\(drink\.lane, drink\.itemId\)/, "canonical drink rehydration");
requireMatch(controller, /!\["cocktail", "spiritFree"\]\.includes\(selectedLane\)/, "fortune lane allowlist");
requireMatch(controller, /version:\s*2,[\s\S]{0,80}scope:\s*"device-local"/, "versioned drink receipt");
requireMatch(controller, /response\.ok[\s\S]{0,130}episode-index-/, "episode index HTTP check");
requireMatch(controller, /EPISODE_ISSUE_PATHS[\s\S]{0,240}issue-04\.json/, "explicit admitted issue/build dependencies");
requireMatch(controller, /episode-issue-not-admitted/, "unadmitted episode failure boundary");
requireMatch(controller, /no-published-episode/, "no-published fallback");
requireMatch(controller, /issue\.status !== "published"[\s\S]{0,180}issue\.number !== latest\.number/, "issue binding validation");
requireMatch(controller, /Date\.now\(\) - released <= 14 \* 86400000/, "episode freshness boundary");
requireMatch(controller, /from the latest published episode/i, "stale episode label");
requireMatch(controller, /fallback\("evergreen"\)/, "episode failure fallback");

requireMatch(css, /#6938cc/, "selected-tab contrast repair");
requireMatch(css, /#bzCopyBtn[\s\S]{0,300}color: var\(--bz-ink\) !important/, "action contrast repair");
requireMatch(css, /prefers-reduced-motion[\s\S]{0,500}transition: none !important[\s\S]{0,120}scroll-behavior: auto !important/, "complete reduced-motion CSS");
requireMatch(bws, /max-width: 420px[\s\S]{0,160}#bwsMoods/, "standalone 320 mood reflow");

requireMatch(bws, /adult, alcohol-optional paper fortune teller/i, "standalone alcohol-optional metadata");
requireMatch(bws, /not a Mme CLAi-O reading, order, availability check, or health guidance/i, "standalone route/product boundary");
requireMatch(bws, /not drinking is the lowest-risk option/i, "standalone lowest-risk option");
requireMatch(bws, /data-lane="cocktail" aria-pressed="true"/, "cocktail lane state");
requireMatch(bws, /data-lane="spiritFree" aria-pressed="false"/, "spirit-free lane state");
requireMatch(bws, /id="bwsResult" role="status" aria-live="polite" aria-atomic="true" tabindex="-1"/, "standalone result status/focus");
requireMatch(bws, /page-state celebration only—not a saved badge, account reward, or proof of drinking/i, "session badge truth");
requireMatch(bws, /version:\s*2,[\s\S]{0,80}scope:\s*'device-local'/, "standalone versioned drink receipt");
requireMatch(bws, /This browser could not save it/, "standalone storage failure");
requireMatch(bws, /Playback was blocked or failed\. Nothing is playing/i, "standalone audio failure");
requireMatch(bws, /latest published episode/i, "standalone latest-published episode wording");

requireMatch(catalogue, /module-private, immutable canonical catalogue[\s\S]*export default catalogue/, "module-private catalogue authority");
requireMatch(catalogue, /deepFreeze\(menus\)[\s\S]{0,700}deepFreeze\(flaps\)/, "deep-frozen canonical catalogue");
requireMatch(catalogue, /id:\s*lane \+ "-"[\s\S]{0,500}id:\s*"mood-"/, "canonical item and mood IDs");
requireMatch(controller, /import\("\.\/bws-data\.js"\)[\s\S]*module && module\.default/, "embedded private module import");
requireMatch(bws, /import\('\/content\/site\/bws-data\.js'\)[\s\S]*module && module\.default/, "standalone private module import");
requireMatch(html, /bronzeCatalogueBoundaryStatus[\s\S]*nothing can be selected or saved/i, "embedded static held boundary");
requireMatch(bws, /bwsSaveStatus[\s\S]*nothing can be selected or saved/i, "standalone static held boundary");
requireMatch(bws, /class="bws-lane[\s\S]{0,180}disabled[\s\S]*class="bws-mood[\s\S]{0,180}disabled/, "standalone controls fail closed before module validation");
forbid(
  catalogue + controller + bws + html,
  /LAIDIES_BWS_CATALOGUE/,
  "ambient catalogue authority"
);
forbid(controller + bws, /window\.cocktailMenus|window\.cocktailFortuneFlaps/, "mutable global catalogue consumption");
forbid(html + bws, /onclick="window\.playLaidiesTheme/, "global audio inline bypass");
forbid(html + bws, /if \(window\.playLaidiesTheme\) return/, "pre-existing global audio ownership");
requireMatch(html + bws, /addEventListener\('playing'[\s\S]{0,260}aria-pressed', 'true'/, "media-event-owned playing state");

requireMatch(redirect, /madame-claio\.html/, "Cocktail Fortune remains Mme CLAi-O handoff");
forbid(html, /ON STAGE NOW|Join the crowd|live from the Bronze|Your drink of the week shows up on your Resident Card|stack stays behind the bar with your name/i, "false live/account/attendance claims");
forbid(bws, /rides home on your Resident Card|your saved badge is|ordered for you|served for you/i, "standalone account/service claims");
forbid(
  html + bws + catalogue + legacySite,
  /CHAR No\.5|Ryan C|tell him Ali|Yes, Get the Bottle|responsible choice|actually drink/i,
  "real service activation or consumption encouragement"
);
forbid(bws, /this week(?:’|')s episode|pairs with the episode/i, "unconditional current-episode wording");

if (failures.length) {
  console.error("BRONZE AIGE CONTRACT FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("BRONZE AIGE CONTRACT PASS");
console.log(`checks=${checks}`);
