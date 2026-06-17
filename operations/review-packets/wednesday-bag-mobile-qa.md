# Wednesday Bag Mobile QA

Date: 2026-06-17

Scope: isolated Wednesday Bag / What's In My Bag ritual structure and mobile usability pass. Episode 3 article, social, email, launch review, and Council files were intentionally avoided.

## Files changed

- `this-week.html`
- `games/fun-pack.html`
- `assets/charms/cell-phone-charm.svg`
- `assets/charms/plaid-photo-charm.svg`
- `operations/review-packets/wednesday-bag-mobile-qa.md`

## Final top-level Bag structure

1. Read — weekly episode. Microcopy: "Start with the episode."
2. Practice — Weekly Study Pack drawer.
3. Quiz — weekly quiz. Microcopy: "Check yourself."
4. Weekly Fun — Weekly Fun Pack page.
5. Connect — Meet & Celebrate drawer.
6. Listen — DJ Booth / weekly anthem.
7. Real World — The Book of Receipts drawer.

The hidden charm remains in the bag photo and uses generic copy: "Find the hidden weekly charm in the photo to unlock your Episode Charm!"

## Drawer contents

Weekly Study Pack:
- Try-On
- Cheat Sheet
- Practice Cards / Trading Cards

Meet & Celebrate:
- Community Card / LAiDIES Room
- Businesswomen's Special / Happy Hour

The Book of Receipts:
- Hot Goss / current AI news
- Glossary / receipts terms
- Reference Closet
- Who's Who

Weekly Fun Pack page:
- Weekly Reading / Madame CLAI-O
- Fairy Godmother Note
- Dream Phone
- Girl Talk

## Mobile usability fixes

- Reduced the open Bag to seven top-level ritual choices instead of showing every feature at once.
- Added the mobile instruction line: "Open this week's bag in order. Read it, try it, check yourself, then go have fun."
- Kept the bag artwork first on mobile so "open the bag" has visual context, then placed the guided ritual cards underneath it.
- Added drawer-style expansion for Practice, Connect, and Real World, each with a visible "Back to Bag" control.
- Moved Send to the Group Chat / Copy Link to the bottom of the Bag action area.
- Added Share / Copy Link controls. Copy Link creates a clean open-bag URL and removes temporary `v=` review params. If clipboard access is blocked, the page shows and selects the URL.
- Disabled non-charm image hotspots on mobile to prevent accidental page openings while users tap around looking for the charm. Desktop artwork/hotspots remain active.
- Enlarged the mobile charm hit areas for Issues 1, 2, and 3 so the weekly charm is easier to find without revealing the object in the copy.
- Updated Episode 1 and Episode 3 reward charm assets so they are closer to the Episode 2 collectible-charm style.

## Testing

Tested in the in-app browser:

- `375px` mobile: no horizontal overflow.
- `390px` mobile: no horizontal overflow.
- `430px` mobile: no horizontal overflow.
- `1280px` desktop: no horizontal overflow.
- Mobile order confirmed: bag artwork first, ritual action cards below.
- Top-level buttons route/update correctly for Issue 03 draft mode.
- Weekly Study Pack drawer opens Try-On, Cheat Sheet, and Trading Cards.
- Meet & Celebrate drawer opens Community and Businesswomen's Special.
- Book of Receipts drawer opens Hot Goss, Glossary, Reference Closet, and Who's Who.
- Weekly Fun Pack no longer duplicates quiz, Try-On, printable, or trading cards.
- Weekly Fun Pack Back to Bag button is visible.
- Weekly charms for Issues 1, 2, and 3 open correctly on `375px`, `390px`, `430px`, and `1280px`.
- Mobile non-charm image taps stay on the Bag page instead of opening a random feature.
- Console: no relevant errors observed.

## Avoided files

- `content/issues/issue-03.md`
- `email/buttondown/issue-03.md`
- `social/episodes/issue-03*`
- `operations/weekly-reviews/issue-03*`
- `operations/agent-council/issue-03*`
- Episode 3 article/social/email/launch content files generally

## Remaining Ali-review flags

- Confirm whether "The Book of Receipts" should stay as the long-term Real World label.
- Confirm whether the Weekly Fun Pack route can remain `games/fun-pack.html` while the ritual card says "Weekly Fun Pack."
- Episode 1 and Episode 3 charm art now works and matches the set better, but Ali flagged that Episode 2 is still the higher visual standard; final charm art can be polished later.
- Copy/share behavior depends on browser permissions; fallback URL display is in place for blocked clipboard contexts.

No staging. No commit.
