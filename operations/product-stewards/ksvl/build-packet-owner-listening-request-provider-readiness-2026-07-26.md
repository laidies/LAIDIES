# KSVL owner listening, request and provider readiness build packet

**Status:** SPECIFIED — EXECUTABLE AFTER CONTROL ROOM LOCK; BUILD NOT STARTED  
**Trigger:** `OWNER_AUDIO_QUALITY_PUBLIC_ORIGIN_AND_REQUEST_SERVICE_CHECK`  
**Owner:** KSVL champion  
**Release authority:** Portfolio Control Room  
**Initialization boundary:** this packet changes no live radio, shared player,
provider, schema, analytics, asset, build or public service.

## Outcome

- **Product:** KSVL Community RAiDIO (`ksvl`)
- **Complete scope:** `/radio.html`, `/ksvl-popup.html`, KSVL-owned DJ Booth,
  canonical 29-track registry, shared player consumers, request service,
  programme audio, provider lane, accessibility, return states, exact release
  and public-origin proof.
- **User problem:** current source locally admits 29 creator-confirmed originals,
  but stale zero-admission copy, a competing seven-track Booth, an unproved
  request transaction, incomplete programme-object admission, local-only
  collection promises and a stale public artifact prevent a coherent,
  accessible and truthfully releasable station.
- **Intended outcome:** each of the four visitor scopes can discover, hear,
  control, understand and return to the exact admitted catalogue; authenticated
  request delivery has a complete provider/privacy lifecycle; every consumer
  uses one authority; the exact candidate passes independent audio,
  accessibility, backend and public-origin gates.
- **Evidence:** `EXPERIENCE-BRIEF.md`, `FUNCTIONALITY-MAP.md`, current source,
  commit `2491710`, 29/29 local validator, 83-dependency artifact validator,
  KSVL 2026-07-25 maker/rejudge records, BTB-055 and BTB-106.
- **Explicit non-goals:** no autoplay, account-backed listening history,
  playback reward, raw-request analytics, automatic public provider admission,
  silent shared-state invention, external publication or deployment without
  release authority.

## Required decisions before lock assignment

| Decision | Recommended direction | Decider | Build consequence |
|---|---|---|---|
| Programme ritual | Keep direct 29-song shelves primary; admit a curated live rotation only after every jingle/transition/spot has a programme registry and human audio judgment | KSVL owner + Ali for audio/editorial taste | Determines live-rotation scope and programme-object registry |
| DJ Booth ownership | Treat as KSVL-owned subproduct and replace its seven-track implementation with the canonical registry/player | KSVL owner + Control Room registry owner | Adds Booth to exact route tree and shared-player candidate |
| Sticker result | Either truthfully local-only with no Closet promise, or build a shared Closet delivery contract; do not leave current hybrid | Ali if product promise changes; Functionality Director for architecture | Determines whether Closet/economy lock is required |
| Request lifecycle | Review queue with requester receipt/status/withdraw/delete, bounded retention and staff moderation | KSVL owner + privacy/community/platform owners | Determines migration/RPC/staff/requester surfaces |
| External provider | Hold until specific playlists pass provider admission; do not mix provider tracks into the 29 originals | KSVL owner + Ali for playlist taste | Provider work may remain owner-decision held |
| Visual direction | Use current station as incumbent in the sitewide visual championship before propagation | Ali/Brand Director | Determines whether this packet includes visual production |

If a decision is not made, its affected work remains `OWNER DECISION REQUIRED`;
unrelated locked lanes may proceed.

## Lock and write-boundary request

Control Room should assign these as separate, non-overlapping locks:

| Lock | Maker boundary | Collision owners |
|---|---|---|
| KSVL page/Booth | `radio.html`, `ksvl-popup.html`, `games/dj-booth.html`, `content/radio-v2.css`, `content/site/radio-v2.js`, KSVL assets | Brand/Experience, destination owners |
| Shared player/catalogue | `content/site/ksvl-player.js`, `content/music/ksvl-track-registry.json`, catalogue/browser tests | Platform reliability and all shared-player consumers |
| Programme audio registry | New KSVL programme registry/evidence only; audio files only with explicit media lock | Audio/media quality, rights/editorial |
| Request provider | KSVL request client module, new Supabase migration/RPC, request tests/surfaces | Identity, privacy, community/moderation, platform |
| Sticker/Closet | KSVL sticker producer plus shared ownership store/consumer only if approved | Closet, economy, identity |
| Analytics | Event dictionary and KSVL instrumentation/privacy config | Analytics/privacy, Clarity/Plausible owners |
| Release | Build manifest, exact candidate and KSVL release/public validators | Platform reliability/Control Room |

No maker starts from this packet alone; the lock names the exact allowed paths.

## Work breakdown

| ID | Work item | Craft owner | Inputs | Output | Dependencies | Start status |
|---|---|---|---|---|---|---|
| KSVL-B01 | Reconcile current station copy/components to the 29-track truth; remove zero-admission contradictions without overclaiming words, rewards or public proof | KSVL frontend/content maker | Experience brief, registry, current radio | Locked radio candidate | Page lock; programme decision | READY AFTER LOCK |
| KSVL-B02 | Converge DJ Booth on the canonical registry/shared state machine; delete the competing seven-track authority only inside its lock | Shared-player/frontend maker | Functionality map, Booth, player API | Registry-native Booth candidate | Booth + shared-player locks | READY AFTER DECISION/LOCK |
| KSVL-B03 | Make the shared player expose one reusable API/view for station, mixes, bands, Booth, popup and single-track consumers while preserving strict admission/failure/return behavior | Shared-player maker | Current player/tests/consumer inventory | Versioned shared component/API and migration notes | Shared lock; consumer owners | READY AFTER LOCK |
| KSVL-B04 | Inventory and admit/hold every jingle, transition, intro, spot and sign-off as a programme object with creator/content/audio/freshness status | Catalogue + audio editorial maker | 83 dependency inventory, audio sources | Programme registry and evidence sheet | Programme decision; media lock | READY AFTER DECISION |
| KSVL-B05 | Perform human audio-quality review of 29 songs plus every admitted programme object | Audio-quality maker | Exact masters, normalized review protocol | Dated per-item/sample evidence and repair list | Candidate media identities | WAITING FOR CANDIDATE |
| KSVL-B06 | Add approved non-audio context: per-track source visibility, five null-route decisions and prioritized as-recorded words/transcripts/captions | Content/accessibility maker | Registry, episode/activity owners, source canon | Content packet and UI candidate | Destination owners; no silent canon | READY AFTER LOCK |
| KSVL-B07 | Replace ambiguous request insert/read with an authoritative, idempotent provider completion contract | Backend/data maker | Baseline schema/RLS, request intent | New migration/RPC/service contract and tests | Provider/data lock | READY AFTER LOCK |
| KSVL-B08 | Build requester status/withdraw/delete and staff moderation/retention/abuse lifecycle | Backend + community/privacy makers | B07 contract and policy decision | Requester/staff surfaces, policies, retention job | Lifecycle decision; identity/moderation locks | READY AFTER DECISION |
| KSVL-B09 | Complete signed-out draft reload/edit/delete/expiry and storage-failure behavior | Frontend/privacy maker | Current form/local key | Bounded local draft lifecycle | Page lock | READY AFTER LOCK |
| KSVL-B10 | Resolve sticker result: truthful local-only UI or authoritative Closet delivery with create/read/revoke/conflict behavior | KSVL + Closet/economy makers | Owner decision, shared ownership contract | Locked candidate and propagation tests | Sticker decision; shared locks if delivery | OWNER DECISION REQUIRED |
| KSVL-B11 | Define/admit any external provider playlist with scene, rights, privacy, accessibility, freshness and return record | Provider/editorial maker | Playlist records, provider terms | Provider admission dossier/candidate | Provider decision; no install/spend implied | OWNER DECISION REQUIRED |
| KSVL-B12 | Define privacy-safe KSVL event contract and protect request inputs from analytics/session-replay capture | Analytics/privacy maker | Event dictionary, Plausible/Clarity config | Events, redaction/exclusion config, payload tests | Analytics lock | READY AFTER LOCK |
| KSVL-B13 | Run native accessibility and four-scope return suite | Independent accessibility/UX judge | Exact candidate and fixtures | VoiceOver/Safari/zoom/mobile/keyboard evidence | B01–B12 applicable candidate | WAITING FOR CANDIDATE |
| KSVL-B14 | Build exact release, prove registry/media manifest and run public-origin browser/human listening | Release maker + independent public verifier | Integrated SHA | Saved artifact, deployment record if authorized, public proof | All launch blockers; release authority | WAITING FOR INTEGRATION |

## Implementation contracts

### A. Catalogue/player contract

1. Registry remains the sole song admission authority; a test fixture cannot
   replace production data.
2. Runtime UI derives track identity, shelves, band subsets and source routes
   from that authority or a mechanically proven generated projection.
3. One hold/remove fixture propagates to radio, popup, mixes, bands, Booth and
   representative cross-town consumers in the same test run.
4. Current return state remains allowlisted, registry/context bound, bounded by
   duration, six-hour TTL and explicit paused restore.
5. Audio failure never silently skips, resumes another owner, counts listening
   or grants a sticker/reward.
6. Every computed media URL is in the release manifest and returns audio bytes,
   expected content type and signature from the exact candidate/public origin.

### B. Request transaction contract

Required request fields and behavior:

- server supplies request ID;
- authenticated user binding is provider-derived, never client-trusted;
- enumerated style, bounded topic and optional bounded lyric idea;
- client-generated idempotency key unique to a deliberate submission;
- one atomic RPC/transaction returns a safe receipt independent of staff fields;
- retry with the same key returns the same receipt, not a duplicate;
- accepted insert cannot become “failed” because a separate row select is
  forbidden or times out;
- requester can read safe status and withdraw/delete under policy;
- staff moderation fields are role-protected and never returned publicly;
- rate limit, abuse response, retention deadline and deletion/reconciliation
  job are explicit;
- raw request fields are excluded from Plausible, Clarity/session replay,
  screenshots and logs;
- offline/timeout/partial success gives an honest recovery route.

Use synthetic requests until the provider owner authorizes a controlled live
test. No real person's request text belongs in acceptance evidence.

### C. Four-scope return contract

Each scope starts from named data:

1. fresh browser/no Card;
2. valid local KSVL state/no Card;
3. device-local Card plus valid/invalid KSVL state;
4. verified account session plus separate local KSVL state.

Required transitions: leave/return, Card creation, local Card/account claim,
sign-out, second tab, popup, second device, storage denial, stale/corrupt state,
registry update/hold, request create/status/delete and Card song update. Each
receives its own result; account proof cannot lend a pass to device-local state
or vice versa.

### D. Accessibility/audio contract

- native control semantics and visible focus;
- meaningful 44px primary targets and logical keyboard order;
- status region exists before updates and does not announce timeupdate;
- focus moves to actionable recovery without trapping the listener;
- 320px, 390px, desktop and native 200% zoom;
- reduced-motion and no surprise sound/unmute;
- VoiceOver + Safari and keyboard-only Chromium;
- speaker and headphones on representative phone/desktop;
- human checks for start/end silence, clipping, loudness consistency,
  intelligibility, transitions, metadata/title match and accidental overlap;
- equivalent non-audio title/source/context even where transcripts remain
  scheduled content work.

### E. Provider contract

An outbound playlist record names provider, URL/ID, playlist owner, scene/job,
rights/editorial basis, provider data/terms boundary, accessibility fallback,
link freshness, return route and removal trigger. Provider streams do not enter
the 29-track local catalogue and do not inherit KSVL completion or rights.

## Required deterministic and rendered tests

### Pre-integration

```sh
node scripts/check-product-stewards.mjs --owner-entry ksvl
node scripts/validate-ksvl-catalogue.mjs
node scripts/validate-ksvl-artifact.mjs <exact-artifact-root>
```

Run the browser suite after supplying the workspace's reviewed
`PLAYWRIGHT_CORE_PATH` and browser binary:

```sh
PLAYWRIGHT_CORE_PATH=<reviewed-playwright-core> \
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
node scripts/test-ksvl-browser.mjs
```

The suite must be updated before use so its journey labels/assertions reflect
the current 29-playable catalogue rather than the retired zero-admission
candidate.

### Required new fixtures

- 29 available / one hold / one remove / stale registry / wrong bytes / wrong
  MIME / missing artifact registry;
- radio/Mix/Bands/Booth/cross-town consumer parity;
- first/return/local Card/account states and all transitions named above;
- popup blocked/closed/crashed/stale heartbeat/two-tab audio ownership;
- request accepted, rejected, auth expired, RLS read denied after successful
  write, timeout after commit, duplicate retry, moderation hold, withdrawal,
  deletion, retention expiry and provider down;
- local draft reload/edit/delete/expiry/corrupt/storage-denied;
- sticker local-only truth or full Closet propagation, including revoke and
  account/local conflict;
- provider link success/failure/return;
- screen reader, keyboard, zoom, reduced motion and responsive viewports.

### Current baseline to preserve

```text
KSVL CATALOGUE CONTRACT PASS tracks=29 playable=29
KSVL artifact: 83 audio dependencies · 141.99 MiB · source and artifact hashes match
```

The artifact line is a dated baseline only. The release gate requires a fresh
artifact that also contains the current registry and current source hashes.

## Acceptance and independent review

| Gate | Exact evidence | Independent owner | Pass condition |
|---|---|---|---|
| Product/content quality | Four-scope scene recording, complete 29/programme inventory, source handbacks and resolved contradictions | Product judge | Full job is understandable; no dead/fake object |
| Accuracy, safety and trust | Registry/provider/request/privacy/rights dispositions and hold propagation | Accuracy/privacy judge | No false public, delivery, identity, reward or provider claim |
| Positive LAiDIES brand contribution | Actual station/Booth at desktop/mobile with programme ritual | Brand judge who did not make it | At least 17/20 and visual-admission evidence |
| UX/accessibility | VoiceOver/Safari, keyboard, 320/390/desktop, 200% zoom, reduced motion, errors/retry | Accessibility judge | All required states usable; no surprise audio |
| Frontend/backend/data integrity | Consumer parity, provider transaction/idempotency/RLS/status/delete, local/account conflict | Backend/platform judge | Complete transaction and propagation pass |
| Audio/media quality | Human per-item/sample review plus metadata/content match and physical output | Audio judge who did not master assets | No clipping/intelligibility/loudness/transition blocker |
| Release/public origin | SHA-bound artifact manifest, registry present, bytes/MIME/signature and real public listen | Release verifier separate from maker | Intended version deployed and exact public journeys pass |

Product quality, accuracy/trust and LAiDIES brand contribution each require at
least 17/20. A local proxy, maker report or deployment status cannot substitute
for the independent public gate.

## Integration order

1. Record decisions and locks.
2. Freeze a baseline inventory/hash set and update tests for the current
   29-track truth.
3. Build catalogue/player/Booth convergence and page truth.
4. Build request provider/lifecycle and any approved sticker/provider work in
   disjoint locks.
5. Integrate non-audio context, accessibility and analytics protections.
6. Run source and exact-artifact suites.
7. Run independent product, backend/privacy, accessibility and audio gates.
8. Control Room binds exact SHA/artifact and authorizes release or returns a
   repair list.
9. After authorized deployment, a separate verifier performs public-origin
   playback/request-provider-safe checks and records the narrow truthful status.

## Release, rollback and public proof

- **Exact candidate:** a Control Room-named commit SHA and saved artifact; never
  an unbound working tree or the dated 2026-07-25 artifact.
- **Release authority:** Portfolio Control Room under AW-003. Grand reopening
  and announcement remain on hold.
- **Rollback:** retain the previous exact artifact; catalogue rollback is
  atomic with player/copy and must not leave source/artifact mismatch. A request
  migration needs forward-safe rollback/data preservation; never erase real
  submissions.
- **Public proof:** registry and all media resolve from public origin with
  correct bytes/type; one real first-time and one returning listen; Safari and
  Chromium; representative phone/desktop output; request provider only with
  synthetic authorized test data and cleanup proof.

## Measurement and learning

Baseline:

- 29/29 locally playable catalogue records;
- 24/29 source routes;
- 0/29 transcripts and captions;
- one shared player plus one competing seven-track Booth;
- request service, native accessibility, human audio quality and current public
  origin unproved.

Privacy-safe success signals:

- play attempt → confirmed playing or named error category;
- control/retry usage;
- source route opened;
- valid paused return restored;
- request receipt/status/delete success by synthetic/aggregate category;
- provider outbound/return only if admitted;
- no raw request text, person-level position, inferred interests or learning
  completion.

Failure triggers:

- catalogue/consumer count drift;
- source/artifact/public mismatch;
- media error or quality rejection;
- surprise playback/unmute or competing audio;
- ambiguous/double request delivery;
- raw request capture;
- missing accessibility state;
- false Closet/Card/reward/provider propagation;
- dead source/provider return route.

Review cadence:

- on any registry/player/request/provider/release change;
- weekly catalogue/programme freshness;
- monthly media/source/provider/accessibility health;
- quarterly request retention/privacy and catalogue retirement review.

After the cycle, update KSVL state/backlog/evidence and run the mandatory
learning scan. Existing prevention controls to reuse are BTB-055 (computed media
must ship and be tested at origin), BTB-106 (test catalogues cannot replace
public authority), BTB-134 (targeted owner entry), BTB-135 (producer-to-consumer
transaction) and BTB-136 (separate visitor scopes).

## Initialization learning scan

No new painpoint entry qualifies from this dossier-only recovery. The stale
zero-admission copy, competing Booth catalogue, dated artifact and incomplete
request round trip are direct recurrences/applications of BTB-055, BTB-106,
BTB-134, BTB-135 and BTB-136. Reuse those controls in the locked build rather
than creating a duplicate shared-ledger entry. No shared painpoint file was
edited under this initialization boundary.
