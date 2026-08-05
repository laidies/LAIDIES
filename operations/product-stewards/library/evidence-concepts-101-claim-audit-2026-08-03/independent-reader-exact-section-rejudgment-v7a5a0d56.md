# Concepts 101 exact-section reader repair rejudgment

**Judged:** 2026-08-03 (America/Vancouver)
**Role:** independent judge; no maker, owner-admission, release or public authority
**Verdict:** **PASS — bounded reader/Puffy repair only.**

This clears the precise visitor-facing HOLD in
`independent-reader-accessibility-admission-prep-vbb25fae4.md`. It does not
make Concepts 101 available and does not clear native assistive-technology,
Library owner, deployment or public-origin gates.

## Exact tuple judged

| Artifact | SHA-256 |
|---|---|
| `library.html` | `7a5a0d56b91d13330fd66369925952d7082652545ea521d24800455a13685403` |
| `scripts/test-library-product.cjs` | `43df88c99348228f80a31205b412243b13c5a97b62e08e5701c0b33738068764` |
| `content/library-books/rendered/concepts-101.html` | `bb25fae48b640f53112bd9191391e66dbbf5bf4a8603d6c5bd55a8cf85508f4b` |
| `content/library-books/admission-manifest.json` | `54ccaae93ee05f8cc9b27b3cbb31810ae3fef660b3caf4fa25b46251631c3010` |

The Concepts artifact and its proposed admission record are unchanged. The
manifest still correctly says `status: hold`, content version
`concepts-101-2026-08-03.1`; production compilation remains zero available
books.

## Independent source and rendered inspection

- `assignBookSectionAnchors()` derives deterministic heading slugs and adds an
  occurrence suffix to duplicates. The four `Try this` headings therefore
  receive four distinct IDs.
- `decoratePuffySections()` now uses the reader's intentional `h2,h3` contents
  scope and explicitly filters headings within `.receipts`.
- Each Puffy record binds `book_id`, the unique `section_id`, exact
  `content_version`, and a URL whose section reference is `@<section-id>`.
- `findBookHeading()` resolves an `@` reference by exact ID equality. The old
  title-text lookup remains only as a backward-compatible fallback.
- Reopening marks only the resolved heading with `aria-current="location"` and
  scrolls to that same heading.
- Browser inspection on the exact Concepts fixture finds no `[data-puffy-title]`
  or `.puffy-save-row` inside any `.receipts` block. It saves the second of four
  identically titled `Try this` sections, records that section's own ID and
  `@anchor`, then reopens the reader on that exact second occurrence—not the
  first match.

## Independent commands

- `node scripts/test-library-product.cjs` — **PASS**, 63 checks, 43 external
  requests blocked, including the exact receipt-exclusion and duplicate-title
  save/reopen assertions.
- `node scripts/validate-library-product.mjs` — **PASS**, 15 books, 8 hold, 7
  preview, 0 available.
- `node scripts/check-concepts-101-claims.mjs` — **PASS**, six claims, eight
  sources, three currentness records, four propagations, exact rendered hash,
  status HOLD.
- `node scripts/check-library-vocab-concepts-consolidation.mjs` — **PASS**, 17
  consolidated terms and Vocab absent from the shelf.
- JavaScript syntax checks for the shared Puffy module and product suite, plus
  targeted `git diff --check`, — **PASS**.

## Remaining gates, explicitly not decided here

The bounded repair is safe to advance to the next admission stage. Concepts
101 must remain unavailable until the Library owner makes the separate exact
admission decision and the required native Safari/VoiceOver and native-zoom
witness is complete. Any deployment then requires exact release admission;
publication requires a separate cold public-origin witness. The temporary
`available` fixture proves the code path only and conveys none of those
authorities.

No source, test, manifest, control-room, release, deployment or public file was
changed by this rejudgment.
