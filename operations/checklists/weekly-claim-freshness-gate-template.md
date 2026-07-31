# Weekly claim freshness and propagation gate — Episode NN

**Week / episode:**  
**Run date:**  
**Owner:** Weekly Episode Engine  
**Claim-register report:**  
**Result:** HOLD | PASS

## 1. Run the register and candidate check

```bash
node scripts/check-content-freshness.mjs \
  --as-of YYYY-MM-DD \
  --episode NN \
  --report operations/product-stewards/learning-content-ecosystem/freshness-runs/YYYY-MM-DD-episode-NN-weekly.md \
  --json operations/product-stewards/learning-content-ecosystem/freshness-runs/YYYY-MM-DD-episode-NN-weekly.json \
  --strict
```

- [ ] Register and signal inbox validate.
- [ ] Due/blocked claims are zero or held from the package.
- [ ] Every active AIDB/NewsStand/manual signal has an owner disposition.
- [ ] High/material unregistered candidates used by this package were reviewed.

## 2. Claim/source decisions

| Claim ID / candidate | Exact episode use | Current primary/official evidence | Decision | Owner | Evidence |
|---|---|---|---|---|---|
|  |  |  | NO CHANGE / CURRENT NOTE / UPDATE / HOLD / RE-RECORD OR REFILM |  |  |

`NO CHANGE` requires a reason. Opening a source is not proof that its claim
still supports the exact wording.

## 3. Consumer propagation

| Claim ID | Consumer | Required action | Implemented version | Exact verification | Status |
|---|---|---|---|---|---|
|  | canon |  |  |  |  |
|  | narration / audio |  |  |  |  |
|  | captions / transcript |  |  |  |  |
|  | article / episode text |  |  |  |  |
|  | image / video |  |  |  |  |
|  | Cheat Sheet / Study Pack |  |  |  |  |
|  | Trading Cards |  |  |  |  |
|  | LIBRAiRY |  |  |  |  |
|  | Classes |  |  |  |  |
|  | quiz / game / tool |  |  |  |  |
|  | NewsStand / current note |  |  |  |  |
|  | search / index / email / social |  |  |  |  |

Delete non-consumers only after confirming they do not carry the claim. Add
every omitted consumer discovered during production to `claim-register.json`.

## 4. Release truth

- [ ] New narration is integrated, not merely scripted.
- [ ] Generated/rendered pages and PDFs were rebuilt from corrected sources.
- [ ] Educational art still expresses the corrected concept.
- [ ] Public freshness wording distinguishes `CHECKED` from `UPDATED`.
- [ ] Superseded copies cannot remain on a current route without an honest
  correction/hold.
- [ ] The exact public bytes and journeys were verified after release.

## Gate

**PASS** only when all material claims used by the package are current and
every affected consumer is dispositioned and verified. Otherwise record
**HOLD**, the owner and the smallest next action.
