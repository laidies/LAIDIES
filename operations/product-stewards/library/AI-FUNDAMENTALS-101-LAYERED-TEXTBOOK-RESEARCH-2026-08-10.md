# AI Fundamentals 101 layered textbook and readability research

**Status:** INTERNAL PRODUCTION INPUT
**Date:** 2026-08-10
**Owner:** Learning System & Concepts Director
**Applies to:** AI Fundamentals 101 Introduction and Chapter 1 successor

## Research question

How should a long-form digital textbook place optional deeper explanation so a
nontechnical reader can follow the basic lesson, understand which detail
belongs to which concept and increase depth without rebuilding the lesson?

## Primary guidance inspected

- OpenStax textbook prefaces describe a logical progression, definitions in
  context, real-world framing and multiple worked examples of increasing
  complexity under the same learning objective.
  - <https://openstax.org/books/prealgebra/pages/preface>
  - <https://openstax.org/books/introduction-philosophy/pages/preface>
  - <https://openstax.org/books/microbiology/pages/preface>
- BCcampus's textbook-outline guidance calls for explicit chapter sections,
  aligned learning outcomes, examples, exercises, key terms, summaries,
  further reading and labelled figures.
  - <https://opentextbc.ca/selfpublishguide/chapter/textbook-outline/>
- GOV.UK warns that accordions hide content and create discovery risk; essential
  material is usually clearer under structured headings.
  - <https://design-system.service.gov.uk/components/accordion/>
- USWDS typography guidance recommends a comfortable body size, left alignment,
  controlled line length and at least 1.5 line height for long reading text. Its
  accordion guidance warns that hidden panels add cognitive and interaction
  cost when readers need most of the information.
  - <https://designsystem.digital.gov/components/typography/>
  - <https://designsystem.digital.gov/components/accordion/>
- W3C guidance requires programmatic heading relationships and supports narrow,
  left-aligned, resizable and reflowing text with adaptable spacing. Visual
  grouping cues must preserve their relationships in the document structure.
  - <https://www.w3.org/WAI/ARIA/apg/patterns/accordion/>
  - <https://www.w3.org/WAI/WCAG22/Understanding/text-spacing>
  - <https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html>
  - <https://www.w3.org/WAI/WCAG20/Understanding/visual-presentation.html>
- Research published in *Visible Language* found that typographic cues help
  learning when the number of cue systems stays below three. OpenStax likewise
  uses purpose-specific feature boxes rather than treating every aside alike.
  - <https://journals.uc.edu/index.php/vl/article/view/5483>
  - <https://openstax.org/books/astronomy/pages/preface>

## LAiDIES adaptation

1. **One concept, one module.** The concept heading, Standard explanation,
   Tell Me More and Full Nerd Alert share one semantic and visual container.
2. **Standard remains complete.** It is never hidden and does not rely on a
   later panel to repair meaning, supply the only example or state a material
   limitation.
3. **Depth continues the conversation.** Tell Me More answers the next natural
   question using the same case. Full Nerd Alert then explains the machinery,
   evaluation or failure condition behind that exact answer.
4. **Meaning before terminology.** Every specialist term follows a concrete
   interaction or visible mechanism and is immediately translated into what it
   changes for the reader.
5. **The heading names the relationship.** `Tell Me More about Predictive AI`
   is acceptable; an unattached `How clues become a score` panel is not.
6. **The control changes visibility, not structure.** The Nerd-O-Meter may hide
   optional layers, but the revealed panels remain in canonical reading order
   inside their parent concept.
7. **The page is designed for extended reading.** Target roughly 66 characters
   per line for body prose, a minimum effective 16-pixel body size, at least
   1.5 line height, strong but restrained heading contrast, generous paragraph
   spacing and no justified text.
8. **Use boxes by job.** A modest 1990s textbook treatment—solid tabs, rules and
   hard offset shadows—may make concept boundaries memorable. Limit the cue
   system: concept module, Tell Me More and Full Nerd Alert. `Pin It`, `Try It`
   and compact source notes receive distinct but quieter treatments.
9. **Layout must survive real reader changes.** Verify desktop and mobile,
   200-percent zoom, user text-spacing overrides, keyboard operation, focus,
   reflow and no obscuring sticky control.

## Non-goals

- No three separate editions or repeated versions of the same explanation.
- No nested accordions.
- No glossary dump as Full Nerd Alert.
- No hidden correction or safety-critical fact.
- No technical density used as evidence of depth.
- No generic institutional textbook voice; LAiDIES voice, humour and practical
  connection continue at every depth.
- No every-paragraph box treatment or decorative scrapbook clutter.

## Fail-closed production rule

Reject a candidate when any depth panel cannot be understood as the next turn
in the parent concept's conversation, when the visible page makes its parent
ambiguous, when terminology arrives before meaning, or when the reader must
open multiple detached panels to reconstruct the basic mechanism.
