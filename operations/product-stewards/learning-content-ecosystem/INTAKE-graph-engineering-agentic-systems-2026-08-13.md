# Learning intake: graph engineering and agentic-system architecture

**Intake status:** ACCEPT / ROUTED — implementation and public teaching held
**Evidence date:** 2026-08-13
**Trigger:** Ali requested deep research into graph engineering, application to
the LAiDIES agentic operating system and inclusion in the learning system.

## Ruling

**EXTEND** the existing agentic-systems concept family. Do not create a second
source of truth called “graph engineering,” and do not commission a standalone
course or episode from the trend alone.

The canonical learning system should distinguish four related ideas:

| Proposed concept ID | Learner question | Truth boundary | Prerequisites |
|---|---|---|---|
| `CONCEPT-AGENT-WORKFLOW-GRAPH` | How do several AI or software steps know what happens next? | A directed workflow represents work as nodes and permitted transitions as edges; nodes need not all be AI agents | agent, tool, workflow, state, input/output |
| `CONCEPT-AGENT-TOPOLOGY` | When should one agent work alone, delegate or fan work out? | Topology is chosen from task dependencies, decomposability, tool density, risk and cost; more agents are not inherently better | workflow graph, evaluation, handoff |
| `CONCEPT-KNOWLEDGE-PROVENANCE-GRAPH` | How can a system keep track of what is related, where it came from and what changed? | Concepts/claims/sources/versions are nodes; typed relationships preserve meaning, provenance and correction paths | data, source, claim, version, provenance |
| `CONCEPT-GRAPH-RAG` | How can an AI retrieve information by relationships as well as similarity? | GraphRAG is a graph-based retrieval/indexing family; it is not the same as an agent workflow graph | RAG, embeddings, knowledge graph, retrieval |

`graph engineering` is an **emerging umbrella label** that may refer to the
design of graph-structured agent systems, the engineering of knowledge/context
graphs, or both. Any LAiDIES treatment must say which meaning it is using.

## Relationship ruling

```text
AI system
  -> may include an agentic workflow
       -> may be represented as a workflow graph
            -> has nodes, edges, shared state and stop conditions
            -> uses a topology chosen for the task

AI system
  -> may retrieve context
       -> may use RAG
            -> may use GraphRAG
                 -> depends on a knowledge graph or graph-derived index

Learning system
  -> uses a provenance graph to connect concepts, claims, sources, versions,
     treatments, learner evidence and corrections
```

These are related systems, not one nesting taxonomy. A workflow graph controls
what happens. A knowledge/provenance graph describes what is related and where
it came from. GraphRAG uses graph structure for retrieval. One agentic product
may use all three, but none implies the others.

## Surface disposition

| Surface | Ruling | Distinct cognitive job | Owner trigger |
|---|---|---|---|
| Canonical concept / Library | EXTEND | Durable explanation of workflow graphs, topology, state, provenance, knowledge graphs and GraphRAG after prerequisites | Library accepts a chapter/section extension after concept truth is admitted |
| Class / interactive lab | CREATE CANDIDATE, NOT COMMISSIONED | Learner draws, runs and debugs a small graph; compares one agent with parallel and sequential topologies; repairs a bad edge or stop condition | Classes owner confirms modality advantage and curriculum position |
| NewsStand Tribune | CREATE CANDIDATE, NOT COMMISSIONED | Dated explanation of the 2026 phrase, evidence beneath the hype and practical consequences | NewsStand accepts an evidence packet and confirms distinct editorial thesis |
| Practical tip | PARK | One bounded action derived from admitted teaching; never the canonical explanation | Canonical concept and deeper treatment exist |
| AI Fundamentals 101 | EXTEND LATER | Introduce workflow/state graphs in the agentic-systems portion, not the opening AI-types chapter | Full-book prerequisite map places agents, tools, state and memory first |
| Episode | DECLINE FOR NOW | No demonstrated narrative job beyond the durable explainer and lab | Reopen only on a distinct human story and episode opportunity scan |
| Standalone course | DECLINE FOR NOW | Premature fragmentation; the lab belongs inside the existing agentic-AI learning route | Reopen only if a complete skill progression remains after current class reconciliation |

## Learner outcomes

After the complete concept sequence, a nontechnical learner should be able to:

1. draw a small agent workflow with nodes, arrows, a branch, a stopping point
   and a human approval;
2. explain why two independent research tasks may run in parallel while a
   connected explanation should usually remain sequential;
3. distinguish workflow graphs, knowledge graphs and GraphRAG;
4. identify missing state, an unsafe action edge, an unbounded loop and a
   handoff with no acceptance condition;
5. choose a simpler single-agent or deterministic workflow when a graph adds no
   value; and
6. trace a learning claim to its source, version, consumers and correction
   route.

Required transfer case: given a new everyday or work process, the learner can
draw the route and justify which steps are deterministic, model-driven or
human-controlled. Memorising graph vocabulary is not sufficient.

## LAiDIES communication job

The public explanation should begin with a familiar process that genuinely has
dependencies and branches—such as preparing a publication from a sourced idea,
where research, drafting, checking, approval and publication cannot happen in
an arbitrary order. The everyday case must remain technically faithful all the
way back to nodes, edges, state, gates and stop conditions.

Do not use a decorative Rewind Era comparison merely because the word “graph”
invites a map metaphor. A Rewind Era reference earns inclusion only if it makes
a specific relationship or failure easier to understand. The technical
mechanism comes first.

## Evidence and freshness

Technical claim map and sources live in:

`operations/research/graph-engineering-for-laidies-2026-08-13.md`

Before public drafting, recover and verify the exact AIDB feature Ali remembers,
recheck all time-sensitive framework claims and bind the destination's current
positive/negative exemplars. Social posts may establish that the phrase is
circulating; they do not establish technical truth.

## Operating-system handoff

Control Room / Platform receives the bounded file-based work-graph pilot. The
learning system owns the concept and provenance model, not dispatcher runtime.
No branch, framework, database, automation, public content or surface artifact
is authorized by this intake.
