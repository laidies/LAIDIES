# Homepage Masthead Implementation QA

Date: 2026-06-19

## Scope

Implemented only the approved homepage masthead direction.

Approved option: 22A

Live homepage implementation:

- Uses the approved clean background image as a homepage masthead background.
- Uses the approved LAiDIES wordmark as a real placed image asset.
- Uses real HTML text for the masthead line and support copy.
- Keeps homepage CTA text outside the masthead.
- Keeps reader-facing homepage terminology as "Episode."

## Files Intended For This Commit

- `index.html`
- `assets/brand/laidies-homepage-masthead-bg-approved-v1.png`
- `operations/review-packets/homepage-masthead-implementation-qa.md`

## Assets

Live masthead background:

- `assets/brand/laidies-homepage-masthead-bg-approved-v1.png`
- Source: `operations/review-packets/masthead-options/ali-worthy/ali-worthy-bg-5-bedroom-phone.png`
- Size: 1800 x 720

Placed logo:

- `assets/brand/laidies-logo-masthead-approved-v3.png`
- Size: 1380 x 553
- Already tracked before this implementation.

Local approved full/share image files exist for future social use, but they are not used by the live homepage masthead and are not part of this commit:

- `assets/brand/laidies-homepage-masthead-approved-v1.png`
- `assets/brand/social/laidies-homepage-masthead-approved-1800x720-v1.png`

## Text Treatment

Text moved into the masthead as real HTML:

- `GIRL POWER MEETS / MACHINE POWER`
- `AI fluency for women with full calendars and high standards, not beige tech explanations.`

Text kept below the masthead as orientation, not as a duplicate hero:

- `90s/Y2K defined us. AI is shaping now. LAiDIES is where they meet.`
- `New episodes every Wednesday, obviously.`

Primary homepage CTAs:

- `READ LATEST EPISODE`
- `OPEN THIS WEEK'S BAG`

The weekly ritual motto was added as a small cue inside the existing Wednesday ritual card:

- `On Wednesdays We Do AI`

## Duplicate Text Cleanup

Removed/reduced from the immediate post-masthead hero block:

- Duplicate standalone `GIRL POWER MEETS MACHINE POWER` headline below the masthead.
- Duplicate long AI fluency support paragraph below the masthead.
- The old newsletter-cadence eyebrow was converted into the clearer orientation line: `New episodes every Wednesday, obviously.`

Preserved:

- Existing anthem cue: `Get in, loser. We're learning AI.`

## QA Performed

Local server:

- `http://localhost:8765/index.html` returned `200 OK`.

Asset checks:

- Masthead background returned `200 OK`.
- Placed logo returned `200 OK`.
- Background image confirmed as 1800 x 720 via `sips`.
- Logo image confirmed as 1380 x 553 via `sips`.

Markup checks:

- `index.html` parsed with Python `HTMLParser`.
- Homepage CTA text is `READ LATEST EPISODE`, not `READ LATEST ISSUE`.
- Homepage orientation includes `New episodes every Wednesday, obviously.`
- Reader-facing homepage utility copy now uses `episode` where this masthead pass touched old `issue` wording.

## QA Limitations

Fresh Playwright screenshots could not be generated in this environment because the Playwright browser binary is missing:

`Executable doesn't exist at .../chromium_headless_shell-1200/...`

Because of that, this QA note does not claim a fresh headless visual screenshot pass. The implementation was still checked by local serving, asset resolution, markup parsing, and targeted text/route inspection.

## Excluded

Not included in this masthead implementation:

- rejected masthead candidate assets
- `operations/prototypes/**`
- `styles.css`
- broader homepage layout/content experiments
- Part B / interactive world object work
- Episode 1/2 template migration
- backend/signup work
