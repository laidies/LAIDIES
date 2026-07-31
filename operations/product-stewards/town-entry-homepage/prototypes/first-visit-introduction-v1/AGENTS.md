# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Locked Homepage prototype direction

- Preserve the exact live luminous-dusk masthead image and composition.
- The masthead is evergreen; current episode content lives below it.
- Preserve the exact headline: “AI fluency, taught through the pop culture you
  never forgot.”
- Preserve the exact core explanation and four-step model from Ali's
  `HOMEPAGE-COPY-RULING-2026-07-26.md`.
- First visitors receive one primary Visitor’s Centre / 60–90-second
  orientation path. `Welcome Wagon` is not a current public name.
- Add only the smallest explanation of why 1990–2010/Rewind Era references
  make unfamiliar AI concepts understandable, memorable and reusable.
- Do not use a four-box FAQ or reduce learning to episode → town practice.
- First, returning-no-Card and Resident Card presentations are distinct.
- Do not use white redesigns, muddy/grungy filters, glamour cartoons or
  sticker-comic decoration.
- Use only conservative hierarchy, duplication and 90s-accent changes.
