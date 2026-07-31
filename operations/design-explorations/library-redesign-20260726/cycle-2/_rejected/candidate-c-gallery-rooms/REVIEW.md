# Independent admission review — Candidate C: Gallery Rooms

**Decision:** REJECTED · **Owner review:** NO  
**Maker:** `library_redesign_maker_cycle2`  
**Independent reviewer:** `library_redesign_independent_admission_cycle2`

## Evidence inspected

- Full-resolution 1487 × 1058 environment plate; SHA-256 matches the maker
  receipt.
- Deterministic page at 1440 × 900 and 390 × 844 in headless Google Chrome
  150 with Playwright Core 1.61.1.
- Full-page and viewport captures with external requests blocked.
- Open-book, preview-alert, collection-switch and Miss Jeeves result states at
  both viewports.
- Current homepage and current Library at the same viewports, plus the named
  approved homepage/Library references.
- Governing experience brief, functionality map, visitor-state standard,
  visual-admission protocol, Cycle 1 rejection and relevant painpoint rules.

Evidence is under `cycle-2/review-evidence/`; exact DOM/control findings are in
`capture-report.json`.

## Full visible audit

- **Words and labels — FAIL.** The initial 101s room labels Vocab and Concepts
  `OPEN BOOK`; switching rooms exposes Who's Who in AI and Straight Answers
  About AI as `OPEN BOOK`. The admitted-source map contains zero books.
  `PREVIEW · EP 5` also overwrites distinct hold/currentness states.
- **Logos, symbols and icons — PASS.** The approved header, Puffy, book-cover
  marks and Miss Jeeves art are recognizable. No generated logo, mystery
  control, app dock or sci-fi symbol appears.
- **Covers, character and objects — MIXED/FAIL.** The environment has no
  pseudo-text, people or fake product art, and actual approved shelf, cover,
  Puffy and Miss Jeeves assets are used. Their assigned availability and
  actions are false.
- **Controls and actions — FAIL.** `OPEN BOOK` opens a source-less mock reader;
  `Place a Puffy here` does nothing; Miss Jeeves reveals `Direct answer area`
  without an answer or admitted route. Book controls expose only repeated
  status text as their accessible names because cover alt text is empty.
- **Accessibility — FAIL.** The modal does not receive focus, trap focus,
  close on Escape or return focus. Twenty-one desktop controls and seventeen
  mobile controls have a width or height below 44 px; suggestion chips are
  only 27 px high and status labels are roughly 7 px.
- **Visitor state — FAIL.** The page offers a generic returning link but does
  not separately design or verify first-time, returning-without-Card,
  device-local Card and verified-account scopes or transitions. The visible
  Puffy promise does not say “on this device.”
- **Brief fidelity — FAIL.** The room selector is understandable and scales
  better than a generic card grid, but the Library identity is placed in a
  dark live-HTML overlay on top of the environment. The governing brief
  explicitly requires page identity outside the room art.
- **Brand/genre — BOUNDED PASS, below admission floor.** The environment uses
  daylight comic rendering and approved candy accents without Cycle 1's
  futuristic chrome. Compared with the homepage/current Library, the classical
  empty gallery is generic and the large navy overlay dominates the place.
  False capability states prevent a positive LAiDIES brand contribution.

## Scores

| Gate | Score | Verdict |
| --- | ---: | --- |
| Product legibility | 14/20 | FAIL |
| Positive LAiDIES brand | 14/20 | FAIL |
| UX/accessibility | 10/20 | FAIL |
| Quality/trust | 4/20 | FAIL |
| Technical feasibility | 9/20 | FAIL |

No score can compensate for false availability or unsupported actions. This
candidate must not be shown to Ali as a choice.

## Evidence limits

Headless Chrome proves rendered pixels, DOM focus and deterministic
interaction only. It is not Safari, VoiceOver, native zoom, physical-device or
newcomer comprehension evidence. Google Fonts were deliberately blocked with
all other external requests; the page used local fallbacks. No public origin
was tested.

