# Concept Cards — Teaching Map (the study-set spine)

Purpose: each concept card is a fun, tradeable **memory aid** for ONE key teaching from its
episode. This doc is the source of truth for the card TEXT (title · one-line takeaway · try-it
prompt) that Claude writes into `card-packs.json` at wiring time. Art is briefed separately in
`operations/codex-prompts/concept-cards-episode-scene-batch.md`.

Teachings are grounded in the actual articles (`content/issues/issue-0N.md`,
`issues/issue-0N.html`), not invented.

---

## Episode 1 — "On Wednesdays We Use AI" (start small, keep judgment)

| Card id | Teaching | Takeaway (on card) | Source scene |
|---|---|---|---|
| `issue01-open-the-tab` | The first try should be small | "You don't need a 40-hour course. Open the tab and give it one real ten-minute task." | `episode-01-what-like-its-hard` |
| `issue01-small-sips` | Tiny experiments, sustainably | "Small sips, big moves — ten useful minutes beats a fantasy weekend course that never comes." | *new render, Ep1 desk world* |
| `issue01-cher-closet` | AI isn't "Google in a blazer" | "It drafts, summarizes, compares, and turns messy notes into a usable first pass." | `…inline-image-03` (Ugh! As if!) |
| `issue01-judgment` | Keep your human judgment | "The machine helps. You still decide what's good enough to leave your laptop." | `…inline-article-image` (SEND IT) |
| `issue01-room` | Bring the embarrassing question | "Bring the AI question you're too embarrassed to ask at work to the room. Beats a solo spiral." | `…inline-image-02` (GIRL TALK) |

## Episode 2 — "Tell Me What You Want" (prompting = delegation)

| Card id | Teaching | Takeaway (on card) | Source scene |
|---|---|---|---|
| `girl-power` | Prompting is delegation, not code | "Tell it what you want, what you really really want. You already know how to brief." | `issue02-coffee-order` |
| `specificity` | Brief AI like a smart new hire | "Name the audience, tone, length, and what to leave out. Be David Rose about it." | `issue02-david-rose-specificity` |
| `context` *(was `receipts`)* | AI has never met you | "It doesn't know your meetings. Spell out the context every time — until you've built the relationship." | `issue02-dont-pull-a-cher` |
| `rewrite-remix` | Same task, better ask | "Vague prompt → word salad. Specific prompt → NAILED IT. The variable is you." | `issue02-its-britney-bitch` |
| `try-on` | Practice beats saving the article | "Run one real task twice — lazy version vs. David Rose version — and compare." | `issue02-tryon-homework` |

## Episode 3 — "The Burn Book Problem" (sounds right ≠ is right)

| Card id | Teaching | Takeaway (on card) | Source scene *(confirm vs Ep3 scene images)* |
|---|---|---|---|
| `issue03-burn-book` | Finished-looking ≠ verified | "Unsupported info can look just as finished as supported info. Confidence isn't a receipt." | `section-burn-book-problem` |
| `issue03-receipts-check` | Verify before your name goes on it | "Before it borrows your name, check three claims: a name, a date, a number, a quote, or a link." | `section-try-on-receipts-pass` |
| `issue03-chutney-detail` | One fragile detail breaks the story | "Be Elle with the timeline, not Chutney on the stand — find the detail that can't survive a second look." | `section-chutney-thrice` |
| `issue03-high-stakes` | Draft vs claim | "A draft is an outfit; a claim is an alibi. Check the dress code before it leaves your laptop." | `section-dont-pull-a-cher` (Ep3) |
| `issue03-elle-prompt` | Prompt Like Elle (give boundaries) | "Answer only from what I gave you, mark anything unsure, and never invent a receipt." | `section-show-your-work` |

**Ep 3 is teaching-rich** (7 article beats, 8 section scenes). The 5 above cover the core; unused
scenes `section-wrong-room` ("she doesn't even go here" — right-sounding, wrong context) and
`section-trust-layers` are natural **growth cards** if Ep 3 wants a 6th/7th later.

---

## Episode 4 — "The SLAiYER Handbook" — DIFFERENT (see rec below)

Ep 4 is not a narrative episode; it's a **vocabulary + field guide** in the celestial grimoire
register (Buffy-coded). It already ships per-concept art: Part I vocabulary emblems
(`ch1-emblem-prompt/model/training-data/context-window/hallucination`), Part II a model-type
"bestiary" (`ch1-plate-generative-witch/reasoning-watcher/agentic-slayer/agi-prophesied`), Part III
briefing-rule emblems (`audience/constraints/ask-first/use-files/check-output/iterate/…`).

**Recommendation:** Ep 4 becomes its OWN grimoire "Field Guide" sub-deck, built from those existing
emblems — NOT photographic, NOT mixed into the Ep 1–3 story deck. Rationale:
- Its cards should track its own register (celestial), same rule as Ep 1–3 tracking theirs. Register
  = episode identity, so a two-look deck is a feature, not the old "undesigned" mixing.
- The art already exists → little/no new rendering.
- It re-teaches vocabulary Ep 2–3 introduced (prompt, context, hallucination), so keeping it a
  separate **reference/field-guide tier** avoids double-carding the same concept in two decks.
- No render dependency → safe to DEFER until the Ep 1–3 photographic deck ships, then decide the
  exact Ep 4 card list + whether it ties to the glossary/The Decoder.
