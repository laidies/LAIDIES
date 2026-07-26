# KSVL Repair 1 maker evidence

**Status:** BUILT LOCALLY — READY FOR INDEPENDENT REJUDGE  
**Date:** 2026-07-25  
**Authority:** maker evidence only; no rights, audio-craft, visual, accessibility,
request-service, deployment or public-origin approval

## P0 repairs completed

- Removed all production acceptance of `window.__KSVL_TEST_REGISTRY`. Test
  catalogue injection now occurs only in the local test HTTP server; the public
  player has no fixture boundary.
- Made catalogue validation fail closed on impossible/malformed/future/stale
  dates, wrong `registryId`/`publicRule`, unknown record values, source/runtime
  mismatch, and incomplete admission evidence.
- Admission now requires `AVAILABLE`, owner-cleared public streaming, an exact
  verified master, approved as-recorded lyrics, transcript and captions, and a
  safe non-null lesson source. The canonical registry still admits zero of 29
  tracks.
- Bound device-local playback restoration to the exact registry revision,
  admitted track and exact context schema. Future, expired, malformed,
  unknown-key, wrong-revision and missing-track records are removed. Restoration
  remains paused until an explicit Play choice.
- Removed ordinary KSVL-link interception. Homepage and navigation links enter
  the radio building even while listening is held.
- Reconciled `radio.html`, homepage KSVL surfaces, radio controller and DJ Booth
  to a station-wide soundcheck hold. Live/on-air/play/listen promises and
  outbound Spotify catalogue links are withheld; episode and LIBRAiRY
  alternatives remain available.
- A signed-in request is described as received only after a receipt ID passes a
  bounded format check. A success-shaped response without an ID uses the
  not-delivered path.
- DJ Booth remains visibly inert; its duplicate hard-coded player remains
  unreachable.

## Source and exact-artifact evidence

Fresh artifact:
`/tmp/laidies-ksvl-repair1.2nE77t`

```text
Public artifact: 1077 files, 961.39 MiB
Warning: artifact exceeds 750 MiB.
KSVL CATALOGUE CONTRACT PASS tracks=29 admitted=0 held=29
KSVL BROWSER PASS journeys=held,production-hook-isolation,hostile-registry,
denial,retry,play,pause,seek,seek-failure,repeat,end,mute,volume,waiting,
stalled,media-error,single-audio,strict-return-state,mobile,
held-link-navigation,receipt-truth,real-decoded-audible-proxy
✓ KSVL artifact: 83 audio dependencies · 141.99 MiB · source and artifact hashes match
✓ INLINE JS: 353 scripts parse across 132 live pages.
✓ LOCAL LINKS: 1949 local references resolve across 110 pages.
✓ CHECK-TOWN: canon, titles, links, index, rewards, and quizzes all agree.
scoped git diff --check: PASS
```

The same browser matrix passed against source and the exact fresh artifact.
The production-override probe set `__KSVL_TEST_REGISTRY` in-page while the
server returned the canonical held registry; zero controls became playable.
Hostile fixtures covered impossible/future/stale dates; exact contract
mismatch; missing lyrics, transcript, captions, exact master or lesson source;
and runtime source mismatch.

Source and artifact hashes:

```text
e357bd96df7058aa5434f270aa33ebbc9e392002c58cc96de0fab7fdc5250dcb  content/music/ksvl-track-registry.json
f55917423aa87357e1b314a1a273d5af9ad38c950338eafb1222ba37eb8d24cb  content/site/ksvl-player.js
d0cf2208ee31a07a3014d056fe74006ec29f7d9700ff33d747e566a0b24d1a41  radio.html
f2986a70586946b887b577a2c358b193014ea735e25bfd0ded05dc493168e48f  games/dj-booth.html
58b98f484506cbf0feea6b9760afe9923fd78cb739e1646d6c45b66a2f3f6c53  index.html
65ee8ab52ec7c8d6bb01b58a9ee5966fa363d04bbe5a8767c6018f8e2ded3a4c  content/site/radio-v2.js
```

## Holds preserved

- All 29 song records, plus every jingle, transition, spot and external
  playlist, remain held pending owner/rights and exact-artifact admission.
- Episodes 1–4 remain held pending as-recorded lyric/transcript/caption and
  lesson reconciliation.
- Human audio listening/craft, Ali visual approval, Safari, VoiceOver, native
  zoom, contrast, representative physical devices and public-origin behavior
  remain untested.
- No real request, account, database, analytics, rights, audio, visual, Git,
  deployment or external mutation occurred.
- The artifact remains above the internal 750 MiB advisory.

Independent rejudgment is still required. This packet does not change the
product status beyond `BUILT LOCALLY`.
