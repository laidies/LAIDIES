# Episode-media representative-pipeline pilot

This directory supplies a contract only. It contains no selected episode segment,
creative asset, judgement, release evidence, or approval.

Run the deterministic contract checks from `Website-homepage`:

```sh
node operations/product-stewards/episode-media-quality/pilot/test-validator.mjs
node scripts/validate-episode-media-pilot.mjs path/to/real-pilot-manifest.json
```

Every manifest declares `artifactRoot`, resolved relative to the manifest. Asset
paths may point anywhere below that root (so real assets remain in their normal
repository locations), but traversal outside it is rejected. `manifest-template.json` is deliberately incomplete and must fail until every
placeholder is replaced. `fixtures/valid-manifest.json` is synthetic and passes
against its text-byte fixture files; it proves validator behaviour only, not a
media pipeline or creative judgement. `fixtures/invalid-manifest.json` is
deliberately incomplete and proves the gate fails closed.

The validator verifies recorded SHA-256 bindings, exact cue coverage, source and
identity/style/location reference admission, rejected-asset scan, declared
semantic motion or intentional still, independent cue verdicts, caption/audio
and as-recorded-transcript binding, automated-result bindings, Ali's checksum-
bound visual ruling, and maker/judge separation. Rendering, full decode, codec
inspection, still-control measurement, player testing, and human judgement must
be performed separately and recorded as checksum-bound results before this gate
can pass.
