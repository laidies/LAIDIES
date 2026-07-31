# Chick Flicks building experience brief

**Status:** INTENT RECOVERED — DIRECTOR REVIEW AND CONTROL ROOM BUILD LOCK
PENDING
**Building owner:** Chick Flicks product champion
**Brand & Experience Director:** review required before visual propagation
**Functionality & Platform Director:** review required before shared-contract
implementation

This record reconciles the approved Chick Flicks building brief with locked
owner-entry, complete-building, functionality and visitor-state controls. It
does not approve a live-route edit, a new visual direction or any episode
media.

## Stable promise and user outcome

Chick Flicks is SUNNYVAiLE's 1999 video-rental store: a visitor stands in the
store, understands which LAiDIES episodes are released, pulls a real VHS tape
from the rental wall and reaches the exact episode experience she chose.
`APPROVED BRIEF/ARTIFACT`

The rental wall is the primary operating surface; the building must feel like
one coherent store rather than a decorative room followed by a generic
catalogue. `APPROVED BRIEF/ARTIFACT`

The complete owned result includes the storefront discovery experience, the
Screening Room illustrated listen-along, captions, programme selection,
article continuation and the return path to Chick Flicks. `LOCKED LEDGER`

“Rent” is a free, memorable handoff metaphor. It does not mean payment,
fulfilment, completion, mastery, ownership, account history or a real due
date. `LOCKED LEDGER`

## Audience and visitor-state jobs

| Visitor state | Recognition and arrival | Useful job and primary action | Result, next step and return promise | Current launch scope |
|---|---|---|---|---|
| First-time visitor | No valid Chick Flicks return record is required; no Card/account inference | Understand released versus forthcoming, learn that Episode 01 is the starting tape, choose a released tape or the optional trailer/listen-along | Reach the exact issue or Screening Room programme; return to the store through an explicit route | Catalogue has bounded local evidence; human comprehension, native accessibility and public-origin proof remain open |
| Returning visitor without a Resident Card | Valid versioned device-local favourite, last-rental or Screening Room progress only | Continue a valid same-device favourite/rental/listen-along or choose another released tape without replaying all newcomer orientation | Resume only the exact valid programme/device record; Start over clears it; no account or completion claim | Catalogue and player return mechanics have bounded local evidence |
| Resident Card holder — device-local | Separately valid local Card plus separately validated Chick Flicks records; Card is not login | Receive the same free catalogue/player experience; optionally see a truthful on-this-device favourite association | Continue locally; Card presence grants no availability, sync, ownership, reward or public identity | Same-device language only; Card-to-Closet favourite propagation requires shared-owner confirmation |
| Resident Card holder — verified account-backed, if supported | Accepted auth/profile/session evidence, not a local Card alone | No account-backed Chick Flicks benefit is currently approved or proved | Fall back to the same anonymous/device-local experience; do not claim cross-device history or resume | Account-backed Chick Flicks state is HOLD |

The four states above require separate evidence; a clean-browser, local Card or
signed-in shell PASS cannot lend its verdict to another state. `LOCKED LEDGER`

Required transitions are first visit → device-local return; visitor → local
Card → same-device return; valid local player progress → resume/start over;
favourite add/remove → receiving surface; storage denied/corrupt/stale state;
sign-out; second tab/device; local-to-account claim if ever supported; and
Card/account deletion or revoke. `LOCKED LEDGER`

## Place metaphor, feeling and ritual

The place is a warm, dimensional, Y2K-honest video store with Becky as its
curating keeper, real VHS boxes, a New Releases wall, aisle signage, a member
card and a Screening Room. `APPROVED BRIEF/ARTIFACT`

The ritual is `enter → hear Becky's current truth → choose an aisle or tape →
pull a released tape → see the rental-card response → open the issue or
illustrated listen-along → continue/return`. `APPROVED BRIEF/ARTIFACT`

The due-date stamp is signature delight only; “RETURN BY FRI” must remain
obviously playful and must never create a debt, countdown, penalty or false
fulfilment state. `APPROVED BRIEF/ARTIFACT`

## Complete owned product tree

- `/chick-flicks.html`: store arrival, Becky/current-truth area, rental wall,
  aisle catalogue, released/forthcoming state, tape detail, favourite and
  last-rental device state, house rules and handoffs.
  `APPROVED BRIEF/ARTIFACT`
- `/episodes.html`: retired discovery route that returns the visitor to the
  canonical Chick Flicks storefront without creating a second catalogue.
  `CURRENT IMPLEMENTATION OBSERVED`
- `/watch.html?ep=<trailer|01|02|03|04>`: owned Screening Room programme
  selection, player, captions, device-local resume/start-over, failures,
  article continuation and return to Chick Flicks. `LOCKED LEDGER`
- Weekly Episode Engine issue packages are receiving editorial/learning
  products coordinated with permanent task
  `019f9f7c-f03a-7ec1-a776-d60b57210322`; Chick Flicks owns the truthful
  discovery, archive, listen/watch presentation and return handoff, not their
  teaching substance.
  `LOCKED LEDGER`
- Episode Media Quality is the required admission authority for narration,
  visuals, captions and any future motion-film edition; Chick Flicks cannot
  approve those assets by itself. `LOCKED LEDGER`

## Component and object-to-action map

| Object/component | Discoverability and action location | State carried | Result and next step | Provenance |
|---|---|---|---|---|
| Becky/current-truth marquee | Visible on arrival in the store/counter area | Latest verified released episode; valid local return hint only | Explains what is available and offers Episode 01 or a valid return | `APPROVED BRIEF/ARTIFACT` |
| New Releases rental wall | Primary room surface; real VHS boxes are operable objects | Validated episode-index row and release state | Released tape opens its exact issue; held/draft tape explains unavailable state | `APPROVED BRIEF/ARTIFACT` |
| Aisle switcher | One in-store directory operating the same wall | Curated aisle ID; All and Unfiled derive from validated inventory | Re-populates the wall without hiding valid index growth | `APPROVED BRIEF/ARTIFACT` |
| Tape detail/rental action | Selected VHS box in the wall/detail area | Episode number, title, status and verified local issue URL | Honest issue handoff; never completion | `LOCKED LEDGER` |
| Favourite/member-card control | Selected released tape and compact member-card area | `laidies_favorite_episode`, device-local only | Reversible same-device confirmation and coordinated Closet display where proved | `CURRENT IMPLEMENTATION OBSERVED` |
| Due-date rental card | Fires after a verified tape handoff gesture | `laidies_cf_last_rental`, device-local only | Playful return hint for the next visit; no obligation | `APPROVED BRIEF/ARTIFACT` |
| Trailer/Screening Room entrance | First-time block and released-tape secondary route | Exact allowed programme ID | Opens illustrated listen-along with truthful per-title status | `LOCKED LEDGER` |
| Programme shelf | Screening Room | Exact allowlist: trailer, 01, 02, 03, 04 | Selects one programme; unknown IDs fail coherently | `CURRENT IMPLEMENTATION OBSERVED` |
| Player transport/seek/chapters | Screening Room | Current programme clock and admitted cue/caption records | Play, pause or seek; failure stops transport and offers retry/exit | `CURRENT IMPLEMENTATION OBSERVED` |
| Caption region | Below the Screening Room image | Exact VTT clock/coverage state | Synchronized read-along or explicit transcript-unavailable state | `LOCKED LEDGER` |
| Resume/Start over | Screening Room return prompt | Closed, versioned programme/time record on this device | Resume same programme or clear and restart; never account/progress | `CURRENT IMPLEMENTATION OBSERVED` |
| Full issue continuation | Screening Room departure rail | Verified programme-to-issue route | Opens the exact full issue | `LOCKED LEDGER` |
| Back to Chick Flicks | Screening Room departure/return control | Store return URL; no private state required | Returns to the rental store with sensible focus/history behavior | `LOCKED LEDGER` |
| Study Pack, quiz and Post Office routes | Compact store/issue handoff areas | Exact destination and availability label | Optional receiving product, never implied completion | `APPROVED BRIEF/ARTIFACT` |

All legible navigation, labels, status and control text remain live HTML rather
than baked into generated art. `APPROVED BRIEF/ARTIFACT`

## Required content and inventory

The episode index currently lists Episodes 01–04 as published and Episode 05
as draft; only a validated published record with a safe, present local issue
destination is rentable. `CURRENT IMPLEMENTATION OBSERVED`

All tapes derives from validated index rows, and a valid unmapped row remains
visible under Unfiled rather than disappearing behind stale aisle curation.
`CURRENT IMPLEMENTATION OBSERVED`

The Screening Room programme allowlist is trailer and Episodes 01–04; Episode
05 is absent. `CURRENT IMPLEMENTATION OBSERVED`

Exact current Screening Room media truth is:

| Programme | Current exact truth | Required visitor wording/disposition |
|---|---|---|
| Trailer | Main cues 1–30 are VTT-aligned; final 64.356 seconds are uncaptioned; final-card onset is unknown; 0/33 visual occurrences admitted | Partial-caption timing repair only; TITLE HOLD |
| Episode 01 | Player regression passes; clock is proportionally rebased; style drift remains; 0/55 visual occurrences admitted | TITLE HOLD |
| Episode 02 | All 27 main cue starts are VTT semantic-onset aligned; style/long-hold review remains; 0/31 visual occurrences admitted | Main timing repair only; TITLE HOLD |
| Episode 03 | Source clock is proportional; deployable artifact uses one hash-bound VHS cover; 0/49 visual occurrences admitted | Cover-only narrated edition; TITLE HOLD |
| Episode 04 | Deployable artifact replaces visuals and Ada loop with one hash-bound VHS cover; likeness/era/setting review remains; 0/58 visual occurrences admitted | Cover-only narrated edition; TITLE HOLD |

`EPISODE_FILMS` is empty and no title is approved as a motion film.
`LOCKED LEDGER`

The five narration tracks, five cue sheets and five caption masters may support
bounded listen-along testing, but file presence and player operation do not
approve a title's visuals, caption completeness or public promotion.
`LOCKED LEDGER`

Current room/rental-card visual files and any Becky candidate are not final
owner visual approval. `CURRENT IMPLEMENTATION OBSERVED`

## Journeys

- **Primary:** enter → understand current released truth → choose an aisle/tape
  → open the exact released issue. `APPROVED BRIEF/ARTIFACT`
- **Optional exploration:** inspect forthcoming tapes, favourite/unfavourite a
  released tape locally, open the trailer or Screening Room, or use an honest
  Study Pack/quiz/Post Office handoff. `APPROVED BRIEF/ARTIFACT`
- **Screening Room:** select an allowed programme → understand cover-only or
  held listen-along truth → play/pause/seek → read captions or explicit gap
  state → open the full issue or return to Chick Flicks. `LOCKED LEDGER`
- **Return/resume:** validate same-device favourite/last-rental/player record →
  resume only the same valid target or clear/start over → never infer identity
  or completion. `LOCKED LEDGER`
- **First visit → return without Card:** a valid device record may shorten
  orientation and offer continuation while keeping the full catalogue
  available. `LOCKED LEDGER`
- **First/returning → create Card → same-device return:** Card presence may
  label a local association but cannot unlock or sync Chick Flicks.
  `LOCKED LEDGER`
- **Device-local Card → verified account:** no merge/sync contract exists;
  preserve safe local behavior and withhold account continuity claims.
  `CURRENT IMPLEMENTATION OBSERVED`
- **Failure:** invalid/missing index, unsafe/missing issue route, broken cover,
  denied/corrupt storage, unknown programme, cue/caption/audio/visual/playback
  failure and offline/retry states fail closed with a useful exit/retry.
  `LOCKED LEDGER`

## Cross-building relationships and handbacks

The Weekly Episode Engine owns the issue's opportunity, teaching/editorial
outcome, production, checksum-bound release candidate and package-level public
proof. Chick Flicks receives that immutable candidate and owns its
discovery/archive/player admission and visitor-journey proof. `LOCKED LEDGER`

Neither owner's public proof substitutes for the other: a released episode
package does not prove discovery/player/return, and a functioning player does
not prove the episode package or a media edition was admitted. `LOCKED LEDGER`

Screening Room is an owned Chick Flicks child; its separate dossier supplies
title-level player and admission truth but does not fragment responsibility
for the complete visitor journey. `LOCKED LEDGER`

Blend & Snap, SUNNYVAiLE High and Post Office own Study Pack, assessment and
delivery outcomes respectively; Chick Flicks may link only to proved
destinations with accurate labels. `LOCKED LEDGER`

Resident Card/Closet owns any cross-page favourite display or future account
continuity; Chick Flicks remains device-local until that shared producer and
consumer contract passes. `LOCKED LEDGER`

Platform/Town Entry owns shared navigation, route packaging, episode-index
fan-out and production analytics delivery. `LOCKED LEDGER`

## Platform contracts consumed

- **Identity/account/permissions:** none required for access; verified account
  continuity is unsupported and must not be implied. `LOCKED LEDGER`
- **Saves/progression/Closet:** device-local favourite and last-rental only;
  neither is progression. Closet consumption requires shared-owner evidence.
  `CURRENT IMPLEMENTATION OBSERVED`
- **Rewards/economy/ownership:** no Chick Flicks reward, payment, ownership,
  due date or fulfilment contract. `LOCKED LEDGER`
- **Community/moderation:** no direct community write in the owned routes.
  `CURRENT IMPLEMENTATION OBSERVED`
- **Analytics/customer evidence:** proposed categorical discovery,
  listen-along and failure events require Platform/Privacy approval; raw
  transcript, identity, storage values and inferred interests are prohibited.
  `LOCKED LEDGER`
- **Release reliability:** exact episode index, issue destinations, player
  allowlist, media hashes, derived-edition manifest, packaged files and
  source/artifact/public parity are required. `LOCKED LEDGER`

## Functionality and cross-page touchpoint map

`FUNCTIONALITY-MAP.md` is the companion system contract. It separates the
episode-index producer, storefront reader, Screening Room programme/player,
caption authority, device-local return records and receiving issue/Closet
paths. `LOCKED LEDGER`

## Brand invariants and building freedoms

Invariants are truthful state, operable rendered objects, live readable UI,
approved character continuity, candy-accent family, accessible controls,
shared navigation grammar and no fake completion/account/media claim.
`APPROVED BRIEF/ARTIFACT`

Building freedoms include wall/counter geometry, aisle-directory treatment,
rental-card physicality, Becky's staging and video-store light, subject to the
sitewide style championship and owner visual review. `INFERENCE`

The old gold/plum panel chrome, generic long-page catalogue and CSS chips
pretending to be physical tapes are rejected directions. `APPROVED BRIEF/ARTIFACT`

## Desktop, mobile, accessibility, motion and audio

Desktop keeps the room and rental wall central; mobile uses a real operable
tape strip or equally legible inventory rather than tiny image hotspots.
`APPROVED BRIEF/ARTIFACT`

The same discovery, player, caption, continuation and return outcomes must
work at 320/390/1280px, 200% zoom/reflow, keyboard-only, reduced motion and
native Safari/VoiceOver. `LOCKED LEDGER`

Captions remain below the illustration; high-frequency `aria-live` narration
requires native assistive-technology review. `LOCKED LEDGER`

No autoplay is required. Player/cue/caption/audio/image failure pauses and
disables transport, names the failed component and offers retry/exit.
`LOCKED LEDGER`

## Launch acceptance scenes

1. A first-time visitor identifies released/forthcoming state, chooses Episode
   01 and reaches its exact issue without outside instruction.
   `APPROVED BRIEF/ARTIFACT`
2. A first-time visitor can enter the Screening Room, accurately describe the
   listen-along/cover-only/motion-film distinction, operate the player and
   return to Chick Flicks. `LOCKED LEDGER`
3. A returning visitor without a Card resumes or clears a valid same-device
   programme and never sees an account/completion claim. `LOCKED LEDGER`
4. A device-local Card holder receives no false unlock/sync benefit; favourite
   add/remove and any proved Closet consumer stay consistent on this device.
   `LOCKED LEDGER`
5. A verified signed-in shell without an approved Chick Flicks account record
   falls back safely and makes no cross-device/history claim. `LOCKED LEDGER`
6. Keyboard, mobile and native screen-reader visitors complete the same
   catalogue → player/issue → return outcome, including failures.
   `LOCKED LEDGER`
7. Every promoted programme matches its exact title-level media admission and
   public artifact; today all five remain HOLD. `LOCKED LEDGER`

## Unresolved decisions and non-goals

- Final sitewide visual system and final Chick Flicks room/Becky/rental-card
  owner approval remain open. `LOCKED LEDGER`
- The approved design brief's exact wall-versus-establishing-room composition
  and diegetic aisle-control treatment remain owner visual decisions.
  `APPROVED BRIEF/ARTIFACT`
- Exact dated “new this Wednesday” freshness authority is unresolved; use
  **latest released** until a shared source proves more. `LOCKED LEDGER`
- Any future account-synced favourite/history, reward/stamp or motion-film
  edition is not authorized by this brief. `LOCKED LEDGER`
- Non-goals are paywalls, real rentals/returns, late fees, episode mastery
  tracking, a second episode catalogue, false motion-film promotion and
  absorbing Episode Experience or shared Platform authority. `LOCKED LEDGER`

## Reconciliation and approvals

- Building owner: intent recovered and internally reconciled on 2026-07-26.
- Brand & Experience Director: must approve system fit, visual variation and
  any asset commission before propagation.
- Functionality & Platform Director: must verify `FUNCTIONALITY-MAP.md`, shared
  state/events, package/runtime contracts and missing integrations.
- Screening Room, Episode Experience, Episode Media Quality, Resident
  Card/Closet and receiving-product owners: must confirm both sides of their
  handoffs.
- Portfolio Control Room: must assign non-overlapping build locks, integration
  order, exact release candidate, rollback and public verification.
