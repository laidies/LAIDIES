<!-- laidies-scope: prototype_only; authority: local_reproduction_only; overrides_sitewide: false -->
> Prototype-only instructions. Root `AGENTS.md` and routed current sources win. Do not record new LAiDIES decisions here.

# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Locked Study Pack storefront direction

- The learner must see one prominent **This Week’s Pack** immediately, followed
  by a visible grid of every other released episode pack.
- Episode 04 is the current weekly release and must be labelled unmistakably
  as both **Latest** and **This week**. Do not make the learner infer recency
  from ordering or episode number.
- Storefront episode cards are compact selectors, not full-page posters. Keep
  the latest card prominent but bounded, and keep the remaining episode cards
  small enough to scan together.
- Every storefront episode card uses the same clear vertical anatomy: the
  complete episode title image fills the card width on top, and all label,
  title and action text sits beneath it. Never shrink the artwork into a corner
  beside the copy.
- The storefront is a section inside the Blend & Snap building page, not a
  second full-page hero experience. Keep its introduction, board header and
  Latest choice compact enough that they do not consume the whole viewport.
- Every storefront episode card and pack hero reuses the exact current episode
  title-card artwork from the canonical episode route. Do not substitute
  alternate stills, generated covers or approximate crops.
- Never hide episode choices under café metaphors such as `The Regulars`,
  `back menu`, `order`, or `Special`.
- Coffee selection is not part of the Study Pack route.
- The storefront may use the visual grammar of a colourful Blend & Snap order
  board, but the episode tiles remain the direct choices. Do not add prices,
  coffee selection, a receipt step or a second confirmation.
- The newest released episode is the sole Latest / This Week feature. All
  earlier released episodes flow into the compact grid automatically in
  ascending episode order, so adding an episode does not require redesigning
  the storefront.
- Do not pre-place decorative puffy stickers on Study Pack storefront or detail
  pages. Stickers belong to the learner: they choose real stickers from their
  own authenticated Closet inventory and place them themselves.
- Every completed Study Pack asset page must expose that learner-controlled
  action: choose a Puffy from the existing Closet pouch, save the exact asset
  with it, then allow the learner to change or peel it off. Reuse the canonical
  Puffy Board record and approved 75-piece collection; never invent a
  prototype-only sticker set or imply account sync before it is verified.
- Opening an episode card leads to one fun, colourful pack-detail page showing
  every included pack item and what each item does.
- Episode 01 contains exactly: Cheat Sheet, Try-On and Trading Card Pack. The
  Pop Quiz remains a separate next step at SUNNYVAiLE High.
- Episode 01 is the review standard before rollout. Its Cheat Sheet must remain
  one responsive web artifact with real one-page Letter and A4 downloads,
  current scoped evidence, sources, checked date and updated reason. The Try-On
  and real six-card pack must remain the other two working choices.
- The Episode 01 final-takeaway comic must show the actual three-part learning
  sequence: choose one small low-risk task; supply who/goal/facts as context;
  review and correct the result yourself. Do not substitute fashion selection,
  shopping, a mood board, destination planning, a rubber approval stamp or any
  other scene whose visual story conflicts with those actions. Generated
  figures must pass an anatomy check with no stray or duplicated limbs.
- Do not propagate this chassis to Episodes 02–04 until Ali approves the
  complete Episode 01 experience. After approval, build the Trailer companion
  pack to teach how to use SUNNYVAiLE before weekly rollout.
- Every episode is one coordinated pack identity with its own background and
  accent palette. Preserve the common layout and comic/trading-card anatomy.
- Use the current Homepage gradient family, saved LAiDIES pop-comic references,
  real episode art and the approved current live wordmark.
- No pale ledger, cream/paper, black-dominant interface, generic white-card
  dashboard, muted one-colour episode tiles or candy text-box accents.
- Record truthful availability. Planned or held items remain visible but cannot
  pretend to open.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
