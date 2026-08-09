# LAiDIES Adaptive Depth Layers Contract

**Status:** DECIDED DIRECTION / SPECIFIED / NOT IMPLEMENTED

**Decision:** D-2026-08-08-107

**Backlog:** LCE-017

**Owner:** Learning System & Concepts

**Primary pilot candidate:** one admitted 101 book chapter; Library owns any
reader implementation and book production

## Visitor problem

The same intelligent reader may want a quick, complete foundation on one topic
and much greater technical depth on another. A single fixed depth either leaves
curious readers under-served or overloads readers who first need the essential
system map. Permanent beginner/intermediate/advanced labels also misdescribe
people: expertise is topic-specific and changes over time.

## One canonical item, three cumulative views

This is not three books, three articles or three sources of truth. Each learning
item has one canonical ordered source made of authored sections. Every section
declares the shallowest depth at which it appears:

| Mode | Required job | May add |
| --- | --- | --- |
| **Standard** | Deliver the complete core learning experience by itself. | Plain explanation, connected mechanism, at least one concrete everyday or work example, practical application or useful action, material limitations and human consequences, required visual explanation, recap and next step. |
| **Tell me more** | Add useful depth without correcting an omission in Standard. | More mechanism, distinctions, a second worked case, failure diagnosis, comparison, evidence detail and additional system connections. |
| **Full nerd alert!** | Go deepest while remaining understandable to a person without technical training. | Technical implementation detail, edge cases, competing definitions, evaluation methods, equations or pseudocode when taught from first principles, evidence debates, architecture interactions and specialist source notes. |

The modes are cumulative:

`Standard ⊂ Tell me more ⊂ Full nerd alert!`

Changing the meter reveals additional authored sections in their correct place.
It never swaps in an alternate explanation, silently rewrites earlier prose or
hides a correction.

## Non-negotiable Standard floor

Standard is not a summary, preview, simplified edition or boring version. It
fails if a reader needs a higher mode to:

- understand the main concept and its cause-and-effect mechanism;
- see how it appears in ordinary life or work;
- apply one useful action, judgment or practical move;
- understand a material limitation, safety boundary or human consequence;
- follow every term visible at Standard depth; or
- reach the promised “oh, I get it now” change.

Higher modes may deepen, complicate and connect. They may not repair missing
teaching, accuracy, examples, practical application or safety in Standard.

## Authoring and canonical truth

- All depths share the same concept IDs, claim IDs, sources, freshness triggers,
  corrections, examples registry and terminology.
- A section is authored and reviewed at its actual depth. No mode is generated
  live from a shorter version and no model improvises hidden sections.
- A correction updates every affected depth and invalidates all stale rendered
  variants together.
- Higher sections name their prerequisites and cannot introduce a term whose
  meaning contradicts Standard.
- Repetition is permitted only when it supports retrieval after a long gap;
  otherwise deeper sections extend the explanation instead of restating it.
- Search and Concept Index anchors resolve to one canonical location and may
  indicate that extra detail is available at a higher setting.

## Surface adaptations

The shared architecture is eligible for substantial authored learning content,
but each surface retains its cognitive job:

- **101 books and durable explainers:** reveal additional sections in the same
  chapter; this is the clearest first pilot.
- **Classes:** optional deeper mechanism, demonstrations or failure analysis may
  appear between core lesson sections. Required practice and assessment cannot
  be hidden above Standard.
- **NewsStand explainers and Tribune analysis:** may reveal deeper evidence,
  method and uncertainty sections. The dated answer and material correction
  remain visible at Standard.
- **Episode companion reading:** may add deeper written sections; the canonical
  episode film/audio does not branch invisibly.
- **Study Packs and practice:** may offer optional deeper notes or challenge
  practice, but the component's core job stays complete at Standard.
- **FAQ, microcopy, cards and compact reference:** use expandable depth only
  when it materially helps; do not manufacture three layers for every object.

No surface may use the meter to duplicate a class inside a book, hide the only
practical exercise, or become a second source of concept truth.

## Interaction contract

- Present one accessible three-position control with the exact working labels
  `Standard`, `Tell me more`, and `Full nerd alert!`.
- Default to Standard on a first visit. A person can change depth at any point
  without losing reading position.
- The control changes the current item, not the reader's identity. Any later
  saved preference is voluntary, editable, private and topic- or surface-aware;
  it cannot be treated as an ability score.
- Newly revealed sections appear in their canonical reading position and are
  visibly identified as added depth without looking locked or remedial.
- Keyboard, screen-reader and reduced-motion use receive the same control and
  an announcement of what changed. Focus does not jump when sections appear.
- Contents, progress and time-to-read update truthfully for the selected depth.
- Print/download declares the chosen depth and includes all lower-depth
  sections. Sources and corrections are never excluded.
- Without JavaScript, Standard remains complete and readable; implementation
  must not expose all layers as an undifferentiated wall by accident.

## Admission evidence

Before a surface implements the system, one representative chapter or
explanation must prove:

1. unfamiliar nontechnical readers understand and can apply Standard without
   opening a higher mode;
2. Tell me more adds measurable explanatory value rather than repetition;
3. Full nerd alert! remains understandable and technically accurate;
4. switching preserves place, comprehension, accessibility and correction
   truth;
5. every mode is derived deterministically from the same canonical source; and
6. the full authored and freshness burden is sustainable for the owner.

Measure mode changes and section completion only as privacy-safe aggregate
behaviour. A click on Full nerd alert! is curiosity evidence, not proof of
expertise or comprehension.

## Failure states

Hold the implementation if:

- Standard lacks an example, practical application, connected mechanism or
  material safety/consequence;
- deeper content contradicts, replaces or repairs Standard;
- the modes are separate prose copies with independent freshness paths;
- content is generated on demand;
- a mode is framed as a learner rank or permanent skill level;
- the toggle loses reading position or is inaccessible;
- deeper sections merely add jargon, citations or length; or
- the surface owner cannot maintain and correct all visible layers.

## Ownership and next trigger

Learning System & Concepts owns the shared section-depth semantics, canonical
truth and cross-surface measurement. Library, Classes, Weekly Episodes,
NewsStand and each practice/tool owner decide whether their product has a real
visitor job for the pattern and own implementation, production and admission.

No implementation is commissioned by this decision. Next trigger: a surface
owner proposes one exact substantial learning item as the representative pilot,
with authored Standard/Tell me more/Full nerd alert! section maps and a viable
maintenance owner.
