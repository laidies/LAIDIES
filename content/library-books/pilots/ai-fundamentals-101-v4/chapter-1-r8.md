# Chapter 1: How AI changed, and what all those names mean

The words have escaped the lab and are now breeding in PowerPoint. And we bet you two bucks that the person giving the presentation likely doesn’t know what many of these terms actually mean.

Predictive AI. Generative AI. Multimodal AI. Agentic AI. Artificial general intelligence. Someone says one as if it explains everything. Then someone else adds three more, draws an arrow and changes the subject before questions.

The confusion is not yours. These names were coined at different times to describe different developments. Some tell us **how an AI system was built**. Some tell us **what it can do**. Some tell us **what kinds of information it can work with**. Some describe **how independently it can carry out a task**. The biggest terms make claims about **how wide its abilities are**.

Trying to learn them as one flat list makes the reader solve an organisational puzzle before she has learned the ideas. The list is the problem.

So we are going to do this in the order the ideas make sense. We will begin with AI itself. Then we will follow the major changes that brought us from hand-written expert knowledge to machine learning, predictive systems, generative systems and today’s agents. Only after that will we meet the proposed future categories: artificial general intelligence and artificial superintelligence.

By then, the labels will not be a vocabulary test. They will tell you something useful.

## Start here: what is artificial intelligence?

**Artificial intelligence**, or **AI**, is the broad field of building computer systems that can use information to work out a result for a task.

That result might be:

- recognising that a photograph contains a dog;
- estimating whether a bank transaction looks suspicious;
- choosing which search result should appear first;
- recommending a route;
- creating an image or an email; or
- planning the next move in a game.

The important phrase is **work out a result**. The exact answer is not simply stored in advance under *Tuesday’s answer: dog*. The system applies human-written knowledge, patterns learned from examples or a mixture of both to the case in front of it.

Open the photographs on your phone and search for “dog.” The phone can find photographs containing dogs even though you never typed *dog* underneath them. It has a way to examine the image and decide which visual patterns are likely to belong to a dog.

That is a real AI task. No robot voice. No dramatic red eye. Just 426 photographs of your dog, including 38 in which she appears to be judging you.

AI is the name of the whole field. It is not one machine, one method or one particular chatbot. To understand the types inside it, we need to see how the field changed.

## First came AI built from human knowledge

Early AI researchers could not hand a computer millions of examples and ask it to learn. The computing power and giant digital collections of data we have now did not exist. Instead, people tried to put human knowledge into a form a computer could use.

One important approach was the **rule-based expert system**.

An expert system was built for a narrow area such as medical diagnosis, mineral exploration or equipment repair. Specialists supplied facts and reasoning rules. The computer applied many connected rules to the details of a new case and worked towards a conclusion.

Imagine a medical expert system receiving symptoms and test results. One rule may connect a particular result with a possible infection. Another may rule that infection out when a second result is absent. A third may say which treatment should not be used because of an allergy. The system combines the relevant rules and can show the chain that led to its suggestion.

That is different from one ordinary automatic instruction such as:

> If an expense is above $500, send it to a manager.

That instruction may be useful, but it is simply a business rule. Calling every `if this, then that` instruction AI would make your kettle an artificial-intelligence pioneer because it switches off when the water boils.

A rule-based expert system earns its place in AI history because it represents a body of specialist knowledge and uses reasoning rules to solve a new problem inside that specialist area. The knowledge comes from people. The computer can apply it quickly and consistently, but it does not discover the rules from examples.

This approach mattered enormously. It also had limits. Experts had to identify and maintain the knowledge. Real life contains awkward exceptions. A system could be brilliant inside the rules it had and completely lost one step outside them. Very clever filing cabinet; no improvisational jazz.

## Machine learning lets the computer find patterns in examples

The next major approach changed where the working knowledge came from.

With **machine learning**, people give a computer many examples and a method for improving at a task. During a process called **training**, the system adjusts itself as it looks for patterns that help it produce better answers.

Suppose we want a system to separate spam from genuine email.

We could try to write every spam rule ourselves: capital letters, twelve exclamation marks, suspicious links, the sudden news that we have won a cruise we never entered. Spammers would change their wording by lunchtime and our rule book would need its own full-time staff.

With machine learning, developers can instead provide many emails that have been labelled *spam* or *not spam*. The system examines them and adjusts its internal pattern-finding machinery so that it becomes better at classifying a new email it has never seen before.

Training is the study period. Using what was learned on a new email is the work period. We will take that machinery apart later in the book. For now, the relationship to remember is:

> **Machine learning is one major way of building AI. It sits inside the wider field of artificial intelligence.**

Not all AI is machine learning. The expert systems we just met used human-supplied knowledge and rules. Many current products combine learned patterns with ordinary software and explicit rules.

## Predictive AI uses patterns to estimate a new case

Once systems could learn from examples, they became useful for a large family of tasks: estimating something about a new case.

**Predictive AI** uses available information and learned patterns to estimate a category, number, order or likely outcome.

For example:

- A spam filter estimates whether a new message belongs in *spam* or *not spam*.
- A bank system estimates how unusual a transaction appears.
- A delivery system estimates an arrival time.
- A search system estimates which results are most relevant and puts them in order.
- A streaming service estimates what you may want to watch and recommends the highest-ranked options.

These results have different names. Choosing a category is often called **classification**. Estimating a number is a **prediction** or **forecast**. Putting options in order is **ranking**. Presenting a likely useful option is a **recommendation**.

They belong together here because the system is using patterns from earlier information to estimate something about the case in front of it.

Take the streaming service. It has information about programmes, viewing behaviour and the current context. It estimates how relevant each programme may be, ranks the options and shows recommendations near the top. One recommendation can therefore contain several linked steps.

It can also go wrong at several linked steps. The service may misunderstand the programme, learn too much from one accidental viewing or rank for keeping you on the sofa rather than improving your evening. Watch one bleak Nordic crime drama and suddenly the algorithm has planned your entire emotional winter.

Predictive does not mean psychic or certain. It means the system produces an estimate from the information and patterns available to it.

## Deep learning made much more complicated patterns possible

**Deep learning** is a type of machine learning. It uses large structures called **neural networks** with many connected layers.

A neural network is not a tiny artificial brain hiding in the laptop. It is a mathematical structure with many adjustable parts. During training, those parts change as the system gets feedback about how well it is doing.

The layers allow the system to build increasingly useful representations. In an image system, early layers may respond to simple visual features such as edges. Later layers can combine those signals into shapes, textures and larger patterns that help distinguish a dog from a handbag abandoned on the sofa.

Deep learning became especially important for images, speech and language because those forms contain far too many messy variations for people to describe every useful rule by hand.

The family relationship is:

> **Artificial intelligence contains machine learning. Machine learning contains deep learning.**

That is a true nesting relationship. The next labels will not all fit inside one another so neatly.

## Generative AI creates new content

For years, much of the AI people encountered was quietly predictive: spam filters, fraud scores, search rankings and recommendations. Then **generative AI** became widely available and dramatically more visible.

**Generative AI produces new content in response to a request.** That content can be text, an image, audio, video, software code or another created output.

Suppose you paste rough meeting notes into an AI assistant and ask for a follow-up email. The assistant is not usually retrieving one completed email from a filing cabinet marked *Brenda’s chaotic Tuesday meeting*. It creates a new draft for this request using patterns learned during training and the information you supplied now.

That is the essential difference:

- A predictive system may estimate which existing email is spam.
- A generative system may create a new email.

Generative AI is commonly built with deep learning. A language model generates text by repeatedly estimating what small piece could sensibly come next. Those internal predictions help it perform the visible job of creating content.

This is why people sometimes say that generative AI “predicts.” They are describing the mechanism inside the system, not saying that *Predictive AI* and *Generative AI* are identical product labels.

The new content can be useful, original-seeming and impressively fluent. It can also be wrong. The system is constructing an output that fits learned patterns; it is not automatically consulting a little internal librarian who refuses to release a sentence until every fact has two sources and a permission slip.

## Multimodal AI connects more than one form of information

Text is one form of information. Images, sound, video and sensor readings are others. Each form is called a **modality**.

A **multimodal AI** system can work across more than one form of information.

You might upload a photograph of a broken office chair and type, “Describe the damage and draft a repair request.” The system must connect the words in your instruction with the chair and the visible damage in the image. It then produces a written response.

That interaction can be both:

- **multimodal**, because the system works with text and an image; and
- **generative**, because it creates a new written request.

Multimodal does not tell us the system’s intelligence level. It does not mean the product can do every task. It tells us which forms of information the system can connect.

This is our first clear example of two labels describing different things about the same product. They are not rival boxes. One describes the information; the other describes the result.

## Agentic AI can pursue a goal through several steps

A standard AI interaction often ends after one response. You ask for a summary; the system gives you a summary.

An **agentic AI system** can take a goal, work through several steps, use tools, examine what happened and choose what to do next.

Imagine a travel assistant with permission to search approved booking services. You ask it to find three train-and-hotel options that meet your dates and budget. It searches, compares results, notices that one hotel is sold out, changes the plan and brings you the remaining options. It stops before booking and asks you to choose.

The AI model is one part of that larger system. The complete agentic setup may also include instructions, tools, access permissions, a record of what has happened and rules about when to stop or ask a person.

That last point matters: **an agent can stop and still be agentic**. Stopping at an approval point can be evidence that it is behaving properly. The important feature is not that it runs forever like a washing machine possessed. It is that it can continue through a goal, actions and results rather than producing only one answer.

Agentic AI often uses a generative model to interpret the goal and decide what to do next. But *agentic* describes the behaviour of the larger system, not a new species of language model. An agentic system can remain highly specialised. It is not automatically artificial general intelligence.

## Embodied AI senses or acts in the physical world

So far, our examples have acted mainly in software. **Embodied AI** connects AI to a physical body or machine that can sense, move or change the physical world.

A robot vacuum uses sensors to detect its surroundings and controls motors to move. A warehouse robot may identify an object, plan a route and move it. A driver-assistance system may interpret camera or radar information and influence steering or braking.

The body does not have to look human. Wheels, cameras and one determined little brush for attacking crumbs under the sofa are quite enough.

Embodied tells us that the AI is connected to physical sensing or action. The system may also be predictive, multimodal, agentic or several of those at once.

## Specialised and general-purpose describe how wide the system’s uses are

Now we can ask a different question: how wide is the range of work the system can do?

A **specialised AI** system is built for a bounded area of work. A spam filter classifies email. A medical-image system looks for particular patterns in scans. A warehouse-routing system plans movement inside its defined environment.

A **general-purpose AI** system can be used across many different kinds of work. One current assistant may draft an email, explain a contract clause, help with software code and interpret an image.

General-purpose does not mean equally good at everything. It means the same underlying capability can support a broad range of uses. A Swiss Army knife has several tools; it has not therefore become a fully qualified plumber, surgeon and pastry chef.

This distinction describes breadth of use. It does not tell us whether the system is generative, multimodal or agentic. A general-purpose model can sit inside a specialised product. For example, a broadly capable language model may be used inside a customer-service assistant that has one narrow business job.

## Artificial general intelligence is a disputed proposal

**Artificial general intelligence**, usually shortened to **AGI**, is a proposed category for an AI with genuinely broad, adaptable intelligence.

There is no universally accepted definition or test. But the idea usually asks for much more than a current product doing several impressive tasks.

An AGI would be expected to use knowledge across a wide range of unfamiliar intellectual problems, learn new tasks, transfer what it learned from one situation to another and adapt when the situation changes. Reliability matters too. One dazzling answer followed by three baffling failures is not robust general intelligence.

Picture the difference this way. A current general-purpose assistant may help with travel, writing and code because it has learned broad patterns and is supported by tools. A claimed AGI would need to show that it can enter genuinely unfamiliar intellectual territory, learn what the new situation requires, connect it with relevant knowledge and keep performing reliably without engineers building a new system for each task.

Researchers and companies disagree about which abilities, performance levels and tests should count. Some use AGI to mean human-level ability across most cognitive work. Others use different thresholds. That disagreement is part of the definition, not an annoying footnote we can hide under the carpet.

LAiDIES does **not** classify today’s products as AGI. Broad usefulness is not the same as demonstrated general intelligence.

## Artificial superintelligence is hypothetical

**Artificial superintelligence**, or **ASI**, is the hypothetical idea of an artificial intelligence that greatly exceeds the best human abilities across most or all important intellectual fields.

This does not mean a calculator being faster at arithmetic or a chess system defeating a champion. Machines have exceeded people at bounded tasks for decades. ASI describes a much broader proposed capability: science, strategy, invention, persuasion, planning and other intellectual work at levels beyond ours.

No ASI exists. There is no agreed test, timeline or proven route from current systems to one. It belongs in the book because people use the term in news, policy and arguments about the future. It must not be presented as the next scheduled product release.

An arrow in PowerPoint is not a time machine.

## Put the labels together on one real product

Return to the travel assistant.

It may use **machine learning** and **deep learning** inside the models that handle language and search results. It is **generative** when it writes a new itinerary. It is **multimodal** if it connects your written request with a screenshot of dates or a photograph of a paper confirmation. It is **agentic** if it can search, compare, revise its plan and return after several steps. The finished travel product is still **specialised** because travel planning is its bounded job.

None of those facts makes it artificial general intelligence.

The labels fit because they answer different questions:

| Question | What we are trying to learn | Examples of labels |
|---|---|---|
| How did it get its working knowledge? | Was knowledge written by people, learned from examples or both? | rule-based expert system, machine learning, deep learning |
| What result does it produce? | Does it estimate, rank, recommend, generate, plan or control? | predictive, generative |
| What information can it connect? | Does it work with text, images, sound, video or sensor readings? | multimodal |
| Can it continue through actions? | Does it pursue a goal through steps, tools and results? | agentic |
| Does it sense or act physically? | Is the AI connected to a body or machine? | embodied |
| How wide are its abilities? | Is it bounded, broadly useful, disputed general intelligence or hypothetical superintelligence? | specialised, general-purpose, AGI, ASI |

You do not need to ask all six questions every time you use an AI product. The table is here to stop one shiny label from pretending it told you everything.

## A short timeline of the ideas

- **1950s and 1960s:** Artificial intelligence becomes a named research field. Early work explores search, reasoning, games and symbolic problem-solving.
- **1970s and 1980s:** Rule-based expert systems become prominent in specialised domains.
- **1990s and 2000s:** Machine-learning methods grow more practical as digital data and computing increase. Predictive systems spread through search, spam filtering, fraud detection and recommendations.
- **2010s:** Deep learning produces major advances in image recognition, speech and language.
- **Late 2010s and early 2020s:** Large generative models become far more capable and widely accessible.
- **2020s:** Multimodal products expand and *agentic AI* becomes a popular label for systems that use models, tools and repeated steps to pursue goals.

The dates overlap. Old methods do not vanish when a new one arrives. A current product can contain ordinary software, human-written rules, machine-learning models and a generative interface all at once.

## Check that the story now holds together

### Recognise it

Match each description to the most useful label.

1. A system estimates how likely a payment is to be fraudulent.
2. A system creates a new product description from notes.
3. A system connects a spoken question with an image.
4. A system searches approved services, compares results and asks before taking the final action.
5. A robot uses cameras to identify boxes and moves them through a warehouse.

**Reasoned answers:** 1 is predictive. 2 is generative. 3 is multimodal. 4 is agentic. 5 is embodied and may also be predictive, multimodal and agentic depending on how the complete system works.

### Explain it

How is machine learning related to artificial intelligence? How is deep learning related to machine learning?

**Reasoned answer:** Artificial intelligence is the broad field. Machine learning is one approach inside AI that learns useful patterns from examples. Deep learning is one type of machine learning that uses layered neural networks.

### Draw it

Draw three nested circles: **Artificial intelligence → Machine learning → Deep learning**.

Beside the circles, write **Generative**, **Multimodal**, **Agentic** and **Embodied** as separate labels. Connect each label to the question it answers: result, information forms, steps and tools, or physical action. This prevents a true family relationship from being mixed with labels that describe different properties.

### Use it

Your workplace is considering an “agentic multimodal recruitment assistant.” What do those words tell you, and what do they leave unanswered?

**Reasoned answer:** *Multimodal* suggests the system can connect more than one form of information, perhaps written applications and recorded interviews. *Agentic* suggests the complete system may work through several steps or tools towards a goal. The labels do not tell us which decisions it makes, whether it ranks people, what data it uses, how accurate or fair it is, what permissions it has, where a person reviews its work or whether it should be used for recruitment at all.

## Key Definitions

**Artificial intelligence (AI):** the broad field of building computer systems that use information to work out results for tasks such as recognising, estimating, recommending, creating or planning.

**Rule-based expert system:** a specialised AI system that applies a body of human-supplied knowledge and linked reasoning rules to a new case.

**Machine learning:** an approach inside AI in which a system improves at a task by finding useful patterns in examples.

**Training:** the process in which a machine-learning system adjusts as it learns from examples and feedback.

**Predictive AI:** AI that estimates a category, number, order or likely outcome from available information and learned patterns.

**Deep learning:** a type of machine learning that uses neural networks with many connected layers.

**Generative AI:** AI that produces new content in response to a request.

**Multimodal AI:** AI that can work across more than one form of information, such as text and images.

**Agentic AI:** an AI system that can pursue a goal through several steps, tools and results rather than producing only one response.

**Embodied AI:** AI connected to a physical body or machine that can sense, move or act in the physical world.

**Specialised AI:** AI built for a bounded area of work.

**General-purpose AI:** AI whose underlying capabilities can be used across many kinds of work.

**Artificial general intelligence (AGI):** a disputed proposed category for broadly capable, adaptable artificial intelligence. There is no universally accepted definition or test.

**Artificial superintelligence (ASI):** a hypothetical artificial intelligence that would greatly exceed the best human abilities across most or all important intellectual fields.

### Sources and freshness

Checked 10 August 2026 against the OECD definition and classification framework, Stanford HAI’s expert-system explanation, NIST’s Generative AI Profile, Google’s machine-learning glossary, Anthropic’s engineering explanation of agents, Google DeepMind’s proposed Levels of AGI framework and the *International AI Safety Report 2026*. Terminology, product capabilities and AGI claims require rechecking before publication.

## See more at LAiDIES

- Visit the **NewsStand** for dated reporting about current AI systems and claims.
- Revisit **Episode 2** for the Spice Girls prompting lesson: tell the AI what you want, what you really, really want.
- Revisit **Episode 3** for the Burn Book lesson about information that sounds authoritative without adequate support.
- A dedicated **Tribune** article about AGI and ASI is needed but is not yet published. No fake link appears here.
