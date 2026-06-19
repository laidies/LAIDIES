# Dream Phone Product Model

Date: 2026-06-19

Status: internal product model. Not approved for implementation. Not for Ali review yet.

Live Dream Phone files were not edited. No staging, commit, push, or `git add` was performed.

## Product Question

What should Dream Phone do for a LAiDIES user, and why would she come back?

Best answer:

Dream Phone should be a playful hotline that helps a user figure out what kind of work help she needs, then gives her a useful, funny, caller-specific next move.

It should support two moods:

1. `Quick Call`: "I want one useful take now."
2. `Play The Game`: "I want the nostalgic clue experience and a reveal."

## North Star

User reaction:

> Wow, that was amazing. I can't believe she made this.

Return reason:

> That was fun, useful, and I want to come back.

## Shared Product System

Both modes use:

- A production-quality Dream Phone object.
- Caller cards.
- Caller-specific advice logic.
- A Receipt Pad.
- Special cards.
- Jenny / 867 Easter egg.
- Charm/reward language that does not fake backend persistence.

## Entry Model

First screen question:

> What kind of call do you need?

Two paths:

| Path | Promise | Best For |
| --- | --- | --- |
| Quick Call | Pick a caller or need. Get their take. Remix it if you want. | Immediate practical advice. |
| Play The Game | Call three people. Collect clues. Reveal what kind of help you need today. | Nostalgic, replayable, game-like self-diagnosis. |

Quick Call should be visually primary because it creates value fastest.

Play The Game should be present, but framed as the fun mode, not the default.

## Mode 1: Quick Call

User promise:

> Pick who you want to call. Get their take. Remix it if you want.

### First Action

User chooses one:

- Tap a need chip: `Better Prompt`, `Receipts Check`, `Boss Take`, `Confidence Read`, `Stop Overthinking`.
- Tap `Surprise Me`.
- Tap a featured caller.
- Open full phone book.
- Dial a visible caller number.

Recommended first-screen order on mobile:

1. Promise.
2. Need chips / Surprise Me.
3. 5-8 recommended callers.
4. Receipt Pad preview.
5. Phone book drawer.
6. Dialpad.

### Immediate Feedback

After tap:

- Phone glows / line connects.
- Caller card becomes active.
- Receipt Pad changes to `Connected to [Caller]`.
- Advice appears in the same viewport when possible.
- Remix cards become enabled.

### Output

Output format:

- Caller identity.
- Caller role.
- One caller-specific take.
- One "why this matters" line.
- Three remix cards.

Example:

```text
Receipts says:
Before you forward that answer, check the source, the date, and the claim that would matter if it were wrong.

Why this matters:
The vibe can be right and the citation can still be fake.
```

### Next Actions

User can:

- Pull `Share a Secret`.
- Pull `Speaker Phone`.
- Pull `Mom Says Hang Up`.
- Call someone else.
- Open full phone book.
- Dial Jenny if she knows the number.

### Replay Value

- Different caller = different lens.
- Same caller can rotate through a small bank of role-specific takes.
- Remix cards make a useful second output.
- Surprise Me can become a daily/weekly ritual.
- Hidden charms can reward exploration without blocking use.

### What Could Break

- Caller tap does nothing.
- Result appears below the fold.
- Remix ignores caller role.
- Directory becomes overwhelming.
- Caller imagery crops heads.
- Output becomes generic.

### Council Risk

Quick Call is the strongest product path but still needs:

- A better mobile layout than previous attempts.
- A real production phone/object asset.
- Functional prototype validation.
- Better output schema before implementation.

## Mode 2: Play The Game

User promise:

> Call three people. Collect three clues. Reveal what kind of help you need today.

### Why The User Wants Clues

The clues diagnose the type of help needed:

- Evidence / source check.
- Better prompt.
- More context.
- Boundary / decision.
- Human review.
- Stop overthinking.
- Cleaner ask.

The user is not solving a crush. She is discovering the correct next support move.

### First Action

User enters Play The Game and sees:

```text
Call three people.
Each caller gives one clue.
After three clues, Dream Phone reveals the kind of help you need today.
```

Primary actions:

- `Start with Surprise Me`.
- `Pick first caller`.
- `Dial a caller number`.

### Game Loop

1. User calls Caller 1.
2. Caller gives Clue 1.
3. Receipt Pad saves Clue 1 and its signal tags.
4. User calls Caller 2.
5. Caller gives Clue 2.
6. Receipt Pad saves Clue 2 and updates the pattern.
7. User calls Caller 3.
8. Caller gives Clue 3.
9. Receipt Pad saves Clue 3.
10. Reveal unlocks.
11. User taps Reveal.
12. Dream Phone shows outcome and next move.

### Clue Output

A clue must do three jobs:

- Sound like the caller.
- Point to one or more outcome tags.
- Be useful even before the final reveal.

Example:

```text
Clue 1 from Receipts:
If the answer has no source, no date, and no uncertainty, it is wearing borrowed confidence.

Signals:
Evidence + Human Review
```

### Reveal Logic

The simplest resolver:

- Each caller has a default weight map.
- Each clue contributes 1-2 outcome tags.
- After three clues, the system totals tags.
- Highest score wins.
- Tie breaker:
  1. user-selected need if present,
  2. most recent clue,
  3. safety-first outcome: Human Review or Receipts.

Outcome must show its reasoning:

```text
Reveal:
You need Receipts.

Why:
Two clues pointed to evidence, source-checking, and human review.

Next move:
Verify one claim, one source, and one date before this leaves your drafts.
```

### Play Outcomes

- You need Receipts.
- You need a Better Prompt.
- You need Context.
- You need Boundaries.
- You need Human Review.
- You need to Stop Overthinking.
- You need the Elle Woods Check.
- You need the Miranda Pass.
- You need a Cleaner Ask.
- You need a Second Source.

### Special Cards In Play The Game

Special cards should affect clue interpretation, not become random remixes.

| Card | Game Effect |
| --- | --- |
| Share a Secret | Converts the active clue into a bestie/private interpretation. |
| Speaker Phone | Converts the active clue into a room-ready or meeting-ready line. |
| Mom Says Hang Up | Stops the spiral and recommends the next caller or unlocks a decisive next step after reveal. |

### Replay Value

- Different three-caller combinations produce different reveals.
- Surprise Me makes it feel like the hotline chose the clues.
- A weekly "today's signal" version could return users without requiring accounts.
- Charm discovery can reward curiosity.

### What Could Break

- Clues feel random.
- Reveal feels arbitrary.
- User does not understand why three calls are worth it.
- Game takes too long on mobile.
- Progress is below the fold.
- Special cards feel bolted on.

### Council Risk

Play The Game is more promising with actual resolver logic, but it is still the risky mode. It needs a low-fidelity functional prototype before anyone can call it ready.

## Jenny / 867 In Both Modes

Behavior:

- User can dial `867-5309` in Quick Call.
- User can dial `867-5309` in Play The Game.
- The number is not visible before discovery.
- Public hint:

```text
Dial a caller number, or try Jenny if you know her number.
```

Reward:

- `867 Club Charm`.

If persistence is not implemented:

- Do not say it is saved to the real LAiDIES Card.
- Use local reward language:

```text
867 Club Charm unlocked for this visit. Open your LAiDIES Card later to pin it when charms are connected.
```

## Recommended Product Sequence

1. Internal low-fidelity prototype of the two-path model.
2. Test mobile first action, tap feedback, and result placement.
3. Test Play The Game resolver with sample data.
4. Only then run Council again.
5. If Quick Call passes and Play fails, implement Quick Call first and park Play.
6. If both pass, implement Quick Call first, then Play The Game.

Current product recommendation:

Proceed with internal prototyping only. Do not implement live. Do not send to Ali yet.
