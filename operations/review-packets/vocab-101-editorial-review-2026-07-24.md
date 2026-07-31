# Vocab 101 editorial review

**Status:** DRAFT — architecture reset after owner review; not approved or deployed  
**Standard:** `operations/CONTENT-PUBLISHING-STANDARD.md`  
**Candidate:** `content/library-books/rendered/vocab-101.html`  
**Source:** `content/library-books/vocab-101.md`

## Reverse brief

- **Reader:** a smart working woman who has encountered an AI term in an
  episode, meeting or tool but does not want a technical glossary.
- **Question:** “What does that word mean in LAiDIES, and why do I need it?”
- **Promise:** recognize the term, recall the episode analogy, understand why
  it changes a decision and return to the full lesson.
- **Place in the system:** town-wide, alphabetical quick-reference book.
- **Canonical source:** AI-specific terms from Episode 1–4, classes and
  reference lessons. Appearance in an episode is not enough for admission.
- **Not this:** not the mechanics of how AI works; that belongs to Concepts
  101. Not a prompting procedure; that belongs to Briefing 101.
- **Admission gate:** AI must give the word a specialized meaning, readers must
  encounter it as AI jargon or it must name an AI-specific mechanism/state.
- **Continuation:** 23 named deep links across the 16 terms, landing on the
  relevant Episode 1–4 scene, Concepts 101 or Briefing 101 section, or exact
  Verification Rulebook move.

## Candidate contents

- Agentic AI
- AGI
- AI winter
- Context
- Context window
- Generative AI
- Grounding
- Hallucination
- Knowledge cutoff
- Model / large language model (LLM)
- Multimodal
- Prompt
- Reasoning model
- Retrieval
- Token
- Training data

Every entry now uses the episode's existing analogy and includes an exact,
visibly named LAiDIES continuation. Cross-reference labels identify the
destination before the click (`Concepts 101`, `Briefing 101` or the specific
episode) and then name the exact section. The book is arranged alphabetically
by term; the source episode appears inside the entry rather than controlling
the navigation. The
rejected generic “AI family” taxonomy, Assumption, Browser, Centaur, Source,
Verification, Citation, Algorithm, Compiler and unrelated computer terms are
absent. Those words may still belong in a method or computing-history lesson;
they do not belong in this AI vocabulary.

## Architecture correction — 2026-07-25

Ali identified that the Vocab/Concepts split was forcing the glossary either
to become too thin to be useful or to duplicate concept teaching badly. The
candidate is therefore no longer at Editorial Review.

The proposed correction is:

- Vocab becomes the alphabetical quick index and recognition layer.
- Concepts owns the canonical explanation once.
- A Vocab item carries only the plain meaning, the distinction to remember and
  a clearly labelled deep link.
- The canonical concept unit owns the mechanism, mapped analogy, analogy
  boundary, genuine reader stakes, separate practical move, worked example and
  all meaningful cross-references.

Agentic AI is the representative prototype. The rejected “Slayer on patrol”
line has been removed. Its concept now uses the existing Cher’s
closet-computer canon to map goal, tools, permissions and completed actions,
states where the analogy stops, separates `Why you care` from `What to do`,
and demonstrates the index-to-canonical-lesson journey. AGI is no longer
mislabelled as hypothetical. Its concept treats AGI as a real but contested
research objective, separates competing definitions from claims that a system
has crossed their threshold, and gives the reader an operational way to
interrogate the evidence.

Do not scale this pattern to the other fourteen terms until Ali rules on the
representative Agentic AI journey.

## Scorecard

**Superseded evidence only.** This scorecard was completed before the
Vocab/Concepts ownership reset. Its numeric result does not apply to the new
architecture and cannot upgrade this packet from DRAFT. The representative
Agentic journey must be ruled first; the rebuilt full book is scored only
after the approved pattern is scaled.

| Test | Score | Evidence / open issue |
|---|---:|---|
| Reader promise | 2 | Intro and alphabetical scope state the job clearly |
| Canon fidelity | 2 | Carrie Bradshaw, editors-in-chief, Burn Book, David Rose, cerulean and Fei-Fei come from Episodes 1–4 |
| Accuracy | 2 | Definitions are scoped; no volatile prices/features/model versions |
| Clarity | 1 | Significantly clearer, but Ali must read the complete sequence; Token has no full pop-culture analogy in current canon |
| Usefulness | 2 | Each term includes “Why you care” |
| LAiDIES teaching | 2 | Analogies do explanatory work and link to the exact deeper lesson |
| Information design | 2 | Alphabetical term index is visible in the left rail; puffy saves sit outside semantic headings and show only the reader's 10-sticker Closet pouch |
| Continuation | 2 | Twenty-three meaningful cross-references land on the relevant concept or exact scene; all 16 entries visibly name the destination and section before the reader leaves |
| Distinct job | 2 | Explicitly separates Vocab from Concepts |
| Experience QA | 1 | Loaded and read at 390px with no missing body; desktop recheck remains |
| **Prior total** | **17/20 — SUPERSEDED** | Predates the architecture reset; not a current pass |

## Verification

- `node scripts/check-inline-js.js` — PASS, 353 scripts / 132 pages.
- `node scripts/check-local-links.js` — PASS, 1,942 references / 110 pages.
- `node scripts/check-town.js` — PASS.
- Browser DOM: all 16 terms, analogies, “why you care” text and continuation
  links are present in the active reader.
- Browser destination proof: `Concepts 101 → “Agentic AI — acts”` changes the
  reader from Vocab 101 to Concepts 101 at the exact
  `3. Agentic AI — acts` heading.
- Browser label proof: all 16 entries use `Where to learn more`; each of the 23
  meaningful cross-references names its destination and exact section.
- Puffy picker browser proof: exactly 10 choices; the full approved 75-piece
  collection is managed in My Closet with All / Words & phrases / Things &
  icons filters and optional per-sticker purpose labels.
- Mobile visual pass: content is legible at 390px; no body failed to load.

## Still open

1. Ali rules on the representative Agentic AI journey and the proposed
   Vocab/Concepts ownership boundary.
2. Only after that ruling, scale the pattern to the other fourteen terms and
   produce a new full-book scorecard.
3. Complete desktop and mobile read-throughs on the rebuilt candidate.
