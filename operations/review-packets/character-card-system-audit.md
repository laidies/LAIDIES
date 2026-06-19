# Character Card System Audit

Date: 2026-06-19

Scope: Part B audit of Dream Phone caller cards and LAiDIES character/card mapping.

No staging, commit, push, revert, delete, cleanup, prototype work, backend work, signup work, Buttondown work, Supabase work, or Part C implementation was performed.

## Files Inspected

- `games/dream-phone.html`
- `script.js`
- `clubhouse.html`
- `laidies-card.html`
- `content/site/site-data.js`
- relevant assets under `assets/`

## Current Card List

Dream Phone currently has these one-word or near-one-word caller titles:

- Mentor
- Bestie
- Boundary
- Receipts
- Hype
- Steady
- Strategist
- Big Bro
- Wildcard
- Creative
- Research
- AI Help
- Boss
- Coach
- Operator
- Counsel
- Finance
- Product
- Comms
- Data
- Founder
- Sponsor
- Builder
- Closer

Most titles are one word. `Big Bro` and `AI Help` are exceptions already in the system.

## Current Image / Title Mapping

| Title | Current asset | Notes |
| --- | --- | --- |
| Founder | `assets/dream-phone-founder.jpg` | Should become Boss per Ali direction. |
| Boss | `assets/dream-phone-boss-ali.webp` | This is Ali's image and should become Founder per Ali direction. |
| Bestie | `assets/dream-phone-bestie.webp` | Existing. |
| Mentor | `assets/dream-phone-mentor.webp` | Existing. |
| Receipts | `assets/dream-phone-receipts.webp` | Existing. |
| AI Help | `assets/dream-phone-ai-help.webp` | Existing. |
| Research | `assets/dream-phone-research.webp` | Existing. |
| Data | `assets/dream-phone-data.jpg` | Existing. |
| Comms | `assets/dream-phone-comms.jpg` | Existing. |
| Product | `assets/dream-phone-product.jpg` | Existing. |
| Finance | `assets/dream-phone-finance.jpg` | Existing. |
| Counsel | `assets/dream-phone-counsel.jpg` | Existing. |
| Operator | `assets/dream-phone-operator.jpg` | Existing. |
| Coach | `assets/dream-phone-coach.jpg` | Existing. |
| Sponsor | `assets/dream-phone-sponsor.jpg` | Existing. |
| Builder | `assets/dream-phone-builder.jpg` | Existing. |
| Closer | `assets/dream-phone-closer.jpg` | Existing. |

## Required Corrected Mapping

| Character / role | One-word title | Correct asset |
| --- | --- | --- |
| Ali's image | Founder | `assets/dream-phone-boss-ali.webp` |
| Current Founder image | Boss | `assets/dream-phone-founder.jpg` |
| Deb | Icon | `assets/deb-80s-portrait-v1.png` or `assets/deb-80s-portrait-stare-v1.png` |
| Mme CLAi-O | Psychic | `assets/madame-claio-character-v1.png` or `assets/madame-claio-portrait-v1.png` |
| LAiDY | Wishmaker | `assets/laidy-character-v1.png` or `assets/laidy-fairy-godmother-portrait-v1.png` |

Use `Psychic`, spelled exactly that way.

## Existing Asset Dimensions

Confirmed available assets:

- `assets/dream-phone-boss-ali.webp`: 640 x 640.
- `assets/dream-phone-founder.jpg`: 362 x 362.
- `assets/deb-80s-portrait-v1.png`: 1024 x 1536.
- `assets/deb-80s-portrait-stare-v1.png`: 1024 x 1536.
- `assets/madame-claio-character-v1.png`: 1024 x 1024.
- `assets/madame-claio-portrait-v1.png`: 1024 x 1024.
- `assets/laidy-character-v1.png`: 1024 x 1024.
- `assets/laidy-fairy-godmother-portrait-v1.png`: 1024 x 1024.
- `assets/people/dream-phone-boss-ali.png`: 1254 x 1254.
- `assets/member-ali-founder-card.png`: 1024 x 1536.
- `assets/member-ali-founder-card.webp`: 733 x 1100.

## Missing Assets

No required character image is fully missing. The choice is which existing Deb, Mme CLAi-O, and LAiDY image best fits Dream Phone card art.

Recommendation:

- Deb/Icon: use `assets/deb-80s-portrait-v1.png` unless the stare variant tests better in small crops.
- Mme CLAi-O/Psychic: use `assets/madame-claio-character-v1.png` for character consistency.
- LAiDY/Wishmaker: use `assets/laidy-character-v1.png` for brand consistency with FAiRY GODMOTHER.

## Proposed Card Data Additions

Add three new callers to Dream Phone:

| Key | Number suggestion | Title | Asset | Category |
| --- | --- | --- | --- | --- |
| `icon` | 555-2039 | Icon | `assets/deb-80s-portrait-v1.png` | confidence |
| `psychic` | 555-2040 | Psychic | `assets/madame-claio-character-v1.png` | intuition |
| `wishmaker` | 555-2041 | Wishmaker | `assets/laidy-character-v1.png` | confidence |

Number suggestions are placeholders for implementation planning; Ali can approve or change them.

## Copy / Behavior Notes

Founder:

- Should reflect Ali/founder energy: product vision, building in public, scrappy proof, smallest real launch.

Boss:

- Should reflect current Founder image after remap: executive call, decision-making, recommendation, tradeoff.

Icon:

- Deb can be a high-confidence, iconic LAiDIES-world voice. Keep it polished and not novelty-only.

Psychic:

- Mme CLAi-O should point toward next step, intuition, and pattern reading. Do not duplicate Madame CLAi-O's entire separate tool.

Wishmaker:

- LAiDY should be prompt polish, courage, useful magic, and real next action.

## Where Cards May Live

Current confirmed card-like systems:

- Dream Phone caller cards in `games/dream-phone.html`.
- Dream Phone caller answer data in `script.js`.
- Trading card pack data in `content/site/site-data.js`.
- LAiDIES Card/member preview in `laidies-card.html`.

Recommendation:

- Treat the requested Founder/Boss/Icon/Psychic/Wishmaker fix as Dream Phone caller card work first.
- Do not mix it with LAiDIES Card backend/member-card work.
- Do not modify trading card pack data unless Ali confirms these characters should become collectible trading cards too.

## Exact Files Needing Changes

For Dream Phone/card mapping implementation:

- `games/dream-phone.html`
- `script.js`

Optional if card data is centralized:

- a new small data block inside `games/dream-phone.html`, or
- a refactor within `script.js` only.

Avoid touching:

- `laidies-card.html` unless Ali approves a member-card pass.
- `clubhouse-pass.html` because persistence belongs to Part C.
- Supabase/Buttondown/signup files.

## Mobile Layout Risk

Current caller avatars are too small:

- Desktop/mobile CSS uses circular avatars.
- Mobile avatar size drops to 44px.
- The grid min width drops to 75px.

This is below the collectible-card quality bar.

Dream Phone redesign should make caller cards larger and easier to tap before adding more characters.

## Risk Level

Medium.

Why:

- Mapping fixes are simple.
- Adding cards requires JS answer/remix coverage and mobile layout QA.
- Ali's image must not appear anywhere except Founder unless explicitly approved.

## Staging Plan

No staging is recommended now.

If Ali approves only this audit doc later:

```bash
git add operations/review-packets/character-card-system-audit.md
```

If Ali later approves implementation, stage exact implementation files only after QA:

```bash
git add games/dream-phone.html
git add script.js
```

Do not use `git add .`.

