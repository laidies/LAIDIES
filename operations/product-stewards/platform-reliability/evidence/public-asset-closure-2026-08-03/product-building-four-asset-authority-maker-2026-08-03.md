# Product/building four-asset authority — maker packet

**Status:** `HOLD — NO EXACT BYTE IS AN ADMIT-CANDIDATE`  
**Scope:** exactly the four Batch 3 paths named in the 2026-08-03 public-asset
authority cutline. This is an owner-authority reconciliation only: it neither
registers, packages, replaces, removes, deploys, nor publishes anything.

## Bound source snapshot

| Evidence | SHA-256 | What it establishes (and does not establish) |
| --- | --- | --- |
| Public-asset authority cutline | `8385773a290bcf861f6ba3a76ac5aad975e08f11492b46aeac38326b7f36af0c` | Names this Batch 3 and requires route owner + Brand, with the Puffy joint-runtime condition. It is not byte admission. |
| Cutline independent judge | `e496b67c887d0f3576d8822d70bca220277e3f4ca13cf4b523863ccab76a97d6` | Confirms default-DENY and the Puffy dual-owner boundary. It admits no byte. |
| Active asset registry | `4070e24fa79e18ed6f809596c7d00c7a10e7b56efbd9813e1a7c048fdd6ee143` | Contains **no row** for any of the four exact paths. |
| Runtime-family manifest | `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7` | Marks DJ, FAiRY portrait and Jeeves `CURATION_REDO`; marks the Puffy sheet `RUNTIME_FAMILY_PASSENGER`. It says “do not package,” not “approved.” |

The source scan found only the current live-source occurrences below. Historical
launch copies, `operations/` prototypes/evidence, social planning files and
tests were not counted as current consumers. The only same-basename alternate
is `approved-assets/town-characters/laidy-fairy-godmother-portrait-v3.png`;
it has the same SHA as the live path and no current consumer points at the
alternate. No current consumer points at a `candidates-*/`, `_superseded/`, or
other retired path for any of these four jobs.

## Disposition

| Exact byte | Current consumer/job (all current source occurrences) | Exact owners required | Existing evidence and unresolved concern | Disposition / smallest missing proof |
| --- | --- | --- | --- | --- |
| `assets/house-dj-mixdesk.png`  
`b38dd18a76769579ea61cc3796968cec5df0d1cd115f87c82c0c67216c3a3488` | `games/dj-booth.html`: OG image (line 11) and hero image (line 647), both the DJ Booth presentation job. | DJ Booth / Fun & Games + Brand; Platform performs only subsequent registry/build integration. | Runtime manifest calls the exact byte `CURATION_REDO`; registry has no row. No checksum-bound DJ Booth owner ruling and Brand visual/identity ruling for this hero/social byte was found. Current use and its alt text do not confer authority. | **HOLD.** One joint DJ Booth/Fun & Games + Brand exact-byte ruling: retain this SHA for both hero and social job, or name a checksum-bound successor/removal preserving both jobs. |
| `assets/laidy-fairy-godmother-portrait-v3.png`  
`d9cb840d8d0809be3a1ec55f606dbdf0978b51a74f18273ffc1c004a81b38281` | `content/data/character-cards.json`: public FAiRY Godmother resident-card avatar (line 24). | Trading Cards + Town Hall + Brand. | The 2026-07-27 independent verdict binds this SHA only as an **identity reference** for a separate unadmitted FAiRY Godmother card successor; it explicitly says the candidate does not admit a non-town family. The current runtime manifest still says `CURATION_REDO`; registry has no row. The 2026-08-03 decorative-strip repair explicitly leaves this separate portrait authority unchanged. | **HOLD.** One joint Trading Cards/Town Hall + Brand exact-avatar/identity ruling for this SHA, covering the public resident-card role and canonical FAiRY identity; then independent review. |
| `assets/library/jeeves-scene.webp`  
`69edb1f3cacff5ee6d2bfa59bab5bd7f57c27c40267d4adbc5d1ec45818a3943` | `index.html`: Homepage `#reference` Miss Jeeves image (line 658), supporting the Search the LIBRAiRY handoff. | Homepage / Town Entry + LIBRAiRY + Brand. | Homepage’s 2026-08-03 repair and its independent judge deliberately retained this one consumer but expressly retain its separate art/profile/registry hold. The Library inventory/earlier Brand register describe the asset as an adaptation/one-use concern, not an unconditional exact-byte acceptance. Runtime manifest says `CURATION_REDO`; registry has no row. | **HOLD.** One joint Homepage + LIBRAiRY + Brand exact-byte ruling that this SHA is the permitted single Miss Jeeves/search handoff use (or a checksum-bound successor), including canon/identity and no duplicate-use disposition. |
| `assets/puffies/contact-sheets/all-usable-puffy-stickers-contact-sheet.png`  
`18b38bbe264cad237757b529fd67b003cc6cce10df768a6680589cf8ee6b388d` | `content/site/shop-v2.js`: visible Gift Shop “Puffy Sticker Sheet” source-art preview (line 90). The manifest also binds `assets/puffies/contact-sheets` as a LIBRAiRY + Closet runtime-family passenger. | Gift Shop + LIBRAiRY + Closet + Brand. | The cutline judge confirms this exact dual-owner boundary. Product copy calling it “approved” is not owner/Brand admission. The exact byte is absent from the registry and remains `RUNTIME_FAMILY_PASSENGER`, with no current joint authority or family/no-retired-request proof. | **HOLD.** One joint Gift Shop + LIBRAiRY + Closet + Brand ruling for this SHA and its source-art preview job, plus an exact runtime-family membership/no-retired-request guard for the family. |

## Candidate registry rows

**None proposed.** No row satisfies the required condition of complete,
checksum-bound route-owner and Brand authority with no unresolved visual,
canon/identity or runtime-family concern. Adding a row now would manufacture
admission from current use.

## Required independent-judge gate after a future owner ruling

The judge must independently re-hash the selected asset, owner ruling, active
registry and runtime manifest; confirm every current source consumer above is
covered by the ruling; inspect the actual visual/identity/canon job rather than
only the checksum; and reject any unbound duplicate/candidate/retired path.
For the Puffy sheet, the judge must additionally verify exact
LIBRAiRY/Closet runtime-family membership and a no-retired-request result.
Only after a genuine candidate exists: regenerate the deterministic inventory,
require builder/inventory exact-set parity, source narrowing, affected product
tests, and then issue a role-distinct independent verdict. That verdict may
recommend registry admission; it does not itself deploy or publish.

## Verification performed

- Recomputed SHA-256 for all four live bytes and the bound evidence above.
- Searched current source roots for every occurrence; the table lists all four
  live-consumer sets (2 DJ occurrences; 1 each for FAiRY, Jeeves and Puffy).
- Compared the exact paths against the active registry and runtime-family
  manifest; registry rows are absent and all manifest dispositions remain
  default-deny holds.
- Ran `node scripts/check-product-stewards.mjs --owner-entry
  platform-reliability`: `PASS` (structure/owner entry only; not asset quality
  or admission).

No visual generation, consumer edit, registry/manifest mutation, builder run,
admission, deployment, release, or publication was performed.
