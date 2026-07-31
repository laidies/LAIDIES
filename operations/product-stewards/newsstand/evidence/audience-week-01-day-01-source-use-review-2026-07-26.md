# Audience Week 01 Day 01 — NewsStand source-use review

**Product/system ID:** `newsstand`  
**Owner task ID:** `019f9f74-6821-70d2-81bb-02485922386a`  
**Control Room trigger task:** `019f9ac4-28d9-73b2-b54e-2fc5641749f2`  
**Status:** `REPORT READY` — bounded independent source-use judgment complete; the
campaign and all five Day 01 objects remain `HOLD` for their separate gates.  
**Evidence time:** `2026-07-26T12:16:10-07:00` (`America/Vancouver`)  
**Exact action:** Compared every Day 01 manifest object and referenced production
asset with the admitted Issue 02 source/canon and the checksum-bound Weekly
Episodes route receipt. Judged source fidelity and read/listen promise truth
only. No campaign object, public route, canonical publication record, or
publication state was edited.

## Bounded result

| Object | Exact manifest-object SHA-256 | Referenced-asset-set receipt SHA-256 | Source-use verdict | Read/listen boundary |
|---|---|---|---|---|
| `W01-D1-01` | `b87f4b25fb44c37d7c83ecb23a5152146658c4e307a2b64212671c7abdfd5fe0` | `27a373ee42e4b9ae4150a651cd2eeaee4c283a8efc8f48da9e9a506b5b4e363d` (6 files) | **HOLD** | **ACCEPT** — no click is required and no listen/watch promise is made. |
| `W01-D1-02` | `3edf0df4da617d34249344063400e34dffdb2772e80d41d597f6c0459fafff9d` | `42de32202c42a5f2062cebe265f50f88d96b29f4b6c500dc71b13798f4426722` (15 files) | **ACCEPT** | **ACCEPT** — no click is required and no listen/watch promise is made. |
| `W01-D1-03` | `a812e5d806ef67d914031b2ef01bd20b046372dcbbd0d8e7358a051b2261f951` | `fee444256640ec592bf4a25f776e485714d2dd861d962597a31918b682c8ca25` (15 files) | **HOLD** | **ACCEPT** — no click is required and no listen/watch promise is made. |
| `W01-D1-04` | `e8648d1dcee611ea1d34e810b4c7efb96ca88cbc6316fae0059a704549436d8c` | `0580db74100a5e5018402453e6fb26f264b5b0ce670f1ea605a93f6852bad8f7` (4 files) | **ACCEPT** | **ACCEPT** — no click is required and no listen/watch promise is made. |
| `W01-D1-05` | `5b26912c290d43c5af291bcf6d0d7d43ffff4ac5a011393c9b6d6422432749c5` | `ea5683e75a44fcf26df33bfe9577f6a6fe3e2ddf43bce791b3f4d6777da5c769` (4 files) | **HOLD** | **ACCEPT** — copy promises the admitted read route only; it does not offer or imply listen/watch. |

These verdicts apply only to the exact hashes above. `ACCEPT` means the object
uses the admitted Issue 02 lesson without adding an unsupported content or
modality promise. It does **not** make an object ready, approved, published,
deployed, or publicly verified.

### Receipt construction

- Manifest-object SHA-256 is over the UTF-8 bytes of `JSON.stringify(unit)` for
  the parsed unit in
  `operations/product-stewards/audience-growth/campaigns/week-01/seven-day-content-board.json`.
  This binds every field in the unit, including alternate hooks, captions,
  accessibility copy, status, and destination boundary.
- Referenced-asset-set receipt SHA-256 is over newline-terminated, path-sorted
  lines in the exact form `<asset-sha256><two spaces><repository-relative-path>`.
  It includes the declared source art and all existing Instagram, Story,
  carousel, motion, caption, LinkedIn, document, and document-page assets
  referenced by that unit.
- Any object or asset change invalidates the applicable verdict and triggers
  NewsStand re-review.

## Exact corrections required

### `W01-D1-01` — HOLD

Observed public-facing/supporting line:

> Specificity—not secret syntax—is what turns a generic draft into something
> you can use.

The admitted source says the specific prompt has “a much better chance” of
producing usable output (`content/issues/issue-02.md:66`) and separately warns
that judgment and verification still matter (`:72`). “Is what turns” changes
that qualified relationship into a result guarantee and conflicts with the
object's own no-guarantee guardrail.

**Required replacement everywhere the line is encoded:**

> Specificity—not secret syntax—gives AI a better chance of producing something
> you can use.

Regenerate the manifest payoff, alt/accessibility copy, Instagram and LinkedIn
supporting text, Story, VTT, and motion render from that exact sentence. The
remaining Spice Girls, café, fold-in-the-cheese, smart-new-hire, delegation,
audience, context, tone, constraints, success, and exclusion language is
supported by Issue 02 source/canon.

### `W01-D1-03` — HOLD

Observed alternate hook in the manifest, carousel, LinkedIn document, and
accessibility text:

> Seven lines between beige output and a usable first pass.

This again reads as a guaranteed transition, while the admitted lesson claims a
better chance, not a guaranteed usable output.

**Required replacement everywhere the alternate hook is encoded:**

> Seven briefing lines. A better chance at a usable first pass.

The seven-part checklist itself is supported as a compact derivation of the
source/canon's audience, need/goal, context, tone, constraints, length, and
exclusion questions. “Why now?” is accepted as bounded context, not a new
performance claim. Retain the low-risk and confidential-information limits.

### `W01-D1-05` — HOLD

Observed public-facing/supporting line:

> The visitor gets the complete approved Issue 02 lesson and a concrete
> before/after prompt.

“Approved” overstates the object's authority while the campaign object,
NewsStand exact-use, Brand/rights, channel, Control Room, and Ali gates are
explicitly held. The read route is admitted; the campaign object is not
approved.

**Required replacement everywhere the payoff is encoded:**

> The visitor gets the Issue 02 lesson and a concrete before/after prompt.

The remaining “read,” “full lesson,” vague/better version, and low-risk task
language matches the admitted read route. Do not add `listen`, `watch`, `play`,
`full episode`, or equivalent modality language: the receipt records cover-only
audio and holds Listen.

## Accepted objects

- `W01-D1-02`: **ACCEPT.** The smart-new-hire frame, hidden-context problem,
  no-secret-formula distinction, and audience/goal/context/tone/constraints/
  length/exclusion checklist are supported by the source and canon.
  “Office politics” is an editorial example of context the tool cannot see,
  not a claim that the source tested a performance effect. Brand/Ali voice
  review remains separate.
- `W01-D1-04`: **ACCEPT.** It asks a bounded poll about which briefing input
  disappears under time pressure, preserves the private-example prohibition,
  and makes no causal-performance or destination-modality claim.

## Source, canon, admission, and route binding

| Evidence | SHA-256 | Observed result |
|---|---|---|
| `content/issues/issue-02.md` | `8cd4f03a014dea5566745fb77bdc6b9cdd22584c6fbdbb1ace448cfaa7f7d573` | Exact admitted Issue 02 source: prompting as delegation; task, audience, context, tone, constraints, definition of good; qualified “better chance”; verification limit. |
| `content/episodes/episode-02.canon.md` | `2d12da290084e0eb2f556d428d434064f8da298e372d7e0fe7bd2535f5b70952` | Canon supports the smart-new-hire, coffee, Spice Girls, David Rose/fold-in-the-cheese, vague/specific comparison, and contextual briefing frames. |
| `issues/issue-02.html` | `f9641c4f32b1c21d1616bef9308cdbe80afb1ebbed6a9ead5ac82ce5c0c5565d` | Local route bytes match the route hash recorded by Weekly Episodes. This review did not perform a new public-origin request. |
| `operations/product-stewards/episode-experience/audience-campaign-issue-route-admission-2026-07-26.md` | `241381d47d17fef011260007657f6b414cd13cfcec5cebddfb52df1af1a08a9c` | Receipt admits exact Issue 01–04 read routes; records Issue 02 source checksum and truthful held cover-only Listen state. Receipt evidence time: `2026-07-26T11:48:54-07:00`. |
| `operations/product-stewards/episode-experience/evidence/audience-week-01-issue-route-admission-2026-07-26.json` | `50edb84df1cb5d8133c0a41722024fd6a7b44a142f6775d6c2edc0b9fa258eb5` | Machine receipt agrees with the human receipt and binds the Issue 02 source/route hashes. |
| Day 01 decision batch | `76d59212031a9b1958a2d76e563a5c0ecc81baa5592bdfbd0d96c4e6cf8e22b2` | Five Day 01 objects, all intentionally sourced to Issue 02. |
| Week 01 campaign admission | `79a7b53bdea2306a00563300abde45eb5c51a19a83e2d3aa492a55dedc7130fb` | Campaign remains `HOLD`; source and route admission are not campaign publication authority. |
| Week 01 machine board | `8eba623a6ca6c0fe64cbb0daaf72da0814cd12984666aa8df7f51189f723e939` | Exact 35-object board containing the five reviewed Day 01 units. |
| Audience Control Room handoff | `e5c8ec352e1a5ce86b184b52aaf524357f4cd233a57880cb8759aa104ef88a61` | Reports 35 built locally, zero ready, zero published, with NewsStand source-use review outstanding at handoff time. |

## Tests and inspection

- `node operations/product-stewards/audience-growth/campaigns/week-01/verify-week-01.mjs`
  → `WEEK 01 VERIFICATION PASS`; `units=35`, `hooks=105`,
  `plannedToday=5`, `rollingBuilt=35`, `ready=0`, `published=0`.
- `node scripts/check-product-stewards.mjs --owner-entry newsstand`
  → `PRODUCT STEWARD SYSTEM PASS`; `owner_entry_product=newsstand:PASS`.
- Visually inspected the Day 01 Instagram/LinkedIn contact sheet and the exact
  carousel/document-page assets for `W01-D1-02` and `W01-D1-03`.
- Rendered and text-inspected both five-page LinkedIn PDFs. Their page text
  matches the manifest; `W01-D1-03` PDF page 3 contains the held guarantee.
- Inspected the exact `W01-D1-01` VTT; it contains the held guarantee and the
  explicit factual-accuracy limit.

## Remaining gates and dependencies

1. **Audience & Growth maker:** apply only the exact three correction sets,
   regenerate every affected derivative, and return a new object/asset hash
   receipt.
2. **NewsStand acceptance owner:** independently re-review the three repaired
   objects. The accepted objects need re-review only if their bytes change.
3. **Brand/rights:** judge Spice Girls, David Rose, and other pop-culture exact
   uses plus the complete visual set. This source-use review grants no rights
   clearance.
4. **Ali:** exact public voice/creative approval remains required by the
   campaign records; no decision is requested until all independent gates are
   ready.
5. **Control Room/campaign owner:** integrate all acceptance receipts and keep
   `ready=0`, `published=0` until the complete campaign gate passes.
6. **Channel/accessibility/measurement/release owners:** human accessibility,
   account-specific channel checks, truthful analytics, publishing authority,
   deployed-byte binding, rollback, and public-origin verification remain open.

**Acceptance owner:** NewsStand owns the source/read-listen re-review; Brand and
rights own creative/rights admission; Audience & Growth owns repair bytes;
Control Room owns integrated campaign admission; Ali retains exact public
creative approval.

**Next trigger:** a checksum-bound repaired `W01-D1-01`, `W01-D1-03`, or
`W01-D1-05` object/asset set, or any change to the admitted Issue 02 source,
canon, route, or Weekly Episodes receipt.

## Proactive improvement and learning scan

**Proactive improvement result:** Added a deterministic per-object binding that
joins manifest semantics to every referenced derivative, and separated three
independent truths in the verdict: source fidelity, modality boundary, and
campaign/publication authority. This exposed two qualified-claim drifts and one
authority-word drift that a path-only source check would miss. No campaign file
was changed.

**Reusable prevention rule candidate:** A social/editorial source-use gate must
hash both the complete manifest object and every rendered derivative; compare
qualified source language against visible copy; and reject status words such as
“approved” when they can be read as campaign/publication authority.

This qualifies as a reusable learning candidate, but the task's explicit
dossier-only write scope barred editing the shared
`operations/painpoints-log.md`. Control Room may promote the rule there under a
separate shared-record lock. Possible public Behind the Build angle: “How three
small words—turns, between, approved—changed an honest content gate.”

## Control Room authority and change truth

- **Observed:** two objects pass this bounded source-use gate; three require the
  exact repairs above; all five preserve truthful read/listen boundaries.
- **Inference/unevaluated:** likely audience performance, channel performance,
  visual quality beyond source-language inspection, rights clearance, human
  comprehension, and campaign readiness.
- **Changed file:** this dossier-local evidence record only.
- **Services changed:** none.
- **Integration lock:** no public/shared integration lock was held or used.
  Work stayed within the Control Room-assigned NewsStand
  dossier/evidence-only scope.
- **Dependencies consumed:** Audience Week 01 board/batch/admission records,
  Issue 02 source/canon, and Weekly Episodes route receipts.
- **Downstream affected:** Audience & Growth, Brand/rights, Control Room,
  channel/accessibility/measurement/release owners, and Ali's later exact-use
  gate.
- **Public authority used:** no.
- **Deploy authority used:** no.
- **Spend authority used:** no.
- **Ali approval authority used or implied:** no.
- **Public truth:** the existing Issue 02 route has a checksum-bound
  `2026-07-26T11:48:54-07:00` public receipt, but this review made no fresh
  public request and did not publish or verify any Day 01 object publicly.
- **Owner activity after handoff:** bounded review complete; durable NewsStand
  ownership returns to `IDLE` until the next listed trigger. It is not
  `RUNNING`.
