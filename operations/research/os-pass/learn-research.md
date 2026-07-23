# Digesting the prior research — critically

**Written 2026-07-22.** A critical read of the eight prior documents named in the brief:
`00-SYNTHESIS`, `A`–`F`, and `agent-operations-playbook.md`. For each: its central
recommendation, what it got right, and where it is thin, wrong, or walked around the hard
problem. Then the one thing none of them answered, stated plainly.

Every path below is absolute-relative to
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/`.

---

## 0 · The finding that sits above all the others

**Every report is about the control plane. None is about the engine.**

The brief (`operations/research/OPERATING-SYSTEM-BRIEF.md` lines 79–83) splits the work into
two phases in Ali's own words:

> **Phase 1 — generation.** Can an AI reliably draft Ep1–3 quality? Prove it or find why not,
> tested on the real episodes. *Don't build plumbing around a core that doesn't work.*
> **Phase 2 — architecture.** Given that answer, what operating system actually fits.

**All six research streams and the playbook are Phase 2.** They are checking (A), orchestrating
(B), surfacing state (C), communicating (D), tooling (E), and leading practice (F). Not one of
them ran Phase 1. The synthesis's "experiment" (`00-SYNTHESIS` §4.0) ran the *gate* against
`episode-01` and `episode-05` — that is **evaluation of files that already exist**, not
generation. Nobody had the machine draft an episode from a topic and measured the result against
Ep1.

This is not a small omission. It is the load-bearing question, and the corpus has quietly
**redefined it out of existence**. The reports assume a draft arrives and the job is to *filter*
it. But a gate is a rejection function. It makes Ali's *rejection* cheap (A's 6-minute substance
sheet); it does nothing to make the machine's *draft good*. If the generator's hit-rate against
the gate is low, the result is not a better episode — it is an infinite loop of blocked drafts and
no Wednesday. The one deadline the whole system exists to defend is the one a pure-gate design
cannot defend.

**And the repo's own base rate argues against the buried assumption.** Ep4 "departed" and Ep5
"failed" — two consecutive *human-supervised* attempts missed the bar (brief line 27, "the
unproven core"). That is the number that matters for Phase 1, and no report measured it or tried
to move it. `operations/engine/` (Makefile + `gate.sh` + `checks/`, built the same day) is,
by the brief's own admission (line 64), "plumbing only; the generative core is unproven."

The honest state of the corpus: it is an excellent, self-correcting body of work about how to
**catch** a bad episode and **route** the week — built on the untested premise that a good episode
can be **produced** in the first place. Where it touches generation at all, it does so in single
throwaway lines (see B-Stage 2 and F §5 below). Everything expensive to be confident about was
left where it was found.

**What the reports DO offer toward generation — thin, scattered, and worth pulling forward:**

1. **A's Substance Sheet** (`A` §4.2) is the most generation-relevant idea in the entire corpus,
   and it is filed under "human approval," not "generation." Its real power is that it *changes the
   task the AI is asked to do*: not "write a good episode from a topic" (open-ended, two-for-two
   failures) but "render an already-approved plain explanation into Ep1 voice" (constrained,
   far easier). That reduction may be the actual answer to Phase 1 — but **no report tested the
   reduced task either.** It is a hypothesis wearing an architecture.
2. **F's Every / Kate Lee model** (`F` §5): a machine-checkable rules artifact, negative examples
   attached to each rule, and a **developmental edit *before* the line edit**. Structure the
   generation, don't just filter its output. Still an editing architecture, not a proof the first
   draft can land.
3. **F's harness lineage** (planner→generator→evaluator): demonstrated by Anthropic on *web apps*,
   where the evaluator tests functionality (does the button work) — a near-objective signal. For
   teaching prose the evaluator is the same LLM-judge that report A spends 700 lines proving has a
   true-negative rate under 25%. **F imports a generate→evaluate→regenerate loop whose termination
   condition is exactly the judge A proved you cannot fully trust.** That circularity is unremarked.

Foreground this in Phase 1: **before building any more plumbing, have the machine draft one episode
from an approved substance sheet and measure it against Ep1 with A's own gates. That single
experiment is worth more than any report here, and it is the one experiment none of them ran.**

---

## A · Teaching-quality gate — `A-teaching-quality-gate.md`

**Central recommendation.** Seven deterministic checks that block (term-consistency /
synonym-pileup, metaphor-carry ratio, answer-passage specificity, claim/ledger reconciliation,
the existing `check-episode.sh`, rhythm-WARN) + three *judged* checks that are binary,
per-dimension, forced to return a verbatim quote verified with `str.find()`, sampled 3× with an
any-FAIL veto, and themselves gated by a 24-item golden set measured on **TNR, never accuracy** +
one human gate moved upstream (the Substance Sheet). The gate decides *eligibility to be shown to
Ali*, never *good*.

**What it got RIGHT — this is the strongest single document in the corpus.**
- It **measured on the real files**, today, not theorised: metaphor-carry Ep1 10% vs Ep5 52% (5×);
  synonym pile-up model=3 vs 6, app=0 vs 8; named-products-in-the-answer-passage 3 vs 0. Three
  independent, deterministic separations of the gold standard from the rejected draft, none needing
  an LLM (`A` §1.2–1.5).
- It proved the *current* gate carries **zero information** on this axis: `check-episode.sh`
  returns a byte-identical `0 fail · 2 warn`, exit 0 for both Ep1 and Ep5 (`A` §0). That reframes
  the problem from "tune the gate" to "the gate is a new instrument."
- The **anti-rubber-stamp analysis is the best thing in the whole research pass.** The TPR>96% /
  TNR<25% asymmetry (arXiv:2510.11822, 14 models) means "rubber stamp" is not a drift risk but the
  *measured default* of an uncalibrated judge — so mechanical checks must carry the block and every
  judged check must be phrased so **"fail" is the low-effort answer** (`A` §3.1).
- **Extractive-quote-with-a-mechanical-backstop** (`A` §3.5): a judged check whose output is a
  verbatim span you can verify exists in the file converts an unfalsifiable verdict into a
  falsifiable one. Genuinely clever, and directly sourced (Rulers, arXiv:2601.08654).
- Honest corrections to the record: pairwise-beats-absolute is **not** Anthropic's claim (fixes the
  brief); multi-judge panels gutted by the correlated-errors result (arXiv:2605.29800, n_eff≈2.18).

**Where it is thin / walked around.**
- **Thresholds are calibrated on n=3 files** — its own caveats #5/#6. The metaphor-carry test has
  **no named prior art**; the report flags it may be "overfit to n=3." The whole quantitative spine
  rests on three data points and will move.
- **It is entirely an evaluation design and never says so as a limitation.** It assumes drafts
  arrive to be filtered. It has no answer for the case where the drafter fails the gate 9 times in
  10 — which is precisely the Phase-1 question. The Substance Sheet is its only reach toward
  generation, and it is filed as a *human* gate, not a *generation* strategy (see §0.1 above).
- Gate 9 (pairwise vs Ep1) "has never been run" (its own #1 open item) — its Ep5 verdict is a
  prediction. Gate 4's Ep5 verdict is "a flag, not a finding." So two of ten gates are unproven on
  the very pair the report is built around.
- The 0.83 TNR floor is `[INFERENCE]`, not a validated number (its #7).

**Verdict: keep, and build it — but understand it is the filter, not the engine.**

---

## B · Weekly cycle automation — `B-weekly-cycle-automation.md`

**Central recommendation.** The orchestrator is a **Makefile, not an agent framework** — the week
is a dependency graph (canon → ~11 surfaces), so `make` gives resumability and partial-failure
safety for free. Wire the orphaned scripts. Derive `issue-0N.json` *from* `episode-0N.canon.md`.

**What it got RIGHT.**
- Read the code instead of guessing, and found the **orphaned-scripts pile**: `check-episode-cues.js`
  (the playbook's #1 recommendation, already written, wired to nothing), `check-local-links.js`,
  `check-inline-js.js`, and `review-content.mjs` — the 5-reviewer teaching gate, orphaned *by
  design* ("It does NOT auto-run") (`B` §1b).
- The **two-sources-of-truth drift engine**: `build-episode-assets.js` (the real generator) reads
  `issue-0N.json`, but canon/`check-town.js`/`build-art-batch.py` treat `episode-0N.canon.md` as
  authoritative. `issue-05.json` touched 07-21, `episode-05.canon.md` on 07-10. One wiring change
  from being the fix (`B` §1c).
- **Environment landmines that silently kill a stage**: `align.py` hard-codes `episode-04` in three
  output paths (running Stage 3 for Ep5 overwrites Ep4's captions); `ffmpeg` not installed anywhere
  on PATH; GNU Make 3.81 (2006) so `.ONESHELL`/`$(file …)` don't work; Stage-3 venv lives in the
  *other* copy of `tools/` (`B` §1e). These are the difference between a design and a thing that runs.

**Where it is thin / walked around — and it is the same wall as everyone else.**
- **Stage 2, the drafting, is one line**: "The drafting, from canon only. Then the full gate
  battery again… Up to two automatic revision rounds; on a third failure the run stops and names
  the gate and the line" (`B` §Stage 2). This is the **only** place in any report that describes
  generation, and it hand-waves the entire hard part ("the drafting") while lavishing detail on the
  verification wrapped around it. "Two automatic revision rounds then stop" *is the infinite-loop /
  no-Wednesday failure mode* stated as if it were a solved control flow. What happens on the third
  failure? The week has no episode. The report does not say.
- Assumes canon is a usable generation source — but the synthesis's own §4.5 shows **canon is
  contaminated** (reverse-extracted from buggy shipped surfaces). B's "derive from canon" and the
  synthesis's "do not switch on derivation yet" are in direct tension; B does not resolve it.

**Verdict: keep the Makefile spine and the wiring worklist; the generation stage is a stub.**

---

## C · Command centre — `C-command-centre.md`

**Central recommendation.** Don't build a fourth dashboard. One question, `where are we?`, computed
**live at the moment she asks** and answered in ~250 words of plain text with ≤3 decisions each
carrying a default that fires on silence. Same answer injected unasked at session start.

**What it got RIGHT.**
- The diagnosis of why three dashboards died is **file-evidenced, not theorised**: `state.json`
  carries `"generated": null` and nothing ever stamps it, so a dashboard built from it *cannot*
  show its own staleness; `ops-centre.html` was off by >2× on its headline number within five days
  (`C` §1).
- The rule is genuinely useful and generalises: **"A destination survives exactly one bounded task
  with an end state. It never survives as a habit."** Curating 375 images has a last image; "check
  the command centre" has no finish line (`C` §1).
- **Approval starvation, not fatigue**: `ops/tasks.json` has three tasks blocked-on-Ali since
  07-17 with no record any was ever *asked* — the exact inverse of the playbook's premise (`C` §0).

**Where it is thin / walked around.**
- The fix relies on Ali actually **asking** `where are we?` — which is itself a habit, the precise
  thing the report just argued dies. It leans on session-start injection to cover this, but that is
  a partial patch, not a resolution; it moves the "will she engage" problem to a new surface rather
  than removing it.
- "Answers in ~250 words with ≤3 decisions and defaults that fire on silence" assumes the
  underlying checks are trustworthy and fast enough to run synchronously every time — untested at
  the scale of the real check battery.

**Verdict: keep the principle (live-computed, not stored); the delivery still depends on a human habit.**

---

## D · Communication and state — `D-communication-and-state.md`

**Central recommendation.** Replace the playbook's hand-edited `DECISIONS.md` with an
**append-only line-per-decision log + a derived ≤60-line view** injected at session start (a single
markdown file is a read-modify-write race across five windows — the loser silently loses its
decision). One approval quota with defaults that fire on silence. Name the five windows for lanes
that don't share files. Make both directories load the same hooks.

**What it got RIGHT.**
- The **split-brain finding is concrete and important**: a session in `LAIDIES/` loads 11 hooks;
  one in `LAIDIES/Website-homepage/` loads **one** — so which window Ali opens decides which rules
  are enforced, invisibly. And because `LAIDIES/` isn't a git repo while `Website-homepage/` is,
  the auto-memory is **one launch away from forking** into two MEMORY.md files (`D` §0a/b).
- Caught that the memory index is at **79% of its 200-line / 25KB hard ceiling** (`D` §0c) — a real
  clock nobody was watching.
- Named the **iCloud Drive filesystem** as a factor the playbook ignored (`D` §2.5), and corrected
  the Stop-hook deadlock valve from 8 to 10 blocks against the live docs.
- The append-only-vs-single-file concurrency argument is correct and the playbook genuinely missed
  it (it was written for one window).

**Where it is thin / walked around.**
- "Five windows, name them for non-shared lanes, talk to one" is **organisational discipline, not a
  mechanism**. Ali remains the router. The report is honest that this is the shape, but it is a
  human-process fix dressed as an architecture, and human-process fixes are exactly what the brief
  says keep failing.
- The append-only log's integrity still depends on **agents writing to it with discipline** — the
  same "prose is advisory" problem D itself names for `inject-rules.py` rule 6. It proposes a Stop-hook
  write path (§2.4) but that guards one condition, not the general habit.

**Verdict: build the append-only log + derived view + same-hooks fix (10 min, high value); the
five-window routing is a convention, not a solution.**

---

## E · Third-party tools — `E-third-party-tools.md`

**Central recommendation.** Most of the "tool gap" is not a missing product — it's a script + a
manifest. Adopt only three cheap things: a phone-tappable art approve/reject writing to Supabase
(already in the stack), a weekly GitHub Actions health job that opens an Issue, and loudness
normalisation in assembly. Ignore every DAM product, ComfyUI, and Ayrshare.

**What it got RIGHT.**
- The **live defect nobody knew about**: `laidies.ai` is on Cloudflare nameservers but **grey-cloud
  (DNS-only)** — A records resolve straight to GitHub Pages, no `cf-ray`. Consequence, *tested*:
  `https://laidies.ai/@ali` returns **404** — the entire `/@handle` → Closet feature's Transform
  Rule never runs, because Transform Rules only fire on proxied traffic (`E` §0.1). Highest
  value-per-minute item in the corpus, and it is a dashboard toggle, not a purchase.
- **4.3 GB repo against GitHub's published 1 GB Pages limit** (`E` §0.2); **62 broken image refs**
  to 36 missing files live right now (`E` §0.4); **`curation.json` governs only 12.5%** of the
  image library — so the playbook's tree-wide allowlist (D8a) would fail closed on 2,614 legitimate
  files and must be scoped to `assets/episodes/` (`E` §0.3, a real correction to the playbook).
- The "no-dashboard" delivery mechanism (`ai-model-freshness.yml` opens an Issue on a cron, free
  and unlimited on a public repo) already exists and works — so monitoring is "add a job," not "buy
  a product" (`E` §0.5).

**Where it is thin / walked around.**
- The Cloudflare fix is presented as "one toggle" but is **untested** and carries its own
  redirect-loop caveat (needs SSL/TLS Full, test on the secondary zone first). It's a strong
  hypothesis, not a verified fix — the report says so, but the "highest value-per-minute" framing
  undersells the risk of flipping proxy on a live 4 GB site.
- Out of scope for generation, correctly — but that means E, too, spends its energy on the control
  plane and infrastructure, reinforcing §0.

**Verdict: act on the measured defects (Cloudflare, broken refs, size decision); adopt the three
cheap tools; the DAM/ComfyUI/Ayrshare rejections are sound.**

---

## F · Leading practice — `F-leading-practice.md`

**Central recommendation.** The playbook missed an entire published Anthropic body of work: the
four-post **harness lineage** (planner/generator/evaluator, initializer/coder split, decoupled
durable event log) plus the `cwc-long-running-agents` code artifact with its **default-FAIL
structural contract** (every criterion starts `false`; a PreToolUse hook denies writing "pass"
until an evidence file was Read). And the **Every / Kate Lee editorial model**: a machine-checkable
rules artifact, a developmental edit before the line edit, a human taste gate that is explicitly not
automated.

**What it got RIGHT.**
- Found the four missing Anthropic posts and read them for **cost and failure data**, not slogans:
  the DAW harness run was 3h50m / $124.70 (planner 4.7 min / $0.46; QA 25 min / $10.39). Real
  numbers for what a harness costs (`F` §1.1b).
- The **default-FAIL contract** is the sharpest structural idea it surfaces, and it is backed by a
  verbatim justification: *"Asking nicely in the prompt doesn't reliably stop this. The harness
  makes 'done' structural."* (`F` §1.2, §D3).
- **The most honest sentence in the entire corpus** (`F` §5): *"The realistic ceiling for AI in
  editorial production is faster mechanical passes plus better first drafts, not a shipped-quality
  pipeline."* Backed by the Reuters-Institute 13%/42% split (most orgs with more staff and budget
  reported *limited* results) and the Chicago Sun-Times fabrication (10 of 15 books didn't exist —
  because the verification step was **a habit rather than a gate**, the exact Ep5 shape).

**Where it is thin / walked around — and it is the crux of the whole pass.**
- F comes **closest to the generation question and then turns away from it.** It quotes Anthropic
  that aesthetics "can be improved with grading criteria" — *improved*, inside a
  generate→evaluate→regenerate loop — and presents planner/generator/evaluator as the answer. But:
  (a) that architecture was demonstrated on **web apps**, where the evaluator's signal is near-
  objective (does the feature work end-to-end); (b) for LAiDIES prose the evaluator is the **same
  LLM-judge report A proved has TNR<25%**; (c) **the loop's termination condition is therefore the
  very judge you cannot trust.** F does not notice this circularity. Its own honest ceiling line
  ("better first drafts, not shipped quality") *contradicts* the harness architecture it recommends,
  and the two are never reconciled.
- The Every/Kate Lee model is a *human editorial org* with a paid editor-in-chief as the taste gate.
  F reads across the mechanics (rules artifact, developmental edit) but the one irreplaceable role —
  the human who decides if it's good — is exactly the role LAiDIES is trying to remove from the
  weekly loop. F imports the scaffolding and quietly leaves out the keystone.

**Verdict: keep the default-FAIL contract and the developmental-edit-before-line-edit idea; treat
the planner/generator/evaluator loop as unproven for prose until Phase 1 tests it. F's own ceiling
sentence is the most important line to carry forward.**

---

## Playbook · `agent-operations-playbook.md` (2026-07-21)

**Central recommendation.** Ten changes ranked by *founder-time* effort, spine = determinism vs
judgement ("is this a rule, or a check?"), #1 = the coverage gate, #2 = a blocking Stop hook, #3 =
paste two grounding paragraphs into project instructions.

**What it got RIGHT.**
- The **determinism-vs-judgement spine** is correct and every later report adopts it. "Anything
  re-explained more than twice is a check that hasn't been written yet" is the right organising idea.
- The Anthropic-sourced foundation (orchestration patterns and *when the pattern is 'don't'*, the
  15× token multiple as the multi-agent decision rule, effort tiering) is solid and well-labelled.
- Correctly flagged two traps to avoid: full-site visual regression (maintenance trap at ~188
  pages) and multi-agent parallelism on shared site files (write-conflict territory).

**Where it is WRONG or was superseded — the later reports corrected it materially.**
- **#1 (coverage gate) was already built** — `check-episode-cues.js`, wired to nothing. The
  recommendation should have been "wire it, 30 min," not "build it" (corrected by B).
- **It concluded no method exists for grading creative quality.** Anthropic published one on
  2026-03-24; the playbook's source list had 6 Anthropic posts, the index carries 25, and 4 of the
  missing ones are on exactly this topic (corrected by F).
- **A6 is backwards for this operation** — it leads with the 93%-approval "fatigue" finding and
  prescribes *fewer* gates; the real failure is approval *starvation* (corrected by C and D).
- **D4b (`DECISIONS.md`) is a read-modify-write race** across five windows (corrected by D).
- **Multi-judge consensus** (listed as an Anthropic technique) is largely gutted by the 2026
  correlated-errors result that post-dates it (corrected by A).
- **D8a allowlist can't be tree-wide** at 12.5% manifest coverage; **`ffmpeg` is listed in the
  stack but is not installed** (corrected by E and B).
- Mis-attributed "pairwise beats absolute" to Anthropic (corrected by A).

**Verdict: the spine survives; roughly a third of the specific top-ten items were already built,
already wrong, or superseded within 24 hours. Read it as the first draft the later reports edit,
not as current guidance.**

---

## The batched forks these reports leave for Ali (not for me to decide)

1. **The 1999 narrator paradox** (`00-SYNTHESIS` §4 Finding 5): the framing device puts the heroine
   *outside* 1999 looking in (licensing pickleball / oat latte), but `perpetually-1999-voice` says
   every line is written from *inside* 1999. The script wants both; the rule allows one. Every
   episode inherits this until ruled.
2. **The 5.27 GB / 1 GB Pages question** (`00-SYNTHESIS` §5.2): serve images from a bucket, or thin
   what's tracked, or accept the risk knowingly. A decision, not an emergency.
3. **Flip Cloudflare to proxied?** (`E` §0.1): unblocks `/@handle` but is an untested change to a
   live 4 GB site with a redirect-loop caveat.

## The one experiment that would settle more than all of this

Have the machine draft a single episode **from an Ali-approved Substance Sheet**, in Ep1 voice, and
run A's gates against it. If it lands: Phase 1 is answered, and the substance-sheet reduction is the
engine. If it doesn't: we have measured *why* the generative core fails, which is what the brief
actually asked for — and no amount of additional plumbing was ever going to substitute for that
measurement.
