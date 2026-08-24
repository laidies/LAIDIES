# Move 37 — claim and source packet

Status: EXPANDED RESEARCH COMPLETE FOR LOCAL TEXT CANDIDATE
Reviewed through: 2026-08-24
Owner: LAiDIES Library with independent source review

## Selection rule

A moment belongs in the book only when it introduced a reusable mechanism, removed a concrete prior constraint, has a traceable downstream consequence, and can be explained with an honest boundary. The recurring receipt is:

`before -> mechanism -> observed change -> boundary -> consequence -> what would verify the bigger claim`

The book is not a universal ranking of the “most important” inventions. It is an argued selection whose criteria and exclusions remain visible.

## Representative proof: AlphaGo and Move 37

### Claims supported

- Silver et al. describe AlphaGo as policy and value networks combined with Monte Carlo tree search. Training used expert games and reinforcement-learning self-play.
- AlphaGo defeated Lee Sedol 4–1 in March 2016.
- Google DeepMind’s record describes Game 2, Move 37 as having an estimated 1-in-10,000 likelihood under the relevant move prediction. This supports “counterintuitive to contemporary expectations,” not “no human could ever think of it.”
- Lee Sedol won Game 4. DeepMind also describes his Move 78 as highly improbable. The human-machine story therefore includes machine surprise and human counterplay.
- Silver et al.’s later AlphaZero paper describes a single self-play reinforcement-learning algorithm that achieved superhuman play in chess, shogi and Go. It is a traceable later instance of learned evaluation plus search moving beyond the original AlphaGo match, not proof of transfer to open-ended real life.

### Claims rejected

- “AlphaGo calculated every possible continuation.”
- “Move 37 proved consciousness, general intelligence, or that a surprising AI answer is probably right.”
- “The move had never been imagined in 3,000 years.”
- “AlphaGo transferred directly from Go to biology.”

### Reader-level distinction

Go supplied a delayed but hard answer key: win or lose under shared rules. A surprising answer in medicine, hiring, law, or ordinary language does not have that automatic validation.

`surprising output + hard answer key = candidate discovery`

`surprising output - hard answer key = hypothesis requiring verification`

### Primary or authoritative sources

1. Silver et al., “Mastering the game of Go with deep neural networks and tree search,” Nature (2016): https://www.nature.com/articles/nature16961
2. Google DeepMind, AlphaGo research record: https://deepmind.google/research/alphago/
3. Google DeepMind, “10 years of AlphaGo” (2026 retrospective; recheck exact interpretive wording before publication): https://deepmind.google/blog/10-years-of-alphago/
4. Silver et al., “A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play,” Science (2018): https://www.science.org/doi/10.1126/science.aar6404

## Representative proof: AlphaFold2

### Claims supported

- Jumper et al. address protein structure prediction from sequence, not every scientific meaning of “protein folding.”
- AlphaFold2 reasons over evolutionary alignments and residue-pair relationships, predicts 3D coordinates, and provides confidence information.
- CASP14 was a blind community assessment against experimentally determined structures; it gives evidence beyond an internal DeepMind benchmark.
- AlphaFold2 made useful structural hypotheses available at much greater scale and speed.

### Claims rejected

- “AlphaFold solved biology.”
- “It replaces experimental biology.”
- “A predicted structure establishes function, disease mechanism, mutation effect, or a drug.”
- “Every prediction is equally reliable.”

### Boundary that must remain visible

Low-confidence regions may be disordered or uncertain. A single predicted conformation may not represent all states. Ligands, metals, ions, nucleic acids, modifications, complexes, mutation effects, and inter-domain placement require additional evidence and appropriate confidence measures.

### Primary or authoritative sources

1. Jumper et al., “Highly accurate protein structure prediction with AlphaFold,” Nature (2021): https://www.nature.com/articles/s41586-021-03819-2
2. CASP14 official results: https://predictioncenter.org/casp14/results.cgi?view=tb_results
3. EMBL-EBI AlphaFold Database FAQ: https://alphafold.ebi.ac.uk/faq

## Durable chapter spine and sources

| Moment | Durable mechanism or reframing | Core source |
|---|---|---|
| 1950, Turing | Replace an argument about essence with an observable behavioural question | https://academic.oup.com/mind/article/LIX/236/433/986238 |
| 1957, perceptron | Learn a simple decision boundary from corrected examples | https://hdl.handle.net/1813/8365 |
| 1966, ELIZA | Show how rule-based text patterns can create an impression of conversation without comprehension | https://dl.acm.org/doi/10.1145/365153.365168 |
| 1969, Shakey | Combine perception, planning and action in a bounded physical environment | https://www.sri.com/hoi/shakey-the-robot/ |
| 1989, Q-learning | Revise action-value estimates from delayed reward without a supplied model of the environment | https://www.cs.rhul.ac.uk/~chrisw/thesis.html |
| 1986, backpropagation | Adjust hidden layers by propagating output error backwards | https://awards.acm.org/binaries/content/assets/press-releases/2019/march/turing-award-2018.pdf |
| 1997, LSTM | Learn gates that retain, discard and expose information across a sequence | https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory |
| 1998, LeNet | Reuse learned local pattern detectors across document images | https://ieeexplore.ieee.org/document/726791 |
| 2009, ImageNet | Supply large-scale labelled data and a shared visual evaluation | https://ieeexplore.ieee.org/document/5206848 |
| 2012, AlexNet | Large convolutional network + labelled data + GPUs learns visual features at scale | https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html |
| 2013, word2vec | Learn numerical word neighbourhoods from use in context | https://papers.nips.cc/paper_files/paper/2013/hash/9aa42b31882ec039965f3c4923ce901b-Abstract.html |
| 2014, attention | Let a decoder weight the relevant source positions rather than depend on one fixed summary | https://arxiv.org/abs/1409.0473 |
| 2014, GANs | Generator and discriminator improve through an adversarial objective | https://proceedings.neurips.cc/paper_files/paper/2014/file/f033ed80deb0234979a61f95710dbe25-Paper.pdf |
| 2015, residual networks | Learn a change around a shortcut connection, enabling much deeper networks | https://arxiv.org/abs/1512.03385 |
| 2015, U-Net | Combine image context with restored fine detail for pixel-level segmentation | https://arxiv.org/abs/1505.04597 |
| 2015, DQN | Join learned perception from pixels to reward-guided action | https://www.nature.com/articles/nature14236 |
| 2016, AlphaGo | Learned evaluation focuses search and self-play improves policy | https://www.nature.com/articles/nature16961 |
| 2017, transformer | Tokens attend directly to other tokens without recurrence; training parallelises | https://arxiv.org/abs/1706.03762 |
| 2018, BERT | Pre-train broad language representations once, then adapt them to many tasks | https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/ |
| 2020, GPT-3 | Specify some new tasks through text instructions or examples without retraining | https://arxiv.org/abs/2005.14165 |
| 2020, RAG | Retrieve outside passages and place them in context before generation | https://arxiv.org/abs/2005.11401 |
| 2020, MuZero | Learn only the internal predictions needed for planning rather than receiving game dynamics | https://www.nature.com/articles/s41586-020-03051-4 |
| 2020, DDPM | Learn to reverse a gradual noising process | https://proceedings.neurips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html |
| 2021, CLIP | Learn aligned text and image representations from matching pairs | https://cdn.openai.com/papers/Learning_Transferable_Visual_Models_From_Natural_Language_Supervision.pdf |
| 2021, AlphaFold2 | Predict 3D structure with learned geometry, evolutionary evidence, and confidence | https://www.nature.com/articles/s41586-021-03819-2 |
| 2022, instruction following | Use demonstrations and ranked human preferences to shape assistant behaviour | https://arxiv.org/abs/2203.02155 |
| 2022–2024, reasoning and tools | Elicit intermediate work, interleave actions and spend more computation on difficult answers | https://arxiv.org/abs/2210.03629 |
| 2023, GraphCast | Learn global weather transitions on a connected Earth representation | https://deepmind.google/research/publications/22598/ |
| 2023, GNoME | Combine learned candidate ranking with physics calculations in a materials-discovery loop | https://www.nature.com/articles/s41586-023-06735-9 |
| 2023, RT-2 | Represent robot actions in a sequence form learned alongside vision and language | https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/ |

## Freshness triggers

- Recheck every current database count, deployment claim, prize wording, and retrospective interpretation before a public edition.
- Add a moment only when independent evidence shows a reusable mechanism, removed constraint, downstream consequence, and material boundary.
- Correct the book when a primary paper is retracted, materially corrected, or displaced by stronger historical evidence.
- Route current model launches and product claims to the NewsStand or dated cards, not the durable historical spine.
