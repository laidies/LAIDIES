# KSVL real-listening controls, failure and rights maker evidence

**Maker status:** BUILT LOCALLY — READY FOR INDEPENDENT JUDGMENT
**Date:** 2026-07-25
**Release/public/rights authority:** none

## Outcome

KSVL now has a reconciled operating specification, one strict public song
registry, registry-gated shared playback, persistent visible state/failure
messages, user-controlled seek/mute/volume/repeat, no cross-page audible
autoplay, device-local return truth and corrected request receipts. The old DJ
Booth hard-coded player is inert. The live rotation is held because its
jingles, transitions and spots do not yet have admitted registry records.

The current public registry enumerates 29 song records and admits zero. All 29
remain `HOLD`: no exact owner-approved rights/master/as-recorded-lyric package
was available. Episodes 1–4 are explicitly held because current episode canon
says their as-recorded lyrics remain pending.

## Exact source and artifact evidence

Fresh artifact: `/tmp/laidies-ksvl-maker3.HfOrUB`

```text
Public artifact: 1077 files, 961.38 MiB
Warning: artifact exceeds 750 MiB.
public KSVL registry present and byte-identical
private operations/product-stewards/ksvl directory absent
```

Source and exact fresh artifact each passed:

```text
KSVL BROWSER PASS
journeys=held,denial,retry,play,pause,seek,seek-failure,repeat,end,mute,
volume,waiting,stalled,media-error,single-audio,return-state,mobile,
real-decoded-audible-proxy
```

The real media proxy used Chrome's actual `HTMLAudioElement` against the
existing `sunnyvaile-town-anthem.mp3` bytes under an isolated test-only
admission. It required decoded metadata with finite positive duration,
unpaused/non-muted/positive-volume state and advancing `currentTime`. That is a
strong local browser proxy, not proof that a human heard acceptable audio from
speakers or that the track has rights approval.

The controlled media double independently exercised denial, unsupported/media
failure, waiting, stalled, retry, seek/failure, pause/resume, repeat/end,
mute/volume, one-audio ownership and return-state behavior without depending on
timing or sound hardware.

## Contract and site checks

```text
node scripts/validate-ksvl-catalogue.mjs
KSVL CATALOGUE CONTRACT PASS tracks=29 admitted=0 held=29

node scripts/check-inline-js.js
PASS — 353 scripts / 132 pages

node scripts/check-local-links.js
PASS — 1,942 references / 110 pages

node scripts/check-town.js
PASS

node scripts/check-product-stewards.mjs
PASS — 65 products; 3/3 active

scoped git diff --check
PASS
```

## Standards evidence

Accessed 2026-07-25:

- https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
- https://www.w3.org/TR/wai-aria/
- https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19

The player updates playing state from the resolved promise/media events,
preserves `NotAllowedError` as a visible user-recoverable state, distinguishes
media errors from `ended`, and keeps an atomic polite status present before
updates.

## Holds for the independent judge

1. No track, jingle, transition, spot or playlist has received rights-owner
   admission from this maker.
2. The DJ Booth needs a future registry-native replacement and owner visual
   ruling; its duplicate player is intentionally inert.
3. Safari, VoiceOver, native 200% zoom, contrast, physical-device audible
   listening, speaker/headphone behavior and public origin remain untested.
4. No request was submitted. Signed-in insert, validation, database
   failure/retry, moderation, retention and deletion remain unproved.
5. No analytics/VOC packet, learning retrieval evidence or account sync exists.
6. The 961.38 MiB artifact remains above the 750 MiB advisory.

Do not convert this maker packet into a rights, media-quality, learning,
accessibility, request-service, deployment or public-verification claim.

## Learning scan

Qualifying reusable finding: a media registry cannot begin by marking
historically shipped files “available”; file existence is precisely the weak
signal the registry is meant to replace. The prevention rule is
`unknown -> HOLD`, with a test-only admission isolated from public data so
mechanical playback can still be verified. This belongs in the canonical
painpoints ledger after integration, but this bounded lane did not edit that
shared dirty file.
