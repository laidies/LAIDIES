# Four new LIBRAiRY guides — live refresh report source

**Checked:** 2026-09-06
**Status:** CURRENT RESEARCH INPUT / NOT PUBLICATION APPROVAL
**Scope:** the commissioned *Who's Who in AI*, *ChatGPT Guide*, *Claude Guide*
and *Tool & Application Selection Guide*. This record separates current
official facts, vendor guidance, LAiDIES editorial recommendations and product
behaviour that still requires an account test.

## Publication truth

The four guides are not live books. The current public LIBRAiRY has a working
catalogue and reader shell, but these commissioned guides have not completed
the same manuscript, reading, rendering and release chain as an admitted book.

- *ChatGPT Guide*: one complete opening chapter was admitted on 2026-09-02,
  before GPT-6 Astra launched. Its source card and model-selection section are
  now stale.
- *Claude Guide*: current research and a paid Claude Code workshop pilot exist.
  Fable 5.1 is named, but the plan, retention and fallback details below are
  missing or were still marked unresolved.
- *Who's Who in AI*: a representative chip-chain sample and earlier research
  exist; no complete current manuscript is admitted.
- *Tool & Application Selection Guide*: a representative verdict sample and
  earlier research exist; no complete current manuscript is admitted.

The next release unit is therefore not “publish the drafts.” It is: refresh the
shared facts, produce complete manuscripts, test beginner comprehension, build
the reader derivatives, admit each exact version, and then release from the
current production base.

## Current claim ledger

| ID | Classification | Current claim | Primary source | Recheck trigger |
|---|---|---|---|---|
| OAI-ASTRA-ROLE | Official product fact | GPT-6 Astra is OpenAI's strongest current model for complex cross-application, coding and research work. It is a task-fit choice, not the automatic best choice for routine work. | [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model); [ChatGPT model guide](https://learn.chatgpt.com/docs/models) | Any model-guide or picker change |
| OAI-ASTRA-BEHAVIOUR | Official vendor guidance | Astra follows long instruction stacks closely, can stop for focused questions, may under-delegate, and can over-test small work. Prompts should state the authority order, autonomy boundary, delegation expectation and bounded test scope when those matter. | [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model) | Any Astra prompting-guide change |
| OAI-APP-EFFORT | Official product fact | Current eligible ChatGPT Power options include Terra Light, Sol Light, Sol Medium, Astra Light, Astra Medium and Astra Extra High. The options vary by plan, account and rollout. Max and Ultra are specialist controls and are not needed for most work. | [ChatGPT model guide](https://learn.chatgpt.com/docs/models) | Any picker, plan or effort change |
| OAI-API-ASTRA | Official API fact | The GPT-6 Astra API model supports low, medium, high, xhigh and max effort; it does not support `none`. It has a 1.05M-token context window and 128K maximum output. API access and prices are separate from ChatGPT subscription access. | [GPT-6 Astra API model card](https://developers.openai.com/api/docs/models/gpt-6-astra) | Any API model-card change |
| OAI-ACCESS | Official product fact with account variation | Astra is rolling out to eligible paid ChatGPT accounts and can require an administrator to enable it in Enterprise. Seeing Astra in ChatGPT does not grant API access, and model access does not grant file, app or external-action permission. | [ChatGPT model guide](https://learn.chatgpt.com/docs/models); [Enterprise model availability](https://learn.chatgpt.com/docs/enterprise/workspace-model-availability) | Any plan or rollout change |
| ANT-FABLE-ROLE | Official product fact and vendor positioning | Claude Fable 5.1 launched 2026-09-01 as the generally available Fable successor for demanding long-running agent, code and knowledge work. Model ID: `claude-fable-5-1`. | [Fable 5.1 overview](https://platform.claude.com/docs/en/models/fable-5-1/overview); [announcement](https://www.anthropic.com/claude/fable) | Any replacement or status change |
| ANT-FABLE-EFFORT | Official product fact and vendor guidance | Fable 5.1 supports low, medium, high, xhigh and max API effort. The API default is high; Anthropic says current consumer defaults are surface-specific: Medium in Claude.ai and Cowork, High in Claude Code. Effort names do not represent identical thinking across model generations. | [Effort](https://platform.claude.com/docs/en/build-with-claude/effort); [Fable announcement](https://www.anthropic.com/claude/fable) | Any default or effort change |
| ANT-FABLE-PLAN | Official product fact | Fable 5.1 is not available on Free. On Max and premium Team/Enterprise seats it draws from the ordinary weekly allowance, with Fable use capped at 50% of that allowance. On Pro and standard Team/Enterprise seats it requires usage credits from the first use. | [Fable models on your plan](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan) | Any plan, credit or allowance change |
| ANT-FABLE-CONTEXT | Official product fact | Fable 5.1 supports a 1M-token context in paid Claude chat, Code and Cowork. Automatic context management requires code execution and still has edge cases. A large capacity is not an instruction to upload everything. | [Paid-plan context](https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans) | Any context or compaction change |
| ANT-FABLE-RETENTION | Official product fact | Fable 5.1 is a Covered Model requiring 30-day retention unless Anthropic expressly authorizes an eligible organizational transition arrangement. A consumer privacy or training control is not proof of zero retention for Fable. | [Covered Models](https://support.claude.com/en/articles/15425695-covered-models); [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) | Any Covered Model or retention-policy change |
| ANT-FABLE-FALLBACK | Official product fact | Fable safeguards can block or route some protected cyber, biology, chemistry, life-science, distillation or frontier-development requests to another model. The picker label alone may not prove which model answered. | [Claude fallback behaviour](https://support.claude.com/en/articles/15363606-why-claude-switched-models-in-your-conversation-with-fable-5-or-fable-5-1) | Any fallback or safeguard change |
| ANT-FABLE-PROMPT | Official vendor guidance | Compared with Fable 5, Fable 5.1 may be quieter in tool loops, write more densely, search less at Low, add adjacent work and rewrite whole files. Useful controls include visible progress, explicit exclusions, exact finish conditions, search instructions for changing facts and targeted-edit instructions. At xhigh/max, long deliverables can spend more time thinking and need more output room. | [Prompting Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) | Any prompting-guide change |

## Editorial conclusions for the books

1. Add Astra as a fourth OpenAI model choice. Keep Luna, Terra and Sol: Astra
   does not turn them into obsolete choices.
2. Teach the ChatGPT app picker separately from API effort. A reader should
   never be told she can choose a control that her plan or surface does not show.
3. Preserve “High effort is a setting, not a tiara,” but update the explanation:
   the useful reason to move upward is an observed need for deeper synthesis,
   more linked constraints or a lower setting's named failure.
4. Add one Astra-specific practical prompt: define the authority order, say
   whether to proceed autonomously, bound delegation and state how much testing
   is enough. Otherwise Astra can spend time on extra review or stop for a
   question the reader did not need.
5. Present Fable 5.1 as a paid-only specialist route. Every Fable example needs
   an honest Free alternative using the enabled Free model and a smaller,
   inspectable Chat workflow; it must not imply a Free Fable equivalent.
6. Add a visible Fable privacy warning before any sensitive-file workflow.
7. Separate consumer-app defaults from API defaults. Record product, surface,
   model, effort and plan independently in every model comparison.
8. Treat vendor benchmarks as reasons to test, not proof that one model wins.

## Required account observations before public release

The official facts above are current. The following remain unobserved in this
refresh and must not be written as tested LAiDIES experience:

- actual Astra visibility and effort choices on representative eligible
  ChatGPT accounts, including the no-picker route;
- actual Fable visibility, credit disclosure and shown default on Free, Pro and
  Max or premium-seat Claude accounts;
- current model/fallback disclosure in a normal harmless Claude workflow;
- current Code/Cowork versions and where project instructions are actually
  loaded; and
- one identical, harmless representative task across the model/effort settings
  the books recommend, recording quality, repair, time and account cost where
  the product exposes it.

No unsafe probe is required merely to trigger a fallback. No confidential or
personal source should be used in an account test.

## Sources not used as authority

Practitioner material remains useful for workflow discovery, but it cannot
establish current plan access, model controls, prices, retention or safeguards.
Those claims use the current vendor documents above. Any top-user technique
added to a manuscript must name its author, date and original context, then be
labelled as a method to test rather than a universal result.

## Current verdict

**HOLD for publication.** The refresh establishes what changed and which
existing passages are stale. It does not complete the four manuscripts,
unfamiliar-reader observation, rendered-book review, catalogue admission,
deployment or public verification.
