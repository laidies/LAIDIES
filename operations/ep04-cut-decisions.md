# EP4 CUT — DECISIONS ALREADY MADE (do not re-open)

> Ali decides. This file records it the moment she says it, so it is never re-litigated.
> If something here looks wrong, ASK — do not "improve" it.
> Last updated 2026-07-21.

## Time-jump cards
- **2018–2021 is ONE shared card.** DECIDED for TIMING reasons.
- Per-woman cards (`tj-joy MIT 2018`, `tj-timnit GOOGLE 2020`, `tj-emily UW 2021`,
  `tj-kate USC 2021`) **exist but are deliberately NOT wired.** They cost too much runtime.
- ⛔ I wired them anyway on 2026-07-21 and had to revert. Do not do this again.
- Earlier era cards (LONDON 1843 · HOLLYWOOD · PHILADELPHIA · PHILADELPHIA 1952 ·
  DARTMOUTH 1956 · CAMBRIDGE 1972 · FEI-FEI) stay as they are.

## Grace — the YOUNGER set, locked
- Grace was **45 and a civilian** at Remington Rand in 1952. The white-haired Rear Admiral
  is decades later; the narration says it in future tense.
- **USE ONLY** `ep04-scene-05-grace-{a-start,b-mid,c-end}-comic-v1-locked-1920.png`
  → dismissal (545.55) · compiler (575.00) · the moth (615.00, EXACT narration cue).
- ⛔ **NOT** `grace-c-end-comic-v2-graphic-novel` (reads elderly-admiral — wrong age).
- ⛔ **NOT** `grace-navy-office-v3-application-handoff` (old generation).
- ⛔ **NOT** any `comic-barsetter` frame (superseded pass).

## Fei-Fei — three beats
- empty wall (a-start) → millions upon millions (b-mid) → it sees / Godmother (v2).
- Killed a 73.8s single hold. All three already existed in comic; nothing was generated.

## Animation — CLAUDE BUILDS IT. Ali does not touch any tool.
> ⛔ The old heading here said "Ali generates in Canva; Claude only says which + what motion."
> **That is wrong and was corrected 2026-07-22.** Ali: *"I am not using capcut myself. i don't
> know how to use it at all"* / *"this is why i have you and codex."* Never write a brief that
> asks her to keyframe, mask or export. Built in code:
> `assets/video/fx/build-ep04-motion-assets.py` + `build-episode-04-full-v2-motion.py`.

- **BACKGROUND MOTION ONLY** — lights, rain, gears, screen glow, drifting dust.
- ⛔ NO faces, bodies, hands, expressions. ⛔ NO camera move (no pan/zoom/drift/parallax).
- ⛔ Nothing that starts and finishes — 5s seamless loop or it visibly restarts.
- Ada already has a loop wired (`ep04-scene-03-ada-loop-v1.mp4`).
- Claude **cannot** drive Canva image→video via the API (no ingestion path for local files,
  no animation operation). Ali runs it; Claude supplies the shortlist + motion brief.

## Town geography is CANON in episode art too (2026-07-22)
- `ep04-around-town-b-comic-v1-1920.png` is **BANNED**. Ali: *"the library is not beside
  blend and snap."* It is not wired and must not be.
- Three faults: (1) it puts the **LIBRAiRY on MAiN Street** — the LIBRAiRY is on **Civic
  Square**, off MAiN, sitting on the RIGHT with the Post Office on the LEFT; (2) it reverses
  MAiN's order, which runs **No.3 Chick Flicks → No.4 Blend & Snap**; (3) it is soft and
  painterly despite the `comic-v1` in its filename — a mixed generation.
- ⛔ **This exact error has happened before.** The `main-street-golden` and `main-street-dusk`
  scenes "put LIBRARY on MAiN" and were re-rolled on 2026-07-06. Any prompt for a SUNNYVAiLE
  street or storefront row must state the canonical order and which street it is.
- Source of truth: memory `sunnyvaile-street-layout-canon` — MAiN 1-10 plus five cross streets.

## 🔴 THE TRANSFORMATION — 15f Main-Street reveals are REJECTED (Ali 2026-07-19, re-stated 07-22)
- Ali 2026-07-22: *"we don't use this transformation sequence i already told you that."*
- `heroine-appearance-canon` has said since 2026-07-19: ⛔ *"Do NOT revive the 'lands in town'
  reveal OR the wand… all Main-Street `15f` reveals are REJECTED."* I did not read it, wrote a
  prompt to RE-RENDER `15f-v7`, and Codex delivered `15f-v8`. Withdrawn to
  `operations/_rejected/transformation-reroll-20260722/`.
- **The approved sequence is the 5-frame `15p0–p4`** on the abstract 90s geometric stage —
  NO wand, NO town, NO storefronts. All five exist on disk. Source of truth:
  `operations/codex-prompts/transformation-sequence-spec.md`.
- 🔴 **cue 13 (3:05, 17s) still plays the REJECTED `15f-v7`.** That is a live defect.

## Sign text — NEVER composited (2026-07-22)
- Ali: *"you shouldn't be applying signs on top that is going to look like shit."*
- The LUMINAiRY marquee renders `LUMiNAiRY`. I fixed it by pasting a capital I built from
  the sign's own L. It read correctly and it looked applied-on. **Rejected.**
- ⛔ No PIL compositing, no overlay pass, no blend-mode ink, on ANY sign or label.
  This was already the rule (memory `codex-text-in-render`, plus a 2026-07-04 ruling);
  I broke it. Rejected artefacts: `operations/_rejected/luminairy-sign-compositing-20260722/`.
- The ONLY fix for wrong sign text is a re-render with the exact string in the prompt,
  letter-exact including the lowercase-i brand spelling.

## Generations — never mix
- The cut is **comic only**. Old pixel-generation art is never wired, no matter how good
  the beat is. If a beat only exists in pixel, it must be REGENERATED in comic.
- `comic-barsetter` and `comic-v2-graphic-novel` are superseded passes — not usable.

## 🕐 DERIVED FROM THE NARRATION CLOCK — 2026-07-22 (PROPOSAL, not yet approved)
Forced alignment now gives every narration line a true start/end second
(`operations/captions/episode-04-timing-map.json`, 98.5% coverage, verified). Measured
against it, the current cut has **21 holds ≥25s = 817s frozen**, on a 20.4-min episode.

At a 26s ceiling the cut needs **22 more frames**. Four are already drawn and unused:

| Slot | Existing `comic-v1-locked` file | Line it covers |
|---|---|---|
| 4:35.15 | `scene-03-ada-a-start` | "They built it to do arithmetic" — machine as pure arithmetic, NO music notes |
| 6:54.65 | `scene-04-hedy-c-end` | "nobody heard a single word she said" — men walking away |
| 8:00.77 | `scene-04b-eniac-a-start` | "rewiring it, cable by cable" — SIX women, verified |
| 11:47.35 | `scene-08-karen-b-mid` | "it's the rare words that carry the meaning" |

⛔ **`scene-03-ada-c-end` deliberately NOT proposed** — punch card + gold music notes is
compositionally near-identical to what the Ada loop already shows at 4:26. Two versions of
the same picture 30s apart; fails the near-identical rule.

➜ Remaining **18 frames** written up beat-by-beat in
`operations/codex-prompts/ep04-missing-beats-from-clock.md`, each carrying its exact
in-point, hold length and the literal words spoken over it.

⚠ **Nothing has been wired.** Placement is Ali's call.

## Known open items (NOT decided — do not act unilaterally)
- Timnit uses the same frame twice (925.80 + 954.00). Second beat = getting fired.
- Emily holds 8s. Ali set this; leave it.
- **9 approved beats exist only in pixel and were never redrawn in comic** — including
  `scene-07-ai-winter c-end` (the monitors going 2 → 1 → 0), `scene-06-naming` b-mid/c-end,
  `scene-04b-eniac` mid/end, and four Grace beats. Cause: prompts asked scene-by-scene
  instead of beat-by-beat. Needs a Codex prompt; not yet written.

## Surfaces kept in sync with the cut (2026-07-21)
- `issues/issue-04.html` now matches the cut: Grace uses the younger locked compiler beat,
  and the curation-rejected scene-10 desk still was replaced with the comic desk used in the cut.
- ⚠ That page still carries dead `data-frames="...pixel filenames..."` attributes from the pixel
  era. **No JavaScript reads them** — they are inert, but they are a trap: they name old-generation
  files and will mislead the next agent into thinking a pixel carousel is live. Clean them post-launch.
- `operations/ep04-shot-list.md` and `operations/codex-prompts/ep04-video-assembly.md` are DERIVED
  from the cue sheet. Regenerate BOTH after any cue change — a stale shot list silently builds the
  wrong video (it was stuck at 45 shots while the cut was 54).

## Article art — the emphasis/concept register (2026-07-21)
Ali: the two desk shots were "too close looking to be used twice… there aren't that many images."
There ARE — **16 emphasis word-bursts + 4 concept frames existed and were wired NOWHERE** (not the
article, not the cut). The article ran on scene stills alone, which is why everything looked alike.

- Scene 10 now uses `ep04-emph-landed-on-your-desk` (not a second desk photo).
- 7 emphasis bursts placed at the END of their subject's block, as the punch line:
  ENIAC→first-programmers · Grace→bug · Dartmouth→not-solved · Karen→left-to-men ·
  Fei-Fei→godmother · Hedy→nobody-heard · checkers→neither.
- 4 concept frames placed in The Vocab accordion (algorithm/compiler/ai-winter/training-data);
  needed a new `.gloss .concept-art` CSS rule — without it they rendered at full 1920px.
- Article went from 13 → **24 distinct ep-04 images, zero repeats.**

⚠ NOT used, deliberately: bursts whose text duplicates an existing `<h2>` (`not-magic`,
`never-told-it-was-yours`). Using those means going ART-LED — the burst REPLACES the text heading —
which is a design decision for Ali, not a wiring change.

## ARTICLE LAYOUT — locked 2026-07-21 (applies to EVERY episode article)
Ali's rule, from the Dartmouth section she approved as the pattern:

1. **Text before image, always.** Every scene opens with a title block —
   `<div class="mark">` = eyebrow (`.k`) + `<h2>` + deck (`.sub`) — and the `<figure>` comes AFTER it.
   ⛔ A scene must never open cold on a picture.
2. **Never two images adjacent.** Prose or a title block always sits between them. This is what
   made emphasis bursts read as though they belonged to the NEXT scene.
   ⚠ Bursts sit inside the following scene's wrapper div, so anchor insertions on the
   `<figure ... aria-label="Scene NN">` element, not on the wrapper.
3. **No image used twice on one page**, and near-identical images (same room, same outfit,
   same angle) count as the same image — Ali rejected two different desk stills for this.
4. Vary the register: scene still → emphasis word-burst → concept card. 16 bursts + 4 concept
   frames exist for Ep4; the article ran on scene stills alone until 2026-07-21.
5. The eyebrow lives in the title block only — it was removed from the ID cards to stop it
   printing twice in one screen.

Verify mechanically: no `IMG` immediately followed by `IMG` in document order.

## INTRO — Ali's cut notes, 2026-07-22 (watching the v1 export)
- ⛔ **The THIS WEEK 4-panel teaser is OUT of the intro entirely.** It was landing at 0:14 while the
  narrator was still on last week. Ali first asked to move it to 0:21, then decided it should not
  appear in the intro at all.
- **The Founding Mothers TITLE CARD carries the intro instead** — now 0:14 → 0:41.
- **The SUNNYVAiLE street** (`open-08-sunnyvaile-welcome`) came in too early at 1:39.
  **Must not appear before 1:42.** Moved.
- Cut is now **57 cues**.

🔴 **`episode-04-full-v1.mp4` is STALE** — it was exported before these notes. It must be rebuilt
from the current shot list and exported as `episode-04-full-v2.mp4`. `watch.html` still points at v1;
repoint it when v2 lands.

## 🌀 TIME-JUMP TRANSITION — approved 2026-07-22
Ali watching v1: *"up until this point there has been zero animation at all"* · *"it says lights go
soft and nothing happens"* · *"there should be a proper transition… not just a slide that says london
1843"* · *"like a swirl or something"* · **"yes era cards good."**

**The device — the stained-glass window is the portal.** She is looking up at Ada in glass; we go back
THROUGH it. Motivated by what is on screen, and it makes the LUMINAiRY the mechanism of the flashback.

**Full version, first jump only (into LONDON 1843):** lights go soft (must land ON that narration
line) → the rose window brightens as the hall dims → **🌀 swirl**, glow spiralling inward, colours
smearing into the vortex → bloom to white → **the era card resolves OUT of the light** → recede into
Ada's study.
**Short version, all later jumps:** swirl + bloom only, ~1.5s. Motif, not set piece.

- ✅ **ERA CARDS STAY** — confirmed. They stop being the whole transition and become its landing.
- ⛔ Supersedes the old "dip to black before each time-jump card."
- **This is an EDIT, not new art** — built from existing frames in CapCut, so it can land in v2.

⚠ Also logged: **the first 4 minutes have NO motion at all** — the first movement in the episode is
Ada's loop at 4:10. The staged Canva list was entirely historical-section; nothing in the opening.
The swirl partly fixes this, but the opening still needs ambient loops.

---

## BANNED-IN-CUT (machine-readable — the hook reads THIS block)
Any Bash/Edit/Write touching `episode-04-cues.json` is BLOCKED if it contains one of these
substrings. Add a line here and it is enforced immediately; delete a line to un-enforce.

```banned
ep04-open-15f-transformation-main-street
ep04-open-15b
ep04-open-15c
ep04-open-15d
ep04-open-15e
ep04-around-town-b-comic-v1
ep04-open-16-luminairy-approach-comic-v5-capital-I
grace-c-end-comic-v2-graphic-novel
grace-navy-office-v3-application-handoff
comic-barsetter
ep04-tj-joy-comic
ep04-tj-timnit-comic
ep04-tj-emily-comic
ep04-tj-kate-comic
p46-p49-modern-criticism-review-v1.mp4
```

Reasons, in order: wrong age (elderly admiral) · old generation · superseded pass ·
the last four are the per-woman time-jump cards Ali rejected FOR TIMING in favour of the
single 2018–2021 card · the derived p46–p49 review sequence is contaminated because it
contains the rejected Timnit card and is not an approved successor.

## TRAILER — ALL COMIC (Ali, 2026-07-22, do not re-ask)
- The "Welcome to SUNNYVAiLE" trailer (16:07, 32 beats, town-building tour) is redone **ALL COMIC**.
- **All 17 buildings get redrawn in comic/pop-art** for the trailer — corporate painterly y2k renders are NOT used here.
- ⛔ I asked twice whether she meant comic buildings vs keep-painterly. She said COMIC both times. Do not re-open. The buildings-stay-painterly note does NOT apply to the trailer.
- Pipeline: generate 32 comic building frames (3 exist) → forced-align timing → animation brief → assembly → clean export → wire.

## Transformation cue 13 — POINTED AT THE BANNED FRAME (root cause, fixed 2026-07-22)
- The cue sheet's cue 13 `src` had stayed `...15f-transformation-main-street-clueless-v7...` (BANNED).
  Every assembly built from the cue sheet grabbed the Main-Street reveal, not the abstract stage.
  The 15f→15p swap had only ever been made in the ffmpeg build script, never in the cue sheet.
- FIXED: cue 13 src → `ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png`.
  Assembly uses the clip `ep04-open-15p-transformation-comic-event-v1.mp4` (corporate → cloud → reveal).
- Lesson: fix the SOURCE OF TRUTH (cue sheet), not just a downstream script. Caught by WATCHING v5.

## EP4 FINISHED — v6 is authoritative (2026-07-22 ~23:00)
- `assets/video/episode-04-full-v6.mp4` (= Codex delivery `delivery-20260722-ep04-v5-brief-correction/`), wired in `watch.html`.
- Full animation pass: 45 motion sources, opening animates, all hard-cut checks pass.
- Transformation = abstract stage (corporate → magic cloud → reveal), NOT Main Street.
- Title at 0:37, no burned captions, 20:22.40. Verified by watching, not just the QC report.
- QC tools that now exist: `operations/tools/check-hard-cuts.py`, `measure-motion.py`, `motion-heatmap.py`.
- Reusable weekly template: `operations/codex-prompts/ep04-animation-and-assembly.md` (per-beat Seedance + assembly).

## Opening: THIS WEEK teaser was NEVER WIRED (fixed 2026-07-22)
- The recap (open-01) held 0:00→title because open-02-thisweek-teaser was never in the cue sheet
  (it jumped open-01 → open-03-title). So the "previously" image sat through the "on this episode"
  narration. Ali caught it on the first frame of v6.
- FIXED: inserted `ep04-open-02-thisweek-teaser-comic-v3-grace-fix-1920.png` at t=19.0 in the cue
  sheet (now 58 cues). recap 0-19 · THIS WEEK 19-37 · title 37+. Assembly add-beat prompt:
  `operations/codex-prompts/ep04-add-thisweek-beat.md`. ⚠ Grace in the teaser is the white-haired
  admiral (older) — Ali to eyeball; she said "leave her in uniform."

## EP4 v7 — FINISHED with the opening fix (2026-07-22 ~01:30)
- v7 = v6 with the THIS WEEK teaser spliced into the 19-37s gap (ffmpeg overlay; audio stream-copied).
- Opening now: recap 0-19 · THIS WEEK teaser 19-37 · title 37 · desk 41. Verified by watching.
- All animations intact (transformation/moth/wall/splash confirmed post-re-encode). Wired in watch.html.
- Cue sheet corrected: teaser at t=19, title at t=37.1 (the earlier "re-snap" had never persisted — fixed).
