# Episode 01 Hybrid Template Implementation QA

Date: 2026-06-20
Commit target: `Implement Episode 1 hybrid template`
Live page reviewed: `issues/issue-01.html`
Review candidate source: `operations/review-packets/episode-01-hybrid-template-candidate.html`

## Scope

Implemented the approved review-only Episode 1 hybrid template direction on the live Episode 1 page only.

This pass did not touch Episode 2, Episode 3, Dream Phone, homepage files, prototypes, backend/signup/Buttondown recovery files, or the social/production engine.

## Files Changed

- `issues/issue-01.html`
- `assets/episodes/issue-01/episode-01-what-like-its-hard.png`
- `assets/episodes/issue-01/episode-01-inline-article-image.jpg`
- `assets/episodes/issue-01/episode-01-inline-article-image-02.jpg`
- `assets/episodes/issue-01/episode-01-inline-article-image-03.jpg`
- `operations/review-packets/episode-01-hybrid-template-implementation-qa.md`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode-01-hybrid-implementation-qa-results.json`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-desktop-1440-top.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-top.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-on-this-season.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-on-this-episode.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-section-heading.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-pullquote.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-signoff.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-challenge.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-definitions-collapsed.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-definitions-expanded.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-after-read-actions.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-footer-next.png`

## Mixed File Note

`issues/issue-01.html` was already dirty before this implementation pass with Ali-requested Episode 1 wording fixes:

- Removed the non-LAiDIES masthead phrase and restored: `Get in loser, we're learning AI. One Wednesday at a time.`
- Removed the banned reader-facing word `rep` from the Try-On/workflow language.

Those edits are in the same live Episode 1 file and are included with this implementation because they are part of making Episode 1 acceptable for review.

## Implementation Summary

- Replaced the old Episode 1 presentation with the hybrid editorial pattern.
- Added compact fixed Episode navigation with return path, top anchor, article anchor, study pack anchor, and weekly ritual anchor.
- Rebuilt the masthead around one strong Episode 1 image with live HTML logo/title/premise/date and a pearl/blush wash.
- Removed masthead CTA buttons so mobile readers reach the article faster.
- Put `On This Season...` before `On This Episode...`, both as collapsible editorial intro panels.
- Restored Episode 1 imagery into the article with one image per article section.
- Preserved the article body text except for explicit typo and cleanup items listed below.
- Standardized section heading treatment with a colored bar plus full heading highlight.
- Kept the Episode 3-style pull quote treatment.
- Added a standout `Final Sip` sign-off.
- Added an honest LAiDIES Challenge path through Instagram instead of promising comments.
- Added expandable `So You Don't Pull a Cher` concept cards for three Episode 1 definitions.
- Added an after-read block for Buttondown signup, Instagram, Share Article, Copy Link, and URL fallback.
- Hid the desktop side rail on mobile so the after-read actions do not interrupt the article before the reader finishes.

## Copy Preservation

Episode 1 article copy was preserved except for these intentional changes:

- Fixed doubled apostrophe transfer typos: `It''s` to `It's` and `I''m` to `I'm`.
- Changed `Next Wednesday: LAiDIES #2` to `Next Wednesday: Episode 02`.
- Removed the out-of-place share prompt: `If this resonated, send it to a woman who's been wondering where she'd find the time to start. This is where.`
- Replaced the unsupported comments-based challenge path with a real Instagram path: `Share your version on Instagram and tag @we.are.laidies.`
- Included the pre-existing Ali-requested masthead and Try-On wording cleanup noted above.

No article sections were rewritten or removed.

## Asset Choices

Masthead image:

- `assets/episodes/issue-01/episode-01-what-like-its-hard.png`

Inline article images:

- `assets/9-to-5-chaos.png`
- `assets/episodes/issue-01/episode-01-inline-article-image.jpg`
- `assets/episodes/issue-01/episode-01-inline-article-image-02.jpg`
- `assets/episodes/issue-01/episode-01-inline-article-image-03.jpg`

Removed references:

- No `ugh-as-if` references remain in the live page.
- No inline/base64 article images remain in the live page.

## QA Results

Automated QA was run against local server:

- `http://127.0.0.1:4190/issues/issue-01.html`

Viewports checked:

- Desktop 1440
- Mobile 375
- Mobile 390
- Mobile 430

Results:

- No horizontal overflow at 375, 390, or 430.
- Fixed header height is 72px on mobile and does not cover the article content.
- Mobile hero title remains within the viewport.
- Mobile side rail is hidden so after-read actions stay after the article.
- Masthead image loads.
- Total image count: 7.
- Broken images: 0.
- Inline/base64 images: 0.
- `ugh-as-if` references: 0.
- Definition cards found: 3.
- Buttondown form action points to `https://buttondown.com/api/emails/embed-subscribe/laidies`.
- Buttondown fallback link is present.
- Placeholder email remains `itsbritneybitch@icon.com` and is visually light.
- Share Article and Copy Link both fall back to copying `https://wearelaidies.com/issues/issue-01.html`.
- Page errors: 0.
- Console warnings were limited to existing Plausible localhost warnings: `Ignoring Event: localhost`.

## Screenshots

- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-desktop-1440-top.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-top.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-on-this-season.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-on-this-episode.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-section-heading.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-pullquote.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-signoff.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-challenge.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-definitions-collapsed.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-definitions-expanded.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-after-read-actions.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-footer-next.png`

## Council Gate

Council result: `PASS FOR ALI REVIEW`.

Rationale:

- The first screen clearly identifies the Episode and gives a compact navigation path.
- The masthead uses the approved Episode 1 image direction with live text and a light pearl/blush treatment.
- The article starts faster on mobile because hero CTA buttons were removed and the after-read tools moved below the article.
- The definitions, share/copy, and Buttondown fallback interactions work without fake success claims.
- The page passes desktop and mobile QA with no broken images, no page errors, and no horizontal overflow.

This is safe to stage and commit as the isolated Episode 1 implementation slice. It is not a blanket approval to implement Episode 2 without Ali reviewing the live Episode 1 result.

## Still Needs Work

- Shared Episode component extraction is not done in this slice.
- Episode 2 has not been touched.
- Episode 3 has not been changed.
- The Buttondown form submits through the external Buttondown embed target; this pass provides a fallback link but does not build custom success/error recovery.
- The mobile side rail is intentionally hidden for Episode 1. A future shared Episode system should decide whether any side-rail content should become a bottom action module across all Episodes.

## Exact Staging List

- `issues/issue-01.html`
- `assets/episodes/issue-01/episode-01-what-like-its-hard.png`
- `assets/episodes/issue-01/episode-01-inline-article-image.jpg`
- `assets/episodes/issue-01/episode-01-inline-article-image-02.jpg`
- `assets/episodes/issue-01/episode-01-inline-article-image-03.jpg`
- `operations/review-packets/episode-01-hybrid-template-implementation-qa.md`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode-01-hybrid-implementation-qa-results.json`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-desktop-1440-top.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-top.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-on-this-season.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-on-this-episode.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-section-heading.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-pullquote.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-signoff.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-challenge.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-definitions-collapsed.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-definitions-expanded.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-after-read-actions.png`
- `operations/review-packets/assets/episode-01-hybrid-template-implementation/episode01-mobile-390-footer-next.png`
