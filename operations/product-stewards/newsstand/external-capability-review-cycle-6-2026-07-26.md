# NewsStand external capability review — Cycle 6

**Status:** RECOMMENDATION ONLY — NO INSTALLATION, ACCOUNT, SPEND OR DATA ACCESS

## Problem

The NewsStand needs reliable discovery of material primary-source changes.
Discovery must reduce missed signals and manual scanning without becoming
publication authority, laundering summaries into facts or creating a
rights/privacy burden.

## Options

| Option | Benefit | Cost/limits | Risks and exit |
|---|---|---|---|
| Direct official RSS/Atom + local private manifest | Lowest lock-in; provenance starts at official sources; no new account | Engineering upkeep; sources without feeds need manual checks | Keep as incumbent; export is ordinary URLs/JSON |
| Inoreader Pro | Monitoring/web/newsletter feeds, filters/rules, output feeds; advertised hourly maximum refresh | USD $7.50/month annual or $9.99 monthly as observed 2026-07-26; API is custom | Vendor account and collected reading/source metadata; OPML/output feeds aid exit |
| changedetection.io self-hosted | Apache-2.0 API; page/PDF diffs and notifications; can watch official pages without feeds | Hosting/browser maintenance, change noise and scraping failures | Keep only URLs/diffs; remove service and restore direct checks |
| Feedly API/Market Intelligence | REST integration and AI-feed discovery | Market Intelligence/API pricing and operational terms require vendor inquiry | Higher lock-in and opaque ranking; export sources and preserve raw receipts |
| NewsAPI | Broad article discovery through one keyed REST API | Commercial use requires paid plan; limits and terms apply | Secondary discovery only; licensing, retention and attribution review required |

## Recommendation and reversible proof

Do not install or connect a plugin now. For four weeks, compare incumbent
official feeds against Inoreader Pro and self-hosted changedetection.io using
private, non-public candidate receipts. Score qualified-primary-source recall,
false positives, time-to-triage, provenance completeness, outage visibility,
operator time and deletion/export. No challenger may summarize directly into
public copy or write the canonical dataset.

Ali approves accounts/spend; Platform and Privacy approve credentials, storage
and deletion; Editorial/Accuracy approve the source list and evaluation.

Official/vendor sources accessed 2026-07-26:

- https://www.inoreader.com/pricing
- https://developers.feedly.com/reference/introduction
- https://feedly.com/market-intelligence/pricing
- https://changedetection.io/docs/api_v1/
- https://newsapi.org/docs
- https://newsapi.org/terms
