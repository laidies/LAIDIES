# EP04 art audit — what actually exists

Source: `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/assets/episodes/ep-04/pixel`

Read-only. Nothing generated. Re-run with `python3 Website-homepage/operations/tools/audit-ep04-art.py`.

**This does not say anything is on-model.** It says which files are mechanically eligible for you to look at.

## The denominator

| | count |
|---|---|
| Image files on disk | **435** |
| Blocked by the `banned` block in `ep04-cut-decisions.md` | 12 |
| Globally rejected in `rejections.json` | 0 |
| **Live candidates** | **423** |
| — of those, distinct PICTURES (identical renders collapsed) | **384** |
| — of those, distinct BEATS (filename-collapsed) | **219** |
| Wired into the 57-cue cut | 54 |

One current take per beat gives a shortlist of **219 frames**. Of those:

- **112** are full-res (≥1920 wide) AND in the locked `comic` generation — the ones worth your eyes
- 61 are full-res but from an older generation
- 46 are below 1920 wide — legacy renders, not usable at 1080p

## Collapse 1 — the same render, filed more than once

33 clusters, 39 redundant files (RMS ≤ 2.0).

- **3 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-01-cold-open-v2.jpg`
  - `ep04-scene-01-cold-open-v2.png`
  - `ep04-scene-01-cold-open.png`
- **3 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-02-luminairy-v2.jpg`
  - `ep04-scene-02-luminairy-v2.png`
  - `ep04-scene-02-luminairy.png`
- **3 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-02a-heroine-walk-cycle-v2-a.png`
  - `ep04-scene-02a-heroine-walk-cycle-v2n-a.png`
  - `ep04-scene-02a-heroine-walk-cycle-v3n-a.png`
- **3 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-04b-eniac-v4-actual-six-review.png`
  - `ep04-scene-04b-eniac-v5-actual-six-end-review.png`
  - `ep04-scene-04b-eniac-v5-actual-six-mid-review.png`
- **3 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-10-desk-v2.jpg`
  - `ep04-scene-10-desk-v2.png`
  - `ep04-scene-10-desk.png`
- **3 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-12-lights-up-v2.jpg`
  - `ep04-scene-12-lights-up-v2.png`
  - `ep04-scene-12-lights-up.png`
- **2 files, one picture** (byte-identical):
  - `ep04-beat-0m27.50-comic-v1-1920.png`
  - `ep04-scene-11-checkers-comic-v1-fresh-three-women-1920.png`
- **2 files, one picture** (byte-identical):
  - `ep04-beat-18m25.45-comic-v1-1920.png`
  - `ep04-open-17-maivens-hall-comic-v2-bright-interior-full-portraits-1920.png`
- **2 files, one picture** (byte-identical):
  - `ep04-beat-7m41.53-comic-v1-1920.png`
  - `ep04-scene-04b-eniac-comic-v1-fresh-six-women-1920.png`
- **2 files, one picture** (byte-identical):
  - `ep04-beat-8m40.27-comic-v1-1920.png`
  - `ep04-comicpage-eniac-models-comic-v1-exact-text-1920.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v16-measured-anatomy-face-lock.png`
  - `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v17-shorter-neck.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v25-approved-head-single-strap-clean-geometry.png`
  - `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v26-approved-head-single-strap-clean-geometry-1920.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v27-native-full-rerender-single-strap-1920.png`
  - `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-suit-flat-color-only-1920.png`
- **2 files, one picture** (byte-identical):
  - `ep04-heroine-comic-reference-03-clueless-face-style-study-v2-ali-likeness.png`
  - `ep04-heroine-face-lock-approved-ali.png`
- **2 files, one picture** (byte-identical):
  - `ep04-heroine-sheet-v2.png`
  - `ep04-heroine-sheet.png`
- **2 files, one picture** (byte-identical):
  - `ep04-heroine-y2k-wardrobe-sheet-v2.png`
  - `ep04-heroine-y2k-wardrobe-sheet.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-02-v4-bulb-detection-audit.jpg`
  - `ep04-scene-02a-luminairy-entrance-v4-correct-sign-review.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-02a-heroine-walk-cycle-v2n-c.png`
  - `ep04-scene-02a-heroine-walk-cycle-v3n-c.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-02a-luminairy-approach-a-start.png`
  - `ep04-scene-02a-luminairy-approach-v2-a-start.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-02a-luminairy-approach-c-end.png`
  - `ep04-scene-02a-luminairy-approach-v2-c-end.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-03-ada.jpg`
  - `ep04-scene-03-ada.png`
- **2 files, one picture** (byte-identical):
  - `ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png` ← in the cut at cue [22]
  - `ep04-scene-04-hedy-c-end-comic-v1-locked-1920.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-04-hedy.jpg`
  - `ep04-scene-04-hedy.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-04b-eniac.jpg`
  - `ep04-scene-04b-eniac.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-05-grace.jpg`
  - `ep04-scene-05-grace.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-05a-grace-navy-office-v1-b-mid.png`
  - `ep04-scene-05a-grace-navy-office-v2-c-end.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-05a-grace-navy-office-v1.png`
  - `ep04-scene-05a-grace-navy-office-v2-a-start.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-06-naming.jpg`
  - `ep04-scene-06-naming.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-07-ai-winter.jpg`
  - `ep04-scene-07-ai-winter.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-08-karen-comic-v2-timnit-style-lock-1920.png`
  - `ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920.png` ← in the cut at cue [38]
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-08-karen.jpg`
  - `ep04-scene-08-karen.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-09-fei-fei.jpg`
  - `ep04-scene-09-fei-fei.png`
- **2 files, one picture** (re-encoded / re-saved):
  - `ep04-scene-11-checkers.jpg`
  - `ep04-scene-11-checkers.png`

## Collapse 2 — near-duplicates across DIFFERENT beat names

Different files, same picture with something small moved (RMS ≤ 15.0). Calibrated: unrelated beats in this folder measure 58–69, so nothing here is a genuinely different shot.

- **14 files spanning 8 beat names** — `ep04-open-15a-transformation-reusable-fullbody-corporate-master` … `ep04-open-15e1-transformation-magic-ignition`
  - `ep04-open-15a-transformation-reusable-fullbody-corporate-master-v2-1920.png`
  - `ep04-open-15b-transformation-reusable-fullbody-wand-approach-v3-1920.png`
  - `ep04-open-15b-transformation-reusable-fullbody-wand-approach-v4-1920.png`
  - `ep04-open-15b-transformation-reusable-fullbody-wand-approach-v6-classic-1920.png`
  - `ep04-open-15b0-transformation-wand-entry-v7-smooth-1920.png`
  - `ep04-open-15b2-transformation-wand-near-contact-v7-smooth-1920.png`
  - `ep04-open-15c-transformation-reusable-fullbody-wand-contact-v3-1920.png`
  - `ep04-open-15c-transformation-reusable-fullbody-wand-contact-v4-1920.png`
  - `ep04-open-15c-transformation-reusable-fullbody-wand-contact-v6-classic-1920.png`
  - `ep04-open-15c2-transformation-wand-compressed-tap-v7-smooth-1920.png`
  - `ep04-open-15d-transformation-reusable-fullbody-wand-rebound-v3-1920.png`
  - `ep04-open-15d-transformation-reusable-fullbody-wand-rebound-v4-1920.png`
  - `ep04-open-15d-transformation-reusable-fullbody-wand-rebound-v6-classic-1920.png`
  - `ep04-open-15e1-transformation-magic-ignition-v4-expanded-1920.png`
- **9 files spanning 4 beat names** — `ep04-scene-05-grace` … `ep04-scene-05-grace-c-end`
  - `ep04-scene-05-grace-a-start-comic-v1-no-halftone-1920.png`
  - `ep04-scene-05-grace-a-start-comic-v2-graphic-novel-1920.png`
  - `ep04-scene-05-grace-a-start.png`
  - `ep04-scene-05-grace-b-mid-comic-v1-no-halftone-1920.png`
  - `ep04-scene-05-grace-b-mid-comic-v2-graphic-novel-1920.png`
  - `ep04-scene-05-grace-c-end-comic-v1-no-halftone-1920.png`
  - `ep04-scene-05-grace-c-end.png`
  - `ep04-scene-05-grace.jpg`
  - `ep04-scene-05-grace.png`
- **7 files spanning 3 beat names** — `ep04-open-15a-transformation-before-corporate` … `ep04-transform-sunnyvaile-wand`
  - `ep04-open-15a-transformation-before-corporate-1920.png`
  - `ep04-transform-corporate-wand-v1.png`
  - `ep04-transform-corporate-wand-v2.png`
  - `ep04-transform-corporate-wand-v3-signless-review.png`
  - `ep04-transform-sunnyvaile-wand-v1.png`
  - `ep04-transform-sunnyvaile-wand-v2.png`
  - `ep04-transform-sunnyvaile-wand-v3-signless-review.png`
- **6 files spanning 3 beat names** — `ep04-scene-07-ai-winter` … `ep04-scene-07-ai-winter-c-end`
  - `ep04-scene-07-ai-winter-a-start-comic-v1-locked-1920.png` ← in the cut at cue [34]
  - `ep04-scene-07-ai-winter-c-end-v2-review.png`
  - `ep04-scene-07-ai-winter-c-end.png`
  - `ep04-scene-07-ai-winter-comic-v1-fresh-1920.png` ← in the cut at cue [35]
  - `ep04-scene-07-ai-winter.jpg`
  - `ep04-scene-07-ai-winter.png`
- **5 files spanning 2 beat names** — `ep04-beat-7m41.53` … `ep04-scene-04b-eniac`
  - `ep04-beat-7m41.53-comic-v1-1920.png`
  - `ep04-scene-04b-eniac-comic-v1-fresh-six-women-1920.png`
  - `ep04-scene-04b-eniac-comic-v2-timnit-style-lock-six-women-1920.png`
  - `ep04-scene-04b-eniac.jpg`
  - `ep04-scene-04b-eniac.png`
- **4 files spanning 2 beat names** — `ep04-scene-02` … `ep04-scene-02a-luminairy-entrance`
  - `ep04-scene-02-v4-bulb-detection-audit.jpg`
  - `ep04-scene-02a-luminairy-entrance-v3-review.png`
  - `ep04-scene-02a-luminairy-entrance-v4-correct-sign-review.png`
  - `ep04-scene-02a-luminairy-entrance-v5-LUMINAiRY-review.png`
- **4 files spanning 2 beat names** — `ep04-scene-03-ada` … `ep04-scene-03-ada-b-mid`
  - `ep04-scene-03-ada-b-mid.png`
  - `ep04-scene-03-ada-v2-repaired-base-review.png`
  - `ep04-scene-03-ada.jpg`
  - `ep04-scene-03-ada.png`
- **4 files spanning 3 beat names** — `ep04-scene-04-hedy` … `ep04-scene-04-hedy-c-end`
  - `ep04-scene-04-hedy-b-mid-v2-review.png`
  - `ep04-scene-04-hedy-c-end-v2-review.png`
  - `ep04-scene-04-hedy.jpg`
  - `ep04-scene-04-hedy.png`
- **3 files spanning 2 beat names** — `ep04-beat-15m11.72` … `ep04-scene-11a-joy`
  - `ep04-beat-15m11.72-comic-v1-1920.png`
  - `ep04-scene-11a-joy-comic-v1-coded-gaze-1920.png`
  - `ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png` ← in the cut at cue [46]
- **3 files spanning 3 beat names** — `ep04-heroine` … `ep04-heroine-face-lock-approved-ali`
  - `ep04-heroine-comic-reference-03-clueless-face-style-study-v2-ali-likeness.png`
  - `ep04-heroine-face-hair-lock-approved-ali-colored-clips.png`
  - `ep04-heroine-face-lock-approved-ali.png`
- **3 files spanning 3 beat names** — `ep04-open-15a-transformation-reusable-corporate-master` … `ep04-open-15c-transformation-reusable-wand-contact`
  - `ep04-open-15a-transformation-reusable-corporate-master-v1-1920.png`
  - `ep04-open-15b-transformation-reusable-wand-approach-v1-1920.png`
  - `ep04-open-15c-transformation-reusable-wand-contact-v1-1920.png`
- **3 files spanning 3 beat names** — `ep04-open-15b-transformation-wand-approach` … `ep04-open-15d-transformation-wand-rebound-ignite`
  - `ep04-open-15b-transformation-wand-approach-1920.png`
  - `ep04-open-15c-transformation-wand-contact-1920.png`
  - `ep04-open-15d-transformation-wand-rebound-ignite-1920.png`
- **3 files spanning 3 beat names** — `ep04-scene-02a-heroine-walk-cycle` … `ep04-scene-02a-heroine-walk-cycle-v3n-a`
  - `ep04-scene-02a-heroine-walk-cycle-v2-a.png`
  - `ep04-scene-02a-heroine-walk-cycle-v2n-a.png`
  - `ep04-scene-02a-heroine-walk-cycle-v3n-a.png`
- **3 files spanning 3 beat names** — `ep04-scene-02a-heroine-walk-cycle` … `ep04-scene-02a-heroine-walk-cycle-v3n-c`
  - `ep04-scene-02a-heroine-walk-cycle-v2-c.png`
  - `ep04-scene-02a-heroine-walk-cycle-v2n-c.png`
  - `ep04-scene-02a-heroine-walk-cycle-v3n-c.png`
- **3 files spanning 3 beat names** — `ep04-scene-02a-luminairy-approach` … `ep04-scene-02a-luminairy-approach-master`
  - `ep04-scene-02a-luminairy-approach-a-start.png`
  - `ep04-scene-02a-luminairy-approach-master.png`
  - `ep04-scene-02a-luminairy-approach-v2-a-start.png`
- **3 files spanning 3 beat names** — `ep04-scene-03-ada-machine-a-start-review` … `ep04-scene-03-ada-machine-c-end-review`
  - `ep04-scene-03-ada-machine-a-start-review.png`
  - `ep04-scene-03-ada-machine-b-mid-review.png`
  - `ep04-scene-03-ada-machine-c-end-review.png`
- **3 files spanning 2 beat names** — `ep04-scene-09-fei-fei` … `ep04-scene-09-fei-fei-b-mid`
  - `ep04-scene-09-fei-fei-b-mid.png`
  - `ep04-scene-09-fei-fei.jpg`
  - `ep04-scene-09-fei-fei.png`
- **2 files spanning 2 beat names** — `ep04-beat-0m27.50` … `ep04-scene-11-checkers`
  - `ep04-beat-0m27.50-comic-v1-1920.png`
  - `ep04-scene-11-checkers-comic-v1-fresh-three-women-1920.png`
- **2 files spanning 2 beat names** — `ep04-beat-13m03.49` … `ep04-scene-09-fei-fei-a-start`
  - `ep04-beat-13m03.49-comic-v1-1920.png`
  - `ep04-scene-09-fei-fei-a-start-comic-v1-locked-1920.png` ← in the cut at cue [41]
- **2 files spanning 2 beat names** — `ep04-beat-18m25.45` … `ep04-open-17-maivens-hall`
  - `ep04-beat-18m25.45-comic-v1-1920.png`
  - `ep04-open-17-maivens-hall-comic-v2-bright-interior-full-portraits-1920.png`
- **2 files spanning 2 beat names** — `ep04-beat-8m40.27` … `ep04-comicpage-eniac-models`
  - `ep04-beat-8m40.27-comic-v1-1920.png`
  - `ep04-comicpage-eniac-models-comic-v1-exact-text-1920.png`
- **2 files spanning 2 beat names** — `ep04-scene-02a-heroine-walk-a` … `ep04-scene-02a-heroine-walk-b`
  - `ep04-scene-02a-heroine-walk-a.png`
  - `ep04-scene-02a-heroine-walk-b.png`
- **2 files spanning 2 beat names** — `ep04-scene-02a-heroine-walk-cycle` … `ep04-scene-02a-heroine-walk-cycle-v2n-d`
  - `ep04-scene-02a-heroine-walk-cycle-v2-d.png`
  - `ep04-scene-02a-heroine-walk-cycle-v2n-d.png`
- **2 files spanning 2 beat names** — `ep04-scene-02a-heroine-walk-cycle-v2n-b` … `ep04-scene-02a-heroine-walk-cycle-v3n-b`
  - `ep04-scene-02a-heroine-walk-cycle-v2n-b.png`
  - `ep04-scene-02a-heroine-walk-cycle-v3n-b.png`
- **2 files spanning 2 beat names** — `ep04-scene-02a-luminairy-approach` … `ep04-scene-02a-luminairy-approach-b-mid`
  - `ep04-scene-02a-luminairy-approach-b-mid.png`
  - `ep04-scene-02a-luminairy-approach-v2-b-mid.png`
- **2 files spanning 2 beat names** — `ep04-scene-02a-luminairy-approach` … `ep04-scene-02a-luminairy-approach-c-end`
  - `ep04-scene-02a-luminairy-approach-c-end.png`
  - `ep04-scene-02a-luminairy-approach-v2-c-end.png`
- **2 files spanning 2 beat names** — `ep04-scene-02b-luminairy-nave` … `ep04-scene-02b-luminairy-nave-maivens-open`
  - `ep04-scene-02b-luminairy-nave-maivens-open-v1.png`
  - `ep04-scene-02b-luminairy-nave-pixel-v1.png`
- **2 files spanning 2 beat names** — `ep04-scene-04-hedy-b-mid` … `ep04-scene-04-hedy-c-end`
  - `ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png` ← in the cut at cue [22]
  - `ep04-scene-04-hedy-c-end-comic-v1-locked-1920.png`
- **2 files spanning 2 beat names** — `ep04-scene-08-karen-b-mid` … `ep04-scene-08-karen-c-end`
  - `ep04-scene-08-karen-b-mid.png`
  - `ep04-scene-08-karen-c-end.png`
- **2 files spanning 2 beat names** — `ep04-scenes-01` … `ep04-scenes-01-rain-02-entrance`
  - `ep04-scenes-01-rain-02-entrance-v14-contact-sheet.jpg`
  - `ep04-scenes-01-v5-02-v15-reviewed-contact-sheet.jpg`

⚠ A cluster here is not automatically a mistake — a deliberate move (wand approach → contact → rebound) looks like this too. It IS a mistake wherever the beats are supposed to show different things.

## Distinct beats, by scene

`current take` is mechanical: wired first, then locked `comic` generation, then highest `-vN`, then widest. It is a guess at which file is current — **not** an approval.

### Beat-timed frames — 18 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-beat-0m27.50` | 1 | `ep04-beat-0m27.50-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-12m28.99` | 1 | `ep04-beat-12m28.99-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-13m03.49` | 1 | `ep04-beat-13m03.49-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-14m29.72` | 1 | `ep04-beat-14m29.72-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-15m11.72` | 1 | `ep04-beat-15m11.72-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-16m27.64` | 1 | `ep04-beat-16m27.64-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-17m01.84` | 1 | `ep04-beat-17m01.84-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-17m41.45` | 1 | `ep04-beat-17m41.45-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-18m25.45` | 1 | `ep04-beat-18m25.45-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-19m02.00` | 1 | `ep04-beat-19m02.00-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-19m30.00` | 1 | `ep04-beat-19m30.00-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-20m02.62` | 1 | `ep04-beat-20m02.62-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-5m20.77` | 1 | `ep04-beat-5m20.77-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-6m09.27` | 1 | `ep04-beat-6m09.27-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-7m41.53` | 1 | `ep04-beat-7m41.53-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-8m40.27` | 1 | `ep04-beat-8m40.27-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-9m20.27` | 1 | `ep04-beat-9m20.27-comic-v1-1920.png` | 1920 | — |
| `ep04-beat-9m55.00` | 1 | `ep04-beat-9m55.00-comic-v1-1920.png` | 1920 | — |

### Opening 01 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-01-previously-strip` | 6 | `ep04-open-01-previously-strip-comic-v6-regina-outfit-1920.png` | 1920 | cue 0 |

### Opening 02 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-02-thisweek-teaser` | 3 | `ep04-open-02-thisweek-teaser-comic-v3-grace-fix-1920.png` | 1920 | — |

### Opening 03 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-03-title` | 1 | `ep04-open-03-title-comic-v1-exact-text-1920.png` | 1920 | cue 1 |

### Opening 04 — 2 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-04-desk` | 1 | `ep04-open-04-desk-comic-v1-face-lock-1920.png` | 1920 | cue 2, cue 44 |
| `ep04-open-04b-desk-chatbox` | 1 | `ep04-open-04b-desk-chatbox-comic-v1-1920.png` | 1920 | — |

### Opening 05 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-05-unease` | 1 | `ep04-open-05-unease-comic-v1-face-lock-1920.png` | 1920 | cue 3 |

### Opening 06 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-06-thinking-closeup` | 1 | `ep04-open-06-thinking-closeup-comic-v1-face-lock-1920.png` | 1920 | cue 4 |

### Opening 07 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-07-questions` | 1 | `ep04-open-07-questions-comic-v1-exact-text-1920.png` | 1920 | cue 5 |

### Opening 08 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-08-sunnyvaile-welcome` | 3 | `ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png` | 1920 | cue 6 |

### Opening 09 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-09-recap-3panel` | 1 | `ep04-open-09-recap-3panel-comic-v1-exact-captions-1920.png` | 1920 | cue 7 |

### Opening 10 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-10-car-engine` | 4 | `ep04-open-10-car-engine-comic-v5-comic-question-mark-1920.png` | 1920 | cue 8 |

### Opening 11 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-11-mall-directory` | 1 | `ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920.png` | 1920 | cue 9 |

### Opening 12 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-12-which-ai` | 2 | `ep04-open-12-which-ai-comic-v2-reference-library-title-1920.png` | 1920 | cue 10 |

### Opening 13 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-13-just-use-internet` | 2 | `ep04-open-13-just-use-internet-comic-v2-clean-counter-no-sign-1920.png` | 1920 | cue 11 |

### Opening 14 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-14-question-hangs` | 1 | `ep04-open-14-question-hangs-comic-v1-face-lock-1920.png` | 1920 | cue 12 |

### Opening 15 — 31 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-15-transform-T0-start-corporate-soft-bg` | 1 | `ep04-open-15-transform-T0-start-corporate-soft-bg-1920.png` | 1920 | — |
| `ep04-open-15a-transformation-before-corporate` | 1 | `ep04-open-15a-transformation-before-corporate-1920.png` | 1920 | — |
| `ep04-open-15a-transformation-corporate` | 1 | `ep04-open-15a-transformation-corporate-v2-face-lock-1920.png` | 1920 | — |
| `ep04-open-15a-transformation-reusable-corporate-master` | 1 | `ep04-open-15a-transformation-reusable-corporate-master-v1-1920.png` | 1920 | — |
| `ep04-open-15a-transformation-reusable-fullbody-corporate-master` | 1 | `ep04-open-15a-transformation-reusable-fullbody-corporate-master-v2-1920.png` | 1920 | — |
| `ep04-open-15b-transformation-reusable-fullbody-wand-approach` | 3 | `ep04-open-15b-transformation-reusable-fullbody-wand-approach-v6-classic-1920.png` | 1920 | — |
| `ep04-open-15b-transformation-reusable-wand-approach` | 1 | `ep04-open-15b-transformation-reusable-wand-approach-v1-1920.png` | 1920 | — |
| `ep04-open-15b-transformation-wand-approach` | 1 | `ep04-open-15b-transformation-wand-approach-1920.png` | 1920 | — |
| `ep04-open-15b0-transformation-wand-entry` | 1 | `ep04-open-15b0-transformation-wand-entry-v7-smooth-1920.png` | 1920 | — |
| `ep04-open-15b2-transformation-wand-near-contact` | 1 | `ep04-open-15b2-transformation-wand-near-contact-v7-smooth-1920.png` | 1920 | — |
| `ep04-open-15c-transformation-reusable-fullbody-wand-contact` | 3 | `ep04-open-15c-transformation-reusable-fullbody-wand-contact-v6-classic-1920.png` | 1920 | — |
| `ep04-open-15c-transformation-reusable-wand-contact` | 1 | `ep04-open-15c-transformation-reusable-wand-contact-v1-1920.png` | 1920 | — |
| `ep04-open-15c-transformation-wand-contact` | 1 | `ep04-open-15c-transformation-wand-contact-1920.png` | 1920 | — |
| `ep04-open-15c2-transformation-wand-compressed-tap` | 1 | `ep04-open-15c2-transformation-wand-compressed-tap-v7-smooth-1920.png` | 1920 | — |
| `ep04-open-15d-transformation-reusable-fullbody-wand-rebound` | 3 | `ep04-open-15d-transformation-reusable-fullbody-wand-rebound-v6-classic-1920.png` | 1920 | — |
| `ep04-open-15d-transformation-wand-rebound-ignite` | 1 | `ep04-open-15d-transformation-wand-rebound-ignite-1920.png` | 1920 | — |
| `ep04-open-15e-transformation-magic-effect` | 1 | `ep04-open-15e-transformation-magic-effect-1920.png` | 1920 | — |
| `ep04-open-15e-transformation-reusable-fullbody-magic-effect` | 3 | `ep04-open-15e-transformation-reusable-fullbody-magic-effect-v3-classic-wand-1920.png` | 1920 | — |
| `ep04-open-15e1-transformation-magic-ignition` | 1 | `ep04-open-15e1-transformation-magic-ignition-v4-expanded-1920.png` | 1920 | — |
| `ep04-open-15e2-transformation-magic-first-change` | 1 | `ep04-open-15e2-transformation-magic-first-change-v4-expanded-1920.png` | 1920 | — |
| `ep04-open-15e3-transformation-magic-mid-transform` | 1 | `ep04-open-15e3-transformation-magic-mid-transform-v4-expanded-1920.png` | 1920 | — |
| `ep04-open-15e4-transformation-magic-nearly-complete` | 1 | `ep04-open-15e4-transformation-magic-nearly-complete-v4-expanded-1920.png` | 1920 | — |
| `ep04-open-15e5-transformation-magic-peak-flash` | 1 | `ep04-open-15e5-transformation-magic-peak-flash-v4-expanded-1920.png` | 1920 | — |
| `ep04-open-15e6-transformation-magic-clearing` | 1 | `ep04-open-15e6-transformation-magic-clearing-v4-expanded-1920.png` | 1920 | — |
| `ep04-open-15f-transformation-main-street-clueless` | 5 | `ep04-open-15f-transformation-main-street-clueless-v7-full-graphic-novel-canonical-sunnyvaile-1920.png` | 1920 | cue 13 |
| `ep04-open-15f-transformation-reusable-fullbody-sunnyvaile` | 2 | `ep04-open-15f-transformation-reusable-fullbody-sunnyvaile-v2-correct-six-section-hair-1920.png` | 1920 | — |
| `ep04-open-15p0-transformation-stage-corporate-no-wand` | 1 | `ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png` | 1920 | — |
| `ep04-open-15p1-transformation-poof-build-no-wand` | 1 | `ep04-open-15p1-transformation-poof-build-no-wand-v1-1920.png` | 1920 | — |
| `ep04-open-15p2-transformation-poof-cover-no-wand` | 1 | `ep04-open-15p2-transformation-poof-cover-no-wand-v1-1920.png` | 1920 | — |
| `ep04-open-15p3-transformation-poof-clearing-no-wand` | 1 | `ep04-open-15p3-transformation-poof-clearing-no-wand-v1-1920.png` | 1920 | — |
| `ep04-open-15p4-transformation-reveal-clueless-stage-no-wand` | 1 | `ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png` | 1920 | — |

### Opening 16 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-16-luminairy-approach` | 4 | `ep04-open-16-luminairy-approach-comic-v1-1920.png` | 1920 | cue 14 |

### Opening 17 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-17-maivens-hall` | 3 | `ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png` | 1920 | cue 15 |

### Opening 18 — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-open-18-grace-looks-up-at-ada-maivens` | 2 | `ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png` | 1920 | cue 16 |

### Scene 01 — 3 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-01` | 2 | `ep04-scene-01-v8-every-shot-audit.jpg` | 960 | — |
| `ep04-scene-01-cold-open` | 15 | `ep04-scene-01-cold-open-v5-window-realization-review.png` | 1672 | — |
| `ep04-scene-01-rain` | 1 | `ep04-scene-01-rain-v5-mask-audit.png` | 1920 | — |

### Scene 02 — 25 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-02` | 4 | `ep04-scene-02-v17-story-transition-audit.jpg` | 960 | — |
| `ep04-scene-02-luminairy` | 8 | `ep04-scene-02-luminairy-v4-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-02-luminairy-blue-glow-transition` | 1 | `ep04-scene-02-luminairy-blue-glow-transition.png` | 1920 | — |
| `ep04-scene-02a-heroine-walk-a` | 1 | `ep04-scene-02a-heroine-walk-a.png` | 322 | — |
| `ep04-scene-02a-heroine-walk-b` | 1 | `ep04-scene-02a-heroine-walk-b.png` | 333 | — |
| `ep04-scene-02a-heroine-walk-cycle` | 8 | `ep04-scene-02a-heroine-walk-cycle-v3-chroma.png` | 1672 | — |
| `ep04-scene-02a-heroine-walk-cycle-v2n-a` | 1 | `ep04-scene-02a-heroine-walk-cycle-v2n-a.png` | 337 | — |
| `ep04-scene-02a-heroine-walk-cycle-v2n-b` | 1 | `ep04-scene-02a-heroine-walk-cycle-v2n-b.png` | 292 | — |
| `ep04-scene-02a-heroine-walk-cycle-v2n-c` | 1 | `ep04-scene-02a-heroine-walk-cycle-v2n-c.png` | 369 | — |
| `ep04-scene-02a-heroine-walk-cycle-v2n-d` | 1 | `ep04-scene-02a-heroine-walk-cycle-v2n-d.png` | 287 | — |
| `ep04-scene-02a-heroine-walk-cycle-v3n-a` | 1 | `ep04-scene-02a-heroine-walk-cycle-v3n-a.png` | 337 | — |
| `ep04-scene-02a-heroine-walk-cycle-v3n-b` | 1 | `ep04-scene-02a-heroine-walk-cycle-v3n-b.png` | 293 | — |
| `ep04-scene-02a-heroine-walk-cycle-v3n-c` | 1 | `ep04-scene-02a-heroine-walk-cycle-v3n-c.png` | 368 | — |
| `ep04-scene-02a-heroine-walk-cycle-v3n-d` | 1 | `ep04-scene-02a-heroine-walk-cycle-v3n-d.png` | 315 | — |
| `ep04-scene-02a-heroine-walk-sprites` | 1 | `ep04-scene-02a-heroine-walk-sprites.png` | 1672 | — |
| `ep04-scene-02a-heroine-walk-sprites-chroma` | 1 | `ep04-scene-02a-heroine-walk-sprites-chroma.png` | 1672 | — |
| `ep04-scene-02a-luminairy-approach` | 3 | `ep04-scene-02a-luminairy-approach-v2-b-mid.png` | 1920 | — |
| `ep04-scene-02a-luminairy-approach-a-start` | 1 | `ep04-scene-02a-luminairy-approach-a-start.png` | 1920 | — |
| `ep04-scene-02a-luminairy-approach-b-mid` | 1 | `ep04-scene-02a-luminairy-approach-b-mid.png` | 1920 | — |
| `ep04-scene-02a-luminairy-approach-c-end` | 1 | `ep04-scene-02a-luminairy-approach-c-end.png` | 1920 | — |
| `ep04-scene-02a-luminairy-approach-master` | 1 | `ep04-scene-02a-luminairy-approach-master.png` | 1672 | — |
| `ep04-scene-02a-luminairy-entrance` | 3 | `ep04-scene-02a-luminairy-entrance-v5-LUMINAiRY-review.png` | 1920 | — |
| `ep04-scene-02a-luminairy-wide` | 1 | `ep04-scene-02a-luminairy-wide-v6-LUMINAiRY-review.png` | 1920 | — |
| `ep04-scene-02b-luminairy-nave` | 1 | `ep04-scene-02b-luminairy-nave-pixel-v1.png` | 1672 | — |
| `ep04-scene-02b-luminairy-nave-maivens-open` | 1 | `ep04-scene-02b-luminairy-nave-maivens-open-v1.png` | 1672 | — |

### Scene 03 — 8 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-03` | 1 | `ep04-scene-03-v3-grace-method-every-shot-audit.jpg` | 960 | — |
| `ep04-scene-03-ada` | 7 | `ep04-scene-03-ada-comic-v4-timnit-style-lock-black-gloves-1920.png` | 1920 | — |
| `ep04-scene-03-ada-a-start` | 1 | `ep04-scene-03-ada-a-start-comic-v1-locked-1920.png` | 1920 | — |
| `ep04-scene-03-ada-b-mid` | 2 | `ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png` | 1920 | cue 19 |
| `ep04-scene-03-ada-c-end` | 2 | `ep04-scene-03-ada-c-end-comic-v1-locked-1920.png` | 1920 | — |
| `ep04-scene-03-ada-machine-a-start-review` | 1 | `ep04-scene-03-ada-machine-a-start-review.png` | 1920 | — |
| `ep04-scene-03-ada-machine-b-mid-review` | 1 | `ep04-scene-03-ada-machine-b-mid-review.png` | 1920 | — |
| `ep04-scene-03-ada-machine-c-end-review` | 1 | `ep04-scene-03-ada-machine-c-end-review.png` | 1920 | — |

### Scene 04 — 10 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-04` | 1 | `ep04-scene-04-v3-story-playback-audit.jpg` | 1440 | — |
| `ep04-scene-04-hedy` | 4 | `ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png` | 1920 | cue 21 |
| `ep04-scene-04-hedy-b-mid` | 2 | `ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png` | 1920 | cue 22 |
| `ep04-scene-04-hedy-c-end` | 3 | `ep04-scene-04-hedy-c-end-comic-v1-locked-1920.png` | 1920 | — |
| `ep04-scene-04-hedy-narration-sync` | 1 | `ep04-scene-04-hedy-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-04b-eniac` | 12 | `ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png` | 1920 | cue 24 |
| `ep04-scene-04b-eniac-a-start` | 2 | `ep04-scene-04b-eniac-a-start-comic-v1-locked-1920.png` | 1920 | — |
| `ep04-scene-04b-eniac-c-end` | 2 | `ep04-scene-04b-eniac-c-end-comic-v1-locked-1920.png` | 1920 | cue 25 |
| `ep04-scene-04b-eniac-narration-sync` | 1 | `ep04-scene-04b-eniac-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-04b-source-audit` | 1 | `ep04-scene-04b-source-audit.jpg` | 1920 | — |

### Scene 05 — 8 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-05-grace` | 2 | `ep04-scene-05-grace.png` | 1920 | — |
| `ep04-scene-05-grace-a-start` | 4 | `ep04-scene-05-grace-a-start-comic-v1-locked-1920.png` | 1920 | cue 27 |
| `ep04-scene-05-grace-b-mid` | 4 | `ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png` | 1920 | cue 28 |
| `ep04-scene-05-grace-c-end` | 3 | `ep04-scene-05-grace-c-end-comic-v1-locked-1920.png` | 1920 | cue 29 |
| `ep04-scene-05-grace-machine-look` | 1 | `ep04-scene-05-grace-machine-look-v1.png` | 1920 | — |
| `ep04-scene-05-grace-navy-hold` | 1 | `ep04-scene-05-grace-navy-hold-v1-review.png` | 1920 | — |
| `ep04-scene-05-grace-writing` | 2 | `ep04-scene-05-grace-writing-v2.png` | 1920 | — |
| `ep04-scene-05a-grace-navy-office` | 7 | `ep04-scene-05a-grace-navy-office-v3-application-review.png` | 1920 | — |

### Scene 06 — 5 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-06-naming` | 5 | `ep04-scene-06-naming-comic-v1-fresh-exact-board-1920.png` | 1920 | cue 31 |
| `ep04-scene-06-naming-b-mid` | 2 | `ep04-scene-06-naming-b-mid-comic-v1-locked-1920.png` | 1920 | cue 32 |
| `ep04-scene-06-naming-c-end` | 2 | `ep04-scene-06-naming-c-end-comic-v1-locked-1920.png` | 1920 | cue 33 |
| `ep04-scene-06-naming-narration-sync` | 1 | `ep04-scene-06-naming-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-06-source-audit` | 1 | `ep04-scene-06-source-audit.jpg` | 960 | — |

### Scene 07 — 5 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-07-ai-winter` | 3 | `ep04-scene-07-ai-winter-comic-v1-fresh-1920.png` | 1920 | cue 35 |
| `ep04-scene-07-ai-winter-a-start` | 1 | `ep04-scene-07-ai-winter-a-start-comic-v1-locked-1920.png` | 1920 | cue 34 |
| `ep04-scene-07-ai-winter-c-end` | 3 | `ep04-scene-07-ai-winter-c-end-comic-v1-locked-1920.png` | 1920 | cue 36 |
| `ep04-scene-07-ai-winter-narration-sync` | 1 | `ep04-scene-07-ai-winter-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-07-source-audit` | 1 | `ep04-scene-07-source-audit.jpg` | 960 | — |

### Scene 08 — 5 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-08-karen` | 5 | `ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920.png` | 1920 | cue 38 |
| `ep04-scene-08-karen-b-mid` | 2 | `ep04-scene-08-karen-b-mid-comic-v1-locked-1920.png` | 1920 | — |
| `ep04-scene-08-karen-c-end` | 2 | `ep04-scene-08-karen-c-end-comic-v1-locked-1920.png` | 1920 | cue 39 |
| `ep04-scene-08-karen-narration-sync` | 1 | `ep04-scene-08-karen-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-08-source-audit` | 1 | `ep04-scene-08-source-audit.jpg` | 1440 | — |

### Scene 09 — 5 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-09-fei-fei` | 4 | `ep04-scene-09-fei-fei-comic-v2-timnit-style-lock-1920.png` | 1920 | cue 43 |
| `ep04-scene-09-fei-fei-a-start` | 2 | `ep04-scene-09-fei-fei-a-start-comic-v1-locked-1920.png` | 1920 | cue 41 |
| `ep04-scene-09-fei-fei-b-mid` | 2 | `ep04-scene-09-fei-fei-b-mid-comic-v1-locked-1920.png` | 1920 | cue 42 |
| `ep04-scene-09-fei-fei-narration-sync` | 1 | `ep04-scene-09-fei-fei-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-09-source-audit` | 1 | `ep04-scene-09-source-audit.jpg` | 1440 | — |

### Scene 10 — 3 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-10-desk` | 8 | `ep04-scene-10-desk-comic-v1-fresh-1920.png` | 1920 | — |
| `ep04-scene-10-language-to-chatbox` | 1 | `ep04-scene-10-language-to-chatbox-v1-review.png` | 1672 | — |
| `ep04-scene-10-source-audit` | 1 | `ep04-scene-10-source-audit.jpg` | 960 | — |

### Scene 11 — 14 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-11-checkers` | 5 | `ep04-scene-11-checkers-comic-v1-fresh-three-women-1920.png` | 1920 | — |
| `ep04-scene-11-checkers-b-parrot-review` | 1 | `ep04-scene-11-checkers-b-parrot-review.png` | 1920 | — |
| `ep04-scene-11-checkers-c-end` | 1 | `ep04-scene-11-checkers-c-end.png` | 1920 | — |
| `ep04-scene-11-checkers-c-extraction-review` | 1 | `ep04-scene-11-checkers-c-extraction-review.png` | 1920 | — |
| `ep04-scene-11-checkers-narration-sync` | 1 | `ep04-scene-11-checkers-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-11-joy-timnit-emily` | 1 | `ep04-scene-11-joy-timnit-emily-v1-review.png` | 1672 | — |
| `ep04-scene-11-source-audit` | 1 | `ep04-scene-11-source-audit.jpg` | 960 | — |
| `ep04-scene-11a-joy` | 2 | `ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png` | 1920 | cue 46 |
| `ep04-scene-11b-kate-crawford-supply-chain` | 1 | `ep04-scene-11b-kate-crawford-supply-chain-v1-review.png` | 1672 | — |
| `ep04-scene-11b-timnit` | 1 | `ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png` | 1920 | cue 47, cue 49 |
| `ep04-scene-11b2-timnit-aftermath` | 1 | `ep04-scene-11b2-timnit-aftermath-comic-v1-1920.png` | 1920 | — |
| `ep04-scene-11c-emily` | 1 | `ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png` | 1920 | cue 48 |
| `ep04-scene-11d-kate` | 1 | `ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png` | 1920 | cue 50 |
| `ep04-scene-11d2-kate-material-cost` | 1 | `ep04-scene-11d2-kate-material-cost-comic-v1-1920.png` | 1920 | — |

### Scene 12 — 2 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-scene-12-lights-up` | 6 | `ep04-scene-12-lights-up-v2-narration-sync-v3-story-audit.jpg` | 1440 | — |
| `ep04-scene-12-source-audit` | 1 | `ep04-scene-12-source-audit.jpg` | 1440 | — |

### Standalone / graphic frames — 51 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04` | 1 | `ep04-v2-review-qc-contact-sheet.jpg` | 1920 | — |
| `ep04-around-town` | 1 | `ep04-around-town-comic-v1-1920.png` | 1920 | cue 54 |
| `ep04-around-town-b` | 1 | `ep04-around-town-b-comic-v1-1920.png` | 1920 | — |
| `ep04-character-test-dj-sunnyv` | 1 | `ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png` | 1920 | — |
| `ep04-character-test-mayor-deb` | 3 | `ep04-character-test-mayor-deb-comic-v3-no-halftone-1920.png` | 1920 | — |
| `ep04-cocktail` | 1 | `ep04-cocktail-comic-v1-exact-mixed-case-1920.png` | 1920 | cue 53 |
| `ep04-cocktail-in-use` | 1 | `ep04-cocktail-in-use-comic-v1-1920.png` | 1920 | — |
| `ep04-comicpage-eniac-models` | 1 | `ep04-comicpage-eniac-models-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-concept-ai-winter` | 1 | `ep04-concept-ai-winter-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-concept-algorithm` | 1 | `ep04-concept-algorithm-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-concept-compiler` | 1 | `ep04-concept-compiler-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-concept-training-data` | 1 | `ep04-concept-training-data-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-daytime-colorsetter-sunnyvaile-main-street` | 1 | `ep04-daytime-colorsetter-sunnyvaile-main-street-v1.png` | 1672 | — |
| `ep04-emph-agentic-edge` | 1 | `ep04-emph-agentic-edge-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-bug` | 1 | `ep04-emph-bug-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-check-the-machine` | 3 | `ep04-emph-check-the-machine-comic-v4-shorter-text-1920.png` | 1920 | — |
| `ep04-emph-edge-of-the-map` | 1 | `ep04-emph-edge-of-the-map-comic-v1-1920.png` | 1920 | — |
| `ep04-emph-first-programmers` | 1 | `ep04-emph-first-programmers-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-godmother` | 1 | `ep04-emph-godmother-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-jam` | 1 | `ep04-emph-jam-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-landed-on-your-desk` | 1 | `ep04-emph-landed-on-your-desk-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-left-to-men` | 1 | `ep04-emph-left-to-men-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-neither` | 1 | `ep04-emph-neither-comic-v2-exact-mixed-case-1920.png` | 1920 | — |
| `ep04-emph-never-told-it-was-yours` | 1 | `ep04-emph-never-told-it-was-yours-comic-v1-exact-mixed-case-1920.png` | 1920 | — |
| `ep04-emph-nobody-heard` | 1 | `ep04-emph-nobody-heard-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-not-magic` | 1 | `ep04-emph-not-magic-comic-v1-exact-mixed-case-1920.png` | 1920 | — |
| `ep04-emph-not-solved` | 1 | `ep04-emph-not-solved-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-emph-remember-that-part` | 1 | `ep04-emph-remember-that-part-comic-v1-exact-text-1920.png` | 1920 | — |
| `ep04-heroine` | 39 | `ep04-heroine-comic-reference-03-clueless-3q-sidelight-v28-suit-flat-color-only-1920.png` | 1920 | — |
| `ep04-heroine-approved-head-closeup-hair-accepted` | 1 | `ep04-heroine-approved-head-closeup-hair-accepted.png` | 1254 | — |
| `ep04-heroine-expression-sheet` | 2 | `ep04-heroine-expression-sheet-v2-graphic-novel-register-v28-locked-1920.png` | 1920 | — |
| `ep04-heroine-face-hair-lock-approved-ali-colored-clips` | 1 | `ep04-heroine-face-hair-lock-approved-ali-colored-clips.png` | 1149 | — |
| `ep04-heroine-face-lock-approved-ali` | 1 | `ep04-heroine-face-lock-approved-ali.png` | 1149 | — |
| `ep04-heroine-sheet` | 2 | `ep04-heroine-sheet-v2.png` | 1920 | — |
| `ep04-heroine-turnaround-sheet-clueless` | 1 | `ep04-heroine-turnaround-sheet-clueless-v1-v28-locked-1920.png` | 1920 | — |
| `ep04-heroine-y2k-wardrobe-sheet` | 2 | `ep04-heroine-y2k-wardrobe-sheet-v2.png` | 1920 | — |
| `ep04-next-week` | 1 | `ep04-next-week-comic-v1-1920.png` | 1920 | cue 56 |
| `ep04-next-week-b` | 1 | `ep04-next-week-b-comic-v1-1920.png` | 1920 | — |
| `ep04-remaining-locked-qc-contact-sheet` | 1 | `ep04-remaining-locked-qc-contact-sheet.jpg` | 1920 | — |
| `ep04-scenes-01` | 1 | `ep04-scenes-01-v5-02-v15-reviewed-contact-sheet.jpg` | 2880 | — |
| `ep04-scenes-01-02-latest-review-contact-sheet` | 1 | `ep04-scenes-01-02-latest-review-contact-sheet.jpg` | 2304 | — |
| `ep04-scenes-01-rain-02-entrance` | 1 | `ep04-scenes-01-rain-02-entrance-v14-contact-sheet.jpg` | 2304 | — |
| `ep04-sign-off` | 1 | `ep04-sign-off-comic-v1-1920.png` | 1920 | cue 55 |
| `ep04-sign-off-fieldtrip` | 1 | `ep04-sign-off-fieldtrip-comic-v1-1920.png` | 1920 | — |
| `ep04-splash-lights-up` | 2 | `ep04-splash-lights-up-comic-v1-end-blazing-1920.png` | 1920 | cue 51, cue 52 |
| `ep04-splash-lights-up-mid` | 1 | `ep04-splash-lights-up-mid-comic-v1-1920.png` | 1920 | — |
| `ep04-title-card` | 1 | `ep04-title-card-comic-v2.png` | 1920 | — |
| `ep04-title-master-anchor` | 1 | `ep04-title-master-anchor-v1-review.png` | 1920 | — |
| `ep04-transform-corporate-wand` | 3 | `ep04-transform-corporate-wand-v3-signless-review.png` | 1672 | — |
| `ep04-transform-sunnyvaile-wand` | 3 | `ep04-transform-sunnyvaile-wand-v3-signless-review.png` | 1672 | — |
| `ep04-turing-memoriam` | 1 | `ep04-turing-memoriam-comic-v1-exact-text-1920.png` | 1920 | — |

### Time-jump cards — 7 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-tj-dartmouth` | 2 | `ep04-tj-dartmouth-comic-v2-timnit-style-lock-exact-caption-1920.png` | 1920 | cue 30 |
| `ep04-tj-eniac` | 1 | `ep04-tj-eniac-comic-v1-exact-caption-1920.png` | 1920 | cue 23 |
| `ep04-tj-feifei` | 1 | `ep04-tj-feifei-comic-v1-exact-caption-1920.png` | 1920 | cue 40 |
| `ep04-tj-grace` | 2 | `ep04-tj-grace-comic-v2-philadelphia-1952-1920.png` | 1920 | cue 26 |
| `ep04-tj-hedy` | 2 | `ep04-tj-hedy-comic-v2-timnit-style-lock-exact-caption-1920.png` | 1920 | cue 20 |
| `ep04-tj-karen` | 2 | `ep04-tj-karen-comic-v2-timnit-style-lock-exact-caption-1920.png` | 1920 | cue 37 |
| `ep04-tj-modern` | 1 | `ep04-tj-modern-comic-v1-2018-2021-1920.png` | 1920 | cue 45 |

### Transitions — 1 distinct beats

| beat | takes | current take | px | in the cut |
|---|---|---|---|---|
| `ep04-transition-ada-timejump-london-1843` | 1 | `ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png` | 1920 | cue 17 |

## Blocked by a recorded decision

12 files match the `banned` block. They stay on disk; the hook refuses to wire them.

- `ep04-scene-05-grace-c-end-comic-v2-graphic-novel-1920.png` — matches `grace-c-end-comic-v2-graphic-novel`
- `ep04-scene-05a-grace-navy-office-v3-application-handoff.png` — matches `grace-navy-office-v3-application-handoff`
- `ep04-scene-05a-grace-navy-office-v3-application-review-comic-barsetter-v1-nophoto.png` — matches `comic-barsetter`
- `ep04-scene-05a-grace-navy-office-v3-application-review-comic-barsetter-v1.png` — matches `comic-barsetter`
- `ep04-scene-05a-grace-navy-office-v3-application-review-comic-barsetter-v2-more-angular-shadows-nophoto.png` — matches `comic-barsetter`
- `ep04-scene-05a-grace-navy-office-v3-application-review-comic-barsetter-v2.png` — matches `comic-barsetter`
- `ep04-scene-05a-grace-navy-office-v3-application-review-comic-barsetter-v3-more-face-shadow-nophoto.png` — matches `comic-barsetter`
- `ep04-scene-05a-grace-navy-office-v3-application-review-comic-barsetter-v3.png` — matches `comic-barsetter`
- `ep04-tj-emily-comic-v1-uw-2021-1920.png` — matches `ep04-tj-emily-comic`
- `ep04-tj-joy-comic-v1-mit-2018-1920.png` — matches `ep04-tj-joy-comic`
- `ep04-tj-kate-comic-v1-usc-2021-1920.png` — matches `ep04-tj-kate-comic`
- `ep04-tj-timnit-comic-v1-google-2020-1920.png` — matches `ep04-tj-timnit-comic`

## Cue sheet reconciliation

⚠ 1 wired filenames are not in this folder (they live elsewhere, or they are missing):
- `ep04-scene-03-ada-loop-v1.mp4` — cue [18]

Cues resolved here: 56 / 57.

