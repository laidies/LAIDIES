# V3 — three-image social story

Adult reader job: understand Karen Spärck Jones’s contribution and choose whether to share a useful, finished explanation.

The single-image v2 was held for tiny text and presentation-slide composition. Preserve the verified six-file example; split the experience into three images: the search, collection counts and points, then result order. All meaningful export text is at least44px on1080px width. Graphic panels, large file motifs, bounded halftone and the current Homepage/LIBRAiRY Jost/pink/teal/purple are the visual approach. No invented historical likeness.

Preview all three images; download them individually or together in one ZIP; optional native sharing sends the three files only. No private notes, AI/provider calls, rewards or automatic publishing. Story uses the same sequence with safe vertical space. The caption names the primary paper and limitations.

The second image shows plan in5/6 and pension in2/6, with matching contributions1 and3. The third adds contributions, displays4/3/1 scores and explicitly says the pension-only file breaks its former tie. This is a historical toy collection; rarer does not mean true or reliably relevant. No modern service algorithm is claimed.

Producer inspected all six rendered exports and desktop/mobile page; exact text was read in full. The numerical mechanism is unchanged from independent primary-source verification. Two reviewers are the authorized maximum, focusing only on material outcome failures. No new optional audits.

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

