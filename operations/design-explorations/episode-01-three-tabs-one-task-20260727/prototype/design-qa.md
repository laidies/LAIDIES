# Design QA — Episode 01 Three Tabs, One Task

**Original QA date:** 2026-07-27  
**Current revision date:** 2026-07-28  
**Original viewport:** 1280 × 720 CSS pixels, DPR 2  
**Current inspected viewport:** active in-app browser viewport, Step 1  
**Final result:** pending full revised visual QA

## 2026-07-28 supersession notice

The 2026-07-27 dark-console comparison and its `passed` verdict are historical
evidence only. Ali rejected that visual direction and subsequently approved a
new page style: Homepage-level soft gradient plus bright same-family
colour-block cards, neutral editable fields, exact brand casing and
state-specific foreground contrast. The current Step 1 render was inspected
after implementation and accepted by Ali as the page style she is after.

The full five-state journey still requires new desktop/mobile captures and a
same-state comparison before this file may return to `passed`.

## Same-input comparison

- Source: `../selected-direction-desktop.png`
- Implementation: `qa-implementation-desktop.png`
- Combined comparison: `qa-comparison-desktop.png`

The source and implementation were inspected together in the combined image,
not as separate memory-based judgments.

## Fidelity findings

- **Layout and hierarchy — pass.** The implementation preserves the dominant
  headline, dated low-risk framing, five-step rail, three equally weighted
  providers, active comparison area, ratings, style controls, notes,
  verification check and strong yellow continuation action. It separates the
  visual direction into sequential states so the body copy stays readable and
  the relationship between answer, controls and outcome is explicit.
- **Typography and spacing — pass.** The Jost family, heavy display weights,
  compact uppercase labels and quiet cream answer fields create the intended
  adult 1990s comic-console rhythm without the source mock's most cramped text.
- **Colour and surfaces — pass.** Deep plum/black, vibrant pink, purple,
  electric blue and sunshine yellow match the admitted palette. Provider
  colour mapping and selected states are consistent. No candy palette,
  gradient substitute, rounded white dashboard or decorative filler was
  introduced.
- **Imagery and icons — pass after correction.** The background is a LAiDIES
  asset. The wordmark is the current live homepage Jost construction—not the
  retired serif asset initially copied into the prototype. Controls use one
  real Phosphor icon family. There are no placeholder illustrations, emoji,
  fake SVG assets or CSS-drawn pictures.
- **Copy and content — pass.** Every visible element helps the learner enter a
  task, bring back an answer, compare, choose, edit, verify or keep a useful
  result. Model/mode records remain dated observations, not standing provider
  personality claims.
- **Responsive structure — pass for local prototype admission.** The build has
  explicit 1080 px and 760 px adaptations: stacked provider screens, a
  single-column comparison, compact provider tabs, full-width actions and
  stacked receipt sections. Physical device evidence remains required before
  public integration.
- **Print — pass for local prototype admission.** Print CSS removes navigation,
  actions, background art and toasts and retains the receipt as a clean
  bordered document. Physical Letter/A4 proof remains required before public
  integration.

## Interaction and accessibility checks

- Task text and the low-risk confirmation are required before proceeding.
- Three real answer fields accept pasted responses or the guided examples.
- Model/mode controls include `Not shown in this chat` and `Other`.
- Twelve rating buttons retain selected states.
- Four labelled range controls retain values for each provider.
- Notes and verification controls are editable.
- Receipt creation requires a real draft edit plus a human-change explanation.
- Copy draft, download receipt and restart produced their expected state.
- Semantic headings, fieldsets, labels, buttons, tab roles, focus-visible
  outlines, reduced-motion handling and practical mobile tap targets are
  present.
- Browser log review returned no application error.

## Verification receipts

- `npm run build` — passed.
- `npm run check:brand` — passed; retired wordmark references fail closed.
- `npm run test:sites` — 4 passed, 0 failed.
- Full interaction journey — passed in the in-app browser.

No P0, P1 or P2 finding remains for local-prototype admission.
