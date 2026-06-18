# Homepage Layout Strategy QA

Date: 2026-06-17

## Scope

Focused homepage hierarchy, layout, CTA, and image strategy pass only.

Changed files:

- `index.html`
- `operations/review-packets/homepage-layout-strategy-qa.md`

Intentionally avoided:

- `styles.css`
- Episode 3 article/body files
- quiz reward logic
- Wednesday Bag hub pages
- Episode 1/2 migration work
- `operations/prototypes/**`
- broader rebrand/prototype/social preview assets

## Proposed Homepage Plan

The brief asked for this plan before editing. Because the prior run had already begun implementation before the crash, this records the implemented plan for review.

Final homepage section order:

1. Header: LAiDIES logo + menu only.
2. Hero / masthead.
3. Current Wednesday Episode.
4. Pick Your Path.
5. What's Inside LAiDIES / universe map.
6. Inside the LAiDIES World.
7. Subscribe and existing lower-page context.

Final hero copy order:

1. LAiDIES masthead image.
2. `GIRL POWER MEETS MACHINE POWER`
3. `90s/Y2K shaped us. AI is shaping now. LAiDIES is where they meet.`
4. `AI fluency for women with full calendars, high standards, and no patience for beige tech explanations.`
5. Existing anthem line.
6. Primary CTA: `READ LATEST ISSUE`
7. Secondary link: `OPEN THIS WEEK'S BAG`
8. Small new-reader link: `New here? Start from the beginning.`

CTA plan:

- Hero primary goes directly to `issues/issue-03.html`.
- Hero secondary goes to `this-week.html?issue=3&bag=open`.
- Current episode holds practical links: read, Bag, quiz, listen.
- Pick Your Path routes by reader intent instead of repeating every action as equal weight.

## Duplicate CTA Cleanup

Removed or reduced:

- Removed old lower duplicate current-episode card.
- Removed old Join the Club teaser block that repeated community/card/happy-hour CTAs.
- Removed old `View Latest` language from homepage menu/footer and replaced it with `This Week's Bag`.
- Kept `READ LATEST ISSUE` and `OPEN THIS WEEK'S BAG` as distinct routes with clearer hierarchy.

## Current Episode Placement

The Current Wednesday Episode card now appears immediately after the hero, before Pick Your Path.

Current card content:

- `CURRENT WEDNESDAY EPISODE`
- `EPISODE 3: THE BURN BOOK PROBLEM`
- `READ EPISODE 3`
- `OPEN THE WEDNESDAY BAG`
- `TAKE THE QUIZ`
- `LISTEN`

## Original Hero / World Image

Ali-liked world image moved lower into `INSIDE THE LAiDIES WORLD`.

It now acts as atmosphere and world-building rather than competing with the masthead at the top.

## Image Inventory And Usage

Selected images:

- `assets/brand/laidies-logo-masthead-approved-v3.png`
  - Tracked: yes.
  - Section: hero masthead.
  - Why it fits: approved masthead mark; supports premium magazine identity without creating a new logo.
  - Duplicates another homepage image: no.

- `assets/issue-03-hero.png`
  - Tracked: yes.
  - Section: Current Wednesday Episode.
  - Why it fits: specific Episode 3 Burn Book / receipts image; connects directly to the live issue.
  - Duplicates another homepage image: no.

- `assets/hot-goss-desk-v2.png`
  - Tracked: yes.
  - Section: THE BOOK OF RECEIPTS.
  - Why it fits: desk/source/dispatch imagery with LAiDIES objects; better source-of-truth energy than a generic reference drawer.
  - Duplicates another homepage image: no.

- `assets/clubhouse-compact-open-v4.png`
  - Tracked: yes.
  - Section: THE LAiDIES CLUBHOUSE.
  - Why it fits: shows the Clubhouse compact open with Dream Phone, DJ Booth, Girl Talk, and weekly extras.
  - Duplicates another homepage image: no.

- `assets/clubhouse-pass-laidies-card-sample.png`
  - Tracked: yes.
  - Section: JOIN THE CLUB.
  - Why it fits: closer to the LAiDIES Card / Clubhouse Pass direction than the neon PASS asset.
  - Duplicates another homepage image: no.

- `assets/lets-chat.png`
  - Tracked: yes.
  - Section: INSIDE THE LAiDIES WORLD.
  - Why it fits: the original loved world image; works best as lower-page atmosphere.
  - Duplicates another homepage image: no.

Considered but rejected:

- `assets/card-clubhouse-pass-v2.png`
  - Rejected because the neon pass direction felt too generic/game-pass for this homepage pass.

- `assets/reference-closet-interface-v2.png`
  - Rejected for the main Book card because it reads more like the Lore Closet than the broader Book of Receipts.

- `assets/episodes/issue-03/*`
  - Rejected for this homepage pass because those assets are currently untracked and this release should avoid pulling unapproved image folders into the commit.

- CSS-only/fake image panels
  - Not used.

## Book / Clubhouse Destinations

THE BOOK OF RECEIPTS main button:

- `learn.html`

Reason:

- The full interactive Book of Receipts hub is not built yet. `learn.html` is the strongest existing working hub for the related pieces, and the card also exposes direct sublinks to glossary, Who's Who, Reference Closet, Hot Goss, and Evidence Drawer.

THE LAiDIES CLUBHOUSE main button:

- `clubhouse.html`

JOIN THE CLUB main button:

- `community.html`

HOW LAiDIES WORKS main button:

- `start-here.html`

## QA Results

Static checks:

- `index.html` parses with Python HTML parser.
- No `View Latest`, `READ CURRENT EPISODE`, `OPEN REFERENCE CLOSET`, `Business Women`, or `CLAI-O` leftovers found in homepage copy.
- Only expected email placeholder text remains in subscribe forms.

Browser checks:

- Tested mobile widths: 375px, 390px, 430px.
- Tested desktop widths: 1280px, 1440px.
- No horizontal overflow at all tested widths.
- Hero title present: `GIRL POWER MEETS MACHINE POWER`.
- Motto present and lower in hierarchy.
- Current episode appears before Pick Your Path.
- Original world image appears lower than the universe map.
- All selected homepage images loaded as actual image assets.
- Menu opens and closes at all tested widths.
- Hot Goss/current AI news remains reachable from the menu.
- No relevant console errors.

Route checks from homepage:

- `READ LATEST ISSUE` -> `issues/issue-03.html`
- `OPEN THIS WEEK'S BAG` -> `this-week.html?issue=3&bag=open`
- `TAKE THE QUIZ` -> `learn/quiz.html?from=this-week&issue=3#quiz-start`
- `OPEN THE BOOK OF RECEIPTS` -> `learn.html`
- `OPEN THE CLUBHOUSE` -> `clubhouse.html`
- `JOIN THE CLUB` -> `community.html`

## Remaining Ali-Review Flags

- THE BOOK OF RECEIPTS still links to `learn.html` as the best current working hub. This should eventually move to the finished Book of Receipts experience.
- JOIN THE CLUB uses the tracked Clubhouse Pass / LAiDIES Card sample. It is safer than the rejected neon pass, but Ali may eventually want a more editorial membership-card image.
- Lower homepage sections after Subscribe were not redesigned in this focused pass.

## Exact Staging List

If approved and tests remain clean, stage only:

```bash
git add index.html operations/review-packets/homepage-layout-strategy-qa.md
```

Proposed commit message:

```bash
Refine homepage hierarchy and imagery
```

