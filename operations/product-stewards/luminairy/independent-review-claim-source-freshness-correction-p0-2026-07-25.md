# Independent acceptance review — LUMINAiRY bounded P0 candidate

**Reviewer:** independent judge; not the maker  
**Candidate:** current exact source plus `maker-packet-2026-07-25.md` and `evidence-2026-07-25.json`  
**Reviewed:** 2026-07-25  
**Verdict:** **FAIL — the candidate does not clear the non-compensable trust, product or LAiDIES contribution floors.**  
**Weighted score:** **62/100**

The public registry is a useful start and several failure cases do hold correctly, but the runtime does not implement the bounded promise it reports. Unsupported legacy claims remain visible and operable, while a legitimately admitted record cannot become visible or operable. This is a local review only; it does not authorize content admission, deployment or promotion.

## Scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 14/20 | Fail — three-wing discovery and normal local selection work, but held Foundress content remains published and no registry admission can produce a working profile. |
| Accuracy, safety and trust | 30 | 9/20 | Fail — unsupported biographies, a quotation, current/priority framing and stale shared discovery copy escape the hold; the gate accepts an unrelated-source admission fixture. |
| Positive LAiDIES contribution | 20 | 14/20 | Fail — the distinctive guide-hall metaphor remains strong, but the candidate still lets beautiful portraits and generic “evidence” framing carry authority the product explicitly says must be withheld. |
| UX/accessibility/reliability | 15 | 13/20 | Fail — reflow, contrast, doors, normal save/reload/clear and most forced-modal close behavior pass; held-profile opening, modal entry focus, non-keyboard Foundress controls and silent storage denial do not. |
| Technical/artifact integrity | 5 | 13/20 | Partial — baseline suites and governed source/artifact hashes pass, but the tests miss the public leaks and impossible admission transition; the fresh builder also reports one missing public dependency. |

Product quality, trust and LAiDIES contribution each require at least 17/20. They are non-compensable, so the total score cannot produce a PASS.

## P0 blockers

1. **Held Foundress claims are still published and the full held profile can be opened.** All four Foundress records are `held`, yet the rendered cards expose dates, interpretive titles, biographies, causal claims and Karen Spärck Jones’s quotation. Clicking the non-keyboard-operable Ada Lovelace card opens the complete unsupported modal: biography, “fight” framing, quotation and a generic evidence link. The modal is `aria-hidden="false"` and readable to assistive technology. This directly contradicts the public message that biography and quotation text is held.

2. **The admission contract neither binds support to exact prose nor admits a valid profile.** None of the 46 records contains `claimText` or an exact content hash, despite the operating specification requiring one. A synthetic admitted Hannah Fry record using `https://example.invalid/unrelated` and `supports: "An unrelated fact"` passed the runtime registry validator (`data-luminairy-claims="loaded"`). Conversely, a hypothetical admitted record using the named Cambridge source also remained `data-editorial-status="held"`, with its description hidden and profile button disabled. The initial loading hold is never reversed for admitted records. The registry therefore rejects many malformed states correctly but cannot distinguish a genuinely supported claim from an unrelated source and cannot render a valid admission.

3. **Unsupported current, priority and curation claims sit outside the registry.** The meta description still calls the MAiVENS “women leading in AI” and the TRAiLBLAZERS “the pioneers who got here first.” Visible door copy says “The real women leading in AI right now” and “The women shipping frontier Ai.” The shared public directory separately says `8 PATRON SAiNTS` and `MAiVENS wing (curated)`, conflicting with the page’s 14 Saints and all-held editorial state. These surfaces are not selector-bound registry blocks, so a 46-record all-held result cannot suppress them.

4. **Device-local selection failure remains silent.** Normal choose/reload/clear behavior works. With `localStorage.setItem` and `removeItem` denied, however, the selection control remains enabled, clicking changes nothing, and no status says the choice was not saved or how to continue. The operating specification explicitly requires storage failure to preserve navigation and explain the limitation.

## Inventory and mutation findings

The inventory itself is complete at the coarse block level:

```text
46 registry records
43 unique public person blocks
14 SAiNT records
23 MAiVEN person records
6 TRAiLBLAZER person records
3 context records:
  maven-lineage-context
  turing-memoriam-context
  trailblazer-wing-context
0 missing public person IDs
0 orphan person IDs
0 admitted records
46 held records
0 records with exact claimText/content hash
```

Adversarial registry results:

| Fixture | Runtime result | Judgment |
|---|---|---|
| Missing Hannah record | Registry loads; Hannah receives explicit missing-record hold | Pass |
| Impossible `2026-02-31` verification date | Whole registry fails closed | Pass |
| Future verification date | Whole registry fails closed | Pass |
| Stale recheck date | Whole registry fails closed | Pass |
| Unknown status | Whole registry fails closed | Pass |
| Duplicate claim ID | Whole registry fails closed | Pass |
| Missing registry request | All content remains held | Pass |
| Unrelated-source admitted record | Registry loads instead of rejecting support mismatch | **P0 fail** |
| Named-source hypothetical admitted record | Still held and disabled; profile cannot open | **P0 fail** |

The existing validator establishes record presence and date/source shape. It does not enforce exact prose/hash support, contextual inventory coverage as an authored invariant, source allowlists, quotation attribution or admission-to-render transition.

## Official spot-check scope

The maker evidence does not itself overgeneralize the three spot checks:

- Anthropic’s 2026-02-13 announcement identifies Daniela Amodei as co-founder and President. It does not support the card’s added “Ops, product, safety” interpretation or the wing-wide “shipping frontier AI” claim: `https://www.anthropic.com/news/chris-liddell-appointed-anthropic-board`.
- OpenAI’s 2025-05-07 announcement says Fidji Simo would join as CEO of Applications later in 2025. The evidence correctly describes this as an announcement, not sufficient proof of every current card statement on 2026-07-25: `https://openai.com/index/leadership-expansion-with-fidji-simo/`.
- Google DeepMind’s current responsibility page identifies Lila Ibrahim as COO and co-chair of its Responsibility and Safety Council. It does not support “Turned a research house into a lab that ships”: `https://deepmind.google/responsibility-and-safety/`.

Keeping those three records held is correct. The overgeneralization occurs in the runtime’s unregistered meta, door and shared-directory copy.

## Journeys that passed

- Three native wing buttons expose `aria-expanded`, update the hash and keep one wing open at a time.
- Exact public people/registry identity reconciliation produces 43 unique people and no missing/orphan person IDs.
- Missing, malformed, future, stale, duplicate and unknown registry states tested above fail closed.
- The visible research/correction preflight says Town Hall’s private inbox is still in preflight and promises neither submission nor reply.
- Public copy says choices stay in this browser on this device, are not account/Resident Card/cross-device proof, and profile opening is not completion, mastery or a reward.
- A normal SAiNT selection saved `laidies_saint=cher-horowitz`, updated the live register, survived reload, and cleared on the second selection.
- At 320px and the 640px/200%-style proxy, horizontal overflow was zero. Reduced motion computed `animation-name: none` and zero-second door transitions.
- Research status body text, emphasized/link text and hold text measured approximately 17.05:1, 7.61:1 and 17.05:1 respectively.
- When a Maven button was manually enabled only to isolate the modal mechanics, Tab and Shift+Tab wrapped, Escape closed the modal, focus returned to the opener and the 320px page did not overflow. This does not compensate for the real admitted path remaining disabled. Initial click focus also remained on the opener rather than moving into the dialog.

## Independent commands and baseline results

```text
node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS · products=65 · active=3/3

node scripts/validate-luminairy-claims.mjs
LUMINAiRY claim registry PASS · 46 records · 43 public person blocks

node scripts/test-luminairy-browser.cjs
LUMINAiRY browser PASS · 46 held blocks · mobile/reduced-motion · doors · local truth · registry failure

node scripts/check-inline-js.js
PASS · 352 scripts across 132 pages

node scripts/check-local-links.js
PASS · 1,975 references across 110 pages
```

These green results are insufficient because the browser suite checks only that at least 40 held elements exist and that `.maven-meet` buttons are disabled. It does not assert that every held card’s claim-bearing descendants are hidden, attempt Foundress opening, inspect metadata/shared discovery, exercise an admitted record, bind sources to exact content or deny storage.

## Fresh exact artifact

Fresh artifact: `/tmp/laidies-luminairy-independent.alALRE`  
Builder report: 1,081 files, 961.46 MiB; existing over-750 MiB warning. `find` counted 1,082 files and `du` reported 1.1G. The builder also reported one missing public dependency: `content/community.html`, required by `content/site/community-room.js`.

The stronger rendered scenarios above ran against this exact artifact and reproduced the P0s. Governed source/artifact SHA-256 pairs match:

```text
luminairy.html
f85d5b6924dd8c4f05189268a6cb49227314acb16b8428c594b86c5d8760c0bd

content/luminairy-claims.json
304e9db35ef5ab2d64d3f2ee990ba6c775dbf0bc5b24a8edc6e49c614ab67d03

content/site/luminairy-claim-gate.js
4ef799319a22836f526a7cb30288e2aff96ec9d9cee0a8ce6b81246ef6cf77b3

content/site/luminairy-v2.js
4e5caff65ff413b61d46cc017a54820d4dcaac1dec80f8e8772185d9663d92cb

content/luminairy-v2.css
b281c8589e41c3f7b45bd090d8e827b1c7f03373e594dd602c63e0240c6db5d5
```

No deployment, public service mutation, correction submission, audio playback, Git mutation or central-file mutation occurred.

## Repair evidence required for rejudge

1. Hide or replace every claim-bearing descendant for every held person type, including Foundress dates/titles/descriptions, and make held profiles impossible to open by pointer, keyboard, deep link or scripted UI path.
2. Register every factual/current/priority/quotation surface, including metadata and shared discovery copy, or replace it with non-claiming held language.
3. Bind admitted records to exact rendered prose or a deterministic selector-content hash and exact claim-specific support; reject unrelated sources. Prove one hypothetical admitted fixture becomes visible and operable while every other held block stays held.
4. Make all future admitted profile openers native keyboard controls. Prove focus moves into the modal, stays trapped, closes by Escape/backdrop/button, and returns to the exact opener at 320px and desktop.
5. Make local selection writes/removals verify success. On denial, expose persistent live failure, prevent a false selected state and disable or clearly recover the unavailable action.
6. Extend deterministic and rendered suites to cover all of the above, then rebuild an exact artifact and reconcile the missing-dependency report.

## Remaining holds after P0 repair

- Atomic research/editorial admission for every biography, quotation, interpretation, historical priority and current-role claim.
- Research-owner approval and owner visual/taste approval.
- Manual VoiceOver/screen-reader, Safari, native zoom and real-device evidence.
- KSVL track playback, source/rights, failure and accessible-control evidence.
- Public-origin hash/back/correction/status verification and exact release provenance.
- Privacy-safe discovery/source-route analytics and representative newcomer comprehension.
- The artifact-size advisory and global missing public dependency.

## Learning scan

No canonical painpoint entry was written because this judge may create only this LUMINAiRY-scoped report. BTB-101 and BTB-104 were reused. Proposed prevention rule: a hold test must assert the absence and inoperability of every claim-bearing descendant, not merely count held ancestors; an admission test must prove both directions—unsupported material is rejected and one exact supported record is actually rendered and operable.
