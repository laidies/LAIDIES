# Homepage independent acceptance — shared header 320 candidate

**Verdict:** ACCEPT — exact local Homepage/Start Here consumer pair only  
**Candidate:** `SVGH-320-2026-07-26-v1`  
**Evidence time:** 2026-07-26 12:51 PDT (America/Vancouver)  
**Acceptance owner:** Town Entry / Homepage  
**Authority:** read-only shared source and frozen routes; Homepage
dossier/evidence writes only; no deploy or public mutation

## Checksum binding

| Bound input | SHA-256 | Result |
| --- | --- | --- |
| `content/site/sv-global-header.js` | `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa` | MATCH |
| `index.html` | `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772` | MATCH |
| `start-here.html` | `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0` | MATCH |
| Platform candidate receipt | `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049` | MATCH |

Any change to one of these four inputs voids this acceptance and requires a
new seal and affected-consumer rerun.

## Independent consumer result

The shared script is requested by the Homepage, but its `mount()` function
selects only `.sv-header` or `.site-header`. The frozen Homepage uses
`.topbar`. Independent runtime inspection therefore found:

- zero `[data-svgh-mounted="1"]` elements;
- zero `.svgh-nav` and `.svgh-skip` elements;
- no shared-header style block injected; and
- the Homepage's own topbar, labels, routes and interaction code unchanged.

Start Here does not request the shared script. Its visible header, Homepage
return, ordinary Visitor's Centre fallback and route identity remain
unchanged.

Independent real-browser script:

```text
NODE_PATH=/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
node operations/product-stewards/town-entry-homepage/evidence/shared-header-320-consumer-acceptance-2026-07-26/test-homepage-shared-header-consumer.cjs
```

Result: **PASS, 8 cases**.

- Homepage JavaScript at 1440, 390 and 320 CSS pixels.
- Homepage no-JavaScript at 320.
- Start Here JavaScript at 1440, 390 and 320.
- Start Here no-JavaScript at 320.

Independent script SHA-256:
`f69eb6b25d79fb9392b5efb377ba7c15e50d254014d5c4bd4138719bcdfdf09a`.
Machine result SHA-256:
`32a9f9521f3b76544d4d8f13632e6ec41ed71aa71420ec20603e8b8f885353a9`.

## Literal gates

- **320 raw containment:** PASS. Homepage document/client width `320/320`;
  topbar `0→320`; visible logo/Menu layout ends at 302px.
- **390 parity:** PASS. Document `390/390`; topbar remains 54px with 18px
  side padding, existing gradient/Jost identity and own Menu.
- **1440 parity:** PASS. Document `1440/1440`; topbar remains 76px with 72px
  side padding, existing gradient/Jost identity and desktop nav.
- **Keyboard/Menu/focus/Escape:** PASS at 390 and 320. Enter opens the existing
  mobile menu; Escape closes it and restores focus to Menu.
- **Labels/routes:** PASS. Eight primary and eight mobile navigation routes
  match the frozen source; the mobile KSVL label remains its deliberate
  `Visit KSVL 99.9` variant. The three hero routes remain Welcome Wagon,
  dated Episode 04 and lookup.
- **No-JavaScript:** PASS at the candidate non-regression boundary. The
  Homepage shared source cannot mount; its three ordinary hero links remain
  usable. Start Here exposes its no-script Visitor's Centre link and two
  ordinary Homepage header links.
- **200% proxy:** PASS at 320 CSS pixels, representing a 640px layout viewport
  at 200%. This is a reflow proxy, not native browser zoom evidence.
- **Visual inspection:** PASS. Desktop, 390 and 320 captures retain the frozen
  Homepage topbar and first-door hierarchy with no clipping, shared pills,
  token substitution, label drift or route drift.
- **Console/page errors:** none in the independent matrix.

The Platform raw characterization was independently rerun read-only:

```text
SHARED HEADER 320 CHARACTERIZATION PASS
shared_status=PASS raw_nav_right=312 visitor_nav_right=312
```

The Platform consumer matrix was also rerun without evidence writes:

```text
SHARED HEADER CONSUMER MATRIX PASS
routes=3 js=9 no_js=3 keyboard=3 zoom200_proxy=3
```

The existing exact Homepage/Start Here functional matrix was rerun and passed
all 15 first/returning/Card/failure/reflow cases.

## Visual evidence

- `homepage-desktop-1440.png` —
  `a3867a889459fe5833ef63b534ddb7530e177ba2b670e4250860b5b066c07756`
- `homepage-mobile-390.png` —
  `8c99c7c0a1a7df534b7b58d2846eed553aea2acdc3a6efe1a33e0210d3c03511`
- `homepage-reflow-320.png` —
  `149e301d30a94bff69c1b40007fcc95d16d6aee051c0d654d0c985b74fe87bca`
- `homepage-no-js-320.png` —
  `1d788e30e70e13555f79ba73e19b2d5ed2f20674c35dc39d93fef88c811c08fa`

## Evidence ceiling and remaining limits

This acceptance proves that the exact shared candidate does not regress the
frozen Homepage or Start Here consumers. It does not accept other shared-header
consumers, remove Visitor's Centre's separate acceptance gate, authorize
route-local containment removal, or admit a release.

Native Safari, VoiceOver, OS/browser zoom, human comprehension, deployed cache
behavior and public-origin verification remain unproved. At Homepage 320 with
JavaScript disabled, the existing header Menu remains inert; the three
ordinary hero paths remain usable. This is a pre-existing Homepage limitation,
not introduced by the shared candidate.

The frozen Homepage still references
`/content/site/sv-global-header.js?v=20260715-1`. Local no-store testing proves
the bytes above, not CDN/browser cache invalidation. The integration/release
owner must bind the accepted shared asset and establish cache delivery without
changing this frozen pair silently.

## Exact next action

Platform/Control Room records this checksum-bound Homepage receipt and waits
for the separate Visitor's Centre receipt. When both are present, the shared
integration owner may bind the accepted source under an exact release/cache
plan and rerun affected consumers. Any route or source change requires
resealing. No Homepage source correction is required for this candidate.

