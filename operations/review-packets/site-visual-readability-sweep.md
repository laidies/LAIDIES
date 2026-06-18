# LAiDIES Site Visual / Readability / Navigation Sweep

Status: ready for Ali review. Nothing staged, committed, or pushed.

Date: 2026-06-18

## Scope

This pass reviewed the live-facing LAiDIES areas affected by the Episode 3 launch, Wednesday Bag work, homepage polish, and signup concerns.

The sweep focused on:

- homepage hierarchy, CTAs, images, and signup fallbacks
- header / quick nav labels on high-traffic pages
- return paths from ritual, game, quiz, Book, and Clubhouse pages
- Fairy Godmother readability and contrast
- current Buttondown signup behavior
- social preview metadata sanity checks
- mobile and desktop smoke checks

This pass did not touch `operations/prototypes/**`, did not stage, did not commit, and did not use `git add`.

## Files Changed In This Sweep

Changed during this sweep:

- `index.html`
- `script.js`
- `episodes.html`
- `learn.html`
- `learn/quiz.html`
- `printable.html`
- `try-on.html`
- `clubhouse.html`
- `clubhouse-pass.html`
- `community.html`
- `hot-goss.html`
- `reference-closet.html`
- `games/fun-pack.html`
- `games/dream-phone.html`
- `games/madame-claio.html`
- `games/fairy-godmother.html`
- `games/dj-booth.html`
- `games/trading-cards.html`
- `games/girl-talk.html`
- `operations/review-packets/site-visual-readability-sweep.md`
- `operations/review-packets/email-signup-buttondown-audit.md`

Already-dirty homepage/image work still needing Ali approval before any staging review:

- `assets/brand/laidies-homepage-masthead-bg-candidate-v10.png`
- `assets/home-book-of-receipts-closet-v1.png`

## Navigation / Naming Fixes

Header quick nav on the reviewed live pages now uses the current architecture labels where edited:

- `LATEST`
- `START HERE`
- `SEASON`
- `THE BOOK`
- `CLUBHOUSE`
- `JOIN`

Footer and page-card labels were also cleaned where the scan found old architecture names:

- `The Room` -> `Join`
- `Reference Closet` -> `Lore Closet`
- `The Receipts` -> `THE EVIDENCE DRAWER`
- `This Week` -> `This Week’s Bag`
- `Reference Closet` as a Book-area card -> `THE LORE CLOSET`

Pages updated with this compact nav treatment:

- `episodes.html`
- `learn.html`
- `learn/quiz.html`
- `printable.html`
- `try-on.html`
- `clubhouse.html`
- `clubhouse-pass.html`
- `community.html`
- `hot-goss.html`
- `reference-closet.html`
- `games/fun-pack.html`
- `games/dream-phone.html`
- `games/madame-claio.html`
- `games/fairy-godmother.html`
- `games/dj-booth.html`
- `games/trading-cards.html`
- `games/girl-talk.html`

Naming fixes made:

- `Madame CLAI-O` / `Mme CLAI-O` was corrected to `Madame CLAi-O` / `Mme CLAi-O` in the Clubhouse and game surfaces touched in this pass.
- `FAiRY GODMOTHER` was applied where the feature is treated as a branded LAiDIES-world name.
- Standalone `AI` in normal copy should remain normal sentence text, not tiny logo-styled `Ai`. The homepage had already been adjusted in the previous visual pass so `Get in, loser. We’re doing AI.` uses normal AI sizing.

Final text scan result:

- no remaining `CLAI-O`
- no remaining `Business Women`, `Business women`, or `Businesswomens`
- no remaining `Start where your brain is`
- no remaining old footer/header labels matching `The Room`, `Reference Closet`, `The Receipts`, or bare `This Week` in the swept pages

## Return Path Fixes

Return controls were checked and tightened on the pages touched in this pass.

Confirmed or changed:

- `games/madame-claio.html` now uses a direct `← Back to Clubhouse` link instead of a generic history button.
- `games/fairy-godmother.html` returns to the Weekly Fun Pack / Bag context when opened from the weekly ritual.
- `try-on.html` returns to Weekly Study Pack when opened from the Bag.
- `hot-goss.html` defaults to `this-week.html?issue=3&bag=open&group=realworld` with `← Back to the Book of Receipts`.
- `clubhouse-pass.html` uses `← Back to Join` instead of a generic browser-history button.
- `learn/quiz.html` uses JavaScript to replace the generic Learn return when opened from the Wednesday Bag. In focused quiz mode, the cramped header return is hidden and a fixed ritual return link is inserted instead.

Remaining return-path flag:

- `community.html` and `hot-goss.html` are mixed files from earlier work. Their return changes should be partial-staged only if Ali later approves a cleanup commit.

## Readability / Contrast Fixes

Known issue fixed:

- `games/fairy-godmother.html` had required form text that was too pale on the blush/plum background.

Fairy Godmother changes:

- form labels now use readable plum
- textarea text and placeholder contrast improved
- dropdown contrast improved
- wand/random buttons made clearer
- helper/status copy strengthened
- branded naming updated to `FAiRY GODMOTHER`

QA rule added for future weeks:

> Form readability must be checked in context: labels, placeholders, selected values, helper text, dropdown text, and button text must be readable on the actual background in desktop and mobile screenshots. A page does not pass readability QA just because it loads and has no overflow.

## Signup / Buttondown Findings

Signup surfaces checked:

- homepage mini signup
- homepage main signup
- episodes mini signup
- Clubhouse Pass newsletter opt-in path

Fixes made:

- added hosted Buttondown fallback links on homepage signup areas
- added hosted Buttondown fallback link on the Episodes page mini signup
- changed fake homepage mini-signup success copy to honest confirmation copy:
  - `Request sent to Buttondown. Check your inbox to confirm.`

Buttondown endpoint found:

```text
https://buttondown.com/api/emails/embed-subscribe/laidies
```

Detailed audit:

- `operations/review-packets/email-signup-buttondown-audit.md`

No real test email was submitted because Ali has not explicitly approved a controlled signup test.

## Social Metadata Check

Checked current metadata paths:

- homepage uses the current pearl/blush brand social image
- Episode 3 uses an Episode 3 share image
- no old neon logo was found as the current homepage or Episode 3 social preview image in the checked metadata

No metadata change was needed in this sweep.

## Homepage / Image Status

Homepage image status after the ongoing visual work:

- Current Episode: `assets/issue-03-hero.png`
- Book of Receipts candidate: `assets/home-book-of-receipts-closet-v1.png`
- Clubhouse: `assets/clubhouse-compact-open-v4.png`
- Join the Club currently needs a stronger, more consistent asset
- How LAiDIES Works uses a Bag/ritual image from `assets/this-week/`
- LAiDIES World / final bedroom phone scene should keep `assets/lets-chat.png`

Important Ali-review flags:

- The homepage masthead candidate is not approved yet. Ali flagged ghosted/doubled objects, too much dead space, and a composition that still does not meet the LAiDIES Council bar.
- Do not stage the masthead candidate until Ali approves it in context.
- Join the Club image still needs a more polished, on-world asset. The current happy-hour image direction is not yet as strong as the Clubhouse / How LAiDIES Works imagery.
- Do not use fake CSS images or unapproved generated logo/text images.

## Pages Smoke Checked

Checked at mobile width 390px and desktop width 1440px:

- `index.html`
- `games/fairy-godmother.html?from=this-week&issue=3&bag=open&group=fun`
- `hot-goss.html?from=this-week&issue=3&bag=open&group=realworld`
- `learn/quiz.html?from=this-week&issue=3&bag=open#quiz-start`
- `try-on.html?from=this-week&issue=3&bag=open&group=practice`
- `episodes.html`

Results:

- no relevant console errors on checked pages
- no broken images on checked pages
- no horizontal overflow at checked widths
- homepage signup fallbacks visible
- Fairy Godmother form text materially more readable
- Hot Goss return path points to the Book of Receipts / Real World Bag group
- Try-On return path points to Weekly Study Pack
- quiz opens in focused Issue 3 mode from the Bag route

Earlier visual pass also checked homepage and Fairy Godmother at:

- 375px
- 390px
- 430px
- 1280px
- 1440px

## Deferred / Not Fixed In This Pass

- Full Book of Receipts experience is not built. The homepage/menu should keep linking to the strongest existing working surfaces for now, especially Hot Goss, Reference Closet, Who’s Who / Power Map, Glossary, and sources where available.
- Episode 1 and Episode 2 article templates were not migrated to the Episode 3 article format. That should be a separate template migration pass.
- Some older issue/community pages still carry legacy structure or are mixed with unrelated work. Do not stage them wholesale.
- Full 20-page visual QA was not completed in fresh browser screenshots after the latest narrow fixes; the smoke checks covered the highest-risk pages after editing.

## Mixed Files / Staging Caution

The working tree is still very mixed. If this sweep is later staged, use a separate staging plan and do not stage whole files blindly.

Mixed or risky files needing partial staging/review:

- `index.html`
- `script.js`
- `community.html`
- `hot-goss.html`
- `styles.css`
- any file under `operations/prototypes/**`
- broader homepage/site reorganization experiments
- Episode 1/2 migration files
- social preview experiments
- future concept docs
- unclear generated review/prototype files

Do not use `git add .`.

## Proposed Commit Message If A Later Staging Review Approves This Work

```text
Fix site navigation, readability, and signup sweep
```

## Recommended Staging Approach

Before staging anything, run a focused staging review and classify:

- safe whole-file changes
- mixed files requiring partial staging
- files to exclude

Likely whole-file candidates from this sweep if diffs are clean:

- `episodes.html`
- `learn.html`
- `learn/quiz.html`
- `printable.html`
- `try-on.html`
- `clubhouse.html`
- `clubhouse-pass.html`
- `reference-closet.html`
- `games/fun-pack.html`
- `games/dream-phone.html`
- `games/madame-claio.html`
- `games/fairy-godmother.html`
- `games/dj-booth.html`
- `games/trading-cards.html`
- `games/girl-talk.html`
- `operations/review-packets/site-visual-readability-sweep.md`
- `operations/review-packets/email-signup-buttondown-audit.md`

Likely partial-stage candidates:

- `index.html`
- `script.js`
- `community.html`
- `hot-goss.html`

Exclude unless separately approved:

- `styles.css`
- `operations/prototypes/**`
- unapproved masthead/logo/image candidates
- old prototype/rebrand files
- broader architecture docs not part of this sweep
