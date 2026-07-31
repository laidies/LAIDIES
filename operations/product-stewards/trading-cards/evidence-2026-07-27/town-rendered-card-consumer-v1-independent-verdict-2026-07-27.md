# Independent verdict — Town rendered-card consumer v1

**Review time:** 2026-07-27 America/Vancouver  
**Verdict:** `ACCEPT — ISOLATED RENDERED-CONSUMER CANDIDATE ONLY`

The consumer may proceed to its separately locked technical catalogue and final
product/accessibility stages. This verdict does not admit a pack, card grant,
ownership, Closet projection, production route, deployment or public release.

## Exact bound tuple

| Input | SHA-256 | Result |
| --- | --- | --- |
| Town candidate catalogue | `45b17e19c44e3c6d1ad424bfd83c86519df03a35d9aa692313b77c793c65fefa` | exact |
| Accepted record-content verdict | `da1cbe8d2bdbee775be973625fad4591f49e966ff825bfbbcb29638c035f3dee` | exact |
| Candidate HTML | `433c28d6b3a0a83c2fef3ad6b8a3f5b154688603a8b6079105bf2631cb4d8c5f` | exact |
| Candidate CSS | `e333b1a77936a9c5812442a85713675caf19494f39f9fc04cee2ed8d2d4369a7` | exact |
| Candidate JavaScript | `1260d094a1749e579a6b69d79af846a4213b8fd3b35a00e5965f04430665ba40` | exact |
| Candidate test | `830fe0d7ec40c1384490adf7d758135a28c48c594495b31c67ba8ce850401186` | exact |
| Desktop evidence image | `95405e88aeb85b7641a5d1aca41f5591d19990ccb1187e03f8218f29f9365460` | exact |
| Mobile turned-card evidence image | `08cf5d471a666f61c7fe9fe87211b47bfcdfe6bb058a4a674df0d7725f8c7885` | exact |

Bounded candidate test passes:

```text
TOWN TRADING CARD RENDERED CONSUMER PASS records=13 fronts=13 backs=13 flip=keyboard-button 320=reflow reduced-motion=pass pack=held release=held
```

## Independent browser result

I served the isolated candidate from a read-only local origin and exercised it
at 1440, 390, 320 and 720px (the 720px run is the 200%-zoom/reflow proxy).

- Exactly 13 cards load at every size with no horizontal overflow.
- I scrolled each card into view and independently verified every lazy-loaded
  front has a nonzero natural image width. The apparent blank lower cards in a
  top-of-page full-height capture are lazy-image placeholders before scrolling,
  not missing or failed assets.
- Each of the 13 cards flips to readable rendered-copy back content and returns
  to its front. No back had internal vertical clipping.
- Native keyboard Enter turns the focused card, Space returns it, and each
  action updates `aria-pressed` plus the accessible name from Turn to Return.
  Visible focus remains available.
- The preview strip is explicit at every size: cards are not in a pack, do not
  grant ownership and are not released.
- Reduced-motion rendering contains without overflow.
- A forced catalogue-response failure fails closed with the message that
  nothing was added to a pack or collection; it does not render a partial deck
  or invent ownership.

## Truth and scope check — PASS

The 13 accepted Town-record contents—including Paulette's bounded cameo and
Matron Lumen's Town-keeper rather than SAiNT/MAiVEN/TRAiLBLAZER identity—are
presented only as a preview. No UI control writes storage, opens/grants a card,
calls a service, creates a pack, promises a reward, projects to Closet, or
claims a route/public release.

## Remaining gates

1. Technical catalogue admission and a final accessibility review in the
   eventual real consumer, including assistive-technology/native-browser work.
2. Separate pack selection, server-authoritative grant/open/replay/correction
   and private Closet-projection contracts if/when those are built.
3. Exact production integration, artifact, deployment, public-origin and
   rollback evidence.

## Learning scan

**Closed opportunity:** image-only Town faces now have an inspectable real
front/back consumer without inventing collection mechanics. Prevention rule:
when lazy art is used in a full-catalogue preview, judge every item after it is
scrolled into view; a top-of-page full-page screenshot alone cannot prove lower
assets loaded.

