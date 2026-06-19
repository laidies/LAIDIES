# Dream Phone Redesign Plan

Date: 2026-06-19

Scope: Part B audit and redesign plan for Dream Phone on mobile and desktop.

No staging, commit, push, revert, delete, cleanup, prototype work, backend work, signup work, Buttondown work, Supabase work, or Part C implementation was performed.

## Files Inspected

- `games/dream-phone.html`
- `script.js`
- `clubhouse.html`
- `games/fun-pack.html`
- relevant Dream Phone assets under `assets/`

## Current Structure

Route:

- `games/dream-phone.html`

Current page order:

1. Sticky nav.
2. Hero with small circular phone image.
3. Phone keypad and manual dial input.
4. Output panel.
5. Secret 867 badge block.
6. Caller grid.
7. Special/remix cards.

Current JS:

- Dream Phone caller data, answers, numbers, secret badge, and remix behavior are in `script.js`.
- Clicking a caller card selects it, fills the number, and writes a result to the output.
- Dialing a number writes a result to the output.
- Remix buttons rewrite the output after a caller has been selected.
- 867-5309 unlocks the `867 Club merit badge`.
- Remix cards can unlock `Remix Scholar`.

## Current Interaction Flow

### Mobile

1. User sees phone/keypad first.
2. User must scroll to find caller cards.
3. User taps a caller card.
4. Output updates above the caller grid, so the user must scroll back upward to read it.
5. Remix cards sit below the full caller grid, so the user must scroll downward again.
6. Badge content can appear between output and choices.

This matches Ali's "scroll scavenger hunt" concern.

### Desktop

The page is readable, but the layout is still linear. The phone, output, caller cards, and remix cards are not composed as one intentional interaction surface.

## Current Caller List

| Key | Number | Current title | Current image |
| --- | --- | --- | --- |
| `mentor` | 555-1995 | Mentor | `assets/dream-phone-mentor.webp` |
| `bestie` | 555-2001 | Bestie | `assets/dream-phone-bestie.webp` |
| `boundary` | 555-2003 | Boundary | `assets/dream-phone-boundary.webp` |
| `receipts` | 555-2004 | Receipts | `assets/dream-phone-receipts.webp` |
| `hype` | 555-2007 | Hype | `assets/dream-phone-hype.webp` |
| `steady` | 555-2008 | Steady | `assets/dream-phone-steady.webp` |
| `strategist` | 555-1999 | Strategist | `assets/dream-phone-strategist.webp` |
| `bigbro` | 555-2010 | Big Bro | `assets/dream-phone-bigbro.webp` |
| `wildcard` | 555-2013 | Wildcard | `assets/dream-phone-wildcard.webp` |
| `creative` | 555-2016 | Creative | `assets/dream-phone-creative.webp` |
| `research` | 555-2024 | Research | `assets/dream-phone-research.webp` |
| `aihelp` | 555-2026 | AI Help | `assets/dream-phone-ai-help.webp` |
| `boss` | 555-2027 | Boss | `assets/dream-phone-boss-ali.webp` |
| `coach` | 555-2028 | Coach | `assets/dream-phone-coach.jpg` |
| `operator` | 555-2029 | Operator | `assets/dream-phone-operator.jpg` |
| `counsel` | 555-2030 | Counsel | `assets/dream-phone-counsel.jpg` |
| `finance` | 555-2031 | Finance | `assets/dream-phone-finance.jpg` |
| `product` | 555-2032 | Product | `assets/dream-phone-product.jpg` |
| `comms` | 555-2033 | Comms | `assets/dream-phone-comms.jpg` |
| `data` | 555-2034 | Data | `assets/dream-phone-data.jpg` |
| `founder` | 555-2035 | Founder | `assets/dream-phone-founder.jpg` |
| `sponsor` | 555-2036 | Sponsor | `assets/dream-phone-sponsor.jpg` |
| `builder` | 555-2037 | Builder | `assets/dream-phone-builder.jpg` |
| `closer` | 555-2038 | Closer | `assets/dream-phone-closer.jpg` |

## Priority Fixes

1. Keep the phone magical, but stop making it the whole first screen.
2. Put choices near the phone.
3. Put selected caller, result, and remix controls together.
4. Make caller cards feel collectible, not like tiny avatar buttons.
5. Correct Founder/Boss image mapping.
6. Add Deb/Icon, Mme CLAi-O/Psychic, and LAiDY/Wishmaker if assets are approved and not duplicates.
7. Keep all titles one-word where possible.
8. Preserve localStorage honesty for badges. Do not fake persistence.

## Proposed Mobile Layout

Recommended direction: selected-card result view.

### Initial mobile state

Top section:

- Compact hero: DREAM PHONE, purpose, tiny secret-number hint.
- Phone image/dialer as visual anchor.
- Featured caller cards directly below or beside the phone:
  - Founder
  - Boss
  - Bestie
  - Mentor
  - Receipts
  - AI Help

Then:

- `More callers` expandable drawer or carousel.
- Manual dial as secondary.

### After choosing a card

Replace or collapse the top chooser into one active interaction unit:

- Selected caller card with larger image.
- Phone/dial state: `Calling Founder...`
- Result panel directly under selected card.
- Remix buttons directly under result.
- Badge/reward note after result, not before caller choices.

### Interaction requirements

- On caller card click, result should appear in the same viewport or smoothly scroll to the result unit.
- Remix buttons should stay directly under the result.
- Output should not appear above the caller grid while the user is below it.
- At 390px, card images should be at least collectible-card scale, not 44px avatars.

## Proposed Desktop Layout

Recommended direction: two-column call desk.

Left:

- Phone visual/dialer.
- Manual keypad.
- Secret-number hint.

Right:

- Featured caller cards in a large card grid.
- Active result panel pinned beside or below the selected caller.
- Remix controls attached to result panel.

Below:

- `More callers` directory, grouped by category:
  - Career
  - AI / Receipts
  - Voice / Comms
  - Operations
  - Confidence

## Proposed Markup Shape

Suggested high-level sections:

- `.dream-phone-shell`
- `.dream-phone-hero`
- `.dream-phone-workbench`
- `.dream-phone-device`
- `.dream-phone-featured-callers`
- `.dream-phone-result-unit`
- `.dream-phone-remix-row`
- `.dream-phone-caller-directory`
- `.dream-phone-reward-row`

Avoid nesting everything inside generic cards. The phone should feel like an object in a call desk.

## Files Likely Affected

Recommended isolated implementation:

- `games/dream-phone.html`
- `script.js`

Try to keep styling local to `games/dream-phone.html` for the first implementation.

Only touch `styles.css` if shared header/return behavior requires it.

## Existing Assets To Use

Phone/object:

- `assets/dream-phone-cordless-crop.png`
- `assets/dream-phone-retro.png`
- `assets/dream-phone-toy.png`
- `assets/dream-phone-contact-sheet.jpg` for reference only.

Current caller assets:

- `assets/dream-phone-mentor.webp`
- `assets/dream-phone-bestie.webp`
- `assets/dream-phone-boundary.webp`
- `assets/dream-phone-receipts.webp`
- `assets/dream-phone-hype.webp`
- `assets/dream-phone-steady.webp`
- `assets/dream-phone-strategist.webp`
- `assets/dream-phone-bigbro.webp`
- `assets/dream-phone-wildcard.webp`
- `assets/dream-phone-creative.webp`
- `assets/dream-phone-research.webp`
- `assets/dream-phone-ai-help.webp`
- `assets/dream-phone-boss-ali.webp`
- `assets/dream-phone-founder.jpg`
- `assets/dream-phone-coach.jpg`
- `assets/dream-phone-operator.jpg`
- `assets/dream-phone-counsel.jpg`
- `assets/dream-phone-finance.jpg`
- `assets/dream-phone-product.jpg`
- `assets/dream-phone-comms.jpg`
- `assets/dream-phone-data.jpg`
- `assets/dream-phone-sponsor.jpg`
- `assets/dream-phone-builder.jpg`
- `assets/dream-phone-closer.jpg`

Character additions:

- `assets/deb-80s-portrait-v1.png` or `assets/deb-80s-portrait-stare-v1.png`
- `assets/madame-claio-character-v1.png` or `assets/madame-claio-portrait-v1.png`
- `assets/laidy-character-v1.png` or `assets/laidy-fairy-godmother-portrait-v1.png`

## Data / JS Changes Needed

1. Move caller definitions into a single structured array/object in `script.js` or inline data block.
2. Render caller cards from data instead of hardcoding 24 button rows if possible.
3. Add fields:
   - `id`
   - `title`
   - `number`
   - `image`
   - `alt`
   - `category`
   - `featured`
4. Update click handler to:
   - set selected card.
   - render result into local result unit.
   - reveal remix controls near result.
   - scroll only to the result unit when needed.
5. Preserve existing number dialing and secret badge behavior.

## QA Plan

Required viewports:

- 375px
- 390px
- 430px
- 1440px

Required states:

- Initial load.
- Tap/click a featured caller.
- Result visible without backtracking.
- Remix buttons visible near result.
- Use each remix button.
- Dial a valid number.
- Dial invalid number.
- Dial empty input.
- Dial 867-5309.
- Check card images are legible and tappable.
- Check no horizontal overflow.
- Check no console errors.

## Risk Level

Medium.

Why:

- Single route can be redesigned in isolation.
- But JS behavior is shared in `script.js`, and Dream Phone badge/reward logic touches localStorage-based systems.
- Needs interaction QA, not just page-load QA.

## Recommended First Implementation Phase

Implement Dream Phone as the first isolated Part B code phase, before broader Clubhouse or Book of Receipts changes.

Exact likely files:

- `games/dream-phone.html`
- `script.js`

Do not include:

- homepage reorganization
- Clubhouse clamshell rewrite
- backend persistence
- Buttondown/signup work
- social/production engine files

## Staging Plan

No staging is recommended now.

If Ali approves only this plan later:

```bash
git add operations/review-packets/dream-phone-redesign-plan.md
```

If Ali later approves the implementation, stage explicit implementation files only after QA.

Do not use `git add .`.

