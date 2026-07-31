# Episode 01 Trading Card Pack — design QA

Date: 2026-07-29  
Status: local prototype candidate; not public or deployed  
Final result: **CORRECTED — RE-VERIFICATION REQUIRED**

## Visual authority checked

- `operations/reference/trading-cards/tradingref-01.png`
- `operations/reference/trading-cards/tradingref-02.png`
- `operations/reference/trading-cards/tradingref-03.png`
- `operations/reference/trading-cards/tradingref-04.png`
- approved Episode 01 heroine identity and comic visual language:
  `content/episodes/episode-01.canon.md`
- approved LAiDIES wordmark:
  `approved-assets/brand-logos/laidies-wordmark-final-b-light.svg`
- canonical card content ruling:
  `operations/product-stewards/learning-content-ecosystem/EPISODE-01-STUDY-PACK-CONTENT-RULING-2026-07-27.md`
- canonical Concepts/Vocab source:
  `content/library-books/rendered/vocab-101.html`

## Visible comparison

- The four admitted fronts use one coherent premium 1990s comic-card system: pink,
  purple, cobalt and sunshine yellow, bold ink, Ben-Day texture and white card
  borders.
- The approved Episode 01 heroine appears on every front; no generic substitute
  woman or unrelated cast member appears.
- The reverse is now a restrained collector-card information design rather than
  a children’s activity frame: one continuous icy-blue reading field, angular
  magenta/cobalt print bands, offset-print texture and no speech bubbles, blank
  form boxes, clip-art or generated wordmark.
- Corrected after review: every episode/card eyebrow, title, definition,
  analogy, memory line, source label and link now stays inside the light-blue
  safe area on all four cards. The prior QA pass missed that the body sections
  did not inherit the heading's left inset.
- The check now uses the artwork's visible polygon, not only the HTML
  container: the top heading is inset past the diagonal upper-left band, and
  every lower link/source block ends before the rising lower-right band.
- The body copy renders at 15.225 px in the 390 px responsive check; every card
  reports `scrollHeight === clientHeight`, with no clipped or hidden text.
- The approved wordmark asset replaces hand-built logo lettering.
- No `Open the Tab` title, `Your 20%` card or fixed human-percentage claim
  remains.

## Content and provenance

- Card backs use one concise derivative of the canonical Concepts/Vocab 101 or
  Episode 01 wording, not a competing long-form explanation.
- The three explicit technical terms link to their current canonical Concepts
  101 anchors. The participation-gap card links to the exact original evidence.
- `Same task, different drafts` is excluded because it is the Try-On mechanic,
  not a concept. `Your judgment` is excluded because it is a lesson principle,
  not vocabulary.
- `Physics Problem` is excluded because it is a memorable episode line, not a
  concept that needs its own explanation card.
- The admitted deck is deliberately limited to:
  `Generative AI`, `Model`, `Hallucination` and `Participation Gap`.
- Invisible Load is excluded. Episode 01 uses it as a story/stakes beat;
  defining it back to women does not create useful learning and risks
  patronizing the audience.
- The Model card no longer says models sit “under apps.” It follows Episode
  05's maintained product/model framing and explicitly includes apps, APIs,
  coding tools and other systems.
- The Hallucination card preserves the Episode 01 fact that every Burn Book
  entry was made up.
- `Women Shape AI` is excluded because the proposed card invented a broader
  inclusive-design lesson that Episode 01 does not teach.
- The Generative AI card explains what generative AI does and how it differs
  from search. It does not use “a maker, not a fact-checker” as its definition;
  that is risk guidance, not the concept explanation.
- Every back visibly names its source.

## Interaction checks

- Foil pack opens from one clear primary action.
- All four fronts appear together in a centred desktop collection and one-column
  responsive collection.
- Selecting a front flips that card in place; selecting another card restores
  the prior front and flips the new selection.
- Each reverse has a working front-return control and canonical learning link.
- Puffy drawer, placement and removal remain connected to the selected card
  face.
- Local preview save persists card choice and Puffy placements without claiming
  that account storage is already connected.
- Print view contains four fronts followed by four populated explanation backs.
- Browser console errors/warnings: none.
- Production build: pass.
- Sites packaging tests: pass.

## Responsive checks

- Default in-app browser viewport: pass.
- 390 × 844 viewport: pass.
- All four card backs: no text overflow at 390 px or the delivered desktop grid
  size.
- All four populated backs: pass the artwork-polygon boundary check for the
  heading, both explanation sections, memory line, learning link and source.
- 2026-07-29 repeat check must be rerun after the content correction. Each
  reverse must be opened individually in the delivered gallery. All four must
  share the corrected 15.5% left
  safe-area inset; all reported no horizontal or vertical text overflow.
- Page width: no horizontal overflow introduced by the gallery or card faces.
