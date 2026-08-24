# The Breakthroughs That Changed Modern AI

## start-here | Start here | How did all of this become normal?

Before breakfast, your phone may recognise your face, decide which messages are junk, suggest a route around traffic and find every photograph you have ever taken of a dog. You can speak a question aloud and receive an answer. You can describe an image that has never existed and watch it appear.

None of this arrived in one glorious afternoon.

Modern AI was built through a series of moments when something that had kept researchers stuck finally moved. Sometimes the crucial change was a new mathematical idea. Sometimes it was a mountain of examples assembled by people. Sometimes it was a chip designed for video games, a shared piece of software, a fairer test or a simple chat box that let millions of people touch research for the first time.

This book begins in the 2000s, when those ingredients started colliding at useful scale. We will step backwards only when an older idea is needed to understand what happened next.

The technical names will appear, because words such as *transformer*, *diffusion* and *reinforcement learning* become much less intimidating when you know the problem they solved. But the names come second. First comes the thing itself: what could people not do, what changed, how do we know it worked, and why did the world care?

A breakthrough is not merely a dazzling demonstration. A trailer can make a dreadful film look magnificent; a technology demo can do the same. The moments in this book have to earn their place. They removed a real obstacle, produced evidence other people could inspect and changed what researchers, companies, scientists or ordinary people did next.

Some famous inventions will therefore receive less space than expected. Other, less glamorous things—data labelling, graphics chips, recommendation systems and human feedback—will move towards the centre. AI history makes little sense if we describe only the models and leave out the people and machinery that made them possible.

There will be wonder here. A move in a board game really did make world champions stare at the board in disbelief. A protein-prediction system really did change the starting point for biological research. A machine learning to reverse noise into an image is a gorgeous idea. Wonder becomes more powerful, not less, when we understand exactly what happened.

## parallel-machines | 2006: the parallel machine | A video-game chip changes what AI can attempt

Imagine giving a million people the same small arithmetic problem. One brilliant mathematician could solve the problems one after another. Or a stadium full of ordinary calculators could solve many at the same time.

A learning system can be built from layers containing a great many adjustable numerical connections. It sees an example, makes a prediction, measures its error and adjusts those connections slightly. Then it does that again. And again. This layered system is called a neural network, and training one looks surprisingly like the stadium problem: useful learning can require an almost absurd number of similar calculations.

The central processor in an ordinary computer is a flexible generalist. It is good at following complicated sequences of instructions. A graphics processor was built for a different job: changing huge numbers of screen pixels at once. It contains many simpler calculating units that can work in parallel.

Researchers had already experimented with using graphics hardware for scientific work. The awkward part was programming it. In 2006 the chip company NVIDIA introduced a programming system called CUDA. It let programmers use NVIDIA graphics processors for general calculations without pretending those calculations were part of a picture.

That unglamorous bridge mattered enormously. Neural-network training contained exactly the kind of repeated, parallel arithmetic the chips could accelerate. Experiments that had been painfully slow became practical. Researchers could try larger networks, feed them more examples and discover failures sooner.

Later, specialized chips went further. Google's Tensor Processing Unit was designed around the large grid multiplications neural networks repeatedly perform. In a published comparison of Google's own production workloads, the first TPU was substantially faster and more efficient than the contemporary central and graphics processors tested alongside it. That does not mean one chip always wins every task. It shows how important the match between an algorithm and its physical machinery had become.

Shared software completed the workshop. TensorFlow and PyTorch did not think, recognise or predict anything by themselves. They packaged difficult engineering jobs—moving data, calculating adjustments, using accelerators and saving experiments—so that researchers did not have to rebuild the plumbing for every idea.

This is why hardware cannot be treated as scenery behind the “real” breakthrough. In 2012, a vision system called AlexNet would combine older neural-network ideas, a huge labelled dataset and graphics processors. Remove any one of those ingredients and the famous result changes.

There was another consequence. As larger experiments became a dependable route to better results, the entrance fee rose. Advanced chips, data centres, electricity and specialist engineers became sources of power. A mathematical paper could circulate freely while the ability to reproduce it remained concentrated among organizations able to afford the machinery.

The breakthrough was therefore not “video-game chips became intelligent.” It was that a mass-market parallel machine removed a practical ceiling from AI research. What models could learn was becoming inseparable from what their owners could compute.

Sources: [NVIDIA's CUDA history](https://developer.nvidia.com/cuda/faq), [Google's first TPU production analysis](https://research.google/pubs/in-datacenter-performance-analysis-of-a-tensor-processing-unit/), [TensorFlow system paper](https://research.google/pubs/tensorflow-large-scale-machine-learning-on-heterogeneous-distributed-systems/), [PyTorch paper](https://proceedings.neurips.cc/paper/9015-pytorch-an-imperative-style-high-performance-deep-learning-library).

## invisible-editor | 2000s onward: the invisible editor | The AI choosing what billions of people see

Long before most people spoke to a chatbot, another kind of AI was quietly arranging their lives.

Open a streaming service and there may be millions of possible songs or films. Visit a shopping site and there are more products than anyone could inspect. A social platform receives new posts faster than a person could read them. Someone—or something—must decide which handful appears on the screen.

A simple popularity list repeatedly rewards what is already popular. A chronological list shows what is newest, whether useful or not. Recommendation systems try to predict what this particular person may want next.

Early collaborative systems used the behaviour of many people as clues. If people who liked some of the same films as you also liked another film, that overlap could support a suggestion. One influential approach compressed a vast table of people and ratings into a much smaller set of learned taste patterns. The patterns might resemble an appetite for quiet dramas or fast action, although the system was not required to give them human-readable names. The mathematical method is called matrix factorization. It became especially prominent during the Netflix Prize, a public competition to improve the film-rental company's recommendations.

At services such as YouTube, the catalogue became too large even to score every item carefully. The system was split into two jobs. First, one model pulled a manageable group of possible videos from the millions available. Then another ranked those candidates. In plain language: make a shortlist, then order it.

That sounds like helpful filtering, and often it is. The deeper issue is the target. A recommendation model does not discover what is inherently best for you. People choose what it should predict: a click, minutes watched, a purchase, satisfaction, or a mixture. If the target rewards time spent, the system becomes skilled at predicting what keeps attention—not necessarily what leaves someone informed, calm or glad she opened the app.

The loop then tightens. A ranking changes what people see. What they see changes what they click. Those clicks become new training evidence. The system is learning from behaviour that it helped produce.

This makes recommendation one of the most socially important AI breakthroughs of the modern era. It shaped culture, commerce and political attention before generative AI became famous. It also resists simple morality tales. “The algorithm caused polarization” is too broad. Effects differ by platform, design, population and moment. A 2026 independent experiment on the social platform X, formerly Twitter, found that turning on its algorithmic feed increased engagement and shifted some current political attitudes among the studied US users, while not significantly changing their reported partisanship or affective polarization. Other platform experiments have found different effects.

The honest conclusion is both stronger and narrower: automated ranking can change exposure, and exposure can change behaviour and sometimes attitudes. The direction and size must be measured rather than assumed.

The next time a feed feels uncannily personal, the useful question is not “Does it know me?” Ask what outcome it is trained to predict, which possibilities never reached the shortlist, and whose interests are represented by the target.

Sources: [Matrix factorization for recommender systems](https://ieeexplore.ieee.org/document/5197422), [Deep neural networks for YouTube recommendations](https://research.google/pubs/deep-neural-networks-for-youtube-recommendations/), [independent randomized experiment on X's feed](https://www.nature.com/articles/s41586-026-10098-2).

## machines-hear | 2010–2015: machines begin to hear | When speech recognition becomes useful in ordinary life

Say the word “water” aloud. Now whisper it. Say it while laughing, through a bad phone connection, in a crowded kitchen, with a Vancouver accent, a Lagos accent or the voice you have when a cold has settled in your chest.

The word is the same. The sound is not.

Speech recognition has to turn a moving wave of air into written language while coping with speakers, rooms, microphones, speed and noise it may never have encountered. Earlier systems divided speech into tiny sound snapshots. Carefully designed statistical components estimated which hidden speech sound probably produced each snapshot, then a language component helped assemble likely words.

These systems were substantial achievements, but improving them required expert engineering across many separate pieces. In the early 2010s, research groups began replacing one important acoustic component with a system that learned several layers of sound detectors from large collections of recorded speech and intended transcripts. Early layers might respond to simple acoustic patterns. Later layers could combine those signals into clues useful for distinguishing speech sounds in context. These layered learning systems are called deep neural networks.

A 2012 paper brought together results from four research groups. That shared authorship matters: this was not one laboratory waking up with the gift of hearing. Across several benchmarks, the deep networks beat the older Gaussian-mixture components, sometimes by large margins. In one Google study using thousands of hours of Voice Search and YouTube speech, word error fell by several absolute percentage points against strong comparison systems.

“Word error rate” asks how many words must be inserted, removed or replaced to turn the machine's transcript into the reference transcript. It is a useful receipt, but an average can hide who is being failed.

An independent US study published in 2020 tested commercial speech-recognition systems using interview recordings. It found substantially higher average error for Black speakers than white speakers in its sample. That result does not describe every language or every current product. It demonstrates why “speech recognition improved” and “speech recognition works equally well for everyone” are different claims.

The breakthrough mattered because it moved deep learning out of a research contest and into an unruly human service. Dictation, captions, voice search and assistants became more practical. For people who cannot easily type or see a screen, that can expand access. For someone whose voice the system repeatedly misunderstands, the same interface can create a new locked door.

Speech also brought privacy into the room. A system can only transcribe the sound it receives. Who records it, where it is processed, how long it is kept and whether the speaker meaningfully consented are product and policy decisions—not properties that accuracy scores resolve.

The real breakthrough was not that a computer acquired ears. It was that layered learning began finding useful acoustic clues at a scale that made speaking to machines feel less like performing for them.

Sources: [four-group speech-recognition overview](https://research.google/pubs/deep-neural-networks-for-acoustic-modeling-in-speech-recognition/), [large-vocabulary speech study](https://research.google/pubs/application-of-pretrained-deep-neural-networks-to-large-vocabulary-speech-recognition/), [independent racial-disparity study](https://pubmed.ncbi.nlm.nih.gov/32205437/).

## labelled-world | 2009–2012: the labelled world | The result that redirected computer vision

In 2009, the internet already contained an ocean of pictures. A computer could not learn much from “an ocean.” It needed examples arranged into a lesson.

The ImageNet team set out to build one at extraordinary scale. They used a human-built dictionary that grouped words into related concepts; it was called WordNet. They also recruited online crowdworkers through a work platform called Amazon Mechanical Turk to check whether candidate images matched their labels. The 2009 paper described 3.2 million images across 5,247 categories in the release available then. Later, an annual competition gave researchers a shared training collection and a hidden exam.

This was infrastructure, but it was also an argument: perhaps a vision system could discover more useful clues if it had vastly more labelled examples.

An image is only a grid of numbers representing colour and brightness. Earlier vision pipelines often relied on clues designed by people—edges, corners and textures believed to be useful. A different system moved small learned detectors across the picture, looking for the same local pattern wherever it appeared. Layers combined simple patterns into more complex ones. This type of layered vision system is called a convolutional neural network. During training, errors flowed backwards through it so that its many connections could be adjusted.

That backwards correction process is called backpropagation. It does not tell the machine what a cat *means*. It gives the system a way to alter the connections that contributed to a wrong answer.

In 2012, Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton trained a large convolutional network on ImageNet using graphics processors. Their competition submission achieved 15.3 per cent top-five test error, compared with 26.2 per cent for the second-place entry. “Top five” means the correct label counted if it appeared anywhere among the system's five highest guesses. The winning number came from an ensemble of models, not one solitary network.

The gap was enormous enough to redirect a field. It made a recipe difficult to ignore: large human-labelled data, learned visual features and parallel hardware.

This is sometimes described as the moment a machine learned to see. That is memorable and misleading. The model learned to sort selected pictures into selected categories. It did not acquire a human understanding of scenes, intentions or danger. Change the kinds of images, cameras or people and performance could change sharply.

The labels were not nature speaking. People chose the categories, found the images and judged the matches. Web imagery carried cultural imbalances. Some later ImageNet categories involving people were offensive or invasive. The labour and the errors belong inside the history because the model learned from both.

What made the breakthrough astonishing was not a photograph of a cat receiving a label. It was that useful visual clues no longer had to be completely specified by hand. Given enough examples, correction and computing power, the network could build its own internal ladder from pixels to categories.

That ladder became part of photo search, industrial inspection, medical-image research and countless other systems. It also gave the world a durable warning: a machine can become excellent at the exam people built and still misunderstand the lesson they thought they were teaching.

Sources: [ImageNet paper](https://image-net.org/static_files/papers/imagenet_cvpr09.pdf), [ImageNet history](https://www.image-net.org/about), [AlexNet paper](https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45-Paper.pdf), [ImageNet competition retrospective](https://arxiv.org/abs/1409.0575).

## language-looks-back | 2013–2014: language learns to look back | From word neighbourhoods to attention

Computers once treated words rather like product codes. The code for “queen” contained no built-in reason to sit near “woman,” “royal” or “king.” The relationships had to be supplied elsewhere.

A 2013 training method learned from a simple observation: words used in similar surroundings often have related uses. It predicted a word from nearby words or predicted nearby words from a central one. The resulting numerical locations placed related usage patterns near one another. The researchers called the method word2vec: literally, words turned into numerical vectors.

Those locations are called word embeddings. They did not give the machine a childhood, a body or human meaning. They made some relationships between word use available for calculation. They also reproduced stereotypes in the text from which they learned.

Translation exposed the next obstacle. A sentence can contain any number of words; its translation may contain a different number. Early neural sequence-to-sequence systems read the source and compressed it into one fixed numerical summary before producing the translation.

That was like listening to a long meeting, writing one sticky note and then reconstructing every detail from the note. Long sentences suffered.

In 2014, Dzmitry Bahdanau, Kyunghyun Cho and Yoshua Bengio offered a release valve. As the system produced each translated word, it calculated which source positions mattered most at that moment. A name could draw influence from one part of the sentence; a verb from another.

The method was called attention. It was not attention in the conscious human sense. It was a changing set of numerical weights answering: which earlier pieces should influence this next step most strongly?

That breakthrough was wonderfully specific: a sentence no longer had to squeeze through one tiny summary. As each new word was produced, the system could return to the source and calculate which parts mattered right now.

Sources: [word2vec paper](https://arxiv.org/abs/1301.3781), [sequence-to-sequence learning](https://arxiv.org/abs/1409.3215), [neural attention](https://arxiv.org/abs/1409.0473).

## transformer-turn | 2017: every word gets a direct line | The transformer opens the road to scale

The translation systems in the previous chapter still processed language as a sequence: one step followed another. That is natural for reading, but awkward for training. Each step waits for the step before it, leaving the parallel calculating power of graphics chips partly unused.

In 2017, eight researchers published *Attention Is All You Need*. They built an architecture around direct, calculated relationships between positions in the text. It removed the recurrent relay that had carried information forward one step at a time. Many relationships could now be calculated in parallel.

The researchers called the architecture a transformer.

Picture a crowded dinner table. In the older sequential system, a message must be passed person to person around the table. In the new system, each person can look directly toward the people relevant to the current question. The comparison has limits: words do not literally look, and the original architecture pays a steep computing cost as the table grows. But it captures the movement from a long relay to direct relationships.

Suppose the sentence says, “The trophy did not fit in the suitcase because it was too large.” To interpret “it,” the system can calculate strong relationships with both “trophy” and “suitcase,” then use the surrounding patterns to decide which connection is more useful. This is not human comprehension. It is a powerful way to make context influence each part of a representation.

The original paper demonstrated the design on translation. Its larger consequence emerged later. The architecture could be trained on enormous collections of text, adapted to images and audio, and used inside scientific models. It became the common skeleton beneath later systems for language, image generation and protein prediction.

Parallel training mattered as much as elegance. The new architecture matched the graphics hardware already transforming the field. More data and more computing could be used efficiently, and researchers could build much larger models.

What the transformer did not provide was truth. It can model which words fit together with astonishing skill while producing a claim that never happened. Relationship is not reality; fluent completion is not a fact-check.

The transformer was pivotal because it joined a strong way of handling context with a structure that could exploit massive parallel training. It did not make a machine understand every word. It made scale much more useful.

Source: [transformer paper](https://arxiv.org/abs/1706.03762).

## move-thirty-seven | 2016: the move that looked like a mistake | AlphaGo learns where to look when looking everywhere is impossible

Go is played with black and white stones on a grid. The rules can be explained over tea. Playing well is another matter entirely.

A strong player watches how a stone placed in one quiet corner might change a fight twenty moves later. After each move there are hundreds of possible replies, then hundreds of replies to those replies. The number of possible games grows so violently that “check them all” stops being a plan.

Then, in March 2016, a computer program placed a white stone where many expert players thought it did not belong.

The program was AlphaGo. The move was number 37 in the second game of a five-game match. Sitting opposite was Lee Sedol, one of the world's leading Go players.

The stone did not make a dramatic capture. It landed farther from the edge than tradition usually favoured at that stage. To experienced eyes it looked strange—possibly wrong.

This is where the story often becomes mythology: the machine displayed creativity; the machine had intuition; the machine saw what humans could not. Those claims run ahead of the evidence. Anyone can make a surprising move. A toddler can put a stone somewhere unexpected, although she may also eat it. Surprise is not insight.

Move 37 became extraordinary because the game tested it.

AlphaGo divided its impossible choice into three jobs. One learned component proposed promising moves. A second estimated which player seemed more likely to win from a position. A search process spent extra effort investigating the continuations that looked most useful.

The researchers called these a policy network, a value network and Monte Carlo tree search. The useful meaning is: propose, estimate, investigate.

AlphaGo first studied recorded games from strong human players. Then versions of the program played against one another. A final win or loss supplied feedback, and the system adjusted so that choices associated with winning became more likely. This method belongs to a family called reinforcement learning: try actions, receive feedback about the eventual result and change future choices in response.

The Google DeepMind laboratory that built AlphaGo later described Move 37 as having roughly a one-in-ten-thousand probability under the model of human play AlphaGo had learned. That is not a universal measurement of human creativity. It means the move sat far outside the patterns that particular model expected from its human-game data.

AlphaGo played it because the rest of its machinery judged the resulting position differently. Then Lee Sedol fought back. The move was not declared brilliant by its maker and left unchallenged. One of the strongest players alive tested it throughout the remaining game. Its value continued to emerge. AlphaGo won Game Two and the match four games to one.

In Game Four, Lee played his own startling move and AlphaGo handled the resulting position badly. Lee won. That matters just as much. A system can be stronger overall and still be vulnerable. Strength is not perfection; mastery of one game is not general wisdom.

Go gave the system unusually clean conditions: stable rules, legal moves, endless safe practice and an opponent who supplied resistance. Hiring, medicine and news do not offer such generous answer keys. People disagree about the goal; effects arrive late; the easiest score may not represent what matters.

Move 37 was not the moment a machine became a person. It showed that learned judgement could direct limited search into parts of an enormous possibility space that human convention rarely visited.

That is astonishing enough.

Sources: [AlphaGo paper](https://www.nature.com/articles/nature16961), [AlphaGo research record](https://deepmind.google/research/alphago/), [AlphaZero](https://www.science.org/doi/10.1126/science.aar6404), [MuZero](https://www.nature.com/articles/s41586-020-03051-4).

## generative-contest | 2014: the machine that learned through rivalry | Two networks teach each other to make images

Recognition asks, “Which label fits this picture?” Generation asks something stranger: “Can you make a new picture that resembles the patterns in these examples?”

In 2014, Ian Goodfellow and seven colleagues proposed training two networks in opposition. One, the generator, produced candidate images. The other, the discriminator, tried to tell generated examples from training examples. Every time the discriminator found a weakness, it provided pressure for the generator to improve. Every improvement forced the discriminator to become more discerning.

Imagine a trainee art forger and an investigator beginning on the same day. The
forger studies what escapes detection. The investigator studies each new trick.
Neither receives a permanent list of rules; each one's improvement changes the
other's next lesson. The comparison is not exact—a network has no criminal plan
or visual intention—but it captures why the training signal could keep changing.

The original paper demonstrated the method on handwritten digits, faces and tiny
photographs. It did not instantly produce the polished synthetic portraits that
would later circulate online. Its decisive contribution was a new route to
generation that did not require the researchers to write down a complete formula
for the probability of every possible image.

The pair became known as a generative adversarial network, or GAN. The original images were modest. The breakthrough was the training game. Later systems produced remarkably convincing faces and scenes, although training could be unstable and a generator could repeatedly produce only a narrow slice of the possibilities.

This was the moment image generation became a major modern research direction. It also demonstrated a broader idea: a system can learn from an opponent that is itself learning. Progress came not from a fixed answer sheet but from two changing players continually exposing each other's weaknesses.

The same rivalry created problems. Training could swing out of balance: if the
investigator became too strong, the forger received little useful guidance; if
the forger found one reliable trick, it might keep producing variations of the
same narrow result. Researchers called that second failure mode collapse.

Later GANs generated strikingly realistic human faces and altered image editing,
design and synthetic media. They also made an uncomfortable fact visible: a
picture could look photographically convincing without recording any event that
had happened. Visual realism and documentary truth had become separable at
scale.

Source: [GAN paper](https://arxiv.org/abs/1406.2661).

## pictures-from-noise | 2020–2022: pictures from noise | A machine learns to reverse destruction

Another route began with destruction rather than rivalry.

Take a real image and add a little static. Add more, then more, until the picture disappears into noise. Because the clean original is known, each damaged version creates a practice question with an answer: what small change would make this slightly less noisy?

A diffusion model learns those small reversals. When generating, it begins with noise and repeatedly applies the learned cleanup step. Structure gradually appears: first broad arrangements, then shapes, then details.

The model is not uncovering a secret photograph hidden inside the static. It has learned directions that tend to move noisy patterns toward the kinds of images represented in its training data.

Early diffusion generation required repeated work across every pixel and was expensive. Researchers found that they could first compress an image into a smaller internal representation, perform much of the denoising there, then convert the result back into pixels. This method is called latent diffusion. “Latent” means that compressed internal space—not a mystical imagination.

Text supplied the steering wheel. An image-and-text model made by OpenAI learned to place matching pictures and captions near one another in a shared numerical map, using hundreds of millions of image–text pairs. It was called CLIP. Later image generators used related text–image connections to let words influence the denoising process. A phrase such as “a red umbrella in a snowstorm” could pull the developing image toward visual patterns associated with those words.

The result changed creative work because a sentence became a flexible visual control. People without drawing or 3D-modelling skills could explore compositions rapidly. Artists could generate references, variations and raw material. The same accessibility made imitation, deceptive media and non-consensual imagery easier.

The data is part of the invention. A research dataset called LAION-5B described billions of image–text pairs filtered from the web. Those pairs existed because people made, captioned and uploaded images. Questions about permission, attribution, bias and removal cannot be answered by saying the model merely “learned patterns,” nor by claiming every output is a stored copy. The honest issue is provenance: what entered the training collection, under what terms, and what rights do people retain?

The wonder is real. A system can begin with static and, through thousands of learned corrections, produce a coherent scene guided by language. Understanding that mechanism gives us better questions about whose visual world supplied the lesson.

Sources: [2015 diffusion formulation](https://proceedings.mlr.press/v37/sohl-dickstein15.html), [denoising diffusion](https://proceedings.neurips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html), [CLIP](https://cdn.openai.com/papers/Learning_Transferable_Visual_Models_From_Natural_Language_Supervision.pdf), [latent diffusion](https://openaccess.thecvf.com/content/CVPR2022/html/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.html), [LAION-5B](https://arxiv.org/abs/2210.08402).

## practice-without-labels | 2018–2020: practice without an answer-sheet army | Pretraining turns the internet into exercises

ImageNet depended on people attaching labels to millions of pictures. That approach could not scale to every possible language task. Most of the world's text does not arrive marked “legal summary,” “friendly email,” “answer to question 4” or “excellent poem about a bad date.”

Language models found a way to manufacture practice questions from text that already existed.

Hide a word and ask the model to recover it. Show the beginning of a passage and ask what comes next. The original text supplies the answer, so a person does not need to label each exercise.

This is called self-supervised learning. The system is not supervising itself like a teacher and it has not chosen its own education. People choose the collection, the objective, the exclusions and the model. “Self-supervised” means the data provides the temporary answers used for training.

A language model introduced by Google researchers in 2018 hid some words and used the words on both sides to recover them. It was called BERT. After this broad practice, it could receive a smaller labelled collection for a specific job and be adjusted further. That second stage is called fine-tuning. Instead of training a new language system from the beginning for every task, researchers could pretrain once and adapt many times.

Another family of language models practised predicting the next piece of text. The third large model in OpenAI's Generative Pre-trained Transformer series—GPT-3—was described in 2020. At its scale, a striking behaviour became visible: people could sometimes specify a task through an instruction or a few examples inside the prompt without changing the model's learned numerical settings.

One model could attempt translation, question answering, rewriting and simple reasoning depending on the text placed in front of it. It did not perform every task reliably. The conceptual shift was that language itself became a temporary control surface.

Researchers then measured fairly regular relationships between training error, the amount of data, the number of adjustable settings and the computing used. They called these measured relationships scaling laws, and the apparent predictability helped turn scale into an industrial strategy. “Parameters” are the learned numerical settings. A model with billions of them is not storing billions of little facts in labelled drawers. It has billions of adjustable values shaping how inputs influence later calculations.

The measurements suggested that more data, larger models and more computing could produce predictable improvements over a studied range. They did not prove that scale alone would create truth, wisdom or every future capability. Later work showed that some very large models had been trained on too little data for their size. The useful recipe was not simply “make it bigger,” but balance model size, data and computing more intelligently.

This breakthrough created the foundation-model era: train an expensive general model, then adapt or prompt it for many downstream uses. It also concentrated power. The training collections could absorb private information, stereotypes, copyrighted work and repeated misinformation. The computing bill favoured wealthy organizations. The apparently automatic lesson depended on the human world captured in the data.

The machine did not read the internet and become educated as a person does. It received an enormous number of prediction exercises generated from human material. That narrower fact was powerful enough to transform the field.

Sources: [BERT](https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/), [scaling laws](https://arxiv.org/abs/2001.08361), [GPT-3](https://arxiv.org/abs/2005.14165), [compute-optimal training](https://arxiv.org/abs/2203.15556).

## assistant-arrives | 2022: the assistant arrives | Human feedback and a chat box change who can use a language model

GPT-3 could continue text impressively, but continuing text is not the same job as helping a person. Ask a raw language model a question and it may continue the question, imitate a web page, wander away or produce something harmful. It learned what text often follows—not what a user wants.

Researchers used human feedback to move the behaviour closer to instruction-following.

People wrote examples of helpful answers and compared alternative model responses. A separate model learned to predict those preferences. The language model was then adjusted to favour answers that received higher predicted scores.

This family is called reinforcement learning from human feedback, usually shortened to RLHF. The acronym can hide the most important word: human. People had to decide what counted as clearer, safer or more useful. Their instructions, cultural assumptions, working conditions and disagreements entered the training signal.

The 2022 paper about an instruction-following model called InstructGPT documented labelers providing demonstrations and rankings. Separate reporting later described Kenyan workers employed through an outsourcing company called Sama to classify disturbing text for a safety tool made for OpenAI. Those are related parts of the larger labour story, but they must not be collapsed into one claim that the Kenyan workers performed all of ChatGPT's preference training. Different people did different jobs.

On 30 November 2022, the AI research company OpenAI released ChatGPT as a research preview. The underlying ingredients had histories: transformers, next-word pretraining, instruction tuning and human feedback. The product breakthrough was the interface.

A blank chat box made the research legible. People could ask in ordinary language, see an answer, correct it and continue. No programming interface was required. Conversation turned prompting into an iterative act: “No, shorter.” “Use this example.” “Explain that term.” Millions of people could discover both the flexibility and the unreliability for themselves.

The assistant still generated text by predicting likely continuations under its training and current conversation. Human feedback shaped behaviour; it did not install a little person who understood every request. The model could produce false claims confidently, invent sources and agree with a user's mistaken premise.

Retrieval offered one partial repair. Instead of relying only on patterns stored in the model's learned settings, a system could search an external collection and place relevant passages into the current context before answering. This is retrieval-augmented generation. In ordinary language: let the model open a library before it writes.

Retrieval does not guarantee truth. The system may find the wrong document, trust a bad one or ignore the useful passage. It changes the evidence boundary because sources can be updated and sometimes shown to the reader.

ChatGPT was pivotal not because one company invented every ingredient on launch day. It changed AI's audience. A research lineage became a general-purpose conversational product, and society began testing it at a scale laboratories never could.

Sources: [InstructGPT](https://arxiv.org/abs/2203.02155), [ChatGPT research preview](https://openai.com/index/chatgpt/), [TIME magazine investigation of Kenyan safety labour](https://time.com/6247678/openai-chatgpt-kenya-workers/), [retrieval-augmented generation](https://arxiv.org/abs/2005.11401).

## protein-puzzle | 2020: the protein puzzle | AlphaFold2 changes where biological investigation can begin

A protein begins as a chain assembled from smaller units called amino acids. The chain does not usually remain stretched like a necklace on a table. It folds into a three-dimensional shape, and that shape helps determine what the protein can do.

Knowing the order of amino acids is therefore not the same as knowing the working object. Imagine receiving a list of folds for an elaborate piece of origami but never seeing the finished form. Tiny differences can change which surfaces meet, which pocket can hold another molecule and whether the whole structure works.

Scientists can determine protein structures experimentally using methods such as X-ray crystallography, nuclear magnetic resonance and cryo-electron microscopy. These methods have produced extraordinary knowledge. They can also require specialized equipment, careful sample preparation and months or years of work. For decades, predicting the final structure accurately from the amino-acid sequence remained a grand scientific challenge.

Every two years, the Critical Assessment of protein Structure Prediction—mercifully shortened to CASP—made progress unusually difficult to fake. Organizers obtained protein structures that had been determined experimentally but were not yet public. Research teams received the amino-acid sequences and submitted predictions. Only afterward were the hidden experimental structures revealed.

This is a blind test: the answer exists, but the contestants cannot train on or look up that answer while predicting it.

At the fourteenth CASP test in 2020, a protein-prediction system made by the AI laboratory DeepMind produced results the organizers and researchers regarded as a dramatic advance. The system was AlphaFold2. For many targets, its error approached the scale of experimental uncertainty. The result was not a company choosing its favourite examples. Independent assessors compared predictions with structures hidden from the team.

How did the system do it?

Evolution had already run an immense natural experiment. Related organisms contain related protein sequences. If two positions tend to change together across evolution, that can be a clue that the corresponding parts of the folded protein interact.

AlphaFold2 used those clues to build and repeatedly revise two linked working
sketches. One tracked which amino-acid positions appeared related across the
family of sequences. The other tracked how pairs of positions might sit near or
far from one another in three-dimensional space. Information passed back and
forth: a newly suspected relationship could alter the emerging shape, and the
emerging shape could change which relationships looked plausible. After several
rounds, the system converted that improving map into predicted atomic positions.

The final system produced coordinates for the protein's atoms and confidence estimates indicating where its prediction was stronger or weaker. It did not physically fold a molecule in a tiny simulation. It predicted a plausible final structure from learned patterns and constraints.

The consequence was profound. A scientist investigating a protein could often begin with a useful structural hypothesis rather than begin with no shape at all. Later, the AlphaFold Protein Structure Database made hundreds of millions of predictions available, expanding access far beyond laboratories able to determine every structure experimentally.

But “AlphaFold solved protein folding” is too large. Proteins move. They interact with other molecules. Some contain disordered regions or adopt several shapes. A predicted structure does not establish what a protein does, whether a drug will work or how a disease should be treated. Experiments remain essential.

AlphaFold2 changed the starting point of millions of investigations. That is different from ending them—and every bit as remarkable.

Sources: [AlphaFold2 paper](https://www.nature.com/articles/s41586-021-03819-2), [CASP14 official results](https://predictioncenter.org/casp14/results.cgi?view=tb_results), [AlphaFold database paper](https://www.nature.com/articles/s41586-021-03828-1).

## science-searches | 2023: ten days of weather in under a minute | Learned forecasting enters operational science

Weather forecasting begins with measurements of the atmosphere: temperature,
pressure, wind, moisture and much more, spread around the planet and changing
constantly. Traditional numerical forecasting uses physical equations to move
that estimated state forward through time on powerful supercomputers.

It is one of humanity's great scientific systems. It is also computationally
hungry. Producing a detailed global forecast requires repeatedly calculating how
interacting conditions change across a three-dimensional grid.

Researchers at the AI laboratory Google DeepMind trained a model on decades of
past atmospheric states assembled by the European Centre for Medium-Range
Weather Forecasts. Instead of explicitly calculating every physical interaction
for each new forecast, the model learned how one observed weather state tends to
develop into the next.

The model represented the globe as connected points at several scales. Nearby
points carried local weather; broader connections helped information travel
across long distances. A structure made from points and connections is called a
graph, which is why the system was named GraphCast.

Its 2023 paper reported better accuracy than the European centre's leading
single-outcome physics system on 89.3 per cent of the 2,760 tested combinations
of weather variable and forecast time. On the stated Google hardware, it
produced a ten-day forecast in under a minute.

That comparison is the receipt—and also the boundary. It used a particular
historical dataset, set of variables and accuracy tests. Weather agencies need
more than one best guess. They run ensembles of forecasts to understand
uncertainty, assimilate new observations, monitor rare extremes and combine
model output with expert judgement.

GraphCast also depended on the physics-based system whose reconstructed history
supplied its training data. It did not make atmospheric science unnecessary. It
showed that learned forecasting could become a fast, highly skilful partner to
physical simulation.

The most important consequence came at the field level. Several groups produced
strong learned weather models. In 2025, the European forecasting centre placed
its own distinct AI Forecasting System into operations, first as a deterministic
forecast and later as an ensemble, alongside its physics-based systems. Learned
weather prediction had crossed from a striking paper into an operational
scientific service.

This is a different answer key from Go. A forecast does not meet a human
opponent; it meets the atmosphere. Tomorrow arrives and pushes back.

Sources: [GraphCast paper](https://deepmind.google/research/publications/22598/), [European centre's operational AI forecasting record](https://www.ecmwf.int/en/about/media-centre/news/2025/ecmwfs-ai-forecasts-become-operational), [operational ensemble and limitations](https://www.ecmwf.int/en/newsletter/185/earth-system-science/aifs-ens-becomes-operational).

## who-controls | The machinery behind the magic | Who can build, inspect and challenge modern AI?

A modern AI model can feel weightless. Type words into a box; words return. Behind the box are chips, data centres, electricity, cooling systems, software, capital and people.

As training at larger scale became a repeatable route to better benchmark results, the frontier moved increasingly into industry. Stanford's 2026 AI Index reports that companies produced more than 90 per cent of the notable frontier models it counted in 2025. That is a dated indicator, not a law of nature. Universities and public laboratories still contribute fundamental ideas. It shows where the most expensive model-building has concentrated.

The energy is physical. The International Energy Agency estimated that data centres used around 415 terawatt-hours of electricity globally in 2024 and projected roughly 945 by 2030 in its base case, with AI the most important driver of the increase alongside other digital services. Those numbers cover data centres, not AI alone, and the future figure is a projection. Local effects can be much larger than the global share suggests because facilities cluster around particular grids and communities.

Human labour is equally easy to hide. People create the text, images and recordings. They collect and clean datasets, label objects, compare answers, classify disturbing material, write software, maintain hardware and investigate failures. Calling a system “automated” describes the moment a user sees, not the full chain that produced it.

Access to a trained model can also mean several different things. The weights are the learned numerical settings produced during training. If an organization releases those weights, other people may be able to run or adapt the model without repeating the original training bill. That does not automatically reveal the training data, software, safety work or licence rights.

“Open source” therefore should not be used as a warm glow around every weight release. A large international research collaboration called BigScience built and released a multilingual language model named BLOOM along with substantial documentation and research materials. The technology company Meta released the learned weights of its LLaMA language model under specific access conditions. Both widened participation in different ways; neither erased the need to ask exactly what is open, to whom and under which licence.

Open weights can support independent research, local-language adaptation and competition. They can also make powerful capabilities easier to misuse. Closed access can limit misuse and external scrutiny at the same time. There is no single label that resolves the trade-off.

The breakthroughs in this book were never models alone. ImageNet required crowdworkers. AlphaGo learned first from human games. Chat assistants used human comparisons. AlphaFold depended on decades of experimental structures. The hardware rests on globally concentrated supply chains.

The right question is not whether the magic is real. It is which people and physical systems made it possible, who can examine the result, who receives the benefit and who absorbs the cost.

Sources: [Stanford AI Index 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report), [IEA Energy and AI](https://www.iea.org/reports/energy-and-ai/executive-summary), [BLOOM](https://arxiv.org/abs/2211.05100), [LLaMA](https://arxiv.org/abs/2302.13971), [ILO research on human labour behind AI](https://researchrepository.ilo.org/esploro/outputs/journalArticle/Challenging-the-Myth-of-AI-Autonomy/995703567802676).

## what-comes-next | What comes next? | AGI, superintelligence and the difference between a forecast and a fact

Every generation of AI produces a temptation: draw a smooth line through the recent progress and announce where it must end.

Some near-term candidates may earn chapters in a future edition but have not yet
passed the consequence test. A materials-search system made by Google DeepMind,
named GNoME, ranked possible crystal structures and checked selected candidates
with established physics calculations. Its paper reported millions predicted to
be stable in calculation. A calculated candidate is not yet a material someone
has made, tested and found useful, and later researchers disputed parts of the
novelty framing. Robotics systems are also connecting language, camera images
and physical actions, but impressive demonstrations have not yet established
dependable operation in ordinary homes. These belong on the watchlist, not in a
victory parade.

Artificial general intelligence, or AGI, has no single agreed definition. The AI company OpenAI uses one definition in its charter: systems that outperform humans at most economically valuable work. Researchers at the AI laboratory Google DeepMind instead separate how broadly a system can operate, how well it performs and how autonomously it acts, then propose levels rather than one finish line.

The disagreement is not wordplay. “Economically valuable work” is not the whole of human intelligence. Passing many benchmarks is not the same as navigating a home, sustaining relationships, accepting responsibility or acting reliably when the situation changes.

Modern systems are jagged. A model can perform brilliantly on a difficult scientific question and fail at a simple spatial task. An agent can complete a long computer workflow and then click the wrong button because a page changed. Capability, reliability and autonomy are separate.

Superintelligence usually means a hypothetical system that greatly surpasses the best human cognitive performance across very broad domains. No such system has been established by the evidence in this book. Rapid self-improvement, sudden “takeoff” and permanent loss of human control are serious hypotheses studied by researchers; they are not observed historical events.

That does not make the future chapter empty. More capable and autonomous systems could accelerate science, expand access to expertise and help people create things previously beyond reach. The same properties could amplify cyber misuse, surveillance, concentrated power and errors that travel farther before a person notices.

The history we have followed offers a better way to think than either inevitability or dismissal.

Ask what old constraint has genuinely moved. Ask for the receipt. What test pushed back? Did the result survive outside the inventing laboratory? What new work became possible? Where does the answer key stop resembling real life? Who controls the machinery and who bears the consequence of being wrong?

ImageNet changed how machines learned visual features; it did not create human sight. Move 37 changed learned search; it did not create general wisdom. AlphaFold2 changed the starting point for structural biology; it did not finish biology. ChatGPT changed access to language models; a chat box did not make every answer true.

The next breakthrough may be enormous. It may deserve more amazement than any chapter here. Our job is not to ration wonder. It is to make wonder answerable to evidence.

That is how a living history stays alive: not by bolting every new launch onto the end, but by asking whether the new result truly changed what the world could do.

Sources: [GNoME materials paper](https://www.nature.com/articles/s41586-023-06735-9), [Google DeepMind's Levels of AGI](https://arxiv.org/abs/2311.02462), [OpenAI Charter](https://openai.com/charter/), [scholarly definition and analysis of superintelligence](https://arxiv.org/abs/1607.00913), [governance of agentic systems](https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf).

## sources-and-updates | Afterword: sources & updates | How this living book will change

This is a living history, not a frozen monument. A new edition is triggered when strong new evidence changes the importance, interpretation or consequences of a named breakthrough—or when a newer result survives long enough to earn a place.

The source links at the end of each chapter lead mainly to original papers, official benchmark records and independent research used to test broader claims. Company accounts are used for matters such as product release history or a company's own characterization; they are not treated as independent proof of social impact.

Corrections should identify the chapter, exact sentence, supporting source and proposed change. Accepted corrections require a new content version and fresh review.

Several areas remain deliberately provisional. Current agent systems, AI-generated scientific candidates and claims about progress toward AGI may prove pivotal, but recent performance does not yet establish durable consequence. The book will distinguish “promising now” from “changed history.”

Historical credit also remains an active obligation. Papers name authors more readily than they name data workers, translators, benchmark organizers, public funders, infrastructure engineers and the people whose work became training material. Future editions should improve that record rather than pretending one corrective paragraph can repair every omission.

The standard for adding a chapter is simple to state and difficult to pass: a real previous limit moved; outsiders could inspect the result; something consequential followed; and a nontechnical reader can understand what changed without borrowing a string of unexplained technical terms.

If a future edition cannot do those things, the new system belongs on the watchlist—not in the history.
