# Rewind Era terminology audit — 2026-07-25

**Status:** REPORT READY — no public source changed
**Scope:** the current `scripts/build-public-site.mjs` closure, rebuilt locally on 2026-07-25. It contains 1,098 files / 1,039.45 MiB, with 0 missing and 0 oversized dependencies. Underscored review pages, `operations/`, `docs/`, archives and other denied studio paths were excluded by the builder.

## Canonical rule used

The locked product definition is **Rewind Era: 1990–2010, from dial-up to downloads**. Use `Rewind Era` when naming the whole cultural span. Keep a decade, `Y2K`, or a period/style name when it accurately identifies a particular object, interface, song/style, historical claim, story setting, or exception.

The public brands are **LAiDIES** and **SUNNYVAiLE**. `Sunnyvale` is permitted only when naming the real California city in the trailer wordplay.

## Verdict

**FIX TODAY: 46 source-string corrections across 10 files.**

- 5 town-name errors: `Sunnyvale` is displayed as the fictional town in the postcard flow and Episode 2 cue.
- 8 broad-span errors: Mall/experience copy treats `90s/Y2K` or `90s or 2000s` as the whole era.
- 33 raw brand-casing errors: the duplicated quiz data says `LAIDIES` or `lAIdies`. The current client-side normalizer can mask these after JavaScript runs, but source/copy and non-JS exposure are still inconsistent.

The exact records, lines and safe replacements are in [rewind-era-findings.json](rewind-era-findings.json). Do not bulk-replace `Y2K`, `90s`, `1990s`, or `2000s` elsewhere.

## Preserve as intentional

- **Specific history, setting, or exception:** the trailer's real-world line “The 90s had Sunnydale, Bayside, and Capeside. Silicon Valley has Sunnyvale”; its fiction set around 1999; and David Rose as a non-Rewind-Era exception once the span wording is repaired.
- **Specific era/style/object labels:** MAiKEOVER's dated 1990/1995/2000/2005 styling choices; 1990s Glamour Shots and school-photo backdrops; Y2K computer, Y2K transcript, Y2K detective/glitch, Y2K tech, Y2K object bundle, Y2K rhinestone initial, Y2K pop/teen-drama music styles, and era-specific shop inventory.
- **Specific media, activity, or quiz wording:** the Dream Phone's “wild 90s fact” game and `90s trivia` search terms; the deliberately false quiz distractor “Because the 90s had the best AI tools”; named 2000s coffeehouse style; and the explicit David Rose exception.
- **Asset and implementation identifiers:** `y2k-v3` paths, CSS classes/tokens, filenames, and comments are not visitor prose and must not be renamed in a terminology pass.
- **Lowercase `ladies` in URL/narration:** `ladies.ai`, spoken spelling of the domain, and ordinary address to “ladies” are intentional; they are not the visual LAiDIES wordmark.

## Recommended edit order

1. Correct the five displayed `Sunnyvale` strings.
2. Change the eight whole-span claims to `Rewind Era` wording.
3. Normalize the two mirrored quiz sources together: `content/site/quizzes.json` and `content/site/site-data.js`.
4. Rebuild with `node scripts/build-public-site.mjs <empty-output-directory>` and verify that no `FIX TODAY` old string remains in the output.

## Deliberate non-findings

The homepage already has the correct canonical framing at `index.html:7`, `index.html:516`, `index.html:518`, `index.html:538`, and `index.html:743`. The audit does not recommend changing those lines.
