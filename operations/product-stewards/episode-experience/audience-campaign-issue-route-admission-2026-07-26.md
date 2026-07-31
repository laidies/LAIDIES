# Audience Week 01 — Issues 01–04 source and route admission

**Evidence ID:** `EPX-AUD-W01-ISSUES-01-04-2026-07-26`  
**Campaign:** `audience-week-01-2026-07-26`  
**Observed:** `2026-07-26T11:48:54-07:00`  
**Status:** `REPORT_READY`  
**Action:** `ADMIT` the four exact public **read-issue destinations**, with the boundaries below.  
**Mode:** read-only verification; no source, route, campaign, deploy or public state was changed.

## Source-owner verdict

| Issue | Campaign source scope | Verdict | Boundary |
|---|---|---|---|
| 01 | `content/issues/issue-01.md` | `SOURCE ADMITTED WITH TITLE CORRECTION` | The public/canonical title is **On Wednesdays We Do AI**. Do not promote the stale **Use AI** heading from the summary file. Teaching scope remains the practical AI introduction. |
| 02 | `content/issues/issue-02.md` | `SOURCE ADMITTED` | Specificity, context and prompting-as-delegation are supported. Audience-performance claims remain inference until measured. |
| 03 | `content/issues/issue-03.md` | `SOURCE ADMITTED` | Verification, claim-checking and confidence-is-not-evidence are supported. Do not turn this into a high-stakes assurance claim. |
| 04 | `content/episodes/issue-04.json` + `content/episodes/episode-04.canon.md` | `SOURCE ADMITTED` | These two files are the campaign-history authority. `content/issues/issue-04.md` is a different draft and is explicitly rejected for Issue 04 campaign claims. |

This is the Weekly Episode Engine source-package verdict. NewsStand retains publication authorship, Audience & Growth retains campaign construction, and Control Room retains cross-product campaign admission.

## Fresh route verdict

At desktop `1440×1000` and mobile `390×844`, all four requested `.html` URLs returned `200`, redirected only to the equivalent extensionless route, rendered the correct H1, exposed a visible episode-specific **Listen to this episode** action, had zero broken images, no horizontal overflow and no observed console/page errors.

| Exact requested destination | Public/source SHA-256 | Desktop | Mobile | Meaningful next action | Route verdict |
|---|---|---|---|---|---|
| `/issues/issue-01.html` | `af7b3bac…c69c1f` | PASS | PASS | `/watch.html?ep=01` → truthful held cover-only audio edition | `ADMIT` |
| `/issues/issue-02.html` | `f9641c4f…c5565d` | PASS | PASS | `/watch.html?ep=02` → truthful held cover-only audio edition | `ADMIT` |
| `/issues/issue-03.html` | `aac8f9b7…ea877` | PASS | PASS | `/watch.html?ep=03` → truthful held cover-only audio edition | `ADMIT` |
| `/issues/issue-04.html` | `fdba77be…60e88` | PASS | PASS | `/watch.html?ep=04` → truthful held cover-only audio edition | `ADMIT` |

The fetched public bytes matched the current repository route file byte-for-byte for all four destinations.

## Failure truth

- With the shared issue JavaScript and CSS blocked, each route still returned `200` and retained its H1 plus episode-specific primary action. The experience loses enhancement/styling but does not invent availability or lose the essential read/continue path.
- Each primary action reaches an episode-specific Screening Room page with an audio element and a visible return-to-issue action.
- The Screening Room explicitly says: **“This is a held cover-only audio edition.”** Therefore the campaign may promise **read the issue** and may describe the available listen-along accurately, but it must not promise a finished motion film, animation, or fully admitted video episode.
- The Issue 01–03 chronology is supported. A claim that the issue pages themselves provide a linked “next issue” journey remains `HOLD`: their next-week modules are editorial teasers, not next-issue links.

## Exact admit / hold scope

**ADMIT now**

- Campaign CTAs whose exact destination is one of the four verified read routes.
- Issue-specific teaching summaries that stay within the admitted source rows above.
- The ordered Issue 01 → 02 → 03 learning sequence when the campaign itself provides the individual verified links.

**HOLD**

- Any use of Issue 04 based on `content/issues/issue-04.md`.
- The Issue 01 title variant “On Wednesdays We Use AI.”
- “Watch the full episode,” finished-film, animation or motion-availability claims.
- Claims that the public issue pages themselves implement a linked next-issue sequence.
- Campaign readiness, scheduling or publication. Brand/rights, channel rendering, campaign-copy review, Ali/publication authority and Control Room admission remain separate gates.

## Evidence and reproduction

- Machine-readable evidence: `operations/product-stewards/episode-experience/evidence/audience-week-01-issue-route-admission-2026-07-26.json`
- Campaign intake reviewed: `operations/product-stewards/audience-growth/campaigns/week-01/CAMPAIGN-ADMISSION-2026-07-26.md`
- Route byte check: `curl -sS -L` for each exact public `.html` URL, `shasum -a 256`, then byte comparison with `issues/issue-0N.html`
- Render check: Playwright Chromium at the two named viewports, including H1, primary action, image completeness, horizontal overflow, console/page errors and Screening Room destination truth
- Failure check: Playwright request interception for shared `.js` and `.css`, verifying essential H1 and primary action remain in the returned document

## Handoff

- **Acceptance owner:** Audience & Growth for incorporation into its campaign admission packet; Control Room for cross-product campaign gating.
- **Locks/dependencies:** no lock requested and no shared/live file changed. NewsStand publication authority, Brand/rights review and campaign/channel acceptance remain open.
- **Next trigger:** Audience & Growth may replace only the four route/source dependency holds with this checksum-bound `ADMIT`; it must leave the remaining campaign gates held until their owners return evidence.
- **Public/deploy/spend/Ali truth:** the four issue routes were already public and were only observed. Nothing was deployed, published, purchased or submitted for Ali approval.

## Learning scan

No new painpoint entry qualifies. This verification reused the existing exact-artifact, public-route and fragment/dependency prevention rules rather than treating local file presence as public proof.
