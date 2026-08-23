# Homepage direction design QA

## Comparison target

- Source visual truth:
  - `operations/design-explorations/reference/homepage/20260823-owner-shortlist/example-01-primary-editorial.png` — 864 × 1821 px.
  - `operations/design-explorations/reference/homepage/20260823-owner-shortlist/example-04-primary-structure.png` — 842 × 1867 px.
- Implementation: `operations/design-explorations/current/homepage/owner-reference-synthesis-20260823/index.html`, SHA-256 `a80ffa9861ed1768654f65307aaddf1dc92e6cfdcc0327859d1a863edf1f0a31`.
- Browser-rendered implementation:
  - `evidence/desktop-1440.png` — 1440 × 900 px at a 1440 × 900 CSS viewport.
  - `evidence/mobile-390.png` — 390 × 844 px at a 390 × 844 CSS viewport.
  - `evidence/owner-877x915.png` — 877 × 915 px at the owner’s 877 × 915 CSS viewport.
  - `evidence/first-session-ident-1440.png` — 1440 × 900 px at a 1440 × 900 CSS viewport.
- State: anonymous first visit unless the evidence name says otherwise. The first-session ident was replayed explicitly.
- Density normalization: all implementation captures are 1 CSS px to 1 output px. The generated full-page references are layout and art-direction targets, not same-viewport coded screens. Focused comparison crops were normalized into equal 720 px columns without changing their source aspect ratios; no device frame or browser chrome was included.

## Full-view comparison evidence

- `evidence/comparison-top-1440.png` puts reference 1 and the current masthead in one comparison image.
- The locked dusk masthead, image-led hierarchy, ink framing and saturated pink/cyan treatment are retained. The new sign-in explanation is an intentional product requirement absent from the generated reference.
- The post-masthead body is materially brighter than the rejected dark pass: cyan, coral, hot pink, cobalt, orange and lime carry the page; dark navy is limited to framing and contrast.

## Focused comparison evidence

- `evidence/comparison-method-1440.png`: the method uses one explanatory pop-art panel and five real image scenes rather than generic cards.
- `evidence/comparison-news-1440.png`: the white surface is intentionally a newspaper object. It contains the dated filed story and the three current Daily desk states; it is not an empty white UI box.
- `evidence/comparison-route-1440.png`: the eight-stop Wednesday route preserves reference 1’s circular image language and makes the route order explicit.
- `evidence/mobile-method-390.png`: the method stacks into a readable explanation plus image sequence without clipping.

## Required fidelity surfaces

- Fonts and typography: local Jost is used for LAiDIES display and UI text; Georgia is confined to the Daily newspaper. Hierarchy and wrapping were inspected at 1440, 877 and 390 widths. No visible truncation remains.
- Spacing and layout rhythm: the page uses varied editorial compositions rather than one repeated card grid. The 390 px layout has zero horizontal overflow. The Visitor’s Centre map note now stacks below the town explanation instead of collapsing into a narrow desktop column.
- Colors and visual tokens: the locked vibrant palette is used without the rejected purple/yellow pair or pale-pastel page treatment. The dusk masthead remains dark by design; the rest of the page is bright and varied.
- Image quality and asset fidelity: all visible illustration and environment surfaces are raster assets. No CSS drawing, inline SVG, emoji, fake icon or placeholder image is used. All 32 local routes/assets resolved and every rendered image completed with non-zero natural width.
- Copy and content: locked masthead and method copy are retained. NewsStand headline and desk date come from the current local Daily data. Visitor-visible `Play` occurrences are zero. LAiDIES casing and contrasting `Ai` are preserved.

## Comparison history

1. Earlier rejected proofs used additive live-base patching, pastel/bold visual conflict, CSS decoration, missing imagery and a nonsensical Daily rack. This direction was rebuilt from owner-selected examples 4 and 1 instead of iterating those bytes.
2. The first version of this direction still made the method too dark, forced the mobile town explanation into desktop columns and overflowed the 390 px viewport by 1 px. The method was brightened with the real pop-art bitmap, the town section received a one-column mobile rule, and horizontal overflow was removed.
3. Post-fix evidence: `desktop-method-1440.png`, `mobile-method-390.png`, `owner-877x915.png`, and a browser measurement of `scrollWidth === innerWidth` at 1440 and 390.

## Browser interaction and runtime checks

- Anonymous state: orientation open; Episode 04 default; current filed Daily headline/date rendered; no visitor-visible `Play`.
- Returning signed-in design state: explanation collapsed; Episode 03 resume CTA and route rendered; mobile Resident Card label rendered.
- Mobile Menu opened and exposed remaining navigation; direct LIBRAiRY remained visible.
- Arrival animation appeared, paused to a `Resume arrival` state and skipped successfully.
- Browser console errors: 0 at the owner and mobile proof URLs. Browser warnings: 0.
- Broken or incomplete images: 0.

## Findings

No actionable P0, P1 or P2 difference remains against the selected art-direction targets and the Homepage brief. The extra explanation and current-data modules are intentional additions required by Ali’s walkthrough, not fidelity drift.

## Follow-up polish

- P3: if Ali prefers a denser NewsStand after review, tighten its newspaper column proportions without removing the visible headline or desk states.

## Implementation checklist

- [x] Exact references resolved.
- [x] Desktop, owner and mobile states captured.
- [x] First-session ident captured and tested.
- [x] P1/P2 issues repaired and recaptured.
- [x] Current-content, routing, overflow, image and console checks passed.

final result: passed
