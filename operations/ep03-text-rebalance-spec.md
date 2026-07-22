# Ep3 — TEXT REBALANCE SPEC (Ali greenlit 2026-07-19)

Problem: Ep3 = ~29 text-on-card frames vs ~30 scenes — a wall of reading, formats not alternating.
Goal: scene-led rhythm, ~29 text frames → ~8, same teaching. Nothing here changes the canon/script; it
re-balances which beats are STANDALONE text cards vs taught-in-scene vs a collectible card.

## 1 · CONCEPT CARDS → move to the Study Pack DECK (out of the episode frame run)
The 6 concept cards are the collectible Concept deck ([[concept-card-deck-redesign]]) — they don't need to run
as back-to-back frames in the video/article. The episode TEACHES each concept in its existing scene; the card
lives in the Study Pack.
- `concept-hallucination` → taught in the **Burn Book scene** (beat 4). Card → deck.
- `concept-assumption` → taught in **"she doesn't even go here"** (beat 7). Card → deck.
- `concept-draft` / `concept-claim` / `concept-receipt` → taught in **Cher's-closet three-piles** (beat 9). Cards → deck.
- `concept-verification` → taught in the **Elle-file** scene (beat 8). Card → deck.
Result: 6 standalone frames removed from the episode; they become the Study Pack Concept pack.

## 2 · METHOD cards (4) → ONE comic-book PAGE
`method-move1 / move2 / move3 / rule` (beat 12, "Prompt Like Elle") → a single multi-panel **comic PAGE**
(the 3 moves as panels + the rule as a footer banner), not 4 separate text frames. One frame instead of four.
- Out: `ep03-method-prompt-like-elle-comicpage.png`

## 3 · COMPARISON (3) → ONE comic PAGE (or integrate into the demo scene)
`compare-01-notes-input / 02-flat-way / 03-fluent-way` → one **before/after comic page** (flat vs fluent, side
by side), not 3 text frames. Out: `ep03-compare-flat-vs-fluent-comicpage.png`.

## 4 · EMPHASIS (13) → keep ~3 standalone, INTEGRATE the rest into their scenes
Bake most emphasis lines INTO the scene they belong to (speech bubble / caption / SFX baked on the art), per
guardrail #6 + the fontref word-burst styles — so they punctuate a scene instead of being their own frame.
- **KEEP standalone** (the biggest hits, as word-bursts): `emph-says-who`, `emph-burn-book-problem`,
  `emph-judgment-stayed-yours` (the sign-off-adjacent line).
- **INTEGRATE into their scene** (as bubble/caption/SFX, drop the standalone card): `churn-butter` (beat 6 scene),
  `doesnt-go-here` (beat 7 scene), `draft-outfit` (Cher's closet), `chutney-elle` (Elle-file / thrice scene),
  `fake-citation` / `peer-reviewed` / `same-handwriting` / `sources-attached` (the verification scenes),
  `maybe-lanyard` / `claires-headband` (their scenes).
Result: 13 emphasis frames → 3 standalone + the rest living inside scenes.

## 5 · KEEP as-is (recurring shells)
`open-03-title`, `cocktail`, `signoff`, `tryon-rule` (after its bar fix). These are the show's fixed beats.

---
## Net result
Text-only frames in the episode run: **~29 → ~8** (title · cocktail · sign-off · tryon-rule · method-page ·
compare-page · 3 emphasis bursts). Concept cards live in the Study Pack. The sequence now alternates
scene → punch → scene instead of text-text-text.

## To execute
1. Codex: build the 2 new comic PAGES (method, compare); integrate the ~10 emphasis lines onto their scenes
   (re-gen those scenes with the lettering baked in, per R6).
2. Claude: when wiring `issues/issue-03.html` + the video cue order, drop the 6 concept cards + the ~10
   now-integrated emphasis frames from the run; point the Study Pack at the Concept deck.
3. Re-check the frame sequence alternates formats before locking.
