# Ep1–3 — TARGETED FIXES (hand to Codex) · 2026-07-21

> **PATH ROOT:** `assets/...` relative to `Website-homepage/`.

**These are FIXES, not regenerations.** Each image is approved on composition, character, wardrobe and
colour. Change ONLY what is listed. Do not re-stage the shot, do not alter the character, do not
re-render from scratch — Ali picked these frames precisely so we don't lose what already works.

Output alongside the original with `-textfix` appended. Keep 16:9 and the source resolution.

---

## The pattern: the text boxes are the problem
Four of the five fixes are the same complaint. **The caption boxes and speech bubbles are ugly and
should come off.** The article now carries its own title blocks and captions in HTML, so baked-in
text boxes are redundant *and* worse-looking than the page typography.

Where text is removed, **repaint the area with the underlying scene** — do not leave a blank
rectangle, a smear, or a cloned patch. The result must read as a frame that never had a box on it.

---

### 1 · `assets/episodes/ep-01/**/ep01-steve-ovation-c-end-comic.png`
**Fix:** remove the text box, or make it not look terrible.
Ali's preference is removal — repaint the scene behind it.

### 2 · `assets/episodes/ep-01/**/ep01-blend-snap-win-c-end-comic-v4-style-fix.png`
**Fix:** the text box is ugly. Remove it and repaint the scene behind it.

### 3 · `assets/episodes/ep-01/**/ep01-burn-book-regina-comic.png`
**Fix:** remove the text box. Repaint behind it.

### 4 · `assets/episodes/ep-01/**/ep01-rsvp-cher-comic.png`
**Fix:** remove ALL text boxes and speech bubbles.
⚠ **Also a canon error, which is why the text must go rather than be rewritten:** the bubble
currently reads *"it says R.S.V.P. on the Statue of Liberty!"* and "R.S.V.P." is carved into the
statue's crown. The real line is **"It does NOT say RSVP on the Statue of Liberty"** — Cher's own
confident debate flourish that doesn't answer the question asked. The render states the opposite of
the caption beneath it. **Remove the bubble AND the lettering on the crown**; leave the crown plain.

### 5 · `assets/episodes/ep-02/**/ep02-scene-22-brief-new-hire-comic.png`
**Fix:** the laptop is a MODERN one. SUNNYVAiLE is perpetually 1999 — replace it with a
period-correct machine (chunky beige/translucent-plastic laptop or a CRT desktop). Change nothing else.
⚠ Ali also noted "there are better ones to use" — so this fix may be moot if a different frame is
chosen for that scene. **Confirm with her before spending a generation on it.**

---
## QC
- Only the listed change differs from the source. Everything else pixel-identical in intent.
- No blank rectangles, smears or clone-stamp patches where text was removed.
- No new text anywhere. No gibberish.
- Nothing on the Statue of Liberty's crown in #4.
