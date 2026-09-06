> Recovered from this task's exact original audit-writing tool call and the subsequent FAiRY-role and Hedy-dialogue corrections. This is dated observation history, not a new live audit or current release claim. Current completion status: [homepage correction plan](../homepage-corrections-2026-09-05.md).

# LAiDIES homepage and first-visit journeys — fresh live audit

5 September 2026 · Production observations captured approximately 07:57–08:19 America/Vancouver.

**Recommendation: repair answer trust and broken journeys before adding more homepage content. Then make the homepage deliver one useful result quickly, with the town available for discovery and return visits.**

The largest problem is the gap between the confident invitation and the result behind it. Miss Jeeves can omit a crucial safety condition from her own source. The advertised Express Route returns to the homepage. The practice destination cannot load its menu. Orientation pages make visitors read internal verification language. The homepage makes all of those destinations look like parts of an accessible learning experience before the visitor discovers the gaps.

This is a product and UX audit, not an implementation, release verdict, usability study with participants, or full accessibility certification. Findings below distinguish direct observations from likely visitor consequences. Recommendations are proposals, not newly approved canon.

## The strongest case against changing the homepage

LAiDIES has several legitimate entry intentions. A professional woman may want a work tool, a story, news, music, community, or an enjoyable break. A single forced course or generic three-card marketing page would discard useful breadth and much of the town's identity. The current homepage also has functioning anchor shortcuts, a readable mission, and real destinations. Length alone does not prove a usability failure.

The case for change is more specific: repeated directories and explanatory detours consume attention without reliably improving the visitor's choice. The answer is to preserve the world, mission and optional exploration while removing repeated decision-making and making each primary promise true at its destination.

## Ranked findings

### 1. Miss Jeeves drops the permission condition from work-document advice

**Priority: P1, address first. Observation: certain. Potential harm: high.**

At [the Library question desk](https://laidies.ai/library.html#miss-jeeves), selecting the site's own “Can I upload a work document?” example produced:

> You can upload a work document when the AI needs to work with the actual content, such as analysing, summarising, or comparing it. In 2026, the models handle full documents well, so you don't need to pre-summarise a 50-page report before uploading it. Just upload it.

The first recommended source immediately below starts with an Allowed-Information Check: whether the AI is allowed to receive the information, whose information it is, its sensitivity, employer/client policy, account type, retention and connector permissions. The answer has removed the prerequisite while retaining the action. The general warning not to enter confidential information into Miss Jeeves does not repair advice about uploading a document to another AI product.

**Consequence, likely:** a visitor may act on the confident short answer without opening the source. The system designed to build judgment can instead teach an unsafe shortcut.

**Correction:** the answer must retain every condition that changes whether the recommended action is appropriate. Use this exact observed question and source as a regression case. Add an independent case in which removing one source condition changes the answer. Rendering a citation or producing fluent prose is insufficient. Do not expand “ask anything” promotion until the answer-to-source path passes these tests.

![Miss Jeeves recommends uploading, while her source requires a permission check](/Users/alisoneakin/Documents/Codex/2026-09-05/laidies-homepage-ux-audit/21-jeeves-work-document.jpg)

### 2. The short learning route fails, and the practice stop is unavailable

**Priority: P1. Observations: certain. Visitor abandonment effect: likely, not measured.**

The homepage advertises an Express Route through episode → available practice → quiz. Clicking that exact link to [this-week.html](https://laidies.ai/this-week.html) navigated to https://laidies.ai/ and displayed the homepage again. A direct visit produced the same result. This is a broken journey even though a complete page loads.

At [Blend & Snap](https://laidies.ai/blend-snap.html), the pack menu is unavailable. The visible error says the episode index and component manifest disagreed, were stale, or could not be loaded. “Try loading the menu again” returned the same unavailable state. The observed error does not identify which underlying cause occurred; this audit makes no root-cause claim.

The homepage directory nevertheless says “Open practical Study Packs, Try-Ons and teaching cards.” The weekly route is more cautious, but asks visitors to open destinations to discover availability. That transfers route planning onto the visitor.

**Correction:** restore a real Express Route or point the CTA directly to a working, clearly named alternative. Advertise actual available components before navigation. When practice is unavailable, offer a specific useful exercise or omit the practice step from the live route; keep the unavailable state honest. Never bypass the content gate to fill the route.

![Blend & Snap remains unavailable after retry](/Users/alisoneakin/Documents/Codex/2026-09-05/laidies-homepage-ux-audit/14-practice-unavailable.jpg)

### 3. Miss Jeeves' own example does not deliver the promised answer, and its results expose raw markup

**Priority: P1 for rendering; P2 for coverage and positioning. Observations: certain.**

From the homepage, “Why does the AI ignore part of my prompt?” submitted through [the linked Library route](https://laidies.ai/library.html#miss-jeeves?q=Why%20does%20the%20AI%20ignore%20part%20of%20my%20prompt%3F&from=homepage). A loading message appeared, then “Related material—not an exact answer.” The response provided a long list of material associated with “prompt.” One NewsStand result visibly printed paragraph and strong tags as text, with a long, underlined article excerpt. This is a rendered defect, not merely HTML present in source.

Honest no-coverage is preferable to an invented answer. But a featured example should demonstrate a supported successful job. Otherwise “Ask Miss Jeeves anything about AI” and “direct answer” set expectations the demonstration cannot meet.

**Correction:** fix result text rendering, retain essential qualifications, put the best one or two destinations first, and group additional material by a useful purpose. Choose example questions by demonstrated answer-and-route quality. A bounded related result should say why it is relevant and what remains unanswered. Do not substitute a large foundational FAQ bank for professional women's varied questions.

![A homepage example returns related material with visible HTML tags](/Users/alisoneakin/Documents/Codex/2026-09-05/laidies-homepage-ux-audit/03-jeeves-result.jpg)

### 4. The first useful action is delayed, particularly on a phone

**Priority: P2. Measurements: certain within the tested viewport and loaded state. Effort effect: likely.**

The loaded homepage measured 12,518 pixels tall at 1200 pixels wide, and 22,018 pixels tall at 390 × 844. At 390 pixels, the intent heading began around y=1,181, the second directory around y=3,429, the mission heading around y=6,373, and the Miss Jeeves heading around y=17,824. These are document positions, not a requirement to scroll through everything: working anchors can bypass the distance.

The first phone screen contains the makeover notice and masthead; it contains no main action button. The masthead's two actions explain why LAiDIES exists and how it works. The menu's “Start learning” also points to the method explanation. “I want to learn” points to /learn.html, which currently resolves to the Library; the supposedly separate Learning hub and Books and guides destinations therefore converge on the same page.

**Correction:** keep the masthead and a concise statement of purpose, but give the visitor a clear action leading to a real first result within the initial screen or its immediate continuation. Give “How LAiDIES works” its own honest label. Consolidate repeated learning/feature directories, preserve one searchable or browsable town directory, and make discovery optional depth.

![The first screen at 390 × 844 has no main action button](/Users/alisoneakin/Documents/Codex/2026-09-05/laidies-homepage-ux-audit/15-home-phone.jpg)

### 5. Miss Jeeves and FAiRY: distinct teaching roles with intentional overlap

**Updated after Ali's clarification, 2026-09-05. Role intent: confirmed by Ali. Shared answering/handoff: specified, not implemented or tested here.**

The original audit proposed an overly strict “understand versus do” split.
That recommendation is superseded. FAiRY's role is advice plus teaching the
visitor to use her own AI for tailored advice in future; a completed task or
polished prompt alone is not her full purpose. Miss Jeeves helps answer more
technical AI questions in plain English.

| | Miss Jeeves | FAiRY Godmother |
|---|---|---|
| Primary emphasis | Understand technical AI questions, capabilities, limitations and use | Get advice on the situation and learn how to get tailored advice from one's own AI next time |
| Shared question | “My boss asked me to do X. How can I use AI to help?” | The same question should ideally receive the same answer here |
| Answer consistency | Shared facts, advice, limitations and useful next steps | Character presentation must preserve that same substance |
| Conditional handoff | Offer FAiRY when appropriate; wait for yes; open and prefill her question box | Offer Miss Jeeves when appropriate; wait for yes; open and prefill her question box |
| Submission | The visitor reviews/edits the transferred question and presses Ask | Prefilling or arriving never submits the question automatically |

Ali prefers either helper to answer overlap questions. Transfer is the fallback
if that proves too difficult, not the default route for every practical task.
Shared answer rules and maintained sources are an implementation recommendation;
the current systems' ability to produce the same answer has not been tested.
Exact wording versus equivalent substance has not been separately decided.

**Preserve existing FAiRY work.** Saved source already explicitly calls for
advice on the actual situation and a prompt to take to the user's own AI. That
supports continuity of intent, but does not establish which backend is deployed.
The completed live test used a prompt-improvement case and returned a usable
answer, reasons, assumptions and a next move. It did not evaluate FAiRY's full
advice range, revision flow or whether she consistently teaches future use.

The live page was reopened after Ali's clarification. Its current case/tone
interface matched the audit. A second, synthetic workplace question—asking how
to prepare a plan to reduce repeated administration for a team meeting—returned
“Today’s FAiRY beta allowance is used. No additional case was counted.” No second
answer was obtained and the allowance was not bypassed. This follow-up confirms
the observed interface and limit response, not a complete review of all updates.

[Current role and handoff ruling](</Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/library-decisions.md:3>).

### 6. FAiRY has a useful output, but the phone entrance hides it behind ceremony

**Priority: P2. Direct result and measured input position: certain. General service reliability: unverified.**

One guest case using invented, non-confidential project-update context produced an improved prompt with Decisions, Risks and Next steps, missing-information rules, reasons, assumptions and a next move. This is a concrete example of the mission's “use it better” outcome. A copy control and revision controls were present; copying and revisions were not exercised.

On a 390-pixel phone, the question field began around y=2,333. The page first presents “Stuck prompt? Come inside,” then another prompt headline, visit information, unavailable parlour art, and a tone selector. The task input is Step Two. An empty submission gives a useful explanatory message, but places it in the separate result area.

**Correction:** put the visitor's task first, default the tone, make personality selection optional, and expose an example result nearby. Keep the humour in the useful work. Explain the case allowance in local everyday language; “UTC day” and “fittings” needlessly increase interpretation. Preserve privacy boundaries and the usable-answer/reasoning distinction.

![FAiRY's tested case produces a usable result](/Users/alisoneakin/Documents/Codex/2026-09-05/laidies-homepage-ux-audit/05-fairy-case-result.jpg)

### 7. Internal process language is replacing hospitality across the town

**Priority: P2. Repeated live pattern: certain.**

Visitor's Centre displays “Visitor-safe arrival,” “No Resident Card, account, name, ownership, sign-in, sync or cross-device state is inspected or inferred here,” and “Route arrival is navigation, not completion.” Its destination status was unavailable. Selecting Chick Flicks offered a link to check the destination's current status, not a confident explanation of the first useful thing there.

Post Office names Buttondown repeatedly and explains that opening a form is not a subscription receipt. Community pages say that a visible frame is not a receipt of a contribution. Blend & Snap exposes manifests. Other pages lead with “visual held” notices.

The underlying truth boundaries are appropriate. Their implementation language does not belong in the main visitor flow. It asks nontechnical visitors to reason about LAiDIES' production and provider architecture.

**Correction:** replace audit prose with short, actionable visitor states: what is available, what is unavailable, and the next useful action. Put provider/privacy details where the decision is made. Keep internal proofs and release state in operations. Retain a candid makeover notice, but reduce repeated, full-page apologies and technical caveats.

![The orientation desk asks visitors to interpret readiness and verification](/Users/alisoneakin/Documents/Codex/2026-09-05/laidies-homepage-ux-audit/09-orientation-status-error.jpg)

### 8. Account value and the Closet's promises do not form one understandable experience

**Priority: P2; treat unverified reward claims as trust work before promotion. Observations: certain; backend truth: not established here.**

MAiKEOVER offers six customization steps, then a name/save step and a separate sign-in route. The account page correctly distinguishes local Card state from account-backed continuation and presents an email-link form. The audit browser was signed out and had no valid local Card.

The Closet nonetheless showed a template Card marked “No. 0000,” numerous membership cards, zero counters and a weekly route promising “+1 FAiRY wish.” It called trading-card storage “Packs at Blend & Snap,” while that menu was unavailable and the homepage said packs and ownership were not available yet. FAiRY herself uses cases, fittings and Wisdom rather than the Closet's wishes vocabulary. Several buildings visited during this audit still appeared as “Never visited” despite copy promising automatic visit stamps. This is a visible mismatch; its persistence or identity cause was not diagnosed.

The membership/collection presentation makes the visitor infer what exists, what is merely a template, what is on this device, and what is portable. The public pages offer different answers to what the Card does.

**Correction:** one Card identity and one plain-language state summary everywhere. In the empty Closet, first show how to create or restore a Card and one real thing worth keeping. Surface the supported save/resume value before decorative setup. Label planned collections distinctly or hide their empty counters. Remove unverified earning/allowance promises from the journey until the actual grant, spend and restore path is proved. Keep independent newsletter and community consent.

### 9. The mission is articulated better than it is operationalized

**Priority: P2 structural. Mission text: certain. Missing pathway judgment: likely.**

The homepage's three transformations are meaningful: use AI better; judge claims amid noise; participate in decisions. The Library preface repeats that purpose. The current headline opens a real, dated NewsStand article with a practical interpretation and source links. FAiRY's tested output is a real practical payoff. These are assets for the target experience.

The homepage mainly connects the mission to another explanation, a women-in-computing destination and Episode 04. It does not present a compact path from each transformation to a concrete action and a clear finish. “Have a say” is the weakest explicit bridge: visiting profiles or reading that participation matters does not itself prepare a woman to question an AI proposal in her workplace or community.

**Correction:** tie each mission outcome to one working example and next action. For instance: improve a non-confidential work brief; assess a current claim using its evidence and limits; prepare three informed questions for an AI rollout. The third is a proposed learning task, not a claim that this artifact already exists. Reuse exact admitted material where it can do the job. Do not build another general-purpose advice product.

### 10. Return value is buried; community starts with an empty room

**Priority: P2. Observations: certain. Retention impact: hypothesis.**

After listening to part of Episode 04, the homepage still offered generic “Continue or catch the latest episode” rather than a visible personal position in the tested signed-out state. NewsStand did show a device-remembered previous visit and catch-up content. This is evidence for a local returning state, not account synchronization.

Delta LAi Nu's Ask the Room loaded the actual Hyvor comment interface, with zero comments, a separate login and “Be the first to comment.” Eleven room destinations were advertised. The single room checked was empty; this audit did not establish that all rooms are empty. Buttondown's actual subscription page opened successfully, without submitting an address.

**Correction:** prioritize “continue your actual item” and “what changed since your visit,” with device/account scope stated simply. After a useful result, invite the visitor to save it or receive a genuinely useful Wednesday update. Give an empty community room an answerable, hosted prompt and a visible contribution worth responding to; consider fewer active rooms until conversation warrants growth. Do not equate creating a Card with joining a conversation.

### 11. Visual continuity and accessibility need a shared interaction standard, not a wholesale art replacement

**Priority: P2. Visible variation: certain. Preference/comfort consequences: judgment.**

The tested town shifts between the vivid, image-rich homepage, the Library's large comic typography, FAiRY's tall condensed headlines and blank purple entrance, several pale pages dominated by held-state language, and an elaborate dressing-room Closet. Building variety is appropriate. Repeated full-height unavailable visuals, changing navigation labels and uneven control prominence make it harder to carry confidence between them.

Keyboard positives were directly observed: homepage skip link focused the main region; Menu opened and Escape closed it; the map's Library popup opened from Enter, focused Close, and Escape restored focus to the Library trigger; the textbook reader closed with Escape. The homepage had no page-wide horizontal overflow at 390 or 320 pixels. With reduced motion emulated at 320 pixels, no arrival controls were visible after loading. Those observations are bounded checks, not full motion or accessibility compliance.

**Correction:** align navigation labels, focus treatment, error language, primary-control size and content hierarchy across buildings. Keep distinctive rooms and editorial art. Test low-contrast accent text, zoom, complete tab order, popup focus containment, text alternatives and screen-reader announcements before implementation is admitted. No contrast-failure claim is made from screenshots alone.

W3C explains why [clear link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) and [visible keyboard focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) matter. These standards inform the next checks; they do not turn this sampled audit into a compliance certification.

### 12. Historical review note — Hedy dialogue objection withdrawn

**Correction, 2026-09-05: the Hedy attribution finding is withdrawn. Other historical-wording observations remain separate, undecided review notes.**

Ali clarified that “It is a very useful thing … to be underestimated — no one watches what you're actually doing” is dialogue we wrote for Episode 04’s story. It is not being offered as a documented statement by the historical Hedy Lamarr. I misclassified scripted character dialogue as historical testimony. **The attribution objection, P1 ranking and recommendation to source or remove this line are withdrawn. Preserve the episode script; this correction does not call for a disclaimer or rewrite.**

The same page calls Ada Lovelace's work “The first algorithm” and the ENIAC Six “quite literally, the first programmers.” Those absolutes erase the needed scope. Oxford's [History of Science Museum](https://hsm.ox.ac.uk/imagining-ai) describes Lovelace's algorithm for the Analytical Engine; [Penn's ENIAC history](https://penntoday.upenn.edu/news/worlds-first-general-purpose-computer-turns-75) identifies ENIAC's original programmers. Neither establishes “first algorithm” across all history or unqualified first programmers.

**Review boundary:** identify scripted story dialogue before checking historical quotations. Any further review of the separate historical-first wording above must reconcile existing script and canon decisions before proposing changes; it is not part of this correction. This was a selected claim check, not a fact-check of the whole episode, textbook, current model article, or site.

## Proposed homepage architecture

This is a functional order and content hierarchy, not a visual candidate or replacement copy approval.

1. **Masthead, purpose, and a real start.** Retain the recognizable LAiDIES identity and Rewind Era premise. One concise purpose statement connects practical AI fluency to work, judgment and women's participation. Add a primary start that reaches a verified first useful result. Keep “Why LAiDIES exists” and method explanation accessible without making them prerequisites.
2. **Choose the outcome.** Three prominent functional doors: understand something with Miss Jeeves; get advice and learn how to use your own AI with FAiRY; judge a current headline at the NewsStand. Keep a clearly labelled story/episode start and listening choice within immediate reach. Do not make these three doors the full catalogue of LAiDIES.
3. **Show the method through one actual example.** A short story/analogy → explanation → useful action → memorable song demonstrates the method better than another inventory. Choose an existing, admitted example with a working continuation.
4. **This week / continue.** Show a real released episode and current news, with dates and actual format availability. Returning visitors see their actual supported continuation when known. Unknown state receives an honest start, not fabricated personalization. The route contains only operable steps; the eight-stop town ritual remains optional.
5. **Explore the town once.** One coherent directory, with plain-language jobs and an optional map. Games, music, women in computing, community and leisure remain first-class discoverable experiences. Remove the second full directory and repeated promotional lists.
6. **Keep what mattered.** After value, offer Card/Closet continuation with exact supported scope, followed by the independent Wednesday Postcard invitation. Community has its own clear entry and sign-in boundary.

The most recent located saved Homepage decision orders mission → method → intent choices after the masthead. This audit challenges the amount of explanation required before action, without proposing removal of the mission. The target can preserve that purpose-led sequence in compact form while keeping a direct useful start visible. Any structural change is a future product decision; the audit did not alter the recorded ruling.

## What to remove, consolidate, rename, surface or build

| Action | Specific scope |
|---|---|
| Remove from primary flows | Raw markup, manifest/receipt language, duplicate full directories, unsupported reward claims, repeated full-screen held-art scaffolding |
| Consolidate | Learning hub/books routes that currently converge; repeated homepage activity lists; status vocabulary; Card/Closet state explanation |
| Rename or explain | “Start learning” when it only explains the method; FAiRY's cases/fittings/wishes vocabulary; “supported saves” with actual examples |
| Surface | A working first action, useful FAiRY result, exact NewsStand date, available episode formats, real continuation and the value of a save |
| Repair before building | Miss Jeeves source fidelity/rendering; Express Route; practice availability handoff; misleading collection/allowance promises |
| Build only where absent | A small mission-to-action path, coherent source-aware assistant handoffs, and a proved save/restore continuation for the advertised scope |

## Smallest sensible implementation sequence

1. **Trust and route corrections.** Repair findings 1–3. Reproduce the bad outputs before accepting corrections. Test the exact public homepage CTA through to the usable destination. Keep unavailable content unavailable, but offer a real alternative.
2. **One complete mission path.** Use the successful project-update case as the practical pilot; add a supported explanation and a bounded checking action. Verify the whole path on desktop and phone, including errors. This prevents a new homepage from promoting another unfinished chain.
3. **One homepage hierarchy pass.** Introduce the clear first action, compact the repeated explanation, consolidate directories and align the two assistant jobs. Preserve brand, mission, real links, art with current authority, and optional exploration.
4. **One continuation proof.** Test an approved account through save → leave → sign in elsewhere → restore the exact supported item, with expired-link and unavailable-service states. Then advertise that value in the homepage and Closet. Align allowance/collection vocabulary with the actual service.
5. **Return and community refinement.** Promote meaningful changes and actual continuation; give the first active community room a useful hosted starting point. Broaden only when use demonstrates the need.

Acceptance should measure completion of the real intended job, not click counts alone. Useful future signals: a visitor can explain which helper she needs; reaches a relevant answer or useful artifact; identifies an answer's limitation; returns to an exact saved item. Time-to-first-useful-result and failed-handoff rate are hypotheses to measure, not metrics collected in this audit. Do not log raw private questions or drafts for these measurements.

## Exact journey coverage and health

URLs ending in .html frequently canonicalized to extensionless routes. That normalization was not treated as a defect. The Express Route's return to the homepage was.

| Step | Journey / exact entry tested | Observed health and limit |
|---|---|---|
| 1 | https://laidies.ai/ | Desktop 1200-wide capture; masthead, mission and navigation inspected. Weak first-action hierarchy. |
| 2 | Homepage Menu, skip link, #method | Menu/Escape and skip-to-main worked; Start learning points to explanation. |
| 3 | Homepage at 390 × 844; 320 × 812 with reduced motion | No horizontal page overflow; first useful action delayed. Emulation, not physical phones. |
| 4 | Homepage prompt example → /library.html#miss-jeeves?q=Why%20does%20the%20AI%20ignore%20part%20of%20my%20prompt%3F&from=homepage | Loading state, then related material and rendered HTML-tag defect. |
| 5 | /library.html#miss-jeeves → “Can I upload a work document?” | Answer appeared but omitted the governing permission condition. |
| 6 | /learn.html → /library → AI Fundamentals preview → Open this book → Escape | Actual book opened, dated edition and prose visible; reader closed. Full reading, save and comprehension not tested. |
| 7 | /games/fairy-godmother.html, empty submit, then one invented project-update case | Validation and a usable answer observed; revision/copy, quota exhaustion and general reliability not tested. |
| 8 | Homepage #activities → Work help → Ask the FAiRY Godmother | Filter changed visible cards and routed to FAiRY. Phone input began around y=2,333. |
| 9 | /visitors-centre.html → named Chick Flicks selection | Directory worked; status unavailable; status-check handoff shown. Full tour/trailer not tested. |
| 10 | Homepage Express CTA → /this-week.html | Returned to homepage; confirmed through real click and direct entry. |
| 11 | /blend-snap.html → retry pack menu | Menu unavailable before and after retry; no practice pack could be completed. |
| 12 | /issues/issue-04.html → Listen → /watch?ep=04 | Reading page opened. Narration advanced from 0:00 to 0:52 with changing captions, then paused at 0:53. Full audio/video quality and lock-screen behavior not tested. |
| 13 | /sunnyvaile-high.html → /learn/quiz.html → Episode 04 → first answer → Next | Quiz selection, disabled-until-answer control and movement to question 2 worked. Completion, scoring, reward and restoration not tested. |
| 14 | /newsstand.html#openai-gpt-6-astra-launch-2026-09-04 | Correct dated article opened, source links and Library continuation visible. Current product claims not independently fully rechecked. |
| 15 | /resident-card.html#rcAccountTitle | No local Card; signed-out service resolved to email-link form. Empty action focused email field. No email sent; authentication unavailable to this audit. |
| 16 | /maikeover.html → Finish; /laidies-card.html | Six-step maker and save requirements inspected; no Card saved. Empty/template Closet and conflicting collection language observed. |
| 17 | /radio.html → Listen to KSVL 99.9 → Stop | Player and now-listening state appeared; another town tab exposed controls for the same player. Full track/audio quality not assessed. |
| 18 | /post-office.html#rent → https://buttondown.com/laidies | Actual newsletter signup page opened. No address submitted; subscription/delivery unverified. |
| 19 | /sorority-house.html → Ask the Room | Hyvor loaded a visible 0-comment interface and separate login. No post, reaction or account action made. |
| 20 | /fun-connect.html; /luminairy.html | Entry pages and navigation/wings inspected. Detailed games, profiles and all tabs not completed. |
| 21 | Homepage #town → Library popup via Enter → Escape | Popup focused Close; Escape dismissed it and restored the Library trigger. Full focus-cycle containment not tested. |
| 22 | Return to homepage after episode listening | Generic latest-episode invitation remained; no visible exact personal position in the tested signed-out state. NewsStand separately showed a remembered prior visit. |

## Evidence and authority limits

**Verified:** the rendered observations and interactions above, captured in this run. Certain means directly observed here; it does not mean the state will never change. Likely means reasoned visitor impact requiring real-user or analytics validation. No conversion-rate, comprehension or retention uplift is claimed.

**Not verified:** account-backed sign-in, cross-device restoration, completed Card/Puffy saves, quiz scoring/rewards, FAiRY revision/copy and quota behavior, newsletter delivery, community posting/moderation, every game/building, full book/episode factual accuracy, all screen-reader behavior, full keyboard order, computed contrast, 200/400% zoom, real iOS/Android and network-throttled performance. No artificial server errors were injected; natural loading and error states were observed. The browser had some pre-existing local history, so this is not a pristine-profile experiment. Newcomer paths and no-Card states were tested, with that limit retained.

**Read-only product authority:** the Canon Index and DECISIONS router were used to locate decisions, not establish live functionality. The August 30 Homepage ruling supersedes the older July experience sequence. Relevant located records:

- [Homepage purpose and architecture, August 30](/Users/alisoneakin/Projects/laidies-homepage-architecture-20260830/operations/homepage-decisions-20260827.md:86).
- [Current saved Library/Miss Jeeves rules](/Users/alisoneakin/Projects/laidies-homepage-architecture-20260830/operations/library-decisions.md:34).
- [Shared-project authority router](</Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/DECISIONS.md:15>).
- [Resident Card design and account role](</Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/resident-card-design-decisions.md:10>).
- [FAiRY product brief, broader case role](</Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/product-stewards/fairy-godmother/EXPERIENCE-BRIEF.md:14>).

The documentation lane initially relied too heavily on July records; its findings were corrected against the later saved Homepage and Library decisions before synthesis. Neither an old dossier nor a local candidate was used as evidence that a feature works publicly. The live site differs from the shared checkout, so no claim is made about the exact deployed commit or the code-level cause of a defect.

**Original audit: no repository mutation.** During the original audit, no source files, operations/canon records, deployed site, account, subscription or community content were edited. No install, purchase, deployment or visual candidate was made. Only this audit document and live captures were saved outside the repository. Normal test interactions may update browser-local visit/progress state; one free guest FAiRY case was exercised, narration and radio were started and stopped, and temporary viewport/media emulation was reset. No paid allowance was purchased.

**Learning from the audit:** a safe source can become unsafe when its short answer drops a prerequisite; a working URL can still complete the wrong journey; an honest internal status can still be an unusable visitor explanation. These are proposed prevention lessons for a future implementation task. The operations learning log was deliberately left unchanged to honor the audit-only instruction.

