# FAiRY Career Workspace build packet

**Status:** BUILDING — local candidate; not deployed

## Outcome

- **Product:** FAiRY Godmother / career advice and AI learning connection.
- **User problem:** A useful script solves today's moment but does not help the reader build a repeatable way to organise her real role, evidence, decisions and follow-ups in the AI tool she already uses.
- **Intended outcome:** FAiRY answers the immediate question, then—only when useful—offers a copyable setup prompt that makes the reader's own AI interview her one question at a time and build a practical Career Workspace.
- **Evidence:** Alison Eakin's 16-page *Leading Through Complexity — What To Actually Say* handout; current FAiRY career pilot; product and privacy contracts.
- **Scope:** strict Worker output contract, deterministic workspace wrapper, allowlisted material framework, safe page rendering/copy control and targeted regression tests.
- **Non-goals:** no FAiRY file upload, document parsing, saved correspondence, cross-device workspace, external-tool integration, autonomous action or claim that another AI tool is private/employer-approved.

## Proposed direction

The workspace belongs to the reader. FAiRY supplies the framework; the external AI conducts the interview. This is smaller and safer than adding a document vault and directly satisfies Ali's requirement that readers build something themselves in their own AI tool.

## Work breakdown

| Work item | Owner | Input | Output | Status |
|---|---|---|---|---|
| Bind product/content/privacy contract | FAiRY champion | Handout, active FAiRY contract, D-133 | This packet and producer contract | COMPLETE |
| Extend typed AI-assist contract | Backend | `worker-fairy-godmother/src/career-guidance.js` | allowlisted job/material selection, strict validation and fully deterministic visitor copy | BUILT LOCALLY |
| Render and copy portable setup | Frontend | validated typed answer | `games/fairy-godmother.html` | BUILT LOCALLY |
| Calibrate and run contract tests | Technical | known-bad kind/material/size mutations | Worker and page tests | COMPLETE LOCALLY —86 Worker,45/79 frozen fixtures,73/73 browser |
| Exact-byte static and rendered review | Independent answer-quality/UX judges | exact candidate | no-P0/P1 verdict plus actual1280/390/320 render | COMPLETE LOCALLY |
| Real staging answer and native zoom | Independent answer-quality/UX judges | committed staging candidate | actual-model usefulness plus native200% result | PENDING |
| Release | FAiRY champion | current exact Pages base plus admitted Worker | coordinated deploy and live custom/immutable checks | PENDING |

## Acceptance and independent review

| Gate | Exact result required |
|---|---|
| Immediate usefulness | Advice still solves today's problem before offering a workspace. |
| Selectivity | `aiAssist:null` and bounded `quick_task` remain valid; the workspace is not forced. |
| Interview contract | Copied prompt asks one focused question at a time and stops once it can produce the next useful action. |
| Material boundary | Zero to six allowlisted material types; each is optional, minimal and redacted; full files are never the default. |
| Practical output | Facts/unknowns, decision ownership, one move, exact wording, lower-exposure route, written record and checks are retained. |
| Trust/privacy | No invented facts or external-tool privacy claims; sensitive categories and employer-approval boundary are explicit. |
| Technical | Invalid kinds, model-authored free-text fields, unknown IDs, duplicates and excessive materials fail before a case spend. |
| UX/accessibility | Expanded/collapsed, keyboard, copy, 1280/390/320, 200% zoom and readable long prompt pass on the exact candidate. |
| Regression | Current Guest/Resident allowance, classification, fittings, handout references and non-career outcomes remain unchanged. |

## Integration and release

- **Affected paths:** `worker-fairy-godmother/src/career-guidance.js`, `worker-fairy-godmother/test/career-guidance.test.mjs`, `games/fairy-godmother.html` plus the exact product records in this packet.
- **Superseded release base:** `828e22ed-2b5b-40a3-8068-b0fbb43d5119`. Provider query on2September found newer production `fb5b4b02-0b74-40e5-85bb-bd64a95c417a`; obtain its exact immutable input and identity before any Pages overlay.
- **Rollback:** restore the preceding Worker version and the preceding exact `games/fairy-godmother.html` byte; the feature is optional and adds no stored user data.
- **Public verification:** custom and immutable route bytes plus actual Guest/Resident career journeys at desktop and phone sizes.

## Measurement and learning

- Track only aggregate offer kind, copy action, validation/failure and usefulness response; never prompt, document or workspace text.
- Success means the reader receives a useful immediate answer and can start a correctly bounded external interview without returning to FAiRY for setup instructions.
