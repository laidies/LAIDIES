# Why the operating model didn't hold — and what a working one must do differently

_OS pass · 2026-07-22 · read-only diagnosis. Every verdict has a file:line or a quote. Where I could not verify, I say NOT VERIFIED._

Source read in full: `operations/laidies-operating-model.md` (v1, 2026-07-10). Cross-checked against `operations/research/00-SYNTHESIS-how-the-operation-runs.md`, `operations/research/os-pass/learn-notworking.md`, and direct inspection of the repo.

---

## The one-sentence answer

**The law was right; the enforcement was never built, and the one piece of enforcement that *does* run guards the wrong thing.** The model diagnosed the real disease (Ali as bug-catcher of last resort) and prescribed a correct spine — *produce from a verified source of truth → gate with adversarial review → only then ship*. Then it implemented that spine as a **five-layer agent org whose enforcing layers have zero executable existence.** So in practice nothing changed: the finished script still landed on Ali raw, and she was still the gate.

It did not fail because it was ignored. It failed because **the mechanism it was anchored on cannot be invoked**, and the model's own status table said so on the day it shipped.

---

## Precisely why it didn't hold — mapped to your four hypotheses

### 1. Never enforced — the linchpin is structurally un-runnable (primary cause)

The whole model is anchored on one file. `laidies-operating-model.md:63`: the gate battery is "**what replaces the audit**"; line 117: "The gate battery → `operations/workflows/review-content.mjs` (deterministic PASS/FAIL)."

That file has **never run, and cannot be run the way anything here runs things:**
- It is a Claude Code **Workflow-runtime** script. It calls bare globals — `phase()`, `parallel()`, `agent()`, `log()` (`review-content.mjs:76–92`) — that only exist inside the Workflow harness. You cannot `node` it. Its own header says so: `review-content.mjs:5` — "**It does NOT auto-run; invoke it explicitly.**"
- Nothing invokes it. Grepping the repo, `review-content` appears **only in prose** (`laidies-operating-model.md`, the research docs, an audio brief) and in **one `echo`**: `operations/engine/gate.sh:137` prints its path as a thing you are *supposed to* run next. `gate.sh` never calls it. Verified this session.

So the central enforcement is a design document wearing a `.mjs` extension. It is not "enforced but ignored" — it is **uninvokable**. A linchpin that has never once turned.

### 2. The enforcing layers were never built — and the model admits it in its own status table

Layers 2 (persistent "Operator" orchestrator), 3 (production agents), and 5 (watchdogs) are described in future tense and have **no executable form**:
- **No `.claude/agents/` directory exists** (verified this session). The model's own mapping says production + gate agents live there (`laidies-operating-model.md:116`). They don't.
- The build-status table is the confession. `laidies-operating-model.md:137–142`: only step 1 (fact base) is ✅. The Review Gate is 🟡 "**written; ready to run**" — it never ran. "Registry + Operator cadence" and "Watchdogs" are ⬜ — never started.

**The model shipped as a plan that documented itself as unbuilt, and the unbuilt 80% was the entire enforcement half.** A source-of-truth doc that says "here is the machine that will catch the bugs (not built yet)" leaves the operation exactly where it was: defended by nothing.

### 3. Wrong division of labour — it modelled an *org* where the work is a *graph*

The week is a dependency chain: canon → ~11 derived surfaces. That is a build graph, not a conversation. The model instead cast it as a **corporate org** — an Operator chief-of-staff, five production agents, a five-gate "battery," four standing watchdogs. That apparatus has two fatal properties:

- **It must be kept alive.** A "persistent orchestrator," a localhost dashboard, cron watchdogs — all die the moment the terminal closes. Your own memory already ruled against this: *chat is the one home*, and (`learn-notworking.md:83`) "a dashboard nobody keeps open loses to the chat window that's always open." `ops/state.json` proves it: `"generated": null` (verified this session) — the status file nothing kept honest.
- **The thing that actually runs is the opposite of the apparatus.** The plain shell checks in `operations/engine/checks/` — `check-inputs.sh`, `check-must-match.sh`, `check-prose-voice.sh` — run every time and pass (per `learn-notworking.md:66–67`, real PASS logs exist). No org, no operator, no runtime. Just files a `make` target calls. The model bet on machinery; the machinery that works is the machinery that has nothing to keep alive.

### 4. The one gate that *does* run enforces the wrong thing

Where enforcement exists, it is pointed backwards. `check-episode.sh` — a grep for banned phrases — is what actually gates. Two measured failures:
- It **passes the file Ali stopped by hand.** `00-SYNTHESIS:112–118`: `bash check-episode.sh 5` → "0 fail · 2 warn · EXIT CODE: 0" on the Ep5 master Ali killed for "explaining things in a terrible way." Exit 0 means ship.
- It **mechanically propagates an error.** An unverified Fei-Fei Li quote is locked in Ep1's MUST-MATCH block, so `check-episode.sh` actively verifies that unsourced string appears on *every* surface (`00-SYNTHESIS:150–163`). The one gate that runs *guarantees* the error reaches every page.

Stated as the synthesis did (`00-SYNTHESIS:47–50`): the guardrails that **block bad actions** got built (PreToolUse hooks). The evaluators that **grant "done"** did not. The operation is well-defended against a known-bad phrase and **completely undefended against a plausible-looking draft** — which is exactly the failure mode that stopped Ep5.

### 5. Ali is in the loop at the wrong point, on the wrong artifact — and starved

The model puts her at "approve the episode at the substance gate — with receipts" (`laidies-operating-model.md:95, 105–108`) and promises upstream gates catch everything first. In practice:
- **The substance sheet was never built.** Her own 10-July ruling — approve a one-page "which model for what + why" *before* prose exists (`00-SYNTHESIS:302–309`) — is the highest-leverage unbuilt thing. Without it she approves a finished 1,400-word script. That is 20 minutes of taste on a late artifact = **bug-catcher of last resort**, the exact thing the model swore to end.
- **Upstream never ran, so everything reached her raw.** Gates that don't execute don't filter. The model's promise ("a bug the system should have caught never surprises her," line 95) was void the moment the gate didn't run.
- **Approval starvation, not fatigue.** `00-SYNTHESIS:499–503`: tasks sat blocked on Ali since 17 July with no evidence any was ever *asked*. Nothing posed a question; nothing had a default that fires on silence.

### 6. The source of truth was assumed clean — it is contaminated

Rule #1 is "source-of-truth or silence" (`laidies-operating-model.md:14`). But the canon files were reverse-extracted from already-shipped buggy surfaces, so canon **records drift instead of ruling it**: the Ep title is carried as both "Do AI" and "Use AI"; the BCG "14 points" adoption stat is reframed as outperformance and baked into `episode-01.canon.md:41` (`00-SYNTHESIS:353–386`). The model's core multiplier — derive 11 surfaces from canon — turns one error into eleven when pointed at contaminated canon. **The model treated "a Record exists" as "the Record is true." Existence ≠ ruled.**

---

## What a working version must do differently — concrete and blunt

**Keep the one law. Delete the org.** The spine (`:11`) stays verbatim. Layers 2/3/5 (Operator, production-agent roster, standing watchdogs) go — they promise agents that were never built and must be kept alive.

1. **Enforcement must be runnable by default, not invokable-in-principle.** No "ready to run" linchpin may exist. Either wire the five gate *prompts* from `review-content.mjs` into a subagent that a Stop-hook or `make` target actually calls, or delete the `.mjs` and reimplement the prompts as that subagent. If it doesn't run on every ship, it isn't a gate.

2. **Two tiers, both wired:**
   - **Deterministic shell** (already runs; extend it): term-consistency, metaphor-strip, named-entity floor, banned phrases, and MUST-MATCH restricted to ledger-cleared strings only. Blocks at the ship hook.
   - **One LLM evaluator** in a fresh context, evidence-forced (must quote the offending line), **default-FAIL**, calibrated on the Ep1/Ep5 pair as a permanent regression test: if it ever passes the Ep5 draft, the judge is broken and that week's verdicts are void. Report and block **per-dimension** — a single overall PASS/FAIL is useless because everything fails it.

3. **The gate is a finder scoped to what's about to ship, not a blocker on the back-catalogue.** Shipped-episode findings become a tracked repair worklist. Don't lower the bar to make Ep1 pass — that is how a gate becomes a rubber stamp.

4. **Rule canon before switching on derivation.** Derivation stays OFF until every recorded divergence has one ruled value. Standing rule: every locked ruling gets a same-day back-sweep against existing canon, or canon becomes the place old violations are preserved. Nothing unverified may ever be MUST-MATCH-locked.

5. **Move Ali earlier and cheaper — four gates, ~50 min/week:** G1 the one-page substance sheet *before any prose* (metaphor box written last; the sheet must survive its deletion); G2 art triage on flagged frames only; G3 the assembled cut once; G4 publish. This is the point at which the Ep5 failure was visible in 90 seconds.

6. **Kill approval starvation.** Nothing sits blocked on Ali without a posed question and a default that fires on silence. Any answer she gives twice becomes a recorded default.

7. **Home is chat, not a dashboard.** One `where are we?` that runs the checks live and answers in ~250 words with ≤3 decisions, each with a default. Retire the three dashboards and `state.json`-as-home.

8. **Orchestration is a Makefile, not a persistent operator.** Resumable stamps, `.DELETE_ON_ERROR`, nothing to keep alive. Agents are invoked as ordinary commands; gates are approval files the graph waits on.

9. **Prove it on one real episode end-to-end before claiming it "runs the week."** No episode in `engine/build/` has ever passed beyond stage 1 (`learn-notworking.md:112–116`). The model's worth is provisional until ep05 runs the full chain.

**The through-line:** the fix is not a seventh system. It is to keep the one law, delete the four things that add apparatus, wire (or delete) the one gate that never gated, rule the canon, and move Ali's judgement onto a one-page sheet before prose. The model failed by building an org to enforce a law; a working version enforces the law with a hook, a Makefile, and one calibrated judge.
