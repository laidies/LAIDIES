# KSVL independent re-judge — Repair 2

**Reviewed:** 2026-07-25  
**Role:** final independent judge; reviewer did not make Repair 2  
**Candidate artifact:** `/tmp/laidies-ksvl-repair2.L9tNrt`  
**Overall verdict:** **PASS — REPAIR 2 ACCEPTED LOCALLY; PUBLIC LISTENING,
RELEASE AND PROMOTION REMAIN HOLD**  
**Bounded status:** the original local P0 control-and-promise packet is
verified. This is not rights admission, audio approval, deployment or public
verification.

## Executive judgment

Repair 2 fixes all three public-promise contradictions left by the Repair 1
judge:

1. Mix CDs now says the six shelves are planned, none can play or shuffle, and
   every item remains held in soundcheck pending admission.
2. The Bands now allows cover and planned-tracklist inspection while explicitly
   denying public album playback until item admission.
3. DJ Booth's Open Graph description now matches its normal held description;
   it no longer advertises weekly jams or available episode songs.

The replacement copy is not merely accurate—it gives the visitor useful
available routes to the episode shelf and LIBRAiRY. Homepage, radio, Mix CDs,
Bands and DJ Booth titles, descriptions, revealed visible copy, structured
metadata and enabled CTA labels contain no unheld live/play/listen/on-air/
shuffle/whole-album/Spotify promise with the canonical `0 admitted / 29 held`
catalogue.

All Repair 1 technical closures remain closed. The exact registry, player,
homepage and radio controller are byte-identical to the independently judged
Repair 1 candidate. Source and exact-artifact suites again passed production
test-hook isolation, hostile catalogue admission, strict saved state, ordinary
navigation, request-receipt truth, playback controls and failures, and the
decoded/non-muted/positive-volume/time-advancing media proxy.

KSVL itself is not approved for public listening. All 29 songs and every
jingle, transition, spot and external playlist remain held. The pass means the
local product now tells that truth correctly and enforces it.

## Repair 2 promise disposition

| Repair 1 remaining defect | Verdict | Independent evidence |
|---|---|---|
| Mix CDs invited visitors to play and shuffle | **PASS** | Revealed source and exact-artifact panel says: “None can play or shuffle yet,” names soundcheck and pending admission, then links to the episode shelf and LIBRAiRY. |
| Bands said DJ SunnyV played every album and invited whole-album playback | **PASS** | Revealed panel says DJ SunnyV is “not publicly playing these albums” and whole-album listening is unavailable until each item is admitted. Ten held album controls expose held/admission labels rather than Play labels. |
| DJ Booth Open Graph metadata advertised episode songs and weekly jams | **PASS** | Normal and Open Graph descriptions now both state that public listening and external playlists are held pending exact-master, words, lesson-source and rights review. The old strings are absent from source and artifact. |

## Zero-admission surface judgment

| Surface | Verdict | What a visitor or assistive interface receives |
|---|---|---|
| Homepage | **PASS** | KSVL is consistently a soundcheck: zero-admission copy, held anthem/theme links, “Visit KSVL,” and an explicit “Listening unavailable during soundcheck” spotlight. Ordinary links still navigate to the station. |
| Radio arrival | **PASS** | Page description, hero status, dial message, tune control, theme control and station band all state soundcheck/held/unavailable/pending admission. Available alternatives are episodes and lessons, not audio files. |
| Mix CDs revealed panel | **PASS** | Planned shelves; none can play or shuffle. All six generated mix controls are disabled and carry held rights/provenance admission labels. |
| Bands revealed panel | **PASS** | Covers and planned tracklists remain inspectable. With zero admitted tracks, album buttons are disabled and labelled held pending catalogue admission; no track Play CTA is rendered. |
| Sticker and Resident Card integration copy | **PASS** | Listening-based unlocks are held, no unavailable playback creates an earned sticker, and no listening history/account/reward sync is claimed. Hypothetical integration language does not represent playback as currently available. |
| DJ Booth | **PASS** | Visible page says every track, control and external playlist is held. Five player/seek controls remain disabled; no Spotify destination is exposed; alternatives go to the episode shelf and LIBRAiRY. The previously independently probed inert player body is unchanged except for the metadata repair and still returns before its hard-coded catalogue. |
| Titles and structured metadata | **PASS** | Titles name the products without implying availability. Normal/Open Graph descriptions are held. No contradictory JSON-LD string was exposed. |

The exact source-to-Repair-2 diff confirms the bounded change:

- `radio.html`: only the Mix CDs and Bands visitor sentences changed;
- `games/dj-booth.html`: only the Open Graph description changed;
- registry, player, homepage and radio controller are unchanged from Repair 1.

An image alt accurately describes the visible booth artwork, including its
painted “ON AIR” sign; the adjacent live state explicitly says soundcheck hold.
This is visual description, not an availability claim.

## Repair 1 closure regression

| Original P0 | Final verdict | Evidence |
|---|---|---|
| 1. Production registry override | **PASS** | Production player still contains no `__KSVL_TEST_REGISTRY`; an in-page override cannot change canonical all-HOLD admission. |
| 2. Strict registry/exact item admission | **PASS** | Exact contract identity, semantic calendar dates, enumerated states, runtime parity, exact master, approved as-recorded lyrics/transcript/captions and safe lesson source remain required. Missing, unknown, stale, future, malformed, duplicate, unsafe and mismatched evidence fails closed. |
| 3. Truthful public KSVL copy | **PASS** | Repair 2 closes the final three contradictions; source and rendered scanners pass source and exact artifact. |
| 4. Ordinary radio navigation | **PASS** | Held homepage KSVL links still navigate to `/radio.html`; the hold does not turn navigation into a dead launch control. |
| 5. Validated request receipt | **PASS, local simulation only** | Missing/invalid receipt uses the not-delivered path; `R-123` receives receipt-specific review copy and denies hearing, selection, production and credit. |
| 6. Strict, admission-bound local state | **PASS** | Future, expired, malformed, wrong-context, wrong-revision, unknown-track and extra-key state is removed. Re-entry remains paused and requires explicit Play. |
| 7. Source and exact-artifact regression coverage | **PASS** | The same catalogue/promise validator and complete Chrome journey suite pass against both roots, including the newly enforced visible-copy, metadata and CTA-label gate. |
| 8. DJ Booth inert and Spotify held | **PASS** | Player remains unreachable before its hard-coded catalogue, visible controls remain disabled, outbound Spotify URLs are absent and public metadata is now held. |

## Verification evidence

Fresh independent reruns:

```text
source catalogue:
KSVL CATALOGUE CONTRACT PASS tracks=29 admitted=0 held=29

exact-artifact catalogue:
KSVL CATALOGUE CONTRACT PASS tracks=29 admitted=0 held=29

source browser:
KSVL BROWSER PASS journeys=held,zero-admission-copy-metadata-cta,
production-hook-isolation,hostile-registry,denial,retry,play,pause,seek,
seek-failure,repeat,end,mute,volume,waiting,stalled,media-error,single-audio,
strict-return-state,mobile,held-link-navigation,receipt-truth,
real-decoded-audible-proxy

exact-artifact browser:
KSVL BROWSER PASS journeys=held,zero-admission-copy-metadata-cta,
production-hook-isolation,hostile-registry,denial,retry,play,pause,seek,
seek-failure,repeat,end,mute,volume,waiting,stalled,media-error,single-audio,
strict-return-state,mobile,held-link-navigation,receipt-truth,
real-decoded-audible-proxy

KSVL artifact:
83 audio dependencies · 141.99 MiB · source and artifact hashes match

public metadata: PASS
inline JavaScript: PASS — 353 scripts / 132 pages
local links: PASS — 1,953 references / 110 pages
town contract: PASS
product steward system: PASS — 65 products / 3 of 3 active
```

Exact source/artifact identities:

```text
e357bd96df7058aa5434f270aa33ebbc9e392002c58cc96de0fab7fdc5250dcb  content/music/ksvl-track-registry.json
f55917423aa87357e1b314a1a273d5af9ad38c950338eafb1222ba37eb8d24cb  content/site/ksvl-player.js
65ee8ab52ec7c8d6bb01b58a9ee5966fa363d04bbe5a8767c6018f8e2ded3a4c  content/site/radio-v2.js
58b98f484506cbf0feea6b9760afe9923fd78cb739e1646d6c45b66a2f3f6c53  index.html
0bae73432a7de0351ed4f946ffea9e1a87fb460cb0130ab16ab101afbd820ef8  radio.html
78662728ed0bbaa6e13785bce95cb8c920c577f221bce5a20f53e88db3904774  games/dj-booth.html
```

The public artifact contains no private operations/steward dossier. Its
1,077-file / 961.39 MiB size remains above the internal 750 MiB advisory.

The real-media proxy proves decoded metadata, advancing time, non-muted state
and positive volume only. It does not substitute for human listening, speaker/
headphone testing or audio-craft approval.

## Weighted score and mandatory floors

Quality, accuracy/trust and LAiDIES brand contribution each require at least
`17/20`.

| Dimension | Raw score | Floor | Weight | Weighted contribution |
|---|---:|---:|---:|---:|
| Product quality and completeness | 17/20 | **PASS** | 30% | 25.5 |
| Accuracy, rights and visitor trust | 18/20 | **PASS** | 30% | 27.0 |
| LAiDIES brand contribution | 17/20 | **PASS** | 25% | 21.25 |
| UX and bounded accessibility | 17/20 | — | 10% | 8.5 |
| Technical resilience | 18/20 | — | 5% | 4.5 |
| **Total** |  |  | **100%** | **86.75/100** |

The score judges the bounded local soundcheck product: an honest, useful,
fail-closed station exploration while listening is unavailable. It does not
score the held songs as approved media or pretend that a station with zero
admitted tracks is a finished listening product.

## Required next gate

No further repair is required for the original local P0 packet. The next work
is not another wording iteration; it is item-by-item admission evidence:

1. owner and rights decision;
2. exact approved master;
3. approved as-recorded lyrics, transcript and captions;
4. correct lesson-source relationship;
5. human audio/craft judgment;
6. native accessibility and representative physical-device judgment;
7. exact release/public-origin verification; and
8. real request-service/privacy lifecycle testing if that form will be
   promoted.

Any admitted item must rerun the same fail-closed registry, exact-artifact,
copy, control, media and rights gates. Zero-admission copy cannot simply be
removed because a file exists.

## Holds preserved

This pass does not clear or infer:

- owner approval or public-streaming rights for any of the 29 songs, jingles,
  transitions, intros, commercials, spots or external playlists;
- exact master, as-recorded lyric, transcript, caption or lesson approval;
- human audio craft, mix, timing, intelligibility, loudness or listening
  quality;
- Ali's visual approval of KSVL, DJ Booth, album art, metadata imagery or
  promotion creative;
- Safari, VoiceOver, native zoom, contrast, assistive-technology or
  representative physical-device behavior;
- live signed-in request insertion, failure, moderation, retention, deletion
  or privacy lifecycle;
- account sync, listening history, favourites, rewards, analytics or VOC;
- deployment, public-origin behavior, announcement or launch readiness.

No external mutation occurred. No source, data, test, state, backlog, queue,
painpoint or Git file was changed. No new qualifying learning was found; the
existing KSVL prevention rule in `BTB-106` remains the applicable control.
