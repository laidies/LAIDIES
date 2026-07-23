# What was built to fix "Ali is the bug-catcher" — and why it didn't hold

_OS pass · 2026-07-22 · read-only assessment. Every verdict below has a file:line or a quote behind it._

## The one-line finding

Across all six things, the failure was **never "not enough machinery."** Each fix answered a real
pain by **building more apparatus** — an org chart, a council, three dashboards, a 1,365-line runner,
a five-gate battery — and then **none of it ran**. The correct move is almost always **stop building
the apparatus**, not add another layer. The single exception (the engine) is the only one that
*subtracts* — it retires the old runner, refuses to auto-generate from bad canon, and stops at four
human gates — and even it has never completed a week.

Ali already said this out loud. `operations/ops/session-snapshot.md`:
> "should i not be doing this in code, but rather claude?"
> "garbage in a garbage dress"

---

## 1. `operations/laidies-operating-model.md` — **FIX** (keep the law, drop the org)

The **diagnosis is right and worth keeping.** Line 11: "*Everything is produced FROM a verified
source of truth → GATED by adversarial, source-checking review → only then ships … she is never the
bug-catcher of last resail.*" That one law is the correct spine.

What didn't hold: the **five-layer implementation is aspirational, and its own status table says so.**
Lines 137–142:
- Layer 2 "Operator" (persistent orchestrator), Layer 3 production agents, Layer 5 watchdogs — none
  exist as running code. They are described in future tense.
- Build status: only step 1 (fact base) is ✅. The Review Gate is 🟡 "written; ready to run" — it
  never ran (see §3). Registry+Operator and Watchdogs are ⬜.
- The whole document is anchored on `review-content.mjs` (lines 63, 117) as "what replaces the audit"
  — and that file has never executed.

So: keep the one-law framing and the Records concept (canon + site-index + fact-sheets are real).
Cut the layered agent-org description — it promises an operator and watchdogs that were never built.

## 2. `operations/agents/` (29 files) — **KILL** the org apparatus (salvage 1–2 taste files)

Pure prose, **wired to nothing.** `grep` for any code referencing the charters / council /
scorecards / performance-standards returns **only** `scripts/run-weekly-production.js` — itself
marked for retirement (§5). Nothing in `engine/`, `hooks/`, or `.claude/` touches these files.

This is the "add more" anti-pattern at its purest: 39 KB `agent-charters.md`, an
`agent-council-operating-system.md`, `agent-role-performance-standards.md`,
`agent-scorecard-template.md`, `weekly-agent-council-template.md` (18 KB), two HTML "command
centers," an org map — a corporate CEO/executive/section-agent LARP for an organization that never
executed a single run. `README.md` line 4: "V0 is recommend-only" — it never left V0.

Salvage candidates only: `taste-benchmark-library.md` and `reputation-safety-gate.md` **if** they
encode real, reusable taste/safety rules Ali still wants. Everything describing the org structure,
scorecards, and council cadence is dead weight — delete or archive.

## 3. `operations/workflows/review-content.mjs` — **FIX or KILL** (built 2026-07-10, never run)

Confirmed never-run, by the authors of the two systems that point at it:
- `engine/Makefile:158`: "It is built and has never been run."
- `engine/gate.sh:137` and `README.md:156` both name it as the quality battery — as a thing you're
  *supposed to* invoke, never wired in. `gate.sh` only `echo`s its path; it never calls it.

The five gates (fact / substance / canon / design-ux / cold-reader, lines 53–74) are a sound concept.
The reason it didn't hold is structural: it's a **Workflow-runtime script** — it calls bare globals
`agent()`, `parallel()`, `phase()`, `log()` (lines 76–89) that only exist inside the Claude Code
Workflow harness. It can't be run with `node`; it can only be invoked by a human typing a
`Workflow({...})` call. Nobody does. Meanwhile the checks that **do** run every time —
`engine/checks/check-inputs.sh`, `check-must-match.sh`, `check-prose-voice.sh` — are plain shell and
work (proof: `build/ep04/last-gate.log` shows real PASS output).

Decision: either **wire the substance/fact/cold-reader gate into `gate.sh`** so it actually blocks
(fix), or accept that "the shell checks + Ali-in-chat" is the real gate and **delete the .mjs**
(kill). What it must not stay is a third state: a "ready to run" file that is the linchpin of the
operating model and has never run.

## 4. `weekly-command-center.html` + `ops/ops-centre.html` + `ops/workspace.py` — **KILL**

**Three separate abandoned dashboards**, each built to be "Ali's home," none of which stuck.
- `ops/state.json` — the data these read — has `"generated": null` (line 2). `where.sh` mocks this
  by name (`where.sh:6-7`: "The one status file this project already had … has 'generated': null in
  it, because nothing kept it honest.").
- `workspace.py` header calls itself "Ali's real, visual, persistent home … Open:
  http://localhost:8790 (bookmark it)" — a localhost app that only exists while a terminal keeps it
  alive. It doesn't.
- The reason they don't hold is written in memory: **chat is the one home** (`chat-is-the-one-place`).
  A dashboard nobody keeps open loses to the chat window that's always open.

Nuance worth keeping: the **data** `workspace.py` curates is alive — `curation.json` was edited
2026-07-22 22:45, `rejections.json` / `notes.json` are recent. So keep the JSON curation ledger and
surface it in chat; kill the three app shells that wrap it.

## 5. `scripts/run-weekly-production.js` — **KILL** (already condemned by its successor)

1,365 lines, PowerShell/Windows launchers, output is a dashboard nobody opens. Its replacement's
README does the killing for us — `engine/README.md:217-219`: "**retire this.** 1,365 lines,
Windows-only launchers, and its output is a dashboard. Superseded by this folder." It's also the
*only* remaining code reference to the dead `agents/` council (§2). Deleting it closes that loop too.

## 6. `operations/engine/` (the Makefile engine, built today) — **FIX / keep, unproven**

The task flagged this as "generative core unproven — treat as suspect." The real finding is
**cleaner than that: there is no generative core, and the engine never claims one.** Every stage is a
**verify-and-stamp gate over files a human or agent already produced**, not a generator:
- Stage 1 substance: checks word count ≥250 (`Makefile:151-156`).
- Stage 4 audio: checks file ≥200 KB (`Makefile:216-220`).
- Stage 7 cut: checks the exported `.mp4` exists (`Makefile:296-302`).
- Stage 8 surfaces: **deliberately OFF** until canon is swept (`Makefile:334-349`) — refuses to
  multiply a known-wrong stat across 11 surfaces. This is the healthiest instinct in the whole repo:
  it *won't* auto-generate rather than generate garbage.

What's genuinely real and running: the timing stage shells out to actual Whisper/align Python
(`Makefile:229-259`), and `gate.sh` runs real checks (four episodes have real `last-gate.log`s).

What's **unproven**: it has **never completed a week end-to-end.** Evidence from `build/`:
- `ep05/`: only `substance.stamp` + hashes — got one stage in, then stuck at G1 waiting on Ali.
- `ep06/`: only `canon.hash`. `ep01, ep03, ep04, ep99`: only a `last-gate.log` (gate run once).
- No episode has `scripts.stamp`, `audio.stamp`, `timing.stamp`, `art.stamp`, or `cut.stamp`.

So it's honest plumbing, smoke-tested one stage deep, not a proven pipeline. **Keep it** — it is the
one artifact that subtracts (retires the 1,365-line runner, replaces three dashboards with plain
resumable `make`, refuses bad auto-generation, stops at exactly four human gates) rather than adds.
But its worth is **provisional until one real episode runs the full chain**. Prove it on ep05 or
delete the claim that it "runs the week."

---

## The pattern, answered directly

**Is the answer usually "stop doing this" rather than "add more"? Yes — five of six.**

| Thing | Verdict | It added apparatus that… |
|---|---|---|
| operating-model.md | FIX | described 5 layers, built ~1 |
| agents/ (29 files) | KILL | charts an org that never ran |
| review-content.mjs | FIX/KILL | is the "gate" that never gated |
| 3 command centres | KILL | are homes nobody lived in |
| run-weekly-production.js | KILL | its own successor says retire |
| engine/ | KEEP (unproven) | is the only one that subtracts |

The way out is not a seventh system. It's: delete four of these, wire or drop the fifth, and run the
sixth on one real episode to see if it actually holds.
