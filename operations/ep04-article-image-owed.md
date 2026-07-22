- **Slot 10 (Desk / modern return)** — the only candidate `ep04-scene-10-desk-comic-v1-fresh` is visually the SAME scene as slot 1 (cold-open desk). Ali 2026-07-20: "10 is the same image as 1." Owes a DISTINCT desk render — different angle / later mood / different action so it doesn't repeat the cold open. (md5s differ but composition is the same.)

## Video cue-sheet end beats (owed art)
- around-town (1128.0s) — OWES a proper around-town montage (Blend&Snap / High / KSVL / MAiKEOVER)
- sign-off (1156.0s) — OWES a dedicated sign-off card ('See you next Wednesday in Sunnyvale')
- next-time (1184.0s) — OWES an Ep5 'The Super Models' teaser card

## Time-jump card — Grace caption fix
- `ep04-tj-grace-comic-v1-exact-caption` shows only **"1952"** (year, no location) — inconsistent with the other 6 cards which are `PLACE, YEAR` (LONDON 1843 / HOLLYWOOD 1942 / PHILADELPHIA 1945 / DARTMOUTH 1956 / CAMBRIDGE 1972 / STANFORD 2012). Re-gen to add the location. ⚠ Location TBD by Ali: Grace was at Remington Rand, PHILADELPHIA in 1952 (A-0 compiler) — accurate but repeats the ENIAC card's city. Confirm the label before regen. Keep the same composition (1952 mainframe hall).

## Modern MAiVEN time-jump cards (owed — 4 new)
The historical women each get a PLACE, YEAR card; the modern MAiVENs continue the SAME timeline (Stanford 2012 → ~2018-2021) but have NO card. For consistency, owe 4 new establishing cards in the same caption style:
- Joy Buolamwini — MIT, ~2018 (Gender Shades) · her scene already shows MIT
- Timnit Gebru — GOOGLE, 2020 (the firing)
- Emily Bender — UNIVERSITY OF WASHINGTON, 2021 (stochastic parrots paper)
- Kate Crawford — place TBD (USC / AI Now / Microsoft Research), ~2021 (Atlas of AI)
⚠ VERIFY each exact year against a real source before baking on-screen (fact-verification-rule). Kate's institutional place needs confirming.

## ✅ RESOLVED — Slot 10 (desk) — REVISED
Narration is an explicit Ep1 callback: "the day it landed on your desk — the very desk you were sitting at three
weeks ago, feeling behind." → REUSE the Ep1 frame `ep01-couldnt-help-wonder-comic.png` (heroine at her corporate
desk, night, thought bubble "When did everyone learn to do that? And when, exactly, was I supposed to?").
No new render needed. Wired into the Ep4 cue sheet at t=843.8 (Ali 2026-07-20).
**REVISED (Ali 2026-07-20):** don't reuse the Ep1 frame — its thought bubble carries Ep1's line ("when was I
supposed to?") which is the wrong text for Ep4's narration. Ali: "just reuse the image episode 4 it's fine."
→ Slot 10 now uses `ep04-open-05-unease-comic-v1-face-lock-1920.png` (an existing Ep4 corporate-desk frame,
NOT the same file as the cold open). No new render owed.
**FINAL (Ali 2026-07-20):** unease frame rejected — wrong beat (that's her *before* the story). Slot 10 reuses
the cold-open desk frame `ep04-open-04-desk-comic-v1-face-lock-1920.png`; it matches the line "the day it landed
on your desk" and Ali accepted the repeat. No new render owed.

## Historical-scene SEQUENCE shots owed (locked style) — the long-hold fix
Each historical woman holds ONE image for 75–98s. Multi-shot coverage exists ONLY in pixel (and Grace's extras
are earlier-comic: barsetter / graphic-novel-v2). Per [[never-mix-style-generations]] these CANNOT be dropped in
as-is — they are composition reference only. Regenerate in the LOCKED (Timnit) register:
- Ada: a-start, b-mid, c-end · Hedy: b-mid, c-end · ENIAC: a-start, c-end
- Karen: b-mid, c-end · Fei-Fei: a-start, b-mid · Grace: extras redone in-register
⚠ **CARRY-FORWARD FIX — Grace navy/application shot:** the approved version is the **`-nophoto`** revision —
the application form has **NO photo on it** (it was deliberately removed, Ali 2026-07-20). Any regeneration of
that shot must keep the application photo-free; do not let the photo return.

## ⚠ GRACE AGE ACCURACY (Ali 2026-07-21)
Grace Hopper b. **1906** → at the A-0 compiler in **1952 she was 45**, and a **CIVILIAN senior mathematician**
at Remington Rand (joined Eckert-Mauchly 1949). The white-haired **Rear Admiral** is decades later — the
narration itself says it in future tense: *"She'd make Rear Admiral."*
→ Current Grace comic renders read as ELDERLY ADMIRAL = wrong age for the beat. Canva's younger Grace is more
canon-accurate. When Grace art is next touched: **mid-40s, civilian dress (not dress-uniform/admiral braid)**.
⚠ Also re-check the naval-office/application shot for the same issue (uniform + age).
Sources: Yale News "Grace Murray Hopper (1906-1992)"; ethw.org A-0 Compiler 1951-52.
