# Future episode Study Pack intake contract

**Status:** SPECIFIED — COPY FOR EACH RULED FUTURE EPISODE  
**Owner:** Learning System & Concepts Director  
**Receivers:** Weekly Episode Engine, Blend & Snap / Study Pack, Try-On,
Printables, Trading Cards and SUNNYVAiLE High / Quiz

This contract is completed after episode substance/canon is ruled and before
component scripting or visual production. It supplements—not replaces—the
shared learning-content intake/complement card and episode opportunity scan.

## 1. Episode and authority lock

- **Episode number/title/slug:**
- **Release state:** ruled substance / canon approved / released
- **Canonical source path:**
- **Canonical source SHA-256:**
- **Evidence timestamp and timezone:**
- **Canonical concept IDs and owner:**
- **Prerequisites:**
- **Adjacent concepts this pack must not reteach:**
- **Present fact / inference / disagreement / forecast / scenario boundaries:**
- **Perishable claims, evidence owner, observation date and recheck trigger:**
- **Episode misconception and analogy limit:**
- **Completed shared intake/complement card:**
- **Episode opportunity-scan record:**

If substance or canon is unruled, stop. A schedule, episode title, visual seed
or manifest row is not concept authority.

## 2. Learner outcome and component selection

- **What the learner should understand after the Episode:**
- **What she should recall later:**
- **What she should perform on a real task:**
- **What she should look up at the moment of need:**
- **What the separate Quiz may validly sample:**
- **Evidence that would show misconception resistance and transfer:**

Every row receives `selected`, `not_applicable`, `held` or `declined` plus a
reason. `Not applicable` is valid; an empty artifact is not.

| Component | Disposition | Unique cognitive job | Why an existing item cannot already do it | Canon source locator | Content owner | Independent acceptance owner |
|---|---|---|---|---|---|---|
| Study Sheet |  | Compact delayed review |  |  | Study Pack | Episode + Learning System + instructional/accuracy |
| Try-On / named alternative activity |  | Bounded performance and transfer |  |  | Try-On / named owner | Learning System + UX/accessibility |
| Cheat Sheet |  | Durable point-of-need reference |  |  | Printables/Study Pack | Accuracy/freshness + UX/accessibility |
| Concept Cards |  | Retrieval and memory |  |  | Trading Cards | Episode + learning + visual/platform judges |
| Quiz — separate |  | Understanding/discrimination/transfer sample |  |  | High Quiz | High + independent assessment/accuracy |

The Quiz is listed for coordination but is never packaged or labelled as a
Study Pack component.

Do not fill every row. Each episode receives only the components with distinct,
canon-backed learning jobs. Episode 01 deliberately combines compact recap,
key evidence, terms, phrases and point-of-need reference into one one-page
Cheat Sheet; it has no separate Study Sheet.

For any selected Concept Card/Trading Card Pack, keep the common card anatomy
but specify a distinct **episode pack identity** before art production:
approved episode artwork, background colourway, accent palette, wrapper motif,
back-frame treatment and print-sheet treatment. A later episode may not inherit
Episode 01's pack palette merely because the component type is the same.

## 3. Required component cards

Complete one card for every selected component.

### Study Sheet

- **Reader question answered:**
- **Direct answer / correct mental model:**
- **One relationship/mechanism that needs a diagram, if any:**
- **3–5 essential concepts:**
- **Representative example:**
- **Misconception/limit:**
- **Remember line:**
- **Exact continuation:**
- **What is deliberately left to Episode, class, Try-On and Cheat Sheet:**
- **Delayed explain-back check:**

Reject if it is a synopsis, transcript, worksheet, class, decorative poster,
new concept source or placeholder.

### Try-On or named alternative activity

- **Target behaviour:**
- **Real-task input and privacy/safety boundary:**
- **5–10 minute steps:**
- **Observable output/change:**
- **Feedback/self-check:**
- **New-context transfer prompt:**
- **Save/delete/persistence truth:**
- **What the learner's completion does and does not prove:**

Reject if visiting/copying completes it, if it reteaches the lesson, if it
pretends to perform the user's task, or if the canon deliberately chose a
different activity.

### Cheat Sheet

- **Future moment of need:**
- **Durable checklist/decision tree/template/reference table:**
- **Scope and failure/stop rule:**
- **Product-specific dated appendix, if any:**
- **Source/review date and correction owner:**
- **Exact deeper route:**
- **What is deliberately left to Study Sheet and Try-On:**

Reject if it is an episode recap, practice worksheet, answer key, undated
product guide or long lesson wearing a printable layout.

### Concept Cards

For each proposed card:

- **Immutable card and pack key:**
- **Unit category:** concept / framework step / history anchor / practice
  principle
- **Front retrieval cue:**
- **Back explanation:**
- **Canon locator and evidence receipt:**
- **Misconception/analogy limit:**
- **Correction owner and revalidation date:**
- **Alt-text seed and prohibited visual misconception:**

Reject duplicate concepts, reference trivia, metaphor-only teaching, generic
motivation, unverified facts, reward claims or a pack that misses the
episode's actual learning job.

### Quiz — separate

- **Objectives sampled:**
- **Items that require new-situation application:**
- **Misconception-based distractors:**
- **Explanation and exact review route for every answer:**
- **Uncertainty/insufficient-evidence treatment:**
- **Retry and result limits:**
- **Reward authority, if any:**
- **Evidence the Quiz remains separate from the pack:**

Reject reference trivia, unruled next-episode teasers, answer choices that
erase nuance, assessment by option exhaustion or any claim that score equals
mastery/transfer.

## 4. Visual and information-design brief

Every candidate must also pass
`STUDY-PACK-CANDIDATE-ADMISSION-GATE.md` before it is shown to Ali. This
includes sketches, HTML visualizations, screenshots, generated images and
“quick samples”; a local or private artifact does not bypass the gate.

For each selected component record:

- **User state and viewport:** first-time/returning; 320/390/1280; print where
  applicable
- **Information hierarchy:** first thing seen, primary action, evidence/limit,
  continuation
- **Component visual job:** review map, workbench, reference, retrieval cue or
  assessment—not generic episode decoration
- **Required text at actual size:**
- **Approved episode/brand references and prohibited assets:**
- **Meaning carried by colour, shape, icon and text:**
- **Keyboard, screen-reader, reduced-motion and 200% zoom behavior:**
- **PDF/HTML parity and alt-text plan where applicable:**
- **Empty/error/held/not-applicable state:**
- **Independent visual/UX judge:**
- **Exact current component names shown to the visitor:**
- **Banned-language scan result:**
- **Five-second cold-reader comprehension result:**
- **US Letter/A4 proof paths and checksums, when printable:**
- **Trading Cards owner receipt and pack/front/back/print proof, when shown:**

One surface may adapt the episode's visual world, but every component needs a
recognizably different information structure that expresses its cognitive job.
Internal cognitive-job labels must never replace the public component names.
The Pop Quiz remains visibly separate at SUNNYVAiLE High.

## 5. Admission manifest

Every component record includes:

- stable episode/component/version ID;
- status `candidate`, `available`, `held`, `planned`, `unavailable` or
  `not_applicable`;
- source hash and exact route only when admitted;
- content owner, freshness/correction owner and independent acceptance owner;
- product/content, accuracy/trust, UX/accessibility and visual evidence;
- learner explain/apply/transfer evidence appropriate to the component;
- dependency and rollback/hold behavior; and
- public-artifact identity and exact public proof before `available`.

`planned` has no route. `held` has no operative pack route. `not_applicable`
records the canon-backed reason. A published Episode does not upgrade any
child.

## 6. Cross-owner sign-off

| Gate | Owner | Required result |
|---|---|---|
| Canon fidelity | Weekly Episode Engine | Every component derives from the exact ruled episode and preserves scope/analogy/claim guards |
| Complement and duplicate prevention | Learning System & Concepts | Each selected component has a distinct job; no second concept source |
| Component product acceptance | Study Pack / Try-On / Printables / Cards / High | Exact content and journey meet their owner contracts |
| Accuracy/freshness | Independent accuracy + freshness owner | Claims, dates, uncertainty and correction triggers pass |
| Instruction/assessment | Independent learning/assessment reviewer | Review, practice, retrieval and assessment actually test their named jobs |
| Visual/UX/accessibility | Independent visual and accessibility reviewers | Actual candidate passes at required viewports/states |
| Pack admission | Blend & Snap | Manifest status and route match child evidence; missing/held/N/A remains truthful |
| Integration/release | Control Room + release owner | Locks, exact artifact and public proof pass; no status borrowed across owners |

## 7. Completion statement

Allowed:

> Episode NN has a complete Study Pack decision: every component is selected,
> held, declined or not applicable with a reason. The following selected
> components are independently admitted: [list]. The separate Quiz status is
> [status].

Not allowed:

> The Episode is published, so the Study Pack is ready.
