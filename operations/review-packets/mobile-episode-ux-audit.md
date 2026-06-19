# Mobile Episode UX Audit

Date: 2026-06-19

Council result for the mobile Episode system: **REVISE INTERNALLY - DO NOT SEND TO ALI AS A FINAL PATTERN**

This audit was created after the Episode 1 review fixes and the Season page Episode 3 verification. It is intentionally broader than the Episode 1 fix. Episode 1 can go to Ali for review, but the cross-Episode mobile reading model should not be treated as finished.

## Pages Audited

- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `episodes.html`
- `index.html` homepage path into Read The Season
- mobile menu path into Read The Season

Reference quality gate:

- `operations/review-packets/laidies-council-quality-gate.md`

## Screenshots

Screenshots saved under:

`operations/review-packets/assets/mobile-episode-ux-audit/`

Files:

- `episode01-mobile-390-masthead.png`
- `episode01-mobile-390-signoff-block.png`
- `episode01-mobile-390-challenge-block.png`
- `episode02-mobile-390-top.png`
- `episode02-mobile-390-mid-article.png`
- `episode02-mobile-390-end-cta.png`
- `episode03-mobile-390-masthead.png`
- `episode03-mobile-390-reader-kit.png`
- `episode03-mobile-390-mid-article.png`
- `episode03-mobile-390-signoff-end.png`
- `mobile-audit-capture-results.json`

## Mobile UX Principles Used

The mobile Episode reading experience should:

- make the Episode identity clear within the first screen
- get the reader into the article quickly
- keep return/context links visible but not dominant
- avoid duplicating the same navigation choices in multiple large blocks
- keep Episode tools discoverable without forcing a long pre-read scroll
- preserve the article voice and pacing
- use live HTML for logo/title/premise, not baked-in text
- avoid cropped heads, clipped titles, awkward image crops, and horizontal overflow
- feel like LAiDIES quality, not a generic article template

## Episode 1 Findings

Current state after this slice: **PASS FOR ALI REVIEW for the specific fixes**

What works:

- The masthead now uses `assets/ugh-as-if.png`, which is the right existing Episode 1 image.
- The masthead now feels more Episode-specific and closer to the Episode 3 object-world system.
- Logo, Episode label, title, premise, and date are live HTML.
- The mobile title no longer clips at 390px.
- The contextual return link remains visible.
- The signoff block is now more premium and more reusable.
- The challenge block is simpler, clearer, and more readable.
- Article body copy was preserved.

What could still confuse or tire mobile readers:

- The page still has a lot of front-loaded support material before the reader reaches the article.
- The side rail/reader kit pattern still feels like a full extra section on mobile, not a compact tool layer.
- The article is long, and the mobile end-of-read path can feel like several stacked endings instead of one clear next action.
- The design is better, but it still mixes old Episode 1-specific CSS with the newer Episode system.

Recommended next step for Episode 1:

- Send Episode 1 to Ali for review only.
- Do not use Episode 1 alone as the final system template for Episode 2.

## Episode 2 Findings

Current state: **REVISE INTERNALLY**

What works:

- Episode 2 has a strong approved image direction and the top image is not broken.
- The title and premise are understandable.
- The article content should be preserved.

What does not yet match Episode 3's reading experience:

- The masthead is still closer to an older image-card treatment than the Episode 3 immersive object-world masthead.
- The page does not yet have the same reader kit / side rail / contextual links quality as Episode 3.
- The article starts after a fairly large top block, but the supporting system does not feel as deliberately structured as Episode 3.
- End-of-read CTAs do not yet feel like one coherent Episode-specific ritual.
- Typography, spacing, and CTA hierarchy are not yet aligned with the stronger Episode 3 pattern.

Recommended next step for Episode 2:

- Do not align Episode 2 by blindly copying Episode 3.
- First define the shared mobile Episode structure, then apply it to Episode 2 while preserving its article copy, image assets, and voice.

## Episode 3 Findings

Current state: **Best current reference, not a perfect template**

What works:

- Strong object-world masthead.
- Live HTML logo/title/premise.
- Clear Episode identity.
- Better editorial polish than Episodes 1 and 2 had before alignment work.
- Reader kit, contextual links, and signoff showpiece give the page a richer LAiDIES-world feeling.

What should not be copied blindly:

- The hero is immersive, but on mobile it can delay the start of the actual article.
- The reader kit, ritual setup, side rail, and section jump controls can become a long pre-read stack.
- Side rail/contextual links are useful, but on mobile they should probably become a compact Episode Kit drawer or collapsible panel.
- The page creates a strong world, but the mobile hierarchy needs more restraint so the reader does not feel trapped in preamble.

QA note:

- Some lazy-loaded Episode 3 body images appeared incomplete in the automated full-page image check before scrolling. The files exist locally, so this is likely a lazy-load timing artifact rather than missing assets.

## Season Page Mobile Findings

Current state after this slice: **PASS FOR QA**

Confirmed:

- Homepage path to Read The Season reaches `episodes.html`.
- Mobile menu path to Read The Season reaches `episodes.html`.
- Direct `episodes.html` route shows Episode 1, Episode 2, Episode 3, then Coming Soon Episode 4.
- Episode 3 appears once.
- Episode 3 card links to the live Episode 3 page.
- Coming Soon cards remain after Episode 3.
- No horizontal overflow detected at 390px.

Root cause of Ali's likely mobile issue:

- The page rebuilds cards from `content/site/site-data.js`.
- The previous script URL still used an older cache key.
- A mobile browser could keep stale data that did not include Episode 3.
- Updating the data cache key should force the restored data to load.

## Cross-Episode Mobile Problems

The biggest mobile issue is not one broken card. It is that the Episode system has several good ingredients but no single disciplined mobile pattern yet.

Problems to resolve before Episode 2:

- Too many large pre-read blocks on mobile.
- Side rail links become a long stacked section instead of a compact reader tool.
- Reader kit and contextual links sometimes duplicate each other.
- End-of-read CTAs can feel like multiple endings.
- Episode 1 and Episode 2 still have older page-specific CSS patterns.
- Episode 3 is visually strong but too expansive to copy without trimming mobile hierarchy.
- The page system needs one reusable masthead, reader kit, Episode Kit, signoff, challenge, and final CTA standard.

## Recommended Mobile Episode Structure

Use this order as the next system pass:

1. Header and contextual return link.
2. Compact immersive Episode masthead using one existing Episode image.
3. Three-item reader kit or compact premise setup.
4. Article body.
5. Collapsible or compact Episode Kit for Bag, quiz, Try-On, printable, song, and related tools.
6. Polished signoff showpiece.
7. One challenge/action card.
8. One final next action, not a pile of competing CTAs.

## Recommended Reusable Components

Create or standardize these before Episode 2:

- Episode masthead: image, logo, Episode number, live title, live premise, date.
- Reader kit: three concise reasons/tools for this Episode.
- Mobile Episode Kit: compact access to Bag, quiz, Try-On, printable, song, and related tools.
- Signoff showpiece: kicker, `Remember, LAiDIES:`, one strong closing line, optional short phrase.
- Challenge card: one reader action, one reward/credit statement.
- End-of-read next action: one primary next move.

## What To Preserve

Preserve:

- Episode 1 article body copy.
- Episode 2 article body copy.
- Episode 3 article body copy.
- Episode-specific images/assets.
- Published URLs.
- Episode-specific references and jokes.

Do not:

- rewrite article voice during template work
- create fake links
- create empty pages
- rename routes without redirect planning
- stage unrelated parked work

## Recommended Implementation Order

Phase 1 - Episode 1 urgent fixes and Season cache key:

- Done in this slice.

Phase 2 - Define shared mobile Episode structure:

- Decide how the mobile Episode Kit should behave.
- Decide what appears before the article versus after the article.
- Decide which Episode 3 patterns are standard and which are Episode 3-specific.

Phase 3 - Episode 2 alignment:

- Apply the shared structure to Episode 2.
- Preserve Episode 2 copy and assets.
- Use one strong existing Episode 2 image for the masthead.

Phase 4 - Episode 3 normalization:

- Bring Episode 3 into the same shared component system without reducing its quality.
- Re-check lazy-load and body-image behavior.

Phase 5 - Full desktop/mobile QA:

- desktop 1440
- mobile 390
- masthead
- article start
- mid-article
- reader kit / Episode Kit
- signoff
- challenge
- final CTA
- footer/menu
- no overflow
- no console errors
- no broken links

## Council Gate

Episode 1 fixes: **PASS FOR ALI REVIEW**

Season Episode 3 visibility: **PASS FOR QA**

Overall mobile Episode system: **REVISE INTERNALLY - DO NOT SEND TO ALI AS A FINAL PATTERN**

Reason:

Episode 1 is now much more reviewable, and Episode 3 is visible again on the Season page, but the mobile Episode system still needs a clear shared structure before Episode 2 is converted. The next design decision should be about the mobile Episode Kit and pre-read hierarchy, not more one-page patching.
