# AI Fundamentals 101 — Quick manuscript build

**Status:** `BUILT_LOCALLY — ALI-VETTED SOURCE — NOT ADMITTED — NOT PUBLISHED`

Ali directed LAiDIES to use the complete Amazon Quick manuscript as the source
base for the AI Fundamentals 101 textbook and confirmed on 2026-08-16 that she
had fully vetted the exact supplied text for accuracy. Do not restart a general
line-by-line accuracy review or substitute the rejected Concepts 101 text.

`rewind-amendments.json` is a checksum-bound overlay on those immutable source
bytes. It contains 13 earned Rewind references, including the two already in
the manuscript. Every addition names its teaching job and analogy limit; the
build fails if an exact insertion anchor moves or the vetted source hash changes.

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
2. add the visual teaching layer where it reduces reader effort;
3. run the exact rendered desktop/mobile reader and newcomer-comprehension
   checks; and
4. integrate the accepted source and fragment without restoring the rejected
   Concepts 101 artifact or claiming publication before public verification.

Build:

```sh
node content/library-books/pilots/ai-fundamentals-101-quick-manuscript/build-book.mjs
```
