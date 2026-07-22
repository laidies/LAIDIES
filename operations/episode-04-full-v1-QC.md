# Episode 04 full v1 — assembly and QC

Date: 2026-07-21

## Delivery

- `assets/video/episode-04-full-v1.mp4`
- 1920×1080, 30 fps, H.264 High, AAC-LC mono
- Runtime: 20:22.40
- Size: 189 MB

The build used the exact 54-shot edit present at the start of assembly:

- Shot-list SHA-256: `b53a06b8a28be2cb6fa75d6d9fc81b73beaf20df0f92a43897adfe17b18f0c85`
- Cue-sheet SHA-256: `8be7ff7098ddb3fd6a1149f8da3e57101200b818dceebb4c0d9a15e9bc1fd809`
- Header/table/cue counts: 54 / 54 / 54

No shot was retimed, reordered, dropped, or substituted. Narration is the unchanged 20:22.40 clock.

## Transition rules

- Ordinary shot boundaries: 0.45-second cross-dissolve only.
- Era cards: no effect on the card; full-strength hard arrival.
- Immediately before every era card: 0.30-second outgoing dip toward black.
- No wipes, slides, spins, page curls, decorative transitions, captions, music, colour grades, or filters.

## Automated frame QC

All checks passed:

- LONDON, 1843 — 04:05.30
- HOLLYWOOD — 05:41.55
- PHILADELPHIA — 07:17.30
- PHILADELPHIA, 1952 — 09:00.55
- DARTMOUTH, 1956 — 10:27.62
- CAMBRIDGE, 1972 — 11:16.70
- FEI-FEI — 12:44.98
- 2018–2021 — 14:55.65
- Grace compiler — 09:35.00
- Grace moth — 10:15.00
- Fei-Fei “millions upon millions” — 13:17.00
- Ada loop at 0.5×: the 10-second repeat comparison produced a difference score of `0.00`.
- All eight pre-card dips passed the black-level check.
- The complete MP4 decoded without media errors.

Reproducible build and QC scripts:

- `assets/video/build-episode-04-full-v1.py`
- `assets/video/qc-episode-04-full-v1.py`

## CapCut project

The cue-locked master was imported into CapCut through the app UI and saved in:

- `/Users/alisoneakin/Movies/CapCut/User Data/Projects/com.lveditor.draft/0721`

Project inspection confirms one video track, one segment beginning at `0`, a source and target
duration of `1,222,400,000` microseconds, speed `1`, and a 1920×1080 canvas. The segment points to
the delivered `assets/video/episode-04-full-v1.mp4`, so opening the project cannot drift or reinterpret
the locked edit.

CapCut's onboarding walkthrough blocked the final redundant UI re-encode. The delivered MP4 itself is
already H.264/AAC at the requested resolution, frame rate, runtime, and path, and passed the complete
technical and timing QC above.
