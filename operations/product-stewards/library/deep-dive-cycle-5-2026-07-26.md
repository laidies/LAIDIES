# LIBRAiRY Cycle 5 whole-product deep dive

**Date:** 2026-07-26  
**Status:** **REPORT READY — BOUNDED P0 BUILT LOCALLY; JUDGE REQUIRED**  
**Trigger:** relaunch readiness plus the parent/subproduct championship for
Library, Miss Jeeves, 101 books, Grimoire/handbook and saves

## Executive judgment

The Library has an excellent product model and serious content beneath it.
Its biggest risk was not missing decoration or another book. It was trust
coordination: shelf controls, Miss Jeeves, direct hashes, reader fallback and
My Closet did not share a proven publication/persistence contract.

The existing ECO-01 Verification Rulebook repair is locally strong. Its latest
independent expert review accepted content/trust/brand/browser/print gates, and
a fresh Cycle 5 40-check matrix passed. It remains HOLD/PREVIEW because owner,
Safari/VoiceOver/native zoom and eight-newcomer transfer gates are separate.
This cycle does not redo or overrule that work.

The highest-value P0 is now built locally:

- one catalogue record controls whether each book is operable everywhere;
- 8 known editorial holds and 7 previews remain visible and non-operable;
- direct hashes and Miss Jeeves cannot bypass a hold;
- broken fragment loading is unmistakably a failure, never plausible teaser
  content;
- the reader has deterministic focus containment and exact-opener return; and
- Puffy storage is read-verified and honest when denied.

No production book is currently marked `available`. That makes the current
room honest but intentionally incomplete. Relaunch promotion must describe a
catalogue/reference desk under book-by-book review, not a complete library.

## Product and learning architecture

| Surface | Unique job | Current verdict |
|---|---|---|
| Room/shelves | Understand the catalogue and publication status | Strong structure; truthful local repair built |
| 101 books | Durable mental models/reference | Mixed content; all five current books held |
| Miss Jeeves | Orient first, route second | Useful curated start; deeper links now obey holds |
| Verification Rulebook | Applied verification skill/reference | Local expert PASS; non-local HOLD |
| Old SLAiYER Grimoire | Historical source material | Retired/redirected; preserve, do not republish |
| Town Handbook | How SUNNYVAiLE works | Distinct field guide; owner visual/style gate |
| Puffy/My Closet | Same-device exact-place retrieval | Local positive and denied-storage paths pass |

The largest content gap is not word count. It is approved ownership. Vocab and
Concepts overlap; Accounts and Setup are perishable; Who’s Who is thin/current;
Straight Answers carries high-stakes sourced claims. Each needs a separate
publication packet rather than one “Library approved” switch.

## Newcomer, returning and failure journeys

### Newcomer

The room, three departments and Miss Jeeves communicate the intended pattern.
Cycle 5 adds a visible book-by-book review notice and exact status text on
desktop/mobile covers. There is currently no misleading Open control.

Still unproved: ten-second comprehension by representative newcomers, owner
visual approval, native zoom, screen-reader reading order and mobile Safari.

### Returning reader

The stable saved URL can reopen an exact book/section on the same device.
If its book is now held, the current hold wins; saved state cannot republish
content. My Closet exposes separate valid link/remove controls.

Still unbuilt: account sync, cross-device recovery, backup, versioned
migration for changed headings and corrupt-record recovery.

### Failure

Registry/status failure is static because non-available content is rendered
as non-button controls. A fragment failure shows a live explicit retry state.
Storage denial says no change occurred. Miss Jeeves has zero-result recovery.

Still missing: offline service worker behavior, index-load failure message,
book-specific correction intake/status and stale search-index detection.

## Accuracy and content findings

- Existing content audit holds remain authoritative until superseded by a
  named book acceptance packet.
- Miss Jeeves’ job answer contained a perishable labour-market claim without a
  visible source/date contract. It remains orientation copy and must receive a
  claim packet before promotion as sourced advice.
- Tool-selection copy is useful but product capabilities change; it needs a
  dated tool-family source map.
- Old SLAiYER content includes stale model names and account behavior. Redirect
  shells are correct; `_superseded` is evidence, not source of truth.
- The current town Handbook is not the old AI handbook. Naming must retain
  that distinction.

Prevention rules reused: analogy uncertainty cannot become fact; a continuation
must be exact; glossary and concept books need separate jobs; ordinary
computing vocabulary is not automatically AI vocabulary; current AI/AGI
boundaries cannot rely on obsolete “AI cannot plan/use tools” binaries.

## Backend, persistence and performance

The Library is static. Books are HTML fragments; Miss Jeeves uses a static JSON
index; saves use localStorage. There is no server correction workflow,
identity-backed sync or durable analytics ledger.

Cycle 5 confirmed the fresh artifact contains no oversized (>25 MiB) file and
no missing dependency, but it is 961.46 MiB overall. The public builder keeps
only `assets/library-101/bright-family-v2`; original and superseded cover
systems remain outside the runtime tree. All eight held rendered book bodies
are also absent from the artifact, which is correct while their status is HOLD.

If a book becomes available, exact-artifact tests must require its fragment;
status promotion without packaged content is a release failure.

## Accessibility and visual assessment

Local strengths: semantic shelf headings, non-operable held controls, live
status, labelled search, explicit dialog, initial Close focus, two-way Tab
wrap, Escape/backdrop close, focus return, 390px no-overflow, valid My Closet
interactive nesting, print contrast and reduced-motion evidence for ECO-01.

Remaining: VoiceOver/Safari, native zoom, physical touch targets, owner taste,
current room crop across breakpoints and the resident Handbook’s darker
trailer-art mismatch.

## External capabilities — recommendations, not authorization

1. **Pagefind:** evaluate as a static index generated from the exact public
   artifact. Its official docs support restricting indexed content and
   returning metadata/filters, which could bind search to admitted status:
   `https://pagefind.app/docs/`,
   `https://pagefind.app/docs/indexing/`,
   `https://pagefind.app/docs/metadata/`.
2. **Plausible controlled events:** existing provider can record controlled
   outcome categories and book IDs. Official docs permit custom events and
   properties but warn against PII. Do not send raw queries, titles/purpose
   labels or full URLs containing sensitive data:
   `https://plausible.io/docs/custom-event-goals`,
   `https://plausible.io/docs/custom-props/introduction`.
3. **`idb` / `idb-keyval`:** evaluate only if versioned same-device migration
   becomes necessary. They are small promise-based IndexedDB helpers; neither
   creates account sync or backup:
   `https://github.com/jakearchibald/idb`,
   `https://github.com/jakearchibald/idb-keyval`.

No plugin, package, service, spend or data disclosure was authorized or
performed.

## Revenue opportunities

Ranked only after trust:

1. free admitted reference library as acquisition/return value;
2. paid printable or downloadable evidence-bound reference packs;
3. team/workplace editions and workshops with dated maintenance;
4. disclosed affiliate links in independently useful tool guides; and
5. underwriting of a department with a public non-interference rule.

Reject pay-to-rank tools, sponsored factual conclusions, hidden corrections
and selling a held draft as a premium book.

## Priorities after this build

1. Independent judge of the exact Cycle 5 candidate.
2. One book at a time: owner/editorial packet, not a bulk Library approval.
3. Miss Jeeves frozen evaluation and source/currentness review.
4. Book-specific correction model and status route.
5. Safari/VoiceOver/native zoom plus eight-newcomer study.
6. Privacy-safe analytics baseline, then retrieval championship.
