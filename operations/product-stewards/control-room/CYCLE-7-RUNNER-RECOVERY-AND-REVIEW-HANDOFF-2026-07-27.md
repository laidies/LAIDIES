# Cycle 7 runner recovery and review handoff

Evidence time: 2026-07-27 10:15 PDT.

Status: **FAILED / CLOSED — DO NOT PRESENT**

The original Brand execution turn and a same-directory replacement both entered the same approval-loop/tool-state stall after `candidate.css` and `capture.mjs` existed. This was not an Ali decision or a design dependency. Control Room executed the existing unchanged capture harness directly, without duplicating the candidate edit or touching production/shared/live files.

The first capture exposed one exact invariant failure: a candidate `body` background colour leaked into the protected hero crop. Brand applied the smallest candidate-only correction, reran the harness, and sealed a successor whose hero crops are byte-identical to the incumbent.

Exact sealed evidence:

- `SEALED-MANIFEST.json` SHA-256 `54d03e570910a0687312dc047b6db8b6956d726d116d2416354c53f87da705fd`
- `candidate.css` SHA-256 `85ff4d0cd9927bc4918726db24beeca094bdd4e2cf9b18f49f4f51a8c2a5877b`
- desktop incumbent/challenger SHA-256 `3daac8b01aa25594a4f2bd8fc8829447f59ca6851e8e864229a60b06cdb98e39` / `4a194b87494d6945f9b41277a0e488e117f66f147b96551d4fa9f60ab871e7b0`
- mobile incumbent/challenger SHA-256 `40d3c3ac527f73ec5ff96897fc7c718aa497dc65ab63032b093b16f116c1f102` / `7f6bf9d64c3095eb23d730594f3155ec27ef420325c173a98eb993b8b8568dcc`
- shared desktop hero SHA-256 `a2496aceabc1de9624edd72c9bb39b67e626cf572a69f0e39d149ee82d617d05`
- shared mobile hero SHA-256 `0765beb763879ba4abfa1e9e335e3836b1d627c3c9b13ca43ab0dc84b27fa32d`

Diagnostics pass at 1440×900 and 390×844 for structure, copy, links/routes, image sources, complete images, runtime/features, protected-hero pixel identity and horizontal containment.

Town Entry then found one material failure outside the maker's sampled
diagnostics: the two `Why LAiDIES exists` body paragraphs inherited dark ink
on the new dark gradient, measuring roughly 1.09–1.52:1 and becoming visibly
unreadable at both viewports. The sealed tuple is therefore HOLD.

Brand completed that exact correction: `.why-box p` now uses `#f7fbfb` against
the unchanged `#23385d` → `#2a173d` gradient, with calculated endpoint
contrast of 11.22:1 → 15.64:1. The added descendant diagnostic samples the
exact nested text at both viewports.

The frozen successor is `SUCCESSOR-MANIFEST.json` SHA-256
`4d83636fb272670be509bf5898ac1976d27b72f09064d8cc48d097205acfcdaa`.
The prior manifest remains HOLD. Town Entry independently ACCEPTs the exact
successor for technical/product parity under receipt
`operations/product-stewards/town-entry-homepage/evidence/cycle-7-incumbent-visual-only-successor-independent-2026-07-27/INDEPENDENT-TECHNICAL-VERDICT.md`
SHA-256 `e54097cf514d3fb66cfacb6b85d9f9b05bd691cb81ae58b03dfe48cf30276135`.
Independent Brand material-superiority review HOLDs the successor:

- receipt `operations/design-explorations/sitewide-style-championship-20260726/cycle-7/incumbent-visual-only/evidence/independent-brand-review/SUCCESSOR-VERDICT.md`
- SHA-256 `54f4ddb15b427ea164ad36ca509912e6bd88a3514c9aedf14bbccf2f3d7bcb0f`
- scores: adult craft 16, distinctiveness 17, vibrancy 18, comprehension 18,
  cohesion 16, mobile 14 and repeatability 14
- only 3/7 required floors clear
- the unchanged image set retains `fairy-godmother-scene.webp`, which the
  governing image register marks REPLACE everywhere
- repeated heavy borders, offset shadows and four-colour rules weaken mobile
  weight, varied hierarchy and repeatability

Cycle 7 is closed as failed evidence. It must not be presented to Ali,
integrated or used as a propagation base. No automatic successor is
authorised. No integration, commit, deploy, publication, spend or public
authority is inferred.

Brand recorded final closure at
`operations/design-explorations/sitewide-style-championship-20260726/cycle-7/incumbent-visual-only/CLOSURE.md`
SHA-256 `7dd58de790dd3c101a9935bf035c56669b61b075b58f4afa67b92f33b44ae418`
at 2026-07-27 10:25:49 PDT and returned IDLE.
