# Cycle 8D maker design QA

**Evidence time:** 2026-07-27 11:50 PDT  
**Status:** PASS FOR INDEPENDENT REVIEW — not Ali approval or integration authority

## Compared evidence

- Desktop, 1440×900 viewport:
  `evidence/comparison-desktop-incumbent-left-candidate-right.png`
- Mobile, 390×844 viewport:
  `evidence/comparison-mobile-incumbent-left-candidate-right.png`
- Full candidate renders:
  `evidence/desktop/homepage-candidate-1440.png` and
  `evidence/mobile/homepage-candidate-390.png`
- Exact masthead and all three admitted-artwork crops:
  `evidence/crops/`

The comparison sheets place the immutable incumbent on the left and the
challenger on the right. Full-page and focused-crop inspection were both
performed.

## Intentional visual delta

- The masthead, navigation and luminous town image remain pixel-identical.
- Below the masthead, pale page expanses become deep navy, teal and controlled
  plum editorial surfaces so the Homepage reads as one luminous nighttime
  world.
- The existing public content, order and jobs remain unchanged.
- The three admitted ink/faceted FAiRY artworks replace the rejected recurring
  scene in their exact intent, activity and Willow Lane jobs.
- Duplicate incumbent imagery in the intent and district systems is resolved
  through typographic hierarchy, not substitute CSS artwork.
- Mobile changes from repeated pale shells to a denser, calmer sequence; the
  candidate is 957 px shorter while preserving all content and functionality.
- Borders, shadows and colour rules vary by job instead of becoming one
  repeated decorative device.

## Iterations and corrections

1. Initial assembly was blocked because the candidate stylesheet loaded before
   the incumbent embedded styles, producing pale surfaces and bad text colour.
   The link order was corrected without changing public content or runtime.
2. The first corrected capture was blocked because a candidate body/header rule
   changed pixels at the masthead edge. Those rules were removed; desktop and
   mobile masthead crops are now byte-identical to the incumbent.
3. A descendant contrast audit exposed isolated inherited colours in the method,
   weekly, reference, district and postcard surfaces. Only those selectors were
   corrected. The final audit checks 299 desktop and 267 mobile descendants with
   zero failures.

## Final maker checks

- All structural, text, href, alt, section-order and runtime hashes match.
- All 26 visible images are complete; none are broken or hidden.
- Rejected FAiRY scene count is zero.
- Each admitted FAiRY job appears exactly once and remains unobstructed at both
  viewports.
- Duplicate-image register check passes.
- Desktop and mobile have no horizontal overflow.
- Masthead source, size and pixels match exactly at both viewports.
- Activity filtering, map popup and mobile menu checks pass where applicable.
- No browser console or page errors were recorded.

## Maker recommendation

Advance the frozen tuple to independent Town Entry and Brand judgment. The
candidate is a materially stronger maker submission than the incumbent on
full-page cohesion and mobile density while preserving the incumbent’s best
asset. The main trade-off is that the darker continuous canvas is more
cinematic and less airy; independent Brand review must decide whether that
change feels sophisticated and vibrant rather than merely dark.

