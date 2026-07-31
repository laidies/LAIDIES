# Postcard visual/product inventory

**Status:** REPORT READY — SELECTION LABELS ARE PENDING BRAND

**Evidence date:** 2026-07-26

**Owner:** Post Office product champion
**Trigger:** Ali ruled that Postcards are a required visual/product production
lane, then paused new visual generation until the sitewide Brand direction is
selected.

This inventory is source/usage evidence, not visual admission. `KEEP`,
`ADAPT`, and `REJECT` below control what enters the later Brand-dependent
review; no label approves final art, a live route, sending, deployment or
publication.

## Literal current state

- `postcard.html` has **13 stable picker IDs**, 13 PNG fronts, live note and
  bounded signature personalization, front/back proof, native Share, SMS,
  email and Copy actions.
- `content/site/post-office.js` exposes **12 of those 13** at the Post Office
  rack; `puffy-binder` exists only in the full composer.
- The direct production family
  `assets/postcards/from-sunnyvaile/` contains **19 files**:
  **16 PNGs + 3 WebP derivatives**.
- The 13 active fronts share a 3:2 UI frame, but `pc-park.png` is 1672×941
  and is cropped into it. `pc-fairy-godmother.png` is 1774×887 and is not in
  the picker. Most other PNGs are 1535/1536×1024.
- Existing July 24 construction evidence proves the physical
  counter → rack → writing desk → proof → outgoing counter grammar at
  1440×900 and 390×844. It does not prove final Brand fit.
- Current code prepares or copies a public card URL and user-controlled message
  text. It cannot prove that a recipient was sent, delivered, opened, joined
  or rewarded.

## The 19-file current family

Label definitions:

- **KEEP — PENDING BRAND:** preserve the file as the incumbent functional
  comparison and preserve its stable picker ID/path dependency. The pixels are
  not approved as final art.
- **ADAPT — PENDING BRAND:** preserve the concept/use and source file, but
  geometry, art, lettering, role or catalogue admission must change after the
  Brand ruling.
- **REJECT AS MASTER — PENDING BRAND:** do not treat this byte as a postcard
  master. Preserve only for its existing derivative consumer until that
  consumer receives an approved replacement.

| File | Dimensions | Current use | Selection |
|---|---:|---|---|
| `greetings-from-sunnyvaile-post-card.png` | 1536×1024 | Not in picker; referenced by held launch drafts | ADAPT — PENDING BRAND |
| `pc-blend-and-snap.png` | 1536×1024 | Picker + Post Office rack | KEEP — PENDING BRAND |
| `pc-bronze-aige.png` | 1535×1024 | Picker + Post Office rack | KEEP — PENDING BRAND |
| `pc-chick-flicks.png` | 1536×1024 | Picker | KEEP — PENDING BRAND |
| `pc-chick-flicks.webp` | 1400×933 | Homepage/isolated exploration derivative | REJECT AS MASTER — PENDING BRAND |
| `pc-dial-up.png` | 1536×1024 | Picker + rack + media reference | KEEP — PENDING BRAND |
| `pc-dial-up.webp` | 1400×933 | Homepage/trailer derivative | REJECT AS MASTER — PENDING BRAND |
| `pc-fairy-godmother.png` | 1774×887 | Not in picker; concept reference only | ADAPT — PENDING BRAND |
| `pc-ksvl.png` | 1535×1024 | Picker + Post Office rack | KEEP — PENDING BRAND |
| `pc-library.png` | 1536×1024 | Picker + Post Office rack | KEEP — PENDING BRAND |
| `pc-main-street.png` | 1536×1024 | Picker + Post Office rack | KEEP — PENDING BRAND |
| `pc-mme-claio.png` | 1536×1024 | Picker + Post Office rack | KEEP — PENDING BRAND |
| `pc-park.png` | 1672×941 | Picker + Post Office rack; cropped by 3:2 frame | ADAPT — PENDING BRAND |
| `pc-puffy-binder.png` | 1536×1024 | Composer-only picker object | ADAPT — PENDING BRAND |
| `pc-puffy-binder.webp` | 1400×933 | Homepage derivative | REJECT AS MASTER — PENDING BRAND |
| `pc-sorority-house.png` | 1536×1024 | Picker + Post Office rack | KEEP — PENDING BRAND |
| `pc-welcome.png` | 1536×1024 | Picker, rack, Visitor's Centre and media | KEEP — PENDING BRAND |
| `pc-youve-got-mail.png` | 1536×1024 | Picker, rack and Post Office feature image | KEEP — PENDING BRAND |
| `wish-you-were-wired-post-card.png` | 1536×1024 | No live/source consumer found | ADAPT — PENDING BRAND |

Summary: **11 KEEP, 5 ADAPT, 3 REJECT AS MASTER — all pending Brand**.
The 13 picker IDs remain protected even where the art is marked ADAPT.

## Wider versioned backlog

The workspace contains **252 postcard-named asset paths / 233 unique SHA-256
hashes**. Counts below are exact filesystem counts, not approval counts.

| Family/path | Files | Inventory disposition |
|---|---:|---|
| Current direct family | 19 | Per-file labels above |
| `_superseded-20260708/` | 1 | REJECT — superseded; do not revive |
| `assets/postcards/sunnyvaile-v3/` | 3 | ADAPT — PENDING BRAND; concept/source only |
| Residence-card `_raw*` | 10 | ADAPT — PENDING BRAND; scene source, not postcard master |
| Residence-card `backdrops*` | 21 | ADAPT — PENDING BRAND; dual-use scene/background candidates |
| Residence-card contact sheets | 17 | KEEP as inventory evidence only |
| Residence-card generated general scenes | 6 | ADAPT — PENDING BRAND |
| Residence-card `postcards/` | 8 | ADAPT — PENDING BRAND |
| Tourist postcards base/v2/v3/v4 | 30 | ADAPT — PENDING BRAND; dedupe and provenance required |
| Tourist postcards v5 | 18 | ADAPT — PENDING BRAND; building coverage source only |
| Tourist postcards v6 | 18 | ADAPT — PENDING BRAND; contains byte duplicates with v7 |
| Tourist postcards v7 | 18 | ADAPT — PENDING BRAND; contains byte duplicates with v6 |
| Tourist postcards v8 | 18 | ADAPT — PENDING BRAND |
| Tourist postcards v9 | 18 | **REJECT — ALI RETIRED; DO NOT USE OR REFERENCE** |
| Willow/Sorority reroll families | 25 | ADAPT/REJECT only after Brand, canon and exact-use review |
| Scattered video/proof/postcard-named files | 22 | KEEP only for their existing media/proof purpose; not Post Office masters |

The residence-card subtree contributes **182 files**, including 17 contact
sheets. The reroll subtrees contribute **25**. At least 19 redundant paths are
explained by identical hashes, including v6/v7 duplicates and repeated
Dial-Up/video/reroll assets. Deduplication must never delete current consumers
without an exact reference and artifact crawl.

## Front, back and template truth

### Fronts

- Existing: 13 active raster fronts, with baked slogans/signage and uneven
  geometry/style. They are predominantly inherited painterly candidates.
- Missing: one admitted Brand system; a versioned master/derivative contract;
  complete 17-building coverage; a governed character family; governed
  episode derivatives; exact alt intent; per-file provenance and rights.
- Required master: 3:2 landscape, 1800×1200 PNG minimum, crop-safe at
  1200×800 WebP, with a text-free failure fallback.

### Back

- Existing: one deterministic HTML/CSS back with live note, bounded signature,
  public explanation, stamp/postmark illustration and “To: your friend.”
- Missing: downloadable/shareable rendered back; private recipient/invite
  state; locale/long-text tests; explicit line-count/overflow contract;
  print/export safe areas; accessible static alternative; rights/provenance
  manifest for any decorative stamp/character art.
- The back must remain deterministic. Private note/signature text must not be
  baked into a public master or URL.

### Templates and catalogue

- Existing: two duplicated JavaScript arrays (`postcard.html` and
  `content/site/post-office.js`) and CSS/HTML construction in
  `content/postcard-v2.css`.
- Missing: one admitted catalogue record per card, family, canon source,
  rights/provenance, front master, derivative, alt intent, selection status,
  episode/building/character owner and release state.
- Missing: automated parity across rack, composer, preview, URL, derivative,
  alt text and exact public artifact.

## Personalization and preview

| Capability | Existing | Missing/required |
|---|---|---|
| Card choice | `?pc=<id>` and keyboard-selectable buttons | One catalogue authority; exact unknown/retired ID behavior |
| Note | 240-character live local preview | Line/Unicode/RTL/overflow/export tests; explicit no-persistence policy |
| Signature | 24-character bounded local preview/share text | Rename from “handle” if account identity is not required; screen-reader and long-grapheme proof |
| Front/back proof | Click/button flip and 3D transform | Non-motion equivalent; explicit front/back controls/labels; static proof/export |
| Recipient | Generic “your friend” only | Opaque invite-backed authorized recipient state through Platform |
| Download | None | Optional front-only and composed-card download, truthfully labelled “Download,” not “Send” |
| Draft continuity | None admitted | Deliberate session/device policy; no surprise storage of private notes |

## Share, download and delivery truth

| Action | Current authoritative result | Allowed wording |
|---|---|---|
| Native Share | Browser promise resolves/rejects | “Share sheet closed”; never sent/delivered |
| SMS/email | Browser handed off to the user agent | “Opening your text/email app”; never sent |
| Copy | Clipboard reports success or exposes fallback | “Link copied” |
| Download, when built | Browser download completes/starts | “Downloaded” only |
| Platform invite, when built | Server issues opaque invite | “Postcard prepared/on its way” only under the accepted lifecycle contract |
| Provider delivery/open/join | Separate provider/invite/identity events | Only the exact authoritative state |

## Rights, brand and canon gaps

- No complete per-file ledger currently binds generator/tool, prompt, input
  references, date, creator/owner, commercial-use status and exact permitted
  placement for the 19 current files or wider backlog.
- Existing prompts and local files are provenance clues, not rights admission.
- Every future master must use the artwork-production asset record and
  independent exact-use verdict.
- Character cards require locked character identity/reference, population and
  background-person review; a plausible face is not canon.
- Building cards require the receiving building owner to approve façade,
  host/object, signage, current name and experience claim.
- Episode cards are conditional derivatives. An episode frame is a brief, not
  automatically postcard art, and v9 is not a permitted reference.
- Functional typography, privacy text and status remain live/deterministic.
  A decorative souvenir slogan may be baked only when Brand approves the rule
  and spelling is independently proofread; the LAiDIES logo/wordmark is never
  generated.

## Missing product evidence

- Brand-selected front family and exact-use admission.
- Human “would you actually send this?” evaluation through Audience.
- Real iOS Safari/Android native share and accessibility.
- Front/back static/export quality at mobile and desktop.
- Rights/provenance ledger.
- Complete building/character/episode owner acceptance.
- Platform invitation/delivery/open/join and rewards.
- Exact artifact/public-origin proof.

## Selection freeze

No new postcard visual may be generated, selected, copied into production,
integrated into the catalogue or propagated to another owner until:

1. the current sitewide Brand championship returns an admitted direction;
2. Ali selects the sitewide Brand direction;
3. Brand issues the Postcard-specific translation rules; and
4. Control Room grants a non-colliding image-production lock.
