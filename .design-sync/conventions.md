# Building with the LAiDIES / SUNNYVAiLE design system

**Setup.** No provider or wrapper is required. Components are styled by plain CSS classes shipped in `styles.css` (which also sets the page's body font and colors — designs inherit them automatically). Give pages a light background by building them as `Band` sections rather than styling the body yourself.

**Page skeleton.** A LAiDIES page is a vertical stack of full-width bands: `SiteHeader` at the top, then `Band tone="cream" | "pearl" | "blush"` sections (alternate tones), `SiteFooter` at the bottom, optionally `QuickRail` (fixed right edge, hidden on mobile). Inside each Band: `Container`, then `SectionHead` (kicker + title + optional paragraph), then content.

**Styling idiom — tokens, not utility classes.** There are NO utility classes in this system; components carry semantic classes internally. For your own layout glue use inline styles with the CSS custom properties: `--plum` (#4b2148, primary text/ink), `--plum-deep`, `--plum-soft`, `--rose` (#9b3f5f, the accent), `--rose-bright`, `--gold` (#c9a227), `--cream` (#fffdfb, page bg), `--pearl`, `--blush`, `--line` (hairline borders), `--pad-x` (responsive horizontal padding). Headings render in 'Playfair Display' serif; UI/body text in 'Jost' (both load via a Google Fonts `@import` in `styles.css` — don't add font links).

**Brand rules (canon — not optional).**
- Every brand word containing "Ai" — LAiDIES, SUNNYVAiLE, RAiDIO, LIBRAiRY, MAiKEOVER, LUMINAiRY, FAiRY, MAiN — must render through `BrandWord`, never as plain text. It colors the "Ai" rose and survives uppercase contexts.
- CTA labels for `Button` and Masthead CTAs include a literal trailing arrow in the text: "Pick up this week's episode →". But `EpisodeCard`'s `ctaLabel` and `ToolCard`'s `ctaLabel` get the arrow appended by CSS — never add one there.
- Copy voice: playful Y2K small-town, but never meta-commentary explaining the brand's wordplay.

**Composition rules.**
- `RitualBeat` renders an `<li>` — only place it inside `RitualList` (usually within `RitualBlock`).
- `JoinCta` only inside `JoinBand` — its secondary variant is translucent white and invisible on light backgrounds.
- `SaintCard` in `SaintsRail`; `ToolCard` in `ToolsGrid`; `DirectoryCard` in `DirectoryGrid`; `QuickTripOption`/`QuickTripDivider` in `QuickTripBlock`.
- `SaintCard`'s `imageSrc` feeds a CSS `background-image` — a data URI must be `encodeURIComponent`-encoded; plain `<img>` props (`EpisodeCard`, `QuickTripOption`, `Masthead`) are tolerant.

**Where truth lives.** Read `styles.css` before inventing styles — the `:root` token block is at the top, component classes below. Each component's `.prompt.md` shows its intended composition.

**Idiomatic example:**
```tsx
import { Band, Container, SectionHead, BrandWord, EpisodeCard } from '@laidies/design-system';

<Band tone="pearl">
  <Container>
    <SectionHead
      kicker="Every Wednesday in town"
      title={<>Wednesday in <BrandWord>SUNNYVAiLE</BrandWord>.</>}
    >
      A new episode at The Chick Flicks, a Study Pack at Blend &amp; Snap.
    </SectionHead>
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 28 }}>
      <EpisodeCard eyebrow="This week at The Chick Flicks" title="Episode 4 · A SLAiYER Needs a Watcher" ctaLabel="Read the episode" href="#">
        The one in which she opens five browser tabs — and asks which tool is best for the scene.
      </EpisodeCard>
    </div>
  </Container>
</Band>
```
