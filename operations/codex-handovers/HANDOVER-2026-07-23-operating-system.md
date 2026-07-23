# HANDOVER — operating-system session, 2026-07-23

*For Codex (or any agent) to pick up this thread seamlessly. Written by Claude at the end of a long,
difficult session. Everything here is marked as BUILT+PROVEN, BUILT (unproven), NOT BUILT, or a
DECISION. Absolute paths throughout. Repo root:*
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage`

---

## 0. READ THIS FIRST — hard rules for this tree

- ⛔ **NEVER** run `git checkout` / `restore` / `clean` / `stash` / `reset --hard` here. Uncommitted
  work has been destroyed in this tree before. Commit to a branch to preserve state.
- **Codex scope contract** (`AGENTS.md`, both repo roots): Codex does production — images AND video
  (CapCut projects + exports). Hard rails: no git; don't clobber approved originals; don't rework
  site code or canon unasked.
- **Ali is non-technical.** She pastes what she is told to. She is *not* the person who should be
  catching bugs. Do not hand her half-built things to QA.
- **Verify, don't guess.** Never assert what a tool/service can do from memory — check it. Several
  past errors (Hyvor, Supabase, "site is stale") were confident guesses that were wrong.
- **Don't self-certify.** "Done / proven / on-canon / on-brand" is Ali's verdict or the result of a
  re-runnable check — never a claim.

---

## 1. THE ACTUAL PROBLEM (why this session happened)

Ali's operation keeps producing systems that are **built and never wired/run**. The teaching-quality
gate, the agent council, three command centres, a weekly runner — all built, none running. Meanwhile
the real weekly loop is exhausting and unsustainable, and the single biggest reason is:

> **Ali is the copy-paste wire between two AIs.** Claude writes a prompt → Ali pastes it into Codex →
> Codex drives the CapCut app directly (and does image renders) → Ali carries the result back.
> Prompt after prompt, all day, much of it re-pasted because the first prompt was wrong.

No gate or check touches that. **Removing Ali as the relay between Claude and Codex is the real
efficiency problem** — bigger than anything in the engine below. It is NOT yet solved. Open question:
can prompts reach Codex without going through Ali's hands (does Codex have a CLI / file-watch / API
entry, or is app-driving the only path)? This was never verified — verify before designing around it.

---

## 2. WHAT WAS BUILT + PROVEN THIS SESSION (you can trust these; re-run them)

### 2.1 Two landmine fixes in the timing tools
- `operations/tools/align.py` and `operations/tools/beat-brief.py` had `episode-04` **hard-coded** in
  their output paths. Running them for Ep5 would silently overwrite Ep4's finished captions/timing.
- **Fixed:** both now derive the episode number from the input filename (with an explicit override
  arg on align.py). Proven: ep05 input → ep05 outputs; an unnameable file → exit 1 (refuses to guess);
  Ep4's real captions untouched.

### 2.2 Hooks now load regardless of which folder a window opens
- A window opened in `Website-homepage/` used to load **1** hook; one opened in `LAIDIES/` loaded 12.
- **Fixed:** `Website-homepage/.claude/settings.json` now includes the 12 root hooks (paths repointed
  `../.claude/hooks/`). Proven: the destructive-git guard fires (blocks `git checkout -- .`, allows
  `git status`).

### 2.3 The Wednesday Engine — plumbing only (see §3 for what's NOT built)
`operations/engine/` : `Makefile`, `gate.sh`, `where.sh`, `hashstamp.sh`, `README.md`,
`checks/{check-inputs.sh, check-must-match.sh, check-prose-voice.sh}`.
Plus hooks `operations/hooks/{enforce-voice-spec.py, block-approval-forgery.py}`.
- `where.sh <EP>` → plain-English status of the week. Proven runs.
- `gate.sh <EP>` → runs every EXISTING check for an episode, one verdict. It **wires** checks that
  were already written and connected to nothing (`check-episode.sh`, `scripts/check-episode-cues.js`,
  `scripts/check-local-links.js`, `scripts/check-inline-js.js`, `scripts/check-town.js`).

### 2.4 gate.sh scope bug — FOUND and FIXED this session (the one thing to actually believe today)
- **Bug:** `gate.sh <EP>` defaulted to `--scope all`, which ran two WHOLE-SITE scans (111 pages).
  Because ~5 windows edit the site at once, the episode verdict flickered PASS/FAIL based on unrelated
  pages being mid-edit. Ali saw it give two different answers on Ep1 — reads as "your tools are random."
- **Fix:** default scope is now `episode`; `check-episode-cues.js` moved into the episode block (it is
  episode-scoped). Whole-site health is now deliberate: `gate.sh <EP> --scope site` (or `all` before a
  deploy).
- **Proven, just now:** Ep1 gate → PASS identically ×5; Ep3 gate → FAIL (real banned phrase, see 4.2),
  so not a rubber stamp; episode scope never invokes the 111-page scan.
- Memory: `episode-gate-scope-separation`.

---

## 3. WHAT IS NOT BUILT (do not treat these as done)

- **`make critic`** — the AI reviewer that is supposed to replace Ali as bug-catcher. **Zero targets
  in the Makefile. Not built.** This is the load-bearing piece of the whole design.
- **A repeatable drafter command.** The three good Ep5 drafts (§4) came from a one-off Workflow, not a
  command you can re-run.
- **End-to-end:** no episode has ever passed beyond stage 1 of the engine. Audio, art, cut, surfaces,
  social, revenue stages are unbuilt/unrun.
- **Surface derivation (Stage 8) is deliberately OFF** behind a missing `operations/engine/CANON-RULED`
  file — because canon is contaminated (§5). Do NOT switch it on until canon is ruled.

---

## 4. THE Ep5 WORK (decisions locked by Ali this session)

Ep5 = **"The Super Models" / model-choosing.** It is about **models, not apps**.

- **Capability (what she can DO after):** look at the model list and pick the one the job needs,
  instead of always reaching for the top/most-expensive one.
- **Analogy (locked):** *"You don't wear haute couture to the beach."* (Passes the strip test — you
  can reason from it: why is the top model slow? couture is hand-made; use the cheap one for the hard
  job? swimsuit to the gala.)
- **Worked example (locked by Ali):** the heroine renaming **200 badly-named files** on the shared
  drive (`final.doc`, `final_v2.doc`, `FINAL USE THIS ONE.doc`). The expensive model wants a
  conversation about each file; the fast one just renames them. Couture at the beach.
- **Decision rule:** 200 rows of the same tidy-up → the fast model. The board paper where one wrong
  number costs you → the careful model.

**Substance sheet:** `content/episodes/episode-05.substance.md` (this is Stage 1 — the one page Ali
approves BEFORE any prose. Ali has NOT given final approval yet.)

### 4.1 The generation experiment (the crux, and the honest result)
Three full Ep5 scripts were drafted by three strategies + a control, then judged against the real
Ep1–3. Files: `operations/research/os-pass/generation-experiment/ep05-draft-{skeleton,ep2match,plainfirst}.md`
and `control-ep2-redraft.md`. Verdict: `operations/research/os-pass/PHASE1-generation-verdict.md`.
- **All three passed the judges** (≈4.2/5). AI *can* draft to the bar **when conditioned** with the
  Ep1–3 examples + the failure "anchor library" + the worked-example checklist.
- ⚠ **Proven on ONE topic only** (model-picking, easy shape). Not yet proven on a subtle episode.
  Run it on 2–3 differently-shaped episodes before trusting it.

### 4.2 The most important finding — why no single judge is enough
The good drafts **still contain "here's the thing nobody tells you,"** a banned false-exclusivity
hook. The AI writer didn't catch it; the AI judges didn't catch it. **Only the grep (`check-episode.sh`
/ `gate.sh`) catches it.** So the loop MUST be: **AI draft → mechanical grep → AI critic → Ali.**
Never "let the AI write and check itself."

### 4.3 Open Ep5 forks that are ALI's call (do not decide these for her)
1. **Naming Fable 5 / Opus 4.8** breaks the locked Currency Rule (no version numbers in evergreen
   episodes). More concrete vs goes stale. Middle path: name once, teach the *tiers*.
2. **The beach + couture need a home in the Mall** (analogies must be visitable). No couture house or
   beach exists yet in `operations/the-mall-inventory-plan.md`.
3. **Ep5 now takes what Ep6 was going to be** (within-house tiers). Ep6 needs a new job (likely
   "moving between tools without starting from scratch").

---

## 5. CANON IS CONTAMINATED (blocks surface derivation)

The `content/episodes/episode-0N.canon.md` files were **reverse-extracted from already-shipped pages**,
so they carry those pages' bugs. Deriving ~11 surfaces from them would multiply one error into eleven.
Verified examples:
- Ep1 canon **MUST-MATCH block enforces an UNSOURCED Fei-Fei Li quote** onto every surface (the line
  traces closest to Melinda Gates, not Li). Memory: `never-lock-unverified-in-must-match`.
- Ep1 BCG "14 points" stat reframed adoption→outperformance (the thing `ai-gender-stats-verified` was
  written to prevent); title carried as both "Do AI" and "Use AI"; "members-only" (banned).
- A rule locked AFTER a canon file was written never travels back — Ep5 canon (written 2026-07-09)
  still has "she/her" for models, one day before the pronoun rule locked. Memory: `rules-need-a-canon-backsweep`.

**Rule canon FIRST (resolve every recorded divergence to one value; nothing unverified in MUST-MATCH),
then create `operations/engine/CANON-RULED` to switch derivation on.**

---

## 6. THE OPERATING-SYSTEM DESIGN (research, not built)

Full design: `operations/research/os-pass/MASTER-OPERATING-SYSTEM.md`. Supporting:
`learn-{site,vision,research,social,revenue,notworking}.md`, `opmodel-diagnosis.md`,
and the broader reports in `operations/research/` (`00-SYNTHESIS`, `A`–`F`, `agent-operations-playbook.md`).
Teaching spec: `operations/voice/laidies-teaching-pattern.md` (1060 lines, derived from Eps 1–3).

**Shape (proposed, not built):** one Makefile spine; the week is a dependency chain; agents only at
generative steps; every check wired to run by default; Ali touches 4 taste gates (~50 min/week):
G1 = the one-page substance sheet (before prose), G2 = flagged art only, G3 = watch the cut once,
G4 = publish. One append-only `LEDGER.md`; any answer given twice becomes a default.

**⚠ Two things the design GOT WRONG and must be corrected before building:**
1. It modelled the video cut as a clean "hand CapCut a folder" box. Reality: **Codex drives the
   CapCut app**, and **Ali is the copy-paste relay** between Claude and Codex (§1). The cut stage must
   be redesigned around that, not around a file handoff.
2. It listed the live site as possibly stale — **that was wrong.** `laidies.ai` serves from
   `origin/main`, which gets a daily automated commit; the redesign IS live. (Verified via GitHub
   Pages API + fetching the site.) One real caveat: tracked repo is ~5.27 GB against GitHub Pages'
   documented 1 GB published-site limit — serving anyway, unmonitored. Decide (bucket the images or
   thin what's tracked) when convenient; not urgent.

**Kill list (built, not working — stop maintaining):** the 5-layer org in
`operations/laidies-operating-model.md` (keep only its one law); `operations/agents/` (29 prose files);
the three dashboards (`operations/weekly-command-center.html`, `operations/ops/ops-centre.html`,
`operations/ops/workspace.py`); `operations/ops/state.json` as a status home; `scripts/run-weekly-production.js`
(1,365 lines, Windows PowerShell); `scripts/generate-social-proof.py`. Rule: **wire-or-delete, never a
seventh system.**

---

## 7. RANKED NEXT STEPS (impact per unit of ALI's effort)

The honest first move is to make individual pieces trustworthy one at a time (like the gate fix in
§2.4), not to build the whole engine at once.

1. **Solve/verify the Codex relay** (§1). Find out if prompts can reach Codex without Ali pasting. This
   is the real bottleneck. Nothing else matters as much.
2. **Wire `make critic`** — reimplement the 5 prompts in `operations/workflows/review-content.mjs` as a
   subagent that runs by default (Stop-hook / make target), default-FAIL, per-dimension, evidence-forced,
   calibrated on the Ep1-pass / killed-Ep5-fail pair. Then delete the `.mjs`. This is what removes Ali
   from bug-catching. (Note: it also needs more than 2 calibration points to catch a mediocre-not-disastrous draft.)
3. **Get Ali's approval on the Ep5 substance sheet** (§4), then draft Ep5 through the loop (draft → grep
   → critic → Ali), settling the three forks in 4.3 first.
4. **Rule Ep1 + Ep5 canon** (§5), then switch derivation on behind `CANON-RULED`.
5. **Prove the engine end-to-end on Ep5** — one real episode through every stage, even with hand-steps,
   before adding anything.

---

## 8. KEY FILES INDEX (all under the repo root in §0)
- Engine: `operations/engine/` · Gate: `operations/engine/gate.sh` (fixed §2.4)
- Ep5 substance: `content/episodes/episode-05.substance.md`
- Ep5 drafts + verdict: `operations/research/os-pass/generation-experiment/` + `PHASE1-generation-verdict.md`
- Design: `operations/research/os-pass/MASTER-OPERATING-SYSTEM.md`
- Teaching spec: `operations/voice/laidies-teaching-pattern.md` · Voice lock: `operations/voice/laidies-writing-lock.md`
- Quality battery (exists, wire it): `operations/workflows/review-content.mjs`
- Timing tools (fixed): `operations/tools/{align.py, beat-brief.py, transcribe.py}`
- Memory index: `/Users/alisoneakin/.claude/projects/-Users-alisoneakin-.../memory/MEMORY.md`

## 9. HONEST STATE, ONE LINE
The *thinking* is grounded in a real test; the *building* is barely started; the load-bearing piece
(the critic) and the real bottleneck (the Codex relay) are both unsolved. Trust the pieces that
re-run, not the plans.
