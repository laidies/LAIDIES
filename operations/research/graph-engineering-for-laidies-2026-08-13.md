# Graph engineering for the LAiDIES operating and learning systems

**Status:** RESEARCHED / RECOMMENDATION READY — no runtime activation
**Evidence date:** 2026-08-13
**Owner:** Learning System & Concepts Director with Control Room / Platform
**Authority:** internal architecture recommendation only; no deploy, publication,
spend or Ali approval is implied

## Decision first

LAiDIES should adopt **graph engineering as a design discipline**, not as a new
vendor platform and not as permission to add more agents.

The smallest useful change is to compile one existing content workflow into a
typed, testable work graph whose nodes have exact inputs, outputs, owners and
state; whose edges express permitted transitions, dependencies and failure
routes; and whose terminal claims are derived from evidence. In parallel,
LAiDIES should normalize one small concept/provenance graph so canonical
learning truth, sources, versions, prerequisites, consumers and corrections can
be traversed rather than rediscovered.

Do **not** migrate the whole operating system, install a graph database or resume
the paused dispatcher from this research. First prove that the file-based pilot
rejects known bad topologies and reduces missed dependencies and repeated
defects on one real successor.

## The strongest case against the idea

The absence of a graph framework is not the root cause of LAiDIES' inconsistent
output. The repository already contains graph-shaped controls: ownership routes,
work events, dependencies, artifact handoffs, content work orders, concept
relationships and correction consumers. The root problem is that these records
do not consistently sit on the execution path. A maker can still receive too
much or conflicting context, a review can bind the wrong artifact, and a prose
handoff can describe a transition that no runtime enforces.

A graph drawn over those same disconnected records would make the architecture
look more sophisticated while preserving the failure. Graph engineering helps
only when it makes illegal transitions impossible, keeps state authoritative,
routes failures to the right repair point and produces observable evidence.

It also cannot make prose excellent by itself. Voice, accuracy, connected
teaching, useful analogies and reader transfer still depend on the current
prevention-first producer contract, exact-artifact self-review, independent
semantic judgment and unfamiliar-reader evidence. The graph's job is to ensure
those controls execute in the right order against the same bytes and that a
failure repairs the producer or source of truth instead of merely commissioning
another review cycle.

## What “graph engineering” currently means

There is no stable standards-body or research-community definition as of the
evidence date. The phrase became prominent in 2026 commentary about moving
beyond one agent repeatedly calling tools in a loop. Current usage combines at
least three different ideas:

1. **Agent/workflow graph engineering.** Nodes are agents, deterministic
   functions, tools, gates or human decisions. Edges control order, branching,
   parallel work, handoffs, retries and termination. This is the primary
   operating-system meaning relevant to LAiDIES.
2. **Knowledge/provenance graph engineering.** Nodes are concepts, claims,
   sources, versions, artifacts, people or decisions. Edges record relationships
   such as `requires`, `supports`, `supersedes`, `consumes` and `corrected_by`.
   This is the primary learning-system meaning relevant to LAiDIES.
3. **GraphRAG.** A retrieval method that extracts entities and relationships
   from a document corpus and uses them to answer connected or whole-corpus
   questions. It may eventually help retrieve LAiDIES canon, but it is not the
   same as orchestrating agents and is not required for the pilot.

The viral label is new; the underlying engineering is not. Directed workflows,
state machines, dependency graphs, provenance models and knowledge graphs are
established ideas. LAiDIES should teach that distinction rather than presenting
“graph engineering” as a settled breakthrough.

## What the strongest evidence says

### Choose topology from the task, not from fashion

Google Research evaluated 180 agent configurations across single-agent,
independent, centralized, decentralized and hybrid architectures. Multi-agent
coordination helped tasks that could be decomposed into genuinely independent
work, but every multi-agent variant degraded performance on the strictly
sequential planning benchmark. Independent agents also amplified errors much
more than a centralized orchestrator. The practical variables were task
decomposability, sequential dependence and tool density.

**LAiDIES consequence:** source discovery, inventory and freshness scans can
fan out. A book chapter, episode, class or page should normally retain one
accountable maker because its explanation, voice and dependencies must remain
coherent. Review is a separate node because independence is the point, not
because more agents are presumed better.

### Simple topology and strong node contracts beat agent abundance

Google's ICLR 2026 multi-agent design research found that top-performing systems
often emerged from simpler design spaces and that prompt quality remained
critical. Anthropic's production research system uses a central orchestrator
and parallel workers for breadth-first investigation, but reports much higher
token consumption and warns that tasks with tightly shared context or many
dependencies are poor multi-agent candidates. Anthropic also found that vague
delegation caused duplication and gaps; effective worker briefs require an
objective, output format, source/tool guidance and boundaries.

**LAiDIES consequence:** preserve the current hub-and-spoke foreground model.
Every spawned read lane must earn its cost and receive the complete bounded
contract already required by `AGENTS.md`. The graph must not create durable
agent roles for tasks that are merely temporary modes of one owner.

### A graph is useful when transitions must be controlled

Microsoft AutoGen's GraphFlow documentation describes directed execution for
sequential, parallel, conditional and looping workflows and recommends it when
strict order, deterministic branching or bounded cycles are required. It also
labels the current GraphFlow API experimental. LangGraph similarly persists
state around interrupts so a workflow can pause and resume, which is useful for
real human authority gates; resumed nodes can re-execute, so side effects must
be idempotent.

**LAiDIES consequence:** use a framework-neutral graph contract first. A JSON
pilot can prove state, routing and failure semantics without introducing a
runtime dependency. If later execution requires a framework, evaluate it
against the admitted graph rather than designing the workflow around a vendor
API.

### Provenance is a graph, too

The W3C PROV model provides a useful minimal vocabulary: entities, activities
and responsible agents, connected by use, generation, derivation, revision,
attribution and delegation. Microsoft GraphRAG shows how entities,
relationships, claims and source text can support connected retrieval, but its
own documentation notes that graph extraction and querying consume resources
and depend on configuration.

**LAiDIES consequence:** start with explicit human-maintained provenance for
high-value concepts and claims. Do not ask an LLM to infer the entire canonical
graph from repository prose and then treat the extraction as truth.

## Current LAiDIES system: what exists and what is missing

| Existing structure | Useful part | Missing connection |
|---|---|---|
| `operations/runtime/work-events.jsonl` and projection | Append-only work history and derived status | Events do not yet compile or validate the complete allowed transition graph for each work class |
| `operations/runtime/work-resolution-loop.json` | Owners, acceptance owners, next actions, retries, evidence and lifecycle stages | Large handwritten records can disagree with live execution; failure edges are mostly described rather than executable |
| `operations/product-stewards/run-queue.json` | Collision boundaries and dispatcher hold truth | Queue state is a separate source and the dispatcher is deliberately paused |
| `operations/runtime/artifact-handoff.schema.json` | Exact artifact/brief/input identity and authority truth | It validates one handoff shape, not reachability, ordering or the consumer's transition |
| Content producer, review and release checks | Strong exact-artifact controls for meaning-bearing work | They apply only when a candidate actually enters the complete chain; topology is not compiled before production starts |
| Concept map, claim register and relationship inventory on active learning branches | Canonical concepts, claims, consumers, prerequisites and corrections | Related facts remain split across stores and are not yet one typed provenance graph |
| Product registry and owner dossiers | Clear accountability metadata | Ownership metadata has been mistaken for live execution in prior incidents |

The current Control Room evidence therefore supports this diagnosis:

- **state fragmentation:** status, ownership, evidence and next action live in
  several structures with different update paths;
- **implicit edges:** many transitions exist only in prose, so a missing or
  reordered gate is not rejected at workflow admission;
- **topology mismatch:** broad parallelism has sometimes been applied to work
  whose quality depends on one connected context;
- **context mismatch:** too much automatic continuity can crowd out the exact
  sources and artifact a node needs;
- **repair mismatch:** failures can return to another candidate/review cycle
  instead of the producer contract, source record, topology or evaluator that
  caused them; and
- **observability mismatch:** a receipt can prove that a record exists without
  showing which path executed or why a branch was chosen.

## Recommended target: two connected graphs

### 1. Work graph

The work graph controls execution. It should include both deterministic and
model-driven nodes:

```text
trigger
  -> classify task and authority
  -> retrieve only governing context
  -> choose topology from decomposability / sequence / risk / tool density
  -> [optional parallel read-only evidence nodes]
  -> accountable-owner merge
  -> producer preflight
  -> make exact artifact
  -> maker inspection
  -> deterministic gates
  -> role-distinct artifact-first judgment
  -> owner integration
  -> [Ali only for her reserved authority]
  -> release binding
  -> deploy
  -> public verification
```

Every node needs an owner or principal, exact allowed context, input contract,
output contract, tool/write scope, budget, success evidence and idempotency
rule. Every edge needs a condition, evidence requirement and permitted next
state. A repair cycle must name its maximum traversal count and a stop-loss
destination.

### 2. Learning provenance graph

The learning graph controls truth and reuse. Minimum node types:

- concept;
- claim/version;
- primary or authoritative source;
- prerequisite;
- misconception/distinction;
- analogy/example with its teaching job;
- surface treatment and exact version;
- learner observation;
- correction transaction; and
- accountable owner.

Minimum edge types:

- `defines`, `requires`, `distinguishes_from`;
- `supported_by`, `qualified_by`, `supersedes`;
- `taught_by`, `practised_by`, `assessed_by`, `applied_by_news`;
- `consumed_by`, `corrected_by`, `observed_in`; and
- `owned_by`.

Every factual edge should carry provenance, evidence date, freshness trigger
and status. This graph supplies the work graph's context resolver and correction
fan-out. It does not replace the source documents or let an inferred
relationship become canon automatically.

## The bounded pilot

Use one material learning-content successor as the representative proof, but
do not alter that content from this architecture task. The included pilot graph
describes the required route and the checker proves that it can reject:

- an orphaned node;
- an unknown edge target;
- a writable node incorrectly declared read-only;
- a parallel write collision;
- maker and judge using the same principal or model family;
- a cycle without a bounded repair edge;
- a repair edge without a stop-loss route; and
- an Ali gate that does not name reserved Ali authority; and
- an execution cycle disguised as ordinary unbounded edges.

The pilot remains **configuration only** until Control Room and the affected
surface owner select an exact candidate and authorize one manual dry run. It
must not resume the existing dispatcher.

### Pilot success measures

Compare one successor with the immediately preceding comparable workflow:

1. repeated known defects: target `0`;
2. objective defects first found by the independent judge: target `0`;
3. missing or stale prerequisite/context inputs: target `0`;
4. review cycles: strictly lower until first-pass acceptance is normal;
5. reconciliation corrections after parallel lanes: lower, with exact count;
6. tokens and wall time: recorded, not assumed; and
7. any Ali-found objective defect: automatic pilot failure and evaluator repair.

Do not claim improvement if baseline coverage is unknown. Record `UNKNOWN` and
establish the first comparable pair.

## Adoption sequence

1. **Now — file-based pilot.** Validate the topology and run it manually for
   one candidate without activating automation.
2. **Then — event projection.** Emit node/edge transition events and derive the
   current graph position; do not create a new handwritten status store.
3. **Then — one learning concept cluster.** Normalize `graph engineering`,
   workflow graphs, knowledge/provenance graphs and GraphRAG with sources,
   prerequisites, consumers and correction triggers.
4. **Only after evidence — runtime selection.** Decide whether current scripts
   are enough or whether LangGraph, AutoGen or another engine solves a proven
   missing capability. No framework earns adoption because it can render a
   diagram.
5. **Only after parity — broader migration.** Existing controls remain active
   until the pilot has at least two comparable successful runs and no loss of
   required evidence, consistent with the current D-102 migration rule.

## Learning-system route

The emerging phrase deserves dated context; the established mechanisms deserve
durable teaching.

- **Canonical concept home / Library:** teach workflow graphs, state,
  dependencies, branching, retries, human gates, provenance and knowledge
  graphs after the learner already understands agents, tools, context and
  memory. Mention “graph engineering” as an emerging umbrella term, not a
  settled category.
- **Class or interactive lab:** the strongest format. Let the learner trace one
  request through a single-agent loop, then a directed workflow; choose when to
  fan out; find a bad edge; and repair a missing stop condition. Observable job:
  design and debug a bounded agent workflow.
- **NewsStand / Tribune:** a dated explainer on why the phrase suddenly became
  popular, what is useful underneath it, what is relabelling and why “more
  agents” can make sequential work worse.
- **NewsStand practical tip:** only after the concept is ruled; one bounded
  action such as drawing the steps, branches, failure route and human approval
  before building an agent workflow.
- **AI Fundamentals 101:** do not force the trend into the opening taxonomy.
  Introduce workflow/state graphs later, when the book explains complete agentic
  systems and how components work together.
- **Episode:** no automatic commission. Reconsider only if a memorable human
  story creates a distinct narrative job not already served by the book,
  explainer or lab.

No public teaching artifact is commissioned by this packet.

## Source register

Primary and authoritative sources used for technical claims:

- Google Research, “Towards a science of scaling agent systems: When and why
  agent systems work,” 2026-01-28:
  <https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/>
- Google Research, “Multi-Agent Design: Optimizing Agents with Better Prompts
  and Topologies,” ICLR 2026:
  <https://research.google/pubs/multi-agent-design-optimizing-agents-with-better-prompts-and-topologies/>
- Anthropic Engineering, “How we built our multi-agent research system,”
  2025-06-13:
  <https://www.anthropic.com/engineering/multi-agent-research-system>
- OpenAI, “A practical guide to building agents”:
  <https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/>
- Microsoft AutoGen, “GraphFlow (Workflows)” — current documentation labels
  the API experimental:
  <https://microsoft.github.io/autogen/dev/user-guide/agentchat-user-guide/graph-flow.html>
- LangGraph, “Interrupts”:
  <https://docs.langchain.com/oss/python/langgraph/interrupts>
- W3C, “PROV-O: The PROV Ontology”:
  <https://www.w3.org/TR/prov-o/>
- Microsoft GraphRAG documentation:
  <https://microsoft.github.io/graphrag/index/overview/>

Discovery-only sources not used as technical authority:

- 2026 social posts and secondary explainers that popularized “graph
  engineering”;
- `awesome-graph-engineering`, a useful community index whose definition is
  not a standard;
- AIDB: Ali recalls a feature, but the exact item was not discoverable in the
  checked local AIDB cycles or indexed web search. Treat it as an unresolved
  discovery pointer until the exact original is recovered.

## Freshness and correction triggers

Recheck before any public teaching or implementation decision when:

- Google publishes a successor scaling study or independent replications
  materially change the topology findings;
- AutoGen GraphFlow exits experimental status or changes its execution model;
- LangGraph checkpoint/interrupt semantics materially change;
- LAiDIES activates a dispatcher or changes its event/state authority;
- the exact AIDB item is recovered; or
- a real pilot contradicts this recommendation.
