# FAiRY Godmother product charter

**Status:** ACTIVE PRODUCT OWNERSHIP — FIX BEFORE PROMOTION

## Promise

FAiRY Godmother helps a woman bring an AI, work/career or everyday-life
problem she is stuck on and leave with something accurate, safe and genuinely
usable. It is a trustworthy case desk in the distinctive Godmother world, not
a general-purpose chatbot with character garnish.

## Product ownership

The building champion owns:

- cottage → parlour → correspondence entry and return journeys;
- supported scope, task fit, answer quality and useful outcomes;
- constrained funny, sassy, warm presentation;
- privacy, accessibility, failure and recovery;
- frontend/service integration and release truth;
- coordination of Answer Quality & Safety and FAiRY Plays subchampions; and
- product measurement, freshness, corrections and ethical sustainability.

For AI-related guidance, the champion also owns the LAiDIES learning standard:
the answer must build enough of a correct mental model that the user
understands why the recommendation fits, can adapt it, can state its limits
and can resist misleading or obsolete AI claims. Simplification cannot create
false contrasts. Pop-culture analogies are optional teaching aids and must
never replace the concept.

## Non-compensable standards

No direction advances below 17/20 for:

1. product/content quality and user value;
2. factual/technical accuracy, safety and trust; or
3. positive LAiDIES brand contribution.

The Godmother voice may shape presentation. It may never change facts,
sources, uncertainty, boundaries, risk handling or allowance outcomes.

## Ecosystem role

FAiRY is a tool, not a revision game and not a substitute for every learning
format. It should answer the user's immediate in-scope job and route deeper
learning intentionally:

- LIBRAiRY provides durable conceptual reference;
- High/classes and episodes provide sequenced, demonstrated instruction;
- NewsStand provides timely sourced developments under its own editorial
  rules; and
- games such as Dream Phone practise useful behaviours such as distinguishing
  real evidence from hallucination.

FAiRY may explain enough reasoning to make its advice transferable. It should
not duplicate an entire book, class or episode when a precise handoff is more
useful.

## Authoritative implementation baseline

- Working project: `worker-fairy-godmother/`
- Editable P0 source: `worker-fairy-godmother/src/index.js`
- Frozen production evidence:
  `worker-fairy-godmother/recovery/production-v18/index.deployed.js`
- Recovery manifest:
  `worker-fairy-godmother/recovery/production-v18/manifest.json`
- Recovery/audit:
  `operations/research/fairy-godmother-worker-recovery-2026-07-25.md`
- P0 contract: `docs/product/fairy-godmother-p0-product-contract.md`
- Evaluation set:
  `operations/test-fixtures/fairy-godmother/p0-evaluation-set.json`

The frozen production artifact is immutable. Production version 18 and its
bindings are not a development target. All P0 work begins in the working
source and isolated staging configuration.

## Current release boundary

Status remains **FIX BEFORE PROMOTION** until the P0 contract's acceptance
evidence passes at both API and rendered-page levels. Source recovery is not
product approval, staging approval or production approval.
