# ECO-01 independent print-contrast repair review

**Review date:** 2026-07-25  
**Reviewer:** independent ECO-01 acceptance judge; not the maker or repair author  
**Local verdict:** **PASS — PRINT CONTRAST REPAIR ACCEPTED**  
**Product status:** **HOLD / PREVIEW — NON-LOCAL GATES REMAIN**  
**Scope:** exact print-contrast repair candidate, fresh isolated screen/print
Playwright matrix, computed contrast, screen/print screenshots, deterministic
integrity and shared-style regression

The equal-specificity print override fixes the exact defect from the preceding
review. The critical warning now renders black on white at 21:1 in print while
retaining pale yellow on dark purple at 13.21:1 on screen. Nested claim text
and links remain dark/blue on their light card in both media states. All local
expert gates now meet their floors.

This is not publication or whole-product release approval. Headed visual/owner,
Safari, VoiceOver and eight-newcomer evidence remain separate.

## Exact candidate reviewed

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claim ledger | `f391a6357806e4992e091e2e07ba52d2b5ba818f728ad1cffba1b977c0e4623e` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered HOLD candidate | `56488c210c93fa9f1e9db2ca2cffed4a4b24fb7beb906c9f2e87f4826cf9630b` |
| Renderer | `0fb483f37d4728ceca332f4b50ccc3374a3b864d09b04db63979cec3f3491520` |
| Contract test | `36a46aae9ac4411d82401b9d0da8a764a4ae02ea02f57cacf70e5bbb80eecdd6` |
| Browser matrix test | `58c4ed37527571a85ab17fcb3f743c0d9c0a7493e09e80e0bde6b73ee45c46ad` |
| Source-version monitor | `c2aa72144b9b34234e7f1f1bcc10d8f3349e6fc511d2b35afa8ccdf8458b28bc` |
| Persistent browser matrix | `5011be19597a7c48e0dc0fbd214d74156cf7da0bf8de1ab85f15313689dc5ed6` |
| Persistent print-panel PNG | `356412b3ff8e91fe00e91b2e2a0ca2c09e5d794d6a1725ba270c03fbf5398fb6` |

All candidate hashes matched the maker evidence and remained unchanged during
this review.

## Reconciled expert scores

| Gate | Prior | Current | Floor | Verdict |
| --- | ---: | ---: | ---: | --- |
| Product/content quality | 16/20 | **18/20** | 17/20 | **PASS** |
| Accuracy, safety and trust | 18/20 | **18/20** | 17/20 | **PASS** |
| Positive LAiDIES brand contribution | 16/20 | **17/20** | 17/20 | **PASS** |
| Exact claim/source binding | 19/20 | **19/20** | complete/direct/current | **PASS** |
| Local Chrome accessibility/UX | 16/20 | **18/20** | no material expert defect | **PASS** |

Product and accessibility recover because the supported screen and
print/offline prompt states now preserve the critical warning, source context
and claim card. Brand clears its local floor: screen presentation is
intentional and LAiDIES-consistent, while the print version is clean and
professional rather than carrying a visibly broken colour treatment. The
remaining owner/headed visual gate prevents this score from becoming owner
taste approval.

## Print repair — independently passed

The screen warning rule remains:

```css
.vr-prompt > .vr-warning {
  color: #ffe09b !important;
}
```

The later print rule now contains the same specific selector:

```css
@media print {
  .vr-prompt > .vr-warning {
    color: #000 !important;
  }
}
```

Equal specificity plus later print placement makes the black print foreground
win without changing screen colour.

Fresh local Chrome print-media computation produced:

| Print role | Foreground | Background | Ratio | Required | Result |
| --- | --- | --- | ---: | ---: | --- |
| Heading | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | **21:1** | 3:1 | PASS |
| Introductory copy | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | **21:1** | 4.5:1 | PASS |
| Prompt label | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | **21:1** | 4.5:1 | PASS |
| Prompt textarea | `rgb(33, 19, 39)` | `rgb(255, 255, 255)` | **17.69:1** | 4.5:1 | PASS |
| Critical warning | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | **21:1** | 4.5:1 | PASS |
| Nested claim copy | `rgb(37, 22, 45)` | `rgb(242, 247, 255)` | **15.86:1** | 4.5:1 | PASS |
| Nested claim link | `rgb(22, 79, 145)` | `rgb(242, 247, 255)` | **7.62:1** | 4.5:1 | PASS |

The prompt background is white and the copy button is intentionally hidden in
print. Visual inspection of the fresh print capture confirms:

- the title, intro, label and prompt are sharp and unclipped;
- the complete “open the source yourself” warning is black and prominent;
- the evidence card remains visibly grouped;
- body/qualification text remains dark;
- claim/source/correction links remain blue and readable; and
- no screen-only button is printed.

The printable/offline prompt-panel contract now passes this local expert
review.

## Screen and nested-card regressions — passed

The same fresh run recomputed the screen state:

| Screen role | Ratio | Result |
| --- | ---: | --- |
| Heading | **16.93:1** | PASS |
| Intro | **16.93:1** | PASS |
| Label | **16.93:1** | PASS |
| Textarea | **17.69:1** | PASS |
| Copy button | **9.56:1** | PASS |
| Copy-failure status | **16.93:1** | PASS |
| Critical warning | **13.21:1** | PASS |
| Nested claim copy | **15.86:1** | PASS |
| Nested claim link | **7.62:1** | PASS |

The harness also asserts exact screen foregrounds: white heading, pale-yellow
warning, dark claim copy and blue claim links. The interaction screenshot
visually confirms those states. The direct-child rule still does not whiten
nested claim-card content.

The 320 and 1440 captures remain clean and unchanged: one clear heading,
visible HOLD notice, readable opening scenario and no clipping or page-level
horizontal overflow. No new typography or layout damage was observed.

## Fresh isolated 40-check matrix — pass

I used Playwright 1.58.2 from an isolated temporary installation, the locally
installed Google Chrome executable, a new temporary HTTP server and a new
temporary evidence directory. No maker evidence was overwritten.

```text
ECO-01 BROWSER MATRIX PASS: 40 checks
```

The 40 checks cover:

- 320/390/430/1440 structure, HOLD visibility and overflow;
- CSS 200%-zoom-equivalent overflow;
- sticky-anchor clearance and reduced motion;
- keyboard submission/focus;
- truthful nonsense and self-check states;
- live-region behaviour and clipboard failure recovery;
- nine screen contrast roles;
- exact screen-colour and nested-card preservation;
- print-media background and hidden copy-button state;
- seven print contrast roles; and
- exact black print warning plus preserved claim-card colours.

All seven fresh PNGs are byte-for-byte identical to the persistent evidence:

| Screenshot | SHA-256 |
| --- | --- |
| 320 px | `1c08cb9c14f43b66711b08a17598f37a792ad846fd0b982771c6c47bf0e8da10` |
| 390 px | `52ca47501781049ef2d96f26c3b5e4c9fc77b9f201bfbecbe8323998641d4895` |
| 430 px | `cdf5132c3c6827afd9b7165299e3f609351e0f93315ce420236a3feda3ad02f4` |
| 1440 px | `6199a648981f84d55b50a7091ecb50d4950358c891263753679066114b53ea4a` |
| CSS 200% equivalent | `b17494f7f2b1be54c823bcb2d787a8899d59c57a6fca0189ccfe3201b4dcddf4` |
| Mobile interaction | `31f9a43d5ff118297ed2984953dbe9c41e05c0abff1e3a51d1df17388ef5b41c` |
| Print prompt | `356412b3ff8e91fe00e91b2e2a0ca2c09e5d794d6a1725ba270c03fbf5398fb6` |

## Deterministic and shared-style integrity — pass

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

`styles.css` and `content/grimoire.css` have no diff. The only colour change is
the prompt warning's scoped print-media override in the renderer/generated
candidate. No global stylesheet or typography selector was changed.

The earlier exact claim/source, interaction-quantity, evaluation-taxonomy,
reasoning-state, C2PA full-spec binding, currentness and screen-accessibility
repairs retain their deterministic passes.

## Remaining non-local gates

The local expert repair cycle now passes. The truthful product state remains
**HOLD / PREVIEW** because these separate gates have not been completed:

- headed visual/owner review of the real reading experience;
- current Safari behaviour;
- current VoiceOver/Safari and actual announcement evidence;
- native page zoom/operating-system magnification beyond the CSS zoom
  equivalent; and
- the separate eight-newcomer study with its locked 7/8 floors.

No headed-browser, owner-taste, Safari, VoiceOver, screen-reader,
newcomer-transfer, full-WCAG, deployment or public-state claim is made.

## Learning scan

No new failure was found. This repair successfully applies the prior
prevention rule: use an equal-specificity media override and test the actual
computed cascade in every supported state. The new print-emulation regression
is the durable prevention mechanism; no additional pain-point entry is needed
from this bounded judge lane.
