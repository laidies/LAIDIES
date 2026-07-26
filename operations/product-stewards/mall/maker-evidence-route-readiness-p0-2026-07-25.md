# Mall route-readiness P0 maker evidence

**Status:** MAKER PASS · EXACT ARTIFACT VERIFIED LOCALLY — INDEPENDENT JUDGE PENDING  
**Release status:** NOT DEPLOYED · NOT PUBLICLY VERIFIED

## Implemented

- complete Mall `OPERATING-SPEC.md`;
- 12-destination machine readiness/claim register;
- deterministic directory result/reset/no-result announcement and focus;
- safe query rendering, explicit result count and optional Unit 11 recovery;
- keyboard/reduced-motion corridor announcements;
- visible preview status for all ten departments;
- truthful Gift Shop browse-only/concept/source-art/device-local wording;
- truthful Unit 11 Hyvor/provider/no-guarantee/fallback wording;
- source and rendered journey automation.

## Source verification

```text
MALL READINESS PASS
destinations=12 reference_departments=10 commerce=held community=external

MALL BROWSER PASS
proof=local discovery/routes/claims/keyboard/focus/reflow/reduced-motion only
not_proof=editorial-rights,Hyvor moderation,commerce,fulfilment,deployment,public

INLINE JS PASS · 352 scripts across 132 live pages
LOCAL LINKS PASS · 1956 references across 110 pages
CHECK-TOWN PASS
```

The browser suite rendered every named department, Gift Shop and Unit 11,
verified directory/corridor parity, malicious no-result text, focus restoration,
keyboard corridor movement, 640px/200%, 320px/400% and reduced motion.

## Exact artifact

```text
/tmp/laidies-mall-p0-final.mlvQhc
1078 files · 961.4 MiB
MALL READINESS PASS
MALL BROWSER PASS
Public metadata validation passed
MALL GOVERNED SOURCE/ARTIFACT MATCH PASS
```

The builder warns that the evidence-only artifact exceeds its internal 750 MiB
threshold. That is a release-size/operations hold, not a failed Mall route
check. No deploy was attempted.

Governed public-file SHA-256:

```text
0a91806ba9140e995c623736809e04e5423df46f6842dfcafbac057b9f325318  mall.html
3caa6b6f6a38643a846aaa286120951ddfa82f614d08d6aae2b25769c5e00bae  shop.html
1cfe5cfd1a83164f58586feefb95177694bd07e74995dae7c63c33258680c83d  community/burn-book.html
3c6b4093544659e704c87e0865c5faa4989151ab92a6f64ea6610ae04e6bade9  content/mall-v2.css
f1362565582eec48d2bd314991e5966899465d4eaab669e35f80236cfa2a4ccc  content/site/mall-v2.js
8eea93d9e4b9a10c4507cd5674f3af9dffdc8cc276f370ca0a14ae1529b4c555  content/site/shop-v2.js
```

## Maker self-score

| Gate | Score | Rationale |
|---|---:|---|
| Product quality | 18/20 | Complete discovery contract and journey; shop substance remains separately held. |
| Accuracy/safety/trust | 19/20 | Commerce and community claims fail closed; no provider or commercial outcome is inferred. |
| LAiDIES brand contribution | 18/20 | Preserves Centre Court/directory/corridor object-world while making its promise more credible. |
| UX/accessibility | 18/20 | Deterministic search/focus/keyboard/reflow/reduced-motion proof; screen-reader/manual real-device review remains. |
| Technical/reliability | 18/20 | External register plus source/render tests; exact artifact and public origin remain. |

These are maker scores, not approval. An independent judge must rule.

## Learning scan

BTB-108 records the verified failure where Gift Shop replaced the stable
product-region DOM ID with an item persistence key. The internal control now
keeps `#shopProduct` stable and carries the changing Puffy identity in
`data-puffy-id`.

## Holds

No editorial/rights/currentness approval, Hyvor moderation/provider guarantee,
commerce/affiliate/checkout, stock, price, production, fulfilment, refund,
analytics baseline, deployment or public-origin result is claimed. No
nomination was submitted, no credentials/private data were used and no Git
mutation occurred.
