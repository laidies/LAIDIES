# Evo bacteriophage headline source preflight — 2026-08-13

**Status:** SOURCE-SUFFICIENT FOR A BOUNDED REPORTING-CHECK PROOF; FULL DRAFT NOT AUTHORIZED

**Trigger:** Cloud intake signal `NSCI-0fff983d378f8a63dd4d`, The AI Daily Brief transcript “The Right Way to Worry About AI,” published 2026-08-07.

## Reader job

Answer a nontechnical reader’s real question: a frightening headline said AI
created viruses that do not exist in nature. What did the researchers actually
make, how did they make it, what did the experiment show, and what risk did it
not establish?

The eligible NewsStand mode is `DAILY / HEADLINE_OR_REPORTING_CHECK`. This is
not Breaking: the underlying preprint was posted 2025-09-17, and the exact New
York Times article identity/date quoted by AIDB has not yet been recovered.

## Current source trail

1. **Primary research record:** “Generative design of novel bacteriophages with
   genome language models,” bioRxiv v1, posted 2025-09-17,
   DOI `10.1101/2025.09.12.675911`.
   - https://www.biorxiv.org/content/10.1101/2025.09.12.675911v1
   - The abstract reports **16 viable bacteriophages** from experimental testing.
   - It is a preprint, not a peer-reviewed journal article.
   - The competing-interest statement reports a provisional patent involving
     Stanford University and Arc Institute and an author’s company interests.
2. **Research-team explanation:** Arc Institute, “How We Built the First
   AI-Generated Genomes,” 2025-09-17.
   - https://arcinstitute.org/news/hie-king-first-synthetic-phage
   - The team says it tested 285 designs and sequence-verified 16 functional
     phage candidates.
   - The phages were designed around ΦX174 and tested against non-pathogenic
     *E. coli* hosts. All 16 functional phages infected the two related tested
     strains and showed no growth on six other tested strains.
   - The team describes manual DNA assembly, bacterial transformation, growth
     testing, sequence verification and laboratory containment. A model output
     did not independently manufacture or release a virus.
3. **Scout/secondary source:** The AI Daily Brief transcript, 2026-08-07.
   - https://aidailybrief.ai/e/2026-08-07/transcript.md
   - It quotes a New York Times headline as “This AI Just Created Viruses Not
     Found in Nature,” but the exact article URL/date remains unresolved.
   - The transcript says “sixteen thousand viable viruses.” That conflicts with
     both the preprint and Arc’s account, which report **16**. LAiDIES must not
     repeat the transcript’s number.
   - Its separate OpenAI/Hugging Face discussion is already routed elsewhere
     and is excluded from this candidate to avoid duplicating `LCWO-003`.

## What the evidence establishes

- Researchers used specialized genome language models and a substantial
  computational and laboratory workflow to propose bacteriophage genomes.
- They experimentally tested hundreds of selected designs and verified 16
  functional phages.
- The demonstrated organisms were bacteriophages—viruses that infect
  bacteria—not human viruses, and the reported host testing was bounded.
- The result advances genome-design capability and therefore raises legitimate
  future biosafety and governance questions.

## What it does not establish

- ChatGPT, Claude or a general consumer chatbot autonomously created a virus.
- The model produced 16,000 viable viruses.
- The experiment created or demonstrated a virus capable of infecting people.
- Excluding human-pathogen training data proves that every future model,
  dataset, laboratory or malicious user will remain safe.
- One preprint proves clinical usefulness, ecological safety or general ability
  to design a requested pathogen.

## Required proof before prose

1. Recover the exact secondary headline/article identity and publication date,
   or narrow the reporting check explicitly to the AIDB presentation.
2. Recheck the bioRxiv history for revision, withdrawal, peer review or a
   successor paper.
3. Bind the accepted Daily `HEADLINE_OR_REPORTING_CHECK` template and its
   complete positive exemplar; that mode currently has no autonomous drafting
   authority.
4. Use an answer-first, jargon-free opening that defines a bacteriophage before
   using “phage,” describes the human laboratory steps and distinguishes
   demonstrated risk from future risk.
5. Keep biological and security review proportionate; do not provide pathogen
   construction instructions or operational laboratory detail.

## Triggered disposition

Create `LCWO-020` as `QUEUED_WITH_TRIGGER`. Reopen on 2026-08-20 even if the
headline identity remains unresolved; at that review, either create the small
producer proof from a recovered exact article, narrow the job to an AIDB
reporting check, or close it `NO_BUILD` with the unresolved identity stated.

No story, draft, publication, deployment or public claim was created by this
preflight.
