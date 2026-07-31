# Build packet — atomic weekly release projection v1

Status: `SPECIFIED / QUEUED — NON-COLLIDING MAKER LOCK AND EXACT EPISODE PACKAGE REQUIRED`  
Contract ID: `EPX-HOME-CURRENT-EPISODE-v1`  
Current release requirement: `BUILD BEFORE LAUNCH`

## Trigger and bound source

Weekly Episodes supplied:
`operations/product-stewards/episode-experience/ownership-handoff-town-entry-current-episode-module-2026-07-26.md`,
SHA-256
`53cb1c49bb99af96d8a75022a8ec91a71f80f421b116a8bf42aa28c443d2d6f2`.

The Homepage masthead and hero remain evergreen. Weekly truth belongs in one
separate current-episode module.

## Current implementation truth

- `content/site/homepage.js` SHA-256
  `03156f7901459f16e3b6972ea4752e0b2cd155646102a202e30511bf92fd7433`
  defines an Episode 04 `WEEKLY_SONG`, resets the season heading and read/listen
  links to Episode 04, and separately consumes readiness projection fields.
- `index.html` SHA-256
  `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772`
  hard-codes Episode 04 in the hero action, explanation, season rail,
  read/listen buttons, KSVL label and ritual copy.
- The readiness receiver can change selected title/link/current-card fields,
  but cannot clear or atomically replace all Episode/song/pack fields.
- A successful fetch or existing route is not episode release authority.

Result: `PARTIAL / MIXED-FIELD RISK`. A new episode could appear with an old
song, old season link or old card-pack cue.

## Producer → validator/store → consumer

`Weekly Episode Engine exact admitted release package`
→ `Platform closed schema + canonical checksum + release/admission proof`
→ `one immutable current-episode record`
→ `Town Entry atomic receiver`
→ `separate Homepage current-episode module`

Town Entry owns presentation and comprehension. Weekly Episodes owns episode
editorial truth. Platform owns validation, complete-record delivery,
supersession and fail-closed behavior. Trading Cards/KSVL own their separately
admitted keys/media. Control Room owns the shared-file/release lock.

## Closed atomic record

Every record supplies these fields together:

- versioned schema, record type, record ID and supersedes ID or `null`;
- episode number, canonical title and approved summary;
- admitted image path, meaningful alt and SHA-256;
- explicit nullable `read`, `watch` and `listen` links;
- release date;
- complete song object or `null`;
- admitted card-pack key or `null`;
- self-contained fallback with its own image/checksum/nullable links;
- release-candidate, canon, episode-package and public-proof authority;
- canonical body SHA-256 outside the body preimage.

Missing fields are invalid, not inferred. `song:null`, `watch:null`,
`listen:null` and `cardPackKey:null` actively clear prior values.

## Lifecycle and failure contract

1. Validate the complete candidate without mutating current state.
2. Reject unknown fields, wrong types, path escape, checksum mismatch,
   missing/expired public proof, unadmitted media/route, stale release date,
   invented pack/song, downgrade conflict and half-null objects.
3. Commit one record ID/body hash as the current pointer in one operation.
4. Render only from the committed record. Never patch individual DOM fields
   from different records.
5. On missing, malformed, stale, withdrawn, correction-pending or
   checksum-mismatched input, render the candidate's bound fallback.
6. Correction/replacement creates a new immutable record with `supersedes`.
7. Rollback restores the complete prior accepted record or its bound fallback;
   it never combines current and prior fields.
8. Duplicate delivery of the same ID/body hash is idempotent. Same ID with
   different bytes is a hard conflict.

All four visitor scopes receive the same public episode truth. First-time,
returning-without-Card, device-local Card and verified account state do not
change the record or establish release authority.

## Exact files for an authorized maker packet

Platform-owned new paths:

- `content/site/current-episode/v1/current-episode-v1.schema.json`
- `content/site/current-episode/v1/current-episode-v1.js`
- `content/site/current-episode/v1/current-episode-current.v1.json`
- `scripts/test-current-episode-projection-v1.mjs`

Shared/owner paths requiring the exact joint lock:

- `content/site/homepage.js`
- `index.html`
- the curated public-artifact manifest/builder

The maker must remove independent Episode/song mutation from the receiver
boundary, keep the masthead/hero evergreen and replace only the separate
weekly module.

## Test matrix and acceptance proof

- valid complete record, all formats present;
- each nullable format independently `null`;
- `song:null` after a prior song;
- `cardPackKey:null` after a prior pack;
- missing/unknown/half-null fields;
- source/image/media/body checksum tamper;
- stale, unadmitted, withdrawn and public-proof failure;
- duplicate retry and same-ID/different-body conflict;
- atomic current→successor→correction→rollback;
- simulated interruption proves no mixed fields;
- fallback is complete and usable;
- first-time, returning-no-Card, local Card and verified-account views;
- 320/390/1440, keyboard, no-JS, reduced motion, native Safari/VoiceOver and
  true zoom;
- cache/current-pointer propagation and public-origin exact bytes;
- Homepage masthead/hero remains byte-bound or receives new Town Entry
  acceptance if its source changes.

Maker verification is not acceptance. Town Entry independently judges the
exact module; Weekly Episodes verifies editorial/package identity; Platform
independently verifies schema/state/rollback; Control Room binds the release
artifact; public proof is separate.

## Blockers and next action

Blocked on:

- a non-colliding Control Room maker lock;
- one exact checksum-bound episode release package;
- public-proof/admission receipts for every non-null route/media/pack field;
- shared Homepage/Town Entry integration authority.

Next action: when those exist, build the Platform validator/current-pointer
locally first, then integrate the Town Entry receiver under the joint lock.
No Homepage, shared projection, live route or public file changed in this
packet.

