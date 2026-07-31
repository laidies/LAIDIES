# Town Entry independent technical verdict — Cycle 7 contrast successor

**Evidence time:** 2026-07-27T10:21:59-07:00  
**Verdict:** **PASS**  
**Scope:** exact narrow Cycle 7 contrast-repair successor only  
**Prior HOLD:** `../cycle-7-incumbent-visual-only-independent-2026-07-27/INDEPENDENT-TECHNICAL-VERDICT.md`
SHA-256
`2d94a89572fe25c805e76e3f57dd2135471427705f82fc445a8bf983d67aa552`  
**Authority ceiling:** technical consumer verification only; no Brand
material-superiority judgment or Ali approval  
**Mutation truth:** candidate, live, shared, production, deploy and public
bytes unchanged by the judge

## Exact successor tuple

- Root:
  `operations/design-explorations/sitewide-style-championship-20260726/cycle-7/incumbent-visual-only/`
- `SUCCESSOR-MANIFEST.json` SHA-256
  `4d83636fb272670be509bf5898ac1976d27b72f09064d8cc48d097205acfcdaa`
- `candidate.css` SHA-256
  `c78cd72c437dc2b4cd2aadbf06e54263b255ab420724f2473ab41a1ea33dc383`
- `capture.mjs` SHA-256
  `c5a52ad98c9d9062a0d5e02542540b64ed9508d4d529f535e6b84f8a8db0a9c9`
- desktop candidate SHA-256
  `943cb5608eeb77c5b1928584f22840ae722f4571f1f0b6ab820de0bf98ae9070`
- mobile candidate SHA-256
  `d51760ccc695a84363980d27892223ede528334ede03bcb61c41d441e5d16a6f`
- desktop diagnostics SHA-256
  `747854a902628976611afc2f41318a3fb375d4460ae3170cac9e852c8f196415`
- mobile diagnostics SHA-256
  `169541818ad3950ae5a2eb00109f62380ea3cd87b56b35aa9789924e41ce4374`

Every supplied hash matches the on-disk successor. The capture harness was not
rerun in place because it writes into the sealed candidate folder; exact
successor renders and receipts were inspected without mutation.

## Prior blocker resolution

The successor adds:

```css
.why-box h3,
.why-box p {
  color: #f7fbfb;
}
```

The new diagnostic selector
`.why-box p:not(.eyebrow):not(.foundress-caption)` records, at desktop and
mobile:

- foreground `rgb(247, 251, 251)`;
- surface `why-box why-box-lg`;
- background
  `linear-gradient(145deg, rgba(242,56,131,.2), transparent 45%),
  linear-gradient(135deg, rgb(35,56,93), rgb(42,23,61))`.

Independently recomputed endpoint contrast:

- `#f7fbfb` on `#23385d`: **11.22:1**;
- `#f7fbfb` on `#2a173d`: **15.64:1**.

Original-detail inspection confirms the previously unreadable Why-panel body
paragraphs are visibly readable in both sealed successor renders.

## Literal invariant results

PASS at desktop 1440×900 and mobile 390×844:

- structure: 32 headings, 81 links, 35 buttons, 10 main sections, 2 forms and
  26 images;
- text hash equals incumbent;
- href hash equals incumbent;
- image-source hash equals incumbent;
- 26/26 images complete and visible; zero broken or hidden;
- desktop width `1440/1440`, horizontal overflow false;
- mobile width `390/390`, horizontal overflow false;
- desktop hero incumbent/candidate shared SHA-256
  `a2496aceabc1de9624edd72c9bb39b67e626cf572a69f0e39d149ee82d617d05`;
- mobile hero incumbent/candidate shared SHA-256
  `0765beb763879ba4abfa1e9e335e3836b1d627c3c9b13ca43ab0dc84b27fa32d`;
- no display/visibility suppression, interactive pointer-event block, route,
  runtime or functional mutation in candidate CSS.

The successor inherits exact canonical naming/copy/IA parity with the verified
public baseline. Pre-existing `Visitor Centre` spelling and embedded old-name
town-map artwork remain separate baseline naming/image-register obligations;
they are not successor drift and this technical PASS does not resolve them.

## Verdict boundary and next action

The exact contrast successor is **PASS** for Town Entry technical consumer
verification. Brand may now perform its separate material-superiority judgment
against the incumbent. This receipt is not live-integration authority,
deployment/publication authority or Ali approval. Any byte change requires a
new seal and re-verification.
