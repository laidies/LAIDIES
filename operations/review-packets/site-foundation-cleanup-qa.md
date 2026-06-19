# LAiDIES Site Foundation Cleanup QA

Date: 2026-06-18 local

Scope: header return links, unified hamburger menu, FAiRY GODMOTHER interaction readability, visible typography/label cleanup, footer architecture labels, and homepage masthead decision.

No staging, committing, or pushing was performed.

## Summary

The foundation cleanup is implemented as an unstaged working-tree pass, but it should not be committed wholesale because the repository still contains mixed prior homepage, masthead, community, social, prototype, and reorg work.

Launch-safe pieces from this pass:

- Shared contextual header return links.
- Shared hamburger menu structure.
- Duplicate local back-link suppression when the shared header is present.
- FAiRY GODMOTHER interaction-state readability fixes.
- Footer/nav label cleanups in selected pages.
- Evidence Drawer/Receipts page opt-in to the shared navigation script.
- Masthead inventory and "do not ship yet" decision.

## Changed Files From This Pass

Likely foundation-cleanup files:

- `content/site/brand-polish.js`
- `receipts.html`
- `about.html`
- `games/fairy-godmother.html`
- `operations/review-packets/site-foundation-cleanup-qa.md`
- `operations/review-packets/header-return-navigation-qa.md`
- `operations/review-packets/homepage-masthead-candidates.md`
- `operations/review-packets/assets/site-foundation-cleanup/*.png`

Mixed files touched or already dirty during the broader worktree:

- `index.html`
- `learn.html`
- `reference-closet.html`
- `clubhouse.html`
- `community.html`
- `hot-goss.html`
- `episodes.html`
- `this-week.html`
- `games/fun-pack.html`
- `learn/quiz.html`

These mixed files need partial staging/review before any commit.

## Header Return Links

The shared navigation layer now injects a visible contextual return link into supported non-homepage headers. It preserves:

- `issue`
- `draft=1`
- `group=practice`
- `group=fun`
- `group=realworld`
- `group=connect`

Return behavior implemented:

| Page/context | Return label | Return target |
| --- | --- | --- |
| Article pages | `← Back to the Bag` | `this-week.html?issue={n}&bag=open` plus draft context |
| Weekly Study Pack children | `← Back to Weekly Study Pack` | `this-week.html?issue={n}&bag=open&group=practice` plus draft context |
| THE EXTRA CREDIT parent | `← Back to the Bag` | `this-week.html?issue={n}&bag=open&group=fun` plus draft context |
| THE EXTRA CREDIT child pages | `← Back to THE EXTRA CREDIT` | `this-week.html?issue={n}&bag=open&group=fun` plus draft context |
| Book/Real World pages | `← Back to the Book of Receipts` | `this-week.html?issue={n}&bag=open&group=realworld` plus draft context |
| Meet & Celebrate/community pages | `← Back to Meet & Celebrate` | `this-week.html?issue={n}&bag=open&group=connect` plus draft context |
| Clubhouse pages without weekly context | `← Back to the Clubhouse` | `clubhouse.html` |
| Start/orientation pages | contextual start/home return | `start-here.html` or `index.html` |

Duplicate local return links are hidden when the shared header is present so pages do not show two competing "Back to Bag" actions.

## Hamburger Menu

Unified menu groups:

- CURRENT
- START HERE
- THE BOOK OF RECEIPTS
- THE LAiDIES CLUBHOUSE
- JOIN THE CLUB

Key fixes:

- Removed stale homepage-only menu panel behavior.
- Replaced page-specific hamburger event listeners with the shared menu behavior.
- Fixed the smashed `HowLAiDIESWorks` issue.
- Preserved brand casing for `LAiDIES`, `SLAiYER`, `FAiRY`, and `CLAi-O`.
- Added Hot Goss as a direct menu path under THE BOOK OF RECEIPTS.
- Added Evidence Drawer/Receipts as a working menu path.

## FAiRY GODMOTHER Readability

Checked and fixed:

- Initial form back/header readability.
- Textarea placeholder contrast.
- Dropdown option contrast.
- Prompt Check result card contrast.
- Past Wisdom card contrast.
- Saved/random wisdom card contrast.

The prompt feedback and history cards now use light readable cards with dark plum body text instead of pale text on a dark/low-contrast background.

## Typography / Label Cleanup

Applied visible architecture label cleanup where it was safe:

- `The Room` footer label -> `Join The Club`
- `Reference Closet` footer label -> `THE LORE CLOSET`
- `Join` footer label -> `Join The Club`
- Menu/header labels use the newer architecture names while preserving older names as explanatory sublabels only where useful.

Remaining old-label appearances intentionally not changed in this pass:

- Episode 1/2 article body sections that say "The Receipts."
- Operations/review/prototype documents.
- Internal script badge/source labels that are not footer/nav architecture.
- `receipts.html` content title, because the full Book of Receipts/Evidence Drawer product decision is not built yet.

## Masthead Decision

No homepage masthead implementation is approved in this cleanup.

The current candidate direction remains excluded because Ali flagged it as washed out, visually doubled/layered, not editorial enough, and not yet LAiDIES Council approved.

See `operations/review-packets/homepage-masthead-candidates.md`.

## QA Proof

Fresh browser automation was attempted with Playwright, but the local Playwright browser binary is not installed in this environment. The JavaScript syntax check passed using the bundled Node runtime, and the earlier live-browser screenshots from this pass remain on disk.

Proof screenshot paths:

- `operations/review-packets/assets/site-foundation-cleanup/390-menu-open-final.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-issue03-return.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-quiz-return.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-extra-credit-no-dupe.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-hot-goss-no-dupe.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-community-no-dupe.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-receipts-return-fixed.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-fairy-wave.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-fairy-surprise.png`
- `operations/review-packets/assets/site-foundation-cleanup/375-home-smoke.png`
- `operations/review-packets/assets/site-foundation-cleanup/430-home-smoke.png`

Checks recorded:

- Local server responded at `http://localhost:8765/index.html`.
- `content/site/brand-polish.js` syntax check passed.
- Mobile screenshots exist at 375px, 390px, and 430px.
- Menu screenshots show unified menu structure.
- Return screenshots show visible header return links without opening the menu.
- No horizontal overflow was recorded in the browser pass that produced the screenshots.

## Staging Guidance

Do not stage this cleanup as one broad commit.

Safe to stage whole-file after Ali approval:

- `content/site/brand-polish.js`
- `about.html`
- `receipts.html`
- `games/fairy-godmother.html`
- `operations/review-packets/site-foundation-cleanup-qa.md`
- `operations/review-packets/header-return-navigation-qa.md`
- `operations/review-packets/homepage-masthead-candidates.md`
- selected screenshot assets in `operations/review-packets/assets/site-foundation-cleanup/`

Needs partial staging or careful review:

- `index.html`
- `learn.html`
- `reference-closet.html`
- `clubhouse.html`
- `community.html`
- `hot-goss.html`
- `episodes.html`
- `this-week.html`
- `games/fun-pack.html`
- `learn/quiz.html`

Exclude:

- `styles.css`
- `operations/prototypes/**`
- unapproved homepage masthead/image assets
- unapproved homepage hero/copy/image changes
- Episode 1/2 template migration work
- broader reorg files
- social preview/brand assets not directly part of this foundation cleanup

## Remaining Ali Review Flags

- Homepage masthead needs a new approved visual direction before implementation.
- `receipts.html` naming should be revisited when the full Book of Receipts/Evidence Drawer concept is actually built.
- Mixed homepage/community/hot-goss files need a separate staging plan before any commit.
