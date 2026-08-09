# LAiDIES / SUNNYVAiLE operating-model review

**Reviewer:** independent external review (Claude Opus 5, 1M context)
**Review date:** 2026-08-07 (America/Vancouver)
**Packet:** `FABLE-5-LAIDIES-OPERATING-MODEL-2026-08-07-v3.zip`
**Packet integrity:** all 87 files verified against the supplied `MANIFEST.sha256` — zero mismatches
**Authority used:** none. No file in the packet was edited. Nothing was installed, authenticated, deployed, published, purchased or subscribed. No AWS, Cloudflare, GitHub or other account was accessed. No repository outside this folder was read.

---

## 0. Required comprehension restatement

Before any architecture, the product, in my own words.

**Who LAiDIES is for.** One specific woman: smart, busy, mid-to-senior in her working life, from the Rewind Era (1990–2010, "dial-up to downloads"). She is probably not technical. She is emphatically not deficient. She is not waiting for confidence coaching, and she has been badly served by everything else on offer — either written for people who want to build models, or so shallow it amounts to "AI is transformative," or a forty-hour course marketed at someone with no job and no life. She is already carrying more context, more logistics and more office housework than her peers. Her problem is not belief. It is physics: *you cannot add hours to a day that is already over-subscribed* (`sources/operations/voice/episodes/laidies-episode-01.md:33–37`).

**What change LAiDIES promises her.** Not a certificate, not a career pivot into engineering, not "AI literacy" as a credential. It promises that she can use AI effectively at work and at home; that she can see enough of the real machine — chips, compute, data centres, training, models, context, tools, products, outputs — to connect the dots; that she can tell what a claim is *actually about* when someone waves a demo, a headline or a billion-dollar forecast at her; and that she can take a real part in consequential decisions about work, markets and society instead of standing outside the room. She learns enough mechanism to explain the important part to somebody else. That is the payoff (`MISSION-PRODUCT-VOICE-BRIEF.md:7–9`).

**Why SUNNYVAiLE and the Rewind Era exist.** They are not a theme layered on a content library, and they are not a brand device to make training feel friendlier. They exist because memory works better with place and because this reader's cultural fluency is an asset, not a costume. SUNNYVAiLE is a town with seventeen buildings that do genuinely different jobs — teaching, reference, classes, editorial argument, tools, games, episodes, services, commerce — and the town makes the learning system navigable, memorable and worth exploring. The Rewind Era supplies the shared shorthand that lets a hard idea land in one sentence. The hard constraint: **practical value leads, and the world-building may never obscure the visitor's task** (`MISSION-PRODUCT-VOICE-BRIEF.md:19–22`). A first visit must offer one obvious useful start with no town lore, no account and no membership claim.

**What the LAiDIES voice sounds like.** Her smartest, funniest, most enthusiastic friend from the Rewind Era explaining something genuinely complex — over drinks, not over a lectern. Warm, specific, lightly irreverent, credible, Canadian English, useful before clever. Skeptical of beige work, fake polish and corporate nonsense. The teaching sequence is fixed: plain mechanism first, then connect the parts into a system, then an accurate analogy *only* if it makes the mechanism easier, then a concrete real-life example from her work or home, then what she can now understand, question, explain or do. The analogy is garnish; it decorates a clear idea and never carries it. A reference must do two jobs — be funny or familiar *and* make the concept easier — or it gets cut. Episode 1 is the benchmark: "Cher's closet computer worked because it did not just say 'wear clothes.' It had context." That is the register.

**Which decisions must remain Ali's.** Taste. Mission. Public identity and voice. Consequential product decisions. Spend and subscriptions. Deployment and publication. Final release authority. What must *stop* being hers: being the first real reader, the first visual inspector, the first person to click a broken interaction, and the person who reconciles contradictory status files. The system's job is to take preventable defect discovery and operational reconciliation off her desk — not to automate away the judgment that defines the product.

**The five efficiency failures I am specifically designing against:** template throughput; product flattening into a dashboard or funnel; false personalization (inventing accounts, sync or progress where only device-local continuity exists); receipt-driven quality (treating a validator, a stale PASS or a successful render as proof a reader-facing result is good); and founder substitution.

*Self-check against the brief's stop condition: this is not a generic AI education publisher, a content engine, a dashboard or a conversion funnel. If any recommendation below reads as one, it is wrong and should be rejected on that basis alone.*

---

## 1. Method, and how to read the evidence in this report

The brief requires that I separate three things. I label them throughout:

- **[SOURCE]** — a fact from a current primary or official external source, with the URL and the date I checked it (2026-08-07).
- **[REPO]** — a fact I verified inside the supplied packet, with the exact path and line.
- **[INFER]** — my reasoning or judgment.
- **[UNVERIFIED]** — something I could not establish from the packet and did not assume.

I did not treat any supplied Markdown claim as proof that a loop runs. Where the packet supplied executable code, **I ran it** against the supplied evidence in an isolated copy (read-only; nothing in the source packet was modified). That distinction produced most of the findings in §3.

**What the packet let me verify, and what it did not.** Tier B code is present and runnable. Tier C evidence is present, and — importantly — the exact bytes are internally inconsistent in ways I could measure. The dynamic records (`ACTIVE-WORK.md`, `engine/LEDGER.md`, `registry.json`, `run-queue.json`, `content-work-orders.json`, dashboard state, release state, account/provider evidence) are redacted by design. Four hook scripts referenced by `.codex/hooks.json` — `block-approval-forgery.py`, `enforce-voice-spec.py`, `episode-shipcheck.sh`, `library-maker-preflight.py` — are **not in the packet** and therefore **[UNVERIFIED]**; I do not know whether they can fail. Several `check-*.mjs` scripts referenced by contracts (`check-library-book-content-admission.mjs`, `check-design-review-admission.mjs`'s fixtures, `check-operational-integrity.mjs`, `check-ali-decision-routing.mjs`, `resolve-design-review-url.mjs`) are named but partly absent; where absent I say so rather than assuming.

---

## 2. Executive verdict — the five highest-leverage changes

The single most important finding is this: **LAiDIES does not have a standards problem, a diagnosis problem, or a rigour problem. It has a *connection* problem.** The written standards are unusually good. The enforcement code is unusually good — I ran it, it is genuinely calibrated, and it correctly rejects the exact artifact that reached Ali. The prior diagnostics (2026-08-02, 2026-08-04) identified most of the right causes. And the failure still happened on 2026-08-07, because *the good code was not on the path between the candidate and Ali's eyes.*

Every additional contract written since has made that gap harder to see, not smaller. The corrective is not more rigour. It is to put a very small amount of the existing rigour in the one place that cannot be walked around, and delete most of the rest.

### Change 1 — Make display, not release, the enforcement point. One resolver, one door.

**Nothing reader-facing may be opened, linked, attached or navigated to by Ali until a single resolver has re-hashed the exact bytes and confirmed a current, matching, complete admission chain.**

Today, `AUTONOMOUS-DELIVERY-RUNTIME.md:63–68` already says exactly this for *building visuals* and names `scripts/resolve-design-review-url.mjs`. It does not exist for **books, prose, or anything else**. The Library pilot was opened as a plain local HTML file produced by a build script (`sources/scripts/build-ai-fundamentals-book.mjs:118`) that writes a directly openable page and prints `AI FUNDAMENTALS BUILD PASS` (line 119) on the strength of *the title string matching and there being eight sections* (lines 68, 73). That is the whole gate on the display path.

Extend the resolver to every content class. One command, one exit code, and it re-computes hashes at call time rather than trusting a recorded field. This is roughly a day of work and it closes the exact hole that produced the incident.

### Change 2 — Delete the concept of a "review record" that validates in isolation.

`scripts/check-prose-quality-admission.mjs` validates **one receipt at a time**. It cannot see that the producer's receipt and the independent reviewer's receipt bind *different bytes of the same file*. The only code that performs that cross-check is `scripts/check-content-release-readiness.mjs:125–126`, and that runs only over items present in `content-work-orders.json` — a queue the Library pilot appears never to have entered **[INFER]**.

By contrast the *visual* checker already gets this right: `scripts/check-visual-media-admission.mjs:59–60` requires that the independent review bind the same artifact and contract as the producer self-review, **and** that the producer's timestamp precede the independent reviewer's. The prose checker has neither rule. Port those two lines. That asymmetry, alone, is why a 12:00 "independent" PASS could sit on disk beside a 17:40 producer PASS for a different candidate ID and different bytes, and nothing objected.

### Change 3 — Make the reviewer structurally different from the maker, not just differently named.

`.codex/agents/maker.toml` and `.codex/agents/independent_judge.toml` both specify `model = "gpt-5.6-sol"` and `model_reasoning_effort = "medium"` [REPO]. The "independent" judge is the same model at the same effort, reading its sibling's output, in the same repository, primed by the same 44 KB decision router. Its independence is an assertion in a JSON field (`"independentFromMaker": true`).

This is why the independent semantic reviewer recorded `laidiesVoice: PASS` on prose Ali rejected the same day for generic learning-module voice. The gate did not fail to run. It ran, and it agreed with the maker, because it *was* the maker in a different hat.

Independence must be purchased with something real: a **different model family** for the voice/teaching judge (the packet's own service inventory lists both OpenAI/Codex and Claude Code as available — `sources/operations/control-room/LAIDIES-OPERATING-SYSTEM-AUTHORITY.md:277`), and a judge context that contains the artifact, Episode 1, and the writing lock — *and nothing else*. No producer receipt. No brief-language to pattern-match against.

### Change 4 — Cut automatic context by roughly 90%, and pay for it with retrieval.

`.codex/hooks/session_start.py` injects **the entire 44,186-byte `DECISIONS.md`** plus the entire `LESSONS-ACTIVE.md` into every session, on every startup, resume and compact [REPO]. `hooks.json` caps that injection at `additionalContextLimit: 3000`. Either the cap silently truncates the router that exists to stop Ali repeating herself — dropping most of it — or it does not apply and every agent burns ~11k tokens before reading its task. Both outcomes are bad; I cannot determine which from the packet **[UNVERIFIED]**.

`CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md` then instructs every agent to "load the whole binding files" for each owned concern — a dozen further large documents. Anthropic's current published guidance is that the target is "the smallest possible set of high-signal tokens," and that recall measurably degrades as context grows — *context rot* — across all models regardless of window size [SOURCE].

Replace the dump with a ~1,500-token **Standing Card** (§6) plus a `decisions` lookup tool. Ali stops repeating herself because the router is *searched*, not because it is *pasted*.

### Change 5 — Stop letting simulated evidence occupy the slot reserved for real evidence.

`CONTENT-QUALITY-ADMISSION-GATE.md:173–174` is explicit: *"A textual simulation of an unfamiliar reader is not observed learner evidence and may not produce `ADMISSION_CANDIDATE`."*

The supplied independent review does exactly that. Its `explainBack` outcome reads: *"**I can explain** that fundamentals matter because…"* and its `observedResponse` is first-person prose written by the reviewing agent. The checker cannot tell the difference — it verifies only that an `observationBinding` file exists and hashes correctly. The rule is real; it is unenforceable by construction.

Two honest options, and LAiDIES must pick one: either (a) three named humans who are not Ali read the pilot chapter and their verbatim answers are pasted in — the cheapest version is two friends and a colleague, once per substantial book, not per artifact; or (b) the field is renamed `simulatedReaderProbe`, downgraded to a *producer* tool, and **cannot appear in an admission verdict at all**. Option (b) is free and honest. Option (a) is better and costs about ninety minutes per book. Do (b) now and (a) for the four opening books.

---

## 3. Failure explanation — the AI Fundamentals false pass

This is the most valuable artifact in the packet, because the exact bytes are still on disk and the failure is *measurable* rather than narrated.

### 3.1 What I measured

The supplied prose file is `sources/content/library-books/pilots/ai-fundamentals-101-v2/review-text.md`. Its actual SHA-256, confirmed against the packet's own `MANIFEST.sha256:23`, is:

```
b53cc56894f389beab91674ff0f00a617b161ec404ad1c0a7f972d8c2140352c
```

Four records in that same directory claim to be bound to that path. **They name four different byte-identities, and none of them is the file that exists.**

| Record | Path claimed | SHA-256 it binds | Verdict recorded | Timestamp |
|---|---|---|---|---|
| **the file itself** | `review-text.md` | `b53cc568…352c` | — | — |
| `artifact-manifest.json:8` | `review-text.md` | `71e6d5e5…bf47` | — | — |
| `producer-self-review-full.json` | `review-text.md` | `71e6d5e5…bf47` | **PASS** | 2026-08-07 **17:40** PDT |
| `independent-semantic-review-v2.json` | `review-text.md` | `2f592ae4…221a` | **PASS** | 2026-08-07 **12:00** PDT |
| `visuals/producer-self-review.json:24` | `review-text.md` | `39f263ce…d171` | **PASS** | 2026-08-07 12:47 PDT |

Three simultaneous PASS records, on three different versions of one file, none of them the version on disk.

Note the timestamps. The "independent semantic admission" is dated **five hours and forty minutes before** the producer self-review it is supposed to follow. `AGENTS.md:172–174` states the required order plainly: *"Only after that producer pass does an independent reviewer inspect the same checksum-bound prose."* The order is inverted, and the candidate IDs differ too — the producer reviewed `LIB-AI-FUNDAMENTALS-101-V2-FULL-DRAFT`; the independent reviewer reviewed `LIB-AI-FUNDAMENTALS-101-V2-PILOT`, and scoped its verdict to *"only the exact Introduction + Chapter 1 prose"* while the manifest binds a 9,116-word, eight-section whole book.

### 3.2 The controls that should have stopped it — and precisely why each did not

**Control A — `scripts/check-prose-quality-admission.mjs`. Would have caught it. Was not run on the display path.**

I ran it against both supplied receipts. Both fail, first error first:

```
$ node scripts/check-prose-quality-admission.mjs .../producer-self-review-full.json
PROSE QUALITY RECEIPT FAIL
- artifact.reviewText: SHA-256 mismatch expected=71e6d5e5…bf47 actual=b53cc568…352c

$ node scripts/check-prose-quality-admission.mjs .../independent-semantic-review-v2.json
PROSE QUALITY RECEIPT FAIL
- artifact.reviewText: SHA-256 mismatch expected=2f592ae4…221a actual=b53cc568…352c
- artifact.manifest: SHA-256 mismatch expected=6c9324f7…6b03 actual=fabb6faf…ecd0
- artifact manifest candidateId mismatch
- artifact manifest is not bound to the reviewed prose
```

And its calibration suite is real, not decorative:

```
$ node scripts/test-prose-quality-admission.mjs
PROSE QUALITY CALIBRATION PASS valid=2 hold=1 rejected=16 exact_known_bad=1 …
```

Sixteen negative fixtures. This gate has quality authority by LAiDIES' own standard (`AGENTS.md:123–137`, "a gate that cannot fail is not a gate"). **The gate was not broken. It was not invoked.** `package.json:24` runs its *calibration test* in `ci:build`; it never runs the checker against a live candidate. Nothing in the build or display path calls it.

**Control B — cross-stage identity matching. Exists, but only inside a queue the pilot never entered.**

`scripts/check-content-release-readiness.mjs:125–126` emits `semanticAdmission:PRODUCER_REVIEW_TEXT_MISMATCH` for exactly this condition. But it iterates `content-work-orders.json`. A candidate that is not a work order is invisible to it, and the checker exits `PASS` over an empty or non-matching queue. `ci:build` invokes it with no `--require-ready` threshold, so zero ready items is a green build. The pilot lived at `content/library-books/pilots/…` — a directory outside the work-order lifecycle **[INFER; the work-order file is redacted]**.

**Control C — the build script. Actively manufactured the false signal.**

`sources/scripts/build-ai-fundamentals-book.mjs`:
- line 66 reads `review-text.md` with **no hash check against the manifest**;
- lines 111–113 **overwrite** `book-source.json` and `rendered-review.html` — the very bytes prior reviews bound — leaving the stale receipts in place beside them;
- line 118 writes a directly openable `review.html`;
- line 119 prints `AI FUNDAMENTALS BUILD PASS`.

The only guards are line 68 (title string) and line 73 (section count). This is precisely the failure `AGENTS.md:128–134` names: *"Integrity receipts are not reviews… Never label mechanical verification as review, approval, or PASS on quality."* The build script violates the repository's own most-cited rule, in its own log line.

Worse, the honesty banner is a **hardcoded string literal** at line 117: `LOCAL REWRITE IN PROGRESS · PRIOR REVIEWS INVALIDATED · NOT ADMITTED · NOT PUBLISHED`. Today it happens to be true. It is true because a human remembered to edit it. It is not derived from any state, so it will be wrong the first time someone forgets — and a page that *says* it is unreviewed is exactly the mechanism by which an unreviewed page gets shown.

**Control D — the visual manifest. Genuinely did not cover what the reader could see.**

The prose displays fifteen image paths. The reviewed visual manifest binds fourteen. They are not the same fourteen:

| Displayed in the prose but **not** in the reviewed manifest | Bound in the manifest but **never displayed** |
|---|---|
| `visuals/08-tokenization-to-model.svg` | `visuals/01-whole-system-map.svg` |
| `visuals/openai-tokenizer-official-bytes-2026-08-07.png` | `visuals/01-whole-system-map-mobile.svg` |
| `visuals/openai-tokenizer-official-token-ids-2026-08-07.png` | |

The two PNGs are the screenshots. They are reader-visible at `review-text.md:191–199`, and no visual review covered them. This is the exact wording of the system map's finding — *"new reader-visible visuals were outside the reviewed visual manifest"* — now pinned to specific files.

And the visual producer self-review compounds it. Its bound artifact is **`visuals/visual-contact-sheet-1400.png`** — a contact sheet — while asserting `"viewedAtIntendedSize": true` and `renderedSizeLegibility: PASS`. `AGENTS.md:265` says flatly: *"a prompt, filename, cue label, checksum, contact-sheet presence or self-authored `PASS` cannot prove what the pixels show."* The reviewer reviewed a thumbnail grid of the seven figures it *had*, declared legibility at intended size, and never saw the two screenshots the reader would actually meet. That is how "blurry screenshots" reached Ali through a passing visual gate.

**Control E — the failure-family list. Structurally could not contain the defect Ali found.**

This is the deepest one, and it explains the *voice* rejection specifically.

`check-prose-quality-admission.mjs:25–29` hardcodes twelve failure families. The loop at lines 139–144 forbids PASS if any of those twelve is present. The registered known-bad exemplar `CQX-BAD-002` — the rejected job-offer-led pilot — declares four families:

```
purposeTooNarrow · mechanismBeforeMotivation · workedExampleOvertakesBookPurpose · technicalExplainerVoice
```

**None of the four is in the checker's list.** The checker requires the reviewer to *identify* them when calibrating against the exemplar (line 107), then never asks whether the candidate has them.

The independent reviewer noticed the gap and voluntarily added a `registeredNegativeFamilyAssessment` block asserting `"technicalExplainerVoice": false`. I grepped the entire supplied `scripts/` and `operations/` trees: **the string `registeredNegativeFamilyAssessment` appears nowhere in any code or contract.** It is decorative JSON. The producer's receipt omits the block entirely and passes anyway.

So: Ali rejected the artifact on 2026-08-07 for prose that *"used generic learning-module transitions and abstract benefit claims rather than the locked smartest-friend LAiDIES voice"* (`handoff-library-ai-fundamentals-v2-voice-false-pass-2026-08-07.md:12–14`). That is `technicalExplainerVoice`, a registered known-bad family. **No code path in the system was capable of blocking a PASS for it.** The learning loop had learned the defect, recorded it, and then filed it somewhere the enforcement could not reach.

### 3.3 The causal account, in one paragraph

A learning ratchet recorded a real defect family in the exemplar registry but not in the checker's enforced list, so the defect became unenforceable the moment it was learned. A producer and a same-model "independent" reviewer each wrote a PASS against different snapshots of a moving file, in the wrong order, at different scopes, with no code comparing them because the candidate was outside the only queue that performs that comparison. A build script then rewrote the reviewed bytes, printed `BUILD PASS`, and emitted a directly openable page whose honesty banner was a hand-maintained string. Reader-visible screenshots were added after the visual manifest closed, and the visual reviewer inspected a contact sheet instead of the reader's page. Every one of these steps was individually forbidden by a document in this packet. **Not one of them was forbidden by anything that runs.** The result is the failure the brief calls non-negotiable: Ali was the first real reader.

### 3.4 The two-line summary Ali should keep

> The gates were correct and calibrated. They were not on the road. And the one defect she personally rejected for was, by construction, the one defect the gate could not name.

---

## 4. Lean target architecture

### 4.1 Systems of record — one authority per fact, no mirrors

The current model's costliest structural flaw is that most facts live in two or three places (Canon Index *and* DECISIONS *and* per-area docs; dossier *and* state.json *and* dashboard-state.json). Assign each fact exactly one home.

| Fact class | Single system of record | Everything else is |
|---|---|---|
| **Authority / settled decisions** | `operations/DECISIONS.md` — router only, one line per decision, pointing at the owning file | Canon Index becomes names-and-retired-names only |
| **Voice & teaching standard** | `voice/laidies-writing-lock.md` + Episode 1 as the bound exemplar | quoted, never restated |
| **Product state** | one `state.json` per product | dossier prose is *intent*, not state |
| **Work state** | one append-only `events.jsonl` | every dashboard, board and index is a **projection**, regenerated, never edited |
| **Artifacts** | content-addressed store keyed by SHA-256 | paths are labels, hashes are identity |
| **Reviews** | receipts keyed by `(artifact_sha, stage, reviewer_principal)` | a receipt for a different SHA is not stale — it is *a different object* |
| **Reusable learning** | `content-quality-exemplars.json` + **the enforced family list, which must be generated from it** | painpoints log is narrative history |

The one rule that makes this work: **status is never written, only derived.** `RUNNING`, `READY`, `BLOCKED` are computed from the event log at read time. A handwritten `RUNNING` becomes impossible rather than merely forbidden. This directly retires the recurring failure in `OPERATING-MODEL-DIAGNOSTIC-2026-08-02.md:65–68` (2026-07-26 tasks still described as live on 2026-08-02).

### 4.2 The architecture

```
                    ┌──────────────────────────────────────────┐
                    │  ALI                                     │
                    │  taste · mission · public identity ·     │
                    │  spend · release                         │
                    └───────────────▲──────────────────────────┘
                                    │  ONE decision at a time
                                    │  (complete packet, or it doesn't arrive)
                    ┌───────────────┴──────────────────────────┐
                    │  ▓▓  THE DOOR  ▓▓                        │
                    │  resolve-review-url <path>               │
                    │  re-hashes NOW · checks chain · fail-closed│
                    └───────────────▲──────────────────────────┘
                                    │
   ┌────────────────────────────────┴─────────────────────────────────┐
   │                        ONE FOREGROUND AGENT                       │
   │        (owner · maker · integrator — modes, not agents)           │
   │   reads: Standing Card (~1.5k tok) + task packet + the artifact   │
   └───┬───────────────┬────────────────┬─────────────────┬────────────┘
       │               │                │                 │
       │ spawns only when independence or parallelism is REAL           │
       ▼               ▼                ▼                 ▼
 ┌──────────┐  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐
 │ RESEARCH │  │ VOICE/TEACH  │  │   VISUAL    │  │   RELEASE    │
 │ read-only│  │    JUDGE     │  │    JUDGE    │  │   VERIFIER   │
 │          │  │ DIFFERENT    │  │ sees pixels │  │  read-only   │
 │          │  │ MODEL FAMILY │  │ at real size│  │              │
 └──────────┘  └──────────────┘  └─────────────┘  └──────────────┘
       │               │                │                 │
       └───────────────┴────────┬───────┴─────────────────┘
                                ▼
              ┌─────────────────────────────────────┐
              │  events.jsonl   (append-only)       │
              │  artifacts/     (SHA-addressed)     │
              │  receipts/      (keyed by SHA)      │
              └──────────────┬──────────────────────┘
                             │ derived, never edited
              ┌──────────────▼──────────────────────┐
              │  Control Room  (generated projection)│
              │  Needs Ali · Moving · Stuck · Shipped│
              └─────────────────────────────────────┘
```

Four durable subagent roles, down from the current owner/maker/researcher/judge/verifier plus 30 guild roles plus 67 champions. The 67-product responsibility graph stays as *ownership metadata on work items* — it is genuinely useful for routing and collision avoidance — but it stops being 67 things that must each have a dossier, a state file, an entry preflight and an owner-entry PASS before anything can move.

### 4.3 The state machine

```
   CAPTURED
      │  (admission: real visitor problem + smallest complete change + non-goals)
      ▼
   SPECIFIED ──────────────────────────────► DECLINED (no visitor delta)
      │
      ▼
   PILOT ◄──────────┐         smallest representative artifact in the REAL destination
      │             │
      │ fails       │ ≤1 repair
      └─────────────┘
      │ passes
      ▼
   BUILDING ◄───────────────┐
      │                     │ INTERNAL_REPAIR (maker-owned, invisible to Ali)
      ▼                     │
   MAKER_EVIDENCE ──────────┘   maker read/viewed the real continuous artifact
      │
      ▼
   JUDGED          independent, different model family, artifact-first
      │
      ├── HOLD ──► INTERNAL_REPAIR   ── 2nd same failure ──► STOP_LOSS
      │                                                        (fix the producer,
      ▼                                                         the brief, or the
   DECISION_READY   ← THE DOOR re-hashes here. Fails closed.     fixture — not the
      │                                                          artifact again)
      ▼
   ALI            only if the remaining question is genuinely hers
      │
      ├── reject ──► STOP_LOSS  (evaluator changed, not just the candidate)
      ▼
   RELEASE_BOUND ──► DEPLOYED ──► VERIFIED_PUBLICLY
```

**Invariants, enforced in code, not prose:**

1. Any transition into `ALI` re-computes every bound hash at that instant. A single mismatch demotes to `INTERNAL_REPAIR`. No exceptions, no override flag.
2. A receipt is keyed by artifact SHA. When bytes change, receipts do not become "stale" — they cease to apply, automatically, because the key no longer matches. This is the mechanism that makes "a review bound to old bytes must become unusable automatically" (brief, decision rules) true by construction rather than by discipline.
3. `JUDGED` requires `judge.model_family ≠ maker.model_family` and `producer.reviewed_at < judge.reviewed_at`.
4. Second identical failure exits the loop to `STOP_LOSS`. `STOP_LOSS` may not be resolved by producing another candidate — only by changing the producer instruction, the brief, or the fixture set.
5. An Ali rejection auto-writes a fixture from the exact rejected bytes **and adds its failure family to the enforced list**, then blind-tests the judge on it. Until the judge rejects it unaided, that content class cannot enter `DECISION_READY`.

Invariant 5 is the one that would have prevented the second incident from resembling the first.

---

## 5. Role design

### 5.1 Minimum durable roles: one plus four

**Durable (persist across tasks, have their own context):**

| Role | Why it must be durable | Model / effort | Write scope |
|---|---|---|---|
| **Foreground agent** | Holds continuity, sequencing, integration and the conversation with Ali. Splitting this is what created the reconciliation tax. | configured foreground (Sol/Medium), High for architecture | full, one lane at a time |
| **Independent judge** | Independence is only real if the context and the model differ | **different family**, medium–high | none (read-only) |
| **Research lane** | Genuinely parallel, genuinely read-only, genuinely cheap | cheapest capable (Terra/Low–Medium) | none |
| **Release verifier** | Must not be able to create what it verifies | cheap (Terra/Medium) | none |

**Temporary modes of the foreground agent — not agents:**

Owner, maker, integrator, planner, editor, art-director, curator, archivist. Each is a *stance* the foreground takes, announced in one word, with a different reading list. The current model turns each of these into a durable identity with a contract, a dossier and an entry preflight; that is where most of the coordination cost lives.

**Delete as durable roles:** building champion, subproduct champion, creative experience designer, craft specialist, Control Room as an agent, and the 30-role guild. Keep them as *labels on work* for routing and collision detection. `AUTONOMOUS-DELIVERY-RUNTIME.md:9–18` describes seven agent types plus Ali; `LAIDIES-OPERATING-SYSTEM-AUTHORITY.md:100–110` already concluded the answer is five reusable roles. I am going further to four, because "evidence support" and "researcher" are the same read-only lane, and because the owner and maker are the same person in a one-founder shop and pretending otherwise costs a handoff.

### 5.2 When a subagent earns its cost — and when it does not

[SOURCE] Anthropic's published measurements: multi-agent systems consume **~15× the tokens of a chat interaction** (single agents ~4×), token usage alone explains ~80% of performance variance, and multi-agent architectures **underperform on tasks requiring shared context or tight coordination — explicitly including most coding work**. They win on breadth-first parallel search where information exceeds one context window.

Applied to LAiDIES:

**Spawn a subagent when:**
- **independence is the product** — a voice or visual judge must not have seen the maker's reasoning. This is the single strongest case in this system and it is currently the weakest implementation.
- **breadth-first search** — "find every surface that references the retired Grimoire architecture," "inventory every image referenced by any building page." Read-only, parallel, results-are-a-list.
- **the freshness sweep** — checking many independent sources.

**Do not spawn when:**
- building or editing one page, one book, one episode — that is shared-context coding work, the documented anti-pattern.
- the "parallelism" writes to the same tree. `AGENTS.md:71–79` already restricts subagents to read lanes for exactly this reason; honour it strictly rather than negotiating exceptions.
- the reconciliation cost exceeds the work. `AGENTS.md:93–97` requires the foreground to re-check every lane against the original brief and the real artifact. For a lane that saves ten minutes, that merge costs more than it saved.

**Practical cap:** at most **two** concurrent lanes for a one-founder operation, not six (`config.toml`: `max_concurrent_threads_per_session = 6`) and not three (`AUTONOMOUS-DELIVERY-RUNTIME.md:42`). Six lanes on one dirty worktree, with one human to reconcile them, is a coordination-cost generator. Two is enough to hide latency and few enough to hold in one head.

### 5.3 Escalation to Ali — the four gates

Something reaches Ali only if it passes all four:

1. **The question is genuinely hers** — taste, mission, public identity, spend, release. Not "which of these is correct," not "please confirm," not "here are three options I could rank myself."
2. **Everything objective is green, verified at this instant** — the Door re-hashed and passed.
3. **The packet is complete** — one plain-language question, a recommendation with reasons, materially distinct options with consequences, the real artifact at desktop and mobile, and what happens after each ruling. `DASHBOARD-CONTRACT.md:158–173` already specifies this well; keep it verbatim.
4. **It is the only thing in front of her.** One decision. Others queue.

And the standing prohibition, restated as a test rather than a value: **if Ali finds an objective defect, the evaluator has failed and must change before the candidate does.** `DECISIONS.md:153` already says this. Invariant 5 in §4.3 makes it mechanical.

---

## 6. Context architecture

### 6.1 The Standing Card — automatic, ~1,500 tokens, every agent, every time

Replace the whole-file injection with a generated card. It contains only what is true for *every* task:

```
LAiDIES — STANDING CARD                      generated <date> from DECISIONS.md
─────────────────────────────────────────────────────────────────────────────
READER    Smart, busy, nontechnical-but-not-naive woman, Rewind Era (1990–2010).
          Not deficient. Not in training. Already drowning.
PROMISE   Enough real mechanism to use AI well, read a claim, and take part in
          decisions about work and society. Practical value leads.
VOICE     Smartest funniest friend from the Rewind Era explaining something hard.
          Canadian English. Useful before clever. Analogy is garnish, never load-
          bearing. Reference must teach AND land, or cut it.
WORLD     SUNNYVAiLE: 17 buildings, different jobs, one town. World-building makes
          learning memorable; it never obscures the task.
ALI OWNS  taste · mission · public identity · spend · deploy · publish
─────────────────────────────────────────────────────────────────────────────
TIER      1 visitor-facing → full gates · 2 internal → do it, verify, report ·
          3 mechanical → just do it. Say the tier in one word before starting.
STOP      2nd identical failure → fix the producer, not the artifact.
NEVER     self-approve · call a render a review · show Ali an unresolved artifact ·
          treat local as public · restate a settled decision without searching
─────────────────────────────────────────────────────────────────────────────
LOOK UP   decisions <query>  ·  canon <name>  ·  exemplar <id>  ·  lessons <topic>
          The router is 44 KB. Search it. Do not ask Ali what it already answers.
```

That is the whole automatic load. Everything else is retrieved.

### 6.2 Three tiers of context

**Always (≈1.5k tokens):** the Standing Card, the task packet, the artifact under work.

**On demand (via tools, never pre-loaded):**
- `decisions <query>` — grep + return matching rows *with their source pointers*. This is the single highest-value change to the whole context architecture: it converts a 44 KB paste into a 200-token answer, and it makes the anti-repeat rule work *better*, because search finds superseded rows that a truncated paste would have dropped.
- `canon <name>`, `exemplar <id>`, `lessons <topic>`, `product <id>`.

**Never, unless the task is specifically about it:** other products' dossiers; the painpoints archive; historical handoffs; Tier D material; any dashboard; any generated projection. `product_owner.toml` already says "load only the claimed product dossier" — extend that discipline to everything.

### 6.3 Artifact handoff format

Every handoff — foreground→judge, judge→foreground, foreground→Ali — uses one shape. Small, complete, no prose padding:

```yaml
task:      WRK-20260807-ai-fundamentals-ch2
outcome:   one sentence: what a reader can do that she could not before
artifact:  {path, sha256}          # identity is the hash, not the path
brief:     {path, sha256}          # what it was supposed to be
inputs:    [{path, sha256}]        # admitted only; retired/rejected excluded
forbidden: [exact paths/ideas that must not appear]
accept:    [testable conditions]
run:       [commands that prove compliance]
return:    PASS | HOLD(locator, observation, evidence) | BLOCKED(dep, owner)
budget:    {in: 40k, out: 8k, wall: 25m}
```

Judge briefs additionally get `forbidden: [producer receipts, maker rationale, prior verdicts]` — the judge must reach the artifact first, and *only* the artifact. This is the operational meaning of "artifactFirst" that a boolean field cannot supply.

### 6.4 Compaction

Compact on **artifact boundaries**, not token thresholds. When a chapter, page or episode closes, write a ≤300-token close-out (what exists, its hash, what remains, exact next action) and drop the working detail. The close-out plus the artifact hash is sufficient to resume; the transcript is not. This implements `CODEX-WORKING-AGREEMENT.md:170–187` ("re-entry check") without requiring the agent to re-read six large files, because the durable facts are in the events log and the artifact store.

### 6.5 Token budgets by task class

Budgets are guardrails, not quotas. Exceeding one is a *signal to stop and re-scope*, not a failure — and never a reason to skip verification.

| Task class | Input | Output | Wall | Escalate when |
|---|---|---|---|---|
| Mechanical (rename, path fix, transform) | 10k | 3k | 10m | anything ambiguous |
| Bounded read / inventory / search | 30k | 5k | 15m | scope proves larger than stated |
| Research with sources | 60k | 10k | 30m | sources conflict on a material claim |
| Page or component build | 60k | 15k | 45m | 2nd failed local verify |
| Substantial prose (chapter) | 50k | 12k | 60m | voice fails self-read twice |
| Visual generation + real-size inspection | 40k | 8k | 40m | 2nd visible defect in one set |
| Independent judgment | 30k | 6k | 20m | never — a judge that needs more context is judging the wrong thing |
| Architecture / debugging | 120k | 20k | 90m | state the reason before starting |

Deliberately: **the judge has the smallest budget.** A judge with a large budget is reading the maker's reasoning. The artifact, the exemplar and the standard fit comfortably in 30k.

---

## 7. Model-routing table

Using LAiDIES' configured names (`.codex/config.toml`: `gpt-5.6-sol` foreground, `gpt-5.6-terra` subagents; the `AGENTS.md:328–358` policy names Luna/Terra/Sol). LAiDIES' own rule holds: **start at the lowest effort that works and escalate only on evidence; effort levels do not map across model generations.**

| Task type | Lowest adequate | Escalate to | Trigger | Tools allowed | Artifact | Verification |
|---|---|---|---|---|---|---|
| Rename / path fix / data transform | **Luna / Low** | Terra/Low | ambiguity in >5% of cases | fs, grep | diff | test suite green |
| Inventory / search / link audit | **Terra / Low** | Terra/Med | structure varies | fs, grep, browser-read | list + paths | spot-check 3 rows |
| Freshness sweep of known sources | **Terra / Low** | Terra/Med | source conflict | web read-only | dated claim list | 2 independent confirmations |
| Research on a changing claim | **Terra / Med** | Sol/Med | primary source ambiguous | web, fs read | claim→source excerpt map | every claim excerpt-to-excerpt |
| Page / component implementation | **Sol / Med** | Sol/High | 2nd failed verify | full | commit + captures | real 1440/390/320, keyboard, failure states |
| Substantial teaching prose | **Sol / Med** | Sol/High | mechanism resists plain English | fs, web (sources) | prose + claim map | producer self-read → cross-family judge |
| Creative / editorial development | **Sol / Med** | Sol/High | voice fails self-read twice | fs | draft | Episode 1 side-by-side |
| Deterministic visual (SVG diagram) | **Terra / Med** | Sol/Med | teaching job unclear | fs, generator | SVG + manifest | rendered at real size in the reader |
| Generated art / animation | **Sol / Med** | Sol/High | identity/likeness involved | image gen, fs | asset + producer contract | pixels at intended size; then role-distinct judge |
| Factual review | **Terra / Med** | Sol/Med | claim is consequential | web, fs read | claim→source map | source excerpt must contain the claim |
| **Voice / teaching judgment** | **different family / Med** | different family / High | conflicts with maker | fs read-only | PASS/HOLD + locator | blind known-bad rejection first |
| **Visual judgment** | **different family / Med** | different family / High | regression suspected | fs read, image view | PASS/HOLD + pixel locator | same-viewport incumbent comparison |
| Architecture / reconciliation | **Sol / High** | XHigh (stated reason) | contradiction across ≥3 sources | full | decision record | independent re-derivation |
| Release verification | **Terra / Med** | — | — | read-only, web | URL+commit+SHA receipt | public bytes fetched, not inferred |

Two changes from the current policy:

1. **The judge tier is defined by *family*, not effort.** "Sol/Medium reviews Sol/Medium" is the current configuration and it is the mechanism of Change 3. A cheaper model from a different family is a better judge than an identical model at higher effort, because the failure mode being guarded against is *correlated blindness*, not insufficient capability.
2. **Fast mode stays off** (already policy) — and I'd add: fast mode is never appropriate for judgment, at any price.

---

## 8. Website recovery plan

Dependency-ordered. Aggressive WIP limits. Everything here assumes the site is finished by *finishing one vertical journey at a time*, not by advancing seventeen buildings in parallel.

**Global WIP limits for the whole recovery period:**
- **1** building in active build
- **1** book/content artifact in active production
- **2** read-only research lanes maximum
- **1** decision in front of Ali at a time
- **0** new operating-model documents unless one is deleted

### Days 1–7 — Close the door (this is the whole first week)

| # | Work | Done when |
|---|---|---|
| 1 | Extend `resolve-design-review-url.mjs` into `resolve-review-url` covering **prose, books, pages, visuals, media** | opening any candidate without it is impossible; a stale-hash fixture is rejected |
| 2 | Port `check-visual-media-admission.mjs:59–60` (same-artifact + ordering) into `check-prose-quality-admission.mjs` | the two supplied AI Fundamentals receipts fail for *ordering and cross-binding*, not only hash drift |
| 3 | **Generate** the enforced failure-family list from `content-quality-exemplars.json` | `technicalExplainerVoice` blocks a PASS; a new registered family becomes enforced automatically |
| 4 | Delete the hardcoded banner in `build-ai-fundamentals-book.mjs:117`; derive it from admission state; rename `BUILD PASS` → `BUILD RENDERED (integrity only, no quality authority)` | the script cannot emit a quality-shaped word |
| 5 | Rename simulated reader evidence to `simulatedReaderProbe`; forbid it in admission verdicts | the supplied independent review can no longer be an admission record |
| 6 | Judge profile → different model family, judge context stripped of maker artefacts | judge brief contains artifact + Episode 1 + writing lock, nothing else |

**Stop-doing during week 1:** no new content, no new building work, no new contracts. One week. This is the highest-return week available and it is cheap.

### Days 8–30 — One book, end to end, as the proof

| # | Work | Done when |
|---|---|---|
| 7 | Finish **AI Fundamentals 101** chapter by chapter through the closed door | each chapter: producer self-read → cross-family judge → hash-matched at the Door |
| 8 | Three real humans (not Ali) read the finished book; verbatim explain-back and transfer answers recorded | `observedReaderEvidence` contains words a person actually said |
| 9 | Ali reviews **once**, at the end, on the real rendered book at desktop and mobile | one decision, complete packet |
| 10 | Publish it and verify publicly | exact URL + commit + SHA in one receipt |

This is the pilot-before-batch rule applied to the operating model itself. One book through the whole chain proves the chain. If it does not survive contact, fix the chain, not the book.

### Days 31–60 — The critical path to a visitable town

| # | Work | Order rationale |
|---|---|---|
| 11 | **Resolve the sitewide style championship** — Ali rules A / B / C | 17 cycles, `CURRENT DECISION RESULT NONE` (`DECISIONS.md:112`). **Every building page is blocked behind this.** It is the single largest unblocker in the portfolio and it is a founder decision, not a build task. Present three complete comparable candidates and ask once. |
| 12 | Homepage → Visitor's Centre → Episode 01 → LIBRAiRY: **one continuous journey**, finished | first-visit promise is the launch-critical path; a visitor who cannot start cannot be helped by the other thirteen buildings |
| 13 | Remaining three opening books through the same chain | the chain is now proven; this is throughput, not invention |
| 14 | Honest states everywhere else | every unfinished building shows a truthful status label from the approved set, not a dead button |

### Days 61–90 — Widen, then open

| # | Work |
|---|---|
| 15 | NewsStand Daily/Weekly running on a real cadence with the correction route live |
| 16 | Remaining buildings in dependency order, one at a time, propagating the *locked* pattern only |
| 17 | Rollback drill: deliberately deploy and roll back, timed. `I6` in the 2026-08-04 reconciliation is still OPEN and untested |
| 18 | Public opening |

### Completion evidence for every item

Exact commit + deployed URL + SHA + a public fetch that returned the expected bytes, in one receipt. `VERIFIED LOCALLY ≠ DEPLOYED ≠ VERIFIED PUBLICLY` — already correct in the working agreement; just never relax it.

### Stop-doing list (immediate, permanent)

| Stop | Because |
|---|---|
| Writing new operating-model contracts | there are ~30 in this packet alone; the gap was never a missing rule |
| Owner-entry preflights for 67 products | 37 of 67 blocked on dossier paperwork (`OPERATING-MODEL-DIAGNOSTIC:69–71`) that no visitor benefits from |
| Provenance-tagging every line of every dossier | `town-entry-homepage/EXPERIENCE-BRIEF.md` tags ~90 bullets with `LOCKED LEDGER` / `INFERENCE` / `APPROVED BRIEF`; the tag is longer than the fact |
| Multi-role review of ordinary pages | `DECISIONS.md:159` already ruled this out for Library pages — generalise it |
| Restarting the paused dispatcher | it is correctly paused; a one-founder shop does not need unattended queue-pulling before launch |
| Maintaining any handwritten status | derive it or delete it |
| Six concurrent threads | two |

---

## 9. Steady-state content engine

The loops below assume the Door exists. They are deliberately small.

### Daily (≤45 min of agent time; 0–1 Ali decisions)

```
freshness sweep (Terra/Low, read-only)
   → dated claim list → contradiction scan against published evergreen content
   → NewsStand Daily assembled from source-ready columns; unavailable columns
     show their governed empty state (never filler)  [DECISIONS.md:85]
   → objective checks → cross-family editorial judge → Door
   → publish, or hold with the reason
```
Ali sees the Daily only if a public-voice or consequential-claim question arises.

### Weekly (per episode)

```
Mon  angle + fact-sheet from primary sources (claims mapped excerpt-to-excerpt)
Tue  draft against Episode 1; producer self-read; repair inside production
Wed  cross-family voice judge → Door → ALI (one review, complete packet)
     → produce (audio, visuals, quiz, cards) from the APPROVED text only
Thu  cross-surface propagation; link/index/correction consumers updated
Fri  deploy → public verification → measure → one learning entry or "none"
```

The ordering matters: **nothing derivative is produced before Ali approves the text.** The current model repeatedly builds downstream assets on unapproved foundations, then discovers the foundation moved.

### Per substantial book (the expensive loop, run rarely)

```
intake: reader question · payoff · what she can do after · what this is NOT
   ↓
outline → ONE PILOT CHAPTER through the entire chain (Door included)
   ↓  pilot fails → fix the brief/producer, not the chapter
remaining chapters at the proven cadence
   ↓
three real readers · verbatim explain-back + unseen transfer
   ↓
Door → ALI once → publish → verify publicly → freshness trigger set
```

### The learning loop (the part that must change)

Today, learning ends in a registry that enforcement cannot read. New rule, in code:

```
Ali rejects, or a real reader fails
   → quarantine exact SHA
   → write the fixture from those bytes
   → ADD THE FAMILY TO THE GENERATED ENFORCED LIST      ← the missing step
   → blind-test the judge on the fixture
   → judge rejects unaided?  no → judge is broken; that content class is frozen
                             yes → loop closed, work resumes
```

**Cap the fixture set at ~20 per content class**, evicting the oldest that has not fired in six months. Otherwise every calibration run reads every historical failure and the judge's context fills with archaeology — the same disease as the context dump, one level down.

---

## 10. Control simplification — KEEP / MERGE / MOVE EARLIER / DELETE / BUILD

| Artifact | Verdict | Reasoning |
|---|---|---|
| `AGENTS.md` | **MERGE → ~150 lines** | 419 lines, and the tiering rule (:104–121), the gate rule (:123–137) and MINIMUM SUFFICIENT WORK (:304–326) are excellent. The prose-production section (:152–208) restates `CONTENT-QUALITY-ADMISSION-GATE.md` at length — point at it instead. Also **fix the internal contradiction**: :51–60 grants "full access, remove all controls" while the rest of the file is controls. [SOURCE] OpenAI's own guidance is that `AGENTS.md` should be concise and practical, with reusable procedures in skills — cited in LAiDIES' own diagnostic (:91–94) and not yet applied to this file. |
| `DECISIONS.md` | **KEEP as router / BUILD `decisions` tool** | The single most valuable document here. But 44 KB pasted into every session is the wrong delivery. Make it searchable; stop injecting it. Also resolve §5's backfill queue — five unrouted decisions is a repeat-question generator. |
| `voice/laidies-writing-lock.md` | **KEEP** | The best document in the packet. Two defects to fix, both cited in §14. |
| `voice/episodes/laidies-episode-01.md` | **KEEP as bound exemplar** | It is the benchmark. It must be hash-bound in the registry, which it is (`CQX-GOOD-EPISODE-001`). |
| `voice/laidies-canon-index.md` | **MERGE → names table only** | Self-superseded (§1 retired), self-mislocating (points at the stranded copy), stale ("Last updated 2026-06-21"). `DECISIONS.md:38–56` documents three traps *about this one file*. Keep the retired-name → current-name table and the status-label set; delete the rest. Deleting it removes three traps at once. |
| `laidies-operating-model.md` | **DELETE** | v1, 2026-07-10, describes a `.claude/agents/*.md` architecture, a Layer-4 "gate battery" at `operations/workflows/review-content.mjs`, and Plausible wiring — none of which matches the current Codex/scripts reality. It is a *fourth* description of the operating model. Its one unique asset — the mission paragraph — belongs in the Standing Card. |
| `CODEX-WORKING-AGREEMENT.md` | **MERGE → ~1 page** | The status vocabulary (:132–151) is genuinely load-bearing and should live in the Standing Card. The rest restates `AGENTS.md`. |
| `PARALLEL-WORK.md` | **MERGE into the working agreement** | With a WIP limit of 2, an 18 KB concurrency doctrine is not needed. |
| `CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md` | **MERGE → precedence list only** | The 7-step precedence order (:11–22) is excellent and should survive. The "load the whole binding files" table is the context-bloat engine — replace with retrieval. |
| `WORK-RESOLUTION-LOOP.md` | **BUILD or DELETE** | Its own header admits it is *"intentionally separate from the current queues"* (:4–6) and it validates an empty ledger. It is the right state machine, unwired. Either wire it to the real events log or delete it; a canonical state machine that describes nothing is worse than none. |
| `AUTONOMOUS-DELIVERY-RUNTIME.md` | **MERGE → the §4.3 state machine** | Its state machine is good. Its role list (seven types) is the over-modelling. Its `review admission` paragraph (:70–92) — ~20 conjunctive requirements in one sentence — is unmaintainable and unreadable by the humans and agents that must satisfy it. |
| `ORCHESTRATOR.md` | **DELETE** | Describes an orchestrator agent that, with the dispatcher paused and one foreground lane, does not exist. Its useful content is the sense→select→build→judge→release loop, which is §4.3. |
| `RUNTIME.md` | **KEEP (2 pages)** | Short, and its "Honest gaps" section (:36–44) is exactly the right instinct — it names four `NOT WIRED` integrations rather than implying them. Model other documents on this. |
| `OWNER-ENTRY-CONTRACT.md` + `CHAMPION-CONTRACT.md` + `PROACTIVE-IMPROVEMENT-CONTRACT.md` | **DELETE** | Three contracts governing 67 owners that are one person in different modes. The proactive-improvement contract in particular *manufactures obligations* — every owner cycle must produce an opportunity or an explicit "none" — which is the definition of ritual. |
| `BUILD-COMPLETION-POLICY.md` | **KEEP (compress)** | The "hiding is not completing" rule and the intentional-later-release test are genuinely valuable and prevent a real, tempting failure. |
| `VISITOR-STATE-EVALUATION-STANDARD.md` | **KEEP + MOVE EARLIER** | Six visitor states, no state lending its PASS to another — correct and important. Move it into the *build brief* so states are designed in, not audited afterwards. |
| `OWNER-HANDOFF-CONTRACT.md` | **MERGE → the §6.3 handoff schema** | Ten required fields in prose become one YAML block that a checker can validate. |
| `DASHBOARD-CONTRACT.md` | **MERGE → §13 + the decision-packet spec** | 284 lines. The decision-packet requirements (:158–173) and the three-category top line (:56–66) are excellent; the monthly-cost-ledger rules (:110–127) are a finance spec inside a dashboard contract. |
| `LEARNING-CONTENT-STANDARD.md` | **KEEP** | Cross-surface teaching requirements are real product authority. |
| `learning-content-ecosystem/OPERATING-SPEC.md` | **MERGE into the admission gate** | Overlapping scope. |
| `CONTENT-QUALITY-ADMISSION-GATE.md` | **KEEP — this is the spine** | The best-reasoned control document in the packet. The integrity-vs-cold-reader split (:137–174) is exactly right. Fix only the unenforceable simulated-reader clause. |
| `check-prose-quality-admission.mjs` | **KEEP + 3 fixes** | Genuinely calibrated (16 negative fixtures). Add: cross-stage identity, timestamp ordering, generated family list. |
| `check-content-release-readiness.mjs` | **KEEP + MOVE EARLIER** | Its cross-checks are the right ones. They fire at release; they must fire at *display*. |
| `check-visual-media-admission.mjs` | **KEEP — use as the template** | Already has the two rules the prose checker lacks. |
| `check-content-producer-contract.mjs` | **KEEP** | Prevention-first, calibrated (7 negatives). |
| `check-design-review-admission.mjs` | **KEEP, then simplify** | 329 lines, 37 negative fixtures per `AUTONOMOUS-DELIVERY-RUNTIME.md:114`. The fixtures are the asset. The "six non-compensable 17/20 floors" scoring is theatre — a 17/20 threshold on a subjective rubric produced by a model is a number pretending to be a measurement. Keep the fixtures, replace the scores with PASS/HOLD + locator. |
| `check-product-stewards.mjs` | **DELETE with the 67-dossier model** | It validates paperwork completeness for a structure I recommend retiring. |
| `build-owner-control-plane.mjs`, `build-control-room-work-index.mjs` | **MERGE → one projection builder** | Two generators of overlapping surfaces is the mirrored-summary anti-pattern in code. |
| `build-ai-fundamentals-book.mjs` | **FIX (§8 items 4)** | Rename the log line; derive the banner; refuse to build when the manifest hash does not match. |
| `.codex/hooks/session_start.py` | **REWRITE → Standing Card** | See §6.1. |
| `.codex/hooks/stop_operational_integrity.py` | **KEEP** | Correctly bounded, has `stop_hook_active` loop protection, does not judge quality. Good hook. |
| Four hooks referenced but not supplied | **[UNVERIFIED] — audit before trusting** | `block-approval-forgery.py`, `enforce-voice-spec.py`, `episode-shipcheck.sh`, `library-maker-preflight.py`. By `AGENTS.md:123` each must be proven to fail before it may be trusted. |
| `codex-contract/AGENTS.template.md` | **KEEP + guard** | The generated-`AGENTS.md` template must gain a post-generation identity check (see §17). |
| **All Tier D** | **ARCHIVE** | `agent-operations-playbook.md` (83 KB), `agent-organization-map.md`, `agent-role-performance-standards.md`, `website-interaction-agent-map.md`, the three control-room audit documents, the coverage matrix. Move behind an archive boundary excluded from agent discovery. `LAIDIES-OPERATING-SYSTEM-AUTHORITY.md` should be retained *only* until this review's plan replaces it, then archived too — otherwise it becomes the fifth description of the operating model. |
| **BUILD (new, small)** | | `resolve-review-url` · the `decisions` search tool · the events log + projection builder · the generated family list · the fixture-eviction job |

**Net: ~30 governing documents → ~8. Five new scripts, none over 200 lines.**

---

## 11. Enforcement plan

Five unavoidable checks. Everything else is judgment or advice.

### The five

**E1 — The Door.** `resolve-review-url <path>` is the only way to surface a candidate to Ali. Re-hashes at call time; verifies a complete, current, correctly-ordered, cross-bound admission chain; verifies the SHA is not quarantined.
*Calibrated to fail by:* fixture set — stale hash, hash matching a rejected artifact, producer-only chain, independent-before-producer, same-principal maker/judge, scope narrower than the artifact, image referenced in prose but absent from the visual manifest. **The last one is the exact defect in §3.2 D and must be a fixture.**

**E2 — Cross-stage identity.** Producer and independent receipts must bind the same artifact SHA, same manifest SHA, same candidate ID, and producer must precede judge in time.
*Calibrated to fail by:* the two supplied AI Fundamentals receipts, checked in as permanent fixtures. They are perfect negative fixtures — real, subtle, and they fooled the whole system once.

**E3 — Generated failure-family enforcement.** The enforced list is generated from the exemplar registry at build time. Adding a registered negative exemplar automatically extends what a PASS may not contain, and invalidates receipts written against the older registry hash (the registry-freshness check at `check-prose-quality-admission.mjs:97` already does the latter — it just needs the list to be generated).
*Calibrated to fail by:* a candidate exhibiting `technicalExplainerVoice` must be rejected. Today it is accepted.

**E4 — Blind judge calibration.** Before any content class may enter `DECISION_READY`, its judge must reject the current quarantined known-bad artifacts *unaided* — not told what to look for.
*Calibrated to fail by:* a deliberately weakened judge prompt must fail the calibration.

**E5 — Derived status only.** No process may write `RUNNING`, `READY`, `PASS` or `VERIFIED_PUBLICLY` into a state file. The Stop hook rejects a turn that leaves a handwritten status.
*Calibrated to fail by:* a payload containing a handwritten `RUNNING` must be blocked.

### What stays human judgment — permanently

- Whether prose sounds like Ali's smartest funny friend or like a very good explainer wearing her clothes. **The supplied case proves a model at PASS confidence gets this wrong.**
- Whether an analogy teaches or merely decorates.
- Whether a page feels like a room in SUNNYVAiLE.
- Whether a joke lands.
- Whether an image belongs to its building.
- Whether a book is worth a busy woman's evening.
- Mission, public identity, spend, release.

The system's job is to make sure these are the *only* things left when something reaches Ali.

### The honest limit

E1–E5 prevent **stale, unreviewed, mis-scoped, self-approved and mis-stated** work from reaching her. They cannot prevent **fluent mediocrity** — prose with correct mechanism, correct structure, no registered defect, and no life in it. That is what happened on 2026-08-07, and no gate catches it. Only a different judge, a real reader, or Ali catches it. This is why Change 3 and Change 5 matter more than any additional check, and why I recommend adding no further automated gates beyond these five.

---

## 12. Migration plan — non-destructive, ordered

**Principle: additive first, subtractive last, and nothing is deleted until its replacement has run in production for two weeks.**

| Phase | Days | Action | Reversal |
|---|---|---|---|
| 0 | 1 | Tag `pre-simplification-2026-08` and push. Verified off-site copy (§15) before anything else | — |
| 1 | 1–3 | **Add** the events log. Every existing writer *also* appends. Nothing reads it yet | delete the file |
| 2 | 3–7 | **Add** the Door and E2/E3. Run in warn-only mode; log what it *would* have blocked | remove the call |
| 3 | 7–10 | Review the warn log with Ali. Expect surprises — this list is the real inventory of current bypasses. Then switch to enforcing | flip the flag |
| 4 | 10–14 | **Add** the Standing Card alongside the current injection; compare agent behaviour on identical tasks | revert the hook |
| 5 | 14–21 | Generate the Control Room from the events log beside the existing dashboards; diff daily until they agree | keep old dashboards |
| 6 | 21–30 | **Now** remove the old injection, the old dashboards, and the merged documents. Each deletion is one commit with the replacement named in the message | `git revert` |
| 7 | 30–45 | Archive Tier D behind an excluded boundary (move, don't delete; add to agent-discovery ignore) | move back |
| 8 | 45+ | Retire 67-product dossier preflights; keep product IDs as routing metadata | dossiers stay on disk |

**Preserved throughout:** every approved asset, every admitted content artifact, all four opening-book sources, all quarantine records (`rejected-artifacts.json` is safety-critical — never prune it), all history. Nothing in this plan rewrites git history or deletes evidence.

**The one hard rule:** at no point may the site be *less* protected than today. Warn-only precedes enforcing; enforcing precedes deleting the old thing.

---

## 13. Metrics

Ten numbers. All derivable from the events log. Reviewed weekly, on one screen.

| Metric | Definition | Now | 90-day target |
|---|---|---|---|
| **Ali-found defect rate** | objective defects Ali finds ÷ artifacts she reviews | **≥1 per artifact** (the supplied case) | **0** |
| **First-pass acceptance** | artifacts reaching Ali that she approves without rework | [UNVERIFIED] | ≥70% |
| **Repeated known defect** | rejections whose family is already registered | ≥1 (technicalExplainerVoice) | **0 — this is the ratchet** |
| **Review cycles per artifact** | judge↔maker round trips | 2–3 | ≤1.5 |
| **Throughput** | reader-facing artifacts publicly verified per week | ~0 | ≥3 |
| **Cycle time** | `SPECIFIED` → `VERIFIED_PUBLICLY`, median | [UNVERIFIED] | book ≤14d, episode ≤7d, page ≤3d |
| **WIP age** | oldest item not in a terminal state | [UNVERIFIED] | ≤14d, none >30d |
| **Ali decision latency** | `DECISION_READY` → ruling | [UNVERIFIED] | ≤48h (if longer, the packet is incomplete) |
| **Context cost** | mean input tokens per completed artifact | ~11k *before the task starts* | ≤3k standing |
| **Public outcome** | unique readers · Episode 1 completion · book reopen rate · corrections filed | not instrumented | instrumented + baselined |

**Two metrics to actively distrust:** number of gates passed, and number of documents produced. Both went up steadily through July and August while reader-facing throughput stayed near zero. They measure the disease.

**One qualitative check that outranks all ten:** each month, Ali reads one randomly selected published paragraph cold. If it does not sound like her, the number of green metrics is irrelevant.

---

## 14. Risks and open decisions — only what genuinely needs Ali

### Decisions only Ali can make

**D1 — The sitewide style championship: A, B or C.** `sitewide-style-championship-2026-07-26.md` records `CURRENT DECISION RESULT NONE` after **17 cycles** (`DECISIONS.md:112`). This blocks all 17 buildings. Seventeen cycles have not produced a decision because the question is being asked as a competition rather than as a choice. **Recommendation:** present exactly three finished comparable candidates on the *same* page at desktop and mobile, once, and rule. If a decision does not emerge, pick B (deliberate dual system: episodes keep the graphic-novel register, buildings get an editorial register) — because it is the least likely to require re-doing approved episode art, and because an unmade decision is currently more expensive than a slightly wrong one.

**D2 — Does whole-town opening require `VERIFIED_PUBLICLY` for every building, or is `RELEASE_READY` enough for some?** Flagged as open on 2026-08-04 (item D) and still open. This determines the launch date.

**D3 — Real reader evidence: three humans, or drop the claim?** §2 Change 5. Cannot be resolved by an agent.

**D4 — Does Episode 1 get corrected, and does the fix ripple?** Two live contradictions in the packet's own gold standard:
- The Canon Index records *"On Wednesdays We DO AI" — never "Use"* (Ali, 2026-07-12; `laidies-canon-index.md:159`). The supplied exemplar is titled **"On Wednesdays We Use AI"** (`laidies-episode-01.md:1`).
- The Currency Rule bans *"it's just autocomplete"* as an unqualified claim and explicitly names the Ep1 line as replaced (`laidies-writing-lock.md:716–719`). The supplied exemplar still reads *"It's autocomplete at a scale that feels like thought but isn't"* (`laidies-episode-01.md:105`).

This matters more than it looks: Episode 1 is the bound positive exemplar `CQX-GOOD-EPISODE-001` that every producer and judge calibrates against. **The benchmark currently teaches two things the rules forbid.** Either correct the exemplar and re-hash it, or record an explicit exemption. Do not leave it ambiguous.

**D5 — Spend authority for §16.** All recommendations there are CAD $0 or near it, but the archive tier and any paid analytics need her ruling.

**D6 — AWS employment and internal benefits.** See §17. This must be checked through internal policy by Ali personally; an agent must not investigate, infer or rely on it.

### Risks I judge material

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Simplification is treated as another document, and nothing is deleted | **High** | Fatal to the whole plan | The week-1 stop-doing rule: no new operating doc unless one is deleted. Track deletions as a metric. |
| The style decision slips again | High | Launch slips indefinitely | Time-box: one presentation, one ruling, default to B |
| 9.8 GB repo in iCloud loses or corrupts data | Medium | Catastrophic, irreversible | §15 Phase 0, this week |
| `danger-full-access` + a destructive command | Medium | Severe | `config.toml` sets `sandbox_mode = "danger-full-access"`. Judges/researchers/verifiers are correctly `read-only`; the **maker profile has no `sandbox_mode` line and inherits full access**. Keep the commit-before-destructive-git rule (`AGENTS.md:56–60`) and add pre-push protection on the default branch. |
| A model change silently shifts voice judgment | Medium | High — invisible | Re-run blind calibration on every model change; it is a two-minute job |
| Fluent mediocrity ships | Medium | High — erodes the only real moat | Different-family judge + real readers + Ali's monthly cold read |
| The 17-building scope simply exceeds one founder's year | Medium | High | The vertical-journey ordering in §8 means a partial town still works |

---

## 15. Storage and archive design

### 15.1 The problem, stated precisely

[REPO] The evidence in the packet: the Git object store is **≈9.8 GB** with thousands of untracked generated files (`OPERATING-MODEL-DIAGNOSTIC-2026-08-02.md:81–84`); the operating-system authority calls the worktree and object store **"unhealthy"** (:380); there is a **stranded second copy** of canon at `LAIDIES/Website/operations/voice/` alongside the live one at `Website-homepage/` (`DECISIONS.md:40–49`); `Website-homepage` is its own Git root (`.codex/config.toml` comment); the whole tree lives inside **iCloud Drive**; and there is a real GitHub remote with CI (`origin/homepage-redesign`, `minimum-integrity-ci.yml`, run `30987691692` — `CLAUDE-OPUS-ARCHITECTURE-AUDIT-RECONCILIATION-2026-08-04.md:27, 51`).

[SOURCE] GitHub's own guidance, cited in LAiDIES' diagnostic: keep on-disk Git data at or below about 10 GB, use Git LFS for necessary large binaries, and keep generated files outside Git. **The repository is at that ceiling now.**

[INFER] iCloud Drive is a personal-device sync layer. It is not source control, not immutable artifact storage, not automated backup, not release provenance, and not a tested recovery system. Its file-eviction behaviour and a `.git` directory of tens of thousands of small objects are a poor combination. I could not find an authoritative Apple statement on Git-in-iCloud specifically, so I mark the *specific* incompatibility **[UNVERIFIED]** and rest the recommendation on the four capabilities iCloud demonstrably does not provide, which is sufficient.

### 15.2 Seven jobs, seven homes

| Job | Home | Why |
|---|---|---|
| Editable source + history | **Git on GitHub** (already exists) | history, PRs, CI, provenance |
| Large binary working assets (PSDs, masters, raw video) | **Git LFS**, only for genuinely versioned masters | [SOURCE] Free/Pro include **10 GiB storage + 10 GiB bandwidth**; data packs are gone, replaced by metered billing |
| Generated candidates + evidence | **Local cache, gitignored** | regenerable by definition; never in Git |
| Approved release artifacts | **Cloudflare R2** bucket `laidies-releases`, versioned | [SOURCE] $0.015/GB-mo, **egress free**, 10 GB free tier |
| Long-term archive (rejected candidates, superseded packets, historical evidence) | **R2 Infrequent Access**, or **S3 Glacier Deep Archive** if immutability is required | [SOURCE] R2 IA $0.01/GB-mo (30-day minimum); Glacier Deep Archive **$0.00099/GB-mo** |
| Local working cache | the machine, **outside iCloud** | speed, no sync contention |
| Off-site encrypted backup | **restic → Backblaze B2** (or a second R2 bucket) | [SOURCE] restic: AES-256 + Poly1305-AES, dedup, `restic check` verification; B2 $6.95/TB-mo, first 10 GB free, free egress to 3× stored |

### 15.3 The migration, in order — do not skip Phase 0

**Phase 0 — Prove you can restore, before you move anything (this week, ~2 hours).**
1. `git bundle create laidies-full.bundle --all` — a single-file complete history snapshot.
2. `restic init` against B2 or R2; back up the entire tree *including* untracked files.
3. `restic check --read-data`.
4. **Restore to a scratch directory and open the site from it.** Untested backup is not backup.
5. Record RPO (target: 24 h) and RTO (target: 4 h) as measured, not aspirational.

**Phase 1 — Classify before moving (agent work, one pass, no deletion).**
Produce an inventory with, for every path: size, tracked/untracked, last modified, referenced-by count, and a class of `AUTHORITY / ACTIVE SOURCE / APPROVED ASSET / GENERATED / REJECTED / HISTORICAL / UNKNOWN`. `UNKNOWN` never moves. **Every live reference must be resolved before any file moves** — this is the brief's stated archive requirement and the reason bulk cleanup is dangerous.

**Phase 2 — Move the worktree out of iCloud.** `~/Projects/laidies/` (or any non-synced path). Clone fresh from GitHub rather than moving the directory, then restore untracked-but-needed files from the restic snapshot using the Phase 1 inventory. The iCloud copy stays untouched until Phase 6.

**Phase 3 — Resolve the stranded tree.** Confirm `Website/operations/voice/` is genuinely superseded (`DECISIONS.md:40–45` says yes, and says not to delete because other stranded content lives there). Move it to `archive/2026-08-superseded-website-tree/`, add an `ARCHIVED.md` explaining what it was, and **exclude it from agent discovery**. Three documented traps disappear.

**Phase 4 — Shrink Git.** Generated intermediates → gitignored local cache. Large versioned masters → LFS (watch the 10 GiB free ceiling). Everything superseded → R2 archive with a manifest mapping old path → archive key → SHA-256, committed to Git so provenance survives the move. **No history rewrite.** If the object store is still over ~10 GB after this, that is a separate, later, carefully-planned project.

**Phase 5 — Automate.** Nightly restic to B2 with `--verbose`; weekly `restic check`; **monthly restore drill** (calendar reminder, 20 minutes, non-negotiable — an untested restore is a wish). Retain 7 daily / 4 weekly / 12 monthly / 3 yearly.

**Phase 6 — Only now** remove the iCloud copy, after two clean restore drills.

### 15.4 Immutability

[SOURCE] S3 Object Lock requires Versioning, offers Governance mode (bypassable with `s3:BypassGovernanceRetention`) and Compliance mode (*"the only way to delete an object under compliance mode before its retention date expires is to delete the associated AWS account"*).

**Recommendation:** LAiDIES does not need Object Lock today. It has no regulatory retention requirement, and Compliance mode's irreversibility is a genuine foot-gun for a one-founder operation. R2 versioning plus restic snapshots plus a Git bundle give three independent recovery paths. **Revisit only if a legal or rights dispute makes tamper-evident retention necessary** — and if so, Governance mode first.

### 15.5 Explicit verdicts on the named options

| Option | Verdict |
|---|---|
| **iCloud Drive** | **STOP using it for the worktree.** Fine for documents; it is not backup, not source control, not provenance, and not a recovery system. |
| **GitHub** | **KEEP.** Already in use with CI. [SOURCE] Actions free for public repos; 2,000 min/mo Free, 3,000 min/mo Pro on private. Add branch protection on the default branch. |
| **Git LFS** | **YES, narrowly** — only genuinely versioned masters. [SOURCE] 10 GiB free; metered beyond. Do not use it as a dumping ground for generated media. |
| **Amazon S3** | **NOT NOW for primary artifacts.** Its egress ($0.09/GB beyond 100 GB/mo) is a poor fit for a site that will serve media. **YES for deep archive** if cost dominates: Glacier Deep Archive at $0.00099/GB-mo is ~10× cheaper than R2 IA. |
| **Cloudflare R2** | **YES — primary artifact and archive store.** [SOURCE] $0.015/GB-mo Standard, $0.01 IA, **free egress**, 10 GB free tier. LAiDIES already has Cloudflare in its stack (`cloudflare-pretty-url-rule.md`; Pages workflow). One vendor fewer. |
| **Backblaze B2** | **YES for off-site backup**, or a second R2 bucket in a different account if minimising vendors matters more than provider diversity. Provider diversity is the safer choice. |

### 15.6 Cost estimate

At an estimated 20 GB of durable artifacts and 100 GB archive **[INFER — actual volume is UNVERIFIED]**:

| Item | Monthly (USD) |
|---|---|
| R2 artifacts (20 GB, 10 free) | ~$0.15 |
| R2 archive IA (100 GB) | ~$1.00 |
| B2 backup (100 GB) | ~$0.70 |
| GitHub | $0 (Free) or $4 (Pro) |
| **Total** | **≈$2–6/month** |

The entire storage and disaster-recovery problem costs less than a coffee. **The current risk is not financial — it is that a 9.8 GB repository with thousands of untracked files sits in a consumer sync folder with no tested restore.**

---

## 16. Third-party product recommendations

All prices checked **2026-08-07** against official pricing pages. Nothing here was purchased, trialled, connected or authenticated.

### REQUIRED NOW (before launch)

| # | Product | Problem it solves | Already have it? | No-new-tool alternative | Cost [SOURCE] | Privacy / credentials | Lock-in & exit | Trial that proves it |
|---|---|---|---|---|---|---|---|---|
| 1 | **restic** (open source) | No tested backup or restore of a 9.8 GB repo + untracked assets | **No** | `git bundle` alone — insufficient, misses untracked files | **$0** | Password-based AES-256; password in a manager, never in the repo | None — open format, plain `restore` | Restore to scratch, open the site from it. Metric: RTO ≤4 h |
| 2 | **Backblaze B2** *or* second R2 bucket | Off-site destination for #1 | R2 available via Cloudflare **[UNVERIFIED whether an account is configured]** | External drive — no off-site protection | B2 $6.95/TB-mo, 10 GB free, free egress to 3× stored | API key scoped to one bucket, write-only where possible | S3-compatible; `rclone sync` out | 30 days of clean nightlies + one restore |
| 3 | **GitHub branch protection** | `danger-full-access` + a dirty shared tree + a real remote | **Yes — GitHub is already in use** | Discipline. Discipline already failed once (`AGENTS.md:56–60`) | **$0** | none | none | Force-push to default branch must be refused |

### FIRST 90 DAYS

| # | Product | Problem | Already have it? | Alternative | Cost [SOURCE] | Privacy | Exit | Trial |
|---|---|---|---|---|---|---|---|---|
| 4 | **Cloudflare R2** | Release artifacts and archive out of Git | Cloudflare is in the stack; R2 config **[UNVERIFIED]** | Keep everything in Git — the current problem | $0.015/GB-mo, **egress free**, 10 GB free | Scoped API token; no reader data | S3-compatible; `rclone` out | Move 5 GB of superseded assets; confirm Git shrinks and every reference resolves |
| 5 | **Langfuse** (self-hosted or Hobby) | Judge/maker behaviour is currently un-inspectable; §11 depends on knowing whether calibration holds over time | **No** | A JSONL log of every judge verdict + a weekly manual read. **Genuinely adequate for one founder.** | **$0** self-hosted; Hobby: 50k units/mo, 2 users, 30-day retention; Core $29/mo | Self-host to keep all traces local | Open source; export | Track judge verdicts for 30 days. **Adopt only if it catches a calibration drift the JSONL would not have.** |
| 6 | **Plausible** | `RUNTIME.md:36–44` lists Plausible ingestion as `NOT WIRED`; §13 public-outcome metrics need real data | Referenced in the repo; account status **[UNVERIFIED]** | Cloudflare Web Analytics — free, already in the stack, less capable | $9/mo or $108/yr (10k pageviews); 30-day trial, **no free plan**; open source, self-hostable | Cookieless, no personal data — a good fit for the audience | Open source; data export | Wire it; if the first month's numbers change no decision, cancel |

### OPTIONAL LATER

| # | Product | Condition that would justify it |
|---|---|---|
| 7 | **Zotero** (free) | Only if source management becomes a measured bottleneck. The claim-map-to-source-excerpt discipline in `check-prose-quality-admission.mjs:151–160` already does the load-bearing work. |
| 8 | **S3 Glacier Deep Archive** | Only if archive exceeds ~500 GB, where $0.00099/GB-mo beats R2 IA enough to justify a second cloud vendor. |
| 9 | **Sentry / PostHog** | Only after launch, when there are real users generating real errors. |

### 🚫 DO NOT BUY YET

| Product | Why not |
|---|---|
| **Linear / Asana / Monday / Notion / Airtable** | Work state belongs in the events log beside the artifacts. An external tracker creates a **second source of truth** — the precise failure mode this whole review exists to remove. `DECISIONS.md` and a generated projection are better *because* they live next to the code. |
| **Braintrust / LangSmith / any paid eval platform** | The eval assets that matter — 16 prose fixtures, 37 design fixtures, 10 media fixtures — already exist and are calibrated. A platform would host them more prettily. It would not have caught the 2026-08-07 failure, because that failure was an unrun gate, not an unmeasured one. |
| **Any AI writing / content-lifecycle tool** | The voice is the product. A tool that helps produce more content faster is aimed at the exact failure mode the mission brief names first: *template throughput*. |
| **Supabase paid tier / any auth upgrade** | The product currently has device-local continuity. `MISSION-PRODUCT-VOICE-BRIEF.md:65` names *false personalization* as a failure. Do not buy identity infrastructure for a promise that has not been made. |
| **HeyGen / Remotion / Replit / Lovable / Base44 / Vercel / Wix** | Available in the Codex environment; none solves a demonstrated LAiDIES bottleneck. Canva + CapCut are already locked as the video pipeline (`AGENTS.md:38–43`). |
| **Media asset management (Cloudinary et al.)** | Repository + R2 + a checksum-bound registry is adequate. Revisit only if asset *substitution* incidents persist after the registry is properly enforced. |
| **Stripe / any commerce** | Revenue is out of scope until the town opens. |
| **Semrush / SEO tooling** | The reader does not arrive via SEO articles; the writing lock explicitly names "an SEO article" as what LAiDIES is not. |

**Net new spend to launch: $0. Net new spend at 90 days: ≈$9–15/month, all of it optional except backup, which is ~$0.70.**

The honest summary: **almost every problem in this packet is solved by wiring what exists correctly and deleting what does not earn its place.** That is why the DO NOT BUY list is longer than the buy list.

---

## 17. AWS Agent Toolkit verdict

### ⚖️ **DO NOT INSTALL YET.** Documentation-only research plus direct infrastructure-as-code is better for LAiDIES today.

I verified the toolkit against its live primary sources on 2026-08-07 rather than relying on the packet's note.

### What I verified [SOURCE]

From `https://raw.githubusercontent.com/aws/agent-toolkit-for-aws/refs/heads/main/setup-instructions/setup.md`:
- installs AWS CLI v2 and the Agent Toolkit (MCP server config + agent skills);
- authenticates by browser via `aws login`; explicitly instructs the agent *"You MUST NOT ask the user for AWS credentials, access keys, or secret keys"*;
- **writes AWS rules into the tool's project rules file — for Codex, that is project-root `AGENTS.md`** — fetched from `rules/aws-agent-rules.md` on `main`;
- the Agent Toolkit service itself operates only in **`us-east-1`** regardless of the user's region;
- claims credentials *"are valid for 12 hours and can be renewed for 90 days without re-authenticating in the browser"*;
- **no version pinning** in the setup document.

From the repository page:
- "Official, AWS-supported MCP servers, skills, and plugins"; the MCP server advertises *"Full AWS API coverage — …any of the 300+ AWS services through a single authenticated endpoint"*;
- IAM condition keys distinguishing agent from human actions; CloudWatch metrics and CloudTrail logging;
- Apache-2.0; **174 commits on `main` and no tagged releases**;
- no least-privilege IAM policy published on the README.

### Why not, for LAiDIES specifically

**1. The benefit does not match the need.** The toolkit's value is reducing errors when an agent builds *on* AWS across many services. LAiDIES' AWS need is one bucket, versioning, a lifecycle rule and a budget alarm. That is roughly forty lines of Terraform or CDK, written once, reviewed by a human, and never touched again. A 300-service authenticated endpoint to create one bucket is not a proportionate tool — and it fails LAiDIES' own overengineering test (`LAIDIES-OPERATING-SYSTEM-AUTHORITY.md:359–365`) and the MINIMUM SUFFICIENT WORK rule (`AGENTS.md:304–326`).

**2. The `AGENTS.md` collision is real and confirmed at the source.** LAiDIES generates root `AGENTS.md` from `operations/codex-contract/AGENTS.template.md` — the file's first line is `GENERATED FILE — DO NOT EDIT`. The installer writes to that exact path. An installer editing a generated file means either the AWS rules are erased on the next rebuild, or the LAiDIES contract is corrupted. **This is not hypothetical; I read the instruction that does it.**

**3. There are no releases, so "version-pinned" means "pinned to a commit."** With 174 commits on a mutable `main` and no tags, any adoption must pin a SHA and re-review on every bump. That is real, recurring maintenance for a one-founder shop.

**4. The credential surface is the wrong shape right now.** 12-hour credentials renewable for 90 days without browser re-auth, stored locally, on a machine running an agent configured with `sandbox_mode = "danger-full-access"`, in a repository where `AGENTS.md:51–60` records "full access to everything, remove all controls." Device loss becomes a 90-day AWS exposure. Cloudflare R2 with a single scoped API token is a materially smaller surface for the same job.

**5. R2 wins the actual comparison.** [SOURCE] R2: $0.015/GB-mo, **egress free**, 10 GB free, S3-compatible. S3: $0.023/GB-mo Standard, $0.09/GB egress beyond 100 GB. For a media-serving site, free egress is the decisive difference — and Cloudflare is already in the stack, so it adds no vendor.

**6. The `us-east-1` requirement is a Canadian-operation consideration** worth a conscious decision rather than an installer default.

### What would change the verdict

Revisit if **all** of these become true:
- LAiDIES needs three or more AWS services (e.g. Lambda + CloudFront + SES) rather than one bucket; **and**
- the toolkit ships tagged releases; **and**
- the rules-file target is configurable away from project-root `AGENTS.md`; **and**
- an AWS account exists with confirmed billing and an active Budget alarm.

### If Ali overrides this and wants it anyway — the exact conditions

I would not obstruct this; it is her call. But in this order, nothing skipped:

1. **Isolated test project first.** A throwaway repository with a *decoy* `AGENTS.md`. Run setup. Diff the file. Prove what it writes.
2. **Collision guard before any real-repo install.** A pre-commit and CI check that re-generates `AGENTS.md` from `AGENTS.template.md` and fails if the working copy differs. AWS rules go to `operations/rules/aws-agent-rules.md` at a **pinned commit SHA**, referenced *from* `AGENTS.md`, subordinate to LAiDIES authority — never merged into it.
3. **Account and cost first.** Confirm the account, the Free Tier terms ([SOURCE] new AWS customers since 2025-07-15 receive up to **$200 in Free Tier credits, for 6 months** — a temporary credit, **not** a sustainable operating cost), and set an AWS Budget with a deliberately small threshold *before* the first authenticated call.
4. **Dedicated least-privilege role, read-only.** No deploy, no billing, no IAM administration, no secret reading, no delete. Region and resource-scoped. Use the advertised IAM condition keys to distinguish agent from human actions; confirm CloudTrail is recording every agent request.
5. **One bounded storage pilot.** Disposable non-sensitive fixtures only. Test versioning and **restore**. Measure real cost. Delete only the pilot resources.
6. **Compare against the measured R2 result and a no-new-product workflow.** Adopt only if the toolkit demonstrably reduced errors or time. *"Official AWS tooling"* is not a reason.
7. **Ali approves any spend or account change explicitly**, every time.

### The proof the brief asked for

> **Is it better than documentation-only research plus direct infrastructure-as-code?**

**No — not for this operation, today.** The toolkit's advantage is breadth across 300+ services. LAiDIES needs depth in one: object storage with versioning and lifecycle. That is fully specified by public documentation I read today without authenticating to anything, and it is implementable as reviewable, version-controlled IaC that leaves a diff, works in CI, and grants an agent no standing credentials at all. The toolkit would add a credential surface, a rules collision with LAiDIES' governing contract, an unpinnable dependency and ongoing context — to solve a problem that is already solved more cheaply by a Cloudflare API token and forty lines of Terraform.

**Verdict: DO NOT INSTALL YET.** Revisit when AWS becomes a multi-service dependency and the toolkit ships tagged releases with a configurable rules target.

---

## 18. Index — the brief's eighteen questions

| # | Question | Answer | §|
|---|---|---|---|
| 1 | True authority vs. duplicate vs. retire | 8 documents survive of ~30; Canon Index → names table; `laidies-operating-model.md`, `ORCHESTRATOR.md`, three owner contracts deleted; all Tier D archived | 10 |
| 2 | Executable vs. described vs. bypassable | Executable: 6 checkers (I ran them). Described only: `WORK-RESOLUTION-LOOP` (its own header admits it), the dispatcher, analytics. Bypassable: everything on the display path | 3.2, 10 |
| 3 | Why the false pass reached Ali | Four byte-identities, inverted order, unrun gate, unenforceable family, contact-sheet visual review, hardcoded banner | 3 |
| 4 | Where to enforce exact artifact identity | At **display**, re-hashed at call time, in one resolver. Receipts keyed by SHA so old ones cannot apply | 2.1, 4.1, 11 |
| 5 | Minimum roles / temporary modes | 1 durable foreground + 3 read-only lanes (judge, research, release). Owner/maker/integrator/planner are modes | 5.1 |
| 6 | When a subagent helps | Independence, breadth-first search, freshness. Not shared-context building — [SOURCE] 15× tokens, documented to underperform on coding | 5.2 |
| 7 | Automatic vs. on-demand vs. never | ~1.5k Standing Card; `decisions`/`canon`/`exemplar` tools; never other dossiers, painpoints, Tier D, dashboards | 6 |
| 8 | What to store where | 7 systems of record; status derived, never written | 4.1 |
| 9 | Token budgets | 8 task classes; judge gets the smallest deliberately | 6.5 |
| 10 | Model/effort routing | 14-row table; judge routed by **family**, not effort | 7 |
| 11 | WIP, stop-loss, timeouts, retries | 1 building / 1 content / 2 lanes / 1 Ali decision; 2nd identical failure exits to STOP_LOSS and fixes the producer | 8, 4.3 |
| 12 | Which checks to delete/merge/move/keep | Full table | 10 |
| 13 | Control Room showing only decision-changing info | Generated projection; 4 sections; one decision at a time; complete packet or it does not arrive | 4.2, 5.3 |
| 14 | Shortest safe path to finish the site | 1 week closing the door → 1 book end-to-end → style ruling → one vertical journey → widen | 8 |
| 15 | Steady-state loops | Daily / weekly / episode / book, plus the fixed learning loop | 9 |
| 16 | Git / LFS / object / cache / release / archive + iCloud migration | 7 jobs, 7 homes; 6 phases; **restore drill before anything moves** | 15 |
| 17 | Buy / 90-day / never | 3 required (~$0.70/mo), 3 at 90 days, 8 explicit DO NOT BUY | 16 |
| 18 | AWS Agent Toolkit | **DO NOT INSTALL YET**, with exact conditions if overridden | 17 |

---

## 19. Closing note

The most striking thing in this packet is not the failure. It is how nearly right the system already is. `CONTENT-QUALITY-ADMISSION-GATE.md` reasons about the difference between integrity and comprehension better than most production systems I could point to. The prose checker is genuinely calibrated against sixteen negative fixtures. The visual checker already contains the two rules the prose checker is missing. The 2026-08-02 diagnostic identified most of the real causes. The writing lock is a genuinely excellent document, and Episode 1 earns its place as a benchmark.

What went wrong is smaller and more specific than the volume of process implies. A defect family was learned into a registry that the enforcement code could not read. A judge was declared independent while being configured identically to the maker. And nothing stood between a rendered HTML file and Ali's browser.

Fix those three, delete two-thirds of the documents, and this becomes a system that can carry a town.

The one thing I would ask Ali to hold onto through the simplification: **the reason all of this exists is a woman with no spare hour who deserves a truthful, funny, genuinely useful route into the most consequential technology of her working life.** Every gate that does not protect her experience is taking time away from making more of it.

---

## Sources

**Repository evidence** — all paths relative to `FABLE-5-LAIDIES-OPERATING-MODEL-2026-08-07-v3.zip`, verified against `MANIFEST.sha256` (87/87 files matched):
`sources/AGENTS.md` · `sources/operations/DECISIONS.md` · `sources/operations/voice/laidies-writing-lock.md` · `sources/operations/voice/laidies-canon-index.md` · `sources/operations/voice/episodes/laidies-episode-01.md` · `sources/operations/laidies-operating-model.md` · `sources/operations/CODEX-WORKING-AGREEMENT.md` · `sources/operations/runtime/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md` · `sources/operations/runtime/WORK-RESOLUTION-LOOP.md` · `sources/operations/product-stewards/{AUTONOMOUS-DELIVERY-RUNTIME,ORCHESTRATOR,RUNTIME,BUILD-COMPLETION-POLICY,PROACTIVE-IMPROVEMENT-CONTRACT}.md` · `sources/operations/product-stewards/control-room/{DASHBOARD-CONTRACT,OWNER-HANDOFF-CONTRACT}.md` · `sources/operations/product-stewards/control-room/handoff-library-{content-false-pass-root-cause,ai-fundamentals-v2-voice-false-pass}-2026-08-07.md` · `sources/operations/product-stewards/town-entry-homepage/EXPERIENCE-BRIEF.md` · `sources/operations/product-stewards/learning-content-ecosystem/{CONTENT-QUALITY-ADMISSION-GATE.md,CROSS-SURFACE-ANTI-SLOP-INCIDENT-2026-08-07.md,content-quality-exemplars.json}` · `sources/operations/control-room/{LAIDIES-OPERATING-SYSTEM-AUTHORITY,OPERATING-MODEL-DIAGNOSTIC-2026-08-02,CLAUDE-OPUS-ARCHITECTURE-AUDIT-RECONCILIATION-2026-08-04,OPERATING-SYSTEM-REVIEW-COVERAGE-MATRIX}.md` · `sources/.codex/{config.toml,hooks.json,agents/*.toml,hooks/session_start.py,hooks/stop_operational_integrity.py}` · `sources/package.json` · `sources/scripts/{check-prose-quality-admission,test-prose-quality-admission,check-content-release-readiness,check-content-producer-contract,check-visual-media-admission,check-design-review-admission,build-ai-fundamentals-book,build-ai-fundamentals-visuals}.mjs` · `sources/content/library-books/pilots/ai-fundamentals-101-v2/{review-text.md,artifact-manifest.json,producer-self-review-full.json,independent-semantic-review-v2.json,visuals/visual-manifest.json,visuals/producer-self-review.json}`

**External primary sources, all checked 2026-08-07:**
- [Agent Toolkit for AWS — setup instructions](https://raw.githubusercontent.com/aws/agent-toolkit-for-aws/refs/heads/main/setup-instructions/setup.md)
- [Agent Toolkit for AWS — repository](https://github.com/aws/agent-toolkit-for-aws)
- [Amazon S3 pricing](https://aws.amazon.com/s3/pricing/)
- [Amazon S3 — Locking objects with Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/)
- [GitHub Docs — Git LFS billing](https://docs.github.com/en/billing/concepts/product-billing/git-lfs)
- [GitHub Docs — About billing for GitHub Actions](https://docs.github.com/en/billing/managing-billing-for-your-products/about-billing-for-github-actions)
- [Backblaze B2 Cloud Storage pricing](https://www.backblaze.com/cloud-storage/pricing)
- [restic documentation](https://restic.readthedocs.io/) · [restic repository](https://github.com/restic/restic)
- [Langfuse pricing](https://langfuse.com/pricing)
- [Plausible Analytics pricing](https://plausible.io/#pricing)
- [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic — How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

**Not verified, and deliberately not assumed:** Git remote protection rules and CI status; Cloudflare account, active products and billing; any AWS account, employee-program eligibility or credits; actual repository size today, file-type distribution and growth rate; existing paid SaaS subscriptions; credential management and device backup configuration; whether any Codex connector is authenticated; the contents and calibration of the four hook scripts referenced by `.codex/hooks.json` but absent from the packet; the contents of `content-work-orders.json`, `run-queue.json`, `ACTIVE-WORK.md`, `LESSONS-ACTIVE.md` and `engine/LEDGER.md`.
