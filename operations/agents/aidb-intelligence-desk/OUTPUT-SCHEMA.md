# Daily output schema

```md
# AIDB Intelligence Desk — YYYY-MM-DD

**Source:** AIDB | Ethan Mollick / One Useful Thing
**Item:** [title](canonical URL)
**Item date:** YYYY-MM-DD
**Processed:** timestamp with timezone
**Result:** ACTIONABLE | WATCH | QUIET | SOURCE UNAVAILABLE | HOLD — SOURCE REVIEW INCOMPLETE

## Source read

- Scout reported:
- Scout's interpretation:
- Material idea/timestamp IDs:
- Cross-source overlap:

## Claim-level verification

For every changeable or consequential claim:

| Claim | Scout source/date | Official/primary source | Checked | Establishes | Limits/conflict | Freshness trigger | Status |
|---|---|---|---|---|---|---|---|

Use `VERIFIED`, `PARTIALLY VERIFIED`, `CONFLICT`, or
`HOLD — VERIFICATION INCOMPLETE`. A source being trusted does not replace this
check.

## AIDB reference trail

For every material named source or attribution:

| AIDB idea/timestamp | Named reference | Exact original item | Date | Provenance status | Distinct contribution | Provider/primary cross-check | Follow-up |
|---|---|---|---|---|---|---|---|

Use `RESOLVED`, `PARTIALLY RESOLVED`, or `UNRESOLVED`. An attribution without
an exact original item is not resolved. Preserve the chain from AIDB to the
original item, and keep scout interpretation separate from source fact.

## 1. LAiDIES operations

**Verdict:** CHANGE | TEST | WATCH | NO CHANGE
**Affected surface:** Codex | ChatGPT | model routing | prompts | context |
automation | tools | privacy/safety | other

- Current LAiDIES behavior:
- Proposed change or test:
- Official/primary verification:
- Evidence still needed:
- Cost/risk/rollback:
- Owner and next action:

## 2. LAiDIES content

For each candidate:

- Working concept:
- Reader/learner problem:
- Distinct job:
- Route: NewsStand | living guide/book | class | weekly episode | Study Pack |
  tool/game | social | Behind the Build | link/update/decline
- Existing treatment/duplication check:
- What is timely vs durable:
- Source and fact-check needs:
- Status and receiving owner:

## NewsStand interaction

**Signal:** HANDOFF | UPDATE EXISTING | WATCH | NO HANDOFF

- Story identity / existing radar row:
- What changed now:
- Why a reader decision may have changed:
- Exact original and primary sources:
- Claim/evidence identifiers safe to reuse after recheck:
- What remains unresolved:
- Suggested dated job (non-binding):
- Distinct durable learning job:
- Duplication check:
- Handoff path or reason no handoff:

NewsStand owns qualification, edition selection, editorial framing, its radar
state, and every publication decision. AIDB's signal is intake, not authority.

## Site refresh and missing-topic check

For each affected existing treatment or credible gap:

- Existing treatment / canonical path:
- Reader question:
- Triggering scout item and original/primary evidence:
- What is now stale, incomplete, contradicted, or newly important:
- Disposition: UPDATE EXISTING | ADD TOPIC | LINK | MERGE | REPLACE | REMOVE |
  WATCH | HOLD | NO CHANGE
- Exact claim/section affected:
- Current verification and freshness boundary:
- Public freshness state: CHECKED | UPDATED | REVIEW DUE | CORRECTED | RETIRED
- Public date and one-line “why”:
- Change-history entry required:
- Duplication search:
- Distinct reader job if `ADD TOPIC`:
- Receiving owner and smallest safe handoff:
- Register/handoff path:

## Claim freshness signal

Include when the daily scout or due-site check changes, contradicts or
materially qualifies a registered claim, or reveals a material unregistered
claim candidate.

- Signal ID: `SIG-AIDB-YYYY-MM-DD-[slug]`
- Existing claim ID(s), if known:
- Unmatched affected entity/question, if no claim exists:
- Exact old claim/wording:
- Exact new evidence and date:
- Applicability: product/model/version/surface/plan/region:
- Severity: LOW | MATERIAL | HIGH | HARD_HOLD
- Recommended owner disposition: NO CHANGE | WATCH | CURRENT NOTE | UPDATE |
  HOLD | RE-RECORD / REFILM
- Source handoff path:
- Receiving owner: Learning System & Concepts

The durable signal is added through the Learning System freshness inbox/owner
handoff. AIDB remains a scout: it cannot edit `claim-register.json`, accept its
own signal or mark downstream consumers corrected.

`ADD TOPIC` requires a real unanswered reader problem, current evidence, a
distinct job, a completed duplication search and a receiving-owner decision.
The desk never equates “AIDB discussed it” with “LAiDIES needs a page.”

When practical guidance touches an episode, also record:

- Canonical episode and propagation checklist:
- Durable beginner foundation:
- Exact time-sensitive or surface-specific wording:
- Episode freshness disposition: FOUNDATION CURRENT | CURRENT NOTE |
  DERIVATIVE UPDATE | RE-RECORD / REFILM | NO CHANGE
- Living practice/reference changes:
- Progression bridge to current practice:
- Public note sufficient: yes | no, with evidence
- Recorded media change required: yes | no, with evidence

## Optional latest tip

Include this section only when the edition contains one evidence-backed,
immediately testable move that earns a distinct compact treatment.

- Card label:
- One memorable move:
- Why it helps:
- Try it today:
- Source/date line:
- Claim-level verification status:
- Official/primary source links and dates:
- Evidence boundary and freshness trigger:
- Existing-treatment check:
- Status and receiving owner:

The card is a private candidate. Do not add share controls, publish it, or
adapt it for a channel until the receiving owner accepts the treatment.
Never label a card `LATEST` or `CURRENT` when any material changeable claim is
held, stale, version-ambiguous, or supported only by the scout.

## Optional New Model, New Manners format assessment

Include only when a meaningful model release or material behavior change earns
a distinct public learning treatment.

- Edition and model/version:
- Learner promise:
- What changed from the previous model:
- What old habit now hurts:
- Five moves worth practising:
- Provider documentation and dates:
- Original practitioners/research AIDB referenced:
- LAiDIES test and result:
- Chat/API/coding-agent/product-plan boundaries:
- Exercises and acceptance check:
- What remains current in the living Model Wardrobe:
- Format candidates and distinct jobs:
- Recommended smallest useful treatment:
- Freshness/retest trigger:
- Duplication check:
- Status and receiving owner:

Use `RESEARCH`, `FORMAT TEST`, `TREATMENT CANDIDATE`, `ACCEPTED`, or `RETIRED`.
A model announcement alone does not earn a treatment.

## Quiet result

State why no change or no content is the correct result. Do not fill a quota.
For AIDB, include the website/podcast reconciliation inventory and selector
result defined in the NewsStand daily runbook. An observed release with missing
full-content review, an unenumerated channel or an observed URL missing from
intake is HOLD, not QUIET. Preserve `pendingEditions` and `coverageGaps` even
when other complete editions or independent stories are actionable. Neither a
complete old ledger nor a source's current masthead proves there is no new work.

## Learning scan

Record a qualifying prevention rule or reusable success in the canonical
painpoints log, or state `no qualifying learning`.
```
