# Dream Phone UX Research

Date: 2026-06-19

Status: internal rethink research. Not an implementation packet. Not for Ali approval yet.

Live Dream Phone files were not edited. No staging, commit, push, or `git add` was performed.

## Research Sources Reviewed

High-quality UX / accessibility sources:

- Nielsen Norman Group, `10 Usability Heuristics for User Interface Design`: https://www.nngroup.com/articles/ten-usability-heuristics/
- Nielsen Norman Group, `Visibility of System Status`: https://www.nngroup.com/articles/visibility-system-status/
- W3C WAI-ARIA Authoring Practices, carousel pattern: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- W3C WCAG 2.2, target size minimum: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

Original Dream Phone mechanics sources:

- ConsoleMods Dreamphone rules summary: https://consolemods.org/wiki/Dreamphone
- Electronic Dream Phone manual PDF: https://gramywplanszowki.pl/storage/games/2034/files/electronic-dream-phone-instrukcja.pdf
- BoardGameGeek Electronic Dream Phone listing: https://boardgamegeek.com/boardgame/6578/electronic-dream-phone

Local LAiDIES references:

- `games/madame-claio.html`
- `games/fairy-godmother.html`
- `clubhouse.html`
- `script.js` current Dream Phone data and special-card copy
- `operations/review-packets/laidies-council-quality-gate.md`

## What Original Dream Phone Actually Contributes

The original game model is not "a grid of cute people." It is:

- A central phone object.
- Number dialing.
- Card draw / card selection.
- A call response.
- Clues that narrow an answer.
- A tracking surface where information is crossed off or remembered.
- Special cards that affect the call: Speakerphone, Share a Secret, Mom Says Hang Up.
- A solve/reveal moment when the player thinks they know enough.

Dream Phone for LAiDIES should borrow the interaction rhythm, not the dating goal.

Useful translation:

- Phone object -> LAiDIES hotline desk.
- Caller card -> advisor/persona with a job.
- Clue -> signal about what kind of help the user needs.
- Notepad -> Receipt Pad.
- Special cards -> remix/interpretation cards.
- Solve -> reveal today's useful next move.

Avoid:

- Crush/dating logic.
- A literal board-game clone.
- Clues that are decorative but do not change the outcome.
- A mystery that requires a long explanation before it is fun.

## UX Principles And Dream Phone Implications

### 1. First Action Must Be Obvious

NN/g's heuristics emphasize visibility of status, real-world language, and recognition over recall. For Dream Phone, the first screen must answer:

- What kind of call do I need?
- What do I tap first?
- What will happen after I tap?

Implication:

- Use two large but compact mode cards:
  - `Quick Call`: Get advice now.
  - `Play The Game`: Call three people, collect clues, reveal your next move.
- Default visual emphasis should be Quick Call because it is the simplest value path.
- Play The Game can be present, but not as an ambiguous second tab that looks equivalent without explanation.

Avoid:

- Starting with all 27 callers.
- Starting with a phone/dialpad before the user understands the task.
- Copy like "secret hotline code" that makes users hunt for hidden mechanics.

### 2. System Status Must Be Visible

NN/g calls visibility of system status a trust-building requirement. Dream Phone failed when taps did not visibly work.

Implication:

- Every call action must immediately show:
  - dialing
  - connected
  - caller selected
  - result saved
- Quick Call status should be: `Connected to Receipts`, `Speaker Phone pulled`, `Call ended`.
- Play The Game status should be: `Clue 1 saved`, `Clue 2 saved`, `Clue 3 saved`, `Reveal unlocked`.

Avoid:

- Taps that only change text below the fold.
- Results that appear disconnected from the selected card.
- Unclear disabled states.

### 3. Reduce Cognitive Load

The failed versions tried to explain too much. A user should not need to read documentation to know what to do.

Implication:

- Separate the promises:
  - Quick Call = direct advice.
  - Play The Game = three clues and reveal.
- Use progressive disclosure:
  - Show 5-8 recommended callers or need lanes first.
  - Put the full directory behind a drawer.
  - Keep dialing as secondary.
- Keep one persistent Receipt Pad, but change what it means per mode.

Avoid:

- Showing game progress in Quick Call.
- Showing remix behavior in Play The Game without explaining how it affects clues.
- Asking the user to choose from all callers before they know why.

### 4. Mobile Must Deliver Value Before Deep Scroll

Mobile is the primary risk. WCAG target-size guidance sets minimum pointer target expectations; in practice Dream Phone should aim larger for primary controls.

Implication:

- First mobile viewport should show:
  - mode choice or selected mode promise
  - one primary action
  - maybe 3-5 need/caller choices
  - Receipt Pad preview/status
- Caller cards should be compact, tactile, and readable.
- Controls should be true buttons with visible focus states.

Avoid:

- Giant portraits.
- Dense tiny avatars.
- A full directory before value.
- Results that require a long scroll after tapping.

### 5. Carousels Need an Escape Hatch

WAI-ARIA carousel guidance recommends labeled controls, native buttons, slide labels, and status cues. For Dream Phone, a carousel can be used only if it is not the only way to choose.

Implication:

- A swipe deck can work for featured callers if it has:
  - partial next card
  - arrows
  - count
  - keyboard focus
  - accessible labels
  - full directory alternative
- Do not auto-rotate.

Avoid:

- Hiding all callers behind swipe.
- Full-screen slides.
- Carousel-only caller selection.

### 6. Advice Must Feel Caller-Specific

Recommendation/advice tools fail when the output feels generic. Dream Phone's promise depends on persona specificity.

Implication:

- Each caller needs:
  - role
  - advice domain
  - output voice
  - clue tags
  - remix rules
- The same situation should produce meaningfully different advice from Receipts vs Wishmaker vs Boss.

Avoid:

- Fortune-cookie advice.
- Random quote banks unrelated to caller role.
- Remix cards that ignore the selected caller.

### 7. Delight Must Clarify, Not Decorate

The LAiDIES bar is high: Mme CLAi-O and FAiRY GODMOTHER work because their object-world and interaction logic support the user task.

Implication:

- Dream Phone should feel like a hotline desk:
  - phone
  - receipt pad
  - contact cards
  - charm tray
  - phone cord motif
  - soft glow on active call
- The physical world should explain the interaction:
  - phone = call
  - receipt pad = saved advice/clues
  - special cards = optional transformations

Avoid:

- White stacked panels.
- Generic SaaS dashboards.
- Childish toy-board-game literalism.
- CSS-drawn phone art as production direction.

## Patterns That Could Work

### Mode Entry

Prompt:

> What kind of call do you need?

Cards:

- Quick Call: `Get one useful take now.`
- Play The Game: `Call three people. Reveal the help you need today.`

Why it works:

- Clear paths.
- User chooses by intent, not by understanding internal mechanics.

### Need-First Quick Call

Instead of opening with 27 callers, start with need chips:

- Better Prompt
- Receipts Check
- Boss Take
- Confidence Read
- Stop Overthinking
- Surprise Me

Each chip suggests 1-2 callers. The user can still open the phone book.

Why it works:

- Less browsing.
- More immediately useful.
- Preserves caller cards without making them the whole interface.

### Three-Clue Game

The game board is a compact Receipt Pad:

- Clue 1
- Clue 2
- Clue 3
- Reveal locked / unlocked

Each clue visibly adds tags such as:

- Evidence
- Prompt
- Context
- Boundary
- Human Review

Why it works:

- The clues have a job.
- The reveal is explainable.
- Progress is visible.

### Physical Special Cards

Special cards should look like collectible cards and be optional.

Quick Call:

- Share a Secret = bestie version
- Speaker Phone = meeting version
- Mom Says Hang Up = one next step

Play The Game:

- Share a Secret = interpret this clue privately
- Speaker Phone = turn this clue into a room-ready line
- Mom Says Hang Up = stop this thread and recommend the next caller/need

Why it works:

- Same cards, mode-specific effects.
- Clearer than treating them as random buttons.

## Patterns To Avoid

- All callers visible on first load.
- Only five callers with no directory.
- A carousel with no alternate list.
- Hidden result updates below the fold.
- A Play The Game mode that produces generic advice after three calls.
- A reveal that cannot explain why it chose the outcome.
- A central production asset that is still unresolved.
- Any mockup where primary taps are not functional.

## LAiDIES Application

Dream Phone should come back only when it can honestly say:

- `Quick Call` is useful within 10 seconds.
- `Play The Game` is fun without a manual.
- Caller advice feels authored by that caller.
- Special cards change the current answer/clue in a logical way.
- The phone/object world is production-worthy.
- Mobile gives value before scroll fatigue.

Current conclusion:

- The product model is worth rethinking.
- The current visual/UI candidate remains rejected.
- No mockup should be surfaced to Ali until a new prototype passes the strict Council gate.
