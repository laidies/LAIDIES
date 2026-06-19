# Dream Phone Product Concepts

Date: 2026-06-19

Status: internal concept exploration. Not for Ali review yet.

Live Dream Phone files were not edited. No staging, commit, push, or `git add` was performed.

## Evaluation Lens

Each concept is judged on:

- 10-second clarity.
- Mobile value before scroll.
- Caller-specific usefulness.
- Dream Phone inspiration without dating/crush clone.
- LAiDIES object-world quality.
- Replay value.
- Build risk.
- Whether it can pass the strict Council gate.

## Concept A: Hotline Desk

Core idea:

Dream Phone is a hotline desk with two clear paths:

- Quick Call: direct useful advice.
- Play The Game: three clues and a reveal.

First screen:

> What kind of call do you need?

Primary mode cards:

- `Quick Call`: Get one useful take now.
- `Play The Game`: Call three people and reveal the help you need today.

Visual model:

- Production-quality blush/plum hotline desk.
- Dream Phone object.
- Receipt Pad.
- Featured caller cards.
- Special cards as physical cards.
- Charm tray for 867 Club Charm.

### Quick Call In Concept A

First action:

- Tap a need chip, `Surprise Me`, featured caller, or directory.

Immediate result:

- Phone connects.
- Active caller glows.
- Receipt Pad shows caller-specific advice.
- Remix cards unlock.

Value:

- Fast, practical advice with LAiDIES voice.

Replay:

- Different caller / need / remix / Surprise Me.

Risk:

- Needs careful mobile layout.
- Needs real phone object asset.

### Play The Game In Concept A

First action:

- Tap `Start Game`, `Surprise Me`, or first caller.

Immediate result:

- Clue 1 saved to Receipt Pad.

Value:

- Three calls reveal the type of help needed today.

Replay:

- Different clue combinations produce different outcomes.

Risk:

- Resolver must feel real.
- Progress must remain visible.
- Game must not take too long.

### Concept A Verdict

Strongest complete product model.

Council status:

- Quick Call: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Play The Game: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Overall: `REVISE INTERNALLY - DO NOT SEND TO ALI`

Why not pass yet:

- No functional prototype has validated taps, state changes, or mobile layout.
- Final phone asset is unresolved.
- Play The Game logic is promising but untested.

Recommended next step:

- Build an internal low-fidelity functional prototype for Concept A only.
- Do not create polished visual mockups yet.

## Concept B: Call First, Game Later

Core idea:

Ship the product around Quick Call first. Play The Game remains a locked / future bonus mode until it earns its keep.

First screen:

> Call someone who gets it.

Primary action:

- `Quick Call`.

Secondary tease:

- `Play The Game - coming later when the hotline is ready.`

Visual model:

- Strong hotline object-world.
- Need-first call selection.
- Smaller caller set.
- Full directory optional.

### Quick Call In Concept B

First action:

- Pick need or `Surprise Me`.

Immediate result:

- Caller advice appears.

Value:

- Most useful path with least complexity.

Replay:

- Daily/weekly call, caller rotation, remix cards.

Risk:

- Could fail the "must design both" requirement for this current rethink.

### Play The Game In Concept B

Status:

- Parked as future, not designed as current mode.

Risk:

- Does not satisfy the brief's requirement to design both paths now.

### Concept B Verdict

Best implementation sequence if Concept A later proves too heavy.

Council status:

- Quick Call: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Play The Game: `REJECT / PARK` for this concept
- Overall: `REVISE INTERNALLY - DO NOT SEND TO ALI`

Why not pass yet:

- It intentionally delays Play The Game.
- No validated prototype.
- Phone asset unresolved.

Recommended next step:

- Keep as fallback if Play The Game cannot pass internal prototype testing.

## Concept C: Full Clue Game First

Core idea:

Dream Phone opens as the three-call clue game. Quick Call exists as a utility shortcut.

First screen:

> Call three people. Reveal your next move.

### Quick Call In Concept C

Status:

- Secondary shortcut.

Risk:

- The fastest value path is buried.

### Play The Game In Concept C

First action:

- Start game.

Immediate result:

- First clue saved.

Value:

- Stronger nostalgia, but higher effort.

Risk:

- Repeats the previous failure if clue logic is not immediately obvious.
- Too much cognitive load on first visit.
- Mobile may feel slow before value.

### Concept C Verdict

Not recommended.

Council status:

- Quick Call: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Play The Game: `REJECT / PARK`
- Overall: `REJECT / PARK`

Why:

- It centers the riskiest path.
- It undercuts the practical-advice promise.
- It is most likely to need long instructions.

## Strongest Concept

Concept A: `Hotline Desk`.

Reason:

- It satisfies the brief by designing both modes.
- It preserves the practical utility of Quick Call.
- It gives Play The Game a real clue/resolver model.
- It keeps original Dream Phone mechanics without dating/crush framing.

Current status:

- Not ready for Ali review.
- Not ready for implementation.
- Worth prototyping internally.
