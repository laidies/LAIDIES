# Header Return Navigation QA

Date: 2026-06-18

Purpose: restore a visible contextual return path so readers do not have to open the hamburger menu just to go back.

## Return Link Behavior

The shared navigation layer now injects a visible return link into supported non-homepage headers. It preserves:

- `issue`
- `draft=1`
- `group=practice`
- `group=fun`
- `group=realworld`
- `group=connect`

## Checked Return Matrix

Mobile widths checked: 375px, 390px, 430px.

| Page/state | Visible return text | Target |
| --- | --- | --- |
| Issue 03 article | `Back to the Bag` | `this-week.html?issue=3&bag=open` plus `draft=1` when present |
| Wednesday Bag | `Back to LAiDIES` | `index.html` |
| Quiz | `Back to Weekly Study Pack` | `this-week.html?issue=3&bag=open&group=practice` plus `draft=1` when present |
| Try-On | `Back to Weekly Study Pack` | `this-week.html?issue=3&bag=open&group=practice` plus `draft=1` when present |
| THE EXTRA CREDIT parent | `Back to the Bag` | `this-week.html?issue=3&bag=open&group=fun` plus `draft=1` when present |
| FAiRY GODMOTHER from Bag | `Back to THE EXTRA CREDIT` | `this-week.html?issue=3&bag=open&group=fun` plus `draft=1` when present |
| Hot Goss | `Back to the Book of Receipts` | `this-week.html?issue=3&bag=open&group=realworld` plus `draft=1` when present |
| Glossary | `Back to the Book of Receipts` | `this-week.html?issue=3&bag=open&group=realworld` plus `draft=1` when present |
| Community | `Back to Meet & Celebrate` | `this-week.html?issue=3&bag=open&group=connect` plus `draft=1` when present |
| Clubhouse | `Back to THE EXTRA CREDIT` | `this-week.html?issue=3&bag=open&group=fun` plus `draft=1` when present |

## Menu Consistency

Unified menu groups:

- CURRENT
- START HERE
- THE BOOK OF RECEIPTS
- THE LAiDIES CLUBHOUSE
- JOIN THE CLUB

Confirmed:

- Hot Goss is reachable from the menu.
- Menu opens and closes on mobile.
- `How LAiDIES Works` is spaced correctly.
- Menu links are large enough to tap at 390px.
- Header return remains separate from the hamburger menu.

## Proof Screenshots

- `operations/review-packets/assets/site-foundation-cleanup/390-issue03-return.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-quiz-return.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-menu-open-final.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-extra-credit-no-dupe.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-hot-goss-no-dupe.png`
- `operations/review-packets/assets/site-foundation-cleanup/390-community-no-dupe.png`

## Notes

This pass intentionally avoids `styles.css` because that file is mixed with unrelated earlier work.
