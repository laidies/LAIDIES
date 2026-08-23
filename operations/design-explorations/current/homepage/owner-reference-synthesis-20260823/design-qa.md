# Homepage direction design QA

## Comparison target

- Source visual truth:
  - operations/design-explorations/reference/homepage/20260823-owner-shortlist/example-01-primary-editorial.png — 864 × 1821 px.
  - operations/design-explorations/reference/homepage/20260823-owner-shortlist/example-04-primary-structure.png — 842 × 1867 px.
- Implementation: operations/design-explorations/current/homepage/owner-reference-synthesis-20260823/index.html.
- Exact implementation SHA-256: a26fea1398b68a9154b3d510e8de0c1183efbe41b3b993837abba1de89e27ac4.
- Browser-rendered implementation:
  - evidence/desktop-1440.png — stable continuous 1440 × 5901 px page capture at a 1440 × 900 CSS viewport.
  - evidence/mobile-390.png — stable continuous 390 × 9339 px page capture at a 390 × 844 CSS viewport.
  - evidence/desktop-method-1440.png — 1440 × 900 px focused method capture.
  - evidence/mobile-method-390.png — 390 × 844 px focused method capture.
  - evidence/owner-877x915.png — 877 × 915 px at an 877 × 915 CSS viewport.
  - evidence/first-session-ident-1440.png — 1440 × 900 px at a 1440 × 900 CSS viewport.
- State: anonymous first visit unless the evidence name says otherwise. The dial-up ident was explicitly replayed.
- Density normalization: all implementation captures are 1 CSS px to 1 output px. Reference crops and implementation captures were fitted into equal 720 px columns without changing source aspect ratios.

## Full-view comparison evidence

- evidence/comparison-top-1440.png places reference 1 and the current masthead in one image.
- Both use the locked dusk masthead, the same image-led hierarchy, a bright pink header, purple/pink/cyan image-derived accents and compact direct navigation.
- The current proof adds the required visible sign-in action and explanatory copy. The body begins in bright cyan; the dusk masthead is not extended into a night-themed page.

## Focused comparison evidence

- evidence/comparison-method-1440.png: the reference collage is shown against the corrected compact method band. Removing the five-image collage is the explicit owner correction, not accidental fidelity drift. The current band retains the approved method copy and existing explanation and routes to the Visitor’s Centre.
- evidence/comparison-news-1440.png: the current NewsStand preserves reference 1’s editorial composition while replacing generated newspaper content with a dated local Daily record and current desk states.
- evidence/comparison-route-1440.png: the current route preserves the reference’s circular-image rhythm and expands it to the approved eight-stop order.
- evidence/mobile-method-390.png: the complete method explanation is readable at 390 px with no image sequence and no horizontal clipping.

## Required fidelity surfaces

- Fonts and typography: local Jost carries display and UI text; Georgia is limited to the newspaper headline. Desktop, owner and mobile wrapping is readable with no truncation.
- Spacing and layout rhythm: the page uses distinct editorial compositions instead of repeating the incumbent block pattern. The method is one compact desktop band. Desktop and mobile report zero horizontal overflow.
- Colors and visual tokens: bright pink, cyan, cobalt, coral, orange and lime carry the page below the dusk masthead. The rejected pale system and purple/yellow pairing are absent.
- Image quality and asset fidelity: all environment and destination imagery uses real repository raster assets. The method contains one purpose-built text-free cyan, pink and purple pop-art texture and no Story/Analogy/Practice/Music/Community illustration tiles. No placeholder art, emoji, inline SVG or CSS gradient art appears.
- Copy and content: the locked masthead and method copy are exact. Eight meaning-bearing sections declare their copy source. The previous invented Every building has a job and A Card, a Postcard and the radio are different things lines are absent. Visitor-visible Play is absent.

## Comparison history

1. Ali rejected the preceding exact proof because it preserved the old page architecture, invented copy and gave an oversized Story/Analogy/Practice/Music/Community collage most of the method section.
2. The page was reorganized around the selected reference’s editorial sequence. The collage and duplicated town explanation were deleted; the method became one image-free explanatory band; the live NewsStand, destination strip and eight-stop route now follow directly.
3. First corrected captures exposed two P2 issues: the mobile replay control overlapped the eyebrow and the header’s pop-art bitmap appeared as a dark rectangular patch. The mobile eyebrow width was constrained and the bitmap was reduced to a thin pop-art header strip.
4. Post-fix evidence was recaptured from the exact current bytes in the files listed above. The prior P2 issues are absent.

## Browser interaction and runtime checks

- Anonymous state: full method visible; Episode 04 default; dated Daily story and desk states rendered.
- Returning design state: method collapsed behind How LAiDIES and SUNNYVAiLE work; Resident Card label rendered; Episode 03 resume route rendered.
- Mobile: direct LIBRAiRY link visible; Menu opened and exposed six remaining routes; measured horizontal overflow was zero.
- Arrival: appeared, paused to Resume arrival, and skipped successfully.
- Console errors and warnings during the mobile menu check: zero.
- Static proof checks: the rejected five-tile labels and markup are absent; the method uses one local raster background; no CSS gradients; no visitor-visible Play; no horizontal overflow at 1440 or 390; inline script parsed.

## Findings

No actionable P0, P1 or P2 difference remains against the selected art direction after applying Ali’s explicit method-collage supersession.

## Follow-up polish

- P3: the current admitted Daily is dated rather than presented as an undated “latest” object. When the NewsStand publishes a newer admitted issue, the same module will render it from the existing data binding.

## Implementation checklist

- [x] Exact references and exact candidate bytes compared.
- [x] Rejected method collage removed.
- [x] Approved copy and copy provenance enforced.
- [x] Desktop, owner, mobile and dial-up states captured.
- [x] Route, Daily, image, overflow, menu and arrival controls verified.
- [x] Known-bad proof causes objective checker failure.

final result: passed
