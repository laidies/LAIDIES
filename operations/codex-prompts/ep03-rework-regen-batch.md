# Ep3 — REWORK RE-GEN BATCH (hand to Codex)

## ✅ STATUS (verified 2026-07-20): only #4 (Chutney) is still owed.
- #1 `the-lie-caught` — ✅ already fixed (`-v2-fix`, black monitor back). No re-gen.
- #2 `cold-open` — ✅ already fixed (`-rebalance-v1`, black monitor back + correct caption). No re-gen.
- #3 `tryon-rule` — ✅ already fixed (`-v2-fix`, doubled-I bars gone). No re-gen.
- #4 `chutney-thrice` — ⏳ STILL OWED (text mismatch + bubbles + smug expression). Run this one.

Targeted fixes from Ali's review. Re-gen each from its existing frame (composition/pose/setting stay);
change ONLY what's noted. Carry the full 7-point guardrail block + the monitor rule below on every prompt.

**Output dir:** `assets/episodes/ep-03/comic/` · keep the same base filename + a `-v2-fix` suffix.

## ⛔ MONITOR RULE (applies to both screen fixes)
A monitor's BACK is a **solid dark/black panel**. The lit screen + any text exists ONLY on the FRONT (the side
the person is reading). ⛔ Never render a screen or text on the back/away-facing side. When the camera is behind
the monitor, the panel facing camera is black.

---

### 1 · `ep03-scene-01b-the-lie-caught` (motion beat: a-start / base / b-end)
- KEEP: composition, the heroine peering over the monitor, corporate look (navy, no clips — corporate-land), setting.
- FIX: on the frames shot from BEHIND the monitor (base, b-end), the panel facing the camera is the monitor's
  **back → make it solid black**, NOT a lit screen with text. The "the client approved a July rollout" text +
  glow live on the FRONT (facing her), not the camera side. `a-start` already reads correct — match its logic.
- Out: `…-comic-{a-start,-,b-end}-v2-fix.png` (keep all three frames, now consistent).

### 2 · `ep03-scene-01-cold-open-desk`
- KEEP: heroine corporate (navy suit, professional hair, **no butterfly clips** — corporate-land), office desk, city window.
- FIX: the monitor's **screen faces the heroine** (front toward her); the side we see reads correctly for the
  camera angle — never the screen rendered on the back. Present-day office = modern flat-screen is fine here (corporate-land).
- Out: `ep03-scene-01-cold-open-desk-comic-v2-fix.png` (+ its a-start/b-end frames if animated, all consistent).

### 3 · `ep03-tryon-rule` card ("THIS WEEK'S RULE")
- KEEP: the comic index-card / file-folder frame, the "THIS WEEK'S RULE" banner, the two lines
  *"I can use the draft. / I still check the alibi."*, comic lettering.
- FIX: **remove the pink vertical accent bars** in front of each line — they read as a doubled letter
  ("‖I can…" looks like "II can"). Either drop them entirely or move them clear of the first letter so the
  text reads clean.
- Out: `ep03-tryon-rule-comic-v2-fix.png`.

### 4 · `ep03-scene-11-chutney-thrice-montage` — text-scene mismatch (the keeper still has it)
- The 3-panel image is Chutney escalating her alibi (Legally Blonde perm-timeline bit). KEEP the 3 panels + her
  brown curly hair. **CHANGE the speech bubbles** (was "I was in the shower" ×3) to escalate:
  - Panel 1: **"I was in the shower."**
  - Panel 2: **"I was washing my hair."**
  - Panel 3: **"I was in the shower washing my hair."**
  (The point: elaborating the story doesn't make it true — you don't wash a fresh perm.)
- **EXPRESSION FIX:** Chutney is **SMUG / confident** here — she thinks she has an iron-tight alibi (before it
  collapses under the perm-timeline check). Current render has her anxious/worried → make her smug and sure of herself.
- **FIX: REMOVE the baked-on "Asking AI 'are you sure?' … Regina George … Burn Book … peer reviewed" text +
  the Burn Book graphic** — that line is about Regina/the Burn Book, not Chutney's shower. Either leave the
  montage clean, or add a caption about ITS point ("Say it three times. Still not checked.").
- The pulled line → its **own emphasis word-burst** on a **Regina / Burn Book** visual (pair with the beat-4
  Regina Burn Book scene), out: `ep03-emph-are-you-sure-regina-burnbook-comic.png`.
- Out: `ep03-scene-11-chutney-thrice-montage-comic-v3-textfix.png`.

---
Each prompt also carries: world-separation (#1), style/no-glamour-cartoon + inked comic line not painterly (#5),
comic lettering not plain box (#6), Y2K tech where SUNNYVAiLE (#7). QC on delivery: monitor back black, no
doubled-I, screens face the reader.
