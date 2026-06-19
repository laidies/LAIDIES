# Episode 1 Review Fixes And Season QA

Date: 2026-06-19

Related commits reviewed:

- `b1f40838aea64bd25ca10a9fa8143b0fdc44e23d` - Align Episode 1 with Episode template
- `cbfb03b7bf051ea52dc6c8aad8b38329885634b4` - Restore Episode 3 to Season page

Council result for this slice: **PASS FOR ALI REVIEW**

This is not an Ali approval and not a blanket pass for the Episode system. The Episode 1 presentation fixes are ready for Ali to review. The broader mobile Episode reading system still needs a separate mobile pattern pass before Episode 2 is aligned.

## Scope

This slice fixed only the urgent Episode 1 presentation issues and the Season page Episode 3 cache path.

Changed:

- `issues/issue-01.html`
- `episodes.html` script cache key only
- `operations/review-packets/episode-01-review-fixes-and-season-qa.md`
- `operations/review-packets/mobile-episode-ux-audit.md`
- New screenshots under `operations/review-packets/assets/episode-01-review-fixes-and-season/`
- New screenshots under `operations/review-packets/assets/mobile-episode-ux-audit/`

Not changed:

- Episode 1 article body copy
- Episode 2 template
- Episode 3 article or assets
- Dream Phone
- backend/signup/Supabase/Buttondown
- social/production engine
- prototypes
- parked homepage journey work

## Episode 1 Masthead Fix

Before this slice, Episode 1 used the correct existing image, `assets/ugh-as-if.png`, but the treatment still felt less resolved than Episode 3. It had the right material, but the title/premise system did not feel as deliberately integrated with the object-world masthead.

Now Episode 1 uses the same core masthead rule as Episode 3:

- one strong existing image from the Episode
- LAiDIES logo as live/accessible visual HTML, not baked into a new image
- Episode label as live HTML
- title as live HTML
- premise as live HTML
- atmospheric image treatment behind the copy
- no new generated masthead image required

The Episode 1 masthead now uses:

- Image: `assets/ugh-as-if.png`
- Title: `On Wednesdays We Use AI`
- Label: `Episode #01`
- Premise: `A gentle first tab for women with full calendars, high standards, and no patience for beige AI explanations.`

Mobile 390 QA caught one important issue: the title initially clipped on the right edge. That was fixed by constraining and balancing the live masthead title on mobile. Current 390px measurement shows:

- viewport width: 390
- document scroll width: 390
- title box: left 51, right 339
- masthead card box: left 32, right 358
- result: no horizontal overflow and no title cropping

## Signoff Fix

Before this slice, the Episode 1 signoff leaned on script-style treatment and mixed brand styling in a way that did not feel as polished as Episode 3.

Now the lower block is a more reusable editorial showpiece:

- label: `Final Sip`
- anchor line: `Remember, LAiDIES:`
- strong serif signoff statement
- pill detail: `Small sips. Big moves.`
- no awkward script-font logo substitution
- no `trAI...` word styling in the challenge

The meaning was preserved: Episode 1 still closes on the small-sips idea and still invites readers to submit a better signoff line for credit.

Recommended reusable standard:

- Each Episode should have one polished end-of-read signoff showpiece.
- It should use the same live text pattern: kicker, `Remember, LAiDIES:`, one strong closing line, optional short phrase.
- It should not depend on decorative script fonts or mixed inline logo tricks for readability.

## Challenge Fix

Before this slice, the challenge block felt less premium and had distracting styling.

Now the challenge is a smaller editorial card beneath the signoff:

- title: `The LAiDIES Challenge`
- plain readable copy
- clear action: drop a sharper line in the comments
- clear reward: favorite gets featured with credit
- no fake or confusing brand typography inside the paragraph

Recommended reusable standard:

- Keep challenges as compact action cards.
- Put the reader action first.
- Put any reward/credit promise plainly.
- Avoid novelty typography inside body copy on mobile.

## Season Page Episode 3 Investigation

Episode 3 was already restored in the local static Season page and in `content/site/site-data.js` by the previous Season fix commit.

The remaining mobile-only failure path was likely stale cached data. The Season page loads:

`content/site/site-data.js?v=issue-02-live-1`

Then `script.js` rebuilds the visible Episode cards from `siteData.episodes`. If a mobile browser kept the older cached `site-data.js`, the browser could remove the static Episode 3 card and rebuild the page as Episode 1, Episode 2, then Coming Soon Episode 4.

This slice updates only the Season page data cache key:

`content/site/site-data.js?v=episode-03-season-card-fix`

No card copy, route, or styling was redesigned for this fix.

## Live Source Verification

Cache-busted deployed checks showed Episode 3 already present in the live source/data:

- `https://wearelaidies.com/episodes.html?codex-cache-check=20260619a`
- `https://wearelaidies.com/content/site/site-data.js?codex-cache-check=20260619a`

The cache key change should force mobile browsers to fetch the fixed Episode data instead of rebuilding the Season page from stale cached data.

If Ali still sees Episode 3 missing after this is deployed, the next likely check is whether her browser or CDN edge is still serving an old `episodes.html`.

## Route QA

Local QA used the real workspace served at `http://127.0.0.1:4184`.

Tested routes:

- Direct Season page: `http://127.0.0.1:4184/episodes.html`
- Homepage Read The Season path from `http://127.0.0.1:4184/index.html`
- Mobile menu Read The Season path from `http://127.0.0.1:4184/index.html`
- Episode 3 link from the Season card

Expected public order confirmed:

1. Episode 1 - On Wednesdays We Use AI
2. Episode 2 - Tell Me What You Want
3. Episode 3 - The Burn Book Problem
4. Coming soon - The Boy Band Lineup
5. Coming soon - The AI Group Chat Roll Call
6. Coming soon - Ask Jeeves Could Never

Episode 3 card confirmed:

- appears exactly once
- shows `Episode 3`
- title is `The Burn Book Problem`
- href is `issues/issue-03.html?from=season&issue=3`
- image is `assets/issue-03-hero.png`
- link returns status 200 locally
- no duplicate Episode 3 card
- Coming Soon cards remain after Episode 3

## QA Results

Passed:

- Episode 1 masthead image loads.
- Episode 1 masthead uses `assets/ugh-as-if.png`.
- Episode 1 masthead uses live HTML logo/title/premise.
- Episode 1 mobile title no longer clips at 390px.
- Episode 1 signoff is more polished and readable.
- Episode 1 challenge block is readable and no longer uses distracting script/inline logo styling.
- Episode 1 article body copy was preserved.
- Mobile header and contextual return link remain visible.
- Season page shows Episode 1, Episode 2, Episode 3, then Coming Soon Episode 4.
- Episode 3 Season link works.
- No horizontal overflow detected on tested 390px routes.
- No page errors detected.

Notes:

- Local analytics warnings appeared as `Ignoring Event: localhost`; these were warnings only, not page errors.
- Automated image checks reported some Episode 3 lazy-loaded body images as incomplete when inspected before scrolling. The asset files exist locally, so this is not classified as a missing asset blocker in this slice.
- In-app browser screenshot capture timed out on the heavy Episode 1 page, so screenshots were generated with local Playwright automation instead.

## Screenshots

Episode 1 and Season QA screenshots:

- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-desktop-1440-masthead.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-mobile-390-masthead.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-mobile-390-signoff-block.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-mobile-390-challenge-block.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-desktop-1440-signoff-challenge.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/season-mobile-390-homepage-read-season.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/season-mobile-390-menu-episodes.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/season-desktop-1440-episodes-1-4.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/qa-results.json`

## Council Gate

Episode 1 presentation fixes: **PASS FOR ALI REVIEW**

Why:

- The masthead now follows the approved rule of using one strong existing Episode image with live HTML logo/title/premise.
- The title no longer crops on mobile.
- The signoff/challenge now feel closer to the Episode 3 quality bar.
- The article body was not rewritten.

What still needs work:

- The broader mobile Episode reading pattern is still too inconsistent across Episodes.
- Episode 2 has not been aligned.
- Episode 3 remains the best template reference, but should not be copied blindly without improving the mobile Episode Kit/side-link pattern.

Ali should review Episode 1 now for the specific masthead/signoff/challenge fixes, but this does not approve Episode 2 implementation yet.

## Exact Staging List

Stage only:

- `episodes.html` - only the `content/site/site-data.js` cache-key hunk
- `issues/issue-01.html`
- `operations/review-packets/episode-01-review-fixes-and-season-qa.md`
- `operations/review-packets/mobile-episode-ux-audit.md`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-desktop-1440-masthead.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-desktop-1440-signoff-challenge.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-mobile-390-challenge-block.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-mobile-390-masthead.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/episode01-mobile-390-signoff-block.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/qa-results.json`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/season-desktop-1440-episodes-1-4.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/season-mobile-390-homepage-read-season.png`
- `operations/review-packets/assets/episode-01-review-fixes-and-season/season-mobile-390-menu-episodes.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode01-mobile-390-challenge-block.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode01-mobile-390-masthead.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode01-mobile-390-signoff-block.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode02-mobile-390-end-cta.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode02-mobile-390-mid-article.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode02-mobile-390-top.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode03-mobile-390-masthead.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode03-mobile-390-mid-article.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode03-mobile-390-reader-kit.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/episode03-mobile-390-signoff-end.png`
- `operations/review-packets/assets/mobile-episode-ux-audit/mobile-audit-capture-results.json`

Do not stage the pre-existing unrelated dirty changes in `episodes.html` beyond the cache-key hunk.
