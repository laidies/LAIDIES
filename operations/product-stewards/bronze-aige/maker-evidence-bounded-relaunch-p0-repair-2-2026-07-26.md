# BRONZE AiGE — bounded relaunch P0 Repair 2 maker evidence

**Date:** 2026-07-26  
**Status:** VERIFIED LOCALLY — REJUDGE REQUIRED  
**Trigger:** sole remaining P0 in `independent-rejudge-bounded-relaunch-p0-repair-1-2026-07-26.md` (FAIL 78/100)  
**Authority:** maker evidence only; not an independent pass, deployment approval or public verification

## Outcome

The Businesswomen's Special catalogue no longer uses an ambient page global as
content, validation or receipt authority.

`content/site/bws-data.js` is now an ES module. Its raw catalogue, canonical
IDs, deep-frozen menus and deep-frozen mood flaps live in module scope. The
embedded BRONZE controller and standalone game each dynamically import that
module into their own private closure, validate the frozen API and only then
enable their fortune interaction.

No governed product source reads, writes, defines, deletes or tests
`window.LAIDIES_BWS_CATALOGUE`. A hostile property under that name—whether a
nonconfigurable value, getter, throwing getter, proxy or failed deletion—has no
role in the product data path.

## Fail-closed behavior

- BRONZE AiGE includes a static live status saying the private catalogue is
  loading and that nothing can be selected or saved. Successful private-module
  validation hides that state.
- The standalone game ships its lane, mood and random controls disabled with
  the same visible status. Successful validation enables them.
- Missing or invalid module/API leaves the page visibly held. It creates no
  drink receipt and never presents catalogue success.
- An ambient-name collision does not need to disable a valid private module:
  the product continues with canonical module data while never touching the
  hostile property.

## Adversarial fixtures

Each fixture is installed before any product script on both the embedded and
standalone routes:

1. nonconfigurable getter returning injected data;
2. nonconfigurable injected value;
3. nonconfigurable proxy;
4. nonconfigurable value plus attempted deletion;
5. nonconfigurable getter that throws if read.

Every injected catalogue uses canonical-looking IDs and the visible payload
`INJECTED RYAN BOTTLE`. Across source and exact artifact:

- the hostile getter/proxy access count remains **0**;
- the throwing getter causes no page error;
- the failed delete remains failed and irrelevant;
- injected Ryan/bottle/service copy never renders;
- injected data never enters `laidies_bws_drink`;
- the rendered result and v2 receipt resolve canonical module data only.

Separate missing-module fixtures prove that embedded and standalone routes
remain visibly held and save nothing.

## Preserved Repair 1 coverage

The complete Bronze suite still passes, preserving:

- removal of real CHAR No.5/Ryan/service activation and bottle encouragement;
- strict v2 drink/coaster receipt shape, IDs, timestamps, week coherence and
  non-rewriting corrupt reads;
- contained Blob/object-URL/download/revocation failures;
- honest current/latest-published/evergreen episode behavior;
- private audio ownership and media-event-confirmed playing state;
- cocktail/spirit-free parity, alcohol boundaries, modal focus, keyboard,
  reduced motion, 320px reflow, contrast and zero external completion.

## Source verification

```text
BRONZE AIGE CONTRACT PASS
checks=80

BRONZE AIGE BROWSER PASS
checks=80
external_requests_completed=0
third_party_requests_blocked=123

INLINE JS PASS
352 scripts / 132 pages
```

## Fresh exact artifact

```text
/tmp/laidies-bronze-repair2.xtXZpa/public
builder files=1086
builder size=961.51 MiB
missing dependencies=0
existing >750 MiB advisory remains
```

Exact-artifact results:

```text
BRONZE AIGE CONTRACT PASS
checks=80

BRONZE AIGE BROWSER PASS
checks=80
external_requests_completed=0
third_party_requests_blocked=123

PUBLIC METADATA PASS
PRIVATE CATALOGUE MODULE PACKAGED
GOVERNED SOURCE/ARTIFACT BYTE PARITY PASS
```

## Governed hashes

| File | SHA-256 |
|---|---|
| `bronze-aige.html` | `7c5a294547916dfa16fb8f0097a563a097a7a01861e3c4c20f67458ba4c22afe` |
| `content/site/bronze-aige-v2.js` | `304d79c8776cd6e928391debbfaabf283f9e470303f5de4cd73421b78b167b2a` |
| `content/site/bws-data.js` | `32f35f689f6df1b0ea3a9461822f18b24adeca8f8cc996664504581f90a76780` |
| `games/businesswomens-special.html` | `fbc411040e8a8b0ac2359d63c70569d4a04869164ebe92aae29fff3568e5244f` |
| unchanged `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |
| `scripts/check-bronze-aige-contract.mjs` | `6a2537ff13f085c9c2d5675ef347fe4994e9ad52fe4f7a9f231f865410327594` |
| `scripts/test-bronze-aige-browser.mjs` | `a80876e23653798becdf8fa3874508770156c08261c7225b837c080af658d7f1` |

## Maker self-score

| Dimension | Score |
|---|---:|
| Product/content quality and real visitor value | 19/20 |
| Accuracy, safety and trust | 19/20 |
| Positive LAiDIES contribution | 18/20 |
| UX/accessibility/reliability | 19/20 |
| Technical/artifact integrity | 19/20 |
| **Total** | **94/100** |

This score cannot approve the candidate. A different independent reviewer must
re-run the five preload classes, missing-module holds, ordinary regression
suite and exact artifact.

## Remaining holds

- independent Repair 2 rejudge;
- Ali's Cosmo/room visual approval and final room treatment;
- audio provenance, rights, public admission and KSVL approval;
- native Safari, VoiceOver, 200% zoom and physical-device proof;
- approved privacy-safe analytics/event contract;
- exact deployed-origin journeys; and
- every alcohol partnership, promotion, affiliate, commerce, availability,
  service or venue activation.

No central coordination/painpoints file, Git state, deployment, credential,
service or external system was changed.

## Learning scan

Repair 2 applies BTB-106 at the authority boundary: immutability is not
proven by freezing a value after putting it on `window`; authority must remain
outside ambient page state. The reusable check is now product-local and
executable: preload hostile nonconfigurable values/getters/proxies, attempt
deletion, make access throw, and verify canonical-or-held behavior in source
and the exact artifact. Per the assignment boundary, no central learning file
was edited.

