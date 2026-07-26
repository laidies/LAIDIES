# KSVL Repair 2 maker evidence

**Status:** BUILT LOCALLY — READY FOR FINAL INDEPENDENT REJUDGE  
**Date:** 2026-07-25  
**Authority:** bounded maker evidence only; no rights, audio, visual, request,
Git, deployment, public-origin or external mutation

## Exact Repair 2 result

The three public contradictions identified by the Repair 1 independent judge
are repaired:

1. **Mix CDs:** the public panel now describes six planned shelves, states that
   none can play or shuffle while all items remain held in soundcheck, and
   offers the episode shelf and LIBRAiRY as available non-audio routes.
2. **The Bands:** visitors may flip covers and inspect planned tracklists, but
   the copy explicitly says DJ SunnyV is not publicly playing the albums and
   whole-album listening is unavailable until item admission. It offers the
   episode shelf and LIBRAiRY as alternatives.
3. **DJ Booth metadata:** the Open Graph description now matches the normal
   held description. It does not advertise available episode songs, weekly
   jams, external playlists or public listening.

No visual or audio asset was replaced. Registry, date/admission semantics,
production test isolation, saved state, request receipt behavior, ordinary
links and playback-control behavior were not redesigned.

## Regression contract

`scripts/validate-ksvl-catalogue.mjs` and
`scripts/test-ksvl-browser.mjs` now enforce the zero-admission public promise:

- visible headings, paragraphs, labels and revealed Mix/Bands panels;
- document title;
- normal, Open Graph and Twitter descriptions;
- JSON-LD/structured-metadata strings when present; and
- visible CTA names, titles and accessibility labels.

When admission is zero, playback/play/listen/shuffle/on-air/broadcast/live or
equivalent availability wording must have explicit held, unavailable,
soundcheck, denied, pending-review or item-admission context. An actually
disabled/`aria-disabled` control, or a control inside the player’s explicit
held rights/provenance state, remains correctly classified as held. An enabled
CTA without that context fails.

The static validator uses `KSVL_ROOT`, so the same promise contract runs against
source and a named fresh artifact. Episode canon checks remain source-only
because those Markdown sources are intentionally absent from the public
artifact; the exact artifact still verifies the registry's held Episode 1–4
records.

## Verification

Fresh artifact:
`/tmp/laidies-ksvl-repair2.L9tNrt`

```text
Public artifact: 1077 files, 961.39 MiB
Warning: artifact exceeds 750 MiB.
KSVL CATALOGUE CONTRACT PASS tracks=29 admitted=0 held=29
KSVL BROWSER PASS journeys=held,zero-admission-copy-metadata-cta,
production-hook-isolation,hostile-registry,denial,retry,play,pause,seek,
seek-failure,repeat,end,mute,volume,waiting,stalled,media-error,single-audio,
strict-return-state,mobile,held-link-navigation,receipt-truth,
real-decoded-audible-proxy
Public metadata validation passed.
KSVL artifact: 83 audio dependencies · 141.99 MiB · source and artifact hashes match
INLINE JS: 353 scripts / 132 pages — PASS
LOCAL LINKS: 1953 references / 110 pages — PASS
CHECK-TOWN — PASS
PRODUCT STEWARD SYSTEM: 65 products / 3 of 3 active — PASS
scoped git diff --check — PASS
```

The complete browser suite passed separately against source and the exact fresh
artifact. The catalogue/promise validator also passed separately against both
roots.

Governed changed-file identity:

```text
0bae73432a7de0351ed4f946ffea9e1a87fb460cb0130ab16ab101afbd820ef8  radio.html
78662728ed0bbaa6e13785bce95cb8c920c577f221bce5a20f53e88db3904774  games/dj-booth.html
```

Both files match those hashes in the fresh artifact. Test hashes for this
candidate are recorded by the final scoped verification.

## Holds preserved

- All 29 public tracks remain **HOLD**; zero are admitted.
- Jingles, transitions, spots and external playlists remain held.
- No owner/rights/master/as-recorded lyric/transcript/caption or lesson-source
  approval is inferred.
- Human audio craft/listening, Ali visual approval, Safari, VoiceOver, native
  zoom, contrast, assistive technology and physical-device behavior remain
  unverified.
- The request service, privacy lifecycle, moderation, retention/deletion,
  analytics/VOC, accounts, rewards and public origin remain untested.
- No request, rights, audio, visual, Git, deployment, publication or external
  mutation occurred.

A different independent judge must inspect the rendered source and exact
artifact before the product can clear the local P0. Public playback and launch
status remain held regardless.
