# Independent admission review — Candidate B: Rotunda Loop

**Decision:** REJECTED · **Owner review:** NO  
**Maker:** `library_redesign_maker_cycle2`  
**Independent reviewer:** `library_redesign_independent_admission_cycle2`

## Evidence inspected

- Full-resolution 1505 × 1045 environment plate; SHA-256 matches the maker
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

- **Words and labels — FAIL.** Vocab 101, Concepts 101, Who's Who in AI and
  Straight Answers About AI are labelled `OPEN BOOK` although the authoritative
  admitted-source map is empty. `PREVIEW · EP 5` incorrectly collapses distinct
  editorial holds and release dependencies.
- **Logos, symbols and icons — PASS.** The real LAiDIES header, Puffy, covers
  and Miss Jeeves are used. No mystery symbol, fake logo, app dock or
  futuristic chrome appears. The rotunda and rail details are environmental,
  not controls.
- **Covers, character and objects — MIXED/FAIL.** Approved project assets
  replace generated product substitutes, and the environment plate itself has
  no words, covers, people or pseudo-interface. Real covers are still assigned
  false status and action.
- **Controls and actions — FAIL.** `OPEN BOOK` opens a source-less mock Vocab
  101 reader. `Place a Puffy here` is inert. Miss Jeeves claims she “answers
  directly from the admitted catalogue” but returns only `Direct answer area`
  policy copy with no answer or source. Cover controls expose repeated status
  text instead of the title as their accessible name.
- **Responsive UX — FAIL.** The ring is a horizontally clipped track with no
  visible scroll controls or collection-position feedback. Eight operable
  covers are outside the desktop viewport and eleven are outside the mobile
  viewport in the initial state. The page reports no document overflow only
  because the carousel clips/scrolls internally. The `Reference` filter is
  visibly cut at 390 px.
- **Accessibility — FAIL.** The modal does not receive focus, trap focus,
  close on Escape or return focus to the triggering cover. Twenty-one desktop
  controls and eighteen mobile controls have a width or height below 44 px;
  suggested-question and filter controls are 30–33 px high.
- **Visitor state — FAIL.** This option correctly says Puffy records are “on
  this device” in the later ritual, but it does not separately design or verify
  first-time, returning-without-Card, device-local Card and verified-account
  scopes or their transitions.
- **Brand/genre — BOUNDED PASS, below admission floor.** This is the strongest
  of the three at avoiding Cycle 1's wrong genre: daylight comic rendering,
  approved assets and candy accents fit the references. The monumental empty
  rotunda remains generic until UI is overlaid, and the pale carousel has less
  visual confidence than the homepage/current Library. Trust failures prevent
  a positive LAiDIES result.

## Scores

| Gate | Score | Verdict |
| --- | ---: | --- |
| Product legibility | 12/20 | FAIL |
| Positive LAiDIES brand | 16/20 | FAIL |
| UX/accessibility | 8/20 | FAIL |
| Quality/trust | 4/20 | FAIL |
| Technical feasibility | 8/20 | FAIL |

No score can compensate for false availability, fake actions or hidden
operable inventory. This candidate must not be shown to Ali as a choice.

## Evidence limits

Headless Chrome proves rendered pixels, DOM focus and deterministic
interaction only. It is not Safari, VoiceOver, native zoom, physical-device or
newcomer comprehension evidence. Google Fonts were deliberately blocked with
all other external requests; the page used local fallbacks. No public origin
was tested.

