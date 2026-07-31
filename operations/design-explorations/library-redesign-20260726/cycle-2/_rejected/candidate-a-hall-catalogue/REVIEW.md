# Independent admission review — Candidate A: Hall Catalogue

**Decision:** REJECTED · **Owner review:** NO  
**Maker:** `library_redesign_maker_cycle2`  
**Independent reviewer:** `library_redesign_independent_admission_cycle2`

## Evidence inspected

- Full-resolution 1487 × 1058 environment plate; SHA-256 matches the maker
  receipt.
- Deterministic page at 1440 × 900 and 390 × 844 in headless Google Chrome
  150 with Playwright Core 1.61.1.
- Full-page and viewport captures with external requests blocked.
- Open-book, preview-alert and Miss Jeeves result states at both viewports.
- Current homepage and current Library at the same viewports, plus the named
  approved homepage/Library references.
- Governing experience brief, functionality map, visitor-state standard,
  visual-admission protocol, Cycle 1 rejection and relevant painpoint rules.

Evidence is under `cycle-2/review-evidence/`; exact DOM/control findings are in
`capture-report.json`.

## Full visible audit

- **Words and labels — FAIL.** The live UI visibly says `OPEN BOOK` on Vocab
  101, Concepts 101, Who's Who in AI and Straight Answers About AI. The
  functionality map authoritatively says there are zero admitted production
  books. `PREVIEW · EP 5` also flattens several different hold/currentness
  states into one unsupported release label.
- **Logos, symbols and icons — PASS.** The injected LAiDIES header, approved
  Puffy and existing book-cover marks are recognizable; no mystery navigation
  symbol or generated logo was found. The environment's rosettes are
  architectural decoration, not controls.
- **Covers, character and objects — MIXED/FAIL.** Approved bright-family covers,
  the real shelf asset, approved Puffy and approved Miss Jeeves art are used.
  The same real covers are nevertheless assigned false operable status. The
  generated environment contains no pseudo-text, people, fake covers or
  interface chrome.
- **Controls and actions — FAIL.** Clicking `OPEN BOOK` opens a mock Vocab 101
  reader despite the empty admitted-source map. `Place a Puffy here` has no
  save handler or read-back. Miss Jeeves reveals only admission-policy
  placeholder copy and no answer/source. Every cover button's accessible name
  is only `OPEN BOOK` or `PREVIEW · EP 5` because its image has empty alt text.
- **Accessibility — FAIL.** Focus remains on the shelf trigger after the modal
  appears; Escape does not close it; focus is not trapped; closing leaves focus
  on the now-hidden close control instead of the originating cover. Thirteen
  visible mobile controls and sixteen desktop controls have a width or height
  below 44 px. Mobile status labels render at roughly 6 px and the 15-cover
  catalogue becomes a long dense wall.
- **Visitor state — FAIL.** A generic returning/saved-finds route appears, but
  the design does not separately expose first-time, returning-without-Card,
  device-local Card and verified-account scopes or their transitions. It does
  not state the same-device boundary at the saving promise.
- **Brand/genre — BOUNDED PASS, below admission floor.** The plate avoids the
  Cycle 1 sci-fi/dashboard failure and uses the intended daylight comic
  language and real assets. Against the homepage/current Library references,
  the oversized pale title block and monumental generic hall feel calmer and
  less distinctly SUNNYVAiLE; visible product-state dishonesty prevents a
  positive brand result.

## Scores

| Gate | Score | Verdict |
| --- | ---: | --- |
| Product legibility | 13/20 | FAIL |
| Positive LAiDIES brand | 15/20 | FAIL |
| UX/accessibility | 10/20 | FAIL |
| Quality/trust | 4/20 | FAIL |
| Technical feasibility | 9/20 | FAIL |

No score can compensate for false availability, a fake save action or an
unusable modal. This candidate must not be shown to Ali as a choice.

## Evidence limits

Headless Chrome proves rendered pixels, DOM focus and deterministic
interaction only. It is not Safari, VoiceOver, native zoom, physical-device or
newcomer comprehension evidence. Google Fonts were deliberately blocked with
all other external requests; the page used local fallbacks. No public origin
was tested.

