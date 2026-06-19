# Mobile Header, Context Return, and Episode Terminology QA

Date: 2026-06-19

Scope: Part B2A implementation slice. This pass fixes the urgent mobile header/contextual return-link behavior and performs safe reader-facing terminology cleanup from `Issue` to `Episode`. It does not implement Episode 1/2 template alignment, Dream Phone work, backend/signup work, social production engine work, or prototype work.

## Root Cause

The shared header enhancer treated article pages without a source context as if they came from the Wednesday Bag, so Season/archive readers could land on an Episode and see `Back to the Bag`. On mobile, legacy quick-link rows could also remain present long enough to compete with the logo/menu/header space.

The terminology inconsistency came from a mix of static HTML, generated archive cards, quiz JSON, fallback site data, and article template copy still using public `Issue` labels while routes and code internals legitimately still use `issue`.

## Files Changed

- `content/site/brand-polish.js`
- `content/episode-page.js`
- `content/episode-page.css`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `episodes.html`
- `index.html`
- `start-here.html`
- `learn.html`
- `learn/quiz.html`
- `clubhouse.html`
- `this-week.html`
- `script.js`
- `content/episode-index.json`
- `content/episodes/issue-03.json`
- `content/issues/issue-03.md`
- `content/site/quizzes.json`
- `content/site/site-data.js`
- `operations/review-packets/mobile-header-context-return-qa.md`
- `operations/review-packets/assets/mobile-header-context-return/*.png`

## Return-Link Rules

- `from=this-week` or `from=bag` on Episode pages: `← Back to the Bag`.
- `from=season` on Episode pages: `← Back to the Season`.
- No source on Episode pages: default to `← Back to the Season`, not Bag.
- `from=start-here` on Episode pages: `← Back to Start Here`.
- `from=home` on Episode pages: `← Back to LAiDIES`.
- Bag, quiz, tool, Book of Receipts, Clubhouse, and community group URLs preserve existing `issue`, `draft`, and `group` parameters where those parameters are part of the existing flow.

Examples checked:

- `issues/issue-01.html?from=season&issue=1` -> `← Back to the Season`
- `issues/issue-01.html?from=this-week&issue=1&bag=open` -> `← Back to the Bag`
- `issues/issue-01.html?from=start-here&issue=1` -> `← Back to Start Here`
- `issues/issue-03.html?from=season&issue=3` -> `← Back to the Season`
- `issues/issue-03.html?from=this-week&issue=3&bag=open` -> `← Back to the Bag`
- `issues/issue-03.html?from=home&issue=3` -> `← Back to LAiDIES`

## Mobile Header Behavior

The enhanced mobile header now keeps the top row focused on identity/context plus the Menu button, moves contextual return to its own row, and hides the legacy quick-link row in the enhanced mobile header. The older Episode 1/2 article nav stylesheet also hides the legacy quick links on small screens as a no-script/before-enhancement fallback.

Episode 3 uses its existing preview-ribbon label (`EPISODE 03 · THE BURN BOOK PROBLEM`) in the sticky bar rather than the full logo, but the mobile layout no longer collides and still exposes the Menu button plus the correct contextual return chip.

## Terminology Cleanup

Reader-facing copy changed from `Issue` to `Episode` in:

- Season/archive labels and cards.
- Latest/current Episode CTAs.
- Episode 1/2 hidden titles and masthead alt text.
- Episode 3 ribbon, eyebrow, error state, and activity copy.
- Wednesday Bag lede, selected image alt, and unavailable-object message.
- Quiz page instructions and accessible labels.
- Quiz JSON and fallback site data labels/prompts/explanations/review hints.
- Runtime-generated archive cards and Fun Pack status labels.
- Start Here, Learn, and Clubhouse reader-facing copy.

Intentionally not changed:

- `issues/issue-XX.html` routes.
- `content/issues/issue-XX.md` and `content/episodes/issue-XX.json` filenames.
- `issue=` query params.
- JS variables, CSS classes, storage keys, JSON keys, and data attributes using `issue`.
- Historical/reference text such as `Vogue September Issue`.
- Uses of `issue` that mean a problem/concern rather than an Episode.
- Technical comments unless they rendered to readers.

## Screenshots

Generated with Playwright at mobile width 390:

- `operations/review-packets/assets/mobile-header-context-return/issue01-season-mobile-390.png`
- `operations/review-packets/assets/mobile-header-context-return/issue01-bag-mobile-390.png`
- `operations/review-packets/assets/mobile-header-context-return/issue03-season-mobile-390.png`
- `operations/review-packets/assets/mobile-header-context-return/issue03-bag-mobile-390.png`
- `operations/review-packets/assets/mobile-header-context-return/homepage-mobile-390.png`
- `operations/review-packets/assets/mobile-header-context-return/episodes-mobile-390.png`

## Automated QA Summary

Checked mobile widths: 375, 390, 430.

Pages checked:

- Homepage
- `episodes.html`
- `this-week.html`
- Episode 1 from Season, Bag, and Start Here
- Episode 2 from Season and Bag
- Episode 3 from Season, Bag, and Homepage
- `learn/quiz.html`
- `games/fairy-godmother.html`
- `games/madame-claio.html`
- `games/dream-phone.html`
- `hot-goss.html`
- `reference-closet.html`
- `community.html`
- `clubhouse.html`
- `start-here.html`
- `learn/glossary.html`

Results:

- No horizontal overflow at 375, 390, or 430.
- No console errors during the Playwright pass.
- No return chip overlapped the Menu button.
- Legacy quick-link rows were hidden in enhanced mobile headers.
- Article return labels matched their source context.

## Additional Checks

- `content/site/brand-polish.js` passed Node syntax check.
- `content/episode-page.js` passed Node syntax check.
- `script.js` passed Node syntax check.
- `content/site/site-data.js` passed Node syntax check.
- `content/site/quizzes.json`, `content/episode-index.json`, and `content/episodes/issue-03.json` parsed successfully.

## Limitations

- This was not a full broken-link crawl.
- Episode 1 and Episode 2 still need the later template-alignment phases documented in the B2 audit.
- Episode 3's sticky header remains its reader-template preview ribbon style; it is collision-free but does not show the exact same logo treatment as Episode 1/2.
- Live Dream Phone was opened only for mobile header QA and was not modified.
