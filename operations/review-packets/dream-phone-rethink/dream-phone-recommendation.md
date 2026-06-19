# Dream Phone Recommendation

Date: 2026-06-19

Status: do not proceed to implementation yet.

Live Dream Phone files were not edited. No staging, commit, push, or `git add` was performed.

## Recommendation

Do not implement Dream Phone yet.

Do not create another polished review packet for Ali yet.

Recommended direction for internal next step:

> Concept A: Hotline Desk.

Why:

- It satisfies the requirement to design both Quick Call and Play The Game.
- Quick Call delivers immediate useful value.
- Play The Game has a real three-clue resolver model instead of decorative clue copy.
- It preserves the original Dream Phone spirit: phone, calls, clues, tracking surface, special cards, surprise.
- It keeps LAiDIES content centered on career / AI fluency instead of dating.

## Product Model Summary

Dream Phone should become a hotline desk with two clear paths:

1. Quick Call:
   - pick need/caller,
   - connect call,
   - get caller-specific advice,
   - remix it,
   - call someone else.
2. Play The Game:
   - call three people,
   - collect three useful clues,
   - reveal the type of help needed today,
   - get a next move.

## Quick Call Summary

Quick Call works if:

- the first action is a need chip, `Surprise Me`, or featured caller;
- the user gets advice immediately;
- the selected caller remains visually connected to the Receipt Pad;
- remix cards modify the active caller's advice;
- the user can open a full directory without being forced into it.

Return reason:

- one useful call per real work problem,
- weekly or daily Surprise Me call,
- remixable advice,
- hidden charm discovery.

## Play The Game Summary

Play The Game works if:

- the user understands the goal in one sentence;
- each clue points to outcome tags;
- progress is visible;
- the reveal explains why it chose the outcome;
- the final recommendation is useful enough to justify three calls.

Return reason:

- different caller combinations,
- different reveal outcomes,
- charm discoveries,
- fun diagnostic ritual.

## Caller Advice Model

Caller advice should be role-specific:

- Founder: strategy, priority, taste.
- Boss: executive framing, decision, leadership.
- Icon: confidence, read the room, polish.
- Psychic: patterns, intuition plus receipts.
- Wishmaker: prompt magic, better asks.
- Receipts: evidence, sources, verification.
- AI Help: tool use, prompt structure, hallucination checks.

Bad output:

- generic inspiration.
- random fortunes.
- same advice under different caller names.

Good output:

> "Of course Receipts would say that."

## Remix Model

Remix cards modify the active advice or clue:

- `Share a Secret`: bestie/private version.
- `Speaker Phone`: work/meeting version.
- `Mom Says Hang Up`: one decisive next step.

They must not generate unrelated content.

## Jenny / 867

Both modes support the same hidden Easter egg:

- dial `867-5309`;
- unlock `867 Club Charm`;
- do not reveal the full number before discovery;
- use the hint:

```text
Dial a caller number, or try Jenny if you know her number.
```

Do not claim backend persistence until it exists.

## Concepts Considered

### Concept A: Hotline Desk

Best complete direction.

Council:

- Quick Call: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Play The Game: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Overall: `REVISE INTERNALLY - DO NOT SEND TO ALI`

Why:

- Product model is strongest.
- Needs prototype validation and asset resolution.

### Concept B: Call First, Game Later

Best fallback implementation sequence.

Council:

- Quick Call: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Play The Game: `REJECT / PARK`
- Overall: `REVISE INTERNALLY - DO NOT SEND TO ALI`

Why:

- Safer but does not satisfy the full two-mode requirement now.

### Concept C: Full Clue Game First

Not recommended.

Council:

- Quick Call: `REVISE INTERNALLY - DO NOT SEND TO ALI`
- Play The Game: `REJECT / PARK`
- Overall: `REJECT / PARK`

Why:

- Centers the riskiest mode.
- Likely to repeat confusing-game failure.

## Council Result

No concept passes `PASS FOR ALI REVIEW`.

No concept passes `PASS FOR IMPLEMENTATION`.

Therefore:

- no mockups were created;
- no implementation should proceed;
- no Ali approval request should be made from this packet.

## Internal Next Step

Build one low-fidelity internal prototype for Concept A only, not polished review art.

Required prototype states:

- entry choice,
- Quick Call initial,
- Quick Call connected,
- Quick Call remix,
- Play The Game start,
- Clue 1 saved,
- Clue 2 saved,
- Clue 3 saved,
- Reveal unlocked,
- Reveal result,
- Jenny / 867 reward.

Prototype pass criteria:

- all taps work;
- mobile first action is clear;
- result is visible without excessive scroll;
- Play The Game is understandable without a document;
- no CSS-only phone as production direction;
- Council can honestly decide whether it is worth showing Ali.

Until then:

> Do not proceed yet.
