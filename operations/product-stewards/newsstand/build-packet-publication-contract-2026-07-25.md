# NewsStand publication-contract reconciliation build packet

**Status:** BUILT LOCALLY — RELEASE HOLD; local catalogue/reader mechanics
passed, but visual and full accessibility/editorial gates remain open.
**Trigger:** The locked D-042 public promise names **The Breaking, The Daily, The Weekly and The Tribune**, while `newsstand.html` and `content/newsstand-stories.js` expose only legacy `wednesday` and `tribune` editions.

## Outcome

- **Product:** SUNNYVAiLE NewsStand.
- **User problem:** A reader cannot see the locked four-publication contract, and the current page presents the retired WEDNESDAY name as current.
- **Intended user outcome:** A reader can identify all four publications, distinguish which have a current issue, open the real Weekly and Tribune stories, and see truthful no-current-issue states for The Breaking and The Daily.
- **Evidence and research:** D-2026-07-25-042 locks the exact mastheads and machine editions. The champion dossier records the mismatch. The current approved story library contains one `wednesday` story and one `tribune` story; it contains no Breaking or Daily story. BTB-045 requires the page to report the exact consumer state rather than infer publication from upstream machinery.
- **Scope:** `newsstand.html`, `content/newsstand-stories.js`, `content/newsstand.css`, and the NewsStand champion dossier.
- **Explicit non-goals:** No new story, claim, source, date, editorial approval, producer automation, analytics, deployment, public verification, external publication, or shared-system change.

## Proposed direction

- **Decision:** Preserve the currently validated legacy `wednesday` storage key, map it to the canonical reader-facing `weekly` edition in the page, display all four exact mastheads, let The Breaking and The Daily open honest empty states, and preserve The Weekly and The Tribune story mechanics and archive search. Full producer/schema key migration is outside this packet’s write boundary.
- **Why it fits LAiDIES:** It makes the public promise legible without filler, fake freshness, or destructive removal of approved reporting.
- **External tools/plugins/services proposed:** None.
- **Approval or installation required:** None for the local candidate. Independent editorial/product, UX/accessibility, and technical review are still required before release.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Freeze publication map and no-story wording | NewsStand champion | D-042, current story data, BTB-045 | This packet | None | SPECIFIED |
| Reconcile rack/state/reader labels and logic | Frontend implementation lane | Current page | `newsstand.html` | Packet | BUILT LOCALLY |
| Relabel the approved story without changing its validated storage key | Content integration lane | Existing approved WEDNESDAY story | `content/newsstand-stories.js` | No story-body changes; page compatibility alias | BUILT LOCALLY |
| Support four-option accessible selector | Frontend styling lane | Existing NewsStand visual system | `content/newsstand.css` | HTML structure | BUILT LOCALLY |
| Record exact local evidence and residual gates | NewsStand champion | Test outputs | `publication-contract-reconciliation-evidence-2026-07-25.md` | Candidate complete | VERIFIED LOCALLY |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | Exact four mastheads appear; only existing approved stories render; unavailable publications state that no current issue is filed. | Independent NewsStand product/editorial reviewer | PENDING |
| Accuracy, safety and trust | No story body/source/date is fabricated or altered; no publication or freshness claim exceeds canonical data. | Independent accuracy/trust reviewer | PENDING |
| Positive LAiDIES brand contribution | Four-paper distinction and calm clear-day language remain intelligible in the physical NewsStand metaphor. | Independent brand reviewer | PENDING |
| UX and accessibility | Keyboard activation, labels, focus, empty states, search, mobile layout and reduced motion are checked on the exact candidate. | Independent UX/accessibility reviewer | PENDING |
| Frontend/backend/data integrity | Existing validator passes; the page maps legacy `wednesday` to canonical `weekly`; each rack selection renders a story list or explicit empty state; hashes/routes still open. | Independent technical reviewer | MAKER TEST PASS; INDEPENDENT PENDING |
| Visual/media quality when applicable | Existing art is not relabelled as a nonexistent Breaking/Daily issue; text selector reflows without obscuring the scene. | Independent visual reviewer | PENDING |

## Parent independent review — 2026-07-25

- **Product/content quality:** PASS for the bounded catalogue correction. All
  four publications are legible; absent Breaking/Daily issues are not filled
  with invented stories.
- **Accuracy/trust:** PASS for the bounded correction. The two existing story
  bodies, sources and dates remain intact; the compatibility alias is disclosed.
- **Technical mechanics:** PASS for local candidate evidence. The validator,
  four selectors, empty states, story routes, archive search and narrow layout
  were exercised without runtime exceptions.
- **Visual/brand:** HOLD. The Weekly selector and overlay sit over an underlying
  legacy WEDNESDAY paper asset. That is an explicit compatibility bridge, not
  an approved final visual.
- **Accessibility/editorial:** HOLD pending independent screen-reader,
  focus-return, real-device and editorial comprehension review.

**Verdict:** `BUILT LOCALLY — RELEASE HOLD`. The candidate may remain as a
bounded implementation, but it cannot advance to release or public
verification until the held gates pass.

## Integration and release

- **Affected products/champions:** NewsStand; homepage champion is a future dependency because D-043 concerns homepage live-news presence, but no homepage file changes in this cycle.
- **Canon, identity, reward or analytics dependencies:** D-042 mastheads and `breaking`, `daily`, `weekly`, `tribune` machine editions. No identity, reward, or analytics change.
- **Exact candidate:** Local working tree versions of `newsstand.html`, `content/newsstand-stories.js`, `content/newsstand.css`, plus this dossier evidence.
- **Release authority:** Not exercised. Independent review and the AW-003 release manager retain the release gate.
- **Rollback:** Revert only this packet’s scoped line changes; the existing storage keys, story bodies and sources remain untouched.
- **Public verification:** Not authorized or claimed.

## Measurement and learning

- **Baseline:** Two visible editions (`wednesday`, `tribune`), one story in each, four-publication comprehension not implemented.
- **Success/failure signals:** Existing data validator and static assertions pass; all four selectors have honest results; the compatibility alias is exact; existing story hashes and archive search work; no console error; narrow viewport has no horizontal overflow. Failure is any invented story, stale public masthead, missing source/date, unreachable approved story, inaccessible selector, or ambiguous empty state.
- **Review date:** Before any release candidate is integrated.
- **Decision after measurement:** Advance at most to **VERIFIED LOCALLY** after independent gates; otherwise remain **BUILDING** with exact defects.
- **Dossier/state/backlog updates:** Record candidate evidence, change NS-01 narrowly, preserve NS-02 through NS-06 as open.
