# Stage 3 receipt — Health and privacy risk review

**Status:** COMPLETE — private, hash-bound Stage 3 rulings only. No candidate
draft, public data, deployment, publication or later-stage approval was changed
or implied.

**Independent stage owner:** Health/privacy specialist  
**Reviewed:** 2026-07-29, America/Vancouver  
**Prerequisite:** `stage-2-ai-research-accuracy-six-current-hashes-2026-07-29.md`  
**Scope:** the two exact candidate and Breaking-draft hashes below.

## Method and current evidence reopened

The review treated candidate scores, checkboxes and prior receipts as claims,
not proof. It reread the exact reader copy, then reopened the current complete
sources that bear the health and privacy assertions:

1. [OpenAI — Launching Health in ChatGPT](https://openai.com/index/health-in-chatgpt/) (July 23, 2026): availability, permission, connected-data retention, memory and medical-use limitations.
2. [OpenAI Help — Health in ChatGPT](https://help.openai.com/en/articles/20001036-health-in-chatgpt) (updated July 29): current access, permission, deletion, read-only scope and HIPAA-eligibility statements.
3. [OpenAI — Health Privacy Notice](https://openai.com/policies/health-privacy-policy/) (updated June 29, 2026): data categories, model-improvement boundary, limited authorized access/safety exception, processors and memory controls.
4. [FTC — Health Breach Notification Rule](https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0): consumer-health privacy is not a synonym for HIPAA protection.
5. [Anthropic — Share and unshare chats](https://support.claude.com/en/articles/10593882-share-and-unshare-chats) (June 15, 2026): private-by-default chats, public snapshots, plan boundary and unshare control.
6. [WIRED — shared Claude chats in search](https://www.wired.com/story/private-claude-chats-exposed-in-google-and-bing-search-results/) (updated July 28, 2026), [Axios](https://www.axios.com/2026/07/27/anthropic-claude-public-chats-google-search) and [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/block-indexing): dated observation of indexing, the sampled noindex issue and the difference between crawler guidance, index control and access control.

No exposed Claude page, conversation, artifact or personal datum was opened,
copied or retained.

## 1. Health in ChatGPT

**Candidate:** `news-radar-2026-07-26-chatgpt-health-rollout`  
**Candidate SHA-256:** `5627470d47963d9be3767a7526135f246feecd294870f12db1e811a344454dd8`  
**Breaking-draft SHA-256:** `dfc9e3010aa4327f3f4fe3899fa3ba96b1b53dc1b07cc9fdcb0ef9b5eac2a53e`

### Stage 3 outcome: **PASS**

The proposed use lane is proportionate to the demonstrated product boundary:
organizing records, understanding terminology, comparing against the original
record and preparing questions. It expressly excludes diagnosis, urgent
symptoms, medication changes and treatment decisions. That is an appropriately
conservative reader action for a consumer product whose own help material says
it is not intended for diagnosis or treatment and does not replace care.

The four-door explanation is sound. Permission, connected-source deletion,
memory and conversation history are distinct controls; the draft neither
collapses deletion into chat deletion nor implies that disabling memory erases
existing chat history. Its privacy sentence correctly remains attributed to
OpenAI and is limited to foundation-model training and targeted advertising.
The current privacy notice adds that a limited set of authorized personnel and
service providers may access Health Feature data for model safety unless a user
opts out. That is not inconsistent with the published sentence, but it is a
material control nuance for any later longer treatment.

The HIPAA wording is appropriately non-determinative. Current help explicitly
says this Health product is not HIPAA-eligible, is not intended for covered
entity use and offers no Business Associate Agreement; the draft avoids giving
individual legal advice or claiming that no other consumer-health law applies.

### Material-harm and repetition judgment

**Material-harm risk:** high if readers treat contextualized chatbot output as
clinical direction or mistake connector controls for a blanket privacy
guarantee. The exact draft reduces that risk with a clear non-diagnosis lane,
professional-care boundary and separation of controls. **No unsafe repeated
claim:** it does not repeat a sensational medical-performance claim or urge
readers to upload sensitive records.

### Required preservation / freshness boundary

Do not broaden the reader action to diagnosis, triage, medication or treatment
without independent clinical evidence and a new health review. Any revised
copy that says or implies “private,” “secure,” “HIPAA compliant,” “not used by
people,” or universally available must reopen the current privacy notice and
help page, generate a new hash and restart the applicable chain.

**Exact next trigger:** Stage 4 Learning System & Concepts may review these
exact candidate and draft hashes. Any material alteration to either artifact,
availability, permissions, memory/deletion controls, privacy notice or a
health incident restarts at Stage 1 for the new hash.

## 2. Claude shared chats in search

**Candidate:** `news-radar-2026-07-28-claude-shared-chats-search`  
**Candidate SHA-256:** `08bae21aac55b2dbae2dad87597b5f295942849732434404810c46d540c093a7`  
**Breaking-draft SHA-256:** `485d72a2c5c30fd1a31686bd7b0aef15e45cb80aa3ee97c2b38ca0eebf84abf5`

### Stage 3 outcome: **PASS**

The draft fixes, rather than amplifies, the circulating error. Anthropic's
current contract says chats are private by default, but a consumer Share action
creates a publicly viewable snapshot for anyone with the link. Independent
reporting established that some such pages or artifacts appeared in search;
it does not establish a breach of unshared chat storage. The copy states both
boundaries plainly.

Its immediate action is safe and exact: use `Settings → Privacy → Shared
chats` to review and unshare public snapshots. The product source confirms
that setting and says changing Public to Private disables the direct link. The
draft correctly warns that this action cannot establish that a prior viewer,
search index, cache, archive or third party retained no copy.

The noticeboard analogy accurately separates an unguessable URL from access
control and discovery. The technical wording is also proportionate: WIRED's
sample found no `noindex`; Google documents that page-level `noindex`, not a
robots.txt directive alone, is its relevant index-control mechanism. The draft
does not claim that every Claude page lacked that control or that current
search results have one universal state.

### Material-harm and repetition judgment

**Material-harm risk:** high if the correction either falsely tells readers
their unshared chats were breached or falsely reassures users that a shared URL
was a private handoff. The draft neutralizes the viral overclaim without
diminishing the actionable privacy risk. **Repetition judgment:** permitted:
it paraphrases the sensational claim once, labels it misleading, and leads with
the consequential action. It does not reproduce exposed material, search
queries or live share URLs.

### Required preservation / freshness boundary

Do not state that the issue is fixed, all results are gone, every shared page
has `noindex`, or that revocation removes copies, unless current independent
evidence establishes the narrower claim. Do not add examples of exposed
personal, workplace, health, security or financial material; that would create
new exposure rather than teach the privacy model.

**Exact next trigger:** Stage 4 Learning System & Concepts may review these
exact candidate and draft hashes. Any material alteration to the copy, a
change in Anthropic's sharing contract or index-control implementation, a
confirmed breach, or fresh search/remediation claim generates a new hash and
restarts at Stage 1.

## Dispatch record

| Candidate hash | Stage 3 ruling | Downstream state |
|---|---|---|
| `5627470d47963d9be3767a7526135f246feecd294870f12db1e811a344454dd8` | **PASS** | Stage 4 Learning System & Concepts on the exact paired draft hash. |
| `08bae21aac55b2dbae2dad87597b5f295942849732434404810c46d540c093a7` | **PASS** | Stage 4 Learning System & Concepts on the exact paired draft hash. |

## Learning scan

This review reused the existing prevention rules: health/privacy claims must
remain source-bounded; vendor controls are not independent assurance; do not
open or reproduce exposed personal material; and the mechanism matters more
than a sensational headline. No qualifying new failure, surprise or reusable
fix was found, so no painpoint entry is added.

