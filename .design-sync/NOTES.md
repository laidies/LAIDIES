# design-sync notes — LAiDIES / SUNNYVAiLE DS

- The design system lives at `design-system/` (created 2026-07-03 specifically for this sync — the site itself is static HTML/CSS). Components are thin React wrappers over the **homepage's** design language: `design-system/src/styles/laidies.css` is extracted verbatim from `index.html`'s inline `<style>` blocks plus the site-wide `.brand-ai` rule from `styles.css`. If the homepage's inline styles change, re-extract (see the file's header comment) before re-syncing.
- The site has TWO design languages: the newer homepage system (Playfair Display + Jost, cream/plum/rose/gold — what this DS wraps) and the older interior-page system (`styles.css`, Inter/Georgia, dark header). Interior-page patterns (`.button.primary`, `.cf-vhs`, `.game-card`…) are deliberately NOT in the DS.
- Converter runs from the repo root: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules design-system/node_modules --entry ./design-system/dist/index.js --out ./ds-bundle`. Build the package first with `cd design-system && npm run build`.
- Fonts are Google-hosted (`@import` in laidies.css) → validate prints `[FONT_REMOTE]` for Jost + Playfair Display; expected, no action. Inter and Dancing Script are also in the import.
- Arrow gotcha: `.ritual-cta`, `.episode-card-cta`, `.tool-open` auto-append "→" via CSS ::after — preview/usage labels must NOT include the arrow. `.btn-primary` / masthead CTAs / `.quick-trip-opt-cta` / `.quick-trip-all` include "→" literally in the label (site canon).
- Data URIs used as `background-image` (SaintCard portrait) must be encodeURIComponent-encoded — unencoded spaces/quotes break `url(...)`.
- Preview images: use inline SVG data URIs; site asset paths 404 inside preview cards.
- `guidelinesGlob: []` because `docs/` holds per-component doc stubs (category frontmatter for grouping), not design guidelines — the default glob would sweep them into guidelines/.
- QuickRail is position:fixed → `overrides.QuickRail = {cardMode: single, viewport 420x520}`.

- Standalone `.kicker` rule added to laidies.css under the "DS additions" comment block (index.html only styles `.section-head .kicker`).
- QuickRailItem carries inline `justifyContent: 'flex-start'` — fixes a real site bug where the opacity-0 hover label pushes the icon out of the 44px circle (reproduced on live index.html; a task chip was spawned for the site-side fix).
- QuickTripOption collapses to a single grid column via inline style when `imageSrc` is omitted (site CSS hard-codes `92px 1fr`).
- Preview wrappers that mirror real layout slots: EpisodeCard cells in maxWidth 420 divs, SaintCard in width 240 divs, JoinCta inside a plum→rose gradient div (secondary variant is invisible on cream). Masthead preview uses a shortened (1664×560) stand-in hero SVG so the CTA fits the capture cell.
- cardMode overrides in config: QuickRail single/700x520 (rail is display:none ≤640px); ToolsGrid, Band, JoinBand, SiteHeader column (GRID_OVERFLOW).

## Known render warns
- `[FONT_REMOTE] "Jost", "Playfair Display"` — Google Fonts served at runtime; legitimate.

- **iCloud Drive corrupts rapid build churn**: the repo lives in `com~apple~CloudDocs`; building `ds-bundle/` inside it produced macOS conflict-duplicate dirs (`brand 2`, `components 2`) and vanishing files mid-traversal. **Always pass `--out` to a local path outside iCloud** (e.g. `/private/tmp/laidies-ds/ds-bundle`). `.design-sync/.cache` has been fine so far, but watch for `* 2` dirs after any interrupted run.
- cardMode column overrides also on DirectoryGrid + SaintsRail (flagged once builds moved to local disk).

## Re-sync risks
- laidies.css is a snapshot of index.html's inline styles, not a live reference — homepage style edits silently drift until re-extracted.
- DesignSync authorization was unavailable in the build session (headless; /design-login needed) — first upload may have happened in a later session; check config.json projectId.
