# Whole-site grand-reopening QA matrix

**Status:** BUILDING  
**Owner:** Codex (inventory, execution, evidence and repair sequencing) · Ali
(product/taste rulings only)  
**Release state:** ANNOUNCEMENT ON HOLD  
**Rule:** a route is not ready because it loads, and a control is not ready
because it responds.

## Current execution evidence

- 2026-07-24: inline JavaScript parse PASS — 353 scripts across 132 live
  pages.
- 2026-07-24: town canon/title/link/index/reward/quiz consistency PASS.
- 2026-07-25: local-link resolution PASS — 1,942 references across 110 pages
  after the admission-gated Vocab expansion.
- These are static foundation checks. They do not upgrade any interactive
  journey's technical, comprehension, value, honesty or experience verdict.

## Required verdicts

Every promoted journey receives five independent verdicts:

| Gate | Question |
|---|---|
| Technical | Does the complete action work, including failure/retry and the real downstream service? |
| Comprehension | Can a first-time visitor say what this is, what to do, why, what happened and what comes next? |
| Value | Does it genuinely teach, practise, judge, retrieve, activate, encourage, connect or delight? |
| Honesty | Does the interface claim only outcomes and persistence the system can prove? |
| Experience | Is it polished, accessible, mobile-usable and recognizably LAiDIES without becoming confusing? |

Allowed result words: **PASS**, **FAIL**, **PARTIAL**, **NOT TESTED**, and
**NOT APPLICABLE**. “Works,” “ready,” and “done” are not evidence.

## Plumbing contract

For each stateful activity record:

1. trigger;
2. authoritative completion event;
3. persistence store and scope (page, device, account, cross-device);
4. visible result or reward;
5. error, cancel, retry and duplicate-prevention behaviour.

If the site cannot observe completion, it must say **honour system** and must
not represent a click or visit as verified completion.

## Launch classifications

- **FIX BEFORE LAUNCH** — visible/promoted broken promise, trust, privacy,
  accessibility or first-visit blocker.
- **HIDE/LABEL FOR LAUNCH** — useful incomplete work that can safely remain
  unavailable or explicitly limited.
- **DEFER** — not promised in the bounded reopening experience.

## A · Activities, community, identity and rewards — ACTIVE SLICE

| Journey | Current evidence | Technical | Comprehension | Value | Honesty | Experience | Initial classification / exact open proof |
|---|---|---:|---:|---:|---:|---:|---|
| Dream Phone · Just Call | One public Mentor 101 call and one remix passed | PARTIAL | NOT TESTED | PARTIAL | PARTIAL | NOT TESTED | Test every caller group, dial method, invalid number, remix, history, Easter egg, persistence, mobile and first-visit meaning |
| Dream Phone · Play the Game | Beta page and sourced rounds exist | NOT TESTED | NOT TESTED | NOT TESTED | PARTIAL | NOT TESTED | Full round/scoring/mobile/a11y QA and primary-source factual review; do not promote before ruling |
| Girl Talk · truth/dare draw | Local cards, counters, stickers and penalties exist | PARTIAL | NOT TESTED | PARTIAL | PARTIAL | NOT TESTED | Test clean resident/return state and clarify the product job |
| Girl Talk → community dare | “I did it” awards before opening a room | FAIL | FAIL | PARTIAL | FAIL | NOT TESTED | FIX BEFORE LAUNCH: connect to an authoritative post event or relabel as honour system without verified-post language |
| Community room posting | Hyvor widgets exist on seven rooms | PARTIAL | NOT TESTED | PARTIAL | FAIL | NOT TESTED | Real post/moderation/error test; remove visit-as-post reward substitution |
| Mme CLAi-O | Strong prior local activity audit; local history/badge | PARTIAL | PARTIAL | PASS | PARTIAL | PARTIAL | Current browser/a11y/persistence/failure pass |
| FAiRY Godmother | Worker v18 recovered; live varied-input audit found fabricated research, missing boundary routing, success-shaped failures and disconnected Play balance | FAIL | FAIL | PARTIAL | FAIL | FAIL | FIX BEFORE PROMOTION: implement typed task/safety routing, grounded current claims, verified identity/allowance, non-consuming failures and one grant/display/spend/refund Play contract; pass the 42-case API + page suite |
| Quiz → explanation → reward | Questions/scoring tested locally | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Complete result, duplicate, local/account sync and learning-value pass |
| Try-On | Four episode flows and local persistence passed | PARTIAL | PASS | PASS | PASS | PARTIAL | Current exact-candidate and a11y pass |
| Trading Cards | Local collection/duplicates/filter code exists | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Pack, duplicate, local/account sync, mobile collection and terminology |
| DJ Booth/KSVL | Representative public playback passed | PARTIAL | PARTIAL | PARTIAL | PASS | PARTIAL | All controls, media failures, persistent-player conflicts and mobile |
| Businesswomen’s Special | Prior audit passed for Ali review | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Current exact-candidate functional/a11y pass |
| Extra Credit/Fun Pack | Routes activities; includes unresolved Dream Phone | PARTIAL | FAIL | PARTIAL | PARTIAL | PARTIAL | Remove/hide failed children and clarify why each activity is here |
| Resident Card · local creation | Editor/local save code and local layout QA exist; portrait booth closed | PARTIAL | NOT TESTED | PARTIAL | PARTIAL | PARTIAL | Clean-device create/edit/return test; distinguish portrait closure and local save |
| Resident Card · account claim | Supabase magic link/profile/handle code exists | NOT TESTED | NOT TESTED | PARTIAL | PARTIAL | NOT TESTED | Fresh email → link → handle → profile → logout/login → second-device test |
| Public/private Resident Card | RLS/view migrations and public URL code exist | NOT TESTED | NOT TESTED | PARTIAL | PARTIAL | NOT TESTED | Two-account privacy/visibility/not-found/block test |
| Postcard · compose/share/receive | Thirteen cards and URL/SMS/email/native share passed locally in representative states | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Real device share/cancel/fallback; clarify URL sharing versus tracked mail |
| Postcard · send/open/join lifecycle | Referral parameter/local handoff exists | FAIL | NOT TESTED | PARTIAL | FAIL | NOT TESTED | No authoritative mailed/opened/joined state; hide claims or implement lifecycle |
| BEST FRIENDS referral reward | Idempotent two-sided Supabase RPC and Closet renderer exist | NOT TESTED | NOT TESTED | PARTIAL | PARTIAL | NOT TESTED | Two real test accounts, self/invalid/repeat/retry and both-account visibility |
| Postcard background unlock | Original product concept only; all six backgrounds selectable | FAIL | NOT TESTED | PARTIAL | FAIL | NOT TESTED | HIDE claim or implement ownership and unlock rules |
| Invite butterfly clips | Product concept only | FAIL | NOT TESTED | PARTIAL | FAIL | NOT TESTED | Do not promise before durable reward ledger exists |
| Butterfly clip earn/spend | Quiz/Express local earns and Book Fair local spend foundation | PARTIAL | NOT TESTED | PARTIAL | PARTIAL | PARTIAL | Full balance, duplicate, refund, insufficient funds, account sync and fulfilment |
| Building loyalty/stamps | Visit-card foundation only | PARTIAL | NOT TESTED | PARTIAL | PARTIAL | PARTIAL | Hide milestone claims; later define meaningful action and durable award |

## B · First visit and town orientation — INVENTORY PENDING EXECUTION

Homepage, Start Here, Visitor’s Centre, About, This Week/Wednesday Bag,
navigation/menu, search, town map, return paths, 404 and legacy redirects.

## C · Learning, retrieval and media — INVENTORY PENDING EXECUTION

Episodes index; Episodes 1–4 articles; Screening Room; captions/transcripts;
study pack, quiz, Try-On and Cheat Sheets; LIBRAiRY/Miss Jeeves; Handbook;
Reference Closet; NewsStand; KSVL; current-week and archive transitions.

### Verified local learning/retrieval evidence

| Journey | Technical | Comprehension | Value | Honesty | Experience | Evidence / open production gate |
|---|---:|---:|---:|---:|---:|---|
| SUNNYVAiLE LIBRAiRY → understand the three shelves and choose a route | PASS | PARTIAL | PASS | PASS | PARTIAL | The opaque masthead slab and duplicated instruction copy were removed; a restrained transparent title now leaves the shelf catalogue visible and the existing route section owns the explanation. The underlying room artwork remains owner-review and is not approved |
| SUNNYVAiLE LIBRAiRY → distinguish available and forthcoming books | PASS | PARTIAL | PASS | PASS | NOT TESTED | Available Vocab opens; seven non-clickable previews visibly say Lands EP 5 / EP 7 / soon instead of looking mysteriously broken; owner ruling remains open |
| SUNNYVAiLE LIBRAiRY → open a book and read whole book or one section | PASS | PARTIAL | PASS | PASS | PARTIAL | Vocab 101 opens from desktop/mobile shelf; fetched/fallback headings retain stable deep-link IDs. At 1280px the reader stays contained with no broken images or overflow. Its left rail contains exactly 16 alphabetical links matching the 16 terms and ends cleanly after Training data; Agentic AI deep-opens Concepts 101 at the exact heading. The complete legacy doodle system remains removed; additional representative viewport and owner experience rulings remain open |
| Puffy → choose a personal 10-sticker pouch from the approved 75 | PASS | PASS | PASS | PASS | PASS | My Closet persists 10/10 choices on the device, supports optional purpose labels and filters the approved collection by All / Words & phrases / Things & icons; account and cross-device sync are not claimed |
| Puffy → save whole book and section → Closet → reopen exact section → remove | PASS | PASS | PASS | PASS | PASS | Library save actions show only the reader's 10-sticker pouch; Vocab 101 + Hallucination round trip passed locally; nested-wrapper deep-link defect repaired |
| Miss Jeeves → direct answer and relevant routes | PASS | PARTIAL | PASS | PASS | NOT TESTED | Job question returns a direct answer plus two relevant links in the reset; full suggestion/fallback set and owner experience ruling remain open |
| SUNNYVAiLE LIBRAiRY naming across touched primary surfaces | PASS | PASS | NOT APPLICABLE | PASS | PARTIAL | `library.html`, directory, High, Closet, Learn and homepage preview corrected; full repository/public stale-name scan remains open |

These verdicts are **VERIFIED LOCALLY**, not deployed or publicly verified.
They must be rerun against the exact release artifact and production origin.

### Editorial publication gate

Passing reader mechanics does not establish that a book teaches accurately or
usefully. `operations/CONTENT-PUBLISHING-STANDARD.md` is now the standing gate
for episodes, books, classes, reference pages, NewsStand features, printables,
quizzes and public AI guidance.

| Book | Editorial status | Launch consequence |
|---|---|---|
| Vocab 101 | DRAFT — ARCHITECTURE RESET | The mechanics and 16-term index remain locally functional, but the prior full-book editorial score is no longer authority. Proposed ownership is now recognition only: plain meaning, key distinction and explicit route. Do not scale or advertise it until Ali rules on the representative Agentic AI journey |
| Concepts 101 | HOLD — REPRESENTATIVE PROTOTYPE | One Agentic AI lesson now tests the proposed canonical teaching unit: mechanism; Cher’s closet-computer mapping of goal/tools/permissions/actions; analogy boundary; genuine stakes; separate practical move; itinerary example; and cross-references. Vocab → exact Concepts deep-open passed locally, but the pattern must not be applied to the other 14 entries until Ali rules |
| Briefing 101 | EDITORIAL REVIEW REQUIRED | Reconcile against Episode 2, remove duplication and test the procedure on a real task |
| Setup 101 | HOLD — CURRENCY REVIEW | Separate durable guidance from dated product steps and verify official sources |
| Accounts 101 | HOLD — FACTUAL INTEGRITY | Remove unsafe universal claims and rebuild from provider-specific current evidence |
| Who’s Who in AI | HOLD — THIN/CURRENT CLAIMS | Define its reader decision and verify every changing comparison |
| Straight Answers About AI | HOLD — REVERIFY | Recheck every perishable answer and its primary sources |
| How to Check AI’s Work | REJECT — PLACEHOLDER PRESENTED AS BOOK | Remove the false book experience or wire the complete canonical Verification Rulebook |
| ChatGPT / Claude / Gemini / Copilot / Perplexity | NOT PUBLISHED | Remain unavailable until Episode 5 canon and dated official-source packets exist |
| What Not to Paste / Prompt Cookbook | NOT PUBLISHED | Do not fill the covers with placeholder material |

No book in this table may be advertised as editorially approved until its
reverse brief, scorecard, source/currency evidence, real-interface reading
proof and applicable Ali ruling pass.

## D · Buildings, shops and optional depth — INVENTORY PENDING EXECUTION

SUNNYVAiLE High/classrooms/Book Fair; Mall and every store; Community and all
rooms; LuminAiRY; Bronze AiGE; Town Hall; Post Office; Sorority House;
Sanctuary; Clubhouse; Chick Flicks; MAiKEOVER.

## E · External services and non-functional quality — INVENTORY PENDING EXECUTION

Supabase authentication/database/RLS; Hyvor; Buttondown; Plausible; Cloudflare
Pages and Workers; native sharing/clipboard/email; privacy and terms;
rate-limit/CORS/network errors; keyboard/screen-reader/contrast/reduced motion;
Safari/Chrome/Firefox and representative real devices; LCP/CLS/INP and slow
connections; security headers, secret exposure, abuse controls, backup and
recovery.

## Release rule

Only **PASS** journeys may be promised in the reopening campaign. A
**PARTIAL** journey may remain public only when its limitation is visible,
accurate and does not create a dead end. Every **FAIL** is fixed, hidden or
removed from the bounded promise before the release artifact is built.
