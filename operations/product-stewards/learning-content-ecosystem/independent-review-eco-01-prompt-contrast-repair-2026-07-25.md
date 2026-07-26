# ECO-01 independent prompt-contrast repair review

**Review date:** 2026-07-25  
**Reviewer:** independent ECO-01 acceptance judge; not the maker or repair author  
**Disposition:** **HOLD / PREVIEW — SCREEN REPAIR PASSES; EXACT CANDIDATE STILL
FAILS PRINT CONTRAST**  
**Scope:** prompt-panel contrast repair, exact current candidate, fresh
independent 30-check local Chrome matrix and screenshots

The repaired screen panel now passes every requested contrast role and
preserves dark text inside its light evidence card. The repair is correctly
scoped and does not alter shared/global typography. The exact candidate still
fails its locked printable/offline contract: print media changes the panel to
white while the critical warning remains pale yellow at **1.28:1**. The
current 30-check harness does not exercise print media, so the expert
accessibility/product gate remains open.

No maker file, dependency, public service or Git state was changed by this
review.

## Exact candidate reviewed

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claim ledger | `f391a6357806e4992e091e2e07ba52d2b5ba818f728ad1cffba1b977c0e4623e` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered HOLD candidate | `b91c70caa7443dda06079ad7908e254ac0775e8c5912d32a4d55c71cd95fa439` |
| Renderer | `3889767b9e56df4ce3b86af711e158433247a4481a4bd750bc8756aba2aa1da7` |
| Contract test | `36a46aae9ac4411d82401b9d0da8a764a4ae02ea02f57cacf70e5bbb80eecdd6` |
| Browser matrix test | `9e22c6743215c20820070f7f5abce5f0b876ac5c5fd78e817b4bb07e7fcca067` |
| Source-version monitor | `c2aa72144b9b34234e7f1f1bcc10d8f3349e6fc511d2b35afa8ccdf8458b28bc` |

The hashes remained unchanged throughout the review.

## Reconciled expert scores

| Gate | Previous | Current | Floor | Verdict |
| --- | ---: | ---: | ---: | --- |
| Product/content quality | 16/20 | **16/20** | 17/20 | **FAIL** |
| Accuracy, safety and trust | 18/20 | **18/20** | 17/20 | **PASS** |
| Positive LAiDIES brand contribution | 16/20 | **16/20** | 17/20 | **FAIL** |
| Exact claim/source binding | 19/20 | **19/20** | complete/direct/current | **PASS** |
| Local Chrome accessibility/UX | 14/20 | **16/20** | no material expert defect | **FAIL** |

The screen repair materially improves the accessibility score. Product and
brand cannot clear their non-compensable floors while a deliberately supported
print/offline form renders its critical safety warning nearly invisible.
Accuracy and source binding are unaffected and retain their prior passes.

## Screen prompt-panel repair — pass

I independently triggered the clipboard-failure state and recomputed the
assembled page's actual foregrounds, nearest opaque backgrounds and contrast
ratios in local headless Google Chrome.

| Screen role | Foreground | Background | Ratio | Required | Result |
| --- | --- | --- | ---: | ---: | --- |
| Heading | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | **16.93:1** | 3:1 | PASS |
| Introductory copy | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | **16.93:1** | 4.5:1 | PASS |
| Prompt label | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | **16.93:1** | 4.5:1 | PASS |
| Prompt textarea | `rgb(33, 19, 39)` | `rgb(255, 255, 255)` | **17.69:1** | 4.5:1 | PASS |
| Copy button | `rgb(255, 255, 255)` | `rgb(123, 36, 75)` | **9.56:1** | 4.5:1 | PASS |
| Copy-failure status | `rgb(255, 255, 255)` | `rgb(39, 22, 46)` | **16.93:1** | 4.5:1 | PASS |
| Critical warning | `rgb(255, 224, 155)` | `rgb(39, 22, 46)` | **13.21:1** | 4.5:1 | PASS |
| Nested claim copy | `rgb(37, 22, 45)` | `rgb(242, 247, 255)` | **15.86:1** | 4.5:1 | PASS |
| Nested claim link | `rgb(22, 79, 145)` | `rgb(242, 247, 255)` | **7.62:1** | 4.5:1 | PASS |

Visual inspection confirms the screen result:

- heading, intro, label and copy-failure status are crisp white on purple;
- the safety warning is clearly distinguished in pale yellow;
- the textarea and copy button are legible;
- claim-card body text remains dark ink on the light blue card; and
- claim IDs, source links and correction links remain blue and readable.

The prior white-on-light-card regression did not occur.

## Scope and global-typography review — pass

The repair adds only these prompt-local rules:

- direct prompt `h2`, `p` and `label` foregrounds;
- the direct `.vr-warning` foreground;
- nested prompt claim-card paragraph restoration; and
- nested prompt claim-card link restoration.

The direct-child combinator prevents prompt-level white from reaching nested
claim-card paragraphs. Explicit claim-card restoration provides a second
guard. No selector targets a heading, paragraph, label or link outside
`.vr-prompt`.

`styles.css` and `content/grimoire.css` have no diff. Five fresh screenshots
that do not show the changed prompt state—320, 390, 430, 1440 and the CSS
200%-zoom equivalent—are byte-for-byte identical to their pre-repair
captures. The interaction screenshot changes only where the repaired prompt
state is visible. Together, selector scope, unchanged shared files and
unchanged opening pixels establish that global typography was not altered.

## Fresh independent 30-check matrix — pass within screen scope

I used the existing isolated Playwright 1.58.2 installation, the locally
installed Google Chrome executable, a new temporary local HTTP server and a
new temporary evidence directory. No maker evidence was overwritten.

The fresh matrix reports:

```text
ECO-01 BROWSER MATRIX PASS: 30 checks
```

It independently passes:

- 320/390/430/1440 structure, HOLD visibility and page overflow;
- CSS 200%-zoom-equivalent overflow;
- sticky-anchor clearance;
- reduced motion;
- keyboard submission and visible button focus;
- nonsense remaining `self-check-ready`;
- comparison-rubric reveal and truthful self-check;
- in-place polite/atomic live-region state without focus theft;
- clipboard failure and manual-selection recovery;
- all nine requested screen contrast roles; and
- dark nested claim-card foreground preservation.

All six fresh PNGs are byte-for-byte identical to the current persistent
evidence set:

| Screenshot | SHA-256 |
| --- | --- |
| 320 px | `1c08cb9c14f43b66711b08a17598f37a792ad846fd0b982771c6c47bf0e8da10` |
| 390 px | `52ca47501781049ef2d96f26c3b5e4c9fc77b9f201bfbecbe8323998641d4895` |
| 430 px | `cdf5132c3c6827afd9b7165299e3f609351e0f93315ce420236a3feda3ad02f4` |
| 1440 px | `6199a648981f84d55b50a7091ecb50d4950358c891263753679066114b53ea4a` |
| CSS 200% equivalent | `b17494f7f2b1be54c823bcb2d787a8899d59c57a6fca0189ccfe3201b4dcddf4` |
| Mobile interaction | `31f9a43d5ff118297ed2984953dbe9c41e05c0abff1e3a51d1df17388ef5b41c` |

The screen matrix is credible for the checks it contains. It is not a complete
candidate accessibility gate because it never changes the media type to
`print`.

## Remaining blocker — print makes the critical warning unreadable

The locked build packet requires that the printable/offline reference preserve
headings, source URLs, dates and correction information. The candidate also
deliberately includes `@media print`, so print is an intended product state,
not an invented edge case.

I independently emulated print media in the same local Chrome build and
rendered the complete prompt panel:

- `.vr-prompt` becomes white;
- heading, intro, label and status become black;
- nested claim text remains dark and readable;
- prompt textarea remains dark on white;
- the copy button is intentionally hidden; but
- `.vr-prompt > .vr-warning` remains pale yellow
  `rgb(255, 224, 155)` on white.

The warning's print contrast is **1.28:1**, far below 4.5:1. The actual print
render makes “Now open the source yourself. This prompt cannot certify the
source, the quote or the conclusion.” difficult to perceive.

### Cause

The screen warning rule is:

```css
.vr-prompt > .vr-warning {
  color: #ffe09b !important;
}
```

The later print rule sets `.vr-prompt > p` to black, but that selector is less
specific than `.vr-prompt > .vr-warning`. Both are important, so the more
specific pale-yellow declaration still wins in print.

### Smallest repair

Inside `@media print`, add a later selector with equal specificity:

```css
.vr-prompt > .vr-warning {
  color: #000 !important;
}
```

A suitably dark print-specific warning colour is also acceptable if its
computed white-background contrast passes. Then extend the Playwright harness:

1. `page.emulateMedia({ media: "print" })`;
2. assert the prompt background is the intended print background;
3. recompute heading, intro, label, textarea, warning and nested claim/link
   contrast; and
4. capture or render one print-panel/PDF inspection artifact.

The repair must preserve the already passing screen colours.

## Deterministic verification

```text
node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD
  source_sha256=ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd

node scripts/check-eco01-source-versions.mjs
  ECO-01 SOURCE VERSION PASS: C2PA 2.4

node scripts/check-inline-js.js
  PASS — 353 scripts / 132 live pages

node scripts/check-local-links.js
  PASS — 1,944 references / 110 pages

node scripts/check-town.js
  PASS

node scripts/check-product-stewards.mjs
  PRODUCT STEWARD SYSTEM PASS
  products=65 active=3/3
```

These checks preserve the earlier accepted reasoning, evaluation, claim
binding and source/currentness contracts. None currently detects the print
warning defect.

## Remaining gates after the print repair

Even after an independent print retest, the following remain separate:

- headed visual/owner review;
- current Safari behaviour;
- current VoiceOver/Safari and actual announcement evidence; and
- the separate eight-newcomer study with its locked 7/8 floors.

No Safari, VoiceOver, screen-reader, headed-browser, newcomer-transfer or full
WCAG-conformance claim is made here. The truthful state remains **HOLD /
PREVIEW**.

## Learning scan

This review extends the previous computed-cascade prevention rule:

> A scoped screen `!important` fix must be retested in every supported media
> state. A later print rule does not win when its selector is less specific,
> and the existence of `@media print` is not evidence that print is readable.

This bounded judge lane was instructed to write only this report. The
foreground owner should reconcile the prevention rule into
`operations/painpoints-log.md` without overwriting unrelated concurrent work.
