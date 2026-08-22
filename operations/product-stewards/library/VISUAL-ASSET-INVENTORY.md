# LIBRAiRY current visual-asset inventory

**Status:** CURRENT LOCAL INVENTORY — NO VISUAL OR PUBLIC RELEASE AUTHORITY
**As of:** 2026-08-21
**Owner:** LIBRAiRY product champion; Ali owns visible direction and acceptance

This is the routine current-state packet. It does not repeat rejection history.
Historical reasoning remains in Git, the rejection registry and
`operations/painpoints-log.md` and is loaded only for a routed investigation.

## Discovery evidence

| Surface | Exact current identity | Disposition |
| --- | --- | --- |
| `library.html` | SHA-256 `64bdfcd41a6171ee5186cd7b6da9437bbef4d067f327aeace9039d09c458fee5` | **ADAPT / HOLD FOR ALI WALKTHROUGH.** Current bytes are implementation evidence, not accepted visual authority. Do not infer a successor from older Library candidates. |
| Library page composition | `operations/library-decisions.md` | Current compact functional and visual invariants. Ali's page walkthrough may replace them through an explicit reviewed update. |
| AI Fundamentals review reader | `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/review.html`, SHA-256 `201c83c89844e6e00ac08c0b59d9262c6d2c11d14da9c8a0aec3e3d5d0807677` | **KEEP INTERNAL.** Not linked from the production catalogue and not admitted. |
| AI Fundamentals rendered fragment | `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/rendered-review.html`, SHA-256 `06aa6fc8d07e0a241625efce6e83d836bb6f7a009429313ace44747a75552bfa` | **KEEP INTERNAL.** No production reader binding. |
| AI Fundamentals held candidate | `content/library-books/rendered/ai-fundamentals-101.html`, SHA-256 `06aa6fc8d07e0a241625efce6e83d836bb6f7a009429313ace44747a75552bfa` | **HOLD.** Exact successor identity exists, but compiled public admission is empty. |

## Asset disposition register

The exact visual bytes and SHA-256 values are bound by
`content/library-books/pilots/ai-fundamentals-101-quick-manuscript/artifact-manifest.json`
at SHA-256 `81d1898c3f8aa136e18ef2f11c59848dd4e9acca8fd6cf449f278f6b62273803`.
The manifest is identity evidence, not a quality verdict.

| Chapter | Current rendered jobs | Current disposition |
| --- | ---: | --- |
| 1 | 2 desktop/mobile pairs | **KEEP INTERNAL.** Ali-approved locally according to the manifest; exact release admission absent. |
| 2 | 4 desktop/mobile pairs | **KEEP INTERNAL.** Role-distinct chapter review recorded; exact release admission absent. |
| 3–8 | 1 desktop/mobile pair per chapter | **ADAPT OR ACCEPT AFTER REVIEW.** Built locally; Ali acceptance and current visual-media admission absent. |
| 9 | 2 desktop/mobile pairs | **ADAPT OR ACCEPT AFTER REVIEW.** Built locally; Ali acceptance and current visual-media admission absent. |
| 10–11 | 1 desktop/mobile pair per chapter | **ADAPT OR ACCEPT AFTER REVIEW.** Built locally; Ali acceptance and current visual-media admission absent. |
| 12–13 | 1 desktop/mobile pair per chapter | **ADAPT OR ACCEPT AFTER REVIEW.** Independent review recorded; Ali acceptance and release admission absent. |
| 14–20 | none | **REPLACE ONLY A PROVEN GAP.** Add only where an exact teaching job reduces reader effort; there is no one-image-per-chapter quota. |

## Machine-enforced prohibitions

```json
{
  "banned_runtime_assets": [
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/_rejected-20260821/ch06-bicycle-tree-learning-image.png"
  ],
  "banned_page_sha256": [
    "615a80f75bede151067fa447eb514cc535c14a1c5c4bf4d19baa5fbe04077dab"
  ],
  "banned_behaviours": [
    "reuse_rejected_library_shelf_composition",
    "restore_rejected_css_teaching_layer",
    "treat_file_presence_or_manifest_binding_as_visual_acceptance",
    "generate_missing_chapter_art_without_an_exact_teaching_job",
    "publish_or_preview_unadmitted_book_bytes"
  ]
}
```

`check-book.mjs` rejects the quarantined Chapter 6 filename if it returns to the
builder, source record, rendered fragment, review page or active manifest. Its
calibration deliberately reintroduces that runtime path and must fail.

## Before any new visual work

1. Read `operations/library-decisions.md` and this file only.
2. Confirm the destination, teaching or interaction job and intended viewport.
3. Search the exact current manifest and approved assets before generating.
4. Keep the artifact internal until maker pixel inspection and a role-distinct
   visual judgment inspect the actual desktop/mobile pixels.
5. Ali accepts visible direction; a checksum, file, prompt or automated PASS
   cannot substitute for that decision.

## Open visual decisions

- Ali's page walkthrough must define the Library room, catalogue and preview
  experience before the page composition is treated as current authority.
- Chapters 3–13 require Ali disposition on the exact current visual pairs.
- Chapters 14–20 require visual-job decisions, not automatic production.
- No Library visual is release-ready or publicly verified in this branch.
