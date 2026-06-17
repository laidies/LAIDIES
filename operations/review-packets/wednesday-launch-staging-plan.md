# Wednesday Launch Staging Plan

Date: 2026-06-17

Scope: Episode 03 launch plus Wednesday Bag ritual/mobile fixes. Do not stage, commit, or push until the blockers below are resolved.

## Current Safety Summary

- Working tree is dirty across launch content, Bag flow, community/site pages, operations docs, generated assets, brand/social preview files, and prototype/rebrand work.
- Do not use `git add .`.
- Use two commits, one push:
  - Commit 1: Episode 03 launch content/assets.
  - Commit 2: Wednesday Bag ritual/mobile fixes.
- Launch blocker: `issues/issue-03.html` is still the public "Issue 03 is not live yet" gate.
- Launch blocker: `content/episodes/issue-03.json` and `content/episode-index.json` still mark Episode 03 as `draft`.
- Launch caution: `content/issues/issue-03.md` still includes internal production notes/status language, so confirm it is not rendered directly or clean it before launch.
- Mixed-file caution: `styles.css` contains a small community Back to Bag return style plus a much larger LAiDIES world architecture styling pass. Do not stage `styles.css` wholesale for this launch.

## A. Commit 1 - Episode 03 Launch

Recommended files once the public gate/status blockers are fixed:

```text
content/issues/issue-03.md
issues/issue-03.html
content/episodes/issue-03.json
content/episode-index.json
email/buttondown/issue-03.md
social/episodes/issue-03-instagram-kit.md
social/episodes/issue-03-linkedin.md
community/weekly-prompts/issue-03.md
content/site/quizzes.json
content/site/card-packs.json
script.js
learn/quiz.html
try-on.html
printable.html
games/dj-booth.html
games/trading-cards.html
content/site/mini-player.js
assets/issue-03-hero.png
assets/issue-03-section-burn-book.png
assets/issue-03-section-receipts-pass.png
assets/issue-03-section-try-on.png
assets/issue-03-section-wrong-room.png
assets/issue-03-social-square.png
assets/prompt-cheat-sheet-issue03.pdf
content/music/dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3
content/printables/issue-03-elle-woods-receipts-pass.html
content/printables/previews/issue-03-elle-receipts-pass-page-1.png
content/printables/previews/issue-03-elle-receipts-pass-page-2.png
content/printables/previews/issue-03-elle-receipts-pass-page-3.png
content/printables/previews/issue-03-elle-receipts-pass-page-4.png
```

Notes:

- `script.js` and `learn/quiz.html` are included because the Episode 03 quiz/back behavior depends on them.
- `try-on.html`, `printable.html`, `games/dj-booth.html`, and `games/trading-cards.html` are included because Episode 03 launch routes use them.
- `content/site/mini-player.js` is included because it adds the Episode 03 song to the shared player.
- `content/site/site-data.js` is not recommended for the main launch command unless Ali confirms its changes are needed. The current diff is mostly Issue 01/02 metadata/link cleanup, not Episode 03 launch data.
- `content/episode-index.json` and `content/site/quizzes.json` include small non-Episode 03 cleanups. They are still likely needed for discovery/quiz launch, but review before staging.

Exact add command for Commit 1, after blockers are fixed:

```bash
git add \
  content/issues/issue-03.md \
  issues/issue-03.html \
  content/episodes/issue-03.json \
  content/episode-index.json \
  email/buttondown/issue-03.md \
  social/episodes/issue-03-instagram-kit.md \
  social/episodes/issue-03-linkedin.md \
  community/weekly-prompts/issue-03.md \
  content/site/quizzes.json \
  content/site/card-packs.json \
  script.js \
  learn/quiz.html \
  try-on.html \
  printable.html \
  games/dj-booth.html \
  games/trading-cards.html \
  content/site/mini-player.js \
  assets/issue-03-hero.png \
  assets/issue-03-section-burn-book.png \
  assets/issue-03-section-receipts-pass.png \
  assets/issue-03-section-try-on.png \
  assets/issue-03-section-wrong-room.png \
  assets/issue-03-social-square.png \
  assets/prompt-cheat-sheet-issue03.pdf \
  content/music/dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3 \
  content/printables/issue-03-elle-woods-receipts-pass.html \
  content/printables/previews/issue-03-elle-receipts-pass-page-1.png \
  content/printables/previews/issue-03-elle-receipts-pass-page-2.png \
  content/printables/previews/issue-03-elle-receipts-pass-page-3.png \
  content/printables/previews/issue-03-elle-receipts-pass-page-4.png
```

Proposed commit message:

```text
Launch Episode 03
```

## B. Commit 2 - Wednesday Bag / What's In My Bag Fixes

Recommended safe core files:

```text
this-week.html
games/fun-pack.html
assets/charms/cell-phone-charm.svg
assets/charms/plaid-photo-charm.svg
operations/review-packets/wednesday-bag-mobile-qa.md
operations/review-packets/wednesday-launch-staging-plan.md
```

Recommended if the Connect route/back behavior is part of the launch:

```text
community.html
community/ask-the-room.html
community/burn-book.html
community/chat-room-digest.html
community/comment-card.html
community/dear-laidies.html
community/laidy-spotlight.html
community/mix-cd-exchange.html
community/send-it-energy.html
community/try-on-debrief.html
community/wins.html
content/site/community-room.js
```

Notes:

- `this-week.html` contains the corrected ritual structure and mobile Bag behavior.
- `games/fun-pack.html` contains the Weekly Fun Pack grouping.
- The charm files support the hidden weekly charm behavior.
- `community.html` and community subpages are useful if launch needs Back to Bag from the Connect/Room path, but they include some community page polish. Review before staging.
- Do not stage `styles.css` wholesale. If a community return style is essential, use patch staging and accept only the `.community-thread .wednesday-return` / `.community-local-comments-note` hunk, not the LAiDIES world architecture pass.

Exact add command for the safe core Commit 2:

```bash
git add \
  this-week.html \
  games/fun-pack.html \
  assets/charms/cell-phone-charm.svg \
  assets/charms/plaid-photo-charm.svg \
  operations/review-packets/wednesday-bag-mobile-qa.md \
  operations/review-packets/wednesday-launch-staging-plan.md
```

Optional add command if Connect/Room return behavior is included in Commit 2:

```bash
git add \
  community.html \
  community/ask-the-room.html \
  community/burn-book.html \
  community/chat-room-digest.html \
  community/comment-card.html \
  community/dear-laidies.html \
  community/laidy-spotlight.html \
  community/mix-cd-exchange.html \
  community/send-it-energy.html \
  community/try-on-debrief.html \
  community/wins.html \
  content/site/community-room.js
```

Optional patch-stage command for the mixed CSS file:

```bash
git add -p styles.css
```

Only accept the first community Back to Bag/local comments hunk. Do not accept the later `LAiDIES world architecture pass` hunk for this launch.

Proposed commit message:

```text
Fix Wednesday Bag ritual flow and mobile return paths
```

## C. Operations / Review Docs

Useful release docs if Ali wants repo traceability:

```text
operations/review-packets/wednesday-bag-mobile-qa.md
operations/review-packets/wednesday-launch-staging-plan.md
operations/weekly-reviews/issue-03-production-review.md
operations/weekly-reviews/issue-03-launch-social-packet.md
operations/agent-council/issue-03-agent-council-review.md
```

Recommendation:

- Include `wednesday-bag-mobile-qa.md` and this staging plan in Commit 2.
- Include the Issue 03 production/social/council docs only if they are useful as release records. They are not required for the public site to work.

Optional docs add command:

```bash
git add \
  operations/weekly-reviews/issue-03-production-review.md \
  operations/weekly-reviews/issue-03-launch-social-packet.md \
  operations/agent-council/issue-03-agent-council-review.md
```

## D. Exclude From This Launch

Do not include these in the Wednesday launch:

```text
assets/brand/README.md
assets/brand/laidies-logo-wordmark-transparent-v1.png
assets/brand/social/laidies-linkedin-company-logo-motto-300-v1.png
assets/brand/social/laidies-linkedin-company-logo-motto-400-v1.png
assets/brand/social/laidies-logo-square-social-pearl-motto-1080-v1.png
assets/brand/social/laidies-logo-square-social-pearl-motto-512-v1.png
assets/brand/social/laidies-logo-square-social-transparent-motto-1080-v1.png
assets/brand/social/laidies-logo-square-social-transparent-motto-512-v1.png
assets/charms/receipt-drawer-charm.svg
assets/episodes/issue-03/**
content/printables/previews/issue-03-elle-receipts-pass-contact-sheet.png
docs/product/trust-layer-receipts-coven.md
email/buttondown/issue-01.md
email/buttondown/issue-02.md
social/episodes/issue-01-instagram-kit.md
social/episodes/issue-02-instagram-kit.md
social/visual-preview/index.html
social/visual-preview/styles.css
operations/briefs/**
operations/prototypes/**
operations/review-packets/assets/**
operations/review-packets/episode-03-editorial-rebrand-prototype.html
operations/review-packets/episode-03-editorial-rebrand-prototype 2.html
operations/review-packets/episode-03-reader-preview.html
operations/review-packets/episode-03-review.html
operations/review-packets/episode-03-review 2.html
operations/review-packets/laidies-layered-masthead-review.html
operations/review-packets/laidies-layered-masthead-review 2.html
operations/review-packets/laidies-logo-kerning-review-v5.png
operations/review-packets/laidies-logo-kerning-review-v5 2.png
operations/review-packets/laidies-logo-kerning-review-v6.png
operations/review-packets/laidies-logo-kerning-review-v6 2.png
operations/review-packets/logo-wordmark-color-review.html
operations/review-packets/logo-wordmark-color-review 2.html
operations/review-packets/masthead-candidate-approval.html
operations/review-packets/masthead-candidate-approval 2.html
operations/review-packets/site-polish-review-dashboard.html
operations/agents/agent-charters.md
operations/agents/agent-council-operating-system.md
operations/agents/ceo-feedback-quality-standard.md
operations/agents/weekly-agent-council-template.md
operations/weekly-command-center.html
operations/weekly-command-center-files/**
scripts/build-episode-assets.js
styles.css
```

Also exclude unless Ali deliberately chooses to include broader destination-page polish:

```text
clubhouse.html
episodes.html
games/girl-talk.html
hot-goss.html
index.html
learn.html
learn/glossary.html
reference-closet.html
start-here.html
content/episodes/issue-01.json
community/weekly-prompts/issue-01.md
community/weekly-prompts/issue-02.md
content/site/site-data.js
```

## Uncertain / Ali Decision Needed

These are not safe for automatic staging:

- `styles.css`: mixed Bag/community return styling plus broader world architecture styling.
- `content/site/site-data.js`: not needed for the current Episode 03 smoke path; contains Issue 01/02 metadata/link cleanup.
- `hot-goss.html`, `learn/glossary.html`, `reference-closet.html`, `learn.html`, `clubhouse.html`, `episodes.html`, `start-here.html`, `index.html`: may improve the broader site journey, but they are beyond the strict Episode 03 plus Bag launch.
- `community.html` and `community/*.html`: include useful Connect/Room Back to Bag behavior, but also some community page polish. Include if the Connect path is part of the launch QA standard.

## Validation Results

JSON validation passed:

```text
OK content/episode-index.json
OK content/episodes/issue-01.json
OK content/episodes/issue-03.json
OK content/site/card-packs.json
OK content/site/quizzes.json
```

Required assets exist:

```text
OK assets/issue-03-hero.png
OK assets/issue-03-section-burn-book.png
OK assets/issue-03-section-receipts-pass.png
OK assets/issue-03-section-try-on.png
OK assets/issue-03-section-wrong-room.png
OK assets/issue-03-social-square.png
OK assets/prompt-cheat-sheet-issue03.pdf
OK content/music/dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3
OK content/printables/issue-03-elle-woods-receipts-pass.html
OK content/printables/previews/issue-03-elle-receipts-pass-page-1.png
OK content/printables/previews/issue-03-elle-receipts-pass-page-2.png
OK content/printables/previews/issue-03-elle-receipts-pass-page-3.png
OK content/printables/previews/issue-03-elle-receipts-pass-page-4.png
OK assets/charms/cell-phone-charm.svg
OK assets/charms/plaid-photo-charm.svg
```

Browser smoke checks:

```text
Mobile 390px:
- this-week.html?issue=3&bag=open&draft=1: pass, no horizontal overflow, no missing images, no console errors.
- issues/issue-03.html: route loads, but it is still gated as "Issue 03 is not live yet."
- learn/quiz.html?from=this-week&issue=3&draft=1: pass, Back to Bag visible, no horizontal overflow, no console errors.
- try-on.html?from=this-week&issue=3&bag=open&draft=1: pass, Back to Bag visible, no horizontal overflow, no console errors.
- printable.html?from=this-week&issue=3&bag=open&draft=1: pass, Back to Bag visible, no horizontal overflow, no console errors.
- games/dj-booth.html?from=this-week&issue=3&bag=open&draft=1: pass, Episode 03 song text visible, Back to Bag visible, no horizontal overflow, no console errors.
- community.html?from=this-week&issue=3&bag=open&draft=1: pass, Back to Bag visible, no horizontal overflow, no console errors.

Desktop:
- this-week.html?issue=3&bag=open&draft=1: pass, no horizontal overflow, no missing images, no console errors.
- issues/issue-03.html: route loads, but it is still gated as "Issue 03 is not live yet."
```

## Launch Blockers

Resolve before running the Commit 1 add command:

1. Replace or publish `issues/issue-03.html`; it currently displays "Issue 03 is not live yet."
2. Update Episode 03 status from `draft` to public/published wherever the launch code expects it:
   - `content/episodes/issue-03.json`
   - `content/episode-index.json`
3. Confirm `content/issues/issue-03.md` is either:
   - not rendered directly to readers, or
   - cleaned of internal production notes/status language before launch.

## Final Pre-Commit Checklist

Before staging:

```bash
git status --short
```

After staging Commit 1:

```bash
git diff --cached --name-only
```

Confirm only Episode 03 launch files are staged, then commit:

```bash
git commit -m "Launch Episode 03"
```

After staging Commit 2:

```bash
git diff --cached --name-only
```

Confirm only Bag/fun/community-return files are staged, then commit:

```bash
git commit -m "Fix Wednesday Bag ritual flow and mobile return paths"
```

Then do one push after both commits:

```bash
git push
```

This report was created without staging, committing, or pushing.
