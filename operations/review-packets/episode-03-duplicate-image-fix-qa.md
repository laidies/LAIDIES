# Episode 03 Duplicate Image Fix QA

Date: June 20, 2026

Fix status: **READY TO COMMIT**

Scope:

- `issues/issue-03.html`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/`
- this QA packet

No new images were generated, copied, or borrowed. No Episode 3 copy was rewritten.

## Root Cause

The live Episode 3 article image map reused two existing Episode 3 section images:

- `../assets/issue-03-section-receipts-pass.png` appeared 3 times.
- `../assets/issue-03-section-try-on.png` appeared 2 times.

This duplicate usage **was not introduced by commit `8a1bace0a8a019db832e32cbdf6fc3a23eca3321`**. The same duplicate section image map existed before the Episode 3 template alignment. The template alignment made the page more polished and easier to review, which made the repeated images more noticeable.

## Image Reference Table

| Image path | Before template alignment | Before this fix | After this fix | Decision |
| --- | ---: | ---: | ---: | --- |
| `../assets/issue-03-hero.png` | 2 references in metadata/CSS hero treatment | 3 references in metadata/CSS/live masthead image | 3 references in metadata/CSS/live masthead image | Keep. This is the approved existing Episode 3 masthead/metadata image. The old CSS references are suppressed by the aligned masthead. |
| `../assets/brand/laidies-logo-masthead-approved-v3.png` | 1 | 1 | 1 | Keep. Existing brand logo. |
| `../assets/issue-03-section-burn-book.png` | 1 | 1 | 1 | Keep. Unique Episode 3 section image. |
| `../assets/issue-03-section-wrong-room.png` | 1 | 1 | 1 | Keep. Unique Episode 3 section image. |
| `../assets/issue-03-section-receipts-pass.png` | 3 | 3 | 1 | Fix. Keep only on the most semantically direct section: `Elle Woods Would Like To See The File`. |
| `../assets/issue-03-section-try-on.png` | 2 | 2 | 1 | Fix. Keep only on the most semantically direct section: `Cher's Closet Can Pick The Outfit. You Check The Dress Code.` |

## Chosen Fix

Removed the extra inline image mappings from:

- `i-couldnt-help-but-wonder`
- `chutney-can-say-it-thrice-elle-still-checks-the-timeline`
- `the-receipts-pass-study-montage`

Kept one unique image per approved Episode 3 production section asset:

- `the-burn-book-problem` -> `../assets/issue-03-section-burn-book.png`
- `she-doesnt-even-go-here` -> `../assets/issue-03-section-wrong-room.png`
- `elle-woods-would-like-to-see-the-file` -> `../assets/issue-03-section-receipts-pass.png`
- `chers-closet-can-pick-the-outfit-you-check-the-dress-code` -> `../assets/issue-03-section-try-on.png`

## Why This Fix Is Safe

- It does not add new assets.
- It does not reference untracked experimental `assets/episodes/issue-03/section-*-v*.png` files.
- It does not borrow images from Episode 1, Episode 2, Dream Phone, homepage, Mme CLAi-O, FAiRY, Bag, Try-On, or other activity pages.
- It preserves the masthead image.
- It preserves all article copy.
- It reduces the article image map from repeated image usage to four unique approved Episode 3 production images.

## Before / After Screenshots

Saved under:

- `operations/review-packets/assets/episode-03-duplicate-image-fix/`

Before:

- `before-mobile-390-first-receipts-pass.png`
- `before-mobile-390-duplicate-receipts-pass.png`
- `before-mobile-390-duplicate-try-on.png`

After:

- `after-mobile-390-masthead.png`
- `after-mobile-390-chutney-no-duplicate.png`
- `after-mobile-390-study-montage-no-duplicate.png`
- `after-desktop-1440-masthead.png`
- `after-desktop-1440-article-start.png`

Machine-readable QA data:

- `episode-03-duplicate-image-fix-results.json`

## QA Results

| Check | Result |
| --- | --- |
| Episode 3 no longer shows accidental duplicate inline article image paths | Pass. Each `figure.section-image img` path appears once after the fix. |
| Masthead still uses existing Episode 3 image | Pass. Masthead remains `../assets/issue-03-hero.png`. |
| Article images still load | Pass. Desktop 1440 loads all section images. Mobile 390 targeted lazy-load check confirms the last section image loads after scrolling into view. |
| Broken production image paths | Pass. Files exist for every referenced Episode 3 image path. |
| No horizontal overflow | Pass at mobile 390 and desktop 1440. |
| Console/page errors | Pass. No console errors captured in browser QA. |
| Article copy preserved | Pass. No article text was edited; mobile article text length stayed unchanged in before/after QA. |
| Mobile 390 checked | Pass. |
| Desktop 1440 checked | Pass. |

## Exact Files Changed

- `issues/issue-03.html`
- `operations/review-packets/episode-03-duplicate-image-fix-qa.md`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-desktop-1440-article-start.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-desktop-1440-masthead.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-mobile-390-chutney-no-duplicate.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-mobile-390-masthead.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-mobile-390-study-montage-no-duplicate.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/before-mobile-390-duplicate-receipts-pass.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/before-mobile-390-duplicate-try-on.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/before-mobile-390-first-receipts-pass.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/episode-03-duplicate-image-fix-results.json`

## Exact Staging List

If committing this fix, stage only:

- `issues/issue-03.html`
- `operations/review-packets/episode-03-duplicate-image-fix-qa.md`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-desktop-1440-article-start.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-desktop-1440-masthead.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-mobile-390-chutney-no-duplicate.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-mobile-390-masthead.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/after-mobile-390-study-montage-no-duplicate.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/before-mobile-390-duplicate-receipts-pass.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/before-mobile-390-duplicate-try-on.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/before-mobile-390-first-receipts-pass.png`
- `operations/review-packets/assets/episode-03-duplicate-image-fix/episode-03-duplicate-image-fix-results.json`

Do not stage:

- `operations/review-packets/episode-03-image-audit.md` unless Ali explicitly wants that earlier audit preserved in the same commit.
- homepage/Season files
- Episode 1/2 files
- Dream Phone files
- social production engine files
- backend files
- prototypes
- unrelated parked work
