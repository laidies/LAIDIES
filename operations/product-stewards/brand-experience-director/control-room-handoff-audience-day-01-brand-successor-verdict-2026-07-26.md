# Control Room handoff — Audience Day 01 Brand successor verdict

**Product/system ID:** `brand-experience`  
**Owner task ID:** `019f9f7a-1337-7fc0-a37a-74c8a88bbe49`  
**Status:** `REPORT READY — FOUR ACCEPT; ONE REVISE; RIGHTS/PUBLICATION HOLD`  
**Evidence time:** `2026-07-26T14:28:59-07:00`

## Literal action and result

Brand reviewed every regenerated Day 01 full-resolution feed, Story,
carousel, LinkedIn document page and Stop motion frame against the five exact
successor seals.

Observed result:

- `W01-D1-01`, `W01-D1-02`, `W01-D1-04` and `W01-D1-05` pass bounded
  campaign visual eligibility;
- `W01-D1-03` is `REVISE` because the graphics promise seven items but show
  four checklist rows, and page/slide 3 visibly overlaps the seven-part text
  with those rows in both Instagram and the rendered LinkedIn PDF; and
- ready and published counts remain zero.

This supersedes the production judge's all-five visual PASS only at the Brand
gate. It does not invalidate the judge's machine/file inventory findings.

## Evidence

- Verdict:
  `operations/product-stewards/brand-experience-director/audience-week-01-day-01-brand-successor-verdict-2026-07-26.md`
- Binding SHA-256:
  `cea1ca61d74ccbf941a8cface30c050b92fef462fb62a4c8692e418d8ac6df7d`
- Defective Instagram slide SHA-256:
  `1d7215222a0dda7c7579d967cec44905c6bdb20217d513edbf766a48988461c3`
- Defective LinkedIn page PNG SHA-256:
  `323ff6a9afe2acedf6900c5c25b716b301c846959ad938b25bc8dec19b18976e`
- Defective five-page PDF SHA-256:
  `efb402f1a887441d8a557ea2cc1b57544220f64c8b3c8c718b30ffaa4d1d71b6`
- `node checksum-week-01-units.mjs` → exact five successor seals reproduced.
- `node verify-week-01.mjs` → PASS; `35 built / 0 ready / 0 published`.
- Fresh Poppler render → five 1200×1200 pages per PDF; `W01-D1-03` overlap
  reproduced on rendered page 3.

## Changes, locks and next trigger

Changed only Brand verdict/handoff evidence and the BTB-149 learning addendum.
No campaign asset, manifest, allow-list, route, account or public surface was
mutated.

The sitewide championship remains open and unpropagated. Rights,
NewsStand/accessibility/human-native, Platform/Privacy, Control Room,
publisher/channel, Ali exact-use and release/public gates remain `HOLD`.

Acceptance owner for the regenerated `W01-D1-03` set is Brand & Experience.
Next trigger: Audience & Growth returns the unchanged manifest-object or its
explicit successor, a new asset-set hash, all repaired native pages, a
regenerated PDF and renewed production/source/accessibility receipts.

No public, deploy, spend, account, scheduling, publication or Ali authority
was used.
