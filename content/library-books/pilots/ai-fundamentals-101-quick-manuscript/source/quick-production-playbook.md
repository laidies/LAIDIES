# LAIDIES Book Production Playbook
### The complete process for producing a LAIDIES LIBRAiRY textbook — from first draft to ship.
*Consolidated from AI Fundamentals 101 production (Aug 2026). Reusable for all future books.*

---

## How This Doc Works

This is the single reference for anyone (human or agent) producing a LAIDIES book. It captures:
- The teaching method (how to write a chapter)
- The structural requirements (what every chapter must contain)
- The QA pipeline (what to check after drafting, in what order)
- Anti-patterns caught and fixed (things that went wrong and how to prevent them)
- The voice rules (how it should sound)

Load this doc + `ali_writing_style_reference.md` + `REFERENCE-CLOSET.md` before writing any chapter.

---

## PHASE 1: DRAFTING

### The Teaching Method — ADEPT (BetterExplained)

For each major concept, teach in this sequence:

1. **A — Analogy.** Start with something she already knows.
2. **D — Diagram / mental picture.** A simple visual or spatial image.
3. **E — Example.** A concrete, *true* case. Concrete before abstract.
4. **P — Plain-English description.** Say it with no jargon. Plain language is the *test*, not the garnish.
5. **T — Technical / precise version.** Only now introduce the exact term. Jargon is earned, never leading.

### Structural Rules

- **Open on a vivid, specific scene or real question** — never a definition.
- **Intuition before formula; "why" before "what."**
- **One idea at a time, each resting only on what came before.** No forward references.
- **Honest over crisp.** Where the real answer is "it's blurry," say so.
- **Check comprehension.** End sections with a "sort these / try this."

### Drafting Cadence

**One chapter at a time. Not in batches.** Each chapter gets full individual attention before moving to the next. This prevents quality degradation from doing too much at once.

### What Textbook Chapters Cover (vs. Big Picture Articles)

Textbook chapters are factual and mechanism-focused:
- How it works mechanically (the step-by-step)
- Who/what makes current decisions, how it works now
- What gaps exist in the current system
- Practical limitations explained mechanically

They do NOT cover: philosophical arguments, "should we" questions, future speculation, opinion, or advocacy. Those belong in Big Picture articles.

---

## PHASE 2: STRUCTURAL REQUIREMENTS

Every chapter must include ALL of the following:

### Required Elements

| Element | Description |
|---------|-------------|
| Learning objectives | "By the end of this chapter, you will be able to..." (3–6 items) |
| Key Terms table | Term + plain English definition, at chapter start |
| Section numbering | X.1, X.2, X.3 format |
| ⏸️ Pause boxes | Anticipate reader's "but wait..." questions. At least one per chapter. |
| 🏆 Landmark Moment boxes | Where a real historical event maps to the concept just taught. Not every chapter — only where natural. |
| Step-by-step walkthroughs | At least one numbered mechanical walkthrough per major concept |
| Concrete analogies | At least one analogy grounded in reader's actual experience |
| Limitations explained | What it CAN'T do and WHY, mechanically — not hand-waving |
| Specific numbers | Make scale tangible (not just "billions" — say what it means) |
| "Try This" exercises | Practical activities the reader can do themselves |
| Key Terms Quick Reference | End-of-chapter recap block (📖 format) |
| "Where you are" / cumulative progress | Shows how this chapter connects to the arc |
| "What's Next" bridge | Earns the next chapter with a question |

### Units

Metric first, imperial in parentheses — e.g. "160 km (100 miles)", "21°C (70°F)". Applies wherever physical measurements appear. Readers are US + Canada.

### Visual Style

90s textbook aesthetic — bright colours, shadow boxes, retro motifs. (Applied in frontend/design, not in the markdown drafts.)

---

## PHASE 3: VOICE

### The LAIDIES House Voice

- First-person plural where natural ("we"), direct second-person ("you")
- Warm, conversational, practitioner energy — not explainer energy
- Smart friend who's in on it, not professor lecturing down
- Opinions allowed. Specific, landed jokes. Pop-culture refs for women 25–50.
- Vary sentence length hard. Long rolling sentence → short punch.

### Banned Patterns (the "AI tells")

- "Here's the thing"
- "The shift that changed everything"
- "Let's dive in"
- Em-dash overload
- Uniform short staccato cadence
- Performing-cleverness framing ("Four things. One word.")
- Any line that could open a generic AI article

### Rewind Era References

Every chapter should have at least one natural Rewind Era (1990–2010) pop culture reference from `REFERENCE-CLOSET.md`. Four criteria:
1. Widely recognizable (audience gets it quickly)
2. Maps to the actual concept (not just decoration)
3. Passes the taste filter (remembered/accessible/mainstream, not retroactive cool-girl credibility)
4. Doesn't interrupt the teaching flow

**Known failure mode:** References that feel forced or sprinkled in as afterthought decoration. The reference must *teach* — it replaces or strengthens an explanation, not ornaments one.

---

## PHASE 4: POST-DRAFT QA PIPELINE

Run these in order. Each gate must pass before moving to the next.

### Gate 1: Accuracy Check

**What:** Every verifiable factual claim cross-referenced against authoritative sources.

**How:** For each claim (dates, numbers, attributions, statistics, quotes):
- Verify against primary sources
- Rate: ✅ Verified / ⚠️ Needs Correction / ❓ Unverifiable
- Severity: 🔴 Critical / 🟡 Moderate / 🟢 Minor

**Anti-patterns caught in AI Fundamentals 101:**
- Unconfirmed leaks presented as fact (GPT-4 architecture — always caveat with "reportedly" / "never officially confirmed")
- Paraphrases presented as direct quotes (Tobi Lütke — always verify exact wording before using quotation marks)
- Outdated figures that were accurate at time of writing but aged (citation counts — use durable phrasing like "one of the most cited" instead of specific numbers that go stale)
- Ranges with unsourced bounds (training costs "$50–100M" when the floor was below all estimates — verify BOTH ends of a range)
- Framing that editorializies source material ("high estimate" when the source calls it their central projection)

### Gate 2: Readability Review (Beginner Perspective)

**What:** Read every chapter as a complete beginner — someone who uses ChatGPT/Claude casually but has zero technical background.

**Flag:**
1. Comprehension blockers — where a beginner gets lost
2. "Wait, what?" moments — mechanism explained but intuition doesn't land
3. Flow breaks — "how did we get here?"
4. Missing "so what?" — concept without connection to reader's experience
5. Pacing issues — too much detail or not enough time on something hard

**Anti-patterns caught in AI Fundamentals 101:**

| Pattern | Fix |
|---------|-----|
| Forward references (using a term before it's taught) | Rewrite with plain language or defer the concept |
| Math notation as jargon ("n² problem") | Replace with "grows explosively — double X, quadruple the work" |
| Numbers without intuition (petabytes, TWh, billions) | Always add a concrete comparison ("enough to power 45M homes") |
| Technical detail without permission ("do I need to memorise this?") | Add "you don't need to remember this — the point is..." |
| Orphaned editing fragments | Review start/end of every chapter for cut artifacts |
| Duplicate sentences/paragraphs | Search for repeated key phrases after edits |
| Pricing tables with unexplained model names | Add "these are specific products from different companies — what matters is the pattern" |
| ⏸️ boxes that go too deep for the moment | End with a takeaway sentence that grounds back to the simple version |
| Jokes/references that don't land without context | Make the connection explicit ("...the training data is being generated by the same kind of system") |

### Gate 3: Gold Standard Audit

**What:** Check every chapter against the full structural checklist (Phase 2 above).

**How:** For each chapter, pass/fail on all criteria:
- A1–A5 (Teaching mechanics)
- B1–B6 (Structural apparatus)
- C1–C3 (Voice & style)
- D1 (Units)

**Verdict per chapter:** GOLD (all pass) / NEAR-GOLD (1–2 minor gaps) / NEEDS WORK (3+ gaps)

**Target:** All chapters GOLD before ship.

---

## PHASE 5: SPECIFIC LESSONS FROM AI FUNDAMENTALS 101

### What Went Right (keep doing these)

1. **Story-first openings** — The best chapters open on a *scene* (2003 spam filter, January 2023 outage, agent that deleted files), not a definition. This immediately earned reader attention.
2. **⏸️ boxes** — Genuinely anticipating the reader's question ("But WHY can't it just...") before she has to ask it. These are consistently the highlight.
3. **Honest uncertainty markers** — "Nobody knows" / "this is genuinely debated" sections built more trust than fake-clean explanations.
4. **The hospital analogy (MoE)**, **Scrabble tiles (tokens)**, **sculpture (diffusion)**, **recipe (training)** — Analogies that are structural (they map to the mechanism), not decorative.
5. **Numbered walkthroughs** — 6-step RAG walkthrough, 8-step physical journey in Ch 17, code sandbox steps. These are the sections readers will return to.

### What Went Wrong (prevent next time)

1. **Editing artifacts accumulating** — After multiple edit passes, orphaned fragments and duplicate paragraphs appeared. **Fix: Always do a final "clean read" checking for dangling text, duplicated sentences, and orphaned fragments at chapter boundaries.**
2. **Accuracy drift from well-intentioned hedging** — Adding caveats sometimes created new inaccuracies (e.g., table row duplicated with one having caveat, one not). **Fix: After applying corrections, re-read the surrounding context to ensure consistency.**
3. **Forward references in early chapters** — Tokens and inference used in Ch 2 before they're taught in Ch 4/7. **Fix: During drafting, maintain a "terms introduced" tracker and never use a term before its introduction chapter.**
4. **Chapter 5 too long/dense** — The most technically demanding chapter trying to cover training loop + neural networks + attention + transformer + scaling laws in one pass. Reader fatigue risk. **Fix: Consider splitting the heaviest chapter if it covers 5+ major concepts.**
5. **Rewind Era references too sparse** — Shipped with almost none woven in. The attempts that were made felt forced. **Fix: Reference pass is a separate creative step AFTER the teaching content is solid — not during initial drafting. Map references to concepts first, get approval, then weave.**
6. **Numbers going stale** — Citation counts, cost estimates, and market share figures date within months. **Fix: Use durable phrasing ("one of the most cited" vs. "168,000 citations") for volatile numbers. When precision is needed, include a "(as of [date])" qualifier.**

### The Chinchilla Rule (named after the insight from Ch 5)

A chapter can be "under-trained" — too much structural capacity (topics listed) for the amount of explanation given. If a section introduces 4+ new concepts in rapid succession without giving each one a proper ADEPT treatment, it's under-trained. **Slow down. Give each concept its own space. It's better to cut a concept to a later chapter than to rush it.**

---

## APPENDIX: THE QA PIPELINE IN ONE PAGE

```
DRAFT (one chapter at a time, ADEPT method, story-first opening)
  ↓
SELF-CHECK (structural apparatus complete? All elements present?)
  ↓
GATE 1: ACCURACY (every claim verified, sources checked)
  ↓
GATE 2: READABILITY (read as a beginner — flag blockers, jargon, pacing)
  ↓
GATE 3: GOLD STANDARD AUDIT (full checklist, all criteria pass)
  ↓
CLEAN READ (catch orphans, duplicates, editing artifacts)
  ↓
REFERENCE PASS (Rewind Era references mapped and woven in — separate step)
  ↓
SHIP
```

---

*Last updated: August 16, 2026*
*Source: AI Fundamentals 101 production — 20 chapters, 3 QA passes, 39 corrections applied.*
