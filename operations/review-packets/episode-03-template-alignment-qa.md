# Episode 03 Template Alignment QA

Date: June 20, 2026

Commit candidate: Align Episode 3 with the approved Episode 1/2 hybrid template direction.

## Council Result

**PASS FOR ALI REVIEW.**

Episode 3 now follows the approved hybrid Episode template direction closely enough to preserve and review. This is not marked as a complete shared-template extraction. The production page is aligned, but a later cleanup pass should still consolidate the repeated Episode template CSS and JavaScript into a reusable pattern.

## Files Changed

- `issues/issue-03.html`
- `operations/review-packets/episode-03-template-alignment-qa.md`
- `operations/review-packets/assets/episode-03-template-alignment/`

## Masthead Asset Decision

Selected masthead image:

- `assets/issue-03-hero.png`

Why it was selected:

- It is an existing Episode 3 asset.
- It shows the Burn Book / receipts object-world clearly.
- It supports the approved live masthead style with logo, Episode pill, title, subtitle, color line, and date.
- It avoids unrelated imagery and does not require a new generated asset.

Other Episode 3 assets inspected:

- `assets/issue-03-section-burn-book.png`
- `assets/issue-03-section-receipts-pass.png`
- `assets/issue-03-section-try-on.png`
- `assets/issue-03-section-wrong-room.png`
- `assets/issue-03-social-square.png`

## What Changed

- Replaced the old Episode 3 presentation with the approved pearl/blush masthead direction.
- Added sticky Episode nav with Season, Top, Article, Study Pack, and Weekly Ritual.
- Added Episode intro cards:
  - `Previously On LAiDIES...`
  - `On This Episode...`
- Preserved the Episode 3 article source file and rendered article copy.
- Added reusable-style article section heading treatment with color bar and full heading block.
- Kept Episode 3 images in the article using existing Episode 3 assets.
- Added the `So You Don't Pull a Cher` study pack with three expandable definitions:
  - Hallucination
  - Receipts
  - Verification
- Added `Next Time On LAiDIES...`.
- Added after-read actions:
  - Buttondown newsletter signup
  - Share Article
  - Copy Link
  - Instagram
  - LinkedIn
- Added compact desktop side rail and bottom `Complete the Weekly Ritual` handoff.
- Kept Weekly Bag labels aligned with Episode 1/2 naming:
  - Take the Quiz
  - Cheat Sheet
  - Try-On
  - Practice Cards
  - DJ Booth
  - Extra Credit
  - Community

## Content Preservation

- `content/issues/issue-03.md` was not edited.
- Episode 3 article copy is preserved from source.
- Reader-facing template additions were added around the article:
  - intro card wrappers
  - study pack definitions
  - next-time card
  - after-read actions
  - weekly ritual handoff
- One visible article sentence still uses the word "issue" inside preserved article prose: "Sometimes the model catches the issue..." This is not a UI label.

## QA Results

Browser QA used local preview:

- `http://127.0.0.1:4214/issues/issue-03.html`

Responsive checks:

| Viewport | Result |
| --- | --- |
| Desktop 1280 | Pass. No horizontal overflow. Article width 823px. Side rail visible. |
| Desktop 1440 | Pass. No horizontal overflow. Article width 860px. Side rail visible. |
| Wide desktop 1920 | Pass. No horizontal overflow. Layout remains centered and readable. |
| Mobile 375 | Pass. No horizontal overflow. Side rail hidden. |
| Mobile 390 | Pass. No horizontal overflow. Side rail hidden. |
| Mobile 430 | Pass. No horizontal overflow. Side rail hidden. |

Functional checks:

- Sticky Episode nav appears and remains usable.
- Masthead renders with live logo/title/subtitle/date.
- Intro cards are collapsed by default and expandable.
- Definition cards are collapsed by default and expandable.
- Weekly Ritual details opens on mobile.
- Copy Link fallback exposes `https://wearelaidies.com/issues/issue-03.html` when clipboard access is unavailable.
- Context return changes to `Return to The Bag` when opened with Bag context.
- Local visible links returned HTTP 200.
- Same-page anchors exist.
- Instagram link uses `https://www.instagram.com/we.are.laidies/`.
- LinkedIn link uses `https://www.linkedin.com/company/wearelaidies/?viewAsMember=true`.
- Console errors: none.
- Lazy-loaded Episode images: all load after scrolling each image into view.

Season page smoke check:

- Episode 3 is visible on the Season page.
- Episode 3 title appears as `The Burn Book Problem`.
- Episode 3 links to `issues/issue-03.html?from=season&issue=3`.

## Screenshots

Saved under:

- `operations/review-packets/assets/episode-03-template-alignment/`

Files:

- `episode03-desktop-1440-top.png`
- `episode03-desktop-1440-article.png`
- `episode03-desktop-wide-top.png`
- `episode03-mobile-390-top.png`
- `episode03-mobile-390-previously-on.png`
- `episode03-mobile-390-on-this-episode.png`
- `episode03-mobile-390-section-heading.png`
- `episode03-mobile-390-pullquote.png`
- `episode03-mobile-390-signoff.png`
- `episode03-mobile-390-definitions-collapsed.png`
- `episode03-mobile-390-definitions-expanded.png`
- `episode03-mobile-390-after-read-actions.png`
- `episode03-mobile-390-footer-next.png`
- `episode03-desktop-1440-side-rail.png`

## Known Limits

- The Episode 3 alignment is page-local. The shared Episode template should still be extracted later.
- A shared helper script injects a broader site menu/back helper; this page suppresses it so the approved Episode nav remains clean.
- External reference links were not fetched for editorial accuracy in this slice. Existing source links were preserved.
- This does not address the broader desktop layout recovery concern Ali flagged on homepage/site-wide desktop pages.

## Exact Staging List

- `issues/issue-03.html`
- `operations/review-packets/episode-03-template-alignment-qa.md`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-desktop-1440-article.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-desktop-1440-side-rail.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-desktop-1440-top.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-desktop-wide-top.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-after-read-actions.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-definitions-collapsed.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-definitions-expanded.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-footer-next.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-on-this-episode.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-previously-on.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-pullquote.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-section-heading.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-signoff.png`
- `operations/review-packets/assets/episode-03-template-alignment/episode03-mobile-390-top.png`
