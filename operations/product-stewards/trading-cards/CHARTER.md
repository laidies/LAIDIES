# Trading Cards Subchampion Charter

**Status:** QUEUED — owner entry recovered; rebuild specified; no task or
integration lock is bound  
**Product ID:** `trading-cards`  
**Parent:** `blend-snap`  
**Champion:** `trading-cards-subchampion`  
**Founder decision owner:** Ali

## Product promise

Trading Cards turn released episode ideas and the people of SUNNYVAiLE into
objects a visitor can open, flip, remember, collect and deliberately gift.
Concept cards reinforce learning; character cards deepen place and character
recognition. Neither deck proves learning, account membership or durable
ownership unless the corresponding authority is actually present.

## Owned job

- Maintain the versioned Concept and Character card catalogue.
- Maintain episode pack membership and stable pack/card keys.
- Specify front/back copy, image identity, alt text and release state.
- Maintain a paired standard and holo-foil front for every admitted character
  card. The holo-foil version preserves the same identity, wording,
  composition and information hierarchy; it is a finish variant, not a
  separate redesign and not a substitute for the readable standard front.
- Present opening, flipping, duplicate and binder journeys truthfully for every
  visitor state.
- Hand authoritative pack grant/open/ownership/persistence work to Platform,
  and consume the admitted read model in the binder and Closet.
- Run one-image-at-a-time visual production and inspection after Ali chooses the
  sitewide visual direction.

## Current truth

- The live concept manifest has 15 rows: five each for Issues 01–03 and none
  for Issue 04. Its rows are not a canon-complete episode deck.
- Five Episode 04 concept images exist but are not wired into the manifest.
- The character-card asset folder contains only JoJo front/back/foil variants.
  Variants are not unique characters.
- The 13-keeper prompt is a town subset, not proof of the full promised
  SAiNT/MAiVEN/TRAiLBLAZER/town roster.
- The current route stores collection state in browser storage and randomizes
  opening client-side. It is not authoritative ownership or fair trading
  evidence.
- No Trading Cards task is bound in the run queue. Durable ownership is
  recovered, but the rebuild lane is `QUEUED`, not `RUNNING`.

## Scope and boundaries

Owned dossier scope during recovery:
`operations/product-stewards/trading-cards/**`.

Shared or live paths require a Control Room integration lock:

- `content/site/card-packs.json`
- `games/trading-cards.html`
- `assets/cards/**`
- Closet/Resident Card code and projections
- shared identity, reward, economic-event and persistence services
- sitewide visual system, global CSS/JS, deployment and publication

Episode owners remain authoritative for released lesson/canon. LUMINAiRY
editorial owns SAiNT, MAiVEN and TRAiLBLAZER roster/claim admission. Platform
owns server grants, pack opening, idempotency, entitlements, correction and
cross-device truth. Closet owns the collection consumer surface.

## Non-goals

- Do not generate or select new card visuals before Ali's Brand ruling.
- Do not promote `tradingref-01..04`, JoJo or existing concept art to the
  sitewide/final card style. They are candidate constraints only.
- Do not call local storage an account binder, reward ledger or synced
  collection.
- Do not infer a final roster from prompts, current page markup or old asset
  counts.
- Do not publish, deploy, spend, change global style or edit live/shared routes
  without the named lock and owner acceptance.

## Triggers

- A released episode or canonical glossary/lesson changes.
- A keeper or LUMINAiRY roster/identity is added, removed, renamed or corrected.
- Ali issues the sitewide Brand direction and the KEEP/ADAPT/REJECT asset
  ruling.
- Platform admits a grant/open/entitlement contract.
- Closet admits the corresponding read model and correction behavior.
- A card, pack, binder, duplicate, trade, gift, persistence or accessibility
  defect is reported.

## Definition of done

The product is not complete until the versioned episode and character
catalogues are closed by their authority owners; every admitted card has exact
front/back copy, final art, the required standard/holo-foil character-front
pair, truthful alt text and pack membership; one-at-a-time
visual review passes; server-side grant/open/replay/correction passes; the same
ownership projection appears in Trading Cards and private Closet; all visitor
states, mobile/desktop, keyboard/screen-reader, failure/offline and
cross-device transitions pass independently; and the exact release artifact is
deployed and publicly verified.
