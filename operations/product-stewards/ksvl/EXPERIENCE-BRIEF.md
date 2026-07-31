# KSVL Community RAiDIO experience brief

**Status:** SPECIFIED — INTENT RECOVERED; OWNER/DIRECTOR REVIEW REQUIRED; LIVE BUILD NOT STARTED  
**Recovered:** 2026-07-26  
**Building owner:** KSVL champion  
**Brand & Experience Director:** review required  
**Functionality & Platform Director:** review required  
**Initialization boundary:** dossier/evidence only. No live KSVL, shared player,
identity, request service, provider, analytics, release or public-origin file may
change until Portfolio Control Room assigns an exact lock.

This brief reconciles the registry-bound KSVL dossier with the current source,
the 2026-07-26 creator-confirmed catalogue restoration and the standing visitor,
functionality and build-completion controls. Current implementation is evidence,
not self-authorizing intent.

## 1. Stable promise and successful result

KSVL is SUNNYVAiLE's community radio station and listening/memory-hook product:
creator-confirmed LAiDIES original songs, station texture and useful routes back
to the episode, activity, person or place that gives a track meaning.
`APPROVED BRIEF/ARTIFACT`

The successful listening result is: the visitor knowingly starts sound, can
identify and control the current admitted track, can recover from a media
failure, understands what is device-local, and can return to the relevant
SUNNYVAiLE source without a play being misreported as learning, membership or
completion. `APPROVED BRIEF/ARTIFACT`

KSVL is not an autoplay engagement system, a streaming account, a verified
listening-history service, a rights-clearing service, a guaranteed song-request
pipeline or a reward proxy for time spent listening.
`APPROVED BRIEF/ARTIFACT`

Every intended current-release capability remains a build obligation when
incomplete; misleading controls may be held for safety but hiding or narrowing
the promise cannot complete KSVL. `LOCKED LEDGER`

## 2. Reconciled current truth

- `content/music/ksvl-track-registry.json` is the current public song-catalogue
  authority and contains exactly 29 records: 29 `AVAILABLE`, 29
  `CREATOR_CONFIRMED_SUNO_ORIGINAL` and 29 `FILE_PRESENT_VERIFIED`.
  `VERIFIED USER/PRODUCT EVIDENCE`
- The 29 exact MP3 files are present (131.42 MiB total), and
  `node scripts/validate-ksvl-catalogue.mjs` passes `tracks=29 playable=29`.
  `VERIFIED USER/PRODUCT EVIDENCE`
- The current categories are 2 anthems, 12 PATRON SAiNT songs, 8 activity/place
  songs, 4 episode songs and 3 B-sides. `VERIFIED USER/PRODUCT EVIDENCE`
- Twenty-four records have a source route and five have `sourceLesson: null`.
  All 29 transcripts and captions are missing; lyric state is 13
  `RECONCILIATION_REQUIRED`, 12 `CANON_EXISTS_REVIEW_REQUIRED` and 4
  `AS_RECORDED_LYRICS_MISSING`. These are content/accessibility follow-ups and
  do not contradict Ali's creator/public-playback confirmation, but no copy may
  imply that words or lesson context exist where they do not.
  `VERIFIED USER/PRODUCT EVIDENCE`
- The local source player admits the 29 records after strict registry/runtime
  parity and explicit user action. Mechanical catalogue validation passes.
  Human audio quality, Safari, VoiceOver, native zoom, representative physical
  listening and live request-provider behavior remain unproved.
  `VERIFIED USER/PRODUCT EVIDENCE`
- The dated 2026-07-25 local public artifact predates the 29-track restoration:
  it has no copied `ksvl-track-registry.json`, and its player/radio hashes differ
  from current source. Its 83 audio dependencies still hash-match source, but it
  cannot prove the current public-origin catalogue or player.
  `VERIFIED USER/PRODUCT EVIDENCE`
- `/radio.html` still contains zero-admission-era sentences saying the Mix CDs
  cannot play and listening-based rewards are unavailable. That contradicts
  the current 29-track state and requires a locked repair.
  `CURRENT IMPLEMENTATION OBSERVED`
- `/games/dj-booth.html` presents a separate hard-coded seven-track player. It
  does not consume the 29-track registry or the shared KSVL state machine.
  `CURRENT IMPLEMENTATION OBSERVED`

### Verified 29-track inventory

| Programme shelf | Current track IDs |
|---|---|
| Anthems (2) | `town-anthem`, `wednesdays-in-sv` |
| PATRON SAiNTS (12) | `saint-bette`, `saint-buffy`, `saint-cher`, `saint-david`, `saint-deb`, `saint-dolly`, `saint-elle`, `saint-golden-girls`, `saint-miranda`, `saint-regina`, `saint-samantha`, `saint-sister-mary-clarence` |
| Activities and places (8) | `ask-laidy`, `businesswomens`, `dream-phone`, `girl-talk`, `mme-claio`, `blend-and-snap`, `the-library`, `the-newsstand` |
| Episodes (4) | `ep-01`, `ep-02`, `ep-03`, `ep-04` |
| B-side (3) | `every-slaiyer-watcher`, `impossible`, `debs-tomorrow` |

The inventory names admitted audio, not transcript/caption completeness,
learning completion, provider distribution or account ownership.
`VERIFIED USER/PRODUCT EVIDENCE`

## Audience and visitor-state jobs

| Visitor scope | Truthful recognition | Arrival and orientation | Primary job/action | Existing state and prompts | Success, next step and return promise |
|---|---|---|---|---|---|
| First-time visitor | No valid KSVL player state and no identity assumption. | Explain that sound starts only after an explicit action; show what the station contains and why it exists. | Choose one admitted track, mix or band route; understand controls and source context. | No prior position, favourites, requests, Card or rewards. Offer listening and optional exploration; do not demand a Card. | Audible-state proxy plus visible title/control status; offer source route, another programme shelf or stop. A future return may resume only if valid device state was written. |
| Returning visitor without a Resident Card | Valid strict KSVL local state or sticker/request draft on this browser; no Card/account proof. | Acknowledge saved device-local position or collection without replaying first-visit onboarding. | Resume explicitly, choose another track, revisit a local sticker selection or recover a local request draft. | Load only valid, current-registry device data; label it “on this device.” Offer Card/account only where delivery or separate Card song choice needs it. | Restored position remains paused until Play. Stale/corrupt state is discarded with an honest fresh-start fallback. |
| Resident Card holder — device-local scope | A valid Card only at the device-local scope actually proved; never infer login or account ownership. | Listening remains the same public KSVL experience; Card song choice is a separate product state. | Listen and optionally follow the separate Card-song route. | Do not sync history, favourites, stickers or requests to the Card. Do not award a reward from playback. | KSVL result remains local listening; Card updates occur only on the Card producer route and must not be implied by KSVL. |
| Resident Card holder — verified account-backed scope | Current authenticated provider session plus the shared identity contract; a cosmetic/local Card alone is insufficient. | Public listening remains available; authenticated status changes only the request-delivery option. | Listen or submit a request for station review through the verified service. | Player position/history/favourites remain device-local unless a later approved contract changes that. Offer server submission only with clear privacy, moderation, retention and receipt terms. | Authoritative request receipt and readable status lifecycle; sign-out returns to public/local behavior without leaking account data. Cross-device listening continuity is not promised. |

These four scopes are required release scenes, not personalization ideas.
`LOCKED LEDGER`

## 4. Place metaphor, feeling and ritual

The visitor should feel inside a community station and record counter: enter the
booth, tune to 99.9, choose what to hear, browse programme shelves/bands, see
what is playing, optionally leave a request for review, then carry the hook back
into town. Meaningful pictured/physical objects should operate the building
rather than decorate a generic media page. `LOCKED LEDGER`

The station's personality is warm, clever, specific and proudly local. It may
use radio ritual—frequency, booth, ON AIR state, DJ voice, liner notes, mixes
and sign-off—only when the state is truthful. Decorative static, fake provider
buttons or “live” language must not substitute for an actual playable,
understandable result. `APPROVED BRIEF/ARTIFACT`

The exact visual direction remains subject to the sitewide style decision and
independent visual admission. `UNKNOWN`

## 5. Complete owned product tree

| Owned surface/component | Product job | Boundary/current note |
|---|---|---|
| `/radio.html` | Main station arrival, 99.9 ritual, listening launch, programme counters, band browsing, stickers, request and source handbacks. | Registry-bound KSVL route. |
| `/ksvl-popup.html` | Optional continuous mini-window with the same admitted catalogue and explicit resume behavior. | Registry-bound KSVL route; popup heartbeat/state is device-local. |
| Shared `content/site/ksvl-player.js` | Canonical catalogue admission, mix/album/single queues, controls, failures, single-audio coordination and bounded local return. | Consumed on many pages; any edit is a shared-system collision requiring Control Room lock and regression scope. |
| Mix CDs | Programme shelves: All Songs, Anthems, PATRON SAiNTS, Activities, Episodes and B-side. | Current public copy conflicts with actual 29-track admission. |
| The Bands | Ten fictional band covers/tracklists and registry-derived album/track playback. | Must derive playability from the canonical registry. |
| Sticker Counter | Twenty visible stickers; one-time choice of up to three declaration stickers plus held/earned achievement states. | Current store is local only; “Closet” propagation is not implemented. Listening-unavailable copy is stale. |
| Call In a Request | Local signed-out draft or authenticated request receipt for review. | Real Supabase/RLS/moderation/retention/deletion lifecycle unproved. |
| `/games/dj-booth.html` | Focused booth listening subexperience. | Charter-owned subproduct, but omitted from KSVL registry routes and currently uses a separate seven-track implementation. Registry/ownership reconciliation required. |
| External playlist/provider lane | Optional outbound playlists with distinct scene/liner-note value. | Spotify plans exist, but no current public KSVL provider admission; do not blend third-party tracks into the 29 originals. |
| Cross-town KSVL player consumers | Single-track chips/links and persistent player on other SUNNYVAiLE pages. | Shared consumer set is broad; every change needs regression coverage and exact release-manifest proof. |

The registry omission of `/games/dj-booth.html` is an ownership-record gap, not
permission to abandon or silently separate the Booth. `INFERENCE`

## 6. Object-to-action map

| Object/component | Discoverability | Action and location | State carried | Visible result | Next step |
|---|---|---|---|---|---|
| Booth/hero and 99.9 dial | Above the fold on `/radio.html` | Set decorative dial; choose Listen | No identity | Dial explains 99.9; Listen asks shared player for admitted catalogue | Hear current programme or recover from load failure |
| Listen buttons | Hero, eyebrow and live band | Explicit play action | Catalogue + device player state | Persistent current title, state and controls | Pause/seek/next/repeat/shuffle/mute/volume/pop out/stop |
| Mix CD cases | Mix counter | Flip a case; play a mix or track | Mix ID, queue and current track | Registry-admitted queue starts; unavailable item is named honestly | Continue queue or open source route |
| Band covers | Bands counter | Flip cover; start album or selected track | Registry-derived artist subset | Cover/tracklist plus shared player result | Continue the band catalogue or another shelf |
| Persistent deck | Bottom player/popup | Operate playback and failures | Strict six-hour local state bound to registry revision/context | Labelled playing/paused/loading/error/ended state | Resume explicitly on return or stop/delete state |
| Sticker sheet | Sticker counter | Select up to three declarations once | `laidies_ksvl_stickers_earned` and `laidies_ksvl_stickers_picked` on device | Local collection count/tiles | Honest local review; Closet propagation requires a shared contract |
| Request phone/form | Request counter/deep link | Validate and save locally or send when authenticated | Local draft or account-backed request row | Device-only saved/failed result or validated provider receipt | Review status lifecycle, edit/delete path or retry |
| Source/lesson link | Track metadata, station alternatives and page links | Open owning episode/activity/place | Public route only | Owning product opens | Continue learning/activity under that owner's completion rules |
| Resident Card tie | End of station page | Open separate Card song-choice route | No KSVL state transfer | Card product explains/updates its own value | Return to KSVL without implied sync/reward |
| External playlist link | Provider section when admitted | Leave KSVL for provider | Provider terms/session outside LAiDIES | Clearly labelled outbound destination | Return path to KSVL and no false local-playback claim |

## 7. Required content and inventory

- The 29-song registry must remain the single admitted-original catalogue, with
  exact runtime parity, present audio and per-record public note.
  `VERIFIED USER/PRODUCT EVIDENCE`
- Every new/changed/held/retired track needs one atomic registry decision,
  source hash/file proof, creator/rights provenance, freshness date, public
  copy and source-route disposition before it affects any player surface.
  `APPROVED BRIEF/ARTIFACT`
- Jingles, DJ transitions, spots, intros and sign-off audio are separate
  programme objects. Their presence in the 83-file runtime dependency set does
  not automatically admit them as creator-confirmed songs or clear their audio
  quality/content. `VERIFIED USER/PRODUCT EVIDENCE`
- Transcripts/captions/lyrics and five missing source routes remain explicit
  inventory debt. The interface must offer equivalent non-audio orientation
  now and add synchronized words where they materially improve access.
  `APPROVED BRIEF/ARTIFACT`
- External playlists remain outside the 29-track catalogue and require a
  provider-native provenance, rights, privacy, accessibility and return
  decision before public presentation. `APPROVED BRIEF/ARTIFACT`

## 8. Principal journeys

### Primary listening

Arrive → understand explicit-action audio → select station/mix/band/track →
load exact current registry → validate item admission → stop other audio owner →
show loading → receive media metadata and playback events → expose complete
controls/status → offer source/next programme → stop or save a bounded local
return state. `APPROVED BRIEF/ARTIFACT`

### Request

Open counter/deep link → enter bounded style/topic/optional lyric idea →
validate → determine authenticated session → either save a labelled local draft
or perform the provider transaction → require authoritative receipt → show
review-only result → support status, correction, deletion and provider failure
without duplicate submission. `APPROVED BRIEF/ARTIFACT`

### Provider/outbound

Understand that provider playlists are separate from KSVL originals → choose a
clearly named outbound playlist → provider opens under its own terms → retain a
clear return route and source/scene context. No provider follow, stream or
playlist state is treated as a KSVL completion. `APPROVED BRIEF/ARTIFACT`

### Return/resume transitions

- First visit → leave → return without Card: strict valid device player state
  restores paused; explicit Play resumes. `APPROVED BRIEF/ARTIFACT`
- First/returning visitor → device-local Card → return: listening behavior does
  not change; Card song choice remains separate. `APPROVED BRIEF/ARTIFACT`
- Device-local Card → account-backed resident: only a verified auth session may
  unlock request delivery; no listening sync is inferred. `LOCKED LEDGER`
- Signed-in → sign out → return: request delivery becomes unavailable; public
  listening and valid local state remain, with no account content exposed.
  `LOCKED LEDGER`
- Second tab/device: one page/audio owner at a time on a device; no cross-device
  continuity. Popup heartbeat must fail safely. `APPROVED BRIEF/ARTIFACT`
- Corrupt/stale/wrong-registry/storage-denied: discard or avoid the write,
  preserve visitor input where safe, explain the fallback and never autoplay.
  `APPROVED BRIEF/ARTIFACT`
- Track update/removal: invalidate saved identity/position; remove it from every
  mix, band, Booth and cross-town consumer before claiming completion.
  `LOCKED LEDGER`

## 9. Cross-building relationships and handbacks

| Relationship | KSVL responsibility | Other owner responsibility |
|---|---|---|
| Episodes / Chick Flicks | Correct episode-song identity and route; no play-as-completion claim. | Episode availability, canon, transcript/learning completion. |
| LIBRAiRY / learning surfaces | Correct source route and memory-hook context. | Canonical concept/learning result. |
| Activity/place tracks | Correct owning route for Ask LAiDY, BRONZE AiGE, Dream Phone, Girl Talk, Mme CLAi-O, Blend & Snap, Library and NewsStand. | Destination product truth and completion. |
| Resident Card | Explain no history/favourite/reward sync and link to separate song choice. | Identity, account and Card-song authoritative write/read. |
| Closet | Do not promise local stickers “land” there until a producer/store/consumer transaction exists. | Shared ownership/collection contract and cross-device proof. |
| Homepage and cross-town player chips | Provide registry-safe metadata and one-audio behavior. | Consumer page copy, control and regression ownership. |
| Platform reliability | Supply exact media/registry release manifest and public checks. | Identity, Supabase, analytics, release binding and rollback. |

## 10. Platform contracts consumed

- Identity/account: provider session only for authenticated request delivery;
  no identity requirement for listening.
- Persistence: strict registry-bound six-hour local player state; separate local
  sticker/request-draft keys; no account playback store.
- Community/moderation: song-request review queue, staff access, abuse handling,
  retention, correction and deletion are required but not verified.
- Media admission: `content/music/ksvl-track-registry.json` plus runtime parity,
  exact audio files and current release manifest.
- Providers: Supabase for authenticated requests; Suno is provenance of the 29
  creator-confirmed originals, not a runtime streaming provider; Spotify is a
  possible outbound provider, not part of the admitted local catalogue.
- Analytics: privacy-safe aggregate attempt/result/error/control/source-open
  signals only; never raw request text, exact person-level position or inferred
  learning.
- Release reliability: computed media dependencies require explicit manifest,
  byte/content-type proof and a real public-origin listening action.

## 11. Brand, accessibility, motion and audio invariants

- No surprise sound or cross-page unmute. Every audible start/resume follows a
  clear visitor action.
- Persistent state text distinguishes loading, playing, paused, waiting,
  stalled, blocked, failed and ended without announcing rapid time updates.
- Player and request controls use native buttons/ranges/inputs, persistent
  names, visible focus, logical keyboard order and recoverable focus after
  errors. Primary touch targets meet the 44px contract.
- Reduced-motion disables record/equalizer/pulse motion without hiding state.
- Layout passes 320px, 390px, desktop and native 200% zoom with no clipped
  controls or horizontal action loss.
- Non-audio visitors receive title/artist/source context and an equivalent
  route. Transcript/caption gaps are visible debt, not erased by decorative
  animation.
- Human listening judges intelligibility, clipping, loudness consistency,
  silence, starts/ends, DJ-to-song transitions and speaker/headphone behavior;
  decode/time advancement alone is not audio-quality approval.
- Provider destinations are visibly external, keyboard accessible and include
  a return route.

## 12. Launch acceptance scenes

1. First-time mobile visitor starts one of the exact 29 tracks, hears it after
   an explicit action, identifies it, operates pause/seek/mute/volume/next/stop,
   follows its source route and recovers from denial and media error.
2. Returning no-Card visitor receives a valid paused local restore, resumes
   explicitly, then survives stale registry, corrupt state and storage denial.
3. Device-local Card holder sees no false account sync/reward and can open the
   separate Card-song route without KSVL mutating it.
4. Verified account resident submits one synthetic request to a controlled
   service, receives an authoritative receipt, reads it back, avoids duplicate
   retry and completes correction/deletion/retention/moderation checks.
5. Popup and main page coordinate one audio owner; close/crash/heartbeat expiry
   returns to an honest controllable state.
6. DJ Booth, Mix CDs, bands and every cross-town consumer derive admission from
   the same 29-track authority; hold/remove one fixture track and observe every
   consumer update.
7. Exact release artifact contains the registry and all referenced media;
   public origin returns correct bytes/content types and passes one human
   listening action in Safari and Chromium.
8. VoiceOver, keyboard-only, reduced-motion, 320/390/desktop, 200% zoom and
   representative physical speaker/headphone scenes pass independently.

Passing local catalogue validation alone cannot lend a pass to these scenes.

## 13. Unresolved decisions and non-goals

### Owner/director decisions

1. Confirm the exact current programme ritual: direct song/mix selection versus
   a curated “live” rotation that also includes jingles, spots and DJ segments.
   Those 54 non-song audio dependencies are present but not covered by the
   29-song registry.
2. Confirm whether DJ Booth is an owned KSVL route/subproduct and must replace
   its seven-track player with the canonical 29-track component (recommended),
   or has a distinct approved job and registry.
3. Decide whether local declaration stickers are a current KSVL collectible
   and whether true Closet delivery is current-release scope. Existing copy
   promises “Take them home to your Closet” without propagation.
4. Approve the provider lane: remain held, or admit specific outbound Spotify
   playlists with scene/rights/privacy/accessibility/return records.
5. Confirm the intended request lifecycle, staff owner, retention period,
   moderation/abuse rules, requester status visibility and deletion path.
6. Approve the sitewide visual direction before a station/Booth redesign.

### Non-goals

- Do not create an account-backed listening history or favourites service by
  implication.
- Do not award Resident Card, reward, learning or mastery state from playback.
- Do not auto-publish requests, raw lyrics or provider/user data.
- Do not treat the dated 2026-07-25 artifact as the current 29-track release.
- Do not modify live/shared files until Control Room assigns exact lock paths.

## 14. Reconciliation sources and approvals

Primary durable sources:

- `operations/product-stewards/ksvl/CHARTER.md`
- `operations/product-stewards/ksvl/OPERATING-SPEC.md`
- `operations/product-stewards/ksvl/state.json`
- `operations/product-stewards/ksvl/backlog.md`
- `content/music/ksvl-track-registry.json`
- `content/site/ksvl-player.js`
- `content/site/radio-v2.js`
- `radio.html`, `ksvl-popup.html`, `games/dj-booth.html`
- `supabase/migrations/20260630000000_baseline_schema.sql`
- commit `2491710` (`fix: restore KSVL and retire legacy Fun Pack`)
- KSVL evidence dated 2026-07-25
- D-2026-07-24-023, D-2026-07-26-050 through D-2026-07-26-056
- BTB-055, BTB-106, BTB-134, BTB-135 and BTB-136

Required approvals before implementation/integration:

- KSVL owner: intent, complete tree and product acceptance.
- Brand & Experience Director: station/Booth system fit and visual admission.
- Functionality & Platform Director: shared player, identity, request provider,
  local/account state, Closet and analytics contracts.
- Affected destination/consumer owners: both sides of every source or shared
  player handoff.
- Portfolio Control Room: exact locks, integration order, release candidate,
  independent judges, public verification and rollback.
