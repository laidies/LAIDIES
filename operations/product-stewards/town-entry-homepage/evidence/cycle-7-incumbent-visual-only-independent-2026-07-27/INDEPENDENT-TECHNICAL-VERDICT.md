# Town Entry independent technical verdict — Cycle 7 Homepage visual-only tuple

**Evidence time:** 2026-07-27T10:16:53-07:00  
**Verdict:** **HOLD**  
**Scope:** exact sealed Cycle 7 Homepage visual-only tuple  
**Authority ceiling:** technical consumer verification only; no Brand
material-superiority judgment and no Ali approval inferred  
**Mutation truth:** judge-only; candidate, live, shared, production, deploy and
public state unchanged

## Exact tuple verified

- Root:
  `operations/design-explorations/sitewide-style-championship-20260726/cycle-7/incumbent-visual-only/`
- `SEALED-MANIFEST.json` SHA-256
  `54d03e570910a0687312dc047b6db8b6956d726d116d2416354c53f87da705fd`
- `candidate.css` SHA-256
  `85ff4d0cd9927bc4918726db24beeca094bdd4e2cf9b18f49f4f51a8c2a5877b`
- `capture.mjs` SHA-256
  `a6860341a2c6e0ba893ed98f6f5c1eeb831a30a0e0870308c8dceed251ca93e5`
- verified public Homepage byte SHA-256
  `238dff887de35233994d421b39bee0845a29b5bd09defd95dbe00d877773fb87`

The supplied four full-page renders were inspected at original detail. The
capture harness was not rerun in place because it writes into the sealed
candidate folder; the request explicitly permits exact reused render hashes.

## Visible evidence

| View | Incumbent | Candidate |
| --- | --- | --- |
| Desktop 1440×900 viewport | `evidence/baseline/desktop/homepage-incumbent-1440.png` SHA `3daac8b01aa25594a4f2bd8fc8829447f59ca6851e8e864229a60b06cdb98e39` | `evidence/candidate/desktop/homepage-challenger-1440.png` SHA `4a194b87494d6945f9b41277a0e488e117f66f147b96551d4fa9f60ab871e7b0` |
| Mobile 390×844 viewport | `evidence/baseline/mobile/homepage-incumbent-390.png` SHA `40d3c3ac527f73ec5ff96897fc7c718aa497dc65ab63032b093b16f116c1f102` | `evidence/candidate/mobile/homepage-challenger-390.png` SHA `7f6bf9d64c3095eb23d730594f3155ec27ef420325c173a98eb993b8b8568dcc` |

Hero crops are byte-identical:

- desktop incumbent/candidate shared SHA-256
  `a2496aceabc1de9624edd72c9bb39b67e626cf572a69f0e39d149ee82d617d05`;
- mobile incumbent/candidate shared SHA-256
  `0765beb763879ba4abfa1e9e335e3836b1d627c3c9b13ca43ab0dc84b27fa32d`.

## Literal technical checks

PASS:

- manifest and all supplied file/render hashes match;
- public byte binding matches the manifest;
- structure is identical: 32 headings, 81 links, 35 buttons, 10 main
  sections, 2 forms and 26 images;
- text hashes are identical within each viewport;
- href hashes are identical at desktop and mobile;
- image-source hashes are identical;
- 26/26 images are complete and visible, with zero broken or hidden images;
- desktop width is `1440/1440`, horizontal overflow false;
- mobile width is `390/390`, horizontal overflow false;
- exact masthead/hero pixels are unchanged at both viewports;
- candidate CSS contains no `display:none`, visibility suppression, interactive
  pointer-event block or route/runtime mutation; its only `pointer-events`
  declaration is `none` on a decorative section-rule pseudo-element;
- full-page desktop/mobile inspection confirms the incumbent content order,
  controls, destinations and imagery remain present.

Copy/IA naming parity is exact with the verified public baseline. That parity
also preserves two pre-existing canonical-name exceptions: the Civic Square
card says `Visitor Centre`, and the embedded town-map artwork visibly contains
the old Welcome Wagon/Visitor's Center sign. They are not introduced by this
visual-only candidate and remain separate successor naming/image-register
work; technical parity is not proof that those baseline exceptions are
resolved.

## Blocking readability failure

`candidate.css` changes `.why-box` to a dark gradient
`#23385d → #2a173d`, but its broad rule
`.explainer p { color: #17142f; }` directly overrides the inherited light card
text for paragraphs nested inside `.why-box-lg > div`.

The two body paragraphs beginning:

- `Women have shaped computing...`; and
- `What it becomes next...`

are visibly near-black on the dark panel in both sealed candidate renders.
The same issue affects the short Karen Spärck Jones introduction. Approximate
endpoint contrast is:

- `#17142f` on `#23385d`: **1.52:1**;
- `#17142f` on `#2a173d`: **1.09:1**.

This is far below the normal-text 4.5:1 target and makes meaningful Homepage
content difficult to read. The maker contrast sample omitted `.why-box p`, so
the otherwise passing diagnostics did not detect it.

## Exact next action

Brand corrects the nested Why-panel paragraph colour to a light value that
meets contrast across the full gradient, adds `.why-box` body text to the
computed contrast diagnostics, recaptures desktop/mobile, and reseals every
changed hash. Town Entry then rejudges that successor tuple. No live
integration, Ali review or material-superiority decision should proceed from
this HOLD.
