# Independent review — Post Office Cycle 5 service-truth P0

**Date:** 2026-07-26  
**Reviewer role:** independent product, trust/privacy, LAiDIES brand,
UX/accessibility and technical judge  
**Candidate packet:** `build-packet-service-truth-p0-2026-07-26.md`  
**Maker evidence:** `maker-evidence-service-truth-p0-2026-07-26.md`  
**Boundary:** read-only source and exact-artifact review plus synthetic local
browser fixtures; no implementation/state/registry/queue/Git/deploy/provider
or external-service mutation

## Verdict

**FAIL — FIX AND REJUDGE.**

The candidate materially improves the Post Office and most supplied evidence
is reproducible. Newsletter/provider limits, held account status, published
episode wording, private legacy-query scrubbing and postcard selected-state
parity are all stronger.

It nevertheless fails the non-compensable accuracy/trust floor. The archive
path validator accepts protocol-relative URLs such as
`//attacker.invalid/track.png`. The exact artifact rendered that value as an
image and, when the archive entered the viewport, attempted a third-party
request. Its episode link also resolved to `http://attacker.invalid/click`
instead of failing closed. This contradicts the packet's safe-rendering and
malformed-data contract and creates an avoidable privacy/navigation boundary
failure.

## Non-compensable scores

| Gate | Score | Result | Basis |
|---|---:|---|---|
| Product quality and user value | 16/20 | FAIL | The core counter/rack/archive structure is useful, but the “Signed” handle is discarded and global Sign in remains a dead-promise route. |
| Accuracy, safety, privacy and trust | 15/20 | FAIL | Provider/share limits are strong, but archive data can create an external image request and outbound link while claiming invalid paths fail closed. |
| Positive LAiDIES brand contribution | 17/20 | PASS LOCALLY | Penny's counter, postcard rack and publication language feel specific and coherent without referral pressure. Owner visual approval remains open. |
| UX and accessibility | 16/20 | HOLD/FAIL | Keyboard selection, status announcements, 320px reflow and 44px targets pass. The ignored Signed field, misleading global Sign in label, native AT/zoom gaps and incomplete visual capture prevent acceptance. |
| Technical and data integrity | 15/20 | FAIL | Exact hashes and supplied suites pass, but their hostile-path fixture misses protocol-relative URLs and therefore certifies an incomplete fail-closed boundary. |

No compensating total can override the product/trust floors.

## P0 finding

### PO-J5-P0-01 — archive “local path” validation admits external origins

`content/site/post-office.js` prepends `/` only when the first character is not
already `/`, then accepts:

`/^\/[A-Za-z0-9_./?=&%-]+$/`

That expression accepts two leading slashes. A synthetic published episode
using:

- `heroImage: "//attacker.invalid/track.png"`
- `issueUrl: "//attacker.invalid/click"`

produced, in both source and the fresh exact artifact:

```json
{
  "attacker": ["http://attacker.invalid/track.png"],
  "href": "http://attacker.invalid/click",
  "failedClosed": 0
}
```

The request was intercepted and aborted; no external request completed. The
attempt itself proves that the malformed record did not fail closed.

**Required repair:** parse each candidate against the LAiDIES origin or enforce
an exact single-leading-slash, no-backslash/no-control-character local-path
contract. Reject protocol-relative, absolute, encoded-origin and unexpected
route forms before assigning either `src` or `href`. Add the same hostile
fixture to source and exact-artifact browser suites and assert zero attacker
attempts, zero external href/src and the visible fail-closed archive state.

## P1 findings

### PO-J5-P1-01 — the postcard “Signed” field is not delivered or previewed

`postcard.html` defines `handle()` and tells the user the handle is “so she
knows who to thank,” but `messageText()` never calls `handle()`. The preview
also does not render it. Email, SMS and native share therefore discard the
entered signature. This also makes the maker statement that the handle stays
in user-controlled share text inaccurate.

**Required repair:** either remove the field and promise, or place a
length-bounded, clearly formatted signature in the local preview and share
text. Keep it out of URLs, analytics and storage unless separately justified.
Test empty, leading-`@`, Unicode and maximum-length values.

### PO-J5-P1-02 — shared discovery truth is only partly reconciled

The edited town directory and welcome tour correctly describe a request desk,
held account and local composer. However, `sv-global-header.js`, `index.html`
and `preview-homepage.html` still label the held destination **Sign in**.
`index.html` also describes the Post Office as “Wednesday delivery and mail,”
and the preview homepage says the Post Office “sends you a note.”

These are dependency findings, not authority to edit those files in this
judge lane. Before promotion, the Platform/Homepage champion must either make
sign-in and delivery real or replace those upstream promises with current
held/request wording.

### PO-J5-P1-03 — visual evidence does not prove a complete loaded experience

The submitted desktop/mobile screenshots show multiple blank postcard and
archive image frames because the lazy images were captured before they entered
the viewport. Independent scrolling proved the on-screen local assets load,
but the supplied images cannot support a visual-quality approval. Replace them
with viewport-scrolled, fully loaded captures after the P0 repair. Owner visual
approval remains mandatory.

## Reproduced positive evidence

- Source local contract: **PASS**.
- Source browser suite: **PASS — 32 checks, 24 external attempts blocked, 0
  completed**.
- Fresh exact-artifact local contract: **PASS**.
- Fresh exact-artifact browser suite: **PASS — 32 checks, 24 external attempts
  blocked, 0 completed**.
- Inline JavaScript: **PASS — 352 scripts / 132 pages**.
- Local links: **PASS — 1,975 references / 110 pages**.
- Town consistency and product-steward checker: **PASS**.
- Public metadata and scoped diff check: **PASS**.
- Valid non-default postcard deep link → selected state → first copied
  canonical URL: **PASS**.
- Legacy `from`/`note` query removal before analytics initialization: **PASS
  locally**; CDN/browser/history retention outside the page remains unknown.
- Blocked popup, invalid email, cancelled share, clipboard denial, malformed
  `javascript:` archive path, keyboard selection, status copy, 320px reflow and
  44px target fixtures: **PASS**.
- The edited directory and welcome-tour files contain the current held service
  boundary: **PASS**.

## Exact candidate identity

Fresh artifact:

`/tmp/laidies-post-office-independent.S0rcmx`

Builder: **1,087 files / 961.53 MiB / 0 missing / 0 oversized**. The internal
750 MiB warning remains a release-owner hold.

| Runtime file | Matching source/artifact SHA-256 |
|---|---|
| `post-office.html` | `0553f954fcdd8dd360389ec8a5225e4caa420a5440be799b9534211e38071b6c` |
| `postcard.html` | `d8853f081a11a9df6fe7f7a49fddf30022dbced348fa399802d3f2be07186786` |
| `content/site/post-office.js` | `9a2c5bf28a1c0770175918e74048fa357755381c24b687883aa28668a98457b7` |
| `content/site/sv-welcome-tour.js` | `5d36298d6c41b0476a356da223ca43926cadec78ff2b43073b4c613053071511` |
| `content/site/sunnyvaile-directory.js` | `f96b8b7f3fcec181f7953a251888b09e87c6e7092b36b586b10fb4c2967b5151` |

## Exact holds

After the P0/P1 repairs, the following remain separate gates:

- independent source and fresh exact-artifact rejudge;
- Buttondown subscribe/confirmation/duplicate/unsubscribe/delivery/failure
  receipts using an approved disposable identity;
- Supabase magic-link request/callback/session/expiry/retry/logout receipts;
- provider-side Clarity masking, CDN legacy-query retention and actual
  analytics-payload review;
- referral/recipient sent/open/join/reward lifecycle remains unavailable;
- native Safari, VoiceOver/TalkBack, browser zoom and real mobile share/cancel
  testing;
- owner visual approval with fully loaded images;
- exact deployment/public-origin evidence; and
- release-owner decision on the 961.53 MiB artifact warning.

No newsletter delivery, sign-in, referral, reward, public readiness or
promotion is accepted by this review.

## Learning scan

**Failure:** a regex that required a leading slash was treated as a same-origin
check, but `//host/path` is a valid protocol-relative external URL.

**Prevention rule:** validate navigation/media destinations by parsed origin
and admitted route shape, not only by allowed characters. Every “local path”
gate needs protocol-relative, backslash, encoded-origin and control-character
fixtures in both source and exact artifacts.

**Possible Behind the Build angle:** “Two slashes turned a local postcard
drawer into an outside door.”

The canonical painpoints ledger remains parent-owned and was not edited by
this independent judge.
