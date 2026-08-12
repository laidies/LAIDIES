# NewsStand topic taxonomy proposal

**Status:** PROPOSED FOR ALI REVIEW / INVENTORY-BACKED / NOT THE LIVE REGISTER

**Prepared:** 2026-08-12

## Why the earlier examples are not the taxonomy

`Politics`, `prompting`, `privacy`, `models not listening` and `AI safety` were
examples Ali used while describing the discovery experience. They are not a
complete or sufficiently precise tag list. In particular:

- `models not listening` is a reader phrase that may describe instruction
  following, missing context, conflicting instructions, tool failure or a
  multi-turn session drifting;
- `AI safety` is too broad to distinguish evaluations, safeguards, agent
  control, cybersecurity, scams or harmful use; and
- `politics` needs to be distinguishable from law/regulation, government use,
  elections and wider public life.

The current repository confirms the need for a governed replacement. Existing
story/candidate tags mix topics (`privacy`), formats/events (`model-release`),
entities (`openai`), sectors (`health`), mechanisms (`open-weights`) and broad
judgments (`safety`). They are useful migration evidence, not a finished public
taxonomy.

## Recommended two-level model

Every published item carries:

1. exactly one **primary browse topic** from the stable public list below; and
2. one to four **specific tags** selected from the governed child vocabulary.

Both are visible and clickable. The primary topic gives a dependable shelf;
the specific tags let readers follow the exact subject. A specific tag may be
associated with more than one browse topic where the relationship is real, but
it keeps one canonical ID and definition.

Named companies, people, models/products, places, publication type and
current/corrected/archive state are separate metadata filters. They do not
consume topic-tag slots.

## Proposed browse topics and starting child tags

These 17 browse topics cover the current NewsStand, learning inventory and the
likely future reporting range without claiming that the child vocabulary can
never grow.

| Primary browse topic | Reader promise | Starting specific tags |
|---|---|---|
| **How AI Works** | Understand what models are doing and why they behave as they do. | Model Training; Tokens & Context; Reasoning & Planning; Multimodal AI; Model Behaviour & Reliability; Open, Closed & Open-Weight Models |
| **Prompting & AI Skills** | Get better, more reliable results from AI. | Instructions & Prompting; Context & Memory; Iteration & Revision; Verification & Source Checking; Tool Choice; Reusable AI Workflows |
| **Agents, Automation & Control** | Understand AI that can take actions, use tools and continue across steps. | Agents & Autonomy; Tools & Actions; Permissions & Access; Sandboxes & Containment; Monitoring & Human Oversight; Instruction Following & Goal Pursuit |
| **Models, Tools & Product Updates** | Follow changes to models and products without mistaking launch claims for proof. | Model Releases; Feature Releases; Access & Availability; Pricing & Usage Limits; Performance & Evaluation; Product Retirement & Change |
| **Work, Careers & Leadership** | Understand how AI changes individual work, careers, teams and leadership. | AI at Work; Careers & Skills; Job Design; Management & Teams; Hiring & Recruitment; Workplace Rights |
| **Business, Markets & the Economy** | Follow company strategy and wider economic effects. | Company Strategy; Competition & Market Power; Investment & Funding; Productivity; Labour Markets; Costs & Business Models |
| **Law, Policy & Regulation** | Understand the rules being proposed, adopted and enforced. | AI Laws & Regulation; Regulatory Enforcement; Standards & Governance; Legal Rights & Liability; International Policy; Compliance & Accountability |
| **Politics, Elections & Public Services** | Follow AI in political and civic life. | Elections & Campaigns; Government Use of AI; Public Services; Democracy & Civic Life; Geopolitics; Political Communication |
| **Safety, Security & Misuse** | Understand concrete hazards, safeguards and malicious uses. | AI Evaluations; Safeguards & Control; Cybersecurity; Scams & Fraud; Harmful Use; Incidents & Breaches |
| **Privacy, Data & Surveillance** | Understand what information is collected, shared, retained and watched. | Personal Data; Consent & Permissions; Data Sharing & Retention; Tracking & Surveillance; Identity & Biometrics; Accounts & Deletion |
| **Truth, Evidence & Misinformation** | Judge claims, studies and AI-generated information more accurately. | Hallucinations; Research & Studies; Verification & Source Checking; Misinformation & Disinformation; Deepfakes & Synthetic Media; Provenance, Watermarks & Labels |
| **Creativity, Media & Copyright** | Follow AI's effects on creative work, culture and publishing. | Writing & Publishing; Images & Design; Music & Audio; Film & Video; News & Journalism; Copyright & Creative Rights |
| **Health & Wellbeing** | Understand AI in health without turning reporting into medical advice. | Healthcare & Medicine; Mental Health & Wellbeing; Health Data; Medical Research; Diagnosis & Decision Support; Patient Rights |
| **Education & Learning** | Understand how AI changes teaching, learning and assessment. | Learning with AI; Teaching with AI; Schools & Universities; Assessment & Academic Integrity; AI Literacy; Training & Professional Development |
| **Society, Culture & Relationships** | Explore how AI affects everyday life and human relationships. | Relationships & Companionship; Children & Families; Social Media & Online Life; Culture & Identity; Communication; Everyday AI |
| **Equity, Access & Power** | Examine who benefits, who is excluded and who controls the systems. | Bias & Fairness; Accessibility; Gender & AI; Digital Access; Worker & Community Voice; Power & Accountability |
| **Energy, Environment & Infrastructure** | Understand the physical systems and resources behind AI. | Energy Use; Water Use; Data Centres & Chips; Environmental Impact; Supply Chains; Critical Infrastructure |

## Terms that should not become public tags as written

| Loose term | Better routing |
|---|---|
| `models not listening` | Search alias only. Route by evidence to Instructions & Prompting, Context & Memory, Instruction Following & Goal Pursuit, Tools & Actions, or Iteration & Revision. |
| `AI safety` | Search alias and optional umbrella language. Use the precise visible tag: AI Evaluations, Safeguards & Control, Cybersecurity, Scams & Fraud, Harmful Use, or Incidents & Breaches. |
| `politics` | Valid reader/search alias. Use Politics, Elections & Public Services as the browse topic, plus a precise child tag. |
| `news`, `daily`, `weekly`, `feature` | Publication type, not topic. |
| `OpenAI`, `Anthropic`, `Meta`, `Google`, `ChatGPT`, `Claude` | Entity or product, not topic. |
| `important`, `scary`, `breaking`, `controversial` | Editorial framing/state, never topic metadata. |

## Example classifications

| Reader/story subject | Primary browse topic | Specific visible tags | Separate entities/products |
|---|---|---|---|
| Models acting outside a test sandbox | Agents, Automation & Control | Sandboxes & Containment; Permissions & Access; AI Evaluations; Instruction Following & Goal Pursuit | Named labs, evaluator and models |
| Why an AI answer worsens across a long conversation | Prompting & AI Skills | Context & Memory; Iteration & Revision; Instructions & Prompting; Model Behaviour & Reliability | Named product/model if material |
| New European AI transparency requirement | Law, Policy & Regulation | AI Laws & Regulation; Regulatory Enforcement; Provenance, Watermarks & Labels | European Union; affected providers/products |
| AI-generated election deception | Politics, Elections & Public Services | Elections & Campaigns; Deepfakes & Synthetic Media; Misinformation & Disinformation | Country, campaign, platforms and tools |
| ChatGPT connecting to health records | Privacy, Data & Surveillance | Health Data; Consent & Permissions; Data Sharing & Retention; Accounts & Deletion | OpenAI; ChatGPT; health-record provider |

## Register and publication rules

Each admitted browse topic and specific tag needs:

- immutable ID and public label;
- one-sentence plain-language definition;
- parent/relationship mapping;
- search aliases and common misspellings;
- inclusion and exclusion examples;
- status: `ACTIVE`, `MERGED`, `RETIRED` or `PROPOSED`;
- replacement ID for merged/retired terms; and
- dated owner/version history.

Publication fails when the primary browse topic is missing, a specific tag is
unknown/retired, more than four specific tags are supplied, or an entity/type
is disguised as a topic. Before this proposal becomes the register, the owner
must map representative current and queued items, merge collisions, test
ordinary-reader labels and confirm that important content does not fall into an
`Other` bucket.

No live data, search, visual, publication or deployment is authorized by this
proposal.
