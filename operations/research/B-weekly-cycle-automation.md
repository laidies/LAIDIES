# B — Automating the weekly production cycle

**Written:** 2026-07-22 · **Extends:** `Website-homepage/operations/research/agent-operations-playbook.md` (2026-07-21)
**Reads first:** `_BRIEF-for-research-agents.md` · `operations/weekly-cycle-map.md` · `operations/episode-canonical-source-spec.md` · `operations/laidies-operating-model.md`
**Local facts established by reading the code on 2026-07-22**, not by asking an agent what it thinks is there.

Labels, same four as the playbook: **[FACT]** = fetched primary source · **[OPINION]** = named practitioner/vendor position · **[INFERENCE]** = my argument applied here, judge the argument · **[NOT VERIFIED]** = could not confirm. **[LOCAL]** = verified by direct inspection of this repo today.

---

## 0. Where the playbook was followed, and where it was not

The brief asks for this explicitly, so it goes first.

| Playbook item | Followed? | Why |
|---|---|---|
| A1 — "prefer a fixed workflow over an open-ended agent when the task is well-defined" **[FACT]** | **Followed, hard.** | The whole recommendation below is a build system with agent steps inside it, not an agent framework with build steps inside it. |
| A3 — "is this a rule, or a check?" | **Followed.** | Every stage verdict below names either a script that exits non-zero, or a named human. Nothing is left as prose. |
| A4 — hooks are the deterministic layer | **Partly followed, and corrected.** | Hooks guard an *interactive Claude session*. They cannot guard an unattended weekly run, because nothing fires them when nobody is typing. The week needs a runner; hooks stay as the second net. |
| A6 — five gates G1–G5 | **Followed, with G1 moved earlier.** | The playbook puts G1 at "the episode's canon file." I move it one step earlier, to a **one-page substance brief**, because the Ep5 evidence is that a finished 1,400-word artifact is the most expensive possible place to discover the teaching is bad. This matches the fix already recorded in memory `ep5-usefulness-critique-2026-07-10` and never built. |
| A7 — caching, Batch API, effort tiering | **Followed by reference.** No new work. | The weekly pipeline reruns the same prefix (canon + writing lock + palette) dozens of times; that is the cache case the playbook already made. |
| D1a — deterministic stage gates | **Followed.** | This is the Makefile. |
| D1c — one-episode buffer | **Followed, and its evidence gap re-confirmed.** | I searched again. Nothing changed. See §6. |
| **D3a — "coverage gate (~1h), the highest-ranked recommendation in the report"** | **NOT followed — because it is already built.** | See §1, correction 1. `Website-homepage/scripts/check-episode-cues.js` (155 lines) already reconciles every cue's `src` against a file on disk and exits 1. The playbook's #1 item is not a build, it is a **wiring** job. Nothing runs it. |
| C7 — provenance markers + content hashing on derived surfaces (ranked #10, "~2h") | **Followed and promoted to #3.** | It is not a nice-to-have. It is the only mechanism that makes Stage 6 survive. |
| D6b — manifest-driven, not discovery-driven | **Followed and made the spine of §5.** | |
| Anti-pattern 3 — no multi-agent parallelism on shared files | **Followed.** | Site edits stay serial. Parallelism is confined to the gate battery (read-only) and image generation. |
| Playbook's mapping "Operator / pipeline → a saved Workflow" (from `laidies-operating-model.md`) | **NOT followed. Contradicted.** | **[FACT]** Claude Code's workflow docs: *"Resume works within the same Claude Code session. If you exit Claude Code while a workflow is running, the next session starts the workflow fresh."* A week-long pipeline with three human gates cannot live inside one session. See §3. |

---

## 1. What already exists — read, not guessed (2026-07-22)

This section exists so nothing below gets rebuilt. Every line was verified by opening the file.

### 1a. Scripts that work and are wired to something

| File (absolute paths under `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/`) | What it actually does | Wired to |
|---|---|---|
| `scripts/check-town.js` (103 lines) | Six cross-surface parity checks: every published episode has a canon file; episode titles agree across `content/episode-index.json`, `content/site/site-data.js` and `chick-flicks.html`; no dead `href="#"` on live top-level pages; every `site-index.json` entry resolves to a real file; every reward event the Closet consumes is emitted in `script.js`; every quiz selector has data in both `quizzes.json` and the `site-data.js` fallback, and the two agree. Exits 1 on any failure. | **`.githooks/pre-commit`, and `git config core.hooksPath` is set to `.githooks`** — so it genuinely runs on commit. **[LOCAL]** |
| `operations/check-episode.sh` (~140 lines) | Banned phrases, self-hyping "tells" regexes, absolutes as WARN, SUNNYYV misspelling, stale term list, `.txt`↔`.md` prose sync, and **MUST-MATCH strings present verbatim in script + article**. | `Website-homepage/.claude/settings.json` → `operations/hooks/episode-shipcheck.sh`, a PostToolUse hook that fires it on any edit to an `episode-NN` / `issue-NN` file and exits 2 with the FAIL lines. **[LOCAL]** |
| `scripts/update-hot-goss.py` | Fetches + rewrites AI news into `content/hot-goss-feed.json`, commits and pushes. | `.github/workflows/hot-goss-daily.yml`, cron `0 12 * * *`, with `ANTHROPIC_API_KEY`. **[LOCAL]** |
| `.github/workflows/ai-model-freshness.yml` | Mondays 14:17 UTC, opens/bumps a GitHub issue reminding a human to re-verify `content/site/current-models.js` against each maker's own page. Deliberately does not auto-rewrite teaching copy. | GitHub Actions cron. **[LOCAL]** |

### 1b. Scripts that work and are wired to **nothing**

This is the largest single finding in this report.

| File | What it does | Status |
|---|---|---|
| **`scripts/check-episode-cues.js`** | Reads every `episode-NN-cues.json`, validates JSON, cue time ordering, **asserts every `src` resolves to a real file on disk (FAIL)**, asserts the declared audio file exists (FAIL), flags byte-identical visual files by sha256 (WARN), flags holds > 75 s (WARN), flags `< 18` main cues as "coverage is unusually sparse" (WARN). Exits 1 on failures. | **Orphaned.** No hook, no workflow, no pre-commit, no npm script (there is no `package.json` at the repo root). **This is the playbook's #1 recommendation, already written, never run.** |
| `scripts/check-local-links.js` (107 lines) | Missing local links and assets across live-facing HTML, with prototypes/archives excluded. | Orphaned. |
| `scripts/check-inline-js.js` (65 lines) | Parses inline JS on every live-facing page (syntax errors). | Orphaned. |
| `operations/ops/check_site.py` (94 lines) | Header parity, zombie Grimoire pages, broken-layout detection, git deploy state → writes `operations/ops/state.json`. | On-demand only. |
| **`operations/workflows/review-content.mjs`** | **The teaching-quality gate.** A Claude Code dynamic workflow: five gate agents in parallel — `fact-check` (web-verified, cross-checks `operations/reference/ai-landscape-factsheet.md`), `substance`, `canon`, `design-ux`, `cold-reader` — each returning a strict JSON verdict (`PASS`/`FAIL` + severity-tagged issues + `learnsInOneSentence`), then a synthesis phase that FAILs overall if any gate fails. | **Orphaned by design:** its own header says *"It does NOT auto-run; invoke it explicitly."* |

**Would `review-content.mjs` have caught the Ep5 master file?** Its substance gate prompt reads, verbatim: *"A smart, busy woman ALREADY knows there are different AI companies. In `learnsInOneSentence`, name exactly what she LEARNS here that she didn't know. If you can't, or it's a shallow skim, verdict=FAIL."* That is Ep5 defects #3 (anonymised payload) and #4 (payoff is a negation) stated as a test. **[INFERENCE]** It would very likely have failed the file. It never ran, because running it requires a human to remember to ask. That is the enforcement problem in one sentence, and it is the same shape as the one the brief already diagnosed: *ruling recorded, draft unchanged.*

### 1c. A canon→surfaces generator that already exists — pointed at the wrong source

`scripts/build-episode-assets.js` (638 lines) generates, per episode: the issue HTML page, `social/episodes/issue-NN-instagram-kit.md`, `…-linkedin.md`, `email/buttondown/issue-NN.md`, `community/weekly-prompts/issue-NN.md`, and rebuilds `content/episode-index.json` and `content/site/site-data.js`. It already contains **two of the three mechanisms §5 needs**:

- a **provenance marker** — `data-generated-by="laidies-weekly-production"` stamped on the `<html>` tag, and
- a **do-not-clobber rule** — `shouldWriteIssuePage()` refuses to overwrite a page that lacks the marker, so hand-authored pages survive.

But it reads `content/episodes/issue-0N.json`, **not** `content/episodes/episode-0N.canon.md`. **[LOCAL]** So this repo has two episode sources of truth: the canon file that `episode-canonical-source-spec.md`, `check-town.js` and `build-art-batch.py` treat as authoritative, and the `issue-NN.json` that the actual generator consumes. `issue-05.json` was last touched 2026-07-21; `episode-05.canon.md` on 2026-07-10. **That is the drift engine, and it is one wiring change away from being the fix.**

### 1d. An orchestrator that already exists and is the wrong shape

`scripts/run-weekly-production.js` — **1,365 lines**. It runs `build-episode-assets.js`, then writes a production-review packet, a growth scorecard, an "agent council review", eight markdown-viewer HTML files, and finally `operations/weekly-command-center.html`. Its launchers are PowerShell (`scripts/run-weekly-production.ps1`, `scripts/start-weekly-workflow.ps1`) and hard-code a Windows Codex runtime path (`$env:USERPROFILE\.cache\codex-runtimes\…\node.exe`). Ali is on macOS.

Its output is a dashboard. Memory `chat-is-the-one-place` rules that Ali will not toggle screens. **[LOCAL]** This repo already contains **four** dashboards nobody opens: `operations/weekly-command-center.html`, `operations/ops/ops-centre.html`, `operations/ops/workspace.py` (639 lines, serves localhost:8790), `operations/agents/agent-command-center.html`.

### 1e. The environment facts that will break an unattended run

Verified on this machine, 2026-07-22. **[LOCAL]** These are not nitpicks — each one silently kills a stage.

1. **`make` is GNU Make 3.81** (Apple's bundled 2006 build). `.DELETE_ON_ERROR` and order-only prerequisites work. `.ONESHELL` (3.82+) and `$(file …)` (4.0+) do **not**. Write to 3.81, or `brew install make` and call `gmake`.
2. **`ffmpeg` is not installed** — not on `PATH`, not in `/opt/homebrew/bin`, not in `/usr/local/bin`. The brief lists it in the current stack. Whatever produced the Ep4 export, it is not reachable from a scheduled shell.
3. **The Stage-3 Python environment lives outside this repo.** `align.py`/`transcribe.py` need `faster_whisper`; the only venv is `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/operations/tools/.venv-align/`, in the *other* copy of `tools/` that `operations/tools/README.md` already flags. System python here is 3.9.6 with nothing installed. A Makefile must call the venv's interpreter by absolute path.
4. **`align.py` hard-codes episode 04** in three output paths (`episode-04-timing-map.json`, `episode-04.vtt`, `episode-04.srt`), and `beat-brief.py` hard-codes `../captions/episode-04-missing-beats.json`. Neither can run for Ep5 without editing the script. A three-line fix, and it is currently blocking every future week.
5. **The repo is 702 files uncommitted and 397 commits ahead of `main`,** on branch `homepage-redesign`; `main`'s last commit is 2026-06-28. So the one gate that *is* wired — `check-town.js` on pre-commit — effectively almost never fires. **Any staleness scheme that depends on git will not work here.** The scheme in §4/§5 deliberately does not.

---

## 2. Stage-by-stage automation verdict

Legend: **SCRIPT** = deterministic, exits non-zero, no model involved · **AGENT+V** = a model does it, a script or a second model verifies before anything downstream starts · **ALI** = her judgement, at a gate · **NEVER** = do not automate this, with the reason.

### Stage 1 — the master file (`content/episodes/episode-0N.canon.md`)

| | |
|---|---|
| **SCRIPT** | Section completeness (every `##` block in the spec present and non-empty). Every `facts[]` row has a `source_url` and a `verified_date`. `MUST-MATCH` block non-empty (today `check-episode.sh` only *warns* when it's missing — make it FAIL). `check-episode.sh` banned/tells/spelling greps. **New, cheap, and it is Ep5 defect #2:** a **one-term-per-concept lint** — canon declares `concepts[].term`, and the linter fails any surface that uses a declared synonym for it. The Ep5 draft called one thing supermodel/star/face/poster/"whoever's in the window" and the app boutique/store/shop/storefront/flagship/counter/address. That is a set-membership test, not a taste question. |
| **AGENT+V** | `operations/workflows/review-content.mjs`, run **against the one-page brief first, then against canon**. Plus a fact-researcher that produces the cited fact-sheet *before* prose exists (rule 2 of `laidies-operating-model.md`: facts first, prose second). |
| **ALI** | **G1 — the one-page substance brief.** Not the canon file, not the script. One page: what she learns that she didn't know, the named-names payload with a trigger ("two-line email → X; the contract where one missed clause costs you → Y"), the comparison, and the fact list with sources. Yes / no / redirect. ~10 min. |
| **NEVER** | The usefulness judgement itself. Memory `ep5-usefulness-critique-2026-07-10` is explicit: the gate *"cannot judge 'is this genuinely useful to our reader' — that is ONLY Ali's call. Do NOT treat gate-SHIP as the usefulness bar."* The gates exist to make sure that by the time she looks, *nothing else is wrong* — so her ten minutes are spent on the only question a machine can't answer. |

### Stage 2 — the two scripts

| | |
|---|---|
| **SCRIPT** | Format lock on `operations/audio/episode-0N-elevenlabs-v3-tagged.txt`: cast tags resolve to `SPEAKERS` in `align.py`, TTS tags well-formed, the sign-off line present verbatim, the written-version nod present (today a WARN in `check-episode.sh`; promote to FAIL — it is a standing convention, not a preference). `.txt`↔`.md` sync (exists). MUST-MATCH verbatim in both (exists). Synonym lint from Stage 1. **Article-vs-script fact diff against `facts[]`.** |
| **AGENT+V** | The drafting, from canon only. Then the full gate battery again, this time on the rendered script. Up to two automatic revision rounds; on a third failure the run **stops and names the gate and the line** rather than trying again. |
| **ALI** | **Nothing.** If she approved the substance and canon is locked, the script is a rendering of a decision she already made. She sees it only if the battery fails twice. |
| **NEVER** | Nothing here needs her — and that is the point. Today this stage is where her attention goes, because it is the first artifact that reads like the show. |

### Stage 3 — audio, then the timing map

**The most automatable stage in the week, and it is already built.** `transcribe.py` → `align.py` → `check-cues.py` → `beat-brief.py`. Whisper supplies only the clock; caption text comes from the true script — that design is right and should not be touched.

| | |
|---|---|
| **SCRIPT** | Everything, end to end, including the ElevenLabs render if the API key is wired. Plus a new assertion `align.py` already prints but nobody acts on: **`coverage` must be ≥ some floor** (it prints `units / timed / coverage%`). If alignment coverage drops, every downstream visual placement is guesswork. Make it exit non-zero below, say, 90% and let the first real week calibrate the number. |
| **AGENT+V** | None needed. |
| **ALI** | Nothing. Optionally listens once. |
| **NEVER** | Nothing. But **fix the hardcoded `episode-04` paths first** (§1e.4) — this stage cannot run for Ep5 as written. |

### Stage 4 — images

| | |
|---|---|
| **SCRIPT** | `build-art-batch.py` (prompt generation from cues + timing map + canon `cast[]`/`heroine_outfit`, with the BLOCKED section for any named woman with no photo reference — that mechanism is good, keep it). `qc-frames.py` (dimensions, exact-duplicate hash, near-identical neighbours, retired palette, saturation, exposure, wrong generation in filename). `check-episode-cues.js` for the coverage assertion. |
| **AGENT+V** | Honestly: **not yet.** The measured hit rate is ~2 usable of 18 (2026-07-22) and ~7 of 22 (Ep4). An agent verification layer on top of a generator that fails 80–90% of the time buys nothing. The playbook's D2a — retrain the LoRA on the *approved* frames — is the prerequisite, and it is a dataset fix, not a method fix. |
| **ALI** | **G2 — reference lock**, once per *style generation*, not per week. **G3 — triage**, only the frames the machine flagged, presented as A/B pairs in chat. ~20 min. |
| **NEVER** | Acceptance. And do not scale batch size until the hit rate is fixed — that is already the local ruling and it should stay a hard cap in the script, not an intention. |

### Stage 5 — the cut, motion, export

| | |
|---|---|
| **SCRIPT** | Shot list from the cue sheet (already works, already carries the right warning that it is derived). Captions from `align.py`. **Coverage reconciliation before assembly** — `check-episode-cues.js`, which is exactly the "she should never be the one who discovers a beat is missing" gate. Export checksum, `watch.html` wiring, preview server with Range (`tools/preview-server.js`). |
| **AGENT+V** | Caption spot-check against the timing map. |
| **ALI** | **G4 — watch the cut once**, and only after the coverage gate is green. ~15 min. |
| **NEVER / can't** | **CapCut.** **[NOT VERIFIED]** — I did not find a documented CapCut CLI or scripting API, and I am not going to assert one exists. Treat it as manual. **The automation's job is to shorten the CapCut session, not replace it:** hand it a complete, ordered, verified folder plus the cue sheet, so no time goes on hunting assets. See §8.8 for the bigger prize. |

### Stage 6 — everything else the week owes

**Verdict: almost entirely SCRIPT, and it is the one stage nobody automated.** Full mechanism in §5. Ali's only touch is **G5 — publish**, ~5 min, on a diff summary plus green check results.

The one genuine exception: the **song**. Suno is a generative service with a taste call attached, and `operations/audio/laidies-songbook-suno.md` shows songs are already written in batches. **That is out-of-week work** (§6) — the Wednesday Anthem for week N+3 should already exist when week N+3 starts.

---

## 3. The orchestrator — what should actually run the week

### The candidates, judged

**Plain Makefile / shell pipeline.** A build system's entire model is: targets, prerequisites, and "is this out of date." That is *exactly* the shape of canon → 11 surfaces. It is already installed (`/usr/bin/make`, GNU Make 3.81, **[LOCAL]**). It resumes for free: rerun after a failure and everything already built is skipped. It has one documented safety feature that matters here — **[FACT]** GNU Make manual, *Special Targets*: *"If `.DELETE_ON_ERROR` is mentioned as a target anywhere in the makefile, then `make` will delete the target of a rule if it has changed and its recipe exits with a nonzero exit status."* Without it, a half-written article file looks "done" forever. Its real weakness: **make compares modification times, not content.** On a repo living in iCloud Drive with 702 uncommitted files, mtime is a shakier signal than usual. **[INFERENCE — worth one test, not an assumption]**: iCloud eviction/redownload can move mtimes without content changing, which would cause spurious rebuilds. The fix is in §4 and costs fifteen lines.

**Python state machine over a JSON state file.** This is re-implementing make, worse, and adding a file that must be kept honest. The local evidence is already on the table: `operations/ops/state.json` contains `"generated": null` — the state file's own timestamp field is null because nothing kept it current. **[LOCAL]** A JSON state file is a second source of truth about what happened; the filesystem is the first. **Don't.**

**Claude Code subagents / dynamic workflows.** Right primitive, wrong altitude. **[FACT]** Workflows docs: *"Resume works within the same Claude Code session. If you exit Claude Code while a workflow is running, the next session starts the workflow fresh."* Also **[FACT]**: *"No mid-run user input. Only agent permission prompts can pause a run. For sign-off between stages, run each stage as its own workflow."* The week has three human gates spread over five days. It cannot be one workflow. But the docs' own advice — *run each stage as its own workflow* — is precisely the design below: **workflows are steps; make is the runner.** `review-content.mjs` stays exactly as written and becomes one `make` target.

**GitHub Actions.** Already in use here and should stay for what it does (Hot Goss daily, Monday model-freshness). It cannot run the week: Stages 3–5 need local files, a local venv, and a GUI app. And its scheduling is explicitly unreliable — **[FACT]** GitHub docs, *Events that trigger workflows*: *"The `schedule` event can be delayed during periods of high loads of GitHub Actions workflow runs… If the load is sufficiently high enough, some queued jobs may be dropped."* Do use it for the *pure* checks (`check-town.js`, `check-episode-cues.js`, `check-local-links.js`, `check-inline-js.js` are plain Node with no local deps) on push, as a second net.

**cron / scheduled agents.** Something has to *start* the week. **[FACT]** Apple's *Scheduling Timed Jobs*: cron *"is not a recommended solution and has been deprecated in favor of `launchd`,"* and unlike cron, a `launchd` `StartCalendarInterval` job *"will run when the computer wakes up"* if it was asleep. But the simplest correct answer for one non-technical person is Claude Code's own **Desktop scheduled task**: **[FACT]** *"A local task runs on your machine with direct access to your files and tools, but only fires while the app is open and your computer is awake"*, it does **not** require an open session, it persists across restarts, it has a **Weekly** preset, and *"If it did [miss a run], Desktop starts exactly one catch-up run for the most recently missed time."* One caveat to design around, **[FACT]**: *"Tasks only run while the desktop app is running and your computer is awake… If your computer sleeps through a scheduled time, the run is skipped."*

### The recommendation

> **A Makefile, driven by content-hash stamps, with agent steps invoked as `claude -p`, human gates expressed as approval files, kicked off by one weekly Claude Code Desktop scheduled task.**

Four reasons, in order:

1. **The problem is a dependency graph, not a conversation.** Canon changes; eleven things must change. That is a build. Every alternative here is a build system with extra steps and a server.
2. **Judgement fits inside a build step cleanly.** **[FACT]** Claude Code headless docs: `claude -p` runs non-interactively; `--output-format json` with `--json-schema` returns the result in a `structured_output` field; `--bare` *"is the recommended mode for scripted and SDK calls"* because it *"skips auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md"* so *"you need the same result on every machine."* So a gate is: run the judge, get JSON, `jq` the verdict, exit 1 on FAIL. The build system stays dumb; the judgement stays sharp. **[FACT]** Also: *"In `claude -p` and the Agent SDK there is no one to prompt, so tool calls follow your configured permission rules without interactive confirmation"* — which is what makes an unattended run possible at all, and also why `--allowedTools` must be tight.
3. **Human gates and resumability are the same mechanism.** A gate is a target whose prerequisite is a file only Ali's "yes" creates. Make stops, says what it's waiting for, and does nothing wrong. This is Luigi's model stated plainly — **[FACT]** Luigi docs: *"It is your responsibility to ensure that after running `run()`, the task is complete, i.e. `complete()` returns `True`"*, with completion defined by targets existing. Approval-as-a-file gives you an audit trail for free.
4. **Nothing new to install, nothing to keep running.** No daemon, no scheduler service, no web UI, no second state file.

### What that looks like, concretely

`Website-homepage/Makefile` (sketch — the real one is a build task, not a research deliverable):

```make
.DELETE_ON_ERROR:                      # a failed recipe never leaves a half-written target
EP    ?= 05
B      = build/ep$(EP)                 # all stamps + intermediates; gitignored
CANON  = content/episodes/episode-$(EP).canon.md
PY     = /Users/alisoneakin/.../LAIDIES/operations/tools/.venv-align/bin/python

# ---- gate 1 ----------------------------------------------------------------
$(B)/brief.md: $(B)/canon.hash
	$(PY) operations/tools/make-substance-brief.py $(EP) > $@

$(B)/brief.PASS: $(B)/brief.md
	scripts/gate.sh review-content $< && touch $@     # claude -p, JSON verdict, exit 1 on FAIL

$(B)/G1.approved: $(B)/brief.PASS
	@echo "WAITING ON ALI — G1. Read $(B)/brief.md. Approve to continue."; exit 1

# ---- everything downstream hangs off G1 ------------------------------------
$(B)/script.txt: $(B)/G1.approved $(B)/canon.hash
	...
```

`scripts/gate.sh` is the whole agent bridge:

```sh
claude --bare -p "/review-content $1" --output-format json \
  | jq -e '.structured_output.overall == "PASS"' > /dev/null
```

**One Makefile, one command (`make week`), three stopping points.** When it stops it prints one line saying which gate and where the artifact is. That line goes in chat. No dashboard.

---

## 4. Resumability and partial failure

A week's run *will* fail halfway — a model times out, an image batch comes back wrong, the laptop sleeps. The state model has to make "run it again" the correct and safe response.

### The four ideas worth stealing (and the products to leave alone)

| Idea | Where it's from | Does it transfer here? |
|---|---|---|
| **A completed target on disk *is* the state.** No side ledger. | make; Luigi (*"Luigi verifies that you adhere to the contract before running downstream dependencies"* **[FACT]**) | **Yes — this is the core.** It is why `ops/state.json`'s null timestamp can't happen: there is no state to forget to write. |
| **Delete a target whose recipe failed.** | **[FACT]** GNU Make `.DELETE_ON_ERROR` | **Yes, one line.** The alternative is a truncated article that make believes is finished forever. Snakemake makes the same choice from the other direction — **[FACT]** its `--keep-incomplete` exists precisely to *opt out* of *"remove incomplete output files by failed jobs."* |
| **Decide staleness by content hash, not timestamp.** | DVC (**[FACT]** `dvc.lock` stores a *"content hash field (`md5`, `etag`, or `checksum`)"* and DVC compares current hashes against it to know a stage is invalidated); Task/go-task (**[FACT]** *"Task will compare the checksum of the source files to determine if it's necessary to run the task"*, stored in a `.task` directory) | **Yes — and it is the fix for make's one weakness here.** Fifteen lines: `hashstamp.py SRC STAMP` writes `sha256(SRC)` into `STAMP` **only if it differs**. Then `STAMP`'s mtime changes only on a real content change. Every derived target depends on the *stamp*, never the source. That gives make DVC's property without DVC. |
| **Code version vs data version — a downstream thing is stale if the thing above it changed.** | **[FACT]** Dagster: an asset becomes "Unsynced" when its code version changes, its dependencies change, or a parent's data version changes on materialization; and *"version changes are not transitive"* — a downstream asset is only unsynced if *"its last materialization is against an outdated version"*. | **Yes, and it is exactly §5.** Canon = the upstream asset. Each surface's stamped canon-hash = its last materialized version. Mismatch = stale. |
| An escape hatch to re-run only the broken things. | **[FACT]** Snakemake `--rerun-incomplete`: *"Re-run all jobs the output of which is recognized as incomplete."* | Yes, but you get it free: `rm build/ep05/art.PASS && make week`. |
| A server, a database, a scheduler daemon, a web UI. | Prefect, Dagster, Airflow, DVC-as-a-product | **No.** Prefect's caching model is sound (**[FACT]** cache key hashed from *"the inputs provided to the task, the code definition of the task, the prevailing flow run ID"*), but adopting it means a Python environment and a service one person must maintain, on a machine where the *existing* venv already lives in the wrong directory (§1e.3). Take the idea; skip the product. |
| A command runner with no dependency tracking. | `just`, and shell scripts | **No — and `just`'s own manual says why.** **[FACT]**: *"`just` is a command runner, not a build system, so it avoids much of make's complexity and idiosyncrasies. No need for `.PHONY` recipes!"* That trade is backwards for this job: the complexity you're avoiding *is* the resumability. `just` is fine as a friendly front door (`just week` → `make week`) if the Makefile syntax grates. |

### The state model, stated once

```
build/ep05/
  canon.hash          sha256 of episode-05.canon.md      (rewritten only on real change)
  brief.md            derived
  brief.PASS          the gate battery said PASS
  G1.approved         ALI SAID YES            ← only a human creates this
  script.txt  script.PASS
  audio.mp3  timing-map.json  cues.PASS
  art.PASS
  G3.approved         ← ALI
  cut.mp4  coverage.PASS
  G4.approved         ← ALI
  surfaces/*.stamp    one per Stage-6 surface, each holding the canon hash it was built from
  G5.approved         ← ALI
```

Rules:
1. `build/` is gitignored and disposable. Deleting it forces a full rebuild; deleting one file forces exactly one rebuild.
2. `.DELETE_ON_ERROR` is set, so no target is ever half-written.
3. Approval files are created **only** by Ali's yes, recorded through Claude in chat (`touch build/ep05/G1.approved` plus a one-line note appended to `operations/DECISIONS.md`). An agent creating one is a hook-blockable offence — that is a `PreToolUse` deny rule on `Write|Bash` matching `G[0-9].approved`, and it is the single most important guardrail in the whole design.
4. Rerunning `make week` after any failure is always safe and always correct. That is the whole point.

---

## 5. Derivation, not authoring — how Stage 6 stops getting forgotten

Stage 6 owes ~11 surfaces. It is the stage that gets forgotten because it is the only one with no artifact that *looks* like an episode. The fix is to make "you forgot one" arithmetic.

### Three mechanisms, in the order they should be built

**1. A manifest — the denominator.** One new file, `Website-homepage/operations/episode-surfaces.json`. One row per surface:

```json
{ "id": "quiz",
  "target": "content/site/quizzes.json",
  "mode": "merged",
  "region": "issue{NN}",
  "canon_fields": ["quiz[]", "lesson"],
  "generator": "operations/tools/gen-quiz.py",
  "consumers": ["learn/quiz.html", "content/site/site-data.js", "sunnyvaile-high.html"] }
```

Three `mode`s, and the distinction is what makes this safe:
- `generated` — the whole file is written from canon (article, study pack, cocktail line, vocab entries, cards, social kits).
- `merged` — one record is inserted into a shared file that also holds other episodes' data (`quizzes.json`, `card-packs.json`, `charm-hunt.js`, `content-registry.json`, `site-index.json`, `high-classes.json`, `site-data.js`).
- `manual` — a human or a non-scriptable service produces it (the Suno track, the CapCut cut). The manifest still *tracks* it, so it can be reported missing.

The manifest is what turns "did we do all eleven?" into `11 == 11`. This is the playbook's own D6b (*"Search finds what matches a pattern; a manifest defines what must exist"*) applied to the stage that needs it most.

**2. A provenance marker with the canon hash, on every derived file.** Use the one convention that already has a machine-checkable definition — **[FACT]** Go's `go generate` docs: *"generated source should have a line that matches the following regular expression (in Go syntax): `^// Code generated .* DO NOT EDIT\.$`"*, and it *"must appear before the first non-comment, non-blank text in the file."* Adapt the comment syntax per file type and add the hash:

```html
<!-- Code generated from content/episodes/episode-05.canon.md sha256:9f3c… DO NOT EDIT. -->
```

Two jobs. It tells a future agent that opens the file mid-task not to edit it (the failure mode that produced the drift in the first place). And it carries the version this surface was built from — Dagster's data-version idea, in a comment.

For `merged` files, wrap the region, not the file:
```js
/* BEGIN GENERATED issue05 from episode-05.canon.md sha256:9f3c… — DO NOT EDIT */
…
/* END GENERATED issue05 */
```
Precedent already exists locally: `build-episode-assets.js`'s `shouldWriteIssuePage()` refuses to overwrite anything without its marker. **[LOCAL]** Generalise that rule; don't reinvent it.

**3. `check-surfaces.py` — one script, and it is the answer to the question asked.**

```
for each published episode:
    h = sha256(episode-0N.canon.md)
    for each row in episode-surfaces.json:
        target missing            -> MISSING
        marker absent             -> UNTRACKED (hand-authored where a generated file belongs)
        marker hash != h          -> STALE
    assert surfaces_found == len(manifest)
exit 1 on any MISSING or STALE
```

That is the cheapest mechanism that makes *"a surface is stale"* a script's finding instead of a human's discovery. It is ~60 lines, it needs no git, no server and no network, and it runs in under a second. It belongs in three places: a `make` prerequisite of `ship`, the `.githooks/pre-commit` alongside `check-town.js`, and a GitHub Action on push.

### The one wiring change that unlocks all of it

**Make `content/episodes/issue-0N.json` a derived file.** Generate it from `episode-0N.canon.md`, stamp it, and `build-episode-assets.js` — 638 working lines that already produce seven surfaces — becomes part of the canon pipeline without being rewritten. Until that happens, every surface it produces is derived from the wrong source and `check-surfaces.py` would report the truth: they're all stale.

**[INFERENCE]** This is the highest-leverage half-day in this document. It converts existing, working code from a drift source into the fix.

---

## 6. The deadline — what actually moves Wednesday left

**Honest position first.** The playbook's Open Question #21 says no peer-reviewed or vendor guidance exists for AI-content production scheduling. I searched again on 2026-07-22 and found nothing that changes that. **I am not going to fabricate scheduling evidence.** What follows is either a documented mechanical fact, or an argument labelled as one.

**What is documented and directly usable:**

- **[FACT]** GitHub's `schedule` event *"can be delayed during periods of high loads"* and *"some queued jobs may be dropped"*, with the explicit mitigation *"schedule your workflow to run at a different time of the hour."* The existing `ai-model-freshness.yml` already does this (`17 14 * * 1`, off-minute on purpose) — good instinct, keep it.
- **[FACT]** Claude Code Desktop tasks skip entirely if the machine sleeps, and on wake run *"exactly one catch-up run for the most recently missed time"* — plus the docs' own warning: *"A task scheduled for 9am might run at 11pm if your computer was asleep all day. If timing matters, add guardrails to the prompt itself."*
- **Therefore: never design a week that depends on a step firing at an exact minute.** Every stage should be idempotent and every kick should be "catch up to where we should be", not "do today's job."

**What is argument, labelled as argument:**

- **[INFERENCE — the strongest one in this section, and it has local evidence]** **The deadline lever with the most force is moving the gate to the cheapest artifact.** Ep5 has cost from 2026-07-10 to 2026-07-22 and is still not shipped, because the defect was found in a finished 1,400-word script rather than in a one-page notes brief. A brief that fails costs a morning. A script that fails costs a fortnight. This is not a scheduling insight, it's a batch-size one — and batch size is the one part of the flow literature that transfers cleanly. **[OPINION]** Reinertsen, *The Principles of Product Development Flow* (2009), argues large batches buy apparent efficiency at the cost of *"increased delay, slower feedback, and slower iteration"*, and that queue size, not cycle time, is the thing to control (summarised at https://www.se-trends.de/en/the-175-flow-principles-why-product-development-is-often-slower-than-necessary/, retrieved 2026-07-22 — this is a secondary summary, not the book).
- **[INFERENCE]** **What can leave the week entirely.** These are episode-independent or batchable and should never be on the critical path:
  - the **style/character reference lock** — per art generation, not per week (G2);
  - the **Wednesday Anthem** — Suno, already batched in `operations/audio/laidies-songbook-suno.md`; run a season at a time;
  - **charm art, card art templates, quiz shells, printable layouts** — templates once, content per week;
  - **fact research** for the next 2–3 episodes — the "Pipeline Filler" already named in `laidies-operating-model.md` and never built;
  - anything non-interactive can go through the **Batch API** at 50% off with up to an hour of latency **[FACT, via playbook §A7]** — latency is free when the work happens two weeks early.
- **[INFERENCE]** **The one-episode buffer.** Unchanged from the playbook, and still resting on its own logic rather than evidence: with zero buffer every generation failure is a deadline failure; with one episode banked a bad batch costs quality of life instead of the ship date. The Makefile makes this natural rather than heroic — `make week EP=06` and `make week EP=05` are the same command.
- **[INFERENCE]** **The biggest unclaimed hour.** Under the design in §7, the largest remaining block of Ali's time is the CapCut session. The cue sheet already contains `t` and `src` per beat and `align.py` already emits `.vtt`/`.srt`. A still-image cut with burned-in or sidecar captions is, mechanically, an ffmpeg concat. If that works for this show's style, it removes the single largest manual block in the week. It needs a real test and it needs ffmpeg installed (§1e.2). Flagged as an experiment, not a recommendation — motion direction is a taste decision and memory `motion-in-capcut-not-canva` records that a tool swap already went wrong once.

---

## 7. A concrete week

Ship Wednesday morning. Episode N+1 starts the day episode N ships — that discipline *is* the buffer. Every unattended step is one `make` target; every gate stops the run and prints one line into chat.

| When | What runs | Attended? | Ali's minutes |
|---|---|---|---|
| **Wed 08:00** | `make ship EP=N` — `check-town.js`, `check-episode-cues.js`, `check-surfaces.py`, `check-local-links.js`, diff summary | unattended | — |
| **Wed 08:15** | **G5 — publish.** One screen: what changed, all checks green, the surface count (11/11). Yes/no. | **ALI** | **5** |
| **Wed 20:00** | Desktop scheduled task fires `make week EP=N+1`. Fact research + cited fact-sheet + the **one-page substance brief**. Gate battery runs on the brief. If the battery FAILs, it redrafts once, then stops. | unattended | — |
| **Thu 09:00** | **G1 — the substance brief.** One page. What she learns, named names with triggers, the comparison, the sourced facts. Yes / no / redirect. | **ALI** | **10** |
| **Thu 09:15 →** | On `G1.approved`: canon expanded from the brief, narration script + article derived, gate battery on both, `check-episode.sh`, synonym lint, MUST-MATCH. Two automatic revision rounds max. | unattended | — |
| **Fri 06:00** | Audio render → `transcribe.py` → `align.py` → `check-cues.py` → `beat-brief.py`. Alignment-coverage assertion. | unattended | — |
| **Fri 10:00** | `build-art-batch.py` → generation → `qc-frames.py` → `check-episode-cues.js`. Flagged frames assembled as A/B pairs. | unattended | — |
| **Fri 16:00** | **G3 — triage.** Only flagged frames, pairwise, in chat. (G2, the reference lock, is not a weekly event.) | **ALI** | **20** |
| **Sat–Sun** | Nothing runs. Deliberately. Slack absorbs a failed batch without touching Wednesday. | — | — |
| **Mon 09:00** | Cut assembly. Assets delivered ordered and verified; shot list + captions generated. **CapCut session — manual today.** | **manual** | **45–60** *(see note)* |
| **Tue 06:00** | `make surfaces EP=N+1` — all 11 Stage-6 surfaces generated/merged from canon, each stamped; `check-surfaces.py` must exit 0. | unattended | — |
| **Tue 10:00** | **G4 — watch the cut.** Reachable only because the coverage gate is already green. | **ALI** | **15** |
| **Tue 11:00** | `make ship EP=N+1` dry run. Everything green, or it names what isn't. | unattended | — |
| **Wed 08:15** | **G5 — publish.** | **ALI** | **5** |

### Ali's total

| | minutes |
|---|---|
| G1 substance brief | 10 |
| G3 art triage | 20 |
| G4 cut | 15 |
| G5 publish | 5 |
| **Gate time, total** | **50 min/week** |
| CapCut session, if it stays hers | +45–60 |
| **Realistic total today** | **~95–110 min/week** |
| **Total if the cut becomes ffmpeg-from-cues** | **~50–55 min/week** |

Plus, occasionally and not weekly: **G2** — approving a new style/character reference set, once per art generation.

**What she is never asked to do:** find a missing beat, notice a stale surface, check a link, spot a synonym pile-up, remember which of eleven surfaces the week owes, or read a finished script to discover the teaching was wrong. Every one of those is a script above.

---

## 8. Ranked by impact per unit of *Ali's* effort

Effort here is build time; the ranking is by how much of *her* week each item returns, and how much risk it removes.

1. **Wire `operations/workflows/review-content.mjs` to a one-page substance brief, and make it the first target in the week.** ~2h. *The gate that would have caught Ep5 is already written and has never run.* Nothing else in this list matters if the master file is bad.
2. **Point `scripts/build-episode-assets.js` at `episode-0N.canon.md` — make `issue-0N.json` derived.** ~half a day. Kills the two-source-of-truth drift and converts 638 working lines from the problem into the fix.
3. **The Makefile: hash stamps, `.DELETE_ON_ERROR`, approval files, `scripts/gate.sh`.** ~4h. This is the orchestrator. One command, three stopping points, safe to rerun.
4. **`operations/episode-surfaces.json` + `check-surfaces.py` + provenance markers.** ~4h. Makes "a surface is stale" a script's finding. Stage 6 stops being the forgotten stage.
5. **Wire the three orphaned checks** — `check-episode-cues.js`, `check-local-links.js`, `check-inline-js.js` — into the Makefile, `.githooks/pre-commit` and a push-triggered GitHub Action. **~30 minutes.** These are written, correct, and have never run. Best ratio on the page.
6. **Fix the hardcoded `episode-04` paths in `align.py` and `beat-brief.py`; pin the venv path.** ~30 min. Stage 3 cannot run for Ep5 without this. It is currently a silent blocker.
7. **A `PreToolUse` deny rule on any write to `G[0-9].approved`.** ~15 min. An agent must never be able to grant Ali's approval. Small, and it is what makes the whole gate model trustworthy.
8. **One Claude Code Desktop scheduled task, Weekly, running `make week`.** ~20 min, mostly clicking **Run now** once and choosing "always allow" for each tool so future runs don't stall (**[FACT]**, that is the documented way to avoid stalls).
9. **Install ffmpeg and test an ffmpeg-from-cues cut.** ~half a day. The largest single block of Ali's remaining time. An experiment, gated on taste.
10. **Retire the dead orchestrator:** `scripts/run-weekly-production.js`, both `.ps1` launchers, `operations/weekly-command-center.html` and its viewer files. ~1h. 1,365 lines of Windows-targeted code producing a dashboard nobody opens is a trap for the next agent that reads the repo looking for "the weekly script."
11. **Region markers in the `merged` surface files** (`quizzes.json`, `card-packs.json`, `charm-hunt.js`, `content-registry.json`). ~2h, alongside #4.
12. **Retrain the character/style LoRA on approved frames** (playbook D2a, unchanged). Prerequisite for automating Stage 4 beyond QC.

---

## 9. What NOT to build

1. **Another dashboard.** Four already exist and are unopened: `operations/weekly-command-center.html`, `operations/ops/ops-centre.html`, `operations/ops/workspace.py` (639 lines on localhost:8790), `operations/agents/agent-command-center.html`. Memory `chat-is-the-one-place` is explicit. The Makefile prints one line; that line goes in chat. **[LOCAL]**
2. **A Python state machine over a JSON state file.** It re-implements make and adds a second thing to keep honest. The local proof is `operations/ops/state.json`'s `"generated": null`.
3. **Prefect / Dagster / Airflow / DVC as products.** Take the ideas — content hashing, target-exists-means-done, code-version staleness — take none of the servers. One person, on iCloud Drive, whose only venv already lives in the wrong directory, will not maintain a scheduler service.
4. **A Claude Code dynamic workflow as *the runner*.** **[FACT]** it cannot survive a session exit and cannot pause for human sign-off mid-run; the docs themselves say *"For sign-off between stages, run each stage as its own workflow."* This directly corrects `operations/laidies-operating-model.md`'s line *"Operator / pipeline → a saved Workflow + the registry as state."* Workflows are excellent gate batteries. They are not schedulers.
5. **GitHub Actions as the weekly runner.** Local files, local venv, a GUI app — and **[FACT]** scheduled runs can be delayed or dropped. Keep Actions for the two jobs it already does, plus the pure Node/Python checks on push.
6. **`git`-based staleness detection.** 702 uncommitted files, 397 commits ahead of `main`, `main` last touched 2026-06-28. **[LOCAL]** Any scheme that asks "what changed since the last commit" is answering a question about June.
7. **Auto-publish.** G5 stays. It is five minutes and it is the only irreversible action in the week.
8. **A bigger art batch.** The rule is already local; make it a hard cap in `build-art-batch.py` rather than an intention.
9. **More rules.** The brief's meta-lesson holds: the standard is 499 lines of writing lock plus ~10 memory rulings and it is not the problem. Every item in §8 is a mechanism.

---

## 10. Not verified / open questions

Listed rather than softened, per house rules.

1. **CapCut scripting.** **[NOT VERIFIED]** — I found no documented CLI or automation API and did not fetch a primary CapCut page. §2/§6 treat the cut as manual on that basis. Worth ten minutes to confirm before building around it.
2. **iCloud Drive and mtime.** **[NOT VERIFIED / INFERENCE]** — I asserted that timestamps are a shakier staleness signal in `com~apple~CloudDocs` than on a local disk, and recommended hash stamps partly on that basis. I did not find an Apple document stating it. The hash-stamp recommendation stands on its own merits (DVC and Task both chose content hashing over timestamps **[FACT]**), but do not repeat the iCloud claim as fact.
3. **ffmpeg's actual presence.** Not found on `PATH`, `/opt/homebrew/bin` or `/usr/local/bin` on 2026-07-22 **[LOCAL]**, yet the brief lists it in the current stack. Either it is installed somewhere unusual or an export step is not reproducible. Resolve before automating Stage 5.
4. **The alignment-coverage floor.** `align.py` prints a coverage percentage; I recommended failing below ~90% but that number is invented. Calibrate it against Ep1–Ep4's actual figures before it blocks anything.
5. **Whether the gate battery would in fact have failed the Ep5 file.** **[INFERENCE]**, argued from the gate's own prompt text. It is testable in about ten minutes and should be the *first* thing anyone does — run `review-content.mjs` against `/Users/alisoneakin/.../operations/audio/episode-05-elevenlabs-v3-tagged.txt` and against `/Users/alisoneakin/.../content/episodes/episode-01.canon.md`. **The calibration pair in the brief is exactly the labelled data this needs: a gate that passes Ep1 and passes Ep5 is broken and must not be wired to anything.**
6. **Scheduling evidence for recurring AI-content production.** Still none. Playbook Open Question #21 stands unresolved as of 2026-07-22. The buffer argument in §6 rests on its own logic.

---

## Sources

External, all fetched 2026-07-22:

- Go — `go generate` / generated-code convention: https://pkg.go.dev/cmd/go#hdr-Generate_Go_files_by_processing_source
- GNU Make manual, *Special Targets* (`.DELETE_ON_ERROR`, `.PHONY`, `.PRECIOUS`): https://www.gnu.org/software/make/manual/html_node/Special-Targets.html
- Snakemake CLI (`--rerun-incomplete`, `--keep-incomplete`, `--rerun-triggers`): https://snakemake.readthedocs.io/en/stable/executing/cli.html
- DVC — `dvc.yaml` / `dvc.lock` structure and hash-based invalidation: https://doc.dvc.org/user-guide/project-structure/dvcyaml-files
- Luigi — Tasks, completion contract, atomic targets: https://luigi.readthedocs.io/en/stable/tasks.html
- Prefect — caching and cache keys: https://docs.prefect.io/v3/concepts/caching
- Dagster — asset versioning, code version / data version, "Unsynced": https://docs.dagster.io/guides/build/assets/asset-versioning-and-caching
- Task (go-task) — `sources`/`generates`, checksum vs timestamp, `.task` fingerprints: https://taskfile.dev/docs/guide
- `just` manual — "a command runner, not a build system": https://just.systems/man/en/
- GitHub Docs — *Events that trigger workflows*, `schedule` delay/drop and 60-day disable: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
- Claude Code — *Run Claude Code programmatically* (`-p`, `--bare`, `--output-format json`, `--json-schema`, `--allowedTools`, `--resume`, exit 143): https://code.claude.com/docs/en/headless
- Claude Code — *Orchestrate subagents at scale with dynamic workflows* (resume scope, no mid-run input, limits): https://code.claude.com/docs/en/workflows
- Claude Code — *Run prompts on a schedule* (`/loop`, cloud vs desktop vs session, jitter, 7-day expiry): https://code.claude.com/docs/en/scheduled-tasks
- Claude Code — *Schedule recurring tasks in Claude Code Desktop* (local file access, missed-run catch-up, permission stalls): https://code.claude.com/docs/en/desktop-scheduled-tasks
- Apple, *Scheduling Timed Jobs* (cron deprecated in favour of `launchd`; wake-and-run behaviour): https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/ScheduledJobs.html
- Reinertsen, *The Principles of Product Development Flow* — **secondary summary only**: https://www.se-trends.de/en/the-175-flow-principles-why-product-development-is-often-slower-than-necessary/

Local, read directly on 2026-07-22 (all under `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/`):
`Website-homepage/scripts/check-town.js` · `…/scripts/check-episode-cues.js` · `…/scripts/check-local-links.js` · `…/scripts/check-inline-js.js` · `…/scripts/build-episode-assets.js` · `…/scripts/run-weekly-production.js` · `…/scripts/run-weekly-production.ps1` · `…/scripts/start-weekly-workflow.ps1` · `…/scripts/update-hot-goss.py` · `…/operations/check-episode.sh` · `…/operations/hooks/episode-shipcheck.sh` · `…/operations/workflows/review-content.mjs` · `…/operations/tools/{README.md,transcribe.py,align.py,check-cues.py,beat-brief.py,build-art-batch.py,qc-frames.py,preview-server.js,shot.js}` · `…/operations/ops/{check_site.py,accept-new-art.py,state.json,agents.json,tasks.json}` · `…/operations/laidies-operating-model.md` · `…/operations/episode-canonical-source-spec.md` · `…/operations/weekly-cycle-map.md` · `…/.githooks/pre-commit` · `…/.github/workflows/{hot-goss-daily.yml,ai-model-freshness.yml}` · `…/.claude/settings.json` · `LAIDIES/.claude/settings.json` + `.claude/hooks/` · `…/content/episodes/{episode-01,04,05}.canon.md`, `issue-05.json` · `…/content/site/{content-registry.json,card-packs.json,charm-hunt.js}`
