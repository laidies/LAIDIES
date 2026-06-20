# Episode 02 Desktop Stabilization QA

Date: 2026-06-20

Status: **PASS FOR ALI REVIEW**

Council result: **PASS FOR ALI REVIEW**. Episode 2 is now page-locally stabilized for desktop review. This is not a shared Episode system extraction yet.

## Scope

This implementation slice stabilized `issues/issue-02.html` only.

Changed:

- `issues/issue-02.html`
- `operations/review-packets/episode-02-desktop-stabilization-qa.md`
- `operations/review-packets/assets/episode-02-desktop-stabilization/*`

Not touched:

- homepage
- Season / Episodes page
- Episode 1
- Episode 3
- shared `styles.css`
- shared `content/episode-page.css`
- shared `content/episode-page.js`
- Dream Phone
- backend/signup/Supabase/Buttondown
- social/production engine
- prototypes

## What Was Stabilized

The prior Episode 2 desktop experiment let the shell expand to about `1680px` and the article column to about `1080px` on wide desktop. That made the page feel over-wide and visually loose.

This pass keeps the approved Episode 2 masthead direction, but normalizes the page-local desktop layout:

- desktop shell capped at `1320px`
- article column capped at `860px`
- side rail capped at `320px`
- desktop paragraph measure capped around `76ch`
- desktop paragraph sample measured at about `710px`
- desktop body sample measured at `18.4px` / `30.9px` line height
- mobile keeps the existing single-column behavior

## Approved Masthead Preservation

Preserved:

- Episode 2 masthead image
- subtitle: `AI can't read your mind. Be David Rose about it.`
- soft translucent pearl/blush wash
- LAiDIES logo in translucent blush-glass block
- `Episode #02` pill
- large editorial title
- subtitle in translucent card
- short colored accent line on subtitle card
- date on the right on desktop
- date stacked cleanly on mobile
- no long horizontal line over the Episode pill

## QA Results

Automated local preview QA ran against:

`http://127.0.0.1:4213/issues/issue-02.html`

Passed:

- desktop 1280 checked
- desktop 1440 checked
- wide desktop 1920 checked
- mobile 390 checked
- no horizontal overflow at tested sizes
- article text is readable
- line length is controlled
- layout is not tiny/zoomed out
- layout is not over-wide
- side rail does not squeeze article
- approved masthead style is preserved
- mobile remains single-column and clean
- no relevant console errors

Console note:

- Local analytics logged `Ignoring Event: localhost`. This is expected in local preview and not a page error.

## Measurements

| Viewport | Shell | Article | Side rail | Paragraph sample | Overflow |
| --- | ---: | ---: | ---: | ---: | --- |
| 1280 desktop | 1184px | 823px | 320px | 710px / 18.4px | no |
| 1440 desktop | 1320px | 860px | 320px | 710px / 18.4px | no |
| 1920 wide | 1320px | 860px | 320px | 710px / 18.4px | no |
| 390 mobile | 362px | 362px | hidden | 362px / 16px | no |

## Screenshots

Saved under:

`operations/review-packets/assets/episode-02-desktop-stabilization/`

- `episode02-desktop-1280-top.png`
- `episode02-desktop-1440-top.png`
- `episode02-desktop-1440-article.png`
- `episode02-desktop-wide-top.png`
- `episode02-desktop-wide-article.png`
- `episode02-mobile-390-top.png`
- `episode02-mobile-390-article.png`
- `episode-02-desktop-stabilization-results.json`

## Council Review

Question: Does Episode 2 desktop now meet LAiDIES readability and layout standards?

Answer: Yes for Ali review. It is controlled, readable, and no longer uses the over-wide desktop experiment.

Question: Is it ready for Ali review?

Answer: Yes.

Question: Is the approved masthead preserved?

Answer: Yes. The masthead image, blush/pearl wash, LAiDIES glass block, Episode pill, title, subtitle card, accent line, and date treatment remain intact.

Question: Did mobile stay intact?

Answer: Yes. Mobile remains single-column, with no horizontal overflow in the 390px capture.

Question: Should this page-local pattern inform the eventual shared Episode desktop system?

Answer: Yes. The 1320px shell, 860px article, compact 320px side rail, and paragraph measure cap are a stronger starting point than both the older 1100px shell and the over-wide 1680px experiment. It should be reviewed against Episode 1 and Episode 3 before extracting shared CSS.

## Remaining Notes

- This pass intentionally does not fix homepage/Season desktop scale. Those remain parked for the next recovery slice.
- This pass intentionally does not extract shared Episode CSS.
- `issues/issue-02.html` was already dirty before this slice. The file is mixed historically, but the reviewed diff is Episode 2 page-local and relevant to this stabilization.

## Exact Staging List

Stage only:

- `issues/issue-02.html`
- `operations/review-packets/episode-02-desktop-stabilization-qa.md`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode-02-desktop-stabilization-results.json`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode02-desktop-1280-top.png`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode02-desktop-1440-article.png`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode02-desktop-1440-top.png`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode02-desktop-wide-article.png`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode02-desktop-wide-top.png`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode02-mobile-390-article.png`
- `operations/review-packets/assets/episode-02-desktop-stabilization/episode02-mobile-390-top.png`

Do not stage unrelated dirty or untracked work.
