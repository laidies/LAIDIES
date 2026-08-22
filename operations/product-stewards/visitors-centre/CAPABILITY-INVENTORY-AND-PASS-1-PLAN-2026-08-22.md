# Visitor’s Centre capability inventory and bounded Pass 1 plan

**As of:** 2026-08-22
**Trigger:** Ali guided walkthrough
**Status:** INVENTORY COMPLETE FOR NAMED VISITOR SYSTEMS / NO CAPABILITY FAMILY PUBLICLY COMPLETE / NO CANDIDATE BUILT

The state labels below describe only the exact bounded capability in each row.
They do not promote the page, destination or portfolio as a whole.

| Capability | Exact route/source | Truth state | Verified evidence | Blocking limit / owner |
|---|---|---|---|---|
| Public Centre route and complete named discovery | `/visitors-centre`; `visitors-centre.html` | `PUBLIC_VERIFIED` — enumeration only | Public DOM inspected 2026-08-22 exposes the exact 17 named map buttons and 17 named selector options. | Destination status reports unavailable; navigation/comprehension/visual quality are not included. Visitor’s Centre + Platform/Town Entry. |
| Current public Centre composition | `/visitors-centre` | `REJECTED_SUPERSEDED` | Ali directly rejected the masthead/map treatment, blank bands, beige/pink surface, generic boxes and disconnected directory/tickets on 2026-08-22. | Must not be reskinned or used as the replacement base. Visitor’s Centre + Brand. |
| Guided Welcome Tour | `content/site/sv-welcome-tour.js`; `/visitors-centre?welcome-tour=start` | `SOURCE_PRESENT_UNVERIFIED` | Source defines explicit start, 17 ordered stops, browser-local progress, skip and finish, with no reward grant. Ali observed the current retired-colour pop-up. | Current checkout hash differs from the older receipt; complete live start/resume/skip/finish and destination behavior are not verified. Current pop-up visual treatment is rejected. Visitor’s Centre + Town Entry/Platform. |
| SUNNYVAiLE trailer | `/watch.html?ep=trailer`; `content/site/sv-trailer-player.js`; `assets/episodes/trailer/` | `REJECTED_SUPERSEDED` | Receiver explicitly fails closed as being rebuilt; candidate assets exist. | No released/playable current film is bound. Content and imagery require current-town review. Episode Experience/Media. |
| Postcard catalogue and admitted art | `content/site/postcard-catalog.json`; `/postcard.html`; `/post-office.html` | `REJECTED_SUPERSEDED` | Active catalogue is `HELD` with zero admitted cards; composer disables active sharing. | On-disk image presence is not admission; exact Brand/canon/provenance/use gate required. Post Office + Brand. |
| Postcard share/delivery receiver | `/postcard.html` | `MISSING_RECEIVER` | Dormant code can invoke native share, SMS, mailto or clipboard and correctly disclaims delivery. | No transport provider, recipient record, delivery/open receipt or active card. Post Office + Identity/Connection. |
| Referral attribution | Postcard URL currently carries only `?pc=<id>` | `MISSING_RECEIVER` | No sender/recipient relationship is encoded or stored. | Needs opaque invitation identity, two-account lifecycle, consent/fraud/revoke rules and authoritative join event. Identity, Rewards & Connection. |
| Resident Card signup/account continuation | `/resident-card.html`; account runtime scripts | `SOURCE_PRESENT_UNVERIFIED` | Email-link and local-card controls exist in source. | Provider, second-account journey and exact public release were not proved in this inventory. MAiKEOVER/Resident Card + Platform Identity. |
| Sender/recipient referral rewards | Shared reward specification; postcard-referral contract | `MISSING_RECEIVER` | Current contract explicitly marks referral rewards unavailable. | Requires server-only append-only grants, typed completion IDs, idempotency, reversal and two-account evidence. Platform + Identity/Rewards. |
| Referral-only Resident Card background | MAiKEOVER functionality map/background build packet | `PLANNED` | Background selection and future visual lane are described. | No exclusive entitlement, accepted visual, unlock event, revoke/refund or ownership exists. MAiKEOVER + Brand + Platform/Rewards. |
| Structured Visitor FAQ selection | Protected iCloud checkout `operations/product-stewards/visitors-centre/FAQ-BEHIND-THE-BUILD-REGISTRY-SELECTION-v1.json`, SHA-256 `dc16fa95…f21988` | `SOURCE_PRESENT_UNVERIFIED` | 2026-08-03 specification selected 8/12 stable `VCFAQ` IDs and `/visitors-centre.html#answer-vcfaq-NNN` anchors; all are reserved/not live. | File is absent from this release worktree, five selected rows remain evidence-held, three are spec-only, four are excluded, and no answer prose/admission/public route is authorized. Visitor’s Centre + content/Identity/Platform/Finance owners. |
| Legacy FAQ prose | `operations/faq-content.md` | `REJECTED_SUPERSEDED` | File labels itself editable and contains `[confirm]` plus unsupported login/reward claims. | Cannot be used as current answer truth or registry. Owners vary by claim. |
| Town Hall civic history and characters | `/town-hall.html`; Town Hall dossier | `SOURCE_PRESENT_UNVERIFIED` / roster interaction `LOCAL_VERIFIED_NOT_DEPLOYED` | Mayor Deb archive, Regulars and Town Regular selection exist in source; bounded local evidence exists for the roster/device-local choice. | Destination freshness and public exact artifact remain incomplete. Town Hall owns; Centre links only. |
| Town Hall private feedback | `/town-hall.html#town-hall-feedback`; Town Hall functionality map | `MISSING_RECEIVER` | Visible form is deliberately disabled and explains the release hold. | No safe server intake, staff lifecycle, receipt/status or correction propagation. Centre must not promote as open. Town Feedback + Platform. |
| Town Hall civic records | Town Hall spec/backlog | `PLANNED` | Aggregate accountability model is described. | No raw private-note publication; consent/moderation/redaction/triage/owner approval absent. Town Feedback + Ali/Platform. |

## Homepage disposition

- Homepage may promote the Visitor’s Centre only as the full optional town-help
  destination and route to `/visitors-centre`.
- Homepage may not promise a working guided tour, playable trailer, sendable
  postcard, referral, reward or exclusive background from the current state.
- When the Visitor’s Centre successor is admitted, Homepage Pass 2 decides
  whether the fuller orientation changes the compact How SUNNYVAiLE works
  preview. It does not add one section per capability.
- Visitor’s Centre routes civic history/characters and eventual private
  feedback to Town Hall; Town Hall routes navigation/site-use help back to the
  Centre. The Homepage does not create a third combined help/contact surface.

## Bounded Pass 1 implementation plan

This is the smallest representative proof, not authorization to build the full
visual page.

1. **Specification reconciliation.** Bind Ali's tourist-centre direction,
   exact 17-building source, current tour/trailer/postcard states and rejected
   patterns. Create the missing `VISUAL-ASSET-INVENTORY.md` before any visual
   production.
2. **First-screen comprehension proof.** Produce one responsive desktop/mobile
   structural prototype showing a real tourist-centre arrival, a clear “how
   SUNNYVAiLE works” explanation and two explicit choices: explore any building
   or take the optional tour. The map is visible but not the masthead.
3. **Mechanism proof.** Rebuild one destination interaction only: choose one
   named building by map or accessible named route → see its current job/state
   → step inside. Prove keyboard, touch, Back/Escape, live announcement and
   no-data fallback.
4. **Optional-tour proof.** Replace the detached old-colour pop-up with one
   compact contextual stop that can start, pause, skip, leave and resume without
   hiding direct navigation. Do not scale to 17 stops until this interaction is
   understood by a clean first-time visitor and unobtrusive on return.
5. **Orientation architecture proof.** Use one canonical building/job record to
   render both the complete town view and one short “I want to learn” itinerary.
   Prove the itinerary clarifies content-format differences without creating a
   second duplicated tour or hiding the full directory.
6. **FAQ proof.** Reconcile the protected 8/12 specification registry into the
   release branch without promoting its stale evidence. Bind `VCFAQ-001` or
   `VCFAQ-002` to its stable answer anchor and current owner truth. Do not draft
   identity/privacy/provider/Finance answers until their exact sources resolve.
7. **Postcard proof boundary.** Inventory and independently admit one existing
   postcard before designing a gallery. The pilot ends at a truthful handoff;
   referral/reward UI remains absent until the missing receiver exists.
8. **Admission.** Compare same-viewport public incumbent and candidate, pass the
   exact design-review gate, then request Ali's visual verdict through the
   resolved review URL. No raw concept or local candidate is shown early.

## Non-goals for Pass 1

- full 17-stop tour production;
- full postcard gallery;
- trailer rebuild;
- referral/provider/account/reward implementation;
- Resident Card background generation;
- Homepage redesign;
- deployment or publication.
