# V2 producer brief — show the search mechanism

Reader: an adult woman who has searched workplace files and received irrelevant matches. Desired result: she can explain why matching a word that occurs across fewer files may lift a result higher, and share a readable, well-composed graphic that credits Karen Spärck Jones.

This is explanatory content, not a wrapper repair. The previous source contract falsely marked teaching dimensions inapplicable. All references to fieldtrip/device-note actions are superseded here.

Use six invented work files and the query pension plan. Show the collection counts, equal-count tie and weighted ranking. Use one comparison table so the score change is visible without reading two separate tables. The story adds all six filenames; the post groups the four plan-only files. A match on plan contributes1; pension contributes3 using the original paper's frequency-band method. Explicitly link rarity within this collection to distinguishing power, score and position. Retain common terms. Rarity does not establish truth or guarantee relevance. This is a worked historical method, not a claim about every current search service.

The illustration must perform the explanation: colour-bound words/counts and the pension-only result visibly separating from the plan-only tie. No gradient-filled text poster, decorative search box, generic slogan, unexplained weight, school worksheet, white page canvas, pastel page, internal status or invented historical portrait. Use current Jost type and current Homepage/LIBRAiRY accents, with deliberate comic-panel hierarchy and controlled contrast. No person is rendered. Actual post at phone scale is the representative proof before the export page is changed.

Visual authority: current Homepage/LIBRAiRY, operations/page-design-bar.md and operations/episode-visual-system-lock.md category composition. The rejected953b8d2e image is a negative reference, not a palette template. User feedback outranks prior reviewer admissions.

Exact source reasoning follows. The panel labels and dialogue are drafted only after the producer contract's integrity preflight. Independent review must explain back the actual ranking change and inspect visual quality at phone size before reading maker receipts. Two reviewers only; no invented optional findings.

# Teaching-mechanism repair: collection-frequency weighting

## Verdict

Use a six-file workplace search in which an equal-score tie visibly becomes a useful ranking. This repairs the rejected candidate's missing causal step: a less frequent matching term narrows the collection more, so its match contributes more to the score and can move a document upward.

## One tiny worked example

**Collection: six HR files**

1. `Pension plan changes`
2. `Project plan`
3. `Hiring plan`
4. `Travel plan`
5. `Marketing plan`
6. `Pension contribution limits`

**Search:** `pension plan`

Across this collection, **plan** appears in five files. It is a valid clue, but it barely narrows the pile. **Pension** appears in two files, so a pension match does much more to distinguish a likely result from the other files.

| File | Matching search words | Equal match count | Collection-frequency-weighted score |
|---|---:|---:|---:|
| Pension plan changes | pension + plan | 2 | 3 + 1 = **4** |
| Pension contribution limits | pension | 1 | 3 = **3** |
| Project plan | plan | 1 | 1 |
| Hiring plan | plan | 1 | 1 |
| Travel plan | plan | 1 | 1 |
| Marketing plan | plan | 1 | 1 |

**What changes:** when every matching term counts once, `Pension contribution limits` is stuck in a five-way tie with the plan-only files. With collection-frequency weighting, its pension match is worth more, so it moves alone into second place. The frequent term still counts; it is not filtered out.

**Everyday reason:** if five of six folders are labelled “plan,” that word does little to identify which folder you mean. “Pension” cuts the possible pile to two. More weight means more influence on the match score and therefore on the order of results.

## Compact candidate wording

### Text for the graphic

**WHY ONE WORD CAN CHANGE THE ORDER**

Search six work files for **PENSION PLAN**.

**PLAN** appears in 5 files.  
Useful—but it barely narrows the pile. **+1**

**PENSION** appears in 2 files.  
That match points to a much smaller set. **+3**

Count every match equally, and **Pension contribution limits** ties with four plan-only files.

Weight matches by frequency across this collection, and it moves to **#2**:

1. Pension plan changes — **4**
2. Pension contribution limits — **3**
3. Four plan-only files — **1 each**

Karen Spärck Jones's 1972 insight: a term found in fewer documents can be a more distinguishing match, so it can contribute more to the score.

**Less common here means more distinguishing—not more true.**

### Caption

“More weight” changes the order. In this six-file example, **plan** appears almost everywhere, while **pension** narrows the field to two files. Giving the pension match more influence lifts a pension-only file above four plan-only files—without throwing the common word away.

Spärck Jones argued for this collection-frequency approach in her 1972 paper on term specificity and retrieval. This tiny example demonstrates that paper's mechanism; it is not a claim about every modern search engine, which may combine many other signals.

Source: Karen Spärck Jones, “A statistical interpretation of term specificity and its application in retrieval” (1972).

## Accuracy and simplification notes

- The paper defines statistical specificity from a term's use across a particular document collection, then determines a document's retrieval level by summing the values of its matching terms. It explicitly argues for keeping frequent terms while giving more value to less frequent matches.
- The numeric scores above are not invented marketing numbers. Applying the paper's stated frequency-band rule to this six-document toy collection gives weight **1** to a term in five documents and weight **3** to a term in two documents. The equal-count column shows the unweighted comparison the paper sought to improve.
- The social wording deliberately omits the paper's logarithmic frequency-band formula. That is the simplification: it teaches the cause and ranking effect without asking the reader to decode notation.
- The filenames use exact whole-word matches for legibility. The historical experiments used indexed keyword stems and test collections; this toy collection is a mechanism demonstration, not a reconstruction of those experiments.
- The example makes no claim that rarity proves relevance or truth. A less frequent term can be misleading or accidental. Here it receives more influence only because, within this collection, it distinguishes fewer candidate documents.
- It makes no claim that current search products use this exact score. Modern systems may combine collection frequency with many other signals.

## Source anchors checked

- Paper abstract: lines 11–19 of the Cambridge reprint state the collection-frequency claim and that less frequent matches receive greater value.
- Paper discussion: lines 170–199 says deleting frequent terms harmed performance and argues that frequent matches should retain some merit while non-frequent matches receive more.
- Paper weighting section: lines 201–226 defines the frequency-band weight, sums matching-term values into a retrieval level, and shows how this produces a more discriminating quasi-ranking.

