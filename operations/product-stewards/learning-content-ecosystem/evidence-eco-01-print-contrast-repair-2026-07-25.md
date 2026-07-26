# ECO-01 print contrast repair

**Date:** 2026-07-25
**Status:** REPAIRED LOCALLY — HOLD / PREVIEW
**Input:** `independent-review-eco-01-prompt-contrast-repair-2026-07-25.md`
**Maker boundary:** this evidence does not approve the candidate

## Exact repair

The screen rule for the critical warning used a more specific important
selector than the existing print text rule. Print therefore changed the panel
to white but left the warning pale yellow at 1.28:1.

The renderer now includes this equal-specificity print override:

```css
@media print {
  .vr-prompt > .vr-warning {
    color: #000 !important;
  }
}
```

It changes only the direct warning inside the prompt panel during print.
Screen colours, shared stylesheets and content outside the prompt are
unchanged.

## Rendered print evidence

A fresh isolated Playwright 1.58.2 run used local headless Google Chrome,
emulated `print` media and inspected the actual combined stylesheets.

| Print role | Foreground | Background | Ratio | Threshold |
| --- | --- | --- | ---: | ---: |
| Prompt heading | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | 21:1 | 3:1 |
| Introductory copy | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | 21:1 | 4.5:1 |
| Prompt label | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | 21:1 | 4.5:1 |
| Prompt textarea | `rgb(33, 19, 39)` | `rgb(255, 255, 255)` | 17.69:1 | 4.5:1 |
| Critical warning | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` | 21:1 | 4.5:1 |
| Claim-card copy | `rgb(37, 22, 45)` | `rgb(242, 247, 255)` | 15.86:1 | 4.5:1 |
| Claim-card link | `rgb(22, 79, 145)` | `rgb(242, 247, 255)` | 7.62:1 | 4.5:1 |

The print panel is white and the copy button is intentionally hidden. A
dedicated print-media capture is stored at:

`operations/product-stewards/learning-content-ecosystem/evidence-eco01-browser/eco01-print-prompt.png`

The same run asserts exact screen regressions:

- heading remains white on dark purple;
- critical warning remains pale yellow on dark purple;
- nested claim copy remains dark ink on its light card; and
- nested claim links remain blue on their light card.

The browser matrix now passes 40 checks: the previous 30 screen, interaction,
responsive, focus and computed-contrast checks; exact screen-colour
preservation; print background/control state; seven print contrast roles; and
print warning/claim-colour preservation.

## Exact candidate

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
| Browser matrix JSON | `5011be19597a7c48e0dc0fbd214d74156cf7da0bf8de1ab85f15313689dc5ed6` |
| Print-panel capture | `356412b3ff8e91fe00e91b2e2a0ca2c09e5d794d6a1725ba270c03fbf5398fb6` |

## Verification

Passed:

```text
node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD

node scripts/check-eco01-source-versions.mjs
  ECO-01 SOURCE VERSION PASS: C2PA 2.4

ECO01_PLAYWRIGHT_ROOT=<temporary package root> \
  node scripts/test-eco01-browser.mjs
  ECO-01 BROWSER MATRIX PASS: 40 checks

node scripts/check-inline-js.js
  PASS — 353 scripts / 132 live pages

node scripts/check-local-links.js
  PASS — 1,944 references / 110 pages

node scripts/check-town.js
  PASS

node scripts/check-product-stewards.mjs
  PASS — 65 products; active 3/3
```

## Remaining gates and limitations

- Chrome ran headlessly; no headed owner visual approval is claimed.
- CSS `zoom: 2` remains a reflow equivalent, not native page zoom or
  operating-system magnification.
- DOM inspection does not prove assistive-technology announcements.
- Safari and VoiceOver were not run.
- The eight-newcomer study has not run.
- Independent acceptance review of this exact repaired candidate is pending.

The candidate, Library cover and Miss Jeeves remain HOLD/PREVIEW. No deploy,
publication or git action occurred.
