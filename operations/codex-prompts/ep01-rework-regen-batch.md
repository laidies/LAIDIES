# Ep1 — REWORK RE-GEN BATCH (hand to Codex)

Two fixes from Ali's review, applied across the SUNNYVAiLE scenes. Re-gen from the existing frame — keep
composition, pose, outfit (Carrie tutu + clips), keeper (JoJo), setting, world. Change ONLY the two items below.
Carry the full 7-point guardrail block.

**Output dir:** `assets/episodes/ep-01/pixel/delivery-20260719-master-v1/` · same base filename + `-v2-fix`.

## FIX 1 · iBook clamshells only (Ali: "iBook clamshells only")
Any laptop/computer shown in a SUNNYVAiLE scene = a colorful **iBook G3 clamshell** (rounded, translucent
handle-top, Y2K). ⛔ No modern MacBook / flat thin laptop / flat-screen in town (guardrail #7).

## FIX 2 · caption boxes = proper comic treatment (Ali: "that text box is not good enough")
Any narration caption baked onto a scene = a **styled COMIC caption box** (comic lettering, a caption
box/banner with energy — per `operations/reference/font-and-text-emphasis/`), ⛔ NOT a plain typed white
rectangle (guardrail #6).

## Scenes to check + re-gen where they apply
- **`ep01-blend-snap-win-a-start` / `-c-end`** — CONFIRMED: modern laptop + plain caption box → both fixes. (Café, JoJo present, Carrie tuto, clock-tower window all stay.)
- **`ep01-blend-snap-arrival`** — check: if a laptop shows → iBook; any caption → comic box.
- **`ep01-try-on`** — the "three tabs / same task" beat: any laptop/computer → iBook clamshell; caption → comic box.
- **`ep01-new-hire`**, **`ep01-under-the-hood`** — check for a modern device / plain caption; apply the two fixes if present.
- (Any other Ep1 SUNNYVAiLE scene with a laptop or a caption box gets the same two fixes.)

QC on delivery: no modern laptops in any town scene; no plain typed rectangles for captions; iBook clamshells throughout.

---

## ⏳ RE-GEN — Ali's keeper review 2026-07-20 (2 beats rejected; everything else in Ep1 approved)
Carry the full 7-point guardrail block + anti-drift spec (bold inked comic contour, hard sculptural shadow planes,
NO glamour-cartoon, NOT painterly) on both. Output to the master dir, base name + `-v5-fix`.

### A · `ep01-new-hire` (S19) — REJECTED: "none of these make sense — why is the barista beside her with paper."
- The bug: the "new hire" figure reads as **JoJo the café barista** (and is holding paper), so the metaphor collapses.
- CANON INTENT (from master): the "new hire" is the **AI-as-eager-assistant** — a dazzling, superhuman-range,
  astonishing-speed, brilliant-but-zero-lived-judgment **assistant** the heroine is calmly onboarding/managing.
  It is NOT the barista and NOT a café scene.
- RE-GEN: the heroine (SUNNYVAiLE Carrie-tutu look, butterfly clips) calmly managing a **distinct, clearly-not-JoJo
  eager brilliant assistant figure** surrounded by a stack of scary-good first drafts — superhuman speed, no judgment.
  ⛔ No barista, no Blend & Snap counter, no loose paper handed to her. Caption (comic box): *"The most talented new
  hire you'll ever manage. And you've done this all before."* Face ref: heroine kit. Style ref: Timnit set.
- Out: `ep01-new-hire-comic-v5-fix.png`.

### B · `ep01-next-week` (S31, NEXT-WEEK-ON shell) — REJECTED: "the scroll text on the top? no. completely not the style."
- The bug: a **scroll/banner text ribbon** across the top — off-style, reads like a plain typed banner, not comic.
- CANON: this is the **"NEXT WEEK ON"** teaser for Ep2 ("Tell Me What You Want" / **David Rose**, Ep2 patron saint).
  Face ref: `assets/saints/y2k-stained-glass-v2/david-rose-y2k-stained-glass.png` (face only — comic ink).
- RE-GEN: proper comic **"NEXT WEEK ON"** treatment — a bold comic title-card / burst lettering (per
  `operations/reference/font-and-text-emphasis/`), a David-Rose-energy tease. ⛔ No scroll ribbon, no plain
  typed banner across the top. Match the locked graphic-novel style (this is one of the 4 style modes, not a UI banner).
- Out: `ep01-next-week-comic-v5-fix.png`.
