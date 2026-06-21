# Season Language And Study Sheet QA

Date: 2026-06-21

Status: **PASS FOR ALI REVIEW**

## Scope

This focused pass updates the public Season page language and documents the Episode Study Sheet / Study Pack architecture.

Files changed:

- `episodes.html`
- `operations/review-packets/season-study-sheet-and-study-pack-architecture.md`
- `operations/review-packets/season-language-study-sheet-qa.md`
- `operations/review-packets/assets/season-language-study-sheet/season-desktop-1440-intro.png`
- `operations/review-packets/assets/season-language-study-sheet/season-mobile-390-intro.png`
- `operations/review-packets/assets/season-language-study-sheet/season-mobile-390-episodes-1-4.png`

## Season Copy Changes

Removed:

- `Read the LAiDIES season like a weekly magazine stack.`
- the intro use of `Learn` as the durable concept label
- the bottom card label `Go to Learn`

Added:

- `Episode Archive / 24-Episode Season`
- `Read the LAiDIES season in order.`
- copy that tells readers to start with Episode 1 and keep going
- copy that explains each Episode builds on the last
- copy that connects the Wednesday Bag to the current Episode ritual
- copy that introduces Episode Study Packs and Study Sheets as the review/application path
- bottom card label `Review The Concepts`

No Episode cards, routes, fake Study Sheet links, or full Study Sheet content were added.

## Study Sheet / Study Pack Planning Result

Documented in:

`operations/review-packets/season-study-sheet-and-study-pack-architecture.md`

Key rule:

> Study Pack = learn and practice. Quiz = check and earn.

The Study Sheet is defined as the test-sheet version of an Episode: core lesson, key concepts, what to remember, and practical use-at-work takeaway.

## Screenshots

Saved under:

`operations/review-packets/assets/season-language-study-sheet/`

- `season-desktop-1440-intro.png`
- `season-mobile-390-intro.png`
- `season-mobile-390-episodes-1-4.png`

## QA Results

| Check | Result | Notes |
| --- | --- | --- |
| Season intro no longer uses magazine-stack framing | PASS | `weekly magazine stack` and `magazine stack` are absent. |
| Season intro uses 24-Episode Season framing | PASS | Eyebrow and section copy reinforce the 24-Episode Season. |
| Copy tells readers to read in order | PASS | Headline is `Read the LAiDIES season in order.` |
| Copy references Episode Study Pack / Study Sheet, not Learn | PASS | Intro uses Episode Study Packs and Study Sheet language. `Go to Learn` was relabeled to `Review The Concepts`. |
| Episode 1, 2, 3 still appear in order | PASS | DOM order is Episode 1, Episode 2, Episode 3. |
| Episode 3 remains visible and linked | PASS | Episode 3 card title remains `The Burn Book Problem`; link points to `issues/issue-03.html?from=season&issue=3`. |
| Coming Soon Episode 4 remains after Episode 3 | PASS | The next card after Episode 3 is the locked `The Boy Band Lineup` card. |
| Mobile 390 remains clean | PASS | Screenshot generated; no horizontal overflow detected. |
| Desktop 1440 remains clean | PASS | Screenshot generated; no horizontal overflow detected. |
| No horizontal overflow | PASS | Checked mobile 390 and desktop 1440. |
| No page errors | PASS | No console or page errors on Season page or Episode 3 link check. |
| No broken links introduced | PASS | No missing local links found on the Season page. |
| No broken images | PASS | No missing image paths found on the Season page. |

## Council Review

Result: **PASS FOR ALI REVIEW**

Why:

- The page now frames the archive as an ordered 24-Episode season.
- It removes the confusing magazine-stack metaphor.
- It stops using `Learn` as the main durable concept label in this context.
- It introduces the Study Sheet idea without pretending the full Study Sheet system already exists.

Remaining risk:

- The public intro is now more explanatory. If Ali wants the top of the Season page to feel punchier, the next pass could move the detailed Study Sheet explanation into an expandable helper or future Study Pack UI.
- Actual Study Sheet cards/pages still need Ali approval before implementation.

## Exact Staging List

Recommended safe staging list:

- `episodes.html`
- `operations/review-packets/season-study-sheet-and-study-pack-architecture.md`
- `operations/review-packets/season-language-study-sheet-qa.md`
- `operations/review-packets/assets/season-language-study-sheet/season-desktop-1440-intro.png`
- `operations/review-packets/assets/season-language-study-sheet/season-mobile-390-intro.png`
- `operations/review-packets/assets/season-language-study-sheet/season-mobile-390-episodes-1-4.png`

Do not stage unrelated parked work.
