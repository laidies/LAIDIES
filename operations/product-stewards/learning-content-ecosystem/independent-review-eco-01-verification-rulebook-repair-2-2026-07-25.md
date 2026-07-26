# ECO-01 third independent review — Verification Rulebook repair 2

**Review date:** 2026-07-25  
**Reviewer:** independent ECO-01 acceptance judge; not the maker or repair author  
**Disposition:** **HOLD — EXPERT GATES NOT ALL PASSED**  
**Scope:** exact repair-2 canonical source, generated claim ledger, evaluation
suite, renderer, rendered HOLD artifact, deterministic tests, fresh independent
local Chrome matrix and rendered screenshots

The two P0 defects from the previous review are repaired. A different rendered
accessibility and visual defect is independently reproduced in the core
source-bound prompt section, so product, brand and accessibility expert gates
remain below their floors. This review does not publish, deploy or approve the
Rulebook.

## Exact candidate reviewed

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claim ledger | `f391a6357806e4992e091e2e07ba52d2b5ba818f728ad1cffba1b977c0e4623e` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered HOLD candidate | `e679a0f11c571a8774978fde57e989ce0404edc18ebc5a36137f07a0093044a3` |
| Renderer | `265ef6040b68266323e49e222b87d5577a5a0201520ee9e9bee587eca0df6e58` |
| Contract test | `36a46aae9ac4411d82401b9d0da8a764a4ae02ea02f57cacf70e5bbb80eecdd6` |
| Browser matrix test | `21d22dc8a56f131d9b4560edc72c5347320249c43fbd2f979888197633ea3614` |
| Source-version monitor | `c2aa72144b9b34234e7f1f1bcc10d8f3349e6fc511d2b35afa8ccdf8458b28bc` |

The hashes matched before and after this review. The rendered artifact remains
visibly HOLD/noindex, and the Library and Miss Jeeves contracts remain
preview-only.

## Expert-gate scores

| Gate | Score | Floor | Verdict |
| --- | ---: | ---: | --- |
| Product/content quality | **16/20** | 17/20 | **FAIL** |
| Accuracy, safety and trust | **18/20** | 17/20 | **PASS** |
| Positive LAiDIES brand contribution | **16/20** | 17/20 | **FAIL** |
| Exact claim/source binding | **19/20** | complete, direct and current | **PASS** |
| Local Chrome accessibility/UX | **14/20** | no material expert defect | **FAIL** |

The instructional product is now coherent and honest about what it can assess.
Its factual/source system passes this expert review. The core practical prompt
section is nevertheless visibly unreadable in material places because shared
site CSS overrides its intended foreground colours. That is a product defect,
an accessibility failure and a negative brand-quality signal; the successful
overflow and interaction checks cannot compensate for it.

## Previous P0 1 — reasoning-state repair passes

### No free-text or nonsense path emits a semantic pass

The rendered candidate no longer contains `Reasoning check passed` or a
user-result state of `correct`. Internal `data-correct` attributes remain only
as bounded answer keys for radio controls; they are not emitted as a judgment
of prose or understanding.

The user-visible result states are now:

- `keyed-match`: selected controls match a model key, explicitly described as
  not independent understanding;
- `review`: a required field or keyed selection needs attention;
- `self-check-ready`: required prose exists but is explicitly not
  semantically scored; and
- `recorded`: the learner completed a reflection record, explicitly not an
  independent correctness score.

I independently submitted length-valid `purple toaster` nonsense with the
keyed choices in Chapter 4, Chapter 5, Chapter 6 and the closing transfer.
Every path returned `self-check-ready`, stated that the writing was not
semantically scored, revealed the comparison rubric, and emitted neither
“passed” nor “correct.”

### Structured evidence work and truthful self-check pass

The repaired forms now capture the required jobs:

- Chapter 4: diagnostic source choice, written reason and exact evidence
  action;
- Chapter 5: three separate evidence verdicts, written claim/source reasoning
  and next evidence or revision action;
- Chapter 6: separate freshness and provenance verdicts, evidence-gap
  reasoning and evidence actions for both;
- transfer: split claims, separate price and speed verdicts, exact evidence
  actions and remaining scope/freshness/method limitations.

Each relevant form reveals a visible four-part comparison rubric for claim,
evidence, limitation and action. All four `Met`, `Revise` or `Unsure` choices
are required before “Self-check recorded,” and the resulting message says the
record is reflection evidence rather than an independent correctness score.

The independently rendered 430-pixel rubric showed the model dimensions,
select controls and truthful status language without clipping. Its long
vertical footprint is acceptable for a practice form and remains preferable
to a false automatic score.

## Previous P0 2 — C2PA binding repair passes

The reader-visible `SRC-C2PA-2-4.url` now points directly to:

`https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html`

That exact official document is C2PA Specifications 2.4 and contains the named
§§1.2, 1.3 and 2.3. It supports tamper-evident provenance/history and expressly
limits the system from making “good” or “bad” value judgments about provenance
data.

The separate currentness monitor retains:

`https://spec.c2pa.org/specifications/specifications/2.4/index.html`

The evidence-bearing specification and version-monitor index are now correctly
modelled as different source objects. The 2.2 → 2.4 history, live 2.4 check and
synthetic future-2.5 rejection all pass.

## All other previously repaired gates

- **Exact wording/source binding:** all 14 canonical claim wordings, IDs,
  qualifications, correction routes and source IDs are rendered from one
  canonical record.
- **Interaction architecture:** the locked 8/5/3 practice quantities,
  three-source comparison, three-row claim table, dual freshness/provenance
  cases, three stakes choices and structured transfer are present.
- **Evaluation taxonomy:** all 18 cases use the four canonical evidence
  verdicts and separate qualification from required action. E08, E18 and the
  official-but-limited primary-source trap retain their repaired semantics.
- **Lateral reading:** `VR-C006` remains bound to Digital Inquiry Group's
  entailing Intro to Lateral Reading lesson.
- **Accuracy boundaries:** grounding, citation and provenance remain useful
  inputs rather than truth guarantees; current AI search/retrieval abilities
  are not taught as hypothetical future abilities; high-stakes decisions
  retain stop/escalate boundaries.
- **Source-level accessibility repairs:** sticky-anchor scroll margin,
  in-place polite/atomic status regions, no feedback focus theft, native
  constraints, reduced-motion handling and copy fallback remain present.

## Fresh independent Playwright review

I installed Playwright 1.58.2 only in an isolated temporary directory and used
the locally installed Google Chrome executable against a temporary local HTTP
server. No repository dependency, maker file, persistent browser evidence or
public service was changed.

The fresh matrix passed the same 20 checks:

- 320, 390, 430 and 1440 CSS-pixel widths had one `h1`, a visible HOLD notice
  and no page-level horizontal overflow;
- CSS `zoom: 2` at a 720-pixel viewport had no page-level horizontal overflow;
- the desktop Receipt Loop anchor landed below the sticky top bar;
- reduced motion produced `scroll-behavior: auto`;
- keyboard submission worked for the Chapter 4 comparison;
- nonsense remained `self-check-ready`;
- the four-dimension rubric was present and recordable;
- the live region updated in place without focus theft;
- clipboard plus `execCommand` failure selected the prompt and announced the
  manual-copy recovery; and
- a keyboard-focused button showed a 3-pixel outline.

All six independently produced viewport/interaction PNGs were byte-for-byte
identical to the persistent maker screenshot set:

| Screenshot | SHA-256 |
| --- | --- |
| 320 px | `1c08cb9c14f43b66711b08a17598f37a792ad846fd0b982771c6c47bf0e8da10` |
| 390 px | `52ca47501781049ef2d96f26c3b5e4c9fc77b9f201bfbecbe8323998641d4895` |
| 430 px | `cdf5132c3c6827afd9b7165299e3f609351e0f93315ce420236a3feda3ad02f4` |
| 1440 px | `6199a648981f84d55b50a7091ecb50d4950358c891263753679066114b53ea4a` |
| CSS 200% equivalent | `b17494f7f2b1be54c823bcb2d787a8899d59c57a6fca0189ccfe3201b4dcddf4` |
| Mobile interaction | `e4d23d0bf73f95fc495da45fbd9f9adbdcaee256ed68b2c076340709af5aa592` |

The 320/390/430/1440 opening captures are clean, readable, unclipped and
consistent with the LAiDIES palette. The zoom-equivalent capture wraps the
navigation and large title without horizontal page overflow. The rubric itself
is visibly structured and usable at 430 pixels.

## New blocking defect — the core prompt panel fails rendered contrast

The mobile interaction screenshot shows the source-bound prompt heading,
introductory explanation, copy-failure status and critical warning as dark
plum/muted text on a dark purple background. This is not a screenshot anomaly.
Fresh computed-style inspection reproduced:

| Element | Rendered foreground | Background | Contrast |
| --- | --- | --- | ---: |
| “The source-bound prompt” heading | `rgb(63, 23, 55)` | `rgb(39, 22, 46)` | **1.12:1** |
| Introductory paragraph | `rgb(95, 69, 88)` | `rgb(39, 22, 46)` | **2.00:1** |
| Copy-failure status | `rgb(95, 69, 88)` | `rgb(39, 22, 46)` | **2.00:1** |
| “Now open the source yourself” warning | `rgb(95, 69, 88)` | `rgb(39, 22, 46)` | **2.00:1** |

The large heading fails the 3:1 large-text threshold. The ordinary text fails
the 4.5:1 normal-text threshold. The white prompt textarea and copy button are
readable, but the context that explains the prompt's limits and the warning
that prevents false trust are not.

### Cause

The candidate declares `.vr-prompt h2,.vr-prompt p{color:#fff}` and intends a
yellow warning. Later shared site rules use `!important` to force all headings
to plum and running paragraphs/list items to muted plum. An earlier-loaded
`!important` declaration still outranks a later non-important declaration, so
the candidate's scoped colours lose in the real cascade. The existing browser
harness tests visibility and overflow but not computed contrast.

### Smallest safe repair

Use narrowly scoped direct-child overrides that can win the shared important
rules without turning text inside the light evidence card white:

- `.vr-prompt > h2` → white;
- `.vr-prompt > p` → white;
- `.vr-prompt > .vr-warning` → the intended pale yellow; and
- retain explicit dark text/link colours inside `.vr-prompt .vr-claim`.

Because the shared rules are `!important`, the local direct-child foreground
rules also need a deliberate scoped `!important` or the page must stop loading
the conflicting global typography rules. Do not apply
`.vr-prompt p{color:#fff!important}` broadly: that would make evidence-card
paragraphs white on their light card.

Add a rendered regression that calculates contrast for the heading, intro,
copy status, warning and evidence-card text in the actual combined stylesheet.
The regression must inspect computed styles; checking that the intended colour
string exists in the renderer would repeat this failure.

## Browser and study limits

- Chrome ran headlessly, not as a headed visual-approval session.
- The 200% check used CSS `zoom: 2`; it is a useful reflow/overflow equivalent,
  not native browser zoom or operating-system magnification.
- DOM inspection proved focus state and live-region attributes/text, not what
  an assistive technology announces.
- Safari and VoiceOver were not run. No Safari, VoiceOver, screen-reader or
  WCAG-conformance claim is made.
- The required eight-newcomer study has not run. No claim about learner
  explanation, application or transfer follows from expert inspection.

Safari/VoiceOver and the newcomer study remain separate gates even after the
rendered contrast defect is repaired.

## Verification run

```text
node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD
  source_sha256=ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd

node scripts/check-eco01-source-versions.mjs
  ECO-01 SOURCE VERSION PASS: C2PA 2.4

fresh isolated Playwright 1.58.2 + local Google Chrome
  ECO-01 BROWSER MATRIX PASS: 20 checks

node scripts/check-inline-js.js
  PASS — 353 scripts / 132 live pages

node scripts/check-local-links.js
  PASS — 1,943 references / 110 pages

node scripts/check-town.js
  PASS

node scripts/check-product-stewards.mjs
  PRODUCT STEWARD SYSTEM PASS
  products=65 active=3/3
```

## Acceptance sequence from here

1. Repair the real combined-stylesheet contrast without changing light
   evidence-card text to white.
2. Add computed-contrast assertions to the local browser harness.
3. Regenerate and rerun deterministic plus browser checks against new exact
   hashes and screenshots.
4. Independently recheck product, brand and accessibility expert floors.
5. Complete the separately required Safari/VoiceOver evidence.
6. Only after expert and assistive-technology gates pass, run the separate
   eight-newcomer study with the locked 7/8 floors.

Until those gates pass, the truthful state is **HOLD / FIX BEFORE LAUNCH**.

## Learning scan

This failure qualifies for the canonical pain-points ledger, but this bounded
judge lane was instructed to write only this review:

> A component's intended colour token is not rendered evidence. Shared
> `!important` rules can defeat a later, more local-looking declaration; visual
> and accessibility gates must inspect the computed cascade and contrast of the
> exact assembled page.

The foreground owner should reconcile that prevention rule into
`operations/painpoints-log.md` without overwriting unrelated concurrent work.
