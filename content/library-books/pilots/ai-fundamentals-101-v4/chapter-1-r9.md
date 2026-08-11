# Chapter 1: What all the AI names actually mean

The words have escaped the lab and are now breeding in PowerPoint. And we bet you two bucks that the person giving the presentation likely doesn’t know what many of these terms actually mean.

Predictive AI. Generative AI. Multimodal AI. Agentic AI. Artificial general intelligence. Someone says one as if it explains everything. Then someone else adds three more, draws an arrow and changes the subject before questions.

No wonder this feels confusing. The words do not all describe the same thing.

Some tell us **how a system got its working knowledge**. Some tell us **what result it produces**. Some tell us **what kinds of information it can connect**. Some tell us **what happens after it produces an answer**. Some tell us **whether it can act in the physical world**. And the biggest terms make claims about **how broad its abilities are**.

That means the names do not form one tidy family tree. Nor did each one arrive in history, tap the previous one on the shoulder and say, “Thank you, darling. I’ll take it from here.” The ideas overlap. Old approaches remain inside new products. One product can truthfully have several labels because each label answers a different question.

We are not going to dump the entire vocabulary drawer onto the bed and ask you to sort it. We are going to open one drawer at a time, explain why it exists and put each term somewhere you can find it again.

## Start with the biggest term: artificial intelligence

**Artificial intelligence**, or **AI**, is the field of making computer systems that can use information to do things such as recognise what is in a photograph, estimate what may happen, recommend an option, create something new or plan what to do next.

The edges of the field are debated. There is no magic test that turns every computer program into either *definitely AI* or *definitely not AI*. For this book, the useful distinction is this: an AI system applies human-supplied knowledge, searches through possible solutions, learns patterns from examples or combines those approaches to work out a result for the case in front of it.

Open the photographs on your phone and search for “dog.” Your phone can find photographs containing dogs even though you never typed *dog* beneath every picture. It examines the image and uses learned visual patterns to estimate which photographs contain a dog.

That is a real AI task. No robot voice. No dramatic red eye. Just 426 photographs of your dog, including 38 in which she appears to be judging you.

AI is the name of the whole field. It is not one machine, one method or one chatbot. So our first useful question is not *Which buzzword wins?* It is: **how did this system get the knowledge or patterns it uses?**

## How did it get its working knowledge?

There are several ways to build an AI capability. Two are especially important for understanding the systems around us now.

### People can supply knowledge and reasoning rules

A **rule-based expert system** contains knowledge about a narrow area, such as medical diagnosis, equipment repair or mineral exploration. Specialists supply facts and linked reasoning rules. The computer applies the relevant rules to a new case and works towards a conclusion.

Imagine a medical expert system receiving symptoms and test results. One rule connects a result with a possible infection. Another rules that infection out when a second result is absent. A third excludes a treatment because of an allergy. The system combines the rules that apply and can show the reasoning chain behind its suggestion.

That is not the same as one ordinary automatic instruction:

> **If an expense is above $500, send it to a manager.**

That instruction may be useful, but it is simply a business rule. Calling every *if this, then that* instruction AI would make your kettle an artificial-intelligence pioneer because it switches off when the water boils.

The difference is not that expert systems possess wisdom or common sense. They do not. The difference is that they represent a body of specialist knowledge and reason across connected rules to solve a new problem inside that specialist area.

### Machine learning finds useful patterns in examples

With **machine learning**, people give a computer many examples and a method for improving at a task. During a process called **training**, the system adjusts its internal machinery as it looks for patterns that help it produce better answers.

Suppose we want a system to separate spam from genuine email. We could try to write every spam rule ourselves: twelve exclamation marks, suspicious links, the sudden news that we have won a cruise we never entered. Spammers would change their wording by lunchtime and our rule book would need its own full-time staff.

Instead, developers can provide many emails labelled *spam* or *not spam*. During training, the system adjusts as it finds combinations of words and other signals that help distinguish the two. Later, when a new email arrives, it uses what it learned to estimate which category fits.

Training is the study period. Using what was learned on a new case is the work period. We will take both apart later in the book. For now, pin this relationship somewhere safe:

> **Machine learning is one major way of building AI. It sits inside the wider field of artificial intelligence.**

Not all AI is machine learning. Expert systems use human-supplied knowledge and reasoning rules. Many current products combine learned patterns, ordinary software, searches and explicit rules. The methods overlap in real products because useful systems are under no obligation to respect a neat textbook diagram.

### Deep learning is one kind of machine learning

**Deep learning** is a type of machine learning that uses large mathematical structures called **neural networks** with many connected layers.

A neural network is not a tiny artificial brain hiding in the laptop. It has many adjustable numerical parts. During training, those parts change as the system receives feedback about how well it is doing. The layers help it build increasingly useful ways of representing complicated information such as images, speech and language.

We will go much deeper into neural networks later. Right now, the relationship matters more than the machinery:

> **Artificial intelligence contains machine learning. Machine learning contains deep learning.**

That is a genuine family relationship. Draw three circles inside one another and it works. Most of the labels coming next answer different questions, so forcing them into those circles would produce precisely the sort of diagram that makes everyone nod politely while learning nothing.

## What result does it produce?

Now we know that *how it was built* is one question. Here is another: **what does the system actually produce for the person using it?**

There are more than two possible results. An AI system might recognise an object, choose a category, estimate a number, rank options, recommend something, create new content, plan a route or control a machine.

Two labels appear constantly because they describe two very common result families: **predictive AI** and **generative AI**. They are useful labels, not the only two answers available.

### Predictive AI estimates something about a new case

**Predictive AI** uses available information and learned patterns to estimate a category, number, order or likely outcome.

- A spam filter estimates whether a new message belongs in *spam* or *not spam*.
- A bank system estimates how unusual a transaction appears.
- A delivery system estimates an arrival time.
- A search system estimates which results are most relevant and ranks them.
- A streaming service estimates what you may want to watch and recommends highly ranked options.

These tasks have their own names. Choosing a category is **classification**. Estimating a number or future value is **prediction** or **forecasting**. Putting options in order is **ranking**. Presenting a likely useful option is **recommendation**.

Take the streaming service. It uses information about programmes, earlier viewing and the current situation to estimate how relevant each option may be. It ranks the options and recommends some near the top. One recommendation can therefore involve several linked estimates.

It can also go wrong at several linked points. Watch one bleak Nordic crime drama and suddenly the algorithm has planned your entire emotional winter.

Predictive does not mean psychic or certain. It means the system produces an estimate from the information and patterns available to it.

### Generative AI creates new content

**Generative AI produces new content in response to a request.** That content can be text, an image, audio, video, software code or another created output.

Suppose you paste rough meeting notes into an AI assistant and ask for a follow-up email. The assistant is not usually retrieving one completed email from a filing cabinet marked *Brenda’s chaotic Tuesday meeting*. It creates a new draft for this request using patterns learned during training and the information you supplied now.

Here is the cleanest contrast:

- A predictive system may estimate which existing email is spam.
- A generative system may create a new email.

Current generative AI is commonly built with deep learning. A language model creates text by repeatedly estimating what small piece could sensibly come next. Those internal predictions help it perform the visible job of producing new content.

So yes, generation can use prediction inside its machinery. That does not make the two public labels interchangeable. One describes an estimated result about a case; the other describes the creation of new content.

The new content can be useful, fresh and impressively fluent. It can also be wrong. The system is constructing an output that fits learned patterns. It is not automatically consulting a little internal librarian who refuses to release a sentence until every fact has two sources and a permission slip.

## What kinds of information can it connect?

We have looked at what comes **out**. Now look at what can go **in** and what the system can connect.

Text is one form of information. Images, sound, video and sensor readings are others. Each form is called a **modality**.

A **multimodal AI** system can work across more than one form of information.

Suppose an office chair breaks. You upload a photograph of the damage and type, “Describe what is broken and draft a repair request.” The system connects your written instruction with the chair and the visible damage in the image. It then creates a written response.

That interaction is **multimodal** because it connects text and an image. It is also **generative** because it creates new text. The labels are both true because they answer different questions.

Multimodal does not mean the system can do everything. It does not tell us how reliable it is or how broad its intelligence may be. It tells us which forms of information it can connect.

## What happens after it gives an answer?

Some AI interactions end after one response. You ask for a summary; the system gives you a summary. Other systems can continue working towards a goal.

An **agentic AI system** can take a goal, work through several steps, use tools, examine what happened and choose what to do next.

Imagine a travel assistant with permission to search approved booking services. You ask it to find three train-and-hotel options that meet your dates and budget. It searches, compares results, notices that one hotel is sold out, changes the plan and returns with the remaining options. It stops before booking and asks you to choose.

That system is agentic because the complete setup can carry the goal through actions and results. It may include an AI model, instructions, tools, access permissions, a record of what has happened and rules about when to stop or ask a person.

And yes, an agent can stop and still be agentic. Stopping at an approval point can mean it is behaving properly. The important feature is not that it runs forever like a washing machine possessed. It is that it can continue through a goal, actions and results instead of producing only one answer.

Agentic AI often uses a generative model to interpret a goal or choose a next step. But **agentic** describes the behaviour of the larger system, not a special new species of model. An agentic system can remain highly specialised. It is not automatically artificial general intelligence.

## Does it sense or act in the physical world?

Our travel assistant acts inside software. A different label applies when AI is connected to physical sensing or action.

**Embodied AI** connects AI to a physical body or machine that can sense, move or change something in the physical world.

A robot vacuum uses sensors to detect its surroundings and motors to move. A warehouse robot may identify an object, plan a route and move it. A driver-assistance system may interpret camera or radar information and influence steering or braking.

The body does not have to look human. Wheels, cameras and one determined little brush for attacking crumbs under the sofa are quite enough.

Embodied tells us that the AI reaches the physical world. The same system may also be predictive, multimodal, agentic or several of those at once.

## How broad are its abilities?

We have asked how a system was built, what result it produces, what information it connects and whether its actions reach software or the physical world. None of those answers tells us how wide its abilities are.

### Specialised AI has a bounded area of work

A **specialised AI** system is built for a defined area. A spam filter classifies email. A medical-image system looks for particular patterns in scans. A warehouse-routing system plans movement inside its environment.

Specialised does not mean simple. A system can be extraordinarily capable inside a narrow area and useless outside it.

### General-purpose AI can support many kinds of work

A **general-purpose AI** system can be used across many kinds of work. One current assistant may draft an email, explain a contract clause, help with software code and interpret an image.

General-purpose does not mean equally good at everything. Nor does it mean generally intelligent in the human sense. It means that the same underlying capability can support a broad range of uses.

A general-purpose model can also sit inside a specialised product. A broadly capable language model may power a customer-service assistant with one bounded business job. The underlying model is broad; the finished product is specialised.

This is where the PowerPoint arrows often become especially excitable, so let us define the two biggest claims carefully.

### Artificial general intelligence is a disputed proposal

**Artificial general intelligence**, usually shortened to **AGI**, is a proposed category for AI with genuinely broad and adaptable intelligence.

There is no universally accepted definition or test. But the idea asks for far more than one current product doing several impressive tasks.

An AGI would be expected to use knowledge across a wide range of unfamiliar intellectual problems, learn new tasks, transfer what it learned from one situation to another and adapt when the situation changes. Reliability matters too. One dazzling answer followed by three baffling failures is not robust general intelligence.

Imagine giving a capable person a kind of intellectual problem she has never seen before. She can ask useful questions, connect earlier knowledge, learn the new rules, notice when her first approach fails and adapt. The AGI claim is that an artificial system could show that kind of breadth and transfer across intellectual work, not merely perform a long menu of familiar tasks.

Researchers and companies disagree about which abilities, performance levels and tests should count. Some use AGI to mean human-level ability across most cognitive work. Others set different thresholds. The disagreement is part of the term, not an annoying footnote we can hide under the carpet.

LAiDIES does **not** classify today’s products as AGI. Broad usefulness is not the same as demonstrated general intelligence.

### Artificial superintelligence is hypothetical

**Artificial superintelligence**, or **ASI**, is the hypothetical idea of an artificial intelligence that greatly exceeds the best human abilities across most or all important intellectual fields.

This does not mean a calculator being faster at arithmetic or a chess system defeating a champion. Machines have exceeded people at bounded tasks for decades. ASI describes something much broader: science, strategy, invention, persuasion, planning and other intellectual work at levels beyond ours.

No ASI exists. There is no agreed test, timeline or proven route from current systems to one. It belongs in this book because people use the term in news, policy and arguments about the future. It must not be presented as the next scheduled product release.

An arrow in PowerPoint is not a time machine.

## A short timeline, not a ladder

These ideas have history, but the history is not a queue in which one type replaced the last.

- **1950s and 1960s:** Artificial intelligence becomes a named research field. Researchers explore search, reasoning, games, learning and machines that act in the physical world.
- **1970s and 1980s:** Rule-based expert systems become prominent in specialised domains. Machine-learning and neural-network research also continue.
- **1990s and 2000s:** Machine-learning methods grow more practical as digital data and computing increase. Predictive systems spread through search, spam filtering, fraud detection and recommendations.
- **2010s:** Deep learning produces major practical advances in image recognition, speech and language.
- **Late 2010s and early 2020s:** Large generative models become much more capable and widely accessible.
- **2020s:** Multimodal products expand and *agentic AI* becomes a popular label for systems that combine models, tools and repeated steps to pursue goals.

The crucial words are **overlap** and **become prominent**. Agent-like programs and robots did not suddenly appear after generative AI. Predictive AI did not vanish when chatbots became fashionable. A current product can contain ordinary software, human-written rules, machine-learning models, generative components and approval steps all at once.

## Put the labels together on one product

Return to the travel assistant.

It may use **machine learning** and **deep learning** inside models that handle language and search results. It is **generative** when it writes a new itinerary. It is **multimodal** if it connects your written request with a screenshot of dates or a photograph of a paper confirmation. It is **agentic** if it can search, compare, revise its plan and return after several steps. The finished travel product is still **specialised** because travel planning is its bounded job.

It is not **embodied** because it acts in software rather than through a physical machine. None of these facts makes it **artificial general intelligence**.

Here are the questions the labels answer:

| Question | What we are trying to learn | Examples of labels |
| --- | --- | --- |
| How did it get its working knowledge? | Was knowledge supplied by people, learned from examples or both? | rule-based expert system, machine learning, deep learning |
| What result does it produce? | Does it recognise, estimate, rank, recommend, generate, plan or control? | predictive, generative and more specific task names |
| What information can it connect? | Does it work with text, images, sound, video or sensor readings? | multimodal |
| Can it continue through actions? | Does it pursue a goal through steps, tools and results? | agentic |
| Does it sense or act physically? | Is the AI connected to a body or machine? | embodied |
| How wide are its abilities? | Is it bounded, broadly useful, disputed general intelligence or hypothetical superintelligence? | specialised, general-purpose, AGI, ASI |

You do not need to interrogate every toaster with all six questions. Use them when one shiny label is pretending it told you everything.

## Check that the story now holds together

### Recognise it

Match each description to the most useful label, then check the reason.

1. A system estimates how likely a payment is to be fraudulent.
2. A system creates a new product description from notes.
3. A system connects a spoken question with an image.
4. A system searches approved services, compares results and asks before taking the final action.
5. A robot uses cameras to identify boxes and moves them through a warehouse.

**Reasoned answers:** 1 is predictive. 2 is generative. 3 is multimodal. 4 is agentic. 5 is embodied and may also be predictive, multimodal and agentic depending on how the complete system works.

If you treated these as rival boxes, return to **Put the labels together on one product**. One system can have several labels when they answer different questions.

### Explain it

How is machine learning related to artificial intelligence? How is deep learning related to machine learning?

**Reasoned answer:** Artificial intelligence is the broad field. Machine learning is one approach inside AI that finds useful patterns in examples. Deep learning is one type of machine learning that uses layered neural networks.

If the three sounded interchangeable, return to **How did it get its working knowledge?** and redraw the three nested circles.

### Draw it

Draw three circles inside one another: **Artificial intelligence → Machine learning → Deep learning**.

Beside the circles, write **Generative**, **Multimodal**, **Agentic** and **Embodied**. Connect each one to the question it answers: result, information forms, continued actions or physical action.

If you put every label inside *deep learning*, return to **Put the labels together on one product** and use its question table. It separates a genuine family relationship from properties that can overlap.

### Use it

Your workplace is considering an “agentic multimodal recruitment assistant.” Describe what those words tell you. Then list what you still need to find out about how it was built, the result it produces, its physical reach and the breadth of its abilities.

**Reasoned answer:** *Multimodal* suggests the system connects more than one form of information, perhaps written applications and recorded interviews. *Agentic* suggests the complete system may use tools and work through several steps towards a goal. The words do not tell us whether it uses machine learning, what it predicts or generates, whether it can take any physical action, whether the finished product is specialised, how accurate or fair it is, what permissions it has or where a person reviews its work.

If a label tempted you to invent an answer, return to **Put the labels together on one product** and find the matching question. A useful label tells you one thing. A useful reader also notices what it leaves unanswered.

## What you can now say with confidence

AI is the broad field. Machine learning is one way of building AI, and deep learning is one kind of machine learning. Predictive and generative describe common kinds of result. Multimodal describes the forms of information a system can connect. Agentic describes a complete system that can continue through actions and results. Embodied means the AI reaches the physical world. Specialised and general-purpose describe breadth of use. AGI is disputed and unproven; ASI is hypothetical.

That is enough to stop a pile of AI labels from bossing you around.

It is not yet the whole AI ecosystem. We have named the parts from the outside. In Chapter 2, we will follow one ordinary request after you press **Send** and meet what sits between your words and the answer that comes back.

## Key Definitions

**Artificial intelligence (AI):** the broad field of building computer systems that apply human-supplied knowledge, search, learned patterns or combinations of these to tasks such as recognition, prediction, generation and planning.

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

Checked 10 August 2026 against the OECD definition and classification framework, Stanford HAI’s expert-system explanation, NIST’s *Generative AI Profile*, Google’s machine-learning glossary, Anthropic’s engineering explanation of agents, Google DeepMind’s proposed *Levels of AGI* framework and the *International AI Safety Report 2026*. Terminology, product capabilities and AGI claims require rechecking before publication.

## See more at LAiDIES

- Visit the **NewsStand** for dated reporting about current AI systems and claims.
- Revisit **Episode 2** for the Spice Girls prompting lesson: tell the AI what you want, what you really, really want.
- Revisit **Episode 3** for the Burn Book lesson about information that sounds authoritative without adequate support.
- A dedicated **Tribune** article about AGI and ASI is needed but is not yet published. No fake link appears here.
