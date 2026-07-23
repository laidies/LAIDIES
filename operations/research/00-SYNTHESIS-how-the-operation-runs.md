# How the operation runs — the synthesis

**Written 2026-07-22.** Sources: six research streams (`A`–`F` in this directory), two learning
sweeps (`_learn-*.md`), and direct inspection of the repo. Every load-bearing claim in this
document was **re-verified by me personally**, not accepted from a research agent — two agents
contradicted each other on one point and one of them was wrong, which is the whole argument for
doing that.

Reading order if you only read one thing: **§1, then §3.**

---

# 1 · The finding that reframes everything

**The teaching-quality gate you need already exists. It has never been run.**

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/workflows/review-content.mjs`

Written **2026-07-10** — the same day you recorded the Ep5 usefulness critique. It is five
independent adversarial reviewers run in parallel (fact-check, substance, canon, design/UX,
cold-reader), each returning a structured PASS/FAIL with quoted evidence. From the file itself:

> "Be adversarial and specific — cite the exact line/phrase. Default to FAIL when unsure;
> 'looks fine' is not a review."

> **SUBSTANCE gate:** "A smart, busy woman ALREADY knows there are different AI companies. Name
> exactly what she LEARNS here that she didn't know. If you can't, or it's a shallow skim,
> verdict=FAIL."

Line 5: **"It does NOT auto-run; invoke it explicitly."**

So the good gate sat on disk while `check-episode.sh` — a grep for banned phrases — was the thing
that actually ran. Ep5 went to a full 1,400-word master file and stopped there.

**This is the shape of nearly every problem found today.** The design exists; the mechanism
doesn't. Stated as a pattern, because it recurs:

| Designed | Mechanised |
|---|---|
| `review-content.mjs` — 5-gate quality battery | ❌ never invoked |
| `scripts/check-episode-cues.js` — the coverage gate the playbook ranked #1 | ❌ wired to nothing |
| `scripts/check-local-links.js`, `check-inline-js.js` | ❌ wired to nothing |
| `operations/agents/` — 29 files of agent charters, scorecards, an "operating system" | ❌ prose only; no `.claude/agents/` exists |
| The Plain-Teaching Rule, the one-term-per-concept ruling | ❌ enforced by nothing; still violated in the Ep5 draft |
| `curation.json` asset verdicts | ⚠ partial — denylist only |

**The corollary, and it is the single most useful sentence in this document:** the guardrails that
*block bad actions* got built (five blocking `PreToolUse` hooks). The gates that *grant "done"* did
not (zero evaluators). The operation is well defended against a known-bad action and completely
undefended against a plausible-looking draft. That is precisely what stopped Ep5.

---

# 2 · What LAiDIES is, as I now understand it

A **place**, not an article. SUNNYVAiLE is a town permanently set in 1999 where a new episode lands
every Wednesday, and the reader returns because the town is there — buildings she walks into,
recurring characters, KSVL 99.9, patron saints, collectibles, and owned tools she cannot google.
The audience is a smart, busy, non-technical woman who feels behind on AI and is put off by both
influencer hype and tech-bro explainers. Ep4's line is the thesis: *"You were never behind on AI.
You were just never told it was yours."*

The differentiator is explicitly **not information**. Anyone can google a prompt template; only
here can she hand her real prompt to the Fairy Godmother and watch it get glowed up. Which means
the teaching has to genuinely beat a googled listicle — so bad teaching is not a quality problem
here, it is an existential one. That is why Stage 1 is the right place to spend everything.

**What ships weekly vs what's promised.** 97 live-facing pages (71 real, 26 redirect stubs), zero
broken asset paths, Supabase live, three Workers live, 38 real radio tracks, four full episodes
with articles. Promised-not-built: the LIBRAiRY (blocked on backdrop art and shelf PNGs with no
alpha channel), the shop (163 words, no products, no payment path), Eps 1–3 video, gifts, DMs, the
Puffy Board, Ask Jeeves. The Closet listens for four reward events (`merit_badge`, `dare_penalty`,
`sticker_girl_talk`, `hidden_charm`) that **nothing ever emits** — one root cause behind most of
the collectibles looking dead.

---

# 3 · Do these first — ranked by impact per unit of YOUR effort

Your effort is the scarce resource. Everything below is my time unless the row says otherwise.

| # | Do this | Fixes | Your time | My time |
|---|---|---|---|---|
| 0 | ~~Run the existing gate against Ep1 and Ep5~~ — **DONE 2026-07-22.** Result in §4.0. | — | 0 | done |
| 1 | **Wire the battery as a FINDER on new work, scoped to what's about to ship.** Existing episodes' findings become a repair worklist, not a blocker. Don't lower the bar to make Ep1 pass. | Ep5, all future | 0 | 1 h |
| 1b | **Rule the canon files** — back-sweep Ep1 and Ep5 against every ruling locked after they were written, and *decide* the divergences they currently only *record*. Derivation stays off until this lands. | the engine | **~15 min** of rulings | 3 h |
| 1c | **Strip the unverified Fei-Fei Li quote out of MUST-MATCH** — it is currently enforced onto every surface. | live error | 0 | 10 min |
| 2 | **Make both windows load the same hooks.** Right now `LAIDIES/` gets 12 and `Website-homepage/` gets 1. | every rule | 0 | 10 min |
| 3 | **Wire the three checks that already exist** (`check-episode-cues.js`, `check-local-links.js`, `check-inline-js.js`) into the Stop hook. | silent gaps | 0 | 30 min |
| 4 | **Fix the `align.py` landmine** — it hard-codes `episode-04` in all three output paths, so running Stage 3 for Ep5 silently overwrites Ep4's captions. | Ep5 blocker | 0 | 5 min |
| 5 | **Write `CLAUDE.md`** from HANDOVER §7. There is currently none anywhere in the project. | repetition | 0 | 30 min |
| 6 | **The substance sheet** — the one-page artifact you approve *before* prose exists. Your own 10 July ruling, never built. | Ep5, all future | **10 min/wk** | 2 h |
| 7 | **An evaluator subagent in a fresh context**, calibrated on the Ep1/Ep5 pair. | teaching quality | 0 | 2 h |
| 8 | **Decide the Pages size question** (§5.2) — 5.27 GB against a documented 1 GB limit, serving fine today. Not urgent; just currently invisible. | future risk | **a decision** | varies |
| 9 | **Derive `issue-0N.json` from canon** instead of authoring it. | Stage-6 drift | 0 | half a day |
| 10 | **The Makefile** that runs the week with resumable stamps. | Wednesday | 0 | 4 h |

**Items 1–5 total about 90 minutes of my time and zero of yours,** and they remove the two active
Ep5 blockers plus the reason your rules are optional. They should happen before anything is built.

---

# 4 · The teaching-quality gate (question A)

## 4.0 · THE EXPERIMENT — what actually happened when we ran it

Not a design. A result. The five reviewers were run against both calibration files, blind to which
was which.

### Finding 1 — the structural gate passes the file Ali stopped

```
$ bash operations/check-episode.sh 5
════ result: 0 fail · 2 warn ════
EXIT CODE: 0
```

Exit 0 means ship. On the master file that was stopped for "explaining things in a terrible way."
This is the gap, measured.

### Finding 2 — the unused gate finds real, sourced, specific defects

On **Ep5**, with quoted lines and live sources, it caught things a careful human read did not:

- **The supermodel facts are wrong, in the episode built on supermodels.** Linda Evangelista's
  line is *"We don't wake up for less than $10,000 a day"* (Vogue, Oct 1990) — the script has the
  corrupted "get out of bed" version. And **George Michael does not appear in the "Freedom! '90"
  video** — that was the point; he refused, so Fincher used five models in his place. The script
  has him lip-syncing in it, and names Claudia and Kate, who were not among the five (it was
  Cindy, Naomi, Linda, Christy, Tatjana Patitz). The standing rule that pop-culture facts *are*
  facts makes these blockers, not trivia.
- **The metaphor is false where it teaches.** "Every AI company is a fashion house" — most don't
  train models. "A house doesn't book its supermodel" — Claude runs on Bedrock, Vertex and
  Foundry; the line is wrong exactly where the mental model forms.
- **Gemini reduced to "the email-and-calendar one"** — a named failure mode in this operation's own
  factsheet.

### Finding 3 — the best result of the day is structural, and no script review would have found it

> The Ep5 pronoun violations are baked verbatim into `episode-05.canon.md`, written **2026-07-09**
> — one day before the AI Pronoun Rule locked on 07-10. Fix the canon or every derived surface
> regenerates the violation.

**A rule that locks after a canon file is written never travels backwards.** Ep5's source of truth
is permanently non-compliant with a rule made the next day, so the article, quiz, cards, LIBRAiRY
book and cocktail wall would each inherit it forever. Generalised: **every locked ruling needs a
back-sweep against existing canon on the day it locks**, or canon quietly becomes the place old
violations are preserved.

### Finding 3b — the enforcement mechanism is enforcing an error

`episode-01.canon.md` locks this in its **MUST-MATCH** block, meaning `check-episode.sh` actively
verifies it appears verbatim on every surface:

> *"If we don't get women involved in AI, we're going to have a future built by half the population
> — for all of the population."* — attributed to Fei-Fei Li

The reviewer could not source it to her anywhere. The closest documented line in that family is
**Melinda Gates'**. Li's own documented line is different (*"I believe in the future of AI changing
the world. The question is, who is changing AI?"*).

So an unverified quote is not merely present — it is **mechanically propagated and enforced**. The
one gate that does run is guaranteeing the error reaches every surface.

**Rule this yields: nothing unverified may ever be MUST-MATCH-locked.** MUST-MATCH is a propagation
guarantee, so it must only ever hold ledger-cleared strings.

### Finding 4 — the gate fails everything, and I was wrong about why

**Full result. Every file, every dimension: FAIL.**

| | Ep5 master | Ep1 canon | Ep1 master |
|---|---|---|---|
| fact-check | FAIL (3 blockers) | FAIL (6 blockers) | — |
| canon | FAIL (6 blockers) | FAIL (6 blockers) | FAIL (8 blockers) |
| substance | — | — | FAIL (2 blockers) |
| cold-reader | — | — | FAIL (2 blockers) |
| **`check-episode.sh`** | **PASS (exit 0)** | — | **PASS (0 fail)** |

My first instinct was that the gate is over-strict and needs calibrating down until Ep1 passes.
**That instinct was wrong, and it is worth recording why**, because it is the exact mistake that
turns a real gate into a rubber stamp.

I spot-checked the findings against primary sources and the existing memory files. **They are
real.** The BCG mis-frame is verbatim what `ai-gender-stats-verified` was written to prevent. The
Evangelista quote genuinely is *"we don't wake up"* (Vogue, Oct 1990). George Michael genuinely is
not in the "Freedom! '90" video. Ep1's master genuinely says *"residence card"* (retired 2026-07-12),
genuinely speaks the wrong episode title (*"We Use AI"* vs canonical *"We Do AI"*), and genuinely
contains 2020s anachronisms — **pickleball, an oat latte, "group chat"** — inside a town locked to
1999.

**So the gate is not too strict. The corpus has a real defect load, and nothing has ever reviewed
it at this depth.** Calibrating the gate until Ep1 passes would mean calibrating it to accept
genuine errors. That is precisely how a gate becomes a rubber stamp — you tune it against the work
until it stops complaining.

**The resolution is scope, not threshold.** The gate governs what is *about to ship*. Ep1 already
shipped, so its findings are a **repair worklist**, not a blocker. There is no deadlock, and no
reason to lower the bar:

| Class | Examples | Treatment |
|---|---|---|
| **Hard block** — verifiable, binary | unsourced stat · false fact · banned phrase · retired term · wrong title · unverified string in MUST-MATCH | Blocks the *new* episode. Deterministic where possible. |
| **Judgement** — genuinely contestable | does the metaphor carry? is this useful? is the roster teaching or listing? | Goes to Ali, on the substance sheet, before prose exists |
| **Backlog** — already shipped | everything the gate found in Ep1 | A one-time repair pass, tracked, not blocking |

### Finding 5 — one question only Ali can settle, surfaced by the gate

The Ep1 reviewer found a genuine contradiction the rules cannot resolve: the framing device — *"I
found a town… permanently set in nineteen ninety-nine"* — places the heroine **outside** 1999
looking in, which is what licenses the pickleball and the oat latte. But `perpetually-1999-voice`
says every piece of copy is written from **inside** 1999.

> The script wants both, and the rule allows only one.

Either the anachronisms are hard blockers, or the rule needs an explicit carve-out for
narrator-voice vs town-voice. **This is exactly the shape of thing that should reach Ali** — a real
fork, cheap to state, expensive to leave ambiguous, and it recurs in every episode until ruled.

### Finding 6 — ⚠ what the gate still cannot do

One overall PASS/FAIL is useless — everything fails it. The signal is entirely in **which dimension
fails and with what severity**, so the gate must report and block per-dimension, never as a single
verdict.

And it still cannot answer the question that actually stopped Ep5. It found that the teaching claims
are *false*; it did not, and should not, rule on whether the episode is *worth her reader's twenty
minutes*. That remains Ali's, exactly as her own ruling says. What changes is the artifact she rules
on: a one-page substance sheet (§4.2) rather than a finished script.

Two things are still worth building on top, in this order: **the calibration anchors** (Anthropic's
published method — anchor each dimension with worked examples and score breakdowns, so severity
means the same thing every week), and **per-dimension blocking** wired to the Stop hook.

### Bonus: it found real improvements to shipped Ep1

Worth acting on independently — the fiction/reality boundary is never set (a listener can't tell
whether the town, and therefore the Harvard study, is invented); the "cool mom" clip illustrates
the *context* limit while summarising the *truth* limit, blurring the two at the moment they should
lock in; "this was never a confidence problem" contradicts the preceding paragraph; and the outro
drops nine unexplained proper nouns on a first-time listener.

## What can actually be checked by a machine

Reading the Ep5 master line by line, its six defects sort cleanly into three tiers. This matters
because the cheap tier should run first and costs nothing.

**Tier 1 — deterministic script, no model, runs in a second.** These would have caught defects 2,
3 and 5 outright:

- **Term consistency.** Declare in canon: `model`, `app`. Then assert no undeclared synonym for a
  declared concept appears. The Ep5 draft calls the model *supermodel / star / face / poster /
  whoever's in the window* and the app *boutique / store / shop / storefront / flagship / counter /
  address*. Your 10 July ruling says "one term per concept." A twenty-line script enforces it.
- **The metaphor-strip test.** Delete the declared metaphor vocabulary and measure what survives.
  On the Ep5 draft, almost nothing does. This is the Plain-Teaching Rule made mechanical, and I
  have found no prior art for it — it appears to be original to this operation, and it is the
  sharpest single check available.
- **Named-entity floor.** The passage answering the reader's actual question names *zero* products
  — "the big all-rounder… the careful one… the one wired into your day." Assert that the payload
  section names the things it is about.
- **Ratio.** Actionable words vs framing words. ~120 of 1,400 in Ep5.
- **Question-answered.** The cold open asks a question; assert the same terms appear in the payoff
  paragraph, not only in the metaphor.

**Tier 2 — LLM evaluator, fresh context, calibrated.** Catches defects 1, 4 and 6 — the ones
requiring judgement. Anthropic published the method on 2026-03-24
([Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)):

> "I calibrated the evaluator using few-shot examples with detailed score breakdowns. This ensured
> the evaluator's judgment aligned with my preferences, and reduced score drift across iterations."

> "Separating the agent doing the work from the agent judging it proves to be a strong lever."

Four dimensions phrased as questions, each anchored by a worked passage from Ep1 (pass) and one
from the Ep5 draft (fail) with the scoring written out. **The scarce ingredient is labelled
examples, and you already have them and have never used them.** Most teams building an LLM judge
have zero.

**Tier 3 — you.** Everything that is genuinely taste, on the cheapest possible artifact. §4.2.

## The anti-rubber-stamp mechanism

A judge that drifts to "looks fine" is worse than no judge, because it launders a bad draft. Three
devices, in order of importance:

1. **The calibration pair is a regression test on the judge itself.** Re-run the gate against Ep1
   and the Ep5 draft on a schedule. If it ever passes the Ep5 file, **the judge is broken and its
   verdicts that week are void.** This is the whole defence, and it costs pennies. It is also why
   you must never delete the Ep5 draft — it is now test data.
2. **Evidence-forced verdicts.** The judge must quote the offending line. A judge that cannot
   produce a quote cannot produce a verdict. `review-content.mjs` already does this.
3. **Default-FAIL with a read precondition.** Anthropic's own take-home repo,
   [`anthropics/cwc-long-running-agents`](https://github.com/anthropics/cwc-long-running-agents)
   (Apache-2.0, explicitly unmaintained): every criterion starts `false`, and a `PreToolUse` hook
   **denies any write to the results file unless the agent has first opened evidence with Read.**
   Its own words: *"Asking nicely in the prompt doesn't reliably stop this. The harness makes
   'done' structural."*

## 4.2 · Where your approval belongs: the substance sheet

Your 10 July ruling, verbatim:

> "substance-first — write the plain, correct, genuinely-useful 'which model for what + why' as
> notes; **Ali confirms it's useful**; only THEN write prose."

Never built. This is the highest-leverage unbuilt thing in the operation, because it moves your
judgement from a 20-minute finished script to a one-page artifact — and it is the *earliest* point
at which the Ep5 failure was visible.

**The format — one page, no voice, no metaphor, no jokes:**

```
EPISODE N — SUBSTANCE SHEET

SHE ARRIVES ASKING:        (one sentence, her words)
SHE LEAVES ABLE TO:        (one sentence, a capability — not a realisation)
THE PLAIN EXPLANATION:     (≤150 words, exactly as you'd say it to a friend in chat.
                            No metaphor permitted in this box.)
THE DECISION RULE:         (concrete trigger → concrete choice. Names named.)
THE THREE FACTS:           (each with source URL + date + what it measures)
WHAT THIS IS NOT:          (the adjacent thing this episode deliberately doesn't cover)
THE METAPHOR:              (one line, added LAST, and deletable without loss)
```

**What Ep5's sheet should have said** — from the shape you endorsed on 10 July:

> **She arrives asking:** why does the AI my company installed feel like the one I use at home?
> **She leaves able to:** pick between ChatGPT and Claude for a specific task, and know why work's
> feels familiar.
> **The decision rule:** Two-line email → ChatGPT. The contract where one missed clause costs you
> → Claude, because it actually reads the whole sixty pages instead of skimming.
> **The metaphor:** a company is a fashion house; the model is its supermodel; the app is the shop.

Held against that sheet, the failure of the draft is visible in **ninety seconds**, on one page,
before a single line of prose exists. That is the entire point.

The rule that makes it bite: **the metaphor box is written last, and the sheet must survive its
deletion.** If deleting it breaks the explanation, the explanation was never there.

---

# 4.5 · 🔴 Canon is contaminated — do not switch on derivation yet

**This is the most consequential finding of the day and it reorders the build.**

The plan everywhere — the canonical-source spec, the weekly cycle map, this document until now — is
"derive all ~11 surfaces from `episode-0N.canon.md`." Running the canon reviewer against
**Ep1's canon file** produced six blockers. The canon files were **reverse-extracted from surfaces
that had already shipped**, so they faithfully transcribed those surfaces' bugs — and being canon,
they now re-seed them into everything derived.

**The proof, verified personally.** `content/episodes/episode-01.canon.md` line 41:

> "8. **The flip.** Zoom in on senior women who pushed past the first awkward phase and it
> reverses — they lead their male peers by 14 percentage points (BCG)… what they bring is the one
> thing AI can't replicate — *a career's worth of judgment.*"

And the memory `ai-gender-stats-verified`, written specifically to kill this:

> ⚠️ **Ep1 FIX NEEDED** … it says "senior women… lead them by fourteen percentage points… because
> judgment" — **reframes ADOPTION as OUTPERFORMANCE + adds an unsupported causal story.** … Never
> teach the 14% as a performance / "better than men" stat.

The memory named the fix in the *script*. Nobody fixed the *canon*. So the error is now in the
source of truth, and the moment derivation is switched on it propagates to the article, quiz, cards,
study pack and glossary — automatically, at scale, forever.

Same file also carries: "members-only" (banned by `resident-not-member`), "SUNNYVAiLE High course"
(banned by `hundred-ones-textbooks-not-courses`), a false-exclusivity "nobody had explained it"
construction, `In most 2026 office conversations` in glossary prose (breaks the 1999 voice), and
Regina George filed as a **patron saint** when the writing lock says she is the anti-saint and not a
Court member. Plus two broken paths in the propagation checklist itself (`blend-and-snap.html` and
`delta-lai-nu.html` do not exist).

**And the structural diagnosis, which is the sentence to remember:**

> The file's header promises it "kills the script-vs-article drift," but it currently **records** at
> least five unresolved divergences instead of **ruling** on any of them — the title is carried as
> both "On Wednesdays We **Do** AI" and "…We **Use** AI." **Documenting drift is not the same as
> being a source of truth.** Until each has one ruled value, downstream surfaces have nothing to
> sync to.

**Consequence for the engine:** derivation is a multiplier. Pointed at ruled canon it turns one fix
into eleven. Pointed at contaminated canon it turns one error into eleven. **Canon must be ruled
before derivation is switched on** — otherwise the engine's first act is to industrialise the bugs.

The good news: this is a one-time cleanup of five files, it is now *findable* by a script (the
reviewer found it in minutes), and it converts a silent liability into a worklist.

---

# 5 · The two live blockers nobody had costed

## 5.1 ❌ RETRACTED — "the live site is four weeks stale"

**This claim was wrong. Corrected 2026-07-22 after Ali challenged it.** Recording the error in full
because how it happened matters more than the claim did.

**What I reported:** `main` last committed 2026-06-28, the working branch 397 commits ahead, so
`laidies.ai` was serving a month-old site and the redesign was unshipped.

**What is actually true:**

| | Commit | Date |
|---|---|---|
| `origin/main` — what Pages publishes | `2370d8b` | **2026-07-22 (today)** |
| local `main` — what I read | `3b1e753` | 2026-06-28 |

`origin/main` receives a commit **every single day** from the `hot-goss-daily.yml` Action. The
working tree is **6 behind / 5 ahead** of it — not 397 ahead. And a fetch of the live site confirms
the ground truth: **laidies.ai is serving the full interactive town homepage right now** — six
districts, the clickable map, KSVL, the tools, with **Ep4 marked "This week."** The redesign is
live. Ali was right; the site root *is* the `Website-homepage` content.

**How the error happened, and why it belongs in this document.** I ran `git log main` and reported
the answer as verified fact. The command succeeded, the data was real, and the conclusion was
false — because **the local `main` ref had not been fetched in 24 days.** I checked a source
without checking the freshness of the source.

That is the same failure this document catalogues elsewhere, committed by me while writing it:
`check-episode.sh` returning exit 0 is a real result about the wrong question; a "0 blocked" count
from an empty cast list is a real number that means nothing. **A green result is only as good as
the freshness and scope of what produced it.**

**The rule this yields:** any claim about live/deployed state must be verified against the
*deployed artifact* — fetch the URL, or query the host's API — never against a local ref. Local
refs are caches, and caches go stale silently. `git fetch` before any statement about what is live.

## 5.2 ⚠ The size finding survives, reframed — a risk, not a blocker

The measurement was right even though the branch comparison was wrong:

> "Published GitHub Pages sites may be no larger than 1 GB."
> — [docs.github.com](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

**`origin/main` is 5.27 GB across 3,778 files — and it is serving today.** So the published site is
already ~5× a documented limit and has not been enforced against. The biggest contributors are
`assets/sunnyvaile-buildings` (731 MB), `assets/residence-card` (464 MB), `content/music` (358 MB).

So this is not "the redesign can't ship" — it shipped. It is: **the site runs 5× over a published
limit that is currently not being enforced, and there is no signal for when that changes.** Nothing
breaks today. If enforcement ever tightens, or a build starts failing, the cause will be invisible
unless someone already knows this number. Worth a decision when convenient (serve images from a
bucket, or thin what's tracked), not an emergency.

⛔ I have not touched git, and won't — the rule against `checkout`/`restore`/`stash` in this tree
stands.

---

# 6 · The weekly cycle (question B)

**The orchestrator should be a Makefile, not an agent framework.** The week is a dependency graph
— canon → eleven surfaces — not a conversation. `make` gives resumability, partial-failure safety
(`.DELETE_ON_ERROR`), and "re-running is always safe" for free, with nothing to install or keep
alive. Agent steps are invoked from it as ordinary commands; your gates are approval files that
the graph waits on.

**Your time under this design: about 50 minutes a week**, in four gates —

| Gate | What you approve | Minutes |
|---|---|---|
| **G1** | The substance sheet (§4.2) | 10 |
| **G2** | Art triage — only the frames the automated checks flagged, as A/B pairs | 20 |
| **G3** | The assembled cut, once, and only after the coverage gate is green | 15 |
| **G4** | Publish | 5 |

Realistically ~95–110 min today because the CapCut session is still hand-driven.

**Stage 6 is the one that gets forgotten**, and the fix is derivation, not memory: `issue-0N.json`
should be *generated* from `episode-0N.canon.md`, and every derived file should carry a provenance
line with a content hash of its source, so "this surface is stale" is a script's finding rather
than your discovery. The `glossary` link is the live proof of the problem — it is hand-written into
fourteen files and two-hops into a superseded page from every single episode.

---

# 7 · The command centre (question C) and communication (question D)

**Don't build another dashboard.** Three already exist here — `weekly-command-center.html`,
`ops/ops-centre.html`, `ops/workspace.py` — and the diagnosis is sharper than "wrong shape":
`workspace.py` was live, correct, built to a stated need, and abandoned the same day. But you *did*
use it hard for one job — your curation verdicts in `curation.json` are real and dated.

> **A destination survives exactly one bounded task with an end state. It never survives as a
> habit.** Curating 375 images has a last image. "Check the command centre" has no finish line.

The mistake was never "a file." It was **a file addressed to you.** `state.json` and
`agent-runlog.md` are still being written daily, because a machine writes them and a machine reads
them.

**So: one question, `where are we?`, that runs the checks live at the moment you ask and answers in
~250 words of plain text** — with at most three decisions, each carrying a stated default that
fires if you say nothing. The same answer arrives unasked at session start and before Wednesday.
The only pixels are inline image-choice widgets that appear in the conversation and scroll away.

**On interruptions**, the correction that matters: the playbook prescribed *fewer* gates, citing
Anthropic's finding that users approve ~93% of permission prompts. But `ops/tasks.json` has tasks
blocked on you since 17 July with no evidence any was ever *asked*. **That is approval starvation,
not approval fatigue.** The rule: nothing may sit blocked on you without a posed question and a
default that fires on silence; and any question you answer the same way twice becomes a recorded
default.

**On five windows** — five windows is not the problem; five *unowned, unequally-configured*
windows is, and you are the router. Keep them, name them for lanes that don't share files
(art / site / episode / research / ops), launch them all from the same directory so they load the
same hooks, and talk to **one**. The other four are workers you never converse with.

**Shared state:** one append-only log that nobody reads, plus a derived ≤60-line "open state" view
that gets injected at every session start. The log is unbounded; the view is capped. That is the
answer to "how does it not become a 28KB file nobody reads" — you stop trying to make the log
readable and make it *derivable*.

**The run log is currently blind.** `operations/ops/agent-runlog.md` holds 62 "launched" records
and 6 "completed" — and even those 6 record the prompt echoed back, not the result. It has never
once recorded what an agent actually did. "An agent went sideways and nobody noticed" is presently
undetectable by design.

---

# 8 · Tools (question E)

**Adopt:** a phone-tappable approve/reject for art batches writing back to Supabase (already in the
stack) — at a 2-usable-in-18 hit rate your eyes are the bottleneck, not generation; one weekly
GitHub Actions health job that opens an Issue (free, and it reuses the `ai-model-freshness.yml`
pattern that already delivers without a dashboard); and loudness normalisation in the assembly step
so narration and songs match.

**Ignore:** every DAM product (none of them models `{generation, verdict, supersedes}`; write the
manifest instead), ComfyUI (its reproducibility only applies to models you host yourself, which
means adopting GPU infrastructure), and Ayrshare at $149/mo for one social profile.

**Two corrections to the record:** `ffmpeg` is **not installed** on this machine at any standard
path, despite being listed in the stack. And the 2026-07-17 LoRA failure may have had a second
cause beyond the off-canon training set — Scenario documents **5–15** images for a character model
with 20+ overfitting, against the 15–30 community norm that was followed.

---

# 9 · What NOT to build

1. **Another dashboard.** Three exist. See §7.
2. **A new quality gate from scratch.** One exists. Run it first. §1.
3. **Full-site visual regression across 97 pages.** A one-person maintenance trap; every
   intentional design change means re-approving every baseline.
4. **Multi-agent parallelism on site edits.** Write-conflict territory. Parallelise research and
   image generation; serialise anything touching shared files.
5. **`scripts/run-weekly-production.js`** — 1,365 lines, Windows PowerShell launchers, produces a
   dashboard. Retire it before it misleads the next agent.
6. **More rules.** Every Ep5 defect was already a written rule. The gap is mechanism, not
   documentation. This is the single most important "don't" on the list.

---

# 10 · Corrections to the 21 July playbook

Stated plainly, per the instruction to say where its advice was followed and where it wasn't.

- **Its #1 recommendation — the coverage gate — is already built.** `scripts/check-episode-cues.js`
  asserts every cue has a file and exits 1. It is wired to nothing. The recommendation should have
  been "wire it," ~30 minutes.
- **It concluded no method exists for grading creative quality.** Anthropic published one on
  2026-03-24 (§4). The playbook's source list carried 6 Anthropic engineering posts; the blog index
  carries 25, and four of the missing ones are directly on this topic.
- **Its A6 (human-in-the-loop) is backwards for this operation** — the problem is starvation, not
  fatigue. §7.
- **Its D4b** proposed a hand-edited `DECISIONS.md`. With five concurrent windows that is
  read-modify-write, and the loser of a race silently loses its decision — the exact failure the
  file exists to prevent. Append-only instead. §7.
- **Open question 11 resolved, negatively:** the "six grading methods" and "75–90% human-agreement
  target" attributed to Anthropic's evals post **are not in it**. It names three grader types and
  gives no numeric target. Do not cite them.
- **Where it was right and should be followed:** determinism-vs-judgement (A3) is the correct spine;
  the generation-aware asset allowlist (D8a) is right but must be scoped to `assets/episodes/`,
  because `curation.json` covers only 374 of ~2,988 tracked images and would otherwise fail closed
  on ~2,600 legitimate files.

---

# 11 · Open, and honestly unresolved

- **Whether the existing gate actually catches Ep5.** Being tested. Until that result exists,
  everything in §4 is a design, not a finding.
- **Production scheduling for AI-generated content.** No peer-reviewed or vendor guidance exists.
  Searched twice across two research passes. The one-episode-buffer argument stands on its own
  logic, not on evidence, and should be labelled that way whenever it is repeated.
- **Whether the LoRA failure was dataset size or dataset quality.** Both are plausible; only a
  re-run distinguishes them.
