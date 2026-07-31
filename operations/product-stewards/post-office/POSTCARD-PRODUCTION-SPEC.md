# Postcard visual and product production specification

**Status:** SPECIFIED — REQUIRED PRODUCTION LANE; VISUAL GENERATION PAUSED
PENDING SITEWIDE BRAND RULING

**Owner:** Post Office product champion

**Acceptance owners:** Brand & Experience (visual/canon), Audience & Growth
(send value), Functionality & Platform (delivery/identity/reward contracts),
Control Room (lock/integration/release), Ali (sitewide Brand/public taste)

## The intended Post Office visit

Postcards are the operated heart of Penny's Post Office:

`enter Penny's counter → browse a physical rack → choose one for a real person
→ write privately at the desk → proof the front and back → choose Download,
Copy, Share, Text or Email → receive the exact result → return or follow the
authoritative invitation state`

The experience must feel like visiting the colourful, vibrant Post Office,
not a generic gallery/form page and not a room image behind floating cards.
The rack, writing surface, proof and outgoing counter are physical parts of
the environment and remain usable without relying on baked functional text.

## Family architecture

### 1. Evergreen town/invitation family

Job: give anyone a durable, person-specific reason to share SUNNYVAiLE.

Required Release 1 records: **3**.

1. Welcome / Visit SUNNYVAiLE
2. You've Got Mail / Post Office
3. Your People / warm invitation

All three require a clear sending reason, distinct emotional copy job and
non-episode shelf life.

### 2. Building family

Job: let a visitor send the place she just experienced or recommend one exact
destination.

Required records: **17**, one for every registered building ID. A record may
remain `BRIEFED / NOT GENERATED` until its building owner has a truthful,
current environment/capability to depict. No generic façade substitute counts.

Each building owner approves:

- building/route identity and current name;
- environment, host, operated object and period/canon;
- exact recipient promise and return destination;
- rights/provenance and alt intent; and
- whether the card is evergreen or tied to a release.

### 3. Character family

Job: send a warm character-specific invitation, encouragement or useful
handoff rather than a generic promotional portrait.

Required Release 1 records: **6**:

1. Penny / Post Office invitation
2. Miss Jeeves / pass along a reference
3. JoJo / coffee-study encouragement
4. Mme CLAi-O / send a move/reading invitation
5. DJ SunnyV / song or dedication handoff
6. FAiRY Godmother / advice/help invitation

Every record remains `BRIEFED / NOT GENERATED` until its character owner and
Brand accept the locked identity/reference kit and distinct sending reason.

### 4. Episode family

Job: turn a genuinely sendable episode scene, line, reference or connection
moment into correspondence.

For Episodes 1–4, create exactly **4 opportunity/admission records**. Each
record ends in either:

- `SELECTED — PRODUCE ONE FRONT`, or
- `EXPLICIT NONE — NO INDEPENDENT SENDING REASON`.

Do not force four images. The image count is **0–4**, determined by the
episode opportunity gate. Future episodes add one admission record per episode.
Comic episode frames are briefs, not automatic postcard fronts.

## Exact Release 1 output contract after Brand unlock

### Records

- 3 evergreen records
- 17 building records
- 6 character records
- 4 Episode 1–4 opportunity records
- 1 catalogue manifest
- 1 rights/provenance manifest
- 1 copy matrix
- 1 alt/accessibility matrix

Total governed records: **34 card/opportunity records + 4 shared manifests/
matrices**.

### Visual masters

- Base-family masters: **26 PNGs maximum**, generated/admitted only when each
  record has its owner inputs.
- Episode masters: **0–4 PNGs**, only for selected opportunities.
- Total possible Release 1 master fronts: **26–30**.
- Every admitted master: **1800×1200 PNG**, 3:2, versioned, no overwrite.
- Every admitted master gets **one 1200×800 WebP** derivative and one
  deterministic text/image-failure fallback.

### Deterministic product outputs

- One live front/back composer; not one raster back per card.
- One catalogue authority consumed by Post Office rack and composer.
- One front-only Download result and one composed-proof Download result, if
  those capabilities pass privacy/accessibility review.
- Five separately labelled outgoing actions:
  `Download`, `Copy`, `Share`, `Text`, `Email`.
- Platform-backed `Send/Postcard on its way` appears only after the separate
  invite lifecycle is accepted.

## Exact paths

Until Brand unlock, write only dossier/evidence:

- inventory/spec/packet:
  `operations/product-stewards/post-office/`
- later isolated art candidates:
  `operations/design-explorations/post-office-postcards-20260726/`
- candidate asset records:
  `operations/design-explorations/post-office-postcards-20260726/records/`
- candidate masters:
  `operations/design-explorations/post-office-postcards-20260726/candidates/`
- rejected/superseded:
  sibling `_rejected/` and `_superseded/`
- exact-use-approved production assets:
  `assets/postcards/from-sunnyvaile/brand-v1/`
- catalogue candidate:
  `content/site/postcard-catalog.json`
- frontend consumers after an integration lock:
  `postcard.html`, `post-office.html`, `content/site/post-office.js`,
  `content/postcard-v2.css`
- exact evidence:
  `operations/product-stewards/post-office/evidence-postcard-production-2026-07-26/`

These future paths are contracts, not current authorization to create or edit
them.

## Card record schema

Every record names:

`id, family, title, sending_reason, recipient_job, source_owner,
canon_source, episode_or_building_id, character_id, front_master,
web_derivative, aspect, alt_intent, decorative_text_policy,
front_copy, back_copy_variant, destination_route, personalization_allowed,
share_channels, download_allowed, rights_status, provenance_record,
brand_status, owner_acceptance, exact_use_status, supersedes, fallback`

## Personalization and privacy

- Private note: 240 characters maximum unless evidence changes it; local only
  until an approved invite store exists.
- Signature: 24 visible grapheme clusters maximum; it is presentation, not
  verified identity.
- Recipient name: optional local presentation only until Platform authorizes an
  account-backed relationship.
- No contact upload, address book access, raw email/phone, note, signature,
  invite token or full share URL in analytics.
- No surprise persistence. Draft saving requires explicit consent, exact scope
  and delete control.
- Front/back preview must expose deterministic non-motion controls and a static
  accessible summary.

## Mobile and accessibility

- 320, 390, 720 and 1440 CSS-pixel evidence.
- True 200% zoom/reflow, reduced motion and image-failure state.
- Rack scroll position and selected state remain visible/focusable.
- Front/back control announces current side; no essential information depends
  on a 3D flip.
- Note/signature errors, channel results and copy/download recovery use live
  status and visible focus.
- VoiceOver on iOS Safari and TalkBack on representative Android.
- Native Share available/cancel/error/unsupported states tested on real devices.
- Alt text describes the useful scene/subject, not decorative baked slogan
  verbatim unless that wording is essential to the card's sending reason.

## Brand, rights and quality

- Sitewide Brand direction must be selected first.
- Postcard translation then defines scene/character/render language, edge,
  texture, palette, lettering, calm back and environmental integration.
- The current 19 files are incumbent evidence, not reference authority.
- Tourist-postcards-v9 remains retired and cannot be used or referenced.
- No generated LAiDIES logo/wordmark.
- Decorative postcard slogans may be baked only under the Brand text rule and
  independent spelling/canon proof; functional copy stays live.
- Per-file provenance must identify tool, prompt, input references, date,
  creator/owner, commercial-use basis and exact-use permission.
- Independent full-resolution review covers anatomy, character identity,
  setting, signage, spelling, repeated motifs, crop, artifacts and resemblance
  to rejected/off-limits work.

## Truth and platform boundary

Download/Copy/Share/Text/Email are useful complete actions at their own scope.
None proves a recipient or delivery.

The later Platform lifecycle owns:

`invite issued → provider accepted → delivered|bounced|unknown →
authorized open → claimed → joined → rewarded|reversed`.

The Post Office consumes those states. It does not invent them from browser
promises, page visits, local storage or analytics.

## Acceptance sequence

1. Brand championship admitted evidence.
2. Ali selects sitewide Brand direction.
3. Brand issues Postcard translation and Control Room image lock.
4. Six-card proof tranche: **1 evergreen + 2 buildings + 2 characters +
   1 selected episode or a third character when no episode is selected**.
5. Independent Brand/rights/product/accessibility review at full resolution.
6. Audience send-value test: each card is matched to a named real-life sending
   reason; no campaign claim or channel use.
7. Remaining admitted records produced in bounded waves.
8. Catalogue/composer integration under a separate lock.
9. Native/accessibility/exact-artifact review.
10. Platform invitation/reward integration only through its existing packet.
11. Release/public/channel authority remains separate.

## Current blocker, unblock and Ali decision

- **Blocker:** no selected sitewide Brand direction; global visual lock active.
- **Unblock:** Brand returns an admitted sitewide set, Ali selects the
  direction, Brand supplies Postcard-specific rules and Control Room grants an
  isolated image-production lock.
- **Real Ali decision:** sitewide Brand direction only. No postcard-specific
  art choice is ready and none should be presented yet.
