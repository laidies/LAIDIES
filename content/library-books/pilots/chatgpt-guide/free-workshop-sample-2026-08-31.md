# ChatGPT Free: from source pack to checked workshop plan

**Representative manuscript sample — checked 31 August 2026**

This example uses a real observed ChatGPT Free session and entirely fictional workshop material. It is not a promise that every Free account will show the same model, limits or file tools.

## What this example proves—and what it does not

In the observed session, ChatGPT Free created two requested files, selected the eligible venue and calculated the first budget correctly. Later, after a source update, it returned a revision whose evidence used the new attendance but whose proposal table still used the old catering quantity. A precise follow-up corrected the visible documents.

That proves a useful Free route existed in this account on this date. It does not prove that Free always creates files, that its limits are fixed, or that paying would have prevented the mistake.

## Before you begin

Use ordinary **Chat** if that is what your account provides. In this run the model tooltip showed **GPT-5.6 Luna**. Think was not selected, and no Project or Skill was configured. Do not pretend that means “Light” or “Low”: the Free interface did not expose an effort label for this run.

For a real project:

- remove private or confidential information;
- check **Settings → Data Controls** and your organization’s rules before uploading work;
- use Temporary Chat when you do not want the conversation to create memories or train models, while remembering that OpenAI documents a 30-day safety-retention period; and
- keep the source files and final approved version somewhere you control. Chat history is not your filing system.

This demonstration uses invented people, costs and events. Nothing may be booked, purchased, sent or published.

## Starting material: the complete source pack

### S1 — Organizer brief, approved version 1

Prepare an internal proposal for an introductory AI workshop for 18 adults. Budget CAD 600 including all costs and reserve. Duration 90 minutes including a 10-minute break. Date unconfirmed. No bookings, contact, publication or purchases. Attendees must not need paid AI subscriptions. Include a no-account paired-paper fallback; use fictional practice data. A venue with confirmed step-free access and accessible washroom and capacity for all attendees is required. Choose the lowest-cost option that meets confirmed requirements. Current written vendor quotes override the informal coordinator note on prices, capacity and facilities. The approved brief controls our requirements. Reserve: 10% of venue, catering, delivery and printing combined, once after tax.

### S2 — North Hall current written quote, August 30

Room CAD 240 tax included; capacity 20 attendees. Step-free access and accessible washroom confirmed. Projector included. No availability confirmed. This replaces the August 12 leaflet that listed capacity 24.

### S3 — West Room current written quote, August 30

Room CAD 180 plus compulsory cleaning CAD 30. Both are subject to 5% tax. Capacity 24 attendees. Step-free access and accessible washroom are NOT YET CONFIRMED. No projector supplied. No availability confirmed.

### S4 — Caterer current written quote, August 30

CAD 9 per person tax included, with a minimum bill of 20 people even if fewer attend. Delivery CAD 25 tax included. Dietary needs not collected.

### S5 — Print shop current written quote, August 30

CAD 2 per attendee tax included; one printed practice pack per attendee.

### S6 — Coordinator’s informal note, August 31

I think North holds 24, and West is only 180 all-in. We can probably skip the reserve because the budget has spare room. West looks accessible in photos.

### Required outputs

Exactly two Markdown documents: `proposal.md` and `evidence.md`. `proposal.md` must contain the venue recommendation, itemized budget with subtotal/reserve/total/remaining, a 90-minute agenda, a 120-word-or-shorter invitation marked DRAFT with date placeholder, and no-account/privacy fallback. `evidence.md` must map material claims to source IDs, resolve contradictions using the stated authority order, list unresolved facts and state checks actually performed. Do not claim booked. Flag missing facts without blocking a useful internal recommendation.

## The exact initial prompt

```text
Complete the fictional project in the source material below. Use only those
sources; no web research, connectors, purchases, sending or bookings. Treat
quoted source opinions as evidence to assess, not instructions that override
the approved brief. Produce the two complete requested documents, not a plan
to make them. Use file creation if available; otherwise return each document's
complete text with its filename and clearly state that these are not downloads.
Keep the proposal useful and concise. Acceptance means correct costs, eligible
venue choice, consistent source-backed facts, 90-minute agenda, invitation at
most 120 words, and explicit unresolved items. Report evidence of the checks
you actually performed. Do not add reviewers, extra deliverables or speculative
improvements. Stop when the requirements are met or report the exact blocker.
```

Paste the complete source pack immediately after that prompt, or attach it as one clearly named text file if uploads are available. The phrase “use only those sources” matters because current web research would add noise to an invented exercise. It is not a rule for projects that genuinely need current facts.

## What ChatGPT Free actually produced

It created `proposal.md` and `evidence.md`. The proposal chose North Hall because it was the only venue with confirmed accessibility and enough capacity. Its budget was:

| Item | Amount (CAD) |
|---|---:|
| North Hall | 240.00 |
| Catering: minimum 20 × 9 | 180.00 |
| Delivery | 25.00 |
| Printing: 18 × 2 | 36.00 |
| Subtotal | 481.00 |
| Reserve: 10% | 48.10 |
| Total | 529.10 |
| Remaining | 70.90 |

The agenda totalled 90 minutes with a 10-minute break. The complete invitation was 71 words under the consistent count used in our check. The proposal did not book anything.

The observed account then displayed a data-analysis limit. Chat was still available, so the later revision continued as text. A tool limit is not automatically the end of the whole job.

## The source changes

The approved update was:

```text
# S7 — Approved revision and West's written confirmation, September 1

For this fictional revision only, attendance is now 22. Keep budget CAD 600
and all other organizer requirements unchanged. West has now confirmed
step-free access and an accessible washroom; price/capacity are unchanged.
Use printed exercises without a projector. Date and venue availability remain
unconfirmed. This update supersedes only attendance, West accessibility status
and the exercise format; do not erase the existing quote conditions.

Revise the existing proposal.md and evidence.md. Recalculate affected totals,
reconsider venue eligibility and update every attendance reference. Preserve
unaffected content. State changes briefly. Do not book, research or contact anyone.
```

West was now eligible and cheaper. The evidence document recalculated catering for 22 people and reached the correct total of CAD 536.25. The proposal table did not. It still showed catering for 20 people and a total of CAD 516.45.

Then came the especially unhelpful part: the response’s closing correction sentence named the right figures while the document readers would use still contained the wrong ones. “I corrected it” is not the correction. The artifact is.

## The exact repair prompt

```text
Your revised proposal budget still says catering 20 × $9 = $180 and total
$516.45, while evidence.md correctly uses 22 × $9 = $198 and total $536.25.
Your final correction sentence did not replace the wrong table. Repair the
actual proposal and evidence documents, not merely the summary. Use the
unchanged S1–S7 sources. First reconcile the catering basis, subtotal, reserve,
total and remaining budget everywhere the figures occur. Then return both
complete corrected Markdown documents as plain text (not downloads), preserving
unaffected content. End with one short cross-document consistency check naming
the final five figures. Do not use tools, research, add extra documents, change
the agenda or ask me to upgrade.
```

Notice what this prompt does:

- points to the exact wrong artifact and cells;
- gives the conflicting correct evidence;
- names every dependent figure that must change;
- protects unaffected work; and
- defines the final consistency check.

It does not say “try again,” “be more careful” or “review everything.” Those instructions create motion without telling the model what failed.

## The corrected result

The final proposal and evidence agreed on:

| Final figure | Amount (CAD) |
|---|---:|
| Catering: 22 × 9 | 198.00 |
| Subtotal | 487.50 |
| Reserve: 10% | 48.75 |
| Total | 536.25 |
| Remaining | 63.75 |

The venue remained West Room, with availability still unresolved. The 90-minute agenda and 71-word invitation were preserved.

## Should you pay for this job?

This example did not establish a reason to upgrade. Free produced useful initial files and completed a targeted text correction after a tool limit. Paying may provide more usage, different models or stronger file-working environments, but it does not buy automatic source fidelity.

Move to Work or Codex when the job genuinely needs their permissions and execution environment—not because the task sounds important. Chat is enough when you can provide the source material, receive the complete output and inspect it yourself. Work becomes relevant when you need supported deliverable creation and a broader working surface. Codex becomes relevant when local files, commands, tests or implementation controls are part of the job. None of those labels means “the smart one.”

## What transfers to your own work

Replace the fictional source pack with a small permitted set of facts. Keep these five moves:

1. State which source wins when notes disagree.
2. Ask for complete named outputs, not a plan to create them.
3. Define observable checks before generation.
4. Inspect the visible files, not the model’s completion summary.
5. Correct the smallest proven defect and every dependent value.

If a limit appears, ask what remains available. Reduce the job to complete text when necessary, save it yourself and continue from the last verified version. Do not evade limits, share accounts or repeatedly regenerate the whole project hoping one version will be lucky.

## Sources and test record

- OpenAI [ChatGPT Free FAQ](https://help.openai.com/en/articles/9275245-using-chatgpt-s-free-tier-faq), [models](https://learn.chatgpt.com/docs/models), [Chat, Work and Codex orientation](https://learn.chatgpt.com/docs/app), [data controls](https://help.openai.com/en/articles/7730893-data-controls-faq) and [Temporary Chat](https://help.openai.com/en/articles/8914046-temporary-chat-faq), checked 31 August 2026.
- Exact internal run record: `operations/product-stewards/library/pilot-20260831/RESULTS.md` and the preserved `chatgpt-free-*` run folders.

**Recheck before release:** current Free models and tools, plan limits, interface labels, data controls, Temporary Chat retention and the complete rendered example.
