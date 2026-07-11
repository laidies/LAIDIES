# The LAiDIES Operating Model
*How agents run and keep running LAiDIES — the source of truth, the review that blocks, and where Ali plugs in.*
**v1 · 2026-07-10**

---

## Why this exists (the root cause it fixes)

The old way had **no enforced source of truth** and **no content-correctness gate**. Work got written from memory, "reviewed" by vibes, and audited only for broken links. So shallow teaching, wrong facts, and canon bugs (the Mall's "No. 4," "AI = her") shipped straight through — and **Ali became the QA of last resort.** That doesn't scale and it burns her out.

**The whole model is one law:** *Everything is produced FROM a verified source of truth → GATED by adversarial, source-checking review → only then ships. Ali sets direction and approves at a few high-leverage gates; she is never the bug-catcher of last resort.*

Three sub-rules that flow from it:
1. **Source-of-truth or silence.** An agent may not assert anything not traceable to the Records. Not in the Records → flagged **"not verified,"** never guessed.
2. **Facts first, prose second.** No script/page is written until its sourced fact-sheet is locked. The fact-sheet is the *input* to writing.
3. **Gated, not trusted.** A rule you're "supposed to follow" is what failed. Every rule becomes a step that *blocks*.

---

## Layer 1 — Town Records (the source of truth)

A small set of canonical, version-controlled files everything reads and nothing contradicts:

| Record | What it is | Lives at |
|---|---|---|
| **Canon** | World rules: writing-lock, street layout, saint roster, season bible | `operations/voice/laidies-writing-lock.md`, `operations/voice/…canon-index`, street/saint memories |
| **Fact base** | Verified, cited facts — one per episode + the landscape | `operations/reference/ai-landscape-factsheet.md`, `operations/reference/episode-NN.factsheet.md` |
| **Site registry** | Every page: status (live/draft/stub), owner, last-verified date | `content/site/site-index.json` |
| **Launch punch-list** | What each week needs + status | `operations/launch-*.md`, memory `launch-punch-list-*` |
| **Analytics snapshot** | Real usage from Plausible: top pages, drop-off, dead ends | `operations/reference/plausible-latest.json` *(to wire)* |

**Rule:** if a claim, number, or address isn't in a Record, it doesn't ship — it gets verified into a Record first, or flagged.

---

## Layer 2 — The Operator (Ali's chief of staff)

One persistent orchestrator that:
- Holds the roadmap and the weekly cadence.
- Knows the state of everything (reads the registry + punch-list).
- Dispatches the specialist agents and **enforces the gates** — nothing ships ungated.
- **Surfaces only the decisions that need Ali** — batched, with receipts.
- Writes every decision back to the Records, so nothing is re-derived or lost ("I already told you" never happens again).

*Implemented as:* a saved orchestration + the registry as its memory. Runs the weekly pipeline (below).

---

## Layer 3 — Production agents (build the content)

Each is fed by the Records and produces one required artifact:
- **Fact Researcher** — builds/refreshes fact-sheets from live web sources, every claim cited. *(Proven 2026-07-10.)*
- **Episode Writer** — writes the script/article *from* the fact-sheet + canon + exemplars. Cannot invent claims.
- **Image Briefer** — Codex prompts from canon + approved-asset refs (never lets Codex pick its own refs).
- **Page / UX Builder** — builds/updates pages to the design system, hub-and-reveal law, a11y.
- **Content-Sync agent** — when canon changes, cascades across all ~13 episode surfaces. *(Drift across surfaces is the #1 bug source.)*
- **Song / Quiz / Cards** — the rest of the weekly artifact set.

---

## Layer 4 — The Gate battery (adversarial review that BLOCKS)

**This is what replaces the "audit."** A link-checker is blind to a wrong street number or a shallow paragraph; these gates are not. Each returns **PASS / FAIL** with line-cited reasons and has the *right tool*. Full definitions + the runnable version: `operations/workflows/review-content.mjs`.

| Gate | Mandate | Catches |
|---|---|---|
| **Fact-check** (web) | Every claim → real current source or cut. Cross-checks the fact base. | guessing, overclaims ("only a handful build their own"), stale model facts |
| **Substance** | "Name what a smart woman *learns* she didn't know." Rewards a worked example + real mental model. | shallow skims, assertion-without-explanation |
| **Canon / consistency** | writing-lock, street numbers, saint roles, AI-is-"it," no tells, no "the whole [x]," MUST-MATCH | the Mall No. 4, "AI = her," self-hyping tells |
| **Design / UX** | hub-and-reveal, a11y, palette/type, no dead-end CTAs; Plausible-weighted | endless scroll, dead ends, off-style pages |
| **Cold-reader** | Reads it as a first-time external user: does it make sense, teach, land? | confusion, "so what?", unfunny |

Nothing advances to Ali until every gate passes.

---

## Layer 5 — Continuous watchdogs (stay fresh, always)

Scheduled agents that keep the town fresh without Ali asking:
- **Freshness Watchdog** — re-verifies the AI fact base on a schedule (models change monthly); flags stale names/versions, overdue "still in development."
- **Auditor v2** — broken links *and* content-correctness *and* Plausible drop-off.
- **Pipeline Filler** — always pulling the next 2–3 weeks' episodes/pages/images through the pipeline, so there's a buffer, never a Tuesday scramble.
- **Analytics Interpreter** — reads Plausible weekly → a prioritized "build/fix" list for the Operator.

---

## The weekly launch, on rails

```
Facts → Draft → Gate battery → ALI approves → Produce → Cascade → Ship-check → Deploy → Analytics → (feeds next week)
```
1. **Facts** — Researcher builds the episode fact-sheet (cited).
2. **Draft** — Writer builds from the fact-sheet + canon + exemplars.
3. **Gates** — the battery runs; all must pass.
4. **Ali gate** — she approves substance + taste at ONE checkpoint, with receipts (claims register, the "what she learns" line, the cold-reader verdict). Spot-check any line in one click.
5. **Produce** — audio, quiz, cards, song, page.
6. **Cascade** — Content-Sync across all surfaces.
7. **Ship-check** — registry + gates green → deploy.
8. **Analytics** — Plausible watch feeds next week's priorities.

---

## Where Ali plugs in — 3 touchpoints, not 300

- **Set the angle** for the week (or approve the Operator's proposal).
- **Approve the episode** at the substance gate — with receipts, so a bug the system should have caught never surprises her.
- **Final sign-off** before deploy.

Everything else runs and self-checks.

---

## How it maps to the actual tools (buildable today)

- **Operator / pipeline** → a saved Workflow + the registry as state.
- **Production + gate agents** → the Agent tool / saved agent definitions (`.claude/agents/*.md`).
- **The gate battery** → `operations/workflows/review-content.mjs` (deterministic PASS/FAIL).
- **Watchdogs** → scheduled agents (cron).
- **Ship-check** → the existing `episode-shipcheck.sh` hook (structural linter — the gates do the content).
- **Records** → canon + `site-index.json` + fact-sheets + Plausible export.

---

## Failure → fix map (this session's failures, all closed)

| What broke | Fixed by |
|---|---|
| Shallow / wrong content shipped | Substance + Fact gates block it |
| Facts guessed from memory | Facts-first from cited Records; Fact gate with web |
| Audit missed content bugs | Auditor v2 + Gate battery (content-correctness, not just links) |
| Lost lists, re-derivation, "I already told you" | Records + persistent Operator hold state |
| Ali as QA-of-last-resort | Gates catch it first; she approves with receipts |
| Vibes-council | Adversarial, tool-equipped, PASS/FAIL gates |

---

## Build order & status
1. ✅ **Fact base** — landscape fact-sheet live (`operations/reference/ai-landscape-factsheet.md`).
2. 🟡 **Review Gate** — `operations/workflows/review-content.mjs` written; ready to run.
3. ⬜ **Registry + Operator cadence** — formalize `site-index.json` fields + the weekly pipeline runner.
4. ⬜ **Watchdogs** — freshness + Plausible wiring (needs a Plausible export path).
