# WeatherNext Cyclones open release — source hierarchy and claim map

**Cutoff:** 2026-08-06 08:15 PDT

## Source hierarchy

1. `GDM-WNC-2026-08-06`: Google DeepMind's launch description; complete interested-party source.
2. `NATURE-WNC-2026-08-06`: *Operational tropical cyclone forecasting with AI*, Nature, DOI `10.1038/s41586-026-10953-2`; peer-reviewed original research with Google, NOAA/NHC, CIRA and UK Met Office authors.
3. `GDM-WEATHERNEXT-REPO-2026-08-06`: public code, checkpoint labels, hardware, data, licence and disclaimer record.
4. `WMO-PROBABILISTIC-CYCLONES-2026-07-20`: independent operational context on probabilistic forecasts, communication and capacity gaps.
5. `NHC-VERIFY-2025`: NHC verification material; primary government context for GDMI as one guidance input, not the official forecast itself.

## Claim map

| Claim | Status | Evidence | Does not establish |
|---|---|---|---|
| Google opened WeatherNext Cyclones and WeatherNext 2 code and pretrained weights. | SUPPORTED | `GDM-WEATHERNEXT-REPO-2026-08-06` | A supported consumer product, stable API or free full-model operation. |
| WeatherNext Cyclones is a newly deployed model. | TRUE BUT INCOMPLETE | The public release is new; the `<2025` checkpoint already ran live during the 2025 Atlantic season. | That agencies only began using the capability on August 6. |
| It gives people an extra day of warning. | MISLEADING | The paper reports an average one-day forecast-skill advantage against leading operational models in its historical evaluation. | A guaranteed earlier warning for every storm, evacuation or location. |
| It can produce as many as 1,000 ensemble members up to 15 days ahead. | SUPPORTED AS STUDY/RELEASE CAPABILITY | `NATURE-WNC-2026-08-06`; `GDM-WNC-2026-08-06` | That 15-day individual-storm predictions are certain or that 1,000 outputs are 1,000 independent expert opinions. |
| Anyone can run it for free. | TRUE BUT INCOMPLETE | Mini can run in a free Colab runtime; full models require TPU v5p or H100-class hardware and specialist inputs. | That Mini matches the full models or that end-to-end operational use is free and simple. |
| NHC used it operationally. | SUPPORTED AS MODEL GUIDANCE | Repo identifies FNV3 and NHC's postprocessed GDMI; NHC verification material includes GDMI. | Replacement of NHC forecasters, observations, other models or official warnings. |
| Open release means official endorsement. | UNSUPPORTED | Repo expressly says experimental, unsupported and not an official warning service. | Government endorsement or fitness for public safety decisions. |

## Release detail matrix

- **Company / family / labels:** Google DeepMind; WeatherNext; WeatherNext 2 and WeatherNext Cyclones; public checkpoints `<2025`, `<2024`, `<2023`, plus Cyclones Mini.
- **Access:** public GitHub code/notebooks; weights and sample data in a Google Cloud bucket; daily forecast feeds via Earth Engine, BigQuery and Vertex AI.
- **Plans / regions / API:** not a Gemini subscription feature and no consumer plan/region matrix; research code has no API-stability promise. Feed access follows the separate Google platform routes.
- **Price / limits:** code is Apache 2.0 and other materials including weights are CC BY 4.0; Google publishes no end-to-end operating price or SLA. Mini can use free Colab; full models need substantial accelerator hardware and specialist weather data.
- **Predecessor/change:** this is an access and reproducibility release around an existing specialist model family, not the first WeatherNext deployment.
- **Who should switch/test/wait/ignore:** weather agencies and researchers may test; downstream forecast-product teams should validate against their basin and workflow; ordinary readers should ignore raw model output and keep official alerts enabled.
- **Independent evidence:** Nature review and multi-agency authorship strengthen the performance claim; no independent post-release reproduction of the public weights was found.
- **Real-use tests still needed:** replication with released checkpoints, another season/basin, robustness to unusual storms, compute/data costs, and evidence that forecast gains improve warning decisions or outcomes.
