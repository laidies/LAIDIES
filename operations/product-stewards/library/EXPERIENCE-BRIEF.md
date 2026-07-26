# SUNNYVAiLE LIBRAiRY experience brief

**Status:** INTENT RECOVERED — STRUCTURE OWNER DECISION OPEN
**Building owner:** LIBRAiRY product champion
**Brand & Experience Director:** review pending
**Functionality & Platform Director:** feasibility review pending

## Stable promise and user outcome

The LIBRAiRY makes a visitor more capable with AI by helping her find the right
durable reference, understand it, keep an exact useful place and recover it
later. `ALI CONFIRMED` `APPROVED BRIEF/ARTIFACT`

It is a building experience, not a decorative hero followed by an unrelated
catalogue. Entering should feel like entering the Library; the shelves and
books are part of the interface. `ALI CONFIRMED`

## Audience and visitor jobs

- A newcomer must quickly understand everything she can do: browse books,
  choose a collection, ask Miss Jeeves, save a book or section with a Puffy,
  and reach saved finds or the next relevant building. `ALI CONFIRMED`
- A returning visitor must be able to resume from a same-device saved place
  and see the current availability state. `APPROVED BRIEF/ARTIFACT`
- The Library provides durable conceptual/reference value; High teaches in
  sequence, episodes demonstrate and narrate, NewsStand handles timely
  evidence, and FAiRY provides bounded personal help. `ALI CONFIRMED`

## Place metaphor, feeling and ritual

The visitor enters a vibrant SUNNYVAiLE public Library with a recognizable
librarian, real shelves and books she can pull. The ritual is
`enter → orient → browse or ask → open → understand → Puffy-save → continue`.
`ALI CONFIRMED` `APPROVED BRIEF/ARTIFACT`

The site currently has a painterly, vibrant town while episode media uses an
adult comic/graphic-novel language. The final sitewide relationship remains an
owner decision; the Library may not decide it by accident. `ALI CONFIRMED`

## Complete owned product tree

- `/library.html`: arrival, orientation, collections, shelf catalogue, search,
  reader and save entry. `CURRENT IMPLEMENTATION OBSERVED`
- rendered Library books and their editorial admission/currency. `APPROVED BRIEF/ARTIFACT`
- Ask Miss Jeeves. `ALI CONFIRMED`
- whole-book and exact-section Puffy saves plus retrieval in the Closet.
  `ALI CONFIRMED`
- retired Grimoire redirects and the distinction from the current town
  handbook. `APPROVED BRIEF/ARTIFACT`

## Component and object-to-action map

| Object/component | Action and location | State/result/next step | Provenance |
| --- | --- | --- | --- |
| Room arrival | Establishes place before interaction | Visitor recognizes the LIBRAiRY | `ALI CONFIRMED` |
| Collection shelves | Filter/choose a durable reference job | Relevant books remain on/in the shelf system | `ALI CONFIRMED` |
| Book cover/spine | Opens an admitted book or explains a hold | In-place reader or honest status; return to exact opener | `ALI CONFIRMED` `APPROVED BRIEF/ARTIFACT` |
| Miss Jeeves/reference desk | Ask a plain-language question | Direct bounded answer plus useful admitted routes | `ALI CONFIRMED` |
| Puffy control on book/section | Save exact useful place | Device-local confirmation; reopen/remove in Closet | `ALI CONFIRMED` |
| Saved-finds route | Opens Closet/Puffy board | Resume exact valid location or current hold state | `ALI CONFIRMED` |
| Collection/filter rail | Scales discovery as inventory grows | Filtered shelf state with reversible “all” view | `INFERENCE` |

No legible header, navigation, status, instructions or control text is baked
into generated room art; live HTML owns it. `ALI CONFIRMED`

## Required content and inventory

Only editorially admitted books may open. Preview/hold inventory remains
visible only when its status is unmistakable and a useful alternative exists.
`APPROVED BRIEF/ARTIFACT`

The current newer `bright-family-v2` book colours are the applicable book
family. `ALI CONFIRMED`

The shelf system must visibly allow substantial future inventory without
rebuilding the arrival image. `ALI CONFIRMED`

## Journeys

- **Primary:** arrive → understand capabilities → browse a collection or ask
  Miss Jeeves → open admitted book → navigate sections → Puffy-save → continue.
  `ALI CONFIRMED`
- **Exploration:** change collection/filter, inspect status, open related
  Library or cross-building destinations. `INFERENCE`
- **Return:** open saved finds → validate current route/status → resume/remove.
  `APPROVED BRIEF/ARTIFACT`
- **Failure:** held content never opens; failed loads offer explicit retry;
  failed local writes never paint success; empty search explains what to try
  next. `APPROVED BRIEF/ARTIFACT`

## Cross-building relationships and handbacks

Library concepts may route to deeper High instruction, an episode
demonstration, current NewsStand evidence or bounded FAiRY help; those products
return the visitor to the exact useful Library reference when appropriate.
`ALI CONFIRMED`

Puffy saves hand back to the Closet as device-local state until verified
account sync exists. `ALI CONFIRMED`

## Platform contracts consumed

- Saves/progression: canonicalized device-local Puffy records today.
  `CURRENT IMPLEMENTATION OBSERVED`
- Identity/account: no signed-in or cross-device difference may be claimed.
  `CURRENT IMPLEMENTATION OBSERVED`
- AI/search quality: Miss Jeeves uses the Library/site index and must obey
  publication state. `APPROVED BRIEF/ARTIFACT`
- Analytics: controlled aggregate outcomes only; no raw questions, reading
  text or saved-purpose labels. `APPROVED BRIEF/ARTIFACT`
- Editorial/correction service: an exact claim/book correction route is still
  missing. `CURRENT IMPLEMENTATION OBSERVED`

## Brand invariants and building freedoms

Invariants: LAiDIES identity, vibrant candy accent family, readable live UI,
honest state, no fake generated text, approved character continuity,
accessible controls and shared navigation/save grammar. `ALI CONFIRMED`

Library freedoms: architecture, shelf geometry, the relationship between
stacks and desk, collection wayfinding and the quiet-versus-vibrant balance,
subject to the sitewide brand ruling. `INFERENCE`

The current white/pink over-image header treatment is rejected. Page identity
must sit outside the room art; the colour treatment should test richer
versions of the homepage's candy accents. `ALI CONFIRMED`

Individual book spotlights are rejected as visually out of place. Use coherent
room light or integrated shelf-edge illumination. `ALI CONFIRMED`

## Desktop, mobile, accessibility, motion and audio

Desktop must make room, books and Miss Jeeves visible without hiding the
instructions. Mobile must restack or filter the real shelf inventory rather
than shrink the desktop room into untappable hotspots. `ALI CONFIRMED`

Keyboard, focus return, reader dialog behaviour, reduced motion, 200% reflow,
320/390px layouts and native screen-reader verification remain required.
`APPROVED BRIEF/ARTIFACT`

No ambient audio is required. `INFERENCE`

## Launch acceptance scenes

1. A newcomer names all core capabilities and opens an admitted book without
   instruction from Ali. `ALI CONFIRMED`
2. The newcomer asks Miss Jeeves, receives a useful bounded answer and reaches
   a working destination. `ALI CONFIRMED`
3. The visitor saves an exact section, opens saved finds, resumes it and
   removes it on the same device. `ALI CONFIRMED`
4. A returning visitor sees an honest changed/held state rather than stale
   content. `APPROVED BRIEF/ARTIFACT`
5. Keyboard/mobile/screen-reader visitors complete the same outcome.
   `APPROVED BRIEF/ARTIFACT`

## Unresolved decisions and non-goals

- Owner decision: choose Library structure A, B, C or none after reviewing the
  three comparable capability-preserving options. `UNKNOWN`
- Sitewide brand/artwork ruling remains a separate competition. `ALI CONFIRMED`
- Non-goals: generic card-grid catalogue, a whole-site chatbot, false account
  sync, fake availability, and making every building structurally resemble
  the Library. `ALI CONFIRMED`
