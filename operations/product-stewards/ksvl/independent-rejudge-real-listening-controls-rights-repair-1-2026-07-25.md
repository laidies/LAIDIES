# KSVL independent re-judge — Repair 1

**Reviewed:** 2026-07-25  
**Role:** independent judge; reviewer did not make the candidate  
**Candidate artifact:** `/tmp/laidies-ksvl-repair1.2nE77t`  
**Overall verdict:** **FAIL — FIX BEFORE LAUNCH**  
**Bounded status ceiling:** Repair 1 fixes the admission, state, navigation,
request-receipt and inert-control defects, but it does not clear the original P0
because public KSVL copy still promises unavailable playback.

## Executive judgment

The technical admission boundary is materially repaired. The canonical
catalogue remains `29` tracks, `0` admitted and `29` held. The exact artifact
ignores a production in-page test override and fails closed on the independently
tested malformed, future, expired, unknown-state, wrong-contract,
wrong-source, missing-evidence and unsafe-path registries. Saved playback state
is exact-schema checked, time bounded, registry bound and removed when its
context or track is no longer admitted. Ordinary KSVL links navigate, DJ Booth
creates no audio object and exposes no Spotify destination, and a request is
described as received only after a bounded receipt ID is returned.

The visitor promise is not yet fully reconciled. The radio building still tells
visitors to grab a mix and let it play, says DJ SunnyV plays all ten bands and
invites them to play a whole album. DJ Booth's Open Graph description still
advertises custom episode songs and weekly jams. These are public product
claims even though nearby controls are disabled and other copy correctly says
soundcheck. With zero admitted tracks, the contradiction fails the original
truthful-public-copy P0 and the mandatory quality, trust and brand floors.

## Original P0 re-judgment

| Original P0 | Verdict | Independent evidence |
|---|---|---|
| 1. Remove production registry override | **PASS** | No `__KSVL_TEST_REGISTRY` reference exists in the production player. Setting it in the exact artifact while serving the canonical registry left all controls disabled. |
| 2. Strict registry and exact admission contract | **PASS** | Semantic calendar validation, exact `registryId` and `publicRule`, enumerated status values, exact runtime source/title/artist/mixes, exact master, approved as-recorded lyrics/transcript/captions and safe lesson source all fail closed. Independent extra-key, unknown-enum, unsafe-path, duplicate and unknown-track fixtures also exposed zero enabled controls. |
| 3. Reconcile all visitor-facing KSVL copy | **FAIL** | `radio.html:192` says “Grab one and let it play” and shuffle; `radio.html:325` says DJ SunnyV plays all bands and invites whole-album playback; `games/dj-booth.html:9` advertises custom episode songs and weekly jams in public social metadata. |
| 4. Preserve ordinary radio navigation | **PASS** | Exact-artifact probes for `a.nav-ksvl`, `a.tune-in` and `a.spot[href="/radio.html"]` all navigated to `/radio.html`. |
| 5. Require a validated request receipt | **PASS, locally simulated** | Empty, one-character, space-containing and overlong IDs used the explicit not-delivered path. `R-123` produced receipt-specific review copy and explicitly denied hearing, selection or production. No real service was called. |
| 6. Strict, admission-bound saved state | **PASS** | Expired, future, malformed JSON, wrong-context, wrong-revision, unknown-track, extra-key and invalid volume/time/repeat records were removed. A formerly valid saved state was also removed against the canonical all-HOLD registry. Restoration remains paused and requires explicit Play. |
| 7. Extend source and exact-artifact regressions | **FAIL, narrow** | Source and artifact browser suites pass the advertised hostile, state, navigation, request and real-media-proxy journeys, but they do not assert the contradictory copy above. A repair that reports full copy reconciliation while these strings remain needs exact visible-copy and social-metadata assertions. |
| 8. Keep DJ Booth inert; remove/hold Spotify | **PARTIAL / FAIL** | Exact artifact created zero `Audio` objects, all five relevant controls were disabled, and no Spotify URL or outbound playlist remained. Visible alternatives route to the episode shelf and LIBRAiRY. Its Open Graph description nevertheless continues the unavailable weekly-song promise. |

## Verification evidence

Fresh independent reruns:

```text
KSVL CATALOGUE CONTRACT PASS tracks=29 admitted=0 held=29
KSVL BROWSER PASS journeys=held,production-hook-isolation,hostile-registry,
denial,retry,play,pause,seek,seek-failure,repeat,end,mute,volume,waiting,
stalled,media-error,single-audio,strict-return-state,mobile,
held-link-navigation,receipt-truth,real-decoded-audible-proxy
```

The complete browser suite passed separately against current source and
`/tmp/laidies-ksvl-repair1.2nE77t`. The exact static artifact also loaded its
own canonical JSON successfully with no fixture header, reported the all-HOLD
state and removed a saved `town-anthem` session because no current track was
admitted.

Independent hostile additions all failed closed with zero enabled controls:

- invalid calendar day;
- extra top-level or track-level key;
- unknown rights, source, lyric, transcript or caption state;
- unsafe lesson path;
- duplicate or unknown track;
- wrong registry ID or public rule;
- future, expired or malformed dates;
- wrong exact master, as-recorded lyric, transcript or caption evidence;
- runtime source mismatch;
- in-page production test override.

Source and exact artifact remained byte-identical for the reviewed KSVL
registry, player, radio page, homepage, radio controller and DJ Booth at the
hashes recorded in the maker evidence. No private steward dossier or review
path was found in the public artifact. Scoped `git diff --check` passed.

The real-media proxy established decoded metadata, advancing media time,
non-muted state and positive volume. It is automation evidence, not human
listening or audio-craft approval.

## Weighted score and mandatory floors

Quality, accuracy/trust and LAiDIES brand contribution each require at least
`17/20`.

| Dimension | Raw score | Floor | Weight | Weighted contribution |
|---|---:|---:|---:|---:|
| Product quality and completeness | 15/20 | **FAIL** | 30% | 22.5 |
| Accuracy, rights and visitor trust | 14/20 | **FAIL** | 30% | 21.0 |
| LAiDIES brand contribution | 14/20 | **FAIL** | 25% | 17.5 |
| UX and bounded accessibility | 15/20 | — | 10% | 7.5 |
| Technical resilience | 17/20 | — | 5% | 4.25 |
| **Total** |  |  | **100%** | **72.75/100** |

Repair 1 is a substantial improvement over the original `43.5/100` candidate.
The remaining failure is small in file count but not in consequence: a held
music product cannot tell visitors or social previews that unavailable music
plays.

## Required Repair 2 packet

### P0 — required before another independent judgment

1. Replace the Mix CDs sentence in `radio.html:192` with explicit held-copy:
   describe the six planned shelves, state that none can play or shuffle yet,
   and point to the available episode shelf or LIBRAiRY.
2. Replace the Bands sentence in `radio.html:325`: visitors may flip covers and
   inspect the planned tracklists, but DJ SunnyV is not publicly playing the
   albums and whole-album listening is unavailable pending item admission.
3. Replace `games/dj-booth.html:9` with the same held, provenance-and-rights
   truth as the normal meta description. Do not advertise weekly jams or
   episode songs as available.
4. Add source and exact-artifact assertions for those exact visible regions and
   the Open Graph description. The assertions must fail if zero admitted tracks
   coexist with any play, listen, shuffle, on-air, live-broadcast, weekly-jam or
   equivalent availability promise outside an explicitly negated/held context.
5. Rerun the strict catalogue, complete source browser suite, complete exact
   artifact browser suite, public metadata/privacy check, artifact integrity
   check, inline JavaScript, local links, town/steward checks and scoped
   `git diff --check`. A different independent judge should re-read the actual
   rendered copy rather than relying only on the suite label.

## Holds preserved

This re-judgment does not clear or infer:

- owner or rights approval for any of the 29 songs, jingles, transitions,
  intros, commercials, spots or external playlists;
- exact human approval of masters, as-recorded lyrics, transcripts, captions
  or lesson relationships;
- Ali's visual approval of KSVL, DJ Booth, social metadata or their imagery;
- human audio craft, timing, mix, intelligibility or learning quality;
- Safari, VoiceOver, native zoom, contrast, assistive technology or
  representative physical-device behavior;
- real authenticated request-service behavior, privacy lifecycle, moderation,
  retention or deletion;
- public deployment, public-origin behavior, announcements or revenue;
- account sync, listening history, favourites, rewards or analytics/VOC.

All 29 song records remain **HOLD**. The product remains **FIX BEFORE LAUNCH**
until the copy repair is rebuilt into an exact artifact and independently
re-judged.
