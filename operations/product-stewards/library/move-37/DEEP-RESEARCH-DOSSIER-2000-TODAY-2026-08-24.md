# The Breakthroughs That Changed Modern AI — deep research dossier

**Status:** RESEARCH BASELINE COMPLETE FOR ALI DRAFT — FINAL RECONCILIATION OPEN
**Research date:** 2026-08-24  
**Scope:** 2000 to today, with only the pre-2000 foundations required to make the modern story intelligible  
**Publication state:** HOLD

## Why this dossier exists

The rejected manuscript reduced breakthroughs to a chronology of names,
mechanisms and dates. It did not earn the reader's amazement because it had not
done enough research to show what each result changed in the world.

No chapter may be drafted from a one-line mechanism or an institutional press
release. A proposed chapter must establish:

1. the hard problem or practical constraint before the breakthrough;
2. the older ideas, data, hardware, institutions and human labour it depended on;
3. the people and institutions directly responsible, without lone-genius mythology;
4. the mechanism in plain causal language;
5. the result that outsiders could inspect, including the exact benchmark and its limits;
6. why the result surprised or redirected expert practice at the time;
7. the later work or everyday capability that can be traced to it;
8. the failures, disputes, exclusions and claims the evidence does not support;
9. whether it deserves a full narrative chapter, a section inside another chapter,
   or exclusion from this edition.

The repeated chapter structure in the eventual book must remain invisible to
the reader. It is a research control, not a reader-facing questionnaire.

## Nontechnical meaning gate

The reader is not required to arrive knowing what a GPU, neural network,
parameter, model, benchmark, transformer, reinforcement learning or
self-supervised learning is. A technical name may appear only after the book
has established, in ordinary language:

1. what people were trying to do;
2. why the old approach kept getting stuck;
3. what physically or logically moved differently in the new approach;
4. what changed that a person outside the inventing team could observe; and
5. why that change affected the reader's world or the later course of AI.

Every chapter candidate therefore needs two additional research fields:

- **In ordinary language:** a causal explanation that can be repeated without
  borrowing the technical term.
- **Why a reader should care:** a concrete consequence in science, work,
  culture, access, power or daily life.

An analogy is not an explanation by itself. It must identify what corresponds
to what, where the comparison stops, and return to the actual system. If a
beginner can repeat the name but cannot explain the movement, the chapter has
failed.

## Selection standard

A result earns a full chapter only when it passes all four tests:

- **Constraint:** it removed or radically changed a real previous limit.
- **Receipt:** it produced a result that can be checked outside the inventor's
  marketing.
- **Consequence:** later research, products or scientific practice changed in a
  traceable way.
- **Story:** a nontechnical reader can experience the before-and-after through a
  concrete human problem, event, object or experiment.

Recent work can be extraordinary without yet passing the consequence test. It
belongs in the final forward-looking chapter until history supplies stronger
evidence.

## Provisional architecture after research

This is a research map, not a table of contents. Rows are ordered by where each
story begins. Their dates overlap because hardware, data, software and research
changed together; the eventual book must narrate those connections rather than
pretend one breakthrough ended before the next began.

| Era | Candidate story | Current editorial decision |
|---|---|---|
| Prelude | Why neural networks returned: training, data and hardware converged | Short causal prelude |
| 2000s–today | The invisible AI choosing what billions of people see | Full society chapter family; causal harms must be stated with care |
| 2006–today | A graphics chip becomes an AI engine: CUDA, GPUs and specialized chips | Major connective chapter; infrastructure is causal, not scenery |
| 2009–2012 | ImageNet and AlexNet: the labelled world meets the GPU | Full chapter family |
| 2010–2015 | AI begins to hear ordinary speech reliably enough to use | Major section; full-chapter decision awaits independent adoption and bias evidence |
| 2013–2015 | Machines learn relationships in language: embeddings, sequence-to-sequence and attention | Full chapter family |
| 2014–2022 | Machines that make images: GANs, diffusion and text-image learning | Full chapter family; research still open |
| 2015–2016 | From pixels to decisions: DQN, AlphaGo and Move 37 | Full chapter family, with Move 37 as the human scene |
| 2015–2019 | Shared tools turn custom laboratory machinery into reusable building blocks | Connective infrastructure section, not a lone-product victory story |
| 2017 | The transformer: every word can look directly at the others | Full chapter |
| 2018–2020 | Pre-train once, adapt many times: BERT, scaling laws and GPT-3 | Full chapter family |
| 2020 | Give the model a library: retrieval-augmented generation | Section, not a standalone revolution |
| 2020–2022 | AlphaFold2: an atomic-scale result in a blind scientific test | Full chapter |
| 2022 | From language model to usable assistant: instruction tuning, human preferences and ChatGPT | Full chapter family |
| 2022–today | Reasoning, tools and agents: making a model work through a problem and act outside itself | Forward-looking chapter; consequence still developing |
| 2023–today | AI as a scientific instrument: weather, materials and algorithms | Full chapter family only after independent-impact reconciliation |
| Next | AGI and superintelligence | Evidence-bounded final chapter; neither is a completed historical breakthrough |

## Dossier 1 — The deep-learning revival was a convergence, not a miracle

### The constraint before it

Researchers had neural-network ideas and backpropagation, but training many
hidden layers was difficult and unreliable. Computer vision still relied heavily
on features designed by people. Available labelled datasets and affordable
parallel computation were too small for the later recipe.

### What changed

The 2006 deep-belief-network work showed that layers could be trained one at a
time without labels and then fine-tuned. It helped reopen serious investigation
of deeper learned representations. It was not, however, the direct recipe that
later trained AlexNet or transformers.

The modern turn depended on several things arriving together: older convolutional
networks and backpropagation, better optimization, far more labelled data,
graphics processors capable of parallel numerical work, shared benchmarks and
teams able to operate the infrastructure.

### Exact evidence

Hinton, Osindero and Teh reported that their fine-tuned three-hidden-layer
generative model improved MNIST digit classification relative to the algorithms
they compared against. This is evidence for renewed feasibility, not evidence
that one 2006 paper invented modern deep learning.

### Boundary and credit correction

The eventual story must not jump from “neural networks were unpopular” to “three
famous men brought them back.” Datasets, chip design, software frameworks,
benchmark organizers, image creators and labelling workers were causal parts of
the achievement.

### Editorial decision

Short prelude. Its job is to explain convergence and remove the lone-genius
myth before the main narrative begins.

### Primary sources

- Hinton, Osindero and Teh, “A Fast Learning Algorithm for Deep Belief Nets”: https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf
- Journal record and abstract: https://pubmed.ncbi.nlm.nih.gov/16764513/
- Erhan et al., contemporary investigation of why unsupervised pre-training helped: https://proceedings.mlr.press/v5/erhan09a.html

## Dossier 1A — A graphics chip becomes an AI engine

### The constraint before it

Training a neural network means making an enormous number of small numerical
adjustments. A conventional central processor is excellent at carrying out a
complicated sequence of instructions, but it has relatively few workers. Many
parts of neural-network training instead ask for the same kind of arithmetic to
be repeated over a vast grid of numbers. Doing that work serially made large
experiments slow and costly.

### In ordinary language

A graphics processor was built to update many screen pixels at once. That gave
it a large crowd of simpler calculating units rather than a few general-purpose
ones. Neural-network arithmetic happened to contain the same useful pattern:
many similar calculations that could be done side by side.

CUDA, introduced by NVIDIA in 2006, supplied a programming model for using that
graphics hardware for general computation. Researchers no longer had to disguise
scientific arithmetic as a graphics job. Later software libraries supplied
highly tuned versions of the operations neural networks use repeatedly.

Google's Tensor Processing Unit, deployed from 2015, took specialization further.
Instead of adapting a graphics chip, it built hardware around the large grid
multiplications common in neural networks. The first published production study
reported the TPU was 15 to 30 times faster and 30 to 80 times more
performance-efficient per watt than the contemporary CPU and GPU it compared
against on Google's inference workloads. That is a bounded comparison, not a
claim that a TPU is always faster for every program.

### Why a reader should care

This changed which ideas could be tested in days rather than months, how large a
model could become, and which organizations could afford to work at the frontier.
AlexNet's 2012 result was not simply a better idea floating above the machinery;
its GPU implementation was part of the receipt. Today's concentration of
advanced chips, data centres, electricity and capital is the other side of the
same breakthrough.

### Editorial decision

Major connective chapter. The precise pivotal claim is not “NVIDIA invented
AI.” It is that programmable parallel hardware removed a practical ceiling on
experimentation, while specialized chips later turned computing access into a
central source of capability and power.

### Primary and institutional sources

- NVIDIA CUDA FAQ, including its 2006 introduction: https://developer.nvidia.com/cuda/faq
- Contemporary general-purpose GPU primer describing the price/performance opportunity and limitations: https://developer.nvidia.com/gpugems/gpugems2/part-iv-general-purpose-computation-gpus-primer
- Google TPU production analysis: https://research.google/pubs/in-datacenter-performance-analysis-of-a-tensor-processing-unit/

## Dossier 1B — Shared tools turn laboratory machinery into reusable building blocks

### The constraint before it

Having an algorithm and a fast chip did not remove the engineering burden. A
research team still had to express the calculation, keep track of millions of
adjustable values, work out how each should change, move work between processors,
load data, save experiments and eventually run the result in a product. Rebuilding
that plumbing for every idea slowed experimentation and made results harder to
reproduce.

### In ordinary language

TensorFlow and PyTorch are toolkits, not intelligent beings. They are closer to
a shared workshop: one team builds and tests the difficult machinery for moving
data and calculating adjustments, then many researchers assemble new experiments
from those parts.

TensorFlow's 2015 system description emphasized that the same expressed
calculation could run with little change on a phone, one computer or a distributed
system containing hundreds of machines and thousands of devices. PyTorch later
combined access to accelerators with a style in which researchers could run,
inspect and change ordinary Python instructions as an experiment unfolded. Its
2019 NeurIPS review treated widespread community adoption as important evidence
of impact while also noting that ease-of-use claims had not been proved through
a controlled user study.

### Why a reader should care

Frameworks shortened the distance between a paper and another team's attempt to
repeat, modify or deploy it. They helped AI spread beyond the few laboratories
able to build every layer of infrastructure themselves. They also created new
forms of dependence: a framework's supported hardware, defaults and institutional
backer can shape what is easy to investigate.

### Editorial decision

Connective infrastructure section, not a standalone triumph for TensorFlow or
PyTorch. The pivotal movement is reusable research infrastructure. Credit must
include earlier systems and the large engineering and open-source communities,
not just the public project names.

### Primary sources

- TensorFlow system paper: https://research.google/pubs/tensorflow-large-scale-machine-learning-on-heterogeneous-distributed-systems/
- PyTorch paper: https://proceedings.neurips.cc/paper/9015-pytorch-an-imperative-style-high-performance-deep-learning-library
- PyTorch peer-review record and adoption caveat: https://proceedings.neurips.cc/paper_files/paper/2019/file/bdbca288fee7f92f2bfa9f7012727740-MetaReview.html

## Dossier 2 — ImageNet and AlexNet: teaching a machine to see a labelled world

### The constraint before it

Vision systems were usually trained and compared on datasets too small and too
narrow to support high-capacity models. Researchers often designed the visual
features themselves. Different datasets and evaluation practices also made it
hard to tell whether a method represented a real advance.

### The infrastructure breakthrough

ImageNet organized web images using the WordNet hierarchy and used Amazon
Mechanical Turk workers to verify labels. The 2009 paper reported 3.2 million
images across 5,247 categories in the release then available. The later ILSVRC
competition created a shared annual test.

This was not neutral “raw data.” The categories came from a human-built lexical
hierarchy; images came from human culture and web search; people performed the
verification work. Those choices made large-scale learning possible and also
carried representational and labelling problems into the benchmark.

### The model breakthrough

Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton trained a large convolutional
network using GPUs, rectified linear units, augmentation and dropout. Instead of
receiving hand-built visual rules, the network learned useful filters from the
labelled examples.

### The decisive receipt

In ILSVRC 2012, the seven-model AlexNet ensemble achieved **15.3% top-5 test
error**, compared with **26.2%** for the second-place entry. A single model's
reported top-5 error was 18.2%. The striking figure belongs to an ensemble, not
one network.

The importance is the gap, not the slogan that a machine could now “see.” It
made a different research recipe difficult to ignore: learned features, large
data and accelerators.

### What followed

Deep convolutional networks rapidly became the dominant template in vision.
ResNet later used shortcut connections to train much deeper networks; U-Net used
an encoder-decoder shape and skip connections to locate objects at pixel level,
especially in biomedical images.

### What it did not prove

Image classification is not human vision, scene understanding or reliable
perception under all conditions. Benchmark scores do not eliminate dataset
bias, safety failures or brittleness outside the test distribution.

### People and labour to retain

- ImageNet: Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li and Fei-Fei Li.
- AlexNet: Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton.
- Also retain the unnamed crowdworkers, image makers/uploaders, WordNet
  contributors and challenge organizers as causal contributors.

### Editorial decision

Full chapter family. The human story is not “the computer saw a cat.” It is how
people first built a labelled world large enough for a machine to find its own
visual clues—and how that labelled world encoded human choices.

### Primary sources

- ImageNet 2009 paper: https://image-net.org/static_files/papers/imagenet_cvpr09.pdf
- ImageNet project history: https://www.image-net.org/about
- ILSVRC retrospective: https://arxiv.org/abs/1409.0575
- AlexNet paper: https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45-Paper.pdf
- ResNet paper: https://arxiv.org/abs/1512.03385
- U-Net paper: https://arxiv.org/abs/1505.04597

## Dossier 2A — AI begins to hear speech reliably enough to use

### The constraint before it

Speech is not neat written text delivered through a microphone. The same word
changes with the speaker, accent, speed, room, microphone and neighbouring
sounds. Earlier systems divided speech into short sound snapshots and used
carefully constructed statistical components to decide which hidden sound state
probably produced each snapshot. They worked, but error rates remained high in
ordinary conditions and improving each part required substantial expert design.

### In ordinary language

The deep-learning change did not give a computer ears. It gave the recognition
system many layers in which to learn which mixtures of sound are useful clues.
Instead of a person specifying every important acoustic distinction, the system
could adjust its internal detectors from thousands of hours of recorded speech
paired with the intended words.

A 2012 overview represented the shared results of four research groups, not one
laboratory's sudden invention. It reported that deep networks had beaten the
then-standard Gaussian-mixture acoustic components on several benchmarks,
sometimes by a large margin. A Google study that year trained on 5,870 hours of
Voice Search speech and 1,400 hours from YouTube and reduced word error by 3.7
and 4.7 absolute percentage points against its strong comparison systems.

“Word error rate” simply asks how many words must be inserted, removed or
replaced to turn the machine's transcript into the reference transcript. It is
useful, but one average number can hide much worse performance for particular
accents, languages, disabilities or noisy settings.

### Why a reader should care

This was an early proof that deep learning could improve a large, messy service
used by ordinary people—not only win an image contest. More reliable dictation,
voice search, captions and assistants followed from this family of advances.
The social consequence is double-edged: speech access can be liberating, while
always-listening devices, stored recordings and uneven recognition create
privacy and exclusion risks.

### Editorial decision

Major section provisionally titled “The day AI started listening.” It becomes a
full chapter only after independent adoption evidence and performance evidence
across accents, languages and disabilities are reconciled. The historical credit
must retain the four-group lineage and the people who created, transcribed and
consented—or did not meaningfully consent—to the speech data.

### Primary sources

- Four-group 2012 overview: https://research.google/pubs/deep-neural-networks-for-acoustic-modeling-in-speech-recognition/
- Large-vocabulary Voice Search and YouTube study: https://research.google/pubs/application-of-pretrained-deep-neural-networks-to-large-vocabulary-speech-recognition/
- Large-scale distributed training: https://research.google/pubs/large-scale-distributed-deep-networks/

## Dossier 2B — The invisible AI choosing what people see

### The constraint before it

Once a shop, streaming service or social platform contains millions of possible
items, no person can inspect them all. A chronological list solves ordering but
not relevance. A popularity list repeatedly gives attention to what is already
popular. The system needs to reduce an enormous catalogue to a handful of
choices for this person, in this moment.

### In ordinary language

A recommendation system watches clues such as what people viewed, skipped,
finished, bought or rated. It first finds a manageable group of candidates and
then ranks them by a predicted outcome. That outcome is chosen by people: a
click, minutes watched, a purchase, satisfaction, or some combination. The model
does not discover what is inherently “best.” It becomes good at the target its
designer asked it to predict.

The 2016 YouTube paper described this two-stage structure at enormous scale:
one deep model reduced the catalogue to candidates and another ranked them. The
important shift was not merely better movie suggestions. Learned ranking became
part of the machinery deciding which videos, products, music, jobs and posts
receive attention.

### Why a reader should care

This may be the AI system a reader has interacted with most often and noticed
least. Ranking changes what is visible, and visibility changes what people watch,
buy and discuss. Feedback then loops: a recommendation produces behaviour, and
that behaviour becomes new evidence for later recommendations.

The consequences cannot be reduced to “algorithms cause polarization.” Results
depend on the platform, target, population and experiment. A 2026 independent
randomized field experiment found that switching US X users from a chronological
to its algorithmic feed for seven weeks increased engagement and shifted some
current political attitudes in a conservative direction, but did not
significantly change affective polarization or self-reported partisanship. Earlier
Meta experiments reported different political results. The honest lesson is that
ranking can causally change exposure and sometimes attitudes; the size and
direction require platform-specific evidence.

### Editorial decision

Full society chapter family, subject to a historical-lineage pass. It belongs in
a history of modern AI because it changed society before generative chat became
the public face of the field. It must explain the technical movement and the
business objective together, without treating engagement as a law of nature or
making one platform stand for every recommender.

### Primary and independent sources

- Deep neural networks for YouTube recommendations: https://research.google/pubs/deep-neural-networks-for-youtube-recommendations/
- Independent randomized experiment on X's feed, with bounded outcomes: https://www.nature.com/articles/s41586-026-10098-2
- Field experiment showing human behaviour and ranking algorithms can affect one another: https://www.nature.com/articles/s41598-023-38277-5
- EU explanation of recommender-system transparency and systemic-risk duties: https://digital-strategy.ec.europa.eu/en/faqs/digital-services-act-questions-and-answers

## Dossier 3 — Language stops being a bag of isolated symbols

### The constraint before it

Earlier language systems often treated each word as a separate symbol. Neural
translation systems then faced another problem: compressing an entire source
sentence into one fixed-size representation before producing the translation.
Long sentences made that bottleneck painfully visible.

### What changed first: word vectors

Word2vec made it cheap to learn dense numerical representations from surrounding
words. CBOW predicts a word from its context; skip-gram predicts surrounding
words from a central word. The 2013 paper reported strong syntactic and semantic
relationship results while learning from 1.6 billion words in less than a day.

The result was not “the machine understood meaning.” It was that related uses
could leave a geometric trace that later systems could reuse.

### What changed next: sequence-to-sequence and attention

Sequence-to-sequence learning used one recurrent network to encode a source
sequence and another to produce a target sequence. Its 2014 WMT English-to-French
result was 34.8 BLEU, compared with 33.3 for the cited phrase-based baseline;
reranking baseline candidates reached 36.5.

Bahdanau, Cho and Bengio then let the decoder assign changing weights to source
positions for each output word. A sentence no longer had to pass through one
unchanging bottleneck. The system could consult different parts of the source
as it translated each part of the target.

### Why this mattered

Attention supplied a practical way to decide which earlier information mattered
now. The transformer later removed recurrence and made that selective comparison
the center of the whole architecture.

### Boundaries

BLEU is an imperfect proxy for translation quality. Attention weights are not
automatically explanations. Learned word geometry also reproduces stereotypes
and omissions in the text used for training.

### People and infrastructure

- Word2vec: Tomas Mikolov, Kai Chen, Greg Corrado and Jeff Dean.
- Sequence-to-sequence: Ilya Sutskever, Oriol Vinyals and Quoc V. Le.
- Neural attention: Dzmitry Bahdanau, Kyunghyun Cho and Yoshua Bengio.
- Also retain translators, parallel-corpus creators and WMT organizers.

### Editorial decision

Full chapter family. The story is the progressive removal of bottlenecks, not a
parade of acronyms.

### Primary sources

- Word2vec: https://arxiv.org/abs/1301.3781
- Sequence-to-sequence learning: https://arxiv.org/abs/1409.3215
- Neural machine translation with attention: https://arxiv.org/abs/1409.0473

## Dossier 4 — GANs and diffusion: machines learn to make images

### The constraint before GANs

Generative modelling often required difficult probability calculations or
approximations. Producing convincing samples without writing down a tractable
likelihood for every image was hard.

### The adversarial idea

Ian Goodfellow and colleagues trained two networks in opposition. A generator
made samples; a discriminator tried to distinguish them from training data.
Each exposed the other's weakness. The 2014 paper demonstrated the formulation
on MNIST, the Toronto Face Database and CIFAR-10.

The breakthrough was the training game, not instant photorealism. Later GANs
made striking images, but instability and mode collapse remained central
problems. A visually persuasive synthetic image also says nothing about consent,
provenance or truth.

### The diffusion turn

The idea did not appear fully formed in 2020. In 2015, Jascha Sohl-Dickstein,
Eric Weiss, Niru Maheswaranathan and Surya Ganguli described slowly destroying
structure with a forward diffusion process and learning a reverse process that
restored it. In 2019, Yang Song and Stefano Ermon trained a network to estimate
which direction would move a noisy image toward regions containing more of the
training data, then followed those directions while gradually reducing the
noise. This score-based line and the diffusion line were later shown to be
closely connected.

In ordinary language, the useful movement is this: take a real image, add static
in many small steps, and preserve the answer to each practice problem because
the clean image is already known. Train a network to undo a little of that
damage. At generation time, begin with static and repeat the learned cleanup
step until structure appears. “Diffusion” names the mathematical family; it does
not mean the system is retrieving one hidden original photograph from the noise.

The 2020 denoising diffusion paper started with data, gradually added noise,
and trained a model to reverse that corruption. Its result reached a then
state-of-the-art CIFAR-10 FID score of 3.17 and produced 256-by-256 samples
similar in quality to ProgressiveGAN.

The NeurIPS peer reviews described it as an alternative generative mechanism
that finally matched established high-quality image approaches and connected
diffusion probabilistic models with denoising score matching. This is useful
contemporary evidence; it is stronger than a later corporate victory story.

### Text meets images

CLIP learned which text belonged with which image using 400 million image-text
pairs. It matched the original ResNet-50 on ImageNet without training on the
1.28 million ImageNet examples and was tested across more than 30 datasets.
Natural language became a flexible way to refer to visual concepts. Together,
language-image representation learning and improved generators helped make
text-directed image generation practical.

Latent diffusion supplied another essential bridge. Pixel-space diffusion was
expensive because the denoising network repeatedly worked on every pixel. Robin
Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser and Bjorn Ommer moved
the process into a compressed learned representation, then used cross-attention
to condition generation on text or other inputs. Their paper reported strong
image-generation, inpainting and super-resolution results with substantially
lower computation than pixel-space diffusion. This is the mechanism underlying
the later Stable Diffusion line; the product name must not replace the research
lineage.

### Credit and conflict still requiring research

The technical lineage now includes the 2015 diffusion formulation, the 2019
score-based route, the 2020 denoising result, CLIP and latent diffusion. The
chapter must still reconcile ConVIRT and other natural-language-supervision
precursors and explain how text conditioning crossed from representation learning
into generation. It must also research dataset provenance, creator consent,
cultural bias and the labour behind data filtering. This dossier is not yet
complete enough to draft the chapter.

### Editorial decision

Full chapter family, but **OPEN RESEARCH**. It needs a better causal bridge from
GANs through diffusion and CLIP to text-to-image systems, plus independent
evidence about creative practice and harms.

### Primary sources

- GAN paper: https://proceedings.neurips.cc/paper_files/paper/2014/file/f033ed80deb0234979a61f95710dbe25-Paper.pdf
- 2015 diffusion formulation: https://proceedings.mlr.press/v37/sohl-dickstein15.html
- 2019 score-based generative modelling: https://proceedings.neurips.cc/paper_files/paper/2019/hash/3001ef257407d5a371a96dcd947c7d93-Abstract.html
- Denoising diffusion paper and reviews: https://proceedings.neurips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html
- CLIP paper: https://cdn.openai.com/papers/Learning_Transferable_Visual_Models_From_Natural_Language_Supervision.pdf
- CLIP institutional record with stated limitations: https://openai.com/index/clip/
- Latent diffusion: https://arxiv.org/abs/2112.10752

## Dossier 5 — From pixels to decisions: DQN, AlphaGo and Move 37

### The constraint before DQN

Q-learning naturally fitted small tables of states and actions, not a stream of
Atari pixels. Training from consecutive experience was unstable because nearby
observations were strongly related and the values being learned kept moving.

### What DQN changed

A convolutional network learned action values from stacks of frames. Experience
replay mixed stored past events; a periodically fixed target network made the
learning target more stable.

The 2015 Nature paper used one broad algorithm and hyperparameter setting across
49 Atari games and exceeded the paper's human-comparison score on 29. “Human
level” is only defensible with that test protocol attached. Atari competence is
not a general ability to act safely in the world.

### The Go problem

Go has simple rules and an enormous field of possible continuations. Exhaustive
search is not a workable plan. Strong play depends on narrowing attention:
which moves deserve investigation, and which board positions are promising?

AlphaGo combined three functions:

- a policy network proposed promising moves;
- a value network estimated the chance of winning from a position;
- Monte Carlo tree search investigated selected continuations.

The 2016 version learned from human expert games and improved through self-play.
It did not inspect every possible game and did not begin without human examples.

### The receipts

The Nature paper reported a 99.8% win rate against other Go programs and a 5–0
victory over Fan Hui. AlphaGo then defeated Lee Sedol 4–1 in March 2016.

Move 37 occurred in Game 2. Its significance must not rest on the sentence “AI
did something weird.” It was played under shared rules against one of the
world's strongest players, tested through the rest of the complete game, and
contributed to a win. DeepMind describes the move as having a 1-in-10,000 chance
of being selected under its relevant human-move prediction; that is DeepMind's
model-based description, not a universal scientific measure of creativity.

Lee Sedol's Move 78 and victory in Game 4 belong in the same chapter. They
prevent a machine-triumph fable and expose AlphaGo's fallibility.

### Why the wonder is justified

The system did not merely imitate a stored professional move. Learned judgement
focused a limited search on a move elite human observers did not expect, and a
hard adversarial test validated its value. This was a machine finding where to
look when looking everywhere was impossible.

### What it did not prove

Go supplies stable rules, legal moves and a clear result. Hiring, medicine and
ordinary advice do not. Move 37 did not demonstrate consciousness, general
wisdom, moral judgement or the reliability of surprising AI outputs in domains
without hard answer keys.

### Editorial decision

Full chapter family. DQN supplies the technical bridge; the Seoul match supplies
the human drama and unusually strong receipt.

### Primary sources

- DQN Nature paper: https://www.nature.com/articles/nature14236
- AlphaGo Nature paper: https://www.nature.com/articles/nature16961
- DeepMind AlphaGo research record: https://deepmind.google/research/alphago/
- AlphaZero: https://www.science.org/doi/10.1126/science.aar6404
- MuZero: https://www.nature.com/articles/s41586-020-03051-4

## Dossier 6 — The transformer: every word can look directly at the others

### The constraint before it

Recurrent language systems processed a sequence step by step. That made distant
relationships harder to preserve and limited how much training could happen in
parallel. Earlier attention helped the decoder consult an encoded sentence, but
recurrence remained the main structure.

### What changed

The 2017 transformer replaced recurrence and convolution with attention. Each
token could form weighted relationships with other tokens, while positional
information preserved order. Multiple attention heads could learn different
relationships. Feed-forward layers, residual paths and normalization were also
essential; “attention alone” is a memorable title, not a complete parts list.

### The decisive receipts

The paper reported 28.4 BLEU on WMT 2014 English-to-German, more than two BLEU
above the prior best results it compared against, and 41.8 BLEU on
English-to-French after 3.5 days on eight GPUs. It emphasized both quality and
parallelizable training.

### People and prior work

Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan
Gomez, Lukasz Kaiser and Illia Polosukhin authored the paper. Its contribution
statement records that author order was random and describes different design,
implementation and evaluation contributions. The chapter must retain the earlier
Bahdanau attention lineage and corpus/evaluation infrastructure.

### What followed

Transformers became the reusable architecture beneath BERT, GPT-style language
models, vision transformers, multimodal systems and parts of AlphaFold2. The
important consequence was not one better translator: the architecture made
large-scale pretraining across many domains practical.

### Boundaries

Attention cost grows sharply with sequence length in the original design.
Parallelizable training does not mean cheap training. Benchmark translation
quality did not establish truthfulness, grounding or general understanding.

### Editorial decision

Full chapter. This is one of the clearest architecture-level pivots in the book.

### Primary sources

- Original paper and author contributions: https://arxiv.org/abs/1706.03762
- Paper PDF: https://arxiv.org/pdf/1706.03762
- Bahdanau attention predecessor: https://arxiv.org/abs/1409.0473

## Dossier 7 — Pre-train once, adapt many times: BERT, scaling laws and GPT-3

### The old constraint

Strong language systems still required substantial task-specific architectures
or thousands of labelled examples and separate fine-tuning for each new task.

### The larger change: the data can supply its own practice questions

Most of the internet does not arrive with a teacher's answer sheet attached.
Hand-labelling enough examples for every possible language task would be
impossible. Self-supervised learning creates a temporary answer from material
that already exists: hide a word and ask the system to recover it, or show the
beginning of a passage and ask what comes next. The original word remains the
answer, so no person has to label each practice question.

That is what “self-supervised” means here. The system is not supervising itself
in the human sense and it is not deciding its own education. People still choose
the data, objective, model and exclusions. The training material merely supplies
vast numbers of automatically generated prediction-and-answer pairs.

This shift deserves to be made explicit because it is the bridge from scarce
task labels to internet-scale pretraining. It also explains why the contents of
large text collections matter so much: the model practises on the patterns,
errors, stereotypes, private material and gaps present in those collections.

### BERT's change

BERT pre-trained a bidirectional transformer representation from unlabelled text,
then added a small task layer and fine-tuned it. The original paper reported new
state of the art on 11 tasks: GLUE 80.5 (a 7.7-point absolute improvement),
MultiNLI 86.7, SQuAD v1.1 F1 93.2 and SQuAD v2.0 F1 83.1.

The practical shift was reusable pretraining: invest once in broad language
patterns, then adapt rather than rebuild each task system from scratch.

“Bidirectional” means that when BERT tries to recover a hidden word, it can use
the words on both sides of the blank. “Fine-tuning” means giving the already
practised model a smaller set of examples for a particular job and making further
adjustments, rather than beginning again with an untrained network.

### Scaling becomes a strategy

Kaplan and colleagues found empirical power-law relationships between language
model loss, model size, data and training compute across more than seven orders
of magnitude. This did not prove that every important capability would keep
improving or that loss equals intelligence. It made expensive training outcomes
more predictable and turned scale itself into a research and business strategy.

Hoffmann and colleagues later showed that many large models were undertrained:
under a fixed compute budget, model size and training tokens should rise together.
Their 70-billion-parameter Chinchilla model used the same training compute as
280-billion-parameter Gopher with four times more data and outperformed much
larger comparison models on their reported evaluations. “Bigger” was corrected
to “more compute-efficient balance of model and data.”

### GPT-3's change

GPT-3 had 175 billion parameters and received tasks as instructions or examples
inside text without gradient updates. It reported strong few-shot results across
translation, question answering, cloze tasks and some arithmetic and novel-word
tasks, while also documenting failures and methodological issues caused by large
web corpora.

The wonder is not that GPT-3 never failed. It is that changing the text in front
of one trained model could make it attempt many jobs that previously demanded
separate training pipelines.

### Boundaries and power

In-context performance varied sharply by task and prompt. Web-scale training
introduced bias, privacy, copyright, contamination and energy questions. Scale
concentrated the frontier among organizations able to obtain vast compute, data
and capital. Those are not sidebars; they are part of what the breakthrough
meant.

### Editorial decision

Full chapter family. BERT establishes reusable pretraining; scaling laws explain
the industrial strategy; GPT-3 makes text itself a temporary task specification.

### Primary sources

- BERT: https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/
- Scaling laws: https://arxiv.org/abs/2001.08361
- GPT-3: https://arxiv.org/abs/2005.14165
- Chinchilla compute-optimal training: https://arxiv.org/abs/2203.15556

## Dossier 8 — Retrieval: give the model a library instead of a larger memory

### The constraint

Information stored only in model parameters is hard to update, inspect or cite.
Language models were weak on knowledge-intensive tasks and could produce fluent
claims without recoverable provenance.

### What changed

The 2020 RAG paper combined a pre-trained generator with a learned retriever over
a Wikipedia index. Retrieved passages became external context for generation.
The paper reported state of the art on three open-domain question-answering tasks
and more specific, diverse and factual text than its parametric-only comparison.

### Significance and boundary

Retrieval changed the system design: not every fact had to live inside the model.
Knowledge could be updated by changing the collection, and passages could be
shown to a user. But retrieval does not guarantee that the right source is found,
that the source is true, or that the model uses it faithfully.

### Editorial decision

Important section inside the assistant/tools chapter, not a standalone chapter.

### Primary source

- Lewis et al., RAG: https://arxiv.org/abs/2005.11401

## Dossier 9 — AlphaFold2: an atomic-scale result in a blind test

### The problem before it

A protein is a chain of amino acids that folds into a three-dimensional structure.
Structure can be central to understanding what the protein does and how it
interacts. Experimental determination can take months or years. Around 100,000
unique structures had been experimentally determined while billions of protein
sequences were known.

Computational approaches used physical simulation, evolutionary relationships
and known templates, but usually fell far short of experimental accuracy when a
close known structure was unavailable.

### What AlphaFold2 used

The model jointly processed multiple-sequence alignments and relationships among
amino-acid positions, incorporated geometric constraints and repeatedly refined
an internal structure before directly predicting atomic coordinates. It also
estimated confidence for local regions and relative placement.

This depended on decades of experimentally determined structures in the Protein
Data Bank, explosive genomic sequencing, curated sequence databases, CASP's
blind-evaluation culture and advances in attention and deep learning. The
experimental community's accumulated work is part of the breakthrough.

### The decisive receipt

CASP14 used newly solved structures that had not yet been publicly released. It
was a blind community test, not a DeepMind-selected demo.

On the paper's CASP domains, AlphaFold2 reported median backbone error of **0.96
angstroms**, compared with **2.8 angstroms** for the next-best method. A carbon
atom is about 1.4 angstroms wide. The all-atom comparison was 1.5 angstroms
against 3.5 for the best alternative. The official CASP result tables show
AlphaFold2 dominating the highest-ranked targets.

That atom-width comparison supplies justified wonder: a computational prediction
had crossed into a regime where it could often become a serious starting point
for structural biology rather than a rough sketch.

### What changed afterward

AlphaFold2 and the public AlphaFold database made structural hypotheses available
at enormous scale. The 2021 human-proteome paper covered 98.5% of human proteins.
The scientific change was not “experiments became unnecessary.” Researchers
could begin many investigations with a predicted structure, prioritize experiments
and interpret difficult data differently.

### What it did not solve

The AlphaFold Database warns that the system:

- is not validated for predicting mutation effects;
- usually produces one conformation when proteins can take several;
- does not place ligands, metals, ions, DNA/RNA or modifications;
- can be unreliable in disordered regions and uncertain about domain placement;
- supplies confidence in a structural arrangement, not confidence in the full
  biological correctness or function of the model.

A predicted structure is not a drug, mechanism, diagnosis or proof of function.

### Editorial decision

Full chapter. It has an unusually strong independent receipt, an immense prior
human infrastructure, a comprehensible scale comparison and a genuine change in
scientific workflow.

### Primary and independent sources

- AlphaFold2 Nature paper: https://www.nature.com/articles/s41586-021-03819-2
- CASP14 official results: https://predictioncenter.org/casp14/results.cgi?view=tb_results
- Human proteome paper: https://www.nature.com/articles/s41586-021-03828-1
- EMBL-EBI AlphaFold Database limits and confidence guidance: https://alphafold.ebi.ac.uk/faq
- Structural-biology community assessment: https://www.nature.com/articles/s41594-022-00849-w

## Dossier 10 — From model to assistant: instruction tuning, human preferences and ChatGPT

### The constraint

Predicting plausible next text did not automatically make a model follow a
person's instruction, tell the truth, refuse harmful requests or remain helpful
through a conversation. Larger models could still be unhelpful, toxic or
confidently wrong.

### What instruction tuning and RLHF changed

The InstructGPT team collected prompts, labeler-written demonstrations and human
rankings of model outputs. Supervised fine-tuning first demonstrated desired
behaviour; a learned reward model represented the rankings; reinforcement
learning then optimized outputs against that feedback.

In the paper's human evaluations, a 1.3-billion-parameter InstructGPT model was
preferred to 175-billion-parameter GPT-3 despite being more than 100 times
smaller. This is a crucial correction to a pure scale story: training objective
and human feedback could matter more to usefulness than parameter count.

### ChatGPT's product change

OpenAI released ChatGPT as a free research preview on 30 November 2022. The
dialogue interface allowed follow-up questions, corrections and conversational
continuity. The launch combined existing research lines into an unusually
accessible product; it was not a new base architecture invented that day.

### People and hidden labour

The InstructGPT paper names a large research team and explicitly depends on
human labelers who wrote examples and compared responses. The appendix reports
about 40 contractors hired through Upwork and Scale AI. The book must explain
that apparently natural assistant behaviour was partly shaped by repeated human
judgements from a small, selected group—not a neutral sample of humanity.

A separate safety-data project must not be conflated with those InstructGPT
labelers. TIME reviewed documents and interviewed Kenyan workers employed by
Sama who labelled disturbing text for a toxicity-detection tool that OpenAI
confirmed was eventually built into ChatGPT. The report found pay below US$2 an
hour and workers described psychological harm; OpenAI said it had not known the
working conditions, while Sama said counselling was available. This labour is a
different part of the product stack, but it is equally incompatible with a story
in which helpfulness and safety simply emerged from a clever algorithm.

### Boundaries

RLHF can make outputs more preferred without making every answer true. Preference
models can reward polished confidence, majority norms or evaluator expectations.
ChatGPT's astonishing public uptake is evidence of accessibility and product
impact, not evidence of consciousness or settled general intelligence.

### Editorial decision

Full chapter family. The breakthrough is the assembly of model, feedback method
and conversation interface into something ordinary people could actually use.

### Primary sources

- InstructGPT paper: https://arxiv.org/abs/2203.02155
- Original ChatGPT research-preview announcement: https://openai.com/index/chatgpt/
- Anthropic's contemporary helpful-and-harmless RLHF work: https://arxiv.org/abs/2204.05862
- TIME investigation of the separate Kenyan safety-data work: https://time.com/6247678/openai-chatgpt-kenya-workers/

## Dossier 10A — Open weights change who can experiment

### The constraint

As foundation models became larger, reproducing them required compute and data
available to very few laboratories. Researchers and smaller organizations could
study model outputs through an interface while lacking the weights needed to run,
inspect, adapt or deploy the model themselves.

### The candidate breakthrough

The 2023 LLaMA paper trained models from 7 to 65 billion parameters on publicly
available datasets. It reported that LLaMA-13B outperformed GPT-3 on most of its
benchmarks and that LLaMA-65B was competitive with Chinchilla-70B and PaLM-540B.
Meta released the original models to researchers rather than as unrestricted
open-source software; later releases used their own licences. “Open source,”
“open weights,” “research access” and “publicly downloadable” must not be treated
as synonyms.

### What may have changed

Smaller, capable weights made local fine-tuning, quantization and independent
experimentation much more accessible. The latent-diffusion/Stable Diffusion line
did something analogous for image generation. But the downstream consequence
needs more than download counts or community enthusiasm: it requires evidence of
new research, languages, deployments or safety work that closed models could not
support, alongside evidence of misuse and licence limits.

### Editorial decision

**OPEN RESEARCH.** Likely a section about access and concentrated power, not a
standalone technical chapter. It may also belong partly in the Who's Who book.

### Primary sources

- LLaMA paper: https://arxiv.org/abs/2302.13971
- Latent diffusion paper: https://arxiv.org/abs/2112.10752

## Dossier 11 — Reasoning, tools and agents: a capability still becoming history

### The constraints

A language model that answers in one pass has limited opportunity to break down
a problem, check external information, recover from errors or act in an
environment. Fluent intermediate text can also be mistaken for faithful internal
reasoning.

### Research landmarks

- Chain-of-thought prompting showed large gains on arithmetic, commonsense and
  symbolic tasks by providing worked intermediate examples. Eight examples with
  a 540-billion-parameter model produced then-state-of-the-art GSM8K results.
- ReAct interleaved reasoning traces and external actions. It improved success
  over its baselines by 34 percentage points on ALFWorld and 10 on WebShop, and
  used Wikipedia actions for question answering and fact verification.
- Toolformer trained a model to decide when and how to call tools through
  self-supervised examples.

### Why caution is necessary

Later work showed that useful chain-of-thought behaviour can persist even when
demonstrated reasoning is invalid. A generated explanation may help computation
without being a faithful account of why the model produced the answer.

Agentic systems also change the risk boundary: errors can become actions taken
through browsers, code, messages or other tools. Performance, generality and
autonomy are separate dimensions.

### Editorial decision

Forward-looking chapter, not a sequence of claimed settled breakthroughs. The
book may explain the shift from “answer” to “plan, act, observe and revise,” but
must date every capability claim and avoid declaring current agents reliable or
autonomous in general.

### Primary sources

- Chain-of-thought: https://arxiv.org/abs/2201.11903
- ReAct: https://arxiv.org/abs/2210.03629
- Toolformer: https://arxiv.org/abs/2302.04761
- Empirical caution on invalid reasoning demonstrations: https://arxiv.org/abs/2212.10001
- Agenticness as distinct from performance and generality: https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf

## Dossier 12 — AI becomes a scientific instrument

This family needs independent impact research before it can become one chapter.
The primary results are strong; their long-term consequences are still being
established.

### GraphCast: weather as a learned global system

GraphCast represented the atmosphere on a multiscale graph and predicted 227
variables at six-hour intervals for ten days. Its Science paper reported better
accuracy than ECMWF's deterministic HRES system on 89.3% of 2,760 variable and
lead-time combinations, and generated a ten-day forecast in under a minute on
the stated TPU hardware.

The receipt is unusually concrete, but the chapter must distinguish retrospective
reanalysis tests from the operational job of weather agencies, uncertainty
ensembles, changing climate conditions and warning decisions.

Independent consequence is now visible at the field level, but must not be
misattributed to GraphCast alone. ECMWF states that systems including FourCastNet,
Pangu-Weather, GraphCast and its own AIFS demonstrated highly skilful learned
forecasting. ECMWF put its distinct AIFS deterministic model into operations in
February 2025 and a 51-member ensemble into operations in July 2025, alongside
physics-based systems. ECMWF also records first-generation learned systems'
tendency to produce overly smooth fields and AIFS's continued dependence on
physics-based data assimilation for initial conditions. The breakthrough is a
research movement from experimental learned forecasts into operationally
supported complementary systems—not “GraphCast replaced weather physics.”

Sources:

- GraphCast publication: https://deepmind.google/research/publications/22598/
- ECMWF operational AIFS record: https://www.ecmwf.int/en/about/media-centre/news/2025/ecmwfs-ai-forecasts-become-operational
- ECMWF independent lineage and smoothing limitation: https://www.ecmwf.int/en/newsletter/185/earth-system-science/aifs-ens-becomes-operational

### GNoME: searching a combinatorial materials universe

GNoME used graph networks to rank candidate crystal structures, checked selected
candidates with density-functional-theory calculations and fed the results back
into training. The Nature paper reported 2.2 million structures stable relative
to previous calculations, 381,000 entries on its updated stability hull and 736
matches to independently realized experimental structures.

The phrase “discovered 2.2 million materials” is too loose. Computational
stability is not synthesizability, useful properties or a manufactured material.
The paper itself lists phase transitions, entropy and practical synthesis as open
problems. Later criticism and reassessment of novelty claims must be reconciled
before this receives a wonder-filled chapter.

Sources:

- Nature paper: https://www.nature.com/articles/s41586-023-06735-9
- Later critical reporting to reconcile: https://www.nature.com/articles/d41586-025-03147-9

### Editorial decision

Provisional full chapter family, **HOLD FOR INDEPENDENT IMPACT RESEARCH**. Its
story would be that AI begins to search spaces too large for unaided trial and
error—but AlphaFold2 remains the strongest completed scientific case.

## Dossier 13 — AGI and superintelligence are possibilities, not completed chapters of history

### Definitions are contested

OpenAI's charter defines AGI as highly autonomous systems that outperform humans
at most economically valuable work. The Google DeepMind “Levels of AGI” paper
instead separates breadth or generality, depth of performance and autonomy, and
proposes performance levels rather than one magical finish line.

Those definitions make different value choices. “Economically valuable work”
is not the whole of human intelligence. A broad benchmark score is not the same
as dependable real-world autonomy. Neither definition establishes that AGI has
arrived or when it will.

### Superintelligence

Scholarly treatments generally use the term for a hypothetical system that far
surpasses the best human cognitive performance across very broad domains. No
such system is established by the evidence in this dossier. Recursive
self-improvement, rapid takeoff and loss-of-control scenarios are argued
possibilities, not observed historical events.

### What the ending can responsibly do

The final chapter can explain:

- why broader, more capable and more autonomous systems could amplify scientific
  discovery, productivity and access to expertise;
- why the same properties could amplify error, cyber misuse, concentrated power,
  surveillance and loss of meaningful human control;
- why capability, autonomy, consciousness and moral status are different questions;
- which claims are demonstrated today, which are forecasts and which are
  philosophical or technical hypotheses;
- why uncertainty is a reason for evidence and governance, not for either
  dismissal or inevitability.

### Editorial decision

Final evidence-bounded chapter. It must not function as a prediction contest or
as free advertising for any laboratory's mission.

### Primary and scholarly sources

- Google DeepMind, “Levels of AGI”: https://arxiv.org/abs/2311.02462
- OpenAI Charter definition: https://openai.com/charter/
- Scholarly definition of hypothetical superintelligence: https://arxiv.org/abs/1607.00913
- Independent critique of recursive self-improvement assumptions: https://academic.oup.com/nsr/article/5/1/54/3789514
- AGI safety and governance expert survey: https://arxiv.org/abs/2305.07153

## Cross-cutting dossier — The breakthrough changes who has power and who pays

This is not a detached “ethics” chapter added after the exciting inventions. The
resources and labour are part of how the inventions work.

### Compute and concentration, in ordinary language

As larger training runs became a repeatable route to stronger benchmark results,
the entrance fee rose. The frontier increasingly required scarce advanced chips,
large data centres, specialist teams, electricity and enormous capital. Stanford's
2026 AI Index reports that industry produced more than 90% of the notable frontier
models it counted in 2025. It also reports that most leading AI chips depend on a
single Taiwanese foundry. These are concentration indicators, not proof that
universities or smaller organizations no longer contribute important ideas.

Why a reader should care: the organizations able to fund the machinery gain
greater influence over which models are built, which evidence is disclosed, who
receives access and which risks are treated as priorities.

### Energy, in ordinary language

A model is software, but running it is physical work performed by chips in
buildings that require electricity and cooling. The International Energy Agency's
2025 base case projects global data-centre electricity use rising from about
415 terawatt-hours in 2024 to roughly 945 in 2030, with AI the most important
driver of the increase alongside other digital services. A terawatt-hour is one
billion kilowatt-hours; the comparison is included for scale, not to ask the
reader to memorize the unit. The projection is uncertain and covers data centres,
not AI alone.

Why a reader should care: claims about capability, price and access are inseparable
from grids, local siting decisions, emissions, hardware efficiency and who bears
infrastructure costs. The same IEA analysis says data centres remain a relatively
small share of global electricity use while becoming a much larger source of
electricity-demand growth in some countries. Both facts must remain together.

### Human labour, in ordinary language

“The model learned from data” can make the people disappear. People create text,
images and recordings; collect, clean and label examples; compare model answers;
filter disturbing material; write software; maintain data centres; and evaluate
failures. An ILO study based partly on 2022–23 surveys in India and Kenya separates
algorithmic workers from data workers and reports that the latter are often
invisible to users and vulnerable to poor working conditions.

Why a reader should care: an automated-looking answer can contain layers of
human judgement and labour. Credit, consent, pay, exposure to harmful material
and the ability to contest a system are part of the breakthrough's receipt.

### Editorial decision

Thread these consequences through the relevant chapters, then include one short
synthesis near the scaling era. Do not exile them to a moral at the end. Water
use, data ownership, copyright and capital-market concentration remain open
research; no quantitative claim on those subjects is yet admitted.

### Independent and institutional sources

- Stanford 2026 AI Index: https://hai.stanford.edu/ai-index/2026-ai-index-report
- IEA 2025 Energy and AI executive summary: https://www.iea.org/reports/energy-and-ai/executive-summary
- IEA energy-supply scenarios and boundaries: https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai
- ILO research on human labour behind AI: https://researchrepository.ilo.org/esploro/outputs/journalArticle/Challenging-the-Myth-of-AI-Autonomy/995703567802676

## Research gaps that block admission or publication

### Draft-admission update after continued research

Ali directed the work to continue through a complete draft. The following gaps
were closed sufficiently for a transparent draft, not for publication:

- Generative-image lineage now connects GANs, the 2015 diffusion formulation,
  score-based work, denoising diffusion, CLIP, latent diffusion and LAION-5B;
  creator-consent, copyright and downstream creative-practice evidence remain
  final-review gaps.
- Feedback labour now separates the InstructGPT preference-labeling record from
  independently reported Kenyan toxicity-classification work. The latter must
  never be described as all ChatGPT reinforcement learning from human feedback.
- Speech now includes independent evidence that aggregate improvement did not
  mean equal performance across speakers; the cited US study's racial disparity
  is bounded to the five systems and recordings it evaluated.
- Recommendation research now includes matrix factorization, two-stage deep
  candidate selection/ranking and a platform-specific randomized feed study.
- Open weights, multimodality, framework lineage, AI for science, energy,
  concentration and data labour have evidence-bounded draft dispositions.
- A 2,000-word meaning-before-name Move 37 representative chapter passed a blind
  model-based beginner review on exact artifact
  `6793fc4f4610ec0171fb51ce4ae30a775cfa6d0ba30b2f7878bfb0c969847bdc`.
  This is not unfamiliar-human evidence or publication approval.

The numbered list below is retained as the final-reconciliation register. It no
longer prohibits Ali's draft; unresolved items prohibit admission or publication.

The following work remains compulsory:

1. **Generative images:** connect GANs, score matching, diffusion, CLIP and
   text-to-image systems without falsely assigning the whole shift to one paper;
   add independent evidence on creative practice, dataset provenance and harm.
2. **ChatGPT and feedback labour:** reconcile the distinct InstructGPT preference
   labelers and Kenyan toxicity-detection workers; add independent evidence of
   the interface's adoption and consequences without using user counts as a
   substitute for social impact.
3. **Open models and access:** determine whether the release of open-weight
   foundation models changed the field enough for its own section, using exact
   release and downstream evidence rather than ideology.
4. **Speech and access:** add independent evidence of adoption and performance
   across accents, languages, noise and disability before deciding whether the
   deep-speech shift earns a full chapter.
5. **Recommendation systems:** trace the pre-deep-learning lineage and economic
   objectives; compare causal studies across platforms so one result is not
   generalized into a universal claim about attention or politics.
6. **Framework and hardware lineage:** add non-corporate historical evidence for
   general-purpose GPU computing, CUDA, cuDNN, TensorFlow, PyTorch and important
   predecessors; decide whether these form one infrastructure chapter or recur
   inside the breakthroughs they enabled.
7. **Multimodality:** decide whether the integration of speech, images, video and
   text is a distinct breakthrough or a consequence of shared representations
   and pretraining. Do not use “multimodal” before explaining that ordinary
   meaning.
8. **AI for science:** reconcile independent assessments of GraphCast and GNoME,
   including operational adoption, failed predictions and disputed novelty.
9. **Environmental and political economy:** energy, compute concentration and
   labour now have independent starting evidence; water, chip-supply attribution,
   data ownership, copyright and market concentration still require specific,
   bounded evidence.
10. **Historical omissions:** audit women, undercredited engineers, dataset
   workers, benchmark organizers and non-US institutions across every selected
   chapter.
11. **Cold-reader evidence:** only after research closure, draft one full
   representative chapter and test whether a nontechnical reader can explain the
   breakthrough and its significance without borrowing unexplained jargon. The
   test must include the reader explaining at least one causal movement without
   repeating the book's technical name for it.

## Claims prohibited in the future manuscript

- “AI learned to see” as a complete account of AlexNet.
- “The transformer understands every word in relation to every other word.”
- “GPT-3 learned new jobs from a few examples” without naming the evaluation and
  failures.
- “ChatGPT was invented in November 2022.”
- “AlphaGo calculated all possible Go moves.”
- “Move 37 proved machine creativity, intuition or consciousness.”
- “AlphaFold solved protein folding,” “solved biology,” or replaced experiments.
- “GNoME discovered 2.2 million usable new materials.”
- “AGI is the next inevitable step,” “AGI has arrived,” or any dated AGI forecast
  presented as fact.
- “Superintelligence” described as an existing system rather than a hypothetical
  category unless independently verifiable evidence materially changes.

## Research-state verdict

The earlier source packet was a bibliography, not deep research. This dossier
now establishes a defensible causal spine and records the remaining
final-reconciliation gaps. Ali's direction authorized a complete draft after the
representative chapter cleared the model-based beginner gate. A 14-chapter local
draft now exists. **It is not admitted or published.** The next gate is Ali's
substantive review followed by exact-artifact accuracy and beginner review; the
unresolved items above continue to block any PASS or release verdict.
