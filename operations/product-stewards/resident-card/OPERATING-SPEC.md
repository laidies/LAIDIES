# Resident Card operating specification

**As of:** 2026-07-26  
**Authority:** product contract; not deployment or visual approval

## Intended experience

The Resident Card is a device-local keepsake and presentation profile. A
visitor makes or edits it at MAiKEOVER; `/resident-card.html` explains the
contract and recognizes a valid local record; the Closet may display supported
fields from the same record. This is one product journey across three surfaces,
not three competing identity systems.

## Newcomer and returning journeys

### Newcomer

1. Resident Card reports that no valid local Card exists.
2. It explains that no email or account is required.
3. The primary action opens MAiKEOVER.
4. MAiKEOVER saves one versioned envelope in this browser.
5. The visitor can return to the status route or supported local Closet.

### Returning on the same browser/device

1. The route validates version and object shape before reading fields.
2. It projects only bounded supported string fields.
3. It labels any valid local handle as a draft, never reserved identity.
4. It offers edit and device-local Closet actions.

### Recovery

- Empty storage is a newcomer state, not a failure.
- Malformed, empty or unsupported envelopes are not deleted or trusted.
- Blocked storage produces an explicit unavailable state.
- Clearing site data, private browsing, another browser or another device may
  remove the local copy.
- A destructive reset remains out of scope until Card and separate progression
  stores have a product-owned reset/export contract.

## Data and authority contract

- **Authoritative local key:** `laidies_resident_card_v1`
- **Envelope:** `{version: 1, fields: object}`; MAiKEOVER writes it with one
  verified `localStorage.setItem`.
- **Local handle:** `laidies_card_username`; presentation-only draft label.
- **Shared reader projection:**
  `content/site/resident-card-contract-v1.js` is the only supported v1 reader
  for Resident status, MAiKEOVER hydration and Closet. It requires exact
  top-level keys, a plain field object, known fields, field-specific bounds,
  no markup/control/bidi text and canonical packaged avatar paths.
- **Avatar rendering:** stored Card portraits are canonical decoded
  `/assets/` PNG/JPEG/WebP/GIF/AVIF paths only. They are assigned to
  DOM-created `img` elements; stored values are never interpolated into HTML.
  Generated PNG data may remain an unsaved MAiKEOVER preview but is not a
  supported persisted v1 Card value.
- **Separate persistence:** quiz, sticker, charm, trading-card and other
  activity stores remain owned by their products.
- **Forbidden escalation:** no local value may authorize account data, public
  publication, community identity, room access, reward issuance or
  cross-device restoration.
- **Backend:** none on `/resident-card.html`. Controlled Closet account
  preflight remains localhost-only and is not approved for production use.

## Privacy, safety and reliability

- Resident Card status asks for and submits no email.
- The route must not load account SDK/config or hidden account/profile forms.
- Never expose unknown envelope fields or private profile data.
- A record rejected by the shared projection cannot render as a supported Card
  in the status route, MAiKEOVER or Closet.
- Legacy per-field Card values may populate a safe MAiKEOVER review preview
  only after the same field rules pass. They are never current Card identity,
  are not read by Closet and are not silently upgraded or deleted.
- Never silently delete corrupt data.
- Analytics must not include names, handles, profile answers, raw storage,
  account identifiers or reward contents.
- A future authenticated Card requires verified provider identity, RLS,
  minimum-field public projection, non-enumerating private/not-found behavior,
  two-device restoration, logout and revocation tests.

## Accessibility and UX

- State is written as one polite atomic status.
- The primary next action remains a real link.
- `hidden` actions stay absent from the accessibility and visual trees.
- Local user content is text, never HTML.
- Reflow floor is 320 CSS pixels with no horizontal overflow.
- Keyboard focus is visible; no state is conveyed by colour alone.
- Native Safari, VoiceOver and zoom remain release evidence, not inferred from
  Chromium.

## Visual, voice and brand

- The Card should feel like an intentional SUNNYVAiLE keepsake, not a generic
  settings/profile page.
- Voice may be playful but cannot soften identity or recovery truth.
- The current vanity-station candidate and status layout are locally
  functional only. Ali’s visual/taste approval and a representative user
  comprehension check remain mandatory.
- No generated or found visual may be promoted without source, rights,
  canonicality and owner review.

## Analytics and customer evidence

No Resident Card-specific event is currently wired. Future aggregate events
may cover `state_viewed` (`empty|saved|invalid|unavailable`), `make_opened`,
`edit_opened` and `closet_opened`. Do not send names, handles, fields or
storage payloads. Optimize successful make → valid local recognition → useful
return, not raw Card views.

Weekly review:

- invalid/unavailable state rate;
- MAiKEOVER save success/failure;
- valid-Card return and supported Closet continuation;
- accessibility/support complaints;
- false expectations about accounts, public Cards or recovery.

Monthly review:

- dependency/copy drift across MAiKEOVER, Resident Card, Closet and House;
- envelope/version and browser support;
- privacy/data inventory;
- owner visual and representative-user evidence;
- whether account/public work remains worth its privacy and support cost.

## Revenue boundary

Keep local identity, editing, recovery and accessibility free. After product
trust and fulfillment proof, consider optional owner-approved printable Cards,
physical keepsakes or cosmetic packs. Decline paid handle reservation,
pay-to-recover, reward boosts and sponsor access to profile or identity data.

## Release gates

Current device-local P0 requires:

- contract and browser suites pass;
- no email/account runtime on the held route;
- newcomer, returning, invalid and blocked-storage journeys pass;
- local identity cannot unlock, publish, sign or prove rewards;
- fresh artifact contains exact approved source bytes;
- owner visual/comprehension and native AT gates pass;
- public route and release provenance are verified.

Account/public/cross-device release additionally requires:

- approved data map, retention and privacy copy;
- authenticated identity and authorization threat model;
- RLS plus restricted public projection;
- two-device create/edit/restore/logout/revoke/private/public suite;
- recovery and deletion contract;
- provider-cost/support plan and rollback rehearsal.
