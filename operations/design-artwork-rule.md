# Shared design rule: real artwork, not CSS imitation

Authority: Ali's repeated direct rulings, reaffirmed September 7, 2026.
Applies across building pages and chats, before showing a visual candidate.

Do not invent decorative CSS/SVG artwork as a shortcut: fake halftone,
clip-path tickets/arrows/bursts, skewed paper labels, or primitive-drawn icons.
Use an exact approved image asset or a purpose-built illustration reviewed
against the destination's approved art. CSS handles layout, accessible controls,
typography, readable colour surfaces and cropping existing artwork. These
ordinary functions are not banned. Preserve exact previously approved art;
this rule does not retroactively reject Ali-approved bursts or brand assets.

Preflight must name every changed decorative treatment, its implementation
source and exact artwork bytes. Independent review checks the actual desktop
and phone pixels against Ali's rejections before geometry/function receipts.
Working links, readable text or a self-authored PASS cannot waive this rule.

Enforcement: `scripts/check-design-review-admission.mjs` now requires
`gates.decorative_discipline.artwork_sources` with exact file paths and SHA-256
for declared changed HTML/CSS/JS/SVG implementation sources on implemented
page candidates. Missing lists or stale declared sources fail admission. Image-only
concepts without declared implementation files do not require implementation bindings; their existing pixel review applies. Code-backed concepts still require source bindings.
The scanner cannot discover omitted dependencies: the reviewer must reconcile
the declarations against the actual change before admission. The linked scanner rejects known CSS imitation patterns.
There is no maker-supplied waiver or approval flag. The automated signatures
are scoped to the rejected Chick Flicks implementation, not a global ban on
rotation or polygon cropping. New reusable signatures require maintainer review
against legitimate controls and approved artwork before activation.
The scanner is a narrow prevention check, not proof of aesthetic quality or
complete dependency coverage; the independent reviewer must confirm coverage.

Known bad: Chick Flicks commit `1cf44510`: clipped ticket arrows, radial-gradient
halftone and rotated heading labelled as pop art. Prior visual PASS invalidated.
Run `node scripts/test-decorative-artwork-rule.mjs` to test rejection and the
permitted layout/artwork-cropping boundary before relying on this guard.
