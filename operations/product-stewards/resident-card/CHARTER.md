# Resident Card product charter

**Product:** Resident Card  
**Parent:** MAiKEOVER on MAiN  
**Champion:** Resident Card subchampion  
**Current verdict:** **DEVICE-LOCAL P0 VERIFIED LOCALLY — FIX BEFORE PROMOTION**

## Promise

Resident Card is a playful personal identity keepsake that lets a visitor
recognize herself across supported LAiDIES experiences on one browser and
device. It must make its authority legible: local personalization is not an
account, reserved handle, public identity, reward proof or cross-device copy.

## Product job

- A newcomer can understand the product and make a local Card without email.
- A returning visitor can confirm whether this browser holds a valid Card,
  edit it at MAiKEOVER and open the supported device-local Closet.
- A visitor with blocked or malformed storage receives an honest,
  non-destructive recovery path.
- Downstream products may read a bounded projection for presentation only.
  They may not treat it as authentication, authorization, publication,
  entitlement or learning evidence.

## Non-goals in the current release

- Member signup, sign-in, account restoration or two-device sync
- Reserved handles or public member Cards
- Community posting identity, room access or moderation authority
- A single ledger for quizzes, stickers, charms, badges or rewards
- Monetizing identity, accessibility or account recovery

## Quality order

1. identity, privacy, reward and persistence truth;
2. useful newcomer, returning and recovery journeys;
3. accessibility and reliability;
4. LAiDIES visual and voice quality;
5. growth and revenue.

Quality, accuracy and contribution to LAiDIES carry more weight than novelty or
conversion. A local Card that tells the truth is preferable to a richer
identity product whose authorization and recovery are unproved.

## Ownership boundary

The Resident Card champion owns the contract and status route. The MAiKEOVER
champion owns Card creation/editing and must preserve the one versioned atomic
local write. Closet/progression owns its separate local ledgers and may consume
only supported Card presentation fields. Identity/Privacy, Rewards/Economy,
Accessibility, Brand/Visual, Platform Reliability and Release remain
independent gates.

## Source trail

- `resident-card.html`
- `content/site/resident-card-v2.js`
- `maikeover.html`
- `laidies-card.html`
- `content/site/sorority-house-v2.js`
- `operations/painpoints-log.md`, especially BTB-106 and BTB-110
- `operations/product-stewards/CHAMPION-CONTRACT.md`
- `operations/product-stewards/ORCHESTRATOR.md`
