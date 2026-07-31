# SUNNYVAiLE Tour Guide companion

**Status:** DRAFT SPEC — DIRECTION CAPTURED; NOT DESIGNED OR BUILT  
**Owner:** Ali (character and experience ruling) · Codex (product architecture,
source integrity and implementation sequencing)  
**Triage:** MERGE with the existing Welcome Tour, Visitor’s Centre, shared
navigation and content catalogue

## The existing promise

The Tour Guide is not a new character invented for a floating chat widget.
She already exists in the SUNNYVAiLE experience:

- Episode 00/trailer narration says the Full Tour is tracked by “your Tour
  Guide,” who checks off each stop.
- `content/site/sv-welcome-tour.js` already labels its live surface
  `Welcome Tour guide`, stores progress, responds when a visitor wanders
  off-route and celebrates completion.
- `operations/trailer-comic-storyboard.md` already assigns the Tour Guide a
  lanyard, clipboard and map role, while explicitly recording that her
  permanent design is not locked.

The companion feature gives this existing role a consistent face, voice and
useful life outside the formal tour.

## Product promise

The Tour Guide helps a visitor answer:

1. Where am I?
2. Where is the thing I want?
3. What is worth discovering next?
4. What did I just accomplish?

She reduces overwhelm without flattening the town into a directory. She is a
guide with a map and receipts—not a general-purpose chatbot that pretends to
know everything.

## Her four jobs

### 1. Formal tour escort

Preserve the existing opt-in Welcome Tour behaviour:

- start only when requested;
- explain the current stop;
- offer the next stop;
- respond gently when the visitor wanders;
- allow pause, dismissal and completion; and
- never guilt a visitor into finishing.

### 2. Town wayfinding

Answer common navigation questions with one direct answer and one working
destination:

- “Where is the latest episode?”
- “Where is Girl Talk?”
- “How do I take the quiz?”
- “Where are the songs?”
- “Where can I look up hallucination?”

The answer must come from the same structured catalogue and status authority
used by navigation. A natural-language layer may interpret the wording later;
it must not invent the destination, availability or label.

### 3. Verified discovery

Offer occasional, dismissible “Did you know?” moments from a project-owned fact
bank:

- sourced women-in-computing history;
- a useful AI lesson or definition;
- a real feature the visitor may not have found; or
- a new episode, class, song or town experience that is actually available.

Every factual card needs a source authority and, when freshness can change, a
checked date. Every feature card needs a real route and current availability
state.

### 4. Meaningful reactions

Recognize a small set of explicit events with a short, specific response:

- formal tour started, paused, resumed or completed;
- weekly tour stop checked in;
- Express Tour completed;
- Full Wednesday Ritual completed;
- first episode opened or newest episode opened;
- quiz completed;
- verified charm discovered;
- real reward earned or redeemed;
- meaningful feedback filed; and
- return visit when something genuinely new exists.

Examples:

- “First tape off the shelf. Excellent choice.”
- “You passed the quiz. Permanent-record material.”
- “Three buildings without asking directions. I’ll pretend not to be
  professionally threatened.”
- “The newest episode is waiting at The Chick Flicks. Want the direct route?”

## Existing event foundation

The site already emits several useful client-side events:

| Existing event | Current source | Possible Tour Guide use |
|---|---|---|
| `sv:tour-checkin` | `content/site/sv-tour-checkin.js` | Recognize a meaningful weekly stop and, sparingly, suggest the next useful stop |
| `sv:express-complete` | `content/site/sv-tour-checkin.js` | Celebrate completion of the four learning stops |
| `sv:ritual-complete` | `content/site/sv-tour-checkin.js` | Celebrate the full eight-stop weekly ritual and explain the real reward |
| `charmhunt:found` | `content/site/charm-hunt.js` | Recognize a verified charm discovery |
| `charmhunt:week-unlocked` | `content/site/charm-hunt.js` | Explain that a new weekly charm is available without revealing its location |
| `laidies:clip-redeem` | `content/site/clip-bank.js` | Confirm a real redemption and where the result appears |
| `laidies:town-hall-feedback-filed` | `town-hall.html` | Thank the visitor once, without exposing the feedback content |

Missing events should be added through one shared vocabulary rather than
wiring bespoke Tour Guide code into every page.

## Proposed shared event envelope

```js
document.dispatchEvent(new CustomEvent('laidies:activity', {
  detail: {
    type: 'quiz.completed',
    entityId: 'issue-04',
    label: 'The Founding Mothers',
    occurredAt: '2026-07-24T00:00:00.000Z',
    source: 'quiz'
  }
}));
```

Rules:

- `type`, `entityId`, `occurredAt` and `source` describe an explicit project
  event; they do not infer emotion, ability, identity or intent.
- Do not include prompt text, quiz answers, feedback copy, email addresses or
  other private content.
- Existing events may be adapted into this envelope by one compatibility
  layer; do not rewrite every working feature at once.
- Duplicate events must be safe. The companion owns reaction deduplication.

## Reaction policy

### Eligible

A reaction must do at least one of:

- recognize a real accomplishment;
- explain a real reward or state change;
- provide the next useful route;
- reveal optional, relevant depth; or
- deliver a short LAiDIES encouragement beat.

### Ineligible

Do not react to:

- ordinary clicks, scrolling or time on page;
- unfinished text or form inputs;
- mistakes while someone is still working;
- inactivity or absence with guilt language;
- inferred mood, competence, age, job, identity or personal circumstances; or
- private user content.

### Frequency

- Never show more than one unsolicited reaction from one action.
- Deduplicate the same reaction across visits.
- Apply a cooldown between unsolicited appearances.
- Direct questions and an explicitly opened guide are not subject to the same
  cooldown.
- The visitor can mute reactions while retaining manual wayfinding.

## State and privacy

The first version can remain browser-local and anonymous:

- formal tour progress already uses `laidies_welcome_tour`;
- weekly ritual progress already uses `laidies_tour_<week>`;
- companion preferences should store only mute/collapse state, reaction IDs
  already shown and fact IDs already seen; and
- no cross-device promise is made until authenticated sync actually exists.

Do not store the visitor's question history by default. Do not send questions
to an external model merely to answer known site-navigation queries.

## Accessibility and obstruction rules

- The companion is optional, dismissible and keyboard reachable.
- It has a clear accessible name: `SUNNYVAiLE Tour Guide`.
- Reactions use a polite live region and never steal focus.
- Manual questions return focus to the answer; opening a destination follows
  normal link behaviour.
- Motion respects `prefers-reduced-motion`.
- No unsolicited audio.
- Desktop, mobile, captions, forms and reading surfaces require separate
  collision checks.
- The closed state must remain useful but visually quiet.

## V1 boundary

The smallest useful version should contain:

1. the existing formal Welcome Tour;
2. manual wayfinding for 10–15 high-frequency questions;
3. a verified 12-card “Did you know?” bank;
4. six event-triggered reaction families built on existing events;
5. mute, collapse, seen and cooldown state; and
6. direct handoffs to Miss Jeeves, the Visitor’s Centre and the current weekly
   route.

V1 should not include:

- an open-ended AI personality;
- server-side profiles or behavioural scoring;
- new rewards created merely for using the guide;
- character voice/audio;
- automatic cross-page conversation history; or
- a site-wide install before one-page obstruction and answer-accuracy QA.

## Information authorities

| Question | Authority |
|---|---|
| Latest published episode | `content/episode-index.json` |
| Building name, route and availability | reconciled town/navigation catalogue |
| Welcome Tour state | `content/site/sv-welcome-tour.js` |
| Weekly route/reward state | `content/site/sv-tour-checkin.js` |
| AI definitions and sourced answers | LIBRAiRY/Miss Jeeves sources |
| Women-in-computing facts | `operations/facts-and-citations-ledger.md` plus the public content source it supports |
| Reward ownership and balance | existing reward/Clip authorities; never companion copy alone |

## Design gate

The Tour Guide has a functional role but no locked permanent design. Before
implementation:

1. recover the B25 map/clipboard/lanyard visual requirements;
2. create exactly three character/interface directions grounded in the locked
   LAiDIES character and comic system;
3. show closed, speaking and celebrating states for each direction;
4. select one direction; and
5. build one-page behaviour only after that ruling.

Do not copy the Codex browser mascot. The useful reference is its compact,
friendly, collapsible presence—not its character identity or artwork.

## Dependencies and sequence

1. Finish the current Library/Visitor’s Centre owner ruling.
2. Reconcile one site/navigation catalogue with honest feature statuses.
3. Approve this V1 behaviour boundary.
4. Select the three-direction visual brief and permanent character.
5. Build the compatibility event layer and static wayfinding/fact data.
6. Prototype on the Visitor’s Centre first.
7. Test reaction accuracy, obstruction, dismissal, keyboard, reduced-motion,
   mobile and repeat-visit behaviour.
8. Only then decide whether site-wide installation belongs in the launch
   release or a later weekly release.

## Success test

In a clean-browser test, a new visitor can:

- ask where the latest episode or Girl Talk lives and arrive there;
- receive no false route or unavailable-feature promise;
- understand one sourced “Did you know?” card;
- complete one meaningful action and receive at most one relevant reaction;
- mute or dismiss the companion; and
- continue reading, listening, watching or completing a form without
  obstruction.
