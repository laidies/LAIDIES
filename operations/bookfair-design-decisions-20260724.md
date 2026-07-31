# Book Fair v2 construction decisions

Date: 2026-07-24

## Source truth

The inherited Book Fair already had the live butterfly-clip balance, eight
redeemable drops, ownership checks, Closet destination, and Pop Quiz route.
The page presented those functions as a narrow introduction followed by a
two-column grid of repeated rounded cards.

The reward and storage logic was not rewritten.

## Construction

The Book Fair now behaves like a temporary school-gym shop:

- the real gym is the full arrival;
- the live butterfly-clip balance is a physical clip-jar band;
- the eight current drops sit on one horizontally operable merchandise rack;
- the rack is wider than the viewport by design and works by swipe or scroll;
- an insufficient-balance attempt returns a visible message without changing
  balance or ownership;
- the departure rail returns to the Pop Quiz or opens the Closet.

The rack is deliberately one continuous object, not a generic card directory.

## Asset honesty

The eight catalog records contain intended product-image paths, but none of
those files exists yet. The page therefore does not request broken image URLs.
Each drop displays its physical product label until an actual proof is present.
An image may be enabled only by setting `artReady: true` after its source file
has landed.

## Visual language

- the real gym carries the page rather than a boxed heading;
- near-black midnight blue anchors the clip jar and text;
- vivid pink, purple, cyan, cobalt, coral, and mint rotate across the rack;
- Anton is limited to display/product-label lettering and Jost remains the
  reading face;
- hard ruled edges and a continuous shelf replace rounded product cards;
- the light lilac/blush/cyan site gradient remains behind the rack.

## Boundaries

- the current gym image is a structural source, not a future rendering lock;
- the approved Episode 04 Heroine face remains the character rendering lock;
- no fake product mockup was generated or represented as finished inventory;
- the live butterfly-clip and Closet storage keys are preserved;
- placeholder download links remain labelled by the inherited coming-soon
  behavior until real printable files exist.
