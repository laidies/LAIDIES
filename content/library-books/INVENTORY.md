# Library Books — extraction inventory

Extracted from `_superseded/grimoire/` (read-only) on 2026-07-22.
Nothing live was modified. These files are raw content, not shipped pages.

**Total extracted: 19,751 words across 12 files.**

---

## 1. What's in each file

| Output file | Title | Words | What the page is actually about |
|---|---|---:|---|
| `vocab-101.md` | The Glossary | 1,459 | 26 AI-and-computer terms, each in a fixed three-line shape: *What it is / Where it comes up / Analogy*. It runs past AI vocabulary into general computer literacy — Browser, HTML, CSS, JavaScript, Terminal, PowerShell, Command, File Path, Extension — so it's really two glossaries stacked: "AI words" and "the computer words nobody explained either." Ready to publish nearly as-is. |
| `straight-answers.md` | Straight Answers About AI | 5,463 | An evidence-based FAQ: 15 questions across Jobs & Work, Environment, Privacy & Trust, Economy, and Learning & Skills. Every answer has the same skeleton — headline, what's solid, where it's contested, what's unknown, what it depends on, the myth to drop, "the receipt," linked sources, a confidence badge, and a verified date. It is the most source-heavy thing in the whole set and the most perishable. |
| `whos-who.md` | Who's Who in AI | 185 | A short cast list, seven cards: OpenAI, ChatGPT, Anthropic, Claude, Google AI, Gemini, plus one concept card (Model vs. App). Each card is one sentence about who made what and why you'd open it. It is thin — a stub that was clearly meant to grow. |
| `tool-chatgpt.md` | ChatGPT | 1,689 | The one finished "tool card." What ChatGPT is genuinely good at, where it's the wrong tool, what it costs, five ChatGPT-specific setup moves (Custom Instructions, Memory, Projects, Custom GPTs, Temporary Chat), six prompting moves each with vague/better/why, and a safety note about personal vs. company accounts. Ends with nine linked OpenAI help-doc receipts. |
| `handbook-ch1.md` | Every SLAiYER Needs a Watcher | 6,071 | The orientation chapter and by far the largest file. Five foundational terms taught in depth — Prompt, Model/LLM, Training data, Token & context window, Hallucination — each with *What it is / where it goes wrong / practice / sources / a study-guide recap*. Then a closing section on "the four types everyone argues about" (Generative, Reasoning, Agentic, AGI). It is really four or five chapters wearing one chapter's coat. |
| `handbook-ch2.md` | The Briefing Rules | 847 | Seven rules for briefing any AI tool: give it a job not a mood, add the audience, use constraints, make it ask you first, use your files carefully, check the output, iterate. Built around one worked example — a vague "intro email" prompt turned into a briefed one — with Romy & Michele and Miranda Priestly carrying the analogy. |
| `handbook-ch3.md` | The Skeleton Key | 848 | The set-up-once chapter. Three parts, clearly separated: Custom Instructions (your standing orders), Memory (what the tool picks up on its own, and why it rots), Projects (one job to a room). The argument is that this — not tool choice — is what separates people who swear by AI from people who shrug at it. |
| `handbook-ch4.md` | The Field Guide | 586 | Tool taxonomy. Five categories in one table — big general assistants, specialists, visual tools, power tools, the advanced stuff — with examples and an "open it when" column. Then a defaulting rule: start in a generalist, graduate only when it visibly hits a wall. Ends by promising tool cards that were never written. |
| `handbook-ch5.md` | The Account Rule | 913 | The data-safety chapter. One rule: personal/free account vs. company-approved account, and "not sure which one you're in?" means treat it as personal. Covers why paid accounts are safer (who the customer is), why logging in with a work email proves nothing, and why you can't count on an undo. Closes with the Deb cautionary. |
| `lore-closet.md` | The Lore Closet | 1,257 | The pop-culture canon: 56 reference cards across five categories (Screen 25, Accessories 12, People & Characters 11, Music 6, Print & Pages 2). Each card is a title plus one line on what it's licensed to stand for as an analogy. This is a writers'-room asset more than a reader-facing page. |
| `handbook-index.md` | The SLAiYER Handbook | 256 | The Handbook's table of contents: six chapter rows (five written, chapter 6 "still brewing") plus six tool-card rows (ChatGPT live, Claude/Gemini/Copilot/Perplexity/NotebookLM brewing). Useful only as a record of intended structure and status. |
| `grimoire-index.md` | The book with the answers. | 177 | The old Grimoire hub. Eight sections with one-line descriptions and Live / Still brewing status: SLAiYER Handbook, Potions Shelf, Lore Closet, Power Map, Chamber of Receipts, The Coven, Ask the Book, PATRON SAiNTS. It documents three sections that were never built. |

**Note on titles:** chapters 2–5 have no `<h1>` in the source — the chapter title is an `<h2 class="hb-part">`. The frontmatter `title:` for those four uses that h2. Heading levels in the body are left exactly as authored.

---

## 2. Recommended mapping — 5 Handbook chapters → 3 101 textbooks

### Briefing 101 — *how to ask so it comes back useful*
- **Chapter 2 (`handbook-ch2.md`) — the spine.** The whole chapter is this book. Seven rules, one worked before/after example, the formula line at the end ("deliverable + audience + constraints + ask-it-to-question-you + check").
- **Chapter 1, term 1 "Prompt" (`handbook-ch1.md`, lines ~27–118) — the theory half.** The Golden Rule, the five-part anatomy of a brief, the "vague vs. briefed" pair, and the "don't tell it what *not* to do" trap. This is the deep version of exactly what Chapter 2 teaches fast. **These two must be merged, not shipped side by side** — see §3.
- **Optional support:** the six prompting moves in `tool-chatgpt.md` are Briefing 101 applied to one tool. Keep them on the ChatGPT book, not in Briefing 101, or the tool-agnostic point gets muddy.

### Setup 101 — *set up once so every tool knows how you work*
- **Chapter 3 (`handbook-ch3.md`) — the whole book, cleanly.** Custom Instructions / Memory / Projects is already the exact table of contents Setup 101 needs, and the chapter carries the "why bother" argument better than anything else in the set.
- **Support:** "Setting it up the LAiDIES way" in `tool-chatgpt.md` (the five numbered moves with real menu paths) is the worked ChatGPT walkthrough for the same three concepts. Ideal as the first tool appendix to Setup 101.
- **Gap to fill:** Chapter 3 ends by admitting the build-your-own walkthrough doesn't exist yet — *"(The full build-your-own walkthrough … is coming to the Field Guide.)"* Setup 101 needs that written.

### Accounts 101 — *what's safe to paste and what never is*
- **Chapter 5 (`handbook-ch5.md`) — the spine.** Personal vs. company-approved, "not sure = personal," the work-email fallacy, no reliable undo, and the Deb close.
- **Chapter 1, "Who uses your inputs" (`handbook-ch1.md`, lines ~246–258) — the evidence.** The personal-vs-business default table, the quoted Anthropic training policy. Chapter 5 argues it; this passage proves it. Fold in.
- **Chapter 1, "The default-account trap"** (the Samsung 2023 incident) — same book.
- **Support:** "The one safety note for ChatGPT" in `tool-chatgpt.md`, and the Privacy & Trust receipts in `straight-answers.md`.

### Chapters that fit none / span several — flagged

- **Chapter 4 (The Field Guide) fits none of the three.** It is about *choosing which tool to open*, which is neither briefing, nor setup, nor account safety. Options: give it its own short book ("Tools 101" / Field Guide), or make it the front matter of the tool-card shelf alongside `whos-who.md` and `tool-chatgpt.md`. Do not force it into Briefing 101 — the table is the payload and it doesn't belong there.
- **Chapter 1 spans all three, and then some.** At 6,071 words it is not a chapter, it is a source quarry. Recommended split:
  - *Prompt* → Briefing 101
  - *Training data* + *Who uses your inputs* → Accounts 101
  - *Model / LLM*, *Token & context window*, *the four types* → Vocab 101 (`vocab-101.md`), as the "long entries" for terms the glossary only handles in three lines
  - *Hallucination* → neither; it belongs with the existing Verification Rulebook / Episode 3 track
  Publishing Chapter 1 whole would duplicate large parts of all three books at once.
- **`whos-who.md` (185 words) is too thin to be a book on its own.** Either merge into Chapter 4's field guide as the "names you'll hear" appendix, or commission more cards.

---

## 3. Duplicated content — reconcile before publishing

### A. Glossary (`vocab-101.md`) vs. Chapter 1 (`handbook-ch1.md`) — the known overlap
Eight terms are taught in both, at different depths. Glossary = 3 lines each; Chapter 1 = 500–1,200 words each.

| Term | In `vocab-101.md` | In `handbook-ch1.md` |
|---|---|---|
| Prompt | "The instruction you give an AI tool" + brief analogy | Term 1, full section: Golden Rule, 5-part brief, vague-vs-briefed, traps, sources |
| Model | "A core component of an AI system that uses inputs to produce outputs" | Term 2 "Model / LLM": model/product/tool distinction, how models differ, sources |
| Training data | "Everything AI read while learning" | Term 3: the cutoff, who uses your inputs, sources |
| Token | one-line definition | Term 4 "Token & context window": lost-in-the-middle, memory ≠ context window |
| Context | "The background information AI needs" | Folded into Term 4 — **the glossary treats Context and Token as two entries; Chapter 1 treats them as one.** Pick one model. |
| Hallucination | "Sounds polished but is wrong" + Regina George analogy | Term 5: why it happens, Anthropic's reduction playbook, Ep3 detection playbook, 22–94% stat |
| Generative AI | first entry in the glossary | "The four types," item 1 |
| Agent | "Agent" glossary entry | "The four types," item 3 "Agentic AI" — **different names for the same idea across two files** |

Also inside Chapter 1 itself: each of the five terms ends with a `study-guide` recap block that restates that same section in 5–6 lines. Those recap blocks are near-verbatim candidates for the Glossary entries — one obvious reconciliation is *glossary entry = the study-guide recap, long entry = the chapter section,* with the glossary linking through.

### B. Briefing anatomy — Chapter 1 vs. Chapter 2
Chapter 1's "What makes a good brief" (Deliverable · Audience · Format · Tone · Constraints) and Chapter 2's seven rules (job-not-mood, audience, constraints, make-it-ask, use-your-files, check-output, iterate) are the same lesson twice, with different item counts and different worked examples (Q3 deck vs. handover email). Also duplicated: the *"make it ask you three questions first"* move appears in both, and the *don't-say-what-not-to-do* rule appears in Chapter 1 and again as "Skip 'you are an expert'" logic in `tool-chatgpt.md`.

### C. Personal vs. company account — appears **four** times
1. `handbook-ch5.md` — the full chapter
2. `handbook-ch1.md` — "Who uses your inputs" (the account-defaults table) and "The default-account trap"
3. `tool-chatgpt.md` — "The one safety note for ChatGPT"
4. `straight-answers.md` — the Privacy & Trust receipts

### D. "Don't be Deb"
The Deb cautionary is told twice, with different details: `handbook-ch5.md` (client deck, personal account, grudge since 2023) and `tool-chatgpt.md` (confidential client deck, training left on). Pick one canonical telling.

### E. Custom Instructions / Memory / Projects
Taught generically in `handbook-ch3.md` and again ChatGPT-specifically in `tool-chatgpt.md`. This one is arguably *good* duplication (concept + worked example) — just make the relationship explicit instead of accidental.

### F. Section naming collides with itself
`grimoire-index.md` and `handbook-index.md` still use the old section names — **Potions Shelf, Power Map, Chamber of Receipts** — while the pages themselves had already been retitled **The Glossary, Who's Who in AI, Straight Answers About AI**. Same content, two names, in the same extraction set.

---

## 4. Reads as stale — do not fix, just listed

### The Grimoire referred to as a live place
- `handbook-ch1.md`: *"Episode 4 opens the first page of something new: the **LAiDIES Grimoire** — our growing reference shelf, where the tools, terms, receipts, and 'wait, what does that mean?' answers live. Inside it is the **SLAiYER Handbook**…"*
- `handbook-ch1.md`: *"Every Slayer needs a Watcher… That's the whole job here."* — frames the reader as entering the Grimoire.
- Six files still carry a `The LAiDIES Grimoire · …` eyebrow line as their first line: `vocab-101.md`, `straight-answers.md`, `whos-who.md`, `lore-closet.md`, `handbook-index.md`, `grimoire-index.md`.
- `grimoire-index.md` is entirely a description of a live eight-section Grimoire, including a hub headline (*"The book with the answers."*) and an aside: *"It's a 90s show. Of course there's a coven of friends fighting the paranormal. Meet yours."*

### Links to pages that are now redirect stubs
All 13 internal `/grimoire/*.html` links below still resolve, but every one of them is a 1 KB stub that bounces to `/library.html` — so the link text promises a destination the reader will never land on:
- `handbook-ch1.md` → `/grimoire/verification-rulebook.html` (**this one is the exception — the real page still exists**), `/grimoire/slaiyer-handbook-chapter-5.html`
- `handbook-ch2.md` → `/grimoire/slaiyer-handbook-chapter-5.html#safety-box` (the `#safety-box` anchor no longer exists anywhere)
- `handbook-ch3.md` → `/grimoire/slaiyer-handbook-chapter-5.html`
- `handbook-ch4.md` → `/grimoire/slaiyer-handbook-chatgpt.html` (×2)
- `handbook-ch5.md` → (none)
- `tool-chatgpt.md` → `/grimoire/slaiyer-handbook-chapter-1.html`, `/grimoire/slaiyer-handbook-chapter-2.html`, `/grimoire/slaiyer-handbook-chapter-5.html`
- `whos-who.md` → `/grimoire/potions-shelf.html`
- `straight-answers.md` → `/grimoire/slaiyer-handbook.html` (×2), `/grimoire/slaiyer-handbook-chapter-5.html`

### Promises of pages that were never built
- `handbook-ch4.md`: *"The ChatGPT card is up first. Claude, Gemini, Copilot, Perplexity, and NotebookLM are in the queue and will land here as they ship."*
- `tool-chatgpt.md`: *"Next tool entries — Claude, Gemini, Copilot — are on their way, each a complete field guide."*
- `tool-chatgpt.md`: *"Practical MAiGIC video walkthrough — still brewing. A short screen-share of the setup above is coming."*
- `handbook-ch3.md`: *"(The full build-your-own walkthrough — what actually goes in a personal context file, and how to get AI to help you write yours — is coming to the Field Guide.)"*
- `handbook-index.md`: *"Chapter 6 onward / More chapters in the Handbook will appear here as they're written."* — plus five `Still brewing` status pills.
- `grimoire-index.md`: three sections marked `Still brewing` that were never built — **The Coven**, **Ask the Book**, **PATRON SAiNTS** (*"Who teaches what — Cher, Elle, Miranda, Buffy, and yes, Deb."*).
- `handbook-ch5.md` ends with a "What's next" card pointing at *"Chapter 6 onward"*, which does not exist.
- `lore-closet.md` intro: *"Search, browse, and nominate the ones we missed."* — the search/nominate UI was stripped with the page.

### AI facts and model references that may have dated
- `handbook-ch1.md`: *"Every model has a knowledge cutoff — recent flagships land around late 2025 to early 2026, while lighter, faster models can be a little older."*
- `handbook-ch1.md`: *"OpenAI shipped the first one (o1) in September 2024. Anthropic and Google followed within the year (Claude's 'extended thinking,' Gemini 'Thinking')."*
- `handbook-ch1.md`: *"Stanford's 2026 AI Index Report tested 26 top AI models on one new accuracy benchmark and found hallucination rates ranging from 22% to 94%."* (repeated twice more in the recap blocks)
- `handbook-ch1.md`: *"The finding replicated across GPT-3.5, GPT-4, Claude, LongChat, MPT-30B, and Cohere."* — named model generations.
- `handbook-ch1.md`: *"Reasoning models (Claude with extended thinking, GPT with Thinking, Gemini Thinking)…"*
- `handbook-ch1.md`: *"A 2026 Nature paper reached the same conclusion…"* — cited without a title or link in the prose.
- `handbook-ch1.md`: *"The KPMG / GPTZero incident in 2026 is the canonical case study…"*
- `handbook-ch1.md` source line: *"Ethan Mollick. A Guide to Which AI to Use in the Agentic Era. One Useful Thing, February 2026."*
- `tool-chatgpt.md`: *"Write a short inspiring poem about OpenAI, focused on the recent DALL-E launch."* — quoted from OpenAI's own guide; "recent DALL-E launch" no longer reads as recent.
- `tool-chatgpt.md` receipts link to a `gpt-5` cookbook path (`developers.openai.com/cookbook/examples/gpt-5/gpt-5-2_prompting_guide`) — version-pinned URL.
- `tool-chatgpt.md`: *"The fields are up to 1,500 characters each"* and *"it auto-deletes after 30 days"* — product limits that change silently.
- `straight-answers.md`: **all 15 receipts are stamped `Verified June 2026`**, each with its own `Recheck when…` trigger. Several of those triggers name a specific next publication (WEF Future of Jobs, Stanford "Canaries" update, Stanford AI Index) — the page's own definition of when it goes stale.
- `straight-answers.md`: *"Stop trying to memorize tools that'll change by autumn."* and *"the tools turn over roughly every six months."*
- `straight-answers.md` footer: *"Straight Answers About AI is a living reference, not a news feed. Answers update when the data changes — not on a schedule."* — a maintenance promise attached to a page that is no longer live.

### Brand-spelling check
No violations found. The bare acronym is written **AI** (both caps) everywhere in the extracted prose; `Ai` appears only inside brand words (LAiDIES, SLAiYER, LIBRAiRY, VOCABULAiRY, PATRON SAiNTS, MAiGIC). The single grep hit for a lowercase-i "Ai" outside a brand word is the character name **Aidan** in `handbook-ch1.md`, which is correct as written. Nothing was silently changed.

---

## 5. Extraction notes

- `straight-answers.md` could **not** be extracted from the HTML alone — the 15 receipt cards are rendered at runtime from `grimoire/data/chamber-receipts.js` (42 KB), which is still present in the live tree. Those 15 records (~5,300 of the 5,463 words) were read from that data file and rendered to Markdown, preserving question, confidence badge, headline, the five prose sections, the receipt, all source links, verified date, and recheck trigger.
- Everything else was in the DOM and needed no JS.
- Stripped: nav, topbars, "← Back to the Grimoire" links, search inputs, filter/drawer buttons, decorative glyphs and emoji, hero images and plate art, scripts, styles, analytics, and HTML comments. Kept: the in-page "About this page" footer on `straight-answers.md` and the end-of-chapter "What's next" cards, because both carry real prose.
- Nothing was parsed as unreadable. The only content deliberately not carried across is imagery (all `<img>` alt text and hero art) and interactive affordances (glossary search, lore-closet category filters, FAQ accordions) — none of which survive as text.
- Source files were read only. No live page, redirect stub, or data file was modified.
