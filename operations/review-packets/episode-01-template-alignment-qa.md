# Episode 01 Template Alignment QA

Date: 2026-06-19

Scope: Part B2B implementation slice. Episode 1 was aligned toward the Episode 3 reader experience. Dream Phone, Episode 2, backend/signup/Supabase/Buttondown, social production engine, prototypes, homepage journey work, and unrelated parked work were not touched.

## Files Changed

- `issues/issue-01.html`
- `operations/review-packets/episode-01-masthead-design-qa.md`
- `operations/review-packets/episode-01-template-alignment-qa.md`
- `operations/review-packets/assets/episode-01-template-alignment/*.png`
- `operations/review-packets/assets/episode-01-template-alignment/qa-results.json`

## What Changed

- Reworked the Episode 1 masthead to use `assets/ugh-as-if.png` as the visual layer.
- Layered the approved LAiDIES wordmark, Episode number, title, premise, and date as live HTML.
- Added an Episode 3-style reader kit with The Lesson, Try-On, and This Week's Rule.
- Wrapped the preserved article in an `article-layout` with an Episode 3-style side rail.
- Added side rail CTAs into Episode 1 Bag, quiz, printable, Try-On, cards, anthem, Extra Credit, and Room.
- Added a weekly ritual grid after the article area.
- Added a small section-nav script that gives existing `h2` headings ids and fills the side rail jump list.
- Removed the generic `data-episode-toolkit` mount to avoid duplicating the new reader kit and ritual grid.

## What Was Preserved

- Published URL: `issues/issue-01.html`.
- Episode 1 article body copy.
- Existing inline/base64 article images.
- Existing `assets/ugh-as-if.png` article image source.
- Existing references section.
- Existing signoff/challenge section.
- Existing contextual return behavior from B2A.
- Existing `issue=` query params and route names.

Article preservation check:

- Compared the current article body against `HEAD:issues/issue-01.html`.
- Result: exact match after normalizing only the intentional article wrapper/class change.
- Character count before and after: `1013764`.

## Masthead Decision

Masthead asset: `assets/ugh-as-if.png`

Decision: PASS FOR IMPLEMENTATION

Reason: Ali clarified that each Episode should use one already-created image from that Episode and make the masthead the same way the homepage does. Episode 1 now follows that rule. No new generated masthead image was created.

## Links And CTAs Checked

All Episode 1 reader-kit/ritual local targets returned `200` in the local QA crawl:

- `this-week.html?issue=1&bag=open`
- `learn/quiz.html?from=this-week&issue=1&bag=open#quiz-start`
- `printable.html?issue=1&from=this-week&bag=open&group=practice`
- `try-on.html?from=this-week&issue=1&bag=open&group=practice`
- `games/trading-cards.html?from=this-week&issue=1&bag=open&group=practice`
- `games/dj-booth.html?from=this-week&issue=1&bag=open#djApp`
- `games/fun-pack.html?from=this-week&issue=1&bag=open&group=fun`
- `community.html?from=this-week&issue=1&bag=open&group=connect`

Return behavior checked:

- `from=season` -> `Back to the Season`
- `from=this-week&bag=open` -> `Back to the Bag`

## Screenshots

- `operations/review-packets/assets/episode-01-template-alignment/episode01-desktop-1440.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-desktop-reader-tools-1440.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-mobile-375.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-mobile-390.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-mobile-430.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-bag-return-mobile-390.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-weekly-ritual-mobile-390.png`
- `operations/review-packets/assets/episode-01-template-alignment/qa-results.json`

## Automated QA

Tested locally at:

- Desktop 1440
- Mobile 375
- Mobile 390
- Mobile 430

Results:

- No console errors.
- No page errors.
- No horizontal overflow.
- Masthead image loaded.
- Mobile title fits its parent at 375, 390, and 430.
- 8 images loaded, 0 broken.
- 3 inline/base64 images still present and loaded.
- 3 reader kit cards present.
- 9 weekly ritual cards present.
- Reader-kit and ritual links returned local `200`.

## Gaps And Follow-Ups

- Ali may still want to fine-tune the mobile crop/overlay because the selected image has its own visible `Ugh, as if` screen text.
- Episode 2 is intentionally not aligned in this pass.
- This pass did not extract inline/base64 images. They were preserved exactly.
- This pass did not refactor shared Episode CSS. The changes are isolated to Episode 1.

## Exact Staging Recommendation

Stage only:

- `issues/issue-01.html`
- `operations/review-packets/episode-01-masthead-design-qa.md`
- `operations/review-packets/episode-01-template-alignment-qa.md`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-desktop-1440.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-desktop-reader-tools-1440.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-mobile-375.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-mobile-390.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-mobile-430.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-bag-return-mobile-390.png`
- `operations/review-packets/assets/episode-01-template-alignment/episode01-weekly-ritual-mobile-390.png`
- `operations/review-packets/assets/episode-01-template-alignment/qa-results.json`

Do not stage unrelated dirty or untracked files.
