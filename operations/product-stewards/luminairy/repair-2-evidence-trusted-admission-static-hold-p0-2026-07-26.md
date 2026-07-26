# LUMINAiRY Repair 2 maker evidence — trusted admission and static hold P0

**Date:** 2026-07-26  
**Status:** **REPAIR 2 BUILT LOCALLY — REJUDGE REQUIRED**  
**Trigger:** independent Repair 1 rejudge `FAIL — 71/100`  
**Authority:** bounded local maker repair only; this is not independent
acceptance, editorial admission, owner approval, deployment or public truth

## Repair outcome

### 1. Public candidate records cannot self-authorize

Admission now requires two independently checked artifacts:

1. schema-3 `content/luminairy-claims.json`, containing the exact candidate
   identity/context/content/source/evidence/date/owner envelope; and
2. `content/luminairy-editorial-receipts.json`, containing exactly one
   independently reviewed offline-P256-signed receipt per admitted claim.

The runtime pins only public key
`luminairy-editorial-offline-r2-20260726`. The private signer is absent from
the repository and exact public artifact. Rehashing an unrelated claim and
evidence in both public files cannot create a valid signature. Production's
receipt list is empty and all 46 production records remain held.

The bounded positive proof uses one exact, genuinely supported past-tense
Hannah Fry appointment sentence. Its signed receipt is injected by the test
harness rather than stored in the production registry/manifest. It admits one
atomic DOM node and leaves the other 45 records held. This proves the
mechanism only; it is not a production editorial admission.

### 2. Identity and context are inside the signed envelope

The admission hash and receipt both bind:

- `product`, `claimId`, `personId`, `wing`, `claimKind`, `status` and `scope`;
- exact card/content selectors, normalized text and text hash;
- exact source URL/type/title/publisher;
- exact evidence excerpt/hash and claim-support links; and
- verification/recheck dates and correction owner.

Rendered adversarial fixtures recompute the public envelope and matching
receipt fields after mutating `personId`, `wing`, `claimKind`, `status` or
`scope`, but retain the original independent signature. Every mutation fails
closed. DOM verification separately confirms the selected card's person and
wing before any reveal.

### 3. Static HTML/CSS fails closed

- Every claim-bearing contextual block has the native `hidden` attribute.
- Biography, quote, date, title and description fields are hidden by the
  static stylesheet before the gate reports `loaded`.
- All 19 existing MAiVEN profile buttons are natively `disabled`; only a
  verified admission can enable its exact opener.
- A native `<noscript>` hold explains that profile research is unavailable
  and preserves home/correction navigation.
- Disabled-JavaScript and missing-gate-script rendered fixtures expose no
  biography, quote, context or modal content and enable no profile opener.

The script is no longer required to hide unsafe material; it is required only
to verify authority and selectively reveal one exact admitted node.

### 4. Shared Welcome Tour promises are reconciled

The LUMINAiRY tour step no longer promises “real women leading AI” or a song
for every portrait. It describes three portrait wings and says profile
research and audio remain held until each exact claim, source and rights
record clears review. Page discovery copy remains similarly bounded.

### 5. Repair 1 protections remain

Foundress date/title/biography holds, pointer/deep-link denial, accessible
modal focus entry/trap/close/return, exact admitted modal contents,
read-verified device-local storage and persistent storage-failure status all
continue to pass.

## Verification

### Source and exact artifact

- `node scripts/validate-luminairy-claims.mjs`
  - **PASS** — 46 held records, 43 people, offline-signed exact authority and
    no-script/public-promise guards
- `node scripts/test-luminairy-browser.cjs`
  - **PASS — 52 checks / 55 external requests blocked**
- Exact-artifact validator and browser reruns
  - **PASS — same 52 checks / 55 external requests blocked**
- `node scripts/validate-public-metadata.mjs <artifact>`
  - **PASS**
- `node scripts/check-inline-js.js`
  - **PASS — 352 scripts / 132 pages**
- `node scripts/check-local-links.js`
  - **PASS — 1,974 references / 110 pages**
- `node scripts/check-town.js`
  - **PASS**
- `node scripts/check-product-stewards.mjs`
  - **PASS — 65 products; active 2/3**
- scoped `git diff --check`
  - **PASS**

### Fresh exact public artifact

- Path: `/tmp/laidies-luminairy-repair2.JgEZDS`
- Builder: **1,086 files / 961.51 MiB**
- Missing dependencies: **0**
- Oversized individual assets: **0**
- Existing builder advisory: total exceeds 750 MiB
- All governed public files are byte-identical to source.

| Governed public file | SHA-256 |
| --- | --- |
| `luminairy.html` | `a42daf4413d587b67b172f4e0eac25b022b7a6887ccb0f1edb8bfd65dd66d0da` |
| `content/luminairy-claims.json` | `dcffc5815ebd310a2f554eeed170b939268fbc5b66e8021a11de8a838664e589` |
| `content/luminairy-editorial-receipts.json` | `e4560e3e943992cde6d215baf727fe18af8cbc9494e5396b4f80ea4b35b51e61` |
| `content/site/luminairy-claim-gate.js` | `4f8f80d91c22273062c8434a3c2248d205d08a5be11bcf1c0c4bc7b3209e06f5` |
| `content/site/luminairy-v2.js` | `4e5caff65ff413b61d46cc017a54820d4dcaac1dec80f8e8772185d9663d92cb` |
| `content/luminairy-v2.css` | `b65c5b0835e065bdadc65c7b71a276abc85fd45095aa76681c46e173e5781350` |
| `content/site/sunnyvaile-directory.js` | `d7c57a6492c242b3e457ce4a487628db6d487fdec1773adf62f88d3fa14e76f8` |
| `content/site/sv-welcome-tour.js` | `63af2d875382edcb77f56f61c963459e0e44cf5ee0084dea69c926082458b71c` |

## Preserved holds

- independent Repair 2 rejudge;
- atomic research/editorial admission and independently signed receipt for
  every biography, quotation, interpretation, historical-priority and
  current-role claim;
- quotation, portrait, source and other rights review;
- research-owner approval and Ali's visual/taste approval;
- Safari, VoiceOver/screen-reader, native zoom and physical-device evidence;
- KSVL track playback, failure, accessible-control and rights evidence;
- Town Hall correction intake beyond its honest preflight state;
- privacy-safe discovery/source-route analytics and representative newcomer
  comprehension;
- public-origin hash/back/correction/status verification, exact release
  provenance and release authority; and
- the 961.51 MiB artifact-size advisory.

## Boundary and learning scan

No source site, correction route, analytics service, private data, credential,
audio, Git history, deployment or public surface was mutated. No central
queue, registry, ACTIVE/PARALLEL record or painpoints ledger was edited.

Repair 2 extends the existing exact-evidence rule: integrity hashes prove
drift, not editorial truth. Admission authority must be cryptographically
separate from the public candidate, must cover identity and context, and
unsafe material must be held in static HTML/CSS before JavaScript. This
prevention rule is recorded here because the bounded assignment prohibits a
central painpoint edit.
