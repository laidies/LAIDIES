# Homepage And Season Desktop Recovery QA

Date: 2026-06-21

Status: **PASS FOR ALI REVIEW**

Council gate used: `operations/review-packets/laidies-council-quality-gate.md`

## Scope

This slice recovers desktop scale and readability on:

- `index.html`
- `episodes.html`

It does not touch live Episode pages, Dream Phone, backend/signup/Supabase/Buttondown/Hyvor/Plausible, social production files, or prototypes.

## What Changed

### Homepage

- Added page-local desktop recovery CSS in `index.html`.
- Preserved the approved homepage masthead image and copy.
- Widened and anchored the post-masthead homepage sections:
  - current Episode card
  - Pick Your Path cards
  - universe/object map cards
  - weekly ritual preview
  - subscribe/origin sections
- Kept mobile rules separate so the mobile homepage remains unchanged in intent.

### Season / Episodes Page

- Added page-local desktop recovery CSS in `episodes.html`.
- Preserved the Season content and Episode 3 card.
- Gave the Season intro and episode shelf a deliberate desktop shell.
- Enlarged desktop episode cards, images, and text rhythm so the Season page no longer feels like a tiny centered archive.
- Kept the mobile Season stack intact.

## Mixed File Note

`index.html` and `episodes.html` were already dirty before this slice. They are mixed files, but they are also the intended live files for this desktop recovery pass.

No unrelated dirty files are included in the recommended staging list.

## Screenshots

Saved under:

`operations/review-packets/assets/homepage-season-desktop-recovery/`

- `homepage-desktop-1280.png`
- `homepage-desktop-1440.png`
- `homepage-desktop-wide.png`
- `homepage-mobile-390.png`
- `season-desktop-1280.png`
- `season-desktop-1440.png`
- `season-desktop-wide.png`
- `season-mobile-390.png`
- `season-mobile-390-episodes-1-4.png`

Note: the in-app browser loaded the local pages, but its screenshot endpoint repeatedly timed out. Screenshots were generated with the bundled local Playwright runtime instead.

## QA Results

| Check | Result | Notes |
| --- | --- | --- |
| Homepage desktop no longer feels tiny/zoomed out | PASS | 1280, 1440, and wide desktop captures show the masthead full-width and the post-masthead sections scaled to 1120-1440px shells. |
| Homepage masthead preserved | PASS | Approved image-led masthead and live HTML copy remain. |
| Homepage mobile still clean | PASS | 390 capture has no horizontal overflow. |
| Season desktop balanced/readable | PASS | 1280, 1440, and wide captures show larger intro, stronger shelf composition, and readable episode cards. |
| Season mobile clean | PASS | 390 capture has no horizontal overflow. |
| Episode 3 visible on Season page | PASS | Episode order is Episode 1, Episode 2, Episode 3, Coming Soon Episode 4, Episode 5, Episode 6. |
| Episode 3 link works | PASS | `issues/issue-03.html?from=season&issue=3` loads `LAiDIES #3: The Burn Book Problem`. |
| No horizontal overflow | PASS | Checked homepage and Season at 1280, 1440, wide desktop, and mobile 390. |
| No page errors | PASS | No console/page errors on `index.html`, `episodes.html`, or `issues/issue-03.html`. |
| No broken image paths | PASS | Local image path existence check found no missing images in `index.html`, `episodes.html`, or `issues/issue-03.html`. |
| No fake links introduced | PASS | No new links were introduced by this pass; local link existence checks for the scoped pages passed. |

## Council Review

### Homepage

Result: **PASS FOR ALI REVIEW**

Why: the desktop homepage no longer reads as a small centered island after the masthead. The approved masthead remains intact, and mobile still behaves.

Remaining risk: the homepage file contains older parked edits outside this desktop scale pass. If Ali wants a full homepage content review later, that should be a separate creative pass.

### Season Page

Result: **PASS FOR ALI REVIEW**

Why: Episode 3 remains visible, the archive order is correct, and the desktop layout now feels intentionally scaled and readable.

Remaining risk: the Season page still has a lot of copy in the intro/shelf area. That is not a blocker for this recovery slice, but Ali may later want a tighter editorial content pass.

## Exact Staging List

Recommended safe staging list:

- `index.html`
- `episodes.html`
- `operations/review-packets/homepage-season-desktop-recovery-qa.md`
- `operations/review-packets/assets/homepage-season-desktop-recovery/homepage-desktop-1280.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/homepage-desktop-1440.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/homepage-desktop-wide.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/homepage-mobile-390.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/season-desktop-1280.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/season-desktop-1440.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/season-desktop-wide.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/season-mobile-390.png`
- `operations/review-packets/assets/homepage-season-desktop-recovery/season-mobile-390-episodes-1-4.png`

Do not stage unrelated parked files.
