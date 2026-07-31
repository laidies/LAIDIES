# Trading Cards Operating Spec

**Status:** SPECIFIED — implementation queued  
**Authority date:** 2026-07-26

## Product model

There are two distinct decks:

1. **Concept Cards** — episode-tied learning reinforcement. Front: one plain
   term/phrase and its image. Back: the short true explanation and memory cue.
2. **Character Cards** — the admitted SUNNYVAiLE/LUMINAiRY character catalogue.
   Front: character identity. Back: role, place/wing and the lesson she or he
   embodies.

Pack opening is delight, not assessment. A card may be collected without
mastery. Quiz and Study Pack completion remain separately owned outcomes.

## Catalogue contract

Every card record requires:

`card_key`, `deck`, `catalog_version`, `release_state`, `episode_or_roster`,
`front_title`, `front_hook`, `back_heading`, `back_copy`, `source_authority`,
`source_locator`, `image_front`, `image_back_or_rendered_copy`,
`alt_front`, `alt_back`, `pack_keys[]`, `identity_ref`, `visual_review_receipt`,
`editorial_review_receipt`, `correction_owner`, `updated_at`.

Release states are `candidate`, `held`, `admitted`, `retired` and `corrected`.
Only `admitted` records may enter an openable pack.

Stable keys:

- cards: `concept:s01:e01:generative-ai:v1`,
  `character:town:jojo:v1`, etc.;
- episode packs: `pack:concept:s01:e01:v1` through
  `pack:concept:s01:e04:v1`;
- weekly handoff: `pack:concept:sSS:eEE:vN`;
- character families: `pack:character:town:vN`,
  `pack:character:saints:vN`, `pack:character:mavens:vN`,
  `pack:character:trailblazers:vN`.

Keys are immutable. Copy/art corrections create a new card/catalog version and
an explicit supersession; they do not mutate historical receipts invisibly.

The Weekly Episode Engine supplies upstream `packKey=episode-NN` plus
`packVersion=<canonical episode SHA-256>`. Trading Cards preserves both in its
receipt and maps them to its product key `pack:concept:sSS:eEE:vN`. The upstream
key identifies episode substance; the Trading Cards key identifies a selected,
composed and admitted card pack. Receipt does not imply selection.

## Visitor states

| State | Recognition | Honest arrival/action | Result and return |
|---|---|---|---|
| First-time visitor | No reliable local Card/account or entitlement | Explain two decks; allow catalogue/binder preview; opening requires an admitted grant | No ownership implied; give an exact route to earn/request a pack |
| Returning, no Resident Card | Optional device-local view/history only | Restore only clearly labelled on-this-device preview state; do not invent packs | Continue browsing; local state is not tradable or cross-device |
| Resident Card — device-local | Valid local Card envelope, no verified account | Personal orientation may use the local name; collection remains preview/local unless Platform proves otherwise | Explicit “on this device”; sign-in invitation cannot promise merge |
| Resident Card — verified account | Verified account plus admitted entitlement projection | Show sealed granted packs, server-open result, duplicates and private binder | Same server projection after reload/device change; corrections/revokes propagate |

Also test signed-in without Card, signed-out former account, corrupt/migrated
local state, another resident/public view, revoked/deleted account, offline,
storage denied and account/local conflict.

## Authoritative grant and opening

The browser never selects pack contents. Platform must:

1. accept an authorized `source_completion_id` or explicit administrative
   grant;
2. create one idempotent sealed-pack entitlement;
3. open it server-side against an immutable catalogue and odds version;
4. return the same receipt on replay;
5. prevent duplicate card IDs within one pack;
6. apply the visible pity rule and fixed published odds;
7. append immutable ownership events and derive a private read projection;
8. handle duplicate counts, gift/trade transfer, revoke/correction and
   catalogue retirement without rewriting history.

Minimum receipt fields:

`pack_entitlement_id`, `resident_id`, `pack_key`, `catalog_version`,
`odds_version`, `grant_source`, `idempotency_key`, `opened_at`,
`cards[{card_key,finish}]`, `pity_before`, `pity_after`, `receipt_version`.

No direct client insert/update/delete is allowed. Raw reward/economic events
are private and must never be exposed by a public Resident Card.

## Binder and Closet

- Trading Cards renders the complete catalogue and owned/missing/duplicate
  states from the admitted private projection.
- Closet consumes the same projection, split into Concept and Character tiles.
- Device-local preview state is visually and semantically separate.
- Public Cards omit the collection until a separately accepted visibility
  contract exists.
- Empty, loading, unavailable, offline, stale, partial, retry, corrected,
  revoked and signed-out states are explicit.

## Visual sequencing

Visual work is paused. After Ali selects the sitewide Brand direction:

1. Brand issues KEEP/ADAPT/REJECT for every current reference and asset family.
2. The maker produces one card face for one card.
3. Automated dimension/file checks run.
4. A human inspects that single image at original size and 300px display size
   for identity, hands/anatomy, text, era, contrast, crop and artefacts.
5. An independent brand/identity/accessibility reviewer records PASS/HOLD.
6. Only a PASS permits the next face; front precedes back, back precedes finish.

Existing `tradingref-01..04` and JoJo establish observable candidate features
(portrait proportion, bold borders, halftone, banner, bursts, candy accents and
large back copy), but have no final-style authority after the 2026-07-26
sequence ruling.

## Accessibility and privacy

- A card is a semantic button only when it performs a flip; its visible title
  remains text and its state is announced.
- Front and back content must be available without motion or image recognition.
- Keyboard activation, deterministic focus, reduced motion, 200% zoom, 320px
  width and screen-reader reading order must pass.
- Alt text describes the meaningful visual without repeating all adjacent card
  copy. The full back copy remains real text wherever possible.
- Analytics use controlled card/pack/result IDs only; no email, handle, notes,
  prompt content, gift message or raw account identifier.

## Freshness and correction

Episode catalogue rows revalidate whenever canon changes and before each weekly
release. Character rows revalidate on every roster/identity correction and at
least before a new pack catalogue version. A stale authority receipt fails
closed. Correction creates a compensating catalogue/ownership event and updates
all private consumers.

The accepted weekly input contract is
`operations/product-stewards/episode-experience/ownership-handoff-trading-cards-weekly-episode-engine-2026-07-26.md`
at SHA-256
`5279ed830eb2ce3dc5672efe3aad6e4bf1928f23cd8db2bb9e13995af8932e3d`.
Episode 05 has no Gate 1 envelope and remains unavailable to receiver review.
