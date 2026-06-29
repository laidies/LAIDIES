# LAiDIES — Canon Index (Single Source of Truth)

**Last updated:** 2026-06-21

**Status of this document:** This is the current canon. Where it conflicts with any older doc — the Website Rescue brief, the Trust Layer doc, older Codex notes, prior ChatGPT summaries, or earlier handoffs — **this page wins.** Older docs stay useful for history, file locations, and prior intent, but they do not override the names, architecture, or decisions below.

> Note on authority: the "this direction wins over older docs" clause in the Website Rescue brief predates the Grimoire restructure and still uses retired names. It is **superseded by this page.** Hand agents this index, not the Rescue brief's authority clause.

**What this fixes:** LAiDIES planning had drifted into two competing site architectures and several overloaded words. This page locks one architecture and one name per thing, so every agent (Claude Code, ChatGPT, Claude) and every future doc reads from the same map.

---

## 1. The reference library — THE LAiDIES GRIMOIRE

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
| Hot Goss | **Retired** | The weekly news/cards concept survives and moves to the weekly surface (This Week). Its new label is an **open decision** — do not reuse "Hot Goss." |
| Book of Receipts | **The Chamber of Receipts** | Older episode-era name. |

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
- **Activities:** Mme CLAi-O (strong — quality reference) · FAiRY Godmother (restore the magic/practical balance; it went dry) · LAiDY (restore + redesign: energy → tailored answer → prompt glow-up) · Dream Phone (**parked — do not patch**; "Glow-up in the works").

---

## 5. Patron Saint lanes (locked — do not blur)

- **Cher Horowitz** — Early Adoption
- **David Rose** — Specificity
- **Elle Woods** — Receipts
- **Miranda Priestly** — Standards
- **Buffy** — Slaying (actually using the tools)
- **Regina George** — Dangerous Confidence
- **Deb (corporate cryptid)** — Institutional Survival
- **Dolly Parton** — Level-Headed Advice

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

1. **Weekly news lane name.** Retiring "Hot Goss" leaves the weekly news cards (including the fake pop-culture headline cards) without a label. Option A: keep them unbranded inside This Week ("the news"). Option B: a new in-world name. Pick one — don't let it sit unnamed and drift.
2. **Potions Shelf reader label.** Resolved — renamed to **The Decoder** (plain-English name; "Potions Shelf" retired). The Legally Blonde subtitle — *"Feel comfortable using AI jargon in everyday life. I ~~object~~ prompt!"* — now rides on The Decoder. Site pages/URL still say "potions-shelf" until a separate rename pass.
3. **Where this index lives.** Resolved — the writing lock and this index now live in the repo at `Website/operations/voice/`, versioned alongside the site. Start every agent brief with "read the canon index first."
