# HANDOVER — SUNNYVAiLE High · Basics intro + "what to use it for" printout
**Date:** 2026-07-23 · **For:** Codex (and any agent picking this up) · **Status:** content approved by Ali; production not started.

This file is self-contained. Read it top to bottom and you can continue without the chat it came from.

---

## 0. TL;DR
We rebuilt the front of **SUNNYVAiLE High · The Basics**. The old opener (a "name the furniture / here's the box you type in" screen tour) was scrapped as condescending. In its place are **two short concept classes** that *explain the machine*, plus a researched **take-home printout** of what to actually use these tools for.

Everything below lives in `Website-homepage/operations/classes/`. All paths in this file are relative to that folder unless absolute.

**Three deliverables, all content-complete and Ali-approved. None are produced (rendered/filmed) yet.** Codex's job is the production, NOT rewriting the approved words.

---

## 1. Files & status

| File | What it is | Status | Codex's job |
|---|---|---|---|
| `basics-what-these-tools-are.CONTENT.md` | **Class A** teaching content (~8.4 min). What it is · what it's for (not just Google) · what it's made of (building blocks, context as hub) · what it means · getting-started on-ramp. | ✅ approved — **do not rewrite** | (later) needs a visual-beat sheet like Class B's, then render |
| `basics-how-it-works.CONTENT.md` | **Class B** teaching content (~6.5 min). What "LLM" means · how it learns · how it answers (predict **and reason**) · why one engine does everything · plausible≠true. | ✅ approved — **do not rewrite** | render the visual beats (below) |
| `basics-how-it-works.VISUAL-BEATS.md` | **Class B beat→visual sheet.** Every teaching beat paired with the diagram it needs + the MUTE TEST. 3 beats need light motion, 8 static. | ✅ approved | **render each frame** (see §5) |
| `what-to-use-it-for.PRINTOUT.md` | **Take-home cheat sheet.** 33 researched, vetted uses (15 work / 18 home), a work "check its work + approved-info-in" note, a home "share what you're comfortable with (no fear-mongering)" note, a habits block, one honest line, reputable sources. | ✅ content-complete | **design + render** the printout (see §5) |
| `_superseded/` | Every rejected draft, with a README explaining why each died. | archived | **ignore** — never treat as current |

The `_superseded/` folder holds: the furniture-tour script (`CLASS-01-what-it-is-FOR-REVIEW.md`), the combined single-class intro (`basics-01-intro.CONTENT.md`), the rejected episode-style narration essay (`basics-01-intro-what-it-can-do.NARRATION-DRAFT.md`), and the old content doc with rejected examples (`BASICS-CLASS-01-content-LOCKED.md`). **Do not resurrect any of these.**

(`CODEX-REVIEW-basics-01-intro.md`, `_CODEX-REVIEW-basics-01.md`, `_AUDIT-basics-01-claude.md` are review/audit artifacts from an earlier single-class version — historical, superseded by the split. Not needed to continue.)

---

## 2. The direction (why these exist, and the shape)

- **Two concept classes, not one.** They were one ~11-min class; split because each half stands alone: **A = what it is & what it's for**, **B = how it works**. Each ~5–8 min.
- **These are CONCEPT classes.** There is **no software screen to record** — so they are **illustrated explainers**, produced like the episodes (stills/short loops assembled to video, town comic/pop-art palette, Heroine as the VOICE), NOT screen recordings.
- **Two production tracks going forward:**
  - **Concept classes** (these two, + the conceptual Foundations) → illustrated explainer.
  - **Tool classes** (ChatGPT tour, memory, files, etc., built later) → screen recording of the real app + signaling/zoom.
  Both narrated by the Heroine so they feel like one show.
- **The printout** is the companion take-home — the "what it's for" made concrete and pin-up-able. It doubles as the payoff for the class and a standalone asset.

---

## 3. 🔴 LOCKED rules — do not violate these in any render, caption, or edit

**Teaching content is APPROVED. Do not rewrite it.** If a caption or on-frame text is needed, pull it verbatim from the content files; do not paraphrase into new teaching.

**Voice / copy (applies to any text you render):**
- Plain, warm, never condescending. No hype, no tech-bro ("disrupt/10x/game-changer"), no influencer-hustle ("stop scrolling").
- **AI is always "it"** — never "she/her", never personified (it *produces / predicts / flags*; it does not *think / want / understand / know*).
- **"AI" is always both capitals.** Lowercase `Ai` ONLY inside brand words (LAiDIES, SUNNYVAiLE, LIBRAiRY…).
- Banned phrasing: false-exclusivity ("the thing nobody teaches", "…nobody likes"), "the whole [x]", "here's the thing", "the most important thing".
- **Never teach out-of-date AI.** No model version numbers or cutoff dates baked into the render (they rot). The content already reflects two currency fixes: it's **not "just an LLM"** (there's an assistant/chat layer on the raw model) and **not "just predictive"** (reasoning models work a problem through before answering).
- Say **"class"**, never "lesson/chapter/course/module".

**No prompting.** These classes are NOT about how to phrase asks (that's Episode 2 / the prompting class). Do not add "type it like this" content. The printout is USES, not prompt templates.

**Two nouns:** the **tool** (the app) vs the **model** (the engine). Never blur them.

---

## 4. 🔴 The rule for the class VISUALS — the MUTE TEST
Every class frame must be a **mechanism diagram**, not a scene:

> Freeze the frame, cut the audio. **Does the picture alone still teach the concept?** If yes → keep. If it only sets a mood, or is the Heroine standing in a scene → it's an episode panel → **reject.**

- **No Heroine-face renders in the concept classes.** She is the voice. The frames are the engine, the room, words, dials, side-by-sides. (This also sidesteps the #1 episode-art failure: off-model faces.)
- Town **comic/pop-art palette** for coherence, but the frame's JOB is to explain, not to depict a story.
- Render **text in-generation** (per the Codex text rule) — never post-apply labels.
- **Curate exact reference images per prompt; one frame at a time** (batching collapses into template sameness).

---

## 5. Codex's actionable production tasks (in priority order)

**Task 1 — Design & render the printout** (`what-to-use-it-for.PRINTOUT.md`).
- A comic/pop-art **cheat sheet** worth pinning up — At Work / At Home, grouped, scannable. Currently proofed as a 2-column card; a single flowing list is also acceptable — Ali's format call is still open, so produce the 2-column card first.
- Keep the two safe-use callouts (work "check its work"; home "share what you're comfortable with") visually distinct (they carry the caution).
- All copy verbatim from the file. Title, groups, 33 lines, habits block, honest line, sources.

**Task 2 — Render Class B's visual beats** (`basics-how-it-works.VISUAL-BEATS.md`).
- 11 frames. **8 static diagrams**, **3 short motion loops** (2–4 s each): #5 the learn-loop (guess→wrong→nudge dials→repeat), #6 predict-building (answer assembling word-by-word with the candidate bar), #7 reason-vs-blurt (side by side).
- Each frame's teaching job + mute-test acceptance is written in that file's table. **QC each against the mute test before it ships** — that IS the calibration anchor.

**Task 3 — (needs Ali/agent first) Class A visual-beat sheet, then render.**
- Class A has no beat→visual sheet yet. Build one the same way as Class B's (mute-test diagrams; e.g. tool-vs-model app-with-engine, the room filling with pipes feeding in, Google-retrieve vs generate, "what it's for" grid, the getting-started **action card**: three addresses / "free — no card" / "give it one real thing"). Then render.

**Later (not yet):** narration recording (Heroine voice, per the audio format + narration-timing-map for sync), then assemble stills+loops into the explainer videos; register bookkeeping to front these two classes and retire the furniture period-1; then the tool-specific screen-recording classes.

---

## 6. Tried & REJECTED this session — do NOT redo
1. **An episode-style narration essay** (a letter scene, a Grace-Hopper musing, warm VO). Verdict: "episode 1 but worse, not a tutorial, teaches nothing."
2. **A screen-recording "watch me do a task"** (paste a letter → get a plain read) for the concept class. Verdict: "we don't need it to read a fucking letter."
3. **A before/after "vague vs specific" demo** (empty room vs full room). Verdict: "that is verging into prompting."
4. **Visuals that are scenes / the Heroine in a scene.** Fail the mute test.
5. **Teaching it as "just autocomplete" / "just an LLM."** Both are out of date — reasoning + the assistant layer are in the content now; keep them.

The through-line: for these classes, **usefulness comes from explaining the machine** (what it is, how it works, what it's for, **why it's different** — general-purpose, generative-not-retrieval, learned-not-programmed), never from a task demo or prompt craft.

---

## 7. Pointers
- **Phrasing gate:** the class-script checker at `operations/tools/check-class-scripts.py` validates the timecoded `*.script.md` shot-list format (banned phrasing, personification, stale-AI, runtime). The content `.md` files here are prose, not shot-lists — when these become shot-lists/narration, run them through it.
- **Related canon/memories** (for the human, not needed by Codex to render): the two-nouns rule, the magazine-umbrella analogy, the comic/pop-art art direction, the currency rule, and the Codex scope contract (`AGENTS.md`: no git, don't clobber approved originals, don't rework site/canon unasked).
- **Painpoints logged this session:** #31 (teaching copy that sounds like teaching but is hollow → adversarial vet before Ali sees it) and #32 (recover a partially-failed workflow from its journal instead of re-running) — in `operations/painpoints-log.md`.
- The browser reading-views used during review were session-temporary previews; the source of truth is the `.md` files listed in §1.
