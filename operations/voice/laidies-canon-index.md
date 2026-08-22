# LAiDIES — Canon Index (Single Source of Truth)

**Last updated:** 2026-06-21

**Status of this document:** This is the current canon. Where it conflicts with any older doc — the Website Rescue brief, the Trust Layer doc, older Codex notes, prior ChatGPT summaries, or earlier handoffs — **this page wins.** Older docs stay useful for history, file locations, and prior intent, but they do not override the names, architecture, or decisions below.

> Note on authority: the "this direction wins over older docs" clause in the Website Rescue brief predates the Grimoire restructure and still uses retired names. It is **superseded by this page.** Hand agents this index, not the Rescue brief's authority clause.

**What this fixes:** LAiDIES planning had drifted into two competing site architectures and several overloaded words. This page locks one architecture and one name per thing, so every agent (Claude Code, ChatGPT, Claude) and every future doc reads from the same map.

---

## 1. The reference library — ⛔ THE GRIMOIRE IS RETIRED

> **SUPERSEDED 2026-08-03 (Ali).** The Grimoire was dismantled and its content
> turned into **LIBRAiRY books**. 19,751 words were extracted from
> `_superseded/grimoire/` into `content/library-books/`
> (`operations/library-decisions.md:202`). Only one Grimoire page survives:
> `grimoire/verification-rulebook.html`.
>
> **Do not use the eight-section Grimoire architecture below.** It is kept for
> history and for mapping old names only. Current architecture lives in
> `operations/library-decisions.md`.
>
> ⚠ Dead `grimoire/*.html` stubs are still on disk and at least two surfaces
> still fetch them. Do not link to any of them.
>
> This also means **section 2's retired-name table maps old names onto Grimoire
> sections that no longer exist** — treat its right-hand column as historical.

The durable reference system. Eight sections, each with one job:

1. **SLAiYER Handbook** — practical AI guide: which tool, where to find it, cost, setup, prompts, files, projects, privacy, source-checking. The "how to actually use AI" guide.
2. **The Power Map** — companies, models, tools, labs, people, ecosystem players.
3. **The Coven** — real women shaping AI, tech, policy, culture, and work.
4. **The Lore Closet** — pop-culture references, recurring jokes, LAiDIES canon.
5. **The Decoder** — AI terms, mechanisms, advanced concepts, in plain English. (Renamed from "The Potions Shelf".)
6. **The Chamber of Receipts** — sources, official docs, citations, proof.
7. **Ask the Book** — plain-English FAQ.
8. **Patron Saints** — recurring fictional archetypes and symbolic guides.

Grimoire structure is **two levels only**: Grimoire → section. No third naming layer.

---

## 2. Retired names → current names

These old names are **retired. Do not use them in public or internal copy.** Map anything you find to the current name:

| Retired name | Current name | Notes |
|---|---|---|
| Setup School | **SLAiYER Handbook** | Watcher/Buffy framing may appear *inside* the Handbook as intro flavor only — never as a titled layer. |
| The Watcher's Field Guide / Watcher's Handbook | **SLAiYER Handbook** | Same as above. |
| Learn / Learn hub | **The LAiDIES Grimoire** | The Grimoire is the library umbrella. |
| Glossary | **The Decoder** | Terms live here, fully explained in plain English. |
| The Potions Shelf | **The Decoder** | In-world name retired for a clearer one — same section (AI terms, plain English). Site pages/URL still say "potions-shelf" until a rename pass. |
| Who's Who | **The Coven** (women) / **The Power Map** (companies, models, others) | Split by subject. |
| Reference Closet | **The Lore Closet** | Pop-culture references and analogies. |
| Receipts (as a feature/page) | **The Chamber of Receipts** | A Q&A format can live inside it; the name is Chamber of Receipts. |
| Receipts Coven | **The Coven** | Same concept. The full freshness/spec build is **backlog**. |
| Hot Goss | **The Weekly at the NewsStand** | The retired name must not appear in current visitor copy. Current news lives at the NewsStand as The Breaking, The Daily, The Weekly and The Tribune. |
| Book of Receipts | **The Chamber of Receipts** | Older episode-era name. |
| Play (public action/route label) | **Use the exact outcome: Listen, Pause, Practise, Try, Choose a game, Start, Open or Explore** | “Play” remains permitted only in internal technical terms such as playback; it is retired from visitor-facing copy. Ali, 2026-08-22. |

---

## 3. Overloaded words — one meaning each

- **Coven** = the Grimoire section for real women in AI. (The elaborate "Receipts Coven" build with freshness dates = backlog.)
- **Receipts** = shorthand for the **Chamber of Receipts** (sources/proof). The internal claim-tracking tool is the **Claims Ledger** (backlog). Elle Woods is the **Patron Saint of Receipts** (an archetype, not a section).
- **Closet** = **Lore Closet** only. ("Reference Closet" retired.)

---

## 4. Surfaces & activities (separate layer — not part of the Grimoire)

The Grimoire is the durable library. These are the weekly and interactive surfaces:

- **Home** — the front door. One hero action (Read the Current Episode), with "New here? Start with Episode 1" as the close second. Not six co-equal doors.
- **This Week / Wednesday Bag** — the current-week ritual hub (episode, activity, study pack, quiz, extras). The weekly news cards live here.
- **The Season** — 24-Episode archive; read in order; current episode highlighted.
- **Episode pages** — polished editorial features. Episode 1 = gold-standard voice and visual benchmark.
- **Clubhouse / The Extra Credit** — bonus shelf / community-adjacent space. No fake member persistence (that's Part C).
- **Activities:** Mme CLAi-O (strong — quality reference) · FAiRY Godmother (restore the magic/practical balance; it went dry) · **Girl Talk = residents only** (Residence Card required — Ali, 2026-07-11; note: the live game currently plays without a card via local saves, so the gate needs enforcing in-game — build item, not a copy change). · **Miss Jeeves** = the LIBRAiRY reference-desk character (canonical name confirmed by Ali 2026-07-11 — always "Miss Jeeves," never plain "Jeeves" or "Ask Jeeves"; her site-search feature is in the works, label honestly). · LAiDY (**RETIRED 2026-07-11** — no separate character name; she is just the FAiRY Godmother. The advice/glow-up flow lives under the FAiRY Godmother name) · Dream Phone (**parked — do not patch**; "Glow-up in the works").

---

## 5. Patron Saint lanes (locked — do not blur)

- **Cher Horowitz** — Early Adoption
- **David Rose** — Specificity
- **Elle Woods** — Receipts
- **Miranda Priestly** — Standards
- **Buffy** — Slaying (actually using the tools)
- **Regina George** — Dangerous Confidence
- **Deb (corporate cryptid)** — "Loop Me Out"
- **Dolly Parton** — Common Sense

---

## 6. Honest status labels (approved set)

Available now · Current week · Getting polished · Glow-up in the works · Bonus shelf in the works · Member magic coming soon · Still brewing · Coming soon · In the works.

Unfinished features must not look live. Where something isn't ready, offer a real action instead: Read the current Episode / Open This Week / Try Mme CLAi-O / Browse the Season.

---

## 7. Backlog — DO NOT BUILD until Ali explicitly asks

Captured and preserved, not active:

- **Trust Layer:** Claims Ledger; Reading Level Modes (beginner/intermediate/advanced, prewritten not live-generated); source hierarchy + freshness system; the full **Receipts Coven** build (Hannah Fry = "Keeper of the Probabilities" seed entry). Spec lives at `docs/product/trust-layer-receipts-coven.md`.
- **Sycophancy lesson** ("the You're So Right, Babe problem") → Episode 12.
- **Council Operating System** (14-role review gates) — strong future process; not an active build.

The credibility spine behind these — no vibe citations, no fake receipts, the claim under the metaphor has to be steel — is a **brand principle that applies now**, even though the *features* are parked.

---

## 8. Voice authority

Episode 1 is the gold standard. The voice rules live in the writing lock at `operations/voice/laidies-writing-lock.md`. When in doubt about tone, that file + Episode 1 win. Episode 04 (SLAiYER Handbook launch) is a deliberate departure from the standard episode template — treat it as a guide chapter, not a normal episode.

---

## 9. Visual style benchmark (locked)

The **patron saint card portraits** (`assets/saints/*.png`) and the **Girl Talk card faces** (the card art, NOT the stickers) together are the locked visual style template for character/card art going forward.

When commissioning new character art, episode hero treatments, room card imagery, or any LAiDIES card-style visual, match:
- The illustration register (rendering style, line/colour treatment)
- The colour palette (plum, rose, blush, powder, cream, pearl, gold accents — keyed to the existing tokens)
- The composition density (portraits as character + signature object/context, not isolated headshots)
- The Y2K/grown-up-editorial energy (per the writing lock's voice rules)

Pieces in other styles — even ones already on disk — are out of scope for the canonical card set unless they're explicitly re-treated to match. Mixed registers are how a site stops looking designed.

---

## 10. Open decisions (need Ali)

1. **Weekly news lane name. Resolved 2026-08-03:** the current weekly publication is **The Weekly** at the **NewsStand**. Fictional town material must remain clearly labelled and cannot masquerade as sourced news.
2. **Potions Shelf reader label.** Resolved — renamed to **The Decoder** (plain-English name; "Potions Shelf" retired). The Legally Blonde subtitle — *"Feel comfortable using AI jargon in everyday life. I ~~object~~ prompt!"* — now rides on The Decoder. Site pages/URL still say "potions-shelf" until a separate rename pass.
3. **Where this index lives.** Resolved — the writing lock and this index now live in the repo at `Website/operations/voice/`, versioned alongside the site. Start every agent brief with "read the canon index first."


## Standing process rule (added 2026-07-12, after the Ep04 quiz drafting session)
**Before creating ANY new instance of an existing content type** (quiz, study pack, episode card,
trading card, caller bundle, saint blurb, postcard copy — anything with prior examples), you MUST:
1. Read ALL existing instances of that type first — for register, cadence, length, and format,
   not just data schema. Match them.
2. Run the accuracy pass BEFORE presenting: every factual claim traced to the episode text or an
   external source (fact-verification is locked canon).
3. Present for review in a rendered, readable form — never a raw JSON/code file.
Drafting from personal defaults and calibrating afterwards wastes Ali's time; the exemplars are the spec.

**Ada wording ruling (Ali, 2026-07-12):** the episode keeps "Ada wrote the first one (1843)" — accepted popular usage. Scholarly nuance (Babbage's ~26 unpublished fragments 1836–1840; Note G = first PUBLISHED and most complete program) goes in the Ep4 canon facts ledger with sources. Quiz surfaces may use "published" where precision reads naturally.

**Ep1 title ruling (Ali, 2026-07-12):** "On Wednesdays We DO AI" — never "Use." Swept across surfaces; check-town enforces via episode-index parity.

**Glossary home ruling (Ali, 2026-07-12):** the glossary lives at **the LIBRAiRY** (Glossary shelf). "Potions Shelf" is fully retired as a visible name anywhere. Page file is still grimoire/potions-shelf.html until a URL rename pass; the High's Vocab 101 card points at the same page. Ep4 words (Algorithm, Compiler, AI winter, Training data) added 2026-07-12.

**Dream Phone clarification (Ali, 2026-07-12):** the Dream Phone page IS LIVE — calls, advice and Easter eggs work. Only the GAME component is parked for its glow-up. Do not grey out or 'back soon' the Dream Phone itself; label only the game part honestly where it appears.
