# Town Entry independent browser verification — Cycle 5 Homepage challenger

**Verdict: HOLD — canonical-name correction required before Ali decision review.**

## Exact artifact rendered

- Candidate loader: `b183f8c312c3c27eca0ca6847c31185699c2731b7ba39d3634523307b0873f4b`
- Candidate CSS: `dd62540a8e8c6370a16804ebf5af88a383de93f075bc8fb83da10dfa2541fcb6`
- Candidate runtime: `7d275e8e7deb7fbddbf566fcd63c64440ca0e6069eba271f5a964f8946a37222`
- Incumbent binding: `index.html`
  `d09d2acb6f8bcb54873de5009b75fea3551c81124ff925e55a9c2eb68a671189`
- Binding manifest: `825d17c184ed764e646fad21aee5fb9d66c27412b92b70e55ce2ab12689b5ab6`

I independently rendered the served candidate at its exact local URL in an
isolated Chromium profile. The loader did not show its checksum-mismatch hold.
The verifier-owned outputs reproduce the sealed full-page dimensions and
hashes exactly:

| Viewport | Render | Result |
| --- | --- | --- |
| 1440×900 | `homepage-challenger-1440.png` — 1440×11295 | `c96db1b093dfa4ed5c4a883817b4a13c70443f337dc36a28ceb1712d57c3a92b` |
| 390×844 | `homepage-challenger-390.png` — 390×16509 | `d8c28f549f58d0d9aa883f358e8f691721f26347fd17c539fd190da71fdb0c67` |

## Consumer verdicts

- **RENDER-001 PASS:** both verifier renders exactly match the bound desktop
  and mobile reference hashes; no checksum-mismatch hold appeared.
- **ENTRY-002 PASS:** hero/masthead asset and locked hero/method wording remain
  intact. The masthead appears once; the rendered page contains no repeated
  masthead, rejected FAiRY scene, unaudited Dream Phone/NewsStand building
  raster, district-card wall or cream page band.
- **RESP-003 PASS:** at 390px the document has zero horizontal overflow. The
  mobile menu starts closed, opens with `aria-expanded="true"`, preserves its
  eight expected destination/section links, and remains within the viewport.
- **INTERACT-004 PASS:** the activities filter changes to `help` and leaves
  the appropriate three cards visible without overflow. Route/section links
  remain present; no candidate runtime changed their destinations.
- **CANON-NAME-005 HOLD:** the actual rendered interactive map still exposes
  `aria-label="Visitor Centre"` and `data-name="Visitor Centre"` for
  `/visitors-centre.html`. This is a current interactive/public label, not
  historical or path-bound evidence. It violates the locked canonical-name
  ruling: the name must be exactly `Visitor’s Centre`.

## Required successor repair

Do not present this exact tuple to Ali. Brand must make a candidate-only,
checksum-bound successor that changes the map hotspot's spoken/popup label to
`Visitor’s Centre`, then reseal loader/runtime/manifest and desktop/mobile
renders and return it for Town Entry re-verification. The existing map art may
remain queued for the post-Brand asset audit; this HOLD is only the mutable
interactive text/ARIA label.

The challenger otherwise clears this consumer review's visual, locked-copy,
responsive and interaction checks. This receipt does not change the live
Homepage, global style, deployment or Ali approval state.

## Learning scan

Prevention rule: every canonical-name propagation review must query both
visible copy and accessible interactive labels/data used to render popups;
source-preserving challengers can otherwise inherit an obsolete name outside
their obvious text blocks.
