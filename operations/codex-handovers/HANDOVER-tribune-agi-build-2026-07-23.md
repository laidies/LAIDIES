# HANDOVER — Idea-logging + Tribune build — session 2026-07-23

**Purpose:** hand this to Codex so it can pick up seamlessly. Everything below is either DONE (with file paths), DECIDED (with rationale), or PENDING (with who owns it). Nothing in this session was published or committed — it's all drafts + research for Ali's review.

---

## 0 · TL;DR + IMMEDIATE NEXT ACTIONS

This session did two things: (a) logged new ideas into `IDEAS.md`, and (b) built the raw material + a first draft for a **NewsStand "Tribune" article on General AI (AGI)**, plus deep research for two more topics that turned out to be **already covered** on the site.

**Next actions, in order:**
1. **Finish the AGI Tribune piece** — draft exists at `outputs/overnight-2026-07-23/tribune-drafts/agi.md`. Lock the 2 verify-flags (see §4), convert to the `newsstand-stories.js` object shape, run the gates, → Ali approves to publish.
2. **Do NOT write "jobs" or "bubble" Tribune pieces** — both are already covered in the `straight-answers` LIBRAiRY book + Chamber of Receipts. Instead **freshen** those existing entries with the 2026 numbers (see §5).
3. Leave all "PENDING ALI" items (§8) for Ali — Codex does not decide those.

**Read before touching any prose (non-negotiable, see §7):** `Website-homepage/operations/voice/laidies-writing-lock.md`, `.../voice/laidies-teaching-pattern.md`, `~/Downloads/newsstand/sunnyvaile-newsstand-format-spec.md`, and the existing Tribune entry in `Website-homepage/content/newsstand-stories.js`.

---

## 1 · FILES CREATED / CHANGED THIS SESSION

| File | What |
|---|---|
| `IDEAS.md` (top level) | Added: **colouring pages**, **printable bookmarks**, **pick-your-universe personalized editions** (way-down-the-line). |
| `outputs/overnight-2026-07-23/00-OVERNIGHT-PLAN.md` | The run log + guardrails + banked early findings. |
| `outputs/overnight-2026-07-23/launch-plan-top5.md` | The Top 5 + launch plan. **Ali AGREED to it.** |
| `outputs/overnight-2026-07-23/breaking-news-read.md` | Answer on the "breaking-news section" idea. |
| `outputs/overnight-2026-07-23/tribune-drafts/agi.md` | **The AGI Tribune draft** (the main deliverable). |
| `outputs/overnight-2026-07-23/research/*.json` | 6 files — fact-checked research payloads for AGI / The Bill / Career Insurance (2 passes each). |
| memory `monetization-priority.md` | Updated: verified nothing is purchasable; analytics live. |
| memory `newsstand-opinion-backlog.md` | Added the AGI piece brief + the AGI-vs-agentic sharpening. |

---

## 2 · MONETIZATION STATE (verified this session — ground truth)

- **Nothing is purchasable.** `laidies.ai/shop.html` (The Gift Shop) lists **13 products, all "Coming soon"** — every `buyUrl` is `"#"`. Confirmed against the DEPLOYED file. Go-live is a paste-in job gated on **Ali** creating Printful (prints/tees/stickers) + Gumroad (digital) accounts and pasting checkout URLs. Codex/agents must NOT create payment accounts or enter credentials.
- **Analytics IS live:** Plausible on 142 pages, Microsoft Clarity on 129. The Gift Shop already logs a `'Gift Shop click'` Plausible event per Buy/gift tap = free demand signal.
- **Puffy-sticker bookmarks** (digital, save-your-spot → Closet Puffy Board) are BUILT (`content/site/puffy-bookmarks.js`). "Printable bookmarks" (the new idea) is a DIFFERENT, physical thing.

---

## 3 · DECISIONS LOCKED THIS SESSION

1. **Idea home = `IDEAS.md`.** No new idea system. Drop ideas there or say "idea: X."
2. **Top 5 launch plan = AGREED by Ali** (see `launch-plan-top5.md`): ① Tribune article batch ② SUNNYVAiLE Printables Kit (free-with-email lead magnet) ③ "Which Patron Saint Are You?" quiz ④ Monthly wallpaper drop ⑤ Finish "Behind the Scenes" tips. Strategy = **audience-first** (nothing paid converts pre-audience; merch is the cherry, not the cake).
3. **"Breaking-news" section = do NOT rebuild.** The NewsStand's daily "TODAY" edition was retired on purpose (firehose too much for the reader). Recommendation: fold big model drops into the **WEDNESDAY Edition** + keep `content/site/current-models.js` current so the whole site stays truthful in one edit. (`breaking-news-read.md`.)
4. **Tribune framing = attributed debate-explainer, AIDB-style balance.** Each stance tied to its real named source (Altman, Amodei, Marcus, LeCun, DeepMind, Apple, Stanford, Yale…), in LAiDIES voice, with AIDB's even-handed "here's why this source is shaky" posture. Do NOT fabricate "AIDB says X."
5. **The AGI piece uses a LADDER, not an analogy.** After rejecting Mall / kitchen-gadgets / new-hire analogies (the "new hire" one is already the analogy for *the tools* — reusing it muddles), Ali landed on **showing the leap** with concrete scenes across two axes: **now → AGI**, at **everyday** and **frontier** level. Details in §4.
6. **Jobs + Bubble are already covered → freshen, don't duplicate** (see §5).

---

## 4 · THE AGI TRIBUNE PIECE — how to finish it

**Draft:** `outputs/overnight-2026-07-23/tribune-drafts/agi.md` (full prose, Tribune sections labelled).

**Thread:** *The Finish Line — how close is "general" AI, really, and what would it even mean?*

**The spine (the LADDER — this is the hard-won creative decision, keep it):**

| | NOW (real) | AGI (promised — flag as unproven) |
|---|---|---|
| **Everyday** | AI is the thing you *go to* — you bring it a **piece** of your life (a question, a draft, a worry, an image, a decision) and it helps with that piece, then you close it and run everything else yourself. *(Use judgment on real 2026 usage — do NOT list literal examples as if canonical.)* | You hand it the **whole thing**: *"it's Mom's 70th — throw her the party,"* and it books the room, mails invites, orders the cake, builds the playlist, works the RSVPs, pings you only for the calls that are yours. **You come home to a thrown party.** |
| **Frontier** | **July 2025:** DeepMind + OpenAI hit **gold-medal level at the International Math Olympiad** (5/6 problems, plain language). **May 2026:** an OpenAI model **disproved an 80-year-old open problem** (Erdős unit-distance); DeepMind solved 9 more. *(Protein folding is the OLD miracle — a deliberate beat: even Nobel-winning miracles are boring in 3 years.)* | The tireless researcher pointed at the hard stuff — the disease your family keeps losing to — that just gets it. *(Attributed promise: Amodei/Altman/Hassabis. NOT "country of geniuses in a datacenter" — that jargon fell flat; keep it human + concrete.)* |

**The honest turn (the Tribune's job):** nobody agrees what "general" means or how you'd test it. DeepMind's own "Levels of AGI" (2024) rates today's models only **"Level 1: Emerging"**; the same systems that win math gold collapse on puzzles a kid can do (Apple "Illusion of Thinking," 2025 — with a rebuttal that the test was built wrong). So "AGI is almost here" is a claim about a **finish line nobody has drawn.** Builders (Altman/Amodei/Hassabis) say a few years; skeptics (Marcus/LeCun) say decades or a different road.

**The hype→receipts beat (bake in — it's LAiDIES gold):** Oct 2025, a lab exec claimed a model "solved 10 unsolved Erdős problems" → **"dramatic misrepresentation"** (it had surfaced existing answers). The REAL result came months later and was endorsed by *the same experts who debunked the fake.* Hype → receipts → sometimes the real thing.

**The term-sort (in "The LAiDIES Read," NOT as a beige table):** Generative = what it *makes* (output) · Agentic = it *takes actions* (autonomy — "your Court": calling in one specialist for one job) · General = *how much* one system can do (range). Today = generative, turning agentic, still narrow. AGI = narrow falls off.

**⚠️ VERIFY-BEFORE-PUBLISH (2 flags):**
- Lock **specific dated quotes** for the timeline attributions (Altman/Amodei/Hassabis "a few years"; Marcus/LeCun "decades/different path"). Draft currently states them directionally — do not ship a fabricated precise quote.
- Re-confirm all dated facts against primary sources at ship (they were verified this session but re-check per the Currency Rule).

**To ship:** convert `agi.md` → a Story object appended to `window.NEWSSTAND_STORIES` in `Website-homepage/content/newsstand-stories.js` (field shape below), run the integrity/gate pass, and **Ali approves to publish** (she has not final-approved the full draft yet).

**`newsstand-stories.js` Story field map:** `id, slug, edition:"tribune", date, thread, thread_subtitle, thread_entry, headline, the_story` (=THE ARGUMENT), `laidies_read, what_this_means, cocktail_party, watch_fors` (array), `closing_note, class_notes, sources` ([{label,url,flag?}]), `aidb_credit, tags, saint_lane, badge`. Copy the existing "velvet-rope-01" entry as the template.

---

## 5 · JOBS + BUBBLE — FRESHEN, don't duplicate

Both topics are **already covered** (verified this session):
- **Jobs** → `Website-homepage/content/library-books/straight-answers.md` §"Jobs & Work" ("Is AI replacing jobs right now?") + mirrored in `grimoire/data/chamber-receipts.js` (id `jobs-replacing-now`).
- **The bubble/economy** → `straight-answers.md` §"Economy" ("Who's actually benefiting financially?" + "Is AI actually making companies more productive?") — already has Nvidia's profit, gold-rush framing, MIT's 95%-of-pilots-fail, and literally the word "bubble … genuinely unsettled."

**Freshen (the NewsStand spec's own §6 move — when news outruns the teaching, refresh the evergreen page):**
- **Jobs:** the entry says **"13%"** (Stanford Canaries, data through July 2025). Stanford has since updated to **~16%** (Oct 2025). Add that, plus — most on-brand and currently MISSING — the **women-specific split** (≈ −4.5%/yr for women 22–25 vs −2.5% for men; women more likely to be in exposed jobs). **⚠️ Re-confirm the women-split stat before banking** — it got caught in a research-run interruption and needs a clean verification. Also add the **Yale Budget Lab (Jan 2026)** counter-finding (no economy-wide effect visible yet) for balance.
- **Bubble:** refresh the numbers with the sharper 2026 figures (see §6) and add the **circular-financing exhibit** (≈27% of Nvidia's latest quarterly profit was paper gains on its stakes in the companies buying its chips) as the standout.
- **Optional Tribune piece for the bubble** *(Ali's call, §8):* only if it leads with the ARGUMENT the reference doesn't make — *"'is it a bubble?' is the wrong question; investors overpaying AND the tech being real can both be true; the dot-com bubble burst and left the fibre-optic cable your Netflix runs on — build the skill, don't bet your savings."* Cross-link to the reference for the facts; do not re-dump numbers.

---

## 6 · VERIFIED RESEARCH FACTS (the material, dated + sourced)

*All fact-checked this session. Re-confirm against primary sources at ship (Currency Rule). Full payloads in `outputs/overnight-2026-07-23/research/`.*

**AGI**
- DeepMind **"Levels of AGI"** (Morris et al., ICML 2024, v5 Sep 2025): performance × generality; frontier LLMs = **Level 1 "Emerging AGI"**; "Competent AGI" (≥50th-pct skilled adults on most cognitive tasks) **not reached by any public system**. Defines AGI by capability, not consciousness; critiques OpenAI's "economically valuable work" definition. `arxiv.org/pdf/2311.02462`
- Apple **"The Illusion of Thinking"** (Shojaee et al., Jun 2025): top reasoning models (o3-mini, DeepSeek-R1, Claude 3.7 Sonnet Thinking) collapse to ~0 past a complexity threshold; reduce reasoning effort as problems harden. `ml-site.cdn-apple.com/papers/the-illusion-of-thinking.pdf`
- **Rebuttal** (A. Lawsen, arXiv 2506.09250, Jun 2025): collapse ≈ flawed experimental design (e.g. impossible River-Crossing instances), not a reasoning wall.
- **IMO gold, Jul 2025:** DeepMind Gemini Deep Think (officially graded, 35/42) + OpenAI, 5/6 problems, natural language, first-ever AI gold. `deepmind.google` blog; `techcrunch.com/2025/07/21/...`
- **Erdős, May 2026:** OpenAI model disproved the 80-yr unit-distance conjecture (endorsed by debunker Thomas Bloom as co-author; Daniel Litt: "first result produced autonomously by an AI that I find interesting in itself"); DeepMind AlphaProof Nexus solved 9 more. **Oct-2025 fake-out:** exec claimed "10 solved Erdős problems" = "dramatic misrepresentation." `scientificamerican.com`; `techcrunch.com/2026/05/20/...`
- **ARC-AGI:** o3 scored 75.7% (and 87.5% high-compute), Dec 2024; **ARC-AGI-2** (Mar 2025) built to be hard for models/easy for humans; Chollet: passing ARC-AGI ≠ AGI.

**Jobs**
- Stanford **"Canaries in the Coal Mine"** (Brynjolfsson, Chandar & Chen, Nov 2025, ADP payroll): 22–25-yr-olds in most-AI-exposed jobs **~16% relative employment decline by Oct 2025** (13% through Jul 2025); concentrated on entry-level (incumbents stable/grew) and where AI **automates vs augments**; **women −4.5%/yr vs men −2.5%/yr [re-verify]**; correlation not causation; statistically significant only from 2024. `digitaleconomy.stanford.edu`
- **Yale Budget Lab** (Jan 2026): no detectable AI effect in CPS occupational-mix through Dec 2025. `budgetlab.yale.edu`
- Anthropic Economic Index: ≈52% augmentation vs 45% automation (Nov 2025).

**The Bubble**
- **Nvidia:** Q3 FY26 (ended 26 Oct 2025) rev **$57.0B**, Data Center $51.2B (~90%); Q1 FY27 (ended 26 Apr 2026) rev **$81.6B**, DC $75.2B (+92% YoY); guided Q2 FY27 $91.0B. **≈27% of Q1 FY27 net income ($15.9B of $58.3B) = mark-to-market gains on equity stakes** in customers (circular-financing tell) — but underlying FCF $48.6B (business genuinely cash-generative). Nvidia SEC filings; `globenewswire.com`.
- **Hyperscaler 2026 capex:** consensus **$527B** (Goldman, Dec 2025) → **$700B+** announced (Morgan Stanley, Mar 2026); Goldman projects **~$7.6T** AI capital 2026–2031; AI capex ≈0.8% of US GDP vs 1.5%+ in past booms.
- **OpenAI:** closed **$122B** round @ **$852B** post-money (Mar 2026), incl. **Nvidia ≈$30B** (the circular-financing exhibit). Nadella bull case (4 Mar 2026, "great ROIC").
- **MIT:** ~95% of enterprise gen-AI pilots showed no P&L impact; ~6% see real returns ("shelfware").

---

## 7 · RULES CODEX MUST FOLLOW (non-negotiable)

- **Read first, every time:** `operations/voice/laidies-writing-lock.md` + `operations/voice/laidies-teaching-pattern.md` + `~/Downloads/newsstand/sunnyvaile-newsstand-format-spec.md`. Drafting "cold" is how past pieces broke.
- **AI is "it"** — never "she/her." **"AI" is capitalised**, never "Ai" (the accented i is for brand words only, e.g. LAiDIES, SUNNYVAiLE).
- **No hype, no fake revelations, no false-exclusivity hooks** ("the thing nobody tells you"), **no deficit-framing about women.** Canadian English.
- **No beige comparison tables** (named or unnamed) — teach with a named decision/mental model, not a "best for" lineup. Show concrete scenes, not adjective-cells.
- **Every fact is dated + attributed to a named source**; obey the **Currency Rule** (never teach stale AI; timely facts live at the NewsStand, not baked into evergreen pages).
- **Do NOT self-certify.** "Done / correct / on-brand / on-voice / keeper" is Ali's verdict or a passed check — never Codex's claim. "Done" = a re-runnable check passed.
- **NewsStand work = new files only** (content JSON) = the safe zone; don't touch shared/global files without the branch/approval discipline.
- **Don't duplicate covered topics** — check `straight-answers.md` + `chamber-receipts.js` + `newsstand-stories.js` before writing anything new.

---

## 8 · PENDING ALI (Codex does NOT decide these)

- **Final sign-off on the AGI draft** (voice/cuts) — Ali is warm on the ladder but hasn't approved the full piece.
- **The timeline quotes** to lock (§4 flag).
- **Batch confirmation:** AGI = the one new Tribune piece; jobs + bubble = freshen the reference (recommended), OR also write a bubble Tribune piece on the reframe (§5).
- **Launch-plan sequencing / which of the Top 5 to build first.**
- **Monetization go-live** (Printful/Gumroad accounts) — Ali's to do; agents cannot.

---

## 9 · TRIED & REJECTED (do NOT redo these dead ends)

**AGI analogies — three rejected by Ali, with why (this ate most of the session):**
- **"Mall does both" / "one clerk who does every job in the building"** — rejected: the natural reading ("a concierge who routes you to specialist shops") actually describes **agent-orchestration** (= "Your Court"), NOT AGI; and it explained the *structure*, not the *wow*.
- **"90s kitchen gadgets vs. a person who can cook anything"** — rejected: not WOW enough, not a town location (ungrounded), and it risks sliding back into sounding like orchestration.
- **"New hire who could do every job"** — rejected, important: **"the smartest new hire you manage" is ALREADY the canonical analogy for THE TOOLS** (Ep1 — you instruct it, review its work). Reusing "new hire" for AGI muddles the one analogy that works. **Never reuse "new hire" for AGI.**
- **Resolution:** no mascot analogy at all — use the **LADDER** (§4). The wow comes from *showing the leap* in concrete scenes, not from a borrowed character.

**Other rejected moves:**
- **Amodei's "country of geniuses in a datacenter"** as the frontier-AGI line — rejected: abstract jargon, nobody can picture it. Keep frontier-AGI **human + concrete** (the disease example).
- **AlphaFold / protein folding** as the "frontier now" example — rejected: it's the OLD miracle (2020–21). Current frontier = **IMO gold + cracking open math problems** (Currency Rule).
- **A standalone "jobs" or "bubble" Tribune piece** — rejected: already covered in `straight-answers.md` (§5). **Freshen, don't duplicate.**
- **Rebuilding a daily "breaking-news" edition** — rejected: that's the retired "TODAY" edition (firehose). See `breaking-news-read.md`.

## 10 · IDEAS LOGGED THIS SESSION (in `IDEAS.md`)

- **Colouring pages / printables** — rides on the comic/pop-art line-art; free (lead magnet) or paid pack.
- **Printable bookmarks** — same printables family; ≠ the built digital puffy bookmarks.
- **Pick-your-universe personalized editions** (way-down-the-line) — user picks their top shows/movies → a different "skin" of LAiDIES (Sci-Fi, older-crowd) over the same teaching spine. Gate: only after the Wednesday Engine reliably runs ONE universe.
