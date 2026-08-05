# Concepts 101 reader/accessibility admission-preparation judgment

**Judged:** 2026-08-03 (America/Vancouver)
**Role:** independent judge; no maker, owner-admission, release or public authority
**Verdict:** **HOLD — one bounded exact-section/Puffy repair remains before owner admission.**

## Exact tuple judged

| Artifact | SHA-256 |
|---|---|
| `content/library-books/rendered/concepts-101.html` | `bb25fae48b640f53112bd9191391e66dbbf5bf4a8603d6c5bd55a8cf85508f4b` |
| `content/library-books/admission-manifest.json` | `54ccaae93ee05f8cc9b27b3cbb31810ae3fef660b3caf4fa25b46251631c3010` |
| `content/library-books/concepts-101.claims.json` | `d8b5abefa36ce3921f206d9f4311828f01e38a54d6dd5fa2fc2999ae442fe44a` |
| `library.html` | `bd5daaca3cb4e9134a9233226601ce17f12a8bdf950c2c2c5149774ad5405826` |
| `content/site/puffy-bookmarks.js` | `23a1ea668e66e7bec2f6f77597ff447be19189d319b7c1b6a7b618b5fc4efa60` |
| `scripts/test-library-product.cjs` | `b19716814bbcc80574cc8d2517e00c01264649717261a0cac866d27406860241` |

The manifest binds the rendered artifact to content version
`concepts-101-2026-08-03.1`, but correctly keeps `status: hold`. The compiled
production contract therefore has `available=0`; the real held cover and its
direct hash cannot open the production reader. The test's temporary
`available` Concepts record is a local fixture compiled from these exact bytes,
not an admission.

## What independently passes

- `node scripts/test-library-product.cjs` — **PASS**, 61 checks and 42 hostile
  requests blocked. The exact Concepts fixture opens through cover preview;
  renders the 5,287-word body and contents; assigns unique sequential heading
  IDs; has no reader overflow at 1200×800 or 390×844; and inherits the tested
  dialog focus, reverse-Tab trap, Escape/Close/backdrop return-focus and reduced
  motion mechanics.
- `node scripts/validate-library-product.mjs` — **PASS**, 15 books, 8 hold, 7
  preview, 0 available.
- `node scripts/check-concepts-101-claims.mjs` — **PASS**, six claims, eight
  sources, three currentness records, four propagations, exact rendered hash,
  status HOLD.
- `node scripts/check-library-vocab-concepts-consolidation.mjs` — **PASS**, 17
  consolidated terms and Vocab excluded from the shelf.
- `node --check content/site/puffy-bookmarks.js`, `node --check
  scripts/test-library-product.cjs`, and the targeted `git diff --check` —
  **PASS**.
- Whole-book and section controls have distinct visible and accessible labels,
  and the fixture proves both offer the same active ten Puffy Stickers.

These results are local Chromium/mechanical evidence. They do not constitute
native assistive-technology, owner, deployment or public-origin evidence.

## Blocking defect the current suite misses

`decoratePuffySections()` marks **every** `h1`, `h2` and `h3` in the fetched
book as a savable section. Unlike the contents builder immediately below it,
it does not exclude headings inside `.receipts`. Exact Concepts bytes contain
five `<div class="receipts"><h3>Receipts</h3>...` blocks, so the reader will add
five visually repeated **Save this section with a Puffy Sticker** actions to
source-list labels that are deliberately absent from the contents. That is not
a meaningful section-save choice and adds repetitive controls to the reading
flow.

The same implementation stores the display heading text in the deep-link URL
and reopens the first heading whose text contains that value. Concepts has
duplicate labels: `Receipts` ×5, `Try this` ×4, `Where it goes wrong` ×4,
`Training data` ×2 and `Hallucination` ×2. Consequently, several controls that
claim to save an **exact section** can reopen a different, earlier section.
Unique DOM IDs do not cure this because the saved URL does not use them. The
existing test exercises only a synthetic uniquely named heading and therefore
does not detect the failure on the exact Concepts artifact.

## Smallest safe repair and rejudge

1. In `decoratePuffySections()`, exclude headings inside `.receipts` and limit
   save actions to intentional reader-content destinations.
2. Bind each section save/reopen URL to a stable unique section locator (for
   example the assigned section ID or an explicit source anchor), while keeping
   a safe legacy-title fallback if existing local records require it.
3. Extend the exact Concepts fixture test to prove: zero Puffy controls in
   `.receipts`; expected controls only on intentional sections; and two
   duplicate-titled sections each save and reopen their own exact location.
4. Re-run the commands above and request independent judgment on the new exact
   hashes.

Only after that bounded repair passes may the separate native Safari/
VoiceOver and native-zoom witness plus Library owner admission decide whether
the manifest can change to `available`. Deployment still requires exact
release admission, and publication requires a separate cold public-origin
witness. This verdict changes none of those statuses or authorities.

No source, test, manifest, control-room, release, deployment or public file was
changed by this judgment.
