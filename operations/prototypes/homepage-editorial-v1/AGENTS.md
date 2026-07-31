# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## LAiDIES homepage direction locked for this prototype

- Keep the production light background gradient exactly: `linear-gradient(150deg,#f8ecdd 0%,#f6dfe4 32%,#e9ede2 58%,#c9e5df 100%)`.
- Keep the existing Jost wordmark, navigation language, headline typography, and approved homepage copy. Do not use generated text or generated UI.
- Use real, approved LAiDIES episode and SUNNYVAiLE artwork. The locked Heroine portrait controls the rendering style for people.
- The visual tone is an adult editorial graphic novel, not a children's comic, sticker sheet, or rainbow toy interface.
- Use vivid pink and purple selectively over red and yellow. Keep deep plum as the primary ink; avoid the retired muted rose/gold/teal combination and avoid electric hot-pink-on-black.
- Let imagery provide most of the colour. Keep text readable, panels disciplined, and ordinary controls restrained.
