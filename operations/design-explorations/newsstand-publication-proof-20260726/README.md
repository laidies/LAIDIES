# NewsStand Breaking + Daily publication proof

**Status:** VERIFIED LOCALLY / PRIVATE / NOT PUBLISHED

This isolated proof lets Ali judge:

1. whether a complete Breaking story meets the LAiDIES editorial standard;
2. whether a complete Daily story is sufficiently explanatory rather than a
   headline roundup;
3. how current Breaking and Daily stories could be handed off from the
   homepage; and
4. how the same stories open in the existing NewsStand reader; and
5. how readers can scan the latest five headlines by publication, open the
   complete archive, or browse across publications by topic.

It does not modify `index.html`, `newsstand.html` or
`content/newsstand-stories.js`. The visible proof banner and isolated fixture
prevent the mock from being confused with a publication.

## Publication flow represented

`radar → score and classify → complete source/claim map → LAiDIES explanation
and reader decision → independent editorial/accuracy approval → canonical
story record → homepage handoff + NewsStand reader → source recheck,
correction or retraction`

The final three production steps are demonstrated visually, not executed.

## Examples

- **The Breaking:** Google’s new Flash models change price, model choice and
  migration behaviour. Includes access, predecessor comparison, pricing,
  reader tasks, test/switch/wait guidance, vendor/independent evidence and
  real-use tests still needed.
- **The Daily:** Google ATLAS is used to explain the difference between
  adoption, assistance, completed work and job replacement. Includes the
  study’s strongest finding and its material sampling/classification limits.

The Daily fixture deliberately demonstrates editorial approval rather than
automatic eligibility: its independent-evidence score remains below the
autonomous-publication floor.

## Archive discovery proof

The private NewsStand adds a compact archive layer between the current-desk
status and the unfolded reader:

- four publication tabs, each exposing the latest five headlines;
- a “See all back issues” action that opens the complete index in the existing
  paper reader;
- topic buttons that gather relevant issues across all four publications; and
- a headline-opening state that demonstrates the archive journey without
  representing sample headings as published LAiDIES stories.

The twenty archive headings are explicitly marked as layout-preview data. They
are not a public publication record and must not be migrated to production as
editorial content. Production should populate the same interface only from
approved canonical story records.
