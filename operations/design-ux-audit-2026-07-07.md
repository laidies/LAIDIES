# LAiDIES / SUNNYVAiLE — Design + UX Audit (2026-07-07)

Read-only audit from code (HTML/CSS/JS); contrast ratios computed from actual token hex.
Sample: index, blend-snap, sunnyvaile-high, issue-02, trading-cards, laidies-card, library,
slaiyer-handbook-chapter-1, visitors-centre + shared chrome (sv-global-header.js, sv-nav-auth.js,
sunnyvaile-page.css, styles.css, episode-page.css).

## Headline
The core town experience is **well-built** — real semantic HTML, a strong auto-injected global
header + town directory, consistent `.sv-cta`, correct viewport metas everywhere, lazy-loading on
galleries. **Biggest opportunity: consolidate a fractured design system** — two colliding CSS token
sets (`--pearl` literally *inverts* meaning), four font systems, three page "families" that don't
share chrome. That drift also causes the worst a11y bug: **gold text on cream/pearl fails WCAG AA
everywhere.**

## Working well
Semantic hygiene (real `<main>/<header>/<footer>`, real `<button>`s, sequential headings, good alt/
aria) · the global header system (sticky, aria-current, honest back-nav, Esc/outside-close) ·
viewport metas on all pages · responsive fundamentals (clamp type, media queries) · plum (12.85:1),
rose (6.33:1), muted (5.57:1) all pass AA on cream.

## P0 — breaks usability / accessibility
- **P0-1 · Gold text on light fails WCAG AA (systemic).** `--gold #c9a227` on cream = **2.38:1**, on
  pearl = **2.13:1** (need 4.5). Live in `.shelf-glyph`/`.stop-num` (`sunnyvaile-page.css:219`, every
  SV page) + the gold uppercase "eyebrow" motif in ~18 files. **Fix:** add a `--gold-ink` (~#8a6f1e)
  for text-on-light; keep bright gold only for fills/borders/glyphs/dark-bg labels (gold-on-plum
  5.39:1 passes).
- **P0-2 · No skip link anywhere** despite sticky headers. **Fix:** inject one visually-hidden-until-
  focused `Skip to content` as first body child via the global header; give `<main>` an id.
- **P0-3 · No visible focus styles in the primary stylesheet.** `sunnyvaile-page.css` +
  `episode-page.css` have **zero** `:focus` rules (old `styles.css` has 67). **Fix:** global
  `:focus-visible { outline:2px solid var(--rose); outline-offset:2px; }` in both.

## P1 — important
- **P1-1 · Two colliding token systems; `--pearl` inverts** (near-white vs tinted pink); `--gold`,
  `--blush`, `--teal` also differ. Grimoire loads legacy `styles.css`. **Fix:** one canonical token
  file, `@import` everywhere, migrate grimoire off legacy (or alias).
- **P1-2 · Primary CTA color unresolved** — plum→rose vs solid gold vs rose-outline across the same
  homepage. **Fix:** lock `.sv-cta--primary` (plum→rose); demote gold-fill buttons to secondary.
- **P1-3 · Competing join/start destinations** (header Join→clubhouse-pass, hero→maikeover,
  →#signup, →visitors-centre, →chick-flicks) + a **dead** inline `join-btn` href the header
  overwrites. **Fix:** one primary conversion; header + hero agree.
- **P1-4 · Three page families don't share chrome** — episodes + grimoire don't load the global
  header (soft dead-ends; no town menu). **Fix:** bring them onto the global header, or add the
  town-menu affordance.
- **P1-5 · Four type systems** (town Jost/Playfair · episodes Source Serif · games Georgia · grimoire
  Cinzel/Garamond). **Fix:** one display + one body default; grimoire = documented exception; drop
  Georgia.
- **P1-6 · Episode articles token-free + small type** (body 0.92rem/~14.7px; labels 0.44–0.58rem;
  113KB single scroll). **Fix:** adopt tokens, raise base to ~16–17px, floor labels ~11–12px.

## P2 — polish
Tap targets <44px (header back/fwd 34px) · footer inconsistent/missing on trading-cards + grimoire ·
homepage has ~956 lines inline `<style>` (token-drift source) · `prefers-reduced-motion` not honored
on town pages.

## Quick wins (high-impact / low-effort)
1. **Skip link + global `:focus-visible`** → clears P0-2 + P0-3 site-wide (2 small additions).
2. **`--gold-ink` token + swap gold-on-light text** → clears P0-1 without touching decorative gold.
3. **Fix dead `join-btn` href + align header/hero CTA on one destination** → de-confuses P1-3.
4. **WebP the large PNGs** (assets 3.1GB; album/poster/BWS frames 5–8MB each; saint cards ~1.7MB) —
   lazy-loading mitigates but weights are heavy.
