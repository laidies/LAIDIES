# Independent verdict — Mme CLAi-O reading-room public asset

**Date:** 2026-08-03 America/Vancouver  
**Verdict:** **ACCEPT — exact incumbent room for the bounded Mme CLAi-O room/entry job.**

This is an independent asset/use judgment only. It does **not** accept Mme
CLAi-O as a whole building, any reading-card art, a character likeness, shared
reward/account behaviour, release, deployment, or public-origin state.

## Exact candidate and authority

| Input | Independent current identity | Result |
|---|---|---|
| Room byte | `assets/building-interiors/mme-claio-reading-room.jpg` — SHA-256 `19f87425f6666840c3566f46098824901679922109588ad327fd35ebbb8817f4`; JPEG, 1500 × 844 | match to the route-owner ruling and owner visual inventory |
| Current page consumer | `games/madame-claio.html` — SHA-256 `83b2da78f93d94f8ef02cba897db0759eccdfa9487baae5f3e9b0f7a87beeae7` | the exact byte is the single `.claio-room-image` source, with truthful descriptive alt text |
| Current room presentation | `content/madame-claio-v2.css` — SHA-256 `3e01ae24344d99d416a6b8b43106ac84ae6164fa26f139407af19ccaa4cedf81` | inspected desktop and narrow-layout rules |
| Room/environment contract | `operations/product-stewards/mme-claio/INTERACTIVE-ENVIRONMENT.json` — SHA-256 `e3cf6f21a26a7d436bd178d05575663337a4beba7210299fdf3accbbd8f24acc` | still `BUILDING`; its room/table/deck job is the bound scope |

The route-owner ruling names this exact path/SHA as the sole Mme CLAi-O
`ACTIVE_CANDIDATE`; the owner inventory independently marks it **KEEP +
INTEGRATE**. It is therefore reuse of the incumbent, not new or substitute
art. The current active registry intentionally does not contain it yet.

## Independent visual and interaction judgment

- The exact full-resolution image is a dense, specific late-night reading
  room: the crystal ball, fanned cards and stacked deck are distinct, central
  objects on a velvet table. The visual gives the draw ritual a real spatial
  home instead of using a generic panel, decorative masthead or fake object.
- Its purple, fuchsia, cyan-teal and warm lamp register is coherent with this
  role-specific 1990s LAiDIES room. Its darkness is purposeful atmosphere and
  contrast support, not a general site palette or a reason to reintroduce
  retired plum UI fills. The current page-design brief specifically permits a
  dark register for this night building.
- No functional, status, safety, reward, card-copy or current-state text is
  baked into the image. Those meanings remain live, selectable page UI.
- Desktop keeps the full-bleed image behind a left-edge legibility scrim;
  `object-fit: cover` / centre positioning preserve the table and central
  crystal-ball/deck scene while a labelled native `Cut the deck` control remains
  visible. The image is not the only activation path.
- At `max-width: 760px`, orientation and truthful boundary copy are ordered
  above a 390px room crop (330px at 430px and below); the image moves to normal
  flow with `object-position: 54% center`. This centre crop retains the table,
  ball and deck rather than treating the asset as a tiny or unlabeled backdrop.
  The responsive source also retains the larger labelled draw button, so a
  visitor need not discover a precision hotspot.
- The image shows a room, not a person. It neither asserts nor contradicts a
  Mme CLAi-O likeness; character-identity/portrait admission remains outside
  this limited environment-asset verdict.

The predecessor's screenshot evidence is **not** used to bind this full page:
the current HTML checksum has changed after the rejected-card source repair.
This verdict instead binds the exact room byte, its current source reference,
current CSS responsive rules, its existing environment job, and direct
inspection of the full-resolution asset. It grants no whole-page visual PASS.

## Checks and calibration

- `node scripts/check-product-stewards.mjs --owner-entry mme-claio` — PASS.
- `node scripts/test-mme-claio-contract.mjs` — PASS (`deck_cards=100`). This
  verifies the labelled/physical deck fallback, safety and local-state contract
  that make the room job meaningful; it is not a visual-quality verdict.
- `node scripts/test-active-asset-admission.mjs` — PASS; its negative fixtures
  reject retired, candidate, unregistered and checksum-changed assets.
- Relevant current negative calibration: compiling the current registry then
  asserting this exact room path throws `public asset is not registered ACTIVE:
  assets/building-interiors/mme-claio-reading-room.jpg`. Default-DENY is live;
  this verdict is required before an owner may add a narrow ACTIVE entry.
- `git diff --check -- games/madame-claio.html content/madame-claio-v2.css
  content/site/madame-claio-v2.js operations/product-stewards/mme-claio` —
  PASS.

## Exact admission boundary and remaining holds

**Permitted next integration, if the foreground owner reconciles this verdict:**
one checksum-bound ACTIVE registry entry for
`assets/building-interiors/mme-claio-reading-room.jpg`, scoped solely to the
existing `games/madame-claio.html` reading-room/table/deck environment at
desktop and mobile. No derivative, recrop, storefront, social, episode,
trading-card, character-portrait, or general image-library authority follows.

Still held: four rejected reading-card images; any portrait/character claim;
current full-page visual/Brand admission; native Safari, VoiceOver and zoom;
shared reward/Resident Card/account behaviour; analytics/privacy; release,
deployment and public-origin verification. The building remains `BUILDING`.
