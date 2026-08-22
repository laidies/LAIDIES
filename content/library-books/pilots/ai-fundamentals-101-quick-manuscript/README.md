# AI Fundamentals 101 — Quick manuscript build

**Status:** `BUILT_LOCALLY — ALI-VETTED SOURCE — NOT ADMITTED — NOT PUBLISHED`

Ali directed LAiDIES to use the complete Amazon Quick manuscript as the source
base for the AI Fundamentals 101 textbook and confirmed on 2026-08-16 that she
had fully vetted the exact supplied text for accuracy. Do not restart a general
line-by-line accuracy review or substitute the rejected Concepts 101 text.

`rewind-amendments.json` is a checksum-bound overlay on those immutable source
bytes. It contains 13 earned Rewind teaching references, including the two
already in the manuscript, plus five source-bound inline humour sprinkles. The
sprinkles follow Ali's *Scream* model: one short verified quote or recognizable
line in ordinary prose, only after the mechanism is clear, with no chapter
quota and no boxed mini-lesson or newly written analogy pretending to be a
quote. Recognition is a release condition: three technically relevant but
insufficiently recognizable lines were removed rather than replaced to fill a
quota. Every addition names its teaching job and limit; the build fails if an
exact insertion anchor moves, a quote lacks a source, an approved sprinkle
disappears from the rendered book or the vetted source hash changes.

The immutable imported inputs live in `source/`. `build-book.mjs` converts the
front matter and all 20 chapters into the standard `library-book-source.v1`
shape, a standard rendered fragment and a responsive internal textbook review
page. The generated claim inventory finds sentences likely to require future
freshness tracking; it is not another accuracy verdict. All 20 chapters now
have checksum-bound currentness records. The automated gate runs weekly,
relevant incoming source signals trigger immediate targeted review, volatile
chapters are scheduled monthly, and every other chapter is scheduled quarterly.
There are no annual review intervals.

Remaining work before admission:

1. complete Ali's review of the rendered Rewind overlay;
2. complete the purpose-built visual teaching layer: 17 responsive figures are
   active through Chapter 13, but Chapters 14–20 and the cumulative complete
   system map are not built; Chapter 1 is Ali-approved, Chapter 2 has a
   role-distinct chapter review pass, Chapters 3–11 await Ali acceptance and
   Chapters 12–13 have independent review passes but still await Ali acceptance;
3. run the exact full-book desktop/mobile/200-percent reader checks and the
   required three distinct observed unfamiliar-human comprehension sessions;
4. obtain exact full-book visual, content and correction admission; and
5. integrate the accepted source and fragment without restoring the rejected
   Concepts 101 artifact or claiming publication before public verification.

Build:

```sh
node content/library-books/pilots/ai-fundamentals-101-quick-manuscript/build-book.mjs
```
