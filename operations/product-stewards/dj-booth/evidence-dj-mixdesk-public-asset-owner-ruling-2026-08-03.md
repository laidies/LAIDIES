# DJ Booth / Fun & Games + Brand public-asset owner ruling

**Date:** 2026-08-03  
**Status:** **REPLACE — CURRENT BYTE IS NOT AN ADMIT CANDIDATE**  
**Scope:** exactly the current DJ Booth hero and Open Graph image jobs. This
ruling does not create successor art, edit a consumer, admit an asset, update a
registry or manifest, build, deploy, publish, or approve the DJ Booth product.

## Decision

**REPLACE** `assets/house-dj-mixdesk.png` at exact SHA-256
`b38dd18a76769579ea61cc3796968cec5df0d1cd115f87c82c0c67216c3a3488`.

No use of this exact byte is admitted. It remains default-DENY for both of its
current jobs until a checksum-bound successor passes the route-owner, Brand,
rights/source, crop, accessibility and independent visual gates below.

The current asset's strongest retain case is narrow: it is a technically crisp,
colourful 1536 × 1024 PNG with period-adjacent CDs, headphones, a disco ball and
pink/cyan lighting, and one byte currently fills both jobs. Those virtues do not
overcome the identity, product-legibility, crop and provenance failures.

## Exact source and consumer binding

| Bound item | SHA-256 / identity | Current job |
| --- | --- | --- |
| Current asset | `assets/house-dj-mixdesk.png` — `b38dd18a76769579ea61cc3796968cec5df0d1cd115f87c82c0c67216c3a3488` | Current hero and social source byte; 1536 × 1024 RGB PNG. |
| Current route source | `games/dj-booth.html` — `3e6aea3ca0f792585abb512edd1fcb250337d2b38dd70b4159e6e97d5416190a` | Open Graph image at line 11 and visible hero image at line 647. |
| Runtime-family manifest | `operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/runtime-family-manifest.v1.json` — `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7` | Records the byte as `CURATION_REDO`; it does not admit it. |
| Public-asset inventory | `operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/public-asset-inventory.json` — `0d9dd1cb867f5adfc38479fe345d45f5a27a53be200beaab0fdd5bf1bf7b81bf` | Records the current source reference as prohibited/default-DENY; it does not admit it. |

This ruling covers only those two current occurrences. Historical prototypes,
launch artifacts and unstarted social plans do not become admitted consumers.

## Owner and Brand assessment

### Product and identity fit — fail

The image reads as a glossy pink personal desk or content-creator setup. The
dominant objects are a transparent portable CD player, loose compact discs, a
laptop waveform, makeup, stationery, butterflies and a disco ball. A small
audio box is partly cut off at the lower-right edge. The image does not visibly
establish KSVL 99.9, an ON AIR broadcast booth, DJ SunnyV, a broadcast
microphone, two playable turntables or an operable mixing console.

The current alt text, `Neon-lit DJ mixing desk with turntables and faders`, is
not an accurate description of the visible byte. The frame has no visible pair
of turntables and no legible fader bank. Current use and inaccurate alt text
cannot supply product or identity authority.

### 1990s / Rewind Era and LAiDIES Brand fit — fail

CDs, headphones and glitter are period-adjacent, but the modern laptop/waveform
screen and generic neon-pink beauty-desk styling do not locate the scene at
KSVL 99.9 in SUNNYVAiLE around 1999. The image over-indexes pink sparkle rather
than the full vibrant 1990s candy spectrum, and its glossy photoreal advertising
register does not match the provisional shared-world target of an adult,
dimensional comic/graphic-novel environment that is playful without becoming
childish. It looks generically Y2K-themed rather than specifically LAiDIES.

### Hero job and crop fitness — fail

The source is 3:2, while the route renders it with `object-fit: cover` at a
340px-high full-width desktop slot and 220px-high compact slot. At a 1440px
desktop viewport, only a narrow horizontal band survives; the lamp, star,
screen context, headphones and lower equipment are substantially cropped. The
remaining band emphasizes the portable CD player, not the booth or a primary
control. At compact width the full composition is more visible, but it still
does not identify the product accurately.

### Social / Open Graph job — fail

The byte is technically large enough to be resized, but it does not communicate
the page title or KSVL identity without surrounding HTML. A 1.91:1 social crop
would further remove the already weak context. Reusing the current byte as an
Open Graph image would distribute a generic, mislabelled visual rather than a
recognizable DJ SunnyV / KSVL Booth promise.

### Rights and source status — hold; cannot verify

I cannot verify a usable public-image right or provenance chain for this byte.
The PNG contains no creator, copyright, rights, description, software or date
metadata in the inspected fields. Repository history first shows it in commit
`43133eac2ea3caf92d5c6028e1cc5c60409b2695` on 2026-06-09, but a commit is not a
rights record. Current operations records call it `redo`, `nonapproved art` and
`from original episode`; none records the maker, generation source, licensed
inputs, output-rights terms or an owner approval. Therefore the byte cannot be
admitted for a public or social job even if its visual defects were ignored.

## Exact successor brief

Produce **one new 1920 × 1080 master** for proposed path
`assets/house-dj-mixdesk-v2.png`. That proposed name is a delivery target, not
an admitted path. The new exact byte must be independently judged before either
consumer changes.

### Required scene and product truth

- Show the actual KSVL 99.9 broadcast/DJ booth in SUNNYVAiLE around 1999.
- The physical hero object is an unmistakable, operable DJ/broadcast console:
  two turntables with vinyl, a substantial central mixer with real faders,
  headphones and at least one broadcast microphone.
- Make `KSVL 99.9` and `ON AIR` the only required visible words. They must be
  legible and exact; no garbled labels, streaming-service marks or invented
  product UI.
- Support the current page promise—choose and listen to LAiDIES originals—
  without baking a current track title, count, play state, account state,
  playlist provider, reward or availability claim into art.
- Keep the frame **object-led and unpopulated** for this shared hero/social job.
  That avoids creating an unruled character crop and lets the console survive
  the extreme desktop band. If a future separate decision adds a person, the
  only permitted keeper is canonical DJ SunnyV, not a generic DJ.

### Exact governing references

- Room and console geometry reference:
  `assets/building-interiors/ksvl-booth.jpg` — SHA-256
  `7dc6778f73c6391f286f2aa63cbd6dc9067af764c1015d0a892ee0ecb3bd3155`.
  It is a reference, not an admitted successor byte.
- If later populated under a separate ruling, DJ SunnyV identity/style
  reference: `assets/episodes/ep-04/pixel/ep04-character-test-dj-sunnyv-comic-v1-no-halftone-1920.png`
  — SHA-256
  `8225ed3ff7623f15fe52bd6e601517ac7123b8e5fbcf7840d07d38278166ca08`.
- Visual system: adult dimensional comic/graphic-novel rendering; bold ink,
  hard angular shadow planes, saturated colour, controlled printed texture;
  vibrant candy pink, teal, coral and periwinkle on near-black aubergine,
  with enough broader spectrum that the room is not simply magenta-on-black.
- Exclude glossy stock-photo/product-advertising realism, generic influencer
  desk staging, makeup as the scene thesis, flat-vector/cartoon styling,
  illegible album art, current laptops/waveform screens and decorative objects
  that displace the actual controls.

### Crop and job contract

- Keep the complete turntable–mixer–turntable control story and at least one
  microphone inside the central 1920 × 460 horizontal safe band so the current
  1440 × 340 desktop hero crop remains truthful.
- Keep `KSVL 99.9` and `ON AIR` within a central 1200 × 630 social-safe area and
  prove a 1.91:1 Open Graph crop does not remove either product identity or the
  primary console.
- Prove the existing 390 × 220 compact hero crop independently. No primary
  control, identity label or physical relationship may be lost.
- Do not place critical detail or lettering against the outer 10% of any edge.
- Proposed hero alt text, subject to the exact rendered byte:
  `KSVL 99.9 mixing console with turntables, broadcast microphone and an illuminated ON AIR sign in DJ SunnyV's booth.`
- The same successor byte may fill both current jobs only if the exact hero and
  Open Graph crop proofs pass. Otherwise produce a separately checksum-bound
  1200 × 630 derivative from the approved master and rule it independently;
  do not silently crop or substitute it.

### Source, rights and acceptance evidence

The successor packet must record maker/tool/model, generation or creation date,
exact prompt/build source, every reference path and SHA, output-rights terms,
any licensed inputs, and a statement that no third-party logo, protected album
art or unapproved likeness is present. It must bind the final candidate SHA and
decoded dimensions.

Independent review must inspect the full-resolution image and the real 1440 ×
340, 390 × 220 and 1200 × 630 renders; compare it with the exact references and
this brief; verify text and physical plausibility; and issue separate DJ Booth
product, Fun & Games cohesion, Brand/visual, rights/source and accessibility
verdicts. Platform registry/build integration begins only after those exact-byte
verdicts pass.

## Calibration / real failure condition

This gate can fail. A candidate fails even if attractive when **any** of these
is true: the central desktop crop does not retain two turntables, the mixer and
a microphone; `KSVL 99.9` or `ON AIR` is absent/garbled; the scene reads as a
generic beauty/creator desk; a modern streaming/laptop interface becomes the
visual thesis; the only DJ shown is not canonical DJ SunnyV; the Open Graph
crop loses product identity; or source/output rights remain unrecorded.

The current exact byte is the calibration failure: it is polished enough to
tempt retention, yet it fails the product-identity, truthful-alt, crop and
provenance conditions above.

## Next integration action

The DJ Booth image maker creates the single successor candidate and its three
crop renders from the exact brief above. A role-distinct DJ Booth/Fun & Games +
Brand/visual + rights judge then issues a checksum-bound verdict. Only after
that pass may Platform replace both current references, propose an active-asset
registry row, regenerate the deterministic public-asset inventory and run
builder/inventory parity plus source narrowing. No current byte or proposed
path is admitted by this ruling.

## Verification performed and skipped

- Recomputed the current asset, route, runtime-manifest and inventory hashes.
- Inspected the exact 1536 × 1024 asset at original resolution.
- Inspected the current route source, hero CSS/crops, alt text and Open Graph
  consumer.
- Inspected the KSVL/DJ Booth/Extra Credit owner records, KSVL visual inventory,
  current Brand visual rules, curation records and the Batch 3 maker packet.
- Ran `node scripts/check-product-stewards.mjs --owner-entry dj-booth`:
  `owner_entry_product=dj-booth:PASS` (structural owner entry only).
- Skipped visual generation, browser rendering, source/consumer edits,
  independent successor review, registry/manifest mutation, builder execution,
  deployment and public verification because no successor candidate exists and
  those actions are outside this ruling's write scope.
