# NewsStand Cycle 6 — four-publication product audit

**Status:** REPORT READY — RELEASE HOLD  
**Scope:** The Breaking, The Daily, The Weekly and The Tribune as distinct
subproducts coordinated by the existing NewsStand parent  
**No authority exercised:** no story publication, deploy, feed/API call,
credential inspection, owner approval or public-state claim

## Evidence and current operating truth

The reader, schema and dataset now use the exact four locked mastheads and
machine editions. The deterministic validator passes: four publications, one
visible Tribune, one held Weekly and no legacy `wednesday` key. The reader
contract passes ten state fixtures and the correction/retraction rollback
drill. The auto-publication evaluator passes its ten policy fixtures, but
`WOULD_AUTO_PUBLISH` is shadow policy output, not publication.

The data checked 2026-07-25 records Breaking and Daily as quiet, Weekly as held
and Tribune as current. The only actual intake workflow is
`.github/workflows/hot-goss-daily.yml`: manual dispatch, third-party RSS
snippets and an optional Anthropic rewrite into a seven-day private artifact.
It has read-only repository permission and is deliberately disconnected from
the public dataset. There is no wired twice-daily radar, producer approval
service, canonical-data writer, correction intake, deployment transaction,
public verification monitor or analytics pull.

One fresh local browser run failed the previously claimed 73-check suite at
`paper Back restores origin vicinity`. Body suppression, route, card and focus
checks before it passed, but the run stopped at the scroll assertion. This
audit therefore marks rendered history evidence **REGRESSION/FLAKY — HOLD**
until reproduced and repaired; it does not reuse the 2026-07-25 pass as current
proof.

## Distinct jobs, overlap and gaps

| Publication | Job and cadence | Audience | Current state | Overlap boundary | Principal gap |
|---|---|---|---|---|---|
| The Breaking | Rare qualified interrupt; no quota | Anyone whose choice should change before the next Daily | Quiet; zero stories | Model release qualifies when the landscape changes now; routine features stay Daily | No real interrupt pipeline, SLA, current fixture or public collapse proof |
| The Daily | Edited consequential briefing; checked daily, may be quiet | Newcomer needing context; returner needing compact change | Quiet; zero stories | Carries routine consequential updates; does not repeat an active Breaking without new value | No representative issue, previous-issue baseline or recurring producer |
| The Weekly | Durable synthesis; publish only when the week earns it | Newcomer building a map; returner connecting the week | Hold; one held health candidate | Synthesizes relationships, not a bundle of Daily cards or an evergreen class | Health review open; legacy Wednesday visual; no accepted Weekly |
| The Tribune | Sourced argument; no quota | Reader seeking an evidence-labelled LAiDIES position | One approved local record | May respond to news, but thesis/counterargument—not freshness—earns it | One record is not a recurring operation; public/correction proof absent |

Breaking and Daily share the explanation floor; urgency and timing separate
them. Daily and Weekly share developments; synthesis and durability separate
them. Weekly and Tribune may both be long, but one maps evidence while the
other argues a labelled position. None should absorb Library evergreen
reference, High assessment or episode teaching merely to look substantial.

## Editorial, corrections and currentness

The rule set is strong: primary-source-first research, comparative scrutiny,
no filler, explicit uncertainty, choice-changing release coverage, reality
checks and mandatory hard holds. The runtime schema records source approval,
access dates, `lastCheckedAt`, corrections and retractions. Two evidence
manifests and synthetic correction/retraction receipts exist.

The gap is authority and history. There is no append-only publication/correction
ledger, named production correction intake, source-recheck runner, raw-input
provenance receipt, or transaction binding candidate → approval → exact
canonical record. A mutable JS file plus adjacent evidence is inspectable but
not a complete newsroom backend.

## Reader, accessibility and visual audit

The four jobs appear before selection, current/quiet/hold/stale/unavailable are
programmatic and visual, held stories are suppressed, focus targets and
reduced-motion CSS exist, and the 390 px/zoom proxies previously passed. The
new browser failure makes history restoration unresolved. Native
Safari/VoiceOver, 200% browser zoom, source-link announcements, long
correction text and real-device performance remain unverified.

Paige, the room, physical rack, ink/paper palette and source-forward writing
are a strong LAiDIES fit. The four publication status controls are clearer
than the two legacy prop papers. The visible Weekly prop still says Wednesday
and needs owner-approved replacement or removal. Independent Repair 3 scored
brand only 15/20 because generic shared homepage descriptions and unapproved
art remained.

## Analytics and revenue

Plausible loads, but there is no NewsStand event contract or analytics pull.
Success measures should be comprehension, source use, correction
understanding, useful action, trust and voluntary return—not impressions,
alarm clicks or time-on-page. Archive queries may expose sensitive interests
and should not be logged raw.

Revenue is premature. Later candidates are membership support, accessible
print/collectible editions and clearly separated sponsorship. Every model
requires an editorial firewall, disclosure, rights, fulfilment, correction
independence and free access to core safety/civic explanations. Paid coverage,
affiliate-led ranking and sponsor-shaped framing are declined.

## External capability scout

Direct official RSS/Atom plus the existing private candidate format remains
the lowest-lock-in baseline. Inoreader Pro currently advertises monitoring
feeds, rules, newsletter ingestion, output feeds and at-least-hourly feed
refresh for USD $7.50/month annually or $9.99 monthly; API access is listed
under custom pricing. Feedly offers a REST API and higher-cost market
intelligence/AI-feed products. changedetection.io offers an Apache-2.0
self-hosted API, page/PDF change monitoring and notifications, with greater
maintenance and scraping risk. NewsAPI needs a key and a commercial
subscription outside development and adds licensing/rights review.

Recommendation: do not install a plugin or news API now. Run a reversible
four-week private discovery comparison: direct official feeds incumbent,
Inoreader Pro challenger and self-hosted changedetection.io challenger.
Measure qualified-primary-source recall, noise, time-to-triage, provenance,
failure visibility and monthly operator effort. None may write public data.
Approval owner: Ali for spend/accounts; Platform/Privacy for credentials/data;
Editorial/Accuracy for source policy.

Research accessed 2026-07-26:

- https://www.inoreader.com/pricing
- https://developers.feedly.com/reference/introduction
- https://feedly.com/market-intelligence/pricing
- https://changedetection.io/docs/api_v1/
- https://newsapi.org/docs
- https://newsapi.org/terms

## Independent-style scorecard

| Publication | Product/editorial /20 | Accuracy/trust /20 | LAiDIES brand /20 | UX/accessibility /20 | Technical/operations /20 | Total | Verdict |
|---|---:|---:|---:|---:|---:|---:|---|
| The Breaking | 17 | 18 | 16 | 14 | 11 | **76** | HOLD |
| The Daily | 18 | 18 | 16 | 14 | 11 | **77** | HOLD |
| The Weekly | 17 | 18 | 15 | 13 | 11 | **74** | HOLD |
| The Tribune | 18 | 18 | 17 | 14 | 13 | **80** | BOUNDED LOCAL PRODUCT PASS; RELEASE HOLD |

The first three miss the non-compensable 17/20 brand floor and have no
representative accepted publication. All four fail the operational release
gate. The Tribune’s score recognizes one approved local record, not current
public publication.

## Verdict and ranked action

**REPORT READY — FIX BEFORE LAUNCH.** Keep all public/owner/editorial holds.
Execute the P0 producer-to-reader packet, beginning with deterministic browser
history repair and a private four-publication fixture set. Do not add stories
to fill empty papers.
