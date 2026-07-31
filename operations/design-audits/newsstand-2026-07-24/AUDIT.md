# NewsStand product and reader-flow audit

**Status:** REVIEW READY  
**Date:** 2026-07-24  
**Surface:** deployed `laidies.ai/newsstand.html`  
**User goal:** quickly discover whether important AI news has changed, understand
why it matters, read the appropriate depth and find prior coverage.

## Overall verdict

The NewsStand has a distinctive, credible place identity and a strong
explanatory story format. Its current information architecture is built for
two periodic papers, not a live news operation. Current news is hidden behind
the storefront interaction, “You are caught up” describes only the newest
weekly filing, and mobile readers must travel a long distance before reaching
the paper. Breaking News should become the visible live desk; WEDNESDAY and
Tribune remain the deeper products behind it.

## Step 1 — Arrive at the NewsStand

**Health:** STRONG IDENTITY; WEAK NEWS DISCOVERABILITY

![Desktop NewsStand start](01-newsstand-desktop-start.png)

### Strengths

- Paige, the storefront and the physical papers make the page unmistakably
  LAiDIES rather than a generic feed.
- The newsroom rule board communicates the editorial promise immediately.
- WEDNESDAY and Tribune have distinct physical identities and accessible button
  names.

### Risks

- The first viewport contains the place but no headline, timestamp or breaking
  state. A reader cannot tell what is happening now.
- “You are caught up” is derived from the latest WEDNESDAY filing. Once
  BREAKING NEWS exists, that statement could be materially false.
- The newspapers depend on image recognition. Their accessible names are good,
  but visible labels such as “Weekly explainer” and “Argument paper” would help
  first-time readers understand the choice.

## Step 2 — Pull an edition

**Health:** WORKS; REQUIRES AN EXTRA DISCOVERY STEP

![WEDNESDAY edition open](02-weekly-edition-open.png)

### Strengths

- The selected paper receives a clear visual outline.
- “Put the paper back” preserves the physical NewsStand metaphor.
- The front-page treatment gives the story more weight than a normal card.

### Risks

- Readers must select a publication and then select a story. That is reasonable
  for WEDNESDAY and Tribune but too slow for BREAKING NEWS.
- Only one story is visible, so the page does not yet show how prioritization,
  multiple qualified stories or an empty breaking state will work.
- The current status block remains visually dominant after the paper opens,
  delaying the actual article list.

## Step 3 — Read a story

**Health:** STRONG EDITORIAL STRUCTURE; PROVENANCE NEEDS TO MOVE UP

![Story heading](03-story-open.png)

![Story body](04-story-body.png)

### Strengths

- “The Story,” “The LAiDIES Read,” “What This Means For You” and the Cocktail
  Party Explanation create a useful evidence → interpretation → action flow.
- The prose is readable and gives the reader a memorable mental model.
- Source and filing metadata exist.

### Risks

- The very large condensed uppercase headline dominates the mobile and desktop
  reading experience; long headlines become difficult to scan and create
  excessive vertical travel.
- Published/updated time, evidence status and correction state are not visible
  beside the headline.
- Source provenance appears at the end. For BREAKING NEWS, readers should see
  “vendor claim,” “independently corroborated,” “disputed” or “developing”
  before reading the interpretation.
- Evolving stories need a visible “What changed since the last update” block.

## Step 4 — Use the NewsStand on mobile

**Health:** FUNCTIONAL; NEWS ARRIVES TOO LATE

![Mobile NewsStand start](05-newsstand-mobile-start.png)

![Mobile edition open](06-mobile-edition-open.png)

### Strengths

- Controls become full-width and touch-friendly.
- The physical-paper interaction remains understandable.
- Body copy reflows into a comfortable reading width.

### Risks

- Storefront, paper rack, caught-up status and controls consume several screens
  before a reader reaches news.
- The front-page headline scale is too aggressive for long explanatory
  headlines.
- The sticky header is useful, but focus, sticky positioning and full-page
  capture interactions warrant keyboard and screen-reader verification.

## Step 5 — Search back issues

**Health:** SEARCH WORKS; RESULT PLACEMENT IS DISORIENTING

![Mobile back-issue results](07-mobile-search-results.png)

### Strengths

- Search accepts topics, sources and tags.
- Results clearly preserve edition and date.
- Two relevant stories were returned for “verification.”

### Risks

- Results render in the reading area above the search form. On mobile, the
  result is spatially behind the action the reader just took.
- Results do not show why they matched or highlight the matching term.
- There are no edition, story-type, topic or date filters.
- The result count needs an `aria-live` announcement and focus should move to
  the results heading after submission.

## Highest-impact improvements

### P0 — build the live desk

1. Add **BREAKING NEWS** as the first and most direct NewsStand lane. Show its
   current lead headline, type, timestamp and one-sentence importance within
   the first screen after the storefront.
2. Replace “You are caught up” with an honest live state:
   - `BREAKING — updated 4:15 PM`, when a story qualifies; or
   - `No breaking story cleared the bar`, when the desk is clear.
3. Let a breaking headline open in one action. Keep the pull-paper interaction
   for WEDNESDAY and Tribune.
4. Give each breaking item a visible type: `MODEL RELEASE`, `FEATURE RELEASE`,
   `INCIDENT`, `POLICY`, or `HEADLINE REALITY CHECK`.

### P0 — make trust visible

5. Add a compact evidence strip beside the headline:
   `CONFIRMED`, `DEVELOPING`, `DISPUTED`, or `CORRECTED`; published and updated
   times; primary/independent source counts.
6. Add “What changed” to updated stories and retain a public correction note
   when the conclusion changes.
7. For model and feature releases, display the decision summary first:
   `SWITCH`, `TEST`, `WAIT`, or `IGNORE`, followed by access, price, predecessor
   comparison and unverified vendor claims.
8. For sensational coverage, display the circulating claim verdict and the real
   takeaway without making the misleading frame the largest text on the page.

### P1 — improve navigation and retrieval

9. Move search results below the search form or automatically move focus and
   scroll to a result heading after submission.
10. Add filters for edition, story type, topic and date; show matching snippets.
11. Add a small “Related NewsStand coverage” block after each story. Keep it
    inside NewsStand rather than routing current news to a Library/model guide.
12. Allow readers to browse a chronological archive as well as search it.

### P1 — reduce mobile friction

13. Put the current BREAKING NEWS lead before the large caught-up/status block
    on compact screens.
14. Reduce long story-headline size and line-height pressure on mobile while
    preserving the newspaper display voice.
15. Consider a compact returning-visitor storefront state after the first
    visit, while preserving the full immersive arrival for new visitors.

### P2 — build reader continuity

16. Offer an optional alert/subscription for stories that actually clear the
    breaking bar, not a generic headline newsletter.
17. Show “last checked” separately from “last published” so a quiet desk still
    demonstrates active monitoring without manufacturing content.
18. Add a weekly “What changed after publication?” sweep for predictions,
    incidents and vendor claims.

## Accessibility risks and verification limits

- Screenshots and DOM structure confirm accessible names for the paper controls,
  a skip link, semantic headings and a labelled searchbox.
- Screenshots cannot prove contrast ratios, complete keyboard order,
  screen-reader announcements, zoom resilience or reduced-motion behaviour.
- Search focus movement and result announcements should be tested directly
  after implementation.
- The audit used the deployed desktop page and a 390 × 844 viewport. It did not
  test every browser, assistive technology or failure state.
