# Ask LAiDY Input Audit

Date: 2026-06-19

Scope: Part B audit of Ask LAiDY / FAiRY GODMOTHER prompt feedback behavior.

No staging, commit, push, revert, delete, cleanup, prototype work, backend work, signup work, Buttondown work, Supabase work, or Part C implementation was performed.

## Files Inspected

- `games/fairy-godmother.html`
- `script.js`
- `games/fun-pack.html`
- `clubhouse.html`

## Current State

There are two LAiDY advice implementations:

1. `games/fairy-godmother.html`
   - Standalone page-level advice engine.
   - Reads textarea input.
   - Reads selected energy.
   - Classifies topic type.
   - Produces a themed advice note.
   - Auto-scrolls to advice.
   - Shows a short `Prompt Check`.

2. `script.js`
   - Shared LAiDY advice helpers and prompt feedback.
   - Reads input and selected mode where the shared LAiDY UI exists.
   - Produces a longer result with `Read`, `Do this`, and `Try this line`.
   - Produces short prompt feedback based on a simple score.

Important finding: current behavior is not purely canned. It reads input and energy. But it does not yet meet Ali's requested structured prompt-quality output.

## Current Energy Modes

`games/fairy-godmother.html` has:

- Auto / LAiDY picks.
- Dolly Energy.
- Miranda Polish.
- Elle Evidence.
- Cher Closet Check.
- Sophia Says.
- David Specificity.
- Buffy Courage.

`script.js` also has:

- Dolly.
- Miranda.
- Elle.
- Cher.
- Sophia.
- David.
- Buffy.
- Community.

## Gap Against Requested Energy Modes

Requested:

- Supportive.
- Direct / No-nonsense.
- Polished / Executive.
- Funny / Hype.
- Emergency.
- FAiRY GODMOTHER.

Current modes are branded and charming, but they do not map cleanly to the requested plain-language energies. Recommendation: keep the LAiDIES flavor, but expose the user-facing choices as clearer work modes:

- Supportive, LAiDY style.
- Direct / No-nonsense.
- Polished / Executive.
- Funny / Hype.
- Emergency.
- FAiRY GODMOTHER.

The internal flavor can still reference Dolly, Miranda, Cher, Elle, etc.

## Current Prompt Feedback

Current feedback is a single paragraph:

- blank prompt
- needs more context
- who are you talking to?
- strong ask
- decent ask
- workable, but sharper
- more mood than mission

This is useful, but too small for the requested feature.

## Required Final Output Structure

The result should render as a structured report:

1. PROMPT READ
2. PROMPT QUALITY
3. WHAT'S MISSING
4. BETTER PROMPT
5. NEXT QUESTION
6. RECEIPTS CHECK

Each section should be generated from the actual input and selected energy.

## Proposed Rules-Based Engine

No backend is needed for Part B.

Add a rules-based prompt review function that returns structured data:

```js
{
  taskType,
  qualityLabel,
  promptRead,
  missingItems,
  betterPrompt,
  nextQuestion,
  receiptsCheck,
  energyLabel
}
```

Suggested task categories:

- email / message / reply
- meeting notes / summary
- presentation / deck
- brainstorm / ideas
- explain something
- research / verify / receipts
- workplace situation
- vague "I don't know what to ask"
- too-short prompt
- messy prompt improvement
- hallucination / verification concern
- social post / caption
- job search / resume / cover letter
- planning / project management

## Proposed Quality Labels

- Empty input.
- Too broad.
- Vague but saveable.
- Good start, needs context.
- Needs audience + output format.
- Strong bones, missing receipts.
- Ready for first draft.
- Receipts required.

## Input Signals To Detect

Useful checks:

- Word count.
- Has task/action verb.
- Has audience.
- Has context/background.
- Has desired format.
- Has tone.
- Has deadline/constraint.
- Has source/date/verification need.
- Mentions confidential/high-risk areas.
- Asks for stats, research, claims, medical/legal/financial/HR/compliance info.
- Mentions hallucination, proof, verify, sources, citations, current/latest.

## UI Copy To Add

Helper copy:

`Best for: improving prompts, checking what's missing, drafting better asks, and deciding when you need receipts.`

Privacy copy:

`Tiny receipt check: don't paste confidential client, company, HR, legal, or personal data here.`

## UI Recommendations

On `games/fairy-godmother.html`:

- Keep the magical hero and wand.
- Make prompt review the primary utility.
- Keep random wisdom, but visually secondary.
- Replace the one-line Prompt Check block with a structured result card.
- Keep animation subtle and respect reduced motion where practical.
- Use section headings in uppercase.

Result card layout:

- Kicker: selected energy.
- `PROMPT READ`
- `PROMPT QUALITY`
- `WHAT'S MISSING`
- `BETTER PROMPT`
- `NEXT QUESTION`
- `RECEIPTS CHECK`

## Test Inputs

Required test inputs:

1. Empty input.
2. `help me with AI`
3. `email`
4. `write an email to my boss about moving the deadline`
5. `summarize these meeting notes`
6. `make a presentation about Q3 results`
7. `find stats for my deck`
8. `how do I know if this is hallucinating?`
9. `make this sound more executive`
10. `I need ideas for a team offsite`

Expected confirmation:

- outputs are different
- output references actual task
- quality rating changes appropriately
- missing pieces are tailored
- better prompt is usable
- tone changes by selected energy
- receipts check appears when needed

## Files Likely Affected

Recommended implementation files:

- `games/fairy-godmother.html`
- `script.js`

Optional:

- `games/fun-pack.html` if FAiRY card copy needs to describe the upgraded utility.
- `clubhouse.html` if the Clubhouse card copy needs to stop saying generic "Ask for advice."

Do not touch:

- OpenAI backend.
- Supabase.
- Cloudflare.
- API keys.
- Magic Link.
- Signup/Buttondown.

## Risk Level

Medium.

Why:

- No backend is required.
- But there are two LAiDY implementations, so the implementation should avoid creating a third divergent engine.
- Mobile result readability must be tested at 390px.

## Recommended Implementation Phase

Phase 3, after Dream Phone.

Reason:

- Dream Phone is the more visible broken layout.
- Ask LAiDY is already functionally useful, just not deep enough.
- Rules-based prompt feedback can be implemented and tested as a focused follow-up.

## Staging Plan

No staging is recommended now.

If Ali approves only this audit doc later:

```bash
git add operations/review-packets/ask-laidy-input-audit.md
```

If Ali later approves implementation, stage exact implementation files only after QA:

```bash
git add games/fairy-godmother.html
git add script.js
```

Do not use `git add .`.

