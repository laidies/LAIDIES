# Audience Week 01 Day 01 — Brand successor verdict

**Status:** `REPORT READY — FOUR ACCEPT; ONE REVISE; RIGHTS/PUBLICATION HOLD`  
**Evidence time:** `2026-07-26T14:28:59-07:00`  
**Scope:** regenerated visual sets only; `W01-D1-01` through `W01-D1-05`  
**Acceptance authority:** Brand & Experience Director for bounded campaign
visual eligibility only

No campaign object or asset byte was changed. This verdict is not a global
style ruling, a social allow-list entry, rights clearance, Ali approval,
publication/scheduling/account authority, deployment or spend authority.

## Bound inputs

- Successor independent-acceptance binding:
  `operations/product-stewards/audience-growth/campaigns/week-01/BRAND-SUCCESSOR-INDEPENDENT-ACCEPTANCE-BINDING-2026-07-26.md`
  - SHA-256:
    `cea1ca61d74ccbf941a8cface30c050b92fef462fb62a4c8692e418d8ac6df7d`
- Maker handoff SHA-256:
  `0d4edde6d687afbf2fb8308a1e033a6d1e0959b9f29aa7e32030f4c2e2cdf785`
- Machine receipt SHA-256:
  `1933494b7a6e5d05b5eb78f528324ca8a4bebe67d8468d5b0d23a3d4bfda096a`
- Independent production verdict SHA-256:
  `70e9159477c213b68544428b3d5af53f1944704f9b83e24fb6f42400a5967d61`

All four binding hashes were recomputed and match.

## Checksum-bound verdict

| Object | Manifest-object SHA-256 | Asset-set SHA-256 | Brand verdict |
|---|---|---|---|
| `W01-D1-01` | `cb08dd2a262196956b41c5cb635a90c58a2ed88f2066947ccde7eba810547610` | `edd384a6db389f88f5bbc65e9c7e6007f8dde3aca85518df9bbd5252010e8339` | **ACCEPT — BOUNDED CAMPAIGN VISUAL ELIGIBILITY** |
| `W01-D1-02` | `3edf0df4da617d34249344063400e34dffdb2772e80d41d597f6c0459fafff9d` | `9849c167aeb0859cb722b1cf50327cbc5336095f14ecdba208d4bb4730bb6c55` | **ACCEPT — BOUNDED CAMPAIGN VISUAL ELIGIBILITY** |
| `W01-D1-03` | `db600da647b9543cfa96b37967e6a767f5acd3aad2ef8d2ed6a71753816ad0e8` | `8e3b0c43ebf064c00fa5fca87af938544bb1fff7ce8e420179d8f961075ac9bd` | **REVISE** |
| `W01-D1-04` | `e8648d1dcee611ea1d34e810b4c7efb96ca88cbc6316fae0059a704549436d8c` | `4933ef1eecc696f598ebfef646ee0301d6b20d60f537fc39d3b492aae9da8e26` | **ACCEPT — BOUNDED CAMPAIGN VISUAL ELIGIBILITY** |
| `W01-D1-05` | `895413284aba3a8ac536f5ebe1fc71f703c0511ce65d0ecbce0bd580da255804` | `ad10ffd9c0f995c13ff7639597864a51b11cac67911f5b210bce36b8284d7e60` | **ACCEPT — BOUNDED CAMPAIGN VISUAL ELIGIBILITY** |

`ACCEPT` means the exact sealed visual set passes Brand's candidate-eligibility
gate for this campaign only. It does not add the set to
`social/APPROVED-SOCIAL-ASSETS.md`; Ali's exact-use decision remains required.

## Accepted visual findings

The accepted sets now use a disciplined adult editorial system: mature display
type, deterministic live text, deep plum/navy, controlled rose/teal accents,
clear hierarchy and the authoritative LAiDIES wordmark. The previous generic
rounded boxes, circular sticker-like job badges, obscured episode art and
visible third-party interface treatment are absent.

The family is coherent without making every job identical:

- `W01-D1-01` uses a restrained Stop opening and legible three-beat motion;
- `W01-D1-02` uses a numbered teaching rail with clean five-page pacing;
- `W01-D1-04` reserves a usable Story participation area with all four choices
  and a prominent privacy instruction; and
- `W01-D1-05` uses an Issue 02/read hierarchy without implying Listen,
  publication readiness or a broader site state.

Feed, Story and LinkedIn crops have clear focal order and safe margins. The
accepted visuals are campaign-local; they cannot establish or propagate the
open sitewide championship.

## `W01-D1-03` revision

`W01-D1-03` does not pass as sealed.

### Observed failure

The visual says `seven-part prompt brief` and `seven briefing lines`, but the
repeated checklist motif has only four rows. More seriously, the actual
seven-part paragraph collides with those rows in both native adaptations:

- `assets/instagram-carousels/w01-d1-03-slide-3.png`
  - SHA-256:
    `1d7215222a0dda7c7579d967cec44905c6bdb20217d513edbf766a48988461c3`
- `assets/linkedin-document-pages/w01-d1-03-page-3.png`
  - SHA-256:
    `323ff6a9afe2acedf6900c5c25b716b301c846959ad938b25bc8dec19b18976e`
- rendered page 3 of
  `assets/linkedin-documents/w01-d1-03.pdf`
  - PDF SHA-256:
    `efb402f1a887441d8a557ea2cc1b57544220f64c8b3c8c718b30ffaa4d1d71b6`

The overlap is present in the rendered PDF, not only the source-page PNG.
Machine counts, dimensions and the earlier representative visual PASS did not
catch it.

### Required correction

Rebuild every `W01-D1-03` visual containing the four-row motif:

- `assets/instagram/w01-d1-03.png`
- `assets/instagram-stories/w01-d1-03.png`
- `assets/instagram-carousels/w01-d1-03-slide-1.png` through
  `assets/instagram-carousels/w01-d1-03-slide-5.png`
- `assets/linkedin/w01-d1-03.png`
- `assets/linkedin-document-pages/w01-d1-03-page-1.png` through
  `assets/linkedin-document-pages/w01-d1-03-page-5.png`
- `assets/linkedin-documents/w01-d1-03.pdf`

Use an actual seven-item index or checklist:

`WHO / WHAT / WHY NOW / CONTEXT / TONE / LENGTH / AVOID`

The seven labels may be arranged in a disciplined two-column or sequential
index. They must remain readable at the final channel crop, and no line,
checkbox, footer or wordmark may cross live text. This is a visual correction;
the accepted manifest copy does not need rewriting.

Any changed byte creates a new asset-set seal and returns `W01-D1-03` for exact
Brand re-review. The unchanged manifest-object hash may remain only if the
manifest object itself remains byte-identical.

## Verification and remaining gates

- `node checksum-week-01-units.mjs` recomputed the five exact seals.
- `node verify-week-01.mjs` passed:
  `35 BUILT LOCALLY / 0 READY TO PUBLISH / 0 PUBLISHED`.
- Both LinkedIn PDFs report five 1200×1200 pages.
- Both PDFs were freshly rendered with Poppler and inspected alongside all
  Day 01 Story crops, all ten Instagram carousel frames, all ten LinkedIn
  document pages, the feed/LinkedIn contact sheet and all three Stop motion
  frames.
- `node scripts/check-product-stewards.mjs --owner-entry audience-growth`
  passed before review.

Rights remain `HOLD` exactly as requested. Renewed NewsStand,
accessibility/human-native, Platform/Privacy measurement, Control Room,
publisher/channel, Ali exact-use and public-release gates also remain open.
