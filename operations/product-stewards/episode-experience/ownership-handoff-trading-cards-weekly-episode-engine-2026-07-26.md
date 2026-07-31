# Weekly Episode Engine → Trading Cards ownership handoff

**Status:** `SPECIFIED / CAPTURED FOR RECEIVER REVIEW`  
**Effective:** 2026-07-26  
**Producer:** Weekly Episodes — Engine & Production  
**Receiver:** Trading Cards subchampion, under Blend & Snap  
**Purpose:** supply one canonical weekly content envelope without turning the
episode team into the card-product author.

## Ownership boundary

Weekly Episodes owns the episode's teaching/editorial intent and supplies
canonical content, characters/guests, source/rights truth and a stable pack
identity.

Trading Cards owns the card product: pack composition, card types, art
direction, templates, fronts/backs, interaction, rarity/duplicates, opening,
collection/trading terminology, accessibility, issuance/ownership,
correction/revoke behavior, analytics, acceptance and release.

Receipt is not a commission or admission. Trading Cards may
`select`, `request_correction`, `defer`, `decline` or `hold`. It must not
rewrite episode canon or treat a card pull as proof of learning. Weekly
Episodes must not generate competing card art or a second collection system.

## Required weekly envelope

The handoff is triggered only after episode substance and canon are approved.
It contains:

```json
{
  "handoffVersion": 1,
  "packKey": "episode-NN",
  "packVersion": "<full canonical episode SHA-256>",
  "episode": {
    "number": "NN",
    "title": "<approved public title>",
    "canonPath": "content/episodes/episode-NN.canon.md",
    "canonSha256": "<full SHA-256>",
    "practicalOutcome": "<what the learner can now explain or do>",
    "rememberLine": "<approved retrieval line>"
  },
  "canonicalConcepts": [
    {
      "conceptId": "<concept-map ID>",
      "preferredLabel": "<canonical label>",
      "plainMeaning": "<approved episode-level meaning>",
      "misconceptionOrLimit": "<important boundary>",
      "sourceReceipts": [
        {
          "pathOrUrl": "<source>",
          "sha256IfLocal": "<full SHA-256 or null>",
          "accessedOrApprovedAt": "<date>"
        }
      ]
    }
  ],
  "charactersAndGuests": [
    {
      "canonicalId": "<stable ID>",
      "displayName": "<approved name>",
      "episodeRole": "<teaching/story role>",
      "approvedReferencePath": "<path or null>",
      "referenceSha256": "<full SHA-256 or null>",
      "likenessOrUsageStatus": "approved|held|unknown|not_applicable"
    }
  ],
  "copyAndRights": {
    "approvedQuotables": [],
    "attributionRequirements": [],
    "thirdPartyQuotes": [],
    "popCultureReferences": [],
    "rightsHolds": [],
    "publicityOrLikenessHolds": []
  },
  "engineVerdict": "ready_for_receiver_review|hold|correction|withdrawn",
  "supersedesPackVersion": "<full prior canon SHA-256 or null>"
}
```

`packKey` is the stable episode identity. `packVersion` is the full canon
checksum, so a correction cannot masquerade as the earlier pack.

## Fail-closed rules

- Unknown or held rights/likeness status remains a hold; Trading Cards may not
  infer permission from episode presence.
- A character or guest appearing in the envelope is eligible for receiver
  consideration, not automatically selected for a card.
- Copy must remain traceable to canon/source receipts. Trading Cards may adapt
  it to its product only through its own editorial gate without changing the
  concept.
- A canon correction creates a new `packVersion`; the receiver decides
  correction, revoke or supersession across its authoritative collection
  system.
- No local randomized pull, filename, route or card image proves admitted
  issuance, ownership, trading, Closet delivery or cross-device persistence.
- Missing Trading Cards owner-entry records block production/admission but do
  not erase this captured dependency.

## Receiver return

Trading Cards returns a checksum-bound receipt naming:

- received `packKey` and `packVersion`;
- selected/deferred/declined concepts and characters with reasons;
- final card/pack manifest and exact art/copy/source/rights checksums;
- independent product, content, brand, accessibility and technical verdicts;
- truthful local/account persistence and issuance/ownership scope;
- correction/revoke/supersession behavior;
- release/public proof if later admitted; and
- the exact next action or blocker.

## Current receiver truth

The registry names `trading-cards` under Blend & Snap, but its registry-bound
`trading-cards/CHARTER.md` and `trading-cards/state.json` are currently
missing. Therefore this handoff is `CAPTURED FOR RECEIVER REVIEW`; no card pack
production or admission is authorized until Control Room/Blend & Snap restores
the subchampion's owner entry and Trading Cards accepts the contract.

## Episode 5

Episode 5 remains before Gate 1. No Episode 5 card envelope exists and none may
be invented from the title, rejected canon or historical handoffs.
