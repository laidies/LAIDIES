# How to get good AI images — validation plan

**Status:** CAPTURED RESEARCH PLAN — NOT YET RUN  
**Why it exists:** LAiDIES has strong real-world observations about iterative
image editing, prompt load and reference selection, but some rules appear to
conflict. We will not turn a tool-specific experience into universal advice
until we isolate the variables.

## The public teaching opportunity

Working umbrella:

> **How to Get Good AI Images: What We Learned Making SUNNYVAiLE**

Possible modules:

1. **The AI Image Telephone Game** — why an edit-of-an-edit can drift.
2. **Your References Are Fighting in the Group Chat** — reference quantity,
   relevance and conflict.
3. **One Fitting Room, One Job** — how instruction load affects fidelity.
4. **Fresh Look or Alterations?** — when to generate new and when to edit an
   existing image.
5. **Keep the Receipts** — source files, prompts, dimensions, contact sheets
   and before/after evidence.

This could become a Field Notes series, a visual NewsStand guide, a School
class, prompt cards and short before/after social posts.

## Claims that need testing

### Claim A — iterative editing

**Observed:** Repeatedly editing the latest generated image sometimes produces
softness, mottling, identity drift, style drift or lower dimensions.

**Do not yet publish as:** “Every regeneration makes an image worse.”

That sentence collapses different operations:

- generating a fresh image from the same prompt;
- editing the original source again;
- editing the most recent edited output;
- resizing/compressing an output; and
- changing models or tool settings between passes.

The specific hypothesis is:

> A chained image-to-image workflow creates more opportunities for cumulative
> reinterpretation and quality loss than returning to the cleanest source.

### Claim B — too many references

**Observed:** Mixed or mismatched references can pull a result in competing
directions.

**Do not yet publish as:** “More references are always worse.”

Three mutually consistent references may help. Two references with conflicting
styles, identities, crops or jobs may hurt. The variables are likely:

- compatibility;
- relevance to the requested output;
- crop/scale;
- whether each reference has one named job;
- reference strength/weight, where supported;
- tool/model handling; and
- total number of competing instructions.

### Claim C — too many requested changes

**Observed:** Asking for a new character, outfit, pose, setting, lighting and
style in one pass can weaken fidelity to the reference.

There are two apparently conflicting working rules:

- change one variable at a time; and
- avoid long edit chains by making the required fixes from the clean source in
  as few passes as possible.

The likely distinction to test is:

- **diagnosis:** change one variable at a time so we can learn what caused the
  result;
- **production:** once the successful instructions are known, apply the
  coherent final changes to the cleanest source in one controlled pass.

### Claim D — fresh generation versus editing

Existing observations support both:

- edit/restyle a correct source when composition, identity or canon must remain
  fixed; and
- generate fresh when the old source’s style is the very thing we need to
  escape.

The useful rule may be based on **what must be preserved**, not a universal
“always edit” or “always generate fresh.”

## Controlled test matrix

Run tests using one named tool/model/version and record the date. Keep the
prompt, source, output dimensions and settings fixed except for the variable
being tested. Use at least three outputs per condition when the tool is
stochastic.

### Experiment 1 — chained edits versus clean-source edits

Start with one approved source and three clearly defined changes.

| Condition | Method |
|---|---|
| A — chain | Source → change 1 → edit result for change 2 → edit result for change 3 |
| B — clean cumulative | Return to the original source for each attempt; apply the known final change set in one pass |
| C — clean single | Return to the original source and request only one target change |
| D — fresh | Generate the scene from text plus the minimum required reference set |

Compare:

- requested-change accuracy;
- face/identity consistency;
- composition and canon retention;
- style retention;
- unintended changes;
- texture/noise/softness;
- actual pixel dimensions and file size; and
- blinded human preference.

### Experiment 2 — reference count versus reference conflict

Do not change number and compatibility at the same time.

| Condition | Reference set |
|---|---|
| A | One strong, scale-matched reference |
| B | Three mutually consistent, scale-matched references |
| C | Three consistent references with an explicit job assigned to each |
| D | Three mixed-style references with no role assignment |
| E | Three mixed-role references with explicit role boundaries |
| F | One scale-mismatched reference |

This distinguishes “too many” from “too conflicting,” “too vague” or “wrong
for the crop.”

### Experiment 3 — instruction load

Using the same clean source and reference set:

| Condition | Requested change |
|---|---|
| A | One variable |
| B | Two compatible variables |
| C | Four variables across subject, outfit, lighting and setting |
| D | Diagnose one variable per attempt, then apply the proven final set once to the clean source |

### Experiment 4 — what must be preserved

Run paired tasks:

1. Preserve composition/identity/canon; change only rendering style.
2. Preserve only the idea; replace composition and rendering style.

Compare fresh generation and image editing for each. This tests whether the
right choice depends on the preservation job.

## Evidence package

Every test produces:

- untouched source files;
- exact prompts;
- exact reference files and the declared job of each;
- tool/model/version/date;
- settings/seed where available;
- output dimensions and file sizes;
- side-by-side and zoomed before/after contact sheets;
- a scored comparison table;
- Ali’s blind preference before labels are revealed;
- observations separated from diagnosis; and
- the narrow claim the evidence actually supports.

## Publication gate

The image series cannot be called VERIFIED until:

- the result is reproduced or bounded honestly to the tested tool/workflow;
- before/after examples use the actual source and outputs;
- image dimensions are checked rather than inferred from filenames;
- prompt/reference differences are disclosed;
- contradictory examples are included;
- the advice says what conditions it applies to; and
- Ali approves which real project assets may be shown publicly.

## Return trigger

Run this plan during the next approved multi-image production batch that
already requires iterative edits or multiple references, or before publishing
any “how to get good AI images” advice—whichever comes first. Do not spend a
separate image-generation budget merely to manufacture examples if real
production can supply the evidence.
