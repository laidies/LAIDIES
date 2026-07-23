# The LAiDIES Operating System

_The single design document. Written 2026-07-22, os-pass. Plain language, no hype._
_Synthesized from the three top-scored proposals (all 8/10). Every load-bearing claim traces to a file, a line, or a quote in the os-pass research. Where something is unproven, it says so._

---

## 0. Read this first: what LAiDIES is, and what one week makes

**What it is.** LAiDIES is a weekly show that teaches AI, from zero, to smart, busy professional women who don't have 40 hours for a course. It lives inside SUNNYVAiLE, a fictional 1999 town you can walk around on the website. LAiDIES is the brand (the who); SUNNYVAiLE is the setting (the where). The promise is a place you come back to every Wednesday, with owned tools you can't just google — above all the FAiRY Godmother "paste your real prompt, watch it get rewritten and learn what was missing." Tagline: "Where girl power meets machine power."

**Who Ali is in it.** Ali is the founder and the only human. She sets direction and makes taste calls. She is *not* a software engineer, and the whole point of this OS is that she is **never the person who catches bugs.** The disease this document treats, named in every prior post-mortem, is "Ali as bug-catcher of last resort" — a finished 1,400-word script landing on her desk raw, and her being the only thing standing between a bad draft and the public.

**What one finished week produces** (this is the concrete deliverable, so the rest of the design has something real to serve):

1. **One episode** — a written issue page (`issues/issue-0N.html`), a narrated audio cut (heroine voice + announcer), and a video cut in the Screening Room (`watch.html?ep=NN`).
2. **~10 site surfaces derived from that one episode** — Chick Flicks box, NewsStand feed item, KSVL anthem, SUNNYVAiLE High pop quiz, Study Pack, trading-card pack, homepage "this week" panel, Wednesday Postcard email, season track. All must *agree with each other*, because they all come from one canon file.
3. **A social package** — an Instagram discovery Reel script, a saveable carousel (copy + rendered on-brand slides), a Story sequence, a community prompt, a LinkedIn founder-voice draft, hashtags, and one filled tracker row per surface. Handles: Instagram `@laidies.ai`, YouTube `@LAiDIES`. Pushed to **drafts**, never auto-posted.
4. **Revenue assets, staged but dormant** — the episode's quotable turned into 2–3 print-on-demand product drafts; the shop and analytics already exist. Nothing goes live until Ali flips it.

**Ali's total hands-on time in a good week: about 45–55 minutes, spread across four short gates.** Everything else is done by machines that hunt their own defects and stop, in writing, when they need her.

If you (or Ali) don't know the four bullets above cold, you can't judge the rest of this design. That is the grounding test.

---

## 1. The Phase-1 truth: can AI draft the teaching, or not?

This is the load-bearing question, and unlike every prior attempt, it was actually tested (`PHASE1-generation-verdict.md`). The honest answer:

**Yes — AI can first-draft LAiDIES teaching at the Ep1–3 bar, but only when handed a "conditioning pack," and only with a critic checking it. The conditioning is the product.**

The evidence: three independently generated full Ep5 drafts, three different strategies, **all three cleared the bar**, and the hardest, most-failed dimension — the worked example — scored a perfect 5/5 in every one (the prior killed Ep5 scored 1/5 there). That is reproducibility, not one lucky run.

What made the difference was not a smarter model. It was **what the drafter was fed**: the Ep1–3 episodes as full examples, an "anchor library" of past failures (each with its dimension, score, and the exact quote that sank it), the eight-part worked-example checklist, the 25%-time-to-value rule, the humour rule, and the one-term-per-concept lock. A control draft that was *not* given this pack slipped exactly where the pack teaches — its worked example and its takeaway fell to 3/3, and it started inventing plausible-but-false product behaviour.

**What this means for who writes the teaching:**

- **The machine drafts the prose. Ali does not.** Throwing away a demonstrated capability would be a mistake.
- **Ali's irreplaceable act moves upstream** — to a one-page "substance sheet" (which idea, which *real verified* worked example, the one takeaway a busy woman can actually execute) approved **before any prose exists.** That is the single most valuable unbuilt thing named in the diagnosis. The Ep5 disaster was visible on that one page in about 90 seconds; catching it there costs her 10 minutes, catching it in a finished script costs her 20 minutes of bug-hunting — which is exactly the trap.
- **One honest reservation, carried forward loudly:** all three passing drafts were the *same* topic (model-picking), which has a clean yes/no structure and an easy worked example (file rename). Reliability is proven across *strategies*, not yet across *topics*. Before the loop is trusted unattended, it must run on 2–3 structurally different episodes (a non-binary lesson; one with no obvious single worked example). Until then: machine-drafts, full guardrails, Ali's gate — confident but supervised.

---

## 2. The shape of the whole system, in one picture

There is **one spine, and it is a Makefile** — the week is a dependency chain (canon → script → audio → timing → art → cut → surfaces → social), which is a build graph, not an organization. `make` gives resumability and partial-failure safety for free.

Three rules make this hold where five prior attempts didn't:

1. **Nothing that must be kept alive.** Every prior operator, council, watchdog, and dashboard died the moment a terminal closed. No persistent process. The week is fired by a hosted scheduler (off Ali's laptop), the Makefile sequences the steps, and resumable stamps mean a stall *waits at a gate* — it never needs chasing and never restarts from zero.

2. **Every gate actually runs, by default.** The last linchpin (`review-content.mjs`) was a "ready to run" file that *could not be invoked* — a design document wearing a `.mjs` extension (`opmodel-diagnosis.md` §1). The rule now: if a check isn't wired to a `make` target or a Stop-hook that fires on every ship, **it is not a gate and it does not exist.** A draft physically cannot reach Ali without passing the critic.

3. **Decisions cannot evaporate.** Every approval and every answer Ali gives is appended to one immutable ledger (`operations/engine/LEDGER.md`). Any answer she gives *twice* becomes a default the system re-serves instead of re-asking. She never re-explains a ruling.

The "crew" (Drafter, Critic, Art Director, Social, Front Desk) are **not running programs.** Each is a fixed prompt + conditioning pack, invoked as an ordinary command by the Makefile, then gone. "Standing role" means "defined once," not "always on." This is the one reconciliation that lets specialist roles survive the diagnosis's hardest lesson.

**Home is chat.** There is no dashboard to keep open. Status comes from one command — "where are we?" — that re-computes live every time it's asked (never reads a saved status file; the project already had one that lied, `state.json` with `"generated": null`).

---

## 3. The weekly operating loop, step by step

Backwards-planned from a Wednesday ship. **The four points marked → GATE are the only places Ali touches the work.** Everything else runs unattended, and every gate lands in her email/chat as one concrete question with a default that fires if she's silent.

### Precondition (once per episode): canon must be RULED
Surface-derivation stays **OFF** until a file `CANON-RULED` exists for the episode — meaning every recorded divergence has one ruled value and *nothing unverified is locked as must-match.* This is not optional: canon was reverse-extracted from already-shipped buggy pages, so it currently records drift instead of ruling it (the episode title carried as both "Do AI" and "Use AI"; the BCG "14 points" stat reframed; an unverified Fei-Fei Li quote locked into Ep1). Deriving 11 surfaces from contaminated canon industrializes one error into eleven. **Rule canon first, or the multiplier becomes a bug factory.**

### Monday — canon + substance (automated; ends at Ali's most important gate)
1. `make canon-check` — a deterministic script refuses to proceed on any unruled divergence. If dirty, it posts **one** question to Ali and halts. This is the fact gate at the source.
2. `make substance` (generative) — the Drafter, fed the full conditioning pack, writes the **one-page substance sheet**: which-model/idea-for-what, why, the candidate worked example pulled *verbatim from the verified worked-example bank* (never invented), the honest result number, the one executable takeaway. A fact gate + web search verify every real-product claim **before Ali sees it** (this is what would have caught the false "the priciest model sits at the top, already selected").
3. `make critic --scope substance` — a cheap default-FAIL pass confirming the worked example is real and the claim is verifiable.
4. **→ GATE 1 (Ali, ~10 min): the substance sheet.** "This week's lesson, one page. Approve / change one thing / kill." The rule: the sheet must survive deleting its metaphor box — substance, not garnish. This is where Ep5 died and where it costs 90 seconds to catch. **Default on silence: HOLD** (burns no prose), nag next morning.

### Monday PM–Tuesday — script + the critic that replaces Ali-as-bug-catcher (fully automated)
5. `make scripts` (generative) — the Drafter writes the full episode from the *approved* substance sheet + conditioning pack. (Cheap insurance: generate two candidates; the critic picks the stronger — the evidence says all strategies land.)
6. `make critic --scope episode` (**the load-bearing gate**) — one subagent, fresh context, two passes:
   - **Pass A — the six-dimension rubric.** Every dimension ≥4, worked-example a hard ≥4 (it's the spine), evidence-forced (must quote the offending line), **default-FAIL**, reports **per-dimension** (a single overall pass/fail is useless — everything fails it).
   - **Pass B — the leak-catcher.** One-term-per-concept lock (kills synonym sprawl, the thing that held the drafts at 4 instead of 5) + a fact gate on every claim about how a real product behaves.
   - **Permanent regression:** the critic is calibrated on the Ep1-passes / Ep5-fails pair, re-run every single invocation. **If it ever passes the killed Ep5 draft, the judge is broken and that week's verdicts are void.**
7. On any flag → `make revise` (generative, scoped to flagged items only) → re-score only the flagged dimensions. Loop up to 3×; if still failing, escalate to Ali (rare). Deterministic shell checks (term-consistency, metaphor-strip, banned phrases, must-match on ledger-cleared strings only) also block here. **No human in this stretch — this is the seat Ali is removed from.**

### Tuesday — audio, timing, art (automated except flagged frames)
8. `make audio` (ElevenLabs narration) → `make timing` (Whisper forced alignment; coverage gate fails if <~95% of lines got a real timestamp) → `make art` (generative per-scene prompts built from canon with the character/style lock; `qc-frames` auto-QC runs before any human sees anything).
9. **→ GATE 2 (Ali, ~10–20 min): art triage.** She sees **only the flagged frames** (capped ~6; if all are rejected the pipeline *generates more* — she never browses a library). Keep / reroll. **Default on silence: HOLD** (never auto-ships a face); after 24h, "keep and flag for a later pass" so the week doesn't stall.

### Saturday/Sunday — the cut (the one unautomatable step)
10. `make cut` hands CapCut a complete, ordered, verified asset folder + cue sheet. CapCut has no API, so Ali (or a hand-step) assembles the cut. This is the loop's true bottleneck — mitigated by making it the *last* human touch with everything pre-verified.
11. **→ GATE 3 (Ali, ~15 min): watch the assembled cut once.** Does it feel right? Publishing is irreversible, so this never auto-fires — it only nags.

### Wednesday — ship + fan-out
12. `make surfaces` (generative + deterministic sync) — from the shipped canon, derive the ~10 site surfaces + the full social package + 2–3 POD merch drafts from the episode's quotables. A must-match sync check blocks if any surface diverges from canon. Social goes to the scheduler **draft queue.**
13. **→ GATE 4 (Ali, ~5–10 min): publish.** One screen, one yes: deploy the site (and merge the redesign branch so it's actually live), release the pre-vetted social drafts, push merch drafts to Printful, flip any revenue toggle she chose.

### Friday — measure + advise (the loop-closer)
14. The ADVISOR reads Plausible (+ Clarity) via API and posts **one** chat digest: what moved + ≤3 concrete decisions, each with a default that fires on silence (e.g. "tote clicks +40% — flip it live? default: leave dormant one more week"). Any answer given twice becomes a recorded default.

**Between weeks:** every ledger item "waiting on Ali" *must* carry a posed question + a default. This kills approval starvation — the actual thing that stalled the last attempt (tasks blocked on Ali since 17 July with no evidence any was ever *asked*).

---

## 4. How Ali is removed from the bug-catcher seat — structurally, not by promise

Three mechanisms, each aimed at one documented failure:

1. **The critic is the bug-catcher, and it actually runs.** The two-pass critic + deterministic shell checks + the site cold-reader do all defect-hunting, default-FAIL, blocking the make target. The prior model failed because the *evaluators that grant "done" were never built* while only phrase-blockers ran — so a plausible-looking bad draft sailed to Ali raw. Now she reads a pre-vetted *winner* and makes a taste call. She is the judge, never the hunter.
2. **She moves earlier and cheaper.** Her one authoring act is the one-page substance sheet (Gate 1), not a finished script. 20 minutes of taste on a late artifact *was* the bug-catcher trap.
3. **Decisions don't evaporate and nothing stalls in silence.** Every ruling is appended and any repeat becomes a default; every block carries a posed question + a silence-default. She never re-explains and the week never freezes waiting on her.

Her entire surface area: an idea on one page (G1), flagged art (G2), one cut (G3), one publish (G4), and a Friday digest. She approves taste; she catches nothing.

---

## 5. The seven areas, each with a real mechanism

**(1) Weekly episode production hitting Wednesday.** `make week EP=NN`, fired Monday by a hosted scheduler, walks the resumable stage chain Mon→Wed with slack for the revise/art loops. Content-hashed stamps + `.DELETE_ON_ERROR` mean a mid-week failure *resumes*, never restarts. Ali's #1 pain (never once hit a Wednesday) is attacked by moving her to Monday's Gate 1 and letting stages resume. **Status: the engine is honest plumbing, smoke-tested one stage deep. No episode in `build/` has ever passed beyond stage 1. This is provisional until ep05 runs the full chain — proving it is the first build task, not adding to it.**

**(2) Reliable teaching at the Ep1–3 bar.** The Drafter carries the conditioning pack inline on *every* draft (Ep1–3 exemplars + anchor library with scores & quotes + §3.2 checklist + 25% gate + humour rule + one-term lock + the growing verified worked-example bank). The two-pass critic enforces it. The worked-example bank — real tasks with honest numbers — is the single highest-leverage new asset: it feeds the spine dimension *and* starves fact-invention. Prove on 2–3 different episode shapes before trusting unattended.

**(3) The ~97-page site + its experience bar.** The site is static. A `make site-gate` runs the deterministic experience checks (design-system, global-header standard, mobile-spacing block, hub-and-reveal, coherence) + one "cold-reader" LLM pass **on changed pages only**, blocking in CI on every edit. The page-experience-standard becomes a runnable gate, not a memory Ali polices. Known shipped defects become a *tracked repair worklist* in the ledger (reward-sync gap = 4 dead mechanics; 5 of 6 activity buttons inert; grimoire 13 zombies + glossary redirect chain; LIBRAiRY split `library.html` vs `_library-v3.html`; stale Ep04 song metadata) — fixed without lowering the gate to pass the back-catalogue. **Gate 4 must merge the redesign branch: 397 commits / 802 files sit unshipped while laidies.ai serves a month-old snapshot.**

**(4) Social derived from each episode.** `make surfaces` fans one ruled canon into the full weekly package (Reel script + hook, carousel copy *and* rendered on-brand PNG slides via a local headless-Chrome render of an HTML template, Story frames + poll + correct anchor, community prompt, LinkedIn draft, hashtags, one filled tracker row per surface) using canonical `@laidies.ai` / `@LAiDIES`. Pushed to a scheduler **draft queue**, released only at Gate 4 — never auto-posted. This replaces the thin generator and the stranded Windows-only `generate-social-proof.py`. (Adds the missing YouTube plan and the daily alliteration light-presence.)

**(5) Revenue — POD first, membership later.** The boundary is hard and non-negotiable: **I scaffold, Ali connects. No payment credential ever touches the pipeline.** Cheapest first dollars: the Gift Shop already ships with art, prices, and analytics — every `buyUrl` is `#`. Ali creates the products in Printful/Gumroad and pastes the hosted URLs; each episode stages its print as a *dormant* shop row, and the ADVISOR watches click-demand before prompting go-live (merch is the cherry, not the cake). The $6 KSVL Mix ships now as a standalone Gumroad file. Membership (Supabase magic-link + a paid tier) is the audience-gated long game — **Supabase was verified PAUSED 2026-07-22; re-check the status, don't quote it.** Build no paid tier until demand repeats.

**(6) Third-party tools.** Named, with the exact seam each plugs and who owns the auth (Ali owns every credential edge). The pipeline calls them as ordinary commands; none is a system to keep alive. See the table in §8.

**(7) The unbuilt vision.** The vision lives in ONE ranked file (root `IDEAS.md`); the weekly loop never depends on it. An item enters a week only when Ali picks it at Gate 1 or promotes it to a scaffolding task. This OS *is* the Wednesday Engine (her #1 pain); the per-scene narration-aware prompt generator is the Art Director role ("the big one"); the ADVISOR is the Friday loop-closer. SUNNYVAiLE High classes, LIBRAiRY restoration (17,763 stranded words, restore from `_superseded/grimoire/` — never delete `Website/`), and membership Part C enter as normal work once canon is ruled. No new destinations, no org apparatus.

---

## 6. Kill list — built, not working, stop maintaining

Five of six prior "fixes" failed by *adding* apparatus that never ran. Delete four, wire-or-drop the fifth, prove the sixth.

| Thing | Verdict | One-line reason |
|---|---|---|
| The 5-layer agent-org in `laidies-operating-model.md` (Operator, production agents, watchdogs) | **KILL the org, keep the law** | Described 5 layers, built ~1; the enforcing 80% has zero executable form. Keep only line 11 (the one law) + the Records concept. |
| `operations/agents/` (29 files: charters, council OS, scorecards, 2 HTML command centres, org map) | **KILL** | A corporate CEO/council LARP wired to nothing; only the condemned runner references it. Salvage at most `taste-benchmark-library.md` + `reputation-safety-gate.md` as critic inputs. |
| `operations/workflows/review-content.mjs` | **FIX-or-KILL** | The linchpin gate that never gated — a Workflow-runtime script that can't be `node`-run and nothing invokes. Reimplement its 5 prompts as the `make critic` subagent, then delete the `.mjs`. It must not stay in the "ready to run" third state. |
| `weekly-command-center.html` + `ops/ops-centre.html` + `ops/workspace.py` | **KILL** | Three abandoned dashboards, "homes nobody lived in"; chat is the one home. Keep the JSON ledgers (curation/rejections/notes); kill the app shells. |
| `ops/state.json` as a status home | **KILL** | Says `"generated": null` — the status file nothing kept honest. Status comes from a live-computed "where are we?", not a stored file. |
| `scripts/run-weekly-production.js` (1,365 lines) | **KILL** | Windows-only launchers, output is a dashboard nobody opens; its own successor's README says "retire this." Deleting it closes the last reference to the dead `agents/` council. |
| `scripts/generate-social-proof.py` | **KILL** | Windows-font-only, Issue-01-hardcoded, empty output dir. Replaced by the headless HTML→PNG slide renderer. |
| The instinct to build a seventh system | **KILL** | The answer is almost always wire-or-delete, never add machinery. |

**Note on today's engine (`operations/engine/`):** KEEP — it is the only artifact that *subtracts* (retires the runner, replaces the dashboards, refuses to auto-generate from bad canon, stops at four gates). But the Phase-1 verdict undermines any claim that it currently generates: today it is verify-and-stamp only, it has a *drafting stub*, and it has never completed a week. Its worth is provisional until proven on one real episode.

---

## 7. Build order — ranked by impact per unit of Ali's effort

The first five are concrete. Each is "wire or prove," not "invent a new system."

1. **Prove the engine on ep05, end to end.** Run `make week EP=05` through the full chain — even with hand-steps at the gaps — until one real episode ships. Everything else is a claim until this holds. (Ali effort: the four gates. Impact: converts the whole design from provisional to real.)
2. **Wire the critic as a `make critic` subagent + Stop-hook, calibrated on the Ep1/Ep5 pair.** Reimplement the five review prompts; make it default-FAIL, per-dimension, evidence-forced; pin the regression so it *must* fail the killed Ep5. Then delete `review-content.mjs`. This is the piece that removes Ali from the bug-catcher seat. (Ali effort: near zero. Impact: highest — without it, nothing else matters.)
3. **Build the substance-sheet gate (G1) + the verified worked-example bank.** The one-page sheet before prose is the highest-leverage unbuilt thing named in the diagnosis; the worked-example bank is the highest-leverage new asset. They ship together because the sheet's worked example is *drawn from* the bank. (Ali effort: 10 min/week. Impact: kills the Ep5-class failure at 90 seconds.)
4. **Wire the append-only LEDGER + default-on-silence + "where are we?" live status.** Every approval appended; any repeat becomes a default; every waiting item carries a question + a default. Retire `state.json`-as-home. (Ali effort: near zero. Impact: kills approval starvation and decision-evaporation, the two process failures that stalled the last attempt.)
5. **Rule canon for ep05 and switch derivation ON behind the `CANON-RULED` flag.** Resolve every recorded divergence to one value; same-day back-sweep on each locked ruling; nothing unverified locked as must-match. (Ali effort: a handful of one-question rulings. Impact: makes the surface-fan-out safe instead of a bug multiplier.)

Then, in rough order: **(6)** wire `make surfaces` social package + headless slide renderer (drafts only); **(7)** `make site-gate` in CI + first clean deploy of the redesign branch (Gate 4 merge); **(8)** turn on the Gift Shop + standalone $6 KSVL Mix (Ali pastes URLs); **(9)** the ADVISOR (Plausible read → Friday digest); **(10)** run the loop on 2–3 structurally different episodes before trusting it unattended.

---

## 8. Third-party tools

| Need | Tool | Who owns auth / status |
|---|---|---|
| Fire the weekly loop, nothing to keep alive | Hosted CI cron (GitHub Actions) | Ali owns the repo secret |
| Deliver gate questions where Ali lives + capture replies | Gmail approval-by-reply (small Cloudflare Worker webhook) | Ali; each reply appends to the ledger |
| Narration (heroine + announcer) | ElevenLabs | Ali connects key; scripts already tagged, generation not yet wired |
| Forced-alignment timing / captions | faster-whisper (local, `.venv-align`) | Already real and running |
| Per-scene image rendering | OpenAI gpt-image-1 (locked avatar config) | Ali connects key; unproven at weekly scale — least-tested part |
| Final video cut | CapCut | No API — human hand-step; the loop's true bottleneck |
| Host static site + CI deploy | GitHub Pages (current) / Cloudflare Pages | Gate 4 triggers deploy; branch must merge first |
| POD merch | Printful (physical) + Gumroad (digital $6 Mix) | Ali creates products, pastes URLs; I never touch money |
| Social scheduling | Buffer/Later/Meta Business Suite (drafts) | Ali connects; manual-from-drafts is the floor |
| Membership state + auth (later) | Supabase magic-link | **Verified PAUSED 2026-07-22 — re-check before quoting** |
| Payments | Stripe / Gumroad — **Ali connects** | Prohibited for the pipeline; scaffold only |
| Analytics for the loop | Plausible (Stats API) + Clarity | Live on-site; needs a read path for the ADVISOR |
| Slide graphics at scale | Local headless-Chrome HTML→PNG render | Self-contained, brand CSS; no third party |

---

## 9. How we work now (the meta-fix)

The recurring failure was never too little machinery — it was machinery that never ran, questions never asked, and decisions that evaporated. Four rules fix the way of working itself:

1. **No mid-stream questions with no default.** Nothing sits blocked on Ali without a posed question *and* a default that fires on silence. Silence never stalls the week; it fires the conservative default (HOLD on anything irreversible — publish and faces never auto-ship).

2. **Decisions get written down, once, and re-served.** Every ruling is appended to `LEDGER.md` (append-only — a single shared markdown file is a lost-write race across windows). Any answer given twice becomes a recorded default she is never asked again.

3. **Nothing is "done" without a re-runnable check.** "Anything re-explained more than twice is a check that hasn't been written yet." A gate that must be invoked by hand is not a gate. Status is never a stored file — it is re-computed live when asked.

4. **Subtract, don't add.** When something's wrong, the move is wire-or-delete, not build-a-new-system. Five of six prior fixes failed by adding apparatus. The one enforceable meta-rule: **the answer is almost never a seventh system.**

**And the standing risk register, so it isn't lost:** the critic's calibration is the whole ballgame (drift soft = the bug-catcher problem silently returns); reliability is proven across strategies but only one topic; the engine has never completed a week; canon contamination multiplies across surfaces if derivation runs before ruling; CapCut is an unautomatable single point of schedule risk; third-party tokens rot and must fail *loud* with a "reconnect X" message; and the redesign is one scary big-bang deploy away from being live.
