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

### Shared colour and background contract — 2026-09-04

Chick Flicks, Read, Listen and Watch load
`content/site/laidies-visual-system.css`. New colour work consumes its active
tokens and named background recipes rather than copying hex values into another
page-local palette. Listen uses the shared comic masthead, quiet reading field,
ink keylines and bright accent family. Watch may retain a dark film stage where
the medium requires it, but its surrounding navigation and Special Features
remain in the shared site system. Deep plum, black application shells, muted
rose/gold/teal gradients, pale-on-pale type and generic white-card dashboards
are rejected. Cream type is reserved for a genuinely dark or saturated field
where dark ink cannot meet readable contrast.

### Locked arrival relationship — 2026-09-02

Chick Flicks opens with the same spatial relationship as the live LIBRAiRY: a
strong page-specific title masthead followed immediately by the actual Chick
Flicks store image. The store establishes the building before the episode
catalogue. Latest and Start here remain immediately clear below it; do not
return to an oversized dark hero overlay that delays episode choice. The image
`assets/sunnyvaile-masthead-chick-flicks.png` is long-discarded and denied as
masthead/store authority; the two September 2 mockups that used it are invalid.
The page-integration candidate now uses the text-free physical store interior
`assets/sunnyvaile-interiors/chick-flicks-store/chick-flicks-store-shelves-v1.png`,
SHA-256 `1d510f6dc48511cd8393854999d002d88a999e61b0c33bf0672e6208c0989305`,
1672 × 941. It provides real teal metal shelving, pink fluorescent light,
glass-block walls, patterned carpet, return slot and checkout register without
baked text or people. It remains a candidate until the complete page passes
same-viewport desktop and mobile visible-output review; its presence in source
does not authorize deployment or claim public release.
`ALI DIRECT CORRECTION — 2026-09-02`

The episode catalogue is a literal video-store wall: every episode is shown as
its existing VHS tape sitting on a physical shelf. Generic cards, blank cases
and 16:9 thumbnails are not the catalogue grammar. The VHS cover must remain
large enough to identify, while released/forthcoming truth and Read, Listen and
Watch actions remain deterministic, readable controls beside or beneath the
tape rather than lettering baked into its artwork. Mobile may recompose the
shelf, but it may not turn the episodes back into generic content cards.
`ALI DIRECT DESIGN DECISION — 2026-09-02`

The confirmed visual source for Episodes 01–04 is the image-led comic title-card
family: `ep01-title-card-comic-v2.png`, `ep02-title-card-comic-v2.png`,
`ep03-title-card-comic-v2.png` and the selected Episode 04 successor
`ep04-title-card-comic-v3-laidies-colour.png`. Each new VHS sleeve must preserve
its episode-specific imagery and exact episode name; the generic Opening Day
electric cover family and the obsolete July VHS cover art are rejected for this
shelf. Episodes 01–03 keep their current colours. Ali selected the first
September 2 Episode 04 colour successor over the stricter second recolour:
`assets/episodes/ep-04/pixel/ep04-title-card-comic-v3-laidies-colour.png`,
SHA-256 `88ea7bfcc665cace028d9845edb34f75bf42cf3b8e46c0896eb24b92d2a06b39`,
1672 × 941. Its pink title, teal edge, navy field, purple/periwinkle bursts,
coral accents and warm historical objects are the exact selected Chick Flicks
cover source. The original v2 remains preserved and is not overwritten. No
matching Episode 05 title card is inferred or invented.
`ALI DIRECT EXACT COVER SELECTION — 2026-09-02`

The accepted page-integration VHS family is
`assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-01.png` through
`ep-04.png`. All four are 1024 × 1536 transparent PNGs in one clear-clamshell
physical grammar. The exact hashes and independent visible-pixel verdict are
bound in
`evidence/episode-01-04-vhs-family-independent-verdict-2026-09-02.md`.
Page integration must show every full sleeve, retain live HTML for availability
and Read, Listen and Watch, recompose rather than genericize the shelf on
mobile, and keep Episode 05 separate without an invented cover. This is an
integration-candidate acceptance only; it does not admit or release the page.
`INDEPENDENT VISUAL VERDICT — 2026-09-02`

### Direct store correction — 2026-09-02

The September 2 page-integration treatment that placed
`assets/sunnyvaile-interiors/chick-flicks-store/chick-flicks-store-shelves-v1.png`
under the title is rejected as the visitor-facing Chick Flicks store scene. It
reads as a weird office rather than a movie-rental store. Preserve the file as
rejected evidence; it is no longer masthead, room or storefront authority.

The masthead carries the Chick Flicks identity only. The line “Choose the
story—or the format—that helps.” is rejected as masthead copy. Do not fill the
masthead with explanatory copy that belongs in the store. Headings, controls
and episode descriptions use natural title and sentence case; the page may not
force everything into capital letters. The exact `The CHiCK FLiCKS` name keeps
its canonical stylisation.

The catalogue must scale beyond four releases. Four current tapes may occupy
the first physical shelf, but the system is a multi-shelf wall: additional
episodes create additional shelf rows at the same identifiable cover size.
Desktop does not shrink every tape to fit one row, and mobile recomposes the
same shelves into two tapes per row. `Latest release` and `Start here` remain
store signs/actions, not a fixed four-tape display contract.
`ALI DIRECT REJECTION AND SCALING DECISION — 2026-09-02`

### Approved rental-store environment and shelf — 2026-09-02

Ali approved the exact rental-store interior generated as
`exec-e8de2976-4909-47b8-9ed7-7533b738ba14.png` and the exact four-bay empty
shelf generated as `exec-7cb6bba7-1b95-4096-8a7b-e0279a7b9038.png` for the
Chick Flicks page. The repository copies are:

- `assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-rental-store-interior-approved-v1.png`,
  SHA-256 `a2961792a32429605f93558af1c7742906fc4333b1ae413f931ec4c0a633e405`;
- `assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-four-bay-shelf-v1.png`,
  SHA-256 `5a6ae951e995f84253e423cc8cd8ad5ba3cb295f75787d417124c1f3a56e9486`.

The approved shelf is the repeatable episode-display unit. Add another shelf
unit as episodes are released rather than shrinking the existing cases. The
approval covers these exact source pixels and the incremental shelf model; the
complete rendered page still requires local desktop/mobile inspection and a
separate release decision.
`ALI DIRECT VISUAL APPROVAL — 2026-09-02`

### Direct tape interaction correction — 2026-09-02

Choosing any released VHS must open its episode details immediately in a
modal rental-counter dialog over the shelf; it may not silently change content
below the fold or make the visitor scroll to discover what happened. The
dialog shows the episode number and name, what the episode is about, its
learning payoff, and the live Read, Listen and Watch choices. The Start and
Latest quick routes open the same dialog for their exact episodes.

The dialog must close through a visible Close control or Escape, contain
keyboard focus while open, and return focus to the control that opened it.
Direct `#episode-XX` links must open the matching dialog without converting the
page into a below-fold destination. Closing removes that transient episode hash
without moving the visitor away from the shelf. The shelf, tape covers and
incremental multi-shelf model remain unchanged.
`ALI DIRECT INTERACTION DECISION — 2026-09-02`

Shelf scaling remains an internal implementation rule, not visitor copy. The
sentence “As the season grows, new tapes open on the next full shelf—four
across on desktop and two across on phones.” must not appear on the public
page. “Now at the counter” is also denied public copy; the immediate modal and
its episode choices provide the response without narrating the interface.
`ALI DIRECT PUBLIC-COPY CORRECTION — 2026-09-02`

### Trailer shelf correction — 2026-09-02

The trailer is part of the Chick Flicks viewing sequence and must appear as a
proper physical VHS case on the same rental wall as the numbered episodes. It
may not hang below the catalogue as a separate oversized promotional panel.
Its live label is `Start here · Trailer`, so it cannot be mistaken for Episode
00. Choosing it opens the same immediate rental-counter dialog with its brief
orientation description and one honest `Play the trailer` action.

The sleeve source is the existing square trailer master
`assets/media/opening-day-covers-v1/trailer/trailer-master.jpg`; the physical
case must match the accepted transparent clear-clamshell grammar used by
Episodes 01–04. The trailer and Episodes 01–03 occupy the first four-bay shelf;
Episode 04 starts the next repeatable shelf and future episodes fill that unit
without shrinking any case.
`ALI DIRECT TRAILER PLACEMENT DECISION — 2026-09-02`

### Future-release shelf correction — 2026-09-02

The separate Episode 05 announcement panel is removed. The three open bays
beside Episode 04 are occupied by physical clear-clamshell VHS placeholders for
Episodes 05, 06 and 07. Each placeholder says `Coming soon`, carries its episode
number in the shelf label, and is visibly inactive: no link, dialog or format
route exists until that episode is actually released. One shared case design may
repeat across the three future positions so the shelf reads as stocked without
inventing episode-specific cover art.
`ALI DIRECT FUTURE-SHELF DECISION — 2026-09-02`

### Episode format family — 2026-09-02

Read, Listen and Watch are one Chick Flicks episode journey, but they do not
perform the same job. All three must carry the exact episode name, its approved
VHS cover identity and the current LAiDIES cream/lilac, deep navy, pink, cyan
and purple family. They share one immediately visible Read / Listen / Watch
switcher and a truthful return to the Chick Flicks store.

The arrival belongs to `The Chick Flicks`; it may not invent numbered rooms or
display `Screening Room One`. Format context belongs in the separate
`Listen edition` / `Watch edition` status, not in a fictional venue label.

Read stays a light, comfortable editorial surface with the episode artwork and
chapter navigation. Listen is audio-first and visibly labels background
playback plus captions. Its primary Start / Pause / Continue action is the first
full-width action directly below the episode description, before the secondary
Read / Listen / Watch navigation. It combines a large circular media icon,
`LISTEN NOW`, the exact episode number, runtime and caption promise; a small
generic button beside competing format choices is explicitly insufficient. It
controls the real narration and remains visible without scrolling on desktop
and phone. The listening stage repeats that exact
approved Chick Flicks VHS case; it may not fall back to an older widescreen
episode poster. The Listen and Watch pages also repeat the read version's
`Everything in this episode` continuations—Read, Study Pack, Song, Cocktail,
Rooms and Quiz—so the visitor does not have to open the article merely to find
those routes. These continuations are one full-width `Special features` band.
Its field and six links use exact current Homepage colour combinations: the
Homepage coral-to-pink field `#c96652 → #db7581 → #e982ab`; the six Homepage
activity-button fills `#57b6c0`, `#e982ab`, `#ec7a78`, `#b3abe7`, `#f4a636`
and `#8bbde9`; Homepage dark ink `#3a1838` for display copy, card labels,
keylines and shadows; and deep ink `#11183b` for small copy over the darker end
of the field. Deep plum is not an active LAiDIES colour and white text is
reserved for the rare surface where dark ink cannot remain accessible. A
navy module floating on the pale page, a second oversized white
`After the credits` card grid, white tiles, duplicated Read/Return destinations
and dashboard-like empty space are prohibited. A playback failure keeps the approved VHS visible, removes stale
resume competition and presents one readable retry action. Watch keeps a dark,
focused player stage. Do not flatten
the three formats into one identical template, return to a sparse generic navy
hero, or make visitors hunt for a format link. Episodes 01–04 receive the same
format navigation contract. Current media availability and in-progress wording
remain governed by the Screening Room admission record.
`ALI DIRECT DESIGN DECISION — 2026-09-02`

The lower Listen/Watch continuation area may not reproduce either rejected
near-black-navy-on-light-page successor. It must read as one LAiDIES surface,
not a dark widget pasted into a pale app. It also may not use the obsolete deep
plum fill or routine white/cream lettering. Homepage colour combinations—not a
separate interpretation of the token list—govern this component.
`ALI DIRECT LISTEN COLOUR CORRECTION — 2026-09-02`

Deep plum is removed from the active Chick Flicks palette. Dark copy uses the
current Homepage ink `#3a1838`; white is exceptional and requires a background
that cannot support accessible dark ink.
`ALI DIRECT PALETTE CORRECTION — 2026-09-03`

The Listen edition is not a dark Screening Room. Its complete visible journey —
arrival, format switcher, programme shelf, cover stage, captions, transport,
resume/failure states and continuations — uses the current Homepage's bright
colour relationships with dark ink. A black or near-black full-width field,
black theatre, dark navy player module, routine white type, or inherited Watch
chrome is prohibited in Listen mode. The primary audio action remains the
dominant play control and the stage label says `Now listening`. Only Watch may
retain a dark film stage where the moving image genuinely requires it.
`ALI DIRECT FULL LISTEN-PAGE CORRECTION — 2026-09-04`

Chick Flicks must use the complete current system jointly visible on the
rendered Homepage, its Start learning section and the current LIBRAiRY—not a
page-specific approximation or an old standalone token list. The active
relationship is ink `#11183b`, hot pink `#f254a9`, purple `#7137d6`, cobalt
`#2457e6`, cyan `#15bce0`, coral `#ff7366`, mint `#7de2c2`, yellow `#ffd34d`,
cream `#fffdfb` and the lilac field `#c7d7f5`. The system includes the
LIBRAiRY's pink-purple-cyan comic gradients and texture, heavy ink keylines,
offset cyan/pink/yellow shadows, large image-led structures and dark body copy.
White/cream type is exceptional and is permitted only for the oversized title
on the saturated masthead, matching the current LIBRAiRY treatment. The muted
cream/coral/pastel application shell, deep-plum panels, black Listen stage,
routine white type and generic white-card dashboard are rejected. Dark midnight
remains available only where the Watch player needs a focused film stage.
`ALI DIRECT CURRENT-SITE COLOUR CORRECTION — 2026-09-04`

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
