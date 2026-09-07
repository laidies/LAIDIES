#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const profilePath = path.join(root, "content/luminairy-profiles.json");
const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));

const teaching = {
  "cher-dionne": {
    concepts: [
      { name: "Workflow design", connection: "A repeatable AI practice needs a visible sequence of inputs, tool actions and human checks—not one lucky prompt." },
      { name: "Adoption and diffusion", connection: "A method spreads when another person can understand it, adapt it and still produce a useful result." },
      { name: "Human judgement", connection: "The originator decides what makes the pattern worth copying; popularity cannot make a weak process sound." }
    ],
    humanInteraction: "People do not interact with AI only by typing requests. They also design the surrounding routine: what material is allowed in, what the tool produces, who checks it and how another person can reuse it. Cher and Dionne make the distinction between copying a look and learning the logic that makes it work.",
    whyItMattersNow: "Teams are rapidly turning personal AI experiments into shared workflows. If the method cannot survive handoff, adaptation and review, the organisation has not adopted a practice—it has become dependent on one person's improvisation."
  },
  "david-rose": {
    concepts: [
      { name: "Prompt and requirements design", connection: "Making the outcome, audience, evidence and constraints visible makes an AI result more controllable and reviewable instead of leaving important choices to the model's guesses." },
      { name: "Context", connection: "Relevant background changes which answer is useful; decorative detail does not substitute for task information." },
      { name: "Evaluation criteria", connection: "Specific instructions give the reviewer something concrete to compare with the result." }
    ],
    humanInteraction: "When people use generative AI, they are commissioning a draft. They shape the result by specifying the job, supplying relevant context and naming what must not change. The interaction continues when they compare the output with those requirements.",
    whyItMattersNow: "Vague AI requests often create polished but interchangeable work. In a workplace, specificity reduces avoidable revision, exposes missing decisions early and makes quality less dependent on whether the tool happened to guess the user's taste."
  },
  "elle-woods": {
    concepts: [
      { name: "Evaluation", connection: "An answer is tested against evidence and success criteria rather than accepted because it sounds plausible." },
      { name: "Hallucination and grounding", connection: "Generated claims need a traceable connection to the documents, data or observations that could support them." },
      { name: "Reasoning under uncertainty", connection: "The reviewer separates what is established, inferred and still unknown before making a decision." }
    ],
    humanInteraction: "A person supplies the standard of proof that the model cannot supply for itself. She checks whether cited material exists, whether it supports the exact conclusion and whether the reasoning skipped a decisive fact. Follow-up prompts can help investigate, but they do not replace independent verification.",
    whyItMattersNow: "AI is increasingly used to summarise research, policies, contracts and business information. A confident error can travel directly into a presentation or decision unless someone treats the output as a claim to examine rather than a verdict to repeat."
  },
  "samantha-jones": {
    concepts: [
      { name: "Model and tool selection", connection: "Different systems have different strengths, limits, data access and risk profiles." },
      { name: "Modality", connection: "Text, image, audio, video, code and data tasks require different ways of representing and checking information." },
      { name: "Affordances", connection: "The right interface makes the intended action easier and the dangerous action harder." }
    ],
    humanInteraction: "People choose not just what to ask, but which system should receive the task. They decide whether the job needs live information, private-file handling, image generation, calculation, coding or simple drafting, then review the result using checks appropriate to that medium.",
    whyItMattersNow: "Using one chatbot for every job can create unnecessary privacy, accuracy and quality problems. Good tool choice saves time only when the selection accounts for the real task, the sensitivity of the material and the form the finished work must take."
  },
  "miranda-priestly": {
    concepts: [
      { name: "Human feedback", connection: "A model's first output becomes useful through specific correction, comparison and another pass." },
      { name: "Evaluation rubrics", connection: "Quality improves when standards are observable rather than reduced to 'make it better.'" },
      { name: "Iteration", connection: "Revision is a controlled loop, not endless regeneration with no record of what changed." }
    ],
    humanInteraction: "The person remains the editor. She identifies the most consequential gap, states the required correction and checks whether the next version actually solved it without damaging something that already worked. The AI supplies alternatives; the human owns the standard.",
    whyItMattersNow: "Generative systems make first drafts cheap, which can tempt teams to lower the bar or produce endless versions. Explicit standards turn speed into useful progress and stop fluent mediocrity from becoming the default simply because it arrived quickly."
  },
  "deb": {
    concepts: [
      { name: "Data governance", connection: "People decide what information a system may receive, retain and pass to another service." },
      { name: "Automation boundaries", connection: "Some actions may be drafted by AI but must remain human decisions or require approval." },
      { name: "Privacy and security", connection: "Risk depends on the data, provider, permissions and downstream use—not only the wording of the prompt." }
    ],
    humanInteraction: "Before opening a tool, a person sets the boundary: which files are permitted, which facts are confidential, which decisions cannot be delegated and who may see the output. Refusing an unsafe input or action is part of competent AI use, not a failure to innovate.",
    whyItMattersNow: "Workplace AI often sits one copy-and-paste away from customer records, employee information, contracts and internal strategy. A boundary established after disclosure is too late; teams need rules that operate before convenience takes over."
  },
  "buffy-summers": {
    concepts: [
      { name: "Task decomposition", connection: "A large job becomes manageable when its inputs, stages, dependencies and checks are made explicit." },
      { name: "AI workflows and agents", connection: "A system may perform several connected actions, but each action still needs permissions and an observable completion condition." },
      { name: "Human oversight", connection: "The accountable person watches the consequential transitions rather than approving a finished bundle blindly." }
    ],
    humanInteraction: "People move from casual prompting to execution by defining a bounded result, assigning the portions AI can handle and retaining review at the points where an error would compound. The job is not finished when the model stops talking; it is finished when the real deliverable has been checked and used.",
    whyItMattersNow: "AI products increasingly promise multi-step work, from research through drafting and action. Clear scope and checkpoints prevent a small early mistake from spreading through the whole chain while still allowing automation to reduce genuinely repetitive effort."
  },
  "dolly-parton": {
    concepts: [
      { name: "Decision usefulness", connection: "An AI output is valuable only when it helps a person understand, decide or act." },
      { name: "Complexity and simplification", connection: "More detail, tools or steps can reduce quality when they obscure the actual job." },
      { name: "Automation bias", connection: "People may overvalue an elaborate machine-produced answer even when ordinary judgement reveals it is impractical." }
    ],
    humanInteraction: "A person compares the AI's proposal with the real situation: the available time, the people affected, the cost of the process and the decision that must be made. She can ask for a simpler version, remove unnecessary machinery or reject the output altogether.",
    whyItMattersNow: "AI makes it easy to generate plans, frameworks and analysis that look more sophisticated than the problem requires. Common sense protects teams from spending more effort managing the AI solution than solving the original problem."
  },
  "sister-mary-clarence": {
    concepts: [
      { name: "Explainability", connection: "A useful explanation shows the steps and evidence needed to understand a result, not merely a confident conclusion." },
      { name: "Knowledge transfer", connection: "A method becomes organisational knowledge when another person can use and adapt it." },
      { name: "Human-in-the-loop learning", connection: "People improve both the output and their own judgement by questioning, correcting and explaining the process." }
    ],
    humanInteraction: "Instead of asking AI to provide an answer for someone else, the user asks it to reveal the method, check understanding and create a new example. The learner then explains the idea back and tests it in a different situation, exposing whether understanding actually transferred.",
    whyItMattersNow: "Workplaces can use AI either to hide thinking or to spread capability. Teaching the method reduces dependence on one expert or one tool and helps colleagues recognise when a future answer does not fit the situation."
  },
  "carrie-bradshaw": {
    concepts: [
      { name: "Freshness and model drift", connection: "AI products, models, policies and capabilities change, so an earlier answer can become stale without becoming obviously false." },
      { name: "Retrieval and provenance", connection: "Current claims need dated sources that show where the information came from." },
      { name: "Change monitoring", connection: "Useful updating focuses on changes that affect a real decision instead of treating every announcement as urgent." }
    ],
    humanInteraction: "A person asks when the information was checked, which source supports it and what changed since the previous decision. She uses AI to compare versions or summarise updates, then verifies the consequential details at the original source.",
    whyItMattersNow: "Teams are making purchasing, policy and workflow decisions in a fast-moving market. A small update habit prevents old model limits, prices, privacy terms or legal assumptions from quietly governing current work."
  },
  "bette-midler": {
    concepts: [
      { name: "Multimodal AI", connection: "AI systems can work across text, images, audio, video, code and structured data rather than one medium alone." },
      { name: "Orchestration", connection: "A useful result may require several specialised tools joined into one controlled workflow." },
      { name: "Representation", connection: "The same idea changes when expressed as prose, a chart, an image or a spoken explanation, and each form needs its own review." }
    ],
    humanInteraction: "The user decides which medium serves each part of the job, moves material between tools deliberately and checks every transformation. AI may draft the script, analyse the data and create an image, but the person keeps the purpose and the final composition coherent.",
    whyItMattersNow: "Most professional deliverables are already multimodal: a report becomes slides, a meeting becomes actions, or research becomes a campaign. Understanding the whole toolkit lets teams remove repetitive production work without pretending one model is equally good at everything."
  },
  "the-golden-girls": {
    concepts: [
      { name: "AI literacy", connection: "Understanding inputs, outputs, limitations and checks matters more than performing technical identity." },
      { name: "Domain expertise", connection: "Experience supplies context, exceptions and consequences that a model may not recognise." },
      { name: "Participatory design", connection: "Tools improve when the people affected can shape requirements and evaluate whether the result fits their lives." }
    ],
    humanInteraction: "People bring their judgement, relationships and accumulated knowledge into the interaction. They can ask AI to explain unfamiliar terms, challenge its assumptions and compare its suggestion with what actually happens in their work rather than treating technical novelty as seniority.",
    whyItMattersNow: "AI adoption can exclude experienced workers by presenting itself as a generational test. Organisations lose exactly the knowledge needed to spot bad automation when they confuse familiarity with a new interface for understanding the underlying work."
  },
  "regina-george": {
    concepts: [
      { name: "Calibration", connection: "Confidence should match the strength of the evidence; fluent language is not a probability estimate." },
      { name: "Hallucination", connection: "Generative systems can produce plausible statements, citations and explanations that are unsupported or invented." },
      { name: "Confirmation and automation bias", connection: "People are especially likely to accept a polished answer when it agrees with what they wanted to believe." }
    ],
    humanInteraction: "The user creates friction at the moment an answer feels irresistibly convenient. She asks for sources, searches for disconfirming evidence and separates the model's wording from the decision she is accountable for. A second confident response from the same system is not independent confirmation.",
    whyItMattersNow: "AI can make weak claims sound executive-ready in seconds. The greatest risk is often not an obviously absurd answer, but a tidy conclusion that moves through a meeting because nobody wants to interrupt its confidence."
  },
  "ada-lovelace": {
    concepts: [
      { name: "Algorithms", connection: "An algorithm is an ordered method for transforming defined inputs into a result." },
      { name: "Task decomposition", connection: "A complex objective becomes executable when it is broken into operations and intermediate values." },
      { name: "Reproducibility", connection: "Documented steps allow another person to inspect, repeat and revise the method." }
    ],
    humanInteraction: "People define the objective, inputs, sequence and checks before a machine can execute the procedure. With generative AI, those instructions may be conversational rather than coded, but the human still determines what counts as the right task and an acceptable result.",
    whyItMattersNow: "Repeatable AI work depends on more than saving a clever prompt. Teams need the source material, sequence, decision points and human checks that turn one successful output into a process another person can safely reproduce."
  },
  "grace-hopper": {
    concepts: [
      { name: "Compilers", connection: "A compiler translates human-written instructions into forms a computer can execute." },
      { name: "Abstraction", connection: "Higher-level languages let people express intent without controlling every machine-level detail." },
      { name: "Interface design", connection: "The language between person and machine determines who can use computing power and how precisely." }
    ],
    humanInteraction: "AI interfaces mediate between a user's instructions and system operations, but that mediation is not a faithful compiler-style translation. People choose words, examples or controls to express the job, then still need to check how the system interpreted them.",
    whyItMattersNow: "Natural-language AI feels effortless because much of the technical translation is hidden. Understanding that translation still occurs helps workers specify intent, recognise misinterpretation and avoid treating conversational ease as proof that the system understood the business context."
  },
  "hedy-lamarr": {
    concepts: [
      { name: "Frequency hopping", connection: "Changing channels according to a shared pattern can make a radio signal harder to jam." },
      { name: "Robust communication", connection: "A system can be designed to keep functioning when its communication environment is contested or unreliable." },
      { name: "Technology lineage", connection: "Later systems may inherit an idea indirectly; resemblance is not proof of a simple one-inventor story." }
    ],
    humanInteraction: "People experience AI through networks, devices and services that must communicate reliably. They choose whether a system can operate offline, what happens when a connection fails and whether a later product genuinely traces to the innovation being cited.",
    whyItMattersNow: "AI products are built on layers of communications infrastructure and long chains of prior research. Accurate lineage prevents inspirational storytelling from replacing evidence and reminds teams to design for interruption, interference and failure."
  },
  "karen-sparck-jones": {
    concepts: [
      { name: "Information retrieval", connection: "Retrieval finds and ranks material that may answer a question rather than generating the answer itself." },
      { name: "Inverse document frequency", connection: "A term can be more informative when it is rare across the wider collection than when it appears everywhere." },
      { name: "Retrieval-augmented generation", connection: "Modern AI systems can retrieve documents before generating, but the quality of the source set and ranking still governs what reaches the model." }
    ],
    humanInteraction: "The user shapes retrieval through the query, the collection being searched and the judgement applied to the ranked results. When an AI answer cites retrieved material, the person still checks whether the chosen passage is relevant and supports the claim.",
    whyItMattersNow: "Search and retrieval sit underneath workplace copilots, knowledge assistants and many apparent question-answering systems. The retrieval stage cannot supply evidence it did not find or that the organisation never indexed. A generator may still produce an answer from model parameters, but that answer lacks the missing retrieved support."
  },
  "hannah-fry": {
    concepts: [
      { name: "AI literacy", connection: "People need a usable mental model of what a system receives, changes and returns before they can judge it." },
      { name: "Explainability", connection: "An explanation makes the relevant mechanism and decision points visible without pretending every internal detail is knowable." },
      { name: "Socio-technical systems", connection: "An algorithm matters where it meets people, institutions, incentives and consequences." }
    ],
    humanInteraction: "A person begins with the human decision, then asks what data enters the system, what the system changes, where error can appear and who retains authority. She tests understanding by explaining the process back in ordinary language rather than repeating product vocabulary.",
    whyItMattersNow: "AI is used across hiring, healthcare, education, media and office work, often through systems whose technical internals users cannot inspect. Clear mental models let non-specialists ask better questions without giving them false confidence that a simple explanation settles every risk."
  },
  "fei-fei-li": {
    concepts: [
      { name: "Training data", connection: "Models learn statistical patterns from data whose collection and organisation reflect human choices; supervised datasets also depend on human-defined labels." },
      { name: "Computer vision", connection: "Vision systems turn pixels into predictions about objects, scenes and relationships." },
      { name: "Representation and bias", connection: "What the dataset includes, excludes and labels shapes what the model can recognise and how errors are distributed." }
    ],
    humanInteraction: "People interact with the model long before they type a prompt: they collect examples, define categories and decide which labels count as truth. Later users encounter those decisions when the system recognises some situations reliably and misreads others.",
    whyItMattersNow: "Training data now influences image search, medical imaging, robotics and generative systems. Teams buying or building AI need to ask whose world the examples represent and whether evaluation covers the people and conditions in the real deployment."
  },
  "timnit-gebru": {
    concepts: [
      { name: "Large language models", connection: "Scale can increase capability while also increasing the cost, opacity and reach of failures." },
      { name: "Dataset documentation", connection: "The origin, composition, labour and intended use of training data affect what claims can responsibly be made about a model." },
      { name: "Power and accountability", connection: "Technical choices are shaped by institutions and incentives, and their harms are not distributed evenly." }
    ],
    humanInteraction: "A user asks what produced the fluent answer: which data, whose labour, what optimisation target and what business incentive. She treats the output as the result of a system with a history and owner, not disembodied knowledge arriving from nowhere.",
    whyItMattersNow: "Organisations can adopt powerful models without visibility into their training or failure patterns. Documentation, external scrutiny and the ability to challenge deployment are practical safeguards when scale makes individual errors easier to spread."
  },
  "rachel-thomas": {
    concepts: [
      { name: "Applied data ethics", connection: "Ethical analysis begins with the concrete system, affected people and plausible pathways to harm." },
      { name: "Participatory design", connection: "People who bear the consequences should influence requirements, testing and deployment decisions." },
      { name: "AI education", connection: "Teaching technical use without consequences creates capability without judgement." }
    ],
    humanInteraction: "The practitioner maps who provides the data, who receives the output, who can contest it and who is missing from the design room. She uses AI skills together with questions about power and consequence rather than treating ethics as a final approval box.",
    whyItMattersNow: "Workplace AI pilots can move from demonstration to policy before affected employees or customers are consulted. Bringing ethics into task selection and testing prevents teams from efficiently automating a decision they should have redesigned first."
  },
  "joy-buolamwini": {
    concepts: [
      { name: "Algorithmic bias", connection: "A system can perform differently across demographic groups because of data, design and evaluation choices." },
      { name: "Disaggregated evaluation", connection: "Overall accuracy can hide severe error rates for smaller or marginalised groups." },
      { name: "Facial analysis", connection: "Systems that classify or identify faces can create unequal errors and high-stakes consequences." }
    ],
    humanInteraction: "People decide which groups appear in the test, which error matters and whether anyone can challenge a result. A user or buyer can demand subgroup evidence instead of accepting one impressive average as proof that the system works for everyone.",
    whyItMattersNow: "AI evaluation increasingly influences purchasing and deployment. Disaggregated testing makes hidden failure visible before a tool reaches hiring, identity verification, public services or other settings where the people misread by the system bear the cost."
  },
  "kate-crawford": {
    concepts: [
      { name: "AI supply chains", connection: "Models depend on minerals, energy, data centres, human labour, datasets and institutional infrastructure." },
      { name: "Externalities", connection: "Some costs of an AI product fall on people and places outside the buyer's immediate view." },
      { name: "Political economy", connection: "Who owns infrastructure, data and decision power shapes which systems are built and whose interests they serve." }
    ],
    humanInteraction: "A person looks beyond the interface and asks what resources, labour and permissions make the feature possible. Procurement and product decisions become part of AI interaction because choosing a system also chooses its supply chain and governance.",
    whyItMattersNow: "Generative AI is often evaluated through output quality alone. Organisations making climate, labour, privacy or public-interest commitments need to examine the material and institutional costs that remain invisible in a convenient chat window."
  },
  "meredith-whittaker": {
    concepts: [
      { name: "Data minimisation", connection: "Collecting and retaining less information reduces direct exposure and opportunities for later use, although proxy data can still enable sensitive inferences." },
      { name: "Surveillance business models", connection: "Revenue and institutional incentives can encourage systems to gather more behavioural data than the immediate service requires." },
      { name: "Privacy infrastructure", connection: "Architecture, defaults and governance protect privacy more reliably than promises placed around unrestricted collection." }
    ],
    humanInteraction: "People shape what an AI system can know by choosing which provider, permissions and data path they use. They can remove unnecessary inputs, prefer privacy-preserving services and challenge features that require broad collection for a narrow benefit.",
    whyItMattersNow: "AI features are being added to communications and workplace platforms that already hold sensitive information. Privacy decisions made in infrastructure determine future possibilities for profiling, training and surveillance long after the original convenience has been forgotten."
  },
  "emily-bender": {
    concepts: [
      { name: "Language modelling", connection: "A language model predicts likely continuations from patterns in its training data." },
      { name: "Meaning and grounding", connection: "Plausible language does not by itself establish a connection to the world, evidence or a speaker's intent." },
      { name: "Anthropomorphism", connection: "Human-sounding responses can lead users to attribute understanding, beliefs or authority the system has not demonstrated." }
    ],
    humanInteraction: "The user separates conversational fluency from knowledge. She asks what source or observation grounds the answer, avoids treating first-person language as evidence of a mind and uses the model for language work without assigning it human accountability.",
    whyItMattersNow: "Chat interfaces make statistical text generation feel like a social exchange. Keeping the mechanism visible helps workers use fluency productively while checking facts, protecting sensitive information and reserving consequential judgement for people."
  },
  "eniac-six": {
    concepts: [
      { name: "Programming", connection: "Programming turns a mathematical or operational objective into a sequence a machine can execute." },
      { name: "Human infrastructure", connection: "Technical systems rely on skilled labour that documentation and public stories may erase." },
      { name: "Procedural knowledge", connection: "Operating a new machine often requires people to invent methods before formal tools or job categories exist." }
    ],
    humanInteraction: "People are part of the computing system: they translate problems, configure processes, detect failures and create the operating knowledge around new technology. In many AI systems, less-visible review, labelling and workflow labour materially affects whether the visible model works in practice.",
    whyItMattersNow: "Organisations often describe AI as replacing work while quietly relying on people to prepare data, correct outputs and handle exceptions. Naming that labour improves planning, credit, staffing and accountability instead of hiding essential work behind automation language."
  },
  "margaret-hamilton": {
    concepts: [
      { name: "Software engineering", connection: "Reliable software requires designed processes, interfaces, tests and failure handling—not code alone." },
      { name: "Priority scheduling", connection: "When a system cannot process everything, rules determine which work continues and which is deferred." },
      { name: "Fault tolerance", connection: "A system is designed to recognise overload or error and preserve the most critical function." }
    ],
    humanInteraction: "People define which outcomes are mission-critical, test overload conditions and decide what the system should do when information conflicts. With AI, fallback behaviour and escalation paths are as important as the ideal demonstration.",
    whyItMattersNow: "AI is moving into workflows where failures interrupt customers, employees and public services. Teams need to design for bad inputs, unavailable models and competing demands before a polished pilot is allowed to become infrastructure."
  },
  "frances-allen": {
    concepts: [
      { name: "Compiler optimisation", connection: "A compiler can reorganise instructions to execute the same intended computation more efficiently." },
      { name: "Parallel computing", connection: "Work can be divided so multiple operations proceed at the same time when dependencies allow it." },
      { name: "Efficiency", connection: "Performance gains depend on understanding the structure of the computation, not merely using faster hardware." }
    ],
    humanInteraction: "Users rarely see optimisation directly, but they choose workloads, latency expectations and quality settings that determine how much computation is spent. Engineers decide which transformations preserve the intended result and which trade speed against cost or precision.",
    whyItMattersNow: "Training and running AI models can consume substantial compute. Better software and parallel execution affect cost, response time and energy use, making efficiency a product and governance decision rather than a purely technical afterthought."
  },
  "grace-wahba": {
    concepts: [
      { name: "Regularisation", connection: "A model is penalised for needless complexity so it follows durable signal rather than every fluctuation." },
      { name: "Overfitting", connection: "A system can match its training examples closely while performing poorly on new cases." },
      { name: "Generalisation", connection: "The real test is whether a learned pattern remains useful beyond the data used to fit it." }
    ],
    humanInteraction: "People choose how much complexity to allow and test the model on examples it did not learn from. A user encountering a beautifully tailored prediction should ask whether the apparent precision survives a new customer, month or operating condition.",
    whyItMattersNow: "AI systems are often selected using impressive historical performance. Regularisation and out-of-sample testing explain why a simpler model may be more trustworthy for future work than one that perfectly memorised yesterday."
  },
  "cynthia-dwork": {
    concepts: [
      { name: "Differential privacy", connection: "A formal privacy guarantee limits how much an analysis can reveal about whether any one person's data was included." },
      { name: "Privacy budgets", connection: "Repeated queries consume privacy protection, so disclosure must be managed across the whole analysis." },
      { name: "Aggregate analysis", connection: "Useful group patterns can sometimes be studied without exposing an individual's contribution." }
    ],
    humanInteraction: "People decide which analyses are worth the privacy cost, set acceptable protection and resist interpreting a mathematical guarantee as permission to collect anything. Users still need to know what the guarantee covers and what other information the system releases.",
    whyItMattersNow: "Organisations want to learn from customer, employee and public data while deploying AI. Differential privacy makes protection testable, but it also reveals the need to manage repeated use instead of treating anonymisation as a one-time label."
  },
  "daphne-koller": {
    concepts: [
      { name: "Probabilistic graphical models", connection: "A model represents dependencies among uncertain variables rather than collapsing them into one unexplained score." },
      { name: "Uncertainty", connection: "Evidence can support several possible explanations with different levels of confidence." },
      { name: "Machine learning for discovery", connection: "Models can prioritise patterns and experiments in complex domains while remaining dependent on real-world validation." }
    ],
    humanInteraction: "A decision-maker asks what alternatives the model considered, how confidence changes with new evidence and which experiment could distinguish competing explanations. AI helps organise uncertainty; the person decides what evidence is strong enough to act on.",
    whyItMattersNow: "AI is being used in science, medicine and business decisions where certainty is rarely available. Representing alternatives and uncertainty prevents a ranked output from masquerading as a proven cause or guaranteed outcome."
  },
  "barbara-liskov": {
    concepts: [
      { name: "Abstraction", connection: "A component exposes what others need to use while hiding implementation details that may change." },
      { name: "Substitutability", connection: "A replacement should preserve the promises that dependent users and systems rely on." },
      { name: "Modular systems", connection: "Clear boundaries contain change and make complex technology easier to test and maintain." }
    ],
    humanInteraction: "People rely on an AI service through an interface or contract: accepted inputs, expected outputs, error behaviour and limits. They can change the model behind that boundary only if the replacement still honours the promises made to users and downstream workflows.",
    whyItMattersNow: "Models and vendors change rapidly. Strong interfaces let organisations upgrade a component without silently changing privacy, output format, quality or business behaviour across every process that depends on it."
  },
  "jean-sammet": {
    concepts: [
      { name: "Programming languages", connection: "A language determines how people can express instructions, data and relationships to a computer." },
      { name: "Symbolic computation", connection: "Systems can manipulate mathematical symbols and structures, not only calculate numeric values." },
      { name: "Usability", connection: "Computing power expands when its notation matches the problems and people meant to use it." }
    ],
    humanInteraction: "Users work through a language chosen by designers, whether code, formulas, menus or natural-language prompts. That language enables some instructions, obscures others and influences who can participate without a specialist translating every step.",
    whyItMattersNow: "Conversational AI is another attempt to make powerful computation accessible through a more familiar language. Its ease is valuable, but ambiguity remains: natural language broadens access while making precision and verification more important."
  },
  "adele-goldberg": {
    concepts: [
      { name: "Object-oriented programming", connection: "Software can be organised as interacting objects that combine state and behaviour." },
      { name: "Graphical user interfaces", connection: "Visible windows, icons and direct manipulation change how people imagine and control a computer." },
      { name: "Human-computer interaction", connection: "Interface choices shape discoverability, expectations and the kinds of work users attempt." }
    ],
    humanInteraction: "People understand a system through the objects and actions its interface makes visible. AI chat, copilots and creative tools similarly frame what the model appears able to do; the interface can invite useful control or hide consequential automation behind one button.",
    whyItMattersNow: "AI capability is increasingly mediated by product design rather than exposed as raw models. Interface decisions determine whether users can supply context, inspect sources, revise outputs and understand when the system is acting beyond the task they intended."
  },
  "shafi-goldwasser": {
    concepts: [
      { name: "Cryptography", connection: "Cryptographic protocols use mathematical properties to protect information and establish security claims." },
      { name: "Zero-knowledge proofs", connection: "One party can establish that a statement is true without revealing the secret information used to prove it." },
      { name: "Probabilistic encryption", connection: "Randomness prevents encryption from turning the same message into the same predictable ciphertext every time." }
    ],
    humanInteraction: "People need to distinguish a system that asks for trust from one that can demonstrate a property. They choose which facts must be revealed, which can be proved indirectly and which security assumptions remain outside the mathematical guarantee.",
    whyItMattersNow: "AI services increasingly handle identity, proprietary data and sensitive computation. Cryptographic methods can reduce unnecessary disclosure and support verifiable claims, but only when the whole product preserves the assumptions the protocol requires."
  },
  "lynn-conway": {
    concepts: [
      { name: "VLSI design", connection: "Very-large-scale integration places many components on a chip and requires methods for managing their complexity." },
      { name: "Design rules", connection: "Shared abstractions let designers work within manufacturing constraints without rediscovering every physical detail." },
      { name: "Democratising technical creation", connection: "Tools, notation and education can widen who is able to design advanced systems." }
    ],
    humanInteraction: "People build complex technology by working through layers of trusted rules and tools. AI users do the same when they combine models, prompts and services; they need to know which constraints are safely abstracted and which decisions remain theirs.",
    whyItMattersNow: "Modern AI depends on specialised chips, while AI tools themselves promise to widen technical creation. Conway's work shows that access grows when complexity is organised into teachable interfaces—not when expertise is dismissed or hidden."
  },
  "mira-murati": {
    concepts: [
      { name: "Human-AI collaboration", connection: "A useful system gives people ways to direct, inspect and revise what the model contributes." },
      { name: "Steerability", connection: "Users need controls that make behaviour respond predictably to goals, context and correction." },
      { name: "Customisation", connection: "A general model becomes a work tool when it can incorporate the user's domain, constraints and feedback without losing safety boundaries." }
    ],
    humanInteraction: "People move from receiving a generic answer to shaping a working partner: they provide context, compare alternatives, correct behaviour and decide what remains under human control. Collaboration requires observable handles, not simply a friendlier tone.",
    whyItMattersNow: "Advanced models are becoming components in products and workflows rather than isolated chat windows. The quality of steering, adaptation and review will determine whether those systems support professional judgement or merely automate plausible output at greater scale."
  },
  "daniela-amodei": {
    concepts: [
      { name: "AI operations", connection: "Research becomes a dependable service through staffing, infrastructure, incident response and repeatable operating processes." },
      { name: "Governance", connection: "Organisational authority determines who can approve, stop, investigate and change an AI system." },
      { name: "Safety as a system", connection: "Technical testing, policy, product choices and deployment controls must work together rather than live in separate documents." }
    ],
    humanInteraction: "Customers and employees encounter not only a model but the organisation operating it. They depend on escalation routes, transparent limits, support, monitoring and leadership decisions when the system behaves unexpectedly.",
    whyItMattersNow: "Companies are embedding frontier models into consequential products. Reliability depends on whether the organisation can translate research findings into product restrictions, operational practice and accountable decisions under commercial pressure."
  },
  "lila-ibrahim": {
    concepts: [
      { name: "Responsible scaling", connection: "Controls and oversight must grow as a system's capability, reach and consequence grow." },
      { name: "Institutional governance", connection: "Standing forums, defined authority and diverse expertise make responsibility operable." },
      { name: "Feedback loops", connection: "Deployment reveals new evidence that should change testing, policy and design rather than disappear into support queues." }
    ],
    humanInteraction: "People affected by AI need routes to report failure, contribute expertise and trigger a real organisational response. Operators decide who sits at the review table and whether feedback can alter a model, product or deployment decision.",
    whyItMattersNow: "AI is moving from research environments into education, science, healthcare and public infrastructure. Responsibility cannot remain a principle on an about page; it needs owners, meetings, evidence and the power to change what ships."
  },
  "fidji-simo": {
    concepts: [
      { name: "AI deployment", connection: "A model reaches people through products, permissions, pricing, distribution and support systems." },
      { name: "Productisation", connection: "Capability becomes usable when it is shaped around a real task, interface and operating context." },
      { name: "Economic access", connection: "Who can adopt a technology depends on cost, skills, infrastructure and how benefits are distributed." }
    ],
    humanInteraction: "Users experience AI through the decisions surrounding the model: where it appears, what it can access, which actions it may take and what help exists when it fails. Adoption is shaped as much by those product choices as by benchmark performance.",
    whyItMattersNow: "AI companies are racing to move models into everyday applications and organisations. Deployment choices determine who gains practical capability, who absorbs transition costs and whether a promising demonstration becomes dependable work."
  },
  "chelsea-finn": {
    concepts: [
      { name: "Embodied AI", connection: "An embodied system learns and acts through a physical environment where mistakes change the next situation." },
      { name: "Imitation and reinforcement learning", connection: "Robots can learn from demonstrations and feedback, but must generalise beyond the exact examples shown." },
      { name: "Adaptation", connection: "A capable system adjusts to new objects, tasks and conditions rather than replaying a memorised routine." }
    ],
    humanInteraction: "People demonstrate tasks, define rewards, supervise trials and decide which failures are safe enough for learning. Because a robot's output is an action, oversight must account for physical consequences and recovery—not only whether a sentence looks correct.",
    whyItMattersNow: "AI is moving from screens into warehouses, laboratories and homes. Real-world variation makes impressive demonstrations insufficient; organisations need tests that reveal how the system responds when the environment stops matching the training example."
  },
  "amanda-askell": {
    concepts: [
      { name: "AI alignment", connection: "A system's behaviour is shaped toward intended goals and constraints, while conflicts among those aims must be made explicit." },
      { name: "Model character", connection: "Consistent behavioural tendencies affect how a model communicates, refuses and handles uncertainty." },
      { name: "Constitutional approaches", connection: "Written principles can guide training and critique, but their interpretation and trade-offs still need evaluation." }
    ],
    humanInteraction: "People encounter alignment through everyday behaviour: what the model will help with, how it explains a refusal, whether it admits uncertainty and how it responds when instructions conflict. Users can test those behaviours with difficult cases instead of judging character from a friendly first exchange.",
    whyItMattersNow: "General-purpose assistants increasingly mediate writing, analysis and decisions. The values embedded in their behaviour affect millions of small interactions, making explicit principles, trade-offs and adversarial testing practical product concerns rather than abstract philosophy."
  },
  "allie-k-miller": {
    concepts: [
      { name: "AI adoption", connection: "Adoption means changing a real workflow and its outcomes, not accumulating tool accounts or isolated demos." },
      { name: "Workflow redesign", connection: "The task, handoffs, data and human decisions around the model determine whether capability becomes useful work." },
      { name: "Measurement and change management", connection: "Teams need a baseline, success measure, owner and feedback from the people expected to use the system." }
    ],
    humanInteraction: "People choose a real decision or bottleneck, test where AI can change it and compare the new workflow with the old one. They report hidden rework, confusion and exceptions instead of allowing usage statistics to stand in for usefulness.",
    whyItMattersNow: "Organisations are under pressure to show AI adoption quickly. Starting from business outcomes protects them from scaling a fashionable tool that adds review work, weakens accountability or solves a problem employees did not actually have."
  }
};

const all = [...profiles.saints, ...profiles.mavens, ...profiles.trailblazers];
const missing = all.filter(profile => !teaching[profile.id]).map(profile => profile.id);
const extra = Object.keys(teaching).filter(id => !all.some(profile => profile.id === id));
if (missing.length || extra.length) {
  throw new Error(`Teaching-chain coverage mismatch; missing=${missing.join(",") || "none"}; extra=${extra.join(",") || "none"}`);
}

for (const profile of all) Object.assign(profile, teaching[profile.id]);
profiles.updatedOn = "2026-09-07";
fs.writeFileSync(profilePath, `${JSON.stringify(profiles, null, 2)}\n`);
console.log(`Applied explicit teaching chains to ${all.length} LUMINAiRY profiles.`);
