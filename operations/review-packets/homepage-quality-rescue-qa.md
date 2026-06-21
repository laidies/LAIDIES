# Homepage Quality Rescue QA

Date: June 21, 2026

Council result: **PASS FOR ALI REVIEW**

This pass rescues the homepage as the public map for the LAiDIES universe while keeping the page honest about what is live, parked, or still being polished.

## Files Changed

- `index.html`
- `operations/review-packets/homepage-quality-rescue-qa.md`
- `operations/review-packets/assets/homepage-quality-rescue/*.png`

No Dream Phone implementation files, backend files, social engine files, prototypes, Episode files, or `styles.css` were edited for this pass.

## What Changed

- Kept the first action clear: `READ LATEST EPISODE` and `OPEN THIS WEEK'S BAG`.
- Reframed the homepage as a future-state map of the LAiDIES universe without pretending unfinished features work.
- Replaced generic status labels with LAiDIES-style labels:
  - `Open now`
  - `This week`
  - `Glow-up in the works`
  - `Getting polished`
  - `Bonus shelf in the works`
  - `Brewing soon`
  - `Book warming up`
  - `Member magic coming soon`
- Parked Dream Phone visibly as `Glow-up in the works` and removed homepage links to the live Dream Phone page.
- Removed fake/too-early links for Girl Talk, THE EXTRA CREDIT, and LAiDIES Card / Clubhouse Pass from the homepage map and homepage live menu.
- Replaced `THE BOOK OF RECEIPTS` homepage framing with `THE LAiDIES GRIMOIRE`.
- Replaced `THE EVIDENCE DRAWER` with `THE CHAMBER OF RECEIPTS`.
- Removed magazine-stack language from the homepage and kept the Season framing around ordered Episodes.
- Removed the duplicate mini newsletter form; one Buttondown form remains.
- Removed sign-in/save-progress promises from the homepage and changed copy to browser/device-local honesty.
- Hid the tertiary anthem shortcut on mobile because it was peeking below the first viewport; desktop still shows it.

## Image Audit

All homepage images referenced by `index.html` exist locally and loaded in QA.

No new images were created in this pass.

The unapproved/untracked `assets/home-book-of-receipts-closet-v1.png` is no longer used by the homepage.

## QA Results

| Check | Result |
| --- | --- |
| Desktop 1440 has no horizontal overflow | PASS |
| Mobile 390 has no horizontal overflow | PASS |
| No broken image paths | PASS |
| No missing local link targets | PASS |
| No console/page errors | PASS |
| No raw alt text visible | PASS |
| First actions are clear within 10 seconds | PASS |
| Buttondown form appears once | PASS |
| Dream Phone is not presented as live | PASS |
| Member/pass features are not presented as working | PASS |
| Homepage uses Episode/Season framing, not magazine-stack framing | PASS |
| Homepage map includes future-state LAiDIES universe honestly | PASS |

## Screenshots

- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-top.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-current-episode.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-pick-your-path.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-grimoire.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-clubhouse.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-signup-footer.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-top.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-first-viewport-check.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-current-episode.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-pick-your-path.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-grimoire.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-signup-footer.png`

## Residual Notes

- `content/site/brand-polish.js` was already dirty before this task. This pass did not edit it. The homepage now uses a homepage-only override to keep the shared live menu honest on `index.html`.
- A later shared-navigation cleanup should move the same Grimoire/parked-feature language into `content/site/brand-polish.js` once that file can be handled intentionally.
- Underlying parked activities still need their own quality passes. This homepage pass does not approve Dream Phone, Girl Talk, THE EXTRA CREDIT, or member/pass flows for implementation.

## Exact Staging List

- `index.html`
- `operations/review-packets/homepage-quality-rescue-qa.md`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-top.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-current-episode.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-pick-your-path.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-grimoire.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-clubhouse.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-desktop-1440-signup-footer.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-top.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-first-viewport-check.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-current-episode.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-pick-your-path.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-grimoire.png`
- `operations/review-packets/assets/homepage-quality-rescue/homepage-mobile-390-signup-footer.png`

## Commit Recommendation

Safe to commit as a focused homepage rescue:

`Rescue homepage quality and universe map`

