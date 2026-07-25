# EOD 2026-07-25 whole-site relaunch QA

**Status:** INITIAL AUDIT COMPLETE — its P0 findings have been dispositioned in
[`closure-2026-07-25.md`](closure-2026-07-25.md). Use the closure record and
[`../../release-control/RELEASE-STATE.md`](../../release-control/RELEASE-STATE.md)
for the current release verdict; do not treat this initial snapshot as current
deployment state.

This is a read-only audit of the dirty local working tree, plus safe HTTP
reachability checks against `https://laidies.ai`. It does not claim a public
browser pass, real form submission, authenticated member flow, media playback,
or a clean-first-visitor comprehension result.

## Go/no-go cutline

Do not announce or promote the full-site relaunch until P0-01 through P0-04
are fixed, hidden, or truthfully relabelled and the named retests pass.

| ID | Priority | Required disposition today | Exact target and evidence |
|---|---|---|---|
| P0-01 | FIX | Restore the SUNNYVAiLE High dataset and every runtime puffy path, then rebuild and rerun mobile/browser smoke. | [`sunnyvaile-high.html:878`](../../../sunnyvaile-high.html#L878) fetches `/content/site/high-classes.json`, which is present locally but returned **404** from `laidies.ai` and the candidate. The candidate also 404s `/assets/puffies/puffy-bookmark-summer.png` and `puffy-icecream-pink.png`; their constructed references are in the runtime data loaded by [`sunnyvaile-high.html:503`](../../../sunnyvaile-high.html#L503). |
| P0-02 | FIX or LABEL | Make Girl Talk completion/reward authoritative, or use honest-system copy everywhere and remove any verified-post/reward implication. | [`games/girl-talk.html:1224`](../../../games/girl-talk.html#L1224)-[`1230`](../../../games/girl-talk.html#L1230) calls `awardSticker()` while opening an external community room; it cannot observe a post. Existing disclosure at [`722`](../../../games/girl-talk.html#L722) is helpful but does not repair all reward implications. |
| P0-03 | HIDE or LABEL | Remove BEST FRIENDS unlock language from launch surfaces until a durable, idempotent send/open/join/reward lifecycle is tested with two accounts. | [`postcard.html:107`](../../../postcard.html#L107), [`174`](../../../postcard.html#L174), and [`181`](../../../postcard.html#L181) promise that a recipient joining completes a mutual necklace. The release matrix already records this journey as FAIL. |
| P0-04 | DECIDE / REDUCE | Establish an explicit release-size exception or cut candidate bytes below the project warning budget and rerun the artifact gate. | Builder output: 1,097 files, **1,039.41 MiB**, over the 750 MiB warning threshold and only 60.59 MiB below its 1,100 MiB hard failure. See `local-public-artifact/build-report.json`. |

## P1 before broad promotion

| ID | Action | Evidence / target |
|---|---|---|
| P1-01 | Give every Resident Card control an accessible name. | Candidate mobile DOM found 31 unnamed buttons on [`resident-card.html`](../../../resident-card.html). Identify controls in browser accessibility tree after P0 work; this static source page uses generated controls, so line-only regex is not sufficient. |
| P1-02 | Resolve image alt audit findings: meaningful alt for content, `alt=""` only for decorative images. | Candidate mobile DOM: Library 31, Handbook 32, Trading Cards 31, Post Office 15, Issue 4 13, Issue 1 12, Issue 2 10, Chick Flicks 10, Issue 3 9, FAiRY 7, Radio 6, Sunnyvaile High 5, homepage/Visitor Centre 4 each. Many appear runtime-generated; inspect final DOM rather than applying bulk text replacement. |
| P1-03 | Align FAiRY allowance copy with the implemented service. | [`games/fairy-godmother.html:1301`](../../../games/fairy-godmother.html#L1301) says subscribers get 5 daily wishes and can bank bonus FAiRY Plays, but [`1687`](../../../games/fairy-godmother.html#L1687) says subscriptions, Plays and member allowances are not verified on the page. Either prove the flow or remove/label the claim. |
| P1-04 | Verify all stateful reward claims as one ledger. | Homepage promises an Express Route sticker + clip at [`index.html:624`](../../../index.html#L624); reward persistence is still locally scoped/partly unverified in [`script.js:2664`](../../../script.js#L2664) onward. Test earn, refresh, sign-in, second device, spend, insufficient funds and refund before promotion. |
| P1-05 | Run real device/form/auth checks. | No mutation was submitted to Buttondown, Supabase, Hyvor, or Workers. Thus newsletter, Town Hall, card claim, invitation, community moderation, rate-limit and error/retry verdicts remain NOT TESTED. |

## Checks actually run

| Check | Result |
|---|---|
| `node scripts/check-local-links.js` | PASS — 1,942 local references across 110 pages |
| `node scripts/check-inline-js.js` | PASS — 353 inline scripts across 132 live pages |
| `node scripts/check-town.js` | PASS |
| `node scripts/validate-newsstand-stories.mjs` | PASS — 2 approved stories |
| NewsStand auto-publish policy fixtures | PASS |
| FAiRY evaluation-fixture integrity | PASS — 42 cases |
| Curated artifact build | PASS with warning — 1,039.41 MiB |
| `validate-public-metadata.mjs` on artifact | PASS |
| `validate-ksvl-artifact.mjs` on artifact | PASS — 83 audio dependencies, 141.99 MiB, hashes match |
| Candidate browser render | 27 sitemap routes rendered at 390×844; nine focused routes also rendered at 1440×900. No page errors observed. See route matrix for limitations and failures. |
| Public HTTP route inventory | PASS for reachability — all 28 current sitemap routes returned 200. This is not a visitor-journey test. |

## Security and performance observations

Public homepage headers observed: HTTPS, `x-content-type-options: nosniff`,
and `referrer-policy: strict-origin-when-cross-origin`. No credential values
were found in the focused static scan; Worker sources use environment secrets.
This does not substitute for production CSP, headers, rate-limit, auth/RLS or
abuse testing. The artifact-size P0 is the only quantified performance finding
from this pass; browser resource totals are not network-realistic because the
candidate was served locally.

## Machine-readable evidence

- [Route matrix](route-matrix.json)
- [Promoted-promise matrix](promoted-promise-matrix.json)
- [Build report](local-public-artifact/build-report.json)

## Retest order

1. P0-01: exact artifact + public `/sunnyvaile-high` class and puffy requests,
   then mobile interaction.
2. P0-02/P0-03: two-account lifecycle tests, or remove/label each promise.
3. P0-04: rebuild and record byte disposition.
4. Keyboard/accessibility scan after P0 changes, then clean-browser mobile and
   desktop first-visit plus each promoted action.
5. Public post-deploy smoke on the campaign URL, forms, media/captions and real
   service failure/retry states.

## Learning scan

Qualifying reusable finding: static source/link success and HTTP 200 did not
catch runtime-constructed SUNNYVAiLE High dependencies. Prevention rule: the
release manifest and browser smoke must enumerate data-fed and constructed
asset paths. This is a possible Behind the Build angle: “A page loaded with a
200 while the classroom inside it had no register.” Per this audit's explicit
write boundary, this note is recorded here rather than appended to the canonical
`operations/painpoints-log.md`; the foreground owner should reconcile it there
if this becomes the adopted project rule.
