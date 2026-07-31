# Town Entry re-verification — Cycle 5 Homepage canonical-name successor

**Verdict: PASS — exact successor is eligible for the bounded Ali comparison.**

This supersedes the Town Entry HOLD receipt SHA-256
`97a1ba1026589fcc44a4925881a0501c986901abcf6f79e98d59e405dc7452eb`.
It is an acceptance of the exact local challenger only; it is not an Ali visual
ruling, live-route change, deployment or global-style propagation.

## Bound tuple

- Incumbent `index.html`: `d09d2acb6f8bcb54873de5009b75fea3551c81124ff925e55a9c2eb68a671189`
- Candidate loader: `b183f8c312c3c27eca0ca6847c31185699c2731b7ba39d3634523307b0873f4b`
- Candidate CSS: `dd62540a8e8c6370a16804ebf5af88a383de93f075bc8fb83da10dfa2541fcb6`
- Successor runtime: `c201dcda2767c5aae3419ff095f8cf3d280ba7b3cd1d8faf9bb6e9c8d2de0bc3`
- Binding manifest: `a4b738d5ae7db9421bcc8b983017163e522e663ef89469376aa81c45b42b9551`

## Independent browser evidence

I served and rendered the exact candidate in a fresh isolated Chromium profile
at 1440×900 and 390×844. The loader did not show its incumbent-checksum hold.
The verifier-owned full-page captures reproduce the sealed visible results:

| Viewport | Render | SHA-256 |
| --- | --- | --- |
| 1440×900 | `homepage-challenger-1440.png` (1440×11295) | `c96db1b093dfa4ed5c4a883817b4a13c70443f337dc36a28ceb1712d57c3a92b` |
| 390×844 | `homepage-challenger-390.png` (390×16509) | `d8c28f549f58d0d9aa883f358e8f691721f26347fd17c539fd190da71fdb0c67` |

The unchanged render hashes prove the successor has no visible-pixel,
composition, masthead, locked-copy or destination delta. Fresh desktop and
mobile interaction inspection confirms:

- `data-name` is exactly `Visitor’s Centre`;
- `aria-label` is exactly `Visitor’s Centre`;
- activating the hotspot opens a visible popup titled `Visitor’s Centre`;
- the popup destination remains exactly `/visitors-centre.html`; and
- both widths retain zero horizontal overflow.

The CSS and loader remain byte-identical to the prior reviewed challenger. The
only runtime addition is the candidate-only canonicalization of the existing
Visitor map hotspot’s data and accessible label. No surrounding product copy,
route, map interaction, image, composition, first/returning-state treatment,
menu, filter or action destination changed.

## Gate result

**CANON-NAME-005: PASS.** The former mutable interactive-label defect is
corrected in the actual rendered DOM and popup, not merely in a static source
assertion. The candidate now meets the locked `Visitor’s Centre` naming rule
while preserving the full previously accepted visual and responsive evidence.

Brand may put this exact challenger beside the incumbent for Ali’s bounded
sitewide-style decision. Any loader/CSS/runtime/manifest/render change requires
a new identity and Town Entry reacceptance. Native/public/deploy authority is
not implied.

## Learning scan

The prior prevention rule was exercised successfully: canonical-name reviews
must inspect visible copy plus the rendered accessible/data labels and popup
output, not only text blocks or screenshots.
