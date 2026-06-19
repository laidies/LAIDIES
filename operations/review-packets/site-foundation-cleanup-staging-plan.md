# Site Foundation Cleanup Staging Plan

Date: 2026-06-18 local

Purpose: stage only the completed site foundation cleanup while excluding unapproved masthead work, broader homepage experiments, prototype/reorg work, and unrelated dirty files.

No staging, committing, or pushing was performed.

## Safe To Stage Whole-File

These files are clearly tied to shared menu/return-link behavior, FAiRY GODMOTHER readability, footer/old-label cleanup, or QA documentation.

```bash
git add content/site/brand-polish.js
git add script.js
git add issues/issue-03.html
git add receipts.html
git add about.html
git add this-week.html
git add games/fairy-godmother.html
git add games/fun-pack.html
git add learn/quiz.html
git add assets/brand/README.md
git add operations/review-packets/site-foundation-cleanup-qa.md
git add operations/review-packets/header-return-navigation-qa.md
git add operations/review-packets/homepage-masthead-candidates.md
git add operations/review-packets/site-foundation-cleanup-staging-plan.md
```

Safe proof screenshots, if Ali wants QA assets committed:

```bash
git add operations/review-packets/assets/site-foundation-cleanup/390-menu-open-final.png
git add operations/review-packets/assets/site-foundation-cleanup/390-issue03-return.png
git add operations/review-packets/assets/site-foundation-cleanup/390-quiz-return.png
git add operations/review-packets/assets/site-foundation-cleanup/390-extra-credit-no-dupe.png
git add operations/review-packets/assets/site-foundation-cleanup/390-hot-goss-no-dupe.png
git add operations/review-packets/assets/site-foundation-cleanup/390-community-no-dupe.png
git add operations/review-packets/assets/site-foundation-cleanup/390-receipts-return-fixed.png
git add operations/review-packets/assets/site-foundation-cleanup/390-fairy-initial.png
git add operations/review-packets/assets/site-foundation-cleanup/390-fairy-wave.png
git add operations/review-packets/assets/site-foundation-cleanup/390-fairy-surprise.png
git add operations/review-packets/assets/site-foundation-cleanup/375-home-smoke.png
git add operations/review-packets/assets/site-foundation-cleanup/430-home-smoke.png
```

Notes:

- `content/site/brand-polish.js` is the main shared navigation layer.
- `script.js` loads the shared brand-polish layer on pages that already use the main script.
- `issues/issue-03.html`, `receipts.html`, and `learn/quiz.html` only add or opt into the shared navigation script.
- `games/fairy-godmother.html` contains local readability fixes for interaction states.
- `this-week.html`, `games/fun-pack.html`, `learn/quiz.html`, and `about.html` contain old-label cleanup only.
- `assets/brand/README.md` documents the LAiDIES wordmark color rule; it is documentation only, not a new asset.

## Mixed / Needs Partial Staging

These files contain some foundation-safe hunks plus unrelated visual/layout/copy work. Do not stage whole-file.

### `index.html`

Safe hunks:

- Footer/menu label cleanup only, if isolated.

Do not stage:

- homepage masthead implementation
- `assets/brand/laidies-homepage-masthead-bg-candidate-v10.png` references
- hero sizing
- CTA styling
- homepage image/copy experiments
- portal/world visual changes

Recommendation: exclude from the first foundation commit unless partial staging is carefully reviewed.

### `learn.html`

Safe hunks:

- remove old inline back button if the shared header will own return behavior
- footer `Join` -> `Join The Club`
- footer `Lore Closet` -> `THE LORE CLOSET`

Do not stage:

- new hero positioning/copy
- new ritual-link card
- new Evidence Drawer image/card treatment
- broader Learn page hierarchy changes

### `reference-closet.html`

Safe hunks:

- title/label change to `THE LORE CLOSET / Reference Closet`
- footer `Join` -> `Join The Club`
- removal of old inline back button if isolated

Do not stage:

- rewritten intro
- ritual-link card
- `object-frame`
- world-next panel
- broader page layout/copy changes

### `clubhouse.html`

Safe hunks:

- remove old inline back button if isolated
- footer labels `Join The Club` and `THE LORE CLOSET` if isolated
- existing feature-name cleanup, if isolated

Do not stage:

- new page intro
- new hub intro copy
- new world-next panel
- full footer conversion
- broader Clubhouse layout/copy work

### `community.html`

Safe hunks:

- footer `THE LORE CLOSET` label if isolated
- official feature-name casing, if any isolated hunk appears

Do not stage:

- `--wine` variable if bundled with unrelated CSS
- `community-entry-top`
- `community-room-object`
- `community-primary-action`
- room-card visual restyle
- new footer markup
- broader community layout/copy work

### `hot-goss.html`

Safe hunks:

- none recommended for first commit unless manually isolated and reviewed.

Do not stage:

- hero actions
- hero copy rewrite
- ritual-link card
- new footer markup
- broader Hot Goss layout/copy work

### `episodes.html`

Safe hunks:

- remove old inline back button if isolated
- footer `Join The Club` and `THE LORE CLOSET` labels if isolated

Do not stage:

- new page intro
- new hero actions
- new section eyebrow
- world-next panel
- broader archive copy/layout changes

### `start-here.html`

Safe hunks:

- footer `Join The Club`
- footer `THE LORE CLOSET`
- footer `THE EVIDENCE DRAWER`

Do not stage:

- onboarding copy changes
- expanded site map cards
- broader page structure changes

### `learn/glossary.html`

Safe hunks:

- footer `Join The Club`
- footer `THE LORE CLOSET`
- opt-in to shared header/nav if isolated and confirmed

Do not stage:

- local fixed return-link CSS
- new glossary purpose section
- glossary hero copy rewrite
- glossary action buttons
- broader page layout changes

### `games/girl-talk.html`

Safe hunks:

- none for this cleanup.

Do not stage:

- JavaScript variable rename hunks.

## Exclude From This Commit

Explicitly exclude these modified files:

- `content/site/site-data.js`
- `content/site/quizzes.json`
- `content/episode-index.json`
- `content/episodes/issue-01.json`
- `email/buttondown/issue-01.md`
- `email/buttondown/issue-02.md`
- `community/ask-the-room.html`
- `community/burn-book.html`
- `community/chat-room-digest.html`
- `community/comment-card.html`
- `community/dear-laidies.html`
- `community/mix-cd-exchange.html`
- `community/send-it-energy.html`
- `community/try-on-debrief.html`
- `community/weekly-prompts/issue-01.md`
- `community/weekly-prompts/issue-02.md`
- `community/wins.html`
- `operations/README.md`
- `operations/agent-council/issue-03-agent-council-review.md`
- `operations/agents/agent-charters.md`
- `operations/agents/agent-council-operating-system.md`
- `operations/agents/ceo-feedback-quality-standard.md`
- `operations/agents/weekly-agent-council-template.md`
- `operations/weekly-command-center.html`
- `operations/weekly-command-center-files/issue-03-agent-council-review.html`
- `operations/weekly-command-center-files/issue-03-article.html`
- `operations/weekly-command-center-files/issue-03-buttondown.html`
- `operations/weekly-command-center-files/issue-03-community-prompt.html`
- `operations/weekly-command-center-files/issue-03-instagram-kit.html`
- `operations/weekly-command-center-files/issue-03-linkedin.html`
- `operations/weekly-command-center-files/issue-03-production-review.html`
- `operations/weekly-reviews/issue-03-production-review.md`
- `scripts/build-episode-assets.js`
- `social/README.md`
- `social/episodes/issue-01-instagram-kit.md`
- `social/episodes/issue-02-instagram-kit.md`
- `social/visual-preview/index.html`
- `social/visual-preview/styles.css`
- `styles.css`

Explicitly exclude these untracked files/folders:

- `assets/brand/laidies-homepage-masthead-bg-candidate-v10.png`
- `assets/brand/laidies-logo-wordmark-transparent-v1.png`
- `assets/brand/social/laidies-linkedin-company-logo-motto-300-v1.png`
- `assets/brand/social/laidies-linkedin-company-logo-motto-400-v1.png`
- `assets/brand/social/laidies-logo-square-social-pearl-motto-1080-v1.png`
- `assets/brand/social/laidies-logo-square-social-pearl-motto-512-v1.png`
- `assets/brand/social/laidies-logo-square-social-transparent-motto-1080-v1.png`
- `assets/brand/social/laidies-logo-square-social-transparent-motto-512-v1.png`
- `assets/charms/receipt-drawer-charm.svg`
- `assets/episodes/issue-03/`
- `assets/home-book-of-receipts-closet-v1.png`
- `content/printables/previews/issue-03-elle-receipts-pass-contact-sheet.png`
- `docs/product/trust-layer-receipts-coven.md`
- `operations/briefs/`
- `operations/prototypes/`
- `operations/review-packets/assets/bodoni-wordmark-font-contact-sheet.png`
- `operations/review-packets/assets/episode-03-*.png`
- `operations/review-packets/assets/homepage-masthead-*.png`
- `operations/review-packets/assets/laidies-linkedin-banner-1584x396-v1.png`
- `operations/review-packets/assets/laidies-logo-*.png`
- `operations/review-packets/assets/laidies-masthead-*.png`
- `operations/review-packets/assets/laidies-wordmark-editorial-chip-heart-v1.png`
- `operations/review-packets/assets/live-mobile-ux/`
- `operations/review-packets/assets/wearelaidies-*.png`
- `operations/review-packets/episode-03-*.html`
- `operations/review-packets/homepage-masthead-context-notes.md`
- `operations/review-packets/homepage-masthead-council-candidate-v1.html`
- `operations/review-packets/homepage-masthead-council-gate.md`
- `operations/review-packets/laidies-layered-masthead-review*.html`
- `operations/review-packets/laidies-logo-kerning-review-*.png`
- `operations/review-packets/logo-wordmark-color-review*.html`
- `operations/review-packets/masthead-candidate-approval*.html`
- `operations/review-packets/site-polish-review-dashboard.html`
- `operations/socials-engine/`
- `operations/weekly-production-engine/`
- `operations/weekly-reviews/issue-03-launch-social-packet.md`
- `scripts/start-socials-engine.js`
- `scripts/start-weekly-production-engine.js`
- `social/episodes/issue-03-instagram-launch-package.md`
- `social/visual-preview/issue-03-instagram-launch/`

## Masthead Candidate Summary For Ali Review

Do not stage any masthead candidate assets or homepage masthead implementation.

| Candidate | Status | What it is trying to do | Pros | Cons | Recommendation |
| --- | --- | --- | --- | --- | --- |
| `assets/brand/laidies-homepage-masthead-bg-candidate-v10.png` | untracked, 1920x900 | Homepage object-world masthead background. | Correct general idea: LAiDIES objects, blush/pearl world, separate logo possible. | Ali flagged it as washed out, visually doubled/layered, empty under logo, not Vogue/editorial enough. | Reject current version; use only as a "what not to ship yet" reference. |
| `assets/brand/laidies-logo-masthead-approved-v3.png` | tracked, 1380x553 | Approved LAiDIES logo/wordmark for masthead use. | Real logo asset; avoids cropped letters/old neon. | Not a full masthead by itself; needs a better background/composition. | Use as the logo layer after background approval. |
| `assets/brand/laidies-masthead-object-world-issue-01-objects-v1.png` | tracked, 1672x479 | Issue 1 object-world masthead. | Stronger established LAiDIES world direction; coherent object styling. | Issue-specific; not broad enough for homepage alone. | Use as reference/source inspiration. |
| `assets/brand/laidies-masthead-object-world-issue-02-objects-v1.png` | tracked, 1672x479 | Issue 2 object-world masthead. | Stronger established LAiDIES world direction; more aligned with Episodes 1/2 visual bar. | Issue-specific; not broad enough for homepage alone. | Use as reference/source inspiration. |
| `assets/home-book-of-receipts-closet-v1.png` | untracked, 1672x941 | Book of Receipts/reference-world visual. | Useful for Book of Receipts section direction. | Not a homepage masthead; unapproved; too specific. | Hold for later Book of Receipts review. |
| `assets/clubhouse-compact-open-v4.png` | tracked, 1536x1024 | Clubhouse/open compact world. | Strong LAiDIES activity visual; useful worldbuilding object. | Too specific for homepage top masthead. | Use lower on homepage/Clubhouse, not masthead. |
| `assets/this-week/wednesday-it-bag-open.jpg` | tracked, 1448x1086 | Weekly Bag ritual image. | Strong current ritual image; familiar user flow. | Weekly-specific, not broad homepage identity. | Use for This Week/Bag, not masthead. |
| `operations/review-packets/assets/homepage-masthead-council-candidate-v1-desktop.png` and mobile pair | untracked | In-context homepage masthead preview. | Useful for Ali review because it shows the masthead in page context. | Not an approved asset; inherits visual issues from the current candidate. | Keep as review evidence only; do not publish. |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v1.png` through `v10.png` | untracked | Generated masthead/wordmark candidate set. | Useful exploration range. | Not reviewed/approved; inconsistent quality; several have logo/detail problems. | Do not stage. Review only if Ali asks to compare candidates. |
| `operations/review-packets/assets/laidies-masthead-object-world-v1.png` through `v4.png` and `laidies-masthead-object-flatlay-v1.png` | untracked | Object-world/flatlay explorations. | Useful ingredients for future direction. | Not approved; may be too crowded or inconsistent. | Use as source material for a new candidate, not as-is. |

Best recommendation: generate or compose a new homepage-specific masthead using the tracked Issue 1/2 object-world assets and activity assets as references, with the approved wordmark layered separately in HTML. Do not use the current candidate in production.

## QA Caveat

Checks actually performed:

- `git status --short`
- review docs read
- relevant diffs inspected
- masthead candidate status/dimensions inspected with `git ls-files` and `sips`
- local server responded at `http://localhost:8765/index.html`
- `content/site/brand-polish.js` syntax check passed using bundled Node
- existing proof screenshots from the foundation pass confirmed on disk

Checks not freshly performed:

- fresh Playwright/headless visual screenshots
- fresh console check in headless browser
- fresh mobile no-overflow check in headless browser

Reason: Playwright is available as a package, but the browser binary is missing in this environment. Do not claim full fresh visual QA passed until Ali or Codex reruns browser QA in an environment with a usable browser.

## Recommended Next Action

Recommendation: split into smaller commits.

1. Commit safe foundation cleanup only, after Ali accepts the QA caveat.
2. Separately partial-stage old-label/footer cleanup from mixed files, if desired.
3. Keep masthead completely separate until Ali reviews/approves a candidate.

Suggested commit message for the first safe commit:

```text
Fix site foundation navigation and readability
```
