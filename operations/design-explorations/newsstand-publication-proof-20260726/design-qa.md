# NewsStand four-publication hero · design QA

**Final result:** passed

## Comparison target

- Source visual truth:
  `qa-reference-two-paper-scene.png`
- Rendered implementation:
  `qa-implementation-three-paper-ticker-scene.png`
- Mobile evidence:
  `qa-mobile-three-paper-ticker.png`
- Desktop viewport and captures: 1280 × 720 CSS px, 1280 × 720 image
  pixels, density 1.
- Mobile state: real NewsStand page inside a 390 × 844 CSS px QA frame.
- State: private proof with current Breaking and Daily issues; Weekly and
  Tribune represented as their distinct recurring publications.

## Full-view comparison evidence

The source hero showed only two large physical papers and therefore did not
make the four-publication NewsStand legible before the selector row. The
implementation preserves Paige, the storefront, the rack and the existing
scene proportions while adding:

- a large physical Daily;
- a current, correctly branded Weekly;
- the existing Tribune; and
- a separate Breaking ticker on the counter.

All four elements are functional desk selectors. The ticker remains visually
different from the slower publication papers and does not cover Paige’s face,
source-checking sign or the NewsStand masthead.

## Focused-region comparison evidence

The 390 px mobile capture was required because the desktop overlays become a
separate working rack below the cropped room scene. All three papers remain
visible in one row, the Breaking ticker remains directly beneath them, and the
four compact publication tabs remain readable below. No focused typography
crop beyond the hero was needed because all four mastheads and the ticker copy
are readable in the mobile evidence.

## Required fidelity surfaces

- **Fonts and typography:** Existing Anton/Jost NewsStand hierarchy is
  preserved. Paper mastheads are baked into the original newspaper assets;
  ticker copy uses the established display/body families.
- **Spacing and layout rhythm:** Three papers occupy the existing rack zone
  without covering Paige. The ticker uses the previously empty lower counter
  area. Mobile converts the papers to an even three-column rack.
- **Colors and visual tokens:** Existing navy, paper cream, magenta and cyan
  tokens are reused; no new palette was introduced.
- **Image quality and asset fidelity:** Daily and Weekly are original 1003 ×
  1568 newspaper assets matching the existing Tribune silhouette, paper
  texture, printed comic treatment and dimensional shadow. Full-resolution
  pseudo-text/data inspection passed after corrective edits.
- **Copy and content:** Exact locked mastheads are The Breaking, The Daily, The
  Weekly and The Tribune. Obsolete TODAY and WEDNESDAY Edition branding is no
  longer visible in the proof.

## Interaction evidence

- Daily paper opens The Daily desk with one approved proof story.
- Breaking ticker opens The Breaking desk with one approved proof story and
  receives the selected state.
- Canonical reader contract and browser fixture suites pass unchanged.

## Comparison history

1. **P1 — only two physical publications in the hero.** The original scene
   visually omitted Daily and Breaking. Fixed with a third paper plus a
   distinct Breaking ticker.
2. **P2 — obsolete Weekly branding remained beneath an overlay.** The first
   implementation used the legacy Wednesday Edition paper with a corrective
   label. Fixed by generating a new exact “THE WEEKLY” newspaper asset and
   removing the legacy image.
3. **Post-fix pass:** Same-state desktop comparison and 390 px mobile evidence
   show all four publications, correct current mastheads, balanced hierarchy
   and no actionable P0/P1/P2 issue.

## Follow-up polish

- Tribune can receive a fully refreshed original cover in a later art pass;
  its current paper already carries the correct Tribune masthead and does not
  block this proof.

## Editorial-art correction · 2026-07-26

- Source rejection evidence:
  `qa-reference-rejected-bakery-ambiguous-breaking.png`.
- Corrected homepage evidence:
  `qa-implementation-corrected-breaking-daily-cards.png`.
- Corrected full-article evidence:
  `qa-implementation-corrected-breaking-article.png` and
  `qa-implementation-corrected-daily-article.png`.
- Corrected physical-paper evidence:
  `qa-implementation-corrected-daily-paper.png`.

### Findings and fixes

1. **P1 — The Breaking illustration was not self-explanatory.** Tower-only
   hardware, coffee equipment and counter objects made the “whole receipt”
   comparison read as an unexplained bakery back room. Replaced with two
   complete CRT workstations running the same task and one central five-part
   comparison sheet in an unmistakable newsroom test bench.
2. **P1 — The Daily illustration violated the approved population rule.** Its
   literal coffee-shop setting contained a background man and made the woman
   appear to work beside a bakery counter. Replaced the environment with a
   newsroom operations office; she is now the only human in both the article
   image and physical Daily paper.
3. **P2 — Generated pseudo-writing could look like evidence.** All remaining
   words, pseudo-text, numbers and labels were replaced with abstract color
   blocks, dots, blank areas and simple chart shapes.

### Post-fix result

The homepage comparison and both full-article captures show the intended
mechanisms without the rejected setting or incidental person. Breaking now
communicates “same task, two systems, compare the whole result.” Daily now
communicates “one woman coordinating several responsibilities with computer
assistance.” No actionable P0/P1/P2 issue remains.

## Archive discovery extension · 2026-07-26

- Desktop evidence: `qa-implementation-archive-desktop.png`.
- Responsive evidence: the existing 390 px QA frame renders the archive as one
  382 px column with two 170 px publication tabs per row and no horizontal
  overflow.

### Findings and fixes

1. **P1 — archive discovery required a search query or opening each paper.**
   Added a “Latest five” index directly below the current-desk status so a
   returning reader can scan recent coverage before committing to a paper.
2. **P2 — twenty always-visible headlines would overpower the NewsStand’s
   paper-first hierarchy.** Kept all four publication names visible as tabs
   while showing only the selected publication’s five latest headings.
3. **P2 — publication-only browsing would hide continuing themes.** Added a
   compact topic drawer whose buttons gather matching issues across all four
   publications in the existing unfolded-paper reader.
4. **P1 — private sample headings could be mistaken for published archive
   records.** Added a visible archive-layout disclaimer and an explicit
   private-design-proof notice when any sample heading opens.

### Interaction evidence

- All four publication tabs switch the five-headline list.
- The Daily tab renders five Daily headings.
- “See all back issues” renders twenty preview index rows.
- “Privacy & permissions” renders four cross-publication matches.
- A preview headline opens in the existing reader and carries the private,
  not-published notice.
- Keyboard roles, selected tab state and focus outlines remain explicit.
- Canonical NewsStand contract fixtures (10) and browser checks (89) pass
  unchanged.

**Final result:** passed
