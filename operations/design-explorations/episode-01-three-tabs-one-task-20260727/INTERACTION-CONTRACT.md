# Episode 01 Try-On — interaction contract

**Experience:** THREE TABS, ONE TASK  
**Status:** BUILT LOCALLY — INTERACTION PASSED; CURRENT PAGE STYLE APPROVED;
FULL REVISED VISUAL QA PENDING  
**Date:** 2026-07-27; page-style ruling approved by Ali 2026-07-28

## Approved page-style ruling — 2026-07-28

Ali approved the current page direction as the Study Pack visual baseline:

- the overall page uses the Homepage's broad soft pink–lilac–cyan gradient;
- content cards use the brighter colour-block treatment exemplified by the
  Homepage's **LAiDIES Method** and **Games and tools, open all day** sections;
- card gradients stay within one colour family rather than mixing arbitrary
  rainbow endpoints;
- coral/pink, teal, lavender, cobalt and sunshine-yellow cards may carry the
  visual energy;
- editable inputs remain visually neutral and unmistakably interactive;
- each card/state uses a separately verified foreground colour;
- automatic uppercase must never rewrite an authored lower-case `i` in
  `LAiDIES`, `SUNNYVAiLE` or another brand name; and
- the exact current Homepage wordmark construction and i-dot metrics apply.

This approval rejects black-background, cream/paper, white-and-deep-plum,
all-blue, opaque-white-box and candy-text-box treatments.

## Visitor promise

Bring one small, low-risk task you have been avoiding. Give the same task to
ChatGPT, Claude and Gemini. Compare the three first passes, choose what works
for this task, make one human change and leave with a usable draft plus a dated
record of what you learned.

## State 1 — choose the task

- A real text input asks: **What is one small task you have been avoiding?**
- Suggested starter tasks remain available as buttons, not placeholder copy.
- A quiet helper beside the task field reminds the learner to keep the task
  small and leave out private details; it is not a required performative
  checkbox or prominent header banner.
- **USE THIS TASK** saves the exact wording used for all three tools.
- The interface provides a working **COPY TASK** control.

## State 2 — visit each tool

ChatGPT, Claude and Gemini each receive:

- a dated current-interface orientation card;
- a working official link that opens in a new tab;
- a clear instruction showing where to paste the task;
- an optional account-free guided example;
- a required **MODEL / MODE SHOWN IN YOUR TOOL** control; and
- an explicit **NOT SHOWN IN THIS CHAT** choice.

The model/mode control may be a current select list plus `Other` and
`Not shown`. It must never silently assume a model. A compact **HOW TO CHECK**
helper explains that the label may appear in the chat header or model menu and
that some surfaces do not disclose the underlying model. When the provider UI
shows only a product or plan label, the fixture must keep that visible label
separate from any provider-documented default or routing evidence.

For the dated LAiDIES fixtures:

- ChatGPT signed-in Free, checked 2026-07-28: the header showed
  **ChatGPT** and **Free**, while the response’s **Try again** menu confirmed
  **Used GPT-5.5**. OpenAI’s current
  [GPT-5.5 in ChatGPT documentation](https://help.openai.com/en/articles/11909943-gpt-5-in-chatgpt)
  identifies GPT-5.5 Instant as the default for logged-in users. The guided
  fixture therefore reads **ChatGPT Free · GPT-5.5**;
- Claude Free Incognito: **Sonnet 5**, **Medium** effort; and
- Gemini Temporary chat: **Flash**.

These are example receipts, not defaults applied to a learner's run.

The ChatGPT fixture was rerun with the exact shared task on 2026-07-28. It
returned an editable email writing block. A separate learner test with a vague
time-off request produced a guided questionnaire before the draft. This is a
useful interaction difference: the learner should compare both the answer and
how the tool helped them reach it. Personal details from that learner test are
not stored in the public fixture.

## State 3 — bring back the answers

Each tool has a real multiline answer field:

- **PASTE THE ANSWER OR A SHORT NON-SENSITIVE EXCERPT**
- **USE THE GUIDED EXAMPLE** when the learner cannot use the live tool
- **CLEAR** and **EDIT**

The learner sees a privacy reminder before pasting. The page stores nothing
remotely by implication.

## State 4 — compare

The comparison uses one active tool at a time on narrow screens and may show
all three on wide screens when body text remains readable.

For the active answer:

- four real segmented rating controls:
  - **Got what I meant**
  - **Gave me useful material**
  - **Tone and style fit**
  - **Easy to work with**
- each control exposes labelled values:
  - `1 — missed it`
  - `2 — weak fit`
  - `3 — partly useful`
  - `4 — good fit`
  - `5 — strong fit for this task`
- four real range controls with visible current values:
  - `short ←→ detailed`
  - `straight to the point ←→ conversational`
  - `sticks closely to my ask ←→ adds extra ideas`
  - `plain paragraphs ←→ heavily structured`
- real text areas:
  - **I liked…**
  - **I didn’t like…**
  - **I would change…**
- one evidence check:
  - **Is there anything factual here I need to verify?**
  - `Yes / No / Not applicable / I’m not sure`

Selected states, focus states, keyboard operation and screen-reader labels are
required. Empty circles drawn on a screen do not satisfy this contract.

## State 5 — choose and improve

- The learner chooses one answer with **MY PICK FOR THIS TASK**.
- The interface shows the selected answer in an editable field.
- **MAKE ONE HUMAN CHANGE** requires one deliberate edit or a short statement
  of what the learner changed and why.
- If the evidence check is `Yes` or `I’m not sure`, completion keeps a visible
  **VERIFY BEFORE USING** flag.
- **MAKE MY FIRST-PASS RECEIPT** completes the activity.

## Completion — My First-Pass Receipt

The result contains:

- the exact task;
- date completed;
- each tool and learner-recorded visible model/mode;
- ratings and neutral style fingerprints;
- `I liked / I didn’t like / I would change` notes;
- the selected tool **for this task**;
- the selected draft;
- the learner's human change;
- the verification status; and
- the reminder that this is a task-specific observation, not a permanent tool
  ranking.

Working actions:

1. **COPY MY DRAFT**
2. **DOWNLOAD / PRINT RECEIPT**
3. **TRY ANOTHER TASK**

Optional device-local save requires a plain-language scope label and a working
clear/delete action. It must not imply an account, cross-device sync or private
cloud storage.

## Admission failures

Reject the Try-On when:

- ratings look like decorative circles rather than controls;
- feedback areas are not editable;
- model/mode is assumed or invented;
- the learner cannot paste or use a guided answer;
- the experience ends at scoring with no usable draft or receipt;
- a provider receives a permanent rank or aggregate winner score;
- the selected answer cannot be edited;
- copy/download/print actions are decorative; or
- private-data and persistence scope are unclear.

## Verified local implementation

The working React prototype is in `prototype/`. On 2026-07-27 it passed:

- the complete task → answers → comparison → choice/edit → receipt journey;
- the current live-Jost LAiDIES wordmark and retired-wordmark build guard;
- all twelve provider-specific rating controls;
- editable notes, model/mode records, style controls and verification state;
- required deliberate editing before receipt creation;
- working draft copy, receipt download and restart actions;
- desktop visual comparison against the selected LAiDIES direction;
- production build; and
- the four Sites packaging and fallback tests.

The prototype deliberately keeps all learner entries in current page memory. It
does not claim accounts, cloud sync or remote saving.
