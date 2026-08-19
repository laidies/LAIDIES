<!-- laidies-scope: prototype_only; authority: local_reproduction_only; overrides_sitewide: false -->
> Prototype-only instructions. Root `AGENTS.md` and routed current sources win. Do not record new LAiDIES decisions here.

# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Locked Episode 01 direction

- The visual authority is `operations/reference/trading-cards/tradingref-01.png` through `tradingref-04.png`, plus Ali's selected option 3 at `public/assets/cards/generative-ai-front-v1.png`.
- Use flat 1990s comic/trading-card colour: vivid pink, purple, cobalt/electric blue and sunshine yellow; bold black ink, Ben-Day dots, comic bursts and a clean white card border.
- Do not use glossy Y2K, holographic or metallic luxury-tech cards, black-dominant backgrounds, dark neon, candy pastels, cream/paper page treatments or generic white UI cards.
- Card fronts are image plus one term/phrase. Card backs explain the term and give one memorable line.
- The approved Episode 01 deck contains four cards: `GENERATIVE AI`, `MODEL`,
  `HALLUCINATION` and `PARTICIPATION GAP`. `INVISIBLE LOAD`, `YOUR JUDGMENT`,
  `YOUR 20%`, `PHYSICS PROBLEM`, `WOMEN SHAPE AI` and Try-On mechanics are not
  admitted card concepts.
- Do not explain invisible load to women as if it is a new concept. Episode 01
  uses it as a story/stakes beat; it is not an Episode 01 learning card.
- Every concept definition must come from the maintained canonical concept
  entry. Do not invent a parallel analogy or compress `model` into “the system
  under an app”: models can be used through apps, APIs, coding tools and other
  systems, and a product can use or route among several models.
- The Burn Book example must preserve the episode fact that every entry was
  invented. Never describe it as a mix of true and false entries.
- Every piece of reverse-side copy—including the episode/card eyebrow—must sit
  fully inside the light-blue field. The patterned diagonal frame is
  decoration, never a text surface. QA must inspect every populated reverse,
  not infer the other cards from one example.
- Episode 01 is one coordinated pack identity. For future episodes, retain the
  card anatomy and interaction grammar but derive a new whole-pack background,
  accent palette, wrapper and back-frame treatment from that episode's approved
  art. Do not randomly recolour cards within a pack and do not clone Episode
  01's palette into the next pack.
- Keep the exact mixed-case `LAiDIES` spelling. Never let all-caps eyebrow styling overwrite the lowercase `i`.
- The pack must be useful: open it, browse every admitted card, flip each card,
  place real Puffy assets, print it and save the user's progress. Card count
  follows the concepts the episode genuinely teaches; never add filler to hit
  a quota. Do not add filler controls.
- Opening the pack must feel like opening a real foil booster: use a finished
  raster wrapper and torn-open reveal, then fan/deal the actual cards. Never
  substitute a CSS burst, giant empty gradient, placeholder frame or generic
  card-shaped UI for the physical pack-opening experience.
- The header must use the correct live `LAiDIES` wordmark and keep navigation,
  wordmark and print controls in separate non-overlapping columns at every
  breakpoint.
- Packaged Study Pack routes must resolve card, back-frame, Puffy and wrapper
  assets through the Vite base path; root-relative asset strings are prohibited
  because they break when the Cards experience is mounted below
  `/episode-01-cards/`.
- The public Episode 01 title is `On Wednesdays We Do AI`. `Open the Tab` is
  not the episode name and must not appear as the Cards pack title, foil-wrapper
  title, eyebrow or public provenance label.
- The Study Pack lives with Blend & Snap, not the Library.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
