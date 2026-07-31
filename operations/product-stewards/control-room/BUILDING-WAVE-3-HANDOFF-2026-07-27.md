# Building Wave 3 handoff — 2026-07-27

**Evidence cutoff:** 2026-07-27 04:55 PDT  
**Status:** `VERIFIED LOCALLY — POST OFFICE + KSVL + TOWN HALL COMPLETE-BUILDING CANDIDATES; INTEGRATION/PUBLIC GATES REMAIN`

## Visible result

Wave 3 now includes three independently accepted, browser-usable local building
experiences:

`operations/design-explorations/building-wave-3/post-office/index.html`

`operations/design-explorations/building-wave-3/ksvl/index.html`

`operations/design-explorations/building-wave-3/town-hall/index.html`

Penny’s illustrated counter is the interface. The page exposes all four owned
jobs without inventing shared-system success:

1. prepare a Wednesday mail request without claiming subscription or delivery;
2. open the local Resident Card desk without calling a Card an account;
3. choose one of 11 governed postcards, proof its exact art and carry only its
   public card ID to the existing writing room;
4. open the four currently published issues from the canonical episode index
   without treating publication as inbox delivery.

Malformed catalogues, unavailable archives, blocked newsletter preparation and
failed images have explicit recoverable states. Script-disabled browsing keeps
all four counter tickets, the Card destination and the writing-room fallback.

KSVL is now a complete local station rather than a decorative radio façade. Its
booth exposes all 29 governed local tracks, six registry-derived mixes, ten band
shelves, explicit playback and native controls, exact source handbacks, local
paused return, 13 declaration stickers, five truthfully held achievement
stickers and a signed-out request draft lifecycle. It does not claim provider
delivery, Closet propagation, listening rewards, account history or public
release.

Town Hall is now a coherent civic room rather than a set of generic civic
modules. Mayor Deb’s counter provides two exact local recordings and the
poster/archive handbacks; the noticeboard renders the exact four Regulars and
a replaceable/removable device-only choice; the comment drop-box provides a
useful seven-day device-only draft while explicitly holding the real inbox,
receipt and staff lifecycle.

## Exact accepted successor

Independent predecessor HOLD:
`operations/product-stewards/post-office/independent-review-building-wave-3-complete-counter-candidate-2026-07-27.md`
SHA-256 `398610cd3525bcae9f35328abbc77f64cbb14300d351e311ac03dca8fddc3657`.

That review found two real candidate defects: the skip link did not focus its
destination and the 390px composition placed Penny too far off-centre.

Independent successor ACCEPT:
`operations/product-stewards/post-office/independent-rejudge-building-wave-3-complete-counter-successor-2026-07-27.md`
SHA-256 `d34cd7f808a8680ea15a4a5f0736207d2752b8a8b6311278285f4b7ba91b2c63`.

Accepted tuple:

- HTML `c9fa07df657d87942984e643efcd4c5cadf0c2c9a48a756a5153bb6b82e6f90b`
- CSS `e206ed4ab0d2289e252e20b8ae5ab0d95ce1e6afc659631325c0ae4de0efe030`
- controller `11d6f76b8ce84b8f425c2b1d2d30a1bb7ef6e2a4d653487857c48b6e2ae22cb3`
- governed catalogue `79d46ce24c070f2a2d48068b38b48a3f5e2ae70122ae5b67af990697ae9407a1`
- deterministic test `74ba0a47de17d93d64127388a861837cd84a0d494b5629d55c920fde5cd32540`
- retained Penny artwork `dadbc66da668a2afec17f7824982e6bbd9e246b7ebf226a0dd09e6065ca2b497`

The successor focuses `SECTION#counter` after skip activation, visibly retains
Penny as the counter owner at 390px and has no regression at 1440/390/320.

## Exact accepted KSVL candidate

Maker evidence:
`operations/product-stewards/ksvl/maker-evidence-building-wave-3-complete-station-candidate-2026-07-27.md`
SHA-256 `aed062acf1a8c3cf20530951d3c5fd7299ede608f45b9aff1d2a2abba2a574c9`.

Independent ACCEPT:
`operations/product-stewards/ksvl/independent-review-building-wave-3-complete-station-candidate-2026-07-27.md`
SHA-256 `5d3f8828d92b5de82ddf5c8b7d0d495e1f25742151eb8b3056061e55b30c32c6`.

Accepted tuple:

- HTML `890820b3bf531376812ec405595337d449421034a80a426e3d022a31883dbd40`
- CSS `5760d34ddf1a417514d1fd6b23ada2ccc400c41d821ee838200d7ffbdbe8f208`
- controller `87a87b1652990031ce8cd35f73177fc4448e526c5ea06ac2034fda91f4b268ea`
- deterministic test `cfa9e00f398c25a0083343695e3066357d010f633d86df49dc1068ce551a334f`
- governed 29-track registry
  `68c128827d87971879cb6d67b48b2b5bb139a7e588e63c236e586957e6fa5a65`

The independent judge recomputed the tuple and exercised real Chromium
playback across all 29 registry tracks, six mixes, ten bands, media controls,
paused return, sticker/request-draft lifecycle, failure fixtures,
1440/390/320 containment, reduced motion, skip focus and script-disabled
fallbacks.

## Exact accepted Town Hall candidate

Maker evidence:
`operations/product-stewards/town-hall/maker-evidence-building-wave-3-complete-civic-room-candidate-2026-07-27.md`
SHA-256 `77cd41d514d2aec3209103ba28fa3113f9eae4520a560b5da7fedc9a6a88b76f`.

Independent ACCEPT:
`operations/product-stewards/town-hall/independent-review-building-wave-3-complete-civic-room-candidate-2026-07-27.md`
SHA-256 `b7256f8ed5e929817c98372aa9e3e26f59e8ee1360674c8df21267502561cd4b`.

Accepted tuple:

- HTML `156ee775ca335917c4e670edda7a441055163cd6777e6cdce022cd5b80647a3a`
- CSS `a21d5439d21ac3ef209634dd79e58fba0032e9470cfdcecc266bbe1f1f45fac0`
- controller `f416ab9b320e1e6b91712befa9922b1b1b5329778803372eef2c335ecd020759`
- governed four-Regular roster
  `eef668e985f66c4a3d7a2e497a069806d521ed74f54952d871a3f2ba9d8648ed`
- deterministic test
  `969121431d02c44f9bb48cb987fe7b32b45f908dd183448a33cf34236a046124`

The independent judge exercised first-glance civic-room comprehension, both
Deb tracks and their hidden-audio boundary, the full Regular choice lifecycle,
the seven-day local draft lifecycle, hostile fixtures, 1440/390/320,
keyboard/skip, reduced motion and script-disabled fallbacks.

## Backend/product gap closed

The canonical episode index uses safe site-relative paths without a leading
slash. The first drawer adapter accepted only root-relative paths, so real
published content failed closed. The successor validates both admitted
canonical forms, normalizes them to root-relative runtime paths and continues
to reject unsafe, duplicate or empty input. BTB-200 records the reusable
prevention rule.

## Exact remaining gates

1. Post Office owner compares the accepted candidate to `post-office.html` and
   opens one clean route-integration lock with rollback.
2. Buttondown owns actual subscription confirmation, delivery and unsubscribe;
   this candidate transmits nothing.
3. Identity, invitation, postcard delivery/open/join receipts and rewards
   require their separate shared-system owners and authoritative evidence.
4. Native Safari/VoiceOver, human product/Brand review, public-origin parity and
   release authority remain separate.
5. Production postcard and writing-room consumers must adopt one accepted
   governed catalogue before duplicate arrays can be removed.

KSVL remaining gates:

1. Product/Brand judgment of the complete station treatment.
2. Shared-player and DJ Booth reconciliation under their own collision lock.
3. Canonical transcript/caption/lyrics and missing-source-route content debt.
4. Native Safari/VoiceOver/true-zoom and human audio-quality checks.
5. Provider/moderation/privacy/retention, Closet, analytics, release artifact
   and public-origin verification under their separate authorities.

Town Hall remaining gates:

1. Final room art and human Product/Brand judgment; the current chamber remains
   an interim fallback and was not promoted as final.
2. Authoritative private-intake server, idempotency, abuse/rate controls,
   staff lifecycle, correction, retention/deletion and privacy proof.
3. Town Regular producer-to-Closet consumer verification under the shared
   contract.
4. Native Safari/VoiceOver/true zoom and human audio/accessibility checks.
5. Exact route integration, artifact, deployment, public-origin and rollback
   proof.

## Authority truth

No production route, shared identity/reward/player system, provider, deployment,
publication, public postcard or account state changed. These are isolated,
independently accepted building candidates only.
