# KSVL functionality and cross-page touchpoint map

**Status:** SPECIFIED — FUNCTIONALITY RECOVERED; LOCK-GATED BUILD REQUIRED  
**Recovered:** 2026-07-26  
**Product/building owner:** KSVL champion  
**Functionality & Platform Director:** review required  
**Change boundary:** dossier/evidence only until Control Room assigns exact
live/shared-system locks.

This map separates current local evidence from the complete intended result.
`OBSERVED` means source behavior exists; `VERIFIED LOCALLY` means a named
bounded check passed; neither means deployed or publicly verified.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status / disposition |
|---|---|---|---|---|
| Station arrival and 99.9 orientation | Open `/radio.html` | Understand the station, explicit-action audio and current programme | Booth hero, dial, state text and three Listen controls exist | OBSERVED; owner visual/human-comprehension review required |
| Canonical 29-track catalogue | Load KSVL player | Exactly the creator-confirmed, present, `AVAILABLE` registry records become playable | Registry counts 29/29; validator passes `tracks=29 playable=29`; exact production artifact contains all 29 source-identical track dependencies | VERIFIED PUBLICLY — artifact `3437ba56…`, both origins |
| Tune in / start listening | Activate any `data-ksvl-start-live` control | Start a valid programme after explicit action and show persistent state | Shared player loads registry and starts `LIVE_MIX`; exact public anthem state advanced unmuted at both origins | VERIFIED PUBLICLY at decoded-browser scope; human audio-quality/AT gate open |
| Mix CDs | Open counter; flip/listen to shelf or track | Six registry-derived shelves with truthful counts and controls | Player builds six shelves from 29 tracks; current Radio copy says available Listen means that exact track passed, and no longer says none can play | VERIFIED PUBLICLY at catalogue/control scope; human comprehension open |
| Band albums and tracks | Open Bands; flip cover; play album/track | Ten fictional-band views; only exact registry matches play | `KSVL_tracksForArtist` / `KSVL_startAlbum` derive from shared runtime | OBSERVED; empty bands and all keyboard/AT scenes require proof |
| Persistent player deck | Start a track/mix | Current title/mix, play/pause, previous/next, seek, repeat, shuffle, mute, volume, pop-out, KSVL link and stop | Hostile registry, denial, retry, pause, seek, repeat, mute, volume, waiting, stall, media-error and one-owner browser suite passes; public start advances | VERIFIED LOCALLY for complete deterministic suite; public start verified at both origins |
| Single-audio ownership | Start KSVL while another theme/audio owns sound | One owner plays; state remains recoverable | Player pauses document audio and wraps theme player | OBSERVED; shared-site collision regression required |
| Failure and retry | Denial, invalid metadata, wait, stall, media error, seek error, storage denial | Persistent truthful status; retry current admitted source; no silent skip/completion | Explicit handlers and prior deterministic fixtures exist | VERIFIED LOCALLY at synthetic scope; public/offline required |
| Popup player | Choose Pop out; use `/ksvl-popup.html` | Same catalogue/state continues in separate window without duplicate audio | Local save, popup heartbeat and device-local coordination exist | OBSERVED; crash/blocked popup/AT/focus/public proof missing |
| Local return/resume | Leave and return within strict TTL/context | Restore exact admitted track/position paused; explicit Play resumes | Registry ID, context, key allowlist, six-hour TTL and bounds checks exist | VERIFIED LOCALLY in prior strict-state fixtures; four-scope suite open |
| Track source/lesson routes | Follow a current track's context route | Correct owning product opens; KSVL claims no completion | 24 registry routes, 5 null routes; generic episode/Library links exist | PARTIAL — five route decisions plus per-track discoverability required |
| Now-playing context/words | Listen without or with audio | Title, artist, source meaning and equivalent non-audio route | Player provides title/artist; 29 transcripts/captions missing and lyric debt remains | BUILD BEFORE LAUNCH for promised accessibility/context |
| Sticker Counter | Select up to three declaration stickers once | Honest device-local collection or authoritative Closet delivery | 20 items; local earned/picked keys; no Closet producer/service/consumer path | FIX BEFORE LAUNCH — local-only copy/Closet propagation conflict |
| Listening achievements | Complete defined listening behavior | Only an approved, authoritative event may grant achievement | Achievement stickers exist; copy still says listening unavailable | OWNER DECISION REQUIRED; no grant contract exists |
| Signed-out song request | Submit valid form without session | Save a labelled local draft or show storage failure | Strict versioned `ksvl_pending_request` helper restores/edits/deletes a six-hour record, migrates the exact legacy shape, discards corrupt/expired/unknown-key records and falls back to local-only save when provider state is unavailable | VERIFIED LOCALLY — calibrated contract passes; public browser lifecycle required |
| Signed-in song request | Submit valid form with provider session | One authoritative review receipt; no hearing/selection/production promise | Browser calls Supabase `.insert(payload).select().single()` | BLOCKED — BUILD REMAINS REQUIRED; real RLS/service lifecycle unproved |
| Request status/correction/deletion | Return after receipt | Read status, correct/withdraw where allowed, delete under policy | Table has statuses; no requester UI or lifecycle route | BUILD BEFORE LAUNCH if request is current-release capability |
| Request moderation/staff workflow | Staff reviews submissions | Authorized review, abuse handling and audit without exposing raw text | Schema has status/admin fields; no verified staff surface/service contract | BLOCKED — BUILD REMAINS REQUIRED |
| Resident Card handoff | Open Card song-choice link | Separate producer controls Card song; KSVL does not mutate/sync it | Explicit no-sync/no-reward copy and link exist | OBSERVED; device/account transitions require joint proof |
| DJ Booth | Open `/games/dj-booth.html`; select a track | Focused KSVL booth using the authoritative catalogue/player | Booth retains its room and controls but selects by registry ID, consumes the admitted KSVL catalogue and delegates audio, pause/resume, seek, repeat, retry and failure state to `content/site/ksvl-player.js`; calibrated static and browser guards reject the former local `Audio()` owner | VERIFIED PUBLICLY — deployment `71ef51c7-874c-4e7d-a421-52d1edf589ed`, both origins, 1440/390/320 |
| External provider playlists | Choose admitted outbound playlist | Clear external handoff, provider terms and return route | Spotify plans/URLs exist in content records; public Booth holds links | OWNER DECISION REQUIRED; provider lane not admitted |
| Cross-town KSVL player | Use a song chip/listen control on another page | Same authority, failures and one-audio behavior everywhere | Shared script is included on dozens of active pages | OBSERVED; consumer inventory and release regression incomplete |
| Privacy-safe analytics | Start/control/error/source-open/request result | Aggregate operational evidence with no raw requests/person-level position | Plausible `KSVL play` sends a track title; Clarity is present sitewide | PARTIAL; event dictionary, consent/privacy and prohibited-field review required |
| Release/media manifest | Build exact candidate | Registry and every computed media dependency ship with correct bytes/type | Current artifact validator passes 29 computed track dependencies / 131.42 MiB with source-identical bytes; current registry and player are public | VERIFIED PUBLICLY — artifact `3437ba56…`, deployment `883a5ee6…` |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time | Absence of valid KSVL local state; no identity assumption | Public 29-track registry only | Full orientation; explicit Listen | Public media only; local state after action; signed-out request draft if chosen | Shared player within device/page scope | Catalogue/media/provider/storage error is visible; no autoplay | PARTIAL local; mobile/AT/public proof open |
| Returning, no Resident Card | Strict valid `laidies_ksvl_player_state_v1`, local sticker keys or pending request; no Card/account inference | Track/position/volume/mute/repeat/shuffle; local collection/draft separately | Paused restore and useful continuity | Local writes only; no server request | Same browser/device; popup heartbeat only | Invalid/stale/extra-key/wrong-registry state removed; storage denial falls back | VERIFIED LOCALLY for player fixtures; full collection/draft transitions open |
| Resident Card — device-local | Device-local Card proof only; no authenticated session | Same KSVL local state; separate Card song data is not consumed | Listening unchanged; Card handoff may be offered | Same local KSVL writes only | No account/cross-device/Closet implication | Card/KSVL conflicts cannot overwrite each other | SPECIFIED; joint proof missing |
| Resident Card — verified account-backed | Supabase auth session plus shared identity contract | Same local player state; authenticated request capability only | Server request path becomes eligible | Authorized request insert/read/lifecycle only | Request account scope if service proves it; listening still device-local | Auth loss/sign-out returns to public/local; no account data leakage | BLOCKED — live provider/RLS/lifecycle unproved |

### Required transition verdicts

| Transition | Required proof | Current truth |
|---|---|---|
| First visit → return without Card | Valid paused restore plus stale/corrupt/storage-denied cases | Prior bounded strict-state fixtures; not independently rerun in initialization |
| Visitor → device-local Card → same-device return | No listening/history/reward mutation; separate Card song remains intact | Copy exists; end-to-end proof missing |
| Device-local Card → account | Auth session changes request eligibility only | SPECIFIED; live identity/provider proof missing |
| Signed-in → sign out → return | Public listening/local state remains; account request data is not exposed | MISSING |
| Second tab and popup | Single audio owner, heartbeat expiry and crash recovery | Mechanism observed; full suite missing |
| Second device | No listening restore claim; account request only if proved | Honest no-sync copy exists; proof missing |
| Registry update/track hold/remove | Saved state invalidated and every consumer updates | Player invalidation exists; DJ Booth and other hard-coded consumers break the contract |
| Request create → status → correct/delete | Provider receipt, idempotent retry, authorized lifecycle and retention | Create code/schema observed; rest missing |

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend module | Backend/service/provider | Authoritative store/schema/key | Consumers | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Track admission/metadata | Catalogue steward registry change | `content/site/ksvl-player.js` | Static build/origin | `content/music/ksvl-track-registry.json` | Radio, popup, mix cases, band player, cross-town shared player; intended DJ Booth | Public catalogue/release revision | 29 locally valid; exact public artifact absent |
| Runtime track list | Source code change | Hard-coded `TRACKS` plus registry parity | None | `content/site/ksvl-player.js` and registry must match | Same shared-player consumers | Public/source | Deliberate dual-source parity; maintenance risk but validator catches mismatch |
| Audio bytes | Creator/master placement | Browser `Audio` / HTMLMediaElement | Static origin/CDN | Exact `/content/music/*.mp3` files and release manifest | Every player | Public media | 29 exact files present; public-origin current candidate unproved |
| DJ segments/jingles/spots | Audio production | Live-rotation constants | Static origin/CDN | 54 additional computed media dependencies; no equivalent admission registry | Live rotation/popup | Public media if used | Present/hashable; creator/quality/current programme decision incomplete |
| Player return state | Media events and controls | `saveState` / `hydrateFromStorage` | Browser storage | `laidies_ksvl_player_state_v1` | Any page loading shared player; popup | Device, six-hour TTL, registry/context bound | Strict local contract exists |
| Popup ownership | Popup open/heartbeat/pagehide | shared player | Browser windows/storage | `laidies_ksvl_popup_beat` | Main page and popup | Device/browser only | Mechanism exists; stale/crash behavior needs proof |
| Sticker collection | Confirm local pick or global `KSVL_stickers.earn` | inline `/radio.html` script | Browser storage only | `laidies_ksvl_stickers_earned`, `laidies_ksvl_stickers_picked` | Radio sticker UI; promised Closet has no consumer integration | Device only | Local result exists; Closet promise not delivered |
| Signed-out request draft | Submit form without session | `/radio.html` plus `content/site/ksvl-request-draft.js` | Browser storage | strict versioned `ksvl_pending_request`, six-hour TTL | Radio hub notice, restored form, edit/save and confirmed delete | Device only | VERIFIED LOCALLY — read-after-write, legacy migration, corrupt/expired discard and storage denial pass |
| Signed-in request | Submit form with session | inline `/radio.html` Supabase client | Supabase Auth/PostgREST | `public.ksvl_song_requests` | Requester receipt; future staff/moderation/status UI | Account row | Insert/read compound call exists; live completion unproved |
| Request receipt/status | Provider returns row | inline request handler | Supabase/RLS | request UUID/status fields | Current status text; no return dashboard | Account | Synthetic receipt fixture only |
| Card song choice | Resident Card product | Card frontend/shared identity | Card service/store | Card-owned profile field | Resident Card surfaces; KSVL only links | Device or account per Card proof | KSVL explicitly does not write it |
| Source relationship | Catalogue steward | registry metadata/player UI | Static routes | `sourceLesson` per record | Episode/activity/place pages | Public | 24 set, 5 null; UI discoverability inconsistent |
| External playlist | Playlist editor/provider owner | provider link | Spotify | Provider playlist IDs plus KSVL admission record (missing) | DJ Booth/provider section/social | External provider | Content plans exist; public KSVL provider route held |
| Analytics event | Playback/control/error/request/source action | Plausible/Clarity/event hooks | Plausible, Microsoft Clarity | Provider event stores | Product owner aggregate review | Aggregate/vendor; must exclude raw/private data | One `KSVL play` title event observed; complete contract absent |

## 4. End-to-end transaction contracts

### 4.1 Catalogue and playback

`registry change → schema/parity/file validation → exact build manifest →
artifact contains registry and bytes → public origin returns correct
content-type/signature → visitor explicit action → admitted item selected →
single-audio ownership → metadata/play events → visible current state → controls
and failure/retry → source handback → bounded local save → hold/remove
propagation`

- Authoritative local admission: current registry record plus exact runtime
  parity and present file.
- Authoritative playback result: media metadata and events, advancing time,
  non-muted positive volume proxy; human listening remains a separate judge.
- Duplicate/idempotency: repeated Listen must not create competing owners or
  duplicate queues.
- Failure: catalogue error fails closed; media error does not skip or count;
  Retry reattempts only the same admitted item.
- Update/remove: increment/change registry identity or item state, invalidate
  saved state, rebuild every consumer, and retest source/artifact/public.
- Privacy: do not store person-level position outside device or infer learning.
- Accessibility: persistent polite status, focusable retry, labelled native
  controls, no rapid time announcements.

### 4.2 Signed-out request draft

`discover → validate style/topic/optional words → detect no session → write one
device-local draft → read it back → show device-only result → edit/delete/expire
or authenticate → never describe as delivered`

Current local result: the exact six-hour device record has restore, edit/save,
confirmed delete, legacy migration, corrupt/expired discard and storage-denial
states. Provider-unavailable and no-receipt paths preserve only the same local
draft. Public-origin browser lifecycle evidence remains required.

### 4.3 Signed-in request

`discover → validate → verify auth session → generate idempotency key →
authorized insert/RPC → authoritative completion independent of forbidden row
read → receipt → read-after-write/status route → staff moderation → requester
correction/withdrawal/deletion → retention expiry/audit`

Current implementation uses
`.from('ksvl_song_requests').insert(payload).select().single()`. The baseline
RLS permits owner insert/read, but no live migration/provider check establishes
that the deployed schema/policies match or that a post-write read is a safe
receipt. Retry/idempotency, status UI, staff workflow, moderation, retention and
deletion are missing.

Required privacy/security contract:

- authenticated `user_id` must equal `auth.uid()`;
- style is enumerated; topic 3–200; lyric ideas at most 1000;
- raw topic/lyrics never enter analytics/session-replay evidence;
- staff fields are never returned to requester/public clients;
- rate limit, abuse controls and duplicate suppression exist;
- retention/deletion and requester access are explicit;
- a delivered insert cannot be reported failed merely because a follow-up read
  is denied or times out.

### 4.4 Sticker/Closet transaction

`discover → choose eligible declaration stickers → validate one-time/up-to-three
rule → authoritative write → read-after-write → radio collection result →
Closet consumer result → update/remove/revoke`

Current authoritative store is only localStorage and the Closet receives
nothing. Until an approved shared ownership contract exists, copy must say
device-local and must not promise delivery to the Closet. If shared delivery is
current intent, it requires an account/device-local reconciliation rule,
producer event, shared store, consumer read, revoke/delete behavior and
second-device proof.

### 4.5 Provider/outbound playlist

`editorial selection → provider/rights/privacy/accessibility admission → current
link verification → visitor sees external label and scene context → provider
opens → privacy-safe outbound event → clear browser return to KSVL → removal
propagates`

No Spotify link is currently admitted on the Booth. Existing content files are
planning/evidence only.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Admit/update track | Radio, popup, Mix CDs, Bands, DJ Booth, cross-town chips/player | ID/title/artist/src/mixes/status/source route/revision | `/radio.html`, source route | Atomic registry/runtime/build update | Remove/hold everywhere and invalidate local state | Hostile registry, wrong-file, stale artifact and consumer-drift tests |
| Start/pause/stop track | Shared player surfaces | Current device state | Popup/KSVL link | One audio owner and status everywhere in current document | Stop clears state; popup expiry yields safely | Denial, waiting, stalled, media error, two-owner tests |
| Save request draft | Radio request | Local bounded fields/timestamp | `#hub-request` | Reload/editor reads exact draft | Visitor deletes/expiry clears it | Storage denial/corrupt/oversize fixtures |
| Submit signed-in request | Radio request | Receipt-safe account row | Request status route (missing) | Status changes visible to requester | Withdraw/delete/retention/moderation rules | Timeout-after-write, forbidden-read, duplicate and provider-down fixtures |
| Pick sticker | Radio counter | Exact sticker IDs and one-time rule | `#hub-stickers` / intended Closet | Radio and Closet agree | Revoke/delete removes from both | Storage/service failure, account/local conflict, second-device |
| Change Card song | Card producer | Card-owned song choice only | Card → KSVL optional return | Card consumers update; KSVL player does not | Card deletion removes only Card state | KSVL must remain unchanged |
| Add/remove provider playlist | Provider admission record | External URL, scene, owner, freshness | Provider and KSVL return | All public KSVL provider surfaces update | Dead/retired link disappears everywhere | Link/provider/error/consent/keyboard tests |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| Current exact release/public origin | Resolved: 29-track truth is present publicly | Preserve exact build manifest, registry, computed audio and public-origin verification on later releases | Platform reliability | KSVL | build scripts, `scripts/validate-ksvl-artifact.mjs`, release artifact/origin | Source/artifact hashes, registry present, 29/29, decoded public start at both origins; human listen remains separate | VERIFIED PUBLICLY — artifact `3437ba56…`, deployment `883a5ee6…` |
| Request authoritative completion/idempotency | Delivered request may be retried or misreported | Prefer RPC/insert receipt contract with idempotency key and no ambiguous post-write read | Identity/data platform | KSVL | Supabase migration/RPC/RLS; radio client | Controlled live accepted/rejected/timeout-after-write/duplicate suite | BLOCKED — BUILD REMAINS REQUIRED pending lock/provider access |
| Request moderation/status/retention/deletion | Visitor cannot manage or understand submitted idea | Staff authorization/workflow, requester read route, moderation, retention job, delete/withdraw and audit | Community/moderation + platform | KSVL | `public.ksvl_song_requests`, staff/requester surfaces | Synthetic then controlled provider lifecycle with privacy review | BUILD BEFORE LAUNCH if request remains promoted |
| DJ Booth authority | Booth can drift or play outside current holds | Registry-ID consumer and shared KSVL control API are implemented; preserve the no-local-`Audio()` and no-direct-source guards through future releases | Platform/functionality | KSVL | `games/dj-booth.html`, `content/site/ksvl-player.js`, `content/music/ksvl-track-registry.json` | 29/29 parity; held fixture creates zero audio; admitted selection, failure and one-audio browser cases pass; live selected audio and pause pass at both origins | VERIFIED PUBLICLY |
| Sticker/Closet propagation | “Take home to Closet” does not occur | Either approved local-only copy or shared ownership producer/store/consumer contract | Economy/identity/Closet | KSVL | radio inline logic, Closet store/surface | Create/read/update/revoke, account/local/second-device suites | OWNER DECISION REQUIRED; then BUILD BEFORE LAUNCH if retained |
| Programme-object admission | Jingles/spots may play without song-registry-equivalent review | Registry/manifest for every live-rotation part, creator/content/quality status and source owner | Media/release | KSVL | `ksvl-player.js`, 54 programme audio objects | Complete inventory, human review, source/artifact/public proof | OWNER DECISION REQUIRED |
| Words and source context | Deaf/non-audio visitor or learner lacks equivalent context | As-recorded words/transcripts/captions where useful; decide five null routes; expose source context | Content/accessibility + destination owners | KSVL | track registry, content artifacts, player UI | Per-track content inventory; keyboard/AT/non-audio journey | BUILD BEFORE LAUNCH for promised equivalence |
| Analytics/VOC contract | No reliable product health or privacy boundary | Event dictionary entries, consent/session-replay exclusion for request fields, aggregate report | Analytics/privacy | KSVL | Plausible/Clarity config, event dictionary | Synthetic payload inspection; no raw text/position/person IDs | BUILD BEFORE LAUNCH |
| Native accessibility/audio quality | Mechanical proxy can pass unusable sound/UI | VoiceOver/Safari/200% zoom/contrast/physical speaker/headphone human suite | Accessibility/media quality | KSVL | source and exact candidate | Independent evidence per device/state/track sample | BUILD BEFORE LAUNCH |
| Provider playlist admission | Outbound lane is either absent or ungoverned | Provider record, link freshness, rights/privacy/a11y/return rules | Editorial/provider owner | KSVL | playlist content, Booth/provider section | Link/provider/return tests and owner approval | OWNER DECISION REQUIRED |

## 7. Shared-contract collision check

- **Identity/account/profile:** KSVL may consume authenticated session for
  requests only; no new identity meaning. Lock with platform reliability.
- **Saves/progression/Closet:** local stickers are not authoritative Closet
  ownership. Lock with Closet/economy owners before any shared write.
- **Rewards/economy:** no playback reward or listening-achievement grant exists.
- **Community/moderation:** request text needs staff authorization, abuse,
  retention and deletion controls.
- **Content/media admission:** the 29-song registry is current authority; live
  programme objects and DJ Booth must not form competing ledgers.
- **Analytics/customer evidence:** current Plausible/Clarity use requires a
  privacy review around raw request fields and session replay.
- **Release/build/runtime:** shared player is included on dozens of pages;
  change scope is larger than KSVL routes. BTB-055 manifest prevention is
  mandatory.

## 8. Exact source paths and current evidence

Core source:

- `radio.html`
- `ksvl-popup.html`
- `games/dj-booth.html`
- `content/site/ksvl-player.js`
- `content/site/radio-v2.js`
- `content/radio-v2.css`
- `content/music/ksvl-track-registry.json`
- `content/music/*.mp3`
- `content/music/ksvl-jingles/`
- `content/music/ksvl-transitions/`
- `content/music/ksvl-spots/`
- `supabase/migrations/20260630000000_baseline_schema.sql`
- `content/playlists/`
- `scripts/validate-ksvl-catalogue.mjs`
- `scripts/test-ksvl-browser.mjs`
- `scripts/validate-ksvl-artifact.mjs`
- `scripts/build-public-site.mjs`

Initialization evidence:

```text
node scripts/validate-ksvl-catalogue.mjs
KSVL CATALOGUE CONTRACT PASS tracks=29 playable=29

node scripts/validate-ksvl-artifact.mjs operations/launch/eod-2026-07-25/local-public-artifact
KSVL artifact: 83 audio dependencies · 141.99 MiB · source and artifact hashes match
```

The second result proves the dated artifact's computed audio set, not the
current registry/player/radio release. The artifact lacks
`content/music/ksvl-track-registry.json`, and its source hashes differ.

## 9. Verification and approval contract

Before KSVL can move beyond `SPECIFIED`:

1. KSVL owner verifies the inventory and resolves the six owner decisions in
   `EXPERIENCE-BRIEF.md`.
2. Control Room assigns disjoint locks for KSVL page/Booth work, shared player,
   request provider/schema, shared sticker/Closet state, analytics and release.
3. Makers produce an exact candidate; makers do not judge their own creative,
   accessibility, media-quality or public result.
4. Independent reviewers separately judge product/truth, UX/accessibility,
   audio quality, backend/privacy, shared consumer regression and exact
   release/public origin.
5. Every four-scope visitor scene and transition receives its own verdict.
6. Affected destination/consumer owners verify both ends of each route/state
   handoff.
7. Portfolio Control Room binds the candidate SHA/artifact, release authority,
   rollback and public proof.

The executable work contract is
`build-packet-owner-listening-request-provider-readiness-2026-07-26.md`.
