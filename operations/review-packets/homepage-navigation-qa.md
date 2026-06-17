# Homepage Navigation QA

Date: 2026-06-17

Scope: Homepage navigation clarity pass only. No staging, no commit.

## Files Changed

- `index.html`
- `operations/review-packets/homepage-navigation-qa.md`

## Homepage Structure Updated

1. Hero
   - Primary CTA: `VIEW LATEST`
   - Secondary CTA: `START FROM THE BEGINNING`
   - Tertiary CTA: `READ THE SEASON`

2. Where To Start
   - `VIEW LATEST` -> `this-week.html?issue=3&bag=open`
   - `START FROM THE BEGINNING` -> `this-week.html?issue=1&bag=open`
   - `READ THE SEASON` -> `episodes.html`

3. What's Inside LAiDIES
   - `THE BOOK OF RECEIPTS`
   - `THE LAiDIES CLUBHOUSE`
   - `JOIN THE CLUB`
   - `HOW LAiDIES WORKS`

4. Current Episode
   - Episode 3 feature remains below the orientation and universe map.
   - Bag route remains `this-week.html?issue=3&bag=open`.
   - Article route remains `issues/issue-03.html`.
   - Quiz route points to `learn/quiz.html?from=this-week&issue=3&draft=1#quiz-start`.

5. Community / Club Teaser
   - Points to Community, LAiDIES Card, and Business Women's Special.

6. Dropdown Site Menu
   - Added a grouped fast-navigation panel behind the homepage menu button.
   - Works on mobile and desktop.
   - Hot Goss / Today's AI Dispatch is a direct menu link.

## Header Navigation Cleanup

Before: the homepage header showed a visible mini-nav row with `View Latest`, `Start`, `Season`, `Book`, `Clubhouse`, `Join`, and `Sign In`.

After: the homepage header is logo + Menu only on mobile and desktop. The dropdown is now the primary fast-navigation layer, so the header does not compete with the homepage map.

Removed from the visible header:

- `View Latest`
- `Start`
- `Season`
- `Book`
- `Clubhouse`
- `Join`
- `Sign In`

These destinations are still reachable through the grouped dropdown where they have clearer context.

## Footer Link Cleanup

Before: `Instagram`, `Start Here`, `The Room`, `Reference Closet`, `The Receipts`, `Privacy`, `Terms`.

After: `Instagram`, `View Latest`, `Read The Season`, `Hot Goss`, `Reference Closet`, `Join The Club`, `Privacy`, `Terms`.

Changed/removed old labels:

- `Start Here` replaced with clearer current/season paths.
- `The Room` replaced with `Join The Club`.
- `The Receipts` removed from the footer; `Sources / Evidence Drawer` remains in the dropdown under `THE BOOK OF RECEIPTS`.

## Category Map

### THE BOOK OF RECEIPTS

Status: planned knowledge/reference hub. The homepage frames it as the reference world coming together and points users to live pieces instead of pretending the full Book experience exists.

Main link: `reference-closet.html`

- `HOT GOSS` -> `hot-goss.html`
- `REFERENCE CLOSET` -> `reference-closet.html`
- `THE POWER MAP` -> `learn.html#who-is-who`
- `SLAiYER HANDBOOK` -> `learn/glossary.html`

### THE LAiDIES CLUBHOUSE

Main link: `clubhouse.html`

- `DREAM PHONE` -> `games/dream-phone.html`
- `MADAME CLAI-O` -> `games/madame-claio.html`
- `FAIRY GODMOTHER` -> `games/fairy-godmother.html`
- `GIRL TALK` -> `games/girl-talk.html`
- `DJ BOOTH` -> `games/dj-booth.html`
- `WEEKLY FUN PACK` -> `games/fun-pack.html`

### JOIN THE CLUB

Main link: `community.html`

- `LAiDIES CARD` -> `laidies-card.html`
- `CLUBHOUSE PASS` -> `clubhouse-pass.html`
- `THE ROOMS` -> `community.html#chat-rooms`
- `BUSINESS WOMEN'S SPECIAL` -> `games/businesswomens-special.html`

### HOW LAiDIES WORKS

Main link: `start-here.html`

- `NEW READER PATH` -> `start-here.html`
- `WEDNESDAY BAG` -> `this-week.html?issue=3&bag=open`
- `SEASON MAP` -> `episodes.html`
- `SAVE PROGRESS` -> `clubhouse-pass.html`

## Dropdown Site Menu

### CURRENT

- `View Latest / This Week's Bag` -> `this-week.html?issue=3&bag=open`
- `Read Current Episode` -> `issues/issue-03.html`
- `Take Current Quiz` -> `learn/quiz.html?from=this-week&issue=3&draft=1#quiz-start`
- `Practice / Try-On` -> `try-on.html?from=this-week&issue=3&bag=open`
- `Listen to Weekly Anthem` -> `games/dj-booth.html?from=this-week&issue=3&bag=open#djApp`

### START HERE

- `Start From The Beginning` -> `this-week.html?issue=1&bag=open`
- `Read The Season` -> `episodes.html`
- `How LAiDIES Works` -> `start-here.html`

### THE BOOK OF RECEIPTS

- `Today's AI Dispatch / Hot Goss` -> `hot-goss.html`
- `Reference Closet / Lore Closet` -> `reference-closet.html`
- `Who's Who / Power Map` -> `learn.html#who-is-who`
- `Glossary / SLAiYER Handbook` -> `learn/glossary.html`
- `Sources / Evidence Drawer` -> `receipts.html`

### THE LAiDIES CLUBHOUSE

- `Dream Phone` -> `games/dream-phone.html`
- `Madame CLAI-O` -> `games/madame-claio.html`
- `Fairy Godmother` -> `games/fairy-godmother.html`
- `Girl Talk` -> `games/girl-talk.html`
- `DJ Booth` -> `games/dj-booth.html`
- `Weekly Fun Pack` -> `games/fun-pack.html`

### JOIN THE CLUB

- `Get a LAiDIES Card / Clubhouse Pass` -> `clubhouse-pass.html`
- `Community / LAiDIES Room` -> `community.html`
- `Business Women's Special / Happy Hour` -> `games/businesswomens-special.html`

## QA Results

- Local link and asset check for `index.html`: passed.
- Local route checks returned `200` for the key homepage destinations.
- Browser smoke check: `VIEW LATEST` in the hero opens `http://localhost:8765/this-week.html?issue=3&bag=open`.
- Header cleanup smoke check: visible homepage header is logo + menu only at tested widths.
- Footer cleanup smoke check: visible footer links are `Instagram`, `View Latest`, `Read The Season`, `Hot Goss`, `Reference Closet`, `Join The Club`, `Privacy`, `Terms`.
- Dropdown menu opens and closes at tested mobile and desktop widths.
- Dropdown close button is visible and usable.
- Escape closes the dropdown and returns focus to the menu button.
- Hot Goss route from the dropdown opens `http://localhost:8765/hot-goss.html`.
- Mobile widths checked: 375px, 390px, 430px.
- Desktop widths checked: 1280px, 1440px.
- Horizontal overflow: none found at tested widths.
- Console errors: none found during homepage smoke checks.

## Deferred / Not Changed

- Did not touch Episode 3 article, social, email, Buttondown, or launch copy.
- Did not edit `styles.css`; it remains excluded because it already contains broader world architecture work.
- Did not create a full Book of Receipts experience or link to an unfinished hub. The homepage uses live related destinations for now.
- Did not add unfinished menu destinations. Planned concepts route to live existing pages or are omitted.
- Did not touch `operations/prototypes/**`.
- Did not stage or commit.

## Remaining Ali Review Flags

- Confirm whether the full `THE BOOK OF RECEIPTS` hub should become its own page when the interactive experience is ready.
- Confirm whether the temporary main link should stay `reference-closet.html` or move to `hot-goss.html` while the full hub is being built.
- No shared header partial was found in this static site pass. Other pages carry repeated static headers, so site-wide header consistency should be handled separately if Ali wants the same dropdown everywhere.
