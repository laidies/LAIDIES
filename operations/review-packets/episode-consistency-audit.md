# Episode Consistency Audit

Date: 2026-06-19

Scope: Part B audit of reader-facing Episode terminology and Episode 1/2 alignment with the Episode 3 template.

No staging, commit, push, revert, delete, cleanup, prototype work, backend work, signup work, Buttondown work, Supabase work, or Part C implementation was performed.

## Files Inspected

- `episodes.html`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `this-week.html`
- `learn/quiz.html`
- `printable.html`
- `try-on.html`
- `content/site/site-data.js`
- `content/episode-index.json`
- `content/episodes/issue-01.json`
- `content/episodes/issue-02.json`
- `content/episodes/issue-03.json`
- selected community and printable pages surfaced by search

## Terminology Rule

Reader-facing language should use `Episode`, not `Issue`, unless referring to legacy filenames/routes/params internally.

Keep legacy internal paths and query params for now:

- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `content/episodes/issue-XX.json`
- `issue=1`, `issue=2`, `issue=3` query params
- JS variable names using `issue` until a safe data migration exists

## Current Reader-Facing `Issue` Findings

### Highest-priority user-facing spots

- `episodes.html`
  - Hero copy says the Bag turns the current `issue` into a ritual.
  - Hero CTA `Read Latest Episode` points to `issues/issue-02.html`, stale after Episode 3.
  - Progress says `2 of 24 episodes aired`, stale after Episode 3.
  - Episode cards use `Issue #1`, `Issue #2`.
  - Episode 3 is still `Coming soon`.
  - World-next copy says "current issue."

- `issues/issue-01.html`
  - Hidden title: `Issue #1: On Wednesdays We Use AI`.
  - Back link: `Back to Episodes`, not contextual Bag.
  - Template uses older structure without Episode 3 reader kit/side rail/activity section.

- `issues/issue-02.html`
  - Hidden title: `Issue #2: Tell Me What You Want`.
  - `Previously on LAiDIES` references `Issue #1`.
  - Back link: `Back to Episodes`, not contextual Bag.
  - Template uses older structure without Episode 3 reader kit/side rail/activity section.

- `issues/issue-03.html`
  - Eyebrow says `Issue 03`.
  - Error state says `Issue could not load.`
  - Some article/ritual copy uses "article" in a way that may be acceptable, but the primary reader label should be Episode.

- `this-week.html`
  - Some initial static copy says `read the issue`.
  - Internal JS comments use `Issue`, which can remain.

- `learn/quiz.html`
  - Meta description and helper copy say "issue" in reader-facing text.
  - Static quiz buttons are already `Episode 01`, `Episode 02`, `Episode 03`.

- `content/printables/*.html`
  - Printable titles and footers still say `Issue 01 Printable` / `Issue 03 Printable`.
  - Some visible print output says `LAiDIES issue 01 printable`.

- `start-here.html`
  - Some reader copy says "next issue" or "current issue."

### Lower-priority / probably internal

- CSS class names: `.issue-card`, `.issue-meta`, `.object-issue`.
- JS variable names and storage keys.
- File paths and query params.
- Operations docs.
- Production engine docs.
- Social engine docs.

These should remain until a deliberate migration is planned.

## Episode 1/2 Template Differences From Episode 3

### Episode 3 has

- Full editorial masthead and article layout.
- `reader-kit` section.
- `side-rail` reader tools.
- Weekly ritual side card.
- Episode activity section.
- Direct links to Bag, quiz, printable, Try-On, cards, anthem, Extra Credit, Room.
- Stronger mobile responsive structure.
- More polished pearl/plum styling.

### Episode 1 and Episode 2 have

- Older `issue-site-nav`.
- `Back to Episodes` link rather than contextual Bag return.
- Object-world masthead image, but not the same Episode 3 layout.
- No `reader-kit`.
- No `side-rail`.
- No Episode-specific activity section matching Episode 3.
- Older footer/back-home pattern.
- Published article copy embedded directly in the HTML.

## Preserve

- Episode 1 and Episode 2 article copy.
- Episode-specific images/assets.
- Existing URLs.
- Legacy filenames/routes.
- Any source references already in the articles.

## Proposed Episode 1/2 Alignment

For each older Episode:

1. Keep current URL.
2. Keep article copy.
3. Wrap content in the Episode 3 layout structure.
4. Add Episode-specific masthead using existing object-world assets:
   - Episode 1: `assets/brand/laidies-masthead-object-world-issue-01-objects-v1.png`
   - Episode 2: `assets/brand/laidies-masthead-object-world-issue-02-objects-v1.png`
5. Add reader kit summary.
6. Add side rail:
   - Open Episode Bag.
   - Quiz.
   - Cheat Sheet.
   - Try-On.
   - Cards.
   - Anthem.
   - Extra Credit.
   - Room.
7. Add an Episode-specific ritual section matching Episode 3's pattern.
8. Replace visible `Issue` labels with `Episode`.
9. Keep internal query params as `issue`.

## Required Files / Assets

Likely files:

- `issues/issue-01.html`
- `issues/issue-02.html`
- `episodes.html`
- possibly `content/episode-index.json`
- possibly `content/site/site-data.js`
- possibly `content/episodes/issue-01.json`
- possibly `content/episodes/issue-02.json`

Assets:

- `assets/brand/laidies-masthead-object-world-issue-01-objects-v1.png`
- `assets/brand/laidies-masthead-object-world-issue-02-objects-v1.png`
- `assets/ugh-as-if.png`
- `assets/issue-02-hero.png`
- `assets/prompt-cheat-sheet-issue01.pdf`
- `assets/prompt-cheat-sheet-issue02.pdf`
- relevant printable previews under `content/printables/previews/`

## Recommended Safe Terminology Changes

Do in a later focused terminology commit:

- `episodes.html`
  - `Issue #1` -> `Episode 1`
  - `Issue #2` -> `Episode 2`
  - `2 of 24 episodes aired` -> `3 of 24 episodes aired`
  - Latest CTA -> `issues/issue-03.html`
  - Episode 3 card unlocked/published
  - `current issue` -> `current Episode`

- `issues/issue-03.html`
  - `Issue 03` eyebrow -> `Episode 03`
  - `Issue could not load.` -> `Episode could not load.`

- `learn/quiz.html`
  - "Pick any released issue" -> "Pick any released Episode"
  - "Pick an issue above" -> "Pick an Episode above"

- `this-week.html`
  - Static visible `issue` references -> `Episode`.

Do not rename files.

## Risk Level

High.

Why:

- Episode 1/2 alignment touches large article pages.
- `episodes.html` appears stale relative to Episode 3 launch.
- `content/episode-index.json`, `content/site/site-data.js`, and dirty parked data changes overlap with social/production workflows.
- Needs link QA across homepage, Bag, quiz, printable, Try-On, and community routes.

## Recommended Phase

Phase 7, after:

1. Dream Phone.
2. Ask LAiDY.
3. Bag/Clubhouse/Book architecture decisions.

Exception:

A very small terminology-only cleanup could happen earlier if Ali approves exact files and hunks. Do not bundle it with Dream Phone.

## Staging Plan

No staging is recommended now.

If Ali approves only this audit doc later:

```bash
git add operations/review-packets/episode-consistency-audit.md
```

If Ali later approves a terminology-only commit, stage exact files/hunks only after review. Do not stage `content/site/site-data.js` or `episodes.html` whole-file without checking the existing parked diffs.

Do not use `git add .`.

