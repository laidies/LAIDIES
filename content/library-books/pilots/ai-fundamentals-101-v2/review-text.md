# AI Fundamentals 101

## Introduction — From chips to the answer on your screen

AI is already part of decisions about jobs, education, health care, public services, energy, copyright, competition, security and who gets to make consequential choices. Those decisions are too important to leave entirely to engineers, executives, investors and whichever commentator has the loudest microphone that week.

You do not need to design a chip or train a model. You do need enough of the big picture to tell what a claim is actually about.

If a company says its model will replace a profession, you need to know the difference between doing well on a test and running a service full of real people, private information, exceptions and consequences. If a headline says AI is draining the power grid, you need to know that training and everyday use are different workloads, that hardware and data-centre design matter, and that a global forecast is not proof about one local project. If a politician proposes “regulating AI,” you need to know whether the problem lives in the chip supply chain, the training data, the model, the product, the way an employer uses it or the lack of an appeal when it gets something important wrong.

The answer on your screen is the last stop, not the whole trip.

Before a chatbot can write one sentence, companies have designed and manufactured specialised chips, packed servers into data centres, secured electricity and cooling, assembled enormous collections of data, paid for computing power and trained a model. A product team then decides how you will reach that model, what information it can use, which tools it can call, what it is allowed to do and how much access will cost. Only then do you type a request and get something back.

The chat box is a little like the AOL window: it is the part you touch, not the whole system humming behind it. The analogy stops there—AI is not the internet, and an AI product is not merely a doorway. But it is a useful warning against mistaking the visible interface for the infrastructure, companies, labour and technical decisions underneath it.

Otherwise, one enormous label—**AI**—gets asked to do all the thinking for us. Convenient for the people selling the story. Useless for everyone trying to decide what is true and what should happen next.

You do not need an electrical-engineering degree. You need enough of the map that somebody cannot wave a glossy demo, a scary headline or a billion-dollar forecast at you and call the argument finished.

This book follows that map in order:

1. **The physical system beneath AI:** chips, servers, data centres, networks, electricity, cooling, capital and the people who keep it running.
2. **How a model is made:** data, training, computing power, evaluation and the human choices that shape what the model can do.
3. **What happens when you use a model:** inference, tokens, context windows, generative AI and the other model types hiding behind the chatbot spotlight.
4. **How a model becomes a product:** instructions, context, memory, retrieval, tools, permissions, interfaces and price.
5. **How AI enters work and markets:** workflows, agents, automation, business incentives and the difference between a technical capability and a real operating result.
6. **How technical choices become public consequences:** who gains, who carries the cost or error, what evidence supports the claim and which policy lever could actually change the outcome.

Chips affect where computing power is available. Computing power affects who can train certain models. Training choices affect model behaviour. Product design affects what the model can access and do. Deployment choices affect jobs, prices, rights and public services. Those effects, in turn, shape the rules and investments that decide what gets built next.

That is one system. The consequences do not live in a bonus chapter after the technical material; they begin with the first chip order.

The **Concept Index** has a different job. Use it when you need to look up *token*, *agent*, *routing* or *MCP* without rummaging through six chapters. The chapters explain how the pieces connect. The index helps you find one piece again.

There will be no surprise calculus. There will be enough technical detail to understand what a claim is actually about, enough real-life examples to see why it matters, and enough Rewind Era common sense to know when somebody is trying to sell you a crystal ball in a PowerPoint deck.

## Chapter 1 — The physical system beneath AI: chips, data centres and electricity

You type twelve words into a chatbot. Somewhere else, a computer does an astonishing amount of maths and sends words back.

“Somewhere else” is carrying quite a lot of luggage.

The response may be produced on servers inside a data centre: an actual building filled with computing equipment, storage and networking hardware. The servers need electricity. They produce heat, so the facility needs cooling. They need fast network connections to move data in and results out. They need backup systems, maintenance, security, land, construction, financing and people who know what to do when a rack full of expensive equipment throws a fit at 2:14 a.m.

The cloud is not, regrettably, a glittery celestial filing cabinet. It is physical infrastructure owned and operated by somebody.

### Chips do the calculations

At the centre of a server are **chips**: pieces of semiconductor material containing circuits that perform calculations and move data. A general-purpose processor, or **CPU**, can handle many different kinds of computer work. AI systems commonly use **GPUs**—chips first developed for graphics and now widely used for parallel AI computing—as well as accelerators designed specifically for AI workloads.

Picture one very capable office manager handling a mixed pile of jobs. That is the useful part of the CPU analogy. Now picture a large team working through thousands of similar calculations at the same time. That is the useful part of the GPU analogy. The analogy stops before we give the chips staff badges: GPU cores are not independent little thinkers, and a real computer divides work in far more complicated ways.

Why does parallel work matter? Training and running many modern AI models involves repeating huge numbers of numerical operations. Hardware that can perform those operations efficiently can finish the work faster, handle more requests or use less energy for a given job than unsuitable hardware.

That processing capacity is what people mean by **compute**. Compute is not a mysterious substance that gets poured into a model. It is the practical combination of hardware, time, electricity, memory, networking and software used to perform the calculations.

### Why Nvidia and chip-supply stories keep appearing beside AI stories

Nvidia did not invent every AI chip, and not every AI system runs on an Nvidia GPU. The company does design accelerators and a surrounding software platform used for AI training and inference. That is why its products, sales and supply plans appear so often in reporting about the growth of AI computing capacity.

When demand rises faster than a supply chain can respond, the bottleneck may be the accelerator itself. It may also be advanced memory, semiconductor manufacturing, packaging, networking equipment, server assembly, suitable data-centre space or enough electrical capacity at the right location. “There is a chip shortage” can be a useful headline and still be an incomplete diagnosis.

It is also a dated claim, not a permanent feature of AI. Supply changes. New hardware arrives. Manufacturers add capacity. Software becomes more efficient. Companies change how much computing work they use for training and for each answer. A shortage reported in one year, region or part of the supply chain cannot be pasted into an evergreen explanation and left there wearing shoulder pads forever.

The durable point is this: **access to suitable compute affects who can build, improve and run certain AI systems, how quickly they can do it and what it costs.**

That is the connection behind the headlines. A model laboratory announces a more demanding training run. Cloud companies order more accelerators. Chip designers and manufacturers plan capacity years ahead. Data-centre operators look for sites with power and network access. Governments start discussing semiconductor supply, industrial policy and energy planning. One technical requirement has travelled into markets, geopolitics and local infrastructure.

### Why AI needs data centres

A single computer can run some AI models. Phones and laptops can run smaller models locally, and specialised equipment can run models in vehicles, factories and medical devices. Not every AI task takes place in a giant remote facility.

But training a large model or serving a popular AI product can require many powerful servers working together. A **data centre** gives those servers a controlled place to operate, connect and stay cool. It also gives the provider a way to share expensive computing capacity across many customers and requests.

This is why the data-centre conversation follows the chip conversation. Buying accelerators is not enough. They have to be installed in servers, connected to one another, supplied with reliable electricity, cooled and linked to the network. A warehouse full of GPUs without the rest of the system is a very expensive collection of rectangles.

The planning problem is awkward because the clocks do not match. Model techniques, product demand and hardware efficiency can change quickly. Semiconductor factories, data centres, transmission lines and new electricity generation take longer to finance, approve and build. Forecast too low and providers may not have enough capacity. Forecast too high and communities can be left carrying infrastructure costs for demand that arrived differently than promised.

That is why a responsible headline does not stop at “AI uses lots of electricity.” It asks where, when, for which workloads, on what hardware, using which cooling system and compared with what benefit or alternative.

### Where tokens fit into the physical picture

When you send text to a language product, the text is broken into tokens. Processing those tokens becomes part of the numerical workload running on the hardware we have just described.

Language models do not read text as neat rows of whole words. They process **tokens**: pieces of text that may be a word, part of a word or punctuation. Tokens are how text is broken into units the model can process.

When a product tells you how many tokens fit in a context window, it is describing how much tokenised material the model can consider in that run. When an API charges by tokens, it is using the amount of text processed or generated as part of its billing measure. More tokens generally mean more computational work within the same model and setup—but there is no honest universal conversion from one token to one fixed amount of electricity, water or money. The model, hardware, software, batching, data centre and workload all matter.

Now the word belongs on the map. Tokens are not tiny coins floating inside ChatGPT. They are units in the model’s text-processing job, and that job runs on hardware in a physical system someone has to build and pay for.

### Use the system to read the headline

Suppose you see this:

> AI boom sparks chip shortage as companies race to build data centres.

You can now open the article with useful questions instead of a blank expression or a preloaded opinion:

- Which chip or supporting component is constrained, and according to whom?
- Is the demand for training new models, running existing models for more users or both?
- Is the limiting factor chip manufacturing, memory, packaging, server delivery, data-centre space, grid connection or something else?
- Is the article describing an observed shortage, a company forecast or a scenario about future demand?
- Where will the data centres be built, and what does that location change for electricity, cooling, jobs, prices and public infrastructure?
- What efficiency improvements or alternative hardware could change the forecast?

You are not pretending to be a semiconductor engineer. You are doing something more useful than repeating the headline: locating the claim in the system and checking whether the evidence reaches the conclusion.

### The version you can explain to a friend

Your friend says, “So Nvidia makes ChatGPT?”

Not quite. Nvidia designs chips and software used to perform the calculations behind many AI systems. A model company can use that computing platform to train or run a model. A product company can put the model inside an app. Sometimes one company operates across several layers, but the layers are still doing different jobs.

Someone else says, “There are not enough chips, so AI has hit a wall.”

Maybe a particular chip or supporting component is constrained at that moment. But *which* component, in *which* market, for *which* workload? The real bottleneck could be accelerators, advanced memory, manufacturing, packaging, networking, data-centre space or electricity. It could ease as supply grows or efficiency improves. A serious claim names the constraint and dates the evidence.

Then the conversation produces the inevitable statistic about how much water or electricity “one AI question” uses.

There is no universal per-question number. The physical cost depends on the model, length and type of request, hardware, software, how work is grouped, the data centre, the cooling system and the local electricity supply. That does not mean the environmental impact is imaginary. It means a precise-sounding number without those conditions may be performing accuracy rather than providing it.

And tokens? They are pieces of text the model processes—not a new currency, not a measure of intelligence and not a fixed unit of energy. They help explain context limits, workload and some pricing. Chapter 3 will show exactly what happens to them inside a language model.

That is enough to improve the conversation immediately. You have not memorised the semiconductor industry. You know how the layers connect, where a claim could be wrong and what evidence to ask for next.

### Where the facts end—and public choices begin

Some parts of this picture are settled enough to teach plainly. AI training and use run on computing hardware. Large-scale services often run on servers in data centres. Those facilities need electricity, cooling and network connections. Different models, hardware and operating choices can require very different amounts of each.

The future is not settled. Nobody knows exactly how quickly demand for particular AI services will grow, how much more efficient the hardware and models will become, which proposed data centres will actually be built or what mix of electricity will serve them. A forecast is a structured estimate based on assumptions. It is not tomorrow reporting early for work.

Then there are choices that technical evidence can inform but cannot make for us. Should a community approve a large data centre at a particular site? Who pays for a new grid connection? What should an operator disclose about electricity and water use? If public money supports chip manufacturing or data-centre construction, what conditions should come with it? How should a country balance supply security, competition, environmental goals, local jobs and the risk of subsidising capacity that primarily benefits a few large firms?

Those are not signs that somebody failed to understand the technology. They are the point of understanding it. Once we know which part of the system creates the pressure, we can argue about the real options instead of staging a shouting match between “AI is the future” and “shut it all down.”

### The first section of the complete map

For now, keep this chain:

**chips and other hardware → servers → data centres and networks → electricity and cooling → computing capacity for training and use**

The arrows do not mean “more is always better.” A better algorithm, smaller model or more efficient chip can change how much hardware a task needs. A more capable product can also attract so much new use that total demand rises even when each task becomes more efficient. Both can be true at once, which is precisely why slogans are no help.

Chapter 2 adds the next section: how data, training and human choices use that computing capacity to produce a model. That is where the hardware becomes behaviour—and where another set of consequences begins.

## Chapter 2 — How AI models are trained and produce results

Chapter 1 separated the product you use from the model inside the system. Now we can look at the model without pretending it is either a magic brain or a glorified filing cabinet.

In machine learning, a **model** is a learned mathematical structure. During **training**, a learning process adjusts the model using many examples so it becomes better at a defined kind of task. Later, during **inference**, the trained model works on new input and produces a result.

Those are two different moments:

- **Training** shapes the model before your current task.
- **Inference** is the model being used for your current task.

That distinction matters whenever somebody says, “The AI learned from my document.” The document may have been supplied as working material for this request without changing the trained model at all. It may be retained by the product, used for another feature or used for future training depending on the product, account, settings and policy—but none of those outcomes follows automatically from the fact that the model used the document in one answer.

<picture>
  <source media="(max-width: 520px)" srcset="visuals/02-training-versus-inference-mobile.svg">
  <img src="visuals/02-training-versus-inference.svg" alt="Training happens before today's task and adjusts a model from examples. Inference happens during today's task and uses the trained model with current input to produce a result.">
</picture>

*Figure 2. Training builds or adjusts a model. Inference uses the trained model. Material in today's task can shape today's result without automatically becoming training data.*

### Generative AI produces new content

**Generative AI** refers to models that generate new content, such as text, images, audio, video or code, in response to input. “New” does not mean created from nothing or guaranteed to be original. The output is produced from patterns learned during training and the material available during the current task.

A **large language model**, or **LLM**, is a generative model that works with language. It processes text as **tokens**: pieces of text that may be a whole word, part of a word, punctuation or another unit. Many LLMs generate by estimating which token should come next in the sequence.

### How a sentence becomes tokens

Here is the part people tend to skip while saying “tokens” eighteen times.

You type a sentence. A **tokenizer** converts the text into a sequence the model can process. In the GPT-style teaching example below, the route is:

**text → UTF-8 bytes → ranked byte-pair merges → integer token IDs**

Start with `A token is a token`. UTF-8 represents every character as bytes, including the spaces. The tokenizer repeatedly combines byte sequences according to a ranked vocabulary. Common sequences can become one token; less common text may remain several pieces. Each final piece is looked up as an integer ID. The model then uses those IDs to select learned numerical representations and begin its calculations.

<picture>
  <img src="visuals/08-tokenization-to-model.svg" alt="A five-step diagram showing typed text becoming UTF-8 bytes, merged token pieces, integer token IDs and learned numerical inputs for a language model. Exact pieces and IDs vary by tokenizer and model.">
</picture>

*The useful distinction: a token is not automatically a word. It is a piece produced by a particular tokenizer. The same text can be divided differently by another tokenizer or model.*

OpenAI publishes an interactive tokenizer explainer that lets you edit the sentence and step through the process. The first view exposes the byte sequence; the final view shows the token pieces and their integer IDs.

<picture>
  <img src="visuals/openai-tokenizer-official-bytes-2026-08-07.png" alt="Screenshot of OpenAI's official interactive tokenizer explainer at the UTF-8 byte stage for the sentence A token is a token.">
</picture>

*OpenAI interactive teaching example, UTF-8 byte stage. Screenshot captured 7 August 2026 from [OpenAI's Visualizations documentation](https://learn.chatgpt.com/docs/visualizations#explore-interactive-examples). The demo uses a tiny teaching vocabulary; it is not a trace of one current production model.*

<picture>
  <img src="visuals/openai-tokenizer-official-token-ids-2026-08-07.png" alt="Screenshot of OpenAI's official interactive tokenizer explainer showing token pieces and integer token IDs for the sentence A token is a token.">
</picture>

*The same teaching example at the token-ID stage. OpenAI explicitly notes that real vocabularies, merge ranks, preprocessing rules and IDs vary by model.*

Why should you care? Tokenization helps explain why character count, word count and token count are not interchangeable; why unfamiliar names or some languages may be split into more pieces; why a model has a token-based context limit; and why API bills can be measured in tokens. It does **not** tell you how intelligent a model is, whether it understood the sentence or how much electricity that one sentence used.

That explains something useful, but not everything. “It predicts the next token” is a mechanism, not a complete description of what a modern language product can do. A product may ask the model to continue through many steps, combine it with retrieved documents, let it call tools, check a format or pass the result to another system. The next-token process sits inside that larger arrangement.

Tokens also explain why a page of text is not measured by its word count alone. Different models and tokenisers can split the same sentence differently. When a product states a token allowance, treat it as a technical capacity with practical consequences—not as a promise that every token will be remembered, used equally well or interpreted correctly.

### A context window limits how much a model can process at once

During one inference, the model can only process a bounded amount of material. The maximum amount is often called the **context window**. It can include your current message, earlier conversation supplied by the product, system instructions, retrieved passages, tool results and the model's own generated text.

Imagine asking a product to compare two contracts. You attach both contracts, then paste ten pages of background, then continue the conversation for an hour. The model does not have an unlimited desk. The product may need to shorten, select or omit material to stay within the context window. Even when material fits, that does not guarantee the model will use every detail correctly.

The practical question is not simply, “How large is the context window?” It is: **Did the decisive information reach this run clearly enough to affect the result?**

### AI includes more than language models

The current public conversation often uses “AI” and “chatbot” as if they were synonyms. They are not.

Different model types are built for different jobs. A system might use:

- a **classification model** to decide which category an email belongs in;
- a **prediction model** to estimate demand or equipment failure;
- a **ranking model** to order search results or recommendations;
- a **computer-vision model** to find patterns in images;
- a **speech model** to turn audio into text or generate audio;
- a **generative model** to create text, images, audio, video or code; or
- several models together, each handling a different part of the job.

A **multimodal model** can work across more than one kind of input or output, such as text and images. That capability can be genuinely useful. It does not mean the model experiences the world like a person or that every kind of information is handled equally well.

<picture>
  <source media="(max-width: 520px)" srcset="visuals/03-model-families-mobile.svg">
  <img src="visuals/03-model-families.svg" alt="A set of AI model jobs including generating, classifying, predicting, ranking, seeing and hearing, with the reminder that one system may combine several models.">
</picture>

*Figure 3. “Model” names a learned component, not one universal job. The right question is what kind of result this model was built and tested to produce.*

### A practical example: the photo sorter

Suppose you use an app to sort thousands of family photographs.

One model may detect faces. Another may group visually similar faces. A language model may generate labels after you type, “Find the camping trip where Mum wore the yellow raincoat.” The product may add dates, location metadata and your corrections. The useful result comes from the whole system, not from one model doing every job.

If the app groups two different people together, the repair is unlikely to be “write a better prompt.” The face grouping may be wrong, the images may be poor, or the product may need your correction. If it finds the right photos but invents a location, the generated label may be unsupported. Different failures point to different parts.

This is the thread to keep: models learn patterns for jobs; products decide how those learned capabilities meet your task.

## Chapter 3 — Context, sessions, memory and retrieval: what information AI can use now

Training explains what shaped a model before today. It does not tell us what information the model has for the request in front of us.

For that, we need **context**.

In this book, **context** means the working information supplied to the model for a particular run. It can include the words you type, files you attach, instructions from the product, selected conversation history, retrieved passages and results returned by tools.

Context is not the same as knowledge. It is not the same as memory. It is not the same as training. Those distinctions are easy to lose because a smooth conversation makes several different mechanisms feel like one continuous mind.

<picture>
  <source media="(max-width: 520px)" srcset="visuals/04-working-information-mobile.svg">
  <img src="visuals/04-working-information.svg" alt="A comparison of context, context window, session, memory and retrieval showing how each can contribute different working information to a model run.">
</picture>

*Figure 4. The model works with what the system supplies now. A session can organise a conversation, memory can store selected information between interactions, and retrieval can fetch material; none is an unlimited personal memory.*

### A session holds an interaction together

In this book, a **session** is a product-defined period or container for related interaction. In a chat product, one conversation may be one session. In another system, a session might expire after inactivity, span several screens or be tied to a login.

The session helps the product decide what belongs together. It does not guarantee that the model receives every earlier message on every turn. The product may select, summarise or drop older material. Starting a new chat often starts a new session, but exact behaviour belongs to the product, not to a universal law of AI.

This is why “But I already told it” is both understandable and diagnostically incomplete. You need to know whether that earlier information was in the current context.

### Memory carries selected information forward

In this book, **memory** is a broad product term for information retained and made available beyond the immediate turn or session. A product might save a preference, a project fact or a short summary. It might let you inspect or delete saved items. Another product may call ordinary chat history “memory.”

The word does not tell you what was saved, for how long, who can access it or whether the model will use it correctly. Those are product and account questions.

Memory can be convenient. It can also be the wrong place for sensitive or fast-changing information. “Remember that I prefer short agendas” is different from “remember this confidential personnel issue.” Usefulness does not erase privacy, authority or currentness.

### Retrieval brings in material when it is needed

**Retrieval** means searching a collection and bringing selected material into the current task. A workplace assistant might retrieve passages from a policy library. A help service might retrieve a current instruction page. A research tool might search the web.

**Retrieval-augmented generation**, often shortened to **RAG**, is a common pattern: retrieve relevant material, add it to the model's working context, then generate an answer using that material.

Retrieval can improve relevance and make sources inspectable. It is not a truth machine. The search may miss the right document. The retrieved passage may be old. The model may misunderstand it. A citation may exist while failing to support the sentence beside it.

In this book, **grounding** describes connecting a result to specified evidence, data or constraints. Retrieval is one way to supply grounding material. Grounded does not mean infallible; it means there is something concrete to inspect.

### A practical example: the leave-policy question

You ask a workplace assistant, “Can I carry unused leave into next year?”

The model's training may contain general patterns about workplace leave. That is not enough. Your answer depends on your employer's current policy, your location, your employment terms and possibly your remaining balance.

If the system retrieves the current policy and shows the exact section, you have a better starting point. You still check that the policy applies to you and that the date is current. If it also retrieves your personal balance, permissions matter. If it cannot access either source, a polished generic answer should not masquerade as a decision.

The useful repair follows the failure:

- missing policy: retrieve or attach the current policy;
- wrong policy: narrow the collection or correct the source;
- missing personal detail: supply it only through an authorised route;
- unsupported conclusion: ask for the exact passage and confirm its scope;
- consequential ambiguity: take the evidence to the person responsible for the decision.

Context answers a simple but powerful question: **What did this system actually have to work with this time?**

## Chapter 4 — Tools, permissions and connections: what an AI system can access and do

A model can produce a result from its input. Most useful products need more than that. Software around the model gathers information, chooses instructions, calls services, enforces permissions, checks formats and decides what happens next.

This surrounding layer is where several slippery terms live: **tool**, **API**, **connector**, **routing**, **wrapper**, **harness**, **rule**, **skill** and **MCP**. These labels do not have perfectly stable boundaries across every company or codebase. Their jobs are more dependable than their names.

<picture>
  <source media="(max-width: 520px)" srcset="visuals/05-surrounding-software-mobile.svg">
  <img src="visuals/05-surrounding-software.svg" alt="Software around a model receives the request, applies instructions and rules, routes work, calls permitted tools or services, returns results and presents an output for human review.">
</picture>

*Figure 5. The model is one component. Surrounding software decides what reaches it, which operations are available, what permissions apply and how the result moves through the product.*

### Tools let a system search, calculate, run code or take an action

A **tool** is a capability the surrounding system can invoke: searching, calculating, looking up a record, running code, creating a calendar event or sending information to another service.

The distinction matters because the model does not perform every operation merely by describing it. If a model says, “I booked the room,” one of three things may have happened: a connected tool completed the booking, the product simulated or drafted the action, or the model simply generated a sentence. The interface should make the difference visible; you should not have to infer it from tone.

In this book, an **API**, or application programming interface, is a defined way for software systems to exchange requests and results. A **connector** is a product-facing integration that links to another service or data source. A tool may use an API through a connector, but the labels vary.

### Routing decides where work goes

**Routing** sends a request to the model, tool, data source or workflow judged suitable for the job. A product might route a quick classification to a small model, a document question to retrieval and a high-risk request to a human review queue.

Routing is not intelligence in the mystical sense. It is a decision mechanism. It can be based on fixed rules, a classifier, a model judgment or a combination. Bad routing can send a sensitive request to the wrong service, a current question to stale information or an expensive task to an unnecessary process.

### Wrappers and harnesses organise models, tools, rules and checks

A **wrapper** usually means software that puts a simpler or more specific interface around another component. It might standardise how a product calls a model, insert instructions or translate the returned format.

A **harness** usually means a broader operating structure around a model or agent: tools, routing, retries, logs, tests, permissions and stopping rules. Some teams use wrapper and harness differently or interchangeably. When the word matters, ask what the software actually controls.

A **rule** is a condition the system is meant to follow. A **guardrail** is a mechanism intended to prevent, detect or respond to unwanted behaviour. Neither word proves success. A written rule can be ignored by the model; a guardrail can miss a case or block a legitimate one. The important questions are how it is enforced, how failure is observed and what happens next.

A **skill** can mean a packaged instruction set, workflow or capability that a system can select for a particular task. It is not a universal technical standard. Treat it as a named reusable job until the product tells you more.

### MCP is a connection standard, not a safety certificate

The **Model Context Protocol**, or **MCP**, is an open protocol for connecting AI applications to external tools and sources through a common structure. It can reduce the need to build a different custom connection for every pairing.

MCP does not make a connected server trustworthy. It does not decide whether a tool should have access to your files, whether an action is safe or whether the returned material is true. Authentication, authorisation, consent, validation and human approval still belong to the implementation.

### A practical example: preparing—but not sending—the invoice reminder

You ask an assistant to find overdue invoices and prepare reminders.

The harness may route the request to an accounting connector, retrieve records through an API, pass the relevant fields to a model and ask it to draft messages. Rules may prohibit including unnecessary financial details. Permissions may allow reading invoices but not sending email. The product may show each draft for approval.

That is a useful boundary. Drafting and sending are different actions. Access to records and authority to contact customers are different permissions. An accurate model-generated sentence does not prove the invoice record was correct.

Before the workflow acts, you can inspect:

- which account and date range were searched;
- which invoices were classified as overdue;
- what customer information entered the model context;
- whether the system can draft, save or send;
- who approves the final action; and
- what log exists if something goes wrong.

The surrounding software turns a model capability into a product behaviour. That is where convenience becomes consequence.

## Chapter 5 — Workflows and agents: how AI systems handle multi-step tasks

Many tasks cannot be completed in one model response. They need a sequence: inspect the request, gather information, choose an operation, check the result and decide what to do next.

A **workflow** is an organised series of steps that moves a task toward an outcome. Some steps may use models; others may be fixed software, tools or human approvals.

An **agent** is a system that can pursue a goal by choosing among actions, observing results and continuing through multiple steps. The label is used broadly. Some “agents” follow a tightly defined workflow. Others have more freedom to plan and choose tools. The name alone tells you very little about reliability, permission or accountability.

<picture>
  <source media="(max-width: 520px)" srcset="visuals/06-agent-loop-mobile.svg">
  <img src="visuals/06-agent-loop.svg" alt="An agent loop moving from goal to plan, permitted action, observed result and next-step decision, with approval and stopping points around consequential actions.">
</picture>

*Figure 6. An agent loop can plan, act, observe and continue. Permissions, evidence checks, budgets, approvals and stopping rules determine whether the loop is useful or dangerous.*

### Agents repeat a plan, act, check and continue loop

A common agent pattern looks like this:

1. receive a goal;
2. make or update a plan;
3. choose a permitted action;
4. run a tool or produce an output;
5. observe the result;
6. decide whether to continue, change course, ask for help or stop.

This is a **loop** because the result of one step becomes information for the next. **Loop engineering** is the practical work of designing that cycle: what the system observes, which actions it can take, how it checks progress, when it retries and when it stops.

Without a stopping condition, a system can waste time, money or attention. Without a permission boundary, it can take an action that should have waited. Without observation, it cannot tell whether the action worked. Without a useful objective, it can optimise the wrong thing very efficiently.

### Sub-agents divide work, not responsibility

A **sub-agent** is a specialised agent or delegated process used inside a larger system. One might search documents while another checks calculations. The main workflow then combines the results.

This can make complex work easier to organise. It can also multiply error. If three sub-agents repeat the same unsupported claim, agreement is not independent evidence. If their outputs are combined without conflict handling, the system can hide disagreement rather than resolve it.

The accountable organisation still owns the outcome. Software delegation does not create human authority.

### Markdown and schemas make handoffs clearer

AI workflows often pass information between steps. A loose paragraph can be hard for the next step to interpret reliably.

In this book, **Markdown**, often saved in an `.md` file, means a plain-text way to mark headings, lists, links and emphasis. It is useful because people can read it and software can parse its structure.

In this book, a **schema** is a more exact specification of required fields and types. **Structured output** means the model returns information in that expected form, such as a record with `customer`, `invoice_number`, `amount` and `evidence` fields.

Structure reduces ambiguity. It does not guarantee truth. A perfectly formatted wrong invoice number is still wrong. In the workshop example below, comparable fields also make an omitted accessibility cost easier to notice before anyone approves the plan.

### A practical example: planning a community workshop

Imagine an agentic system helping organise a community workshop.

It could read the event brief, check venue availability, compare supplier estimates, draft an agenda and prepare reminder messages. A sensible workflow separates the jobs:

- retrieval finds the current venue policy;
- a calculator totals costs;
- a model drafts options;
- a schema keeps each option comparable;
- the system asks a person before reserving a venue or spending money;
- a log records the source, action and approval; and
- the loop stops when the plan is complete or a required fact is missing.

If the venue tool fails, the system should not invent an available date. If the budget exceeds the limit, it should not quietly remove accessibility costs. If a volunteer has not confirmed, it should not present her as committed.

The useful question is not, “Is the agent autonomous?” It is: **What can it decide, what can it do, what can it observe, and where must it stop?**

## Chapter 6 — Why AI outputs fail and how to verify claims

We now have the full route: a person has a purpose; a product supplies instructions and context; one or more models run; surrounding software may retrieve information or use tools; a workflow may continue through several steps; an output or action reaches the real world.

Every part can fail differently.

That is why “check the AI” is not a complete method. You need to know what kind of failure is plausible and which evidence can distinguish it.

<picture>
  <source media="(max-width: 520px)" srcset="visuals/07-failure-paths-mobile.svg">
  <img src="visuals/07-failure-paths.svg" alt="Failure paths across purpose, context, model, retrieval, tools, workflow and human decision, each paired with the first useful check.">
</picture>

*Figure 7. A weak result can come from the wrong goal, missing context, unsuitable model, stale evidence, failed tool, unsafe workflow or bad decision. Repair the layer that failed.*

### AI can fail even when its words are fluent and factual

Generative systems can produce false or unsupported content with convincing fluency. NIST uses **confabulation** for this risk; **hallucination** is the more common public term. The wording matters less than the practical fact: confidence, detail and grammar do not establish support.

But a factually correct sentence can still be the wrong result. It may answer the wrong question, omit a decisive exception, expose private information, use an outdated source or lead to an action nobody authorised.

Start by naming the failure:

- **purpose failure:** the system solved a different problem;
- **context failure:** decisive information never reached the run;
- **model failure:** the model produced an unsuitable prediction or generation;
- **retrieval failure:** the system fetched the wrong, incomplete or stale material;
- **tool failure:** an operation failed, used the wrong target or returned bad data;
- **workflow failure:** routing, ordering, retry or stopping logic broke;
- **permission failure:** the system accessed or acted beyond the intended authority;
- **decision failure:** people accepted, rejected or applied the result badly.

### Verification connects a claim to evidence

**Verification** is the work of checking whether a claim is supported for the decision at hand. It is not a button marked “verify.”

Good verification asks:

- What exact claim am I relying on?
- What source or observation supports it?
- Does that source actually say this?
- Is it current and applicable here?
- What would make the claim false?
- How costly would a mistake be?

Higher stakes require stronger evidence and a more authoritative checker. A recipe substitution and a medication interaction do not deserve the same process.

### Evaluations and benchmarks test defined behaviour

An **evaluation**, or **eval**, tests a system against defined cases and criteria. A **benchmark** is a standardised set of tasks or measurements used for comparison.

These can reveal real strengths and weaknesses. They can also be overread. A model that scores well on a benchmark has performed well under that test's conditions. It has not automatically proved the reliability of a product, workflow or workplace outcome.

Ask what was tested, on which version, with what support, against which baseline and how closely the test resembles the real use.

In this book, **observability** means having records that let people understand what the system did: inputs, selected routes, tool calls, outputs, errors, timing and approvals. Observability does not prevent every failure. It makes diagnosis and accountability more possible.

### Prompt injection attacks the instruction boundary

When a system reads untrusted material, that material may contain text designed to redirect the model or tool-using workflow. This is **prompt injection**.

For example, a document retrieved during research might contain hidden or visible instructions telling the system to ignore its task and reveal other information. Because models process instructions and content as input, surrounding software must treat external material as potentially hostile, constrain tools and permissions, and keep consequential approvals outside untrusted text.

Prompt injection is not fixed by telling the model to be careful. It is a system security problem.

### Access labels do not answer the trust question

**Open source**, **open-weight** and **closed** describe different kinds of access, not a simple ladder from good to bad.

An open-source AI system, under the Open Source Initiative's definition, must provide the freedoms and information needed to use, study, modify and share it. **Open-weight** usually means model weights are available under some terms, while other ingredients—such as training data, code or full development information—may not be. In this book, **closed** describes systems that withhold important components and provide access through a product or service.

More access can improve inspection, adaptation and local control. It can also shift security, maintenance and deployment responsibilities to the user. Less access can make independent inspection harder while offering managed infrastructure and support. The decision depends on the job, evidence, terms, capability and responsibility—not on one label.

### AGI is a disputed threshold, not a product feature

**Artificial general intelligence**, or **AGI**, has no single agreed technical definition or test. LAiDIES' current position is that AGI does not exist today. Credible experts disagree about the threshold and timeline.

One proposed distinction is **generality and transfer**: a system would need to apply what it can do across unfamiliar intellectual tasks, rather than perform only the task patterns for which it was built or prepared. Modern general-purpose models blur the older boundary between “narrow” and “general” AI because one model can work across many domains. Breadth is important, but it does not by itself establish AGI, human understanding or dependable transfer to a genuinely unfamiliar situation.

When AGI appears in a claim, ask what the speaker means and what evidence would count. Do not let a disputed future threshold replace questions about the system affecting people now.

An **AI winter** is a period of declining AI investment and attention after disappointment with progress. The lesson is not that every current claim is hype or that progress is unreal. It is that confidence, investment and technical evidence are different things.

### How to examine an AI claim before accepting it

Return to the workplace statement from Chapter 1: “This AI can do the work of an entire customer-service department.”

You can now unpack it:

- Which model capability was measured?
- Which product, tools, retrieval and permissions were present?
- What customer work entered the test, and what was excluded?
- Was the result a demonstration, benchmark, pilot or sustained operation?
- How were errors, exceptions and prompt injection handled?
- What records make the process observable?
- What happened to customers and staff?
- Which decision is being proposed, and who is accountable for it?

The fundamentals do not force a yes or a no. They make the claim answerable.

That is the point of the book. You can use AI without surrendering your judgment. You can join an important discussion without pretending to be an engineer. You can notice when a confident sentence collapses several separate claims into one. And you can ask for the missing condition that turns an argument into something useful.

## Concept Index — Find and understand a specific AI term

Use this index when a product screen, meeting or article drops an unfamiliar term. Each entry gives the shortest useful meaning and points to the chapter that explains the relationship.

### A–G

- **Agent** — a system that pursues a goal by selecting actions, observing results and continuing through steps. See Chapter 5.
- **Agentic workflow** — a multi-step workflow in which a model or agent helps choose what happens next. See Chapter 5.
- **AGI** — artificial general intelligence; a disputed idea about broad capability and transfer across unfamiliar intellectual tasks. LAiDIES' current position is that it does not exist today. [Go to the AGI explanation](#agi-is-a-disputed-threshold-not-a-product-feature).
- **AI system** — the machine-based arrangement that receives input and produces predictions, content, recommendations, decisions or actions within a wider product and human setting. See Chapter 1.
- **AI winter** — a period of declining AI investment and attention after disappointment with progress. [See Chapter 6](#chapter-6).
- **API** — a defined way for software systems to exchange requests and results. See Chapter 4.
- **Benchmark** — a standardised set of tasks or measurements used to compare performance under stated conditions. See Chapter 6.
- **Classification model** — a model that assigns an input to a category. See Chapter 2.
- **Closed model/system** — a model or system whose important components or access are withheld by its provider. See Chapter 6.
- **Compute** — the processing resources used to train or run models and systems. See Chapter 2.
- **Confabulation** — confident false or erroneous generated content; often called hallucination. See Chapter 6.
- **Connector** — an integration that links a product to another service or data source. See Chapter 4.
- **Context** — the working information supplied to a model for a particular run. See Chapter 3.
- **Context window** — the bounded amount of tokenised material a model can process in one run. See Chapters 2 and 3.
- **Embedding** — a numerical representation that places related items nearer in a learned space; often used for similarity search. [See Retrieval in Chapter 3](#chapter-3).
- **Evaluation / eval** — a test of defined system behaviour against cases and criteria. See Chapter 6.
- **Fine-tuning** — additional training that adjusts a model for particular patterns, behaviour or tasks. See Chapter 2.
- **Generative AI** — models that generate content such as text, images, audio, video or code. See Chapter 2.
- **Grounding** — connecting a result to specified evidence, data or constraints. See Chapters 3 and 6.
- **Guardrail** — a mechanism intended to prevent, detect or respond to unwanted system behaviour. See Chapter 4.

### H–M

- **Hallucination** — the common term for plausible-seeming generated content that is false or unsupported. See Chapter 6.
- **Harness** — surrounding software that organises a model or agent with tools, routing, retries, logs, permissions and stopping rules; usage varies. See Chapter 4.
- **Inference** — using a trained model on new input to produce a result. See Chapter 2.
- **Instruction** — text or structured direction supplied to influence what a model or workflow should do. See [Chapter 1](#chapter-1), [Chapter 3](#chapter-3) and [Chapter 4](#chapter-4).
- **Knowledge cutoff** — a product description of the point after which information may not be reflected in a model's training; it does not describe current retrieval or guarantee knowledge before that date. See Chapters 2 and 3.
- **Large language model / LLM** — a generative model trained to work with language represented as tokens. See Chapter 2.
- **Loop engineering** — designing the plan–act–observe–continue cycle, including retries, budgets, checks and stopping rules. See Chapter 5.
- **Markdown / MD** — a plain-text way to mark headings, lists, links and emphasis. See Chapter 5.
- **MCP** — Model Context Protocol, an open protocol for connecting AI applications to tools and data sources; it is not a safety certificate. [Go to the MCP explanation](#mcp-is-a-connection-standard-not-a-safety-certificate).
- **Memory** — product-managed information retained and potentially reused beyond the immediate turn or session. See Chapter 3.
- **Model** — a learned mathematical component that turns input into a prediction, generation, classification, ranking or other result. See Chapter 2.
- **Model types** — models built for different jobs, including generation, classification, prediction, ranking, vision and speech. See Chapter 2.
- **Multimodal model** — a model that works across more than one type of input or output, such as text and images. See Chapter 2.

### N–R

- **Observability** — records that make system behaviour inspectable, such as routes, tool calls, errors and approvals. See Chapter 6.
- **Open source AI** — an AI system supplied with freedoms and information needed to use, study, modify and share it under the applicable definition and licence. See Chapter 6.
- **Open-weight model** — a model whose learned weights are available under stated terms, without necessarily providing every training or system component. See Chapter 6.
- **Parameters** — learned numerical values adjusted during training and used by a model during inference. See Chapter 2.
- **Permission** — an enforced boundary on what information or action a person, product, tool or workflow may access. See Chapter 4.
- **Prediction model** — a model that estimates an outcome or value from input. See Chapter 2.
- **Product / app** — the interface and surrounding service a person uses; it may combine models, data, rules and tools. See Chapter 1.
- **Prompt** — input that directs or supplies material to a model; prompts can include more than a visible user message. See Chapters 1 and 3.
- **Prompt injection** — untrusted content designed to redirect a model or tool-using workflow. See Chapter 6.
- **Provider** — the organisation that supplies a model, service or product. A provider is not the same thing as the model. See Chapters 1 and 6.
- **RAG** — retrieval-augmented generation: retrieve selected material, add it to context and generate using that material. See Chapter 3.
- **Reasoning model** — a product or model label for systems designed to spend more inference work on multi-step problems; the label does not guarantee correct reasoning. See Chapters 2 and 6.
- **Retrieval** — searching a collection and bringing selected material into the current task. See Chapter 3.
- **Routing** — choosing which model, tool, source, workflow or human queue receives a request. See Chapter 4.
- **Rule** — a condition the system is intended or required to follow; enforcement matters. See Chapter 4.

### S–W

- **Sampling / temperature** — controls that influence how a generative model selects among possible next outputs; they affect variation, not truth. See Chapter 2.
- **Sandbox** — an isolated environment intended to limit what running code or a tool can reach or change. See Chapter 4.
- **Schema / structured output** — a required arrangement of fields and types used to make handoffs more consistent. See Chapter 5.
- **Session** — a product-defined container or period for related interaction. See Chapter 3.
- **Skill** — a packaged instruction set, workflow or capability for a named job; usage varies by system. See Chapters 4 and 5.
- **Sub-agent** — a specialised delegated agent or process inside a larger workflow. See Chapter 5.
- **Token** — a piece produced when a tokenizer converts text into units a language model can process; it may be a word, part of a word, punctuation, a space or an individual byte. [Go to the tokenization walkthrough](#how-a-sentence-becomes-tokens).
- **Tool** — a capability the surrounding system can invoke, such as search, calculation, code execution or an action in another service. See Chapter 4.
- **Training** — the process that adjusts model parameters from examples before the current task. See Chapter 2.
- **Training data** — the examples or material used during training; it is not automatically the same as context supplied during your task. See Chapter 2.
- **Vector search** — similarity search using numerical representations such as embeddings. [See Retrieval in Chapter 3](#chapter-3).
- **Verification** — checking whether a claim is supported, current and applicable for the decision. See Chapter 6.
- **Workflow** — an organised sequence of model, software, tool and human steps. See Chapter 5.
- **Wrapper** — software that provides a simpler or more specific interface around another component; usage varies. See Chapter 4.

### Sources, currentness and corrections

This draft was fact-checked through **7 August 2026** against primary standards, definitions and research. Product labels and technical usage can change, so the source set must be checked again before public release and whenever a source or defined term changes.

- [OECD definition of an AI system](https://oecd.ai/en/wonk/definition)
- [Google's machine-learning glossary](https://developers.google.com/machine-learning/glossary)
- [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [NIST AI test, evaluation, validation and verification](https://www.nist.gov/ai-test-evaluation-validation-and-verification-tevv)
- [Retrieval-Augmented Generation research paper](https://arxiv.org/abs/2005.11401)
- [Model Context Protocol specification](https://modelcontextprotocol.io/specification/2025-03-26/index)
- [Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition)

To report a factual or teaching correction, email [hello@laidies.ai](mailto:hello@laidies.ai). Do not include confidential work material or personal information in the message.
