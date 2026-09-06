# Gastric-cancer prediction study — primary-source research

**Status:** PRIMARY PAPER READ; not drafted, admitted, or medical advice.  
**Checked:** 2026-09-05, Vancouver.  
**Primary source:** Ding et al., “Multimodal radiopathomics model predicts postoperative metachronous liver metastasis in gastric cancer,” *Nature Communications*, published online 2026-09-04; DOI [10.1038/s41467-026-76382-x](https://doi.org/10.1038/s41467-026-76382-x).

## Files and read scope

- Full original article PDF: `s41467-026-76382-x.pdf`, SHA-256 `8bfa7cb99f0f588fc77771e48a05e4f578c96959ef12a424e5c4dbd4577a54d2`; 17 pages, read in full.
- Publisher HTML source: `s41467-026-76382-x.html`, SHA-256 `9e5f72b9deb56279ca5c7fcb79a5118bb9cbd5f331a93e2a12032a02c79f5257`.
- Nature reporting summary: `reporting-summary.pdf`, SHA-256 `9c6f3aa97585cd8af44595b9b1ef6015f1fabd6d0891b216a09b80843ca89bd7`; retrieved, but it is image-only in this bounded pass and no claim below relies on it.
- Supplementary Information, peer-review file, and source-data workbook were listed by the publisher but not read. Their absence is not treated as evidence.

## What the study did

The study developed **RCSA**, a postoperative-risk model for *metachronous liver metastasis* (liver recurrence more than six months after curative surgery) in locally advanced gastric cancer.

- **Inputs:** conventional clinical/pathology factors (including histology, postoperative TNM stage and Lauren classification); quantitative features from pre-operative contrast CT; and deep-learning-derived features from routine H&E pathology slides. The paper used nnU-Net for 3D CT-tumour segmentation and the UNI tissue encoder, based on DINOv2, to extract slide features. [PDF pp. 2–3, 12–13]
- **Output:** a high- or low-risk prediction for later liver metastasis after surgery, using a cut-off derived from the training data. It is not a tool that chooses chemotherapy or immunotherapy. [PDF pp. 2–3, 12–13]
- **Comparator:** clinical-only, CT-radiomics-only, pathology-only, and a transformer-based multimodal model. In the training cohort, RCSA’s AUROC was 0.909 (95% CI 0.881–0.937), versus 0.701 for the clinical model. [PDF pp. 2–3]
- **AUROC boundary:** AUROC measures how well a score separates people who later did and did not have the study outcome across possible thresholds. It is not a probability that one person will recur, a proof that a treatment works, or evidence that deploying the tool improves survival.

## Cohorts and validation

The paper reports 1,878 eligible people with locally advanced gastric cancer:

| Dataset | Count | Setting |
|---|---:|---|
| Training | 770 | Fourth Hospital of Hebei Medical University; 2014–2017 |
| Internal validation | 362 | Same hospital, separated into 2012–13 (194) and 2018–19 (168) |
| External validation | 489 | Northern-China three-centre cohort (257), Southern-China two-centre cohort (191), and TCIA public cohort (41) |
| Prospective-trial cohort | 257 | Retrospective post-hoc use of a separately enrolled multicentre trial, NCT02555358 |

The original retrospective data came from six Chinese centres, with the TCIA cohort as an additional public dataset. The trial cohort was independent of model training. Its parent randomized trial compared DOX and XELOX neoadjuvant chemotherapy with surgery alone, with pathological complete response as its registered primary endpoint. The paper’s RCSA analysis of recurrence was an exploratory secondary, post-hoc use, not a pre-specified trial endpoint. [PDF pp. 2, 6, 11–12]

The article reports RCSA AUROCs of 0.908 and 0.903 in the two internal sets; 0.890, 0.865 and 0.862 in the external sets; 0.898 in the prospective direct-surgery group; and 0.786 in the prospective neoadjuvant-chemotherapy group. The smaller TCIA external group had 41 people and six metastasis events; long-term survival follow-up was unavailable there. [PDF pp. 2, 4–6]

## Benefit actually measured — and not measured

**Measured:** retrospective/prognostic discrimination for later liver metastasis; observed survival differences between model-defined risk groups; and an association between prediction and treatment response in the neoadjuvant subgroup. [PDF pp. 3, 6]

**Not measured:** the study did not assign treatment based on RCSA, compare RCSA-guided care with usual care, or demonstrate that the model improved chemotherapy response, immunotherapy response, follow-up decisions, survival, quality of life, or any patient outcome. Its immune and transcriptomic work supports a hypothesis that low-risk tumours may be more responsive to immunotherapy; it is not a trial of immunotherapy selected by RCSA. [PDF pp. 9–11]

The authors propose more frequent imaging for higher-risk people and standard intervals for lower-risk people as a possible future framework. That is their proposed use, not evidence that this schedule is better or safe. [PDF pp. 10–11]

## Availability, funding, conflicts, and limitations

- Article access: open access under CC BY-NC-ND. Code is linked at [GitHub](https://github.com/hebeidpa/GC-MLM-RCSA) and archived at [Zenodo](https://doi.org/10.5281/zenodo.20667762). [PDF p. 15]
- Data: TCIA material and processed sequencing data have stated routes; individual clinical records and in-house CT/H&E images are not openly shared because of privacy and IRB restrictions. [PDF p. 15]
- Funding: named Chinese national, provincial, institutional and medical-research programmes; the paper lists author affiliations including Ant Healthcare (AFU), Ant Group. [PDF pp. 1, 17]
- Conflicts: the authors declare no competing interests. [PDF p. 17]
- Limits stated by authors: primary data are retrospective and subject to selection bias; broader international prospective trials are needed; multimodal/deep-pathology implementation is complex. [PDF pp. 10–11]
- Additional material limit: the reporting summary could be downloaded but was not machine-readable in this pass; supplementary methods and subgroup tables were not reviewed. No numerical response-prediction claim beyond the main article is carried forward.

## Reader job and disposition

**Reader job:** explain the difference between an AI system that may sort patients into different *future-risk* groups and evidence that using that system changes treatment or helps people live longer.

**Recommendation: HOLD for ordinary-news drafting.** The paper is a meaningful, primary, newly published technical result and could later support a carefully bounded science explainer or a Big Picture input. It is not ready for an ordinary NewsStand health story until an appropriately qualified medical review resolves external generalisability, clinical workflow, and whether any independent evidence supports acting on the model. Do not describe it as AI improving chemotherapy, selecting immunotherapy, or improving patient outcomes.

