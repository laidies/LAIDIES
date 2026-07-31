# Field Notes from LAiDIES HQ: Behind the Build

**Status:** canonical product and operating direction; raw learning log exists;
cross-chat capture/publication pipeline is not yet automated  
**Internal source:** `operations/painpoints-log.md`  
**Preserved source snapshots:** `operations/archive/painpoints-log-*-premerge-2026-07-24.md`  
**Editorial queue:** `operations/behind-the-build-publication-queue.md`  
**Public working series:** **Field Notes from LAiDIES HQ: Behind the Build**  
**Principle:** LAiDIES should visibly practise what it teaches

## The credibility contract

LAiDIES cannot credibly teach people to:

- verify AI output;
- provide clear context and acceptance criteria;
- distinguish confident language from evidence;
- use current sources for changing facts;
- protect private/sensitive information;
- test an output before relying on it; or
- learn from failed attempts

while producing its own work without those disciplines.

The project itself should be a working demonstration of responsible,
high-quality AI collaboration. That does not mean pretending everything works
the first time. It means showing the difference between:

- a guess and a verified diagnosis;
- a draft and an approved source;
- local code and a working public journey;
- a vague instruction and a usable brief;
- an attractive analogy and an accurate mental model; and
- a failure that was merely patched and a failure that improved the system.

## Two outputs from meaningful work

When a task produces a useful learning, it creates two possible outputs:

1. **Internal prevention:** update the relevant prompt, rule, checklist, test,
   source-of-truth document or acceptance criterion so the failure is less
   likely to recur.
2. **Public teaching:** turn the verified lesson into something another smart,
   non-technical person can understand and use.

The public lesson is not a victory lap. It should say:

> Here is what I was trying to do. Here is where I went wrong. Here is what
> actually happened. Here is why. Here is what I changed—and what you can do
> differently next time.

## The tool-performance-layer pattern

For generative work, do not force one artifact to serve every audience:

```text
canonical human intent
        ↓
tool-facing workbench
        ↓
observed/rendered output
        ↓
review + reconciliation
        ↓
normalized public artifact
```

Examples:

- narration: readable master → TTS performance script → approved audio →
  as-recorded transcript → public transcript/captions;
- songs: canonical lyrics → performance lyrics → approved audio → as-recorded
  lyrics → public lyrics/captions; and
- images: approved source/brief → prompt/reference package → generated output →
  inspected/approved asset with accurate metadata and alt text.

The tool-facing workbench may contain phonetic spellings, delivery syntax,
reference roles or other machine-helpful instructions. Those are not
automatically appropriate for readers. Conversely, the canonical source cannot
prove what the tool actually produced. Reconciliation is the bridge.

## The capture loop

```text
build / write / research / publish
              ↓
notice friction, failure, surprise or useful success
              ↓
record the raw observation in the learning ledger
              ↓
separate evidence from diagnosis
              ↓
verify or reproduce the cause
              ↓
change the internal system
              ↓
extract the transferable lesson
              ↓
choose a public format—or keep it internal
              ↓
fact/privacy/voice review
              ↓
publish and link back to the underlying LAiDIES lesson
```

## What deserves an entry

Capture:

- a prompt that produced the wrong result and why;
- a prompt that materially improved the result and which part mattered;
- an AI answer that sounded correct but failed verification;
- a changing product fact that invalidated an old explanation;
- a tool/model limitation or surprising behaviour;
- a workflow that silently lost, duplicated or abandoned work;
- a frontend/backend/deployment mismatch;
- an image/video generation failure with a diagnosed prompt/reference cause;
- an accessibility, privacy or trust issue found during the real journey;
- an assumption that proved wrong;
- a successful pattern worth repeating;
- an important trade-off; or
- a human judgment AI could not responsibly make.

Do not fill the ledger with every typo or routine edit. The entry must change a
future decision, prompt, test or explanation.

## Internal entry contract

Keep the original required fields and add evidence/publication metadata:

```text
ID + date
category + ① Speak their language / ② Make them speak yours / both
source task/chat/artifact
Context
Issue
What happens
Example
Evidence observed
Diagnosis: verified | likely | unknown
Prevent / Fix
Why the fix works
New output
Transferable lesson
Internal rule/check updated
Public angle
Privacy/IP/reputation notes
publication status: RAW | DIAGNOSED | VERIFIED | PUBLISHABLE | PUBLISHED
published URLs/date
```

The distinction between evidence and diagnosis is mandatory. “It failed after
X” does not prove “X caused it.”

## Publication states

| State | Meaning |
|---|---|
| **RAW** | Something useful happened; cause may still be unclear |
| **DIAGNOSED** | Best explanation recorded with uncertainty |
| **VERIFIED** | Cause/fix reproduced, sourced or otherwise evidenced |
| **PUBLISHABLE** | Lesson is accurate, safe, useful and shaped for an audience |
| **PUBLISHED** | Public URL/date and derivative links recorded |
| **INTERNAL ONLY** | Useful operationally but private, unsafe or too project-specific to publish |

Never publish a RAW incident as a universal AI rule.

## Public story shape

Each piece should contain:

1. **The job:** what I was trying to accomplish.
2. **The first approach:** the instruction, assumption or workflow I used.
3. **The result:** what actually happened.
4. **The diagnosis:** the real reason, with uncertainty where needed.
5. **The better approach:** exactly what changed.
6. **Why it works:** the underlying AI/product mechanism.
7. **Try this:** a portable action the reader can use.
8. **Receipts:** sources, screenshots, tests or version/date where relevant.

The story can be funny. The mechanism cannot be fictional.

## Public formats

One verified entry can feed:

- a short **Field Notes from LAiDIES HQ: Behind the Build** post;
- a NewsStand behind-the-build article;
- an Instagram/LinkedIn carousel:
  `What I tried → what happened → why → the fix`;
- a short Reel/video with screen proof;
- a class card called **The One Mistake**;
- a before/after prompt card;
- a LIBRAiRY field note;
- a checklist or downloadable tip sheet;
- a podcast/episode aside when it advances that lesson;
- a quote/memory hook; or
- eventually, a community knowledge-base entry.

Not every entry becomes every format. Choose the smallest form that preserves
the useful mechanism.

## Relationship to existing Field Notes

`Field Notes from LAiDIES HQ` already covers founder life and the reality of
building in the margins. **Behind the Build** is its technical/operational
column:

- founder field note: where/how the work is happening;
- behind-the-build field note: what the work taught us about using AI well.

They can overlap when the moment naturally contains both.

## LAiDIES production integrity gate

Before LAiDIES publishes an AI lesson, tutorial, comparison, tip or
behind-the-build claim:

- [ ] The factual claims have named evidence.
- [ ] Changing tool/model/product information has an as-of date and was
      checked against primary/official sources where possible.
- [ ] Observation, inference and opinion are clearly separated.
- [ ] Prompts shown as good examples meet LAiDIES’ own briefing standard.
- [ ] A deliberately poor prompt is labelled and used to teach a specific
      failure.
- [ ] The result was tested; plausible-looking output is not the proof.
- [ ] The explanation includes meaningful limitations and does not overclaim.
- [ ] Private prompts, contacts, credentials, workplace information and
      unpublished personal material are removed or consented.
- [ ] Copyright/attribution and source quotation boundaries are respected.
- [ ] Public copy matches the actual implemented/deployed experience.
- [ ] The reader receives a practical action, not only a founder anecdote.
- [ ] A human has made the final editorial/taste judgment.

If LAiDIES discovers that a published claim was wrong, it corrects the public
piece, records what changed and turns the correction into a learning when
useful.

## Cross-chat operating rule

At the end of every material project task, Codex asks itself:

1. Did anything fail, surprise us or require a non-obvious correction?
2. Did we learn why?
3. Should a prompt/rule/test change?
4. Would the lesson help a LAiDIES reader?

If yes, Codex updates `operations/painpoints-log.md` in the same task. It does
not wait for Ali to request it.

Before similar work, Codex searches the canonical ledger by category/tool and
carries relevant prevention rules into the brief. Logging without reuse is not
a learning system.

## Current implementation truth — 2026-07-24

Present:

- `operations/painpoints-log.md` consolidates all 40 recovered records under
  stable IDs `BTB-001` through `BTB-040`; new learnings continue sequentially.
- Each migrated heading preserves its original source number or dated heading.
- Exact pre-merge copies and both source SHA-256 checksums are preserved in
  `operations/archive/` and recorded in the canonical ledger.
- Project memory records the earlier standing rule and intended public Behind
  the Scenes knowledge base.
- `docs/brand/founder-content-context.md` defines the existing Field Notes from
  LAiDIES HQ founder series.
- Individual handovers, research files and prompts contain many scattered
  lessons.

Gaps:

- Historic records default to RAW and do not yet all have consistent
  evidence/diagnosis/publication fields.
- No registry connects entries to changed prompts/checks and public
  derivatives.
- No public Behind the Build page exists.
- The first editorial queue and one PUBLISHABLE DRAFT exist; the queue is not
  automated and the draft is not Ali-approved or published.
- No correction/update process is wired.

## Completed foundations

1. Preserved both actual source logs and their checksums.
2. Consolidated them under stable IDs without losing original IDs or evidence
   paths.
3. Made the learning scan a standing workspace/repository Codex rule.
4. Added `build_learnings[]` to the weekly/canonical opportunity system.

## Next build order

1. Audit scattered handovers/research for additional recoverable entries with
   evidence.
2. Reverify and enrich the strongest historic RAW entries.
3. Run the image-generation validation plan during a qualifying production
   batch and turn only the supported findings into before/after teaching.
4. Continue converting the three current VERIFIED candidates into public
   drafts; one of three now has a complete first draft.
5. Review voice, privacy, sources and practical value.
6. Build the smallest public Behind the Build index only when real approved
   entries exist.
7. Let community contributions in only after consent, moderation, evidence and
   attribution rules exist.

## Definition of done

A meaningful project learning can:

1. be captured from any LAiDIES project chat;
2. preserve observation separately from diagnosis;
3. point to evidence and the exact task/artifact;
4. update a real internal rule, prompt or test;
5. be found before similar work begins;
6. become a useful, accurate public draft;
7. pass fact, privacy, IP, voice and practical-value review;
8. publish with a URL/date;
9. link back to the relevant episode/class/tool; and
10. be corrected transparently if later evidence changes it.
