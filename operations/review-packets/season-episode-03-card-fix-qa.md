# Season Episode 3 Card Fix QA

## Root Cause

The static `episodes.html` file already included an Episode 3 card, but the public Season page hydrates the episode shelf from `window.LAIDIES_SITE_DATA.episodes` in `content/site/site-data.js`.

During hydration, `script.js` removes the non-locked static cards and rebuilds the shelf from the data source. That data source only listed Episodes 1 and 2, so the rendered page showed Episode 1, Episode 2, then the locked Coming Soon Episode 4 card.

## Files Changed

- `content/site/site-data.js`
  - Added the published Episode 3 record to the Season-page data source.
- `operations/review-packets/season-episode-03-card-fix-qa.md`
  - Added this QA note.
- `operations/review-packets/assets/season-episode-03-card-fix/season-desktop-1440.png`
  - Desktop QA screenshot.
- `operations/review-packets/assets/season-episode-03-card-fix/season-mobile-390.png`
  - Mobile QA screenshot.
- `operations/review-packets/assets/season-episode-03-card-fix/qa-results.json`
  - Playwright QA output.

## Asset And Link Used

- Episode 3 image: `assets/issue-03-hero.png`
- Episode 3 live page: `issues/issue-03.html`
- Rendered Season-page link: `issues/issue-03.html?from=season&issue=3`

No fake links or new fake assets were created.

## Before / After Behavior

Before:

- The public Season page rebuilt the shelf from data that only included Episodes 1 and 2.
- Episode 3 disappeared from the rendered shelf.
- Readers saw Episode 2 followed by Coming Soon Episode 4.

After:

- The Season page data includes Episode 3 as a published episode.
- The rendered shelf order is:
  - Episode 1: On Wednesdays We Use AI
  - Episode 2: Tell Me What You Want
  - Episode 3: The Burn Book Problem
  - Coming soon: The Boy Band Lineup
  - Coming soon: The AI Group Chat Roll Call
  - Coming soon: Ask Jeeves Could Never
- Episode 3 appears exactly once.
- The Episode 3 card uses reader-facing `Episode 3`, not `Issue 3`.

## QA Results

Tested through local preview at `http://127.0.0.1:4176/episodes.html`.

- Desktop 1440: PASS
- Mobile 390: PASS
- Season page shows Episode 1, Episode 2, Episode 3, then Coming Soon Episode 4: PASS
- Episode 3 link works: PASS, status 200
- Episode 3 page contains `The Burn Book Problem`: PASS
- No duplicate Episode 3 card: PASS
- No horizontal overflow at 1440: PASS
- No horizontal overflow at 390: PASS
- No page errors: PASS
- Reader-facing card text says `Episode 3`, not `Issue 3`: PASS
- No draft Episode 3 card appears: PASS

Local preview note:

- The console emitted the existing analytics/event warning `Ignoring Event: localhost` in local preview. No runtime page errors were observed.

## Screenshots

- `operations/review-packets/assets/season-episode-03-card-fix/season-desktop-1440.png`
- `operations/review-packets/assets/season-episode-03-card-fix/season-mobile-390.png`

## Exact Staging List

Stage only:

- `content/site/site-data.js` partial hunk adding Episode 3 only
- `operations/review-packets/season-episode-03-card-fix-qa.md`
- `operations/review-packets/assets/season-episode-03-card-fix/season-desktop-1440.png`
- `operations/review-packets/assets/season-episode-03-card-fix/season-mobile-390.png`
- `operations/review-packets/assets/season-episode-03-card-fix/qa-results.json`

Do not stage unrelated parked work, Dream Phone files, Episode 1/2 template work, homepage journey files, backend/signup/Supabase/Buttondown files, social/production engine files, prototypes, or existing unrelated dirty changes in `content/site/site-data.js`.
