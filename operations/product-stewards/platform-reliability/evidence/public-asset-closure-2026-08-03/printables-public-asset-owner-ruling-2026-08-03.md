# Practice Pack printable public-asset owner ruling — 2026-08-03

**Status:** `0 ACTIVE_CANDIDATES / 20 NON-ADMIT / HOLD — NO ASSET ADMISSION`

**Owner route:** `printable.html` is assigned to `practice-pack` in
`operations/product-stewards/registry.json`; its Product Steward preflight
passed: `node scripts/check-product-stewards.mjs --owner-entry practice-pack`.
There is no `operations/product-stewards/printables/` owner dossier, so this
ruling lives with the Platform public-asset-closure evidence rather than
inventing a new owner.

**Bound inputs:**

| Input | SHA-256 |
| --- | --- |
| Current `public-asset-inventory.json` | `d37407efd4f6fbd7b8d56c7e36b9f3679ed27cd874435e3602e5df0f82a8020e` |
| Current `active-asset-registry.json` | `54edb2712c60b17d29434c1aa6355742337673579c2104172653b079fc84af1f` |
| Current `printable.html` | `5df998827b134aa246a60688305f23e394dd5be7b978958cfd1c2912bdcc3c30` |

The selection is exactly the 20 current `UNREGISTERED_DEFAULT_DENY` records
whose inventory source reason is `reference from printable.html`: four PDFs
and sixteen raster preview sheets. Re-hashing each local byte matched the
inventory. None has an active-registry row.

## Decision

The prior route-owner + Platform ruling already places this exact Practice Pack
batch M in `NON-ADMIT / HOLD`. That remains the controlling disposition. A
useful job does not become asset authority merely because the route currently
performs it.

- **PDFs (4): HOLD.** They are the complete-file download job, not previews or
  decoration. The route currently assigns the selected PDF and filename to both
  `download` anchors for recognised issues 01–04. It contains no auth, signup,
  subscriber, source or entitlement gate on that path. This conflicts with the
  source copy that says full files require a subscription. The byte therefore
  cannot be presented as an available download until its content/source,
  subscriber-delivery, print, mobile, accessibility and visual gates are bound
  and pass.
- **PNG sheets (16): HOLD.** They are the four visible content-preview sheets
  for each issue: `printable.html` creates a real `<img>` for every configured
  `pages` entry, with page-specific alternative text. They are not decorative
  substitutes, so removing their authority must preserve the preview's
  explanatory job with an honest held state rather than a blank or fake link.
  The rasters are separately unadmitted derivatives; no source/rights packet,
  exact preview-to-PDF lineage, print/mobile/accessibility or role-distinct
  visual judgment binds their current bytes.

This is a **HOLD**, not a byte rejection: the evidence identifies real learner
jobs and no duplicate SHA inside the bound inventory, but it does not supply
the gates needed to keep or replace either derivative. In particular, the
Issue 01, Issue 03 and generic Prompt Cheat Sheet hero-repair receipts only
remove other decorative image consumers; they do not admit any of these 20
PDF/raster bytes. No Issue 04 printable asset acceptance was found.

`operations/printable-design-decisions.md` still defines the worktable grammar
(four sheets, download and return jobs), but its historical construction QA is
not later asset admission. The Practice Pack charter and weekly standard also
require honest held states, no fake links, bound source/rights, Letter/A4 and
responsive/print accessibility paths, owner decision, independent review and
exact release evidence. No visual-quality, content-accuracy, printer,
assistive-technology, deployment, release or public-origin claim is made here.

## Exact byte disposition

All rows have the same current provenance: `reference from printable.html`,
inventory status `UNREGISTERED_DEFAULT_DENY`, registry status `none`, and the
batch-M `NON-ADMIT / HOLD` decision above. `Issue` identifies the selected
`?issue=` configuration; `sheet` is the consumer-visible image job.

| Exact asset path | SHA-256 | Current consumer job | Ruling and byte-specific reason |
| --- | --- | --- | --- |
| `assets/prompt-cheat-sheet-issue01.pdf` | `a7798b8e69fb0b5bb54f5aa40469c43088f6c8075cad750fe8fc17c29be2cd64` | Issue 01 complete download (both download anchors) | `HOLD` — unadmitted full-file download; source/subscriber/print/mobile/accessibility/visual gates absent. |
| `assets/prompt-cheat-sheet-issue02.pdf` | `0a1229b08b8ed8c10aa16e1ec4fe629f30e018e80c85377e31f037f26c13a769` | Issue 02 complete download (both download anchors) | `HOLD` — unadmitted full-file download; source/subscriber/print/mobile/accessibility/visual gates absent. |
| `assets/prompt-cheat-sheet-issue03.pdf` | `0b19811ed7050105d06415b45d6482240d3861383ca5bd3d23998fb479fc5506` | Issue 03 complete download (both download anchors) | `HOLD` — unadmitted full-file download; narrow Issue 03 source repair did not admit this PDF. |
| `assets/prompt-cheat-sheet-issue04.pdf` | `4fa4c41d7a754c872691d9cc59a8f20394311ee0476c17c18d9caa6aa1091cc0` | Issue 04 complete download (both download anchors) | `HOLD` — unadmitted full-file download; no bound Issue 04 printable acceptance found. |
| `content/printables/previews/issue-01-open-the-tab-page-1.png` | `430fb4adc07aee4093768005db18cfc92ae4fbd46e5ccb6942c3848efbffd21d` | Issue 01 preview sheet 01 | `HOLD` — content preview derivative; Issue 01 hero repair does not admit this raster. |
| `content/printables/previews/issue-01-open-the-tab-page-2.png` | `52cf1332cbf76b8ae080080e82dbeeb5921125e1c44e3c58c6894a3b8f1f83d8` | Issue 01 preview sheet 02 | `HOLD` — content preview derivative without bound source/rights/accessibility/visual proof. |
| `content/printables/previews/issue-01-open-the-tab-page-3.png` | `cee7c09db89778c97de3115574b3bf38c7555b2d30723cbcddf10b7af6e2af5a` | Issue 01 preview sheet 03 | `HOLD` — content preview derivative without bound source/rights/accessibility/visual proof. |
| `content/printables/previews/issue-01-open-the-tab-page-4.png` | `1389e712ad28ca4e67e6b8cf13753199d3f918e7b651af9a04e4dd35dc45b063` | Issue 01 preview sheet 04 | `HOLD` — content preview derivative without bound source/rights/accessibility/visual proof. |
| `content/printables/previews/prompt-cheat-sheet-page-1.png` | `749533e9b8c652d92780a67eb445be3dd78662fa24aff1c697909a80ce54a2bf` | Issue 02 preview sheet 01 | `HOLD` — generic-family preview; filename proximity is not preview-to-PDF lineage authority. |
| `content/printables/previews/prompt-cheat-sheet-page-2.png` | `a08bf92dca34fac065637f86803bc07332b4859ee7f934852e739fb212155c61` | Issue 02 preview sheet 02 | `HOLD` — generic-family preview; filename proximity is not preview-to-PDF lineage authority. |
| `content/printables/previews/prompt-cheat-sheet-page-3.png` | `715e0fc865eb308cd7180ca341684d7302eff9718c4da7ddd9ac2f5a0849972c` | Issue 02 preview sheet 03 | `HOLD` — generic-family preview; filename proximity is not preview-to-PDF lineage authority. |
| `content/printables/previews/prompt-cheat-sheet-page-4.png` | `c5786005809a57039fef2e1f785aa583241b420de69c4e869568ede1c04a61eb` | Issue 02 preview sheet 04 | `HOLD` — generic-family preview; filename proximity is not preview-to-PDF lineage authority. |
| `content/printables/previews/issue-03-elle-receipts-pass-page-1.png` | `3317d30607efcbf195239a3f8e741df37644a4e58f346662c6a5b5d08378e3c5` | Issue 03 preview sheet 01 | `HOLD` — content preview derivative; narrow Issue 03 printable repair did not admit this raster. |
| `content/printables/previews/issue-03-elle-receipts-pass-page-2.png` | `b08721590e0b9f7b72720cf42394738c7713808ca8313ed827b92bf83d740c69` | Issue 03 preview sheet 02 | `HOLD` — content preview derivative; narrow Issue 03 printable repair did not admit this raster. |
| `content/printables/previews/issue-03-elle-receipts-pass-page-3.png` | `0eb17567772891180a0a46c40264e6fe9a631c0b51cfb2b2d69f76b714a1041b` | Issue 03 preview sheet 03 | `HOLD` — content preview derivative; narrow Issue 03 printable repair did not admit this raster. |
| `content/printables/previews/issue-03-elle-receipts-pass-page-4.png` | `bb443f1a9fe76e7640a4b43c357996d82af11a0ca7528caecdaf90a48912b704` | Issue 03 preview sheet 04 | `HOLD` — content preview derivative; narrow Issue 03 printable repair did not admit this raster. |
| `content/printables/previews/issue-04-founding-mothers-page-1.png` | `bf9297ed93c5a5508af4f13778c157cd015bc32a013dd47bc93c4ec390eccea9` | Issue 04 preview sheet 01 | `HOLD` — content preview derivative with no bound Issue 04 source/rights/accessibility/visual acceptance. |
| `content/printables/previews/issue-04-founding-mothers-page-2.png` | `b6fd032fdfc8a3c9c3376c7e6e5bd0265cc48ce1adf25b72faf3d00b688d674b` | Issue 04 preview sheet 02 | `HOLD` — content preview derivative with no bound Issue 04 source/rights/accessibility/visual acceptance. |
| `content/printables/previews/issue-04-founding-mothers-page-3.png` | `0ded945f9b3bb92dc22bfa4b98b5cc15d997b6be19444525ec5559abf37340ce` | Issue 04 preview sheet 03 | `HOLD` — content preview derivative with no bound Issue 04 source/rights/accessibility/visual acceptance. |
| `content/printables/previews/issue-04-founding-mothers-page-4.png` | `9d8731b3b0bd26e8bc49ba2fcd952b2d34cb0448942a1f059bf066272522ec76` | Issue 04 preview sheet 04 | `HOLD` — content preview derivative with no bound Issue 04 source/rights/accessibility/visual acceptance. |

## Source behaviour and calibration

Static source inspection of the bound `printable.html` confirms all four issue
records contain exactly one PDF and four preview PNGs. For a recognised issue,
both `#downloadPdf` and `#downloadPdfBottom` are assigned the selected PDF and
`download` filename; the route appends every configured PNG as a visible image
with an issue/page alternative text. An unrecognised issue instead hides the
grid and removes both download `href`s. This is source behaviour only; no
browser, Playwright, printer or live-route check was performed.

The read-only binding probe passed only with exactly 20 current paths,
four PDFs, sixteen PNGs, matching local and inventory SHA-256 values,
`UNREGISTERED_DEFAULT_DENY` status, and zero active-registry matches:

```text
PRINTABLE_ASSET_BINDING PASS paths=20 pdf=4 preview=16 exact_inventory=true active_registry=0
```

It was calibrated with an invented path; the same membership check failed as
expected rather than silently accepting it:

```text
PRINTABLE_ASSET_BINDING NEGATIVE_CALIBRATION FAIL_AS_EXPECTED missing=assets/not-a-printable.pdf
```

## Required next independent judgment

The exact already-prescribed independent batch is **Hold-source batch A + C +
G + J + M — 76 bytes**. It judges only source narrowing and preservation of
honest held states *after* owners remove the unadmitted requests; it must not
judge these removed bytes as visual candidates. This 20-byte subset must not
be sent as an omnibus visual-acceptance batch. A later successor needs a
checksum-bound Practice Pack component disposition, source/rights/freshness
packet, subscriber-delivery decision, print/mobile/accessibility proof and
role-distinct visual/Brand judgment, split by issue/job.

No registry, consumer, runtime, shared, canon, asset, deployment or publication
file was changed by this ruling. No asset is admitted, rejected on visual
quality, deployed, published, or publicly verified.
