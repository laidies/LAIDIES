# Shared brief — read this before researching anything

*Written 2026-07-22 by the operations window. Every research agent reads this first so nobody
re-derives what is already established. Do not restate this material in your own report — cite it.*

---

## What LAiDIES is

A website + weekly audio/video episode that teaches AI to smart, busy, non-technical women, set in
a fictional 1999 town called **SUNNYVAiLE**. It is a *place*, not an article: buildings you visit,
recurring characters, a radio station, collectibles, patron saints (Cher, Elle Woods, Samantha
Jones…). A new episode ships **every Wednesday**. Ali is an Amazon tax leader with no CS
background; she writes and directs, agents build.

The differentiator is explicitly *not* information — it is **a place you return to + owned tools
you can't google**. So the teaching has to be genuinely better than a googled listicle, or the
whole premise collapses.

## The one problem this research exists to solve

**Ep5 is stopped at Stage 1 — the master file.** Ali:

> "nothing is meeting the LAiDIES standard. it's explaining things in a terrible way… so i had to
> stop it and not picked it up. i don't want that to happen again."

A ship-check gate already exists (`Website-homepage/operations/check-episode.sh`). It passes
episodes that fail her bar, because it greps for banned phrases and checks structural consistency.
It cannot tell whether an explanation is any good.

---

## THE CALIBRATION PAIR — the most useful thing in this brief

You have labelled data. Use it. **Any gate design that does not fail the second file is broken.**

| | File | Ali's verdict |
|---|---|---|
| **PASS** | `Website-homepage/content/episodes/episode-01.canon.md` | "the voice benchmark… gold standard" (writing lock, line 14) |
| **FAIL** | `Website-homepage/operations/audio/episode-05-elevenlabs-v3-tagged.txt` | stopped production |

### Diagnosis of the failing file, read line by line (2026-07-22)

This is what the gate has to catch. Six defects, all of them *already written down as rules
months ago* and all of them still present in the draft:

1. **The metaphor CARRIES the teaching instead of garnishing it.** Delete the words
   house/boutique/supermodel/star/face/poster/window/counter/runway/floor-plan/rack and almost
   nothing is left. Violates the Plain-Teaching Rule (`operations/voice/laidies-writing-lock.md`
   line 189).
2. **Synonym pile-up — the identical defect already logged for Ep5 on 2026-07-10 and never
   fixed.** The model is called supermodel / star / face / poster / "whoever's in the window."
   The app is called boutique / store / shop / storefront / flagship / counter / address.
   Memory `plain-teaching-garnish-not-carry` names this exact list and rules "one term per
   concept." The ruling was recorded; the draft did not change. **That gap — ruling recorded,
   draft unchanged — is the enforcement problem in one example.**
3. **The practical payload is anonymised.** The one passage that answers the reader's actual
   question says: *"There's the big all-rounder… There's the careful one… There's the one wired
   into your day… And there's the one from work."* It does not name a single product. Memory
   `ep5-usefulness-critique-2026-07-10` records the shape Ali endorsed — which names names and
   gives a trigger: *"ChatGPT is the eager one — fast, confident… Claude is the careful one — it
   actually reads the whole sixty pages instead of skimming… Two-line email → ChatGPT. The
   contract where one missed clause costs you → Claude."* The current draft is **further from**
   the endorsed shape than the version she already rejected.
4. **The payoff is a negation.** She arrives asking "which one should I use" and leaves with
   "there was never one best AI / stop hunting for the best one." Sounds like wisdom, delivers no
   decision.
5. **Ratio.** ~1,400 words; the actionable content is ~120 of them, and those 120 are the
   anonymised ones.
6. **The opening question is answered by the side-metaphor, not the core teaching** — the exact
   failure mode already named in `plain-teaching-garnish-not-carry`.

**The meta-lesson, and it constrains every recommendation:** the standard is not missing. It is
extremely well specified — 499 lines of writing lock plus ~10 memory rulings. The failure is that
**none of it is enforced at the moment the master file is written, and none of it is checked by
anything other than grep.** Do not recommend writing more rules. Recommend mechanisms.

---

## The hard constraint from Ali's own record

Memory `ep5-usefulness-critique-2026-07-10` states:

> "the review gate can catch tells/facts/structure but **cannot judge 'is this genuinely useful to
> our reader' — that is ONLY Ali's call.** Do NOT treat gate-SHIP as the usefulness bar."

and prescribes a process fix that was **never built**:

> "substance-first — write the plain, correct, genuinely-useful 'which model for what + why' as
> notes; **Ali confirms it's useful**; only THEN write prose."

So the design target is not "a gate that replaces Ali's taste." It is **a gate that makes her taste
cheap to apply** — moving her approval from a 20-minute finished script to a one-page artifact,
and mechanically blocking everything else so her attention is never spent on defects a script
could have caught.

---

## What already exists — DO NOT REBUILD

Verified by direct inspection, 2026-07-22.

**Scripts** (`Website-homepage/operations/`):
`check-episode.sh` (structural ship-check) · `ops/check_site.py` · `ops/build_dashboard.py` ·
`ops/workspace.py` (visual app, localhost:8790) · `tools/transcribe.py` · `tools/align.py` ·
`tools/build-art-batch.py` · `tools/qc-frames.py` · `tools/check-cues.py` · `tools/beat-brief.py` ·
`tools/preview-server.js`

**Hooks** (`.claude/hooks/`, all wired in `.claude/settings.json`):
`response-linter.py` (Stop) · `inject-rules.py` + `recall-record.py` (UserPromptSubmit) ·
`block-dangerous-git.py` + `block-rejected-assets.py` + `enforce-cut-decisions.py` +
`enforce-library-decisions.py` + `enforce-art-prompt.py` (PreToolUse) · `agent-runlog.py`
(PostToolUse) · `inject-session-context.py` (SessionStart) · `pre-compact.py` (PreCompact)

**Sources of truth:** `content/episodes/episode-0N.canon.md` · `operations/voice/laidies-writing-lock.md`
(499 lines) · `operations/voice/laidies-canon-index.md` · `operations/facts-and-citations-ledger.md`
(28KB) · `operations/art-requirements.md` · `operations/ops/curation.json` ·
`content/site/current-models.js` · `operations/episode-canonical-source-spec.md`

**Existing research — EXTEND, DO NOT REDO:**
`operations/research/agent-operations-playbook.md` (83KB, 2026-07-21). It already covers
orchestration patterns, context engineering, determinism-vs-judgement, hooks/guardrails, evals,
image QC, cost/latency, model-per-task, website maintenance, and per-failure-mode recommendations
with a ranked list. Read its executive summary and the section relevant to your question, then say
**explicitly where its advice was followed and where it was not**, and only add what is new.
Its `# Open questions / could not verify` section (line 619) lists 21 things it could not confirm —
if your question touches one of those, resolving it is high-value.

**Current third-party stack:** Claude Code, Codex, CapCut, Canva, Suno, ElevenLabs, Replicate,
Supabase, Plausible, Playwright, ffmpeg.

**Already tried and rejected — check before proposing:**
- Canva for episode motion → replaced by CapCut (reframe drift on re-import). Memory `motion-in-capcut-not-canva`.
- Replicate character/style LoRA trained 2026-07-17 → unusable, trained on off-canon frames. Memory `episode-style-lock-trained`.
- Batched art prompts (18 in one go) → ~2 usable of 18; Ali's own direction says one at a time.
- Pixel-art episode style → superseded by comic/pop-art.
- Dashboards Ali must open → she will not toggle screens. Memory `chat-is-the-one-place`.
- Lost Pixel (visual regression) → repo archived 2026-04-22.

---

## House rules for your report

- **Every claim gets a source URL and a date.** Anything you could not confirm against a primary
  source is labelled **NOT VERIFIED** and listed, not softened. Use the playbook's four labels:
  `[FACT]` / `[OPINION]` / `[INFERENCE]` / `[NOT VERIFIED]`. Anthropic primary sources first, then
  credible named practitioners. No listicles as evidence.
- **Rank by impact per unit of ALI's effort**, not per engineer-hour. Say what to do first, what to
  ignore, and what is **not worth building**. A "don't build this" with a reason is as valuable as
  a recommendation.
- **Plain language.** Ali learns by analogy and image, has no CS background, and is allergic to
  hype. No jargon dumps, no "this changes everything," no fake revelations. Direct register.
- Absolute file paths, always.
- Anything you propose must survive the question: *would this have caught the Ep5 master file?*
