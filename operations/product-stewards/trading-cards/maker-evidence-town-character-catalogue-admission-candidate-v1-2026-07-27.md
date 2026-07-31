# Maker evidence — Town character catalogue-admission candidate v1

**Evidence time:** 2026-07-27 (America/Vancouver)  
**Status:** `BUILT LOCALLY — CANDIDATE HELD / INDEPENDENT REVIEW PENDING`

## Literal product progress

The 13 visually accepted Town fronts now have one immutable candidate catalogue
record each. Every record binds:

- exact Town identity, role and place;
- exact accepted front path, hash, dimensions, title and visible hook;
- a complete proposed front alternative description;
- a rendered-copy card-back heading, teaching move, boundary and alternative
  description;
- separate visual, editorial, accessibility, technical and release states.

The candidate remains fail-closed: all editorial/accessibility/technical
reviews are `pending`, every release state is `held`, `pack_eligibility` is
false, and the catalogue explicitly says no pack has been created.

## Frozen tuple

- catalogue candidate  
  `operations/product-stewards/trading-cards/town-character-catalogue-admission-candidate-v1-2026-07-27.json`  
  SHA-256 `45b17e19c44e3c6d1ad424bfd83c86519df03a35d9aa692313b77c793c65fefa`
- deterministic validator  
  `scripts/test-town-character-catalogue-candidate.mjs`  
  SHA-256 `08551c98d7eae7e6c26af7248e43a4bfad48ca0e70466fb01cd7d82c445a1b03`

Bound authorities:

- candidate deck `65068d0e57136cb74c9ca39f4e64ff51c4efbbace483f089f7855997e4524dc8`
- independent front matrix `cf69731aa76c5a14ec03d930a7fb386402940c6f352c694cca14f3d822f98e4e`
- Town roster `b8b5cf20816b8cd24957aac2aa83698588fa54100aea40bcb5c4750cba8c307c`

## Maker verification

`node scripts/test-town-character-catalogue-candidate.mjs`

```text
TOWN CHARACTER CATALOGUE CANDIDATE PASS records=13 fronts=13 backs=13 release=held pack=not-created ownership=none
```

The validator recomputes all three authority hashes and every one of the 13
front hashes, enforces unique Town keys/identities, complete front/back
candidate content, held release, pending reviews and zero pack eligibility.
JSON parse, Trading Cards owner-entry and scoped diff checks pass.

## Honest limits / independent request

This is a catalogue-admission packet, not an admitted catalogue. Proposed copy
and alternative descriptions still require independent product/editorial and
accessibility judgment. Technical catalogue and release judges must separately
confirm schema, immutable binding and held authority.

No card was granted, no pack was created, no ownership or Closet state was
written, and no route, reward, asset, backend, deployment or public state was
changed. The independent judge must return record-specific ACCEPT/HOLD and may
not promote a card merely because its front art already passed.

