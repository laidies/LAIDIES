# AI Fundamentals 101

## Introduction: AI Is Already in the Room

By the end of this introduction, you will be able to answer:

- Why is the label “AI” not enough to understand a product or proposal?
- What is the shortest useful map of an AI system?
- Which three questions turn a vague AI claim into something you can examine?

### Why this matters before the next AI decision

You are in a meeting. A slide appears: **AI-powered customer experience**.

Everyone nods in the solemn way people nod when a phrase sounds expensive. Then the conversation gallops straight to licences, launch dates and how much time this will supposedly save.

One small detail has gone missing: what is the AI actually going to do?

It might sort incoming messages. It might predict which customers are likely to leave. It might search company policies and draft replies. It might listen to calls and produce summaries. It might be allowed to issue a refund without waiting for a person.

Those are not five versions of the same idea. They need different information, produce different results and create different consequences when they are wrong. “It uses AI” tells you roughly as much as “it uses electricity.” True, perhaps. Not yet the bit on which you should reorganise a department.

This is why AI literacy matters. AI is already involved in the recommendations you see, the fraud alerts your bank investigates, the job applications a company sorts, the routes a map suggests and the software your colleagues are being asked to use. You do not need to become an engineer to ask intelligent questions about any of that. You do need a map.

This book builds that map from the ground up. Not a parade of terms to memorise. Not a breathless list of products that will be out of date before the bookmark arrives. We are going to work out what the main parts are, what each part does, how they fit together and where you meet them in ordinary life.

The goal is the deeply satisfying moment when a technical conversation stops sounding like weather and starts sounding like a system you can inspect.

### The first map of an AI system

Here is the shortest useful version:

**Input → AI system → output → consequence**

An input is what enters the system: a photo, a sentence, a customer record, a sensor reading or a goal supplied by a person or another piece of software.

The AI system processes that input. Inside it may be a trained model, instructions, ordinary software rules, retrieved information and connections to other tools. We will meet each part properly. For now, the important point is that the system is more than the little box you type into.

The output is the result it produces: perhaps a prediction, a ranking, a recommendation, a block of text, an image or a proposed action.

Then something happens. A person reads the answer. An app rearranges a list. A fraud team investigates a payment. A connected tool sends an email or books an appointment. That final step is where a technically impressive output becomes useful, annoying, funny, expensive or genuinely consequential.

Take a spam filter. The input is an incoming email. The system examines patterns in it. The output is a prediction about whether the message is spam. The consequence is that the email lands in your junk folder or your inbox.

That sounds almost too ordinary to count as AI. Good. AI becomes easier to understand as soon as it stops arriving under theatrical lighting.

This map also tells us where questions belong. If a fraud system flags the wrong payment, the problem might involve its input data, the model’s prediction, the threshold chosen by the company or the action taken after the prediction. Saying “the AI got it wrong” may be accurate, but it is not yet a diagnosis.

### Three questions that replace the vague label

The next time someone says a product “uses AI,” ask:

1. **What result does it produce?** Does it recognise something, predict something, rank options, recommend one, generate content or propose a next step?
2. **What does it use to produce that result?** Which inputs, model, instructions, company information, tools and human rules are involved?
3. **What happens after the result?** Does a person decide what to do, does software act automatically, and who can stop or correct it?

Return to our customer-service meeting. “AI-powered” becomes far more useful when the answer is:

> It reads the customer’s message, searches the current returns policy, drafts a reply and shows the supporting policy section to an employee. The employee edits and sends it. The system cannot issue a refund.

Now we can have a real conversation. Is the returns policy current? Does the search find the right section? Can the employee see when the draft is uncertain? Are customer details protected? What evidence shows that this improves service rather than merely producing replies at Olympic speed?

The three questions do not prove that a system is good, safe or worth buying. They do something earlier and more useful: they reveal which system is actually being discussed.

**Draw it:** Pick one AI feature you have used this week. Draw four boxes for input, system, output and consequence. Put one concrete item in each box.

**Explain it:** Why can two products both “use AI” and still require completely different questions?

**Use it:** In the next AI conversation, replace “What can the AI do?” with the three questions above.

---

## Chapter 1: What Kind of AI Is This?

By the end of this chapter, you will be able to answer:

- Why can very different systems all count as AI?
- What do predictive, generative, multimodal, agentic and embodied describe?
- What are AGI and ASI, and do we have either today?
- How can several AI labels apply without contradicting one another?

### AI is an umbrella, not one machine

There is no single object called “the AI” hiding behind every clever product.

AI is a broad field concerned with machine-based systems that infer outputs from inputs. Those outputs can include predictions, content and recommendations. The systems do not all perform the same task, use the same method or have the same level of independence.

A phone recognising your face, a bank estimating the chance that a payment is fraudulent and an image generator responding to a prompt can all sit under the AI umbrella. That does not mean they work identically. It means each uses a machine-based process to infer a result rather than simply replaying one fixed answer for every case.

When people argue about “what type of AI” something is, they are often answering different questions without noticing. One person is describing the job. Another is describing the kind of input. A third is describing whether the system continues through several steps. The vocabulary becomes much tidier once we ask which question a label answers.

### Systems that recognise, predict, rank and recommend

Many AI systems do not generate essays or pictures. They estimate, sort and select.

**Recognition** identifies a pattern or category in an input. Your phone may compare a face with the one enrolled on the device. A photo app may identify that an image contains a dog.

**Prediction** estimates an unknown or future result. A bank may estimate the likelihood that a payment is fraudulent. A company may estimate which equipment is likely to fail.

**Ranking** puts options in an order. A search system may rank pages by estimated relevance. A hiring product might rank applicants, which is a much more consequential use and deserves much stronger evidence and scrutiny.

**Recommendation** presents one or more options judged likely to be useful or appealing. A streaming service may recommend a film after ranking thousands of possibilities.

These jobs can form a chain. A system recognises features in your recent activity, predicts which films you might enjoy, ranks candidates and recommends the first few. The tiles on screen look simple because the complicated part happened before they arrived.

Notice that the system is not necessarily predicting what you will *love*. It may be predicting what you will click, finish or keep watching. The objective matters. A recommendation can be perfectly optimised for the company’s chosen measure and still leave you wondering how you have spent forty minutes watching clips of increasingly argumentative geese.

### Generative and multimodal AI

**Generative AI** produces new content in response to an input. The output might be text, an image, audio, video or code. “New” does not mean created from nowhere, and it does not guarantee originality, accuracy or usefulness. It means the system generates an output rather than only assigning an input to a category or score.

A language model can generate a draft email. An image model can generate a picture from a written description. A music model can generate an audio sequence.

**Multimodal** answers a different question. A modality is a kind of information, such as text, image or audio. A multimodal system can work across more than one. You might give it a photograph and a written question, then receive a written answer. Or you might speak to it and receive both text and audio.

A system can therefore be generative and multimodal at the same time. Generative describes what it does with content. Multimodal describes the kinds of information it can receive or produce.

That distinction is useful in real life. “It can read images” does not tell you whether it classifies them, describes them, edits them or uses them as context for another task. Again, the label opens the question. It does not finish the explanation.

### Agentic and embodied systems

A basic chatbot waits for a message, produces an answer and stops. An **agentic system** is designed to continue through multiple steps toward a goal, choosing or adapting some of its next actions as it goes.

Suppose you ask a travel assistant to find three trains that arrive before noon, compare their prices with your policy, place the best option on hold and ask before purchasing. To do that, the system may need to plan, search, inspect results, use tools, notice a failed request and try another route. The language model may help decide what to do next, but the product’s tools, permissions, rules and software make the continued action possible.

Agentic does not mean conscious. It does not mean reliable. It does not even guarantee that the system’s plan is a good one. It describes an operating pattern: the system continues through actions rather than returning one answer and waiting.

An **embodied AI system** interacts through a physical body or physical environment. A warehouse robot that perceives shelves and moves objects is embodied. So is an autonomous vehicle. An embodied system may use agentic behaviour, but the two words are not synonyms. A software agent can act through digital tools without having wheels, arms or an alarming habit of approaching the stairs too quickly.

### AGI and ASI

AGI stands for **artificial general intelligence**. It usually refers to a proposed system with broad intellectual capability that can learn, reason and transfer what it knows across a wide range of unfamiliar tasks. There is no universally accepted definition or test. Experts, laboratories and public institutions use the term differently, which is why a confident AGI deadline should always arrive with a definition attached.

Current general-purpose AI can perform an impressive variety of tasks. That is not the same as establishing AGI. Breadth on many tests, fluent conversation and the ability to use tools are evidence about particular capabilities. They do not settle a disputed category by themselves.

ASI stands for **artificial superintelligence**. It is a hypothetical system whose capabilities would substantially exceed human capability across a broad range of important domains. We do not have a verified ASI system.

AGI and ASI are not product settings, and they are not the next two compulsory stops after generative AI. They are claims about breadth and level of capability. The route from current systems to either one is uncertain. Treating it as an inevitable upgrade sequence turns an open scientific and social question into a software release calendar.

### Tell Me More: How the labels overlap

Imagine a tool that accepts a photograph of a damaged machine and a written maintenance log, identifies the likely fault, drafts repair instructions and, with permission, orders the correct part.

It may be:

- **multimodal**, because it uses image and text;
- **generative**, because it drafts instructions;
- **predictive**, because it estimates the likely fault;
- **agentic**, if it continues through tool use and ordering steps.

Those labels do not compete. They describe different properties of the system. None of them proves that it is AGI. None tells us whether the diagnosis is accurate, whether the part catalogue is current or whether the system should be allowed to order anything without approval.

The useful organising questions are:

- What task does it perform?
- Which kinds of information does it handle?
- Does it return one result or continue through actions?
- How broad is the capability being claimed?

**Draw it:** Put one familiar AI product in the centre of a page. Around it, add separate branches for task, information type, operating pattern and claimed breadth.

**Explain it:** Why can a product be generative and multimodal without those labels meaning the same thing?

**Use it:** When you see a dramatic AI label, ask which property it describes and which important properties it leaves out.

---

## Chapter 2: What Is Actually Inside an AI Product?

By the end of this chapter, you will be able to answer:

- What is the difference between an interface, a product, a model and a company?
- What work happens around the model?
- Why can the same model behave differently in two products?
- Where do tools, information, computers and people fit?

### The product you can see

When you open an AI assistant, you see an interface: perhaps a text box, microphone, upload button and a suspiciously cheerful invitation to “ask anything.”

The interface is not the whole product. It is the part through which you interact with a larger system. Behind it, software may authenticate your account, assemble instructions, choose a model, retrieve information, check permissions, call tools, store selected details and decide how the result appears.

This distinction matters because people often attribute every product behaviour to “the model.” If an assistant remembers your preferred writing style, that memory may be stored by the product and supplied again later. If it can search your company documents, the product may be retrieving those documents and placing relevant passages into the model’s input. If it can send an email, the product has connected it to an email tool and granted some level of permission.

The model is important. It is not working alone in a tasteful little studio.

### The model inside the product

An AI **model** is a trained component that maps inputs to outputs. Its behaviour is shaped during training by adjusting many numerical values called parameters.

For a language model, the input may be a sequence of tokens representing your message and other context. The output is a set of probabilities used to generate what comes next. For an image classifier, the input may be pixel values and the output may be probabilities for possible categories.

The model is not the interface, the complete product or the company that provides it. One company can offer several models. Several products can use the same model. A product can switch models without looking very different on the surface.

That is why “Which model does it use?” is a useful question but not a complete investigation. It is rather like asking which engine is in a car and assuming you now understand the brakes, steering, speed limits, driver and destination. The model is a central working component; the behaviour you experience comes from the assembled system.

### Instructions, rules and orchestration

Before your message reaches a model, the product may add instructions that define the model’s role, available information, output format and boundaries. It may also apply ordinary software rules: check that a file type is allowed, remove certain private details, request approval before a tool is used or reject an output that violates a policy.

The software that coordinates these steps is often called **orchestration**. It decides which component is called, in which order, with what information and what may happen next.

Two products using the same underlying model can therefore behave very differently. One may give the model current company documents, require citations and prevent external actions. Another may provide no documents, ask for a short answer and allow several tools. The model matters, but product design determines the situation in which the model operates.

This is also why comparing models through one polished product can be misleading. You may be comparing interfaces, hidden instructions, retrieval systems, safety rules and tool connections at the same time.

### Information, memory and tools around the model

Models do not automatically know every current fact, private company policy or detail from your previous conversation. Products can supply additional information when it is needed.

**Retrieval** finds relevant material from an allowed source and adds it to the model’s current input. A workplace assistant might retrieve sections of the staff handbook before answering a holiday-policy question.

**Product memory** stores selected information outside the model so it can be supplied in a later interaction. Memory is a product feature with design, privacy and control choices. It is not evidence that the model has been retrained around you personally.

**Tools** let the product do work beyond generating an answer. A tool might search a database, use a calculator, check a calendar or send a message. The surrounding system decides which tools exist and what permissions apply.

These components will receive full chapters later because each introduces its own strengths and failure points. For now, place them around the model in your mental picture, not mysteriously inside it.

### Computers, companies and people

AI can feel weightless because the result appears as words on a screen. It is not.

Training and running models require physical computers, data centres, electricity, networks and specialised hardware. A model must be hosted somewhere and delivered through software that can handle requests at the required speed and scale.

People and organisations choose the system’s objective, training approach, product rules, data access, permissions, evaluation methods and deployment setting. Other people use its outputs, challenge them, correct them or discover that there is no obvious way to appeal.

Putting people in the map is not a sentimental extra. It prevents a common technical mistake: treating a system’s outcome as though it emerged from a model alone. The threshold that freezes a bank card, the policy that lets a tool send an email and the decision to use a ranking system in hiring are design and governance choices.

### Full Nerd Alert: How products assemble the parts

Large products are often divided into separate software services. The interface sends a structured request to an application service. That service may retrieve information, assemble instructions and send a request to a model service. The model service runs the model, a process called **inference**, and returns an output. The application may then check the output, call a tool or send the result back to the interface.

An **API**, or application programming interface, is an agreed way for software components to request information or actions from one another. Think of it as a defined handover: which request may be sent, in what form, and what kind of response comes back. The value of the comparison is the contract between components, not a tiny waiter living in the server cupboard.

Separating services can let a team change one component, control access or scale a busy part independently. It also creates more places where behaviour can change. A model update, retrieval error, expired permission or new orchestration rule can alter the result even when the interface looks exactly the same.

**Draw it:** Draw an interface at the top. Beneath it, place product software. Around a model, add instructions, retrieval, memory and tools. Under the whole system, add computing infrastructure. Beside it, add people and organisations making choices.

**Explain it:** Why can two products using the same model produce different answers and actions?

**Use it:** When a product behaves unexpectedly, ask which part could have produced the difference before blaming or praising the model alone.

---

## Chapter 3: How Does a Model Learn?

By the end of this chapter, you will be able to answer:

- How is machine learning different from writing every rule directly?
- What are neural networks, tokens, embeddings and parameters?
- What actually happens during training?
- What do transformers and attention do in a language model?
- How are training, post-training, evaluation and everyday use different?

### From written rules to learned patterns

Ordinary software can follow rules written directly by programmers. If an email subject contains a particular forbidden phrase, put it in spam. That works for cases the rule anticipates. It becomes exhausting when spammers vary spelling, wording, sender behaviour and a thousand other clues.

In **machine learning**, developers do not have to write every input-to-output rule by hand. They choose a learning method, examples and an objective. A training process adjusts a model so that it becomes better at producing the desired outputs on those examples and, crucially, on appropriate new cases it has not seen before.

For a spam model, the examples might be emails labelled spam or not spam. During training, the model learns numerical patterns associated with those labels. When a new email arrives, it uses those learned patterns to estimate a result.

This does not mean the model discovers perfect universal laws. It learns from the data, objective and procedure it is given. If those examples are narrow, misleading or unlike the setting where the model is used, the learned pattern may travel badly.

**Generalisation** is the ability to perform usefully on appropriate new inputs, not merely repeat the training examples. It is one of the central ambitions of machine learning and one of the reasons evaluation needs genuinely separate cases.

### Neural networks and deep learning

A **neural network** is a kind of machine-learning model made from connected layers of mathematical operations. Each layer transforms numerical input into another numerical representation. During training, the values controlling those transformations are adjusted.

The name was inspired by ideas about biological neurons, but a modern neural network is not a small synthetic brain. The useful explanation is mathematical: many connected calculations transform an input, layer by layer, into an output.

**Deep learning** uses neural networks with multiple learned layers. “Deep” refers to the depth of that layered computation, not to the model having profound thoughts while looking out of a rainy window.

Different layers can become useful for different patterns. In an image system, early processing may respond to simple edges and later processing may combine patterns useful for more complex features. In a language model, layers build contextual numerical representations that help predict what comes next.

Deep learning is part of machine learning, and machine learning is part of the wider AI field. Not all AI uses machine learning. Not all machine learning uses deep neural networks.

### Tell Me More: How language becomes model input

People see words and sentences. A language model processes numbers.

Before text enters the model, a **tokeniser** divides it into units called **tokens**. A token may be a whole short word, part of a longer word, punctuation or another recurring text unit. The exact split depends on the tokeniser. Tokens are then represented by identifiers the system can process.

An **embedding** turns a token or other item into a list of numbers. During learning, these numerical representations become organised so that patterns useful to the task are reflected in their positions and relationships.

If you pictured the representation space as an enormous, many-dimensional seating plan, items used in related ways would often end up with useful relationships in where they sit. This is not a dictionary definition of meaning. It is a learned numerical arrangement that helps the model compute with patterns in language.

Context matters. The word “bank” in “river bank” and “bank account” begins with the same visible spelling, but the surrounding tokens help later layers build different contextual representations.

### The training loop

Training a model is an enormous repetition of one basic loop:

1. Give the model an example.
2. Have it produce a prediction.
3. Measure how far that prediction is from the training objective.
4. Adjust the model’s parameters in a direction expected to reduce the error.
5. Repeat across many examples.

A **parameter** is one of the numerical values adjusted during training. Large neural networks can have vast numbers of them. A **loss function** turns the model’s error into a number the training process can work to reduce. **Optimisation** is the process used to update the parameters.

For a language model’s initial training, a common objective is predicting a missing or next token from context. Suppose the training text contains “She poured tea into the...” and the model assigns too little probability to “cup.” The loss measures the error. An optimisation method uses calculations from the network to make small parameter adjustments. Over many examples, the model becomes better at predicting token patterns.

The model is not storing each sentence in a row of little filing cabinets. Training distributes learned patterns across parameters. Models can sometimes reproduce material from training data, which is a real concern, but memorisation is neither a complete description of training nor the explanation for every generated sentence.

The objective defines what counts as “better” during that stage. Becoming better at next-token prediction does not automatically make a model truthful, helpful, fair or safe in every setting. Those are different properties requiring further methods and evidence.

### Full Nerd Alert: Transformers and attention

Most current large language models use an architecture called a **transformer**. The transformer was introduced as a way to process sequences using a mechanism called attention, alongside other learned transformations.

Attention helps the model calculate which earlier token representations are most relevant when building the representation for the current position. Consider: “Maya put the trophy in the suitcase because it was large.” To process “it,” the model needs relationships among the surrounding words. Attention creates weighted connections that help layers represent those contextual relationships.

This is not human attention, understanding or intention. It is a learned mathematical operation over representations. Its importance is practical: it lets the model use context flexibly rather than processing every relationship through one fixed nearby chain.

A transformer layer does more than attention. It also applies other learned transformations, combines information and passes the result onward. Across many layers, the model builds representations used to predict the next token. The generated token is added to the sequence, and the process repeats.

That is why a language model can produce a fluent paragraph one token at a time without having written the complete paragraph in advance. Each next-token distribution depends on the context available at that moment.

### Post-training and evaluation

Initial training on large collections of data gives a model broad pattern-prediction capability. It does not by itself make the model a useful assistant.

During **post-training**, developers may further adjust the model using examples of desired responses, human or AI feedback, and other optimisation methods. The aim might include following instructions, producing safer behaviour or becoming more useful for particular interactions.

Post-training changes behaviour, but it does not turn the model into an infallible source. A response can be polished and wrong. It can follow the requested format while misunderstanding the task. It can refuse something harmless or comply with something it should not.

**Evaluation** tests particular capabilities or risks under defined conditions. One evaluation might test mathematical reasoning. Another might examine factuality, bias, dangerous behaviour or performance in a work task. A benchmark score is evidence about performance on that benchmark and its conditions. It is not a lifetime guarantee for every person, prompt, language, product design or future model version.

Good evaluation therefore asks what was tested, with which version, against which comparison and in a setting close enough to the intended use to matter.

### Using the trained model

When you send a prompt to a deployed model, the model runs **inference**: it uses its learned parameters and the current input to produce an output.

Inference is different from training. Your prompt, attached file or correction can affect the current response because it becomes part of the current context. It does not ordinarily adjust the model’s underlying parameters on the spot.

A provider may separately store interactions, use them for product features or later use permitted data in improvement processes. Those are policy and system-design questions, not proof that the model “learned” your correction during that conversation.

This distinction clears up a very common puzzle. If you tell a chatbot your preferred format and it follows it later in the same conversation, that can happen through context. If a product remembers the preference next week, that may happen through external product memory. If the underlying model’s parameters change, that requires a training or updating process.

We can now connect the whole chapter:

**Training data and objective → training loop → learned parameters → post-training → evaluation → deployed model → inference on a new input**

The model you use is the result of the stages before deployment. The answer you receive is produced during inference inside a larger product. Keeping those two timelines separate will make almost every later AI concept easier.

**Draw it:** Draw the training loop, then draw a separate inference path. Training ends with adjusted parameters. Inference begins with a trained model plus a new input.

**Explain it:** Why does correcting a chatbot in one conversation not necessarily retrain its underlying model?

**Use it:** When someone says a model “learned” something, ask whether they mean training, current context, stored product memory or a later update.

---

## Concept Index for the beginning of the book

- **Agentic AI:** a system designed to continue through multiple actions toward a goal, adapting some next steps as it goes.
- **AGI:** a disputed proposed category of broad, transferable artificial intelligence; there is no universal definition or accepted test.
- **AI model:** a trained component that maps inputs to outputs inside a larger system.
- **AI product:** the complete visitor-facing application, including its interface, model access, software, information, tools and rules.
- **AI system:** a machine-based system that infers outputs from inputs; the complete system may include one or more models and surrounding components.
- **API:** a defined way for software components to request information or actions from one another.
- **ASI:** a hypothetical system whose capabilities substantially exceed human capability across a broad range of important domains.
- **Attention:** a learned mathematical mechanism that weights relationships among token representations in context.
- **Deep learning:** machine learning using neural networks with multiple learned layers.
- **Embedding:** a learned numerical representation used to compute useful relationships among items such as tokens.
- **Embodied AI:** AI that interacts through a physical body or physical environment.
- **Evaluation:** testing specified capabilities or risks under defined conditions.
- **Generative AI:** AI that produces new content such as text, images, audio, video or code.
- **Generalisation:** useful performance on appropriate new inputs, rather than only the training examples.
- **Inference:** using a trained model on a current input to produce an output.
- **Machine learning:** methods that adjust models from examples and objectives instead of requiring every input-to-output rule to be written directly.
- **Multimodal AI:** AI that works across more than one kind of information, such as text and images.
- **Neural network:** a machine-learning model made from connected layers of learned mathematical transformations.
- **Orchestration:** software coordination of models, information, rules and tools across a product workflow.
- **Parameter:** a numerical value adjusted during model training.
- **Post-training:** additional adjustment after initial training to shape model behaviour for intended interactions or constraints.
- **Retrieval:** finding relevant external information and supplying it to the model for a current task.
- **Token:** a unit into which text is divided for model processing.
- **Tool:** an external function a product can call, such as search, calculation, calendar access or sending a message.
- **Training:** the process of adjusting a model’s parameters using examples, an objective and measured error.
- **Transformer:** a neural-network architecture that uses attention and other learned transformations to process sequences.

## Source note

This review candidate is bound to `AI-FUNDAMENTALS-101-V4-INTRO-CH3-SOURCE-PACKET-2026-08-08.json`. The packet records the exact primary and institutional sources, scope limits and freshness triggers for the technical claims. Citations will be designed for the final reader experience after the prose and chapter architecture are accepted; they are not hidden or replaced by this note.
